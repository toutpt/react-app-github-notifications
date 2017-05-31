import React, { PropTypes } from 'react';
import token from '../token';

class HeaderBar extends React.Component {
	static propTypes = {
		onTokenSubmit: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.onTokenChange = this.onTokenChange.bind(this);
		this.onTokenSubmit = this.onTokenSubmit.bind(this);
		this.state = {
			token: token.get(),
		};
	}

	onTokenChange(event) {
		this.setState({
			token: event.target.value
		});
	}

	onTokenSubmit(event) {
		this.props.onTokenSubmit(event, this.state);
		token.set(this.state.token);
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="#">Github Notifications</a>
				</div>
				<form className="navbar-form navbar-left" onSubmit={this.onTokenSubmit}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="token" onChange={this.onTokenChange} />
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</nav>
		);
	}
}

export default HeaderBar;
