import {createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
}

const handleLogin = (state, action) => {
    const { user, token } = action.payload;
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(token));
    toast.success("Login success", {
        position: "top-center",
        autoClose : 3000
    })
}

const handleLogout = (state, action) => {
    state.user = {};
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    toast.success("Logout success", {
        position: "top-center",
        autoClose : 3000
      })
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: handleLogin,
        logout: handleLogout,
    },
});

export const { login, logout } = userSlice.actions

export default userSlice.reducer