/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs"
import {
  IMAGE,
  ITINERARY_STATUS,
  ICON,
  API,
  PLANNED_TRAVELLER,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFormRef } from "../../store/slices/appData";
import { Pagination } from "../../components/Pagination";
import { getFormattedDate, SerialNum } from "../../util";
import { Fetch } from "../../api/Fetch";
import "./index.scss";
import useComponentVisible from "../../components/outsideClickHandler";
import { Create } from "../../api/Create";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Location Planneds</th>
      <th>User Name</th>
      <th>Contact Number</th>
      <th>Planned Date</th>
      <th className="custom-head">How much have you already planned?</th>
      <th>No. of guests</th>
      <th>Status</th>
    </tr>
  </thead>
);

const TableRow = (
  item: any,
  index: number,
  navigate: any,
  dispatch: any,
  handleDropDown: Function,
  userDropdown: string,
  ref: any,
  limit?: number,
  page?: number

) => {
  const itineraryDetailsPage = (item: any) => {
    dispatch(setFormRef(item._id));
    navigate(`/itinerary/detail/${item._id}`);
  };

  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit = 0, page = 0, index)}</td>
      <td>
        <div className="name-image-cell">
          <span className="table-user-name">{item.location}</span>
        </div>
      </td>
      <td>{item.userName}</td>
      <td>{item.contactNumber}
      </td>
      <td>{getFormattedDate(item.plannedDate)}</td>
      <td>{PLANNED_TRAVELLER[item.plannedTraveller - 1 || 0].name}</td>
      <td>{item.plannedTraveller}</td>

      <td>
        <div className={`table-data-status ${item.blockedByTraveller? 'blocked': ""}`}>
          { item.blockedByTraveller ? "Blocked" :ITINERARY_STATUS[item.status]}
        </div>
      </td>
    </tr>
  );
};

const TravellersDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState("");
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const params = useParams();

  const handleDropDown = (id: string) => {
    setIsComponentVisible(true)
    setUserDropdown(id)
  };

  useEffect(() => {
    const { travellerRef } = params;

    
    dispatch(Fetch(API.TRAVELLER_DETAILS, { userRef: travellerRef}, 1, 1000));
  }, []);

  useEffect(() => {
    if (!isComponentVisible) {
      setUserDropdown("")
      setIsComponentVisible(false)
    }
  }, [isComponentVisible]);


  let {  itinerary,
    _id,
    name,
    image } = useAppSelector(
    (state) => state.travellerDetails
  );


  console.log( itinerary,
    _id,
    name,
    image)


  return (
    <main className="content-container">
      <section className="content-top">
        <h2 className="content-heading">Traveller Details</h2>
      </section>
      <section className="table-container">
        <table className="itinerary-table table">
          {TableHead()}
          <tbody className="body-tr">
            {itinerary.length ? (
              itinerary.map((item, index) =>  TableRow(item, index, navigate, dispatch, handleDropDown, userDropdown, ref)
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

export default TravellersDetails;
