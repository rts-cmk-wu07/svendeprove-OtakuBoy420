import axios from "axios";
import { toast } from "react-toastify";
export default function handleJoinClass(id, weekday, setHasJoined, token, userId, setUserJoinedDays, userJoinedDays, userAge, minAge, maxAge) {
  if (!token) {
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
  axios.post(`${import.meta.env.VITE_API_URI}/users/${userId}/activities/${id}`, {}, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
  setUserJoinedDays([...userJoinedDays, weekday]);
  toast.success("Du er nu tilmeldt til denne aktivitet", {
    position: "top-center",
  });
  return;
}
