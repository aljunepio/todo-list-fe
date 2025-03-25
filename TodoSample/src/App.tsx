import React, { useContext, useEffect } from "react";
import styles from "./App.module.scss";
import { fetchTasks, addTask, updateTask, deleteTask } from "./utils/api";
import Input from "./components/input/Input";
import TodoList from "./components/todoList/TodoList";
import Modal from "./components/modal/Modal";
import { TodoContext } from "./context/TodoContext";
import { modalType } from "./enums/modalEnums";
import { Todo } from "./interfaces/types";

function App() {
    const todoContext = useContext(TodoContext);

    const { state, updateState } = todoContext;
    const { todos, todo, isLoading, isEdit, selectedId, modalDatas, errorMessage } = state;

  const handleEdit = (item: Todo) => {
    updateState("todo", item.title);
    updateState("selectedId", item.id);
    updateState("isEdit", true);
  };

  const handleAddEdit = async () => {
    try {
      if (isEdit) {
        const editItem = todos.find((item: Todo) => item.id === selectedId);
        if (!editItem) {
          console.error("Task not found");
          return;
        }
        const updatedTodo = { ...editItem, title: todo };
        const response = await updateTask(editItem.id, updatedTodo);
        updateState(
          "todos",
          todos.map((item: Todo) =>
            item.id === updatedTodo.id ? updatedTodo : item
          )
        );
      } else {
        const newTodo = { id: Date.now(), title: todo, completed: false };
        const response = await addTask(newTodo);
        updateState("todos", [...todos, response]);
      }
      updateState("todo", "");
      updateState("isEdit", false);
    } catch (error) {
      console.error("Error handling add/edit task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      updateState(
        "todos",
        todos.filter((item: Todo) => item.id !== id)
      );
    } catch (error) {
      console.error("Error handling delete task:", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        updateState("isLoading", true);
        const tasks = await fetchTasks();
        updateState("todos", tasks);
        updateState("isLoading", false);
      } catch (error) {
        updateState("errorMessage", `Error loading tasks: ${error}`);
        updateState("isLoading", false);
      }
    };
    loadTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Todo List</div>
      <Input
        todo={todo}
        setTodo={(value) => updateState("todo", value)}
        handleAddEdit={handleAddEdit}
        isEdit={isEdit}
        todos={todos}
      />
      {isLoading ? (
        "Loading..."
      ) : errorMessage ? (
        errorMessage
      ) : (
        <TodoList
          todos={todos}
          handleEdit={handleEdit}
          modalDatas={modalDatas}
          setModalDatas={(data) => updateState("modalDatas", data)}
        />
      )}
      <button
        className={styles.deleteAll}
        onClick={() =>
          updateState("modalDatas", {
            showModal: modalType.deleteAll,
            modalMessage: "Are you sure you want to delete all tasks?",
            selectedId: 0,
          })
        }
      >
        Delete all
      </button>
      {modalDatas.showModal ? (
        <Modal
          modalDatas={modalDatas}
          setModalDatas={(data) => updateState("modalDatas", data)}
          setTodos={(data) => updateState("todos", data)}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default App;
