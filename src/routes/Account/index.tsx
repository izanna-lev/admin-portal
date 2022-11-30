import LoadingOverlay from "../../components/LoadingOverlay";
import { useNavigate, Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import Socket from "../../components/Socket";
import Header from "../../components/Header";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { setProfile } from "../../store/slices/profile";
import { useDispatch } from "react-redux";

const Account = (props: { sideNav: Function; sideNavView: boolean }) => {
  const { sideNav, sideNavView } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useAppSelector((state) => state);

  useEffect(() => {
    if (
      !localStorage.getItem("accessToken") ||
      (!profile._id && !localStorage.getItem("user"))
    ) {
      navigate("/login", { replace: true });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }

    if (!profile._id && localStorage.getItem("user"))
      dispatch(setProfile(JSON.parse(localStorage.getItem("user") || "")));

    if (profile._id && !localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(profile));
  }, [profile, dispatch, navigate]);

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
      <Socket />
    </>
  );
};

export default Account;
