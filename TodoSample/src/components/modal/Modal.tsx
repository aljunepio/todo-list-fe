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
  const getModalIcon = () => {
    if (showModal === modalType.deleteAll) return "🗑️";
    if (showModal === modalType.delete) return "⚠️";
    return "ℹ️";
  };

  const getModalTitle = () => {
    if (showModal === modalType.deleteAll) return "Delete All Tasks";
    if (showModal === modalType.delete) return "Delete Task";
    return "Confirm Action";
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button
          className={styles.modalClose}
          onClick={() =>
            setModalDatas({ ...modalDatas, showModal: modalType.hide })
          }
          aria-label="Close modal"
        >
          ×
        </button>
        
        <div className={styles.modalHeader}>
          <span className={styles.modalIcon}>
            {getModalIcon()}
          </span>
          <h2 className={styles.modalTitle}>
            {getModalTitle()}
          </h2>
        </div>
        
        <div className={styles.modalMessage}>
          {modalMessage}
        </div>
        
        <div className={styles.buttons}>
          <button 
            className={styles.confirm}
            onClick={onConfirm}
            aria-label="Confirm action"
          >
            Yes, Continue
          </button>
          <button
            className={styles.cancel}
            onClick={() =>
              setModalDatas({ ...modalDatas, showModal: modalType.hide })
            }
            aria-label="Cancel action"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
