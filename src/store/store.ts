import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { localStorageMiddleware } from "./middleware";
import { State, Actions, TodoAction, SetCatPicAction } from "./store.types";

const initialState: State = {
  todos: JSON.parse(localStorage.getItem("todos") ?? "[]"),
};

const todosReducer = (
  state = initialState,
  action: TodoAction | SetCatPicAction,
): State => {
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
    case Actions.SET_CAT_PIC:
      return {
        ...state,
        catPic: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(
  todosReducer,
  applyMiddleware(thunk, localStorageMiddleware),
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
