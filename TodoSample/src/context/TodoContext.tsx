import React, { createContext, useState, ReactNode } from "react";
import { AppState, ModalDatas } from "../interfaces/types";
import useLocalStorage from "../customHooks/useLocalStorage";
import { modalType } from "../enums/modalEnums";
import { initialState } from "./initialStates";

export const TodoContext = createContext<AppState>(initialState);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [todo, setTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [modalDatas, setModalDatas] = useState<ModalDatas>({
    showModal: modalType.hide,
    modalMessage: "",
    selectedId: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSpin, setIsSpin] = useState<boolean>(false);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        todo,
        setTodo,
        isEdit,
        setIsEdit,
        selectedId,
        setSelectedId,
        modalDatas,
        setModalDatas,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        isSpin,
        setIsSpin,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
