import axios from 'axios';
import config from '../config/server-config';
import { TokenDecode } from './general-util';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

// Investor
export const GetInvestorProfile = async (investor) => {
  try {
    const response = await axios.post(
      config.getInvestorProfile,
      {
        investor: investor
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

export const GetInvestorNavReq = async (investor) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.getInvestorNavReq,
      {
        investor_id: investor,
        user_id: uid
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

export const investor_search = async (NameSearch, quicksearch) => {
  try {
    const response = await axios.post(
      config.investor_search,
      {
        NameSearch: NameSearch,
        quicksearch: quicksearch
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

// Voting Rationale
export const GetVotingRationale_byInvestor = async (investor_id) => {
  try {
    const response = await axios.post(
      config.getVotingRationale_byInvestor,
      {
        investor_id: investor_id
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

// Investor filings
export const listActivistFilingsByActivist_v2 = async (company_id, activist_id, longShort) => {
  try {
    const response = await axios.post(
      config.listActivistFilingsByActivist_v2,
      {
        company_id,
        activist_id,
        longShort
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

export const listActivistFilingsByActivistAiS = async (company_id, activist_id, longShort) => {
  try {
    const response = await axios.post(
      config.listActivistFilingsByActivistAiS,
      {
        company_id,
        activist_id,
        longShort
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

// Investor voting search
export const GetVotedByManagerList = async (investor_id) => {
  try {
    const response = await axios.post(
      config.getVotedByManagerList,
      {
        investor_id
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

// Investor Overview
export const GetFMProfile = async (investor_id) => {
  try {
    const response = await axios.post(
      config.getFMProfile,
      {
        investor_id: Number(investor_id)
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

// Investor voting overview
export const GetInvestorVoteSummary = async (investor_id) => {
  try {
    const response = await axios.post(
      config.getInvestorVoteSummary,
      {
        investor_id
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

export const IssAndglasslewis_vote = async (investor_id) => {
  try {
    const response = await axios.post(
      config.issAndglasslewis_vote,
      {
        investor_id
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

export const GetManager_voting_against = async (investor_id) => {
  try {
    const response = await axios.post(
      config.getManager_voting_against,
      {
        investor_id
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

export const GetDissident_Data_for_Investor_v2 = async (investorid) => {
  try {
    const response = await axios.post(
      config.getDissident_Data_for_Investor_v2,
      {
        investorid
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

export const GetManager_latest_against2 = async (investor_id) => {
  try {
    const response = await axios.post(
      config.getManager_latest_against2,
      {
        investor_id
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
