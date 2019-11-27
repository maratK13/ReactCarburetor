import { IComponentUpdateThrottle } from "./Models";
export declare class ComponentUpdateThrottle implements IComponentUpdateThrottle {
    protected updateTimeout: number;
    protected timeout: any | number;
    protected updaters: Map<string, Function>;
    addUpdater: (componentUID: string, callback: Function) => void;
    clearUpdater: (componentUID: string) => void;
    protected setupTimeout: () => void;
    protected clearTimeout: () => void;
    protected runUpdater: (updater: Function) => void;
    protected letsUpdate: () => void;
}
export declare const componentUpdateThrottle: ComponentUpdateThrottle;
