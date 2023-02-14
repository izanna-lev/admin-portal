import { UserIcon } from "../../../components/UserIcon";
import { PLANNED_TRAVELLER } from "../../../constants";
import { useAppSelector } from "../../../store/hooks";
import "./index.scss";

const DetailsPage = () => {
  const { itineraryDetails, travellerDetails } = useAppSelector(
    (state: any) => state.itinerary
  );

  const {
    specialistName,
    specialistNumber,
    specialistImage,
    specialistPhoneCode,
    plannedDate,
    plannedTraveller,
    travellerName,
    travellerEmail,
    endDate,
  } = travellerDetails;

  return (
    <>
      <div className="trip-details">
        <div className="trip-details-heading color-blue">
          Trip Request Form Details
        </div>
        <div className="trip-details-data">
          <div>
            <div className="key">Name</div>
            <div className="value">
              <UserIcon image={itineraryDetails.image} />
              <span>{itineraryDetails.location || "NA"}</span>
            </div>
          </div>

          <div>
            <div className="key">Planned Date</div>
            <div className="value">{`${plannedDate} | ${endDate}`}</div>
          </div>

          <div>
            <div className="key">How much have you already planned?</div>
            <div className="value">
              {PLANNED_TRAVELLER[plannedTraveller - 1 || 0].name}
            </div>
          </div>
        </div>

        <div className="trip-details-heading">Assigned Specialist</div>
        <div className="trip-details-data">
          <div className="assigned-specialist">
            <UserIcon image={specialistImage} />
            <div className="specialist-details">
              <div className="key">{specialistName || "NA"}</div>
              {specialistNumber ? (
                <a href={`tel:${specialistPhoneCode}${specialistNumber}`}>
                  {specialistPhoneCode}
                  {`${specialistPhoneCode ? "-" : ""}`}
                  {specialistNumber}
                </a>
              ) : (
                "NA"
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="trip-details">
        <div className="trip-details-heading color-blue">Traveler Details</div>
        <div className="trip-details-data">
          <div>
            <div className="key">Name</div>
            <div className="value">{travellerName || "NA"}</div>
          </div>

          <div>
            <div className="key">Email</div>
            {travellerEmail ? (
              <a className="value" href={`mailto:${travellerEmail}`}>
                {travellerEmail}
              </a>
            ) : (
              "NA"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
