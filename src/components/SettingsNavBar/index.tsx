import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";
import { SETTINGS_NAVIGATE } from "../../constants";

const SettingsNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("About Us", ICON.ABOUT_US, SETTINGS_NAVIGATE.ABOUT_US, "settings/about")}
    {NavigationOption("FAQs", ICON.FAQ, SETTINGS_NAVIGATE.FAQ, "settings/faqs")}
    {NavigationOption(
      "Terms & Conditions",
      ICON.TERMS_CONDOTION,
      SETTINGS_NAVIGATE.TERMS,
      "settings/terms"
    )}
    {NavigationOption("Privacy Policy", ICON.PRIVACY_POLICY, SETTINGS_NAVIGATE.PRIVACY, "settings/privacy")}
  </nav>
);

export default SettingsNavBar;
