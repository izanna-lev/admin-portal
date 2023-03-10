import { IoCloseOutline } from "react-icons/io5";
import InputForm from "../../InputTypes/InputForm/index";
import TextArea from "../../InputTypes/TextArea/index";
import styles from "./index.module.scss";
import { Modal } from "../../Portal";
import ImagePopup from "../../sub-components/ImagePopup";
import React, { useState, useRef } from "react";
import Dropdown from "../../InputTypes/Dropdown";
import {
  API,
  FLIGHT_CLASS,
  GOOGLE_API,
  TRANSPORTATION_TYPE,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { usePlacesWidget } from "react-google-autocomplete";
import { Create } from "../../../api/Create";
import { NewTicket } from "../NewTicket";
import { AiOutlinePlus } from "react-icons/ai";

interface props {
  handleAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTransportationForm = (props: props) => {
  const [ticketsData, setTicketsData] = useState<any>([
    { name: "", image: "" },
  ]);
  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [depart, setDepart] = useState({});
  const [arrival, setArrival] = useState({});
  const dispatch = useAppDispatch();

  const { handleAddPopup } = props;
  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const dayRef = useRef();
  const airlineRef = useRef();
  const flightClassRef = useRef();
  const departDateRef = useRef();
  const departTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const specialistNoteRef = useRef();

  const DepartLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace("depart", place),
  });

  const ArrivalLocation = usePlacesWidget({
    apiKey: GOOGLE_API,
    onPlaceSelected: (place) => checkPlace("arrival", place),
  });

  const checkPlace = (type: string, place: any) => {
    const {
      formatted_address,

      geometry: {
        location: { lat, lng },
      },
    } = place;

    const newLocationObj = {
      location: formatted_address,
      type: "Point",
      coordinates: [Math.abs(lng()), Math.abs(lat())],
    };
    if (type === "depart") setDepart(newLocationObj);
    else setArrival(newLocationObj);
  };

  const removeUserTicket = (id: string, index: number) => {
    const elementToRemove = document.getElementById(
      `ticket${index}`
    ) as HTMLElement;
    if (elementToRemove) elementToRemove.remove();
    const filteredTickets = ticketsData.filter(
      (ticket: any, idx: number) => idx !== index
    );

    setTicketsData(filteredTickets);
  };

  const saveUserTicketsData = ({
    length,
    image,
    name,
  }: {
    length: number;
    image: string;
    name: string;
  }) => {
    const newObj = [...ticketsData];

    if (name) newObj[length].name = name;
    else newObj[length].image = image;
    setTicketsData(newObj);
  };

  const addMoreTickets = () => {
    const addNewTicketInArr = [...ticketsData];
    addNewTicketInArr.push({ name: "", image: "" });
    setTicketsData(addNewTicketInArr);
  };

  const handleImagePopup = () => setshowImage(false);

  const saveFlightDetails = (e: any) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    const data = {
      day: getInputValue(dayRef),
      flightClass: getInputValue(flightClassRef),
      departDateTime: new Date(
        `${getInputValue(departDateRef)}T${getInputValue(departTimeRef)}`
      ).toISOString(),
      airline: getInputValue(airlineRef),
      depart,
      arrival,
      arrivalDateTime: new Date(
        `${getInputValue(departDateRef)}T${getInputValue(arrivalTimeRef)}`
      ).toISOString(),
      specialistNote: getInputValue(specialistNoteRef),
      userDetails: ticketsData,
      itineraryRef: _id,
    };

    // if (!ticketsData[0].image) return alert("Please select an image!");

    dispatch(
      Create(API.ADD_FLIGHT, data, false, null, API.TRANSPORTATION_DATA, {
        itineraryRef: _id,
        transportationType: TRANSPORTATION_TYPE.FLIGHT,
      })
    );

    handleAddPopup(false);
  };

  return (
    <div className={styles["add-itinerary-data-form"]}>
      <div className={styles["form-background"]}>
        <div className="form-cross">
          <IoCloseOutline
            className={styles["cross"]}
            onClick={() => handleAddPopup(false)}
          />
        </div>
        <form className="form-block" onSubmit={(e) => saveFlightDetails(e)}>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
            Basic Details
          </div>
          <div className={styles["form-required-feilds"]}>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  placeholder: "1",
                  ref: dayRef,
                  name: "Day",
                  id: "day",
                  maxlength: 30,
                  type: "number",
                }}
              />
              <InputForm
                inputFields={{
                  placeholder: "Phillippines",
                  ref: airlineRef,
                  name: "Airline",
                  id: "airline",
                  maxlength: 70,
                  type: "text",
                }}
              />

              <Dropdown
                name="Flight Class"
                inputFields={FLIGHT_CLASS}
                refe={flightClassRef}
              />
              <InputForm
                inputFields={{
                  placeholder: "Canada",
                  ref: DepartLocation.ref,
                  name: "Depart",
                  id: "depart",
                  maxlength: 360,
                  type: "text",
                }}
              />

              <InputForm
                inputFields={{
                  placeholder: "",
                  ref: departDateRef,
                  name: "Depart Date",
                  id: "date",
                  maxlength: 30,
                  type: "date",
                }}
              />
            </div>
            <div className={styles["form-left-details"]}>
              <InputForm
                inputFields={{
                  placeholder: "",
                  ref: departTimeRef,
                  name: "Depart Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <InputForm
                inputFields={{
                  placeholder: "Cebu City",
                  ref: ArrivalLocation.ref,
                  name: "Arrival",
                  id: "arrival",
                  maxlength: 70,
                  type: "text",
                }}
              />
              <InputForm
                inputFields={{
                  placeholder: "",
                  ref: arrivalTimeRef,
                  name: "Arrival Time",
                  id: "time",
                  maxlength: 30,
                  type: "time",
                }}
              />
              <TextArea
                inputFields={{
                  placeholder: "Lorem Ipsum",
                  ref: specialistNoteRef,
                  name: "Specialist Note",
                  id: "specialist note",
                  maxlength: 1000,
                  type: "text",
                }}
              />
            </div>
          </div>
          <div
            className={`${styles["form-heading"]} ${styles["bold"]} feild-heading`}
          >
            Traveler Flight Details
          </div>
          <div className={styles["form-required-feilds"]}>
            {ticketsData.map((element: any, index: number) =>
              NewTicket(
                index,
                saveUserTicketsData,
                setshowImage,
                setimageUrl,
                dispatch,
                removeUserTicket
              )
            )}
          </div>
          <div
            className={`add-more-tickets ${styles["form-heading"]}`}
            onClick={addMoreTickets}
          >
            <AiOutlinePlus />
            &nbsp;Add More Travelers
          </div>

          <div className={styles["button-save"]}>
            <button className={`continue-button no-border`} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      {showImage && imageUrl ? (
        <Modal
          modal={
            <ImagePopup
              imageUrl={imageUrl}
              handleImagePopup={handleImagePopup}
            />
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      ) : null}
    </div>
  );
};

export default NewTransportationForm;

// className={styles[{` ${activityChangedData?.[index]?.image ? "" : "not-selected-preview"}`}
