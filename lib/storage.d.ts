import { Model, ModelCollection } from '@viewjs/models';
import { Constructor } from '@viewjs/utils';
declare type MetaData = {
    [key: string]: any;
};
export interface Storage<Model = any> {
    create(model: Model, meta?: MetaData): Promise<Model>;
    update(id: string, model: Model, meta?: MetaData): Promise<Model>;
    remove(id: string, meta?: MetaData): Promise<{}>;
    get(id: string, meta?: MetaData): Promise<Model | undefined>;
    list(meta?: MetaData): Promise<Model[]>;
}
export declare function withStorage<CollectionType extends Constructor<ModelCollection<ModelType>>, ModelType extends Model, StorageType extends Storage<InputType>, InputType = any>(Base: CollectionType, Storage?: Constructor<StorageType>): any;
export {};
