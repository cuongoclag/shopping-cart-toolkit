import {createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
   cartItem: JSON.parse(localStorage.getItem("cart")) || [],
   cartTotalQuantity: 0,
   cartTotalPrice : 0
}

const handleAddCart = (state, action) => {
    const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id)

    if(itemIndex >= 0) {
        state.cartItem[itemIndex].quantity += 1
        toast.success("Add To Cart Success", {
            position : "top-center",
            autoClose : 3000
        })
    } else {
        const cartProduct = {...action.payload.product, quantity : action.payload.quantity}
        state.cartItem.push(cartProduct)
        toast.success("Add To Cart Success", {
            position : "top-center",
            autoClose : 3000
        })
    }
    localStorage.setItem("cart", JSON.stringify(state.cartItem))
}

const handleRemoveItem = (state, action) => {
    const newCart = state.cartItem.filter((item) => item.id !== action.payload)
    state.cartItem = newCart
    toast.success("Remove Item Success", {
        position : "top-center",
        autoClose : 3000
    })
    localStorage.setItem("cart", JSON.stringify(state.cartItem))
}


const handleDecreaseItem = (state, action) => {
    const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload)
    if(state.cartItem[itemIndex].quantity > 1){
        state.cartItem[itemIndex].quantity -= 1
    } else if (state.cartItem[itemIndex].quantity === 1) {
        const newCart = state.cartItem.filter((item) => item.id !== action.payload)
        state.cartItem = newCart
        toast.success("Remove Item Success", {
            position : "top-center",
            autoClose : 3000
        })
    } else {
        return
    }
    localStorage.setItem("cart", JSON.stringify(state.cartItem))
}

const handleIncreaseItem = (state, action) => {
    const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload)
    if(state.cartItem[itemIndex].quantity >= 1){
        state.cartItem[itemIndex].quantity += 1
    } 
    localStorage.setItem("cart", JSON.stringify(state.cartItem))
}

const getTotal = (state, action) => {
    const { total, quantityItem } = state.cartItem.reduce((totalItem, cartItem) => {
        const { price, quantity } = cartItem;
        const itemTotal = price * quantity;

        totalItem.total += itemTotal;
        totalItem.quantityItem += quantity;

        return totalItem;

    }, {
        total: 0,
        quantity: 0
    })

    state.cartTotalQuantity = quantityItem;
    state.cartTotalPrice = total;
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: handleAddCart,
        removeItem : handleRemoveItem,
        decreaseItem : handleDecreaseItem,
        increaseItem : handleIncreaseItem,
        subTotal : getTotal,
    },
});

export const { addToCart, removeItem, decreaseItem, increaseItem, subTotal } = cartSlice.actions

export default cartSlice.reducer