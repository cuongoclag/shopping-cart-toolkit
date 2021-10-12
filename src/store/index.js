import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import locationReducer from "../features/locationSlice";
const store = configureStore({
    reducer: {
        products: productsReducer,
        user : userReducer,
        cart : cartReducer,
        location: locationReducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
    ],
})

export default store