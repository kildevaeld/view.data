"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("view");
class TemplateView extends view_1.withTemplate(view_1.withElement(view_1.View)) {
    constructor(options = {}) {
        super(options);
        if (options.template) {
            this.template = options.template;
        }
    }
    getTemplateData() {
        if (this.model && view_1.isFunction(this.model.toJSON)) {
            return this.model.toJSON();
        }
        return view_1.result(this, 'model');
    }
}
exports.TemplateView = TemplateView;
