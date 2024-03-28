import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: null,
    email: null,
    userID: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { username, email, _id } = action.payload;
            state.isLoggedIn = true;
            state.username = username;
            state.email = email;
            state.userID = _id;
        },
        REMOVE_ACTIVE_USER(state, action) {
            state.isLoggedIn = false;
            state.email = null;
            state.username = null;
            state.userID = null;
        },
    },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
