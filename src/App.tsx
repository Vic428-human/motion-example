import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["hello"],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve("Hello React Query!"), 1000)
      ),
  });
  return (
    <>
      {" "}
      <div>{isLoading ? "Loading..." : data}</div>
    </>
  );
}

export default App;
