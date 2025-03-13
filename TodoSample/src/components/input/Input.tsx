import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Todo } from "../../interfaces/types";

interface InputProps {
  todo: string;
  setTodo: (value: string) => void;
  handleAddEdit: () => void;
  isEdit: boolean;
  todos: Todo[];
}

const Input: React.FC<InputProps> = ({
  todo,
  setTodo,
  handleAddEdit,
  isEdit,
  todos,
}) => {
  const [error, setError] = useState<string>("");

  const validateInput = () => {
    if (!todo.trim()) {
      setError("Todo cannot be blank");
      return false;
    }
    if (todos.some((existingTodo) => existingTodo.title === todo.trim())) {
      setError("Todo is a duplicate");
      return false;
    }
    if (/[^a-zA-Z0-9\s]/.test(todo.trim())) {
      setError("Todo contains invalid characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddEditClick = () => {
    if (validateInput()) {
      handleAddEdit();
    }
  };

  return (
    <div className={styles.inputContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddEditClick}>{isEdit ? "Edit" : "Add"}</button>
        <button onClick={() => setTodo("")}>Clear</button>
      </div>
    </div>
  );
};

export default Input;
