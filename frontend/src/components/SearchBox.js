import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, } from 'react-router-dom'


function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
  
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
          navigate(`/?keyword=${keyword}`);
        } else {
            navigate(navigate.location.pathname);
        }
      };
      

  return (
    <Form onSubmit={submitHandler} inline className='form'>
        <Form.Control
            type='text'
            name='q'
            className='searchbox'
            onChange={(e) => setKeyword(e.target.value)}
        >   
        </Form.Control>
        <button type='submit' variant='success'> Submit</button>
    </Form>
    
  )
}

export default SearchBox