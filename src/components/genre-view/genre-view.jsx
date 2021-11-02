import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export class GenreView extends React.Component {
 
  render() {
    const { movie, onBackClick } = this.props;
    
    return (   
      <Row>
        
          
        
    <Card className="genre-view">
    <Card.Title>
        <span className="label">Name: </span>
        <span className="value">{movie.genre.Name}</span>
      </Card.Title>
       <Card.Body>
        <span className="label">Description: </span>
        <span className="value">{movie.genre.Description}</span>
       </Card.Body>
      </Card>
      
      </Row>
      );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
   Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};