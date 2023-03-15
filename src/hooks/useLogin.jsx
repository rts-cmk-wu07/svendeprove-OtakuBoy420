import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import useCookie from "react-use-cookie";
export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [token, setTokenCookie] = useCookie("token", undefined);

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
          setTokenCookie(JSON.stringify(data), {
            sameSite: "strict",
            expires: 0,
          });
        }

        setAuth(data);
        toast.success("You have successfully logged in!", {
          position: "top-center",
          className: "toast-top-message",
        });
        setLoginModal(false);
      } else {
        setErrorMessage(response.status === 401 ? "Invalid username or password" : "Something went wrong, please try again later");
        toast.error(response.status === 401 ? "Invalid username or password" : "Something went wrong, please try again later", {
          autoClose: 3000,
          position: "top-center",
          className: "toast-top-message",
        });
      }
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, errorMessage, isLoading };
}
