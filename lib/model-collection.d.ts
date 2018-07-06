import { ArrayCollection } from './array-collection';
import { IModel, ModelConstructor } from './types';
import { Model } from './model';
export declare class ModelCollection<M extends Model> extends ArrayCollection<M> {
    Model: ModelConstructor<IModel>;
    constructor(models?: M[]);
    createModel(o?: {
        [key: string]: any;
    }): IModel;
    push(m: M | any, trigger?: boolean): number;
}
