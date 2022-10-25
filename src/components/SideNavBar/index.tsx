import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";

const SideNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("Dashboard", ICON.DASHBOARD_INACTIVE)}
    {NavigationOption("Travellers", ICON.PROFILE_INACTIVE, "travellers")}
    {NavigationOption("Itineraries", ICON.ITINERARIES_INACTIVE, "itinerary")}
    {NavigationOption("Chat", ICON.CHAT_INACTIVE)}
    {NavigationOption(
      "Access Management",
      ICON.ACCESS_MANAGEMENT_INACTIVE,
      "admin"
    )}
    {NavigationOption(
      "Send Notifications",
      ICON.NOTIFICATIONS_INACTIVE,
      "notifications"
    )}
    {NavigationOption("Settings", ICON.SETTINGS, "settings")}
  </nav>
);

export default SideNavBar;
