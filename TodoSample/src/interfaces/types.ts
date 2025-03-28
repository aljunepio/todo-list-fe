export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface ModalDatas {
  showModal: number;
  modalMessage: string;
  selectedId: number;
}

export interface AppState {
  todos: Todo[];
  isLoading: boolean;
  todo: string;
  isEdit: boolean;
  selectedId: number;
  modalDatas: ModalDatas;
  errorMessage: string;
}
