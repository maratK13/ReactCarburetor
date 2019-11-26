import * as React from "react";
import { ICarburetor, IDict } from "./Models";
export declare class AntiHookComponent<P = {}, S = {}> extends React.Component<P, S> {
    protected uid: string;
    protected lastValues: IDict<any>;
    protected carburetors: IDict<ICarburetor<any>>;
    constructor(props: P);
    protected noop(): void;
    protected withProps(prevProps: P): void;
    protected useEffects: () => void;
    protected unUseEffects: (prevProps: P) => void;
    protected useEffect: (callBack: Function, name: string, lastValue: any) => void;
    protected forceUpdateNoop: () => void;
    protected componentDidMountUseEffects(): void;
    protected componentWillUnmountUnUseEffects(): void;
    protected componentDidUpdateResetEffects(prevProps: P): void;
    protected unsubscribeFromCarburetor: (carburetorId: string) => void;
    protected unsubscribeFromCarburetors: () => void;
    useCarburetor: <T extends unknown>(carburetor: ICarburetor<T>) => ICarburetor<T>;
}
