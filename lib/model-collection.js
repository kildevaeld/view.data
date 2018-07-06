"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_collection_1 = require("./array-collection");
const model_1 = require("./model");
const utils_1 = require("@viewjs/utils");
class ModelCollection extends array_collection_1.ArrayCollection {
    constructor() {
        super(...arguments);
        this.Model = model_1.Model;
    }
    createModel(o) {
        const model = utils_1.Invoker.get(this.Model);
        if (o) {
            for (let key in o) {
                model.set(key, o[key]);
            }
        }
        return model;
    }
    push(m, trigger = true) {
        if (!(m instanceof this.Model)) {
            m = this.createModel(m);
        }
        return super.push(m, trigger);
    }
}
exports.ModelCollection = ModelCollection;
