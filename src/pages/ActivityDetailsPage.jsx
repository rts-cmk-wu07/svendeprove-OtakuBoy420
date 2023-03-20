import { useParams } from "react-router-dom";
import Loader from "../components/global/Loader";
import useAxios from "../hooks/useAxios";

import { motion, AnimatePresence } from "framer-motion";

import ActivityDetailsHero from "../components/subcomponents/ActivityDetailsHero";
import ActivityDetailsContent from "../components/subcomponents/ActivityDetailsContent";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { fadeUp } from "../utils/motion";
import { AlertCircle } from "lucide-react";
import SEO from "../components/global/SEO";
export default function ActivityDetailsPage() {
  const { id } = useParams();
  const { auth, setAuth } = useContext(AuthContext);
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities/${id}`);
  const { data: userData, loading: userLoading } = useAxios(`${import.meta.env.VITE_API_URI}/users`, {
    needsAuth: true,
    token: auth?.token,
    needsId: true,
    id: auth?.userId,
  });
  return (
    <AnimatePresence>
      <SEO title={data?.name ? `Landrup Dans - ${data?.name}` : "Landrup Dans - Aktivitet"} />
      <motion.section initial="hidden" animate="show" className="mx-auto max-w-6xl lg:flex lg:flex-col lg:items-center lg:justify-center">
        {loading && userLoading ? (
          <article className="flex h-screen w-screen items-center justify-center ">
            <Loader size="lg" />
          </article>
        ) : error ? (
          <motion.article initial="hidden" animate="show" variants={fadeUp(0)} className="mt-8 flex h-screen flex-col items-center gap-2 text-lg">
            <AlertCircle size={38} />
            <p>{error ? error.message : "Der skete en fejl på vores server. Prøv igen senere."}</p>
          </motion.article>
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
