import axios from "axios";
import { toast } from "react-toastify";
export default function leaveClass(id, weekday, setHasJoined, token, userId, setUserJoinedDays, userJoinedDays) {
  if (!token) {
    toast.error("Du skal være logget ind for at kunne forlade aktiviteter", {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }
  axios.delete(`${import.meta.env.VITE_API_URI}/users/${userId}/activities/${id}`, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
  setHasJoined(false);
  setUserJoinedDays(userJoinedDays.filter((day) => day !== weekday));
  toast.success("Du har nu forladt denne aktivitet", {
    className: "toast-bottom-message",
  });

  return;
}
