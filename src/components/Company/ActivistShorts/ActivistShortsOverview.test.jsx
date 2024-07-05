import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import { Router } from 'react-router';
import PopupTrialUser from '../../GeneralForm/PopupTrialLightboxEffect';
import D3LineChart from '../../GeneralForm/D3LineChart';
import Table from '../../GeneralForm/Table';
import ActivistShortsOverview from './ActivistShortsOverview';
import propTypes from '../../../utils/propTypes';

Enzyme.configure({ adapter: new Adapter() });
const childContextTypes = {
  router: propTypes.object
};
describe('Activist Shorts Overview', () => {
  it('renders correctly', () => {
    const setRouteLeaveHook = jest.fn();
    const wrapper = shallow(
      <ActivistShortsOverview
        activistShortActivistInvestorsForCompanyrowData={[]}
        activismshortCurrentShortPositionrowData={[]}
        activistShortTotalShortPositionrowData={[]}
        activistShortHistoricShortPositionrowData={[]}
        location={{ search: '&pid=1' }}
        TrialLog={false}
        params={{ pid: 1, router: setRouteLeaveHook }}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Test page elements', () => {
    afterEach(cleanup);

    it('should render the trial table popup if TrialLog is set', () => {
      const setRouteLeaveHook = jest.fn();
      const wrapper = shallow(
        <ActivistShortsOverview.WrappedComponent
          location={{ search: '&pid=1' }}
          TrialLog
          params={{ pid: 1, router: setRouteLeaveHook }}
          activismshortCurrentShortPositionrowData={[{ key: 'value' }]}
          activistShortHistoricShortPositionrowData={[{ key: 'value' }]}
          activistShortTotalShortPositionrowData={[{ key: 'value' }]}
          allowDownload
          aiSInvestorForCompanyrowData={[{ key: 'value' }]}
          handleOnchangeDdl
          company_overview={[{ key: 'value' }]}
          ddlShortSellerCampaignData={[{ key: 'value' }]}
          handleShortSellerCampaign={[{ key: 'value' }]}
          aiSActivismSummaryrowData={[{ key: 'value' }]}
        />
      );
      expect(wrapper.find('.PopupTrialUser').exists()).toBeTruthy();
      wrapper.unmount();
    });

    describe('Test Table Generation Conditions', () => {
      afterEach(cleanup);

      it('should render no Table components if rowData does not exists', () => {
        const setRouteLeaveHook = jest.fn();
        const wrapper = shallow(
          <ActivistShortsOverview
            activistShortActivistInvestorsForCompanyrowData={[]}
            activismshortCurrentShortPositionrowData={[]}
            activistShortTotalShortPositionrowData={[]}
            activistShortHistoricShortPositionrowData={[]}
            location={{ search: '&pid=1' }}
            TrialLog={false}
            params={{ pid: 1, router: setRouteLeaveHook }}
          />
        );
        expect(wrapper.find(Table).exists()).toBe(false);
        wrapper.unmount();
      });

      it('should render the Current Short Positions Table component if rowData exists', () => {
        const setRouteLeaveHook = jest.fn();
        const wrapper = shallow(
          <ActivistShortsOverview.WrappedComponent
            location={{ search: '&pid=1' }}
            TrialLog
            params={{ pid: 1, router: setRouteLeaveHook }}
            activismshortCurrentShortPositionrowData={[{ key: 'value', Net_position: 0 }]}
            activistShortHistoricShortPositionrowData={[{ key: 'value' }]}
            activistShortTotalShortPositionrowData={[{ key: 'value' }]}
            allowDownload
            aiSInvestorForCompanyrowData={[{ key: 'value' }]}
            handleOnchangeDdl
            company_overview={[{ key: 'value' }]}
            ddlShortSellerCampaignData={[{ key: 'value' }]}
            handleShortSellerCampaign={[{ key: 'value' }]}
            aiSActivismSummaryrowData={[{ key: 'value' }]}
          />
        );
        wrapper.update();
        expect(wrapper.exists('.gridOptionsCurrentShortPositions')).toBe(true);
        wrapper.unmount();
      });

      it('should render the Total Shares Held Short Over Time D3LineChart component if rowData exists', () => {
        const setRouteLeaveHook = jest.fn();
        const wrapper = shallow(
          <ActivistShortsOverview.WrappedComponent
            location={{ search: '&pid=1' }}
            TrialLog
            params={{ pid: 1, router: setRouteLeaveHook }}
            activismshortCurrentShortPositionrowData={[{ key: 'value', Net_position: 0 }]}
            activistShortHistoricShortPositionrowData={[{ key: 'value' }]}
            activistShortTotalShortPositionrowData={[{ key: 'value' }]}
            allowDownload
            aiSInvestorForCompanyrowData={[{ key: 'value' }]}
            handleOnchangeDdl
            company_overview={[{ key: 'value' }]}
            ddlShortSellerCampaignData={[{ key: 'value' }]}
            handleShortSellerCampaign={[{ key: 'value' }]}
            aiSActivismSummaryrowData={[{ key: 'value' }]}
          />
        );

        expect(wrapper.find(D3LineChart).exists()).toBe(true);
        wrapper.unmount();
      });

      it('should render the Historic Short Positions Table component if rowData exists', () => {
        const setRouteLeaveHook = jest.fn();
        const wrapper = shallow(
          <ActivistShortsOverview.WrappedComponent
            location={{ search: '&pid=1' }}
            TrialLog
            params={{ pid: 1, router: setRouteLeaveHook }}
            activismshortCurrentShortPositionrowData={[{ key: 'value', Net_position: 0 }]}
            activistShortHistoricShortPositionrowData={[{ key: 'value' }]}
            activistShortTotalShortPositionrowData={[{ key: 'value' }]}
            allowDownload
            aiSInvestorForCompanyrowData={[{ key: 'value' }]}
            handleOnchangeDdl
            company_overview={[{ key: 'value' }]}
            ddlShortSellerCampaignData={[{ key: 'value' }]}
            handleShortSellerCampaign={[{ key: 'value' }]}
            aiSActivismSummaryrowData={[{ key: 'value' }]}
          />
        );
        expect(wrapper.find(Table).exists()).toBe(true);
        wrapper.unmount();
      });
    });
  });
});
