import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose, show }) => {
  const modalDisplay = show ? "block" : "none";

  return (
    <div className="modal" style={{ display: modalDisplay }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
