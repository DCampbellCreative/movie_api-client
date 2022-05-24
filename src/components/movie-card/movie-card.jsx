import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className="movie-card">
        <Image variant="top" crossOrigin="anonymous" src={movie.ImagePath} style={{ borderBottom: "1px solid lightgrey" }} />
        <Card.Body className="movie-card-body" >
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text style={{ textOverflow: "ellipsis" }}>{movie.Description}</Card.Text>

        </Card.Body>
        <Link style={{ paddingBottom: "7px", paddingRight: "10px", textAlign: "right" }} to={`/movies/${movie._id}`}>See More</Link>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};