import React from 'react';
import { shallow } from 'enzyme';

import HeaderBar from './HeaderBar.component';

describe('HeaderBar', () => {
	it('should render', () => {
		const wrapper = shallow(
			<HeaderBar />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
