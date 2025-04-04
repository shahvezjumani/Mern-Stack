import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";
const LogoutBtn = () => {
  const [logoutResponse, setLogoutResponse] = useState(null);
  const [logoutError, setLogoutError] = useState(null);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logoutUser`,
        {},
        { withCredentials: true }
      );
      setLogoutResponse(res.data);
      setLogoutError(null);
      dispatch(logout());
    } catch (err) {
      let errorMessage = "Something went wrong";
      if (err.response?.data) {
        // Try to extract the error message from the HTML response
        const match = err.response.data.match(/<pre>(.*?)<\/pre>/);

        if (match && match[1]) {
          errorMessage = match[1].trim().replace("Error: ", "");
        }
      }

      setLogoutError(errorMessage);
      setLogoutResponse(null);
    }
  };
  return (
    <button
      className="bg-red-600 px-7 py-4 text-white font-semibold text-lg rounded-lg transform transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 hover:shadow-xl active:scale-95"
      onClick={() => logoutHandler()}
    >
      Log Out
    </button>
  );
};

export default LogoutBtn;
