import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  // Overview
  GetActiviststrategyData,
  GetHoldingsbyCountryChartData,
  GetHoldingsbyIndustryChartData,
  GetHoldingsbyExitTypeChartData,
  GetHoldingsbyMarketCapChartData,
  GetActivistProfileData,
  GetCampaignTypesbyActivistLst,
  GetActivistOfficesLst,
  GetActivistPersonnelLst,
  GetActivistTimelineLst,
  GetActivistSharholderProposalsLst,

  // ACtivist Campaigns
  GetInvestorActivistCampaignsDataList,
  // Investments
  GetActivistHoldingsLst,
  Get13F_Filings_by_ActivistLst,

  // Demands
  GetActivistGBRCampaignsLst,
  GetCampaignSummarybyActivistLst,

  // Follower returns
  GetFollowerReturnsSearchLst,
  GetFollowerReturnsActivistStatschartData,
  GetFollowerReturnsActivistStatsData,

  // Performance
  GetPerformancePeriodicbyActivistLst,
  GetListofReprtingDate,
  GetPerformanceAnnualbyActivistLst,
  GetInvestorActivisamTabDataCheck,
} from '../../../utils/investorActivism-utils';
import {} from '../../../constants/InvestorActivistShortConstant';
import products from '../../../constants/ProductConstants';
import { HandleTrialLog, AllowDownload } from '../../../utils/general-util';
import numConst from '../../../constants/NumberConstants';
import { handleResetBreadcrumbs } from '../../General/TitleSlice';
import pathConst from '../../../constants/PathsConstant';

export const getActiviststrategyReq = createAsyncThunk(
  'getActiviststrategyReq',
  async (actid) => {
    const response = await GetActiviststrategyData(actid);
    return response;
  }
);

export const getHoldingsbyCountryChartDataReq = createAsyncThunk(
  'getHoldingsbyCountryChartDataReq',
  async (actid) => {
    const response = await GetHoldingsbyCountryChartData(actid);
    return response;
  }
);

export const getHoldingsbyIndustryChartDataReq = createAsyncThunk(
  'getHoldingsbyIndustryChartDataReq',
  async (actid) => {
    const response = await GetHoldingsbyIndustryChartData(actid);
    return response;
  }
);

export const getHoldingsbyExitTypeChartDataReq = createAsyncThunk(
  'getHoldingsbyExitTypeChartDataReq',
  async (actid) => {
    const response = await GetHoldingsbyExitTypeChartData(actid);
    return response;
  }
);

export const getHoldingsbyMarketCapChartDataReq = createAsyncThunk(
  'getHoldingsbyMarketCapChartDataReq',
  async (actid) => {
    const response = await GetHoldingsbyMarketCapChartData(actid);
    return response;
  }
);

export const getActivistProfileDataReq = createAsyncThunk(
  'getActivistProfileDataReq',
  async (actid) => {
    const response = await GetActivistProfileData(actid);
    return response;
  }
);

export const getCampaignTypesbyActivistLstReq = createAsyncThunk(
  'getCampaignTypesbyActivistLstReq',
  async (actid) => {
    const response = await GetCampaignTypesbyActivistLst(actid);
    return response;
  }
);

export const getActivistOfficesLstReq = createAsyncThunk(
  'getActivistOfficesLstReq',
  async (actid) => {
    const response = await GetActivistOfficesLst(actid);
    return response;
  }
);

export const getActivistPersonnelLstReq = createAsyncThunk(
  'getActivistPersonnelLstReq',
  async (actid) => {
    const response = await GetActivistPersonnelLst(actid);
    return response;
  }
);

export const getActivistTimelineLstReq = createAsyncThunk(
  'getActivistTimelineLstReq',
  async (actid) => {
    const response = await GetActivistTimelineLst(actid);
    return response;
  }
);

export const getActivistSharholderProposalsLstReq = createAsyncThunk(
  'getActivistSharholderProposalsLstReq',
  async (actid) => {
    const response = await GetActivistSharholderProposalsLst(actid);
    return response;
  }
);

// Investments
export const getActivistHoldingsLstReq = createAsyncThunk(
  'getActivistHoldingsLstReq',
  async (actid) => {
    const response = await GetActivistHoldingsLst(actid);
    return response;
  }
);

export const get13F_Filings_by_ActivistLstReq = createAsyncThunk(
  'get13F_Filings_by_ActivistLstReq',
  async (actid) => {
    const response = await Get13F_Filings_by_ActivistLst(actid);
    return response;
  }
);

// Demands
export const getActivistGBRCampaignsLstReq = createAsyncThunk(
  'getActivistGBRCampaignsLstReq',
  async (actid) => {
    const response = await GetActivistGBRCampaignsLst(actid);
    return response;
  }
);

export const getCampaignSummarybyActivistLstReq = createAsyncThunk(
  'getCampaignSummarybyActivistLstReq',
  async (actid) => {
    const response = await GetCampaignSummarybyActivistLst(actid);
    return response;
  }
);

// Follower returns

export const getFollowerReturnsSearchLstReq = createAsyncThunk(
  'getFollowerReturnsSearchLstReq',
  async (res) => {
    const response = await GetFollowerReturnsSearchLst(res);
    return response;
  }
);

export const getFollowerReturnsActivistStatschartDataReq = createAsyncThunk(
  'getFollowerReturnsActivistStatschartDataReq',
  async (actid) => {
    const response = await GetFollowerReturnsActivistStatschartData(actid);
    return response;
  }
);

export const getFollowerReturnsActivistStatsDataReq = createAsyncThunk(
  'getFollowerReturnsActivistStatsDataReq',
  async (actid) => {
    const response = await GetFollowerReturnsActivistStatsData(actid);

    return response;
  }
);

// Performane
export const getPerformancePeriodicbyActivistLstReq = createAsyncThunk(
  'getPerformancePeriodicbyActivistLstReq',
  async (req) => {
    const response = await GetPerformancePeriodicbyActivistLst(
      req.actid,
      req.dateReported
    );
    return response;
  }
);

export const getListofReprtingDateReq = createAsyncThunk(
  'getListofReprtingDateReq',
  async (actid) => {
    const response = await GetListofReprtingDate(actid);
    if (!response.length > 0) {
      return { response };
    }
    const resDate = response[response.length - 1];
    let lastdate = {};
    lastdate = [
      { label: resDate.date_reported1, value: resDate.date_reported },
    ];
    return { response, lastdate };
  }
);

export const getPerformanceAnnualbyActivistLstReq = createAsyncThunk(
  'getPerformanceAnnualbyActivistLstReq',
  async (actid) => {
    const response = await GetPerformanceAnnualbyActivistLst(actid);
    return response;
  }
);

// Activist Campaigns

export const getInvestorActivistCampaignsDataListReq = createAsyncThunk(
  'GetInvestorActivistCampaignsDataList',
  async (req) => {
    let TrialStatus = false;
    const productsId = products.ACTIVISM;
    const { SetDDLCampaign } = req;
    let response = [];

    const resTrial = await HandleTrialLog(productsId); // Trial User Check
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option

    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }
    response = await GetInvestorActivistCampaignsDataList(req);

    if (SetDDLCampaign === undefined) {
      return {
        data: {
          overviewData: [
            response.table_InvestorActivistCampaignTimeline,
            response.table_InvestorActivistCampaignSummary,
          ],
        },
      };
    }
    const table_InvestorActivistCampaignSummary = updateStateTable(
      response.table_InvestorActivistCampaignSummary,
      SetDDLCampaign
    );
    const table_PublicDemandDetail = updateStateTable(
      response.table_PublicDemandDetail,
      SetDDLCampaign
    );
    const table_InvestorActivistCampaignCharacteristics = updateStateTable(
      response.table_InvestorActivistCampaignCharacteristics,
      SetDDLCampaign
    );
    const table_Filings = updateStateTable(
      response.table_Filings,
      SetDDLCampaign
    );
    const table_InvestorActivistCampaignTimeline = updateStateTable(
      response.table_InvestorActivistCampaignTimeline,
      SetDDLCampaign
    );
    const header_InvestorActivistCampaignSummary =
      response.header_InvestorActivistCampaignSummary;
    const table_InvestorTheses = updateStateTable(
      response.table_InvestorTheses,
      SetDDLCampaign
    );
    const table_InvestorShareholderProposals = updateStateTable(
      response.table_InvestorShareholderProposals,
      SetDDLCampaign
    );
    const table_InvestorAdvisors = updateStateTable(
      response.table_InvestorAdvisors,
      SetDDLCampaign
    );
    const table_InvestorStockPerformance = updateStateTable(
      response.table_InvestorStockPerformance,
      SetDDLCampaign
    );
    const table_InvestorNews = updateStateTable(
      response.table_InvestorNews,
      SetDDLCampaign
    );

    const table_NewsId = response.table_NewsId;

    const DDLCampaign = response.myJsonDDLNewCampaign;

    if (SetDDLCampaign !== undefined) {
      const responseObj = {
        data: {
          table_InvestorActivistCampaignSummary,
          table_PublicDemandDetail,
          header_InvestorActivistCampaignSummary,
          table_InvestorActivistCampaignCharacteristics,
          table_Filings,
          table_InvestorActivistCampaignTimeline,
          table_InvestorTheses,
          table_InvestorShareholderProposals,
          table_InvestorAdvisors,
          table_InvestorStockPerformance,
          table_InvestorNews,
          table_NewsId,
          DDLCampaign,
        },
        trialStatus: TrialStatus,
        allowDownload: resAllowDownload,
      };
      return responseObj;
    }
    return response;
  }
);

// #region Activism Access
export const GetInvestorActivisamTabDataCheckReq = createAsyncThunk('GetInvestorActivisamTabDataCheckReq', async (res) => {
  const response = await GetInvestorActivisamTabDataCheck(res);
  return response;
});

function updateStateTable(table, selectedNodes) {
  let arr = [];
  if (selectedNodes.length > 0) {
    table.forEach((x) => {
      arr.push({
        ...x,
        rowHighlight: selectedNodes.some(
          (itemDDL) => itemDDL.label === x.campaign_name
        ),
      });
    });
  }
  if (
    selectedNodes.length === numConst.EMPTY_TABLE_LENGTH ||
    (selectedNodes[0] !== undefined && selectedNodes[0].value === null)
  ) {
    arr = [];
    table.forEach((x) => {
      arr.push({ ...x, rowHighlight: false });
    });
  }
  return arr;
}

const InvestorActivismSlice = createSlice({
  name: 'InvestorActivismSlice',
  initialState: {
    // investor activist campaign
    table_InvestorActivistCampaignSummary: [],
    header_InvestorActivistCampaignSummary: [],
    table_PublicDemandDetail: [],
    table_InvestorActivistCampaignCharacteristics: [],
    table_Filings: [],
    table_InvestorActivistCampaignTimeline: [],
    table_InvestorTheses: [],
    table_InvestorShareholderProposals: [],
    table_InvestorAdvisors: [],
    table_InvestorStockPerformance: [],
    table_InvestorActivismOverviewTimeline: [],
    table_InvestorActivismOverviewSummary: [],
    table_InvestorNews: [],
    table_NewsId: [],
    DDLCampaign: [],
    SetDDLCampaign: [{ label: 'All', value: null }],
    DDLValues: null,

    chkCampaign: false,
    trialStatus: false,
    allowDownload: true,
    isLoading: true,

    // Overview
    activismStrategyData: {},
    holdingsbyCountryChartData: [],
    holdingsbyIndustryChartData: [],
    holdingsbyExitTypeChartData: [],
    holdingsbyMarketCapChartData: [],
    activistProfileData: [],
    investmentStrategy: '',
    lstCampaignTypesbyActivist: [],
    lstActivistOffices: [],
    lstActivistPersonnel: [],
    lstActivistTimeline: [],
    lstActivistSharholderProposals: [],
    // Investments
    lstActivistHoldings: [],
    lst13F_Filings_by_Activist: [],
    // Demands
    lstActivistGBRCampaigns: [],
    lstCampaignSummarybyActivist: [],
    // Foloower returns
    lstFollowerReturnsSearch_exited: [],
    lstFollowerReturnsSearch_current: [],
    lstFollowerReturnsSearch_date: '',
    FollowerReturnsActivistStatschartData: [],
    FollowerReturnsActivistStatsData: [],

    // performane
    lstPerformancePeriodicbyActivist: [],
    lstofReprtingDate: [],
    reportedDate: undefined,
    latestdate: [],
    lstPerformanceAnnualbyActivist: [],
    accessPerformance: false,
    accessDemand: false,

    accessFollowerAccess: false,
    accessInvFilings: false,
    lstActivistPersonnelNew: [],
  },
  reducers: {
    handleChangeDate: {
      reducer(state, action) {
        if (action.payload.e === null) {
          state.reportedDate = current(state).latestdate[0];
        } else {
          state.reportedDate = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetChkCampaign: {
      reducer(state, action) {
        state.chkCampaign = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetCampaignDDL: {
      reducer(state, action) {
        if (
          action.payload.selectedNodes !== null &&
          action.payload.selectedNodes.length > 0
        ) {
          if (action.payload.selectedNodes[0].value == null) {
            state.SetDDLCampaign = action.payload.selectedNodes.slice(1);
          } else {
            state.SetDDLCampaign = action.payload.selectedNodes;
          }
        } else {
          state.SetDDLCampaign = [{ label: 'All', value: null }];
        }
        const values = state.SetDDLCampaign.map((x) => x.value).toString();
        if (values !== '' && values !== '0') {
          state.DDLValues = values;
        } else {
          state.DDLValues = null;
        }

        const {
          table_InvestorActivistCampaignSummary,
          table_PublicDemandDetail,
          table_InvestorActivistCampaignCharacteristics,
          table_Filings,
          table_InvestorActivistCampaignTimeline,
          table_InvestorTheses,
          table_InvestorShareholderProposals,
          table_InvestorAdvisors,
          table_InvestorStockPerformance,
          table_InvestorNews,
        } = current(state);

        state.table_InvestorActivistCampaignSummary = updateStateTable(
          table_InvestorActivistCampaignSummary,
          current(state).SetDDLCampaign
        );
        state.table_PublicDemandDetail = updateStateTable(
          table_PublicDemandDetail,
          current(state).SetDDLCampaign
        );
        state.table_InvestorActivistCampaignCharacteristics = updateStateTable(
          table_InvestorActivistCampaignCharacteristics,
          current(state).SetDDLCampaign
        );
        state.table_Filings = updateStateTable(
          table_Filings,
          current(state).SetDDLCampaign
        );
        state.table_InvestorActivistCampaignTimeline = updateStateTable(
          table_InvestorActivistCampaignTimeline,
          current(state).SetDDLCampaign
        );
        state.table_InvestorTheses = updateStateTable(
          table_InvestorTheses,
          current(state).SetDDLCampaign
        );
        state.table_InvestorShareholderProposals = updateStateTable(
          table_InvestorShareholderProposals,
          current(state).SetDDLCampaign
        );
        state.table_InvestorAdvisors = updateStateTable(
          table_InvestorAdvisors,
          current(state).SetDDLCampaign
        );
        state.table_InvestorStockPerformance = updateStateTable(
          table_InvestorStockPerformance,
          current(state).SetDDLCampaign
        );
        state.table_InvestorNews = updateStateTable(
          table_InvestorNews,
          current(state).SetDDLCampaign
        );
      },
      prepare(selectedNodes) {
        return {
          payload: { selectedNodes },
        };
      },
    },
    handleIsLoading: {
      reducer(state, action) {
        state.isLoading = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetInvestorActivismCharts: {
      reducer(state) {
        state.holdingsbyCountryChartData = [];
        state.holdingsbyIndustryChartData = [];
        state.holdingsbyExitTypeChartData = [];
        state.holdingsbyMarketCapChartData = [];
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetInvestorFollowerReturns: {
      reducer(state) {
        state.lstFollowerReturnsSearch = [];
        state.FollowerReturnsActivistStatschartData = [];
        state.FollowerReturnsActivistStatsData = [];
        state.isLoading = true;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetActivismOverview: {
      reducer(state) {
        state.activismStrategyData = {};
        state.holdingsbyCountryChartData = [];
        state.holdingsbyIndustryChartData = [];
        state.holdingsbyExitTypeChartData = [];
        state.holdingsbyMarketCapChartData = [];
        state.activistProfileData = [];
        state.investmentStrategy = '';
        state.lstCampaignTypesbyActivist = [];
        state.lstActivistOffices = [];
        state.lstActivistPersonnel = [];
        state.lstActivistPersonnelNew = [];
        state.lstActivistTimeline = [];
        state.lstActivistSharholderProposals = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
    handleResetActivistCampaign: {
      reducer(state) {
        state.table_InvestorActivistCampaignSummary = [];
        state.header_InvestorActivistCampaignSummary = [];
        state.table_PublicDemandDetail = [];
        state.table_InvestorActivistCampaignCharacteristics = [];
        state.table_Filings = [];
        state.table_InvestorActivistCampaignTimeline = [];
        state.table_InvestorTheses = [];
        state.table_InvestorShareholderProposals = [];
        state.table_InvestorAdvisors = [];
        state.table_InvestorStockPerformance = [];
        state.table_InvestorActivismOverviewTimeline = [];
        state.table_InvestorActivismOverviewSummary = [];
        state.DDLCampaign = [];
        state.table_InvestorNews = [];
        state.table_NewsId = [];
        state.SetDDLCampaign = [{ label: 'All', value: null }];
        state.DDLValues = null;
        state.chkCampaign = false;
        state.trialStatus = false;
        state.allowDownload = true;
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
    handleResetActivistInvestment: {
      reducer(state) {
        state.lstActivistHoldings = [];
        state.lst13F_Filings_by_Activist = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
    handleResetActivistDemands: {
      reducer(state) {
        state.lstActivistGBRCampaigns = [];
        state.lstCampaignSummarybyActivist = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
    handleResetActivismFollowerReturn: {
      reducer(state) {
        state.lstFollowerReturnsSearch_current = [];
        state.lstFollowerReturnsSearch_date = '';
        state.lstFollowerReturnsSearch_exited = [];
        state.FollowerReturnsActivistStatschartData = [];
        state.FollowerReturnsActivistStatsData = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
    handleResetActivistPerformance: {
      reducer(state) {
        state.lstPerformanceAnnualbyActivist = [];
        state.lstPerformancePeriodicbyActivist = [];
        state.lstofReprtingDate = [];
        state.reportedDate = undefined;
        state.latestdate = [];
        state.isLoading = true;
      },
      prepare() {
        return {};
      },
    },
    handleUpdateContactData: {
      reducer(state, action) {
        state.lstActivistPersonnelNew = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
         };
      }
    }
  },

  extraReducers: {
    [getActiviststrategyReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.activismStrategyData = action.payload[0];
      }
    },
    [getHoldingsbyCountryChartDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.holdingsbyCountryChartData = action.payload;
      }
    },
    [getHoldingsbyIndustryChartDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.holdingsbyIndustryChartData = action.payload;
      }
    },
    [getHoldingsbyExitTypeChartDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.holdingsbyExitTypeChartData = action.payload;
      }
    },
    [getHoldingsbyMarketCapChartDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.holdingsbyMarketCapChartData = action.payload;
      }
    },
    [getActivistProfileDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.activistProfileData = action.payload[0];
        state.investmentStrategy = action.payload[0].strategy_about;
      }
    },
    [getCampaignTypesbyActivistLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstCampaignTypesbyActivist = action.payload;
      }
    },
    [getActivistOfficesLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstActivistOffices = action.payload;
      }
      state.isLoading = action.payload === undefined;
    },
    [getActivistPersonnelLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstActivistPersonnel = [];
        state.lstActivistPersonnel = action.payload;
      }
    },
    [getActivistTimelineLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstActivistTimeline = action.payload;
      }
    },
    [getActivistSharholderProposalsLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstActivistSharholderProposals = action.payload;
      }
    },
    [getActivistHoldingsLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstActivistHoldings = action.payload;
      }
    },
    [get13F_Filings_by_ActivistLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lst13F_Filings_by_Activist = action.payload;
      }
      state.isLoading = action.payload === undefined;
    },
    [getActivistGBRCampaignsLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstActivistGBRCampaigns = action.payload;
      }
      state.isLoading = false;
    },
    [getActivistGBRCampaignsLstReq.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCampaignSummarybyActivistLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstCampaignSummarybyActivist = action.payload;
      }
      // state.isLoading = action.payload === undefined;
    },
    [getFollowerReturnsSearchLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstFollowerReturnsSearch_exited = action.payload.result_exited;
        state.lstFollowerReturnsSearch_current = action.payload.result_current;
      }
    },
    [getFollowerReturnsActivistStatschartDataReq.fulfilled]: (
      state,
      action
    ) => {
      if (action.payload !== false) {
        state.FollowerReturnsActivistStatschartData = action.payload;
      }
    },
    [getFollowerReturnsActivistStatsDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.FollowerReturnsActivistStatsData = action.payload;

        // state.accessFollowerAccess =
        //   state.lstFollowerReturnsSearch_exited.length === numConst.EMPTY_TABLE_LENGTH &&
        //   state.lstFollowerReturnsSearch_current.length === numConst.EMPTY_TABLE_LENGTH &&
        //   state.FollowerReturnsActivistStatschartData.length === numConst.EMPTY_TABLE_LENGTH &&
        //   Object.keys(state.FollowerReturnsActivistStatsData).length === numConst.EMPTY_TABLE_LENGTH;
      }
    },
    [getPerformancePeriodicbyActivistLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstPerformancePeriodicbyActivist = action.payload;
      }
      state.isLoading = action.payload === undefined;
    },
    [getListofReprtingDateReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstofReprtingDate = action.payload.response;
        state.latestdate = action.payload.lastdate;
        // state.reportedDate = action.payload.lastdate[0];
        if (action.payload.response.length > 0) {
          state.accessPerformance = true;
        } else {
          state.accessPerformance = false;
        }
      }
    },
    [getPerformanceAnnualbyActivistLstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstPerformanceAnnualbyActivist = action.payload;
        state.accessPerformance = true;
      }
      state.isLoading = action.payload === undefined;
    },
    [getInvestorActivistCampaignsDataListReq.fulfilled]: (state, action) => {
      if (!action.payload.data.overviewData) {
        state.DDLCampaign =
          action.payload !== undefined ? action.payload.data.DDLCampaign : [];
        state.table_InvestorActivistCampaignSummary =
          action.payload !== undefined
            ? action.payload.data.table_InvestorActivistCampaignSummary
            : [];
        state.table_PublicDemandDetail =
          action.payload !== undefined
            ? action.payload.data.table_PublicDemandDetail
            : [];
        state.header_InvestorActivistCampaignSummary =
          action.payload !== undefined
            ? action.payload.data.header_InvestorActivistCampaignSummary
            : [];
        state.table_InvestorActivistCampaignCharacteristics =
          action.payload !== undefined
            ? action.payload.data.table_InvestorActivistCampaignCharacteristics
            : [];
        state.table_Filings =
          action.payload !== undefined ? action.payload.data.table_Filings : [];
        state.table_InvestorActivistCampaignTimeline =
          action.payload !== undefined
            ? action.payload.data.table_InvestorActivistCampaignTimeline
            : [];
        state.table_InvestorTheses =
          action.payload !== undefined
            ? action.payload.data.table_InvestorTheses
            : [];
        state.table_InvestorShareholderProposals =
          action.payload !== undefined
            ? action.payload.data.table_InvestorShareholderProposals
            : [];
        state.table_InvestorAdvisors =
          action.payload !== undefined
            ? action.payload.data.table_InvestorAdvisors
            : [];
        state.table_InvestorStockPerformance =
          action.payload !== undefined
            ? action.payload.data.table_InvestorStockPerformance
            : [];
        state.table_InvestorNews =
          action.payload !== undefined
            ? action.payload.data.table_InvestorNews
            : [];
        state.table_NewsId =
          action.payload !== undefined ? action.payload.data.table_NewsId : [];

        state.trialStatus =
          action.payload !== undefined ? action.payload.trialStatus : false;
        state.allowDownload =
          action.payload !== undefined ? action.payload.allowDownload : true;
        state.isLoading = action.payload === undefined;
      } else {
        state.table_InvestorActivismOverviewTimeline =
          action.payload !== undefined
            ? action.payload.data.overviewData[0]
            : [];
        state.table_InvestorActivismOverviewSummary =
          action.payload !== undefined
            ? [].concat(action.payload.data.overviewData[1]).reverse()
            : [];
        state.isLoading = action.payload === undefined;
      }
    },
    [GetInvestorActivisamTabDataCheckReq.fulfilled]: (state, action) => {
      state.accessDemand = action.payload.Demand;
      state.accessFollowerAccess = action.payload.FollowerReturn;
      state.accessInvFilings = action.payload.Filling;
      state.accessPerformance = action.payload.performance;
    },
  }
});

export const {
  handleChangeDate,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  handleResetInvestorActivismCharts,
  handleResetInvestorFollowerReturns,
  handleResetActivismOverview,
  handleResetActivistCampaign,
  handleResetActivistInvestment,
  handleResetActivistDemands,
  handleResetActivismFollowerReturn,
  handleResetActivistPerformance,
  handleUpdateContactData
} = InvestorActivismSlice.actions;

export default InvestorActivismSlice.reducer;
