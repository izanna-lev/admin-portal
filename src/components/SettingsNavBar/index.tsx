import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";

const SettingsNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("About Us", ICON.DASHBOARD_INACTIVE, "settings/about")}
    {NavigationOption("FAQs", ICON.PROFILE_INACTIVE, "settings/faq")}
    {NavigationOption(
      "Terms & Conditions",
      ICON.ITINERARIES_INACTIVE,
      "settings/terms"
    )}
    {NavigationOption("Privacy Policy", ICON.CHAT_INACTIVE, "settings/privacy")}
  </nav>
);

export default SettingsNavBar;
