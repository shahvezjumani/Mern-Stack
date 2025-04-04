import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login as authLogin } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import { Select, Input, Button, Container, Logo } from "./index.js";
import { useForm } from "react-hook-form";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/loginUser`,
        data,
        {
          withCredentials: true, // Send cookies if using sessions
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //   setResponse(res.data);
      setError(null);
      dispatch(authLogin(response.data.data));
      navigate("/");
      //   setFormData({ email: "", password: "" });
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
      //   setResponse(null);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
