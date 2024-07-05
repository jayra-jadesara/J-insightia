import axios from 'axios';
import config from '../config/server-config';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { history } from './navigation-util';

export const authenticate = async (user, password, costCode) => {
  try {
    const response = await axios.post(config.userAuthenticate, {
      username: user,
      password,
      costCode
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      if (response.data.token) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('userEmail', user);
        return {
          token: response.data.token,
          text: response.data.text,
          userid: response.data.User_Id,
          userEmail: user,
          isValid: true,
          foreignSecurityKey: response.data.foreignSecurityKey,
          showActivistIcon: response.data.showActivistIcon,
          showProxyIcon: response.data.showProxyIcon,
        };
      }
      if (response.data.ispayguser) {
        return response.data;
      }
      return { isValid: false, message: response.data.text };
    }
  } catch (e) {
    return false;
  }
};

export const isUserAuthenticated = () => {
  if (window.sessionStorage.getItem('lastPage') && window.localStorage.getItem('token') === null) {
    window.sessionStorage.setItem('redirect', window.sessionStorage.getItem('lastPage'));
    window.sessionStorage.removeItem('lastPage');
  }
  return window.localStorage.getItem('token');
};

export const isUserAuthenticatedBoolean = () => window.localStorage.getItem('token') !== null;

export const sendForgotPasswordEmail = async (email) => {
  axios
    .post(config.sendForgotPasswordEmail, {
      email,
      hostName: window.location.host
    })
    .then((res) => res.status === API_CALL_SUCCESSFULL)
    .catch((err) => console.log(err));
};

export const resetNewPassword = async (password, resetcode, email) => {
  try {
    const response = await axios.post(config.resetPassword, {
      pwdresettoken: resetcode,
      newpassword: password,
      email
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const logout = (userid, sessionid) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('notificationData');
  localStorage.removeItem('alertNotificationData');
  localStorage.removeItem('investorFilterData');
  localStorage.removeItem('companyFilterData');
  axios.post(config.logout, { userid, sessionid });
};

export const lookupDecIPForIPLogin = async () => {
  try {
    const response = await axios.post(config.lookupDecIPForIPLogin);
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const authenticateIPLogin = async () => {
  try {
    const response = await axios.post(config.authenticateIPLogin);
    if (response.status === API_CALL_SUCCESSFULL) {
      if (response.data.token) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('userEmail', response.data.UserEmail);
        return {
          token: response.data.token,
          text: response.data.text,
          userEmail: response.data.UserEmail,
          userid: response.data.User_Id,
          isValid: true
        };
      }
      return { isValid: false, message: response.data.text };
    }
  } catch (e) {
    return false;
  }
};

export const createComputer = async (computer_code, owner, user_agent, browser, version) => {
  try {
    const response = await axios.post(config.createComputer, {
      computer_code,
      owner,
      user_agent,
      browser,
      version
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const UpdateComputerLogin = async (computer_id) => {
  try {
    const response = await axios.post(config.updateComputerLogin, {
      computer_id
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const IsBranchUpToDate = async (res) => {
  try {
    const response = await axios.post(config.isBranchUpToDate, res, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return [];
  } catch (e) {
    return false;
  }
};
export const LoginViaAdmin = async (otk) => {
  try {
    const response = await axios.post(config.loginViaAdmin,
      {
        otk
      });
    if (response.status === API_CALL_SUCCESSFULL) {
      if (response.data.token) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('userEmail', response.data.email);
        history.push('/');
        return {
          token: response.data.token,
          text: response.data.text,
          userid: response.data.User_Id,
          userEmail: response.data.email,
          isValid: true
        };
      }
      history.push('/credential-form');
      return { isValid: false, message: response.data.text };
    }
  } catch (e) {
    return false;
  }
};
