// This is the hook responsible for fetching data from the API and returning dta, loading and error states.

import { useState, useEffect } from "react";

interface fetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

const useFetch = <T>(fetchFunction: () => Promise<T>): fetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, error, loading };
};
export default useFetch;
