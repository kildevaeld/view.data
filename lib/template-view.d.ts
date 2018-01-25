import { View, Constructor, IViewElement, BaseViewOptions, IViewTemplate } from 'view';
export interface TemplateViewOptions<M> extends BaseViewOptions<HTMLElement> {
    template?: string | ((data: M) => string);
}
declare const TemplateView_base: Constructor<IViewTemplate<any>> & Constructor<View & IViewElement>;
export declare class TemplateView<M = any> extends TemplateView_base implements IViewTemplate<M> {
    model: M;
    options: TemplateViewOptions<M>;
    constructor(options?: TemplateViewOptions<M>);
    getTemplateData(): any;
}
