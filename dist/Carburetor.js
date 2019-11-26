"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentUpdateThrottle_1 = require("./ComponentUpdateThrottle");
var getUid_1 = require("./Utils/getUid");
var Carburetor = /** @class */ (function () {
    function Carburetor(data) {
        var _this = this;
        this.data = data;
        this.subscribers = {};
        this.uid = getUid_1.getUid();
        this.getUID = function () {
            return _this.uid;
        };
        this.getData = function () {
            return _this.data;
        };
        this.setData = function (data) {
            _this.data = data;
            _this.emitUpdate();
            return data;
        };
        this.subscribe = function (callback, customId) {
            var id = customId || getUid_1.getUid();
            _this.subscribers[id] = callback;
            return id;
        };
        this.unsubscribe = function (id) {
            if (id in _this.subscribers) {
                ComponentUpdateThrottle_1.componentUpdateCompressor.clearUpdater(id);
                delete _this.subscribers[id];
            }
        };
        this.preEmmit = function () {
        };
        this.emmitByKey = function (key) {
            if (key in _this.subscribers) {
                var subscriber = _this.subscribers[key];
                if (subscriber) {
                    ComponentUpdateThrottle_1.componentUpdateCompressor.addUpdater(key, subscriber);
                }
            }
        };
        this.emitUpdate = function () {
            _this.preEmmit();
            Object.keys(_this.subscribers).forEach(_this.emmitByKey);
        };
    }
    return Carburetor;
}());
exports.Carburetor = Carburetor;
