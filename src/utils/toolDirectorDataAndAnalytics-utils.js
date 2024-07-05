import axios from 'axios';
import {
  getDirectorDataAndAnalyticsData,
  getDirectorAnalysisData,
  getDDLEthnicityData
} from '../config/server-config';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_ZERO,
  NUMBER_TRIPLE_NINE,
} from '../constants/NumberConstants';
import { GOVERNANCE } from '../constants/ProductConstants';

export const GetDirectoDataAndAnalyticsData = async (arg) => {
  try {
    const token = localStorage.getItem('token');
    let TenureFrom = arg.tenureFrom === null ? NUMBER_ZERO : arg.tenureFrom;
    let TenureTo = arg.tenureTo === null ? NUMBER_TRIPLE_NINE : arg.tenureTo;
    let gender;
    if (arg.tenureFrom === null && arg.tenureTo === null) {
      TenureFrom = null;
      TenureTo = null;
    }
    let BoardFrom = arg.boardFrom === null ? NUMBER_ZERO : arg.boardFrom;
    let BoardTo = arg.boardTo === null ? NUMBER_TRIPLE_NINE : arg.boardTo;
    if (arg.boardFrom === null && arg.boardTo === null) {
      BoardFrom = null;
      BoardTo = null;
    }
    let AgeFrom = arg.ageFrom === null ? NUMBER_ZERO : arg.ageFrom;
    let AgeTo = arg.ageTo === null ? NUMBER_TRIPLE_NINE : arg.ageTo;
    if (arg.ageFrom === null && arg.ageTo === null) {
      AgeFrom = null;
      AgeTo = null;
    }
    if (arg.gender === 'All') {
      gender = null;
    } else if (arg.gender === 'Male') {
      gender = 'Male';
    } else if (arg.gender === 'Female') {
      gender = 'Female';
    }
    const response = await axios.post(
      getDirectorDataAndAnalyticsData,
      {
        gender: gender,
        tenureFrom: TenureFrom,
        tenureTo: TenureTo,
        ageFrom: AgeFrom,
        ageTo: AgeTo,
        boardFrom: BoardFrom,
        boardTo: BoardTo,
        company_search_id: arg.company_search_id,
        ethnicity_ids: arg.ethnicity_ids,
        product_id: GOVERNANCE,
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

export const GetDirectorAnalysisData = async (arg) => {
  try {
    let TenureFrom = arg.tenureFrom === null ? NUMBER_ZERO : arg.tenureFrom;
    let TenureTo = arg.tenureTo === null ? NUMBER_TRIPLE_NINE : arg.tenureTo;
    let gender;
    if (arg.tenureFrom === null && arg.tenureTo === null) {
      TenureFrom = null;
      TenureTo = null;
    }
    let BoardFrom = arg.boardFrom === null ? NUMBER_ZERO : arg.boardFrom;
    let BoardTo = arg.boardTo === null ? NUMBER_TRIPLE_NINE : arg.boardTo;
    if (arg.boardFrom === null && arg.boardTo === null) {
      BoardFrom = null;
      BoardTo = null;
    }
    let AgeFrom = arg.ageFrom === null ? NUMBER_ZERO : arg.ageFrom;
    let AgeTo = arg.ageTo === null ? NUMBER_TRIPLE_NINE : arg.ageTo;
    if (arg.ageFrom === null && arg.ageTo === null) {
      AgeFrom = null;
      AgeTo = null;
    }
    if (arg.gender === 'All') {
      gender = null;
    } else if (arg.gender === 'Male') {
      gender = 'Male';
    } else if (arg.gender === 'Female') {
      gender = 'Female';
    }
    const response = await axios.post(
      getDirectorAnalysisData,
      {
        gender: gender,
        tenureFrom: TenureFrom,
        tenureTo: TenureTo,
        ageFrom: AgeFrom,
        ageTo: AgeTo,
        boardFrom: BoardFrom,
        boardTo: BoardTo,
        company_search_id: arg.company_search_id,
        based_on_data: arg.based_on_data,
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

export const GetDDLEthnicityData = async (arg) => {
  try {
    const response = await axios.post(
      getDDLEthnicityData,
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
  return false;
};
