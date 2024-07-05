import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  ResolutionsByInvestorTrackerFilter,
  InvestorTrackerResultDetails,
  HistoricalTrendsChartData,
  HistoricalTrendsChartYTDData,
  ResolutionFilterByTotalVotesAnalysisYTD,
  ResolutionFilterByTotalProxySeasonVotesAnalysis,
  ResolutionFilterByTotalVotesAnalysis,
  HistoricalTrendsChartProxySeasonData,
  ResolutionTrackerFilterByHistoricalTrends,
} from '../../../utils/toolsResolutionTracker-util';
import InvestorComparatorConstant from '../../../constants/InvestorComparatorConstant';
import InvestorTrackerConstant from '../../../constants/InvestorTrackerConstant';
import resolutionTrackerToolConst from '../../../constants/ResolutionTrackerToolConstant';

export const resolutionsByInvestorTrackerFilterReq = createAsyncThunk(
  'resolutionsByInvestorTrackerFilterReq',
  async (req) => {
    const response = await ResolutionsByInvestorTrackerFilter(req);
    return response;
  }
);

export const investorTrackerResultDetailsReq = createAsyncThunk(
  'investorTrackerResultDetailsReq',
  async (req) => {
    const response = await InvestorTrackerResultDetails({
      startDate: req.startDate,
      endDate: req.endDate,
      meetingType: req.meetingType,
      proponent: req.proponent,
      sponsor: req.proposalSponsor,
      proposalType: req.proposalType,
      proposalTypeTopLevel: req.proposalTypeTopLevel,
      ProposalTypeSubLevel: req.ProposalTypeSubLevel,
      companySearchId: req.companySearchId,
      limited:
        InvestorTrackerConstant.INVESTOR_TRACKER_RESULT_FULL_DATA_LIMITED,
    });
    return response;
  }
);

export const investorTrackerResultDetailsFullDataReq = createAsyncThunk(
  'investorTrackerResultDetailsFullDataReq',
  async (req) => {
    const response = await InvestorTrackerResultDetails({
      startDate: req.startDate,
      endDate: req.endDate,
      meetingType: req.meetingType,
      proponent: req.proponent,
      sponsor: req.proposalSponsor,
      proposalType: req.proposalType,
      proposalTypeTopLevel: req.proposalTypeTopLevel,
      ProposalTypeSubLevel: req.ProposalTypeSubLevel,
      companySearchId: req.companySearchId,
      limited:
        InvestorTrackerConstant.INVESTOR_TRACKER_RESULT_FULL_DATA_LIMITED,
    });
    return response;
  }
);

//

export const historicalTrendsChartDataReq = createAsyncThunk(
  'historicalTrendsChartDataReq',
  async (req) => {
    const response = await HistoricalTrendsChartData(req);
    return response;
  }
);

export const historicalTrendsChartDataYTDReq = createAsyncThunk(
  'historicalTrendsChartDataYTDReq',
  async (req) => {
    const response = await HistoricalTrendsChartYTDData(req);
    return response;
  }
);

export const historicalTrendsChartProxySeasonDataReq = createAsyncThunk(
  'historicalTrendsChartProxySeasonDataReq',
  async (req) => {
    const response = await HistoricalTrendsChartProxySeasonData(req);
    return response;
  }
);

export const resolutionFilterByTotalVotesAnalysisReq = createAsyncThunk(
  'resolutionFilterByTotalVotesAnalysisReq',
  async (req) => {
    const response = await ResolutionFilterByTotalVotesAnalysis(req);
    return response;
  }
);

export const resolutionFilterByTotalVotesAnalysisYTDReq = createAsyncThunk(
  'resolutionFilterByTotalVotesAnalysisYTDReq',
  async (req) => {
    const response = await ResolutionFilterByTotalVotesAnalysisYTD(req);
    return response;
  }
);

export const resolutionFilterByTotalProxySeasonVotesAnalysisReq =
  createAsyncThunk(
    'resolutionFilterByTotalProxySeasonVotesAnalysisReq',
    async (req) => {
      const response = await ResolutionFilterByTotalProxySeasonVotesAnalysis(
        req
      );
      return response;
    }
  );

export const resolutionTrackerFilterByHistoricalTrendsReq = createAsyncThunk(
  'resolutionTrackerFilterByHistoricalTrendsReq',
  async (req) => {
    const response = await ResolutionTrackerFilterByHistoricalTrends(req);
    return response;
  }
);

const ToolsResolutionTrackerSlice = createSlice({
  name: 'toolsResolutionTracker',
  initialState: {
    isResolutionByInvestorFilterLoading: true,
    currentResolutionTypeSelection:
      InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
    lstResolutionByInvestorfilterData: [],
    lstResolutionByInvestorFilterFullData: [],

    // Result Details
    isShowResultDetails: false,
    isLoadingResultDetailsData: true,
    isLoadingResultDetailsFullData: true,
    lstResultDetails: [],
    lstResultDetailsFullDataForExcel: [],

    // Historical Trends
    ddlCalculationMethod: [
      {
        label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
        value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
      },
      {
        label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST,
        value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST,
      },
      {
        label:
          InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN,
        value:
          InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN,
      },
      {
        label:
          InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES,
        value:
          InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES,
      },
    ],
    ddlCalculationMethodSelection: {
      label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
      value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
    },
    isShowHistoricalTrends: false,
    isLoadingHistoricalTrendsData: true,

    isSelectedFullYearData: true,
    isSelectedYearToDateData: false,
    isSelectedProxySeasonData: false,

    lstHistoricalChartData: [],

    lstHistoricalAnalysisChartData: [],
    historicalTrendsVotesAnalysis: [],
    lstHistoricalAnalysisChartDataYTD: [],
    historicalTrendsVotesAnalysisYTD: [],
    lstHistoricalAnalysisChartProxySeasonData: [],
    historicalTrendsVotesProxySeasonAnalysis: [],

    lstHistoricalTrendsTotalVotesAnalysis: [],
    lstHistoricalTrendsTotalVotesAnalysisSummary: [],
    lstHistoricalTrendsTotalVotesAnalysisDetails: [],
    lstResolutionType: undefined,
    resolutionChartLevel: null,
    resolutionDdlData: null,
    resolutionMultiTableData: null,
  },
  reducers: {
    handleInvestorTrackerOptionsSelection: {
      reducer(state, action) {
        state.isLoadingInvestorDetails = true;
        state.resolutionMultiTableData = action.payload;
        const invCompVal =
          current(state).lstResolutionByInvestorFilterFullData.data;
        if (action.payload.lavel === 'proposal_type') {
          state.lstResolutionByInvestorfilterData = invCompVal.filter(
            (c) => c.proposal_type === action.payload.keyVal
          );
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE;
        }

        if (
          action.payload.lavel === 'proposal_top_level' &&
          action.payload.keyVal === 'All'
        ) {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL;
          state.lstResolutionByInvestorfilterData = invCompVal.filter(
            (c) =>
              c.proposal_top_level === null &&
              c.Category_Sub_level === null &&
              c.proposal_type === null
          );
        }

        if (
          action.payload.lavel === 'proposal_top_level' &&
          action.payload.keyVal !== 'All'
        ) {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL;
          state.lstResolutionByInvestorfilterData = invCompVal.filter(
            (c) =>
              c.proposal_top_level === action.payload.keyVal &&
              c.Category_Sub_level === null
          );
        }

        if (action.payload.lavel === 'Category_Sub_level') {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL;
          state.lstResolutionByInvestorfilterData = invCompVal.filter(
            (c) =>
              c.Category_Sub_level === action.payload.keyVal &&
              c.proposal_type === null
          );
        }

        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_MORE_DETAILS
        ) {
          state.isShowResultDetails = true;
          state.isShowHistoricalTrends = false;
        }
        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_TRENDS
        ) {
          state.isShowResultDetails = false;
          state.isShowHistoricalTrends = true;
        }
      },
      prepare(lavel, keyVal, invId, clickFor) {
        return {
          payload: { lavel, keyVal, invId, clickFor },
        };
      },
    },
    handleCloseResultsDetail: {
      reducer(state) {
        const allData =
          current(state).lstResolutionByInvestorFilterFullData.data;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
        state.lstResolutionByInvestorfilterData = allData;
        state.isShowResultDetails = false;
        state.isLoadingResultDetailsData = true;
        state.lstResultDetails = [];
        state.isShowHistoricalTrends = false;
        state.lstHistoricalChartData = [];
        state.lstHistoricalAnalysisChartData = [];
        state.lstHistoricalAnalysisChartDataYTD = [];
        state.lstHistoricalAnalysisChartProxySeasonData = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetHistoricalTrendsSelection: {
      reducer(state) {
        state.lstHistoricalChartData = [];
        state.isLoadingHistoricalTrendsData = true;
        state.isShowHistoricalTrends = false;

        state.isSelectedFullYearData = true;
        state.isSelectedYearToDateData = false;
        state.isSelectedProxySeasonData = false;

        state.historicalTrendsVotesAnalysisYTD = [];
        state.historicalTrendsVotesAnalysis = [];
        state.historicalTrendsVotesProxySeasonAnalysis = [];

        state.lstHistoricalTrendsTotalVotesAnalysis = [];
        state.lstHistoricalTrendsTotalVotesAnalysisSummary = [];
        state.lstHistoricalTrendsTotalVotesAnalysisDetails = [];
        state.resolutionChartLevel = null;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetHistoricalDetailsSelection: {
      reducer(state) {
        state.isShowResultDetails = false;
        state.isLoadingResultDetailsData = true;
        state.isLoadingResultDetailsFullData = true;
        state.lstResultDetails = [];
        state.lstResultDetailsFullDataForExcel = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetInvestorTrackerSearch: {
      reducer(state) {
        state.lstResolutionByInvestorfilterData = [];
        state.isResolutionByInvestorFilterLoading = true;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
        state.lstHistoricalChartData = [];
        state.isLoadingHistoricalTrendsData = true;
        state.lstHistoricalTrendsTotalVotesAnalysisSummary = [];
        state.lstHistoricalTrendsTotalVotesAnalysisDetails = [];
        state.isShowHistoricalTrends = false;
        state.isShowResultDetails = false;
        state.lstResultDetails = [];
        state.lstResultDetailsFullDataForExcel = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleOnChangedCalculationMethod: {
      reducer(state, action) {
        state.resolutionDdlData = action.payload.e;
        const voteAnalysis = current(state).historicalTrendsVotesAnalysis;
        const voteAnalysisYTD = current(state).historicalTrendsVotesAnalysisYTD;
        const voteAnalysisProxySeason =
          current(state).historicalTrendsVotesProxySeasonAnalysis;

        if (action.payload.e === null) {
          state.ddlCalculationMethodSelection = {
            label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
            value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
          };
          if (current(state).isSelectedFullYearData) {
            state.lstHistoricalTrendsTotalVotesAnalysisDetails =
              voteAnalysis.Sharesoutstanding;
          }
          if (current(state).isSelectedProxySeasonData) {
            state.lstHistoricalTrendsTotalVotesAnalysisDetails =
              voteAnalysisProxySeason.Sharesoutstanding;
          }
          if (current(state).isSelectedYearToDateData) {
            state.lstHistoricalTrendsTotalVotesAnalysisDetails =
              voteAnalysisYTD.Sharesoutstanding;
          }
        } else {
          state.ddlCalculationMethodSelection = action.payload.e;
          const labelSelected =
            action.payload.e !== undefined ? action.payload.e.label : '';
          if (current(state).isSelectedFullYearData) {
            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysis.Sharesoutstanding;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysis.ForAndAgainst;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysis.ForAgainstAndAbstain;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysis.ForAgainstAbstainandBrokerNonVotes;
            }
          }
          if (current(state).isSelectedProxySeasonData) {
            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisProxySeason.Sharesoutstanding;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisProxySeason.ForAndAgainst;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisProxySeason.ForAgainstAndAbstain;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisProxySeason.ForAgainstAbstainandBrokerNonVotes;
            }
          }
          if (current(state).isSelectedYearToDateData) {
            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisYTD.Sharesoutstanding;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisYTD.ForAndAgainst;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisYTD.ForAgainstAndAbstain;
            }

            if (
              labelSelected ===
              InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES
            ) {
              state.lstHistoricalTrendsTotalVotesAnalysisDetails =
                voteAnalysisYTD.ForAgainstAbstainandBrokerNonVotes;
            }
          }
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleOnClickIsSelectedFullYearData: {
      reducer(state, action) {
        let tableData = [];
        let chartData = [];
        const status = action.payload.e;
        state.resolutionChartLevel = action.payload.e;
        if (status === resolutionTrackerToolConst.USE_CALENDAR_YEAR_DATA) {
          state.isSelectedFullYearData = true;
          state.isSelectedYearToDateData = false;
          state.isSelectedProxySeasonData = false;
        }
        if (status === resolutionTrackerToolConst.USE_YEAR_TO_DATE_DATA) {
          state.isSelectedFullYearData = false;
          state.isSelectedYearToDateData = true;
          state.isSelectedProxySeasonData = false;
        }
        if (status === resolutionTrackerToolConst.USE_PROXY_SEASON_DATA) {
          state.isSelectedFullYearData = false;
          state.isSelectedYearToDateData = false;
          state.isSelectedProxySeasonData = true;
        }

        if (current(state).isSelectedFullYearData) {
          chartData = current(state).lstHistoricalAnalysisChartData;
          tableData = current(state).historicalTrendsVotesAnalysis;
        }
        if (current(state).isSelectedYearToDateData) {
          chartData = current(state).lstHistoricalAnalysisChartDataYTD;
          tableData = current(state).historicalTrendsVotesAnalysisYTD;
        }
        if (current(state).isSelectedProxySeasonData) {
          chartData = current(state).lstHistoricalAnalysisChartProxySeasonData;
          tableData = current(state).historicalTrendsVotesProxySeasonAnalysis;
        }
        state.lstHistoricalChartData = chartData;

        state.lstHistoricalTrendsTotalVotesAnalysis = tableData;
        state.lstHistoricalTrendsTotalVotesAnalysisSummary = tableData.Summary;
        state.lstHistoricalTrendsTotalVotesAnalysisDetails =
          tableData.Sharesoutstanding;

        state.ddlCalculationMethodSelection = {
          label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
          value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
        };
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetResolutionTrackerTool: {
      reducer(state) {
        state.isResolutionByInvestorFilterLoading = true;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
        state.lstResolutionByInvestorfilterData = [];
        state.lstResolutionByInvestorFilterFullData = [];

        // Result Details
        state.isShowResultDetails = false;
        state.isLoadingResultDetailsData = true;
        state.isLoadingResultDetailsFullData = true;
        state.lstResultDetails = [];
        state.lstResultDetailsFullDataForExcel = [];

        // Historical Trends
        state.ddlCalculationMethod = [
          {
            label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
            value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
          },
          {
            label:
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST,
            value:
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AND_AGAINST,
          },
          {
            label:
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN,
            value:
              InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_FOR_AGAINST_ABSTAIN,
          },
          {
            label:
              InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES,
            value:
              InvestorTrackerConstant.SHARES_FOR_AGAINST_ABSTAIN_BROKER_NON_VOTES,
          },
        ];
        state.ddlCalculationMethodSelection = {
          label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
          value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
        };
        state.isShowHistoricalTrends = false;
        state.isLoadingHistoricalTrendsData = true;

        state.isSelectedFullYearData = true;
        state.isSelectedYearToDateData = false;
        state.isSelectedProxySeasonData = false;

        state.lstHistoricalChartData = [];

        state.lstHistoricalAnalysisChartData = [];
        state.historicalTrendsVotesAnalysis = [];
        state.lstHistoricalAnalysisChartDataYTD = [];
        state.historicalTrendsVotesAnalysisYTD = [];
        state.lstHistoricalAnalysisChartProxySeasonData = [];
        state.historicalTrendsVotesProxySeasonAnalysis = [];

        state.lstHistoricalTrendsTotalVotesAnalysis = [];
        state.lstHistoricalTrendsTotalVotesAnalysisSummary = [];
        state.lstHistoricalTrendsTotalVotesAnalysisDetails = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handledChangeResolutionType: {
      reducer(state, action) {
        state.lstResolutionType = action.payload;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
  },
  extraReducers: {
    [resolutionsByInvestorTrackerFilterReq.fulfilled]: (state, action) => {
      console.log('allData', action.payload.data);
      state.lstResolutionByInvestorfilterData =
        action.payload !== undefined ? action.payload.data : [];
      state.lstResolutionByInvestorFilterFullData =
        action.payload !== undefined ? action.payload : [];
      state.isResolutionByInvestorFilterLoading = action.payload === undefined;
    },
    [investorTrackerResultDetailsReq.fulfilled]: (state, action) => {
      state.lstResultDetails =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingResultDetailsData = action.payload === undefined;
    },
    [investorTrackerResultDetailsFullDataReq.fulfilled]: (state, action) => {
      state.lstResultDetailsFullDataForExcel =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingResultDetailsFullData = action.payload === undefined;
    },

    // Calendar Year
    [historicalTrendsChartDataReq.fulfilled]: (state, action) => {
      state.lstHistoricalChartData =
        action.payload !== undefined ? action.payload.data : [];
      state.lstHistoricalAnalysisChartData =
        action.payload !== undefined ? action.payload.data : [];
    },
    [resolutionFilterByTotalVotesAnalysisReq.fulfilled]: (state, action) => {
      state.historicalTrendsVotesAnalysis =
        action.payload !== undefined ? action.payload.data : [];

      state.lstHistoricalTrendsTotalVotesAnalysis =
        action.payload !== undefined ? action.payload.data : [];
      state.lstHistoricalTrendsTotalVotesAnalysisSummary =
        action.payload !== undefined && action.payload.data !== undefined
          ? action.payload.data.Summary
          : [];
      state.lstHistoricalTrendsTotalVotesAnalysisDetails =
        action.payload !== undefined && action.payload.data !== undefined
          ? action.payload.data.Sharesoutstanding
          : [];
      state.isLoadingHistoricalTrendsData = action.payload === undefined;
    },

    // YTD
    [historicalTrendsChartDataYTDReq.fulfilled]: (state, action) => {
      state.lstHistoricalAnalysisChartDataYTD =
        action.payload !== undefined ? action.payload.data : [];
    },
    [resolutionFilterByTotalVotesAnalysisYTDReq.fulfilled]: (state, action) => {
      state.historicalTrendsVotesAnalysisYTD =
        action.payload !== undefined ? action.payload.data : [];
    },

    // ProxySeason
    [historicalTrendsChartProxySeasonDataReq.fulfilled]: (state, action) => {
      state.lstHistoricalAnalysisChartProxySeasonData =
        action.payload !== undefined ? action.payload.data : [];
    },
    [resolutionFilterByTotalProxySeasonVotesAnalysisReq.fulfilled]: (
      state,
      action
    ) => {
      state.historicalTrendsVotesProxySeasonAnalysis =
        action.payload !== undefined ? action.payload.data : [];
    },
    [resolutionTrackerFilterByHistoricalTrendsReq.fulfilled]: (
      state,
      action
    ) => {
      //Initialisation and Calander
      state.historicalTrendsVotesAnalysis =
        action.payload.FinancialAnalysis !== undefined
          ? action.payload.FinancialAnalysis
          : [];

      state.lstHistoricalTrendsTotalVotesAnalysis =
        action.payload.FinancialAnalysis !== undefined
          ? action.payload.FinancialAnalysis
          : [];
      state.lstHistoricalTrendsTotalVotesAnalysisSummary =
        action.payload.FinancialAnalysis !== undefined &&
        action.payload.FinancialAnalysis !== undefined
          ? action.payload.FinancialAnalysis.Summary
          : [];
      state.lstHistoricalTrendsTotalVotesAnalysisDetails =
        action.payload.FinancialAnalysis !== undefined &&
        action.payload.FinancialAnalysis !== undefined
          ? action.payload.FinancialAnalysis.Sharesoutstanding
          : [];
      state.isLoadingHistoricalTrendsData =
        action.payload.FinancialAnalysis === undefined;

      state.lstHistoricalChartData =
        action.payload.FinancialGraph !== undefined
          ? action.payload.FinancialGraph.data
          : [];
      state.lstHistoricalAnalysisChartData =
        action.payload.FinancialGraph !== undefined
          ? action.payload.FinancialGraph.data
          : [];

      //YTD
      state.historicalTrendsVotesAnalysisYTD =
        action.payload.YTDAnalysis !== undefined
          ? action.payload.YTDAnalysis
          : [];
      state.lstHistoricalAnalysisChartDataYTD =
        action.payload.YTDGraph !== undefined
          ? action.payload.YTDGraph.data
          : [];
      //PRoxy
      state.historicalTrendsVotesProxySeasonAnalysis =
        action.payload.ProxySeasonAnalysis !== undefined
          ? action.payload.ProxySeasonAnalysis
          : [];
      state.lstHistoricalAnalysisChartProxySeasonData =
        action.payload.ProxySeasonGraph !== undefined
          ? action.payload.ProxySeasonGraph.data
          : [];
    },
  },
});

export const {
  handleInvestorTrackerOptionsSelection,
  handleCloseResultsDetail,
  handleResetHistoricalTrendsSelection,
  handleResetHistoricalDetailsSelection,
  handleOnClickIsSelectedFullYearData,
  handleOnChangedCalculationMethod,
  handleResetInvestorTrackerSearch,
  handleResetResolutionTrackerTool,
  handledChangeResolutionType,
} = ToolsResolutionTrackerSlice.actions;

export default ToolsResolutionTrackerSlice.reducer;
