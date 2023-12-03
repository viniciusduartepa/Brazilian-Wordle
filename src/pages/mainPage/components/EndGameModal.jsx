import React from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

export const EndGameModal = (props) => {

  return (
      <Modal isOpen={props.isOpen} contentLabel="EndGameModal">
        {props.gameResult === "win" ? (
        <p>You won! Congratulations!</p>
      ) : props.gameResult === "lose" ? (
        <p>You lost! Better luck next time.</p>
      ) : null}
      </Modal>
  );
};
