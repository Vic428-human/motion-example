// create tanstack query example for useApplication hook
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useApplication = () => {
  interface ApplicationData {
    name: string;
    status: string;
  }

  const fetchApplication = async (): Promise<ApplicationData> => {
    // Simulate a network request to fetch application data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Sample Application",
          status: "active",
        });
      }, 1000);
    });
  };

  const { data, isLoading, error } = useQuery<ApplicationData>({
    queryKey: ["application"],
    queryFn: () => fetchApplication(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching application:", error);
    }
  }, [error]);

  return { data, isLoading, error };
};
