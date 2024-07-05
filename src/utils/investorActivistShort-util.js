import axios from 'axios';
import {
  getActivistIdFromInvestor,
  listCampaignTypesbyActivist,
  getHoldingsbyCountryAiS,
  getHoldingsbyIndustryAiS,
  getHoldingsbyMarketCapAiS,
  getCampaignSummarybyActivistAiS,
  getInvestorIdFromActivist
} from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const GetActivistIdFromInvestor = async (investorId) => {
  try {
    const response = await axios.post(
      getActivistIdFromInvestor,
      {
        investorId
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

export const GetInvestorIdFromActivist = async (activist_id) => {
  try {
    const response = await axios.post(
      getInvestorIdFromActivist,
      {
        activist_id
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

export const ListCampaignTypesbyActivist = async (activistId, longShort) => {
  try {
    const response = await axios.post(
      listCampaignTypesbyActivist,
      {
        activistId: Number(activistId),
        longShort
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

export const GetHoldingsbyCountryAiS = async (activistId) => {
  try {
    const response = await axios.post(
      getHoldingsbyCountryAiS,
      {
        activistId: Number(activistId)
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

export const GetHoldingsbyIndustryAiS = async (activistId) => {
  try {
    const response = await axios.post(
      getHoldingsbyIndustryAiS,
      {
        activistId: Number(activistId)
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

export const GetHoldingsbyMarketCapAiS = async (activistId) => {
  try {
    const response = await axios.post(
      getHoldingsbyMarketCapAiS,
      {
        activistId: Number(activistId)
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

export const GetCampaignSummarybyActivistAiS = async (activistId) => {
  try {
    const response = await axios.post(
      getCampaignSummarybyActivistAiS,
      {
        activistId: Number(activistId)
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
