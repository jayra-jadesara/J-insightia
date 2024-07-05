import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getGovOverview_meetingInfo_Quickview_StockData,
  getBoardAndDirectorsIndexDDL,
  getComparisionTables,
  companyGovernanceOverviewDummyData
} from '../../../utils/company-util';
import { GOVERNANCE } from '../../../constants/ProductConstants';
import { HandleTrialLog, AllowDownload } from '../../../utils/general-util';

export const getGovOverview_meetingInfo_Quickview_StockDataReq = createAsyncThunk(
  'getGovOverview_meetingInfo_Quickview_StockData',
  async (res) => {
    let response = [];
    const productsId = GOVERNANCE;
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option

    response = await getGovOverview_meetingInfo_Quickview_StockData(res);

    const responseObj = {
      response,
      allowDownload: resAllowDownload
    };
    return responseObj;
  }
);

export const getComparisionTablesReq = createAsyncThunk('getComparisionTables', async (res) => {
  let response = [];
  const productsId = GOVERNANCE;
  const resAllowDownload = await AllowDownload(productsId); // Allow Download Option

  response = await getComparisionTables(res);

  const responseObj = {
    response,
    allowDownload: resAllowDownload
  };
  return responseObj;
});

export const getBoardAndDirectorsIndexDDLReq = createAsyncThunk('getBoardAndDirectorsIndexDDL', async (res) => {
  const response = await getBoardAndDirectorsIndexDDL(res);
  return response;
});

const GovernanceOverviewSlice = createSlice({
  name: 'companyGovernanceOverview',
  initialState: {
    table_QuickView: {},
    table_MeetingInfo: {},
    table_BoardandDirectors: [],
    table_ShareholderRightsandVoting: [],
    table_Stock: [],
    table_Ownership: [],
    data_Chart: {},
    data_ChartInfo: '',
    ddlComparision: [],
    selection_ddlComparision: [],

    trialStatus: false,
    allowDownload: true,
    isLoading: true
  },
  reducers: {
    handleSetDDLComparision: {
      reducer(state, action) {
        state.selection_ddlComparision = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleIsLoading: {
      reducer(state, action) {
        state.isLoading = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleResetGovernance: {
      reducer(state) {
        state.table_QuickView = {};
        state.table_MeetingInfo = {};
        state.table_BoardandDirectors = [];
        state.table_ShareholderRightsandVoting = [];
        state.table_Stock = [];
        state.table_Ownership = [];
        state.data_Chart = {};
        state.data_ChartInfo = '';
        state.ddlComparision = [];
        state.selection_ddlComparision = [];
      },
      prepare() {
        return {
          payload: null
        };
      }
    }
  },
  extraReducers: {
    [getGovOverview_meetingInfo_Quickview_StockDataReq.fulfilled]: (state, action) => {
      state.table_QuickView = action.payload !== undefined ? action.payload.response.data_QuickView : [];
      state.table_MeetingInfo = action.payload !== undefined ? action.payload.response.data_MeetingInfo : [];
      state.table_Stock = action.payload !== undefined ? action.payload.response.data_Stock : [];
      state.data_Chart = action.payload !== undefined ? action.payload.response.data_Chart : [];
      state.data_ChartInfo = action.payload !== undefined ? action.payload.response.data_ChartInfo : [];
      state.trialStatus = action.payload !== undefined ? action.payload.trialStatus : false;
      state.allowDownload = action.payload !== undefined ? action.payload.allowDownload : true;
      state.isLoading = action.payload === undefined;
    },
    [getComparisionTablesReq.fulfilled]: (state, action) => {
      state.table_BoardandDirectors = action.payload !== undefined ? action.payload.response.dataBoardandDirectors : [];
      state.table_ShareholderRightsandVoting =
        action.payload !== undefined ? action.payload.response.dataShareholder : [];
      state.table_Ownership = action.payload !== undefined ? action.payload.response.dataOwnership : [];
      state.trialStatus = action.payload !== undefined ? action.payload.trialStatus : false;
      state.allowDownload = action.payload !== undefined ? action.payload.allowDownload : true;
      state.isLoading = action.payload === undefined;
    },
    [getBoardAndDirectorsIndexDDLReq.fulfilled]: (state, action) => {
      state.ddlComparision = action.payload !== undefined ? action.payload.data : [];
      state.selection_ddlComparision = action.payload !== undefined ? action.payload.selectionData : [];
    }
  }
});

export const { handleResetLoading, handleSetDDLComparision, handleIsLoading, handleResetGovernance } =
  GovernanceOverviewSlice.actions;

export default GovernanceOverviewSlice.reducer;
