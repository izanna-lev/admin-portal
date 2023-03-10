/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegEdit } from 'react-icons/fa'
import dayjs from "dayjs";

import {
  IMAGE,
  ICON,
  API,
  PERMISSIONS_STRING,
} from "../../constants";
import { Modal } from "../../components/Portal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Pagination } from "../../components/Pagination";
import { SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import { DeleteEntity } from "../../api/Delete";
import "./index.scss";
import Popup from "../../components/Popup";


const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Itinerary Name</th>
      <th>User Name</th>
      <th>No. of guests</th>
      <th>Assigned Date</th>
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
  dispatch: any,
  popupUpdate: any,
) => {


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
          <span className="access-management">{item.name}</span>
        </div>
      </td>
      <td>
        <div className="access-management-user">
        <span className="access-management text">{item.email}</span>
        <span className="access-management text">{item.phoneNumber}</span>
      </div></td>
      <td>
        {item.plannedTraveller || 0}
      </td>
      <td>{dayjs(item.plannedDate).format('DD-MMM-YYYY')}</td>
      <td className="specialist-actions">
        <button
          className="btn view-button chat-specialist"
          onClick={() => {
            navigate(`/admin/editSpecialist/${item._id}`, {
              state: {
                id: item._id,
                name: item.name,
                email: item.email,
                phoneNumber: item.phoneNumber,
                permissions: item.permissions,
                image: item.image
              }
            });
          }}
        >
          <FaRegEdit />
          Chat
        </button>
        <button
          className="btn view-button cancel-itinerary"
          onClick={() => popupUpdate(true, item._id)
          }
        >
          Cancel Itinerary
        </button>
      </td>
    </tr>

  );
};

const CancelItinerary = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.specialists
  );
  const [popup, setPopup] = useState({
    id: "",
    show: false
  });


  const popupUpdate = (show: boolean, id: string) => {
    setPopup({ ...popup, show, id })
  };

  const cancel = () => {
    setPopup({ ...popup, show: false, id: "" })
  };

  const deleteSpecialist = () => {
    dispatch(DeleteEntity(API.DELETE_SPECIALIST, { specialistRef: popup.id }));
    cancel()
    window.location.reload()
  };

  useEffect(() => {
    dispatch(Fetch(API.LIST_ITINERARIES, {}, 1, 10));
  }, [dispatch]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Access Management</h2>
        <button
          className=" btn view-button create-specialist"
          onClick={() => {
            navigate(`/admin/createSpecialist`);
          }}
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
                TableRow(item, index, limit, page, navigate, dispatch, popupUpdate)
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
      {popup.show && <Modal
        modal={<Popup
          heading="Delete Specialist"
          text="Are you sure you want to delete this specialist. This can`t be undone"
          firstButtonText="Delete"
          secondButtonText="Cancel"
          firstButtonAction={deleteSpecialist}
          secondButtonAction={cancel}
        />}
        root={document.getElementById("overlay-root") as HTMLElement}
      />}
    </main>
  );
};

export default CancelItinerary;
