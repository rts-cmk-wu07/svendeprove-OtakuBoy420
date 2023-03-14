import { Route, Routes } from "react-router"
import Layout from "../../Layout"
import { useLocation } from "react-router"
import NotFoundPage from "../../pages/NotFoundPage"
import { AnimatePresence } from "framer-motion"
import CustomToastContainer from "../global/CustomNotification"
import ActivitiesPage from "../../pages/ActivitiesPage"
import ActivityDetailsPage from "../../pages/ActivityDetailsPage"
import CalendarPage from "../../pages/CalendarPage"
import SearchPage from "../../pages/SearchPage"
import CalendarTeamPage from "../../pages/CalendarTeamPage"
import WelcomePage from "../../pages/WelcomePage"
export default function Router() {
  const location = useLocation()

  return (
    <>
      <CustomToastContainer />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activity/:id" element={<ActivityDetailsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendarteam" element={<CalendarTeamPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}
