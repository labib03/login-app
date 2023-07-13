import { AxiosError } from "axios";
import { useEffect, useState } from "preact/hooks";
import { api } from "../helpers/fetch.ts";
import { ResponseFetchType } from "../types/fetching.ts";

type Types = {
  isLoading: boolean;
  apiData: ResponseFetchType | undefined;
  serverError: any;
};

/** custom hook */
export default function useFetch(query: string) {
  const [data, setData] = useState<Types>({
    isLoading: true,
    apiData: undefined,
    serverError: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data } = await api.get(`/api${query}`);

        setData((prev) => ({
          ...prev,
          isLoading: false,
          apiData: data,
        }));
      } catch (err) {
        const errorResponse = err as AxiosError;

        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: errorResponse,
        }));
      }
    };

    fetchData();
  }, [query]);

  return { data, setData };
}
