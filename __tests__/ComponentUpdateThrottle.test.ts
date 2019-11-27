import {ComponentUpdateThrottle} from "../dist";

describe('ComponentUpdateThrottle', () => {
    let values: string[] = [];

    const addA = () => values.push('a');
    const addB = () => values.push('b');
    const addC = () => values.push('c');

    const componentUpdateThrottle = new ComponentUpdateThrottle();

    test('ex 1', async () => {
        await new Promise(resolve => {
            values = [];
            componentUpdateThrottle.addUpdater('1', addA);
            componentUpdateThrottle.addUpdater('2', addB);
            componentUpdateThrottle.addUpdater('1', addC);
            expect(values).toEqual([]);

            setTimeout(resolve, 100);
        });

        expect(values).toEqual(['c', 'b']);
    });

    test('ex 2', async () => {
        values = [];
        await new Promise(resolve => {
            componentUpdateThrottle.addUpdater('1', addA);
            componentUpdateThrottle.addUpdater('2', addB);
            componentUpdateThrottle.addUpdater('3', addC);
            expect(values).toEqual([]);

            setTimeout(resolve, 100);
        });

        expect(values).toEqual(['a', 'b', 'c']);
    });
});
