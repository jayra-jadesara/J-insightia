import axios from 'axios';
import {
  getAdvanceVotingDataFundname,
  getVoteCast,
  getManagementRecc,
  getSupport,
  getOutputField,
  advancedVotingDataSearchlist,
  getListProposalsAndCategories,
} from '../config/server-config';
import { IsInternalUser, dateToISOString } from './general-util';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { VOTING } from '../constants/ProductConstants';

export const GetAdvanceVotingDataFundnameReq = async () => {
  try {
    const response = await axios.post(
      getAdvanceVotingDataFundname,
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

export const AdvancedVotingDataSearch = async (
  internal,
  companySearchId,
  investorSearchId,
  investorid,
  meetingType,
  sponsor,
  meetingStartDate,
  meetingEndDate,
  fundId,
  voteCast,
  support,
  managementRecc,
  supportMin,
  supportMax,
  proposalType,
  ShowVotingDetail,
  showInvestorVotingDetail,
  ShowVoteResults,
  ShowRationale
) => {
  try {
    const meetingStartDateVal = dateToISOString(meetingStartDate);
    const meetingEndDateVal = dateToISOString(meetingEndDate);

    const token = localStorage.getItem('token');
    const response = await axios.post(
      advancedVotingDataSearchlist,
      {
        internal: internal,
        companySearchId: companySearchId,
        investorSearchId: investorSearchId,
        investor_id: investorid,
        meetingType: meetingType,
        sponsor: sponsor,
        meetingStartDate: meetingStartDateVal,
        meetingEndDate: meetingEndDateVal,
        fundId: fundId,
        voteCast: voteCast,
        support: support,
        managementRecc: managementRecc,
        supportMin: supportMin,
        supportMax: supportMax,
        proposalType: proposalType,
        ShowVotingDetail: ShowVotingDetail,
        showInvestorVotingDetail: showInvestorVotingDetail,
        ShowVoteResults: ShowVoteResults,
        ShowRationale: ShowRationale,
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
};

export const GetVoteCast = async () => {
  try {
    const response = await axios.post(
      getVoteCast,
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

export const GetSupport = async () => {
  try {
    const response = await axios.post(
      getSupport,
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

export const GetManagementRecc = async () => {
  try {
    const response = await axios.post(
      getManagementRecc,
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

export const GetOutputField = async () => {
  try {
    const response = await axios.post(
      getOutputField,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      if (IsInternalUser) {
        return response.data;
      }
      const leftData = response.data.filter((el) => el.label !== 'Internal');
      return leftData;
    }
  } catch (e) {
    return false;
  }
};

export const GetListProposalsAndCategories = async () => {
  try {
    const response = await axios.post(
      getListProposalsAndCategories,
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
