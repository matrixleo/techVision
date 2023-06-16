import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { Button, Table, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'

function ProductListScreen() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
   
    if (userInfo && userInfo.isAdmin) {
        dispatch(listProducts());
      }else{
        navigate('/login')
    }
    }, [dispatch, navigate,userInfo,])
    
   const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this product ?')){
       //delete product
    }      
   }

    const createProductHandler = (products) => {
        //create product
    }
    
    return (
    <div>
        <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
        </Row>


        {loading ? (
        <Loader/>
        ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
            
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                            <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant=''><i className='fas fa-edit'></i></Button>
                                </LinkContainer>
                                <Button variant='link' className='btn-sm' onClick={()=>deleteHandler(product._id)}><i className='fas fa-trash'></i></Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>

        )}

    </div>
  )
}

export default ProductListScreen