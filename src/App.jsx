import { Route, Routes } from "react-router";
import Layout from "./Layout";
import { useLocation } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import CustomToastContainer from "./components/global/CustomNotification";
import ActivitiesPage from "./pages/ActivitiesPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import CalendarPage from "./pages/CalendarPage";
import SearchPage from "./pages/SearchPage";
import RosterPage from "./pages/RosterPage";
import WelcomePage from "./pages/WelcomePage";
import LoginModalContext from "./contexts/LoginModalContext";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";
import LoginModal from "./components/global/LoginModal";
import { useEffect } from "react";
import { getCookie } from "react-use-cookie";
export default function App() {
  const location = useLocation();
  const [loginModal, setLoginModal] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [auth, setAuth] = useState(false);
  const tokenCookie = getCookie("token");
  const storedToken = sessionStorage.getItem("token");
  useEffect(() => {
    if (!auth) {
      if (tokenCookie) {
        setAuth(JSON.parse(tokenCookie));
      } else if (storedToken) {
        setAuth(JSON.parse(storedToken));
      }
    }
  }, []);
  return (
    <LoginModalContext.Provider value={{ loginModal, setLoginModal }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <CustomToastContainer />
        <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout hasSeenWelcome={hasSeenWelcome} />}>
              {!hasSeenWelcome ? <Route index element={<WelcomePage setHasSeenWelcome={setHasSeenWelcome} />} /> : <Route index element={<ActivitiesPage />} />}
              <Route path="/activity/:id" element={<ActivityDetailsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/roster/:id" element={auth?.role === "instructor" ? <RosterPage /> : <h1 className="p-6 text-xl">Du har ikke adgang til denne side.</h1>} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthContext.Provider>
    </LoginModalContext.Provider>
  );
}
