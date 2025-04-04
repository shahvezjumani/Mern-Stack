import React, { useEffect, useState } from "react";
import Login from "./components/Loginn.jsx";
import RegisterUser from "./components/RegisterUser";
// import Logout from "./components/Logout";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import axios from "axios";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const [check, setCheck] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getCurrentUser`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(login(res.data.data));
      })
      .catch((err) => {
        const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
        const errorMessage = match[1].trim().replace("Error: ", "");
        console.log("err", errorMessage);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  // const handleClick = () => {
  //   setCheck(!check);
  // };

  // return !loading ? (
  //   <div className="bg-zinc-800">
  //     <RegisterUser />
  //     <Login />
  //   </div>
  // ) : null;

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default App;
