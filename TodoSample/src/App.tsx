import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import useLocalStorage from "./customHooks/useLocalStorage";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api/api";
import { ModalDatas, Todo } from "./interfaces/types";
import Input from "./components/input/Input";
import TodoList from "./components/todoList/TodoList";
import Modal from "./components/modal/Modal";
import { modalType } from "./enums/modalEnums";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [todo, setTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [modalDatas, setModalDatas] = useState<ModalDatas>({
    showModal: modalType.hide,
    modalMessage: "",
    selectedId: 0,
  });

  const handleEdit = (item: Todo) => {
    setTodo(item.title);
    setIsEdit(true);
    setSelectedId(item.id);
  };

  const handleAddEdit = async () => {
    try {
      if (isEdit) {
        const editItem = todos.find((item) => item.id === selectedId);
        if (!editItem) {
          console.error("Task not found");
          return;
        }
        const updatedTodo = { ...editItem, title: todo };
        const response = await updateTask(editItem.id, updatedTodo);
        const updatedTodos = todos.map((item) =>
          item.id === selectedId ? response : item
        );
        setTodos(updatedTodos);
      } else {
        const newTodo: Todo = { id: Date.now(), title: todo, completed: false };
        const response = await addTask(newTodo);
        setTodos([...todos, response]);
      }
      setTodo("");
      setIsEdit(false);
    } catch (error) {
      console.error("Error handling add/edit task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const itemToDelete = todos.find((item) => item.id === id);
      if (!itemToDelete) {
        console.error("Task not found");
        return;
      }
      await deleteTask(id);
      setTodos(todos.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error handling delete task:", error);
    }
  };

  const handleDeleteAllClick = () => {
    setModalDatas({
      ...modalDatas,
      showModal: modalType.deleteAll,
      modalMessage: "Are you sure you want to delete all tasks?",
    });
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTodos(tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
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
