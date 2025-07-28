import {createSlice} from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: "popup",
    initialState:{
        settingPopup: false,
        addWeaponPopup: false,
        deleteWeaponPopup: false,
        readBookPopup: false,
        recordBookPopup: false,
        returnBookPopup: false,
        addNewAdminPopup: false,
        
    },
    reducers:{
        toggleSettingPopup(state){
            state.settingPopup = !state.settingPopup;
        },
        toggleAddWeaponPopup(state){
            state.addWeaponPopup = !state.addWeaponPopup;
        },
        toggleDeleteWeaponPopup: (state) => {
    state.deleteWeaponPopup = !state.deleteWeaponPopup;
  },
        toggleReadBookPopup(state){
            state.readBookPopup = !state.readBookPopup;
        },
        toggleRecordBookPopup(state){
            state.recordBookPopup = !state.recordBookPopup;
        },
        toggleAddNewAdminPopup(state){
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        toggleReturnBookPopup(state){
            state.returnBookPopup = !state.returnBookPopup;
        },
        closeAllPopup(state){
            state.addWeaponPopup = false;
            state.deleteWeaponPopup= false,
            state.addNewAdminPopup = false;
            state.readBookPopup = false;
            state.recordBookPopup = false;
            state.returnBookPopup = false;
            state.settingPopup = false;
        },
    },
});

export const {
    closeAllPopup,
    toggleAddWeaponPopup,
    toggleDeleteWeaponPopup,
    toggleAddNewAdminPopup,
    toggleReadBookPopup,
    toggleRecordBookPopup,
    toggleReturnBookPopup,
    toggleSettingPopup,
} = popupSlice.actions;

export default popupSlice.reducer;