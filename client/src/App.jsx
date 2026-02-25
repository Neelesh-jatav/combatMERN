import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Weapon from "./pages/Weapons";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";
import AuthModal from "./pages/AuthModal";
import { fetchAllWeapons } from "./store/slices/weaponSlice";
import AddWeapons from "./pages/AddWeapons";
import DeleteWeapon from "./pages/DeleteWeapon";

const App = () => {

  const {user, isAuthenticated} = useSelector(state=> state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchAllWeapons());
    
    if(isAuthenticated && user?.role ==="Admin"){
      dispatch(fetchAllUsers());
    }
  },[isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/weapon" element={<Weapon />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/authmodal" element={<AuthModal />} />
        <Route path="/AddWeapons" element={<AddWeapons />} />
        <Route path="/DeleteWeapon" element={<DeleteWeapon />} />

      </Routes>
      <ToastContainer theme="light"/>
    </Router >
  );
};

export default App;
