import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  name: string;
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

const specialistList = createSlice({
  name: "specialistList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.SPECIALIST_LIST, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default specialistList.reducer;
