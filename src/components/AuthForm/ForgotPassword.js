import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.css';

const ForgotPassword = ({ onLoginClick, sendEmailResetPassword }) => {
  const [formVal, setFormVal] = useState({
    email: ''
  });

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setFormVal((preValue) => ({
      ...preValue,
      [name]: value
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    sendEmailResetPassword(formVal.email);
  };

  return (
    <div className={styles.login}>
      <form action='' method='get' onSubmit={submitHandler} className={styles.animatebottom}>
        <fieldset className={styles.clearfix}>
          <h1>Forgotten Password</h1>
          <span className='float-start mb-2'>Please enter your email address below to reset:</span>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='basic-addon1'>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                className='bi bi-envelope-fill'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z'
                />
              </svg>
            </span>
            <input
              type='email'
              name='email'
              onChange={inputEvent}
              className='form-control'
              placeholder='Email'
              aria-label='Email'
              aria-describedby='basic-addon1'
              required
            />
          </div>
          <div>
            <span className='float-start' onClick={onLoginClick}>
              <button type='button' className='btn btn-link'>
                Back to login?
              </button>
            </span>
            <span className='float-end'>
              <button className='btn btn-primary' type='submit'>
                Reset My Password
              </button>
            </span>
          </div>
        </fieldset>
        <div className={styles.clearfix} />
      </form>
    </div>
  );
};

ForgotPassword.propTypes = {
  onLoginClick: PropTypes.func,
  sendEmailResetPassword: PropTypes.func
};

ForgotPassword.defaultProps = {
  onLoginClick: () => {},
  sendEmailResetPassword: () => {}
};

export default React.memo(ForgotPassword);
