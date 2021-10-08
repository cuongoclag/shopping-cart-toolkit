import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ProductDetail(props) {
    const [product, setProduct] = useState()

    useEffect(() => {
        const Product = async () => {
            const response = await axios.get(`https://606730cf98f405001728e82c.mockapi.io/products/${props.match.params.id}`)
            setProduct(response)
        }
        Product();
    }, [])

    return (
        <div>
            ProductDetail
        </div>
    )
}

export default ProductDetail
