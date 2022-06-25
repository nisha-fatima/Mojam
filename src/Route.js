import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Protected from "./Protected";
import Home from "./Components/Home";

function RouteConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Protected Cmp={Home} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default RouteConfig;
