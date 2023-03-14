import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url, { needsAuth = false, token = "", needsId = false, id = null } = {}) {
  //sets default values for the options object if none are provided, so that the function can be called without any arguments and still work
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (needsAuth && !token) {
      setLoading(false);
      setError({
        message: "You need to be logged in to access this page.",
        status: 401,
      });
      return;
    }
    if (needsId && !id) {
      setLoading(false);
      setError({
        message: "You need to provide an ID to access this page.",
        status: 400,
      });
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(needsId && id ? `${url}/${id}` : url, needsAuth ? { headers: headers } : null)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setLoading(false);
        } else {
          setError(new Error(`Fetching error: ${response.status}`));
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(new Error(`Fetching error: ${err.message}`));
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
        setError(new Error(`Fetching error: ${response.status}`));
        setLoading(false);
      }
    });
  };

  return { data, error, loading, refreshData };
}
