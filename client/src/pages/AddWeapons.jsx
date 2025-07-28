import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWeapon } from "../store/slices/weaponSlice";
import { toggleAddWeaponPopup } from "../store/slices/popUpSlice";

const AddWeapon = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.weapon);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === "Admin";

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    range: "",
    weight: "",
    manufacturer: "",
    originCountry: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, price, stock } = form;

    if (!name || !category || !price || !stock || !image) {
      alert("Please fill all required fields: Name, Category, Price, Stock, Image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("range", form.range);
    formData.append("weight", form.weight);
    formData.append("manufacturer", form.manufacturer);
    formData.append("originCountry", form.originCountry);
    formData.append("description", form.description);
    formData.append("image", image);

    dispatch(addWeapon(formData));
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <p className="text-lg font-semibold text-red-600">
            Access Denied: Only Admins can add weapons.
          </p>
          <button
            onClick={() => dispatch(toggleAddWeaponPopup())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => dispatch(toggleAddWeaponPopup())}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-600"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Add New Weapon</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Fields */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Weapon Name *"
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category *</option>
            {[
              "Rifle", "Artillery", "Explosives", "Armored Vehicles", "Missiles",
              "Fighter Jets", "UAV", "Naval Weaponry", "Nuclear Warheads",
              "Defence System", "Chemical", "Cyber Security"
            ].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price *"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock *"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover mt-2 rounded"
            />
          )}

          {/* Optional Fields */}
          <input
            type="text"
            name="range"
            value={form.range}
            onChange={handleChange}
            placeholder="Range"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="originCountry"
            value={form.originCountry}
            onChange={handleChange}
            placeholder="Origin Country"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full border p-2 rounded resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Weapon"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWeapon;
