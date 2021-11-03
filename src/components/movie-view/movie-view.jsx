import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

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

        <Button variant="link">Add to Favorites</Button>

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