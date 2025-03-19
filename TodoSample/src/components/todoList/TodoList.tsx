import React from "react";
import styles from "./styles.module.scss";
import { ModalDatas, Todo } from "../../interfaces/types";
import { modalType } from "../../enums/modalEnums";

interface TodoListProps {
  todos: Todo[];
  handleEdit: (index: Todo) => void;
  modalDatas: ModalDatas;
  setModalDatas: (datas: ModalDatas) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleEdit,
  modalDatas,
  setModalDatas,
}) => {
  const handleDeleteClick = (item: Todo) => {
    setModalDatas({
      ...modalDatas,
      showModal: modalType.delete,
      modalMessage: `Are you sure you want to delete ${item.title}?`,
      selectedId: item.id,
    });
  };

  return (
    <ul className={styles.todoList}>
      {todos.map((item) => (
        <li key={item.id}>
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
