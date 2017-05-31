import React, { PropTypes } from 'react';
import notifications from '../notifications';
import Action from '../Action';

class Filters extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {};
	}

	onSubmit(event) {
		this.props.onSubmit();
	}

	onChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
		const newFilter = Object.assign({}, this.state, {
			[name]: value
		});
		notifications.filter.set(newFilter);
		if (name === 'all' || name === 'participating') {
			this.onSubmit();
		}
	}

	render() {
		const filter = notifications.filter.get();
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Filters</div>
				<div className="panel-body">
					<form onSubmit={this.onSubmit}>
						<div className="checkbox">
							<label>
								<input
									name="all"
									type="checkbox"
									onChange={this.onChange}
									checked={filter.all}
								/>
								All
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="participating"
									type="checkbox"
									onChange={this.onChange}
									checked={filter.participating}
								/>
								Participating
							</label>
						</div>
						<div className="form-group">
							<label>Since</label>
							<input
								type="text"
								name="since"
								className="form-control"
								placeholder="YYYY-MM-DDTHH:MM:SSZ"
								onChange={this.onChange}
								value={filter.since}
							/>
						</div>
						<div className="form-group">
							<label>Before</label>
							<input
								type="text"
								name="before"
								className="form-control"
								placeholder="YYYY-MM-DDTHH:MM:SSZ"
								onChange={this.onChange}
								value={filter.before}
							/>
						</div>
						<Action onClick={this.onSubmit} className="btn-primary">Submit</Action>
					</form>
				</div>
			</div>
		);
	}
}

export default Filters;
