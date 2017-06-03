import React from 'react';
import { shallow } from 'enzyme';

import FilterFetch from './FilterFetch.component';

describe('FilterFetch', () => {
	it('should render', () => {
		const wrapper = shallow(
			<FilterFetch />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
