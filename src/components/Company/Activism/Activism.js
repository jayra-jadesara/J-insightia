import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import { COMPANY_SEARCH } from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';

const Activism = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  return <Page {...props} key={1} />;
};

export default withRouter(React.memo(Activism));
