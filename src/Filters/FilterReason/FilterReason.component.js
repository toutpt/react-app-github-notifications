import React, { PropTypes } from 'react';
import Action from '../../Action';

class FilterReason extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onClear = this.onClear.bind(this);
	}

	onClear(event) {
		this.props.dispatch({
			type: 'REASON_CLEAR',
			event,
		});
	}

	onChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.dispatch({
			type: 'REASON_CHANGE',
			name,
			event,
			data: value,
		});
	}

	render() {
		const reason = this.props.reason || {};
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Reason filter</div>
				<div className="panel-body">
					<form>
						<div className="checkbox">
							<label>
								<input
									name="assign"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.assign}
								/>
								assign
								<span className="help-block">(You were assigned to the Issue.)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="author"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.author}
								/>
								author
								<span className="help-block">(You created the thread.)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="comment"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.comment}
								/>
								comment
								<span className="help-block">(You commented on the thread.)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="invitation"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.invitation}
								/>
								invitation
								<span className="help-block">(You accepted an invitation to contribute to the repository.)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="manual"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.manual}
								/>
								manual
								<span className="help-block">(You subscribed to the thread (via an Issue or Pull Request).)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="mention"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.mention}
								/>
								mention
								<span className="help-block">(ou were specifically @mentioned in the content.)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="state_change"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.state_change}
								/>
								state_change
								<span className="help-block">(You changed the thread state (for example, closing an Issue or merging a Pull Request).)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="subscribed"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.subscribed}
								/>
								subscribed
								<span className="help-block">(You're watching the repository.)</span>
							</label>
						</div>
						<div className="checkbox">
							<label>
								<input
									name="team_mention"
									type="checkbox"
									onChange={this.onChange}
									checked={reason.team_mention}
								/>
								team_mention
								<span className="help-block">(You were on a team that was mentioned.)</span>
							</label>
						</div>
						<Action onClick={this.onClear} className="btn-primary">Clear</Action>

					</form>
				</div>
			</div>
		);
	}
}

export default FilterReason;
