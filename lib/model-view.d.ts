import { View, Constructor } from '@viewjs/view';
import { IModel } from './types';
export interface IModelView<M extends IModel> {
    model?: M;
    setModel(model?: M): this;
    modelEvents?: any;
}
export declare type ModelEventsMap = {
    [key: string]: (string | ((...args: any[]) => any))[];
};
export declare function withModel<T extends Constructor<View>, M extends IModel>(Base: T, Model?: Constructor<M>): T & Constructor<IModelView<M>>;
