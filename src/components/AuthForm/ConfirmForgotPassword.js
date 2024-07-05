import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './AuthForm.module.css';
import { KEY_CODE_SAPCE } from '../../constants/NumberConstants';

const isLetter = /[a-zA-Z]/;
const isSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
const isDigit = /\d/;

const ConfirmForgotPassword = ({ onLoginClick, handleConfirmPassword, resetPasswordStatus, isQueryEmail }) => {
  const [formVal, setFormVal] = useState({
    password: '',
    retypepassword: '',
    resetPasswordStatus: ''
  });

  const [isValid, setIsValid] = useState(true);
  const [isChar8, setIsChar8] = useState(false);
  const [isMinLetter, setIsMinLetter] = useState(false);
  const [isMinDigit, setIsMinDigit] = useState(false);
  const [isSPChar, setIsSPChar] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(false);

  const inputEvent = (e) => {
    if (e.target.value !== ' ') {
      const { name, value } = e.target;
      setFormVal((preValue) => ({
        ...preValue,
        [name]: value
      }));
    }

    if (e.target.name === 'password') {
      if (e.target.value.length > 7) {
        document.getElementById('passChar_8').classList.replace(styles.isInvalidPassword, styles.isValidPassword);
        setIsChar8(true);
      } else {
        document.getElementById('passChar_8').classList.replace(styles.isValidPassword, styles.isInvalidPassword);
        setIsChar8(false);
      }

      if (isLetter.test(e.target.value)) {
        document.getElementById('passChar_1').classList.replace(styles.isInvalidPassword, styles.isValidPassword);
        setIsMinLetter(true);
      } else {
        document.getElementById('passChar_1').classList.replace(styles.isValidPassword, styles.isInvalidPassword);
        setIsMinLetter(false);
      }

      if (isDigit.test(e.target.value)) {
        document.getElementById('passNum_1').classList.replace(styles.isInvalidPassword, styles.isValidPassword);
        setIsMinDigit(true);
      } else {
        document.getElementById('passNum_1').classList.replace(styles.isValidPassword, styles.isInvalidPassword);
        setIsMinDigit(false);
      }

      if (isSpecialChar.test(e.target.value)) {
        document.getElementById('passSP_Char_1').classList.replace(styles.isInvalidPassword, styles.isValidPassword);
        setIsSPChar(true);
      } else {
        document.getElementById('passSP_Char_1').classList.replace(styles.isValidPassword, styles.isInvalidPassword);
        setIsSPChar(false);
      }
    }
  };

  const handleSpace = (e) => {
    if (e.keyCode === KEY_CODE_SAPCE) {
      e.preventDefault();
    }
  };

  const validatePassword = (e) => {
    if (e.target.name === 'retypepassword' && e.target.value.length > 0 && e.target.value === formVal.password) {
      document.getElementById('passBoxMatch').classList.replace(styles.isInvalidPassword, styles.isValidPassword);
      setIsPassMatch(true);
      if (isChar8 && isMinLetter && isMinDigit && isSPChar) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      document.getElementById('passBoxMatch').classList.replace(styles.isValidPassword, styles.isInvalidPassword);
      setIsPassMatch(false);
      setIsValid(true);
    }

    if (formVal.password !== formVal.retypepassword && e.target.name === 'retypepassword') {
      e.target.setCustomValidity("Password and confirm password don't match");
    } else {
      e.target.setCustomValidity('');
    }
  };

  const formSubmit = (events) => {
    events.preventDefault();
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const data = {
      password: formVal.password,
      resetcode: params.get('key'),
      email: params.get('email')
    };
    handleConfirmPassword(data);
  };

  return (
    <div className={styles.loginForgetPassword}>
      <div>
        <form action='' method='get' onSubmit={formSubmit}>
          <fieldset className={styles.clearfix}>
            <h1> {isQueryEmail ? 'Setup' : 'Reset'} Password</h1>
            <span className='float-start text-start mb-2'>Enter new password.</span>
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
                type='password'
                name='password'
                onChange={inputEvent}
                onKeyUp={validatePassword}
                onKeyDown={handleSpace}
                className='form-control'
                placeholder='New Password'
                aria-label='New-Password'
                aria-describedby='basic-addon2'
                maxLength='20'
                minLength='8'
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
                type='password'
                name='retypepassword'
                onChange={inputEvent}
                onKeyUp={validatePassword}
                onKeyDown={handleSpace}
                className='form-control'
                placeholder='Retype New Password'
                aria-label='Retype-New-Password'
                aria-describedby='basic-addon2'
                maxLength='20'
                minLength='8'
                required
              />
            </div>
            <div>
              <span className='float-start' onClick={onLoginClick}>
                <button type='button' className='btn btn-link'>
                  Back to login?
                </button>
              </span>
              <span className={styles.spanSubmit}>
                <button className='btn btn-primary float-end' type='submit' disabled={isValid}>
                  {isQueryEmail ? 'Create' : 'Update'} Password
                </button>
              </span>
            </div>
            <div style={{ color: 'red' }}>{resetPasswordStatus ? resetPasswordStatus.text : ''}</div>
          </fieldset>
        </form>
      </div>
      <div className={styles.require}>
        <span>Password must be:</span>
        <div className='mt-2'>
          <div className={styles.isInvalidPassword} id='passChar_8'>
            <i
              className={isChar8 ? 'bi bi-check-circle-fill  passChar_8_icon' : 'bi bi-x-circle-fill  passChar_8_icon'}
            />{' '}
            at least 8 characters
          </div>
          <div className={styles.isInvalidPassword} id='passNum_1'>
            <i
              className={isMinDigit ? 'bi bi-check-circle-fill  passNum_1_icon' : 'bi bi-x-circle-fill  passNum_1_icon'}
            />{' '}
            at least 1 number
          </div>
          <div className={styles.isInvalidPassword} id='passChar_1'>
            <i
              className={
                isMinLetter ? 'bi bi-check-circle-fill  passChar_1_icon' : 'bi bi-x-circle-fill  passChar_1_icon'
              }
            />{' '}
            at least 1 letter
          </div>
          <div className={styles.isInvalidPassword} id='passSP_Char_1'>
            <i
              className={
                isSPChar ? 'bi bi-check-circle-fill  passSP_Char_1_icon' : 'bi bi-x-circle-fill  passSP_Char_1_icon'
              }
            />{' '}
            at least 1 special character (£ $ % ^ & * @ # ? ! / [ ] {} ~ ; : | \ )
          </div>
          <div className={styles.isInvalidPassword} id='passBoxMatch'>
            <i
              className={
                isPassMatch ? 'bi bi-check-circle-fill  passBoxMatch_icon' : 'bi bi-x-circle-fill   passBoxMatch_icon'
              }
            />{' '}
            match in both boxes
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmForgotPassword.propTypes = {
  handleConfirmPassword: PropTypes.func,
  onLoginClick: PropTypes.func,
  resetPasswordStatus: PropTypes.shape({
    text: PropTypes.string
  })
};

ConfirmForgotPassword.defaultProps = {
  handleConfirmPassword: () => {},
  onLoginClick: () => {},
  resetPasswordStatus: {
    text: ''
  }
};

export default React.memo(ConfirmForgotPassword);
