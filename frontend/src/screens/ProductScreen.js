import React from 'react'
import { Row, Col, ListGroup, Image, Button, Card, ListGroupItem } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Rating from '../components/Rating'

import products from '../products' 


function ProductScreen() {
  const { id } = useParams();
  const product = products.find((p) => p._id === (id));
  
  return (
    <div>
        <Link to="/" className="btn btn-light my-3">Go Back...</Link>  

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

                <ListGroupItem id="buttoni">
                  <Button className="btn" disabled={product.countInStock == 0} type="button"> Add To Cart</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

    </div>
    )
}

export default ProductScreen