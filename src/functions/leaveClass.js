import axios from "axios";
import { toast } from "react-toastify";
import checkTokenValidity from "./checkTokenValidity";
export default function leaveClass(id, weekday, setHasJoined, setUserJoinedDays, userJoinedDays, auth, setAuth) {
  checkTokenValidity(auth, setAuth);

  if (!auth?.token) {
    toast.error("Du skal være logget ind for at kunne forlade aktiviteter", {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }
  axios.delete(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/activities/${id}`, { headers: { Authorization: `Bearer ${auth?.token}`, "Content-Type": "application/json" } });
  setHasJoined(false);
  setUserJoinedDays(userJoinedDays.filter((day) => day !== weekday));
  toast.success("Du har nu forladt denne aktivitet", {
    className: "toast-bottom-message",
  });

  return;
}
