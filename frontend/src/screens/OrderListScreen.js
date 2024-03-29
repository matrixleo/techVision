import React, {useEffect} from 'react'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { Button, Table} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders, deleteUser } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

function OrderListScreen() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList
  

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
    }else{
        navigate('/login')
    }
    }, [dispatch, navigate,userInfo])
        
    return (
    <div>
        <h1>Orders</h1>
        {loading ? (
        <Loader/>
        ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
            
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid Status</th>
                    <th>Delivered</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? (order.paidAt.substring(0,10)) : ( <i className='fas fa-remove' style={{color:'red'}}></i>)}</td>    
                            
                            <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)) : ( <i className='fas fa-remove' style={{color:'red'}}></i>)}</td>    
                            
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant=''>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>

        )}

    </div>
  )
}

export default OrderListScreen