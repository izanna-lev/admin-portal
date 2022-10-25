/**
 * This file defines application level constants
 */

// Global Environment Variables

// const SERVER_TYPE = `${process.env.BRANCH}/`;
// const API_URL = process.env.API_URL;
// const S3_URL = process.env.S3_URL;

const SERVER_TYPE = "development/";
const API_URL = "http://localhost:3001/api/";
const S3_URL = "https://app-onsite.s3.amazonaws.com/";

// Custom Environment Variables

const ICONS_URL = `${S3_URL}assets/`;
const IMAGE_URL = `${S3_URL}${SERVER_TYPE}images/`;

// Google Places Api Key

export const GOOGLE_API = process.env.GOOGLE_API;
// export const GOOGLE_API = "AIzaSyByy1LrT-5ZQ642PzXM4m_WCQ-fS6GO-9s";

console.log(SERVER_TYPE, API_URL, S3_URL, GOOGLE_API);

// Available Icon Prefix Variables

const ACTION_ICON = `${ICONS_URL}action/`;
const NAVIGATION_ICON = `${ICONS_URL}navigation/`;
const STATUS_ICON = `${ICONS_URL}status/`;

// Available Image Quality Prefixes

export const IMAGE = {
  SMALL: `${IMAGE_URL}small/`,
  AVERAGE: `${IMAGE_URL}average/`,
  BEST: `${IMAGE_URL}best/`,
};

// All Server API Endpoints

export const API = {
  LOGIN: `${API_URL}admin/login`,
  PROFILE: `${API_URL}specialist/details`,
  DASHBOARD: `${API_URL}admin/dashboard`,

  // Specialist (List & Actions)
  SPECIALIST_LIST: `${API_URL}admin/specialistList`,
  ASSIGN_SPECIALIST: `${API_URL}admin/assignSpecialist`,
  USER_LIST: `${API_URL}admin/userList`,
  USER_ACTION: `${API_URL}admin/editUser`,

  //TRAVELLER
  TRAVELLER_DETAILS: `${API_URL}admin/userDetails`,

  // Itinerary (List & Actions)

  ITINERARIES: `${API_URL}admin/itinerariesList`,
  ITINERARY_ADD: `${API_URL}admin/add`,
  ITINERARY_EDIT: `${API_URL}admin/edit`,
  ITINERARY_DETAILS: `${API_URL}admin/details`,
  ITINERARY_COMPLETE: `${API_URL}admin/complete`,
  ITINERARY_CANCEL: `${API_URL}admin/cancel`,

  // Itinerary Transportation (List & Actions)

  TRANSPORTATION_DATA: `${API_URL}admin/transportationList`,
  TRANSPORTATION_DELETE: `${API_URL}admin/deleteTransportation`,

  ADD_CAR: `${API_URL}admin/addCar`,
  ADD_FERRY: `${API_URL}admin/addTrainFerry`,
  ADD_FLIGHT: `${API_URL}admin/addFlight`,
  ADD_TRAIN: `${API_URL}admin/addTrainFerry`,

  EDIT_CAR: `${API_URL}admin/editCar`,
  EDIT_FERRY: `${API_URL}admin/editTrainFerry`,
  EDIT_FLIGHT: `${API_URL}admin/editFlight`,
  EDIT_TRAIN: `${API_URL}admin/editTrainFerry`,

  // Reservation (List & Actions)

  RESERVATION_DELETE: `${API_URL}admin/deleteReservation`,
  RESERVATION_LIST: `${API_URL}admin/reservationList`,

  ACCOMODATION_ADD: `${API_URL}admin/addAccommodation`,
  ACCOMODATION_EDIT: `${API_URL}admin/editAccommodation`,

  ACTIVITY_ADD: `${API_URL}admin/addActivity`,
  ACTIVITY_EDIT: `${API_URL}admin/editActivity`,

  RESTAURANT_ADD: `${API_URL}admin/addRestaurant`,
  RESTAURANT_EDIT: `${API_URL}admin/editRestaurant`,

  // Notes (List & Actions)

  NOTE_ADD: `${API_URL}admin/addNote`,
  NOTE_DELETE: `${API_URL}admin/deleteNote`,
  NOTE_EDIT: `${API_URL}admin/editNote`,
  NOTES_LIST: `${API_URL}admin/noteList`,

  // Trip Summary (List)

  TRIP_LIST: `${API_URL}admin/tripList`,

  // Trip Days (List)

  DAYS_LIST: `${API_URL}admin/dayList`,

  // Submit Itinerary (List)

  SUBMIT_ITINERARY: `${API_URL}admin/submit`,

  // Upload Image

  IMAGE_UPLOAD: `${API_URL}admin/upload`,

  // ACCESS MANAGEMENT

  LIST_SPECIALIST: `${API_URL}admin/accessSpecialistList`,
  CREATE_SPECIALIST: `${API_URL}admin/createSpecialist`,
  EDIT_SPECIALIST: `${API_URL}admin/editSpecialist`,
  DELETE_SPECIALIST: `${API_URL}admin/deleteSpecialist`,
  ACTION_SPECIALIST: `${API_URL}admin/specialistActions`,

  // ITINERARIES
  LIST_ITINERARIES: `${API_URL}specialist/cancelRequestList`,

  //NOTIFICATIONS
  LIST_USERS: `${API_URL}notification/userSelectList`,
  BROADCAST: `${API_URL}notification/broadcast`,

  // APP DETAILS
  APP_DETAILS: `${API_URL}appdetail/list`,
  APP_DETAILS_ADD: `${API_URL}appdetail/add`,

  // FAQ
  FAQ_LIST: `${API_URL}faq/list`,
  FAQ_ADD: `${API_URL}faq/add`,
  FAQ_EDIT: `${API_URL}faq/update`,
  FAQ_DELETE: `${API_URL}faq/delete`,
};

type IconOptions = {
  [key: string]: string;
};

// All Icon Endpoints

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


  ABOUT_US: `${NAVIGATION_ICON}ic-about-us-inactive.svg`,
  FAQ: `${NAVIGATION_ICON}ic-faq-inactive.svg`,
  PRIVACY_POLICY: `${NAVIGATION_ICON}ic-privacy-policy-inactive.svg`,
  SETTINGS: `${NAVIGATION_ICON}ic-settings-inactive.svg`,
  TERMS_CONDOTION: `${NAVIGATION_ICON}ic-t&c-inactive.svg`,
  // PAGINATION ICONS
  NEXT_PAGE: `${ACTION_ICON}ic_next.svg`,
  PREV_PAGE: `${ACTION_ICON}ic_previous.svg`,

  // STATUS ICONS
  PENDING: `${STATUS_ICON}ic_pending.svg`,
  UPCOMING: `${STATUS_ICON}ic_upcoming.svg`,
  COMPLETED: `${STATUS_ICON}ic_completed.svg`,
};

// Custom Constants

type ItineraryOptions = {
  [key: number]: string;
};

export const ITINERARY_STATUS: ItineraryOptions = {
  1: "Ongoing",
  2: "Upcoming",
  3: "Cancelled",
  4: "Pending",
  5: "Completed",
  6: "Expired",
};

export const TRAVELER_ITINERARY_DETAILS = {
  TRAVELER: 1,
  ITINERARY: 2,
};

export const ITINERARY_SECTION = {
  TRAVELER: 1,
  ITINERARY: 2,
  TRANSPORTATION: 3,
  ACCOMODATIONS: 4,
  RESTAURANT: 5,
  ACTIVITIES: 6,
  NOTES: 7,
  SUMMARY: 8,
};

export const PAYMENT_STATUS = [
  { name: "Unpaid", value: 1 },
  { name: "Paid", value: 2 },
];

export const RESERVATION_TYPE = {
  ACCOMMODATION: 1,
  RESTAURANT: 2,
  ACTIVITY: 3,
};

export const TRANSPORTATION_TYPE = {
  FLIGHT: 1,
  TRAIN: 2,
  FERRY: 3,
  CAR: 4,
};

export const TRAIN_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
];

export const FERRY_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
];

export const FLIGHT_CLASS = [
  { name: "Business", value: 1 },
  { name: "Economy", value: 2 },
];

export const ITINERARY_TYPE = [
  { name: "One Day", value: 1 },
  { name: "Domestic Trip", value: 2 },
  { name: "International Trip", value: 3 },
];

export const PLANNED_TRAVELLER = [
  { name: "I haven't even started", value: 1 },
  { name: "I have a few things planned but still have a lot to go", value: 2 },
  {
    name: "The important stuff is booked but I need to plan the itinerary",
    value: 3,
  },
];

//////////// NAVIGATION CONSTANT ///////////

export const NAVIGATE = {
  DASHBOARD: 1,
  TRAVELELRS: 2,
  ITINERARY: 3,
  CHAT: 4,
  ACCESS_MANAGEMENT: 5,
  NOTIFICATION: 6,
  SETTINGS: 7,
};


export const SETTINGS_NAVIGATE = {
  ABOUT_US: 11,
  FAQ: 12,
  TERMS: 13,
  PRIVACY: 14,
};

export const PERMISSIONS_STRING: { [key: string]: any } = {
  createItinerary: "Create Itinerary",
  editItinerary: "Edit Itinerary",
  cancelItinerary: "Cancel Itinerary",
  sendNotifications: "Send Notifications",
};

export const USER_TYPES_NOTIFICATION = {
  TRAVELLER: 1,
  SPECIALIST: 2,
  ALL: 3,
};

export const SPECIALIST_ACTIONS = {
  UNBLOCK: 1,
  BLOCK: 2,
};

export const USER_ACTIONS = {
  BLOCKED: 2,
  UNBLOCKED: 3,
  DELETED: 4,
};



