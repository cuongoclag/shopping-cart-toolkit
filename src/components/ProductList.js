import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import { getProducts, getSearchProducts } from '../features/productsSlice';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Categories from './Categories';

function ProductList() {

    const [searchText, setSearchText] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [category, setCategory] = useState()

    const history = useHistory()
    const dispatch = useDispatch()

    const products = useSelector(state => state.products.products)

    //gửi yêu cầu vào redux lấy danh sách products
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    //lấy id để qua trang detail
    const handleProductDetail = (id) => {
        history.push(`/product/${id}`)
    }

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('https://606730cf98f405001728e82c.mockapi.io/products')
            setPageCount(res.data.length / 10)
        }
        getProducts()
    }, [pageCount])

    //search
    // useEffect(() => {
    //     dispatch(getSearchProducts(searchText))
    // }, [searchText, dispatch])
    
    const handleSearch = (searchText) => {
        setSearchText(searchText)
    }

    //pagination
    useEffect(() => {
        dispatch(getProducts({page, limit, searchText, category}))
    }, [page, limit, searchText, category, dispatch])

    const handlePageClick = (data) => {
        setPage(data.selected + 1)
    }

    return (
        <div className="container">
            <input type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/>
            <Categories setCategory={setCategory}/>
            <Row>
            {
                products.map((product, index) => {
                    return (
                        <Col md="4" sm="4" >   
                            <Card body>
                                <CardImg top width="100%" src={product.image} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">{product.title}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">--{product.category}</CardSubtitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{product.price}</CardSubtitle>
                                    <CardText>{product.description}</CardText>
                                    {/* <NavLink to={`/product/${product.id}`}>Detail</NavLink> */}
                                    <Button onClick={() => handleProductDetail(product.id)}>Detail</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>
            <ReactPaginate 
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default ProductList
