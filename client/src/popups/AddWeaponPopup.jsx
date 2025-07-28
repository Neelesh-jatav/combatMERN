import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAddWeaponPopup } from "../store/slices/popUpSlice";
// import { addWeapon } from "../store/slices/weaponSlice"; // Connect this when available

const AddWeaponPopup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    image: null,
    description: "",
    model: "",
    manufacturer: "",
    originCountry: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    // dispatch(addWeapon(data));
    dispatch(toggleAddWeaponPopup());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Add New Weapon</h3>
          <form onSubmit={handleSubmit}>
            {/* Required Fields */}
            <div className="mb-4">
              <label className="block font-medium text-gray-800">Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full border-2 border-black rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-800">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="w-full border-2 border-black rounded-md px-3 py-2">
                <option value="">Select Category</option>
                {[
                  "Rifle", "Artillery", "Explosives", "Armored Vehicles", "Missile",
                  "Fighter Jets", "UAV", "Naval Weaponry", "Nuclear Warheads", "Defense System",
                  "Chemical", "Cyber Security"
                ].map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-800">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full border-2 border-black rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-800">Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full" />
            </div>

            {/* Optional Fields */}
            {["description", "model", "manufacturer", "originCountry"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block font-medium text-gray-800 capitalize">{field}</label>
                <input name={field} value={formData[field]} onChange={handleChange} className="w-full border-2 border-black rounded-md px-3 py-2" />
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => dispatch(toggleAddWeaponPopup())} className="px-4 py-2 bg-gray-200 rounded-md">Close</button>
              <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">Add Weapon</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWeaponPopup;
