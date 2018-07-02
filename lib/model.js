"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
const types_1 = require("./types");
const events_1 = require("@viewjs/events");
const utils_2 = require("@viewjs/utils");
class Model extends events_1.EventEmitter {
    constructor() {
        super();
        this[types_1.MetaKeys.Attributes] = new Map();
    }
    set(key, value, options) {
        let old = this.get(key);
        if (utils_1.equal(old, value)) {
            return this;
        }
        this[types_1.MetaKeys.Attributes].set(key, value);
        if (options && options.silent)
            return this;
        utils_2.triggerMethodOn(this, `change:${key}`, old, value);
        utils_2.triggerMethodOn(this, 'change', { [key]: value });
        return this;
    }
    get(key) {
        return this[types_1.MetaKeys.Attributes].get(key);
    }
    has(key) {
        return this[types_1.MetaKeys.Attributes].has(key);
    }
    clear() {
        this[types_1.MetaKeys.Attributes] = new Map();
        utils_2.triggerMethodOn(this, 'clear');
        return this;
    }
    toJSON(_ = false) {
        let out = {};
        this[types_1.MetaKeys.Attributes].forEach((value, key) => {
            out[key] = value;
        });
        return out;
    }
}
exports.Model = Model;
