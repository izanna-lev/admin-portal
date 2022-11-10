/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { IMAGE, ICON, API, PERMISSIONS_STRING } from "../../constants";
import { Modal } from "../../components/Portal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Pagination } from "../../components/Pagination";
import { SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import { DeleteEntity } from "../../api/Delete";
import "./index.scss";
import Popup from "../../components/Popup";
import { UserIcon } from "../../components/UserIcon";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Name</th>
      <th>Email</th>
      <th>No. of itineraries Assigned</th>
    </tr>
  </thead>
);

const TableRow = (item: any, index: number) => {
  return (
    <tr className="body-tr" key={index}>
      <td>
        <div className="name-image-cell">
          <UserIcon image={item.image} />
          <span className="access-management">{item.name}</span>
        </div>
      </td>
      <td>{item.email}</td>
      <td>{item.itineryCount}</td>
    </tr>
  );
};

const SpecialistList = () => {
  const dispatch = useAppDispatch();
  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.specialistList
  );

  useEffect(() => {
    dispatch(Fetch(API.SPECIALIST_LIST, {}, 1, 10));
  }, [dispatch]);

  return (
    <main className="content-container specialist-section">
      {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage: () =>
              dispatch(Fetch(API.SPECIALIST_LIST, {}, page + 1, limit)),
            previousPage: () =>
              dispatch(Fetch(API.SPECIALIST_LIST, {}, page - 1, limit)),
          })
        : null}
      <section className="table-container dashboard-table">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {list.length ? (
              list.map((item, index) => TableRow(item, index))
            ) : (
              <tr className="table-empty">
                <td colSpan={7}>
                  <div>No Data</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default SpecialistList;
