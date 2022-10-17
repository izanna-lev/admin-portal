import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  userName: string;
  location: string;
  phoneNumber: string;
  numberOfGuests: number;
  plannedDate: string;
  plannedTraveller: string;
  status: number

}

interface TravellerDetailsState {
  itinerary: listObject[];
  _id: String;
  name: String;
  image: String;
}

const initialState: TravellerDetailsState = {
 itinerary: [],
  _id: "",
  name: "",
  image: "",
};

const TravellerDetails = createSlice({
  name: "travellerDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.TRAVELLER_DETAILS, (state: TravellerDetailsState, action: any) => {
      Object.assign(state, action.payload[0]);
    });
  },
});

export default TravellerDetails.reducer;
