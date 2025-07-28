import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector((state) => state.auth);

  const [users] = useState([
    { id: 1, name: "Lt. Arjun", email: "arjun@combat.in" },
    { id: 2, name: "Lt. Sharma", email: "sharma@combat.in" },
  ]);

  const [admins] = useState([
    { id: 1, name: "Commander Rhea", email: "rhea@combat.in" },
  ]);

  const [items] = useState([
    { id: 1, name: "Tactical Helmet", stock: 25, price: "₹9,800" },
  ]);

  const [orders] = useState([
    {
      id: "ORD-1001",
      user: "arjun@combat.in",
      item: "Tactical Vest",
      date: "2024-12-01",
      type: "Completed",
    },
    {
      id: "ORD-1002",
      user: "sharma@combat.in",
      item: "Night Goggles",
      date: "2025-01-05",
      bill: "₹12,000",
      type: "Upcoming",
    },
  ]);

  const [visibleSection, setVisibleSection] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [addAdminForm, setAddAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [addAdminMsg, setAddAdminMsg] = useState("");

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (message === "Logout successful") {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate]);

  // Add Admin handler
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAddAdminLoading(true);
    setAddAdminMsg("");
    try {
      const formData = new FormData();
      formData.append("name", addAdminForm.name);
      formData.append("email", addAdminForm.email);
      formData.append("password", addAdminForm.password);
      if (addAdminForm.avatar) formData.append("avatar", addAdminForm.avatar);

      await axios.post(
        "/api/v1/user/admin/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setAddAdminMsg("Admin registered successfully!");
      setAddAdminForm({ name: "", email: "", password: "", avatar: null });
    } catch (err) {
      setAddAdminMsg(
        err.response?.data?.message || "Failed to register admin"
      );
    }
    setAddAdminLoading(false);
  };

  // Render sections (same as your code, unchanged)
  const renderUserSection = () => (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900">
          User Management ({users.length})
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setVisibleSection("users")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Get Users
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <h4 className="font-semibold text-gray-800">{user.name}</h4>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderAdminSection = () => (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900">
          Admin Management ({admins.length})
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setVisibleSection("admins")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Get Admins
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <h4 className="font-semibold text-gray-800">{admin.name}</h4>
            <p className="text-sm text-gray-600">Email: {admin.email}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderOrderSection = () => (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Order Management ({orders.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <h4 className="font-semibold text-gray-800 mb-1">{order.item}</h4>
            <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            <p className="text-sm text-gray-600">User: {order.user}</p>
            <p className="text-sm text-gray-600">Date: {order.date}</p>
            {order.bill && (
              <p className="text-sm text-gray-600">Bill: {order.bill}</p>
            )}
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                order.type === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  const renderItemSection = () => (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900">
          Item Management ({items.length})
        </h2>
        <button
          onClick={() => setVisibleSection("items")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Get Items
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <h4 className="font-semibold text-gray-800">{item.name}</h4>
            <p className="text-sm text-gray-600">
              Stock: {item.stock} units
            </p>
            <p className="text-sm text-gray-600">Price: {item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );

  // Add Admin form section
  const renderAddAdminSection = () => (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900">
          Add Admin
        </h2>
      </div>
      <form
        className="bg-white p-6 rounded-lg shadow max-w-md mx-auto"
        onSubmit={handleAddAdmin}
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={addAdminForm.name}
            onChange={(e) =>
              setAddAdminForm((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={addAdminForm.email}
            onChange={(e) =>
              setAddAdminForm((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            value={addAdminForm.password}
            onChange={(e) =>
              setAddAdminForm((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Avatar (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) =>
              setAddAdminForm((prev) => ({
                ...prev,
                avatar: e.target.files[0],
              }))
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={addAdminLoading}
        >
          {addAdminLoading ? "Adding..." : "Add Admin"}
        </button>
        {addAdminMsg && (
          <div className="text-center mt-2 text-sm text-blue-600">{addAdminMsg}</div>
        )}
      </form>
    </section>
  );

  return (
    <div className="px-6 md:px-20 py-12 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-6 rounded-lg shadow">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-700 text-sm">Name: Commander Rhea</p>
          <p className="text-gray-700 text-sm">Email: rhea@combat.in</p>
        </div>
        <img
          src="/images/admin-avatar.jpg"
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full shadow border-4 border-white object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          onClick={() => setVisibleSection("users")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get All Users
        </button>
        <button
          onClick={() => setShowAddAdmin(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Admin
        </button>
        <button
          onClick={() => setVisibleSection("orders")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Get Orders
        </button>
        <button
          onClick={() => setVisibleSection("items")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Get Items
        </button>
      </div>

      {visibleSection === "users" && renderUserSection()}
      {showAddAdmin && renderAddAdminSection()}
      {visibleSection === "orders" && renderOrderSection()}
      {visibleSection === "items" && renderItemSection()}

      <div className="text-center mt-12">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
