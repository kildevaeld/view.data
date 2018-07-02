import { isFunction } from '@viewjs/utils';

export interface IModel {
    set<U>(key: PropertyKey, value: U, options?: any): this;
    get<U>(key: PropertyKey): U;
    has(key: PropertyKey): boolean;
    clear(): this;
    toJSON(): any;
}

export namespace MetaKeys {
    export const Attributes = Symbol("attributes");
}

export interface Destroyable {
    destroy(): void;
}

export function isDestroyable(a: any): a is Destroyable {
    return a && isFunction(a.destroy);
}

export interface ICollection<T> {
    length: number;
    item(index: number): T | undefined;
    push(items: T): number;
    pop(): T | undefined;
    //indexOf(item: T): number;
}

export namespace ModelEvents {
    export const Add = "add";
    export const BeforeRemove = "before:remove";
    export const Remove = "remove";
    export const Clear = "clear";
    export const BeforeSort = "before:sort";
    export const Sort = "sort";
    export const Change = "change";
    export const Reset = "reset";
}