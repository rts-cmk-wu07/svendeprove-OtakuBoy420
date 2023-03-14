import { Route, Routes } from "react-router";
import Layout from "../../Layout";
import HomePage from "../../pages/HomePage";
import { useLocation } from "react-router";
import NotFoundPage from "../../pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import CustomToastContainer from "../global/CustomNotification";
export default function Router() {
  const location = useLocation();

  return (
    <>
      <CustomToastContainer />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
