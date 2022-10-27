import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'


function ProfileScreen() {

    const [name, setName ] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage ] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const{error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const{userInfo} = userLogin

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }else{
            if(!user || !user.name) {
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate ,userInfo, user])


    const submitHandler = () => {
        console.log('abc')
    }
  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='primary'>{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant='primary'>{error}</Message>}
        <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                required
                type='name' 
                placeholder='Enter Name'
                value={name}
                onChange= {(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group controlId='email'>
                <Form.Label>Email Address:</Form.Label>
                <Form.Control 
                required
                type='email' 
                placeholder='Enter Email'
                value={email}
                onChange= {(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            

            <Button type='submit' variant='primary' id="signup">Update</Button>
            </Form>
        </Col>

        <Col md={9}>
        <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen