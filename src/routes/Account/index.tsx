import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import LoadingOverlay from "../../components/LoadingOverlay";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import styles from "./index.module.scss";

const Account = () => {
  const navigate = useNavigate();

  const [sideNavigationView, setSideNavigationView] = useState(true)

  const updateSideNavigation = () => {
    setSideNavigationView(!sideNavigationView)
  }
  useEffect(() => {
    !localStorage.getItem("accessToken") &&
      navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className={styles["page"]}>
      <LoadingOverlay />
      <Header sideNav={updateSideNavigation}/>
      <section className={styles["page--bottom"]}>
        <SideNavBar sideNavigationView={sideNavigationView}/>
        <Outlet />
      </section>
    </div>
  );
};

export default Account;
