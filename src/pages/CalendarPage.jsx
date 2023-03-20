import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import Loader from "../components/global/Loader";
import useAxios from "../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import CalendarUserList from "../components/lists/CalendarUserList";
import CalendarInstructorList from "../components/lists/CalendarInstructorList";
import LoginModalContext from "../contexts/LoginModalContext";
import { toast } from "react-toastify";
import { fadeUp } from "../utils/motion";
import { AlertCircle } from "lucide-react";
import SEO from "../components/global/SEO";
export default function CalendarPage() {
  const { auth } = useContext(AuthContext);
  const { setLoginModal } = useContext(LoginModalContext);
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useAxios(`${import.meta.env.VITE_API_URI}/users`, {
    needsAuth: true,
    token: auth?.token,
    needsId: true,
    id: auth?.userId,
  });
  useEffect(() => {
    if (!auth) {
      setLoginModal(true);
      toast("Log venligst ind for at se kalenderen", { type: "info", toastId: "calendar-toast", autoClose: 3000 });
    }
  }, []);
  return (
    <AnimatePresence>
      <SEO title="Landrup Dans - Kalender" />
      <motion.section initial="hidden" animate="show" className="mx-auto max-w-6xl p-6">
        <h1 className="mb-8 text-xl lg:mt-14 lg:text-center">Kalender</h1>
        {userLoading ? (
          <Loader size="lg" />
        ) : (
          <>
            {userError && (
              <motion.div initial="hidden" animate="show" variants={fadeUp(0)} className="flex flex-col items-center gap-2 text-lg">
                <AlertCircle size={38} />
                <p>{userError ? userError.message : "Der skete en fejl på vores server. Prøv igen senere."}</p>
              </motion.div>
            )}
            {auth?.role === "default" && <CalendarUserList userActivities={userData?.activities} />}
            {auth?.role === "instructor" && <CalendarInstructorList instructorId={userData?.id} />}
            {!auth && !userError && (
              <div className="flex h-full flex-col items-center justify-center gap-6">
                <h1 className="text-lg">Du skal være logget ind for at se kalenderen</h1>
                <button className="rounded-full border border-black bg-secondary/25 py-1.5 px-6" onClick={() => setLoginModal(true)}>
                  Log ind her
                </button>
              </div>
            )}
          </>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
