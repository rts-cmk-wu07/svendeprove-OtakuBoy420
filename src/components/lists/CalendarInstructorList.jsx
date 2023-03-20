import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import CalendarActivity from "../subcomponents/CalendarActivity";

export default function CalendarInstructorList({ instructorId }) {
  const { data, loading, error } = useAxios(`${import.meta.env.VITE_API_URI}/activities`);
  const [instructorActivities, setInstructorActivities] = useState([]);
  useEffect(() => {
    !loading && !error && setInstructorActivities(data.filter((activity) => activity.instructorId === instructorId));
  }, [data]);
  return (
    <div className="flex w-full flex-col items-center gap-8">
      {instructorActivities?.map((activity, index) => (
        <CalendarActivity key={activity?.id} index={index} activity={activity} />
      ))}
    </div>
  );
}
