import PropTypes from 'prop-types';
import React from 'react';

const PageSpinner = ({ color = 'primary', spinner = 'grow' }) => (
  <div className='cr-page-spinner'>
    <div className={`spinner-${spinner} text-${color}`} role='status'>
      <span className='sr-only' />
    </div>
  </div>
);

PageSpinner.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  spinner: PropTypes.string
};

PageSpinner.defaultProps = {
  spinner: ''
};

export default React.memo(PageSpinner);
