import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FilterFetch from './FilterFetch';
import FilterReason from './FilterReason';
import FilterType from './FilterType';
import notifications from '../notifications';

class Filters extends React.Component {
	static propTypes = {
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const filter = this.props.filter || {};
		const reason = this.props.reason || {};
		const type = this.props.type || {};
		return (
			<div>
				<FilterFetch filter={filter} dispatch={this.props.dispatch} />
				<FilterType type={type} dispatch={this.props.dispatch} />
				<FilterReason reason={reason} dispatch={this.props.dispatch}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		filter: state.filter,
		reason: state.reason,
		type: state.type,
	};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
