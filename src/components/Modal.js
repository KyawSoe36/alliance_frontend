import React from "react";
import "../styles/Modal.css";

const Modal = ({
  isOpen,
  isDisableBtn,
  onClose,
  onSubmit,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
        <div>{children}</div>
        <button disabled={!isDisableBtn} onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
