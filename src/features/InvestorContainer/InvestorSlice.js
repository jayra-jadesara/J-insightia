import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  investor_search,
  GetInvestorProfile,
  GetVotingRationale_byInvestor,
  listActivistFilingsByActivist_v2,
  GetFMProfile
} from '../../utils/investor-util';
import prodConst from '../../constants/ProductConstants';
import {
  AllowDownload,
  UpdateVisitorLog,
  HandleTrialLog,
  TokenDecode,
} from '../../utils/general-util';

export const searchFormReq = createAsyncThunk(
  'investor_search',
  async (arg) => {
    const response = await investor_search(arg.name_search, arg.quicksearch);
    return response;
  }
);

export const getInvestorProfileReq = createAsyncThunk(
  'investor_profile',
  async (investor) => {
    const response = await GetInvestorProfile(investor);
    return response;
  }
);

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const getlistActivistFilingsByActivist_v2Req = createAsyncThunk(
  'listCompanyFilingsByActivist_v2',
  async (arg) => {
    const response = await listActivistFilingsByActivist_v2(
      arg.company_id,
      arg.activist_id,
      arg.longShort
    );
    return response;
  }
);

export const getVotingRationale_byInvestorReq = createAsyncThunk(
  'GetVotingRationale_byInvestor',
  async (investor) => {
    let TrialStatus = false;
    const productId = prodConst.VOTING;

    const resTrial = await HandleTrialLog(productId); // Trial User Check
    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }
    const resAllowDownload = await AllowDownload(productId); // Allow Download Option
    const response = await GetVotingRationale_byInvestor(investor);

    const responseObj = {
      response,
      trialStatus: TrialStatus,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

export const GetFMProfileReq = createAsyncThunk('GetFMProfile', async (arg) => {
  const response = await GetFMProfile(arg);
  return response;
});

const InvestorSlice = createSlice({
  name: 'investor',
  initialState: {
    // General
    loadingData: true,
    DecodeToken: [],
    getTokenDecode: [],
    investorProfile: '',
    votingOverviewLoading: true,
    TrialLog_voting: false,
    searchInvestorRecordset: { data: [] },

    getFMProfile: undefined,
    // voting Rationale
    votingRationale_data: [],
    votingRationale_heading: {},
    votingRationale_trialStatus: false,
    allowDownload: false,
    isLoading: true,
    activistFilings: [],
    activistFilingsAiS: [],
    GetFMProfile: {},
  },
  reducers: {
    handleVisitorLog: {
      reducer() {
        // state = action.payload;
      },
      prepare(page_name, query_string) {
        UpdateVisitorLog(page_name, query_string);
        return {
          payload: { DecodeToken: [] },
        };
      },
    },
    handleResetFiling: {
      reducer(state) {
        state.activistFilings = [];
        state.activistFilingsAiS = [];
        state.loadingData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    resetInvestorProfile: {
      reducer(state, action) {
        state.investorProfile = action.payload;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },

    handleSelectedMeetingDates: {
      reducer(state, action) {
        state.selectedMeetingDates = action.payload.selectedMeetingDates;
      },
      prepare(selectedMeetingDates) {
        return {
          payload: { selectedMeetingDates },
        };
      },
    },

    handleresetFmProfile: {
      reducer(state) {
        state.loadingData = true;
        state.getFMProfile = undefined;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleresetLoadingData: {
      reducer(state) {
        state.loadingData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetSearch: {
      reducer(state) {
        state.searchInvestorRecordset = { data: [] };
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetVotingrationale: {
      reducer(state) {
        state.votingRationale_data = [];
        state.votingRationale_heading = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
  },
  extraReducers: {
    [searchFormReq.fulfilled]: (state, action) => {
      state.searchInvestorRecordset =
        action.payload !== false && action.payload !== undefined
          ? action.payload
          : { data: [] };
    },
    [getInvestorProfileReq.fulfilled]: (state, action) => {
      state.investorProfile =
        action.payload.data !== undefined
          ? action.payload.data[0].investor_name
          : '';
    },
    [getVotingRationale_byInvestorReq.fulfilled]: (state, action) => {
      state.votingRationale_data =
        action.payload !== undefined ? action.payload.response.data : '';
      state.votingRationale_heading =
        action.payload !== undefined ? action.payload.response.heading : '';
      state.votingRationale_trialStatus =
        action.payload !== undefined ? action.payload.trialStatus : '';
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : '';
      state.isLoading = action.payload === undefined;
    },
    [getlistActivistFilingsByActivist_v2Req.fulfilled]: (state, action) => {
      state.activistFilings = action.payload;
      state.loadingData = action.payload === undefined;
    },
    [GetFMProfileReq.fulfilled]: (state, action) => {
      state.getFMProfile = action.payload !== undefined ? action.payload.data : undefined;
    },
  }
});

export const {
  handleVisitorLog,
  resetInvestorProfile,
  handleSelectedMeetingDates,
  handleResetFiling,
  handleresetFmProfile,
  handleresetLoadingData,
  handleResetSearch,
  handleResetVotingrationale,
} = InvestorSlice.actions;

export default InvestorSlice.reducer;
