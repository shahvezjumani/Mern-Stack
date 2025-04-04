import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/loginUser`,
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
      setFormData({ email: "", password: "" });
    } catch (err) {
      let errorMessage = "Something went wrong Shahvez";
      if (err.response?.data) {
        // console.log("error", err);
        // console.log("error response", err.response);

        // Try to extract the error message from the HTML response
        const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
        // console.log(match[1].replace("Error: ",""));

        if (match && match[1]) {
          errorMessage = match[1].trim().replace("Error: ", "");
        }
      }

      setError(errorMessage);
      setResponse(null);
    }
  };



  return (
    <section className="w-screen h-screen bg-zinc-800 flex justify-center items-center">
      <div>
        <form
          action=""
          className="bg-green-400 p-5 flex flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <input
              type="email"
              value={formData.email}
              required
              name="email"
              className="text-black p-2 m-2"
              onChange={(e) => handleChange(e)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              required
              className="text-black p-2 m-2"
              onChange={(e) => handleChange(e)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="bg-red-400 px-4 py-2 rounded-lg">
            Login
          </button>
        </form>
        {response && (
          <>
            <h1 className="text-green-400 mt-4">
              {response?.message || "User Registered Successfullylllll"}
            </h1>
            <h2> {response.data?.userName || ""}</h2>
          </>
        )}

        {error && <h1 className="text-red-400 mt-4">{error}</h1>}
      </div>
    </section>
  );
};

export default Login;
