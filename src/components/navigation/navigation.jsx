import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

export const Navigation = (props) => {
	return (

		<Navbar fixed='top' className='nav-bar mb-4' bg='primary' variant='dark'>
			<Container fluid>
				<Navbar.Brand md={3} className='mr-auto' style={{ fontSize: '3rem', fontWeight: '600', color: 'whitesmoke' }}>FLIXFIX</Navbar.Brand>


				<Nav justify className='ml-auto'>
					<Nav.Link className='nav-bar-item' style={{ color: 'white' }} as={Link} to={`/`} >
						Movies
					</Nav.Link>
					<Nav.Link className='nav-bar-item' style={{ color: 'white' }} as={Link} to={`/users/${props.user}`} >
						Account
					</Nav.Link>
					{props.user ?

						(<Link to={`/`}>
							<Button className='ml-3 nav-bar-item' variant='link' style={{ color: 'white', border: '1px solid white' }} onClick={() => props.onLoggedOut()}>Logout</Button>
						</Link>) :
						(<Link to={`/login`}>
							<Button className='ml-3 nav-bar-item' variant='link' style={{ color: 'white', border: '1px solid white' }}>Login</Button>
						</Link>)}
				</Nav>

			</Container>
		</Navbar >

	)
}