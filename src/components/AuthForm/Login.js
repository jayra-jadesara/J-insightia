import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styles from './AuthForm.module.css';
import { NUMBER_ONE } from '../../constants/NumberConstants';
import Model from '../GeneralForm/Modal';

const Login = ({
  onForgotClick,
  handleLogin,
  ipLogin,
  handleLoginIp,
  createComputerCookie,
  isPwdShow,
  handleOnShowPassword,
  isPaygUser,
  handleCloseModel,
  handleOnChangeCostCode,
  cost_code,
}) => {
  const [formVal, setFormVal] = useState({
    username: '',
    password: ''
  });
  const isPayMessage = 'To have this session attributed to a specified cost code, please enter a cost code in the field below before logging in.';
  const ispayMessage2 = ' Otherwise just click \'Log in\' to continue.';
  const ispayMessage3 = 'Log out to end the session for the code.';
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setFormVal((preValue) => ({
      ...preValue,
      [name]: value
    }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingIP, setIsLoadingIP] = useState(false);

  useEffect(
    () => () => {
      setIsLoading(false);
      setIsLoadingIP(false);
    },
    []
  );

  const loginSubmit = async (events) => {
    events.preventDefault();
    setIsLoading(true);
    const handleLoginResp = await handleLogin(formVal);
    if (handleLoginResp.payload === false) {
      setIsLoading(false);
    }
    if (handleLoginResp.payload.isValid === true) {
      await createComputerCookie(handleLoginResp.payload.userid);
    }
    if (handleLoginResp.payload.isValid === false) {
      setIsLoading(false);
    }
  };

  const loginSubmit_costCode = async (events) => {
    events.preventDefault();
    setIsLoading(true);
    const data = { ...formVal, costCode: cost_code };
    const handleLoginResp = await handleLogin(data);
    if (handleLoginResp.payload.isValid === true) {
      await createComputerCookie(handleLoginResp.payload.userid);
    }
    if (handleLoginResp.payload.isValid === false) {
      setIsLoading(false);
    }
  };

  const loginIPSubmit = async (events) => {
    events.preventDefault();
    setIsLoadingIP(true);
    const handleLoginResp = await handleLoginIp();
    if (handleLoginResp.payload === false) {
      setIsLoading(false);
    }
    if (handleLoginResp.payload.isValid === true) {
      await createComputerCookie(handleLoginResp.payload.userid);
    }
    if (handleLoginResp.payload.isValid === false) {
      setIsLoadingIP(false);
    }
  };

  return (
    <div className={styles.login}>
      {isPaygUser && (
      <Model
        show={isPaygUser}
        isLoginButtonFooter
        handleClose={() => {
          handleCloseModel();
          setIsLoading(false);
        }}
        handleInputChange={handleOnChangeCostCode}
        handleOnClick={loginSubmit_costCode}
        title='Cost Code Required'
        isInfo={true}
        className='loginCode'
        InputValue={cost_code}
      >
        <h5>{isPayMessage}
        <br />
        {ispayMessage2}
        <br />
        {ispayMessage3}
        </h5>
      </Model>
    )}
      <form action='' method='get' onSubmit={loginSubmit} className={styles.animatebottom}>
        <fieldset className={styles.clearfix}>
          <h1>Client Login</h1>
          <span className='float-start mb-2'>Please enter your details below to log in:</span>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='basic-addon1'>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                className='bi bi-person-fill'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                />
              </svg>
            </span>
            <input
              type='email'
              name='username'
              onChange={inputEvent}
              className='form-control'
              placeholder='Email'
              aria-label='Email'
              aria-describedby='basic-addon1'
              required
            />
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='basic-addon2'>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                className='bi bi-lock-fill'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z' />
                <path fillRule='evenodd' d='M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z' />
              </svg>
            </span>
            <input
              type={isPwdShow ? 'text' : 'password'}
              name='password'
              onChange={inputEvent}
              className='form-control'
              placeholder='Password'
              aria-label='Password'
              aria-describedby='basic-addon2'
              required
            />

            <div
              className='passwordEye'
              onClick={() => {
                handleOnShowPassword();
              }}
            >
              {!isPwdShow ? <i className='bi bi-eye-fill' /> : <i className='bi bi-eye-slash-fill' />}
            </div>
          </div>
          <div className='mb-3'>
            <span onClick={onForgotClick} className='float-start'>
              <button type='button' className='btn btn-link'>
                Forgot password?
              </button>
            </span>
            <span className='float-end '>
              {isLoading ? (
                <button className='btn btn-primary' type='button' disabled>
                  <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                </button>
              ) : (
                <button className='btn btn-primary' type='submit' disabled={formVal.disabled}>
                  Log In
                </button>
              )}
            </span>
          </div>
          <div className='float-end mt-1'>
            {ipLogin !== undefined && ipLogin.Ok === NUMBER_ONE && !isLoadingIP && (
              <button type='button' className='btn btn-primary' onClick={loginIPSubmit} disabled={formVal.disabled}>
                {`${ipLogin.Company_name} Company Log In`}
              </button>
            )}
            {ipLogin !== undefined && ipLogin.Ok === NUMBER_ONE && isLoadingIP && (
              <button className='btn btn-primary' type='button' disabled>
                {`${ipLogin.Company_name} Company Log In`}{' '}
                <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func,
  onForgotClick: PropTypes.func,
  userDetails: PropTypes.any
};

Login.defaultProps = {
  handleLogin: () => {},
  onForgotClick: () => {},
  userDetails: undefined
};
export default React.memo(Login);
