import {IComponentUpdateThrottle} from "./Models";

export class ComponentUpdateThrottle implements IComponentUpdateThrottle {
    protected updateTimeout: number = 40;
    protected timeout: any | number = 0;
    protected updaters: Map<string, Function> = new Map<string, Function>();

    public addUpdater = (componentUID: string, callback: Function) => {
        this.updaters.set(componentUID, callback);
        this.setupTimeout();
    };

    public clearUpdater = (componentUID: string) => {
        this.updaters.delete(componentUID);
    };

    protected setupTimeout = () => {
        if (!this.timeout) {
            this.timeout = setTimeout(this.letsUpdate, this.updateTimeout);
        }
    };

    protected clearTimeout = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = 0;
    };

    protected runUpdater = (updater: Function) => {
        updater();
    };

    protected letsUpdate = () => {
        this.clearTimeout();
        const mapItr = this.updaters.values();

        Array.from(mapItr).forEach(this.runUpdater);

        this.updaters.clear();
    };
}

export const componentUpdateThrottle = new ComponentUpdateThrottle();
