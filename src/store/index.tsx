import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import * as reducers from "./slices";

export const store = configureStore({
  reducer: {
    allTickets: reducers.allTickets,
    apiMessage: reducers.apiMessage,
    appData: reducers.appData,
    appDetails: reducers.AppDetails,
    chatList: reducers.chatList,
    dashboard: reducers.dashboard,
    faqList: reducers.FaqList,
    itineraries: reducers.itineraries,
    itinerary: reducers.itinerary,
    loader: reducers.loader,
    login: reducers.login,
    messageList: reducers.messageList,
    navigation: reducers.navigation,
    notificationUserList: reducers.NotificationUserList,
    profile: reducers.profile,
    specialistList: reducers.specialistsList,
    specialists: reducers.specialists,
    socket: reducers.socket,
    travellerList: reducers.TravellerList,
    travellerDetails: reducers.TravellerDetails,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredPaths: ["socket.socket"],
          },
        }).concat([])
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredPaths: ["socket.socket"],
          },
        }).concat(createLogger()),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
