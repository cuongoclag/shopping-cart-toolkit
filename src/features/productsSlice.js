import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getProducts = createAsyncThunk(
    'products/listProducts',
    async({page, limit, searchText, category}) => {
        const response = await axios.get(`https://606730cf98f405001728e82c.mockapi.io/products?category=${category}&title=${searchText}&page=${page}&limit=${limit}`)
        console.log(response.data)
        return response.data
    }
)

const initialState = {
    products: [],
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers:{
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload
        },
    }
});

export const {} = productsSlice.actions

export default productsSlice.reducer