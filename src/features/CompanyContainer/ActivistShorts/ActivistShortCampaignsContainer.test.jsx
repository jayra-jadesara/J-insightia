import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import ActivistShortCampaigns from '../../components/Company/ActivistShorts/ActivistShortCampaigns';
import ActivistShortCampaignsContainer from './ActivistShortCampaignsContainer';

Enzyme.configure({ adapter: new Adapter() });
describe('ActivistShortCampaignsContainer', () => {
  afterEach(cleanup);

  it('renders correctly', async () => {
    const wrapper = await shallow(
      <ActivistShortCampaignsContainer.WrappedComponent
        TrialLog={false}
        listActivistInvestorsForCompanyAiSReq={() => null}
        aiSInvestorForCompanyrowData={[]}
        getActivismSummary_AiSReq={() => null}
        aiSActivismSummaryrowData={[]}
        TokenDecode={{}}
        HandleTrialLog={() => {}}
      />
    );
    await expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Activist Shorts Campaigns overview ', async () => {
    const wrapper = await shallow(
      <ActivistShortCampaignsContainer.WrappedComponent
        TrialLog={false}
        listActivistInvestorsForCompanyAiSReq={() => null}
        aiSInvestorForCompanyrowData={[]}
        companyAllegationsTabAiSReq={() => null}
        getActivismSummary_AiSReq={() => null}
        aiSActivismSummaryrowData={[]}
        TokenDecode={{}}
        HandleTrialLog={() => {}}
      />
    );
    expect(wrapper.find(ActivistShortCampaigns).length).toBe(1);
  });
});
