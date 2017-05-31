import React from 'react';
import { shallow } from 'enzyme';

import NotificationTable from './NotificationTable.component';

describe('NotificationTable', () => {
	it('should render', () => {
		const wrapper = shallow(
			<NotificationTable />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
