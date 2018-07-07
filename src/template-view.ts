import {
    View, withTemplate, withElement,
    IViewElement, BaseViewOptions, IViewTemplate
} from '@viewjs/view';
import { isFunction, Constructor, getOption } from '@viewjs/utils';

export interface TemplateViewOptions<M> extends BaseViewOptions<HTMLElement> {
    template?: string | ((data: M) => string);
    model?: M
}


export class TemplateView<M = any> extends withTemplate<Constructor<View & IViewElement>, any>(withElement(View)) implements IViewTemplate<M> {

    model: M;

    options: TemplateViewOptions<M>;

    constructor(options: TemplateViewOptions<M> = {}) {
        super(options);
        if (options.template) {
            this.template = options.template;
        }
    }

    getTemplateData() {
        const model = getOption<M>('model', [this.options, this], true)
        if (model && isFunction((model as any).toJSON)) {
            return (model as any).toJSON();
        }
        return model;
    }
}