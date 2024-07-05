import axios from 'axios';
import {
  getProvisionsList,
  getActivistNomineeOnBoardList,
  getStateOfIncorporationdList,
  getGovernanceAdvSearchReq
} from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { GOVERNANCE } from '../constants/ProductConstants';

export const GetProvisionsList = async () => {
  try {
    const response = await axios.post(
      getProvisionsList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const GetActivistNomineeOnBoardList = async () => {
  try {
    const response = await axios.post(
      getActivistNomineeOnBoardList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const GetStateOfIncorporationdList = async () => {
  try {
    const response = await axios.post(
      getStateOfIncorporationdList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const GetGovernanceAdvSearchReq = async (
  company_search_id,
  StateOfIncorporation,
  BoardSizeMin,
  BoardSizeMax,
  PoisonPillOwnershipPcentMin,
  PoisonPillOwnershipPcentMax,
  PoisonPillExpiryDateMin,
  PoisonPillExpiryDateMax,
  AvgDirectorTimeMin,
  AvgDirectorTimeMax,
  AvgDirectorAgeMin,
  AvgDirectorAgeMax,
  AnyDirectorTimeMin,
  FemaleDirPcentMin,
  FemaleDirPcentMax,
  NomineeActivists,
  notParameters,
  yesParameters
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getGovernanceAdvSearchReq,
      {
        company_search_id,
        StateOfIncorporation,
        BoardSizeMin,
        BoardSizeMax,
        PoisonPillOwnershipPcentMin,
        PoisonPillOwnershipPcentMax,
        PoisonPillExpiryDateMin,
        PoisonPillExpiryDateMax,
        AvgDirectorTimeMin,
        AvgDirectorTimeMax,
        AvgDirectorAgeMin,
        AvgDirectorAgeMax,
        AnyDirectorTimeMin,
        FemaleDirPcentMin,
        FemaleDirPcentMax,
        NomineeActivists,
        notParameters,
        yesParameters,
        product_id: GOVERNANCE,
        token,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};
