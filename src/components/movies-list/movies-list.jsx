import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !== '') {
		filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
	}

	if (!movies) return <div className="main-view" />;

	return <>
		<Col xs={12} sm={12} md={12} lg={12} className='mt-3 mb-3'>
			<VisibilityFilterInput visibilityFilter={visibilityFilter} />
		</Col>
		{filteredMovies.map(m => (
			<Col xs={6} sm={6} md={4} lg={3} key={m._id}>
				<MovieCard movie={m} />
			</Col>
		))}
	</>;
}

export default connect(mapStateToProps)(MoviesList);