import axios from 'axios';
import config from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const People_search = async (name_search, quicksearch) => {
  try {
    const response = await axios.post(
      config.people_search,
      {
        nameSearch: name_search,
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

export const GetPropleProfile = async (director_id) => {
  try {
    const response = await axios.post(
      config.getPropleProfile,
      {
        director_id
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

export const getDirectorPersonInfo = async (director_id) => {
  try {
    const response = await axios.post(
      config.getDirectorPersonInfo,
      {
        director_id
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

export const getDirectorAppointmentInfo = async (director_id, current) => {
  try {
    const response = await axios.post(
      config.getDirectorAppointmentInfo,
      {
        director_id,
        current
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

export const getDirectorAppointmentInfo2 = async (director_id, current) => {
  try {
    const response = await axios.post(
      config.getDirectorAppointmentInfo2,
      {
        director_id,
        current
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

export const GetDirectorsDetails = async (director_id) => {
  try {
    const response = await axios.post(
      config.getDirectorsDetails,
      {
        director_id
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

export const GetDirectorContactData = async (director_id) => {
  try {
    const response = await axios.post(
      config.getDirectorContactData,
      {
        director_id
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
export const GetDirectorOnBoardData = async (director_id) => {
  try {
    const response = await axios.post(
      config.getDirectorOnBoardData,
      {
        director_id
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
// GetGanttChartSampleData
export const getGanttChartSampleData = async (director_id) => {
  try {
    const response = await axios.post(
      config.GetGanttChartSampleData,
      {
        director_id
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
//People Compensation
export const getIndividualGrantedPeopleCompensation = async (director_id) => {
  try {
    const response = await axios.post(
      config.GetIndividualGrantedPeopleCompensation,
      {
        director_id
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

//people Overview
export const getPeopleOverview = async (director_id) => {
  try {
    const response = await axios.post(
      config.getPeopleOverview,
      {
        director_id
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
