/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { IMAGE, ICON, API, USER_ACTIONS } from "../../constants";
import { Modal } from "../../components/Portal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Pagination } from "../../components/Pagination";
import { SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import { DeleteEntity } from "../../api/Delete";
import "./index.scss";
import Popup from "../../components/Popup";
import { Create } from "../../api/Create";
import { UserIcon } from "../../components/UserIcon";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Name</th>
      <th>Email</th>
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
  updateTravellerAction: any
) => {
  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>
        <div className="name-image-cell">
          <UserIcon image={item.image} width="3.5rem" height="3.5rem" />

          <span className="access-management">{item.name || "NA"}</span>
        </div>
      </td>
      <td>
        <div className="access-management-user">
          <a href={`mailto:${item.email}`} className="access-management text">
            {item.email}
          </a>
          <a
            href={`tel:+${item.phoneNumber}`}
            className="access-management text"
          >
            {item.phoneNumber}
          </a>
        </div>
      </td>
      <td className="specialist-actions">
        <div
          onClick={() => {
            updateTravellerAction({
              id: item._id,
              action: item.blocked
                ? USER_ACTIONS.UNBLOCKED
                : USER_ACTIONS.BLOCKED,
            });
          }}
          className={`table-data-status ${item.blocked ? "blocked" : ""}`}
        >
          {item.blocked ? "Blocked" : "Block"}
        </div>
        <button
          className=" btn view-button"
          onClick={() => {
            navigate(`/travellers/details/${item._id}`);
          }}
        >
          View Details
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

const Travellers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState<any>("");

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.travellerList
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
    dispatch(
      DeleteEntity(API.USER_ACTION, {
        userRef: popup.id,
        action: USER_ACTIONS.DELETED,
      })
    );
    cancel();
    window.location.reload();
  };

  const updateTravellerAction = (data: any) => {
    dispatch(
      Create(API.USER_ACTION, { userRef: data.id, action: data.action })
    );
    window.location.reload();
  };

  useEffect(() => {
    dispatch(Fetch(API.USER_LIST, { text }, 1, 10));
  }, [dispatch, text]);

  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Travellers List</h2>
        <div className="traveller-top">
          <div className="traveller-search">
            <input
              name="Search"
              type="text"
              className="traveller-search-input"
              maxLength={20}
              placeholder="Search here"
              ref={searchRef}
              autoFocus
            />
            <AiOutlineSearch className="search-icon" />
            <div
              onClick={(e) => setText(searchRef.current?.value)}
              className="traveller-search-go"
            >
              Go
            </div>
          </div>
          <>Viewing</>
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
      </section>

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
                  updateTravellerAction
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
              text="Are you sure you want to delete this traveller. This can`t be undone"
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

export default Travellers;
