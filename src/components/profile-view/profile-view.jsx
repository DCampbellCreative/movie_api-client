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
		movies: []
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
				console.log("user", user);
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
	handleUpdate(e) {
		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		console.log(token);
		axios.put(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}`,
			{
				Username: this.state.Username,
				Password: this.state.Password,
				Email: this.state.Email,
				Birthday: this.state.Birthday
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(response => {
				console.log(response.data);
				alert(`Info Updated!`);
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.date.Birthday
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}


	render() {
		const { user } = this.props;
		const { username, email, favoriteMovies } = this.state;
		console.log(user.username);
		return (
			<div>
				<h1> Profile </h1>
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
					<input type='text' name='Username' defaultValue={username} />
					<Button variant="primary" onClick={(e) => this.handleUpdate(user.Username)}>Update</Button><br />

					<label>Email:</label>
					<input type='text' name='Email' defaultValue={email} />
					<Button variant="primary" onClick={(e) => this.handleUpdate(user.Email)}>Update</Button><br />

					<label>Password:</label>
					<input type='text' name='Password' defaultValue={`********`} />
					<Button variant="primary" onClick={(e) => this.handleUpdate(user.Password)}>Update</Button><br />

					<label>Birthday:</label>
					<input type='date' name='Birthday' defaultValue={user.Birthday} />
					<Button variant="primary" onClick={(e) => this.handleUpdate(user.Birthday)}>Update</Button><br />
				</Form>

			</div>
		)
	}
}