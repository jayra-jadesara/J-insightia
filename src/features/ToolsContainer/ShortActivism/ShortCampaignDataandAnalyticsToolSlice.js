import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  GetAiSCampaignInformation,
  GetAiSCampaignInformationDummyData,
  ShortCampaignDataandAnalyticsReq,
  GetShortCampaignSamlpeData
} from '../../../utils/shortCampaignDataandAnalytics-util';
import { ACTIVIST_SHORTS } from '../../../constants/ProductConstants';

export const getAiSCampaignInformationReq = createAsyncThunk(
  'getAiSCampaignInformationReq',
  async (req) => {
    const resUserAccessReq = await ShortCampaignDataandAnalyticsReq(
      ACTIVIST_SHORTS
    );
    const { displayLimitedData, trialStatus } = resUserAccessReq;
    let response;
    if (displayLimitedData && trialStatus) {
      response = await GetAiSCampaignInformationDummyData(req);
    } else {
      response = await GetAiSCampaignInformation(req);
    }
    return { response, displayLimitedData, trialStatus };
  }
);

export const getShortCampaignSamlpeDataReq = createAsyncThunk(
  'getShortCampaignSamlpeDataReq',
  async (req) => {
    const response = await GetShortCampaignSamlpeData(req);
    return response;
  }
);

const ShortCampaignDataandAnalyticsToolSlice = createSlice({
  name: 'shortCampaignDataandAnalytics',
  initialState: {
    isCampaignDataandAnalyticsLoading: true,
    lstCampaignDataandAnalyticsData: [],
    allowDownload: true,
    trialStatus: false,
    userMessage: '',
    lstShortCampaignSampleData: [],
    ddlSelectedValue: {}
  },
  reducers: {
    handleResetShortCampaignDataAndAnalyticsTool: {
      reducer(state) {
        state.isCampaignDataandAnalyticsLoading = true;
        state.lstCampaignDataandAnalyticsData = [];
        state.allowDownload = true;
        state.trialStatus = false;
        state.userMessage = '';
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleOnChangeDdlSelectedValue: {
      reducer(state, action) {
        if (action.payload.e !== null) {
          state.ddlSelectedValue = action.payload.e;
        } else {
          const LstShortCampaignSampleData =
            current(state).lstShortCampaignSampleData;
          if (LstShortCampaignSampleData.length > 0) {
            state.ddlSelectedValue = LstShortCampaignSampleData[0];
          }
        }
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    }
  },
  extraReducers: {
    [getAiSCampaignInformationReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isCampaignDataandAnalyticsLoading = action.payload.response === undefined;
        if (action.payload.trialStatus === false && action.payload.displayLimitedData) {
          state.lstCampaignDataandAnalyticsData = action.payload.response.slice(
            0,
            20
          );
        } else {
          state.lstCampaignDataandAnalyticsData = action.payload.response;
        }
      } else {
        state.isCampaignDataandAnalyticsLoading = true;
        state.lstCampaignDataandAnalyticsData = [];
      }
    },
    [getShortCampaignSamlpeDataReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.lstShortCampaignSampleData = action.payload;
        state.ddlSelectedValue = action.payload[0];
      } else {
        state.lstShortCampaignSampleData = [];
        state.ddlSelectedValue = {};
      }
    }
  }
});

export const {
  handleResetShortCampaignDataAndAnalyticsTool,
  handleOnChangeDdlSelectedValue
} = ShortCampaignDataandAnalyticsToolSlice.actions;

export default ShortCampaignDataandAnalyticsToolSlice.reducer;
