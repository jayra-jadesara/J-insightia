import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { UpdateVisitorLog, TokenDecode, HandleTrialLog, AllowDownload, getOwnershipStatus, getOwnershipStatusShort, getOwnershipStatusLong } from '../../utils/general-util';

import {
  company_search,
  GetCompanyProfile,
  GetActivismListTrialUser,
  GetVulnerabilityListTrialUser,
  GetActivistShortListTrialUser,
  GetGovernanceListTrialUser,
  listTopTwentyActivistActivity,
  PIGetIssuer,
  VunList10QAnd10KForIssuer,
  VunGetGovDirectorInfoV4,
  VunListNewsArticlesForIssuer,
  GetAiSCompDisclosedShortPositions,
  ListActivistInvestorsForCompany_NEW_ais,
  GetHistoricShortPositions,
  GetAiSCompTotalShortPositions,
  Adm_Check_PID,
  ListActivistInvestorsForCompanyAiS,
  GetActivismSummary_AiS,
  GetAIG_ShareholderProposals_v2,
  GetGovCompanyDirector503,
  GetCompanyDirector502_v2,
  GetCompanyDirector507_v2,
  GetCompanyDirectorshort_v2,
  GetCompanyDirector10k_v2,
  GetGovDirectorInfo,
  Get_Gov_Independent_Graph_Data,
  Get_Gov_Tenure_Graph_Data,
  Get_Gov_Gender_Graph_Data,
  GetComDirProf,
  GetComDirProfPast,
  GetBoardNewsHeadlines,
  Get_interlocking_directors_JSON_v2,
  GetDetPoisonPill,
  GetItem303Material,
  GetDetPoisonPillTopHdr,
  GetCompanyDirector503,
  Get_Bylaws_Charter_GovGuidelines_Data,
  GetCompFillingType,
  GetCompStatement,
  GetComplianceComparisonIndexes,
  GetComplianceVotinDissent,
  PIGetShareholdersTop10,
  GetVunGetAllInstitutionalMediansAndMADMs,
  GetVunGetAllActivistMediansAndMADMs,
  PIGetMostRecentAGMOrPCMeetingIdWithVotes,
  VunGetAllRemunerationMediansAndMADMs,
  VunGetAllDirectorMediansAndMADMs,
  VunGetAllRemunerationMediansAndMADMsYearAroundDate,
  GetVulnerabilityScoreOverTime,
  GetVulnerabilityPrankOverTime,
  getLatestOwnershipDateList,
  getOwnershipLongInvestorData,
  getOwnershipLongFundData,
  getownershipCompanyDummyData,
  getOwnershipShortInvestorData,
  getOwnershipShortFundData,
  listCompanyFilingsByActivist_v2,
  GetCompanyOverviewProfile,
  GetCompanyStockEvents,
  GetLollipops_graph,
  GetStockValues_graph,
  GetActivismOverviewGraphs,
  VunSummaryScore,
  GetActivistInvestorsForCompany,
  GetActivistNotifiedHolding,
  GetCompanyPeerGroupOverview,
  getOwnershipLongShortInvestorDataCheck,
  GetComDirUpcoming,
  GetCompanyActivisamTabDataCheck,
  GetPeerGroupDefaultName,
  UpdateCompanyVunScoreData,
  GetPeerGroupName,
  GetAdmGetCompanyShell_spac,
} from '../../utils/company-util';
import ProductConstants from '../../constants/ProductConstants';
import { NUMBER_TWO, NUMBER_SEVEN } from '../../constants/NumberConstants';

// List top 20 Trial or actual for "ACTIVISM, ACTIVIST_SHORTS, ACTIVIST_VULNERABILITY, GOVERNANCE"
export const GetTrialOrActualTop20ListReq = createAsyncThunk(
  'GetActivismListTrialUser',
  async (productsId) => {
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option
    const response = await listTopTwentyActivistActivity();
    return { response, allowDownload: resAllowDownload };
  }
);

// List top 20
export const listTopTwentyActivistActivityReq = createAsyncThunk(
  'listTopTwentyActivistActivity',
  async () => {
    const response = await listTopTwentyActivistActivity();
    const payload = { response };
    return payload;
  }
);

// Company Overview
export const getCompanyOverviewProfileReq = createAsyncThunk(
  'GetCompanyOverviewProfile',
  async (productId) => {
    const response = await GetCompanyOverviewProfile(productId);
    return response;
  }
);

export const getCompanyStockEventsReq = createAsyncThunk(
  'GetCompanyStockEvents',
  async (productId) => {
    const response = await GetCompanyStockEvents(productId);
    return response;
  }
);

export const getcompany_PeerGroupOverviewReq = createAsyncThunk(
  'getcompany_PeerGroupOverviewReq',
  async (req) => {
    const response = await GetCompanyPeerGroupOverview(req);
    return response;
  }
);

export const getPeerGroupNameReq = createAsyncThunk(
  'getPeerGroupNameReq',
  async (pid) => {
    const response = await GetPeerGroupName(pid);
    return response;
  }
);

export const getLollipops_graphReq = createAsyncThunk(
  'GetLollipops_graph',
  async (company_id) => {
    const response = await GetLollipops_graph(company_id);
    return response;
  }
);

export const getStockValues_graphReq = createAsyncThunk(
  'GetStockValues_graph',
  async (productId) => {
    const response = await GetStockValues_graph(productId);
    return response;
  }
);

// ACTIVIST SHORT OVERVIEW: sets the imported URI call to a get/request value using a redux async thunk
export const getAiSCompDisclosedShortPositionsReq = createAsyncThunk(
  'GetAiSCompDisclosedShortPositions',
  async (productId) => {
    const response = await GetAiSCompDisclosedShortPositions(productId);
    return response;
  }
);

export const listActivistInvestorsForCompany_NEW_aisReq = createAsyncThunk(
  'ListActivistInvestorsForCompany_NEW_ais',
  async (companyId) => {
    const response = await ListActivistInvestorsForCompany_NEW_ais(companyId);
    return response;
  }
);

export const getAiSCompTotalShortPositionsReq = createAsyncThunk(
  'GetAiSCompTotalShortPositions',
  async (productId) => {
    const response = await GetAiSCompTotalShortPositions(productId);
    return response;
  }
);

export const getHistoricShortPositionsReq = createAsyncThunk(
  'GetHistoricShortPositions',
  async (productId) => {
    const response = await GetHistoricShortPositions(productId);
    return response;
  }
);

export const listActivistInvestorsForCompanyAiSReq = createAsyncThunk(
  'ListActivistInvestorsForCompanyAiS',
  async (companyId) => {
    const response = await ListActivistInvestorsForCompanyAiS(companyId);
    return response;
  }
);

export const getActivismSummary_AiSReq = createAsyncThunk(
  'GetActivismSummary_AiS',
  async (companyId) => {
    const response = await GetActivismSummary_AiS(companyId);
    return response;
  }
);

export const adm_Check_PIDReq = async (pId) => {
  const response = await Adm_Check_PID(pId);
  return response;
};

export const searchFormReq = createAsyncThunk('company_search', async (arg) => {
  const response = await company_search(arg.name_search, arg.quicksearch);
  return response;
});

// AIV
export const piGetIssuerReq = createAsyncThunk('PIGetIssuer', async (req) => {
  const response = await PIGetIssuer(req);
  return response;
});
// AIV AGM Voting Most Recent Votes
export const pIGetMostRecentAGMOrPCMeetingIdWithVotesReq = createAsyncThunk(
  'PIGetMostRecentAGMOrPCMeetingIdWithVotes',
  async (req) => {
    const response = await PIGetMostRecentAGMOrPCMeetingIdWithVotes(req);
    return response;
  }
);
// AIV AGM Voting Remuneration
export const vunGetAllRemunerationMediansAndMADMsReq = createAsyncThunk(
  'VunGetAllRemunerationMediansAndMADMs',
  async (req) => {
    const response = await VunGetAllRemunerationMediansAndMADMs(req);
    return response;
  }
);

// AIV VAGM Voting if one year back VunGetAllRemunerationMediansAndMADMsYearAroundDate
export const vunGetAllRemunerationMediansAndMADMsYearAroundDateReq =
  createAsyncThunk(
    'VunGetAllRemunerationMediansAndMADMsYearAroundDate',
    async (req) => {
      const response = await VunGetAllRemunerationMediansAndMADMsYearAroundDate(
        req
      );
      return response;
    }
  );
// AIV AGM VOTING median footer VunGetAllDirectorMediansAndMADMs
export const vunGetAllDirectorMediansAndMADMsReq = createAsyncThunk(
  'VunGetAllDirectorMediansAndMADMs',
  async (req) => {
    const response = await VunGetAllDirectorMediansAndMADMs(req);
    return response;
  }
);
// AIV OWNERSHIP PIGetShareholdersTop10
export const piGetShareholdersTop10Req = createAsyncThunk(
  'PIGetShareholdersTop10',
  async (req) => {
    const response = await PIGetShareholdersTop10(req);
    return response;
  }
);

// AIV TOP 10 footer ownership
export const getVunGetAllInstitutionalMediansAndMADMsReq = createAsyncThunk(
  'GetVunGetAllInstitutionalMediansAndMADMs',
  async (req) => {
    const response = await GetVunGetAllInstitutionalMediansAndMADMs(req);
    return response;
  }
);

export const getVunGetAllActivistMediansAndMADMsReq = createAsyncThunk(
  'GetVunGetAllActivistMediansAndMADMs',
  async (req) => {
    const response = await GetVunGetAllActivistMediansAndMADMs(req);
    return response;
  }
);

export const vunList10QAnd10KForIssuerReq = createAsyncThunk(
  'VunList10QAnd10KForIssuer',
  async (req) => {
    const response = await VunList10QAnd10KForIssuer(req);
    return response;
  }
);

export const vunGetGovDirectorInfoV4Req = createAsyncThunk(
  'VunGetGovDirectorInfoV4',
  async (req) => {
    const response = await VunGetGovDirectorInfoV4(req);
    return response;
  }
);

export const vunListNewsArticlesForIssuerReq = createAsyncThunk(
  'VunListNewsArticlesForIssuer',
  async (req) => {
    const response = await VunListNewsArticlesForIssuer(req);
    return response;
  }
);

export const vunSummaryScore = createAsyncThunk(
  'vunSummaryScore',
  async (req) => {
    const response = await VunSummaryScore(req);
    return response;
  }
);
// AIV Charts
export const getVulnerabilityScoreOverTimeReq = createAsyncThunk(
  'GetVulnerabilityScoreOverTime',
  async (req) => {
    const response = await GetVulnerabilityScoreOverTime(req);
    return response;
  }
);

export const getVulnerabilityPrankOverTimeReq = createAsyncThunk(
  'GetVulnerabilityPrankOverTime',
  async (req) => {
    const response = await GetVulnerabilityPrankOverTime(req);
    return response;
  }
);

export const getCompanyProfileReq = createAsyncThunk(
  'company_profile',
  async (productId) => {
    const response = await GetCompanyProfile(productId);
    return response;
  }
);

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});
// AiG
export const getAIG_ShareholderProposals_v2Req = createAsyncThunk(
  'GetAIG_ShareholderProposals_v2',
  async (productId) => {
    const response = await GetAIG_ShareholderProposals_v2(productId);
    return response;
  }
);

// Activism Overview Graphs
export const getActivismOverviewGraphsReq = createAsyncThunk(
  'GetActivismOverviewGraphs',
  async (pid) => {
    const response = await GetActivismOverviewGraphs(pid);
    return response;
  }
);
// AiG Latest Filing
export const getGovCompanyDirector503Req = createAsyncThunk(
  'GetGovCompanyDirector503',
  async (productId) => {
    const response = await GetGovCompanyDirector503(productId);
    return response;
  }
);
export const getCompanyDirector502_v2Req = createAsyncThunk(
  'GetCompanyDirector502_v2',
  async (productId) => {
    const response = await GetCompanyDirector502_v2(productId);
    return response;
  }
);
export const getCompanyDirector507_v2Req = createAsyncThunk(
  'GetCompanyDirector507_v2',
  async (productId) => {
    const response = await GetCompanyDirector507_v2(productId);
    return response;
  }
);
export const getCompanyDirectorshort_v2Req = createAsyncThunk(
  'GetCompanyDirectorshort_v2',
  async (productId) => {
    const response = await GetCompanyDirectorshort_v2(productId);
    return response;
  }
);
export const getCompanyDirector10k_v2Req = createAsyncThunk(
  'GetCompanyDirector10k_v2',
  async (productId) => {
    const response = await GetCompanyDirector10k_v2(productId);
    return response;
  }
);
// AiG Company Directors
export const getGovDirectorInfoReq = createAsyncThunk(
  'GetGovDirectorInfo',
  async (productId) => {
    const response = await GetGovDirectorInfo(productId);
    return response;
  }
);

export const get_Gov_Independent_Graph_DataReq = createAsyncThunk(
  'Get_Gov_Independent_Graph_Data',
  async (productId) => {
    const response = await Get_Gov_Independent_Graph_Data(productId);
    return response;
  }
);

export const get_Gov_Tenure_Graph_DataReq = createAsyncThunk(
  'Get_Gov_Tenure_Graph_Data',
  async (productId) => {
    const response = await Get_Gov_Tenure_Graph_Data(productId);
    return response;
  }
);

export const get_Gov_Gender_Graph_DataReq = createAsyncThunk(
  'Get_Gov_Gender_Graph_Data',
  async (productId) => {
    const response = await Get_Gov_Gender_Graph_Data(productId);
    return response;
  }
);

export const getComDirProfReq = createAsyncThunk(
  'GetComDirProf',
  async (productId) => {
    const response = await GetComDirProf(productId);
    return response;
  }
);

export const getComDirUpcomingReq = createAsyncThunk(
  'getComDirUpcomingReq',
  async (productId) => {
    const response = await GetComDirUpcoming(productId);
    return response;
  }
);

export const getComDirProfPastReq = createAsyncThunk(
  'GetComDirProfPast',
  async (productId) => {
    const response = await GetComDirProfPast(productId);
    return response;
  }
);

export const getBoardNewsHeadlinesReq = createAsyncThunk(
  'GetBoardNewsHeadlines',
  async (productId) => {
    const response = await GetBoardNewsHeadlines(productId);
    return response;
  }
);

export const get_interlocking_directors_JSON_v2Req = createAsyncThunk(
  'Get_interlocking_directors_JSON_v2',
  async (productId) => {
    const response = await Get_interlocking_directors_JSON_v2(productId);
    return response;
  }
);

// AiG Poison Pill
export const getDetPoisonPillReq = createAsyncThunk(
  'GetDetPoisonPill',
  async (productId) => {
    const response = await GetDetPoisonPill(productId);
    return response;
  }
);

export const getItem303MaterialReq = createAsyncThunk(
  'GetItem303Material',
  async (productId) => {
    const response = await GetItem303Material(productId);
    return response;
  }
);

export const getDetPoisonPillTopHdrReq = createAsyncThunk(
  'GetDetPoisonPillTopHdr',
  async (productId) => {
    const response = await GetDetPoisonPillTopHdr(productId);
    return response;
  }
);
// AiG Byline
export const getCompanyDirector503Req = createAsyncThunk(
  'GetCompanyDirector503',
  async (productId) => {
    const response = await GetCompanyDirector503(productId);
    return response;
  }
);

export const getDataGetItem303MaterialReq = createAsyncThunk(
  'Get_Bylaws_Charter_GovGuidelines_Data',
  async (productId) => {
    const response = await Get_Bylaws_Charter_GovGuidelines_Data(productId);
    return response;
  }
);
// AiG Complience
export const getCompFillingTypeReq = createAsyncThunk(
  'GetCompFillingType',
  async (productId) => {
    const response = await GetCompFillingType(productId);
    return response;
  }
);

export const getCompStatementReq = createAsyncThunk(
  'GetCompStatement',
  async (productId) => {
    const response = await GetCompStatement(productId);
    return response;
  }
);

export const getComplianceComparisonIndexesReq = createAsyncThunk(
  'GetComplianceComparisonIndexes',
  async (productId) => {
    const response = await GetComplianceComparisonIndexes(productId);
    return response;
  }
);

export const getComplianceVotinDissentReq = createAsyncThunk(
  'GetComplianceVotinDissent',
  async (productId) => {
    const response = await GetComplianceVotinDissent(productId);
    return response;
  }
);

// Activism > Activist Investment
export const getActivistInvestorsForCompanyReq = createAsyncThunk(
  'getActivistInvestorsForCompanyReq',
  async (res) => {
    const response = await GetActivistInvestorsForCompany(res);
    return response;
  }
);
export const getActivistNotifiedHoldingReq = createAsyncThunk(
  'getActivistNotifiedHoldingReq',
  async (res) => {
    const response = await GetActivistNotifiedHolding(res);
    return response;
  }
);

// #region OwnerShip Long/ Short - Company
export const getLatestOwnershipDateListReq = createAsyncThunk(
  'getLatestOwnershipDateList',
  async (productId) => {
    const response = await getLatestOwnershipDateList(productId);
    return response;
  }
);

export const GetCompanyActivisamTabDataCheckReq = createAsyncThunk('GetCompanyActivisamTabDataCheckReq', async (res) => {
  const response = await GetCompanyActivisamTabDataCheck(res);
  return response;
});

export const getOwnershipLongInvestorDataReq = createAsyncThunk('getOwnershipLongInvestorData', async (res) => {
  let response;
  const { filter, TrialStatus, resAllowDownload } = await getOwnershipStatus();

  if (filter && !TrialStatus) {
    // TOP 5 & status = 2
    response = await getOwnershipLongInvestorData({
      pid: res.pid,
      period_of_report: res.value,
      change_comparison: res.value,
      filterRecords: null
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getownershipCompanyDummyData();
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
      pid: res.pid,
      filterRecords: null
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getownershipCompanyDummyData();
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
      pid: res.pid,
      filterRecords: null
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getownershipCompanyDummyData();
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
      pid: res.pid,
      filterRecords: null
    });
  } else if (filter && TrialStatus) {
    const resDummydata = await getownershipCompanyDummyData();
    response = resDummydata.data !== undefined ? resDummydata.data.shortFund : [];
  } else {
    response = await getOwnershipShortFundData(res);
  }
  return { response, TrialStatus, allowDownload: resAllowDownload };
});

export const getListCompanyFilingsByActivist_v2Req = createAsyncThunk(
  'listCompanyFilingsByActivist_v2',
  async (arg) => {
    const response = await listCompanyFilingsByActivist_v2(
      arg.company_id,
      arg.activist_id,
      arg.longShort
    );
    return response;
  }
);

export const getOwnershipLongShortInvestorDataCheckReq = createAsyncThunk(
  'getOwnershipLongShortInvestorDataCheckReq',
  async (res) => {
    const response = await getOwnershipLongShortInvestorDataCheck(res);
    if (response) {
      const shortAccess = await getOwnershipStatusShort(response.Short);
      const longAccess = await getOwnershipStatusLong(response.Long);
      return { response: { Short: shortAccess, Long: longAccess, ShortFund: response.ShortFund, LongFund: response.LongFund } };
    }
    return { response };
  }
);
export const getPeerGroupDefaultNameReq = createAsyncThunk(
  'getPeerGroupDefaultNameReq',
  async (req) => {
    const response = await GetPeerGroupDefaultName(req);
    return response;
  }
);

export const updateCompanyVunScorereq = createAsyncThunk(
  'updateCompanyVunScorereq',
  async (req) => {
    const response = await UpdateCompanyVunScoreData(req);
    return response;
  }
);

export const GetAdmGetCompanyShell_spacReq = createAsyncThunk(
  'GetAdmGetCompanyShell_spacReq',
  async (pid) => {
    const response = await GetAdmGetCompanyShell_spac(pid);
    return response;
  }
);

// #endregion

const CompanySlice = createSlice({
  name: 'company',
  initialState: {
    isLoadingData: true,
    isLoadingGovDirectorData: true,
    isLoadingVulnerabilityData: true,
    isLoadingActivistInvestmentData: true,
    isLoadingData_Overview: true,

    DecodeToken: [],
    getTokenDecode: [],
    votingOverviewLoading: true,
    TrialLog_voting: false,
    //
    getTrialOrActualTop20List: [],
    getTrialOrActualTop20List_TrialStatus: false,
    allowDownload: false,
    companyProfileTitle: '',
    companyProfile: '',
    //
    companyDirector503: [],
    companyDirector502: [],
    companyDirector507: [],
    proxyStatements: [],
    director10k: [],
    directorInfo: {},
    vunDirectorInfo: [],
    independentGraphData: {},
    tenureGraphData: {},
    genderGraphData: {},
    currDirectorsProf: [],
    pastDirectorsProf: [],
    boardNewsHeadlines: [],
    interlockingDirectors: {},
    interlockingDirectors_NodesArr: [],
    interlockingDirectors_LinksArr: [],

    committeeHeaders: [],
    currDirectors_visibleEthnicityColumn: false,
    currDirectors_EthnicityChartData: [],
    //
    poisonPill: [],
    poisonPillHeader: [],
    item303: [],
    //
    companyByLawDirector503: [],
    dataGetItem303: [[], [], [], [], [], []],
    //
    complianceFillingType: [],
    complianceStatement: [{ source: '' }],
    complianceComparisonIndexes: [{ id: null, text: '', commit: [[], [], []] }],
    complianceDissent: [],
    PIGetMostRecentAGMOrPCMeetingIdWithVotes: {},
    //
    meetingDate: '',
    recentVotingResults: [],
    votingRemuneration: [],
    votingRemunerationOneYearBack: [],
    directorMedian: [],

    vunReport: [],
    vunReportIDs: [],
    //
    VunGetAllRemunerationMediansAndMADMs: [],
    VunGetAllDirectorMediansAndMADMs: [],
    VunGetAllRemunerationMediansAndMADMsYearAroundDate: [],
    VulnerabilityScoreOverTime: [],
    VulnerabilityPrankOverTime: [],

    //
    vunKeyFinancials: [],
    vunYears: {},
    vunKeyRatios: [],
    activistInvestors: [],
    activismSummary: [],
    engagement: [],
    maxEndDate: '',
    activistInPlay: 0,
    percentileRank: '',
    tickerName: '',
    vunSPP: {},
    //
    recentFilings: [],
    //
    vulnerabilityReport: {},
    //
    activistFilings: [],
    isLoadingActivistFilings: true,
    activistShortsFilings: [],
    company_overview: {},
    stock_events: [],
    // activism overview graphs
    activismTypeGraphdata: [],
    activismFocusGraphData: [],
    activismLocationGraphData: [],
    activsimSizeGraphData: [],
    activsimPublicDemandGraphData: [],
    ddlForCampaingData: [],
    ddlShortSellerCampaignData: [],
    ddlShortSellertSelectedVal: {},
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
    annotatedStockGraph: [],
    lollipopsGraph: [],

    toggleChart: true,
    vunSummaryScoreData: [],
    vunSummaryScoreDataScore: null,
    vunSummaryScoreDataMaxScore: null,
    // #endregion

    // Activist Investment
    lstActivistInvestors: [],
    lstActivistNotifiedHoldings: [],

    vunDirectorCompany: undefined,
    vunDirectorAllCompanies: undefined,
    vunDirectorPeerGroup: undefined,
    vunDirectorSP500: undefined,

    shareholderProposal: [],
    //Ais Campaigns
    aiSInvestorForCompanyrowData: [],
    aiSActivismSummaryrowData: [],
    ddlSelection: {},
    rowData_AiSInvestorForCompany: [],
    lstCompanyPeerGroup: [],
    lstOriginalData: [],
    lblPeerGroups: '',

    //LONG/Short Access
    longAccess: 0,
    shortAccess: 0,
    longfund: null,
    shortfund: null,
    getCompDirUpcomData: [],
    accessComFilings: false,
    peerGroupDefaultName: '',
    //SPAC/Shell Company
    companyShellSPAC: [],
    shell_or_spac: false,
  },
  reducers: {
    handleVisitorLog: {
      reducer() {},
      prepare(page_name, query_string) {
        UpdateVisitorLog(page_name, query_string);
        return {
          payload: { DecodeToken: [] },
        };
      },
    },
    resetCompanyProfile: {
      reducer(state, action) {
        state.companyProfile = action.payload;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleSelectedMeetingDates: {
      reducer(state, action) {
        state.selectedMeetingDates = action.payload.selectedMeetingDates;
      },
      prepare(selectedMeetingDates) {
        return {
          payload: { selectedMeetingDates },
        };
      },
    },
    handleResetVulnerabilityReport: {
      reducer(state) {
        state.VunGetAllRemunerationMediansAndMADMs = [];
        state.VunGetAllDirectorMediansAndMADMs = [];
        state.VunGetAllRemunerationMediansAndMADMsYearAroundDate = [];
        state.isLoadingVulnerabilityData = true;
        state.lstOriginalData = [];
      },
    },
    handleClearSelection: {
      reducer(state) {
        state.rowData_AiSInvestorForCompany = [];
        state.rowData_AiSActivismSummary = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetActivistOverview: {
      reducer(state) {
        state.rowData_activistShortCurrentShortPosition = [];
        state.rowData_activistShortActivistInvestorsForCompany = [];
        state.rowData_activistShortHistoricShortPosition = [];
        state.rowData_activistShortTotalShortPosition = [];
        state.company_overview = {};
        state.activismshortCurrentShortPositionrowData = [];
        state.activistShortActivistInvestorsForCompanyrowData = [];
        state.rowData_AiSInvestorForCompany = [];
        state.rowData_AiSActivismSummary = [];
        state.ddlShortSellerCampaignData = [];
        state.isLoadingData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetCompanyOverview: {
      reducer(state) {
        state.company_overview = {};
        state.stock_events = [];
        state.annotatedStockGraph = [];
        state.lollipopsGraph = [];
        state.vunSummaryScoreData = [];
        state.vunSummaryScoreDataScore = null;
        state.vunSummaryScoreDataMaxScore = null;
        state.lstCompanyPeerGroup = [];
        state.lstOriginalData = [];
        state.lblPeerGroups = '';
        state.isLoadingData_Overview = true;
        state.companyShellSPAC = [];
        state.shell_or_spac = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetGovernanceDirectors: {
      reducer(state) {
        state.companyDirector503 = [];
        state.companyDirector502 = [];
        state.companyDirector507 = [];
        state.proxyStatements = [];
        state.director10k = [];
        state.directorInfo = {};
        state.independentGraphData = {};
        state.tenureGraphData = {};
        state.genderGraphData = {};
        state.currDirectorsProf = [];
        state.pastDirectorsProf = [];
        state.boardNewsHeadlines = [];
        state.interlockingDirectors = {};
        state.interlockingDirectors_NodesArr = [];
        state.interlockingDirectors_LinksArr = [];
        state.committeeHeaders = [];
        state.currDirectors_visibleEthnicityColumn = false;
        state.currDirectors_EthnicityChartData = [];
        state.isLoadingGovDirectorData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetGovernanceShareholders: {
      reducer(state) {
        state.shareholderProposal = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetActivismFiling: {
      reducer(state) {
        state.activistFilings = [];
        state.isLoadingActivistFilings = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetActivistShortFiling: {
      reducer(state) {
        state.activistShortsFilings = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetGovernanceLatestFiling: {
      reducer(state) {
        state.companyDirector503 = [];
        state.companyDirector502 = [];
        state.companyDirector507 = [];
        state.proxyStatements = [];
        state.director10k = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetGovernanceBylaw: {
      reducer(state) {
        state.companyByLawDirector503 = [];
        state.dataGetItem303 = [[], [], [], [], [], []];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetGovernanceCompliance: {
      reducer(state) {
        state.complianceFillingType = [];
        state.complianceStatement = [{ source: '' }];
        state.complianceComparisonIndexes = [
          { id: null, text: '', commit: [[], [], []] },
        ];
        state.complianceDissent = [];
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleOnchangeDdl: {
      reducer(state, action) {
        state.ddlForCampaingData =
          action.payload !== undefined ? action.payload : [];
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },

    // #region OwnerShip Long/ Short - Company
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
    handleToggleChart: {
      reducer(state) {
        state.toggleChart = !state.toggleChart;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetSearch: {
      reducer(state) {
        state.searchCompanyRecordset = { data: [] };
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetActivismGraphs: {
      reducer(state) {
        state.activismTypeGraphdata = [];
        state.activismFocusGraphData = [];
        state.activismLocationGraphData = [];
        state.activsimSizeGraphData = [];
        state.activsimPublicDemandGraphData = [];
        state.ddlForCampaingData = [];
        state.ddlShortSellerCampaignData = [];
        state.getTrialOrActualTop20List = [];
        state.getTrialOrActualTop20List_TrialStatus = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    // #endregion
    // #region
    handleResetActivismInvestments: {
      reducer(state) {
        state.lstActivistInvestors = [];
        state.lstActivistNotifiedHoldings = [];
        state.isLoadingActivistInvestmentData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    // #endregion

    // #region
    handleResetActivistVulnerability: {
      reducer(state) {
        state.PIGetMostRecentAGMOrPCMeetingIdWithVotes = {};
        state.PIGetShareholdersTop10 = [];
        state.GetVunGetAllInstitutionalMediansAndMADMs = undefined;
        state.GetVunGetAllActivistMediansAndMADMs = undefined;
        state.recentFilings = [];
        state.vunDirectorInfo = [];
        state.vulnerabilityReport = {};
        state.VulnerabilityScoreOverTime = [];
        state.VulnerabilityPrankOverTime = [];
        state.toggleChart = true;
        state.vunSummaryScoreData = [];
        state.vunDirectorCompany = undefined;
        state.vunDirectorAllCompanies = undefined;
        state.vunDirectorPeerGroup = undefined;
        state.vunDirectorSP500 = undefined;
        state.PIGetIssuer = {};
        state.vunKeyRation = [];

        state.vunKeyFinancials = [];
        state.vunYears = {};
        state.vunKeyRatios = [];
        state.activistInvestors = [];
        state.activismSummary = [];
        state.engagement = [];
        state.maxEndDate = '';
        state.activistInPlay = 0;
        state.percentileRank = '';
        state.tickerName = '';
        state.vunSPP = {};

        state.meetingDate = '';
        state.recentVotingResults = [];
        state.votingRemuneration = [];
        state.votingRemunerationOneYearBack = [];
        state.directorMedian = [];

        state.vunReport = [];
        state.vunReportIDs = [];
      },
      prepare() {
        return {};
      },
    },
    handleResetPoisonPill: {
      reducer(state) {
        state.poisonPill = [];
        state.poisonPillHeader = [];
        state.item303 = [];
      },
      prepare() {
        return {};
      },
    },
    handleResetActivistShortCampaigns: {
      reducer(state) {
        state.ddlForCampaingData = [];
        state.ddlShortSellerCampaignData = [];
        state.ddlShortSellertSelectedVal = {};
        state.rowData_AiSInvestorForCompany = [];
        state.DDLValues = undefined;
        state.chkCampaign = undefined;
        state.table_Advisors = [];
        state.rowData_AiSActivismSummary = [];
        state.distinctProfile = undefined;
        state.isLoadingData = true;
      },
      prepare() {
        return {};
      },
    },
    // #endregion
    //#region -ownership
    handleResetOwenerShip: {
      reducer(state) {
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
    //#endregion
    //#region
    handledLoadingBylaw: {
      reducer(state, action) {
        state.isLoadingData = true;
        state.dataGetItem303 = [[], [], [], [], [], []];
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    //#endregion
    handledLoading: {
      reducer(state, action) {
        state.isLoadingData = action.payload.e;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
  },
  extraReducers: {
    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
    [searchFormReq.fulfilled]: (state, action) => {
      state.searchCompanyRecordset =
        action.payload !== undefined && action.payload
          ? action.payload
          : { data: [] };
    },
    [getCompanyProfileReq.fulfilled]: (state, action) => {
      state.companyProfile =
        action.payload !== undefined ? action.payload.data : '';
      state.companyProfileTitle =
        action.payload !== undefined ? action.payload.company_name : '';
    },
    //
    [GetTrialOrActualTop20ListReq.fulfilled]: (state, action) => {
      state.getTrialOrActualTop20List =
        action.payload !== undefined ? action.payload.response : [];
      state.getTrialOrActualTop20List_TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
    },
    [listTopTwentyActivistActivityReq.fulfilled]: (state, action) => {
      state.listTopTwentyActivistActivity = action.payload.response;
    },
    // AIV
    [vunList10QAnd10KForIssuerReq.fulfilled]: (state, action) => {
      state.recentFilings =
        action.payload !== undefined ? action.payload.data : [];
    },
    [vunGetGovDirectorInfoV4Req.fulfilled]: (state, action) => {
      const data =
        action.payload !== undefined && action.payload.length > 0
          ? action.payload
          : [];

      state.vunDirectorInfo = data;
      state.vunDirectorCompany =
        data.length > 0 ? action.payload[0] : undefined;
      state.vunDirectorAllCompanies =
        data.length > 0 ? action.payload[3] : undefined;
      state.vunDirectorPeerGroup =
        data.length > 0 ? action.payload[1] : undefined;
      state.vunDirectorSP500 = data.length > 0 ? action.payload[2] : undefined;
    },
    [vunListNewsArticlesForIssuerReq.fulfilled]: (state, action) => {
      state.vulnerabilityReport = action.payload;

      state.vunReport =
        action.payload !== undefined ? action.payload.vunReport : [];
      state.vunReportIDs =
        action.payload !== undefined ? action.payload.vunReportIDs : [];
    },
    [vunSummaryScore.fulfilled]: (state, action) => {
      state.vunSummaryScoreData = [];
      state.vunSummaryScoreData = action.payload;
      state.vunSummaryScoreDataScore = action.payload.score;
      state.vunSummaryScoreDataMaxScore = action.payload.max_score;
    },
    [piGetIssuerReq.fulfilled]: (state, action) => {
      state.PIGetIssuer =
        action.payload !== undefined ? action.payload.data : {};

      state.vunKeyFinancials =
        action.payload !== undefined
          ? action.payload.data.vunKeyFinancials
          : [];
      state.vunYears =
        action.payload !== undefined ? action.payload.data.vunYears : [];
      state.vunKeyRatios =
        action.payload !== undefined ? action.payload.data.vunKeyRatios : [];

      state.vunKeyRation =
        action.payload !== undefined ? action.payload.data.vunKeyRatios : [];

      state.activistInvestors =
        action.payload !== undefined
          ? action.payload.data.activistInvestors
          : [];
      state.activismSummary =
        action.payload !== undefined ? action.payload.data.activismSummary : [];
      state.engagement =
        action.payload !== undefined ? action.payload.data.engagement : [];
      state.maxEndDate =
        action.payload !== undefined ? action.payload.data.maxEndDate : '';
      state.activistInPlay =
        action.payload !== undefined ? action.payload.data.activistInPlay : 0;
      state.percentileRank =
        action.payload !== undefined ? action.payload.data.percentileRank : '';
      state.tickerName =
        action.payload !== undefined ? action.payload.data.tickerName : '';
      state.vunSPP =
        action.payload !== undefined ? action.payload.data.vunSPP : {};
    },
    // ACTIVIST SHORT: when stored async thunk value api call is completed set the payload to the state and the rowData
    [getAiSCompDisclosedShortPositionsReq.fulfilled]: (state, action) => {
      state.rowData_activistShortCurrentShortPosition =
        action.payload !== undefined ? action.payload.data : [];
    },
    [listActivistInvestorsForCompany_NEW_aisReq.fulfilled]: (state, action) => {
      state.rowData_activistShortActivistInvestorsForCompany = action.payload;
    },
    [getHistoricShortPositionsReq.fulfilled]: (state, action) => {
      state.rowData_activistShortHistoricShortPosition =
        action.payload !== undefined ? action.payload.data : [];
    },
    [getAiSCompTotalShortPositionsReq.fulfilled]: (state, action) => {
      state.rowData_activistShortTotalShortPosition =
        action.payload !== undefined ? action.payload.data : [];
    },
    // AiSC
    [listActivistInvestorsForCompanyAiSReq.fulfilled]: (state, action) => {
      state.rowData_AiSInvestorForCompany =
        action.payload !== undefined ? action.payload.data : [];
      if (
        action.payload !== undefined &&
        action.payload.data !== undefined &&
        action.payload.data.length > 0
      ) {
        state.ddlShortSellerCampaignData = action.payload.data.map(
          (investor) => ({
            label: investor.name,
            value: investor.campaign_summary_id,
          })
        );
      }
    },
    [getActivismSummary_AiSReq.fulfilled]: (state, action) => {
      state.rowData_AiSActivismSummary =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingData = action.payload === undefined;
    },
    // AiG Shareholder Proposals
    [getAIG_ShareholderProposals_v2Req.fulfilled]: (state, action) => {
      state.shareholderProposal =
        action.payload !== undefined ? action.payload.data : [];
        state.isLoadingData = action.payload === undefined;
    },
    [getActivismOverviewGraphsReq.fulfilled]: (state, action) => {
      state.activismTypeGraphdata =
        action.payload.lstActivismType !== undefined
          ? action.payload.lstActivismType
          : [];
      state.activismFocusGraphData =
        action.payload.lstActivismFocus !== undefined
          ? action.payload.lstActivismFocus
          : [];
      state.activismLocationGraphData =
        action.payload.lstActivismLocation !== undefined
          ? action.payload.lstActivismLocation
          : [];
      state.activsimSizeGraphData =
        action.payload.lstActivismSize !== undefined
          ? action.payload.lstActivismSize
          : [];
      state.activsimPublicDemandGraphData =
        action.payload.lstActivismPublicDemand !== undefined
          ? action.payload.lstActivismPublicDemand
          : [];
    },
    // AiG Latest Filing
    [getGovCompanyDirector503Req.fulfilled]: (state, action) => {
      state.companyDirector503 = action.payload;
    },
    [getCompanyDirector502_v2Req.fulfilled]: (state, action) => {
      state.companyDirector502 = action.payload;
    },
    [getCompanyDirector507_v2Req.fulfilled]: (state, action) => {
      state.companyDirector507 = action.payload;
    },
    [getCompanyDirectorshort_v2Req.fulfilled]: (state, action) => {
      state.proxyStatements = action.payload;
    },
    [getCompanyDirector10k_v2Req.fulfilled]: (state, action) => {
      state.director10k = action.payload;
    },

    // #region AiG Company Governace: Director
    [getGovDirectorInfoReq.fulfilled]: (state, action) => {
      state.directorInfo =
        action.payload !== undefined ? action.payload.data : {};
    },
    [get_Gov_Independent_Graph_DataReq.fulfilled]: (state, action) => {
      state.independentGraphData =
        action.payload !== undefined ? action.payload.data : {};
    },
    [get_Gov_Tenure_Graph_DataReq.fulfilled]: (state, action) => {
      state.tenureGraphData =
        action.payload !== undefined ? action.payload.data : {};
    },
    [get_Gov_Gender_Graph_DataReq.fulfilled]: (state, action) => {
      state.genderGraphData =
        action.payload !== undefined ? action.payload.data : {};
    },
    [get_interlocking_directors_JSON_v2Req.fulfilled]: (state, action) => {
      state.interlockingDirectors =
        action.payload !== undefined ? action.payload.data : {};
      state.interlockingDirectors_NodesArr =
        action.payload !== undefined ? action.payload.nodes : [];
      state.interlockingDirectors_LinksArr =
        action.payload !== undefined ? action.payload.links : [];
      state.isLoadingGovDirectorData = action.payload === undefined;
    },
    [getBoardNewsHeadlinesReq.fulfilled]: (state, action) => {
      state.boardNewsHeadlines =
        action.payload !== undefined ? action.payload.data : [];
    },
    [getComDirProfPastReq.fulfilled]: (state, action) => {
      state.pastDirectorsProf =
        action.payload !== undefined ? action.payload.data : [];
    },
    [getComDirProfReq.fulfilled]: (state, action) => {
      state.currDirectorsProf =
        action.payload !== undefined ? action.payload.data : [];
      state.committeeHeaders =
        action.payload !== undefined ? action.payload.committeeHeaders : [];
      state.currDirectors_visibleEthnicityColumn =
        action.payload !== undefined
          ? action.payload.visibleEthnicity_Column
          : false;
      state.currDirectors_EthnicityChartData =
        action.payload !== undefined ? action.payload.arrEthnicityChart : [];
    },
    [getComDirUpcomingReq.fulfilled]: (state, action) => {
      state.getCompDirUpcomData =
        action.payload !== undefined ? action.payload : [];
    },
    // #endregion

    // AiG Poison Pill
    [getDetPoisonPillReq.fulfilled]: (state, action) => {
      state.poisonPill = action.payload;
    },
    [getDetPoisonPillTopHdrReq.fulfilled]: (state, action) => {
      state.poisonPillHeader = action.payload;
    },
    [getItem303MaterialReq.fulfilled]: (state, action) => {
      state.item303 = action.payload;
    },
    // AiG Bylaw
    [getCompanyDirector503Req.fulfilled]: (state, action) => {
      state.companyByLawDirector503 = action.payload;
    },
    [getDataGetItem303MaterialReq.fulfilled]: (state, action) => {
      state.dataGetItem303 = action.payload;
      state.isLoadingData = action.payload === undefined;
    },
    // AiG Complience
    [getCompFillingTypeReq.fulfilled]: (state, action) => {
      state.complianceFillingType = action.payload;
    },
    [getCompStatementReq.fulfilled]: (state, action) => {
      state.complianceStatement = action.payload;
    },
    [getComplianceComparisonIndexesReq.fulfilled]: (state, action) => {
      state.complianceComparisonIndexes = action.payload;
    },
    [getComplianceVotinDissentReq.fulfilled]: (state, action) => {
      state.complianceDissent = action.payload;
    },
    [piGetShareholdersTop10Req.fulfilled]: (state, action) => {
      state.PIGetShareholdersTop10 = action.payload.response;
      state.isLoadingVulnerabilityData = action.payload === undefined;
    },
    [getVunGetAllInstitutionalMediansAndMADMsReq.fulfilled]: (
      state,
      action
    ) => {
      if (action.payload.response !== undefined) {
        state.GetVunGetAllInstitutionalMediansAndMADMs =
          action.payload.response;
      }
    },
    [getVunGetAllActivistMediansAndMADMsReq.fulfilled]: (state, action) => {
      if (action.payload.response !== undefined) {
        state.GetVunGetAllActivistMediansAndMADMs = action.payload.response;
      }
    },
    // adding !== undefined ? action.payload.response : []; fixes issue with apple breaking but makes it all undefined
    [pIGetMostRecentAGMOrPCMeetingIdWithVotesReq.fulfilled]: (
      state,
      action
    ) => {
      state.PIGetMostRecentAGMOrPCMeetingIdWithVotes =
        action.payload !== undefined ? action.payload.data : {};

      state.meetingDate =
        action.payload !== undefined ? action.payload.data.meetingDate : '';
      state.recentVotingResults =
        action.payload !== undefined
          ? action.payload.data.recentVotingResults
          : [];
      state.votingRemuneration =
        action.payload !== undefined
          ? action.payload.data.votingRemuneration
          : [];
      state.votingRemunerationOneYearBack =
        action.payload !== undefined
          ? action.payload.data.votingRemunerationOneYearBack
          : [];
      state.directorMedian =
        action.payload !== undefined ? action.payload.data.directorMedian : [];
    },
    [vunGetAllRemunerationMediansAndMADMsReq.fulfilled]: (state, action) => {
      state.VunGetAllRemunerationMediansAndMADMs = action.payload.response;
    },
    [vunGetAllDirectorMediansAndMADMsReq.fulfilled]: (state, action) => {
      state.VunGetAllDirectorMediansAndMADMs = action.payload.response;
    },
    [vunGetAllRemunerationMediansAndMADMsYearAroundDateReq.fulfilled]: (
      state,
      action
    ) => {
      state.VunGetAllRemunerationMediansAndMADMsYearAroundDate =
        action.payload.response;
    },
    [getVulnerabilityScoreOverTimeReq.fulfilled]: (state, action) => {
      state.VulnerabilityScoreOverTime = action.payload.response;
    },
    [getVulnerabilityPrankOverTimeReq.fulfilled]: (state, action) => {
      state.VulnerabilityPrankOverTime = action.payload.response;
    },
    // Ownership-Company
    [getLatestOwnershipDateListReq.fulfilled]: (state, action) => {
      state.latestOwnershipDateList =
        action.payload !== undefined ? action.payload.DateList : [];
    },
    [getOwnershipLongInvestorDataReq.fulfilled]: (state, action) => {
      state.ownershipLongInvestor_Data =
        action.payload !== undefined ? action.payload.response.data : [];
      state.ownershipLongInvestor_Heading =
        action.payload !== undefined ? action.payload.response.heading : [];
      state.ownershipLongInvestor_Footer =
        action.payload !== undefined ? action.payload.response.dataFooter : [];
      state.ownershipLongInvestor_statusTop5 =
        action.payload !== undefined ? action.payload.response.statusTop5 : [];
      state.ownershipLongShort_TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
    },
    [getOwnershipLongFundDataReq.fulfilled]: (state, action) => {
      state.ownershipLongFund_Data =
        action.payload !== undefined ? action.payload.response.data : [];
      state.ownershipLongFund_Heading =
        action.payload !== undefined ? action.payload.response.heading : [];
      state.ownershipLongFund_Footer =
        action.payload !== undefined ? action.payload.response.dataFooter : [];
      state.ownershipLongFund_statusTop5 =
        action.payload !== undefined ? action.payload.response.statusTop5 : [];
      state.ownershipLongShort_TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
    },
    [getOwnershipShortInvestorDataReq.fulfilled]: (state, action) => {
      state.ownershipShortInvestor_Data =
        action.payload !== undefined ? action.payload.response.data : [];
      state.ownershipShortInvestor_Heading =
        action.payload !== undefined ? action.payload.response.heading : [];
      state.ownershipShortInvestor_Footer =
        action.payload !== undefined ? action.payload.response.dataFooter : [];
      state.ownershipShortInvestor_statusTop5 =
        action.payload !== undefined ? action.payload.response.statusTop5 : [];
      state.ownershipLongShort_TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
    },
    [getOwnershipShortFundDataReq.fulfilled]: (state, action) => {
      state.ownershipShortFund_Data =
        action.payload !== undefined ? action.payload.response.data : [];
      state.ownershipShortFund_Heading =
        action.payload !== undefined ? action.payload.response.heading : [];
      state.ownershipShortFund_Footer =
        action.payload !== undefined ? action.payload.response.dataFooter : [];
      state.ownershipShortFund_statusTop5 =
        action.payload !== undefined ? action.payload.response.statusTop5 : [];
      state.ownershipLongShort_TrialStatus =
        action.payload !== undefined ? action.payload.TrialStatus : false;
      state.allowDownload =
        action.payload !== undefined ? action.payload.allowDownload : false;
      state.isLoadingOwnership = action.payload === undefined;
    },
    [getListCompanyFilingsByActivist_v2Req.fulfilled]: (state, action) => {
      state.activistFilings = action.payload;
      state.isLoadingActivistFilings = action.payload === undefined;
      // state.accessComFilings = action.payload && action.payload.length > 0;
    },

    [getCompanyOverviewProfileReq.fulfilled]: (state, action) => {
      state.company_overview =
        action.payload !== undefined &&
        action.payload.data !== undefined &&
        action.payload.data.length > 0
          ? action.payload.data[0]
          : {};
        state.isLoadingData_Overview = action.payload === undefined;
    },
    [getCompanyStockEventsReq.fulfilled]: (state, action) => {
      state.stock_events =
        action.payload.data.length > 0 ? action.payload.data : [];
    },
    [getStockValues_graphReq.fulfilled]: (state, action) => {
      state.annotatedStockGraph =
        action.payload.length > 0
          ? action.payload[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] !==
            ''
            ? JSON.parse(
                action.payload[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']
              )
            : ''
          : [];
    },
    [getLollipops_graphReq.fulfilled]: (state, action) => {
      state.lollipopsGraph =
        action.payload.length > 0
          ? action.payload[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] !==
            ''
            ? JSON.parse(
                action.payload[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']
              )
            : ''
          : [];
    },
    [getActivistInvestorsForCompanyReq.fulfilled]: (state, action) => {
      state.lstActivistInvestors =
        action.payload.length > 0 ? action.payload : [];
    },
    [getActivistNotifiedHoldingReq.fulfilled]: (state, action) => {
      state.lstActivistNotifiedHoldings =
        action.payload.length > 0 ? action.payload : [];
      state.isLoadingActivistInvestmentData = action.payload === undefined;
    },
    [getOwnershipLongShortInvestorDataCheckReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.longAccess = action.payload.response.Long;
        state.shortAccess = action.payload.response.Short;
        state.longfund = action.payload.response.LongFund;
        state.shortfund = action.payload.response.ShortFund;
      }
    },
    [getcompany_PeerGroupOverviewReq.fulfilled]: (state, action) => {
      state.lstCompanyPeerGroup =
        action.payload.data.length > 0 ? action.payload.data : [];
      state.lstOriginalData =
        action.payload.data.length > 0 ? action.payload.originalData : [];
    },
    [getComDirUpcomingReq.fulfilled]: (state, action) => {
      state.getCompDirUpcomData = action.payload !== undefined ? action.payload : [];
    },
    [GetCompanyActivisamTabDataCheckReq.fulfilled]: (state, action) => {
      state.accessComFilings = action.payload.Filling;
    },
    [getPeerGroupNameReq.fulfilled]: (state, action) => {
      state.lblPeerGroups =
        action.payload.data !== undefined ? action.payload.data : '';
    },
    [getPeerGroupDefaultNameReq.fulfilled]: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.peerGroupDefaultName = action.payload[0].peer_group_name;
      }
    },
    [updateCompanyVunScorereq.fulfilled]: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.vunSummaryScoreData = [];
        state.vunSummaryScoreData = action.payload[0];
      }
    },
    [GetAdmGetCompanyShell_spacReq.fulfilled]: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.shell_or_spac = action.payload[0].shell_or_spac;
        state.companyShellSPAC = action.payload;
      }
    },
  },
});

export const {
  handleVisitorLog,
  resetCompanyProfile,
  handleSelectedMeetingDates,
  handleClearSelection,
  handleResetActivistOverview,
  handleResetGovernanceDirectors,
  handleResetGovernanceShareholders,
  handleResetGovernanceLatestFiling,
  handleResetGovernanceBylaw,
  handleResetGovernanceCompliance,
  handleResetVulnerabilityReport,
  //
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  handleIsLoadingOwnership,
  handleResetActivismFiling,
  handleResetActivistShortFiling,
  handleResetCompanyOverview,
  //
  handleOnchangeDdl,
  handleToggleChart,
  handleShortSellerCampaign,
  handleResetSearch,
  handleResetActivismGraphs,
  handleResetActivismInvestments,
  handleResetActivistVulnerability,
  handleResetPoisonPill,
  handleResetOwenerShip,
  handleResetActivistShortCampaigns,
  handledLoadingBylaw,
  handledLoading
} = CompanySlice.actions;

export default CompanySlice.reducer;
