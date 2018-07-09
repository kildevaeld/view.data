"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
function _event(event, property, target, prop, desc, targetKey) {
    if (!desc)
        throw new Error('no description');
    if (typeof desc.value !== 'function') {
        throw new TypeError('must be a function');
    }
    const key = event + (property ? ':' + property : '');
    if (target[targetKey] && utils_1.has(target[targetKey], key)) {
        let old = target[targetKey][key];
        if (!Array.isArray(old))
            old = [old];
        old.push(prop);
        target[targetKey][key] = old;
    }
    else {
        target[targetKey] = utils_1.extend(target[targetKey] || {}, {
            [key]: [prop]
        });
    }
}
var collection;
(function (collection) {
    function event(event, property) {
        return function (target, prop, desc) {
            return _event(event, property, target, prop, desc, "collectionEvents");
        };
    }
    collection.event = event;
    collection.add = event("add");
    collection.remove = event("remove");
})(collection = exports.collection || (exports.collection = {}));
