import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import ActivistShortsOverview from '../../components/Company/ActivistShorts/ActivistShortsOverview';
import ActivistShortsOverviewContainer from './ActivistShortsOverviewContainer';

Enzyme.configure({ adapter: new Adapter() });
describe('Activist Shorts Overview Container', () => {
  afterEach(cleanup);
  it('renders correctly', async () => {
    const wrapper = await shallow(
      <ActivistShortsOverviewContainer.WrappedComponent
        location={{ search: '&pid=1' }}
        TrialLog={false}
        GetActivistShortListTrialUserReq={() => null}
        getAiSCompDisclosedShortPositionsReq={() => null}
        getAiSCompTotalShortPositionsReq={() => null}
        getHistoricShortPositionsReq={() => null}
        listActivistInvestorsForCompany_NEW_aisReq={() => null}
        activismshortCurrentShortPositionrowData={[]}
        activistShortActivistInvestorsForCompanyrowData={[]}
        activistShortHistoricShortPositionrowData={[]}
        activistShortTotalShortPositionrowData={[]}
        companyIDrowData={[]}
      />
    );
    await expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Activist Shorts overview ', async () => {
    const wrapper = await shallow(
      <ActivistShortsOverviewContainer.WrappedComponent
        location={{ search: '&pid=1' }}
        TrialLog={false}
        GetActivistShortListTrialUserReq={() => null}
        getAiSCompDisclosedShortPositionsReq={() => null}
        getAiSCompTotalShortPositionsReq={() => null}
        getHistoricShortPositionsReq={() => null}
        listActivistInvestorsForCompany_NEW_aisReq={() => null}
        activismshortCurrentShortPositionrowData={[]}
        activistShortActivistInvestorsForCompanyrowData={[]}
        activistShortHistoricShortPositionrowData={[]}
        activistShortTotalShortPositionrowData={[]}
        companyIDrowData={[]}
      />
    );
    expect(wrapper.find(ActivistShortsOverview).length).toBe(1);
  });
});
