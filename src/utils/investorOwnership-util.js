import axios from 'axios';
import config from '../config/server-config';
import { readFromCache, writeToCache } from './cache-util';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const getLatestOwnershipDateList = async () => {
  try {
    const cachedData = readFromCache(config.investor_getLatestOwnershipDateList);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      config.investor_getLatestOwnershipDateList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    writeToCache(config.investor_getLatestOwnershipDateList, response.data);
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const getOwnershipInvestorDummyData = async () => {
  try {
    const response = await axios.post(
      config.investorOwnershipCompanyDummyData,
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
//
export const getOwnershipLongInvestorData = async (res) => {
  try {
    const response = await axios.post(
      config.getInvestor_OwnershipLongInvestorData,
      {
        investor_id: res.investor_id,
        period_of_report: res.period_of_report,
        change_comparison: res.change_comparison,
        filterRecords: res.filterRecords
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
export const getOwnershipLongFundData = async (res) => {
  try {
    const response = await axios.post(
      config.getInvestor_OwnershipLongFundData_Insightia,
      {
        investor_id: res.investor_id,
        filterRecords: res.filterRecords
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
export const getOwnershipShortInvestorData = async (res) => {
  try {
    const response = await axios.post(
      config.getInvestor_OwnershipShortInvestorData_Insightia,
      {
        investor_id: res.investor_id,
        filterRecords: res.filterRecords
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
export const getOwnershipShortFundData = async (res) => {
  try {
    const response = await axios.post(
      config.getInvestor_OwnershipShortFundData_Insightia,
      {
        investor_id: res.investor_id,
        filterRecords: res.filterRecords
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
export const getInvestorOwnershipLongShortDataCheck = async (res) => {
  try {
    const response = await axios.post(
      config.getInvestorOwnershipLongShortDataCheck,
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
