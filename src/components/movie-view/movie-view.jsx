import React from 'react';
import PropTypes from 'prop-types';
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
      <Button onClick={() => { onBackClick(null); }}>Back</Button>
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