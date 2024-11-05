import { createStore } from "redux";
import { nanoid } from "nanoid";
import {
  State,
  Actions,
  RemoveTodoAction,
  AddTodoAction,
  ToggleTodoAction,
  TodoAction,
} from "./store.types";

export const addTodo = (text: string): AddTodoAction => ({
  type: Actions.ADD_TODO,
  payload: { id: nanoid(), text, completed: false },
});

export const removeTodo = (id: string): RemoveTodoAction => ({
  type: Actions.REMOVE_TODO,
  payload: id,
});

export const toggleTodo = (id: string): ToggleTodoAction => ({
  type: Actions.TOGGLE_TODO,
  payload: id,
});

const initialState: State = {
  todos: [],
};

const todosReducer = (state = initialState, action: TodoAction): State => {
  switch (action.type) {
    case Actions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case Actions.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case Actions.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    default:
      return state;
  }
};

export const store = createStore(todosReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
