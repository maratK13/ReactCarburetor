"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var getUid_1 = require("./Utils/getUid");
var AntiHookComponent = /** @class */ (function (_super) {
    __extends(AntiHookComponent, _super);
    function AntiHookComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.uid = getUid_1.getUid();
        _this.lastValues = {};
        _this.carburetors = {};
        _this.useEffects = function () {
        };
        // noinspection JSUnusedLocalSymbols
        _this.unUseEffects = function (prevProps) {
        };
        _this.useEffect = function (callBack, name, lastValue) {
            if (name in _this.lastValues) {
                if (_this.lastValues[name] === lastValue) {
                    return;
                }
            }
            _this.lastValues[name] = lastValue;
            callBack();
        };
        _this.forceUpdateNoop = function () {
            _this.forceUpdate(_this.noop);
        };
        _this.unsubscribeFromCarburetor = function (carburetorId) {
            if (carburetorId in _this.carburetors) {
                _this.carburetors[carburetorId].unsubscribe(_this.uid);
            }
        };
        _this.unsubscribeFromCarburetors = function () {
            Object.keys(_this.carburetors).forEach(_this.unsubscribeFromCarburetor);
        };
        _this.useCarburetor = function (carburetor) {
            var cuid = carburetor.getUID();
            carburetor.subscribe(_this.forceUpdateNoop, _this.uid);
            if (!(carburetor.getUID() in _this.carburetors)) {
                _this.carburetors[cuid] = carburetor;
            }
            return carburetor;
        };
        var render = _this.render && _this.render.bind(_this) || _this.noop;
        _this.render = function () {
            _this.unsubscribeFromCarburetors();
            return render();
        };
        var componentDidMount = _this.componentDidMount && _this.componentDidMount.bind(_this) || _this.noop;
        _this.componentDidMount = function () {
            _this.componentDidMountUseEffects();
            componentDidMount();
        };
        var componentDidUpdate = _this.componentDidUpdate && _this.componentDidUpdate.bind(_this) || _this.withProps;
        _this.componentDidUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.componentDidUpdateResetEffects(args[0]);
            componentDidUpdate.apply(void 0, args);
        };
        var componentWillUnmount = _this.componentWillUnmount && _this.componentWillUnmount.bind(_this) || _this.noop;
        _this.componentWillUnmount = function () {
            _this.componentWillUnmountUnUseEffects();
            componentWillUnmount();
        };
        return _this;
    }
    AntiHookComponent.prototype.noop = function () {
    };
    // noinspection JSUnusedLocalSymbols
    AntiHookComponent.prototype.withProps = function (prevProps) {
    };
    AntiHookComponent.prototype.componentDidMountUseEffects = function () {
        this.useEffects();
    };
    AntiHookComponent.prototype.componentWillUnmountUnUseEffects = function () {
        this.unUseEffects(this.props);
    };
    AntiHookComponent.prototype.componentDidUpdateResetEffects = function (prevProps) {
        this.unUseEffects(prevProps);
        this.useEffects();
    };
    return AntiHookComponent;
}(React.Component));
exports.AntiHookComponent = AntiHookComponent;
