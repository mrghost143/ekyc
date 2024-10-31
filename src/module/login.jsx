// src/components/Login.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@shared/reducer/authentication";

export  const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);

  const handleLogin = () => {
    const userData = { name: "John Doe" };
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, User!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

