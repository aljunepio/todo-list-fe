import React, { createContext, useState, ReactNode } from "react";
import { AppState } from "../interfaces/types";
import { initialState } from "./initialStates";


export const TodoContext = createContext<{
  state: AppState;
  updateState: (key: keyof AppState, value: any) => void;
} | null>(null);


export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>(initialState);

  
  const updateState = (key: keyof AppState, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <TodoContext.Provider value={{ state, updateState }}>
      {children}
    </TodoContext.Provider>
  );
};
