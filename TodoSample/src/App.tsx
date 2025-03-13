import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import useLocalStorage from "./customHooks/useLocalStorage";
import { ModalDatas, Todo } from "./interfaces/types";
import Input from "./components/input/Input";
import TodoList from "./components/todoList/TodoList";
import Modal from "./components/modal/Modal";
import { modalType } from "./enums/modalEnums";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [todo, setTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [modalDatas, setModalDatas] = useState<ModalDatas>({
    showModal: modalType.hide,
    modalMessage: "",
    selectedId: 0,
  });

  const handleEdit = (index: number) => {
    setTodo(todos[index].title);
    setIsEdit(true);
    setSelectedIndex(index);
  };

  const handleAddEdit = () => {
    if (isEdit) {
      const updatedTodos = todos.map((item, index) =>
        index === selectedIndex ? { ...item, title: todo } : item
      );
      setTodos(updatedTodos);
    } else {
      const newTodo: Todo = { id: Date.now(), title: todo };
      setTodos([...todos, newTodo]);
    }
    setTodo("");
    setIsEdit(false);
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleDeleteAllClick = () => {
    setModalDatas({
      ...modalDatas,
      showModal: modalType.deleteAll,
      modalMessage: "Are you sure you want to delete all tasks?",
    });
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTodos(response.data); // Todo
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Todo List</div>
      <Input
        todo={todo}
        setTodo={setTodo}
        handleAddEdit={handleAddEdit}
        isEdit={isEdit}
        todos={todos}
      />
      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        modalDatas={modalDatas}
        setModalDatas={setModalDatas}
      />
      <button className={styles.deleteAll} onClick={handleDeleteAllClick}>
        Delete all
      </button>
      {modalDatas.showModal ? (
        <Modal
          modalDatas={modalDatas}
          setModalDatas={setModalDatas}
          setTodos={setTodos}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default App;
