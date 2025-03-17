import { modalType } from "../enums/modalEnums";

export const initialState = {
  todos: [],
  todo: "",
  isEdit: false,
  selectedId: 0,
  modalDatas: {
    showModal: modalType.hide,
    modalMessage: "",
    selectedId: 0,
  },
};
