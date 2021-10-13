import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getProvinces = createAsyncThunk(
    'location/provinces',
    async() => {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/`)
        return response.data
    }
)

export const getDistricts = createAsyncThunk(
    'location/districts',
    async() => {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/`)
        return response.data
    }
)

export const getWards = createAsyncThunk(
    'location/wards',
    async() => {
        const response = await axios.get(`https://provinces.open-api.vn/api/w/`)
        return response.data
    }
)

const handleProvince = (state, action) => {
    state.province = action.payload
}

const handleDistrict = (state, action) => {
    state.district = action.payload
}

const handleWard = (state, action) => {
    state.ward = action.payload
}

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
    province: [],
    district: [],
    ward: [],
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        getProvince : handleProvince,
        getDistrict : handleDistrict,
        getWard : handleWard
    },
    extraReducers:{
        [getProvinces.fulfilled]: (state, action) => {
            state.provinces = action.payload
        },
        [getDistricts.fulfilled]: (state, action) => {
            state.districts = action.payload
        },
        [getWards.fulfilled]: (state, action) => {
            state.wards = action.payload
        },
    }
});

export const { getProvince, getDistrict, getWard } = locationSlice.actions

export default locationSlice.reducer