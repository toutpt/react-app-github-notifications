import React from 'react';
import { shallow } from 'enzyme';

import FilterType from './FilterType.component';

describe('FilterType', () => {
	it('should render', () => {
		const wrapper = shallow(
			<FilterType />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
