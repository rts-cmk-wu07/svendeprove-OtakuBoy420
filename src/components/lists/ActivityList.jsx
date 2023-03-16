import { AlertCircle } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import Loader from "../global/Loader";
import ActivityCard from "../subcomponents/ActivityCard";
export default function ActivityList() {
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities`);
  return (
    <div className="flex w-full flex-col items-center gap-8">
      {loading ? (
        <Loader size="lg" />
      ) : error ? (
        <div className="flex items-center gap-1">
          <AlertCircle className="text-red-500" />
          <p className="text-base text-red-500"> {error?.message ? error?.message : "Kunne ikke hente dataen, prøv igen senere."}</p>
        </div>
      ) : (
        data?.map((activity) => <ActivityCard key={activity?.id} activity={activity} />)
      )}
    </div>
  );
}
