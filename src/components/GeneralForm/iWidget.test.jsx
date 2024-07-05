import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import IWidget from './IWidget';
import { GetToolTip } from '../../utils/general-util';

const axios = require('axios');

Enzyme.configure({ adapter: new Adapter() });
describe('IWidget', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    const wrapper = shallow(<IWidget tooltipID={123} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no image if there is no valid tooltip id', () => {
    const wrapper = mount(<IWidget tooltipID={null} tooltipOverrideString={null} />);
    expect(wrapper.find('.info').length).toEqual(0);
  });

  it('renders no image if page isLoading', () => {
    const wrapper = mount(<IWidget tooltipID={123} tooltipOverrideString={null} />);
    wrapper.state.isLoading = true;
    expect(wrapper.find('.info').length).toEqual(0);
  });

  it('renders image if there is a valid tooltip', () => {
    const wrapper = mount(<IWidget tooltipOverrideString='123' />);
    expect(wrapper.find('.info').exists()).toEqual(true);
  });
});
