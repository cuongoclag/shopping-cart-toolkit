import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterRangePrice, getProducts } from '../features/productsSlice';

function RangeFilter() {

  const dispatch = useDispatch()

  const [value, setValue] = useState([0, 1000]);
  const [filtered, setFiltered] = useState([])

  const products = useSelector(state => state.products.products)
  const handleValueRange = (e, newValue) => {
        setValue(newValue)
        const minPrice = value[0]
        const maxPrice = value[1]
        const arr = products.filter((product) => {
            if((product.price > minPrice && product.price < maxPrice)){
                console.log("vo 1")
                // return product
            } else {
                console.log("vo 2")
                // dispatch(getProducts()) 
            }
        })
        // console.log(arr)
        // dispatch(FilterRangePrice(arr))
  };

  return (
    <div>
      <Box sx={{ width: 500 }}>
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={value}
          onChange={handleValueRange}
          valueLabelDisplay="auto"
          max={1000}
          disableSwap
        />
      </Box>
    </div>
  );
}

export default RangeFilter;
