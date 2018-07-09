import { ICollectionView, ChildViewType } from './with-collection';
import { IModel, ICollection } from '@viewjs/models';
export declare namespace collection {
    function event(event: string, property?: string): <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
    const add: <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
    const remove: <T extends ICollectionView<C, M, V>, C extends ICollection<M>, M extends IModel, V extends ChildViewType<M>>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
}
