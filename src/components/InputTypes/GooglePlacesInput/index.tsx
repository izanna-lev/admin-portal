/**
 * @desc Custom Google Places Component
 * @author Shivender
 * @param {*} name
 * @param {*} setLocation
 */

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { GOOGLE_API } from "../../../constants";
import { truncateString } from "../../../util";
import { useRef, useState } from "react";
import styles from "./index.module.scss";
import InputForm from "../InputForm";

interface GooglePlacesPredictionsProps {
  item: any;
  key: number;
  getPlaceDetails: Function;
}

// Place Prediction Component
const GooglePlacesPredictions = (props: GooglePlacesPredictionsProps) => {
  const { item, getPlaceDetails } = props;

  return (
    <div
      onClick={() => getPlaceDetails(item)}
      className={styles["prediction-place"]}
    >
      {truncateString(item.description, 65, "...")}
    </div>
  );
};

interface GooglePlacesInputProps {
  name?: string;
  setLocation: Function;
  defaultValue?: string;
}

// Google Places Input Component
const GooglePlacesInput = (props: GooglePlacesInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [placeId, setPlaceId] = useState("");
  const { name, setLocation, defaultValue } = props;

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: GOOGLE_API,
    debounce: 500,
  });

  const getPlaceDetails = (place: any) => {
    // Set place_id to hide predictions.
    setPlaceId(place.place_id);

    // Setting the current input value to selected place description
    if (ref.current) ref.current.value = place.description;

    if (placesService && place.place_id)
      // Fetch place details for the selected place.

      placesService.getDetails(
        { placeId: place.place_id },
        (placeDetails: any) => {
          if (placeDetails) {
            // Destructure "placedetails" object for "latitude" and "longitude" methods
            const {
              geometry: {
                location: { lat, lng },
              },
            } = placeDetails;

            // Extract place details in desired format
            const newLocationObj = {
              location: place.description,
              type: "Point",
              coordinates: [Math.abs(lng()), Math.abs(lat())],
            };

            // Set the object to the passed setState from other components
            setLocation(newLocationObj);
          }
        }
      );
  };

  return (
    <>
      <InputForm
        inputFields={{
          name: name || "",
          id: "google-place",
          type: "text",
          placeholder: "",
          onChange: (value: any) => {
            setPlaceId("");
            getPlacePredictions({ input: value });
          },
          ref,
          default: defaultValue || "",
        }}
      />
      <div className={styles["predictions-wrapper"]}>
        <div className={styles["all-places-predictions"]}>
          {/* Show or Hide Predictions */}
          {!placeId && !isPlacePredictionsLoading
            ? placePredictions.map((item, index) => (
                // Return Every Prediction
                <GooglePlacesPredictions
                  key={index}
                  item={item}
                  getPlaceDetails={getPlaceDetails}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default GooglePlacesInput;
