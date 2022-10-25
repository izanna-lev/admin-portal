
import React, { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

// import Faq from "../Faq";
import "./index.scss";
import SettingsNavBar from "../../components/SettingsNavBar";
import { Outlet } from "react-router-dom";
import { Fetch } from "../../api/Fetch";
import { API } from "../../constants";


const NavigationOptions = [
  {
    number: 1,
    name: "About",
    path: "about",
  },
  {
    number: 2,
    name: "FAQs",
    path: "faq",
  },
  {
    number: 3,
    name: "Terms & Condition",
    path: "terms",
  },
  {
    number: 4,
    name: "Privacy Policy",
    path: "privacyPolicy",
  },
];

const Settings = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Fetch(API.APP_DETAILS, {}, 1, 10));
  }, [dispatch]);

  return (
    <section className="settings-container">
      <section className="page--bottom--settingsNav">
        <SettingsNavBar />
        <Outlet />
      </section>
    </section>
  );
};


export default Settings;
