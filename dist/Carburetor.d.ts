import { ICarburetor, IDict } from "./Models";
export declare class Carburetor<T extends {}> implements ICarburetor<T> {
    protected data: T;
    protected subscribers: IDict<Function>;
    protected uid: string;
    constructor(data: T);
    getUID: () => string;
    getData: () => T;
    setData: (data: T) => T;
    subscribe: (callback: Function, customId?: string | undefined) => string;
    unsubscribe: (id: string) => void;
    protected preEmmit: () => void;
    protected emmitByKey: (key: string) => void;
    protected emitUpdate: () => void;
}
