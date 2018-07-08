import { Model, ModelCollection } from '@viewjs/models';
import { Constructor, isPlainObject, Invoker } from '@viewjs/utils';

type MetaData = { [key: string]: any };

export interface Storage<Model = any> {
    create(model: Model, meta?: MetaData): Promise<Model>;
    update(id: string, model: Model, meta?: MetaData): Promise<Model>;
    remove(id: string, meta?: MetaData): Promise<{}>;
    get(id: string, meta?: MetaData): Promise<Model | undefined>;
    list(meta?: MetaData): Promise<Model[]>;
}


export function withStorage<
    CollectionType extends Constructor<ModelCollection<ModelType>>,
    ModelType extends Model,
    StorageType extends Storage<InputType>,
    InputType = any
    >(Base: CollectionType, Storage?: Constructor<StorageType>): any {

    return class extends Base {
        storage?: StorageType = Storage ? Invoker.get<StorageType>(Storage) : void 0;


        create(m: ModelType | any) {
            if (!m) return Promise.reject(new ReferenceError("no input"));

            if ((m instanceof Model)) {
                m = m.toJSON()
            }

            if (m.id) Promise.reject(new Error('not new'));

            if (!isPlainObject(m)) Promise.reject(new TypeError("invalid input type"));

            return this.storage.create(m)
                .then(m => {
                    const model = this.createModel(m);
                    this.push(model);
                    return model;
                });

        }

        update(m: ModelType | any) {
            if (!m) return Promise.reject(new ReferenceError("no input"));

            if ((m instanceof Model)) {
                m = m.toJSON()
            }

            if (!m.id) Promise.reject(new Error('missing id'));

            if (!isPlainObject(m)) Promise.reject(new TypeError("invalid input type"));

            return this.storage.update(m.id, m)
                .then(m => {
                    const model = this.createModel(m);
                    this.push(model);
                    return model;
                });

        }

    };
}