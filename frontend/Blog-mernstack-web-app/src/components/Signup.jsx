import React, { useState } from "react";
import { Button, Input, Logo } from "./index.js";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const signup = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/registerUser`,
        data,
        {
          withCredentials: true, // Send cookies if using sessions
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data);
      setError(null);
      dispatch(login(response.data.data));
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong";
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

  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <h1 className="text-white font-extrabold text-6xl">MERN STACK PROJECT</h1>

      <form
        onSubmit={handleSubmit(signup)}
        className="mt-6 flex flex-col gap-4 bg-gray-500 p-6 rounded-lg"
      >
        {/* <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          className="p-2 rounded"
          required
        /> */}
        <Input
          label="UserName: "
          placeholder="Enter your username"
          type="UserName"
          {...register("userName", {
            required: true,
          })}
        />
        <Input
          label="Email: "
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />
        <Button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </Button>
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
  );
};
export default SignUp;
