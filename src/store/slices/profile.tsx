import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface Profile {
  zone: string;
  email: string;

  _id: string;
}

const initialState: Profile = {
  zone: "",
  email: "",
  _id: "",
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(API.PROFILE, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export const { setProfile } = profile.actions;

export default profile.reducer;
