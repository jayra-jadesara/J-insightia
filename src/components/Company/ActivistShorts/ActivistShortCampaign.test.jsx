import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import { Router } from 'react-router';
import PopupTrialUser from '../../GeneralForm/PopupTrialLightboxEffect';
import Table from '../../GeneralForm/Table';
import ActivistShortsCampaigns from './ActivistShortCampaigns';
import propTypes from '../../../utils/propTypes';

Enzyme.configure({ adapter: new Adapter() });
const childContextTypes = {
  router: propTypes.object
};
describe('Activist Shorts Campaigns', () => {
  const InvestorForCompanyrowData = [
    {
      activist_id: 1780,
      campaign_summary_id: 11119,
      action_date: '2014-11-10T00:00:00.000Z',
      Camp_status: 'Ended',
      name: 'Matthew Handley',
      ddlname: 'Matthew Handley (2014-11-10)',
      campaignCompanyReturns: [
        {
          Downside_Target: null,
          return: -94.394667,
          return_snp: 46.75089039715073,
          week_return: -2.666667,
          week_return_snp: 0.20455614542033465,
          year_return: -48.090667,
          year_return_snp: 4.300248639204354
        }
      ],
      campaignFollowerReturns: [
        {
          return: -91.132669,
          return_snp: 46.75089039715073,
          week_return: -0.943891,
          week_return_snp: 0.20455614542033465,
          year_return: -45.605663,
          year_return_snp: 4.300248639204354
        }
      ],
      campaignDetails: [
        {
          campaign_summary_id: 11119,
          short_summary_text: 'Matthew Handley said that Herbalife faced regulatory trouble.',
          announce_date: '2014-11-10T00:00:00.000Z',
          primary_allegation: 'Pyramid Scheme',
          all_allegations: 'Pyramid Scheme, Misleading Accounting',
          announce_method: 'Web post',
          full_report: 'False',
          latest_close_value: 48.34,
          price_target: null,
          price_target_tooltip: null,
          close_on_announce: 38.14,
          close_on_announce_tooltip: 38.14,
          Market_cap_at_announce: 3501.246927,
          outcome_date: null,
          auditor_resigned: 0,
          class_action: 0,
          company_respnd: 0,
          delisted: 0,
          company_tactics: 'Buyback/dividend, CEO resigns or is replaced, Launch website',
          short_seller_tactics: 'Notify regulators',
          campaign_end_date: '2018-01-18T00:00:00.000Z'
        }
      ],
      companyFilings: [
        {
          event_type: 'Filing',
          activist_id: 1780,
          name: 'Matthew Handley',
          company_id: 3244,
          event_date: '2017-01-20T14:46:00.000Z',
          document_description: 'Exhibit 99.1: Confidential Information Memorandum',
          file_name: 'https://www.sec.gov/Archives/edgar/data/1180262/000119312517013649/d322807dex991.htm'
        },
        {
          event_type: 'Filing',
          activist_id: 1780,
          name: 'Matthew Handley',
          company_id: 3244,
          event_date: '2017-01-20T14:46:00.000Z',
          document_description: 'Filed Issuer 8K - Confidential Information Memorandum',
          file_name: 'https://www.sec.gov/Archives/edgar/data/1180262/000119312517013649/d322807d8k.htm'
        }
      ],
      companyNews: [
        {
          news_id: 17461,
          event_date: '2017-01-19T16:42:00.000Z',
          name: 'Herbalife Nutrition Ltd',
          document_description: 'Herbalife: Short holds Icahn to his word',
          file_name: 'viewnews.aspx?neid=17461'
        }
      ]
    }
  ];

  it('renders correctly', () => {
    const setRouteLeaveHook = jest.fn();
    const wrapper = shallow(
      <ActivistShortsCampaigns
        aiSInvestorForCompanyrowData={[]}
        aiSActivismSummaryrowData={[]}
        location={{ search: '&pid=1' }}
        params={{ pid: 1, router: setRouteLeaveHook }}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Test page elements', () => {
    afterEach(cleanup);

    it('should render the Investor Data if summary is set', () => {
      const setRouteLeaveHook = jest.fn();
      const wrapper = shallow(
        <ActivistShortsCampaigns
          TrialLog
          aiSInvestorForCompanyrowData={InvestorForCompanyrowData}
          aiSActivismSummaryrowData={[]}
          location={{ search: '&pid=1' }}
          params={{ pid: 1, router: setRouteLeaveHook }}
        />
      );
      expect(wrapper.find('.aiSInvestorForCompanyrowData')).toBeTruthy();
    });

    it('should render the trial table popup if TrialLog is set', () => {
      const setRouteLeaveHook = jest.fn();
      const wrapper = shallow(
        <ActivistShortsCampaigns location={{ search: '&pid=1' }} params={{ pid: 1, router: setRouteLeaveHook }} />
      );
      wrapper.setProps({ TrialLog: true, aiSInvestorForCompanyrowData: [], aiSActivismSummaryrowData: [] });
      wrapper.update();
      expect(wrapper.find(PopupTrialUser)).toBeTruthy();
    });

    describe('Test Table Generation Conditions', () => {
      afterEach(cleanup);

      it('should render no Table components if rowData does not exists', () => {
        const setRouteLeaveHook = jest.fn();
        const wrapper = shallow(
          <ActivistShortsCampaigns
            location={{ search: '&pid=1' }}
            aiSInvestorForCompanyrowData={[]}
            aiSActivismSummaryrowData={[]}
            params={{ pid: 1, router: setRouteLeaveHook }}
          />
        );
        expect(wrapper.find('.aiSInvestorForCompanyrowData').exists()).toBe(false);
      });
    });
  });
});
