import { equal } from 'equaljs';
import { IModel } from './types';
function setter<T extends IModel, U>(target: T, prop: PropertyKey) {
    /*if (!(target instanceof Model)) {
        throw new TypeError("Target must be a EventEmitter")
    }*/

    return function $observableSetter(this: T, value: U) {
        /*if (this instanceof Model) {
            return this.set(prop, value)
        }*/
        return this.set(prop, value)
    }
}

function getter<T extends IModel, U>(_: T, prop: PropertyKey) {
    return function (this: T): U {
        return this.get<U>(prop)
    }
}

/**
 *
 * @export
 * @template
 * @param {T} target
 * @param {*} prop
 * @param {TypedPropertyDescriptor<U>} [descriptor]
 */
export function property<T extends IModel, U>(target: T, prop: any, descriptor?: TypedPropertyDescriptor<U>) {
    descriptor = descriptor || Object.getOwnPropertyDescriptor(target, prop);
    if (!descriptor) {

        descriptor = {
            get: getter<T, U>(target, prop),
            set: setter<T, U>(target, prop),
            enumerable: false,
            configurable: false
        }
        Object.defineProperty(target, prop, descriptor);
    } else if (descriptor.set) {
        let oSet = descriptor.set;

        descriptor.set = function $observableSet(this: IModel, value: U) {

            /*let old = this.get(prop);
            if (equal(old, value)) {
                return;
            }*/

            return this.set(prop, value);
            /*oSet(value);
            this.trigger(`change:${prop}`, old, value)
            this.trigger('change', { [prop]: value })*/
        }
    }
}
