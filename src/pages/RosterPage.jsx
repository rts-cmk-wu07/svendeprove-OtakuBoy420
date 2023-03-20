import { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../components/global/Loader";
import AuthContext from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

export default function RosterPage() {
  const { id } = useParams();
  const location = useLocation();
  const activityTitle = new URLSearchParams(location.search).get("title");
  const { auth } = useContext(AuthContext);
  const { data, loading, error } = useAxios(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/roster`, {
    needsAuth: true,
    token: auth?.token,
    needsId: true,
    id: id,
  });
  return (
    <section className="mx-auto max-w-6xl p-6">
      {loading ? (
        <Loader size="lg" />
      ) : (
        <article className="lg:mt-14 lg:text-center">
          <h1 className="mb-8 truncate text-xl">{activityTitle ? activityTitle : data?.length > 0 ? data[0]?.activity : "Aktivitet"}</h1>
          {!data || error ? (
            <p className="text-lg">Der er sket en fejl, er du sikker du er på den rigtige side?</p>
          ) : data?.length > 0 ? (
            <>
              <h2 className="mb-4 text-lg">
                {data?.length} {data?.length > 1 ? "Tilmeldte:" : "Tilmeldt:"}
              </h2>
              <ul className="flex flex-col gap-1">
                {data?.map((user, index) => (
                  <li key={index} className="mb-4 list-inside list-disc">
                    {user?.firstname} {user?.lastname}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-lg">Der er ingen tilmeldte endnu, kom tilbage senere!</p>
          )}
        </article>
      )}
    </section>
  );
}
