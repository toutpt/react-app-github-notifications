import React from 'react';
import { shallow } from 'enzyme';

import FilterReason from './FilterReason.component';

describe('FilterReason', () => {
	it('should render', () => {
		const wrapper = shallow(
			<FilterReason />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
