import React from "react";
import styles from "../styles/FriendRequestSent.module.css";

const Dialog = ({ isOpen, onClose }) => {
    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div className={styles.dialogOverlay} onClick={handleClickOutside}>
                    <div className={styles.dialogContent}>
                        <h2>Friend Request Sent!</h2>
                        <button onClick={onClose} className={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dialog;