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
    <div className={`${styles.inputContainer} ${isSpin ? styles.loading : ''}`}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your task here..."
          aria-label="Task input"
          onKeyPress={(e) => e.key === 'Enter' && handleAddEditClick()}
        />
        <div className={styles.buttonGroup}>
          <button 
            className={styles.primary}
            onClick={handleAddEditClick} 
            disabled={isSpin}
            aria-label={isEdit ? "Edit task" : "Add task"}
          >
            <div className={styles.buttonContent}>
              {isSpin && <div className={styles.loader}></div>}
              {isEdit ? "Edit" : "Add"}
            </div>
          </button>
          <button 
            className={styles.secondary}
            onClick={() => setTodo("")} 
            disabled={!todo || isSpin}
            aria-label="Clear input"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
