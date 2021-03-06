import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Navbar, Nav, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Navigation } from '../navigation/navigation'

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      user: null
    };
  }

  // get user and movies and on mount
  // componentDidMount() {
  //   const accessToken = localStorage.getItem('token');
  //   if (accessToken !== null) {
  //     this.setState({
  //       user: localStorage.getItem('user')
  //     });
  //     this.getMovies(accessToken);
  //   }
  // }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
    }
    this.getMovies();
  }

  // getMovies(token) {
  //   axios.get('https://dcampbellcreative-movie-api.herokuapp.com/movies', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(response => {
  //       this.props.setMovies(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  getMovies() {
    axios.get('https://dcampbellcreative-movie-api.herokuapp.com/movies')
      .then(response => {
        this.props.setMovies(response.data);
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
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>
        {/* {user && ( */}
        <Navigation user={user} onLoggedOut={user => this.onLoggedOut(user)} />
        {/* )} */}

        <Row className="main-view justify-content-md-center" style={{ marginTop: "100px" }}>
          {/* Route to home */}
          {/* <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} /> */}

          <Route exact path="/" render={() => {
            if (movies?.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/login" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          {/* Route to movie-view */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (movies?.length === 0) return <div className="main-view" />;
            return <Col md={10}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack} />
            </Col>
          }} />

          {/* Route to genre-view */}
          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (movies?.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Route to director-view */}
          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (movies?.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Route to profile-view */}
          <Route path="/users/:username" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col>
              <ProfileView history={history} movies={movies} user={user} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
