import LoadingOverlay from "../../components/LoadingOverlay";
import { useNavigate, Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/Header";
import styles from "./index.module.scss";
import { useEffect } from "react";

const Account = (props: { sideNav: Function; sideNavView: boolean }) => {
  const { sideNav, sideNavView } = props;
  const navigate = useNavigate();

  useEffect(() => {
    !localStorage.getItem("accessToken") &&
      navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <>
      <div className={styles["page"]}>
        <Header sideNav={sideNav} />
        <section className={styles["page--bottom"]}>
          <SideNavBar sideNavView={sideNavView} />
          <Outlet />
        </section>
      </div>
      <LoadingOverlay />
    </>
  );
};

export default Account;
