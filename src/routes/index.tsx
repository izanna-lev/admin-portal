/* eslint-disable import/no-anonymous-default-export */
import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { useAppSelector } from "../store/hooks";
import { useState } from "react";

const Account = loadable(() => import("./Account"));
const AssignedItineraries = loadable(() => import("./ItinerariesList"));
const Chat = loadable(() => import("./Chat"));
const CreateItinerary = loadable(() => import("./CreateItinerary"));
const Dashboard = loadable(() => import("./Dashboard"));
const Itinerary = loadable(() => import("./Itinerary"));
const ItineraryDetails = loadable(() => import("./ItineraryDetails"));
const Login = loadable(() => import("./Login"));
const SendNotifications = loadable(() => import("./Notifications"));
const CancelledItineraries = loadable(() => import("./CancelledItineraries"));
const AccessManagement = loadable(() => import("./AccessManagement"));
const CreateSpecialist = loadable(() => import("./CreateSpecialist"));
const EditSpecialist = loadable(() => import("./EditSpecialist"));
const Activities = loadable(() => import("./CreateItinerary/Activities"));
const Accomodation = loadable(() => import("./CreateItinerary/Accomodation"));
const Travelers = loadable(() => import("./Travelers"));
const TravelersDetails = loadable(() => import("./TravelerDetails"));
const TripSummary = loadable(() => import("./CreateItinerary/TripSummary"));
const Settings = loadable(() => import("./Settings"));
const AboutUs = loadable(() => import("./AboutUs"));
const TermsConditions = loadable(() => import("./TermsConditions"));
const PrivacyPolicy = loadable(() => import("./PrivacyPolicy"));
const Faqs = loadable(() => import("./Faqs"));
const AddFaq = loadable(() => import("./AddFaq"));
const EditFaq = loadable(() => import("./EditFaq"));

const AddItinerary = loadable(
  () => import("./CreateItinerary/ItineraryDetails")
);
const Notes = loadable(() => import("./CreateItinerary/Notes"));

const Restaurant = loadable(() => import("./CreateItinerary/Restaurant"));
const Transportation = loadable(
  () => import("./CreateItinerary/Transportation")
);

const App = () => {
  const [sideNavView, setSideNavView] = useState(() => {
    if (window.innerWidth <= 1200) return true;
    return false;
  });
  const { itineraryDetails } = useAppSelector((state) => state.itinerary);
  const updateSideNav = () => setSideNavView((current) => !current);

  return (
    <Routes>
      <Route
        path="/"
        element={<Account sideNav={updateSideNav} sideNavView={sideNavView} />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="itinerary" element={<Itinerary />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<AssignedItineraries />} />
          <Route path="cancelled" element={<CancelledItineraries />} />
          <Route path="detail/:formRef" element={<ItineraryDetails />} />
          <Route path="add" element={<CreateItinerary />}>
            <Route index element={<Navigate to="details" />} />
            <Route
              path="details"
              element={<AddItinerary data={itineraryDetails} />}
            />
            <Route
              path="transportation"
              element={
                <Transportation status={itineraryDetails.itineraryStatus} />
              }
            />
            <Route
              path="accomodation"
              element={
                <Accomodation status={itineraryDetails.itineraryStatus} />
              }
            />
            <Route
              path="restaurant"
              element={<Restaurant status={itineraryDetails.itineraryStatus} />}
            />
            <Route
              path="activity"
              element={<Activities status={itineraryDetails.itineraryStatus} />}
            />
            <Route
              path="note"
              element={<Notes status={itineraryDetails.itineraryStatus} />}
            />
            <Route
              path="summary"
              element={
                <TripSummary status={itineraryDetails.itineraryStatus} />
              }
            />
          </Route>
        </Route>

        <Route path="travelers">
          <Route index element={<Travelers />} />
          <Route path="details/:travellerRef" element={<TravelersDetails />} />
        </Route>

        <Route path="admin">
          <Route index element={<Navigate to="accessSpecialistList" />} />
          <Route path="accessSpecialistList" element={<AccessManagement />} />
          <Route path="createSpecialist" element={<CreateSpecialist />} />
          <Route
            path="editSpecialist/:specialistRef"
            element={<EditSpecialist />}
          />
        </Route>

        <Route path="settings" element={<Settings sideNavView={sideNavView} />}>
          <Route index element={<Navigate to="about" />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="faqs/add" element={<AddFaq />} />
          <Route path="faqs/edit/:faqRef" element={<EditFaq />} />
        </Route>

        <Route path="notifications" element={<SendNotifications />} />
        <Route path="chat">
          <Route index element={<Chat />} />
          <Route path=":channelId" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace={true} />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
