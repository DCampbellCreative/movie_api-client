import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      <Card className='movie-view-card'>

        <img className='movie-image' crossOrigin="anonymous" src={movie.ImagePath} />

        <div className='card-column-right'>
          <span className="movie-title">{movie.Title}</span>
          <div className="movie-description">
            Description: {movie.Description}
          </div>

          <div >
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button className='card-action' variant="link">Director</Button>
            </Link>

            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className='card-action' variant="link">Genre</Button>
            </Link>
            <Link to={`/`}>
              <Button className='card-action' variant="link">Go Back</Button>
            </Link>
            <Button className='card-action' variant="link" onClick={() => this.addFavoriteMovie(movie._id)}>Add to Favorites</Button>
          </div>

        </div>
      </Card>
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