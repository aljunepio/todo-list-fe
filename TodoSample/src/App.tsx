import { useContext, useEffect } from "react";
import styles from "./App.module.scss";
import { fetchTasks, addTask, updateTask, deleteTask } from "./utils/api";
import Input from "./components/input/Input";
import TodoList from "./components/todoList/TodoList";
import Modal from "./components/modal/Modal";
import { TodoContext } from "./context/TodoContext";
import { modalType } from "./enums/modalEnums";
import { AppState, Todo } from "./interfaces/types";

function App() {
  const todoContext = useContext<AppState>(TodoContext);

  const {
    todos,
    setTodos,
    todo,
    setTodo,
    isEdit,
    setIsEdit,
    selectedId,
    setSelectedId,
    modalDatas,
    setModalDatas,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
  } = todoContext;

  const handleEdit = (item: Todo) => {
    setTodo(item.title);
    setSelectedId(item.id);
    setIsEdit(true);
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
        await updateTask(editItem.id, updatedTodo);
        setTodos(
          todos.map((item: Todo) =>
            item.id === updatedTodo.id ? updatedTodo : item
          )
        );
      } else {
        const newTodo = { id: Date.now(), title: todo, completed: false };
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
      await deleteTask(id);
      setTodos(todos.filter((item: Todo) => item.id !== id));
    } catch (error) {
      console.error("Error handling delete task:", error);
    }
  };

  const getTodosList = () => {
    if (!todos.length) {
      return "No task to be displayed";
    } else if (isLoading) {
      return "Loading...";
    } else if (errorMessage) {
      return errorMessage;
    } else {
      return <TodoList handleEdit={handleEdit} />;
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const tasks = await fetchTasks();
        setTodos(tasks);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(`Error loading tasks: ${error}`);
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Todo List</div>
      <Input handleAddEdit={handleAddEdit} />
      {/* {isLoading ? (
        "Loading..."
      ) : errorMessage ? (
        errorMessage
      ) : (
        <TodoList handleEdit={handleEdit} />
      )} */}
      {getTodosList()}
      <button
        className={styles.deleteAll}
        onClick={() =>
          setModalDatas({
            showModal: modalType.deleteAll,
            modalMessage: "Are you sure you want to delete all tasks?",
            selectedId: 0,
          })
        }
        disabled={isEdit}
      >
        Delete all
      </button>
      {modalDatas.showModal ? (
        <Modal
          modalDatas={modalDatas}
          setModalDatas={(data) => setModalDatas(data)}
          setTodos={(data) => setTodos(data)}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default App;
