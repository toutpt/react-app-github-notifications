import React, { PropTypes } from 'react';
import Icon from '../Icon';

class Action extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		onClick: PropTypes.func,
		icon: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const aProps = {};
		if (this.props.target) {
			aProps.target = this.props.target;
		}
		if (this.props.onClick) {
			aProps.onClick = this.props.onClick;
		}
		if (this.props.href) {
			aProps.href = this.props.href;
		}
		const className = `btn ${this.props.className || 'btn-link'}`;
		return (
			<a className={className} {...aProps}>
				{this.props.icon ? (<Icon name={this.props.icon} className={'fa-fw'} />) : null }
				{this.props.name}
				{this.props.children}
			</a>
		);
	}
}

export default Action;
