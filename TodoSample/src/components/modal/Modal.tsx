import React from "react";
import styles from "./modalStyle.module.scss";
import { modalType } from "../../enums/modalEnums";
import { ModalDatas, Todo } from "../../interfaces/types";

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
  const { showModal, modalMessage, selectedId } = modalDatas;
  const onConfirm = () => {
    if (showModal === modalType.deleteAll) {
      setTodos([]);
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
