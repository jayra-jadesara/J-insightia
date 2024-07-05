import axios from 'axios';
import {
  resolutionByInvestorTrackerFilter,
  investorTrackerResultDetails,
  historicalTrendsChartData,
  historicalTrendsChartYTDData,
  resolutionFilterByTotalVotesAnalysisYTD,
  resolutionFilterByTotalVotesAnalysis,
  historicalTrendsChartProxySeasonData,
  resolutionFilterByTotalProxySeasonVotesAnalysis,
  resolutionTrackerFilterByHistoricalTrends
} from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { VOTING } from '../constants/ProductConstants';
import { dateToISOString } from './general-util';

export const ResolutionsByInvestorTrackerFilter = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      resolutionByInvestorTrackerFilter,
      {
        StartDate: dateToISOString(req.startDate),
        EndDate: dateToISOString(req.endDate),
        MeetingType: req.meetingType,
        Proponent: req.proponent,
        ProposalSponsor: req.proposalSponsor,
        CopampanySearchId: req.companySearchId,
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

export const InvestorTrackerResultDetails = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      investorTrackerResultDetails,
      {
        StartDate: dateToISOString(req.startDate),
        EndDate: dateToISOString(req.endDate),
        MeetingType: req.meetingType,
        Proponent: req.proponent,
        ProposalSponsor: req.sponsor,
        ProposalType: req.proposalType,
        ProposalTopLevel: req.proposalTypeTopLevel,
        ProposalSubLavel: req.ProposalTypeSubLevel,
        CopampanySearchId: req.companySearchId,
        Limited: req.limited,
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

// Chart
export const HistoricalTrendsChartData = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      historicalTrendsChartData,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
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
export const HistoricalTrendsChartYTDData = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      historicalTrendsChartYTDData,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
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
export const HistoricalTrendsChartProxySeasonData = async (req) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      historicalTrendsChartProxySeasonData,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
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

// Table Analysis
export const ResolutionFilterByTotalProxySeasonVotesAnalysis = async (req) => {
  try {
    const response = await axios.post(
      resolutionFilterByTotalProxySeasonVotesAnalysis,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
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
export const ResolutionFilterByTotalVotesAnalysisYTD = async (req) => {
  try {
    const response = await axios.post(
      resolutionFilterByTotalVotesAnalysisYTD,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
        management_recc: null,
        outcome: null,
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
export const ResolutionFilterByTotalVotesAnalysis = async (req) => {
  try {
    const response = await axios.post(
      resolutionFilterByTotalVotesAnalysis,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
        management_recc: req.management_recc,
        outcome: req.outcome,
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

export const ResolutionTrackerFilterByHistoricalTrends = async (req) => {
  try {
    const response = await axios.post(
      resolutionTrackerFilterByHistoricalTrends,
      {
        ProposalType: req.ProposalType,
        ProposalTopLevel: req.ProposalTopLevel,
        ProposalSubLavel: req.ProposalSubLavel,
        MeetingType: req.MeetingType,
        Proponent: req.Proponent,
        ProposalSponsor: req.ProposalSponsor,
        CopampanySearchId: req.CopampanySearchId,
        management_recc: req.management_recc,
        outcome: req.outcome,
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
