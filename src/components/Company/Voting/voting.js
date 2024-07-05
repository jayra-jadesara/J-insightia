import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import pathConst from '../../../constants/PathsConstant';

const Voting = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  if (!query.pid) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  return <Page {...props} key={1} />;
};

export default withRouter(React.memo(Voting));
