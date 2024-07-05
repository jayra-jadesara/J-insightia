import axios from 'axios';
import config from '../config/server-config';
// import { history } from '../utils/navigation-util';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const getdata_FAQS_definition = async (res) => {
  try {
    const response = await axios.post(
      config.getdata_FAQS_definition,
      {
        ProductID: res.ProductID,
        AdditionalSectionID: res.AdditionalSectionID
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

export default getdata_FAQS_definition;
