import React from 'react';
import { Container, Col, Form, Row, Card, Button, Stack } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
	state = {
		username: null,
		email: null,
		password: null,
		birthday: null,
		favoriteMovies: [],
		movies: [],

		newUsername: null,
		newEmail: null,
		newPassword: null,
		newBirthday: null
	}

	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.getUser(accessToken);
			this.getMovies(accessToken);
		}
	}

	getMovies(token) {
		axios.get('https://dcampbellcreative-movie-api.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(response => {
				console.log(response.data);
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getUser(token) {
		const username = localStorage.getItem('user');
		axios.get('https://dcampbellcreative-movie-api.herokuapp.com/users', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(response => {
				const allUsers = response.data;
				const user = allUsers.filter((res) => res.Username === username)[0];
				console.log(user);
				this.setState({
					username: user.Username,
					email: user.Email,
					birthday: user.Birthday,
					favoriteMovies: user.FavoriteMovies
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	removeFavoriteMovie(movieId) {
		const token = localStorage.getItem('token');
		console.log(token);
		const username = this.state.username;
		axios.put(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}/movies/${movieId}`, {}, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(response => {
				console.log(response.data);
				alert(`Removed from Favorites`);
				this.setState({
					favoriteMovies: response.data.FavoriteMovies,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// updates user info accepts changed value as parameter to update each field separately
	handleUpdate(type) {
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');

		const changedValue = {
			Username: this.state.newUsername,
			Email: this.state.newEmail,
			Birthday: this.state.newBirthday
		}

		console.log(token);
		axios.put(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}`,
			{
				[type]: changedValue[type]
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(response => {
				console.log(response.data);
				alert(`Info Updated!`);
				this.setState({
					username: response.data.Username,
					email: response.data.Email,
					birthday: response.data.Birthday
				});
				localStorage.setItem('user', response.data.Username);
				window.open(`/users/${response.data.Username}`, '_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	setUsername(input) {
		this.setState({ newUsername: input });
	}

	setEmail(input) {
		this.setState({ newEmail: input });
	}

	setBirthday(input) {
		this.setState({ newBirthday: input });
	}

	// deletes user account
	deleteUser() {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');
		if (confirm(username + 'Are you sure you want to delete your account?')) {
			axios.delete(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					console.log(response);

					alert(username + ' your account has been deleted.');
					localStorage.removeItem('user');
					localStorage.removeItem('token');
					window.open('/', '_self');
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	}

	render() {
		const { user } = this.props;
		const { username, email, birthday, favoriteMovies } = this.state;
		return (
			<React.Fragment>
				<h2 className='m-4' style={{ textTransform: 'uppercase', textAlign: 'center' }}>{username}'s Account</h2>
				<Card className='profile-card'>

					<h4 className='center border-bottom'> <b>Username:</b> {username}</h4>
					<h4 className='center border-bottom'> <b>Email:</b> {email}</h4>
					<h4 className='center mb-3'>Your Favorites</h4>

					{favoriteMovies < 1 ?
						<h4 className='center mb-3' style={{ color: 'red' }}>No favorites, select some in movie details!</h4> :
						<Row>
							{favoriteMovies.map((movieId) => {
								const movie = this.state.movies.filter((mov) => mov._id === movieId)[0] || {};
								console.log(movie)
								return <Row style={{ display: 'flex' }}>
									<Card className='text-center ml-5 mb-3' style={{ padding: '1%' }} key={movie._id}>
										<Card.Img className='mb-2' style={{ width: '10rem', alignSelf: 'center' }} crossOrigin="anonymous" src={movie.ImagePath} />
										{movie.Title}
										<Button variant="link" onClick={() => this.removeFavoriteMovie(movie._id)}>- Remove From Favorites</Button>
									</Card>
								</Row>
							})}
						</Row>}

				</Card>

				<h2 className='m-4' style={{ textAlign: 'center' }}>UPDATE USER INFO</h2>

				<Form  >

					<Form.Group className='d-flex mb-3' as={Col}>
						<Form.Label style={{ width: '7rem' }} className='mr-4'>Username:</Form.Label>
						<Form.Control md={3} className='mr-4' type='text' name='Username' defaultValue={username} onChange={(e) => this.setUsername(e.target.value)} />
						<Button variant="primary" className='mr-0' onClick={() => this.handleUpdate('Username')}>Update</Button><br />
					</Form.Group>

					<Form.Group className='d-flex mb-3' as={Col}>
						<Form.Label style={{ width: '7rem' }} className='mr-4'>Email:</Form.Label>
						<Form.Control className="mr-4" type='text' name='Email' defaultValue={email} onChange={(e) => this.setEmail(e.target.value)} />
						<Button variant="primary" onClick={(e) => this.handleUpdate('Email')}>Update</Button><br />
					</Form.Group>



					<Form.Group className='d-flex mb-3
					' as={Col}>
						<Form.Label style={{ width: '7rem' }} className="mr-4">Birthday:</Form.Label>
						<Form.Control className="mr-4" type='date' name='Birthday' defaultValue={birthday} onChange={(e) => this.setBirthday(e.target.value)} />
						<Button variant="primary" onClick={(e) => this.handleUpdate('Birthday')}>Update</Button><br />
					</Form.Group>

				</Form>

				<div style={{ textAlign: 'center', margin: '3%' }}>
					<Button variant="danger" onClick={() => this.deleteUser()}>Delete Account</Button>
				</div>
			</React.Fragment>
		)
	}
}