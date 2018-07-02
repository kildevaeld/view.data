"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
const events_1 = require("@viewjs/events");
function withModel(Base) {
    return class extends Base {
        set model(model) {
            this.setModel(model);
        }
        get model() {
            return this._model;
        }
        setModel(model) {
            utils_1.triggerMethodOn(this, 'before:set:model');
            if (this._model) {
                this._undelegateModelEvents(this._model);
            }
            this._model = model;
            if (model)
                this._delegateModelEvents(model);
            utils_1.triggerMethodOn(this, 'set:model');
            return this;
        }
        _undelegateModelEvents(model) {
            if (!this.modelEvents || !model || !events_1.isEventEmitter(model)) {
                return;
            }
            for (let key in this.modelEvents) {
                this.modelEvents[key].forEach(m => {
                    if (utils_1.isString(m)) {
                        if (utils_1.isFunction(this[m])) {
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
            if (!this.modelEvents || !model || !events_1.isEventEmitter(model)) {
                return;
            }
            for (let key in this.modelEvents) {
                this.modelEvents[key].forEach(m => {
                    if (utils_1.isString(m)) {
                        if (utils_1.isFunction(this[m])) {
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
