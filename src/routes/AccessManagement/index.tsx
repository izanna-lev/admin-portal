/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IMAGE, ICON, API, PERMISSIONS_STRING } from "../../constants";
import { Modal } from "../../components/Portal";
import { SPECIALIST_ACTIONS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Pagination } from "../../components/Pagination";
import { SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import { DeleteEntity } from "../../api/Delete";
import "./index.scss";
import Popup from "../../components/Popup";
import { Create } from "../../api/Create";
import { IoImageOutline } from "react-icons/io5";

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
  dispatch: any,
  popupUpdate: any,
  updateSpecialistAction: any
) => {
  const permissions = (data: any) => {
    let text = "";
    if (data) {
      for (const key in PERMISSIONS_STRING) {
        if (data[key]) {
          text += PERMISSIONS_STRING[key] + ", ";
        }
      }
    }

    return text.substring(0, text.length - 2);
  };

  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>
        <div className="name-image-cell">
          {item.image?
                    <img
                    className="user-image"
                    src={IMAGE.SMALL + item.image}
                    alt={item.name}
                    onError={(e: any) => {
                      e.target.src = ICON.DUMMY;
                    }}
                  />:  <div className="user-selection-img-dummy"> <IoImageOutline className="dummy-image" /></div> }

          <div className="access-management-user">
            <span className="access-management">{item.name}</span>
            <span className="access-management text">{item.email}</span>
            <span className="access-management text">{item.phoneNumber}</span>
          </div>
        </div>
      </td>
      <td className="specialist-ratings">
        <AiFillStar className="star-rating" />
        <div>{item.averageRatings || 0}</div>
      </td>
      <td>{item.completedItineraries || 0}</td>
      <td>{permissions(item.permissions)}</td>
      <td className="specialist-actions">
        <div
          onClick={() => {
            updateSpecialistAction({
              id: item._id,
              action: item.blocked
                ? SPECIALIST_ACTIONS.UNBLOCK
                : SPECIALIST_ACTIONS.BLOCK,
            });
          }}
          className={`${!item.blocked ? "activate" : ""}`}
        >
          {item.blocked ? "Deactivate" : "Activate"}
        </div>
        <button
          className="btn view-button specialist-edit"
          onClick={() => {
            navigate(`/admin/editSpecialist/${item._id}`, {
              state: {
                id: item._id,
                name: item.name,
                email: item.email,
                phoneNumber: item.phoneNumber,
                permissions: item.permissions,
                image: item.image,
              },
            });
          }}
        >
          <FaRegEdit />
          Edit
        </button>
        <button
          className="btn view-button specialist-delete"
          onClick={() => popupUpdate(true, item._id)}
        >
          <RiDeleteBin6Line />
          Delete
        </button>
      </td>
    </tr>
  );
};

const AccessManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.specialists
  );
  const [popup, setPopup] = useState({
    id: "",
    show: false,
  });

  const popupUpdate = (show: boolean, id: string) => {
    setPopup({ ...popup, show, id });
  };

  const cancel = () => {
    setPopup({ ...popup, show: false, id: "" });
  };

  const deleteSpecialist = () => {
    dispatch(DeleteEntity(API.DELETE_SPECIALIST, { specialistRef: popup.id }));
    cancel();
    window.location.reload();
  };

  const updateSpecialistAction = (data: any) => {
    dispatch(
      Create(API.ACTION_SPECIALIST, {
        specialistRef: data.id,
        action: data.action,
      })
    );
    window.location.reload();
  };

  useEffect(() => {
    dispatch(Fetch(API.LIST_SPECIALIST, {}, 1, 10));
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
      <div className="list-specialist">
        <div>List of Specilists</div>
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
        </div>
      <section className="table-container">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {list.length ? (
              list.map((item, index) =>
                TableRow(
                  item,
                  index,
                  limit,
                  page,
                  navigate,
                  dispatch,
                  popupUpdate,
                  updateSpecialistAction
                )
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
      {popup.show && (
        <Modal
          modal={
            <Popup
              heading="Delete Specialist"
              text="Are you sure you want to delete this specialist. This can`t be undone"
              firstButtonText="Delete"
              secondButtonText="Cancel"
              firstButtonAction={deleteSpecialist}
              secondButtonAction={cancel}
            />
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      )}
    </main>
  );
};

export default AccessManagement;
