import { AlertCircle } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import Loader from "../global/Loader";
import ActivityCard from "../subcomponents/ActivityCard";
import { AnimatePresence } from "framer-motion";
export default function ActivityList({ search, searchable }) {
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities`);
  const filteredActivities = !loading && searchable ? data?.filter((activity) => activity?.name?.toLowerCase().includes(search?.toLowerCase())) : [];
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
            <p className="text-lg text-red-500">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</p>
          ) : (
            filteredActivities?.map((activity, index) => <ActivityCard index={index} key={activity?.id} activity={activity} />)
          )
        ) : (
          data?.map((activity) => <ActivityCard key={activity?.id} activity={activity} />)
        )}
      </div>
    </AnimatePresence>
  );
}
