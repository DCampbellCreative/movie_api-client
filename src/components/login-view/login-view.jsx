import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://dcampbellcreative-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        setErrorMessage('Username or password is incorrect.')
      });
  };

  return (

    <Form className="w-50 mx-auto m-3">
      <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Login</h2>

      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" className={`${errorMessage ? 'text-danger' : ''}`} onChange={e => setUsername(e.target.value)} onFocus={() => setErrorMessage('')} />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" className={`${errorMessage ? 'text-danger' : ''}`} onChange={e => setPassword(e.target.value)} onFocus={() => setErrorMessage('')} />
      </Form.Group>

      {errorMessage && <p className="mb-3 text-center" style={{ color: 'red' }}>{errorMessage}</p>}

      <Form.Group className="m-3 text-center">
        <Button className="mr-3" variant="primary" type="submit" onClick={handleSubmit}>Log In</Button>

        <Link to="/register">Register</Link>
      </Form.Group>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};

