/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import styles from "./index.module.scss";
import { ICON } from "../../assets";

type Props = {
  showUserData?: boolean;
  sideNav: Function
};
const Nav = ({ showUserData = true, sideNav }: Props) => {


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/login");
  };


  return (
    <header className={styles["header"]} id="navBar">
      <div className={styles["header-left"]}>
      <img
          title="menu"
          alt="menu"
          src={ICON.MENU}
          onClick={() => sideNav()}
          // onClick={sideNav()}
          className={styles["header-menu"]}
          loading="lazy"
        />
      <img
          title="logo"
          alt="logo"
          src={ICON.APP_LOGO}
          className={styles["header-logo"]}
          loading="lazy"
        />
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
