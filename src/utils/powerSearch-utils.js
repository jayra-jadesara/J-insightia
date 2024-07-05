import axios from 'axios';
import config from '../config/server-config';
import { ICON_IMAGE_PATH } from '../constants/PathsConstant';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

export const getPowerSearch = async (body) => {
  try {
    const response = await axios.post(config.getPowerSearch, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const getPowerSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.getPowerSearchFilter, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const createPowerSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.createPowerSearchFilter, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const listPowerSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.listPowerSearchFilter, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const updatePowerSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.updatePowerSearchFilter, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const deletePowerSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.deletePowerSearchFilter, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const createVulnerabilityAdvancedSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.createPowerSearchFilterVuln, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const listVulnerabilityAdvancedSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.listPowerSearchFilterVuln, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const updateVulnerabilityAdvancedSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.updatePowerSearchFilterVuln, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const deleteVulnerabilityAdvancedSearchFilter = async (body) => {
  try {
    const response = await axios.post(config.deletePowerSearchFilterVuln, body, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

// Templated from demandsImageHandlerHTML
export const powersearchImageHandlerHTML = (key, flag = false) => {
  const newkey = key;
  let imageDescription = '';
  let imageLocation = '';
  if (newkey === '' || typeof newkey === 'undefined' || newkey === null) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('text-center');
    const text = document.createElement('span');
    text.textContent = '-';
    wrapper.appendChild(text);
    return wrapper;
  }
  if (newkey.toString() === '1') {
    if (flag) {
      imageLocation = 'GreenFlag.png';
      imageDescription = 'Green Flag';
    } else {
      imageLocation = 'GreenYes.png';
      imageDescription = 'Green Tick';
    }
  } else if (newkey.toString() === '0') {
    if (flag) {
      imageLocation = 'redflag_large.png';
      imageDescription = 'Red Flag';
    } else {
      imageLocation = 'RedCross.png';
      imageDescription = 'Red Cross';
    }
  }

  // use createElement and appendchild as its faster than innerhtml
  const wrapper = document.createElement('div');
  wrapper.classList.add('text-center');
  const img = document.createElement('img');
  img.classList.add('smallIcon');
  img.src = `${window.location.origin}${ICON_IMAGE_PATH}${imageLocation}`;
  img.alt = imageDescription;
  img.title = imageDescription;
  wrapper.appendChild(img);
  // when returning do not put in brackets (NOT JSX)
  return wrapper;
};
