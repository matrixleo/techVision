import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {Message} from '../components/Message'
import {addToCart} from '../actions/cartActions'





function CartScreen({id,location,navigate}) {
  const location = useLocation();
  const productId = id
  const qty = location.search
  console.log('qty:', qty)

  return (
    <div>Cart</div>
  )
}

export default CartScreen