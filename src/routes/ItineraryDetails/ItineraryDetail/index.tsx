/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

// import { GiSandsOfTime } from "react-icons/gi";
// import logo from "../../../images/placeholder.png";

import { useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";

import "./index.scss";

// type Props = {};

const ItineraryDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <section className="itinerary-details">
      <div className="itinerary-details-heading">Itinerary Details</div>
      <div className="no-itenary">
        <div className="image-background">
          <IoImageOutline className="image" />
        </div>
        <div className="itinerary-heading">No Itinerary Created</div>
        <div className="itinerary-text">
          Please create itinerary for the user below.
        </div>
        <div
          className="create-itinerary-btn"
          onClick={() => {
            navigate("/itinerary/create");
          }}
        >
          Create Itinerary
        </div>
      </div>
    </section>
  );
};

export default ItineraryDetailsPage;
