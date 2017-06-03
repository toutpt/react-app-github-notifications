import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames'
import token from '../token';
import Action from '../Action';
import Icon from '../Icon';
import notifications from '../notifications';

class HeaderBar extends React.Component {
	static propTypes = {
		onTokenSubmit: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.onTokenChange = this.onTokenChange.bind(this);
		this.onTokenSubmit = this.onTokenSubmit.bind(this);
		this.refetch = this.refetch.bind(this);
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

	refetch(event) {
		let filter = this.props.filter || { all: true };
		this.props.dispatch({
			type: 'FETCH_NOTIFICATIONS',
			filter,
		});
		notifications.fetchAll(filter)
		.then((data) => {
			this.props.dispatch({
				type: 'NOTIFICATIONS_RESPONSE',
				data,
				filter,
			});
		});
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
				<Action
					className="btn-link navbar-btn"
					onClick={this.refetch}
				>
					<Icon name="refresh" className={classnames({ 'fa-spin': this.props.fetching })} />
				</Action>
				<form className="navbar-form navbar-right" onSubmit={this.onTokenSubmit}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="token" onChange={this.onTokenChange} />
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		filter: state.filter,
		fetching: state.fetching,
	};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
