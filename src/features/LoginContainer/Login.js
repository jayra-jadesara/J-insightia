import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import qs from 'qs';
import AuthForm from '../../components/AuthForm/AuthForm';
import {
  switchScreen,
  loginFormReq,
  sendEmailResetPassword,
  resetFormReq,
  handleCloaseModelPopup,
  lookupDecIPForIPLoginReq,
  loginIPFormReq,
  createComputerReq,
  updateComputerLoginReq,
  IsBranchUpToDateReq,
  handleLocalVersion,
  handleOnShowPassword,
  handleCloseModel,
  handleOnChangeCostCode
} from './loginSlice';
import { clearAPICache } from '../../utils/cache-util';
import { DASHBOARD } from '../../constants/PathsConstant';
import { LoginViaAdmin } from '../../utils/login-util';

const selectScreen = (state) => state.login.screen;
const query = qs.parse(location.search, { ignoreQueryPrefix: true });

const selectActiveScreen = createSelector([selectScreen], (screen) => screen);

const Login = ({
  isModalPopupVisible,
  screen,
  switchScreen,
  sendEmailResetPassword,
  handleConfirmPassword,
  resetPasswordStatus,
  loginFormReq,
  loginIPFormReq,
  userDetails,
  handleCloaseModelPopup,
  lookupDecIPForIPLoginReq,
  ipLogin,
  createComputerReq,
  updateComputerLoginReq,
  computer_id,
  IsBranchUpToDateReq,
  isOutdatedVersion,
  serverVersion,
  handleLocalVersion,
  isQueryEmail,
  handleOnShowPassword,
  isPwdShow,
  isPaygUser,
  handleCloseModel,
  cost_code,
  handleOnChangeCostCode
}) => {
  const lookupIP = useCallback(async () => {
    await lookupDecIPForIPLoginReq();
  }, [lookupDecIPForIPLoginReq]);

  const checkBranchVersion = useCallback(async () => {
    await handleLocalVersion(JSON.parse(localStorage.getItem('version')));
    await IsBranchUpToDateReq(JSON.parse(localStorage.getItem('version')));
  }, [IsBranchUpToDateReq, handleLocalVersion]);

  const cacheCheckAndClear = useCallback(() => {
    function resetCache() {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
        localStorage.setItem('reloadTimeOut', new Date(Date.now() + 3600 * 1000 * 24));
        localStorage.setItem('version', JSON.stringify(serverVersion));
        window.location.reload();
      }
    }

    if (isOutdatedVersion) {
      if (localStorage.getItem('reloadTimeOut') === null) {
        resetCache();
      } else if (Date.now() > new Date(localStorage.getItem('reloadTimeOut'))) {
        resetCache();
      }
    }
    clearAPICache();
  }, [isOutdatedVersion, serverVersion]);

  useEffect(() => {
    cacheCheckAndClear();
  }, [cacheCheckAndClear]);

  const loginChecks = useCallback(() => {
    lookupIP();
    checkBranchVersion();
  }, [lookupIP, checkBranchVersion]);
  useEffect(() => {
    loginChecks();
  }, [loginChecks]);

  useEffect(() => {
    if (query.otk) {
      const data = LoginViaAdmin(query.otk);
    }
  }, [query.otk]);

  if (userDetails && userDetails.isValid === true) {
    // history.push('/');
    if (window.sessionStorage.getItem('redirect')) {
      const redirectURL = window.sessionStorage.getItem('redirect');
      window.sessionStorage.removeItem('redirect');
      return <Redirect to={redirectURL} />;
    }
    return <Redirect to={DASHBOARD} />;
  }

  const createComputerCookie = async (userID) => {
    let computerCode = Cookies.get('Code');
    if (computerCode === undefined) {
      computerCode = createRandomString();
      await createComputerReq({
        computer_code: computerCode,
        owner: userID,
        user_agent: navigator.userAgent,
        browser: navigator.appName,
        version: navigator.appVersion
      }).then(async (res) => {
        if (Cookies.get('Id') === undefined || Cookies.get('Code') === undefined) {
          Cookies.set('Id', res.payload[0].computer_id, {
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
            secure: true,
            sameSite: 'strict',
            domain: 'insightia.com'
          });
          Cookies.set('Code', computerCode, {
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
            secure: true,
            sameSite: 'strict',
            domain: 'insightia.com'
          });
        }
      });
    }
    await updateComputerLoginReq({ computer_id: Cookies.get('Id') });
  };

  const createRandomString = () => {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return [...Array(10)].reduce((a) => a + p[~~(Math.random() * p.length)], '');
  };
  return (
    <AuthForm
      screen={screen}
      switchScreen={switchScreen}
      handleLogin={loginFormReq}
      handleLoginIp={loginIPFormReq}
      sendEmailResetPassword={sendEmailResetPassword}
      handleConfirmPassword={handleConfirmPassword}
      resetPasswordStatus={resetPasswordStatus}
      userDetails={userDetails}
      isModalPopupVisible={isModalPopupVisible}
      handleCloaseModelPopup={handleCloaseModelPopup}
      ipLogin={ipLogin}
      createComputerReq={createComputerReq}
      computer_id={computer_id}
      createComputerCookie={createComputerCookie}
      isQueryEmail={isQueryEmail}
      handleOnShowPassword={handleOnShowPassword}
      isPwdShow={isPwdShow}
      isPaygUser={isPaygUser}
      handleCloseModel={handleCloseModel}
      handleOnChangeCostCode={handleOnChangeCostCode}
      cost_code={cost_code}
    />
  );
};

Login.propTypes = {
  handleCloaseModelPopup: PropTypes.func,
  handleConfirmPassword: PropTypes.func,
  handleCreateComputer: PropTypes.func,
  isModalPopupVisible: PropTypes.bool,
  loginFormReq: PropTypes.func,
  resetPasswordStatus: PropTypes.any,
  screen: PropTypes.any,
  sendEmailResetPassword: PropTypes.func,
  switchScreen: PropTypes.any,
  computer_id: PropTypes.any
};

const selectresetPasswordStatus = (state) => state.login.resetPasswordStatus;
const selectUserDetails = (state) => state.login.userDetails;
const selectIsModalPopupVisible = (state) => state.login.isModalPopupVisible;
const selectIpLogin = (state) => state.login.ipLogin;
const selectComputerID = (state) => state.login.computer_id;
const selectIsBranchUpToDate = (state) => state.login.isOutdatedVersion;
const selectServerVersion = (state) => state.login.serverVersion;
const selectIsQueryEmail = (state) => state.login.isQueryEmail;
const selectisPwdShow = (state) => state.login.isPwdShow;
const selectIsPaygUser = (state) => state.login.isPaygUser;
const selectCostCode = (state) => state.login.cost_code;

const mapStateToProps = (state) => ({
  screen: selectActiveScreen(state),
  resetPasswordStatus: selectresetPasswordStatus(state),
  userDetails: selectUserDetails(state),
  isModalPopupVisible: selectIsModalPopupVisible(state),
  ipLogin: selectIpLogin(state),
  computer_id: selectComputerID(state),
  isOutdatedVersion: selectIsBranchUpToDate(state),
  serverVersion: selectServerVersion(state),
  isQueryEmail: selectIsQueryEmail(state),
  isPwdShow: selectisPwdShow(state),
  isPaygUser: selectIsPaygUser(state),
  cost_code: selectCostCode(state),
});

const mapDispatchToProps = {
  switchScreen,
  loginFormReq,
  sendEmailResetPassword,
  lookupDecIPForIPLoginReq,
  handleConfirmPassword: resetFormReq,
  handleCloaseModelPopup,
  loginIPFormReq,
  createComputerReq,
  updateComputerLoginReq,
  IsBranchUpToDateReq,
  handleLocalVersion,
  handleOnShowPassword,
  handleCloseModel,
  handleOnChangeCostCode
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
