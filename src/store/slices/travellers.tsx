import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  name: string;
}

interface TravellerlistState {
  list: listObject[];
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: TravellerlistState = {
  list: [],
  hasMore: false,
  page: 1,
  size: 0,
  total: 0,
  limit: 10,
};

const TravellerList = createSlice({
  name: "TravellerList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.USER_LIST, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default TravellerList.reducer;
