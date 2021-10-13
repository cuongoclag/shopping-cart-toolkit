import Select from "react-select";
import React, {useState,useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getDistrict, getDistricts, getProvince, getProvinces, getWard, getWards } from "../features/locationSlice";
function Location() {
    // const [provinces, setProvinces] = useState([])
    // const [districts, setDistricts] = useState([])
    // const [wards, setWards] = useState([])

    const dispatch = useDispatch()

    const provinces = useSelector(state => state.location.provinces)
    const districts = useSelector(state => state.location.districts)
    const wards = useSelector(state => state.location.wards)
  
    //đưa vào mảng quận dc lọc từ tp, phường từ quận
    const [districtSelected, setDistrictSelected] = useState([])
    const [wardSelected, setWardSelected] = useState([])


    // useEffect(() => {
    //     axios.get("https://provinces.open-api.vn/api/p/").then(res => {
    //         setProvinces(res.data)
    //     })
    //     axios.get("https://provinces.open-api.vn/api/d/").then(res => {
    //         setDistricts(res.data)
    //     })
    //     axios.get("https://provinces.open-api.vn/api/w/").then(res => {
    //         setWards(res.data)
    //     })
    // }, [])

    useEffect(() => {
        dispatch(getProvinces())
        dispatch(getDistricts())
        dispatch(getWards())
    }, [dispatch])

    const provincesOptions = [
        ...provinces.map(provice => {
            return({value: provice.code, label: provice.name})
        })
    ]
    const districtsOptions = [
        ...districtSelected.map(district => {
            return({value: district.code, label: district.name})
        })
    ]
    const wardsOptions = [
        ...wardSelected.map(ward => {
            return({value: ward.code, label: ward.name})
        })
    ]

    const handleProvince = (e) => {
        dispatch(getProvince(e.label))
        //so sanh lấy ra quận của tp
        const arr = districts.filter(district => district.province_code === e.value)
        setDistrictSelected(arr)
    }
    const handleDistrict = (e) => {
        dispatch(getDistrict(e.label))
        //so sanh lấy ra phường của quận
        const arr = wards.filter(ward => ward.district_code === e.value)
        setWardSelected(arr)
    }

    const handleWard = (e) => {
      dispatch(getWard(e.label))
    }

  return (
    <div style={{ display: "flex"}}>
      <div style={{ width: "30rem" , padding: "10px" }}>
        <Select options={provincesOptions} onChange={handleProvince}/>
      </div>
      <div style={{ width: "30rem" , padding: "10px"}}>
        <Select options={districtsOptions} onChange={handleDistrict}/>
      </div>
      <div style={{ width: "30rem" , padding: "10px"}}>
        <Select options={wardsOptions} onChange={handleWard}/>
      </div>
    </div>
  );
}

export default Location;
