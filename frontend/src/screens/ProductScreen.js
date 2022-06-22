import React, {useState, useEffect} from 'react'
import { Row, Col, ListGroup, Image, Button, Card, ListGroupItem,Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails} from '../actions/productActions'


function ProductScreen({history}) {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams()
  const productDetails = useSelector(state=> state.productDetails)
  const { loading, error, product} = productDetails

  useEffect(() => {
      dispatch(listProductDetails(id))
  },[dispatch,id])

  const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div>
        <Link to="/" className="btn btn-light my-3">Go Back...</Link>  
        {loading ?
          <Loader />
          : error
            ? <Message variant = 'danger'>{error}</Message>
            : (
              <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid/>
                </Col>
              
                <Col md={4}>
                  <ListGroup variant='flush'>
                  
                  <h3>{product.name}</h3>
                  <ListGroupItem>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                  </ListGroupItem>
                  <ListGroupItem>
                      Price: <i> ${product.price} </i>
                  </ListGroupItem>
                  <ListGroupItem>
                      About: {product.description}
                  </ListGroupItem>

                  </ListGroup>

                </Col>
              
                <Col md={2}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroupItem>
                        <Row>
                          <Col>
                            Price:
                          </Col>
                          <Col>
                            <i>${product.price}</i>
                          </Col>
                        </Row>
                      </ListGroupItem>

                      <ListGroupItem>
                        <Row>
                          <Col>
                            Status:
                          </Col>
                          <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroupItem>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>QTY</Col>
                            <Col xs='auto' className='my-1'>
                              <Form.Control 
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {
                                  [...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x+1}>
                                      {x + 1}
                                    </option>
                                  ))
                                }

                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroupItem id="buttoni">
                        <Button 
                        onClick={addToCartHandler}
                        className="btn" 
                        disabled={product.countInStock === 0} 
                        type="button">
                          Add To Cart
                        </Button>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>              
              )
        }
    </div>
    )
}

export default ProductScreen