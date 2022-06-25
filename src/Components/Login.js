import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { isValidloginInfo, isValidRegistrationInfo } from "./validator";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    validationResult: {
      isValidEmail: true,
      isValidPassword: true,
      isAllValid: true,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);
  async function onSubmit() {
    const validationResult = isValidloginInfo(state);
    setState({
      ...state,
      validationResult: validationResult,
    });
    if (validationResult.isAllValid) {
      setIsLoading(true);
      setError(true);
      axios
        .post(
          "https://erow6.mocklab.io/api/auth/login",
          {
            email: state.email,
            password: state.password,
            rememberme: true,
          },{
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(function (response) {
          let res = response.data;
          console.log(res)
          localStorage.setItem("userData", JSON.stringify(res));
          setIsLoading(false);
          setError(false);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
          setError(error?.response?.data);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center flex-col min-h-[100vh] p-10 w-full">
        <img src={logo} alt="logo" />
        <h1 className="mt-2 text-3xl font-bold">Hello Guest!</h1>
        <p className="mt-2">Thank you for using MOJAM.</p>
        <input
          type="text"
          placeholder="Email"
          value={state.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
        />
        {!state.validationResult.isValidEmail && (
          <p className="text-red-500 font-bold">Email is required</p>
        )}
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
        />
        {!state.validationResult.isValidPassword && (
          <p className="text-red-500 font-bold">Password is required</p>
        )}
        <br></br>
        <button
          disabled={isLoading}
          onClick={onSubmit}
          className="w-full bg-dark-50 rounded-md text-white font-bold text-lg h-[50px]"
        >
          {isLoading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "Login"
          )}
        </button>
        {error && <p className="mt-3 text-danger text-center">{error}</p>}
        <p className="w-full text-start mt-3 text-lg font-bold cursor-pointer">
          Forgot Your Password?
        </p>
        <p className="w-full text-start mt-2 text-lg font-bold">
          Don't have an account?
        </p>
        <Link to="/register" className="w-full">
          <button className="w-full bg-dark-50 rounded-md text-white font-bold text-lg h-[50px]">
            Register
          </button>
        </Link>

        <button className="w-full bg-dark-50 rounded-md text-white font-bold text-lg h-[50px] mt-3">
          Enter as a guest
        </button>
      </div>
    </div>
  );
}
