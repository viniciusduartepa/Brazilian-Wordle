import React, { useState, useEffect} from "react";
import Modal from "react-modal";
import "./styles.css"; // Importe seu arquivo CSS

Modal.setAppElement("#root");

export const EndGameModal = (props) => {
  const [isHide, setIsHide] = useState(false);
  const toggleIsHide = () => {
    setIsHide(!isHide);
  };

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Função para calcular o tempo restante até a meia-noite do dia seguinte
    const calculateTimeLeft = () => {
      const now = new Date(); // Data e hora atual
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Adiciona um dia para ir para o próximo dia
        0, // Horas
        0, // Minutos
        0, // Segundos
        0 // Milissegundos
      );
      const timeDifference = midnight - now;

      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Formatando o tempo restante
      const formattedTime = `${hours.toString().padStart(2, '0')}:
                             ${minutes.toString().padStart(2, '0')}:
                             ${seconds.toString().padStart(2, '0')}`;

      setTimeLeft(formattedTime);
    };

    // Atualizar o tempo restante a cada segundo
    const timerInterval = setInterval(calculateTimeLeft, 1000);

    // Calcular o tempo restante inicial
    calculateTimeLeft();

    // Limpar o intervalo quando o componente é desmontado
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="EndGameModal"
      className={`EndGameModal ${isHide ? "hide" : ""}`}
      overlayClassName={`custom-overlay ${isHide ? "custom-overlay-hide" : ""}`}
      shouldCloseOnOverlayClick="true"
      onRequestClose={toggleIsHide}
    >
      {props.gameResult === "win" ? (
        <div className="modal-content">
          <h1>Voce ganhou!</h1>
          <div className="results-container">
            <h2>Tentativas:</h2>
            <p className="trys">{props.trys}</p>
          </div>
          <div className="results-container">
            <h2>A palavra era:</h2>
            <p className="daily-word">{props.dailyWord}</p>
          </div>
        </div>
      ) : props.gameResult === "lose" ? (
        <div className="modal-content">
        <h1>Voce perdeu!</h1>
        <p className="lose-message">Tente novamente amanhã!</p>
        <div className="results-container">
            <h2>Proximo jogo em:</h2>
            <p className="daily-word">{timeLeft}</p>
          </div>
        <div>
        </div>
        </div>
      ) : null}
    </Modal>
  );
};
