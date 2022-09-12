/**
 * This file defines application level constants
 */

// Global Environment Variables
const API_URL = "http://44.209.25.93:3000/api/";
const ICONS_URL = "https://onsite-travel-assets.s3.amazonaws.com/";
const IMAGE_URL = "https://app-onsite.s3.amazonaws.com/development/images/";

// Google Places Api Key
export const GOOGLE_API = "AIzaSyByy1LrT-5ZQ642PzXM4m_WCQ-fS6GO-9s";

// export const GOOGLE_API = "AIzaSyC8slXFlsTx3BYPslH8Ba-7-COrx8G6R6M";

// Custom Variables
const ACTION_ICON = `${ICONS_URL}action/`;
const NAVIGATION_ICON = `${ICONS_URL}navigation/`;
const STATUS_ICON = `${ICONS_URL}status/`;

export const API = {
  LOGIN: `${API_URL}specialist/login`,
  PROFILE: `${API_URL}specialist/details`,
  DASHBOARD: `${API_URL}specialist/dashboard`,

  ITINERARIES: `${API_URL}itinerary/list`,
  ITINERARY_ADD: `${API_URL}itinerary/add`,
  ITINERARY_DETAILS: `${API_URL}itinerary/details`,

  TRANSPORTATION_DATA: `${API_URL}transportation/list`,

  ADD_CAR: `${API_URL}transportation/addCar`,
  ADD_FERRY: `${API_URL}transportation/addTrainFerry`,
  ADD_FLIGHT: `${API_URL}transportation/addFlight`,
  ADD_TRAIN: `${API_URL}transportation/addTrainFerry`,

  EDIT_CAR: `${API_URL}transportation/editCar`,
  EDIT_FERRY: `${API_URL}transportation/editTrainFerry`,
  EDIT_FLIGHT: `${API_URL}transportation/editFlight`,
  EDIT_TRAIN: `${API_URL}transportation/editTrainFerry`,
};

export const IMAGE = {
  SMALL: `${IMAGE_URL}small/`,
  AVERAGE: `${IMAGE_URL}average/`,
  BEST: `${IMAGE_URL}best/`,
};

type IconOptions = {
  [key: string]: string;
};

export const ICON: IconOptions = {
  SIGNIN: `${ICONS_URL}signin.png`,
  LOGOUT: `${ACTION_ICON}ic_logout.svg`,
  USER_PLACEHOLDER: `${ICONS_URL}placeholder.png`,

  // APP LOGO & BANNER
  APP_LOGO: `${ICONS_URL}logo.png`,
  APP_LOGO_BACKGROUND: `${ICONS_URL}ic_login-background.png`,

  // CHAT SCREEN ICONS
  CHAT_SEND: `${ACTION_ICON}ic_send.svg`,
  CHAT_ADD: `${ACTION_ICON}ic_add.svg`,

  // NAVBAR ICONS INACTIVE
  ACCESS_MANAGEMENT_INACTIVE: `${NAVIGATION_ICON}ic_access-management-inactive.svg`,
  CANCELLED_ITINERARIES_INACTIVE: `${NAVIGATION_ICON}ic_cancel-requests_inactive.svg`,
  CHAT_INACTIVE: `${NAVIGATION_ICON}ic_chat-inactive.svg`,
  DASHBOARD_INACTIVE: `${NAVIGATION_ICON}ic_home-inactive.svg`,
  ITINERARIES_INACTIVE: `${NAVIGATION_ICON}ic_itinerary-inactive.svg`,
  NOTIFICATIONS_INACTIVE: `${NAVIGATION_ICON}ic_notification_inactive.svg`,
  PROFILE_INACTIVE: `${NAVIGATION_ICON}ic_profile_inactive.svg`,
  SETTINGS_INACTIVE: `${NAVIGATION_ICON}ic_settings-inactive.svg`,
  TRAVELLERS_INACTIVE: `${NAVIGATION_ICON}ic_travellers-inactive.svg`,

  // PAGINATION ICONS
  NEXT_PAGE: `${ACTION_ICON}ic_next.svg`,
  PREV_PAGE: `${ACTION_ICON}ic_previous.svg`,

  // STATUS ICONS
  PENDING: `${STATUS_ICON}ic_pending.svg`,
  UPCOMING: `${STATUS_ICON}ic_upcoming.svg`,
  COMPLETED: `${STATUS_ICON}ic_completed.svg`,
};

// ////////// NAVIGATION CONSTANT ///////////

export const NAVIGATE = {
  DASHBOARD: 1,
  ITINERARY: 2,
  CHAT: 3,
  CANCELLED_ITINERARIES: 4,
  NOTIFICATION: 5,
  PROFILE: 6,
};

export const TRAVELER_ITINERARY_DETAILS = {
  TRAVELER: 1,
  ITINERARY: 2,
};

export const ITINERARY_TYPE = [
  {
    name: "One Day",
    value: 1,
  },
  {
    name: "Domestic Trip",
    value: 2,
  },
  {
    name: "International Trip",
    value: 3,
  },
];

export const FLIGHT_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
];

type ItineraryOptions = {
  [key: number]: string;
};

export const ITINERARY_STATUS: ItineraryOptions = {
  1: "Ongoing",
  2: "Upcoming",
  3: "Cancelled",
  4: "Pending",
  5: "Completed",
};

export const TRANSPORTATION_TYPE = {
  FLIGHT: 1,
  TRAIN: 2,
  FERRY: 3,
  CAR: 4,
};

export const PLANNED_TRVELLER = {
  HAVENT_STARTED: 1,
  FEW_THINGS: 2,
  IMPORTANT_STUFF: 3,
};
