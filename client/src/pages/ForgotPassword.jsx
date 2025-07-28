// src/pages/ForgotPassword.jsx
import React, { useEffect, useState } from "react";
import logo_combat from "../assets/logo_combat.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email.trim()));
  };

  useEffect(() => {
    if (message) {  
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch]);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden">
        <div className="hidden md:block md:w-1/2 bg-black text-white p-10 flex flex-col items-center justify-center">
          <img src={logo_combat} alt="Combat Logo" className="h-24 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
          <p className="text-gray-300 text-center">
            Enter your registered email to receive reset instructions.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-center">Forgot your password?</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <Link to="/" className="block mt-4 text-center text-sm text-gray-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
