import axios from 'axios';
import config from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

// import { history } from '../utils/navigation-util';

export const getMagazinesReportList = async (product_id, article_type_list) => {
  try {
    const response = await axios.post(
      config.getMagazinesReportList,
      {
        product_id,
        article_type_list
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

export const GetMagazine_ProxyOrSpecialReports_insightiaList = async (Article_type_id) => {
  try {
    const response = await axios.post(
      config.GetMagazine_ProxyOrSpecialReports_insightiaList,
      {
        Article_type_id
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

export const SearchAiMMagazineText = async (search) => {
  try {
    const response = await axios.post(
      config.searchAiMMagazineText,
      {
        search
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
