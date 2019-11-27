import * as React from 'react';
import {shallow} from 'enzyme';
import {AntiHookComponent, Carburetor} from "../dist";

class TestCarburetor extends Carburetor<number> {
    protected renderCount: number = 0;

    printRenderCount = (): number => {
        this.renderCount++;

        return this.renderCount;
    };

    getRenderCount = (): number => {
        return this.renderCount;
    };

    public inc = () => {
        this.data++;

        this.emitUpdate();
    }
}

const testCarburetor = new TestCarburetor(0);

interface IProps {
    a: number;
    b: number;
}

let countUseEffects: number = 0;
let countUnUseEffects: number = 0;
let countUseEffectA: number = 0;
let countUseEffectB: number = 0;


class TestComponent extends AntiHookComponent<IProps> {
    useEffectA = () => {
        countUseEffectA++;
    };

    useEffectB = () => {
        countUseEffectB++;
    };

    useEffects = () => {
        const {a, b} = this.props;

        this.useEffect(this.useEffectA, 'useEffectA', a);
        this.useEffect(this.useEffectB, 'useEffectB', b);

        countUseEffects++;
    };

    unUseEffects = () => {
        countUnUseEffects++;
    };

    handleClickInc = () => {
        testCarburetor.inc();
    };

    render() {
        this.useCarburetor(testCarburetor);
        const value = testCarburetor.getData();

        return <div>
            <div className="render">{value}</div>
            <div className="value">{value}</div>
            <button className="btn-inc" onClick={this.handleClickInc}>inc</button>
        </div>;
    }
}

describe('<AntiHookComponent />', () => {
    const component = shallow(<TestComponent a={0} b={0} />);
    let value = component.find('.value');
    const btn = component.find('.btn-inc');

    test('ex 1', async () => {
        expect(value.text()).toEqual('0');

        const testClick = async (counter: number) => {
            btn.simulate('click');

            expect(value.text()).toEqual(counter.toString());

            await new Promise(resolve => setTimeout(resolve, 100));

            value = component.find('.value');
            expect(value.text()).toEqual((counter + 1).toString());
        };

        await testClick(0);
        await testClick(1);
        await testClick(2);
    });



    test('ex 1', async () => {
        countUseEffects = 1;
        countUnUseEffects = 0;
        countUseEffectA = 1;
        countUseEffectB = 1;

        component.setProps({ value: false });

        expect(countUseEffects).toEqual(2);
        expect(countUseEffectA).toEqual(1);
        expect(countUseEffectB).toEqual(1);
        expect(countUnUseEffects).toEqual(1);

        component.setProps({ a: 0 });

        expect(countUseEffects).toEqual(3);
        expect(countUseEffectA).toEqual(1);
        expect(countUseEffectB).toEqual(1);
        expect(countUnUseEffects).toEqual(2);

        component.setProps({ a: 1 });

        expect(countUseEffects).toEqual(4);
        expect(countUseEffectA).toEqual(2);
        expect(countUseEffectB).toEqual(1);
        expect(countUnUseEffects).toEqual(3);

        component.setProps({ b: 1 });

        expect(countUseEffects).toEqual(5);
        expect(countUseEffectA).toEqual(2);
        expect(countUseEffectB).toEqual(2);
        expect(countUnUseEffects).toEqual(4);

        testCarburetor.inc();

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(countUseEffects).toEqual(6);
        expect(countUseEffectA).toEqual(2);
        expect(countUseEffectB).toEqual(2);
        expect(countUnUseEffects).toEqual(5);
    });
});
