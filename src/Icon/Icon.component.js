import React, { PropTypes } from 'react';

function Icon(props) {
	if (props.condition === false) {
		return null;
	}

	return (
		<i className={`fa fa-${props.name} ${props.className}`} />
	);
}

Icon.propTypes = {
	name: PropTypes.string,
	condition: PropTypes.bool,
	className: PropTypes.string,
};

export default Icon;
