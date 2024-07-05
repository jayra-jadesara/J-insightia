import axios from 'axios';
import {
  getAiSCountriesAndStats,
  getShortPositions,
  getShortPositionsTopTwenty,
  getAiSRecentShortPositions,
  getAiSRecentShortPositionsTopTwenty,
} from '../config/server-config';
import { TokenDecode } from './general-util';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_TWO,
  NUMBER_FOUR,
} from '../constants/NumberConstants';
import { ACTIVIST_SHORTS } from '../constants/ProductConstants';

export const GetAiSCountriesAndStats = async (
  defaultValue,
  defaultLabel,
  cancelToken
) => {
  try {
    const response = await axios.post(
      getAiSCountriesAndStats,
      {
        DefaultLabel: defaultLabel,
        DefailtValue: defaultValue,
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
};

export const GetShortPositions = async (res) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getShortPositions,
      { country_id: res.country_id, product_id: ACTIVIST_SHORTS, token },
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
};

export const GetShortPositionsTopTwenty = async (res) => {
  try {
    const response = await axios.post(
      getShortPositionsTopTwenty,
      { country_id: res.country_id },
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
};

export const GetAiSRecentShortPositions = async (country_id) => {
  try {
    const response = await axios.post(
      getAiSRecentShortPositions,
      { country_id },
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

export const GetAiSRecentShortPositionsTopTwenty = async (country_id) => {
  try {
    const response = await axios.post(
      getAiSRecentShortPositionsTopTwenty,
      { country_id },
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

export const GetUserShortPositionsAccess = async (productId) => {
  const dToken = await TokenDecode();
  for (let i = 0; i < dToken.MemberShip.length; i += 1) {
    const prodId = dToken.MemberShip[i].product_id;
    const { status } = dToken.MemberShip[i];

    if (prodId === productId && status !== 4 && status !== NUMBER_TWO) {
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
