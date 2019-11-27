import {Carburetor, IDict} from "../dist";

type TStringDict = IDict<string>;
type TTestDict = {
    d1?: IDict<string>;
    d2?: IDict<string>;
};

describe('Carburetor', () => {
    let data1: TStringDict = {};
    let data2: TStringDict = {};
    let testObj: TTestDict = {};

    let counter: number = 0;
    const inc = () => counter++;

    const TestCarburetor = class extends Carburetor<TTestDict> {};
    const testCarburetor = new TestCarburetor(testObj);

    const StringDictCarburetor = class extends Carburetor<TStringDict> {
        preEmmit = () => {
            testObj = {d1: this.data, d2: this.data};
            testCarburetor.setData(testObj);
        }
    };

    const stringDictCarburetor = new StringDictCarburetor(data1);

    test('ex 1', () => {
        expect(testCarburetor.getData()).toEqual(testObj);
        expect(testObj.d1).toEqual(undefined);
        expect(testObj.d2).toEqual(undefined);

        expect(stringDictCarburetor.getData()).toEqual(data1);
        stringDictCarburetor.setData(data2);
        expect(stringDictCarburetor.getData()).toEqual(data2);
        expect(testObj.d1).toEqual(data2);
        expect(testObj.d2).toEqual(data2);
    });

    const id1 = 'component-id1';

    const getUpdatePromise = (value: number) => new Promise(resolve => {
        expect(counter).toEqual(value);

        stringDictCarburetor.setData(data1);
        expect(stringDictCarburetor.getData()).toEqual(data1);
        expect(testObj.d1).toEqual(data1);
        expect(testObj.d2).toEqual(data1);

        stringDictCarburetor.setData(data2);
        expect(stringDictCarburetor.getData()).toEqual(data2);
        expect(testObj.d1).toEqual(data2);
        expect(testObj.d2).toEqual(data2);

        setTimeout(resolve, 100);

        expect(counter).toEqual(value);
    });

    test('ex 2', async () => {
        stringDictCarburetor.subscribe(inc, id1);
        testCarburetor.subscribe(inc, id1);

        await getUpdatePromise(0);

        expect(counter).toEqual(1);
    });

    test('ex 3', async () => {
        stringDictCarburetor.unsubscribe(id1);

        await getUpdatePromise(1);

        expect(counter).toEqual(2);
    });

    test('ex 3', async () => {
        testCarburetor.unsubscribe(id1);

        await getUpdatePromise(2);

        expect(counter).toEqual(2);
    });
});
