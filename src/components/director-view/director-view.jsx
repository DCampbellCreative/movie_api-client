import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row>

        <Card className="director-view">
          <Card.Title>
            <span className="label">Name: </span>
            <span className="value">{director.Name}</span>
          </Card.Title>
          <Card.Body>
            <span className="label">Description: </span>
            <span className="value">{director.Bio}</span>
          </Card.Body>
        </Card>

        <Button variant="link" onClick={() => { onBackClick() }}>Back</Button>

      </Row>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};