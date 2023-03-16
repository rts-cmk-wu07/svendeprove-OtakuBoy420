import { toast } from "react-toastify";
import { setCookie } from "react-use-cookie";
export default function checkTokenValidity(auth, setAuth) {
  const currentTime = Date.now();
  const validUntil = auth?.validUntil;
  const toastId = "tokenValidityToast";

  //Hvis et token er gemt i session eller cookie, så gem alt dataen i AuthContext og log brugeren ind.
  if (currentTime >= validUntil) {
    //Hvis token er udløbet, så fjern det fra session og cookie, log brugeren ud og vis en fejl notifikation.
    sessionStorage.removeItem("token");
    setCookie("token", "", { days: 0 });
    setAuth(null);
    toast.error("Din session er udløbet. Log venligst ind igen.", {
      position: "top-center",
      autoClose: 5000,
      toastId: toastId,
    });
  }
  return;
}
