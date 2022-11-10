/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { API } from "../../constants";
import { useEffect } from "react";
import { Fetch } from "../../api/Fetch";
import SpecialistList from "../SpecialistList/index";
import "./index.scss";

const DashboardCard = (title: string, data: number) => (
  <div className="card-container">
    <div className="card-value">{data}</div>
    <div className="card-title">{title}</div>
  </div>
);

const DashboardPage = () => {
  const dashboardData = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Fetch(API.DASHBOARD));
  }, [dispatch]);

  return (
    <main className="content-container dashboard-container">
      <section className="content-top">
        <h2 className="content-heading">Dashboard</h2>
      </section>

      <section className="dashboard-stats">
        {DashboardCard("Pending Itinerary", dashboardData.pending)}
        {DashboardCard("Approved Itinerary", dashboardData.approved)}
        {DashboardCard("Completed Itinerary", dashboardData.completed)}
      </section>

      <section className="dashboard-ratings">
        <h3 className="">List of Specialists</h3>
        <SpecialistList />
      </section>
    </main>
  );
};

export default DashboardPage;
