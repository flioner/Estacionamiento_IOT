import React, { useState } from "react";
import s from "./modal.module.css";

const Modal = ({ isOpen, setOpen, children }) => {
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className={s.fitScreen4}>
      <div className={isOpen ? s.modal : s.modal2}> {children}</div>
    </div>
  );
};

export { Modal };
