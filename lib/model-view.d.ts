import { View } from '@viewjs/view';
import { Constructor } from '@viewjs/utils';
import { IModel } from './types';
export interface IModelView<M extends IModel> {
    model?: M;
    setModel(model?: M): this;
    modelEvents?: ModelEventsMap;
}
export declare type ModelEventsMap = {
    [key: string]: (string | ((...args: any[]) => any))[];
};
export declare function withModel<T extends Constructor<View>, M extends IModel>(Base: T, Model?: Constructor<M>): T & Constructor<IModelView<M>>;
