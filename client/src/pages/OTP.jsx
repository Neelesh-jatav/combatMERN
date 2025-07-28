import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleOtpVerification = (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.warn("Please enter the OTP");
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [error, dispatch]);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <Link
        to="/"
        className="absolute top-6 left-6 border border-black px-4 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition"
      >
        Back
      </Link>

      <div className="max-w-sm w-full text-center mt-16">
        <h1 className="text-3xl font-bold mb-6">Enter OTP</h1>
        <p className="mb-6 text-gray-600">Please check your email and enter the OTP sent to <strong>{email}</strong></p>

        <form onSubmit={handleOtpVerification}>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 border border-black rounded-md focus:outline-none mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
