import axios from 'axios';
import config from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { VOTING } from '../constants/ProductConstants';
import { dateToISOString } from './general-util';

export const GetCompensationComparatorData = async (req) => {
  try {
    const response = await axios.post(
      config.getCompensationComparatorData,
      {
        companySearchId: req.companySearchId,
        director_id: req.director_id,
        role: req.role,
        tenure: req.tenure,
        committee: req.committee,
        DateFrom: req.DateFrom !== null ? dateToISOString(req.DateFrom) : null,
        DateTo: req.DateTo !== null ? dateToISOString(req.DateTo) : null,
        CompensationType: req.compensationType,
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
export const GetDirectorTypesData = async (req) => {
  try {
    const response = await axios.post(
      config.GetDirectorTypes,
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
