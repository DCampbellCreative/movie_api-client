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

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }

    getMovies(token) {
      axios.get('https://dcampbellcreative-movie-api.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
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
  
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
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
<button onClick={() => { this.onLoggedOut() }}>Logout</button>
          </div>
         </Container>
      );
     
    }
  }