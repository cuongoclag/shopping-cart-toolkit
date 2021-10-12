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

const handleDistrictByIdProvince = (state, action) => {
    const arr = state.districts.filter(district => district.province_code === action)
    state.districtSelected = arr
}

const handleWardByIdDistrict = (state, action) => {
    const arr = state.wards.filter(ward => ward.district_code === action)
    state.wardSelected = arr
}

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
    districtSelected: [],
    wardSelected: [],
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        getDistrictByIdProvince : handleDistrictByIdProvince,
        getWardByIdDistrict : handleWardByIdDistrict
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

export const { getDistrictByIdProvince , getWardByIdDistrict} = locationSlice.actions

export default locationSlice.reducer