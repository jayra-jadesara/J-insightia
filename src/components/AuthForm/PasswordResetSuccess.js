import PropTypes from 'prop-types';
import React from 'react';
import styles from './AuthForm.module.css';

const PasswordResetSuccess = ({ onLoginClick }) => (
  <div className={styles.login}>
    <form action='' method='get'>
      <fieldset className={styles.clearfix}>
        <h1>Password reset</h1>
        <span className='float-start text-start mb-2'>Your password has been successfully reset.</span>
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

PasswordResetSuccess.propTypes = {
  onLoginClick: PropTypes.func
};
PasswordResetSuccess.defaultProps = {
  onLoginClick: () => {}
};
export default React.memo(PasswordResetSuccess);
