import React, { useState } from 'react';
import closeIcon from "../assets/close-square.png";
import settingIcon from "../assets/setting.png";
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from "../store/slices/authSlice";
import { toggleSettingPopup } from '../store/slices/popUpSlice';

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage("All fields are required.");
      setIsError(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      setIsError(true);
      return;
    }

    const data = new FormData();
    data.append("currentPassword", currentPassword);
    data.append("newPassword", newPassword);
    data.append("confirmNewPassword", confirmNewPassword);

    dispatch(updatePassword(data))
      
      .then((res) => {
        setMessage("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsError(false);
      })
      .catch((err) => {
        setMessage(err?.message || "Failed to update password.");
        setIsError(true);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3 max-w-lg">
        <div className="p-6">
          <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <img
                src={settingIcon}
                alt="setting-icon"
                className="bg-gray-200 p-4 rounded-lg w-14 h-14"
              />
              <h3 className="text-xl font-bold">Change Credentials</h3>
            </div>
            <img
              src={closeIcon}
              alt="close-icon"
              className="cursor-pointer w-6 h-6"
              onClick={() => dispatch(toggleSettingPopup())}
            />
          </header>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {message && (
              <p
                className={`mt-2 text-sm ${
                  isError ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                {loading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
