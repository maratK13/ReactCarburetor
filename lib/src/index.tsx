import * as React from "react";
import {render} from "react-dom";
import './styles.scss';
import {TodoApp} from "./ToDo/TodoApp";
import {todoCarburetor} from "./ToDo/TodoCarburetor";

function App() {
    return (
        <div className="container app">
            <TodoApp carburetor={todoCarburetor}/>
        </div>
    );
}

const rootElement = document.getElementById("root");
render(<App/>, rootElement);
