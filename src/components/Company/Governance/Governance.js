import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import pathConst from '../../../constants/PathsConstant';

const Governance = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.pid) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  return <Page {...props} key={1} />;
};

Governance.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(React.memo(Governance));
