"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("@viewjs/view");
const utils_1 = require("@viewjs/utils");
class TemplateView extends view_1.withTemplate(view_1.withElement(view_1.View)) {
    constructor(options = {}) {
        super(options);
        if (options.template) {
            this.template = options.template;
        }
    }
    getTemplateData() {
        const model = utils_1.getOption('model', [this.options, this], true);
        if (model && utils_1.isFunction(model.toJSON)) {
            return model.toJSON();
        }
        return model;
    }
}
exports.TemplateView = TemplateView;
