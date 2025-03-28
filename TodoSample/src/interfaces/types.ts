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
  setTodos: (value: Todo[]) => void;
  todo: string;
  setTodo: (value: string) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  selectedId: number;
  setSelectedId: (value: number) => void;
  modalDatas: ModalDatas;
  setModalDatas: (item: ModalDatas) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (value: string) => void;
}
