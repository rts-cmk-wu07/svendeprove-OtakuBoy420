import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import checkTokenValidity from "../functions/checkTokenValidity";

export default function useAxios(url, { needsAuth = false, token = "", needsId = false, id = null } = {}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (needsAuth && !token) {
      setLoading(false);
      setError({
        message: "Du skal være logget ind for at se denne side.",
        status: 401,
      });
      return;
    }
    if (needsId && !id) {
      setLoading(false);
      setError({
        message: "Der er sket en fejl. Prøv igen senere.",
        status: 400,
      });
      return;
    }

    setLoading(true);
    setError(null);

    if (needsAuth) {
      checkTokenValidity(auth, setAuth);
    }

    axios
      .get(needsId && id ? `${url}/${id}` : url, needsAuth ? { headers: headers } : null)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setLoading(false);
        } else {
          setError(new Error(`Data fejl: ${response.status}`));
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(new Error(`Data fejl: ${err.message}`));
        setLoading(false);
      });
  }, [url, needsAuth, token, id]);

  const refreshData = () => {
    setLoading(true);
    setError(null);

    axios.get(url).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        setLoading(false);
      } else {
        setError(new Error(`Data fejl: ${response.status}`));
        setLoading(false);
      }
    });
  };

  return { data, error, loading, refreshData };
}
