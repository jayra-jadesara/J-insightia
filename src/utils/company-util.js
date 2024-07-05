import axios from 'axios';
import config, { listActivistInvestorsForCompanyAiS, getActivismSummary_AiS } from '../config/server-config';
import { TokenDecode } from './general-util';
import { readFromCache, writeToCache } from './cache-util';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const company_search = async (name_sarch, quicksearch) => {
  try {
    const response = await axios.post(
      config.company_serarch,
      {
        nameSearch: name_sarch,
        quicksearch: quicksearch,
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
};

export const ListMeetingDates = async (meetingId) => {
  try {
    const response = await axios.post(
      config.ListMeetingDates,
      {
        meeting_id: meetingId,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetVotingData_allvotes_v2 = async (meeting_id, proposals, voteCast) => {
  try {
    const response = await axios.post(
      config.GetVotingData_allvotes_v2,
      {
        meeting_id,
        proposals,
        voteCast,
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
};

export const GetVotingData_rationale_meeting_against = async (meeting_id) => {
  try {
    const response = await axios.post(
      config.GetVotingData_rationale_meeting_against,
      {
        meeting_id,
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
};

export const ListIssuerVotesAgainst = async (meeting_id) => {
  try {
    const response = await axios.post(
      config.ListIssuerVotesAgainst,
      {
        meeting_id,
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
};

export const GetSelectedProposalsCountry = async (meeting_id) => {
  try {
    const response = await axios.post(
      config.GetSelectedProposalsCountry,
      {
        meeting_id,
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
};

export const BindgvVotingGrid = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.BindgvVotingGrid,
      {
        user_id: uid,
        meetingId: req.meetingId,
        proposal_type_id: req.proposal_type_id,
        investor_search_id: req.investor_search_id,
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
};

export const getShareClasses = async (pid) => {
  try {
    const response = await axios.post(
      config.GetShareClasses,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const getProposalList = async (
  meetingId,
  prevMeetingId,
  set_adjustment,
  cancelToken
) => {
  try {
    const response = await axios.post(
      config.getProposalList,
      {
        meetingId,
        prevMeetingId,
        set_adjustment,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        cancelToken: cancelToken,
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response;
    }
  } catch (e) {
    return false;
  }
};

export const MeetingQuickViewDynamicPivotv4 = async (meeting_id, proposal_id, GetLine) => {
  try {
    const response = await axios.post(
      config.MeetingQuickViewDynamicPivotv4,
      {
        meeting_id,
        proposal_id,
        GetLine,
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
};

export const GetVoteResults_v3 = async (meeting_id) => {
  try {
    const response = await axios.post(
      config.GetVoteResults_v3,
      {
        meeting_id,
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
};

export const GetNoActionTrackInfo = async (req) => {
  try {
    const response = await axios.post(
      config.GetNoActionTrackInfo,
      {
        index_id: req.index_id,
        start_date: req.start_date,
        end_date: req.end_date,
        proposal_type_top: req.proposal_type_top,
        proposal_type_sub: req.proposal_type_sub,
        proposal_type: req.proposal_type,
        industry_id: req.industry_id,
        proponent: req.proponent,
        Resolutions_Filter: req.Resolutions_Filter,
        meeting_id: req.meeting_id,
        company_search_id: req.company_search_id,
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
};

export const noActionLettersDataExists = async (pid) => {
  try {
    const response = await axios.post(
      config.noActionLettersDataExists,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data.length > 0;
    }
  } catch (e) {
    return false;
  }
};

// Activism Overview Graphs
export const GetActivismOverviewGraphs = async (pid) => {
  try {
    const response = await axios.post(
      config.getActivismOverviewGraphs,
      {
        pid,
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
};
// No Action Letter Proposal Detail
export const GetNoActionLetterProposalDetail = async (proposal_id) => {
  try {
    const response = await axios.post(
      config.GetNoActionLetterProposalDetail,
      {
        proposal_id,
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
};

export const GetIssuer_Meeting_stats = async (req) => {
  try {
    const response = await axios.post(
      config.GetIssuer_Meeting_stats,
      {
        meeting_id: req.meetingId,
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
};

export const GetCompanyProfile = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyProfile,
      {
        pid,
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
};

export const getIssuerLatestMeetingId = async (pid) => {
  try {
    const response = await axios.post(
      config.getIssuerLatestMeetingId,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data[0];
    }
  } catch (e) {
    return false;
  }
};

export const getIssuerProfile = async (meeting_id, proposal_id) => {
  try {
    const response = await axios.post(
      config.getIssuerProfile,
      {
        meeting_id,
        proposal_id,
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
};

export const ListTopTwentyActivistActivity = async () => {
  try {
    const response = await axios.post(
      config.listTopTwentyActivistActivity,
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
};

export const LatestActivistDemands = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.latestActivistDemands,
      {
        userid: uid,
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
};

export const TimeLines = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.listTop8TimeLine,
      {
        userid: uid,
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
};

export const ActiveActivists_Trends_Overview = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.activeActivists_Trends_Overview,
      {
        userid: uid,
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
};

export const CompaniesTargeted_Trends_Overview = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.companiesTargeted_Trends_Overview,
      {
        userid: uid,
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
};

// sample data - trial User
export const GetVotingListTrialUser = async () => {
  try {
    const cachedData = readFromCache(config.GetVotingListTrialUser);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.GetVotingListTrialUser,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetVotingListTrialUser, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetActivismListTrialUser = async () => {
  try {
    const cachedData = readFromCache(config.GetActivismListTrialUser);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.GetActivismListTrialUser,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetActivismListTrialUser, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetVulnerabilityListTrialUser = async () => {
  try {
    const cachedData = readFromCache(config.GetVulnerabilityListTrialUser);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.GetVulnerabilityListTrialUser,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetVulnerabilityListTrialUser, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetActivistShortListTrialUser = async () => {
  try {
    const cachedData = readFromCache(config.GetActivistShortListTrialUser);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.GetActivistShortListTrialUser,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetActivistShortListTrialUser, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetGovernanceListTrialUser = async () => {
  try {
    const cachedData = readFromCache(config.GetGovernanceListTrialUser);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.GetGovernanceListTrialUser,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.GetGovernanceListTrialUser, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const listTopTwentyActivistActivity = async () => {
  try {
    const cachedData = readFromCache(config.listTopTwentyActivistActivity);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.listTopTwentyActivistActivity,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      writeToCache(config.listTopTwentyActivistActivity, response.data);
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

// AIV

export const PIGetIssuer = async (req) => {
  try {
    const response = await axios.post(
      config.PIGetIssuer,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

export const VunGetGovDirectorInfoV4 = async (req) => {
  try {
    const response = await axios.post(
      config.VunGetGovDirectorInfoV4,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

export const VunSummaryScore = async (req) => {
  try {
    const response = await axios.post(
      config.vunSummaryScore,
      {
        pid: req.pid,
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
};
export const VunListNewsArticlesForIssuer = async (req) => {
  try {
    const response = await axios.post(
      config.VunListNewsArticlesForIssuer,
      {
        pid: req.pid,
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
};

// ACTIVIST SHORT OVERVIEW: Calls are prered by ensuring the json structure keys are correct, sets URI from server-config and bearer from storage
export const GetAiSCompDisclosedShortPositions = async (pid) => {
  try {
    const response = await axios.post(
      config.getAiSCompDisclosedShortPositions,
      {
        pid,
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
};

export const GetHistoricShortPositions = async (pid) => {
  try {
    const response = await axios.post(
      config.getHistoricShortPositions,
      {
        pid,
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
};

export const ListActivistInvestorsForCompany_NEW_ais = async (company_id) => {
  try {
    const response = await axios.post(
      config.listActivistInvestorsForCompany_NEW_ais,
      {
        company_id,
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
};

export const VunList10QAnd10KForIssuer = async (req) => {
  try {
    const response = await axios.post(
      config.VunList10QAnd10KForIssuer,
      {
        pid: req.pid,
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
};

// AIV OWNERSHIP

export const PIGetShareholdersTop10 = async (req) => {
  try {
    const response = await axios.post(
      config.PIGetShareholdersTop10,
      {
        pid: req.pid,
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
};

// AIV OWNERSHIP : ACTIVIST INVESTORS
export const GetShareHoldersActivistOnly = async (company_id) => {
  try {
    const response = await axios.post(
      config.GetShareHoldersActivistOnly,
      {
        company_id,
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
};
export const GetAiSCompTotalShortPositions = async (pid) => {
  try {
    const response = await axios.post(
      config.getAiSCompTotalShortPositions,
      {
        pid,
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
};

// AIV AGM Voting Most Recent
export const PIGetMostRecentAGMOrPCMeetingIdWithVotes = async (req) => {
  try {
    const response = await axios.post(
      config.PIGetMostRecentAGMOrPCMeetingIdWithVotes,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

// AIV OWNERSHIP : ACTIVIST SUMMARY
export const GetActivismSummary = async (company_id) => {
  try {
    const response = await axios.post(
      config.GetActivismSummary,
      {
        company_id,
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
};

export const Adm_Check_PID = async (pid) => {
  try {
    const response = await axios.post(
      config.adm_Check_PID,
      {
        pid,
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
};

// AIV AGM Voting Results
export const PIGetVoteResults = async (meeting_id) => {
  try {
    const response = await axios.post(
      config.PIGetVoteResults,
      {
        meeting_id,
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
};

// AIV AGM VOTING Remuneration
export const VunGetAllRemunerationMediansAndMADMs = async (req) => {
  try {
    const response = await axios.post(
      config.VunGetAllRemunerationMediansAndMADMs,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

// VOTING REMUNERATION ONE YEAR BACK VunGetAllRemunerationMediansAndMADMsYearAroundDate
export const VunGetAllRemunerationMediansAndMADMsYearAroundDate = async (req) => {
  try {
    const response = await axios.post(
      config.VunGetAllRemunerationMediansAndMADMsYearAroundDate,
      {
        pid: req.pid,
        meeting_date: req.meeting_date,
        cmp_search_id: req.cmp_search_id,
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
};

// AGM VOTING MEDIAN FOOTER
export const VunGetAllDirectorMediansAndMADMs = async (req) => {
  try {
    const response = await axios.post(
      config.VunGetAllDirectorMediansAndMADMs,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

// AIV Top 10 footer OWNERSHIP
export const GetVunGetAllInstitutionalMediansAndMADMs = async (req) => {
  try {
    const response = await axios.post(
      config.GetVunGetAllInstitutionalMediansAndMADMs,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

// ACTIVIST INSIGHT SHORTS CAMPAIGN
export const ListActivistInvestorsForCompanyAiS = async (company_id) => {
  try {
    const response = await axios.post(
      listActivistInvestorsForCompanyAiS,
      {
        company_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      const a = '';
      if (response.data.data.length > 0) {
        return {
          data: response.data.data.sort((a, b) => new Date(b.date_first_invested) - new Date(a.date_first_invested)),
        };
      }
      return { data: response.data.data };
    }
  } catch (e) {
    return false;
  }
};

export const GetVunGetAllActivistMediansAndMADMs = async (req) => {
  try {
    const response = await axios.post(
      config.GetVunGetAllActivistMediansAndMADMs,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};

export const GetVulnerabilityScoreOverTime = async (req) => {
  try {
    const response = await axios.post(
      config.getVulnerabilityScoreOverTime,
      {
        pid: req.pid,
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
};

export const GetVulnerabilityPrankOverTime = async (req) => {
  try {
    const response = await axios.post(
      config.getVulnerabilityPrankOverTime,
      {
        pid: req.pid,
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
};

export const GetActivismSummary_AiS = async (company_id) => {
  try {
    const response = await axios.post(
      getActivismSummary_AiS,
      {
        company_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return e;
  }
};

// AiG
// AiG Shareholder proposals
export const GetAIG_ShareholderProposals_v2 = async (pid) => {
  try {
    const response = await axios.post(
      config.getAIG_ShareholderProposals_v2,
      {
        pid,
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
};

// AiG Latest Filings

export const GetGovCompanyDirector503 = async (pid) => {
  try {
    const response = await axios.post(
      config.getGovCompanyDirector503,
      {
        pid,
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
};

export const GetCompanyDirector502_v2 = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyDirector502_v2,
      {
        pid,
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
};

export const GetCompanyDirector507_v2 = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyDirector507_v2,
      {
        pid,
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
};

export const GetCompanyDirectorshort_v2 = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyDirectorshort_v2,
      {
        pid,
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
};

export const GetCompanyDirector10k_v2 = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyDirector10k_v2,
      {
        pid,
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
};

// AiG Company Director
export const GetGovDirectorInfo = async (pid) => {
  try {
    const response = await axios.post(
      config.getGovDirectorInfo,
      {
        pid,
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
};

export const Get_Gov_Independent_Graph_Data = async (pid) => {
  try {
    const response = await axios.post(
      config.get_Gov_Independent_Graph_Data,
      {
        pid,
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
};

export const Get_Gov_Tenure_Graph_Data = async (pid) => {
  try {
    const response = await axios.post(
      config.get_Gov_Tenure_Graph_Data,
      {
        pid,
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
};

export const Get_Gov_Gender_Graph_Data = async (pid) => {
  try {
    const response = await axios.post(
      config.get_Gov_Gender_Graph_Data,
      {
        pid,
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
};

export const Get_interlocking_directors_JSON_v2 = async (pid) => {
  try {
    const response = await axios.post(
      config.get_interlocking_directors_JSON_v2,
      {
        pid,
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
};

export const GetBoardNewsHeadlines = async (pid) => {
  try {
    const response = await axios.post(
      config.getBoardNewsHeadlines,
      {
        pid,
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
};

export const GetComDirProfPast = async (pid) => {
  try {
    const response = await axios.post(
      config.getComDirProfPast,
      {
        pid,
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
};

export const GetComDirProf = async (pid) => {
  try {
    const response = await axios.post(
      config.getComDirProf,
      {
        pid,
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
};

export const GetComDirProfPastHeaderCol = async (pid) => {
  try {
    const response = await axios.post(
      config.getComDirProfPastHeaderCol,
      {
        pid,
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
};

// AiG Poison Pill
export const GetDetPoisonPill = async (pid) => {
  try {
    const response = await axios.post(
      config.getDetPoisonPill,
      {
        pid,
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
};

export const GetItem303Material = async (pid) => {
  try {
    const response = await axios.post(
      config.getItem303Material,
      {
        pid,
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
};

export const GetDetPoisonPillTopHdr = async (pid) => {
  try {
    const response = await axios.post(
      config.getDetPoisonPillTopHdr,
      {
        pid,
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
};

// AiG Byline
export const GetCompanyDirector503 = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyDirector503,
      {
        pid,
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
};

export const Get_Bylaws_Charter_GovGuidelines_Data = async (pid) => {
  try {
    const response = await axios.post(
      config.get_Bylaws_Charter_GovGuidelines_Data,
      {
        pid,
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
};

// AiG Complience
export const GetCompFillingType = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompFillingType,
      {
        pid,
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
};

export const GetCompStatement = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompStatement,
      {
        pid,
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
};

export const GetComplianceComparisonIndexes = async (pid) => {
  try {
    const response = await axios.post(
      config.getComplianceComparisonIndexes,
      {
        pid,
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
};

export const GetComplianceVotinDissent = async (pid) => {
  try {
    const response = await axios.post(
      config.getComplianceVotinDissent,
      {
        pid,
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
};

// #region Ownership Long/Short - Company
export const getLatestOwnershipDateList = async () => {
  try {
    const response = await axios.post(
      config.getLatestOwnershipDateList,
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
};

export const getOwnershipLongFundData = async (req) => {
  try {
    const response = await axios.post(
      config.getOwnershipLongFundData,
      {
        pid: req.pid,
        filterRecords: req.filterRecords,
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
};

export const getOwnershipLongInvestorData = async (req) => {
  try {
    const response = await axios.post(
      config.getOwnershipLongInvestorData,
      {
        pid: req.pid,
        period_of_report: req.period_of_report,
        change_comparison: req.change_comparison,
        filterRecords: req.filterRecords,
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
};

export const getOwnershipShortInvestorData = async (req) => {
  try {
    const response = await axios.post(
      config.getOwnershipShortInvestorData,
      {
        pid: req.pid,
        filterRecords: req.filterRecords,
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
};

export const getOwnershipShortFundData = async (req) => {
  try {
    const response = await axios.post(
      config.getOwnershipShortFundData,
      {
        pid: req.pid,
        filterRecords: req.filterRecords,
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
};

export const getownershipCompanyDummyData = async () => {
  try {
    const response = await axios.post(
      config.OwnershipCompanyDummyData,
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
};

// #endregion

// Voting Overview ListVotingOwnershipForProposal_v2
export const ListVotingOwnershipForProposal_v2 = async (req) => {
  try {
    const meeting_id_int = req.meeting_id ? Number(req.meeting_id) : null;
    const response = await axios.post(
      config.listVotingOwnershipForProposal_v2,
      {
        meeting_id: meeting_id_int,
        proposal_id: req.proposal_id,
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
};

// Get_OtherBoards
export const Get_OtherBoards = async (proposal_id) => {
  try {
    const response = await axios.post(
      config.get_OtherBoards,
      {
        proposal_id,
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
};

// GetVotingData_rationale
export const GetVotingData_rationale = async (meeting_id, proposal_id) => {
  try {
    const response = await axios.post(
      config.getVotingData_rationale,
      {
        meeting_id,
        proposal_id,
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
};

export const ListVotingAndOwnerhipForProposal_insightia = async (
  meeting_id,
  proposal_id,
  prev_meeting_id,
  prev_proposal_id,
  vote_type
) => {
  try {
    const Prev_meeting_id = prev_meeting_id !== undefined ? prev_meeting_id : null;
    const Prev_proposal_id = prev_proposal_id !== undefined ? prev_proposal_id : null;
    const response = await axios.post(
      config.listVotingAndOwnerhipForProposal_insightia,
      {
        meeting_id,
        proposal_id,
        Prev_meeting_id,
        Prev_proposal_id,
        vote_type,
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
};

export const getMeetingURLs = async (meeting_id, meeting_date) => {
  try {
    const response = await axios.post(
      config.getMeetingURLs,
      {
        meeting_id: Number(meeting_id),
        meeting_date: new Date(meeting_date),
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response;
    }
  } catch (e) {
    return false;
  }
};

export const listCompanyFilingsByActivist_v2 = async (company_id, activist_id, longShort) => {
  try {
    const response = await axios.post(
      config.listCompanyFilingsByActivist_v2,
      {
        company_id,
        activist_id,
        longShort,
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
};
export const GetAdvisorSearchData = async (searchName) => {
  try {
    const response = await axios.post(
      config.getAdvisorSearchData,
      {
        searchName,
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
};
// Company> Activism > Activist campaigns

export const GetCompanyOverviewProfile = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyOverviewProfile,
      {
        pid,
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
};

export const GetCompanyStockEvents = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompanyStockEvents,
      {
        pid,
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
};

export const GetCompanyPeerGroupOverview = async (req) => {
  try {
    const response = await axios.post(
      config.getCompanyPeerGroupOverview,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
        activist_vulnerability: req.activist_vulnerability,
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
};
export const GetPeerGroupName = async (pid) => {
  try {
    const response = await axios.post(
      config.getPeerGroupName,
      {
        pid,
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
};

export const GetStockValues_graph = async (company_id) => {
  try {
    const response = await axios.post(
      config.getStockValues_graph,
      {
        company_id: company_id.company_id,
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
};

export const getActivistCampaignsDataList = async (req) => {
  try {
    const response = await axios.post(
      config.getActivistCampaignsDataList,
      {
        indiv_campaigns: req.indiv_campaigns,
        pid: req.pid,
        show_other_campaigns: req.show_other_campaigns,
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
};
export const getActivistCampaignsDataListV2 = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.getActivistCampaignsDataListV2,
      {
        indiv_campaigns: req.indiv_campaigns,
        pid: req.pid,
        show_other_campaigns: req.show_other_campaigns,
        user_id: uid,
        resultset: req.resultset !== undefined ? req.resultset : null,
        isOverviewPage: req.isOverviewPage,
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
};

export const GetLollipops_graph = async (company_id) => {
  try {
    const response = await axios.post(
      config.getLollipops_graph,
      {
        company_id: company_id.company_id,
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
};

export const ActivistCampiagnDummyData = async () => {
  try {
    const response = await axios.post(
      config.ActivistCampiagnDummyData,
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
};

// Company> Governance> Overview
export const getGovOverview_meetingInfo_Quickview_StockData = async (req) => {
  try {
    const response = await axios.post(
      config.getGovOverview_meetingInfo_Quickview_StockData,
      {
        pid: req.pid,
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
};

export const getBoardAndDirectorsIndexDDL = async (req) => {
  try {
    const response = await axios.post(
      config.getBoardAndDirectorsIndexDDL,
      {
        pid: req.pid,
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
};

export const getComparisionTables = async (req) => {
  try {
    const response = await axios.post(
      config.getComparisionTables,
      {
        pid: req.pid,
        filterindex: req.filterindex,
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
};

export const GetActivistInvestorsForCompany = async (company_id) => {
  try {
    const response = await axios.post(
      config.getActivistInvestorsForCompany,
      {
        company_id: company_id.company_id,
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
};

export const GetActivistNotifiedHolding = async (company_id) => {
  try {
    const response = await axios.post(
      config.getActivistNotifiedHolding,
      {
        company_id: company_id.company_id,
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
};

export const companyGovernanceOverviewDummyData = async () => {
  try {
    const response = await axios.post(
      config.CompanyGovernanceOverviewDummyData,
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
};

export const getActivistShortModuleAccess = async (req) => {
  try {
    const response = await axios.post(
      config.getActivistShortModuleAccess,
      {
        pid: req,
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
};

export const addTriallog = async (req) => {
  try {
    const response = await axios.post(
      config.addTriallog,
      {
        user_id: req.user_id,
        type: req.type,
        id: req.id,
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
};

export const sendMailToTeam = async (req) => {
  try {
    const response = await axios.post(
      config.sendMailToTeam,
      {
        user_id: req.user_id,
        email: req.email,
        url: req.url,
        subject: req.subject,
        number_profile: req.number_profile,
        trialUser: req.trialUser,
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
};

export const getOwnershipLongShortInvestorDataCheck = async (req) => {
  try {
    const response = await axios.post(
      config.getOwnershipLongShortInvestorDataCheck,
      {
        pid: req.pid,
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
};

export const GetActivistShortCampaignAdvisersData = async (campaign_id) => {
  try {
    const response = await axios.post(
      config.getActivistShortCampaignAdvisersData,
      {
        campaign_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const GetInvestorIdFromCampaignIdData = async (campaign_id) => {
  try {
    const response = await axios.post(
      config.getInvestorIdFromCampaignId,
      {
        campaign_id,
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
};

export const GetComDirUpcoming = async (pid) => {
  try {
    const response = await axios.post(
      config.getComDirUpcoming,
      {
        pid,
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
};

export const GetAdmGetCompanyShell_spac = async (pid) => {
  try {
    const response = await axios.post(
      config.getAdmGetCompanyShell_spac,
      {
        pid,
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
};
export const GetPeerGroupDefaultName = async (req) => {
  try {
    const response = await axios.post(
      config.getPeerGroupDefaultName,
      {
        pid: req.pid,
      },
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const UpdateCompanyVunScoreData = async (req) => {
  try {
    const response = await axios.post(
      config.UpdateCompanyVunScore,
      {
        pid: req.pid,
        cmp_search_id: req.cmp_search_id,
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
};
// ACTIVIST SHORT OVERVIEW, FDA RECALLS
export const GetFDAProductRecallListData = async (companyId) => {
  try {
    const response = await axios.post(
      config.GetFDAProductRecallListData,
      {
        companyId,
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
};

export const getHistoricalGovernance = async (pid) => {
  try {
    const response = await axios.post(
      config.GetHistoricalGovernance,
      {
        pid: pid,
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
};
export const GetCompanyActivisamTabDataCheck = async (res) => {
  try {
    const response = await axios.post(
      config.getCompanyActivisamTabDataCheck,
      {
        company_id: res.company_id,
        activist_id: res.activist_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};
export const getSplitVotingDetails = async (req) => {
  try {
    const response = await axios.post(
      config.getSplitVotingDetails,
      {
        meeting_id: req.meeting_id,
        proposal_id: req.proposal_id,
        prev_meeting_id: req.prev_meeting_id,
        prev_proposal_id: req.prev_proposal_id,
        investor_id: req.investor_id,
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
};

export const GetVotingData_rationale_meeting = async (meeting_id) => {
  try {
    const response = await axios.post(
      config.GetVotingData_rationale_meeting,
      {
        meeting_id,
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
};

export const GetCompensationPerformanceMetricBreakDown = async (req) => {
  try {
    const response = await axios.post(
      config.getCompensationPerformanceMetricBreakDown,
      {
        pid: req.pid,
        director_appointment_id: req.director_appointment_id,
        year: req.year,
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
};
export const GetCompensationExecutivePayData = async (pid) => {
  try {
    const response = await axios.post(
      config.GetCompensationExecutivePayData,
      {
        pid: pid,
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
};

export const GetCompensationOverviewSummaryDetails = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompensationOverviewSummaryDetails,
      {
        pid: pid,
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
};
export const GetCompensationOverviewExecutiveAndDirectorDetails = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompensationOverviewExecutiveAndDirectorDetails,
      {
        pid: pid,
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
};

export const GetCompensatioCompanyolicyDetailsHighestPaidExecutive = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompensatioCompanyolicyDetailsHighestPaidExecutive,
      {
        pid: pid,
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
};
export const GetCompensationPolicyDetails = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompensationPolicyDetails,
      {
        pid: pid,
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
};
export const GetCompensationPolicyHighestPaidExecutiveData = async (pid) => {
  try {
    const response = await axios.post(
      config.getCompensationPolicyHighestPaidExecutiveData,
      {
        pid: pid,
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
};
export const GetCompensationNonExecutivePay = async (pid) => {
  try {
    const response = await axios.post(
      config.GetCompensationNonExecutivePay,
      {
        pid: pid,
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
};
export const GetCompensationHighestPaidExe = async (pid) => {
  try {
    const response = await axios.post(
      config.GetCompensationHighestPaidExe,
      {
        pid: pid,
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
};
export const GetCompensationReportYears = async (pid) => {
  try {
    const response = await axios.post(
      config.GetCompensationReportYears,
      {
        pid: pid,
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
};
