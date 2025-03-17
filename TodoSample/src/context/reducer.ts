import { Action, AppState } from "../interfaces/types";
import { ACTIONS } from "./actions";

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload };
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        todo: "",
        isEdit: false,
      };
    case ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === state.selectedId ? action.payload : item
        ),
        todo: "",
        isEdit: false,
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.SET_MODAL_DATA:
      return { ...state, modalDatas: action.payload };
    case ACTIONS.SET_TODO_INPUT:
      return { ...state, todo: action.payload };
    case ACTIONS.RESET_INPUT:
      return { ...state, todo: "", isEdit: false, selectedId: 0 };
    case ACTIONS.SET_SELECTED_ID:
      return { ...state, isEdit: true, selectedId: action.payload };
    default:
      return state;
  }
};
