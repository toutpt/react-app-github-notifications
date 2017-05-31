import React from 'react';
import renderer from 'react-test-renderer';

import Icon from './Icon.component';

describe('Icon', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Icon name="Hello world" />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
