import React from "react";
import { useApplication } from "./hooks/useApplication.tsx";

function App() {
  const { data, isLoading, error } = useApplication();

  const renderContent = () => {
    if (data) {
      return (
        <>
          <h2>Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      );
    }
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return <p>No data available.</p>;
  };

  return (
    <div>
      <h1>Application Status</h1>
      {renderContent()}
    </div>
  );
}

export default App;
