import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { GetPoisonPillStats, GetRightsAgent, GetPoisonPillRecentInsightia } from '../../../utils/tools-util';

export const getPoisonPillStatsReq = createAsyncThunk('getPoisonPillStatsReq', async () => {
  const response = await GetPoisonPillStats();
  return response;
});

export const getRightsAgentReq = createAsyncThunk('getRightsAgentReq', async () => {
  const response = await GetRightsAgent();
  return response;
});

export const getPoisonPillRecentInsightiaReq = createAsyncThunk('getPoisonPillRecentInsightiaReq', async () => {
  const response = await GetPoisonPillRecentInsightia();
  return response;
});

const initialState = {
  isPoisonData: true,
  poisonPillGraph1: [],
  poisonPillGraph2: [],
  poisonPillGraph3: [],
  poisonPillPieChart: [],
  poisonPillCardData: [],
  lstRightsAgentData: [],
  lstPoisonPillRecentInsightia: [],
  isLoadingPoisonData: true
};

const PoisonPillDataAndAnalyticsSlice = createSlice({
  name: 'poisonpill',
  initialState,
  reducers: {
    handleSwitchDataAndStats: {
      reducer(state, action) {
        state.isPoisonData = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    }
  },
  extraReducers: {
    [getPoisonPillStatsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.poisonPillGraph1 = action.payload[0];
        state.poisonPillGraph2 = action.payload[1];
        state.poisonPillGraph3 = action.payload[2];
        state.poisonPillCardData = action.payload[4][0];
        const pieChartData = action.payload[3];
        const pieChartDataModified = [];

        pieChartData.forEach((d) => {
          pieChartDataModified.push({ text: d.sector, value: d.active_pills });
        });

        state.poisonPillPieChart = pieChartDataModified;
      }
    },
    [getRightsAgentReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.lstRightsAgentData = action.payload;
      }
    },
    [getPoisonPillRecentInsightiaReq.fulfilled]: (state, action) => {
      state.isLoadingPoisonData = false;
      if (action.payload) {
        state.lstPoisonPillRecentInsightia = action.payload;
      }
    }
  }
});

export const { handleSwitchDataAndStats } = PoisonPillDataAndAnalyticsSlice.actions;

export default PoisonPillDataAndAnalyticsSlice.reducer;
