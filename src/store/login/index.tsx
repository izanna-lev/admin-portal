import { RootState } from "..";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";

import { API } from "../../constants";

import { setLoader } from "../slices/loader";
import { setApiMessage } from "../slices/apiMessage";
import { getAccessToken } from "../slices/login";
import { setProfile } from "../slices/profile";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (
    dispatch: (arg0: { payload: any; type: string }) => void,
    getState: any
  ) => {
    try {
      dispatch(setLoader(true));
      const response = await axios.post(API.LOGIN, {
        email,
        password,
      });
      dispatch(setLoader(false));
      if (response.data.code !== 100) throw new Error(response.data.message);

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      dispatch(getAccessToken(response.data.data));
      dispatch(setProfile(response.data.data.user));

      dispatch(
        setApiMessage({
          message: response.data.message,
          type: "success",
        })
      );
    } catch (err: any) {
      dispatch(
        setApiMessage({
          message: err.message,
          type: "error",
        })
      );
      //   dispatch(setLoader(false));
    }
  };
};
