"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("view");
function setter(_, prop) {
    return function $observableSetter(value) {
        return this.set(prop, value);
    };
}
function getter(_, prop) {
    return function $observableGetter() {
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
            return this.set(prop, value);
        };
    }
}
exports.property = property;
var model;
(function (model) {
    function event(event, property) {
        return function (target, prop, desc) {
            if (!desc)
                throw new Error('no description');
            if (typeof desc.value !== 'function') {
                throw new TypeError('must be a function');
            }
            const key = event + (property ? ':' + property : '');
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
        };
    }
    model.event = event;
    function change(property) {
        return event("change", property);
    }
    model.change = change;
})(model = exports.model || (exports.model = {}));
