export interface IDict<T> {
    [id: string]: T;
}

export interface ICarburetor<T> {
    getUID: () => string;
    getData: () => T;
    setData: (data: T) => T;
    subscribe: (callback: Function, customId?: string) => string;
    unsubscribe: (id: string) => void;
}

export interface IComponentUpdateThrottle {
    addUpdater: (componentUID: string, callback: Function) => void;
    clearUpdater: (componentUID: string) => void;
}

export type Partial<T> = { [P in keyof T]?: T[P]; };
