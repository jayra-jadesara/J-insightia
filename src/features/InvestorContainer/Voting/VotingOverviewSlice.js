import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetInvestorVoteSummary,
  IssAndglasslewis_vote,
  GetManager_voting_against,
  GetDissident_Data_for_Investor_v2,
  GetManager_latest_against2
} from '../../../utils/investor-util';

export const getInvestorVoteSummaryReq = createAsyncThunk(
  'getInvestorVoteSummaryReq',
  async (investor_id) => {
    const response = await GetInvestorVoteSummary(investor_id);
    return response;
  }
);

export const issAndglasslewis_voteReq = createAsyncThunk(
  'issAndglasslewis_voteReq',
  async (investor_id) => {
    const response = await IssAndglasslewis_vote(investor_id);
    return response;
  }
);

export const getManager_voting_againstReq = createAsyncThunk(
  'getManager_voting_againstReq',
  async (investor_id) => {
    const response = await GetManager_voting_against(investor_id);
    return response;
  }
);

export const getDissident_Data_for_Investor_v2Req = createAsyncThunk(
  'getDissident_Data_for_Investor_v2Req',
  async (investor_id) => {
    const response = await GetDissident_Data_for_Investor_v2(investor_id);
    return response;
  }
);

export const getManager_latest_against2Req = createAsyncThunk(
  'getManager_latest_against2Req',
  async (investor_id) => {
    const response = await GetManager_latest_against2(investor_id);
    return response;
  }
);

const VotingOverviewSlice = createSlice({
  name: 'invVotingOverview',
  initialState: {
    isLoadingVotedManagerList: true,
    investorVoteSum: [],
    issAndglasslewis: [],
    manager_voting_against: [],
    dissDataforInvestor: [],
    managerLatestAgainst: [],
    isStartSearch: false,
  },
  reducers: {
    handleResetAll: {
      reducer(state) {
        state.isLoadingVotedManagerList = true;
        state.investorVoteSum = [];
        state.issAndglasslewis = [];
        state.manager_voting_against = [];
        state.manager_voting_against = [];
        state.manager_voting_against = [];
        state.dissDataforInvestor = [];
        state.managerLatestAgainst = [];
      },
      prepare() {
        return {};
      }
    },
    handleStartSearch: {
      reducer(state) {
        state.isStartSearch = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    }
  },
  extraReducers: {
    [getInvestorVoteSummaryReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.investorVoteSum = action.payload;
      }
    },
    [issAndglasslewis_voteReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.issAndglasslewis = action.payload;
      }
    },
    [getManager_voting_againstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.manager_voting_against = action.payload;
      }
    },
    [getDissident_Data_for_Investor_v2Req.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.dissDataforInvestor = action.payload;
      }
    },
    [getManager_latest_against2Req.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.managerLatestAgainst = action.payload;
      }
      state.isLoadingVotedManagerList = action.payload === undefined;
    }
  }
});

export const { handleResetAll, handleStartSearch } = VotingOverviewSlice.actions;

export default VotingOverviewSlice.reducer;
