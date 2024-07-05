import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import { COMPANY_SEARCH } from '../../../constants/PathsConstant';

const ActivistShorts = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  return <Page {...props} key={1} />;
};

ActivistShorts.propTypes = {
  location: PropTypes.object
};

ActivistShorts.defaultProps = {
  location: {}
};

export default withRouter(React.memo(ActivistShorts));
