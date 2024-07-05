import axios from 'axios';
import {
  getAdvisorSearchData,
  getAdvisorProfile,
  getAdvisorModuleAccessData,
  getAdvisorActivismCompanyWebsite,
  getAdvisorActivismPersonnel,
  getAdvisorActivismCampaigns,
  getAdvisorActivistShortCampaigns,
  getIntermediaryData,
  getAdvisorVotingDetailInfo,
  getAdvisorVotingWindandInstrByYear,
  getLawFirmProposalTypes
} from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const GetAdvisorSearchData = async (searchName, quicksearch) => {
  try {
    const response = await axios.post(
      getAdvisorSearchData,
      {
        searchName,
        quicksearch
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

export const GetAdvisorProfile = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorProfile,
      {
        companyId
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

export const GetAdvisorModuleAccessData = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorModuleAccessData,
      {
        companyId
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

export const GetAdvisorActivismCompanyWebsite = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorActivismCompanyWebsite,
      {
        companyId
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

export const GetAdvisorActivismPersonnel = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorActivismPersonnel,
      {
        companyId
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

export const GetAdvisorActivismCampaigns = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorActivismCampaigns,
      {
        companyId
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

export const GetAdvisorActivistShortCampaigns = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorActivistShortCampaigns,
      {
        companyId
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

export const GetIntermediaryData = async (companyId) => {
  try {
    const response = await axios.post(
      getIntermediaryData,
      {
        companyId
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

export const GetAdvisorVotingDetailInfo = async (intermediaryId, companyid) => {
  try {
    const response = await axios.post(
      getAdvisorVotingDetailInfo,
      {
        intermediaryId,
        companyid
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

export const GetAdvisorVotingWindandInstrByYear = async (companyId) => {
  try {
    const response = await axios.post(
      getAdvisorVotingWindandInstrByYear,
      {
        companyId
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

export const GetLawFirmProposalTypes = async (companyId) => {
  try {
    const response = await axios.post(
      getLawFirmProposalTypes,
      {
        companyId
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
