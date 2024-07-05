import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  GetAiSCountriesAndStats,
  GetShortPositions,
  GetShortPositionsTopTwenty,
  GetUserShortPositionsAccess,
  GetAiSRecentShortPositions,
  GetAiSRecentShortPositionsTopTwenty
} from '../../../utils/notifiedShortPositionData-util';
import { ACTIVIST_SHORTS } from '../../../constants/ProductConstants';

export const getAiSCountriesAndStatsReq = createAsyncThunk('getAiSCountriesAndStatsReq', async (req) => {
  const response = await GetAiSCountriesAndStats(req.defailtValue, req.defaultLabel, req.candelToken);
  return response;
});

export const getShortPositionsReq = createAsyncThunk('getShortPositionsReq', async (req) => {
  let response;
  const resUserAccessReq = await GetUserShortPositionsAccess(ACTIVIST_SHORTS);
  const { displayLimitedData, trialStatus } = resUserAccessReq;
  if (displayLimitedData) {
    response = await GetShortPositionsTopTwenty(req);
  } else {
    response = await GetShortPositions(req);
  }
  return { response, displayLimitedData, trialStatus };
});

export const getAiSRecentShortPositionsReq = createAsyncThunk('getAiSRecentShortPositionsReq', async (country_id) => {
  let response;
  const resUserAccessReq = await GetUserShortPositionsAccess(ACTIVIST_SHORTS);
  const { displayLimitedData, trialStatus } = resUserAccessReq;
  if (displayLimitedData) {
    response = await GetAiSRecentShortPositionsTopTwenty(country_id);
  } else {
    response = await GetAiSRecentShortPositions(country_id);
  }
  return { response, displayLimitedData, trialStatus };
});

const NotifiedShortPositionDataSlice = createSlice({
  name: 'notifiedShortPositionData',
  initialState: {
    // common for Most Shorted & Latest Notification
    lstDdlAISCountriesAndState: [],
    trialStatus: false,

    // Most Shorted
    lstDdlAISCountriesAndStateMostShortedSelection: {},
    lstShortPosition: [],
    isLoadingMostShortedData: true,

    // Latest Notification
    lstDdlAISCountriesAndStateLetestNotificationSelection: {},
    lstAiSRecentShortPositions: [],
    isLoadingLatestNotificationData: true
  },
  reducers: {
    handleOnChangeDdlCountriesAndState: {
      reducer(state, action) {
        state.isLoadingMostShortedData = true;
        if (action.payload.e === null) {
          const lstDdlData = current(state).lstDdlAISCountriesAndState;
          if (lstDdlData.length > 0) {
            state.lstDdlAISCountriesAndStateMostShortedSelection = lstDdlData[0];
          }
        } else {
          state.lstDdlAISCountriesAndStateMostShortedSelection = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleOnChangeLatestNotificationDdlCountriesAndState: {
      reducer(state, action) {
        state.isLoadingLatestNotificationData = true;
        if (action.payload.e === null) {
          const lstDdlData = current(state).lstDdlAISCountriesAndState;
          if (lstDdlData.length > 0) {
            state.lstDdlAISCountriesAndStateLetestNotificationSelection = lstDdlData[0];
          }
        } else {
          state.lstDdlAISCountriesAndStateLetestNotificationSelection = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleGlobleResetNotifiedShortPosition: {
      reducer(state) {
        state.lstDdlAISCountriesAndState = [];
        state.trialStatus = false;

        // Most Shorted
        state.lstDdlAISCountriesAndStateMostShortedSelection = {};
        state.lstShortPosition = [];
        state.isLoadingMostShortedData = true;

        // Latest Notification
        state.lstDdlAISCountriesAndStateLetestNotificationSelection = {};
        state.lstAiSRecentShortPositions = [];
        state.isLoadingLatestNotificationData = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    }
  },
  extraReducers: {
    [getAiSCountriesAndStatsReq.fulfilled]: (state, action) => {
      if (action.payload !== false && action.payload.length > 0) {
        state.lstDdlAISCountriesAndState = action.payload;
        state.lstDdlAISCountriesAndStateMostShortedSelection = action.payload[0];
        state.lstDdlAISCountriesAndStateLetestNotificationSelection = action.payload[0];
      }
    },
    [getShortPositionsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstShortPosition = action.payload.response;
        state.trialStatus = action.payload.trialStatus;
        state.isLoadingMostShortedData = action.payload.response === undefined;
      }
    },
    [getAiSRecentShortPositionsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstAiSRecentShortPositions = action.payload.response;
        state.trialStatus = action.payload.trialStatus;
        state.isLoadingLatestNotificationData = action.payload.response === undefined;
      }
    }
  }
});

export const {
  handleOnChangeDdlCountriesAndState,
  handleOnChangeLatestNotificationDdlCountriesAndState,
  handleGlobleResetNotifiedShortPosition
} = NotifiedShortPositionDataSlice.actions;

export default NotifiedShortPositionDataSlice.reducer;
