import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Navbar, Nav, Col, Row, Button } from 'react-bootstrap';

export const Navigation = (props) => {
	return (
		<header className='mb-4' style={{ marginTop: '50px' }}>
			<Navbar expand='lg' fixed='top' className='nav-bar' bg='primary' variant='dark'>

				<h1 className='mr-auto' style={{ fontSize: '4rem', fontWeight: '600', color: 'whitesmoke' }}>FLIXFIX</h1>

				{props.user && (
					<React.Fragment>
						<Navbar.Toggle aria-controls='basic-navbar-nav' />
						<Navbar.Collapse id='basic-navbar-nav'>

							<React.Fragment>
								<Nav justify className='ml-auto'>

									<Nav.Link as={Link} to={`/`} style={{ width: '7rem' }}>
										Home
									</Nav.Link>
									<Nav.Link as={Link} to={`/users/${props.user}`} style={{ width: '8rem' }}>
										My Account
									</Nav.Link>
								</Nav>
								<Link to={`/`}>
									<Button variant='link' style={{ width: '7rem', color: 'rgb(204, 0, 0)' }} onClick={() => props.onLoggedOut()}>Logout</Button>
								</Link>
							</React.Fragment>

						</Navbar.Collapse>
					</React.Fragment>
				)}
			</Navbar>
		</header>
	)
}