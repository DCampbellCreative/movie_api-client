import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
	return <Form.Group className="form-inline">
		<Form.Label style={{ marginRight: '10px' }}>Search:</Form.Label>
		<Form.Control
			// style={{ width: "30%" }}
			onChange={e => props.setFilter(e.target.value)}
			value={props.VisibilityFilter}
			placeholder="Search for a Movie"
		/>
	</Form.Group>;
}

export default connect(
	null,
	{ setFilter }
)(VisibilityFilterInput);