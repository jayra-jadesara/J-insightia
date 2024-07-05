import axios from 'axios';
import config from '../config/server-config';
import { TokenDecode } from './general-util';
import { API_CALL_SUCCESSFULL, NUMBER_TWO, NUMBER_FOUR } from '../constants/NumberConstants';

export const GetDissidentVotingByInvestor = async (
  companySearchId,
  investorId,
  startDate,
  endDate,
  desiredOutcome,
  proponent,
  settlements,
  issCard,
  glCard
) => {
  try {
    const response = await axios.post(
      config.getDissidentVotingByInvestor,
      {
        companySearchId,
        investorId,
        startDate,
        endDate,
        desiredOutcome,
        proponent,
        settlements,
        issCard,
        glCard
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

export const GetSupportByDissident = async (
  companySearchId,
  investorId,
  startDate,
  endDate,
  desiredOutcome,
  proponent,
  settlements,
  issCard,
  glCard
) => {
  try {
    const response = await axios.post(
      config.getSupportByDissident,
      {
        companySearchId,
        investorId,
        startDate,
        endDate,
        desiredOutcome,
        proponent,
        settlements,
        issCard,
        glCard
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

export const GetProxyContestsChartData = async (
  companySearchId,
  investorId,
  desiredOutcome,
  proponent,
  settlements,
  issCard,
  glCard
) => {
  try {
    const response = await axios.post(
      config.getProxyContestsChartData,
      {
        companySearchId,
        investorId,
        desiredOutcome,
        proponent,
        settlements,
        issCard,
        glCard
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

export const ProxyContestVotingAccessReq = async (productId) => {
  const dToken = await TokenDecode();
  for (let i = 0; i < dToken.MemberShip.length; i += 1) {
    const prodId = dToken.MemberShip[i].product_id;
    const { status } = dToken.MemberShip[i];

    if (prodId === productId && status !== 4 && status !== NUMBER_TWO) {
      return {
        productId,
        trialStatus: true,
        displayLimitedData: false,
        status
      };
    }

    if (prodId === productId && status === NUMBER_TWO) {
      return {
        productId,
        trialStatus: false,
        displayLimitedData: true,
        status
      };
    }

    if (prodId === productId && status === NUMBER_FOUR) {
      return {
        productId,
        trialStatus: false,
        displayLimitedData: false,
        status
      };
    }
  }
};
