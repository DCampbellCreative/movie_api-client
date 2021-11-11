import React from 'react';
import { Container, Col, Form, Row, Card, Button } from 'react-bootstrap';
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
				<h1>My Account</h1>
				<Card>
					<Card body> Username: {username}</Card>
					<Card body> Email: {email}</Card>
					<ul>
						{favoriteMovies.map((movieId) => {
							const movie = this.state.movies.filter((mov) => mov._id === movieId)[0] || {};
							console.log(movie)
							return <li key={movieId}>{movie.Title} - {movie.Description}
								<Button variant="link" onClick={() => this.removeFavoriteMovie(movie._id)}>Remove From Favorites</Button>
							</li>

						})}
					</ul>
				</Card>

				<Form>
					<h2>Update User Info</h2>

					<label>Username:</label>
					<input type='text' name='Username' defaultValue={username} onChange={(e) => this.setUsername(e.target.value)} />
					<Button variant="primary" onClick={() => this.handleUpdate()}>Update</Button><br />

					<label>Email:</label>
					<input type='text' name='Email' defaultValue={email} onChange={(e) => this.setEmail(e.target.value)} />
					<Button variant="primary" onClick={(e) => this.handleUpdate()}>Update</Button><br />

					{/* <label>Password:</label>
					<input type='text' name='Password' defaultValue={`********`} />
					<Button variant="primary" onClick={(e) => this.handleUpdate(user.Password)}>Update</Button><br /> */}

					<label>Birthday:</label>
					<input type='date' name='Birthday' defaultValue={user.Birthday} onChange={(e) => this.setEmail(e.target.value)} />
					<Button variant="primary" onClick={(e) => this.handleUpdate()}>Update</Button><br />
				</Form>

				<Button variant="danger" onClick={() => this.deleteUser()}>Delete Account</Button>

			</div>
		)
	}
}