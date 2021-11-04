import React from 'react';
import { Container, Col, Form, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
	constructor() {
		super();
		this.state = {
			username: null,
			email: null,
			birthday: null,
			favoriteMovies: [],
			movies: []
		}
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



	removeFavoriteMovie(movie) {
		// Code for deleting fav movie will go here
		// This code will be super duper close to the same code for fav'ing a movie
	}
	handleUpdate() {
		// Code for updating user info
	}

	render() {
		const { user } = this.props;
		const { favoriteMovies } = this.state;
		return (
			<div>
				<Card>
					<Card body> Username: {user.Username}</Card>
					<Card body> Email: {user.Email}</Card>
					<ul>
						{favoriteMovies.map((movieId) => {
							const movie = this.state.movies.filter((mov) => mov._id === movieId)[0] || {};
							console.log(movie)
							return <li key={movieId}>{movie.Title} - {movie.Description}</li>
						})}
					</ul>
				</Card>

			</div>
		)
	}
}