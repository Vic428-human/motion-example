import React from "react";
import { useApplication } from "./hooks/useApplication.tsx";
import { queryClient } from "./queryClient.ts";

function App() {
  const { data, isLoading, error } = useApplication();

  const renderContent = () => {
    if (data) {
      return (
        <>
          <h2>直接調用 tanstack的 custom hook</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      );
    }
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return <p>No data available.</p>;
  };

  const test = queryClient.getQueriesData({ queryKey: ["application"] });
  const applicationQueryData = test.length > 0 ? test[0][1] : null;

  return (
    <div>
      <h1>Demo</h1>
      {renderContent()}
      <h3>queryClient.getQueriesData 方式直接調用</h3>
      {applicationQueryData ? (
        <pre>{JSON.stringify(applicationQueryData, null, 2)}</pre>
      ) : (
        <p>No cached data found in queryClient.</p>
      )}
    </div>
  );
}

export default App;
