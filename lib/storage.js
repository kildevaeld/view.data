"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const utils_1 = require("@viewjs/utils");
function withStorage(Base, Storage) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.storage = Storage ? utils_1.Invoker.get(Storage) : void 0;
        }
        create(m) {
            if (!m)
                return Promise.reject(new ReferenceError("no input"));
            if ((m instanceof model_1.Model)) {
                m = m.toJSON();
            }
            if (m.id)
                Promise.reject(new Error('not new'));
            if (!utils_1.isPlainObject(m))
                Promise.reject(new TypeError("invalid input type"));
            return this.storage.create(m)
                .then(m => {
                const model = this.createModel(m);
                this.push(model);
                return model;
            });
        }
        update(m) {
            if (!m)
                return Promise.reject(new ReferenceError("no input"));
            if ((m instanceof model_1.Model)) {
                m = m.toJSON();
            }
            if (!m.id)
                Promise.reject(new Error('missing id'));
            if (!utils_1.isPlainObject(m))
                Promise.reject(new TypeError("invalid input type"));
            return this.storage.update(m.id, m)
                .then(m => {
                const model = this.createModel(m);
                this.push(model);
                return model;
            });
        }
    };
}
exports.withStorage = withStorage;
