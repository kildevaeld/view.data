import { View } from '@viewjs/view';
import { isString, isFunction, triggerMethodOn, Constructor, Invoker } from '@viewjs/utils';
import { IModel } from './types';
import { isEventEmitter } from '@viewjs/events'

export interface IModelView<M extends IModel> {
    model?: M;
    setModel(model?: M): this;
    modelEvents?: ModelEventsMap;
}

export type ModelEventsMap = {
    [key: string]: (string | ((...args: any[]) => any))[];
}


export function withModel<T extends Constructor<View>, M extends IModel>(Base: T, Model?: Constructor<M>): T & Constructor<IModelView<M>> {
    return class extends Base {
        Model = Model;
        private _model: M | undefined;
        modelEvents: ModelEventsMap;

        set model(model: M | undefined) {
            this.setModel(model);
        }

        get model(): M | undefined {
            if (!this._model && this.Model) {
                let model: M | undefined = void 0;
                try {
                    model = Invoker.get(this.Model as any) as any;
                    this.setModel(model as any);
                } catch (e) { }


            }
            return this._model;
        }

        setModel(model?: M) {
            triggerMethodOn(this, 'before:set:model');
            if (this._model) {
                this._undelegateModelEvents(this._model)
            }
            this._model = model;

            if (model)
                this._delegateModelEvents(model);

            triggerMethodOn(this, 'set:model');
            return this;
        }

        private _undelegateModelEvents(model: M) {

            if (!this.modelEvents || !model || !isEventEmitter(model)) {
                return;
            }
            for (let key in this.modelEvents) {

                this.modelEvents[key].forEach(m => {
                    if (isString(m)) {
                        if (isFunction((this as any)[m])) {
                            m = (this as any)[m];
                        } else {
                            throw new Error('not a function');
                        }
                    }
                    model!.off(key, m as any, this);
                });

            }
        }

        private _delegateModelEvents(model: M) {
            if (!this.modelEvents || !model || !isEventEmitter(model)) {
                return;
            }

            for (let key in this.modelEvents) {
                this.modelEvents[key].forEach(m => {
                    if (isString(m)) {
                        if (isFunction((this as any)[m])) {
                            m = (this as any)[m];
                        } else {
                            throw new Error('not a function');
                        }
                    }
                    model!.on(key, m as any, this);
                });
            }
        }

        destroy() {
            if (this.model)
                this._undelegateModelEvents(this.model);
            return super.destroy();
        }

    }

}