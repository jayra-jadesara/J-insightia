import PropTypes from 'prop-types';
import React from 'react';
import styles from './AuthForm.module.css';
import ConfirmForgotPassword from './ConfirmForgotPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import PasswordResetSuccess from './PasswordResetSuccess';
import LoginConfirmation from './LoginConfirmation';
import {
  STATE_FORGOT_PASSWORD,
  STATE_LOGIN,
  STATE_CONFIRM_FORGOT_PASSWORD,
  STATE_PASSWORD_RESET_SUCCESS,
  STATE_LOGIN_CONFIRMATION
} from '../../constants/LoginConstants';
import Model from '../GeneralForm/Modal';
import { INSIGHTIA_LOGO_STANDARD } from '../../constants/PathsConstant';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  handleForgotScreen = () => {
    this.props.switchScreen(STATE_FORGOT_PASSWORD);
  };

  handleLoginScreen = () => {
    this.props.switchScreen(STATE_LOGIN);
  };

  handleConfForPwdScreen = () => {
    this.props.switchScreen(STATE_CONFIRM_FORGOT_PASSWORD);
  };

  getChildCompoent = (screen) => {
    switch (screen) {
      case STATE_LOGIN:
        return (
          <Login
            onForgotClick={this.handleForgotScreen}
            isPwdShow={this.props.isPwdShow}
            handleOnShowPassword={this.props.handleOnShowPassword}
            handleLogin={this.props.handleLogin}
            handleLoginIp={this.props.handleLoginIp}
            userDetails={this.props.userDetails}
            ipLogin={this.props.ipLogin[0]}
            createComputerCookie={this.props.createComputerCookie}
            updateCookieLogin={this.props.updateCookieLogin}
            isPaygUser={this.props.isPaygUser}
            handleCloseModel={this.props.handleCloseModel}
            cost_code={this.props.cost_code}
            handleOnChangeCostCode={this.props.handleOnChangeCostCode}
          />
        );
      case STATE_FORGOT_PASSWORD:
        return (
          <ForgotPassword
            onLoginClick={this.handleLoginScreen}
            sendEmailResetPassword={this.props.sendEmailResetPassword}
          />
        );
      case STATE_CONFIRM_FORGOT_PASSWORD:
        return (
          <ConfirmForgotPassword
            onLoginClick={this.handleLoginScreen}
            handleConfirmPassword={this.props.handleConfirmPassword}
            resetPasswordStatus={this.props.resetPasswordStatus}
            isQueryEmail={this.props.isQueryEmail}
          />
        );
      case STATE_PASSWORD_RESET_SUCCESS:
        return <PasswordResetSuccess onLoginClick={this.handleLoginScreen} />;
      case STATE_LOGIN_CONFIRMATION:
        return <LoginConfirmation onLoginClick={this.handleLoginScreen} />;
      default:
        return null;
    }
  };

  modalClose = () => {
    this.setState({ show: false });
  };

  useKeypress(key, action) {
    function onKeyup(e) {
      if (e.key === key) action();
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }

  render() {
    this.useKeypress('Enter', this.props.handleCloaseModelPopup);

    const childComponent = this.getChildCompoent(this.props.screen);
    return (
      <div>
        {this.props.isModalPopupVisible && (
          <Model
            show={this.props.isModalPopupVisible}
            isShowFooter={true}
            handleClose={() => this.props.handleCloaseModelPopup()}
            onEnterPress={() => this.props.handleCloaseModelPopup()}
            title='Login Failed'
            isInfo={true}
          >
            <h5>{this.props.userDetails.message}</h5>
          </Model>
        )}
        <div className={styles.main}>
          <div className={styles.container}>
            <center>
              <div
                className={
                  this.props.screen === STATE_CONFIRM_FORGOT_PASSWORD ? styles.middleForgetpass : styles.middle
                }
              >
                <div
                  className={
                    this.props.screen === STATE_CONFIRM_FORGOT_PASSWORD ? styles.logoForgetPassword : styles.logo
                  }
                >
                  <img src={INSIGHTIA_LOGO_STANDARD} alt='Logo' />
                  <div className={styles.clearfix} />
                </div>
                {childComponent}
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  handleCloaseModelPopup: PropTypes.func,
  handleConfirmPassword: PropTypes.func,
  handleLogin: PropTypes.func,
  isModalPopupVisible: PropTypes.bool,
  resetPasswordStatus: PropTypes.any,
  screen: PropTypes.string,
  sendEmailResetPassword: PropTypes.func,
  switchScreen: PropTypes.func,
  userDetails: PropTypes.object
};

AuthForm.defaultProps = {
  handleCloaseModelPopup: () => {},
  handleConfirmPassword: () => {},
  handleLogin: () => {},
  isModalPopupVisible: false,
  screen: '',
  sendEmailResetPassword: () => {},
  switchScreen: () => {},
  userDetails: {}
};

export default React.memo(AuthForm);
