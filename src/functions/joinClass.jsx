import axios from "axios";
import { toast } from "react-toastify";
import checkTokenValidity from "./checkTokenValidity";
export default function joinClass(data, setHasJoined, setUserJoinedDays, userJoinedDays, userAge, auth, setAuth) {
  checkTokenValidity(auth, setAuth);

  if (!auth) {
    toast.error("Du skal være logget ind for at kunne tilmelde dig aktiviteter", {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }

  if (userJoinedDays.includes(data?.weekday)) {
    toast.error(`Du er allerede tilmeldt en aktivitet på ${data?.weekday ? data?.weekday : "denne dag"}`, {
      autoClose: 5000,
    });
    return;
  }

  if (userAge < data?.minAge || userAge > data?.maxAge) {
    toast.error(
      `Du skal være mellem ${data?.minAge}-${data?.maxAge} år for at kunne tilmelde dig ${data?.name}
    `,
      {
        autoClose: 7500,
      }
    );
    return;
  }

  axios.post(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/activities/${data?.id}`, {}, { headers: { Authorization: `Bearer ${auth?.token}`, "Content-Type": "application/json" } });

  setUserJoinedDays([...userJoinedDays, data?.weekday]);

  setHasJoined(true);

  toast.success(
    <div>
      Du er nu tilmeldt {data?.name}. <br />
      Vær klar på {data?.weekday.charAt(0).toUpperCase()}
      {data?.weekday.slice(1)} kl. {data?.time}!
    </div>,
    {
      autoClose: 5000,
    }
  );
}
