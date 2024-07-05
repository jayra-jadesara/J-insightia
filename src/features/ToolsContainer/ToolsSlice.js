import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { timeParse } from 'd3';
import {
  PublicCampaignToolLists,
  HoldingsDataAndAnalyticsList,
  getGlobalGovProvisionList,
  getCountryGovList,
  getStateGovDetailList,
  getStateGovList,
  GetGlobalGovToolTrialList,
  GetPerformanceOverviewV2,
  GetPerformanceCompounded,
  ListFundPerformanceByYearV2,
  getVCId,
  GetVulDataList,
  GetAllMeetingTypes,
  GetAllIndividualProponent,
  ResolutionsByInvestorFilter,
  ResolutionsByTarget,
  ResolutionSearchByInvestor,
  GetHistoricalTrends,
  GetResolutionsTypeIdByName,
  GetInvestorVotingPower,
  getVulDDL,
  GetAllGroupProponent,
  GetDirectorSectorAndIndustrySearchData,
  GetActivistCampaignsTool,
} from '../../utils/tools-util';

import {
  AllowDownload,
  HandleTrialLog,
  TokenDecode,
  TokenDecodeForProductStatus,
  oneChildtreeView,
  twoLayerTreeView,
  GetDefaultStartAndEndDate,
  getTreeViewDDLSelection,
} from '../../utils/general-util';
import { GetPeerGroupsData } from '../../utils/preferences-util';
// import { ResponsiveEmbed } from 'react-bootstrap';
import prodConst, {
  ACTIVISM,
  ACTIVIST_SHORTS,
  ACTIVIST_VULNERABILITY,
  GOVERNANCE,
  VOTING,
} from '../../constants/ProductConstants';
import InvestorComparatorConstant from '../../constants/InvestorComparatorConstant';
import {
  NUMBER_FOUR,
  NUMBER_TWO,
  NUMBER_ZERO,
} from '../../constants/NumberConstants';
import resolutionTrackerToolConst from '../../constants/ResolutionTrackerToolConstant';
import InvestorTrackerConstant from '../../constants/InvestorTrackerConstant';

const { startDate, endDate } = GetDefaultStartAndEndDate();
const CHECKED_ALL = 'checked all';
// Public demand Tool
export const PublicCampaignToolListsReq = createAsyncThunk(
  'PublicCampaignToolLists',
  async (res) => {
    const response = await PublicCampaignToolLists(
      res.status,
      res.product_id,
      res.cancelToken
    );
    const resAllowDownload = await AllowDownload(res.product_id); // Allow Download Option
    const responseObj = {
      response,
      trialStatus: response.trialStatus,
      statusIcon: response.statusIcon,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

export const HoldingsDataAndAnalyticsListReq = createAsyncThunk(
  'HoldingsDataAndAnalyticsList',
  async (req) => {
    const response = await HoldingsDataAndAnalyticsList(req);
    const responseObj = {
      response,
    };
    return responseObj;
  }
);

// Global Gov Tool
export const getGlobalGovProvisionListReq = createAsyncThunk(
  'getGlobalGovProvisionList',
  async () => {
    let TrialStatus = false;
    const productId = prodConst.GOVERNANCE;
    // Trial User Check
    const resTrial = await HandleTrialLog(productId);
    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }

    const response = await getGlobalGovProvisionList();
    const resAllowDownload = await AllowDownload(productId); // Allow Download Option
    const responseObj = {
      response,
      trialStatus: TrialStatus,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

export const getCountryGovListReq = createAsyncThunk(
  'getCountryGovList',
  async (country_id) => {
    let TrialStatus = false;
    const productId = prodConst.GOVERNANCE;
    // Trial User Check
    const resTrial = await HandleTrialLog(productId);
    const resAllowDownload = await AllowDownload(productId); // Allow Download Option

    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }
    let response;
    let responseObj;
    if (TrialStatus) {
      response = await GetGlobalGovToolTrialList();
      responseObj = {
        response: {
          countryProfileDetails:
            response.data.getCountryGovList.countryProfileDetails,
          overviewDetails: response.data.getCountryGovList.overviewDetails,
          documentsDetails: response.data.getCountryGovList.documentsDetails,
          boardDetails: response.data.getCountryGovList.boardDetails,
          votingDetails: response.data.getCountryGovList.votingDetails,
          generalGovDetails: response.data.getCountryGovList.generalGovDetails,
          shareholderActDetails:
            response.data.getCountryGovList.shareholderActDetails,
          govTakeoverDetails:
            response.data.getCountryGovList.govTakeoverDetails,
          provisionDetails: response.data.getCountryGovList.provisionDetails,
        },
        trialStatus: TrialStatus,
        allowDownload: resAllowDownload,
      };
    } else {
      response = await getCountryGovList(country_id);
      responseObj = {
        response: {
          countryProfileDetails: response.countryProfileDetails,
          overviewDetails: response.overviewDetails,
          documentsDetails: response.documentsDetails,
          boardDetails: response.boardDetails,
          votingDetails: response.votingDetails,
          generalGovDetails: response.generalGovDetails,
          shareholderActDetails: response.shareholderActDetails,
          govTakeoverDetails: response.govTakeoverDetails,
          provisionDetails: response.provisionDetails,
        },
        trialStatus: TrialStatus,
        allowDownload: resAllowDownload,
      };
    }
    return responseObj;
  }
);

export const getStateGovListReq = createAsyncThunk(
  'getStateGovList',
  async (filterType) => {
    let TrialStatus = false;
    const productId = prodConst.GOVERNANCE;
    // Trial User Check
    const resTrial = await HandleTrialLog(productId);
    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }
    const responseStateGovList = await getStateGovList(filterType);
    const resAllowDownload = await AllowDownload(productId); // Allow Download Option
    const responseObj = {
      response: responseStateGovList,
      trialStatus: TrialStatus,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

export const getStateGovDetailsListReq = createAsyncThunk(
  'getStateGovDetailList',
  async (state_name) => {
    let TrialStatus = false;
    const productId = prodConst.GOVERNANCE;
    // Trial User Check
    const resTrial = await HandleTrialLog(productId);
    const resAllowDownload = await AllowDownload(productId); // Allow Download Option

    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }
    let response;
    let responseObj;
    if (TrialStatus) {
      response = await GetGlobalGovToolTrialList();
      responseObj = {
        response: {
          descDetails: response.data.getStateGovDetailList.descDetails,
          boardDetails: response.data.getStateGovDetailList.boardDetails,
          shareholderDetails:
            response.data.getStateGovDetailList.shareholderDetails,
          votingDetails: response.data.getStateGovDetailList.votingDetails,
          mnDetails: response.data.getStateGovDetailList.mnDetails,
        },
        trialStatus: TrialStatus,
        allowDownload: resAllowDownload,
      };
    } else {
      response = await getStateGovDetailList(state_name);
      responseObj = {
        response: {
          descDetails: response.descDetails,
          boardDetails: response.boardDetails,
          shareholderDetails: response.shareholderDetails,
          votingDetails: response.votingDetails,
          mnDetails: response.mnDetails,
        },
        trialStatus: TrialStatus,
        allowDownload: resAllowDownload,
      };
    }
    return responseObj;
  }
);

// Performance Tools - Annual Performance
export const getPerformanceOverviewV2Req = createAsyncThunk(
  'GetPerformanceOverviewV2',
  async () => {
    const response = await GetPerformanceOverviewV2();
    return response;
  }
);

// Performance Tools - Annual Compounded GetPerformanceCompounded
export const getPerformanceCompoundedReq = createAsyncThunk(
  'GetPerformanceCompounded',
  async () => {
    const response = await GetPerformanceCompounded();
    return response;
  }
);

// ListFundPerformanceByYearV2 - for Annual performance and Annual Compounded
export const getListFundPerformanceByYearV2Req = createAsyncThunk(
  'ListFundPerformanceByYearV2',
  async (Year) => {
    const response = await ListFundPerformanceByYearV2(Year);
    return response;
  }
);

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const getTokenDecodeForProductStatus = createAsyncThunk(
  'getTokenDecodeForProductStatus',
  async () => {
    const response = await TokenDecodeForProductStatus();
    return response;
  }
);

// Activist Campaign Tool
export const getActivistCampaignsToolReq = createAsyncThunk(
  'getActivistCampaignsToolReq',
  async (req) => {
    const response = await GetActivistCampaignsTool(req);
    return response;
  }
);

// Vul Tool

export const getVulDDLReq = createAsyncThunk('getVulDDL', async () => {
  const response = await getVulDDL();
  return response;
});
export const getPeerGroupDataReq = createAsyncThunk(
  'toolsGetPeerGroupDataReq',
  async (req) => {
    const responsePeerGroups = await GetPeerGroupsData();
    return {
      responsePeerGroups,
      companyOption: req.comp,
      investerOption: req.inve,
    };
  }
);

export const getVCIdReq = createAsyncThunk('getVCId', async (res) => {
  const response = await getVCId(res);
  return response;
});
export const getVulDataListReq = createAsyncThunk(
  'GetVulDataList',
  async (res) => {
    let TrialStatus = false;
    const productId = prodConst.ACTIVIST_VULNERABILITY;
    // Trial User Check
    const resTrial = await HandleTrialLog(productId);
    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }

    const response = await GetVulDataList(res);
    const resAllowDownload = await AllowDownload(productId); // Allow Download Option
    const responseObj = {
      response,
      trialStatus: TrialStatus,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);

// Preferences page get all data
export const getDefaultPeerGroupDataReq = createAsyncThunk(
  'getDefaultPeerGroupDataReq',
  async (req) => {
    const responsePeerGroups = await GetPeerGroupsData();
    return {
      responsePeerGroups,
      companyOption: req.comp,
      investerOption: req.inve,
    };
  }
);

export const getAllMeetingTypeReq = createAsyncThunk(
  'GetAllMeetingTypeReq',
  async () => {
    const response = await GetAllMeetingTypes();
    return response;
  }
);

export const getAllIndividualProponentReq = createAsyncThunk(
  'getAllIndividualProponentReq',
  async () => {
    const response = await GetAllIndividualProponent();
    return response;
  }
);

export const getAllGroupProponentReq = createAsyncThunk(
  'getAllGroupProponentReq',
  async () => {
    const response = await GetAllGroupProponent();
    return response;
  }
);

export const resolutionsByInvestorFilterReq = createAsyncThunk(
  'resolutionsByInvestorFilterReq',
  async (req) => {
    const response = await ResolutionsByInvestorFilter(req);
    return response;
  }
);

export const resolutionsByInvestorDetailstReq = createAsyncThunk(
  'resolutionsByInvestorDetailstReq',
  async (req) => {
    const response = await ResolutionsByTarget(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType
    );
    return response;
  }
);

export const resolutionSearchByInvestorReq = createAsyncThunk(
  'resolutionSearchByInvestorReq',
  async (req) => {
    const response = await ResolutionSearchByInvestor(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType
    );
    return response;
  }
);

export const getHistoricalTrendsReq = createAsyncThunk(
  'getHistoricalTrendsReq',
  async (req) => {
    const response = await GetHistoricalTrends(
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType,
      InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
    );

    return response;
  }
);

export const getInvestorVotingPowerReq = createAsyncThunk(
  'getInvestorVotingPowerReq',
  async (req) => {
    const response = await GetInvestorVotingPower(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType
    );
    return response;
  }
);

export const getResolutionsTypeIdByNameReq = createAsyncThunk(
  'getResolutionsTypeIdByNameReq',
  async (req) => {
    const response = await GetResolutionsTypeIdByName(
      req.lavel,
      req.proposalType
    );
    return { response, req };
  }
);

//director data and analytics
export const getDirectorSectorAndIndustrySearchDataReq = createAsyncThunk(
  'getDirectorSectorAndIndustrySearchDataReq',
  async () => {
    const response = await GetDirectorSectorAndIndustrySearchData();
    return response;
  }
);
function PrepareStackedChartJson(arry) {
  const lstChartJson = [];
  try {
    if (arry === undefined || arry === null) {
      return lstChartJson;
    }
    const distinctInvestorIds = [
      ...new Set(arry.map((item) => item.investor_id)),
    ];
    // .sort();

    distinctInvestorIds.forEach((invId) => {
      const invName = arry.filter((c) => c.investor_id === invId)[0]
        .investor_name;
      const investerName =
        invName !== undefined && invName !== null ? invName : '';
      const now = new Date().getUTCFullYear();
      const listOfYears = Array(now - (now - 7))
        .fill('')
        .map((v, idx) => now - idx)
        .sort();

      listOfYears.forEach((selYear) => {
        let chartJson_FOR = {
          Investor: investerName,
          InvestorId: invId,
          InvestorStrRep: investerName.replace(',', '_'),
          Year: selYear,
          VoteCast: 'FOR',
        };
        let chartJson_AG = {
          Investor: investerName,
          InvestorId: invId,
          InvestorStrRep: investerName.replace(',', '_'),
          Year: selYear,
          VoteCast: 'AG',
        };
        let chartJson_AB = {
          Investor: investerName,
          InvestorId: invId,
          InvestorStrRep: investerName.replace(',', '_'),
          Year: selYear,
          VoteCast: 'AB',
        };

        const forSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_FOR;
        const abSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_ABSTAIN;
        const agSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_AGAINST;

        const voteCast_for = arry
          .filter(
            (c) =>
              c.investor_id === invId &&
              c.year === selYear &&
              c.voteCastInt === forSelection
          )
          .map((d) => d.number_votes);

        const voteCast_ab = arry
          .filter(
            (c) =>
              c.investor_id === invId &&
              c.year === selYear &&
              c.voteCastInt === abSelection
          )
          .map((d) => d.number_votes);

        const voteCast_ag = arry
          .filter(
            (c) =>
              c.investor_id === invId &&
              c.year === selYear &&
              c.voteCastInt === agSelection
          )
          .map((d) => d.number_votes);

        const whereVoteCastArr = arry.filter(
          (c) =>
            c.investor_id === invId &&
            c.year === selYear &&
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_SUM.includes(
              c.voteCastInt
            )
        );
        const whereVoteCastInt_sum =
          whereVoteCastArr !== null && whereVoteCastArr !== undefined
            ? whereVoteCastArr
                .map((d) => d.number_votes)
                .reduce((a, b) => a + b, 0)
            : 0;

        let Value_FOR = 0;
        let Value_AG = 0;
        let Value_AB = 0;

        if (whereVoteCastInt_sum !== 0) {
          Value_FOR = Number(
            (voteCast_for / whereVoteCastInt_sum) * 100
          ).toFixed(2);
        }

        if (whereVoteCastInt_sum !== 0) {
          Value_AG = Number((voteCast_ag / whereVoteCastInt_sum) * 100).toFixed(
            2
          );
        }

        if (whereVoteCastInt_sum !== 0) {
          Value_AB = Number((voteCast_ab / whereVoteCastInt_sum) * 100).toFixed(
            2
          );
        }

        chartJson_FOR = { ...chartJson_FOR, Value: Value_FOR.toString() };
        chartJson_AG = { ...chartJson_AG, Value: Value_AG.toString() };
        chartJson_AB = { ...chartJson_AB, Value: Value_AB.toString() };

        lstChartJson.push(chartJson_FOR);
        lstChartJson.push(chartJson_AG);
        lstChartJson.push(chartJson_AB);
      });
    });
  } catch (e) {
    console.log(`Investor comperator |  PrepareStackedChartJson :=> \n${e}`);
  }
  return lstChartJson;
}

function PrepareLinechartjsonSecond(arry, selection) {
  const defaultTopInvestors =
    InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_INVESTOR_SELECTION;
  let newDtSelections = [];
  const defaultChartSelections = arry
    .filter((c) => defaultTopInvestors.includes(c.investor_id))
    .slice(0, selection);
  if (defaultChartSelections.length > 0) {
    newDtSelections = defaultChartSelections;
    if (newDtSelections.length < selection) {
      const takemoreval = selection - newDtSelections.length;
      if (takemoreval >= 0) {
        const defaultChartSelections2 = arry
          .filter((c) => !defaultTopInvestors.includes(c.investor_id))
          .slice(0, takemoreval);
        if (defaultChartSelections2.length > 0) {
          newDtSelections.concat(defaultChartSelections2);
        }
      }
    }
  } else {
    newDtSelections = arry.slice(0, selection);
  }

  const myLineChartJson = [];
  newDtSelections.forEach((e) => {
    const JsonValues = [];

    const parseDate = timeParse('%Y');
    const now = new Date().getUTCFullYear();

    Object.keys(e).forEach((k) => {
      if (e[k] !== null) {
        if (k === 'year6') {
          JsonValues.push({ Year: parseDate(now - 6), ChartValue: e[k] });
        }
        if (k === 'year5') {
          JsonValues.push({ Year: parseDate(now - 5), ChartValue: e[k] });
        }
        if (k === 'year4') {
          JsonValues.push({ Year: parseDate(now - 4), ChartValue: e[k] });
        }
        if (k === 'year3') {
          JsonValues.push({ Year: parseDate(now - 3), ChartValue: e[k] });
        }
        if (k === 'year2') {
          JsonValues.push({ Year: parseDate(now - 2), ChartValue: e[k] });
        }
        if (k === 'year1') {
          JsonValues.push({ Year: parseDate(now - 1), ChartValue: e[k] });
        }
        if (k === 'current') {
          JsonValues.push({ Year: parseDate(now), ChartValue: e[k] });
        }
      }
    });

    myLineChartJson.push({
      Investor: e.Investor,
      InvestorStrRep: e.Investor.replace(',', '_'),
      InvestorId: e.investor_id,
      Values: JsonValues,
    });
  });

  return myLineChartJson;
}

const ToolsSlice = createSlice({
  name: 'tools',
  initialState: {
    // General
    isLoading: true,
    isLoadingInvestorDetails: true,
    isLoadingVotingDetails: true,
    isLoadingData: true,
    isLoading_InvestorVotingByProposal: true,
    allowDownload: false,
    getTokenDecode: [],
    isActivismButtonDisabled: true,
    isActivist_ShortsButtonDisabled: true,
    isVotingButtonDisabled: true,
    isGovernanceButtonDisabled: true,
    isVulnerabilityButtonDisabled: true,
    isAmalgamatedButtonDisabled: false,
    //Holdings data and analytics tools
    holdingdData: [],
    holdingdDataHeading: [],
    // Public Demands Tool
    publicDemandToolData: [],
    publicDemandToolHeading: [],
    publicDemandToolTrialStatus: false,
    publicDemandToolStatusIcon: false,
    getPerformanceOverviewV2: [],
    // 1. summary
    summaryData: [],
    countryData: [],
    selectedCountyGov: '',
    globalGovTrialStatus: false, // trialstatus
    // 2. country gov detail
    countryProfileDetails: [],
    overviewDetails: '',
    documentsDetails: [],
    boardDetails: [],
    votingDetails: [],
    generalGovDetails: [],
    shareholderActDetails: [],
    govTakeoverDetails: [],
    provisionDetails: [],
    // 3. state gov
    stateGovernanceList: [
      {
        label: 'Board Details and Shareholder Rights',
        value: 'Board Details and Shareholder Activism',
      },
      { label: 'Voting Rights', value: 'Voting Rights' },
      { label: 'M&A', value: 'M&A' },
    ],
    setStateGovernanceDDL: '',
    stateGovList: [],
    //
    stateGovdescDetails: [],
    stateGovboardDetails: [],
    stateGovshareholderDetails: [],
    stateGovvotingDetails: [],
    stateGovmnDetails: [],
    // Vulnerability Tool
    DDLKeyFinancials: [],
    DDLKeyRatios: [],
    DDLVulnerability: [],
    DDLOwnership: [],
    DDLGovernance: [],
    DDLVoting: [],
    SetKeyFinancials: [],
    SetKeyRatios: [],
    SetVulnerability: [],
    SetOwnership: [],
    SetGovernance: [],
    SetVoting: [],
    getActivistCampaignsTool: [],

    filterByCompanySelection: null,
    filterByInvestorSelection: null,
    isResetInvestorPeerGroupSelection: false,
    isResetCompanyPeerGroupSelection: false,
    vcid_VulTool: 0,
    VulTool_data: [],
    VulTool_dataHeader: [],
    VulTool_dataSummarySelection: [],

    // Investor Comparator
    currentResolutionTypeSelection:
      InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
    lstSponsor: [
      { label: 'All', value: null },
      { label: 'Management', value: '1' },
      { label: 'Shareholder', value: '2' },
    ],
    sponsorSelection: { label: 'All', value: null },
    lstMeetingTypes: [],
    meetingTypeSelection: [],
    lstIndividualProponent: [],
    individualProponentSelection: [],
    lstGroupProponent: [],
    groupProponentSelection: [],
    startInvCompDate: startDate,
    endInvCompDate: endDate,
    isInvCompDateChecked: true,
    isProponentGroup: true,
    lstResolutionsByInvestorFilter: [],
    lstResolutionsByInvestorFilterFullData: [],
    lstExcelDownload_ResolutionsByInvestorFilter: [],
    lstExcelDownload_ResolutionsByInvestorFilterFullData: [],
    selectedInvestorDetailsProposalTypeId: null,
    selectedInvestorDetailsProposalSubLevelTypeId: null,
    selectedInvestorDetailsProposalTopLevelTypeId: null,

    lstResolutionInvDetails: [],
    lstResolutionInvDetailsFullData: [],
    isShowInvestorDetails: false,
    isShowVotingDetails: false,

    lstVotingDetails: [],
    isSelectedCalendarYearData: true,
    isSelectedYearToDateData: false,
    isSelectedProxySeasonData: false,

    // voting by proposal (investor)
    votingbyproposal_isInvCompDateChecked: true,
    // Historicals Trends
    isShowInvestorTrends: false,
    isLoadHistoricalTrends: true,
    isShowHistoricalTrendsFor: true,
    isShowHistoricalTrendsAgainst: false,
    isShowHistoricalTrendsAbstain: false,
    lstAllHistoricalInvestor: [],
    lstHistoricalInvestors: [],
    lstHistoricalInvestorsFor: [],
    lstHistoricalInvestorsAgainst: [],
    lstHistoricalInvestorsAbstain: [],
    lstStackBarChartData: [],
    lstLineChartData: [],

    // Voting Power
    isShowVotingPower: false,
    isLoadVotingPowerData: true,
    lstVotingInvestorPower: [],
    lstVotingPvaImpact: [],

    lstDdlHistoricalsInvestors: [],
    DdlhistoricalInvestorSelection: [],
    //Director data and analytics
    lstDdlDataAndAnalytics: [],
    ddlSectorAndIndustrySelection: [],
    lstIndividualProxyProponent: [],
    lstGroupProxyProponent: [],
    chartYearDataPDF: null,
  },
  reducers: {
    handleResetAdvancedVotingDataSearch: {
      reducer(state) {
        state.lstMeetingTypes = [];
        state.meetingTypeSelection = [];
        state.isInvCompDateChecked = true;
        state.startInvCompDate = startDate;
        state.endInvCompDate = endDate;
        state.lstSponsor = [
          { label: 'All', value: null },
          { label: 'Management', value: '1' },
          { label: 'Shareholder', value: '2' },
        ];
        state.sponsorSelection = { label: 'All', value: null };
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetFilter_ResolutionTrackerTool: {
      reducer(state) {
        // ResolutionTrackerTool - Filter
        state.startInvCompDate = startDate;
        state.endInvCompDate = endDate;
        state.isInvCompDateChecked = true;
        state.isProponentGroup = true;
        state.sponsorSelection = { label: 'All', value: null };
        state.lstSponsor = [
          { label: 'All', value: null },
          { label: 'Management', value: '1' },
          { label: 'Shareholder', value: '2' },
        ];
        state.lstIndividualProponent = [];
        state.individualProponentSelection = [];
        state.lstGroupProponent = [];
        state.groupProponentSelection = [];
        state.lstMeetingTypes = [];
        state.meetingTypeSelection = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleOnClickIsSelectedFullYearData: {
      reducer(state, action) {
        // let tableData = [];
        // let chartData = [];
        const status = action.payload.e;
        state.chartYearDataPDF = status;
        if (status === resolutionTrackerToolConst.USE_CALENDAR_YEAR_DATA) {
          state.isSelectedCalendarYearData = true;
          state.isSelectedYearToDateData = false;
          state.isSelectedProxySeasonData = false;
        }
        if (status === resolutionTrackerToolConst.USE_YEAR_TO_DATE_DATA) {
          state.isSelectedCalendarYearData = false;
          state.isSelectedYearToDateData = true;
          state.isSelectedProxySeasonData = false;
        }
        if (status === resolutionTrackerToolConst.USE_PROXY_SEASON_DATA) {
          state.isSelectedCalendarYearData = false;
          state.isSelectedYearToDateData = false;
          state.isSelectedProxySeasonData = true;
        }

        // if (current(state).isSelectedCalendarYearData) {
        //   chartData = current(state).lstHistoricalAnalysisChartData;
        //   tableData = current(state).historicalTrendsVotesAnalysis;
        // }
        // if (current(state).isSelectedYearToDateData) {
        //   chartData = current(state).lstHistoricalAnalysisChartDataYTD;
        //   tableData = current(state).historicalTrendsVotesAnalysisYTD;
        // }
        // if (current(state).isSelectedProxySeasonData) {
        //   chartData = current(state).lstHistoricalAnalysisChartProxySeasonData;
        //   tableData = current(state).historicalTrendsVotesProxySeasonAnalysis.data;
        // }
        // state.lstHistoricalChartData = chartData;

        // state.lstHistoricalTrendsTotalVotesAnalysis = tableData;
        // state.lstHistoricalTrendsTotalVotesAnalysisSummary = tableData.Summary;
        // state.lstHistoricalTrendsTotalVotesAnalysisDetails =
        //   tableData.Sharesoutstanding;

        // state.ddlCalculationMethodSelection = {
        //   label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
        //   value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
        // };
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetLoading: {
      reducer(state) {
        state.isLoading = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleButtonAccess: {
      reducer(state, payload) {
        payload.payload !== undefined &&
          payload.payload.forEach((product) => {
            if (product.product_id === ACTIVISM) {
              if (
                product.status === NUMBER_TWO ||
                product.status === NUMBER_FOUR
              ) {
                state.isActivismButtonDisabled = false;
              }
            } else if (product.product_id === ACTIVIST_SHORTS) {
              if (
                product.status === NUMBER_TWO ||
                product.status === NUMBER_FOUR
              ) {
                state.isActivist_ShortsButtonDisabled = false;
              }
            } else if (product.product_id === VOTING) {
              if (
                product.status === NUMBER_TWO ||
                product.status === NUMBER_FOUR
              ) {
                state.isVotingButtonDisabled = false;
              }
            } else if (product.product_id === GOVERNANCE) {
              if (
                product.status === NUMBER_TWO ||
                product.status === NUMBER_FOUR
              ) {
                state.isGovernanceButtonDisabled = false;
              }
            } else if (product.product_id === ACTIVIST_VULNERABILITY) {
              if (
                product.status === NUMBER_TWO ||
                product.status === NUMBER_FOUR
              ) {
                state.isVulnerabilityButtonDisabled = false;
              }
            }
          });
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleToggleSwitch: {
      reducer(state) {
        state.toggleSummary = !state.toggleSummary;
      },
      prepare() {
        return {
          payload: true,
        };
      },
    },
    handleSetCountyGovDDL: {
      reducer(state, action) {
        state.selectedCountyGov = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSponsorSelection: {
      reducer(state, action) {
        if (action.payload.e !== null) {
          state.sponsorSelection = action.payload.e;
        } else {
          state.sponsorSelection = { label: 'All', value: null };
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetStateGovDDL: {
      reducer(state, action) {
        state.setStateGovernanceDDL = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleMeetingTypeSelection: {
      reducer(state, action) {
        state.meetingTypeSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIndividualProponentSelection: {
      reducer(state, action) {
        state.individualProponentSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleGroupProponentSelection: {
      reducer(state, action) {
        state.groupProponentSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleStartInvCompDateSelection: {
      reducer(state, action) {
        state.startInvCompDate = action.payload.date;
        if (state.endInvCompDate <= action.payload.date) {
          state.endInvCompDate = action.payload.date;
        }
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e },
        };
      },
    },
    handleEndInvCompDateSelection: {
      reducer(state, action) {
        state.endInvCompDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e },
        };
      },
    },
    handleIsInvCompDateChecked: {
      reducer(state, action) {
        state.isInvCompDateChecked = action.payload.isChecked;
      },
      prepare(e) {
        return {
          payload: { isChecked: e.target.checked },
        };
      },
    },
    votingbyproposal_handleIsInvCompDateChecked: {
      reducer(state, action) {
        state.votingbyproposal_isInvCompDateChecked = action.payload.isChecked;
      },
      prepare(e) {
        return {
          payload: { isChecked: e.target.checked },
        };
      },
    },
    handleProponentGroupsearch: {
      reducer(state, action) {
        state.isProponentGroup = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handlequickSearchReq: {
      reducer(state, action) {
        state.newsFreeSearchText = action.payload.searchtext;
        state.filterFreeSearch = action.payload.searchtext;
      },
      prepare(searchtext) {
        return {
          payload: { searchtext },
        };
      },
    },
    handleComapnySearchSelectionInvComp: {
      reducer(state, action) {
        state.invCompCompanyPeerGroupSelection = undefined;
        const data = JSON.parse(localStorage.getItem('companyFilterData'));
        state.invCompCompanyPeerGroupSelection =
          action.payload.e !== undefined ? action.payload.e : data;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleInvestorSearchSelectionInvComp: {
      reducer(state, action) {
        state.invCompInvestorPeerGroupSelection = undefined;
        const inv_data = JSON.parse(localStorage.getItem('investorFilterData'));
        state.invCompInvestorPeerGroupSelection =
          action.payload.e !== undefined ? action.payload.e : inv_data;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleClearPeerGroupCompanySelection: {
      reducer(state, action) {
        state.filterByCompanySelection = null;
        state.companyPeerGroupSelection = undefined;
        state.invCompCompanyPeerGroupSelection = undefined;
        state.isResetCompanyPeerGroupSelection = true;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleClearPeerGroupInvestorSelection: {
      reducer(state, action) {
        state.filterByInvestorSelection = null;
        state.investorPeerGroupSelection = undefined;
        state.invCompInvestorPeerGroupSelection = undefined;
        state.isResetInvestorPeerGroupSelection = true;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleClearResult: {
      reducer(state) {
        state.lstResolutionsByInvestorFilter = [];
        state.lstResolutionsByInvestorFilterFullData = [];
        state.lstExcelDownload_ResolutionsByInvestorFilter = [];
        state.lstExcelDownload_ResolutionsByInvestorFilterFullData = [];
        state.isLoading = true;
        state.isLoading_InvestorVotingByProposal = true;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleInvestorComparatorSelection: {
      reducer(state, action) {
        state.isLoadingInvestorDetails = true;
        const invCompVal =
          current(state).lstResolutionsByInvestorFilterFullData;
        const excelState =
          current(state).lstExcelDownload_ResolutionsByInvestorFilterFullData;

        if (action.payload.invId !== undefined) {
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) => c.proposal_type_id === action.payload.invId
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
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) =>
              c.proposal_top_level === null &&
              c.Category_Sub_level === null &&
              c.proposal_type === null
          );

          state.lstExcelDownload_ResolutionsByInvestorFilter =
            excelState.filter(
              (c) =>
                c['Proposal Type'] === null &&
                c['Proposal Category'] === null &&
                c['Proposal'] === null
            );
        }

        if (
          action.payload.lavel === 'proposal_top_level' &&
          action.payload.keyVal !== 'All'
        ) {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL;
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) =>
              c.proposal_top_level === action.payload.keyVal &&
              c.Category_Sub_level === null
          );

          state.lstExcelDownload_ResolutionsByInvestorFilter =
            excelState.filter(
              (c) =>
                c['Proposal Type'] === action.payload.keyVal &&
                c['Proposal Category'] === null
            );
        }
        if (action.payload.lavel === 'Category_Sub_level') {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL;
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) =>
              c.Category_Sub_level === action.payload.keyVal &&
              c.proposal_type === null
          );

          state.lstExcelDownload_ResolutionsByInvestorFilter =
            excelState.filter(
              (c) =>
                c['Proposal Category'] === action.payload.keyVal &&
                c['Proposal'] === null
            );
        }

        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_MORE_DETAILS
        ) {
          state.isShowInvestorTrends = false;
          state.isShowVotingPower = false;
          state.isShowInvestorDetails = true;
        }
        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_TRENDS
        ) {
          state.isShowVotingPower = false;
          state.isLoadHistoricalTrends = true;
          state.isShowInvestorDetails = true;
          state.isShowInvestorTrends = true;
          state.isLoadingInvestorDetails = false;
        }

        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_VOTING_POWER
        ) {
          state.isLoadHistoricalTrends = false;
          state.isShowInvestorDetails = false;
          state.isShowInvestorTrends = false;
          state.isShowVotingPower = true;
        }
      },
      prepare(lavel, keyVal, invId, clickFor) {
        return {
          payload: {
            lavel,
            keyVal,
            invId,
            clickFor,
          },
        };
      },
    },
    handleCloseInvestorDetails: {
      reducer(state) {
        const allData = current(state).lstResolutionsByInvestorFilterFullData;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
        state.lstResolutionsByInvestorFilter = allData;
        state.lstResolutionInvDetails = [];
        state.lstVotingPvaImpact = [];
        state.lstVotingInvestorPower = [];
        state.isShowInvestorDetails = false;
        state.isShowInvestorTrends = false;
        state.isShowInvestorTrends = false;
        state.isShowVotingPower = false;
        state.isShowVotingDetails = false;
        state.isLoadVotingPowerData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleCloseVoringDetails: {
      reducer(state) {
        const allData = current(state).lstResolutionInvDetailsFullData;
        const excelDownloadAllData =
          current(state).lstExcelDownload_ResolutionsByInvestorFilterFullData;

        state.lstExcelDownload_ResolutionsByInvestorFilter =
          excelDownloadAllData;
        state.lstResolutionInvDetails = allData;
        state.isShowVotingDetails = false;
        state.isShowInvestorTrends = false;
        state.isLoadingVotingDetails = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleInvestorDetailsSelection: {
      reducer(state, action) {
        const invData = current(state).lstResolutionInvDetailsFullData;
        if (action.payload.investorid !== undefined) {
          state.lstResolutionInvDetails = invData.filter(
            (c) => c.investor_id === action.payload.investorid
          );
        }
        state.isShowVotingDetails = true;
      },
      prepare(investorid) {
        return {
          payload: { investorid },
        };
      },
    },
    handleOnChangeHistoricalInvestor: {
      reducer(state, action) {
        if (
          action.payload.e !== null &&
          action.payload.e.length <=
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_MAX_SELECTION
        ) {
          state.DdlhistoricalInvestorSelection = action.payload.e;
          const lstAllInvestors = current(state).lstAllHistoricalInvestor;

          const ddlSelectionValues = action.payload.e.map((c) => c.value);
          const defaultChartSelections = lstAllInvestors.filter((c) =>
            ddlSelectionValues.includes(c.investor_id)
          );

          // update stack bar chart data
          state.lstStackBarChartData = PrepareStackedChartJson(
            defaultChartSelections
          );
          const isForSelection = current(state).isShowHistoricalTrendsFor;
          const isAgainstSelection =
            current(state).isShowHistoricalTrendsAgainst;
          const isAbstainSelection =
            current(state).isShowHistoricalTrendsAbstain;

          if (isForSelection) {
            const lstInvForData = current(state).lstHistoricalInvestorsFor;
            const filterForSelection = lstInvForData.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            state.lstLineChartData = PrepareLinechartjsonSecond(
              filterForSelection,
              InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
            );
          }

          if (isAgainstSelection) {
            const lstAgainstData = current(state).lstHistoricalInvestorsAgainst;
            const filterAgainstSelection = lstAgainstData.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            state.lstLineChartData = PrepareLinechartjsonSecond(
              filterAgainstSelection,
              InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
            );
          }
          if (isAbstainSelection) {
            const lstAbstainData = current(state).lstHistoricalInvestorsAbstain;
            const filterAbstainSelection = lstAbstainData.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            state.lstLineChartData = PrepareLinechartjsonSecond(
              filterAbstainSelection,
              InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
            );
          }
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetInvestorComparatorTool: {
      reducer(state) {
        state.isLoading_InvestorVotingByProposal = true;
        state.isLoadingInvestorDetails = true;
        state.isLoadingVotingDetails = true;
        state.isShowInvestorDetails = false;
        state.isShowInvestorTrends = false;
        state.isShowVotingDetails = false;
        state.isShowVotingPower = false;
        state.lstResolutionInvDetails = [];
        state.lstResolutionInvDetailsFullData = [];
        state.lstExcelDownload_ResolutionsByInvestorFilter = [];
        state.lstExcelDownload_ResolutionsByInvestorFilterFullData = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleHistoricalTrendsSelection: {
      reducer(state, action) {
        const ddlHistoricalTrendsselection =
          current(state).DdlhistoricalInvestorSelection;
        const ddlSelectionValues = ddlHistoricalTrendsselection.map(
          (c) => c.value
        );

        state.isShowHistoricalTrendsFor = false;
        state.isShowHistoricalTrendsAgainst = false;
        state.isShowHistoricalTrendsAbstain = false;

        if (
          action.payload.e ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_FOR
        ) {
          state.isShowHistoricalTrendsFor = true;
          state.lstHistoricalInvestors =
            current(state).lstHistoricalInvestorsFor;

          // Update line - for grapgh selection
          const filterForSelection = state.lstHistoricalInvestors.filter((c) =>
            ddlSelectionValues.includes(c.investor_id)
          );
          state.lstLineChartData = PrepareLinechartjsonSecond(
            filterForSelection,
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
          );
        }

        if (
          action.payload.e ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_AGAINST
        ) {
          state.isShowHistoricalTrendsAgainst = true;
          state.lstHistoricalInvestors =
            current(state).lstHistoricalInvestorsAgainst;

          // Update against - for grapgh selection
          const filterAgainstSelection = state.lstHistoricalInvestors.filter(
            (c) => ddlSelectionValues.includes(c.investor_id)
          );
          state.lstLineChartData = PrepareLinechartjsonSecond(
            filterAgainstSelection,
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
          );
        }

        if (
          action.payload.e ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_ABSTAIN
        ) {
          state.isShowHistoricalTrendsAbstain = true;
          state.lstHistoricalInvestors =
            current(state).lstHistoricalInvestorsAbstain;

          // Update abstain - for grapgh selection
          const filterAbstainSelection = state.lstHistoricalInvestors.filter(
            (c) => ddlSelectionValues.includes(c.investor_id)
          );
          state.lstLineChartData = PrepareLinechartjsonSecond(
            filterAbstainSelection,
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
          );
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetStateGovList: {
      reducer(state, action) {
        state.stateGovList = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleGlobleResetInvestorCmparator: {
      reducer(state) {
        state.lstResolutionsByInvestorFilter = [];
        state.lstResolutionsByInvestorFilterFullData = [];
        state.isLoading = true;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
        state.isLoadingInvestorDetails = true;
        state.isLoadingVotingDetails = true;
        state.isShowInvestorTrends = false;
        state.isShowInvestorDetails = false;
        state.isShowVotingDetails = false;
        state.isShowVotingPower = false;
        state.lstResolutionInvDetails = [];
        state.lstResolutionInvDetailsFullData = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleActivistCampaignsToolReset: {
      reducer(state) {
        state.isLoadingData = true;
        state.getActivistCampaignsTool = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    HandleTreeView_KeyFinancials: {
      reducer(state, action) {
        state.SetKeyFinancials = action.payload.selectedNodes;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetKeyFinancials = CHECKED_ALL;
        }
        const oldJson = current(state).DDLKeyFinancials;
        state.DDLKeyFinancials = twoLayerTreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    HandleTreeView_KeyRatios: {
      reducer(state, action) {
        state.SetKeyRatios = action.payload.selectedNodes;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetKeyRatios = CHECKED_ALL;
        }
        const oldJson = current(state).DDLKeyRatios;
        state.DDLKeyRatios = twoLayerTreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleUpdateDataCompanypeergroupcomparisonmatrixFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.SetPeerGroupSelection = data.SetPeerGroupSelection;

        const DDLVulnerabilityArr = current(state).DDLVulnerability;
        const DDLVotingArr = current(state).DDLVoting;
        const DDLOwnershipArr = current(state).DDLOwnership;
        const DDLKeyRatiosArr = current(state).DDLKeyRatios;
        const DDLKeyFinancialsArr = current(state).DDLKeyFinancials;
        const DDLGovernanceArr = current(state).DDLGovernance;

        let depth0_SetKeyFinancialsArr = [];
        let depth0_SetKeyRatiosArr = [];
        let depth0_SetVulnerabilityArr = [];
        let depth0_SetOwnershipArr = [];
        let depth0_SetGovernanceArr = [];
        let depth0_SetVotingArr = [];

        // const { depth0_Arr, depthValue }
        depth0_SetVotingArr = getTreeViewDDLSelection(
          data.SetVoting,
          DDLVotingArr
        );
        if (data.SetGovernance.length > 0) {
          state.SetVoting = data.SetVoting;
          state.DDLVoting = depth0_SetVotingArr.depth0_Arr;
        }

        depth0_SetGovernanceArr = getTreeViewDDLSelection(
          data.SetGovernance,
          DDLGovernanceArr
        );
        if (data.SetGovernance.length > 0) {
          state.SetGovernance = data.SetGovernance;
          state.DDLGovernance = depth0_SetGovernanceArr.depth0_Arr;
        }

        depth0_SetOwnershipArr = getTreeViewDDLSelection(
          data.SetOwnership,
          DDLOwnershipArr
        );
        if (data.SetOwnership.length > 0) {
          state.SetOwnership = data.SetOwnership;
          state.DDLOwnership = depth0_SetOwnershipArr.depth0_Arr;
        }

        depth0_SetVulnerabilityArr = getTreeViewDDLSelection(
          data.SetVulnerability,
          DDLVulnerabilityArr
        );
        if (data.SetVulnerability.length > 0) {
          state.SetVulnerability = data.SetVulnerability;
          state.DDLVulnerability = depth0_SetVulnerabilityArr.depth0_Arr;
        }

        depth0_SetKeyFinancialsArr = getTreeViewDDLSelection(
          data.SetKeyFinancials,
          DDLKeyFinancialsArr
        );
        if (data.SetKeyFinancials.length > 0) {
          state.SetKeyFinancials = data.SetKeyFinancials;
          state.DDLKeyFinancials = depth0_SetKeyFinancialsArr.depth0_Arr;
        }

        depth0_SetKeyRatiosArr = getTreeViewDDLSelection(
          data.SetKeyRatios,
          DDLKeyRatiosArr
        );
        if (data.SetKeyRatios.length > 0) {
          state.SetKeyRatios = data.SetKeyRatios;
          state.DDLKeyRatios = depth0_SetKeyRatiosArr.depth0_Arr;
        }
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
    HandleTreeView_Vulnerability: {
      reducer(state, action) {
        state.SetVulnerability = action.payload.selectedNodes;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetVulnerability = CHECKED_ALL;
        }
        const oldJson = current(state).DDLVulnerability;
        state.DDLVulnerability = oneChildtreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    HandleTreeView_Ownership: {
      reducer(state, action) {
        state.SetOwnership = action.payload.selectedNodes;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetOwnership = CHECKED_ALL;
        }
        const oldJson = current(state).DDLOwnership;
        state.DDLOwnership = oneChildtreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    HandleTreeView_Governance: {
      reducer(state, action) {
        state.SetGovernance = action.payload.selectedNodes;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetGovernance = CHECKED_ALL;
        }
        const oldJson = current(state).DDLGovernance;
        state.DDLGovernance = oneChildtreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    HandleTreeView_Voting: {
      reducer(state, action) {
        state.SetVoting = action.payload.selectedNodes;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetVoting = CHECKED_ALL;
        }
        const oldJson = current(state).DDLVoting;
        state.DDLVoting = oneChildtreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    HandleTreeView_PeerGroupSelection: {
      reducer(state, action) {
        state.SetPeerGroupSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleInvestorChangePeerGrp: {
      reducer(state) {
        state.isResetInvestorPeerGroupSelection = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleCompanyChangePeerGrp: {
      reducer(state) {
        state.isResetCompanyPeerGroupSelection = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleOnChangeSectorAndIndustry: {
      reducer(state, action) {
        const oldJson = current(state).lstDdlDataAndAnalytics;
        state.lstDdlDataAndAnalytics = oneChildtreeView(oldJson, action);

        const selectionArray = action.payload.selectedNodes;
        const valuearr = [];
        state.lstDdlDataAndAnalytics.forEach((e) => {
          selectionArray.forEach((x) => {
            if (e.value === x.value && x._depth === NUMBER_ZERO) {
              e.children.forEach((c) => {
                valuearr.push(c.value);
              });
              x.value = valuearr;
            }
          });
        });
        if (selectionArray.length > 0) {
          state.ddlSectorAndIndustrySelection = selectionArray[0].value;
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleGlobalGovnResetStates: {
      reducer(state) {
        state.selectedCountyGov = '';
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResolutionFilter: {
      reducer(state) {
        state.individualProponentSelection = [];
        state.groupProponentSelection = [];
        state.startInvCompDate = startDate;
        state.endInvCompDate = endDate;
        state.sponsorSelection = { label: 'All', value: null };
        state.meetingTypeSelection = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleDissidentVotingSelection: {
      reducer(state, action) {
        const data = localStorage.getItem('dissidentVotingTools');
        if (data !== null) {
        const filterData = JSON.parse(data);
        state.startInvCompDate = new Date(filterData.startDate);
        state.endInvCompDate = new Date(filterData.endDate);
        state.isInvCompDateChecked = filterData.isInvCompDateChecked;
        state.isProponentGroup = filterData.isProponentGroup;
        state.sponsorSelection = filterData.sponsor;
        state.individualProponentSelection = filterData.individualProponentSelection;
        state.groupProponentSelection = filterData.groupProponentSelection;
        state.meetingTypeSelection = filterData.meetingType;
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleUpdateDataResolutionTrackerFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.individualProponentSelection = data.individualProponentSelection;
        state.groupProponentSelection = data.groupProponentSelection;
        state.isInvCompDateChecked = data.isInvCompDateChecked;
        state.startInvCompDate = new Date(data.startInvCompDate);
        state.endInvCompDate = new Date(data.endInvCompDate);
        state.meetingTypeSelection = data.meetingTypeSelection;
        state.sponsorSelection = data.sponsorSelection;
        state.isProponentGroup = data.isProponentGroup;
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
    handleUpdateDataDissidentVotingSummaryFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.individualProponentSelection = data.individualProponentSelection;
        state.groupProponentSelection = data.groupProponentSelection;
        state.isInvCompDateChecked = data.isInvCompDateChecked;
        state.startInvCompDate = new Date(data.startInvCompDate);
        state.endInvCompDate = new Date(data.endInvCompDate);
        state.meetingTypeSelection = data.meetingTypeSelection;
        state.sponsorSelection = data.sponsorSelection;
        state.isProponentGroup = data.isProponentGroup;
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
  },
  extraReducers: {
    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
    [PublicCampaignToolListsReq.fulfilled]: (state, action) => {
      state.publicDemandToolData =
        action.payload !== undefined ? action.payload.response.data : [];
      state.publicDemandToolHeading =
        action.payload !== undefined && action.payload.response !== undefined
          ? action.payload.response.heading
          : [];
      state.publicDemandToolTrialStatus =
        action.payload !== undefined ? action.payload.trialStatus : false;
      state.publicDemandToolStatusIcon =
        action.payload !== undefined ? action.payload.statusIcon : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoading = action.payload === undefined;
    },
    [HoldingsDataAndAnalyticsListReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.holdingdData =
          action.payload !== undefined ? action.payload.response.data : [];
        state.holdingdDataHeading =
          action.payload !== undefined ? action.payload.response.heading : [];
        state.isLoading = false;
      } else {
        state.isLoading = true;
        state.holdingdData = [];
        state.holdingdDataHeading = [];
      }
    },
    [getPerformanceOverviewV2Req.fulfilled]: (state, action) => {
      state.getPerformanceOverviewV2 = action.payload;
    },
    [getPerformanceCompoundedReq.fulfilled]: (state, action) => {
      state.getPerformanceCompounded = action.payload;
    },
    [getActivistCampaignsToolReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.isLoadingData = false;
        state.getActivistCampaignsTool =
          action.payload !== undefined ? action.payload.result : [];
      }
    },
    [getListFundPerformanceByYearV2Req.fulfilled]: (state, action) => {
      state.getListFundPerformanceByYearV2 = action.payload;
    },
    [getGlobalGovProvisionListReq.fulfilled]: (state, action) => {
      state.summaryData =
        action.payload !== undefined ? action.payload.response.summaryData : [];
      state.countryData =
        action.payload !== undefined ? action.payload.response.countryData : [];
      state.globalGovTrialStatus =
        action.payload !== undefined ? action.payload.trialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
    },
    [getCountryGovListReq.fulfilled]: (state, action) => {
      state.countryProfileDetails =
        action.payload !== undefined
          ? action.payload.response.countryProfileDetails[0]
          : [];
      state.overviewDetails =
        action.payload !== undefined
          ? action.payload.response.overviewDetails
          : '';
      state.documentsDetails =
        action.payload !== undefined
          ? action.payload.response.documentsDetails
          : [];
      state.boardDetails =
        action.payload !== undefined
          ? action.payload.response.boardDetails
          : [];
      state.votingDetails =
        action.payload !== undefined
          ? action.payload.response.votingDetails
          : [];
      state.generalGovDetails =
        action.payload !== undefined
          ? action.payload.response.generalGovDetails
          : [];
      state.shareholderActDetails =
        action.payload !== undefined
          ? action.payload.response.shareholderActDetails
          : [];
      state.govTakeoverDetails =
        action.payload !== undefined
          ? action.payload.response.govTakeoverDetails
          : [];
      state.provisionDetails =
        action.payload !== undefined
          ? action.payload.response.provisionDetails
          : [];
      state.globalGovTrialStatus =
        action.payload !== undefined ? action.payload.trialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoading = action.payload === undefined;
    },
    [getStateGovListReq.fulfilled]: (state, action) => {
      state.stateGovList =
        action.payload !== undefined
          ? action.payload.response.stateGovDetails
          : [];
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.globalGovTrialStatus =
        action.payload !== undefined ? action.payload.trialStatus : false;
    },
    [getStateGovDetailsListReq.fulfilled]: (state, action) => {
      state.stateGovdescDetails =
        action.payload !== undefined ? action.payload.response.descDetails : [];
      state.stateGovboardDetails =
        action.payload !== undefined
          ? action.payload.response.boardDetails
          : [];
      state.stateGovshareholderDetails =
        action.payload !== undefined
          ? action.payload.response.shareholderDetails
          : [];
      state.stateGovvotingDetails =
        action.payload !== undefined
          ? action.payload.response.votingDetails
          : [];
      state.stateGovmnDetails =
        action.payload !== undefined ? action.payload.response.mnDetails : [];
      state.globalGovTrialStatus =
        action.payload !== undefined ? action.payload.trialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoading = action.payload === undefined;
    },
    //
    [getAllMeetingTypeReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstMeetingTypes = action.payload;
      }
    },
    [getAllIndividualProponentReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstIndividualProponent = action.payload.arr;
        state.lstIndividualProxyProponent = action.payload.arr1;
      }
    },
    [getAllGroupProponentReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstGroupProponent = action.payload.arr;
        state.lstGroupProxyProponent = action.payload.arr1;
      }
    },
    [resolutionsByInvestorFilterReq.fulfilled]: (state, action) => {
      state.lstResolutionsByInvestorFilter = [];
      state.lstResolutionsByInvestorFilterFullData = [];

      state.lstResolutionsByInvestorFilter =
        action.payload !== undefined ? action.payload.data : [];
      state.lstResolutionsByInvestorFilterFullData =
        action.payload !== undefined ? action.payload.data : [];

      state.lstExcelDownload_ResolutionsByInvestorFilter =
        action.payload !== undefined ? action.payload.excelData : [];
      state.lstExcelDownload_ResolutionsByInvestorFilterFullData =
        action.payload !== undefined ? action.payload.excelData : [];

      state.isLoading_InvestorVotingByProposal = action.payload === undefined;
    },
    [getDefaultPeerGroupDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (state.isResetCompanyPeerGroupSelection === false) {
          if (action.payload.companyOption !== undefined) {
            state.invCompCompanyPeerGroupSelection =
              action.payload.companyOption;
            state.filterByCompanySelection = action.payload.companyOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.company_peer_group !== undefined
          ) {
            state.invCompCompanyPeerGroupSelection =
              action.payload.responsePeerGroups.company_peer_group;
            state.filterByCompanySelection =
              action.payload.responsePeerGroups.company_peer_group.value;
          }
        }

        if (state.isResetInvestorPeerGroupSelection === false) {
          if (action.payload.investerOption !== undefined) {
            state.invCompInvestorPeerGroupSelection =
              action.payload.investerOption;
            state.filterByInvestorSelection =
              action.payload.investerOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.investor_peer_group !== undefined
          ) {
            state.invCompInvestorPeerGroupSelection =
              action.payload.responsePeerGroups.investor_peer_group;
            state.filterByInvestorSelection =
              action.payload.responsePeerGroups.investor_peer_group.value;
          }
        }
      }
    },
    //
    [getVulDDLReq.fulfilled]: (state, action) => {
      state.DDLKeyFinancials =
        action.payload !== undefined ? action.payload.DDLKeyFinancials : [];
      state.DDLKeyRatios =
        action.payload !== undefined ? action.payload.DDLKeyRatios : [];
      state.DDLVulnerability =
        action.payload !== undefined ? action.payload.DDLVulnerability : [];
      state.DDLOwnership =
        action.payload !== undefined ? action.payload.DDLOwnership : [];
      state.DDLGovernance =
        action.payload !== undefined ? action.payload.DDLGovernance : [];
      state.DDLVoting =
        action.payload !== undefined ? action.payload.DDLVoting : [];
      state.DDLPeerGroupSelection =
        action.payload !== undefined ? action.payload.peerGroupSelection : [];

      // below for placeholder
      state.SetKeyFinancials = CHECKED_ALL;
      state.SetKeyRatios = CHECKED_ALL;
      state.SetVulnerability = CHECKED_ALL;
      state.SetOwnership = CHECKED_ALL;
      state.SetGovernance = CHECKED_ALL;
      state.SetVoting = CHECKED_ALL;
      state.SetPeerGroupSelection =
        action.payload.peerGroupSelection !== undefined
          ? action.payload.peerGroupSelection[0]
          : undefined;
    },
    [getPeerGroupDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (state.isResetCompanyPeerGroupSelection === false) {
          if (action.payload.companyOption !== undefined) {
            state.companyPeerGroupSelection = action.payload.companyOption;
            state.filterByCompanySelection = action.payload.companyOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.company_peer_group !== undefined
          ) {
            state.companyPeerGroupSelection =
              action.payload.responsePeerGroups.company_peer_group;
            state.filterByCompanySelection =
              action.payload.responsePeerGroups.company_peer_group.value;
          }
        }

        if (state.isResetInvestorPeerGroupSelection === false) {
          if (action.payload.investerOption !== undefined) {
            state.investorPeerGroupSelection = action.payload.investerOption;
            state.filterByInvestorSelection =
              action.payload.investerOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.investor_peer_group !== undefined
          ) {
            state.investorPeerGroupSelection =
              action.payload.responsePeerGroups.investor_peer_group;
            state.filterByInvestorSelection =
              action.payload.responsePeerGroups.investor_peer_group.value;
          }
        }
      }
    },
    [getVCIdReq.fulfilled]: (state, action) => {
      state.vcid_VulTool =
        action.payload !== undefined ? action.payload.vcid : [];
    },
    [getVulDataListReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.VulTool_data =
          action.payload.response !== false ? action.payload.response.data : [];
        state.VulTool_dataHeader =
          action.payload.response !== false
            ? action.payload.response.dataHeader
            : [];
        state.VulTool_dataSummarySelection =
          action.payload.response !== false
            ? action.payload.response.dataSummarySelection
            : [];
        state.vulToolTrialStatus =
          action.payload !== undefined ? action.payload.trialStatus : false;
        state.allowDownload =
          action.payload !== undefined ? action.payload.allowDownload : false;
        state.isLoading = action.payload === undefined;
      }
    },
    [resolutionsByInvestorDetailstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstResolutionInvDetails = action.payload;
        state.lstResolutionInvDetailsFullData = action.payload;
        state.isLoadingInvestorDetails = action.payload === undefined;
      }
    },
    [resolutionSearchByInvestorReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstVotingDetails = action.payload;
        state.isLoadingVotingDetails = action.payload === undefined;
      }
    },
    [getHistoricalTrendsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstAllHistoricalInvestor = action.payload.allInvestor;
        state.lstDdlHistoricalsInvestors = action.payload.ddlInvestor;
        state.DdlhistoricalInvestorSelection =
          action.payload.selectedDdlInvestor;
        state.isLoadHistoricalTrends = action.payload === undefined;
        state.lstHistoricalInvestors = action.payload.invFor;
        state.lstHistoricalInvestorsFor = action.payload.invFor;
        state.lstHistoricalInvestorsAgainst = action.payload.invAgainst;
        state.lstHistoricalInvestorsAbstain = action.payload.invAbstain;

        // bar chart data
        state.lstStackBarChartData = PrepareStackedChartJson(
          action.payload.defaultStackBarSelection
        );

        // line chart default data
        state.lstLineChartData = PrepareLinechartjsonSecond(
          action.payload.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
        );
      }
    },
    [getInvestorVotingPowerReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstVotingInvestorPower = action.payload.VotingPower;
        state.lstVotingPvaImpact = action.payload.PvaImpact;
        state.isLoadVotingPowerData = action.payload === undefined;
      }
    },
    [getResolutionsTypeIdByNameReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (
          action.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL
        ) {
          state.selectedInvestorDetailsProposalTopLevelTypeId =
            action.payload.response;
        }
        if (
          action.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL
        ) {
          state.selectedInvestorDetailsProposalSubLevelTypeId =
            action.payload.response;
        }
        if (
          action.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE
        ) {
          state.selectedInvestorDetailsProposalTypeId = action.payload.response;
        }
      }
    },
    [getDirectorSectorAndIndustrySearchDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstDdlDataAndAnalytics = action.payload;
      }
    },
  },
});

export const {
  handleUpdateDataCompanypeergroupcomparisonmatrixFilters,
  handleUpdateDataDissidentVotingSummaryFilters,
  handleUpdateDataResolutionTrackerFilters,
  handleResetFilter_ResolutionTrackerTool,
  handleOnClickIsSelectedFullYearData,
  handleResetAdvancedVotingDataSearch,
  handleResetLoading,
  handleSetCountyGovDDL,
  handleSetStateGovDDL,
  handleSetStateGovList,
  HandleTreeView_KeyRatios,
  HandleTreeView_KeyFinancials,
  HandleTreeView_Vulnerability,
  HandleTreeView_Ownership,
  HandleTreeView_Governance,
  HandleTreeView_Voting,
  HandleTreeView_PeerGroupSelection,
  handleInvestorChangePeerGrp,
  handleCompanyChangePeerGrp,
  handleClearPeerGroupInvestorSelection,
  handleSponsorSelection,
  handleMeetingTypeSelection,
  handleIndividualProponentSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleIsInvCompDateChecked,
  votingbyproposal_handleIsInvCompDateChecked,
  handleProponentGroupsearch,
  handleComapnySearchSelectionInvComp,
  handleInvestorSearchSelectionInvComp,
  handleClearPeerGroupCompanySelection,
  handleClearResult,
  handleInvestorComparatorSelection,
  handleCloseInvestorDetails,
  handleInvestorDetailsSelection,
  handleCloseVoringDetails,
  handleResetInvestorComparatorTool,
  handleOnChangeHistoricalInvestor,
  handleHistoricalTrendsSelection,
  handleGlobleResetInvestorCmparator,
  handlequickSearchReq,
  handleToggleSwitch,
  handleActivistCampaignsToolReset,
  handleButtonAccess,
  handleGlobalGovnResetStates,
  handleResolutionFilter,
  //
  handleOnChangeSectorAndIndustry,
  handleDissidentVotingSelection
} = ToolsSlice.actions;

export default ToolsSlice.reducer;
