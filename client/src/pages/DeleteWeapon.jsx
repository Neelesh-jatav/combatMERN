import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const DeleteWeapon = () => {
  const { user } = useSelector((state) => state.auth);

  const [categories] = useState([
    "Rifle", "Artillery", "Explosives", "Armored Vehicles", "Missiles",
    "Fighter Jets", "UAV", "Naval Weaponry", "Nuclear Warheads",
    "Defence System", "Chemical", "Cyber Security"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [weapons, setWeapons] = useState([]);
  const [selectedWeaponId, setSelectedWeaponId] = useState("");
  const [weaponDetails, setWeaponDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch weapons when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setWeapons([]);
      setSelectedWeaponId("");
      setWeaponDetails(null);
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:4000/api/v1/weapon/all", { withCredentials: true })
      .then((res) => {
        const allWeapons = res.data.weapons || [];
        const filtered = allWeapons.filter(
          (w) => w.category === selectedCategory
        );
        setWeapons(filtered);
        setSelectedWeaponId("");
        setWeaponDetails(null);
      })
      .catch(() => setWeapons([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // Fetch weapon details when weapon is selected
  useEffect(() => {
    if (!selectedWeaponId) {
      setWeaponDetails(null);
      return;
    }
    const weapon = weapons.find((w) => w._id === selectedWeaponId);
    setWeaponDetails(weapon || null);
  }, [selectedWeaponId, weapons]);

  const handleDelete = async () => {
    if (!selectedWeaponId) return;
    if (!window.confirm("Are you sure you want to delete this weapon?")) return;
    setDeleting(true);
    setMessage("");
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/weapon/admin/delete/${selectedWeaponId}`,
        { withCredentials: true }
      );
      setMessage("Weapon deleted successfully.");
      setWeapons((prev) => prev.filter((w) => w._id !== selectedWeaponId));
      setSelectedWeaponId("");
      setWeaponDetails(null);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to delete weapon."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (!user || user.role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-700">Only Admins can delete weapons.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Delete Weapon
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Category</label>
          <select
            className="w-full border rounded p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {loading && <div className="text-center text-blue-600">Loading weapons...</div>}
        {selectedCategory && !loading && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Weapon</label>
            <select
              className="w-full border rounded p-2"
              value={selectedWeaponId}
              onChange={(e) => setSelectedWeaponId(e.target.value)}
              disabled={weapons.length === 0}
            >
              <option value="">-- Select Weapon --</option>
              {weapons.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
            </select>
            {weapons.length === 0 && (
              <div className="text-sm text-gray-500 mt-2">
                No weapons found in this category.
              </div>
            )}
          </div>
        )}
        {weaponDetails && (
          <div className="border rounded p-4 mb-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">{weaponDetails.name}</h3>
            <p>
              <span className="font-medium">Category:</span> {weaponDetails.category}
            </p>
            <p>
              <span className="font-medium">Price:</span> ₹{weaponDetails.price}
            </p>
            <p>
              <span className="font-medium">Stock:</span> {weaponDetails.stock}
            </p>
            <p>
              <span className="font-medium">Manufacturer:</span> {weaponDetails.manufacturer || "N/A"}
            </p>
            <p>
              <span className="font-medium">Origin Country:</span> {weaponDetails.originCountry || "N/A"}
            </p>
            <p>
              <span className="font-medium">Description:</span> {weaponDetails.description || "N/A"}
            </p>
            {weaponDetails.images && weaponDetails.images.url && (
              <img
                src={weaponDetails.images.url}
                alt={weaponDetails.name}
                className="w-full h-48 object-cover rounded mt-3"
              />
            )}
          </div>
        )}
        {weaponDetails && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mb-2"
          >
            {deleting ? "Deleting..." : "Delete Weapon"}
          </button>
        )}
        {message && (
          <div className="text-center mt-2 text-sm text-green-600">{message}</div>
        )}
      </div>
    </div>
  );
};

export default DeleteWeapon;