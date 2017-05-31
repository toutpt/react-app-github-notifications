import React from 'react';
import { shallow } from 'enzyme';

import Action from './Action.component';

describe('Action', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Action />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
