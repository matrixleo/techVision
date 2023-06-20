import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline='true' className='form'>
      <Form.Control
        type='text'
        name='q'
        className='searchbox'
        placeholder='Search'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type='submit' variant='outlined-success'>
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
