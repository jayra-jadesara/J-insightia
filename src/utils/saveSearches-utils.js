import axios from 'axios';
import config from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { TokenDecode } from './general-util';

export const UserSearchFilter_Create = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.userSearchFilter_Create,
      {
        filter_name: req.filter_name,
        filter_definition: req.filter_definition,
        filter_type_id: req.filter_type_id,
        user_id: uid,
        privacy: req.privacy,
        permission: req.permission,
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
  return false;
};

export const UserSearchFilter_Update = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.userSearchFilter_Update,
      {
        filter_id: req.filter_id,
        filter_name: req.filter_name,
        filter_definition: req.filter_definition,
        filter_type_id: req.filter_type_id,
        user_id: uid,
        privacy: req.privacy,
        permission: req.permission,
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
  return false;
};

export const UserSearchFilter_Delete = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.userSearchFilter_Delete,
      {
        filter_id: req.filter_id,
        user_id: uid,
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
  return false;
};

export const UserSearchFilter_Get = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.userSearchFilter_Get,
      {
        filter_type_id: req.filter_type_id,
        user_id: uid,
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
  return false;
};

export default {
  UserSearchFilter_Create,
  UserSearchFilter_Update,
  UserSearchFilter_Delete,
  UserSearchFilter_Get,
};
