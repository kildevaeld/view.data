"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("view");
const mixins_events_1 = require("mixins.events");
function withModel(Base) {
    return class extends Base {
        set model(model) {
            this.setModel(model);
        }
        get model() {
            return this._model;
        }
        setModel(model) {
            view_1.triggerMethodOn(this, 'before:set:model');
            if (this._model) {
                this._undelegateModelEvents(this._model);
            }
            this._model = model;
            if (model)
                this._delegateModelEvents(model);
            view_1.triggerMethodOn(this, 'set:model');
        }
        _undelegateModelEvents(model) {
            if (!this.modelEvents || !model || !mixins_events_1.isEventEmitter(model)) {
                return;
            }
            for (let key in this.modelEvents) {
                this.modelEvents[key].forEach(m => {
                    if (view_1.isString(m)) {
                        if (view_1.isFunction(this[m])) {
                            m = this[m];
                        }
                        else {
                            throw new Error('not a function');
                        }
                    }
                    model.off(key, m, this);
                });
            }
        }
        _delegateModelEvents(model) {
            if (!this.modelEvents || !this.model || !mixins_events_1.isEventEmitter(this.model)) {
                return;
            }
            for (let key in this.modelEvents) {
                const model = this.model;
                this.modelEvents[key].forEach(m => {
                    if (view_1.isString(m)) {
                        if (view_1.isFunction(this[m])) {
                            m = this[m];
                        }
                        else {
                            throw new Error('not a function');
                        }
                    }
                    model.on(key, m, this);
                });
            }
        }
        destroy() {
            if (this.model)
                this._undelegateModelEvents(this.model);
            return super.destroy();
        }
    };
}
exports.withModel = withModel;
