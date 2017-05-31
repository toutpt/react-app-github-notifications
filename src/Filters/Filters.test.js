import React from 'react';
import { shallow } from 'enzyme';

import Filters from './Filters.component';

describe('Filters', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Filters />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
