import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);

    axios.post('https://dcampbellcreative-movie-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); //opens page in current tab
      })
      .catch(e => {
        setErrorMessage('Error registering the user. Please make sure all info is valid.')
      });
  };

  return (
    <Form className="w-50 mx-auto m-3">
      <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Register</h2>
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control placeholder="Username" type="text" className={`${errorMessage ? 'text-danger' : ''}`} onFocus={() => setErrorMessage('')} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control placeholder="Password" type="password" className={`${errorMessage ? 'text-danger' : ''}`} onFocus={() => setErrorMessage('')} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control placeholder="Email" type="text" value={email} className={`${errorMessage ? 'text-danger' : ''}`} onFocus={() => setErrorMessage('')} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control placeholder="Birthday" type="text" value={birthday} className={`${errorMessage ? 'text-danger' : ''}`} onFocus={() => setErrorMessage('')} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      {errorMessage && <p className="mb-3 text-center" style={{ color: 'red' }}>{errorMessage}</p>}

      <Form.Group className="m-3 text-center">
        <Button className="mr-3" variant="primary" type="submit" onClick={handleSubmit}>Create Account</Button>

        <Link to="/">Login</Link>
      </Form.Group>
    </Form>
  );
}

// RegistrationView.propTypes = {
//   onRegister: PropTypes.func.isRequired
// };