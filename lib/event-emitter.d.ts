import { IEventEmitter } from 'mixins.events';
export declare class BaseObject {
}
declare const EventEmitter_base: (new (...args: any[]) => IEventEmitter) & typeof BaseObject;
export declare class EventEmitter extends EventEmitter_base implements IEventEmitter {
}
