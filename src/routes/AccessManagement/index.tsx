/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  IMAGE,
  ICON,
  API,
  PERMISSIONS_STRING,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFormRef } from "../../store/slices/appData";
import { Pagination } from "../../components/Pagination";
import { getFormattedDate, SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import "./index.scss";


const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Name</th>
      <th>Average Rating</th>
      <th>Itineraries Completed</th>
      <th>Permissions</th>
      <th className="custom-head">Actions</th>
    </tr>
  </thead>
);

const TableRow = (
  item: any,
  index: number,
  limit: number,
  page: number,
  navigate: any,
  dispatch: any
) => {
  const itineraryDetailsPage = (item: any) => {
    dispatch(setFormRef(item._id));
    navigate(`/itinerary/detail/${item._id}`);
  };

  const permissions = (data: any) => {
    let text = ""
    console.log(PERMISSIONS_STRING, data)
    if (data) {
      for(const key in PERMISSIONS_STRING) {
        if (data[key]) {
          text += PERMISSIONS_STRING[key] + ", "
        }
      }
    }

    return text.substring(0, text.length - 2);
  }
  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>
        <div className="name-image-cell">
          <img
            className="user-image"
            src={IMAGE.SMALL + item.image}
            alt={item.name}
            onError={(e: any) => {
              e.target.src = ICON.USER_PLACEHOLDER;
            }}
          />
          <div className="access-management-user">
          <span className="access-management">{item.name}</span>
          <span className="access-management">{item.email}</span>
          <span className="access-management">{item.phoneNumber}</span>
          </div>

        </div>
      </td>
      <td>{item.averageRatings || 0}</td>
      <td>
        {item.completedItineraries || 0}
      </td>
      <td>{permissions(item.permissions)}</td>
      <td className="specialist-actions">
        <div>{item.blocked? "Deactivate": "Activate"}</div>
        <button
          className="btn view-button"
          onClick={() => {
            itineraryDetailsPage(item);
          }}
        >
          View Details
        </button>
        <button
          className="btn view-button"
          onClick={() => {
            itineraryDetailsPage(item);
          }}
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

const ItineraryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.specialists
  );

  console.log("--------", list)
  useEffect(() => {
    dispatch(Fetch(API.LIST_SPECIALIST, {}, 1, 10));
  }, [dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Assigned Itineraries</h2>
        <button
          className=" btn view-button create-specialist"
          onClick={() => {
            navigate(`/admin/createSpecialist`);}}
        >
          Create Specialist
        </button>
      </section>
      {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage: () =>
              dispatch(Fetch(API.ITINERARIES, {}, page + 1, limit)),
            previousPage: () =>
              dispatch(Fetch(API.ITINERARIES, {}, page - 1, limit)),
          })
        : null}
      <section className="table-container">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {list.length ? (
              list.map((item, index) =>
                TableRow(item, index, limit, page, navigate, dispatch)
              )
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

export default ItineraryPage;
