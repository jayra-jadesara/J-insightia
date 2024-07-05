import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import CompanySlice, {
  getHistoricShortPositionsReq,
  getAiSCompTotalShortPositionsReq,
  getAiSCompDisclosedShortPositionsReq,
  listActivistInvestorsForCompany_NEW_aisReq,
  listActivistInvestorsForCompanyAiSReq,
  getActivismSummary_AiSReq
} from './CompanySlice';

Enzyme.configure({ adapter: new Adapter() });
describe('Company Slice', () => {
  it('renders correctly', async () => {
    const wrapper = shallow(<CompanySlice />);
    await expect(toJson(wrapper)).toMatchSnapshot();
  });

  const initialState = { id: '', list: [], fetching: false };
  afterEach(cleanup);

  describe('Test Created Async Thunks', () => {
    afterEach(cleanup);

    describe('getAiSCompDisclosedShortPositionsReq', () => {
      it('sets the payload and rowData when fulfilled', () => {
        const action = {
          type: getAiSCompDisclosedShortPositionsReq.fulfilled.type,
          payload: { id: 1, list: [2, 3] }
        };
        const state = CompanySlice(initialState, action);
        expect(state).toEqual({
          fetching: false,
          id: '',
          list: [],
          rowData_activistShortCurrentShortPosition: { id: 1, list: [2, 3] }
        });
      });
    });

    describe('listActivistInvestorsForCompany_NEW_aisReq', () => {
      it('sets the payload and rowData when fulfilled', () => {
        const action = {
          type: listActivistInvestorsForCompany_NEW_aisReq.fulfilled.type,
          payload: { id: 1, list: [2, 3] }
        };
        const state = CompanySlice(initialState, action);
        expect(state).toEqual({
          fetching: false,
          id: '',
          list: [],
          rowData_activistShortActivistInvestorsForCompany: { id: 1, list: [2, 3] }
        });
      });
    });

    describe('getHistoricShortPositionsReq', () => {
      it('sets the payload and rowData when fulfilled', () => {
        const action = {
          type: getHistoricShortPositionsReq.fulfilled.type,
          payload: { id: 1, list: [2, 3] }
        };
        const state = CompanySlice(initialState, action);
        expect(state).toEqual({
          fetching: false,
          id: '',
          list: [],
          rowData_activistShortHistoricShortPosition: { id: 1, list: [2, 3] }
        });
      });
    });

    describe('getAiSCompTotalShortPositionsReq', () => {
      it('sets the payload and rowData when fulfilled', () => {
        const action = {
          type: getAiSCompTotalShortPositionsReq.fulfilled.type,
          payload: { id: 1, list: [2, 3] }
        };
        const state = CompanySlice(initialState, action);
        expect(state).toEqual({
          fetching: false,
          id: '',
          list: [],
          rowData_activistShortTotalShortPosition: { id: 1, list: [2, 3] }
        });
      });
    });

    describe('getActivismSummary_AiSReq', () => {
      it('sets the payload and rowData when fulfilled', () => {
        const action = {
          type: getActivismSummary_AiSReq.fulfilled.type,
          payload: { id: 1, list: [2, 3] }
        };
        const state = CompanySlice(initialState, action);
        expect(state).toEqual({
          fetching: false,
          id: '',
          list: [],
          rowData_AiSActivismSummary: { id: 1, list: [2, 3] }
        });
      });
    });

    describe('listActivistInvestorsForCompanyAiSReq', () => {
      it('sets the payload and rowData when fulfilled', () => {
        const action = {
          type: listActivistInvestorsForCompanyAiSReq.fulfilled.type,
          payload: [{ name: 'a', campaign_summary_id: 1 }]
        };
        const state = CompanySlice(initialState, action);
        expect(state.rowData_AiSInvestorForCompany).toEqual([{ name: 'a', campaign_summary_id: 1 }]);
      });
    });
  });
});
