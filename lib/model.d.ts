import { IModel } from './types';
import { EventEmitter } from '@viewjs/events';
export interface ModelSetOptions {
    silent?: boolean;
}
export declare class Model extends EventEmitter implements IModel {
    [key: string]: any;
    private _idAttribute;
    idAttribute: string;
    readonly id: {};
    constructor(attrs?: any);
    set<U>(key: string | number, value: U, options?: ModelSetOptions): this;
    get<U>(key: string | number): U | undefined;
    has(key: string | number): boolean;
    unset<U>(key: string | number): U | undefined;
    clear(): this;
    toJSON(): any;
}
