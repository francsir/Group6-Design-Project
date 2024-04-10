import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Global.css";
import styles from "../styles/FriendsPage.module.css";

import Navbar from "./Navbar";
import Dialog from "./FriendRequestSent"; 
import FriendPopout from "./FriendPopout";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const dummyFriendsData = [
    { username: "Charlotte" },
    { username: "Ryan" },
    { username: "Sarah" },
    { username: "Sergio" },
    { username: "Shi Su" },
];

const dummyFriendRequestsData = [
    { requesterUsername: "Hamlet" },
    { requesterUsername: "Othello" },
    { requesterUsername: "Ophelia" },
    { requesterUsername: "Macbeth" },
    { requesterUsername: "Demetrius" },
];

const dummyGameHistoryData = [
    { id: 1, date: "2022-01-01", result: "Win" },
    { id: 2, date: "2022-01-02", result: "Loss" },
    { id: 3, date: "2022-01-03", result: "Draw" },
    { id: 4, date: "2022-01-04", result: "Win" },
    { id: 5, date: "2022-01-05", result: "Loss" },
];

function FriendsPage(props) {
    const userId = props.location.state.userId;
    const [username, setUsername] = useState("currentUsername");
    const [friendUsername, setFriendUsername] = useState("");
    const [friendRequests, setFriendRequests] = useState(dummyFriendRequestsData);
    const [friends, setFriends] = useState(dummyFriendsData);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [gameHistory, setGameHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showDialog, setShowDialog] = useState(false); 
    const [showPopout, setShowPopout] = useState(false);

    const handleFriendClick = (friendUsername) => {
        setSelectedFriend(friendUsername);
        const friendGameHistory = dummyGameHistoryData.filter(game => game.username === friendUsername);
        setGameHistory(friendGameHistory);
        setShowPopout(true);
    };

    const handleClosePopout = () => {
        setShowPopout(false);
    };

    const handleAddFriend = (friendUsername) => {
        setShowDialog(true);  
        setFriendUsername("");
    };

    const handleAcceptFriendRequest = (requesterUsername) => {
        const updatedFriendRequests = friendRequests.filter(request => request.requesterUsername !== requesterUsername);
        setFriendRequests(updatedFriendRequests);
        setFriends([...friends, { username: requesterUsername }]);
    };

    const handleRejectFriendRequest = (requesterUsername) => {
        const updatedFriendRequests = friendRequests.filter(request => request.requesterUsername !== requesterUsername);
        setFriendRequests(updatedFriendRequests);
    };

    const handleSearch = () => {
        const results = dummyFriendsData.filter(friend => friend.username.toLowerCase().includes(friendUsername.toLowerCase()));
        setSearchResults(results);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setSearchResults([]); // Clear search results
    };

    return (
        <div>
            <Navbar userId={userId}/>
            <div className={styles.buffer}></div>
            <div className={"flex-row " + styles.center_div}>
                <h1>Friends</h1>
            </div>
            <div className={styles.buffer}></div>
            <div className={"flex-row " + styles.row_padding}>
                <div className={"flex-column "+styles.column_container}>
                    <div className={styles.center_div}>
                        <h3>My Friends</h3>
                    </div>
                    <div className={styles.friends_container}>
                        <ul className={styles.friends_list}>
                            {friends.map((friend) => (
                                <li key={friend.username} className={styles.friends_list_item} onClick={() => handleFriendClick(friend.username)}>
                                    @{friend.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={"flex-column " + styles.column_container}>
                    <div className={styles.center_div}>
                        <h3>Search for friends</h3>
                    </div>
                    <div className={styles.center_div}>
                        <input
                            type="text"
                            value={friendUsername}
                            onChange={(e) => setFriendUsername(e.target.value)}
                            placeholder="Enter friend's username"
                            className={styles.input_rounded}
                        />
                    </div>
                    <div className={styles.center_div}>
                    <button className={styles.white_button} onClick={handleSearch}>Search</button>
                    </div>
                    {searchResults.length > 0 && (
                        <div className={styles.center_div}>
                            <ul>
                                {searchResults.map((result) => (
                                    <li key={result.username}>
                                        @{result.username}
                                        <IconButton style={{ padding: "1px",marginLeft: "5px" }}>
                                        <AddCircleOutlineIcon style={{ color: "green"}} onClick={() => handleAddFriend(result.username)}/>
                                    </IconButton>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className={"flex-column "+styles.column_container}>
                    <div className={styles.center_div}>
                        <h3>accept/reject friend requests</h3>
                    </div>
                    <div className={styles.center_div}>
                        <ul>
                            {friendRequests.map((request) => (
                                <li key={request.requesterUsername}>
                                    @{request.requesterUsername} 
                                    <IconButton style={{ padding: "1px",marginLeft: "5px" }}>
                                        <AddCircleOutlineIcon style={{ color: "green"}} onClick={() => handleAcceptFriendRequest(request.requesterUsername)}/>
                                    </IconButton>
                                    <IconButton style={{ padding: "1px" }}>
                                        <DoNotDisturbIcon style={{ color: "red"}} onClick={() => handleRejectFriendRequest(request.requesterUsername)}/>
                                    </IconButton>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Dialog isOpen={showDialog} onClose={handleDialogClose} />
            <div>
                {showPopout && (
                    <FriendPopout
                        friend={selectedFriend}
                        gameHistory={gameHistory}
                    />
                )}
            </div>
        </div>
    );
}
export default FriendsPage