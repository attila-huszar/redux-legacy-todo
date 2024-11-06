import { ThunkAction } from "redux-thunk";
import { nanoid } from "nanoid";
import {
  Actions,
  RemoveTodoAction,
  AddTodoAction,
  ToggleTodoAction,
  SetCatPicAction,
} from "./store.types";
import { RootState } from "./store";

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
