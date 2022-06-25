import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";


export default function Home() {
    const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/login")
  };
  return (
    <div className="flex justify-between p-5">
      <img src={logo} alt="logo" />
      <div>
      <button
        className="rounded-sm bg-gray-500 text-white font-bold p-3"
        onClick={logout}
      >
        Logout
      </button>
      </div>
    </div>
  );
}
