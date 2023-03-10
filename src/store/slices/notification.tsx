import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface NotificationUserListType {
  data: listObject[];
}

const initialState: NotificationUserListType = {
  data: [],
};

const NotificationUserList = createSlice({
  name: "NotificationUserList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.LIST_USERS, (state, action: any) => {
      state.data = action.payload;
    });
  },
});

export default NotificationUserList.reducer;
