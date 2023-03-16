import { useParams } from "react-router-dom";
import Loader from "../components/global/Loader";
import useAxios from "../hooks/useAxios";

import { motion, AnimatePresence } from "framer-motion";

import ActivityDetailsHero from "../components/subcomponents/ActivityDetailsHero";
import ActivityDetailsContent from "../components/subcomponents/ActivityDetailsContent";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
export default function ActivityDetailsPage() {
  const { id } = useParams();
  const { auth, setAuth } = useContext(AuthContext);
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities/${id}`);
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
      <motion.section initial="hidden" animate="show">
        {loading && userLoading ? (
          <article className="flex h-screen w-screen items-center justify-center">
            <Loader size="lg" />
          </article>
        ) : (
          <>
            <ActivityDetailsHero data={data} userData={userData} auth={auth} setAuth={setAuth} />
            <ActivityDetailsContent data={data} />
          </>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
