import { View, withTemplate, withElement, Constructor, IViewElement, BaseViewOptions, isFunction, result } from 'view';

export interface TemplateViewOptions<M> extends BaseViewOptions<HTMLElement> {
    template?: string | ((data: M) => string)
}

export class TemplateView<M = any> extends withTemplate<Constructor<View & IViewElement>, any>(withElement(View)) {
    model: M;

    options: TemplateViewOptions<M>;

    constructor(options: TemplateViewOptions<M> = {}) {
        super(options);
        if (options.template) {
            this.template = options.template;
        }
    }

    getTemplateData() {
        if (this.model && isFunction((this.model as any).toJSON)) {
            return (this.model as any).toJSON();
        }
        return result(this, 'model');
    }
}