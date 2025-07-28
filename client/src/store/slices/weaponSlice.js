import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toggleAddWeaponPopup } from "./popUpSlice";

// Initial State
const initialState = {
  loading: false,
  error: null,
  message: null,
  weapons: [],
};

const weaponSlice = createSlice({
  name: "weapon",
  initialState,
  reducers: {
    // Fetch all weapons
    fetchWeaponsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchWeaponsSuccess(state, action) {
      state.loading = false;
      state.weapons = action.payload;
    },
    fetchWeaponsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add new weapon
    addWeaponRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addWeaponSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addWeaponFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset
    resetWeaponSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

// Export actions
export const {
  fetchWeaponsRequest,
  fetchWeaponsSuccess,
  fetchWeaponsFailed,
  addWeaponRequest,
  addWeaponSuccess,
  addWeaponFailed,
  resetWeaponSlice,
} = weaponSlice.actions;

// Fetch all weapons
export const fetchAllWeapons = () => async (dispatch) => {
  dispatch(fetchWeaponsRequest());
  try {
    const { data } = await axios.get("/api/v1/weapon/all");
    dispatch(fetchWeaponsSuccess(data.weapons));
  } catch (error) {
    dispatch(fetchWeaponsFailed(error.response?.data?.message || "Failed to fetch weapons"));
  }
};

// Add new weapon
export const addWeapon = (formData) => async (dispatch) => {
  dispatch(addWeaponRequest());
  try {
    const { data } = await axios.post("http://localhost:4000/api/v1/weapon/admin/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    dispatch(addWeaponSuccess(data.message));
    toast.success(data.message);
    dispatch(toggleAddWeaponPopup());
    dispatch(fetchAllWeapons()); // Refresh weapon list
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add weapon";
    dispatch(addWeaponFailed(message));
    toast.error(message);
  }
};

// Reset weapon state
export const resetWeapon = () => (dispatch) => {
  dispatch(resetWeaponSlice());
};

// Export reducer
export default weaponSlice.reducer;
