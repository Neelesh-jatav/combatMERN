// components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import logo_combat from "../assets/logo_combat.png";
import { useDispatch, useSelector } from "react-redux";
import { login, register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, message, user } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (error) {
      if (error.toLowerCase().includes("not verified")) {
        toast.error("Account not verified. Redirecting...");
        dispatch(resetAuthSlice());
        onClose();
        navigate(`/otp-verification/${email}`);
      } else {
        toast.error(error);
        dispatch(resetAuthSlice());
      }
    }

    if (isAuthenticated && isLogin && user) {
      toast.success("Logged in successfully!");
      onClose();
      // navigate(user.role?.toLowerCase() === "admin" ? "/adminprofile" : "/profile");
    }

    if (message && !isLogin) {
      toast.success(message);
      dispatch(resetAuthSlice());
      onClose();
      navigate(`/otp-verification/${email}`);
    }
  }, [error, message, isAuthenticated, isLogin, dispatch, onClose, navigate, email, user]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white w-[90%] max-w-4xl rounded-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:scale-105 transition"
        >
          &times;
        </button>

        {isLogin ? (
          <>
            <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-sm text-gray-600 mb-6">Enter your credentials to sign in</p>
              <form onSubmit={handleLogin} className="w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mb-3 w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mb-2 w-full border rounded px-3 py-2"
                  required
                />
                <div className="text-right text-xs mb-4">
                  <Link
                    to="/password/forgot"
                    onClick={onClose}
                    className="text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="bg-black text-white w-full py-2 rounded mb-4">
                  SIGN IN
                </button>
              </form>
              <p className="text-sm">
                New to our platform?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="underline cursor-pointer text-blue-600"
                >
                  Sign up now.
                </span>
              </p>
            </div>

            <div className="w-full md:w-1/2 bg-black text-white p-8 flex flex-col items-center justify-center">
              <img src={logo_combat} alt="Logo" className="h-24 mb-4" />
              <p className="text-lg font-semibold text-center mb-4">
                Ready to join? Create your account today.
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="border text-white w-1/2 py-2 rounded hover:bg-white hover:text-black transition"
              >
                SIGN UP
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 bg-black text-white p-8 flex flex-col items-center justify-center">
              <img src={logo_combat} alt="Logo" className="h-24 mb-4" />
              <p className="text-lg font-semibold text-center mb-4">
                Already have an account? Sign in now.
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="border text-white w-1/2 py-2 rounded hover:bg-white hover:text-black transition"
              >
                SIGN IN
              </button>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white">
              <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
              <p className="text-sm mb-4">Create an account to get started.</p>
              <form onSubmit={handleRegister} className="w-full">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="mb-2 w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mb-2 w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mb-4 w-full border rounded px-3 py-2"
                  required
                />
                <button type="submit" className="bg-black text-white w-full py-2 rounded">
                  SIGN UP
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
