import axios from 'axios';
import { getActivistShortsFillingsData } from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { ACTIVIST_SHORTS } from '../constants/ProductConstants';

export const GetActivistShortsFillingsData = async ({ cancelToken }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getActivistShortsFillingsData,
      { product_id: ACTIVIST_SHORTS, token },
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
  return false;
};

export default { GetActivistShortsFillingsData };
