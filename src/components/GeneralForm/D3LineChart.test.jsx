import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import Card from './Card';
import D3LineChart from './D3LineChart';

Enzyme.configure({ adapter: new Adapter() });
describe('D3 Line Chart', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    const wrapper = shallow(
      <D3LineChart
        isDummyData={false}
        smalltitle=''
        cardtitle='Total Shares Held Short Over Time'
        lineData={[
          { thedate: '11/1/2012', net_pos: 5.2 },
          { thedate: '12/1/2012', net_pos: 3 }
        ]}
        xAxisKey='thedate'
        yAxisKey='net_pos'
        xAxisTitle='Date'
        yAxisTitle='Total % Shares Held Short'
        addedClass='activist-shorts'
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Line chart within card both exist', () => {
    const wrapper = shallow(<D3LineChart />);
    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find('#line-chart').length).toBe(1);
  });

  it('Is Dummy Data, so the table is blurry', () => {
    const wrapper = mount(
      <D3LineChart
        isDummyData
        smalltitle=''
        cardtitle='Total Shares Held Short Over Time'
        lineData={[
          { thedate: '11/1/2012', net_pos: 5.2 },
          { thedate: '12/1/2012', net_pos: 3 }
        ]}
        xAxisKey='thedate'
        yAxisKey='net_pos'
        xAxisTitle='Date'
        yAxisTitle='Total % Shares Held Short'
        addedClass='activist-shorts'
      />
    );
    expect(wrapper.find('.blurrytext').length).toBe(1);
  });

  it('Is Not Dummy Data, so the table is not blurry', () => {
    const wrapper = mount(
      <D3LineChart
        isDummyData={false}
        smalltitle=''
        cardtitle='Total Shares Held Short Over Time'
        lineData={[
          { thedate: '11/1/2012', net_pos: 5.2 },
          { thedate: '12/1/2012', net_pos: 3 }
        ]}
        xAxisKey='thedate'
        yAxisKey='net_pos'
        xAxisTitle='Date'
        yAxisTitle='Total % Shares Held Short'
        addedClass='activist-shorts'
      />
    );
    expect(wrapper.find('.blurrytext').length).toBe(0);
  });
});
