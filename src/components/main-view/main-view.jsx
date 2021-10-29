import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor(){
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    }

    fetchMovies = (user) => {
      axios.get('https://dcampbellcreative-movie-api.herokuapp.com/movies', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  
  onLoggedIn(user) {
    this.setState({
      user
    });
    this.fetchMovies(user);
  }
    render() {
      const { user, movies, selectedMovie } = this.state;

      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      
      if (movies.length === 0) return <div className="main-view" />;
      
      return (
        <Container>
        <div className="main-view" >
          {selectedMovie
          ? ( 
          <Row className="justify-content-md-center">
            <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
            </Row>
          )
          : (
            <Row className="justify-content-md-center">
            {movies.map(movie => (
              <Col md={3}>
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }}/>
            </Col>
          ))}
          </Row>
          )
    }
          </div>
          </Container>
      );
    }
  }