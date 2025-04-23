import React, { useContext } from "react";
import cNames from "classnames";
import styles from "./styles.module.scss";
import { AppState, Todo } from "../../interfaces/types";
import { modalType } from "../../enums/modalEnums";
import { TodoContext } from "../../context/TodoContext";
import { updateTask } from "../../utils/api";

interface TodoListProps {
  handleEdit: (index: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ handleEdit }) => {
  const todoContext = useContext<AppState>(TodoContext);
  const { todos, setTodos, setModalDatas } = todoContext;
  const handleDeleteClick = (item: Todo) => {
    setModalDatas({
      showModal: modalType.delete,
      modalMessage: `Are you sure you want to delete ${item.title}?`,
      selectedId: item.id,
    });
  };

  const handleCheckboxChange = async (selectedItem: Todo) => {
    const updateItem = todos.find((item: Todo) => item.id === selectedItem.id);
    if (!updateItem) return console.error("Task not found");
    const updatedTodo = { ...updateItem, completed: !updateItem?.completed };
    await updateTask(updateItem.id, updatedTodo, () => {});
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === selectedItem.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <ul className={styles.todoList}>
      {todos.map((item: Todo) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleCheckboxChange(item)}
          />
          <span
            className={cNames(
              styles.todoListTitle,
              item.completed ? styles.completed : null
            )}
          >
            {item.title}
          </span>
          <div>
            <button onClick={() => handleDeleteClick(item)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
