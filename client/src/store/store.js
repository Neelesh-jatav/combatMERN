import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import popupReducer from './slices/popUpSlice';
import weaponReducer from './slices/weaponSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    weapon: weaponReducer,
  },
});