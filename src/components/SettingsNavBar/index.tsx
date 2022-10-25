import NavigationOption from "../sub-components/NavigationOption";
import { ICON } from "../../constants";
import styles from "./index.module.scss";

const SettingsNavBar = () => (
  <nav className={`${styles["navigation-sidebar"]} `}>
    {NavigationOption("About Us", ICON.ABOUT_US, "settings/about")}
    {NavigationOption("FAQs", ICON.FAQ, "settings/faqs")}
    {NavigationOption(
      "Terms & Conditions",
      ICON.TERMS_CONDITIONS,
      "settings/terms"
    )}
    {NavigationOption(
      "Privacy Policy",
      ICON.PRIVACY_POLICY,
      "settings/privacy"
    )}
  </nav>
);

export default SettingsNavBar;
