import React, { useContext } from "react";
import cNames from "classnames";
import styles from "./styles.module.scss";
import { AppState, Todo } from "../../interfaces/types";
import { modalType } from "../../enums/modalEnums";
import { TodoContext } from "../../context/TodoContext";
import { updateTask } from "../../utils/api";
import EmptyState from "../emptyState/EmptyState";

interface TodoListProps {
  handleEdit: (index: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ handleEdit }) => {
  const todoContext = useContext<AppState>(TodoContext);
  const { todos, setTodos, setModalDatas, setIsSpin, isSpin, errorMessage } = todoContext;
  const handleDeleteClick = (item: Todo) => {
    setModalDatas({
      showModal: modalType.delete,
      modalMessage: `Are you sure you want to delete ${item.title}?`,
      selectedId: item.id,
    });
  };

  const handleCheckboxChange = async (selectedItem: Todo) => {
    const updateItem = todos.find((item: Todo) => item.id === selectedItem.id);
    setIsSpin(true);
    if (!updateItem) return console.error("Task not found");
    const updatedTodo = { ...updateItem, completed: !updateItem?.completed };
    await updateTask(updateItem.id, updatedTodo);
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === selectedItem.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
    setIsSpin(false);
  };

  // Show empty state if there are no todos or if there's an error
  if (todos.length === 0 || errorMessage) {
    return (
      <EmptyState 
        errorMessage={errorMessage} 
        isLoading={isSpin}
      />
    );
  }

  return (
    <ul className={`${styles.todoList} ${isSpin ? styles.loading : ''}`}>
      {todos.map((item: Todo) => (
        <li key={item.id}>
          <div className={styles.todoContent}>
            <div
              className={cNames(
                styles.checkbox,
                item.completed ? styles.checked : null
              )}
              onClick={() => handleCheckboxChange(item)}
              role="checkbox"
              aria-checked={item.completed}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCheckboxChange(item)}
            />
            <span
              className={cNames(
                styles.todoListTitle,
                item.completed ? styles.completed : null
              )}
            >
              {item.title}
            </span>
          </div>
          <div className={styles.actions}>
            <button 
              className={styles.edit}
              onClick={() => handleEdit(item)}
              aria-label={`Edit task: ${item.title}`}
            >
              Edit
            </button>
            <button 
              className={styles.delete}
              onClick={() => handleDeleteClick(item)}
              aria-label={`Delete task: ${item.title}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
