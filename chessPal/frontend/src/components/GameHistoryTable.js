import React, { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import tempGameHistoryData from "./TempGameHistoryData";
import "../styles/Global.css";
import styles from "../styles/GameHistoryTable.module.css";
import {prettyMovelist, decodeGame} from "./GameFormatter"

function GameHistoryTable(userId) {
  const [gameHistory, setGameHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  //const [gameHistory, setGameHistory] = useState([]);


  useEffect(() => {
    // Fetch game history data from the backend
    axios.get(`http://localhost:8000/game_fetch_user?userid=${localStorage.getItem("userId")}`)
      .then(response => {
        console.log(response.data);
        // let rawdata = JSON.stringify(response.data, null, 2);
        let rawdata = response.data.games;
        let rawgames = Array.from(rawdata.games);
        // console.log(rawgames);
        const cleangames = rawgames.map((game) => decodeGame(game,localStorage.getItem("userId")));
        console.log(cleangames);
        setGameHistory(cleangames);
      })
      .catch(error => {
        console.error("Error fetching game history:", error);
      });
  }, [userId]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setOpenDialog(true);
  };

  return (
    <div>
      <table className={styles.table_container}>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Date</th>
            <th>Color</th>
            <th>Result</th>
            <th>Opponent</th>
          </tr>
        </thead>
        <tbody>
          {gameHistory.map((game) => (
            <tr key={game.id} onClick={() => handleGameClick(game)}>
              <td>{game.name}</td>
              <td>{game.date}</td>
              <td>{game.color}</td>
              <td>{game.result}</td>
              <td>{game.opponent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <div style={{ padding: "30px" }}> 
        {selectedGame && (
          <div>
            <h2>Game Details</h2>
            <p> <strong>Name</strong>: {selectedGame.name}</p>
            <p> <strong>Date</strong>: {selectedGame.date}</p>
            <p><strong>Color</strong>: {selectedGame.color}</p>
            <p><strong>Result</strong>: {selectedGame.result}</p>
            <p><strong>Opponent</strong>: {selectedGame.opponent}</p>
            <p><strong>Moves</strong>: {prettyMovelist(selectedGame.moves)}</p>
            {selectedGame.moves && (
                <div>
                  <h3>Scanned Image</h3>
                  <img src={selectedGame.scannedImage} alt="Scanned Image" />
                </div>
              )}
            </div>
        )}
        </div>
      </Dialog>
    </div>
  );
}

export default GameHistoryTable;