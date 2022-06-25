import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  isValidFirstPageRegistrationInfo,
  isValidLastPageRegistrationInfo,
} from "./validator";
import axios from "axios";

export default function Register() {
  const [state, setState] = useState({
    firstPage: true,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    vallidationResultFirstPage: {
      isValidFirstName: true,
      isValidLastName: true,
      isValidPhoneNumber: true,
      isAllValid: true,
    },
    validationResultLastPage: {
      isValidEmail: true,
      isValidPassword: true,
      isValidConfirmPassword: true,
      isPasswordsMatched: true,
      isAllValid: true,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    if (name === "phoneNumber" && value !== "") {
      if (value.match(/^[0-9]+$/) && value.length <= 15) {
        setState({
          ...state,
          [name]: value,
        });
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);
  async function onSubmit() {
    if (state.firstPage) {
      const vallidationResultFirstPage =
        isValidFirstPageRegistrationInfo(state);
      setState({
        ...state,
        vallidationResultFirstPage: vallidationResultFirstPage,
        firstPage: vallidationResultFirstPage.isAllValid ? false : true,
      });
    } else {
      const validationResultLastPage = isValidLastPageRegistrationInfo(state);
      setState({
        ...state,
        validationResultLastPage: validationResultLastPage,
      });
      if (validationResultLastPage.isAllValid) {
        setIsLoading(true);
        setError(true);
        axios
          .post(
            "https://erow6.mocklab.io/api/auth/register",
            {
              name: state.firstName,
              surname: state.lastName,
              phonenumber: "+"+state.phoneNumber,
              email: state.email,
              password: state.password,
              confirmPassword: state.confirmPassword,
            },{
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
          .then(function (response) {
            let res = response.data;
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
        <p className="mt-2">Please enter your info</p>
        {state.firstPage ? (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={state.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
            />
            {!state.vallidationResultFirstPage.isValidFirstName && (
              <p className="text-red-500 font-bold">First name is required</p>
            )}
            <br></br>
            <input
              type="text"
              placeholder="Last Name"
              value={state.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
            />
            {!state.vallidationResultFirstPage.isValidLastName && (
              <p className="text-red-500 font-bold">Last name is required</p>
            )}
            <br></br>
            <input
              type="text"
              placeholder="Phone Number"
              value={state.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
            />
            {!state.vallidationResultFirstPage.isValidPhoneNumber && (
              <p className="text-red-500 font-bold">Phone number is required</p>
            )}
            <br></br>
            <button
              onClick={onSubmit}
              className="w-full bg-dark-50 rounded-md text-white font-bold text-lg h-[50px]"
            >
              Next
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Email"
              value={state.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
            />
            {!state.validationResultLastPage.isValidEmail && (
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
            {!state.validationResultLastPage.isValidPassword && (
              <p className="text-red-500 font-bold">Password is required</p>
            )}
            <br></br>
            <input
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="w-full bg-gray-500 rounded-md text-white font-bold text-lg h-16 p-4"
            />
            {!state.validationResultLastPage.isValidConfirmPassword ? (
              <p className="text-red-500 font-bold">
                Confirm Password is required
              </p>
            ) : !state.validationResultLastPage.isPasswordsMatched ? (
              <p className="text-red-500 font-bold">Password not matched</p>
            ) : null}

            <br></br>
            <button
              onClick={() => handleChange("firstPage", true)}
              className="w-full bg-dark-50 rounded-md text-white font-bold text-lg h-[50px] "
            >
              Back
            </button>
            <button
              disabled={isLoading}
              onClick={onSubmit}
              className="w-full bg-dark-50 rounded-md text-white font-bold text-lg h-[50px] mt-3"
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "Register"
              )}
            </button>
            {error && <p className="mt-3 text-danger text-center">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
