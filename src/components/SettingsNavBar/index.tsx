import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";
import { SETTINGS_NAVIGATE } from "../../constants";

const SettingsNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("About Us", ICON.DASHBOARD_INACTIVE, SETTINGS_NAVIGATE.ABOUT_US, "settings/aboutsUs")}
    {NavigationOption("FAQs", ICON.PROFILE_INACTIVE, SETTINGS_NAVIGATE.FAQ, "settings/faqs")}
    {NavigationOption(
      "Terms & Conditions",
      ICON.ITINERARIES_INACTIVE,
      SETTINGS_NAVIGATE.TERMS,
      "settings/terms"
    )}
    {NavigationOption("Privacy Policy", ICON.CHAT_INACTIVE, SETTINGS_NAVIGATE.PRIVACY, "settings/privacy")}
  </nav>
);

export default SettingsNavBar;
