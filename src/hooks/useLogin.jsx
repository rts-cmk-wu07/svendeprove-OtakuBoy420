import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import useCookie from "react-use-cookie";

export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [tokenCookie, setTokenCookie] = useCookie("token");

  function handleLogin(username, password, remember, setLoginModal) {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_AUTH_URI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        if (remember) {
          const milliseconds = data?.validUntil - Date.now();
          const validFor = milliseconds / (1000 * 60 * 60 * 24);
          setTokenCookie(JSON.stringify(data), {
            days: validFor,
            sameSite: "strict",
          });
        } else {
          sessionStorage.setItem("token", JSON.stringify(data));
        }
        setAuth(data);
        toast.success("Du har logget ind", {
          autoClose: 1500,
        });
        setLoginModal(false);
      })
      .catch((error) => {
        if (error.message === "401") {
          setErrorMessage("Ugyldigt brugernavn eller adganskode");
          toast.error("Ugyldigt brugernavn eller adganskode", {
            autoClose: 3000,
          });
        } else {
          setErrorMessage("Noget gik galt, prøv igen senere");
          toast.error("Noget gik galt, prøv igen senere", {
            autoClose: 3000,
            position: "top-center",
            className: "toast-top-message",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { handleLogin, errorMessage, isLoading };
}
