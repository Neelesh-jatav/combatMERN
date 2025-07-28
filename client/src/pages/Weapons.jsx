import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import weaponDisplay from "../assets/weaponDisplay.png";
import rifle from "../assets/rifle.png";
import artilleary from "../assets/artilleary.png";
import explosives from "../assets/explosives.png";
import armoured_vehicles from "../assets/armoured_vehicles.png";
import missiles from "../assets/missiles.png";
import fighterjets from "../assets/fighterjets.png";
import uav from "../assets/uav.png";
import naval from "../assets/naval.png";
import nuclear from "../assets/nuclear.png";
import defence from "../assets/defence.png";
import chemical from "../assets/chemical.png";
import cyber from "../assets/cyber.png";
import { toggleAddWeaponPopup, toggleDeleteWeaponPopup } from "../store/slices/popUpSlice";
import AddWeapon from "./AddWeapons";
import DeleteWeapon from "./DeleteWeapon";

const staticCategories = [
  { title: "Rifle", image: rifle, desc: "Precision firearms for ground infantry units." },
  { title: "Artillery", image: artilleary, desc: "Heavy-caliber long-range support systems." },
  { title: "Explosives", image: explosives, desc: "High-impact demolitions and tactical charges." },
  { title: "Armored Vehicles", image: armoured_vehicles, desc: "Combat-protected mobility for battlefield dominance." },
  { title: "Missiles", image: missiles, desc: "Strategic and tactical guided weaponry." },
  { title: "Fighter Jets", image: fighterjets, desc: "Supersonic aircraft for air dominance missions." },
  { title: "UAV", image: uav, desc: "Unmanned aerial systems for recon and strike." },
  { title: "Naval Weaponry", image: naval, desc: "Sea-based platforms for maritime warfare." },
  { title: "Nuclear Warheads", image: nuclear, desc: "Weapons of mass destruction with strategic reach." },
  { title: "Defence System", image: defence, desc: "Integrated systems to intercept and neutralize threats." },
  { title: "Chemical", image: chemical, desc: "Toxic agents for area denial and incapacitation." },
  { title: "Cyber Security", image: cyber, desc: "Defensive tech for digital and network warfare." },
];

const Weapon = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addWeaponPopup, deleteWeaponPopup } = useSelector((state) => state.popup);

  const [expanded, setExpanded] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [weaponCategories, setWeaponCategories] = useState([]);

  const toggleViewMore = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    const handleScroll = () => setIsCollapsed(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/weapon/all");
        const weapons = data.weapons || [];

        const groupedWeapons = {};
        weapons.forEach((weapon) => {
          if (!groupedWeapons[weapon.category]) groupedWeapons[weapon.category] = [];
          groupedWeapons[weapon.category].push(weapon);
        });

        const combined = staticCategories.map((cat) => ({
          ...cat,
          subWeapons: groupedWeapons[cat.title] || [],
        }));

        setWeaponCategories(combined);
      } catch (err) {
        console.error("Error fetching weapons:", err);
      }
    };

    fetchWeapons();
  }, []);

  return (
    <div className="bg-white min-h-screen relative">

      {/* Add/Delete Weapon Buttons */}
      {user?.role === "Admin" && (
        <>
          <button
            onClick={() => dispatch(toggleAddWeaponPopup())}
            className="fixed top-22 right-6 z-30 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
          >
            + Add Weapon
          </button>

          <button
            onClick={() => dispatch(toggleDeleteWeaponPopup())}
            className="fixed top-32 right-6 z-30 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 mt-4"
          >
            🗑 Delete Weapon
          </button>
        </>
      )}

      {/* AddWeapon Popup */}
      {addWeaponPopup && <AddWeapon />}

      {/* DeleteWeapon Popup */}
      {deleteWeaponPopup && <DeleteWeapon />}

      {/* Quick Navigation */}
      <div className="hidden lg:block fixed top-48 right-6 z-20">
        {isCollapsed ? (
        
          <div
            onClick={() => setIsCollapsed(false)}
            className="bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition"
          >
            Quick Nav
          </div>
        ) : (
          <div className="w-64 bg-white border rounded-xl shadow-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-700">Quick Navigation</h3>
              <button
                onClick={() => setIsCollapsed(true)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2 text-blue-600 text-sm max-h-[400px] overflow-y-auto">
              {weaponCategories.map((weapon, idx) => (
                <li
                  key={idx}
                  onClick={() => document.getElementById(weapon.title)?.scrollIntoView({ behavior: "smooth" })}
                  className="cursor-pointer hover:underline"
                >
                  {weapon.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 md:px-12 py-10">
        {/* Hero */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <img
            src={weaponDisplay}
            alt="Weapons Display"
            className="rounded-xl shadow-xl w-full md:w-[600px] h-[350px] object-cover"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Weapons & Arms</h1>
            <p className="text-gray-700 text-lg">
              Advanced defense and warfare tools for military forces. Built for precision and tactical superiority.
            </p>
          </div>
        </div>

        {/* Categories */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 border-b-2 pb-4">
          Product Categories
        </h2>

        {weaponCategories.map((weapon, idx) => {
          const showAll = expanded[weapon.title];
          const visibleItems = showAll ? weapon.subWeapons : weapon.subWeapons.slice(0, 3);

          return (
            <div key={idx} id={weapon.title} className="mb-16">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <img
                  src={weapon.image}
                  alt={weapon.title}
                  className="w-full md:w-[300px] h-[200px] object-cover rounded-xl shadow-md hover:scale-105 transition"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{weapon.title}</h3>
                  <p className="text-gray-600 mt-1">{weapon.desc}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleItems.length > 0 ? (
                  visibleItems.map((sub, index) => (
                    <div
                      key={index}
                      onClick={() => alert(`Navigate to: ${sub.name}`)}
                      className="bg-white border rounded-xl shadow-sm hover:shadow-md p-4 cursor-pointer transition"
                    >
                      {sub.images?.length > 0 && (
                        <img
                          src={sub.images[0].url}
                          alt={sub.name}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                      )}
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">{sub.name}</h4>
                      <p className="text-sm text-gray-600">Stock: {sub.stock ?? "N/A"}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No weapons available under this category.</p>
                )}
              </div>

              {weapon.subWeapons.length > 3 && (
                <div className="mt-4">
                  <button
                    onClick={() => toggleViewMore(weapon.title)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {showAll ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weapon;
