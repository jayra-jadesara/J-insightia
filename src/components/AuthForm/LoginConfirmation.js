import PropTypes from 'prop-types';
import React from 'react';
import styles from './AuthForm.module.css';

const LoginConfirmation = ({ onLoginClick }) => (
  <div className={styles.login}>
    <form action='' method='get'>
      <fieldset className={styles.clearfix}>
        <h1>Email Sent</h1>
        <span className='float-start text-start mb-2'>We have sent you an email containing a Reset Password link</span>
        <div>
          <span className='float-start' />
          <span className={styles.spanSubmitConformation}>
            <button className='btn btn-primary' type='submit' onClick={onLoginClick}>
              Login
            </button>
          </span>
        </div>
      </fieldset>
    </form>
  </div>
);

LoginConfirmation.propTypes = {
  onLoginClick: PropTypes.func
};

LoginConfirmation.defaultProps = {
  onLoginClick: () => {}
};

export default React.memo(LoginConfirmation);
