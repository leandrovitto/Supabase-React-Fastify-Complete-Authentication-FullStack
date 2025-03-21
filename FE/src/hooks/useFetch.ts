import { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY_TOKEN } from "../costants";

const cache = new Map<string, any>(); //Memory cache

const getTokenFromLocalStorage = (): string => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);
  if (!storage) {
    return "";
  }
  try {
    const json = JSON.parse(storage);
    return json?.access_token || "";
  } catch (e) {
    console.error("Failed to parse token from localStorage", e);
    return "";
  }
};

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("cache");
    console.log(cache);
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const token = getTokenFromLocalStorage();
      console.log("token");
      console.log(token);
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}` || "",
          },
        });
        const json = await response.json();
        cache.set(url, json);
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
