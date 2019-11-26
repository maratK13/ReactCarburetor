import {componentUpdateCompressor} from "./ComponentUpdateThrottle";
import {ICarburetor, IDict} from "./Models";
import {getUid} from "./Utils/getUid";

export class Carburetor<T extends {}> implements ICarburetor<T> {
    protected subscribers: IDict<Function> = {};
    protected uid: string = getUid();

    constructor(protected data: T) {
    }

    public getUID = (): string => {
        return this.uid;
    };

    public getData = (): T => {
        return this.data;
    };

    public setData = (data: T): T => {
        this.data = data;

        this.emitUpdate();

        return data;
    };

    public subscribe = (callback: Function, customId?: string): string => {
        const id = customId || getUid();

        this.subscribers[id] = callback;

        return id;
    };

    public unsubscribe = (id: string) => {
        if (id in this.subscribers) {
            componentUpdateCompressor.clearUpdater(id);
            delete this.subscribers[id];
        }
    };

    protected preEmmit = () => {

    };

    protected emmitByKey = (key: string) => {
        if (key in this.subscribers) {
            const subscriber = this.subscribers[key];

            if (subscriber) {
                componentUpdateCompressor.addUpdater(key, subscriber);
            }
        }
    };

    protected emitUpdate = () => {
        this.preEmmit();
        Object.keys(this.subscribers).forEach(this.emmitByKey);
    };
}
