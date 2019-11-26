import {Carburetor} from "../Carburetor";
import {getUid} from "../Carburetor";
import {ITodo, IToDoClientAPI, ITodoList} from "./API/IToDoModels";
import {getDefaultTodos, MockToDoClientAPI} from "./API/MockToDoClientAPI";
import {someCarburetor} from "./SomeCarburetor";

export type TUpdateTodo = (data: ITodo) => void;
export type TDeleteTodo = (id: string) => void;

export class TodoCarburetor extends Carburetor<ITodoList> {
    constructor(protected api: IToDoClientAPI, data: ITodoList = getDefaultTodos()) {
        super(data);
    }

    public updateTodo: TUpdateTodo = (data: ITodo) => {
        this.data.items[data.id] = data;
        this.emitUpdate();
    };

    public loadData = () => {
        this.api.getTodoList().then(this.setData);
    };

    public createTodo = () => {
        const todo: ITodo = {
            id: getUid(),
            done: false,
            title: ''
        };

        this.data.items[todo.id] = todo;
        this.data.orderIds.unshift(todo.id);

        this.emitUpdate();
    };

    public deleteTodo: TDeleteTodo = (id: string) => {
        const {items} = this.data;

        if (id in items) {
            delete items[id];

            const filterId = (listId: string) => id !== listId;
            this.data.orderIds = this.data.orderIds.filter(filterId);
            this.emitUpdate();
        }
    };

    protected preEmmit = () => {
        this.countStats();
        this.sortItems();

        someCarburetor.updateData({
            emittedMessage: (new Date()).toISOString()
        });
    };

    protected countStats = () => {
        const {data} = this;
        const {items} = data;
        let doneCount = 0;

        const keys = Object.keys(items);

        keys.forEach(id => {
            const item = this.data.items[id];

            if (item.done) {
                doneCount++;
            }
        });

        data.doneCount = doneCount;
        data.activeCount = keys.length - doneCount;
    };

    protected sortItems = () => {
        const {data} = this;
        const {items} = data;

        data.orderIds.sort((idA: string, idB: string) => {
            const itemA = items[idA];
            const itemB = items[idB];

            if (itemA.done === itemB.done) {
                return 0;
            }

            return itemA.done ? 1 : -1;
        });
    };
}

export const todoCarburetor = new TodoCarburetor(new MockToDoClientAPI());
