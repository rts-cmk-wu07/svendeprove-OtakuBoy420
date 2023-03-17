import { toast } from "react-toastify";
import { setCookie } from "react-use-cookie";
export default function checkTokenValidity(auth, setAuth) {
  const currentTime = Date.now();
  const validUntil = auth?.validUntil;
  const toastId = "tokenValidityToast";

  //Hvis token er udløbet, så fjern det i storage/cookie, log brugeren ud og vis en fejl notifikation.
  if (currentTime >= validUntil) {
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
