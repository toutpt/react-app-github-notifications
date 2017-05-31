import React, { PropTypes } from 'react';
import classnames from 'classnames';
import token from '../token';
import notifications from '../notifications';
import Action from '../Action';
import Icon from '../Icon';

// https://developer.github.com/v3/activity/notifications/

class NotificationTable extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	open(url) {
		window.open(url)
	}

	render() {
		const data = this.props.notifications || [];

		if (data.length === 0) {
			return (<p>No notifications</p>);
		}

		return (
			<div>
				<table className="table table-hover table-condensed">
					<thead>
						<tr>
							<th>repo</th>
							<th>reason</th>
							<th>type</th>
							<th>title</th>
						</tr>
					</thead>
					<tbody>
					{notifications.get().map((notif, index) => {
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
				<pre>{JSON.stringify(data[0], null, 2)}</pre>
			</div>
		);
	}
}

export default NotificationTable;
