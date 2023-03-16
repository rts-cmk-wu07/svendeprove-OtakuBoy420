import axios from "axios";
import { toast } from "react-toastify";
import checkTokenValidity from "./checkTokenValidity";
export default function joinClass(id, weekday, setHasJoined, setUserJoinedDays, userJoinedDays, userAge, minAge, maxAge, auth, setAuth) {
  checkTokenValidity(auth, setAuth);
  if (!auth) {
    toast.error("Du skal være logget ind for at kunne tilmelde dig", {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }

  if (userJoinedDays.includes(weekday)) {
    toast.error(`Du er allerede tilmeldt en aktivitet på ${weekday ? weekday : "denne dag"}`, {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }
  if (userAge < minAge || userAge > maxAge) {
    toast.error(`Du er ikke i aldersgruppen for denne aktivitet`, {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }

  setHasJoined(true);
  axios.post(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/activities/${id}`, {}, { headers: { Authorization: `Bearer ${auth?.token}`, "Content-Type": "application/json" } });
  setUserJoinedDays([...userJoinedDays, weekday]);
  toast.success("Du er nu tilmeldt denne aktivitet", {
    position: "top-center",
  });
  return;
}
