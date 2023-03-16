import { useEffect } from "react";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "react-use-cookie";

export default function checkTokenValidity(auth, setAuth) {
  const updateAuth = (token) => {
    //Hvis der ikke er noget token gemt i session eller cookie, så sæt auth til null (log brugeren ud) og hop ud af funktionen
    if (!token) {
      setAuth(null);
      return;
    }

    const currentTime = Date.now();
    const validUntil = token.validUntil;

    //Hvis et token er gemt i session eller cookie, så gem alt dataen i AuthContext og log brugeren ind.
    if (currentTime <= validUntil) {
      setAuth(token);
    } else {
      //Hvis token er udløbet, så fjern det fra session og cookie, log brugeren ud og vis en fejl notifikation.
      sessionStorage.removeItem("token");
      setCookie("token", "", { days: 0 });
      setAuth(null);
      toast.error("Din session er udløbet. Log venligst ind igen.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const tokenCookie = getCookie("token");
    const storedToken = sessionStorage.getItem("token");
    //Hvis brugeren ikke er logget ind så kør funktionen updateAuth med et token paremeter fra session eller cookie.
    if (!auth) {
      if (tokenCookie) {
        updateAuth(JSON.parse(tokenCookie));
      } else if (storedToken) {
        updateAuth(JSON.parse(storedToken));
      }
    }
  }, []);

  useEffect(() => {
    //Hvis brugeren ikke er logget ind så hop ud.
    if (!auth) {
      return;
    }

    const intervalId = setInterval(() => {
      updateAuth(auth);
    }, 1000 * 60 * 60); // Tjek hver time om token er udløbet.

    //Stop interval når component unmountes.
    return () => {
      clearInterval(intervalId);
    };
    //Det er vigtigt at useEffect kører hver gang auth ændrer sig, så vi starter med at tjekke samme tid token blev oprettet.
  }, [auth]);
}
