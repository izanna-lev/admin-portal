import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface NotificationUserList {
  data: listObject[];
}

const initialState: NotificationUserList = {
  data: [],
};

const NotificationUserList = createSlice({
  name: "NotificationUserList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.LIST_USERS, (state, action: any) => {
      Object.assign(state.data, Object.values(action.payload));
    });
  },
});

export default NotificationUserList.reducer;
