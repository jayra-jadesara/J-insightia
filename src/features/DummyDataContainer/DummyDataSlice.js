import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  BarChartDummyData,
  StackBarChartDummyData,
  SharPriceChartDummyData,
  PieChartDummyData,
  DoughnutChartDummyData,
  InterLockingDummyData
} from '../../utils/general-util';

import {
  ListTopTwentyActivistActivity,
  CompaniesTargeted_Trends_Overview,
  LatestActivistDemands,
  TimeLines,
  ActiveActivists_Trends_Overview
} from '../../utils/company-util';

import {
  LATEST_ACTIVIST_STAKES,
  LATEST_ACTIVIST_DEEMANDS,
  TIMELINES,
  LETEST_ACTIVISM_STATISTICS
} from '../../constants/MultiTableTabConstant';

export const barchartDummyDataReq = createAsyncThunk('barchartDummyData', async () => {
  const response = await BarChartDummyData();
  return response;
});

export const stackBarchartDummyDataReq = createAsyncThunk('stackBarChartDummyData', async () => {
  const response = await StackBarChartDummyData();
  return response;
});

export const sharePriceChartDummyDataReq = createAsyncThunk('SharPriceChartDummyData', async () => {
  const response = await SharPriceChartDummyData();
  return response;
});

export const pieChartDummyDataReq = createAsyncThunk('pieChartDummyData', async () => {
  const response = await PieChartDummyData();
  return response;
});

export const doughnutChartDummyDataReq = createAsyncThunk('doughnutChartDummyData', async () => {
  const response = await DoughnutChartDummyData();
  return response;
});

export const interLockingDummyDataReq = createAsyncThunk('doughnutChartDummyData', async () => {
  const response = await InterLockingDummyData();
  return response;
});

export const listTopTwentyActivistActivityReq = createAsyncThunk('doughnutChartDummyData', async () => {
  const response = await ListTopTwentyActivistActivity();
  return response;
});

export const latestActivistDemandsReq = createAsyncThunk('latestActivistDemands', async () => {
  const response = await LatestActivistDemands();
  return response;
});

export const timeLinesReq = createAsyncThunk('timeLines', async () => {
  const response = await TimeLines();
  return response;
});

export const activeActivistsTrendsOverviewReq = createAsyncThunk('activeActivistsTrendsOverview', async () => {
  const response = await ActiveActivists_Trends_Overview();
  return response;
});

export const companiesTargetedTrendsOverviewReq = createAsyncThunk('companiesTargetedTrendsOverview', async () => {
  const response = await CompaniesTargeted_Trends_Overview();
  return response;
});

const dummyDataSlice = createSlice({
  name: 'dummydata',
  initialState: {
    barchartDummyData: [],
    stackBarChartDummyData: [],
    sharePriceChartDummyData: [],
    pieChartDummayData: [],
    doughnutChartDummyData: [],
    listTopTwentyActivistActivity: [],
    timeLinesRecordSet: [],
    listActivistDemands: [],
    activeActivistTradeOverview: [],
    companiesTargetTradeOverview: [],

    activeListTopTwentyActivistActivity: true,
    activeLetestActivistDemand: false,
    activeTimelines: false,
    activeLetestActivisamStatestics: false
  },
  reducers: {
    handleActiveTab: {
      reducer(state, action) {
        state.activeListTopTwentyActivistActivity = false;
        state.activeLetestActivistDemand = false;
        state.activeTimelines = false;
        state.activeLetestActivisamStatestics = false;

        switch (action.payload.e) {
          case LATEST_ACTIVIST_STAKES:
            state.activeListTopTwentyActivistActivity = true;
            break;
          case LATEST_ACTIVIST_DEEMANDS:
            state.activeLetestActivistDemand = true;
            break;
          case TIMELINES:
            state.activeTimelines = true;
            break;
          case LETEST_ACTIVISM_STATISTICS:
            state.activeLetestActivisamStatestics = true;
            break;
          default:
            break;
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
    [barchartDummyDataReq.fulfilled]: (state, action) => {
      state.barchartDummyData = action.payload;
    },
    [stackBarchartDummyDataReq.fulfilled]: (state, action) => {
      state.stackBarChartDummyData = action.payload;
    },
    [sharePriceChartDummyDataReq.fulfilled]: (state, action) => {
      state.sharePriceChartDummyData = action.payload;
    },
    [pieChartDummyDataReq.fulfilled]: (state, action) => {
      state.pieChartDummayData = action.payload;
    },
    [doughnutChartDummyDataReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.doughnutChartDummyData = action.payload.value;
      }
    },
    [interLockingDummyDataReq.fulfilled]: (state, action) => {
      state.interlockingDummyData = action.payload;
    },
    [listTopTwentyActivistActivityReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.listTopTwentyActivistActivity = action.payload.data;
      }
    },
    [latestActivistDemandsReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.listActivistDemands = action.payload.data;
      }
    },
    [timeLinesReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.timeLinesRecordSet = action.payload.data;
      }
    },
    [activeActivistsTrendsOverviewReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.activeActivistTradeOverview = action.payload.data;
      }
    },
    [companiesTargetedTrendsOverviewReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.companiesTargetTradeOverview = action.payload.data;
      }
    }
  }
});

export const { handleActiveTab } = dummyDataSlice.actions;

export default dummyDataSlice.reducer;
