// pages/Profile.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SettingPopup from "../popups/SettingPopup";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Profile = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, isAuthenticated, user } = useSelector(state => state.auth);
  const { settingPopup } = useSelector(state => state.popup);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated && message === "Logout successful") {
      toast.success("Logout successful");
      dispatch(resetAuthSlice());
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [isAuthenticated, message, error, dispatch, navigate]);

  const handleForgotPassword = () => navigate("/password/forgot");

  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-700 text-sm">Name: {user?.name || "User Name"}</p>
          <p className="text-gray-700 text-sm">Email: {user?.email || "User@combat.com"}</p>
        </div>
        <img
          src="/images/avatar.jpg"
          alt="Avatar"
          className="w-28 h-28 rounded-full shadow border-4 border-white object-cover"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-start gap-4 mb-10">
        <button
          onClick={() => dispatch(toggleSettingPopup())}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Update Password
        </button>

        <button
          onClick={handleForgotPassword}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
        >
          Forgot Password
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
        >
          Log Out
        </button>
      </div>

      {settingPopup && <SettingPopup />}
    </div>
  );
};

export default Profile;
