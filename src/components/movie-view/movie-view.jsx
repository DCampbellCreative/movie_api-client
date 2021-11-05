import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import axios from 'axios';


export class MovieView extends React.Component {
  state = {
    username: null,
    email: null,
    birthday: null,
    favoriteMovies: [],
    movies: []
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

  addFavoriteMovie(movieId) {
    const token = localStorage.getItem('token');
    console.log(token);
    const username = this.state.username;
    axios.post(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { username, email, favoriteMovies } = this.state;

    return (
      <Row>

        <Image src={movie.ImagePath} thumbnail />

        <Card className="movie-view">
          <Card.Title>
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </Card.Title>
          <Card.Body>
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </Card.Body>
        </Card>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <Link to={`/`}>
          <Button variant="link">Go Back</Button>
        </Link>

        <Button variant="link" onClick={() => this.addFavoriteMovie(movie._id)}>Add to Favorites</Button>

      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};