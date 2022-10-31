import SettingsNavBar from "../../components/SettingsNavBar";
import { useAppDispatch } from "../../store/hooks";
import { Outlet } from "react-router-dom";
import { Fetch } from "../../api/Fetch";
import { API } from "../../constants";
import { useEffect } from "react";
import "./index.scss";

const Settings = ({ sideNavView }: { sideNavView: boolean }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Fetch(API.APP_DETAILS, {}, 1, 10));
  }, [dispatch]);

  return (
    <section className="settings-container">
      <SettingsNavBar sideNavView={sideNavView} />
      <Outlet />
    </section>
  );
};

export default Settings;
