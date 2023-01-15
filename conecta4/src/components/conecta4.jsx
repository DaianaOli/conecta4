import React from "react";
import Swal from "sweetalert";
import soundfile from './fichas.mp3'
import "../styles/conecta4.css";

const Contecta4 = () => {
  const [tablero, setTablero] = React.useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [turno, setTurno] = React.useState(1);
  const [ganador, setGanador] = React.useState(0);
  const [mensaje, setMensaje] = React.useState("");
  const [jugadas, setJugadas] = React.useState(0);
  const [jugador1, setJugador1] = React.useState(0);
  const [jugador2, setJugador2] = React.useState(0);

  const handleClick = (i, j) => {
    if (ganador === 0) {
      document.getElementById('audio').play();
      let tablero2 = tablero.map((fila) => [...fila]);
      let k = 5;
      while (k >= 0 && tablero2[k][j] !== 0) {
        k--;
      }
      if (k >= 0) {
        tablero2[k][j] = turno;
        setTablero(tablero2);
        setTurno(turno === 1 ? 2 : 1);
        setJugadas(jugadas + 1);
      }
    }
  };

  const handleReset = () => {
    Swal({
      title: "¿Estás seguro?",
      text: "Se reiniciarán el tablero",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setTablero([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
        setTurno(1);
        setGanador(0);
        setMensaje("");
        setJugadas(0);
      }
    });
  };

  const handleReiniciar = () => {
    Swal({
      title: "¿Estás seguro?",
      text: "Se reiniciarán las puntuaciones",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setJugador1(0);
        setJugador2(0);
        setTablero([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
        setTurno(1);
        setGanador(0);
        setMensaje("");
        setJugadas(0);
      }
    });
  };

  const checkGanador = () => {
    let ganador = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (tablero[i][j] !== 0) {
          if (i <= 2) {
            if (
              tablero[i][j] === tablero[i + 1][j] &&
              tablero[i][j] === tablero[i + 2][j] &&
              tablero[i][j] === tablero[i + 3][j]
            ) {
              ganador = tablero[i][j];
            }
          }
          if (j <= 3) {
            if (
              tablero[i][j] === tablero[i][j + 1] &&
              tablero[i][j] === tablero[i][j + 2] &&
              tablero[i][j] === tablero[i][j + 3]
            ) {
              ganador = tablero[i][j];
            }
          }
          if (i <= 2 && j <= 3) {
            if (
              tablero[i][j] === tablero[i + 1][j + 1] &&
              tablero[i][j] === tablero[i + 2][j + 2] &&
              tablero[i][j] === tablero[i + 3][j + 3]
            ) {
              ganador = tablero[i][j];
            }
          }
          if (i >= 3 && j <= 3) {
            if (
              tablero[i][j] === tablero[i - 1][j + 1] &&
              tablero[i][j] === tablero[i - 2][j + 2] &&
              tablero[i][j] === tablero[i - 3][j + 3]
            ) {
              ganador = tablero[i][j];
            }
          }
        }
      }
    }
    return ganador;
  };

  React.useEffect(() => {
    let ganador = checkGanador();
    if (ganador === 1) {
      setGanador(1);
      setMensaje("Gana el jugador 1");
      setJugador1(jugador1 + 1);
      setTurno(1);
    } else if (ganador === 2) {
      setGanador(2);
      setMensaje("Gana el jugador 2");
      setJugador2(jugador2 + 1);
      setTurno(1);
    } else if (jugadas === 42) {
      setMensaje("Empate");
    }
  }, [tablero]);

  return (
    <div className="conecta4">
     <audio id="audio" src={soundfile}/>
      <div className="info">
        <div className="turno">
          <p>Turno del jugador {turno}</p>
          {turno === 1 && <div className="roja"></div>}
          {turno === 2 && <div className="amarilla"></div>}
          <div className="mensaje">
            <p>{mensaje}</p>
          </div>
        </div>
        <div className="puntuacion">
          <p>Puntuación</p>
          <p>Jugador 1: {jugador1}</p>
          <p>Jugador 2: {jugador2}</p>
        </div>
        <div className="botones">
          <button onClick={handleReset}>Reiniciar partida</button>
          <button onClick={handleReiniciar}>Reiniciar juego</button>
        </div>
      </div>
      <div className="tablero">
        {tablero.map((fila, i) => (
          <div key={i} className="fila">
            {fila.map((celda, j) => (
              <div key={j} className="celda" onClick={() => handleClick(i, j)}>
                {celda === 1 && <div className="ficharoja"></div>}
                {celda === 2 && <div className="fichaamarilla"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contecta4;
