import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetDissidentVotingByInvestor,
  GetSupportByDissident,
  GetProxyContestsChartData,
  ProxyContestVotingAccessReq,
} from '../../../utils/investorVoting-util';
import products from '../../../constants/ProductConstants';
import DissidentVotingSummaryConstant from '../../../constants/DissidentVotingSummaryConstant';
import { DEFAULT_INVESTOR_BLACKROCK } from '../../../constants/GeneralConstant';
import { NUMBER_TWO } from '../../../constants/NumberConstants';

export const getDissidentVotingByInvestorReq = createAsyncThunk('getDissidentVotingByInvestorReq', async (req) => {
  const productsId = products.VOTING;
  const resUserAccessReq = await ProxyContestVotingAccessReq(productsId);
  const invId =
    resUserAccessReq.status !== NUMBER_TWO && resUserAccessReq.status !== 4
      ? DEFAULT_INVESTOR_BLACKROCK
      : req.investorId;
  const response = await GetDissidentVotingByInvestor(
    req.companySearchId,
    invId,
    req.startDate,
    req.endDate,
    req.desiredOutcome,
    req.proponent,
    req.settlements,
    req.issCard,
    req.glCard
  );
  return { resUserAccessReq, response };
});

export const getSupportByDissidentReq = createAsyncThunk('getSupportByDissidentReq', async (req) => {
  const response = await GetSupportByDissident(
    req.companySearchId,
    req.investorId,
    req.startDate,
    req.endDate,
    req.desiredOutcome,
    req.proponent,
    req.settlements,
    req.issCard,
    req.glCard
  );
  return response;
});

export const getProxyContestsChartDataReq = createAsyncThunk('getProxyContestsChartDataReq', async (req) => {
  const response = await GetProxyContestsChartData(
    req.companySearchId,
    req.investorId,
    req.desiredOutcome,
    req.proponent,
    req.settlements,
    req.issCard,
    req.glCard
  );
  return response;
});

const ProxyContestVotingSlice = createSlice({
  name: 'proxyContestVoting',
  initialState: {
    lstSupportByDissident: [],
    lstVotingAtProxyContestsData: [],
    votingSummaryAtProxyContests: {},
    lstProxyContestChartData: [],
    isLoadingInvestorVotingProxyContestData: true,
    isTrialStatusForProxyContestVotingData: false,
    userMessage: '',
  },
  reducers: {
    handleClearFilterResult: {
      reducer(state) {
        state.lstSupportByDissident = [];
        state.lstVotingAtProxyContestsData = [];
        state.votingSummaryAtProxyContests = {};
        state.lstProxyContestChartData = [];
        state.isLoadingInvestorVotingProxyContestData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleGlobleResetProxyContestVoting: {
      reducer(state) {
        state.lstSupportByDissident = [];
        state.lstVotingAtProxyContestsData = [];
        state.votingSummaryAtProxyContests = {};
        state.lstProxyContestChartData = [];
        state.isLoadingInvestorVotingProxyContestData = true;
        state.userMessage = '';
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
  },
  extraReducers: {
    [getDissidentVotingByInvestorReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        // set limited data
        if (action.payload.resUserAccessReq.displayLimitedData) {
          state.lstVotingAtProxyContestsData = action.payload.response.VotingAtProxyContestsData.slice(0, 5);
        } else {
          state.lstVotingAtProxyContestsData = action.payload.response.VotingAtProxyContestsData;
        }
        state.votingSummaryAtProxyContests = action.payload.response.VotingSummaryAtProxyContests;
        state.isTrialStatusForProxyContestVotingData = action.payload.resUserAccessReq.trialStatus;

        if (action.payload.resUserAccessReq.trialStatus) {
          state.userMessage = DissidentVotingSummaryConstant.SUB_NOT_TRIAL_OR_FULL_TEXT;
        }

        if (
          action.payload.resUserAccessReq.trialStatus === false &&
          action.payload.resUserAccessReq.displayLimitedData
        ) {
          state.userMessage = DissidentVotingSummaryConstant.SUB_IS_TRIAL_NOT_FULL_TEXT;
        }
      }
      state.isLoadingInvestorVotingProxyContestData = action.payload === undefined;
    },
    [getSupportByDissidentReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstSupportByDissident = action.payload;
      }
    },
    [getProxyContestsChartDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstProxyContestChartData = action.payload;
      }
    },
  },
});

export const { handleClearFilterResult, handleGlobleResetProxyContestVoting } = ProxyContestVotingSlice.actions;

export default ProxyContestVotingSlice.reducer;
