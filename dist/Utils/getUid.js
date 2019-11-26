"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUid = (function () {
    var uid = 0;
    return function () {
        uid++;
        return 'carburetor-uid-' + uid;
    };
})();
