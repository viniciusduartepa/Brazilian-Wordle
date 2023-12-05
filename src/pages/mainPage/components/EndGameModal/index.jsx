import React from "react";
import Modal from "react-modal";
import "./styles.css"; // Importe seu arquivo CSS

Modal.setAppElement("#root");

export const EndGameModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="EndGameModal"
      className="EndGameModal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        {props.gameResult === "win" ? (
          <p className="bigText colorfulText">You won! Congratulations!</p>
        ) : props.gameResult === "lose" ? (
          <p className="bigText colorfulText">
            You lost! Better luck next time.
          </p>
        ) : null}
      </div>
    </Modal>
  );
};
