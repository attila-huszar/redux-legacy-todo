export enum Actions {
  ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
}

export interface AddTodoAction {
  type: Actions.ADD_TODO;
  payload: Todo;
}

export interface RemoveTodoAction {
  type: Actions.REMOVE_TODO;
  payload: Todo["id"];
}

export interface ToggleTodoAction {
  type: Actions.TOGGLE_TODO;
  payload: Todo["id"];
}

export type TodoAction = AddTodoAction | RemoveTodoAction | ToggleTodoAction;
