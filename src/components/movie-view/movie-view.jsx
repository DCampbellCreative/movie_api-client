import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row, Image, Container } from 'react-bootstrap'
import axios from 'axios';


export class MovieView extends React.Component {
  state = {
    username: null,
    email: null,
    birthday: null,
    favoriteMovies: [],
    movies: []
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
        const allUsers = response.data;
        const user = allUsers.filter((res) => res.Username === username)[0];
        // console.log(user);

        this.setState({
          username: user.Username,
          email: user.Email,
          birthday: user.Birthday,
          favoriteMovies: user.FavoriteMovies
        });
        console.log(this.state)
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  addFavoriteMovie(movieId) {
    const username = this.state.username;
    const favoriteMovies = this.state.favoriteMovies
    const token = localStorage.getItem('token');
    console.log(token);

    if (favoriteMovies.includes(movieId)) {
      axios.put(`https://dcampbellcreative-movie-api.herokuapp.com/users/${username}/movies/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          console.log(response.data);
          alert(`Removed from Favorites`);
          this.setState({
            favoriteMovies: response.data.FavoriteMovies,
          });
        })
        .catch(function (error) {
          console.log(error);
        });

    } else {
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
  }



  render() {
    const { movie } = this.props;
    const { favoriteMovies, username } = this.state;

    const checkFavs = (id) => favoriteMovies.includes(id) ? '- Remove from Favorites' : '+ Add to Favorites'

    return (

      <Card className='mt-5'>

        <Row>
          <Col md={5} sm={5} lg={5}>
            <Card.Img className='movie-image' crossOrigin="anonymous" src={movie.ImagePath} />
          </Col>
          <Col className='card-column-right' md={7} sm={7} lg={7}>

            <span className="movie-title">{movie.Title}</span>
            <p className="movie-description mr-3">
              Description: {movie.Description}
            </p>

            <Row >
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button className='card-action' variant="link">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button className='card-action' variant="link">Genre</Button>
              </Link>
              {/* {user ?

                (favoriteMovies.includes(movie._id) ?
                  <Button className='card-action' variant="link" onClick={() => this.addFavoriteMovie(movie._id)}>- Remove from Favorites</Button> :
                  <Button className='card-action' variant="link" onClick={() => this.addFavoriteMovie(movie._id)}>+ Add to Favorites</Button>
                )
                :
                (<p className='card-action'>Login to save favorites</p>)} */}
              {
                username ? <Button className='card-action' variant="link" onClick={() => this.addFavoriteMovie(movie._id)}>{checkFavs(movie._id)}</Button>
                  : <Link to={`/login`}>
                    <Button className='card-action' variant="link">Login to Save Favorites</Button>
                  </Link>
              }

            </Row>
            <Row><Link to={`/`}>
              <Button className='card-action center' variant="link">Go Back</Button>
            </Link></Row>

          </Col>
        </Row>

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