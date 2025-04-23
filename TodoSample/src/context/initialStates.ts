import { modalType } from "../enums/modalEnums";

export const initialState = {
  todos: [],
  setTodos: () => {},
  todo: "",
  setTodo: () => {},
  isEdit: false,
  setIsEdit: () => {},
  selectedId: 0,
  setSelectedId: () => {},
  modalDatas: { showModal: modalType.hide, modalMessage: "", selectedId: 0 },
  setModalDatas: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  isSpin: false,
  setIsSpin: () => {},
};
