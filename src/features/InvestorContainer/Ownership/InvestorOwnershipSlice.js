import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOwnershipInvestorDummyData,
  getLatestOwnershipDateList,
  getOwnershipLongInvestorData,
  getOwnershipLongFundData,
  getOwnershipShortInvestorData,
  getOwnershipShortFundData,
  getInvestorOwnershipLongShortDataCheck,
} from '../../../utils/investorOwnership-util';
import ProductConstants from '../../../constants/ProductConstants';
import { getOwnershipStatus, TokenDecode } from '../../../utils/general-util';
import { NUMBER_TWO, NUMBER_SEVEN } from '../../../constants/NumberConstants';

// #region OwnerShip Long/ Short - Investor

export const getLatestOwnershipDateListReq = createAsyncThunk('getLatestOwnershipDateList', async (productId) => {
  const response = await getLatestOwnershipDateList(productId);
  return response;
});

export const getOwnershipLongInvestorDataReq = createAsyncThunk('getOwnershipLongInvestorData', async (res) => {
  let response;
  const { filter, TrialStatus, resAllowDownload } = await getOwnershipStatus();

  if (filter && !TrialStatus) {
    // TOP 5 & status = 2
    response = await getOwnershipLongInvestorData({
      investor_id: res.investor_id,
      period_of_report: res.value,
      change_comparison: res.value,
      filterRecords: null,
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getOwnershipInvestorDummyData();
    response = resDummydata.data !== undefined ? resDummydata.data.longInvestor : [];
  } else {
    response = await getOwnershipLongInvestorData(res);
  }
  return { response, TrialStatus, allowDownload: resAllowDownload };

  // const response = await getOwnershipLongInvestorData(res);
  // return response;
});

export const getOwnershipLongFundDataReq = createAsyncThunk('getOwnershipLongFundData', async (res) => {
  let response;
  const { filter, TrialStatus, resAllowDownload } = await getOwnershipStatus();

  if (filter && !TrialStatus) {
    // TOP 5 & status = 2
    response = await getOwnershipLongFundData({
      investor_id: res.investor_id,
      filterRecords: null,
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getOwnershipInvestorDummyData();
    response = resDummydata.data !== undefined ? resDummydata.data.longFund : [];
  } else {
    response = await getOwnershipLongFundData(res);
  }
  return { response, TrialStatus, allowDownload: resAllowDownload };
});

export const getOwnershipShortInvestorDataReq = createAsyncThunk('getOwnershipShortInvestorData', async (res) => {
  let response;
  const { filter, TrialStatus, resAllowDownload } = await getOwnershipStatus();

  if (filter && !TrialStatus) {
    // TOP 5 & status = 2
    response = await getOwnershipShortInvestorData({
      investor_id: res.investor_id,
      filterRecords: null,
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getOwnershipInvestorDummyData();
    response = resDummydata.data !== undefined ? resDummydata.data.shortInvestor : [];
  } else {
    response = await getOwnershipShortInvestorData(res);
  }
  return { response, TrialStatus, allowDownload: resAllowDownload };
});

export const getOwnershipShortFundDataReq = createAsyncThunk('getOwnershipShortFundData', async (res) => {
  let response;
  const { filter, TrialStatus, resAllowDownload } = await getOwnershipStatus();

  if (filter && !TrialStatus) {
    // TOP 5 & status = 2
    response = await getOwnershipShortFundData({
      investor_id: res.investor_id,
      filterRecords: null,
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getOwnershipInvestorDummyData();
    response = resDummydata.data !== undefined ? resDummydata.data.shortFund : [];
  } else {
    response = await getOwnershipShortFundData(res);
  }
  return { response, TrialStatus, allowDownload: resAllowDownload };
});

//Ownership Long/short access
export const getInvestorOwnershipLongShortDataCheckReq = createAsyncThunk(
  'getInvestorOwnershipLongShortDataCheck',
  async (res) => {
    const response = await getInvestorOwnershipLongShortDataCheck(res);
    return response;
  }
);
// #endregion

const InvestorOwnershipSlice = createSlice({
  name: 'investorOwnership',
  initialState: {
    // #region OwnerShip Long/ Short - Company
    latestOwnershipDateList: [],
    setValue_latestOwnershipDate: { label: 'Latest Ownership', value: null },
    changeComparisionMonthList: [
      {
        label: 'Change Comparison: 3 months',
        value: 3,
      },
      {
        label: 'Change Comparison: 6 months',
        value: 6,
      },
      {
        label: 'Change Comparison: 9 months',
        value: 9,
      },
      {
        label: 'Change Comparison: 1 year',
        value: 12,
      },
      {
        label: 'Change Comparison: 2 year',
        value: 24,
      },
    ],
    setValue_changeComparisionMonth: {
      label: 'Change Comparison: 3 months',
      value: 3,
    },
    isLoadingOwnership: true,
    ownershipLongShort_TrialStatus: false,

    ownershipLongInvestor_Data: [],
    ownershipLongInvestor_Heading: {},
    ownershipLongInvestor_Footer: [],
    ownershipLongInvestor_statusTop5: false,
    ownershipLongFund_Data: [],
    ownershipLongFund_Heading: {},
    ownershipLongFund_Footer: [],
    ownershipLongFund_statusTop5: false,
    ownershipShortInvestor_Data: [],
    ownershipShortInvestor_Heading: {},
    ownershipShortInvestor_Footer: [],
    ownershipShortInvestor_statusTop5: false,
    ownershipShortFund_Data: [],
    ownershipShortFund_Heading: {},
    ownershipShortFund_Footer: [],
    ownershipShortFund_statusTop5: false,
    invLongAccess: 0,
    invShortAccess: 0,
    invLongFund: null,
    invShortFund: null,
    // #endregion
  },
  reducers: {
    handleSetValueLatestOwnershipDate: {
      reducer(state, action) {
        state.isLoadingOwnership = true;
        if (action.payload.e === null) {
          state.setValue_latestOwnershipDate = {
            label: 'Latest Ownership',
            value: null,
          };
        } else {
          state.setValue_latestOwnershipDate = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetValueChangeComparisionMonth: {
      reducer(state, action) {
        state.isLoadingOwnership = true;
        if (action.payload.e === null) {
          state.setValue_changeComparisionMonth = {
            label: 'Change Comparison: 3 months',
            value: 3,
          };
        } else {
          state.setValue_changeComparisionMonth = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIsLoadingOwnership: {
      reducer(state) {
        state.isLoadingOwnership = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetAll: {
      reducer(state) {
        state.latestOwnershipDateList = [];
        state.setValue_latestOwnershipDate = {
          label: 'Latest Ownership',
          value: null,
        };
        state.changeComparisionMonthList = [
          {
            label: 'Change Comparison: 3 months',
            value: 3,
          },
          {
            label: 'Change Comparison: 6 months',
            value: 6,
          },
          {
            label: 'Change Comparison: 9 months',
            value: 9,
          },
          {
            label: 'Change Comparison: 1 year',
            value: 12,
          },
          {
            label: 'Change Comparison: 2 year',
            value: 24,
          },
        ];
        state.setValue_changeComparisionMonth = {
          label: 'Change Comparison: 3 months',
          value: 3,
        };
        state.isLoadingOwnership = true;
        state.ownershipLongShort_TrialStatus = false;
        state.ownershipLongInvestor_Data = [];
        state.ownershipLongInvestor_Heading = {};
        state.ownershipLongInvestor_Footer = [];
        state.ownershipLongInvestor_statusTop5 = false;
        state.ownershipLongFund_Data = [];
        state.ownershipLongFund_Heading = {};
        state.ownershipLongFund_Footer = [];
        state.ownershipLongFund_statusTop5 = false;
        state.ownershipShortInvestor_Data = [];
        state.ownershipShortInvestor_Heading = {};
        state.ownershipShortInvestor_Footer = [];
        state.ownershipShortInvestor_statusTop5 = false;
        state.ownershipShortFund_Data = [];
        state.ownershipShortFund_Heading = {};
        state.ownershipShortFund_Footer = [];
        state.ownershipShortFund_statusTop5 = false;
      },
      prepare() {
        return {};
      },
    },
  },
  extraReducers: {
    [getLatestOwnershipDateListReq.fulfilled]: (state, action) => {
      state.latestOwnershipDateList = [];
      state.latestOwnershipDateList = action.payload !== undefined ? action.payload.DateList : [];
    },
    [getOwnershipLongInvestorDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
      state.ownershipLongInvestor_Data = [];
      state.ownershipLongInvestor_Data = action.payload !== undefined ? action.payload.response.data : [];

      state.ownershipLongInvestor_Heading = [];
      state.ownershipLongInvestor_Heading = action.payload !== undefined ? action.payload.response.heading : [];

      state.ownershipLongInvestor_Footer = [];
      state.ownershipLongInvestor_Footer = action.payload !== undefined ? action.payload.response.dataFooter : [];

      state.ownershipLongInvestor_statusTop5 = [];
      state.ownershipLongInvestor_statusTop5 = action.payload !== undefined ? action.payload.response.statusTop5 : [];

      state.ownershipLongShort_TrialStatus = action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload = action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
      }
    },
    [getOwnershipLongFundDataReq.fulfilled]: (state, action) => {
      state.ownershipLongFund_Data = [];
      state.ownershipLongFund_Data = action.payload !== undefined ? action.payload.response.data : [];

      state.ownershipLongFund_Heading = [];
      state.ownershipLongFund_Heading = action.payload !== undefined ? action.payload.response.heading : [];

      state.ownershipLongFund_Footer = [];
      state.ownershipLongFund_Footer = action.payload !== undefined ? action.payload.response.dataFooter : [];

      state.ownershipLongFund_statusTop5 = [];
      state.ownershipLongFund_statusTop5 = action.payload !== undefined ? action.payload.response.statusTop5 : [];

      state.ownershipLongShort_TrialStatus = action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload = action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
    },
    [getOwnershipShortInvestorDataReq.fulfilled]: (state, action) => {
      state.ownershipShortInvestor_Data = [];
      state.ownershipShortInvestor_Data = action.payload !== undefined ? action.payload.response.data : [];

      state.ownershipShortInvestor_Heading = [];
      state.ownershipShortInvestor_Heading = action.payload !== undefined ? action.payload.response.heading : [];

      state.ownershipShortInvestor_Footer = [];
      state.ownershipShortInvestor_Footer = action.payload !== undefined ? action.payload.response.dataFooter : [];

      state.ownershipShortInvestor_statusTop5 = [];
      state.ownershipShortInvestor_statusTop5 = action.payload !== undefined ? action.payload.response.statusTop5 : [];

      state.ownershipLongShort_TrialStatus = action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload = action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
    },
    [getOwnershipShortFundDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
      state.ownershipShortFund_Data = [];
      state.ownershipShortFund_Data = action.payload !== undefined ? action.payload.response.data : [];

      state.ownershipShortFund_Heading = [];
      state.ownershipShortFund_Heading = action.payload !== undefined ? action.payload.response.heading : [];

      state.ownershipShortFund_Footer = [];
      state.ownershipShortFund_Footer = action.payload !== undefined ? action.payload.response.dataFooter : [];

      state.ownershipShortFund_statusTop5 = [];
      state.ownershipShortFund_statusTop5 = action.payload !== undefined ? action.payload.response.statusTop5 : [];

      state.ownershipLongShort_TrialStatus = action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload = action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
      }
    },
    [getInvestorOwnershipLongShortDataCheckReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.invLongAccess = action.payload.Long;
        state.invShortAccess = action.payload.Short;
        state.invLongFund = action.payload.LongFund;
        state.invShortFund = action.payload.ShortFund;
      }
    },
  },
});

export const {
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  handleIsLoadingOwnership,
  handleResetAll,
} = InvestorOwnershipSlice.actions;

export default InvestorOwnershipSlice.reducer;
