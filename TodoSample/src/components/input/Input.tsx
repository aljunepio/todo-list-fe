import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { AppState, Todo } from "../../interfaces/types";
import { TodoContext } from "../../context/TodoContext";

interface InputProps {
  handleAddEdit: () => void;
}

const Input: React.FC<InputProps> = ({ handleAddEdit }) => {
  const todoContext = useContext<AppState>(TodoContext);
  const { todo, setTodo, todos, isEdit, isSpin } = todoContext;
  const [error, setError] = useState<string>("");

  const validateInput = () => {
    if (!todo.trim()) {
      setError("Todo cannot be blank");
      return false;
    }
    if (
      todos.some((existingTodo: Todo) => existingTodo.title === todo.trim())
    ) {
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
        <button onClick={handleAddEditClick} disabled={isSpin}>
          {isEdit ? "Edit" : "Add"}
        </button>
        <button onClick={() => setTodo("")} disabled={!todo}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Input;
