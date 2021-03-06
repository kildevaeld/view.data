import { IModel } from './types';
import { EventEmitter } from './event-emitter';
export interface ModelSetOptions {
    silent?: boolean;
}
export declare class Model extends EventEmitter implements IModel {
    [key: string]: any;
    constructor();
    set<U>(key: PropertyKey, value: U, options?: ModelSetOptions): this;
    get<U>(key: PropertyKey): U;
    has(key: PropertyKey): boolean;
    clear(): this;
    toJSON(_?: boolean): any;
}
