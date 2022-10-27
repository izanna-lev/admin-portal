import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

const NavURL = (url: string) => `/${url.replace(" ", "").toLowerCase()}`;

const NavigationOption = (name: string, Icon: string, url?: string) => (
  <NavLink
    key={name}
    to={NavURL(url || name)} 
    className={({ isActive }) =>
      `${styles["sidebar-item"]} ${isActive && styles["item-active"]}`
    }
    title={name}
  >
    <img src={Icon} alt={name} className={styles["sidebar-icon"]} />
    <span className={styles["sidebar-icon--name"]}>{name}</span>
  </NavLink>
);

export default NavigationOption;
