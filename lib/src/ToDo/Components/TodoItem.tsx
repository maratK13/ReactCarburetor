import * as React from "react";
import {ITodo} from "../API/IToDoModels";
import {TDeleteTodo, TUpdateTodo} from "../TodoCarburetor";

interface ITodoItemProps {
    todo: ITodo;
    deleteTodo: TDeleteTodo;
    updateTodo: TUpdateTodo;
}

export class TodoItem extends React.Component<ITodoItemProps> {
    public handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {todo, updateTodo} = this.props;

        updateTodo({...todo, title: event.target.value});
    };

    public handleChangeDone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {todo, updateTodo} = this.props;

        updateTodo({...todo, done: event.target.checked});
    };

    public deleteTodo = () => {
        const {todo, deleteTodo} = this.props;

        deleteTodo(todo.id);
    };

    public render() {
        const {todo} = this.props;
        const containerClass = 'todo-container' + (todo.done && ' todo-done' || '');

        return (
            <div className={containerClass}>
                <div className="column-first">
                    <label className="checkbox-container">
                        <input type="checkbox" checked={todo.done} onChange={this.handleChangeDone}/>
                        <span className="checkbox-mark"/>
                    </label>
                </div>
                <div className="column-title">
                    <input
                        className="form-control"
                        value={todo.title}
                        readOnly={todo.done}
                        onChange={this.handleChangeTitle}
                    />
                </div>
                <div className="column-del">
                    <button
                        className="i-btn-close btn btn-danger"
                        onClick={this.deleteTodo}
                    />
                </div>
            </div>
        );
    }
}
