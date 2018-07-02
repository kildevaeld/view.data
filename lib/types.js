"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("@viewjs/view");
var MetaKeys;
(function (MetaKeys) {
    MetaKeys.Attributes = Symbol("attributes");
})(MetaKeys = exports.MetaKeys || (exports.MetaKeys = {}));
function isDestroyable(a) {
    return a && view_1.isFunction(a.destroy);
}
exports.isDestroyable = isDestroyable;
var ModelEvents;
(function (ModelEvents) {
    ModelEvents.Add = "add";
    ModelEvents.BeforeRemove = "before:remove";
    ModelEvents.Remove = "remove";
    ModelEvents.Clear = "clear";
    ModelEvents.BeforeSort = "before:sort";
    ModelEvents.Sort = "sort";
    ModelEvents.Change = "change";
    ModelEvents.Reset = "reset";
})(ModelEvents = exports.ModelEvents || (exports.ModelEvents = {}));
