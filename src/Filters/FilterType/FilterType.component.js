import React, { PropTypes } from 'react';


class FilterType extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.dispatch({
			type: 'TYPE_CHANGE',
			name,
			event,
			data: value,
		});
	}

	render() {
		const type = this.props.type;
		return (
			<div className="panel panel-default">
				<div className="panel-heading">type filter</div>
				<div className="panel-body">
					<form>
						<div className="checkbox">
							<label>
								<input
									name="PullRequest"
									type="checkbox"
									onChange={this.onChange}
									checked={type.PullRequest}
								/>
								pull request
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="Issue"
									type="checkbox"
									onChange={this.onChange}
									checked={type.Issue}
								/>
								issue
							</label>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default FilterType;
