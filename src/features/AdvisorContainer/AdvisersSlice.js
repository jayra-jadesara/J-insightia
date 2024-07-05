import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateVisitorLog, TokenDecode } from '../../utils/general-util';

import {
  GetAdvisorSearchData,
  GetAdvisorModuleAccessData,
  GetAdvisorActivismCompanyWebsite,
  GetAdvisorActivismPersonnel,
  GetAdvisorActivismCampaigns,
  GetAdvisorActivistShortCampaigns,
  GetIntermediaryData
} from '../../utils/advisor-utils';

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const getAdvisorSearchData = createAsyncThunk(
  'getAdvisorSearchData',
  async (res) => {
        const response = await GetAdvisorSearchData(res.name_search, res.quicksearch);
    return response;
  }
);

export const getAdvisorModuleAccessData = createAsyncThunk(
  'getAdvisorModuleAccessData',
  async (companyId) => {
    const response = await GetAdvisorModuleAccessData(companyId);
    return response;
  }
);

export const getAdvisorActivismCompanyWebsiteReq = createAsyncThunk(
  'getAdvisorActivismCompanyWebsiteReq',
  async (companyId) => {
    const response = await GetAdvisorActivismCompanyWebsite(companyId);
    return response;
  }
);

export const getAdvisorActivismPersonnelReq = createAsyncThunk(
  'getAdvisorActivismPersonnelReq',
  async (companyId) => {
    const response = await GetAdvisorActivismPersonnel(companyId);
    return response;
  }
);

export const getAdvisorActivismCampaignsReq = createAsyncThunk(
  'getAdvisorActivismCampaignsReq',
  async (companyId) => {
    const response = await GetAdvisorActivismCampaigns(companyId);
    return response;
  }
);

export const getAdvisorActivistShortCampaignsReq = createAsyncThunk(
  'getAdvisorActivistShortCampaignsReq',
  async (companyId) => {
    const response = await GetAdvisorActivistShortCampaigns(companyId);
    return response;
  }
);

export const getIntermediaryDataReq = createAsyncThunk(
  'getIntermediaryDataReq',
  async (companyId) => {
    const response = await GetIntermediaryData(companyId);
    return response;
  }
);

const AdvisersSlice = createSlice({
  name: 'advisor',
  initialState: {
    isLoading: true,
    //
    DecodeToken: [],
    getTokenDecode: [],
    votingOverviewLoading: true,
    TrialLog_voting: false,
    getTrialOrActualTop20List: [],
    getTrialOrActualTop20List_TrialStatus: false,
    allowDownload: false,
    advisorProfileTitle: '',
    advisorProfile: '',
    lstAdvisorSearchData: [],
    searchInputName: '',
    lstModuleAccess: {},
    getCompanyWebsiteLink: {},
    lstAdvisorActivismPersonnel: [],
    lstAdvisorActivismCampaigns: [],
    lstAdvisorActivistShortCampaigns: [],
    lstAdvisorVotingDetailInfo: [],
    lstAdvisorVotingDetailInfo_ProponentTable: []
  },
  reducers: {
    handleVisitorLog: {
      reducer() {},
      prepare(page_name, query_string) {
        UpdateVisitorLog(page_name, query_string);
        return {
          payload: { DecodeToken: [] }
        };
      }
    },
    resetAdvisorProfile: {
      reducer(state, action) {
        state.advisorProfile = action.payload;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },

    handleResetSearch: {
      reducer(state) {
        state.lstAdvisorSearchData = [];
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleResetActivist: {
      reducer(state) {
        state.getCompanyWebsiteLink = {};
        state.lstAdvisorActivismPersonnel = [];
        state.lstAdvisorActivismCampaigns = [];
        state.lstAdvisorActivistShortCampaigns = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      }
    }
  },
  extraReducers: {
    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
    [getAdvisorSearchData.fulfilled]: (state, action) => {
      state.lstAdvisorSearchData = action.payload;
    },
    [getAdvisorModuleAccessData.fulfilled]: (state, action) => {
      state.lstModuleAccess = action.payload[0];
    },
    [getAdvisorActivismCompanyWebsiteReq.fulfilled]: (state, action) => {
      state.getCompanyWebsiteLink = action.payload[0];
    },
    [getAdvisorActivismPersonnelReq.fulfilled]: (state, action) => {
      state.lstAdvisorActivismPersonnel = action.payload;
    },
    [getAdvisorActivismCampaignsReq.fulfilled]: (state, action) => {
      state.lstAdvisorActivismCampaigns = action.payload;
      state.isLoading = false;
    },
    [getAdvisorActivistShortCampaignsReq.fulfilled]: (state, action) => {
      state.lstAdvisorActivistShortCampaigns = action.payload;
      state.isLoading = false;
    },
    [getIntermediaryDataReq.fulfilled]: () => {},
  }
});

export const {
  handleVisitorLog,
  resetAdvisorProfile,
  handleResetSearch,
  handleResetActivist
} = AdvisersSlice.actions;

export default AdvisersSlice.reducer;
