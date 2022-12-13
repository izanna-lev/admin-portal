import NavigationOption from "../sub-components/NavigationOption";
import styles from "./index.module.scss";
import { ICON } from "../../assets/index";
import { useAppSelector } from "../../store/hooks";

const SideNavBar = ({ sideNavView }: { sideNavView: boolean }) => {
  const { totalUnseenChats } = useAppSelector((state) => state.chatList);

  return (
    <nav
      className={`${styles["navigation-sidebar"]} ${
        sideNavView ? styles["small-navigation-sidebar"] : ""
      }`}
    >
      {NavigationOption("Dashboard", ICON.DASHBOARD_INACTIVE)}
      {NavigationOption("Travelers", ICON.TRAVELLERS_INACTIVE)}
      {NavigationOption("Itineraries", ICON.ITINERARIES_INACTIVE, "itinerary")}
      {NavigationOption("Chat", ICON.CHAT_INACTIVE, null, totalUnseenChats)}
      {NavigationOption(
        "Access Management",
        ICON.ACCESS_MANAGEMENT_INACTIVE,
        "admin"
      )}
      {NavigationOption(
        "Notifications",
        ICON.NOTIFICATIONS_INACTIVE,
        "notifications"
      )}
      {NavigationOption("Settings", ICON.SETTINGS, "settings")}
    </nav>
  );
};

export default SideNavBar;
