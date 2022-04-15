import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Navbar, Nav, Col, Row, Button } from 'react-bootstrap';

export const Navigation = (props) => {
	return (
		<header className='mb-4' style={{ marginTop: '50px' }}>
			<Navbar expand='lg' fixed='top' className='nav-bar' bg='primary' variant='dark'>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link as={Link} to={`/`}>
							Home
						</Nav.Link>
						<Nav.Link as={Link} to={`/users/${props.user}`}>
							My Account
						</Nav.Link>
					</Nav>

					<Link to={`/`}>
						<Button variant='dark' className='logout-button' onClick={() => props.onLoggedOut()}>Logout</Button>
					</Link>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}