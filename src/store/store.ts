import { createStore, applyMiddleware } from "redux";
import { thunk, ThunkAction } from "redux-thunk";
import { nanoid } from "nanoid";
import {
  State,
  Actions,
  RemoveTodoAction,
  AddTodoAction,
  ToggleTodoAction,
  TodoAction,
  SetCatPicAction,
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

export const fetchCatPic =
  (): ThunkAction<void, RootState, unknown, SetCatPicAction> =>
  async dispatch => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search",
      );
      const data = await response.json();
      const catImageUrl: string | undefined = data[0]?.url;

      if (catImageUrl) {
        dispatch({ type: Actions.SET_CAT_PIC, payload: catImageUrl });
      }
    } catch (error) {
      console.error("Failed to fetch cat picture:", error);
    }
  };

export const store = createStore(todosReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
