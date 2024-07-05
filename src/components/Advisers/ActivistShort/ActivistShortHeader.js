import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';

const ActivistShortHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { company_id } = props;
  if (company_id !== undefined) {
    query.company_id = company_id;
  }

  return <nav className='navbar navbar-expand-md navbar-light bg-light'></nav>;
};

ActivistShortHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  advisor: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func
};

ActivistShortHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: {}
};
export default withRouter(ActivistShortHeader);
