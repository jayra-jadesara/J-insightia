import axios from 'axios';
import {
  PublicCampaignToolLists as publicCampaignToolLists_config,
  getHoldingsDataAndAnalyticsData,
  getGlobalGovProvisionList as getGlobalGovProvisionList_config,
  getAllMeetingType,
  getCountryGovList as getCountryGovList_config,
  getAllGroupProponent,
  getAllIndividualProponent,
  getStateGovList as getStateGovList_config,
  resolutionsByInvestorFilter,
  getStateGovDetailList as getStateGovDetailList_config,
  getResolutionsByTarget,
  GetGlobalGovToolTrialList as GetGlobalGovToolTrialList_config,
  resolutionSearchByInvestor,
  GetPerformanceOverviewV2 as GetPerformanceOverviewV2_config,
  getHistoricalTrends,
  GetPerformanceCompounded as GetPerformanceCompounded_config,
  getInvestorVotingPower,
  ListFundPerformanceByYearV2 as ListFundPerformanceByYearV2_config,
  getVulDDL as getVulDDL_config,
  getVCId as getVCId_config,
  GetVulDataList as GetVulDataList_config,
  getResolutionsTypeIdByName,
  getVotingToolNoActionLetterDDL as getVotingToolNoActionLetterDDL_config,
  getVotingToolNoActionLetterAnalysisData as getVotingToolNoActionLetterAnalysisData_Config,
  noActionLetterDummyData,
  getActivistCampaignsTool,
  getLawFirmsDataActivismAdvisor,
  getDirectorSectorAndIndustrySearchData,
  getToolsActivismFillingsData,
  getLawFirmsDataShortActivismAdvisor,
  getPoisonPillStats,
  getRightsAgent,
  getPoisonPillRecentInsightia,
  getRegionsTrade,
  getInvestmentPublicData,
  getCompaniesTargetedTrends,
  getActiveActivistsTrends,
  getActiveCompanyRegiontrends,
  getActiveActivistsRegiontrends,
  getIndustryTargetedTrends,
  getCompaniesWithMultipleactivistsTrends,
  getMarketCapbyYearTrends,
  getActiveActivistsAUM,
  getSuccessRatesTrends,
  getStoredProcedureDownloadExcel,
  getAIGUpcomingMeetings,
  getUpcomingAppointmentsAndDepartures,
  investorComparatorhistoricalTrendsChartYTDData,
  investorComparatorhistoricalTrendsChartProxySeasonData,
  getHistoricalTrendsChartDataInvestorComparator
} from '../config/server-config';
import { TokenDecode, dateToISOString } from './general-util';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_ZERO,
} from '../constants/NumberConstants';
import {
  ACTIVISM,
  GOVERNANCE,
  VOTING,
  ACTIVIST_VULNERABILITY,
  ACTIVIST_SHORTS,
} from '../constants/ProductConstants';
import { TOOLMENU } from '../constants/PathsConstant';
import { history } from './navigation-util';
import { FULL_USER, TRIAL_USER } from '../constants/CompanyTrialTypeConstants';

// Public Demands Tool
export const PublicCampaignToolLists = async (
  status,
  product_id,
  cancelToken
) => {
  try {
    const response = await axios.post(
      publicCampaignToolLists_config,
      {
        status,
        product_id,
      },
      {
        cancelToken: cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

// holdings data and analytics
export const HoldingsDataAndAnalyticsList = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getHoldingsDataAndAnalyticsData,
      {
        product_id: ACTIVISM,
        token,
      },
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};
// Global Governance Tool
export const getGlobalGovProvisionList = async () => {
  try {
    const response = await axios.post(
      getGlobalGovProvisionList_config,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetAllMeetingTypes = async () => {
  try {
    const response = await axios.post(
      getAllMeetingType,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const getCountryGovList = async (country_id) => {
  try {
    const response = await axios.post(
      getCountryGovList_config,
      {
        country_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetAllGroupProponent = async () => {
  try {
    const response = await axios.post(
      getAllGroupProponent,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetAllIndividualProponent = async () => {
  try {
    const response = await axios.post(
      getAllIndividualProponent,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const getStateGovList = async (filterType) => {
  try {
    const response = await axios.post(
      getStateGovList_config,
      {
        filterType,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const ResolutionsByInvestorFilter = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      resolutionsByInvestorFilter,
      {
        StartDate: dateToISOString(req.startDate),
        EndDate: dateToISOString(req.endDate),
        MeetingType: req.meetingType,
        Proponent: req.proponent,
        ProposalSponsor: req.sponsor,
        CopampanySearchId: req.companySearchId,
        InvestorSearchId: req.investorSearchId,
        product_id: VOTING,
        token,
        investor_id: req.investor_id,
        cancelToken: req.cancelToken,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        cancelToken: req.cancelToken,
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const getStateGovDetailList = async (stateName) => {
  try {
    const response = await axios.post(
      getStateGovDetailList_config,
      {
        stateName,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const ResolutionsByTarget = async (
  startDate,
  endDate,
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getResolutionsByTarget,
      {
        StartDate: dateToISOString(startDate),
        EndDate: dateToISOString(endDate),
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetGlobalGovToolTrialList = async () => {
  try {
    const response = await axios.post(
      GetGlobalGovToolTrialList_config,
      {},
      // {
      //   stateName: stateName,
      // },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const ResolutionSearchByInvestor = async (
  startDate,
  endDate,
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      resolutionSearchByInvestor,
      {
        StartDate: dateToISOString(startDate),
        EndDate: dateToISOString(endDate),
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetPerformanceOverviewV2 = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      GetPerformanceOverviewV2_config,
      {
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

// Investor comparator tool
export const GetHistoricalTrends = async (
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType,
  defaultSelection
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getHistoricalTrends,
      {
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        DefaultSelection: defaultSelection,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};
export const InvestorComparatorhistoricalTrendsChartYTDData = async (
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType,
  defaultSelection
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      investorComparatorhistoricalTrendsChartYTDData,
      {
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        DefaultSelection: defaultSelection,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};
export const InvestorComparatorhistoricalTrendsChartProxySeasonData = async (
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType,
  defaultSelection
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      investorComparatorhistoricalTrendsChartProxySeasonData,
      {
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        DefaultSelection: defaultSelection,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};
export const GetHistoricalTrendsChartDataInvestorComparator = async (
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType,
  defaultSelection
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getHistoricalTrendsChartDataInvestorComparator,
      {
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        DefaultSelection: defaultSelection,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};
//

export const GetPerformanceCompounded = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      GetPerformanceCompounded_config,
      {
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetInvestorVotingPower = async (
  startDate,
  endDate,
  meetingType,
  proponent,
  proposalSponsor,
  companySearchId,
  investorSearchId,
  proposalTypeTopLevel,
  ProposalTypeSubLevel,
  proposalType,
  defaultSelection
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getInvestorVotingPower,
      {
        StartDate: dateToISOString(startDate),
        EndDate: dateToISOString(endDate),
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        CopampanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
        ProposalTypeToplevel: proposalTypeTopLevel,
        ProposalTypeSublevel: ProposalTypeSubLevel,
        ProposalType: proposalType,
        DefaultSelection: defaultSelection,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const ListFundPerformanceByYearV2 = async (Year) => {
  try {
    const response = await axios.post(
      ListFundPerformanceByYearV2_config,
      {
        Year,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

// Vul Comparetor Tool

export const getVulDDL = async () => {
  try {
    const response = await axios.post(
      getVulDDL_config,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};
export const getVCId = async (res) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      getVCId_config,
      {
        user_id: uid,
        VCId: res.vcid_VulTool,
        txtMarketCapMinRange: res.txtMarketCapMinRange,
        txtMarketCapMaxRange: res.txtMarketCapMaxRange,
        companySearchOptionSelection: res.companySearchOptionSelection,
        companySelection: res.companySelection,
        //
        SetKeyFinancials: res.SetKeyFinancials,
        SetKeyRatios: res.SetKeyRatios,
        SetVulnerability: res.SetVulnerability,
        SetOwnership: res.SetOwnership,
        SetGovernance: res.SetGovernance,
        SetVoting: res.SetVoting,
        SetPeerGroupSelection: res.SetPeerGroupSelection,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetVulDataList = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    const token = localStorage.getItem('token');
    const response = await axios.post(
      GetVulDataList_config,
      {
        user_id: uid,
        VCId: req.vcid,
        peerGroupSelection: req.SetPeerGroupSelection,
        product_id: ACTIVIST_VULNERABILITY,
        token,
        companySearchOptionSelection: req.companySearchOptionSelection,
        companySelection: req.companySelection,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetResolutionsTypeIdByName = async (lavel, proposalType) => {
  try {
    const response = await axios.post(
      getResolutionsTypeIdByName,
      {
        Lavel: lavel,
        ProposalType: proposalType,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

// Voting Tool : No action letters

export const getVotingToolNoActionLetterDDL = async () => {
  try {
    const response = await axios.post(
      getVotingToolNoActionLetterDDL_config,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const getVotingToolNoActionLetterAnalysisData = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getVotingToolNoActionLetterAnalysisData_Config,
      {
        proposal_type: res.proposal_type,
        proponent: res.proponent,
        start_date: res.start_date,
        end_date: res.end_date,
        product_id: VOTING,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const getNoActionLetterDummyData = async () => {
  try {
    const response = await axios.post(
      noActionLetterDummyData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetActivistCampaignsTool = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getActivistCampaignsTool,
      {
        product_id: ACTIVISM,
        token,
      },
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetLawFirmsDataActivismAdvisor = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getLawFirmsDataActivismAdvisor,
      {
        product_id: ACTIVISM,
        token,
      },
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetDirectorSectorAndIndustrySearchData = async () => {
  try {
    const response = await axios.post(
      getDirectorSectorAndIndustrySearchData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetToolsActivismFillingsData = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getToolsActivismFillingsData,
      {
        product_id: ACTIVISM,
        token,
      },
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetLawFirmsDataShortActivismAdvisor = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getLawFirmsDataShortActivismAdvisor,
      { product_id: ACTIVIST_SHORTS, token },
      {
        cancelToken: res.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetPoisonPillStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getPoisonPillStats,
      {
        product_id: GOVERNANCE,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetRightsAgent = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getRightsAgent,
      { excel_download_id: 1, product_id: GOVERNANCE, token },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetPoisonPillRecentInsightia = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getPoisonPillRecentInsightia,
      {
        product_id: GOVERNANCE,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0];
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetRegionsTrade = async () => {
  try {
    const response = await axios.post(
      getRegionsTrade,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetInvestmentPublicData = async () => {
  try {
    const response = await axios.post(
      getInvestmentPublicData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetCompaniesTargetedTrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getCompaniesTargetedTrends,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetActiveActivistsTrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getActiveActivistsTrends,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetActiveCompanyRegiontrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getActiveCompanyRegiontrends,
      {
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetActiveActivistsRegiontrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getActiveActivistsRegiontrends,
      {
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetIndustryTargetedTrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getIndustryTargetedTrends,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetCompaniesWithMultipleactivistsTrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getCompaniesWithMultipleactivistsTrends,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetMarketCapbyYearTrends = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getMarketCapbyYearTrends,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetActiveActivistsAUM = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getActiveActivistsAUM,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        product_id: ACTIVISM,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetSuccessRatesTrends = async (res) => {
  try {
    const response = await axios.post(
      getSuccessRatesTrends,
      {
        region: res.region,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetStoredProcedureDownloadExcel = async (res) => {
  try {
    const response = await axios.post(
      getStoredProcedureDownloadExcel,
      {
        region: res.region,
        shortlong: res.shortlong,
        public: res.public,
        parameters: res.parameters,
        StoredProcedure: res.download,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetAIGUpcomingMeetings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getAIGUpcomingMeetings,
      {
        product_id: GOVERNANCE,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetUpcomingAppointmentsAndDepartures = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getUpcomingAppointmentsAndDepartures,
      {
        product_id: GOVERNANCE,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const GetPageAccess = async (membership, product_id) => {
  try {
    const curr_product = membership.filter(
      (product) => product.product_id === product_id
    );
    if (
      curr_product[NUMBER_ZERO].status === FULL_USER ||
      curr_product[NUMBER_ZERO].status === TRIAL_USER
    ) {
      return true;
    }
    history.push(TOOLMENU);
  } catch (e) {
    return false;
  }
  return false;
};
