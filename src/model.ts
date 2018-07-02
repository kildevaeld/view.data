import { equal } from '@viewjs/utils';
import { MetaKeys, IModel } from './types';
import { EventEmitter } from '@viewjs/events';
import { triggerMethodOn } from '@viewjs/utils';

export interface ModelSetOptions {
    silent?: boolean;
}
export class Model extends EventEmitter implements IModel {

    [key: string]: any;


    constructor() {
        super();
        (this as any)[MetaKeys.Attributes] = new Map<PropertyKey, any>();
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

    get<U>(key: string | number): U {
        return (this as any)[MetaKeys.Attributes].get(key);
    }

    has(key: string | number): boolean {
        return (this as any)[MetaKeys.Attributes].has(key);
    }

    clear() {
        (this as any)[MetaKeys.Attributes] = new Map<PropertyKey, any>();
        triggerMethodOn(this, 'clear');
        return this;
    }

    toJSON(_ = false) {
        let out: any = {};

        (this as any)[MetaKeys.Attributes].forEach((value: any, key: any) => {
            out[key] = value;
        });

        return out;
    }
}