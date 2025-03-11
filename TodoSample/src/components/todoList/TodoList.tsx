import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { ModalDatas, Todo } from "../../interfaces/types";
import { modalType } from "../../enums/modalEnums";
import axios from "axios";

interface TodoListProps {
  todos: Todo[];
  handleEdit: (index: number) => void;
  modalDatas: ModalDatas;
  setModalDatas: (datas: ModalDatas) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleEdit,
  modalDatas,
  setModalDatas,
}) => {
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    console.log(response.data, "!!!", todos);
  };
  const handleDeleteClick = (index: number) => {
    setModalDatas({
      ...modalDatas,
      showModal: modalType.delete,
      selectedId: index,
    });
  };

  useEffect(() => {
    console.log( "!!!", todos);
    fetchTasks();
  }, []);
  return (
    <ul className={styles.todoList}>
      {todos.map((item, index) => (
        <li key={item.id}>
          {item.text}
          <div>
            <button onClick={() => handleDeleteClick(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
