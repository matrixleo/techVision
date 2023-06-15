import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const {id} = useParams()
    
    const [name, setName ] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const userDetails = useSelector(state => state.userDetails)
    const{error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const{error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    },[user,id,successUpdate,navigate]) 


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }
  return (
    <div>
        <Link to='/admin/userList'>
            Go Back
        </Link>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        
       {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
        : (
        <FormContainer>
           <Form onSubmit={submitHandler}>
                
           <Form.Group controlId='name'>
               <Form.Label>Name:</Form.Label>
               <Form.Control 
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
               type='email' 
               placeholder='Enter Email'
               value={email}
               onChange= {(e) => setEmail(e.target.value)}
               >
               </Form.Control>
           </Form.Group>

           <Form.Group controlId='isAdmin'>
               <Form.Label>Is Admin:</Form.Label>
               <Form.Check 
               type='checkbox'
               checked={isAdmin}
               onChange= {(e) => setIsAdmin(e.target.checked)}
               >

               </Form.Check>
           </Form.Group>


           <Button type='submit' variant='primary' id="signup">Update</Button>
       </Form>
    </FormContainer>
       )}
        
    </div>
  )
}

export default UserEditScreen