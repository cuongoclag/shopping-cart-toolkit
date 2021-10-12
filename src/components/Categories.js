import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

function Categories({ setCategory }) {

    const [listCategories, setListCategories] = useState([])
    const [callbackCategory, setCallbackCategory] = useState("")

    const getDataServer = () => {
        const getProducts = async () => {
            const res = await axios.get('https://606730cf98f405001728e82c.mockapi.io/products')
            const mapCategories = res.data.map((product, index) => {
                return product.category
            })
            const arr = Array.from(new Set(mapCategories))
            const listCat = arr.map(cat => {
                return({
                    value : cat, label : cat
                })
            })
            const arr2 = [{value: "", label: "All"} , ...listCat]
            setListCategories(arr2)
        }
        getProducts()
    }

    useEffect(() => {
        getDataServer()
        setCategory(callbackCategory)
    }, [callbackCategory, setCategory])

    const handleSelectCategory = (e) => {
        setCallbackCategory(e.value)
    }



    return (
        <div style={{ width: '10rem' }}>
            <Select options={listCategories} onChange={handleSelectCategory} defaultInputValue={""} />
        </div>
    )
}

export default Categories
