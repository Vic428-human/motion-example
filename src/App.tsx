import React from "react";
import { useQuery } from "@tanstack/react-query";
// import hook for useuseApplimittation
import { useApplication } from "./hooks/useApplimittation"; // Uncomment if you have a custom hook

function App() {
  const { data, isLoading, error } = useApplication();

  return (
    <div>
      <h1>Application Status</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching application data: {error.message}</p>
      ) : (
        <div>
          <p>Name: {data?.name}</p>
          <p>Status: {data?.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
