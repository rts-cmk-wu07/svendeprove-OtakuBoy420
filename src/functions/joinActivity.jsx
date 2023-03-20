import axios from "axios";
import { toast } from "react-toastify";
import checkTokenValidity from "./checkTokenValidity";

export default function joinActivity(data, setHasJoined, setUserJoinedDays, userJoinedDays, userAge, auth, setAuth) {
  // Kører min checkTokenValidity funktion som fungerer som en slags middleware der tjekker om ens token er udløbet og hvis det er det, så bliver logger brugeren ud og viser en notifikation.
  checkTokenValidity(auth, setAuth);

  //GUARD CLAUSES

  // Hvis brugeren ikke er logget ind, vises en fejlmeddelelse og funktionen afbrydes
  if (!auth) {
    toast.error("Du skal være logget ind for at kunne tilmelde dig aktiviteter", {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }

  // Hvis brugeren allerede er tilmeldt en aktivitet på samme ugedag, vises en fejlmeddelelse og funktionen afbrydes
  if (userJoinedDays.includes(data?.weekday)) {
    toast.error(`Du er allerede tilmeldt en aktivitet på ${data?.weekday ? data?.weekday : "denne dag"}`, {
      autoClose: 5000,
    });
    return;
  }

  // Hvis brugerens alder ikke er inden for aldersgrænsen for aktiviteten, vises en fejlmeddelelse og funktionen afbrydes
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

  // Laver en POST request til API'et med brugerens token og id for at tilmelde brugeren til aktiviteten
  axios.post(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/activities/${data?.id}`, {}, { headers: { Authorization: `Bearer ${auth?.token}`, "Content-Type": "application/json" } });

  // Opdaterer userJoinedDays statet med den nye ugedag, så brugeren ikke kan tilmelde sig aktiviteten igen
  setUserJoinedDays([...userJoinedDays, data?.weekday]);

  // Opdaterer hasJoined statet til true, så brugeren ikke kan tilmelde sig aktiviteten igen
  setHasJoined(true);

  // Viser en succesmeddelelse om tilmelding
  toast.success(
    <div>
      Du er nu tilmeldt {data?.name}. <br />
      Vær klar på {data?.weekday.charAt(0).toUpperCase()}
      {data?.weekday.slice(1)} kl.{data?.time}!
    </div>,
    {
      autoClose: 5000,
    }
  );
}
