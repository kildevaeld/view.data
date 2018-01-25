import * as events from 'mixins.events';
import { IEventEmitter } from 'mixins.events';

export class BaseObject {

}

export class EventEmitter extends events.EventEmitter(BaseObject) implements IEventEmitter { }