import { useState, useEffect } from "react";
import { IUseQueryReturn } from "../types";

export const useQuery = <T>(
  key: (string | number)[],
  fetcher: () => Promise<T>
): IUseQueryReturn<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetcher()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [key[0]]);

  return { data, isLoading, error };
};
