import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Loader from "../components/global/Loader";
import useAxios from "../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import CalendarUserList from "../components/lists/CalendarUserList";
import CalendarInstructorList from "../components/lists/CalendarInstructorList";
import LoginModalContext from "../contexts/LoginModalContext";
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
  return (
    <AnimatePresence>
      <motion.section initial="hidden" animate="show" className="p-6">
        {userLoading ? (
          <Loader size="lg" />
        ) : (
          <>
            <h1 className="mb-8 text-xl">Calendar</h1>
            {auth?.role === "default" && <CalendarUserList userActivities={userData?.activities} />}
            {auth?.role === "instructor" && <CalendarInstructorList instructorId={userData?.id} />}
            {!auth && (
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
