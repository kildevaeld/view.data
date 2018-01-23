import { equal } from 'equaljs';
import { MetaKeys, IModel } from './types';
import { EventEmitter } from 'mixins.events';
import { triggerMethodOn } from 'view';

export interface ModelSetOptions {
    silent?: boolean;
}

export class Model extends EventEmitter(class { }) implements IModel {

    [key: string]: any;

    constructor() {
        super();
        this[MetaKeys.Attributes] = new Map<PropertyKey, any>();
    }

    set<U>(key: PropertyKey, value: U, options?: ModelSetOptions) {
        let old = this.get(key)
        if (equal(old, value)) {
            return this;
        }

        this[MetaKeys.Attributes].set(key, value);

        if (options && options.silent) return this;

        triggerMethodOn(this, `change:${key}`, old, value)
        triggerMethodOn(this, 'change', { [key]: value })
        return this;
    }

    get<U>(key: PropertyKey): U {
        return this[MetaKeys.Attributes].get(key);
    }

    has(key: PropertyKey): boolean {
        return this[MetaKeys.Attributes].has(key);
    }

    clear() {
        this[MetaKeys.Attributes] = new Map<PropertyKey, any>();
        triggerMethodOn(this, 'clear');
        return this;
    }

    toJSON(_ = false) {
        let out: any = {};

        this[MetaKeys.Attributes].forEach((value: any, key: any) => {
            out[key] = value;
        });

        return out;
    }
}