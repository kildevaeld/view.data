import { equal } from 'equaljs';
import { IModel } from './types';
import { IModelView } from './model-view';
import { has, extend } from 'view';

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


export namespace model {
    export function change(property?: string) {
        return function <T extends IModelView<M>, M>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) {
            if (!desc) throw new Error('no description');
            if (typeof desc.value !== 'function') {
                throw new TypeError('must be a function');
            }

            const key = "change" + (property ? ':' + property : '');
            if (target.modelEvents && has(target.modelEvents, key)) {
                let old = target.modelEvents[key]
                if (!Array.isArray(old)) old = [old];
                old.push(prop as any);
                target.modelEvents[key] = old;
            } else {
                target.modelEvents = extend(target.modelEvents || {}, {
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
        }
    }
}