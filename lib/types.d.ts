export interface IModel {
    set<U>(key: PropertyKey, value: U, options?: any): this;
    get<U>(key: PropertyKey): U;
    has(key: PropertyKey): boolean;
    clear(): this;
    toJSON(): any;
}
export declare namespace MetaKeys {
    const Attributes: unique symbol;
}
export interface Destroyable {
    destroy(): void;
}
export declare function isDestroyable(a: any): a is Destroyable;
export interface ICollection<T> {
    length: number;
    item(index: number): T | undefined;
    push(...items: T[]): number;
    pop(): T | undefined;
}
export declare namespace ModelEvents {
    const Add = "add";
    const BeforeRemove = "before:remove";
    const Remove = "remove";
    const Clear = "clear";
    const BeforeSort = "before:sort";
    const Sort = "sort";
    const Change = "change";
    const Reset = "reset";
}
