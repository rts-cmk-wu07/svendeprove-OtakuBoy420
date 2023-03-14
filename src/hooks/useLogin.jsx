import { useContext, useState } from "react";
import IsAuthenticatedContext from "../contexts/IsAuthenticatedContext";

import { toast } from "react-toastify";
export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useContext(IsAuthenticatedContext);

  const handleLogin = async (username, password, setIsMenuOpen) => {
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
        console.log(data);
        //save token as cookie
        setIsAuthenticated(true);
        toast.success("You have successfully logged in!", {
          position: "top-center",
          className: "toast-top-message",
        });
        setIsMenuOpen(false);
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
