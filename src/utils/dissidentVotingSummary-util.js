import axios from 'axios';
import config from '../config/server-config';
import { TokenDecode, dateToISOString } from './general-util';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_TWO,
  NUMBER_FOUR,
} from '../constants/NumberConstants';
import { VOTING } from '../constants/ProductConstants';

export const DissidentVotingSummaryLimitedData = async (
  startDate,
  endDate,
  meetingType,
  proponent,
  proposalSponsor,
  shareholderBase,
  settlements,
  desiredOutcome,
  issCard,
  glCard,
  companySearchId,
  investorSearchId
) => {
  try {
    const response = await axios.post(
      config.dissidentVotteFiltersLimitedData,
      {
        StartDate: dateToISOString(startDate),
        EndDate: dateToISOString(endDate),
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        ShareholderBase: shareholderBase,
        Settlements: settlements,
        DesiredOutcome: desiredOutcome,
        ISSCard: issCard,
        GLCard: glCard,
        CompanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
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

export const DissidentVotingSummary = async (
  startDate,
  endDate,
  meetingType,
  proponent,
  proposalSponsor,
  shareholderBase,
  settlements,
  desiredOutcome,
  issCard,
  glCard,
  companySearchId,
  investorSearchId
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      config.dissidentVotteFilters,
      {
        StartDate: dateToISOString(startDate),
        EndDate: dateToISOString(endDate),
        MeetingType: meetingType,
        Proponent: proponent,
        ProposalSponsor: proposalSponsor,
        ShareholderBase: shareholderBase,
        Settlements: settlements,
        DesiredOutcome: desiredOutcome,
        ISSCard: issCard,
        GLCard: glCard,
        CompanySearchId: companySearchId,
        InvestorSearchId: investorSearchId,
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

export const DissidentVotingAccessReq = async (productId) => {
  const dToken = await TokenDecode();
  for (let i = 0; i < dToken.MemberShip.length; i += 1) {
    const prodId = dToken.MemberShip[i].product_id;
    const { status } = dToken.MemberShip[i];

    if (
      prodId === productId &&
      status !== NUMBER_FOUR &&
      status !== NUMBER_TWO
    ) {
      return { productId, trialStatus: true, displayLimitedData: true };
    }

    if (prodId === productId && status === NUMBER_TWO) {
      return { productId, trialStatus: false, displayLimitedData: true };
    }

    if (prodId === productId && status === NUMBER_FOUR) {
      return { productId, trialStatus: false, displayLimitedData: false };
    }
  }
};
