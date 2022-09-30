import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  name: string
  email: string
  phoneNumber: string
  image: string
  blocked: boolean
  completedItineraries: number
  averageRatings: string
  permissions: object
}

interface SpecialistState {
  list: listObject[];
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: SpecialistState = {
  list: [],
  hasMore: false,
  page: 0,
  size: 0,
  total: 0,
  limit: 10,
};

const specialists = createSlice({
  name: "specialist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.LIST_SPECIALIST, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default specialists.reducer;
