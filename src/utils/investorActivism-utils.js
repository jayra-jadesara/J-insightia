import axios from 'axios';
import {
  //Ovesrview
  getActiviststrategyData,
  getHoldingsbyCountryChartData,
  getHoldingsbyIndustryChartData,
  getHoldingsbyExitTypeChartData,
  getHoldingsbyMarketCapChartData,
  getActivistProfileData,
  getCampaignTypesbyActivistLst,
  getActivistOfficesLst,
  getActivistPersonnelLst,
  getActivistTimelineLst,
  getActivistSharholderProposalsLst,
  //Investments
  getActivistHoldingsLst,
  get13F_Filings_by_ActivistLst,

  //Demands
  getActivistGBRCampaignsLst,
  getCampaignSummarybyActivistLst,

  //Follower returns
  getFollowerReturnsSearchLst,
  getFollowerReturnsActivistStatschartData,
  getFollowerReturnsActivistStatsData,

  //Performance
  getPerformancePeriodicbyActivistLst,
  getListofReprtingDate,
  getPerformanceAnnualbyActivistLst,
  getInvestorActivistCampaignsDataList,

  //Activism Access
  getInvestorActivisamTabDataCheck
} from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { TokenDecode } from './general-util';

export const GetActiviststrategyData = async (actid) => {
  try {
    const response = await axios.post(
      getActiviststrategyData,
      {
        actid,
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

export const GetHoldingsbyCountryChartData = async (actid) => {
  try {
    const response = await axios.post(
      getHoldingsbyCountryChartData,
      {
        actid,
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

export const GetHoldingsbyIndustryChartData = async (actid) => {
  try {
    const response = await axios.post(
      getHoldingsbyIndustryChartData,
      {
        actid,
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

export const GetHoldingsbyExitTypeChartData = async (actid) => {
  try {
    const response = await axios.post(
      getHoldingsbyExitTypeChartData,
      {
        actid,
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

export const GetHoldingsbyMarketCapChartData = async (actid) => {
  try {
    const response = await axios.post(
      getHoldingsbyMarketCapChartData,
      {
        actid,
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

export const GetActivistProfileData = async (actid) => {
  try {
    const response = await axios.post(
      getActivistProfileData,
      {
        actid,
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

export const GetCampaignTypesbyActivistLst = async (actid) => {
  try {
    const response = await axios.post(
      getCampaignTypesbyActivistLst,
      {
        actid,
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

export const GetActivistOfficesLst = async (actid) => {
  try {
    const response = await axios.post(
      getActivistOfficesLst,
      {
        actid,
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

export const GetActivistPersonnelLst = async (actid) => {
  try {
    const response = await axios.post(
      getActivistPersonnelLst,
      {
        actid,
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

export const GetActivistTimelineLst = async (actid) => {
  try {
    const response = await axios.post(
      getActivistTimelineLst,
      {
        actid,
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

export const GetActivistSharholderProposalsLst = async (actid) => {
  try {
    const response = await axios.post(
      getActivistSharholderProposalsLst,
      {
        actid,
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

//Investments

export const GetActivistHoldingsLst = async (actid) => {
  try {
    const response = await axios.post(
      getActivistHoldingsLst,
      {
        actid,
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

export const Get13F_Filings_by_ActivistLst = async (actid) => {
  try {
    const response = await axios.post(
      get13F_Filings_by_ActivistLst,
      {
        actid,
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

export const GetActivistGBRCampaignsLst = async (actid) => {
  try {
    const response = await axios.post(
      getActivistGBRCampaignsLst,
      {
        actid,
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

export const GetCampaignSummarybyActivistLst = async (actid) => {
  try {
    const response = await axios.post(
      getCampaignSummarybyActivistLst,
      {
        actid,
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

export const GetFollowerReturnsSearchLst = async (req) => {
  try {
    const response = await axios.post(
      getFollowerReturnsSearchLst,
      {
        actid: req.actid,
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

export const GetFollowerReturnsActivistStatschartData = async (actid) => {
  try {
    const response = await axios.post(
      getFollowerReturnsActivistStatschartData,
      {
        actid,
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

export const GetFollowerReturnsActivistStatsData = async (actid) => {
  try {
    const response = await axios.post(
      getFollowerReturnsActivistStatsData,
      {
        actid,
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

export const GetPerformancePeriodicbyActivistLst = async (
  actid,
  dateReported
) => {
  try {
    const response = await axios.post(
      getPerformancePeriodicbyActivistLst,
      {
        actid,
        dateReported,
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

export const GetListofReprtingDate = async (actid) => {
  try {
    const response = await axios.post(
      getListofReprtingDate,
      {
        actid,
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

export const GetPerformanceAnnualbyActivistLst = async (actid) => {
  try {
    const response = await axios.post(
      getPerformanceAnnualbyActivistLst,
      {
        actid,
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

export const GetInvestorActivistCampaignsDataList = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      getInvestorActivistCampaignsDataList,
      {
        indiv_campaigns: req.indiv_campaigns,
        investor_id: req.investor_id,
        show_other_campaigns: req.show_other_campaigns,
        user_id: uid,
        resultset: req.resultset !== undefined ? req.resultset : null,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        cancelToken: req.cancelToken,
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetInvestorActivisamTabDataCheck = async (res) => {
  try {
    const response = await axios.post(
      getInvestorActivisamTabDataCheck,
      {
        activist_id: res.activist_id
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
