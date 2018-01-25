"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("mixins.events");
class BaseObject {
}
exports.BaseObject = BaseObject;
class EventEmitter extends events.EventEmitter(BaseObject) {
}
exports.EventEmitter = EventEmitter;
