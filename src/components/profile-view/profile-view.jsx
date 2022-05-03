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

	// updates user info
	handleUpdate() {
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		console.log(token);
		axios.put(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}`,
			{
				Username: this.state.newUsername
					? this.state.newUsername
					: this.state.Username,
				Email: this.state.newEmail
					? this.state.newEmail
					: this.state.Email,
				Birthday: this.state.newBirthday
					? this.state.newBirthday
					: this.state.birthday
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(response => {
				console.log(response.data);
				alert(`Info Updated!`);
				this.setState({
					username: response.data.Username,
					password: response.data.Password,
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

	render() {
		const { user } = this.props;
		const { username, email, favoriteMovies } = this.state;
		return (
			<div>
				<h2 style={{ textTransform: 'capitalize', textAlign: 'center', margin: '2%' }}>{username}'s Account</h2>
				<Card className='profile-card'>

					<h4 className='center border-bottom'> <b>Username:</b> {username}</h4>
					<h4 className='center border-bottom'> <b>Email:</b> {email}</h4>
					<h4 style={{ padding: '2% ' }}>Your Favorites</h4>
					<ul>
						{favoriteMovies.map((movieId) => {
							const movie = this.state.movies.filter((mov) => mov._id === movieId)[0] || {};
							console.log(movie)
							return <li style={{ padding: '1%' }} key={movieId}>{movie.Title} - {movie.Description}
								<Button variant="link" onClick={() => this.removeFavoriteMovie(movie._id)}>Remove From Favorites</Button>
							</li>

						})}
					</ul>

				</Card>


				<h2 style={{ textAlign: 'center' }}>Update User Info</h2>

				<Form className='mx-auto' style={{ width: '65%', textAlign: 'right', }}>


					<Form.Group >

						<Form.Label style={{ margin: '2%' }} className='update-form-label'>Username:</Form.Label>
						<Form.Control style={{ margin: '2%' }} type='text' name='Username' defaultValue={username} onChange={(e) => this.setUsername(e.target.value)} />
						<Button variant="primary" className='mr-0' onClick={() => this.handleUpdate()}>Update</Button><br />

					</Form.Group>


					<Form.Group >
						<Form.Label style={{ margin: '2% ' }} className='update-form-label'>Email:</Form.Label>
						<Form.Control style={{ margin: '2% ' }} type='text' name='Email' defaultValue={email} onChange={(e) => this.setEmail(e.target.value)} />
						<Button variant="primary" onClick={(e) => this.handleUpdate()}>Update</Button><br />
					</Form.Group>
					{/* <label>Password:</label>
					<input type='text' name='Password' defaultValue={`********`} />
					<Button variant="primary" onClick={(e) => this.handleUpdate(user.Password)}>Update</Button><br /> */}

					<Form.Group >
						<Form.Label style={{ margin: '2% ' }} className='update-form-label'>Birthday:</Form.Label>
						<Form.Control style={{ margin: '2% ' }} type='date' name='Birthday' defaultValue={user.Birthday} onChange={(e) => this.setEmail(e.target.value)} />
						<Button variant="primary" onClick={(e) => this.handleUpdate()}>Update</Button><br />
					</Form.Group>
				</Form>

				<div style={{ textAlign: 'center', margin: '3%' }}>
					<Button variant="danger" onClick={() => this.deleteUser()}>Delete Account</Button>
				</div>
			</div >
		)
	}
}