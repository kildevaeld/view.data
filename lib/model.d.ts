import { IModel } from './types';
import { EventEmitter } from '@viewjs/events';
export interface ModelSetOptions {
    silent?: boolean;
}
export declare class Model extends EventEmitter implements IModel {
    [key: string]: any;
    constructor();
    set<U>(key: string | number, value: U, options?: ModelSetOptions): this;
    get<U>(key: string | number): U;
    has(key: string | number): boolean;
    clear(): this;
    toJSON(_?: boolean): any;
}
