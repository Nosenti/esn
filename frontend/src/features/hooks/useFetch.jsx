import { useState, useEffect } from "react";
import api from "../../utils/api";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url, options);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.log("Error loading data", error);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
