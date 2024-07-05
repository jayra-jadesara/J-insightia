import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../Page';
import { ADVISOR_SEARCH } from '../../constants/PathsConstant';
import '../../styles/components/_popupTrialUser.scss';

import UnderConstruction from '../../pages/UnderConstruction';

const AdvisorOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.company_id && query.company_id === undefined && query.company_id === 'undefined') {
    return <Redirect to={ADVISOR_SEARCH} />;
  }

  return (
    <Page {...props} key={1}>
      <UnderConstruction />
    </Page>
  );
};

AdvisorOverview.propTypes = {
  location: PropTypes.object
};

AdvisorOverview.defaultProps = {
  location: {}
};

export default withRouter(AdvisorOverview);
