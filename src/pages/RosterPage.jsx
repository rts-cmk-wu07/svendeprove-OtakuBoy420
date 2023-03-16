import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/global/Loader";
import AuthContext from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

export default function RosterPage() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const { data, loading, error } = useAxios(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/roster`, {
    needsAuth: true,
    token: auth?.token,
    needsId: true,
    id: id,
  });
  return (
    <section className="p-6">
      {loading ? (
        <Loader size="lg" />
      ) : !data || error ? (
        <p className="text-lg">Der er sket en fejl, er du sikker du er på den rigtige side?</p>
      ) : data?.length > 0 ? (
        <>
          <h1 className="mb-8 text-xl">{data[0]?.activity}</h1>
          <h2 className="mb-4 text-lg">
            {data?.length} {data?.length > 1 ? "Tilmeldte:" : "Tilmeldt:"}
          </h2>
          <ul className="flex flex-col gap-1">
            {data?.map((item, index) => (
              <li key={index} className="mb-4 border-b-2">
                <p className="mb-1">
                  {item?.firstname} {item?.lastname}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-lg">Der er ingen tilmeldte endnu, kom tilbage senere!</p>
      )}
    </section>
  );
}
