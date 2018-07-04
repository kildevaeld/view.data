import { IModel, ICollection } from './types';
import { IModelView } from './model-view';
import { ICollectionView, ChildViewType } from './collection-view';
import { has, extend } from '@viewjs/utils';
import { Constructor } from '@viewjs/view';
import 'reflect-metadata';

function setter<T extends IModel, U>(_: T, prop: any) {
    return function $observableSetter(this: T, value: U) {
        return this.set(prop, value)
    }
}

function getter<T extends IModel, U>(_: T, prop: any) {
    return function $observableGetter(this: T): U {
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
        descriptor.set = function $observableSet(this: IModel, value: U) {
            return this.set(prop, value);
        }
    }
}

export function primaryKey(prop: string) {
    return function <T extends Constructor<IModel>>(target: T) {
        Reflect.defineMetadata("primaryKey", prop, target);
    }
}

function _event<T extends any>(event: string, property: string | undefined, target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>, targetKey: string) {
    if (!desc) throw new Error('no description');
    if (typeof desc.value !== 'function') {
        throw new TypeError('must be a function');
    }

    const key = event + (property ? ':' + property : '');
    if (target[targetKey] && has(target[targetKey], key)) {
        let old = target[targetKey][key]
        if (!Array.isArray(old)) old = [old];
        old.push(prop as any);
        target[targetKey][key] = old;
    } else {
        target[targetKey] = extend(target[targetKey] || {}, {
            [key]: [prop]
        });

    }
}


export namespace model {

    export function event(event: string, property?: string) {
        return function <T extends IModelView<M>, M extends IModel>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) {
            return _event(event, property, target, prop, desc, "modelEvents");
        }
    }

    export function change(property?: string) {
        return event("change", property);
    }

}

export namespace collection {

    export function event(event: string, property?: string) {
        return function <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) {
            return _event(event, property, target, prop, desc, "collectionEvents");
        }
    }

    export function change(property?: string) {
        return event("change", property);
    }

}