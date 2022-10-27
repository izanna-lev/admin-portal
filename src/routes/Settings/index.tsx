import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./index.scss";
import SettingsNavBar from "../../components/SettingsNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Fetch } from "../../api/Fetch";
import { API } from "../../constants";

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(Fetch(API.APP_DETAILS, {}, 1, 10));
    navigate("/settings/about")
  }, [dispatch]);

  return (
    <section className="settings-container">
      <section className="page--bottom--settingsNav">
        <SettingsNavBar />
      </section>
         <Outlet />
    </section>
  );
};

export default Settings;
