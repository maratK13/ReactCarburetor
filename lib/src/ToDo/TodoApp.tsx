import * as React from "react";
import {AntiHookComponent} from "../Carburetor";
import {TodoItem} from "./Components/TodoItem";
import {someCarburetor} from "./SomeCarburetor";
import {TodoCarburetor} from "./TodoCarburetor";

interface ITodoProps {
    carburetor: TodoCarburetor;
}

export class TodoApp extends AntiHookComponent<ITodoProps> {
    public useEffects = () => {
        this.useEffect(this.props.carburetor.loadData, "loadData", 1);
    };

    // noinspection JSUnusedLocalSymbols
    public unUseEffects = (prevProps: ITodoProps) => {
        // ...
    };

    public renderTodoItem = (id: string) => {
        const {carburetor} = this.props;
        const {items} = carburetor.getData();

        if (id in items) {
            const todo = items[id];

            return <div key={todo.id}>
                <TodoItem
                    todo={todo}
                    deleteTodo={carburetor.deleteTodo}
                    updateTodo={carburetor.updateTodo}
                />
            </div>;
        }

        return null;
    };

    public renderTodos = () => {
        const {carburetor} = this.props;
        const {orderIds} = carburetor.getData();

        return orderIds.map(this.renderTodoItem);
    };

    public render() {
        this.useCarburetor(this.props.carburetor);
        this.useCarburetor(someCarburetor);

        const {carburetor} = this.props;
        const {activeCount, doneCount} = carburetor.getData();

        return (
            <div>
                <div className="todo-head">
                    <div className="todo-add-block">
                        <button className="btn btn-outline-primary btn-add" onClick={carburetor.createTodo} />
                    </div>
                    <div className="todo-title">
                        Todo list
                    </div>
                    <div className="todo-title-tail" />
                </div>

                <div className="todo-lists-container">
                    {this.renderTodos()}
                </div>
                <div>
                    active: {activeCount}
                </div>
                <div>
                    done: {doneCount}
                </div>
                <div>
                    renderCount: {someCarburetor.printRenderCount()}
                </div>
                <div>
                    emittedMessage: {someCarburetor.getData().emittedMessage}
                </div>
            </div>
        );
    }
}
