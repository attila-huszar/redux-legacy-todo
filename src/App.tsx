import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addTodo, removeTodo, toggleTodo } from "./store/store";
import "./App.css";

const App = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={() => dispatch(addTodo(text))} type="button">
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li
            className="todo"
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}>
            {todo.text} {todo.completed ? "✔️" : "🕘"}
            <button
              onClick={e => {
                e.stopPropagation();
                dispatch(removeTodo(todo.id));
              }}
              type="button">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
