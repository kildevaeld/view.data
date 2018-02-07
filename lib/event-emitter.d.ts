import * as events from 'mixins.events';
import { IEventEmitter } from 'mixins.events';
export declare class BaseObject {
}
declare const EventEmitter_base: events.Constructor<events.IEventEmitter> & typeof BaseObject;
export declare class EventEmitter extends EventEmitter_base implements IEventEmitter {
}
