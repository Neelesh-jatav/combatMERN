//  pages/ResetPassword.jsx

import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const dispatch = useDispatch();
  
    const { loading, error, message, user, isAuthenticated,} = useSelector(
      state => state.auth
    );

    const handleResetPassword = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        dispatch(resetPassword(formData, token));
    };

    useEffect(() => {
        if(message){
          toast.success(message);
          dispatch(resetAuthSlice());
        }
        if(error){
          toast.error(error);
          dispatch(resetAuthSlice());
        }
      },[dispatch, isAuthenticated, error, loading]);
    
      if(isAuthenticated){
        return <Navigate to="/"/>
      }

  return (
  <>
  <div className="flex flex-col justify-center md:flex-row h-screen">
    {/* {LEFT SIDE} */}
    <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center 
    p-8 rounded-tr-[80px] rounded-br-[80px]">
    
    <div className="text-center h-[450px]">
            <div className="flex justify-center mb-12">
              <img 
              src={logo_with_title} 
              alt="logo" 
              className="mb-12 h-44 w-auto" 
              />
            </div>
            <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10" >
              "Your premier digital library for borrowing and reading books"
              </h3>
          </div>

    </div>
    {/* {RIGHT SIDE} */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link 
        to={"/password/forgot"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed
        top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
        >
          Back
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
              Reset Password
              </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter your new password
              </p>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
              <input 
                  type="password" 
                  required
                  value={password} 
                  onChange={(e)=> setPassword(e.target.value)} 
                  placeholder="Password" 
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                  />
              </div>
              <div className="mb-4">
              <input 
                  type="password" 
                  required
                  value={confirmPassword} 
                  onChange={(e)=> setConfirmPassword(e.target.value)} 
                  placeholder="Confirm Password" 
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                  />
              </div>
              <button 
              type="submit" 
              className="border-2 mt-5 
              border-black w-full font-semibold bg-black
              text-white py-2 rounded-lg hover:bg-white
              hover:text-black transition"
              disabled={loading ? true : false}
              >RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
  </div>
  </>
);
};

export default ResetPassword;


// // src/pages/ResetPassword.jsx
// import React, { useEffect, useState } from "react";
// import logo_combat from "../assets/logo_combat.png";
// import { useDispatch, useSelector } from "react-redux";
// import { resetPassword, resetAuthSlice } from "../store/slices/authSlice";
// import { toast } from "react-toastify";
// import { Navigate, Link, useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { token } = useParams();
//   const dispatch = useDispatch();
//   const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("password", password);
//     formData.append("confirmPassword", confirmPassword);
//     dispatch(resetPassword(formData, token));
//   };

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//       dispatch(resetAuthSlice());
//     }
//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//   }, [message, error, dispatch]);

//   if (isAuthenticated) return <Navigate to="/" />;

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden">
//         <div className="hidden md:block md:w-1/2 bg-black text-white p-10 flex flex-col items-center justify-center">
//           <img src={logo_combat} alt="Combat Logo" className="h-24 mb-6" />
//           <h2 className="text-2xl font-bold mb-2">Set New Password</h2>
//           <p className="text-gray-300 text-center">
//             Enter and confirm your new password to complete the reset process.
//           </p>
//         </div>

//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//           <h3 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="New Password"
//               required
//               className="w-full px-4 py-3 border rounded-lg focus:outline-black"
//             />
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm Password"
//               required
//               className="w-full px-4 py-3 border rounded-lg focus:outline-black"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//           <Link to="/" className="block mt-4 text-center text-sm text-gray-600 hover:underline">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
