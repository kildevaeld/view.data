"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equaljs_1 = require("equaljs");
const types_1 = require("./types");
const event_emitter_1 = require("./event-emitter");
const view_1 = require("@viewjs/view");
class Model extends event_emitter_1.EventEmitter {
    constructor() {
        super();
        this[types_1.MetaKeys.Attributes] = new Map();
    }
    set(key, value, options) {
        let old = this.get(key);
        if (equaljs_1.equal(old, value)) {
            return this;
        }
        this[types_1.MetaKeys.Attributes].set(key, value);
        if (options && options.silent)
            return this;
        view_1.triggerMethodOn(this, `change:${key}`, old, value);
        view_1.triggerMethodOn(this, 'change', { [key]: value });
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
        view_1.triggerMethodOn(this, 'clear');
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
