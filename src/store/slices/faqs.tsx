import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface listObject {
  _id: string;
  qustion: string;
  answer: string;
}

interface FaqListState {
  list: listObject[];
  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: FaqListState = {
  list: [],
  hasMore: false,
  page: 0,
  size: 0,
  total: 0,
  limit: 10,
};

const faqList = createSlice({
  name: "faqList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(API.FAQ_LIST, (state, action: any) => {
      Object.assign(state, action.payload);
    });
  },
});

export default faqList.reducer;
