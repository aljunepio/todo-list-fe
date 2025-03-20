import React, { useReducer, useEffect } from "react";
import styles from "./App.module.scss";
import { fetchTasks, addTask, updateTask, deleteTask } from "./utils/api";
import Input from "./components/input/Input";
import TodoList from "./components/todoList/TodoList";
import Modal from "./components/modal/Modal";
import { initialState } from "./context/initialStates";
import { reducer } from "./context/reducer";
import { ACTIONS } from "./context/actions";
import { modalType } from "./enums/modalEnums";
import { Todo } from "./interfaces/types";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    todos,
    todo,
    isLoading,
    isEdit,
    selectedId,
    modalDatas,
    errorMessage,
  } = state;

  const handleEdit = (item: Todo) => {
    dispatch({ type: ACTIONS.SET_TODO_INPUT, payload: item.title });
    dispatch({ type: ACTIONS.SET_SELECTED_ID, payload: item.id });
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
        dispatch({ type: ACTIONS.UPDATE_TODO, payload: response });
      } else {
        const newTodo = { id: Date.now(), title: todo, completed: false };
        const response = await addTask(newTodo);
        dispatch({ type: ACTIONS.ADD_TODO, payload: response });
      }
    } catch (error) {
      console.error("Error handling add/edit task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
    } catch (error) {
      console.error("Error handling delete task:", error);
    }
  };

  const handleDeleteAllClick = () => {
    dispatch({
      type: ACTIONS.SET_MODAL_DATA,
      payload: {
        showModal: modalType.deleteAll,
        modalMessage: "Are you sure you want to delete all tasks?",
        selectedId: 0,
      },
    });
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const tasks = await fetchTasks();
        dispatch({ type: ACTIONS.SET_TODOS, payload: tasks });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      } catch (error) {
        console.error("Error loading tasks:", error);
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: `Error loading tasks: ${error}`,
        });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    };
    loadTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Todo List</div>
      <Input
        todo={todo}
        setTodo={(value) =>
          dispatch({ type: ACTIONS.SET_TODO_INPUT, payload: value })
        }
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
          setModalDatas={(data) =>
            dispatch({ type: ACTIONS.SET_MODAL_DATA, payload: data })
          }
        />
      )}
      <button className={styles.deleteAll} onClick={handleDeleteAllClick}>
        Delete all
      </button>
      {modalDatas.showModal ? (
        <Modal
          modalDatas={modalDatas}
          setModalDatas={(data) =>
            dispatch({ type: ACTIONS.SET_MODAL_DATA, payload: data })
          }
          setTodos={(todos) =>
            dispatch({ type: ACTIONS.SET_TODOS, payload: todos })
          }
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default App;
