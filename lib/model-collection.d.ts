import { ArrayCollection } from './array-collection';
import { IModel } from './types';
import { Model } from './model';
import { Constructor } from '@viewjs/utils';
export declare class ModelCollection<M extends Model> extends ArrayCollection<M> {
    Model: Constructor<IModel>;
    createModel(o?: {
        [key: string]: any;
    }): IModel;
    push(m: M | any, trigger?: boolean): number;
}
