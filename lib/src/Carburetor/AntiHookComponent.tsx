import * as React from "react";
import {ICarburetor, IDict} from "./Models";
import {getUid} from "./Utils/getUid";

export class AntiHookComponent<P = {}, S = {}> extends React.Component<P, S> {
    protected uid: string = getUid();
    protected lastValues: IDict<any> = {};
    protected carburetors: IDict<ICarburetor<any>> = {};

    constructor(props: P) {
        super(props);

        const render = this.render && this.render.bind(this) || this.noop;
        this.render = () => {
            this.unsubscribeFromCarburetors();
            return render();
        };

        const componentDidMount = this.componentDidMount && this.componentDidMount.bind(this) || this.noop;
        this.componentDidMount = () => {
            this.componentDidMountUseEffects();
            componentDidMount();
        };

        const componentDidUpdate = this.componentDidUpdate && this.componentDidUpdate.bind(this) || this.withProps;
        this.componentDidUpdate = (...args) => {
            this.componentDidUpdateResetEffects(args[0]);
            componentDidUpdate(...args);
        };

        const componentWillUnmount = this.componentWillUnmount && this.componentWillUnmount.bind(this) || this.noop;
        this.componentWillUnmount = () => {
            this.componentWillUnmountUnUseEffects();
            componentWillUnmount();
        };
    }

    protected noop() {
    }

    // noinspection JSUnusedLocalSymbols
    protected withProps(prevProps: P) {
    }

    protected useEffects = () => {
    };

    // noinspection JSUnusedLocalSymbols
    protected unUseEffects = (prevProps: P) => {
    };

    protected useEffect = (callBack: Function, name: string, lastValue: any) => {
        if (name in this.lastValues) {
            if (this.lastValues[name] === lastValue) {
                return;
            }
        }

        this.lastValues[name] = lastValue;
        callBack();
    };

    protected forceUpdateNoop = (): void => {
        this.forceUpdate(this.noop);
    };

    protected componentDidMountUseEffects() {
        this.useEffects();
    }

    protected componentWillUnmountUnUseEffects() {
        this.unUseEffects(this.props);
    }

    protected componentDidUpdateResetEffects(prevProps: P) {
        this.unUseEffects(prevProps);
        this.useEffects();
    }

    protected unsubscribeFromCarburetor = (carburetorId: string) => {
        if (carburetorId in this.carburetors) {
            this.carburetors[carburetorId].unsubscribe(this.uid);
        }
    };

    protected unsubscribeFromCarburetors = () => {
        Object.keys(this.carburetors).forEach(this.unsubscribeFromCarburetor);
    };

    public useCarburetor = <T extends unknown>(carburetor: ICarburetor<T>): ICarburetor<T> => {
        const cuid = carburetor.getUID();
        carburetor.subscribe(this.forceUpdateNoop, this.uid);

        if (!(carburetor.getUID() in this.carburetors)) {
            this.carburetors[cuid] = carburetor;
        }

        return carburetor;
    };
}
