import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';
import UnderConstruction from '../../../pages/UnderConstruction';

const InvestorVotingComparator = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  return (
    <Page {...props} key={1}>
      {' '}
      <UnderConstruction />
    </Page>
  );
};
InvestorVotingComparator.propTypes = {
  location: PropTypes.object
};

InvestorVotingComparator.defaultProps = {
  location: {}
};
export default withRouter(InvestorVotingComparator);
