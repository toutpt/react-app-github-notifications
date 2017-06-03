import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import token from '../token';
import notifications from '../notifications';
import Action from '../Action';
import Icon from '../Icon';

// https://developer.github.com/v3/activity/notifications/

function getLastCommentURL(notif) {
	const o = notif.subject.latest_comment_url;
	const splited = notif.subject.url.split('/');
	const orga = splited[4];
	const repo = splited[5];
	const id = splited[7];
	const type = notif.subject.type === 'PullRequest' ? 'pull': 'issues';
	if (o) {
		// https://api.github.com/repos/Talend/ui/issues/comments/304988156
		// -> 
		// https://github.com/Talend/ui/pull/482#issuecomment-304988156
		const commentId = o.split('/')[8];
		if (commentId) {
			return `https://github.com/${orga}/${repo}/${type}/${id}#issuecomment-${commentId}`
		}
	}
	// https://api.github.com/repos/Talend/ui/pulls/466"
	// -> 
	// https://github.com/Talend/ui/pull/466
	return `https://github.com/${orga}/${repo}/${type}/${id}`;
}

class NotificationTable extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.fetch = this.fetch.bind(this);
		this.debug = this.debug.bind(this);
		this.markAsRead = this.markAsRead.bind(this);
		this.fetch();
		this.state = {};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.filter !== this.props.filter) {
			this.fetch(nextProps.filter);
		}
		return true;
	}

	open(url) {
		window.open(url)
	}
	debug(notif) {
		this.setState({debug: notif});
	}
	fetch(filter) {
		let filt = filter || this.props.filter || { all: true };
		this.props.dispatch({
			type: 'FETCH_NOTIFICATIONS',
			filter: filt,
		});
		notifications.fetchAll(filt)
		.then((data) => {
			this.props.dispatch({
				type: 'NOTIFICATIONS_RESPONSE',
				data,
				filter: filt,
			});
		});
	}

	markAsRead(event, notif) {
		notifications.markAsRead(notif.id)
		.then((newNotification) => {
			return this.props.dispatch({
				type: 'MARK_AS_READ',
				notification: notif,
			});
		});
	}

	render() {
		let data = this.props.notifications || [];
		const reasons = Object.keys(this.props.reason);
		if (reasons.length > 0) {
			data = data.filter((notif) => {
				if (this.props.reason[notif.reason]) {
					return true;
				}
				return false;
			});
		}
		const types = Object.keys(this.props.type);
		if (types.length > 0) {
			data = data.filter((notif) => {
				if (this.props.type[notif.subject.type]) {
					return true;
				}
				return false;
			});
		}
		if (data.length === 0) {
			return (<p>No notifications</p>);
		}

		return (
			<div>
				<table className="table table-hover table-condensed">
					<thead>
						<tr>
							<th>repo</th>
							<th style={{minWidth: 120}}>Actions</th>
							<th>reason</th>
							<th>type</th>
							<th>title</th>
						</tr>
					</thead>
					<tbody>
					{data.map((notif, index) => {
						const repo = notif.repository;
						return (
							<tr
								key={index}
								className={classnames({
									active: !notif.unread,
								})}
							>
								<td>
 									<Action href={repo.html_url} target="_blank">
										<Icon name="lock" condition={repo.private}/>
										&nbsp;
	 									{notif.repository.name}
 									</Action>
								</td>
								<td>
									<Action
										href={getLastCommentURL(notif)}
										icon="external-link"
										target="_blank"
										className="btn-xs btn-link"
									/>
									<Action
										icon="check"
										onClick={(event) => this.markAsRead(event, notif)}
									/>
									<Action
										onClick={() => this.debug(notif)}
										icon="bug"
										className="btn-xs btn-link"
									/>
								</td>
								<td>{notif.reason}</td>
								<td>
									<Icon name="bug" condition={notif.subject.type === "Issue"} />
									<Icon name="code-fork" condition={notif.subject.type === "PullRequest"} />
								</td>
								<td>{notif.subject.title}</td>
							</tr>
						);
					})}
					</tbody>
				</table>
				{this.state.debug ? (
					<pre>{JSON.stringify(this.state.debug, null, 2)}</pre>
				) : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notifications: state.notifications,
		filter: state.filter,
		reason: state.reason,
		type: state.type,
	};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTable);
