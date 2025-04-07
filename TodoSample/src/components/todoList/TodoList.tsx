import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AppState, Todo } from "../../interfaces/types";
import { modalType } from "../../enums/modalEnums";
import { TodoContext } from "../../context/TodoContext";

interface TodoListProps {
  handleEdit: (index: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ handleEdit }) => {
  const todoContext = useContext<AppState>(TodoContext);
  const { todos, setTodos, setModalDatas } = todoContext;
  const handleDeleteClick = (item: Todo) => {
    // setModalDatas({
    //   ...modalDatas,
    //   showModal: modalType.delete,
    //   modalMessage: `Are you sure you want to delete ${item.title}?`,
    //   selectedId: item.id,
    // });
    setModalDatas({
      showModal: modalType.delete,
      modalMessage: `Are you sure you want to delete ${item.title}?`,
      selectedId: item.id,
    });
  };

  const handleCheckboxChange = (item: Todo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
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
          <span className={styles.todoListTitle}>{item.title}</span>
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
