import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getProducts = createAsyncThunk(
    'products/listProducts',
    async({page, limit, searchText, category}) => {
        //const response = await axios.get(`https://606730cf98f405001728e82c.mockapi.io/products?category=${category}&title=${searchText}&page=${page}&limit=${limit}`)
        const response = await axios.get(`https://606730cf98f405001728e82c.mockapi.io/products`)
        console.log("calllllllllllll")
        return response.data
    }
)

const handleFilterRangePrice = (state, action) => {
    console.log(action.payload)
    state.products = action.payload
}

const initialState = {
    products: [],
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        FilterRangePrice: handleFilterRangePrice
    },
    extraReducers:{
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload
        },
    }
});

export const { FilterRangePrice } = productsSlice.actions

export default productsSlice.reducer