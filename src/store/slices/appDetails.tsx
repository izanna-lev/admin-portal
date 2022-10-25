import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface AppDetails {
    aboutUs: String
    privacyPolicy: String
    termsAndConditions: String
}

const initialState: AppDetails = {
    aboutUs: "",
    privacyPolicy: "",
    termsAndConditions: "",
};

const appDetails = createSlice({
  name: "appDetails",
  initialState,
  reducers: {
    setAppdetails: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(API.APP_DETAILS, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export const { setAppdetails } = appDetails.actions;

export default appDetails.reducer;
