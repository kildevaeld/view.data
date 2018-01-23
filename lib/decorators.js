"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setter(target, prop) {
    /*if (!(target instanceof Model)) {
        throw new TypeError("Target must be a EventEmitter")
    }*/
    return function $observableSetter(value) {
        /*if (this instanceof Model) {
            return this.set(prop, value)
        }*/
        return this.set(prop, value);
    };
}
function getter(_, prop) {
    return function () {
        return this.get(prop);
    };
}
/**
 *
 * @export
 * @template
 * @param {T} target
 * @param {*} prop
 * @param {TypedPropertyDescriptor<U>} [descriptor]
 */
function property(target, prop, descriptor) {
    descriptor = descriptor || Object.getOwnPropertyDescriptor(target, prop);
    if (!descriptor) {
        descriptor = {
            get: getter(target, prop),
            set: setter(target, prop),
            enumerable: false,
            configurable: false
        };
        Object.defineProperty(target, prop, descriptor);
    }
    else if (descriptor.set) {
        let oSet = descriptor.set;
        descriptor.set = function $observableSet(value) {
            /*let old = this.get(prop);
            if (equal(old, value)) {
                return;
            }*/
            return this.set(prop, value);
            /*oSet(value);
            this.trigger(`change:${prop}`, old, value)
            this.trigger('change', { [prop]: value })*/
        };
    }
}
exports.property = property;
