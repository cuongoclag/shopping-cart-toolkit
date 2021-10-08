import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';

function ProductList() {
    const [products, setProducts] = useState([])

    //call api product
    useEffect(() => {
        const Products = async () => {
            const response = await axios.get("https://606730cf98f405001728e82c.mockapi.io/products")
            setProducts(response.data)
        }
        Products();
    }, [])

    return (
        <div className="container">
            <Row>
            {
                products.map((product, index) => {
                    return (
                        <Col md="4" sm="4" >   
                            <Card body>
                                <CardImg top width="100%" src={product.image} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">{product.title}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{product.price}</CardSubtitle>
                                    <CardText>{product.description}</CardText>
                                    <NavLink to={`/product/${product.id}`}>Detail</NavLink>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>
        </div>
    )
}

export default ProductList
