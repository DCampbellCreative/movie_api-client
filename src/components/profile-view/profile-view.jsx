import React from 'react';
import { Container, Col, Form, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
	constructor() {
		super();
		this.state = {
			name: null,
			username: null,
			password: null,
			email: null,
			birthday: null,
			FavoriteMovies: [],
		}
	}

	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.getUser(accessToken);
		}
	}

	getUser(token) {
		const username = localStorage.getItem('user');
		axios.get('https://dcampbellcreative-movie-api.herokuapp.com/users', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(response => {
				this.setState({
					name: response.data.name,
					username: response.data.username,
					password: response.data.password,
					email: response.data.email,
					birthday: response.data.birthday,
					FavoriteMovies: response.data.FavoriteMovies
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
		const { movie, user } = this.props;
		return (
			<div>
				<Card>
					<Card body> Username: {user.Username}</Card>
					<Card body> Email: {user.Email}</Card>
				</Card>

			</div>
		)
	}
}