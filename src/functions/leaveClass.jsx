import axios from "axios";
import { toast } from "react-toastify";
import checkTokenValidity from "./checkTokenValidity";
export default function leaveClass(data, setHasJoined, setUserJoinedDays, userJoinedDays, auth, setAuth) {
  checkTokenValidity(auth, setAuth);

  if (!auth) {
    toast.error("Du skal være logget ind for at kunne forlade aktiviteter", {
      autoClose: 5000,
    });
    return;
  }

  axios.delete(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/activities/${data?.id}`, { headers: { Authorization: `Bearer ${auth?.token}`, "Content-Type": "application/json" } });

  setHasJoined(false);

  setUserJoinedDays(userJoinedDays.filter((day) => day !== data?.weekday));

  toast.success(`Du er nu forladt ${data?.name}. Kig rundt for at finde en ny aktivitet!`, {
    autoClose: 5000,
  });
}
