import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { addToCart } from '../features/cartSlice';

function ProductDetail(props) {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)

    // ------------ Ko nhất thiết gọi detail trong redux toolkit
    const [product, setProduct] = useState([])

    // Gọi api để lấy id detail
    useEffect(() => {
        const productDetail = async () => {
            const response = await axios.get(`https://606730cf98f405001728e82c.mockapi.io/products/${props.match.params.id}`)
            setProduct(response.data)
        }
        productDetail();
    }, [])

    const handleAddToCart = ({product, quantity}) => {
        dispatch(addToCart({product, quantity}))
    }

    const handleDecrease = () => {
        if(quantity === 1 ) {
            return
        }
        const newQuantity = quantity - 1;
        setQuantity(newQuantity)

    }
    const handleIncrease = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
    }

    return (
        <div className="container">
            <Row>
                <Col md="4">
                    <img src={product.image} alt={product.title} style={{width : "100%"}}/>
                </Col>
                <Col md="7">
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <div className="quantity" style={{ display : "flex" }}>
                        <Button onClick={handleDecrease}>-</Button>
                        <div>{quantity}</div>
                        <Button onClick={handleIncrease}>+</Button>
                    </div>
                    <Button onClick={() => handleAddToCart({product, quantity})}>ADD CART</Button>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetail
