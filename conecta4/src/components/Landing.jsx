import React from "react";
import Swal from "sweetalert";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import "../styles/landing.css";

const Landing = () => {
  const [jugador1, setJugador1] = React.useState("");
  const [jugador2, setJugador2] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  const handleJugador1 = (e) => {
    setJugador1(e.target.value);
  };

  const handleJugador2 = (e) => {
    setJugador2(e.target.value);
  };

  const handleJugar = () => {
    if (jugador1 === "" || jugador2 === "") {
      setMensaje("¡Debes ingresar los nombres de los jugadores!");
    } else {
      Swal({
        title: "¡Listo!",
        text: "¡Que empiece el juego!",
        icon: "success",
        buttons: true,
        dangerMode: true,
        });
    }
    };

  const handleInfo = () => {
    Swal({
      title: "Conecta 4",
      text: "El objetivo del juego es conseguir 4 fichas del mismo color en línea recta, ya sea horizontal, vertical o diagonal. El jugador 1 juega con fichas rojas y el jugador 2 con fichas amarillas. El jugador que consiga 4 fichas en línea gana la partida. Si no hay ganador, se declara empate.",
      icon: "info",
      buttons: true,
      dangerMode: true,
    });
  };

  return (
    <div className="landing">
      <div className="landing__container">
        <h1>Conecta 4</h1>
        <div className="landing__container__jugadores">
            <label htmlFor="jugador1">Jugador 1</label>
            <input
                type="text"
                id="jugador1"
                value={jugador1}
                onChange={handleJugador1}
            />
            <label htmlFor="jugador2">Jugador 2</label>
            <input
                type="text"
                id="jugador2"
                value={jugador2}
                onChange={handleJugador2}
            />
        </div>
        <div className="landing__container__botones">
            <Link to="/conecta4">
                <button onClick={handleJugar}>Jugar</button>
            </Link>
            <button onClick={handleInfo}>
                <BsInfoCircle />
            </button>
        </div>
        <p>{mensaje}</p>
        </div>
    </div>
    );
};

export default Landing;
