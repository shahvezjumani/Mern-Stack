import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/data`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data); // ✅ Log the response data
        setResponse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // ❌ Log any errors
      });
  }, []);

  return (
    <div className="bg-zinc-800 w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-white font-extrabold text-6xl">MERN STACK Project</h1>
      <h1 className="text-green-400 mt-4">
        {import.meta.env.VITE_BACKEND_URL}
      </h1>
      {response && (
        <h1 className="text-white font-extrabold text-6xl">
          {response.message}
        </h1>
      )}
    </div>
  );
};

export default App;
