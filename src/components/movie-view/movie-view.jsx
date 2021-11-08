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



  addFavoriteMovie(movieId) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(token);
    axios.post(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log(response.data);
        alert(`Added to Favorites`);
        this.setState({
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;
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