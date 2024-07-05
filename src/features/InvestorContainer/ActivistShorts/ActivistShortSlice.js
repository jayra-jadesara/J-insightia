import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetActivistIdFromInvestor,
  ListCampaignTypesbyActivist,
  GetHoldingsbyCountryAiS,
  GetHoldingsbyIndustryAiS,
  GetHoldingsbyMarketCapAiS,
  GetCampaignSummarybyActivistAiS
} from '../../../utils/investorActivistShort-util';
import { listActivistFilingsByActivistAiS } from '../../../utils/investor-util';
import { INVESTOR_ACTIVIST_SHORT_SHORT } from '../../../constants/InvestorActivistShortConstant';

// Overview
export const getActivistIdFromInvestorIdReq = createAsyncThunk(
  'getActivistIdFromInvestorIdReq',
  async (investorId) => {
    const response = await GetActivistIdFromInvestor(investorId);
    return response;
  }
);

export const getListCampaignTypesbyActivistReq = createAsyncThunk(
  'getListCampaignTypesbyActivistReq',
  async (activistid) => {
    const response = await ListCampaignTypesbyActivist(
      activistid,
      INVESTOR_ACTIVIST_SHORT_SHORT
    );
    return response;
  }
);

export const getHoldingsbyCountryAiSReq = createAsyncThunk(
  'getHoldingsbyCountryAiSReq',
  async (activistid) => {
    const response = await GetHoldingsbyCountryAiS(activistid);
    return response;
  }
);

export const getHoldingsbyIndustryAiSReq = createAsyncThunk(
  'getHoldingsbyIndustryAiSReq',
  async (activistid) => {
    const response = await GetHoldingsbyIndustryAiS(activistid);
    return response;
  }
);

export const getHoldingsbyMarketCapAiSReq = createAsyncThunk(
  'getHoldingsbyMarketCapAiSReq',
  async (activistid) => {
    const response = await GetHoldingsbyMarketCapAiS(activistid);
    return response;
  }
);

// Campaign
export const getCampaignSummarybyActivistAiSReq = createAsyncThunk(
  'getCampaignSummarybyActivistAiSReq',
  async (activistid) => {
    const response = await GetCampaignSummarybyActivistAiS(activistid);
    return response;
  }
);

// filings
export const getListActivistFilingsByActivistAiSReq = createAsyncThunk(
  'listActivistFilingsByActivistAiSInvestorActivistShort',
  async (arg) => {
    const response = await listActivistFilingsByActivistAiS(
      arg.company_id,
      arg.activist_id,
      arg.longShort
    );
    return response;
  }
);

const ActivistShortSlice = createSlice({
  name: 'investorActivistShort',
  initialState: {
    loadingData: true,
    // Overview
    lstCampaignTypesbyActivist: [],
    lstCountryFocusChartData: [],
    lstSectorFocusData: [],
    lstMarketCapOfInvestmentData: [],
    currentActivistId: null,

    // Campaign
    lstCampaignSummarybyActivistAiS: []
  },
  reducers: {
    handleGlobleResetActivistShort: {
      reducer(state) {
        // Overview
        state.lstCampaignTypesbyActivist = [];
        state.lstCountryFocusChartData = [];
        state.lstSectorFocusData = [];
        state.lstMarketCapOfInvestmentData = [];
        state.currentActivistId = null;

        // Campaign
        state.lstCampaignSummarybyActivistAiS = [];
        state.loadingData = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleResetInvestorActivistShortsCharts: {
      reducer(state) {
        state.lstCountryFocusChartData = [];
        state.lstSectorFocusData = [];
        state.lstMarketCapOfInvestmentData = [];
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleSetLoadingInvestorActivistShorts: {
      reducer(state) {
        state.loadingData = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    }
  },
  extraReducers: {
    [getActivistIdFromInvestorIdReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.currentActivistId = action.payload.activist_id;
      }
    },
    [getListCampaignTypesbyActivistReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstCampaignTypesbyActivist = action.payload;
      }
    },
    [getHoldingsbyCountryAiSReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstCountryFocusChartData = action.payload;
      }
    },
    [getHoldingsbyIndustryAiSReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstSectorFocusData = action.payload;
      }
    },
    [getHoldingsbyMarketCapAiSReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstMarketCapOfInvestmentData = action.payload;
        state.loadingData = action.payload === undefined;
      }
    },
    [getCampaignSummarybyActivistAiSReq.fulfilled]: (state, action) => {
      state.lstCampaignSummarybyActivistAiS =
        action.payload !== undefined ? action.payload.data : [];
      state.loadingData = action.payload === undefined;
    },
    // filings
    [getListActivistFilingsByActivistAiSReq.fulfilled]: (state, action) => {
      state.activistFilingsAiS = action.payload;
      state.loadingData = action.payload === undefined;
    }
  }
});

export const {
  handleClearFilterResult,
  handleGlobleResetProxyContestVoting,
  handleGlobleResetActivistShort,
  handleResetInvestorActivistShortsCharts,
  handleSetLoadingInvestorActivistShorts
} = ActivistShortSlice.actions;

export default ActivistShortSlice.reducer;
