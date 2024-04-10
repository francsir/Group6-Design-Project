import React from "react";

import { Link } from "react-router-dom";

import styles from "../styles/Dropdown.module.css";

const Dropzdown = () => {
  return (
    <>
      <div className={"flex-column " + styles.main}>
        <ul>
          <Link to="/Profile" className={styles.link}>
            <li>Profile</li>
          </Link>
          <Link className={styles.link}>
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Dropzdown;
