import { equal, triggerMethodOn } from '@viewjs/utils';
import { MetaKeys, IModel } from './types';
import { EventEmitter } from '@viewjs/events';


export interface ModelSetOptions {
    silent?: boolean;
}
export class Model extends EventEmitter implements IModel {

    [key: string]: any;
    private _idAttribute: string | undefined = void 0;

    get idAttribute() {
        if (!this._idAttribute) {
            this._idAttribute = Reflect.getOwnMetadata("primaryKey", this.constructor) || 'id';
        }
        return this._idAttribute;
    }

    set idAttribute(attr: string) {
        this._idAttribute = attr;
    }

    get id() {
        return this.get(this.idAttribute)
    }

    constructor(attrs?: any) {
        super();
        (this as any)[MetaKeys.Attributes] = new Map<string | number, any>();
        if (attrs) {
            for (let k in attrs) {
                this.set(k, attrs[k], { silent: true });
            }
        }
    }

    set<U>(key: string | number, value: U, options?: ModelSetOptions) {
        let old = this.get(key)
        if (equal(old, value)) {
            return this;
        }

        (this as any)[MetaKeys.Attributes].set(key, value);

        if (options && options.silent) return this;

        triggerMethodOn(this, `change:${key}`, old, value)
        triggerMethodOn(this, 'change', { [key]: value })
        return this;
    }

    get<U>(key: string | number): U | undefined {
        return (this as any)[MetaKeys.Attributes].get(key);
    }

    has(key: string | number): boolean {
        return (this as any)[MetaKeys.Attributes].has(key);
    }

    unset<U>(key: string | number): U | undefined {
        let t = this.get<U>(key);
        (this as any)[MetaKeys.Attributes].delete(key);
        return t;
    }

    clear() {
        (this as any)[MetaKeys.Attributes] = new Map<PropertyKey, any>();
        triggerMethodOn(this, 'clear');
        return this;
    }

    toJSON() {
        let out: any = {};

        (this as any)[MetaKeys.Attributes].forEach((value: any, key: any) => {
            out[key] = value;
        });

        return out;
    }
}