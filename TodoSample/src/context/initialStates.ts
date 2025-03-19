import { modalType } from "../enums/modalEnums";

export const initialState = {
  todos: [],
  isLoading: false,
  todo: "",
  isEdit: false,
  selectedId: 0,
  modalDatas: {
    showModal: modalType.hide,
    modalMessage: "",
    selectedId: 0,
  },
};
