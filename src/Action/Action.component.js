import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from '../Icon';

class Action extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		onClick: PropTypes.func,
		icon: PropTypes.string,
		actionCreator: PropTypes.func,
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
		if (this.props.actionCreator) {
			aProps.onClick = (event) => this.props.dispatch(
				this.props.actionCreator(event, this.props)
			);
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

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(undefined, mapDispatchToProps)(Action);
