import React, { useContext } from "react";
import styles from "./modalStyle.module.scss";
import { modalType } from "../../enums/modalEnums";
import { AppState, ModalDatas, Todo } from "../../interfaces/types";
import { deleteAllTask } from "../../utils/api";
import { TodoContext } from "../../context/TodoContext";

interface ModalProps {
  modalDatas: ModalDatas;
  setModalDatas: (datas: ModalDatas) => void;
  setTodos: (value: Todo[]) => void;
  handleDelete: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  modalDatas,
  setModalDatas,
  setTodos,
  handleDelete,
}) => {
  const todoContext = useContext<AppState>(TodoContext);
  const { setIsSpin } = todoContext;
  const { showModal, modalMessage, selectedId } = modalDatas;

  const deleteAllTasks = async () => {
    try {
      setIsSpin(true);
      await deleteAllTask();
      setTodos([]);
    } catch (error) {
      console.error("Error handling delete task:", error);
    } finally {
      setIsSpin(false);
    }
  };

  const onConfirm = () => {
    if (showModal === modalType.deleteAll) {
      deleteAllTasks();
    } else if (showModal === modalType.delete) {
      handleDelete(selectedId);
    }
    setModalDatas({ ...modalDatas, showModal: modalType.hide });
  };
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalMessage}>{modalMessage}</div>
        <div className={styles.buttons}>
          <button onClick={onConfirm}>Yes</button>
          <button
            onClick={() =>
              setModalDatas({ ...modalDatas, showModal: modalType.hide })
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
