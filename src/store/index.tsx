import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import * as reducers from "./slices";

export const store = configureStore({
  reducer: {
    allTickets: reducers.allTickets,
    apiMessage: reducers.apiMessage,
    appData: reducers.appData,
    dashboard: reducers.dashboard,
    itineraries: reducers.itineraries,
    itineraryData: reducers.itineraryData,
    loader: reducers.loader,
    login: reducers.login,
    notes: reducers.notes,
    navigation: reducers.navigation,
    profile: reducers.profile,
    reservation: reducers.reservation,
    transportation: reducers.transportation,
    specialists: reducers.specialists,
    specialistList: reducers.specialistsList,
    notificationUserList: reducers.NotificationUserList
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware().concat([])
      : getDefaultMiddleware().concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
