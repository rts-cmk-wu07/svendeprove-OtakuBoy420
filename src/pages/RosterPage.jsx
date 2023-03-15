import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/global/Loader";
import AuthContext from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

export default function RosterPage() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [instructorActivities, setInstructorActivities] = useState([]);
  const { data, loading, error } = useAxios(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/roster`, {
    needsAuth: true,
    token: auth?.token,
    needsId: true,
    id: id,
  });
  useEffect(() => {
    if (data && !loading) {
      const activities = data.map((item) => item.activity);
      const uniqueActivities = [...new Set(activities)];
      setInstructorActivities(uniqueActivities);
    }
  }, [data]);
  console.log(instructorActivities);
  // if (!loading && data) console.log(data?.filter((item) => item === instructorActivities[0]));
  if (!loading) console.log(data.filter((item) => item === instructorActivities[0]));
  return (
    <section className="p-6">
      <h1 className="mb-8 text-xl">Roster</h1>
      {loading && !data ? (
        <Loader size="lg" />
      ) : (
        <>
          {instructorActivities.map((activity) => (
            <div>
              <h2>{activity}</h2>
              {/* {data
                .filter((item) => item === activity)
                .map((item) => (
                  <div>
                    <p>{item.firstName}</p>
                    <p>{item.lastName}</p>
                  </div>
                ))} */}
            </div>
          ))}
        </>
      )}
    </section>
  );
}
