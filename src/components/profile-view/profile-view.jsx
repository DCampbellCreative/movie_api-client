import React from 'react';
import { Container, Col, Form, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
	state = {
		username: null,
		email: null,
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
		axios.put(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}/movies/${movieId}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(response => {
				console.log(response.data);
				// this.setState({
				// 	favoriteMovies: response.data.FavoriteMovies,
				// });
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	handleUpdate() {
		// Code for updating user info
	}

	render() {
		const { user } = this.props;
		const { favoriteMovies } = this.state;
		console.log(favoriteMovies);
		return (
			<div>
				<Card>
					<Card body> Username: {user.Username}</Card>
					<Card body> Email: {user.Email}</Card>
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

			</div>
		)
	}
}