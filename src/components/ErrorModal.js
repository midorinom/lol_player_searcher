import React from "react";
import ReactDOM from "react-dom";

import styles from "./ErrorModal.module.css";

const Overlay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <button className={styles.modalButton} onClick={props.okayClicked}>
            Okay
          </button>
        </footer>
      </div>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          okayClicked={props.okayClicked}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ErrorModal;
