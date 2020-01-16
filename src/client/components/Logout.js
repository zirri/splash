import React from 'react';

class Logout extends React.Component {
	componentDidMount() {
		const { history } = this.props;
		localStorage.removeItem('json_web_token');
		history.replace('/login');
	}
	render() {
		return (
			<div><h2>Logging out...</h2></div>
		)
	}
}

export default Logout