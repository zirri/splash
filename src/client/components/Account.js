//plugins
import React from 'react';
import jwtDecode from 'jwt-decode';

//Locale components
import Header from './Header';

class Account extends React.Component {
	constructor(props) {
		super(props);

		const token = localStorage.getItem('json_web_token');
		const payload = jwtDecode(token);

		this.state = {
			isLoading: false,
			error: null,
			session: payload,
		}
	}

	render() {
		return (
			<>
				<Header />
				<h2>Your account</h2>
			</>
		)
	}
}

export default Account;
