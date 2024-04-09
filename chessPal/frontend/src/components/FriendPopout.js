import React from "react";
import "../styles/Global.css";
import styles from "../styles/FriendPopout.module.css";

function FriendPopout({ friend, gameHistory }) {
    return (
        <div>
            <h2>{friend.username}</h2>
            <h3>Game History</h3>
            <ul>
            {gameHistory.map((game) => (
                    <li key={game.id}>{game.date} - {game.result}</li>
                ))}
            </ul>
        </div>
    );
}

export default FriendPopout