"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
const types_1 = require("./types");
const events_1 = require("@viewjs/events");
class Model extends events_1.EventEmitter {
    constructor(attrs) {
        super();
        this._idAttribute = void 0;
        this[types_1.MetaKeys.Attributes] = new Map();
        if (attrs) {
            for (let k in attrs) {
                this.set(k, attrs[k], { silent: true });
            }
        }
    }
    get idAttribute() {
        if (!this._idAttribute) {
            this._idAttribute = Reflect.getOwnMetadata("primaryKey", this.constructor) || 'id';
        }
        return this._idAttribute;
    }
    set idAttribute(attr) {
        this._idAttribute = attr;
    }
    get id() {
        return this.get(this.idAttribute);
    }
    set(key, value, options) {
        let old = this.get(key);
        if (utils_1.equal(old, value)) {
            return this;
        }
        this[types_1.MetaKeys.Attributes].set(key, value);
        if (options && options.silent)
            return this;
        utils_1.triggerMethodOn(this, `change:${key}`, old, value);
        utils_1.triggerMethodOn(this, 'change', { [key]: value });
        return this;
    }
    get(key) {
        return this[types_1.MetaKeys.Attributes].get(key);
    }
    has(key) {
        return this[types_1.MetaKeys.Attributes].has(key);
    }
    unset(key) {
        let t = this.get(key);
        this[types_1.MetaKeys.Attributes].delete(key);
        return t;
    }
    clear() {
        this[types_1.MetaKeys.Attributes] = new Map();
        utils_1.triggerMethodOn(this, 'clear');
        return this;
    }
    toJSON() {
        let out = {};
        this[types_1.MetaKeys.Attributes].forEach((value, key) => {
            out[key] = value;
        });
        return out;
    }
}
exports.Model = Model;
