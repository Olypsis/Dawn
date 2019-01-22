import React from 'react';

import { withRouter } from 'react-router-dom';

const WithHistory = ({ history, children }) => {
	history.listen((location, action) => {
		// location is an object like window.location
		console.log("WithHistory:", action, location.pathname, location);
	});

	return <div>{children}</div>;
};

export default withRouter(WithHistory);
