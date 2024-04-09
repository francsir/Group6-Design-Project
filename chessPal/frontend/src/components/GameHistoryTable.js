import React, { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import tempGameHistoryData from "./TempGameHistoryData";
import "../styles/Global.css";
import styles from "../styles/GameHistoryTable.module.css";

function GameHistoryTable(userId) {
  // const [gameHistory, setGameHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);


  useEffect(() => {
    // Fetch game history data from the backend
    axios.get("/api/game_fetch_user/${userId")
      .then(response => {
        // let rawgames = response.games['games'];
        // let cleangames = [];
        // cleangames.length = rawgames.length;
        // var game;
        // for (let i = 0; i < cleangames.length; i++) {
        //   game = rawgames[i]
        //   cleangames[i] = {id:game["id"], date:game["date"], result:game["result"], opponent:"None"};
        // }
        // setGameHistory(cleangames);
        setGameHistory(response.data);
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
            <th>Game ID</th>
            <th>Date</th>
            <th>Result</th>
            <th>Opponent</th>
          </tr>
        </thead>
        <tbody>
          {gameHistory.map((game) => (
            <tr key={game.id} onClick={() => handleGameClick(game)}>
              <td>{game.id}</td>
              <td>{game.date}</td>
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
            <p> <strong> ID </strong>: {selectedGame.id}</p>
            <p> <strong>Date: </strong>: {selectedGame.date}</p>
            <p><strong>Result: </strong>: {selectedGame.result}</p>
            <p><strong> Opponent</strong>: {selectedGame.opponent}</p>
            {selectedGame.scannedImage && (
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