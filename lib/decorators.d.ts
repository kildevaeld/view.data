import { IModel, ICollection } from './types';
import { IModelController } from './with-model';
import { ICollectionView, ChildViewType } from './with-collection';
import { Constructor } from '@viewjs/utils';
/**
 *
 * @export
 * @template
 * @param {T} target
 * @param {*} prop
 * @param {TypedPropertyDescriptor<U>} [descriptor]
 */
export declare function property<T extends IModel, U>(target: T, prop: any, descriptor?: TypedPropertyDescriptor<U>): void;
export declare function primaryKey(prop: string): <T extends Constructor<IModel>>(target: T) => void;
export declare namespace model {
    function event(event: string, property?: string): <T extends IModelController<M>, M extends IModel>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
    function change(property?: string): <T extends IModelController<M>, M extends IModel>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
}
export declare namespace collection {
    function event(event: string, property?: string): <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
    const add: <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
    const remove: <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
}
