import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovie = function (movieId: string) {
  const { data, error, isLoading } = useSWR(`/api/movies/${movieId}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
