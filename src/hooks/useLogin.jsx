import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import useCookie from "react-use-cookie";
export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [tokenCookie, setTokenCookie] = useCookie("token");

  const handleLogin = async (username, password, remember, setLoginModal) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
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
        toast.success("Du er nu logget ind", {
          autoClose: 1500,
        });
        setLoginModal(false);
      } else {
        setErrorMessage(response.status === 401 ? "Ugyldigt brugernavn eller adganskode" : "Noget gik galt, prøv igen senere");
        toast.error(response.status === 401 ? "Ugyldigt brugernavn eller adganskode" : "Noget gik galt, prøv igen senere", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Noget gik galt, prøv igen senere");
      toast.error("Noget gik galt, prøv igen senere", {
        autoClose: 3000,
        position: "top-center",
        className: "toast-top-message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, errorMessage, isLoading };
}
