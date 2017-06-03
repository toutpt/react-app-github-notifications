import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import HeaderBar from './HeaderBar';
import NotificationTable from './NotificationTable';
import Filters from './Filters';
import notifications from './notifications';
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log('didMount');
		document.addEventListener('storage', function(e) {
			console.log(e);
		});
	}

	render() {
		return (
				<div className="container">
					<HeaderBar />
					<div className="row">
						<div className="col-md-3">
							<Filters onSubmit={this.onSubmitFilter} />
						</div>
						<div className="col-md-9">
							<NotificationTable notifications={this.state.notifications} />
						</div>
					</div>
				</div>
		);
	}
}

export default App;
