import { Dispatch, Middleware } from "redux";
import { Actions, State, TodoAction } from "./store.types";

export const localStorageMiddleware: Middleware<
  void,
  State,
  Dispatch<TodoAction>
> = store => next => action => {
  const result = next(action);
  const actionType = (action as TodoAction).type;

  if (
    actionType === Actions.ADD_TODO ||
    actionType === Actions.REMOVE_TODO ||
    actionType === Actions.TOGGLE_TODO
  ) {
    const { todos } = store.getState();
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  return result;
};
