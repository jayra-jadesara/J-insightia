import axios from 'axios';
import { getDataAmendmentDataandAnalytics } from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { GOVERNANCE } from '../constants/ProductConstants';

export const GetDataAmendmentDataandAnalytics = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getDataAmendmentDataandAnalytics,
      {
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
  } catch (e) {
    return false;
  }
  return false;
};

export default { GetDataAmendmentDataandAnalytics };
