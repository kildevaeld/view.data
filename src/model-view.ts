import { View, Constructor, triggerMethodOn, isString, isFunction } from 'view';
import { IModel } from './types';
import { isEventEmitter } from 'mixins.events'

export interface IModelView<M extends IModel> {
    model?: M;
    setModel(model?: M): this;
    modelEvents?: any;
}

export type ModelEventsMap = { [key: string]: (string | ((...args: any[]) => any))[] }

export function withModel<T extends Constructor<View>, M extends IModel>(Base: T): T & Constructor<IModelView<M>> {
    return class extends Base {
        private _model: M | undefined;
        modelEvents: ModelEventsMap;

        set model(model: M | undefined) {
            this.setModel(model);
        }

        get model(): M | undefined {
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