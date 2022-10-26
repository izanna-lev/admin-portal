/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import styles from "./index.module.scss";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import NotificationPopup from "../NotificationPopup/index";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Logout from "../Logout";
import { ICON } from "../../assets";

type Props = {
  showUserData?: boolean;
};
const Nav = ({ showUserData = true }: Props) => {


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/login");
  };


  return (
    <header className={styles["header"]} id="navBar">
      <div className={styles["header-left"]}>
        <h1 className={styles["header-logo"]}>Onsite Travel</h1>
      </div>

      <div className={styles["header-right"]}>
      </div>
      <div className={styles["logout"]}  onClick={handleLogout}>
      <img src={ICON.LOGOUT} alt="" className={styles["logout-icon"]} />

        <div>Logout</div>
      </div>
    </header>
  );
};

export default Nav;
