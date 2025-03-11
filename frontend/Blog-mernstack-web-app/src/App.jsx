import React, { useState } from "react";
import axios from "axios";
import Login from "./components/Login";

const App = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
  const [logoutResponse, setLogoutResponse] = useState(null);
  const [logoutError, setLogoutError] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/registerUser`,
        formData,
        {
          withCredentials: true, // Send cookies if using sessions
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data);
      setError(null);
      setFormData({ userName: "", email: "", password: "" });
    } catch (err) {
      let errorMessage = "Something went wrong Shahvez";
      if (err.response?.data) {
        // Try to extract the error message from the HTML response
        const match = err.response.data.match(/<pre>(.*?)<\/pre>/);

        if (match && match[1]) {
          errorMessage = match[1].trim().replace("Error: ", "");
        }
      }

      setError(errorMessage);
      setResponse(null);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logoutUser`,
        {},
        { withCredentials: true }
      );
      console.log(`logout response${res.data}`);

      setLogoutResponse(res.data);
      logoutError(null);
    } catch (err) {
      let errorMessage = "Something went wrong Shahvez";
      if (err.response?.data) {
        // Try to extract the error message from the HTML response
        const match = err.response.data.match(/<pre>(.*?)<\/pre>/);

        if (match && match[1]) {
          errorMessage = match[1].trim().replace("Error: ", "");
        }
      }

      logoutError(errorMessage);
      setLogoutResponse(null);
    }
  };

  return (
    <>
      <div className="bg-zinc-800">
        <div className="bg-zinc-800 w-full h-screen flex flex-col justify-center items-center">
          <h1 className="text-white font-extrabold text-6xl">
            MERN STACK PROJECT
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-4 bg-zinc-700 p-6 rounded-lg"
          >
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              className="p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Register
            </button>
          </form>

          {response && (
            <>
              <h1 className="text-green-400 mt-4">
                {response.message || "User Registered Successfullylllll"}
              </h1>
              <h2> {response.data.userName}</h2>
            </>
          )}

          {error && <h1 className="text-red-400 mt-4">{error}</h1>}
        </div>
        <Login />
        <div className="bg-transparent flex justify-center items-center">
          <button
            className="bg-red-600 px-7 py-4 text-white"
            onClick={()=>handleLogout()}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
