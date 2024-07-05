import axios from 'axios';
import {
  getAiSCampaignInformation,
  getAiSCampaignInformationDummyData,
  getShortCampaignSamlpeData,
} from '../config/server-config';
import { TokenDecode } from './general-util';
import { readFromCache, writeToCache } from './cache-util';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_TWO,
  NUMBER_FOUR,
} from '../constants/NumberConstants';
import { ACTIVIST_SHORTS } from '../constants/ProductConstants';

export const GetAiSCampaignInformation = async (req) => {
  try {
    const cachedData = readFromCache(getAiSCampaignInformation);
    const token = localStorage.getItem('token');
    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      getAiSCampaignInformation,
      {
        product_id: ACTIVIST_SHORTS,
        token,
      },
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    writeToCache(getAiSCampaignInformation, response.data);
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const GetAiSCampaignInformationDummyData = async (req) => {
  try {
    const cachedData = readFromCache(getAiSCampaignInformationDummyData);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      getAiSCampaignInformationDummyData,
      {},
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    writeToCache(getAiSCampaignInformationDummyData, response.data);
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};

export const ShortCampaignDataandAnalyticsReq = async (productId) => {
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

export const GetShortCampaignSamlpeData = async (req) => {
  try {
    const cachedData = readFromCache(getShortCampaignSamlpeData);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.post(
      getShortCampaignSamlpeData,
      {},
      {
        cancelToken: req.cancelToken,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    writeToCache(getShortCampaignSamlpeData, response.data);
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
