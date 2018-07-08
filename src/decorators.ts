import { ICollectionView, ChildViewType } from './with-collection';
import { has, extend } from '@viewjs/utils';
import { IModel, ICollection } from '@viewjs/models';


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

export namespace collection {

    export function event(event: string, property?: string) {
        return function <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) {
            return _event(event, property, target, prop, desc, "collectionEvents");
        }
    }

    export const add = event("add");
    export const remove = event("remove");

}