import {Carburetor} from "../Carburetor";

export interface ISomeCarburetor {
    renderCount: number;
    emittedMessage: string;
}

export const getInitialSomeData = (): ISomeCarburetor => {
    return {
        renderCount: 1,
        emittedMessage: ''
    };
};

export class SomeCarburetor extends Carburetor<ISomeCarburetor> {
    constructor(protected data: ISomeCarburetor = getInitialSomeData()) {
        super(data);
    }

    public printRenderCount = (): number => {
        const returnValue = this.data.renderCount;

        this.data.renderCount++;

        return returnValue;
    };

    public updateData = (data: Partial<ISomeCarburetor>): ISomeCarburetor => {
        const {renderCount, ...orig} = this.data;

        this.data = {
            ...orig,
            renderCount,
            ...data
        };

        this.emitUpdate();

        return this.data;
    }
}

export const someCarburetor = new SomeCarburetor();
