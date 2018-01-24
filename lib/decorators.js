"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("view");
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
var model;
(function (model) {
    function change(property) {
        return function (target, prop, desc) {
            if (!desc)
                throw new Error('no description');
            if (typeof desc.value !== 'function') {
                throw new TypeError('must be a function');
            }
            const key = "change" + (property ? ':' + property : '');
            if (target.modelEvents && view_1.has(target.modelEvents, key)) {
                let old = target.modelEvents[key];
                if (!Array.isArray(old))
                    old = [old];
                old.push(prop);
                target.modelEvents[key] = old;
            }
            else {
                target.modelEvents = view_1.extend(target.modelEvents || {}, {
                    [key]: [prop]
                });
            }
            /*const key = `${change} ${selector}`
            if (target.events && has(target.events, key)) {
                let old = target.events[key]
                if (!Array.isArray(old)) old = [old];
                old.push(property as any);
                target.events[key] = old;
            } else {
                target.events = extend(target.events || {}, {
                    [key]: property
                });

            }*/
        };
    }
    model.change = change;
})(model = exports.model || (exports.model = {}));
