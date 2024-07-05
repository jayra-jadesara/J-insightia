import axios from 'axios';
import config from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const getInvestorDDLList = async (res) => {
  try {
    const response = await axios.post(
      config.getInvestorDDLList,
      {
        investor_id: res.investor_id
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

export const getVotingProfileTopSection = async (res) => {
  try {
    const response = await axios.post(
      config.getVotingProfileTopSection,
      {
        investor_id: res.investor_id
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

export const getVotingProfileBottomSection = async (res) => {
  try {
    const response = await axios.post(
      config.getVotingProfileBottomSection,
      {
        investor_id: res.investor_id
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

export const getInvestorVotingProfileDummyData = async () => {
  try {
    const response = await axios.post(
      config.investorVotingProfileDummyData,
      {},
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
