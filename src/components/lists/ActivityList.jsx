import { AlertCircle } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import Loader from "../global/Loader";
import ActivityCard from "../subcomponents/ActivityCard";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "../../utils/motion";

export default function ActivityList({ search, searchable }) {
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities`);
  const filteredActivities = !loading && !error && searchable ? data?.filter((activity) => activity?.name?.toLowerCase().includes(search?.toLowerCase())) : [];
  return (
    <AnimatePresence>
      <div className="flex w-full flex-col items-center gap-8">
        {loading ? (
          <Loader size="lg" />
        ) : error ? (
          <div className="flex items-center gap-1">
            <AlertCircle className="text-red-500" />
            <p className="text-base text-red-500">{error?.message ? error?.message : "Kunne ikke hente dataen, prøv igen senere."}</p>
          </div>
        ) : searchable ? (
          search === "" ? (
            <></>
          ) : filteredActivities?.length === 0 ? (
            <motion.div initial="hidden" animate="show" variants={fadeUp(0)} className="flex flex-col items-center gap-2 text-lg text-red-500">
              <AlertCircle size={38} />
              <p>Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</p>
            </motion.div>
          ) : (
            filteredActivities?.map((activity, index) => <ActivityCard index={index} key={activity?.id} activity={activity} />)
          )
        ) : (
          data?.map((activity, index) => <ActivityCard index={index} key={activity?.id} activity={activity} />)
        )}
      </div>
    </AnimatePresence>
  );
}
