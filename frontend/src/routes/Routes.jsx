import { useContext, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import SpeedTestInterface from "../pages/SpeedTestInterface.jsx";
import SpeedTestResults from "../pages/SpeedTestResults.jsx";
import Announcement from "../components/announcements/Announcement.jsx";
import { useTranslation } from "react-i18next";
import UserLanguageContext from "../context/UserLanguageContext.jsx";
import Users from "../pages/Users.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import UserProfileDetails from "../pages/UserProfileDetails.jsx";
import SupportAvailability from "../pages/SupportAvailability.jsx";

const LoadingIndicator = () => {
  return <div>Loading...</div>;
};

const AppRoutes = () => {
  const { currentUser } = useContext(UserContext);
  const { language, fetchUser } = useContext(UserLanguageContext);

  useEffect(() => {
    if (currentUser?.user?._id) {
      fetchUser(currentUser.user._id);
    }
  }, [currentUser]);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace key="navigate-dashboard" />
            ) : (
              <Navigate to="/welcome" replace key="welcome-content" />
            )
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/dashboard"
            element={<DashboardLayout key="dashboard-layout" />}
          >
            <Route
              index
              element={
                <Dashboard userdata={currentUser} key="dashboard-content" />
              }
            />
          </Route>
          <Route
            path="/announcements"
            element={<DashboardLayout key="dashboard-layout" />}
          >
            <Route index element={<Announcement />} />
          </Route>
          <Route path="/users" element={<DashboardLayout key="users" />}>
            <Route index element={<Users currentUser={currentUser} />} />
          </Route>
          <Route
            path="/ctitizen-profile"
            element={<DashboardLayout key="user-profile" />}
          >
            <Route index element={<UserProfile userData={currentUser} />} />
          </Route>
          <Route
            path="/userProfileDetails"
            element={<DashboardLayout key="user-profile-details" />}
          >
            <Route
              index
              element={<UserProfileDetails currentUser={currentUser} />}
            />
          </Route>
          <Route
            path="/availability"
            element={<DashboardLayout key="availability" />}
          >
            <Route index element={<SupportAvailability />} />
          </Route>
        </Route>
        <Route path="/speed-test-interface" element={<SpeedTestInterface />} />
        <Route path="/speed-test-results" element={<SpeedTestResults />} />
        <Route
          path="/welcome"
          element={<LandingPage key="welcome-content" />}
        />
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login key="login-content" />
            )
          }
        />
        <Route path="*" element={<PageNotFound key="not-found-content" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
