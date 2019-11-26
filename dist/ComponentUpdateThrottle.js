"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentUpdateThrottle = /** @class */ (function () {
    function ComponentUpdateThrottle() {
        var _this = this;
        this.updateTimeout = 40;
        this.timeout = 0;
        this.updaters = new Map();
        this.addUpdater = function (componentUID, callback) {
            _this.updaters.set(componentUID, callback);
            _this.setupTimeout();
        };
        this.clearUpdater = function (componentUID) {
            _this.updaters.delete(componentUID);
        };
        this.setupTimeout = function () {
            if (!_this.timeout) {
                _this.timeout = setTimeout(_this.letsUpdate, _this.updateTimeout);
            }
        };
        this.clearTimeout = function () {
            if (_this.timeout) {
                clearTimeout(_this.timeout);
            }
            _this.timeout = 0;
        };
        this.runUpdater = function (updater) {
            updater();
        };
        this.letsUpdate = function () {
            _this.clearTimeout();
            var mapItr = _this.updaters.values();
            Array.from(mapItr).forEach(_this.runUpdater);
            _this.updaters.clear();
        };
    }
    return ComponentUpdateThrottle;
}());
exports.ComponentUpdateThrottle = ComponentUpdateThrottle;
exports.componentUpdateCompressor = new ComponentUpdateThrottle();
