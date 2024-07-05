import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';
import UnderConstruction from '../../../pages/UnderConstruction';

const InvestorActivistShortOwnershipDisclosures = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  return (
    <Page {...props} key={1} className='pt-3'>
      <UnderConstruction />
    </Page>
  );
};

InvestorActivistShortOwnershipDisclosures.propTypes = {
  location: PropTypes.object
};
InvestorActivistShortOwnershipDisclosures.defaultProps = {
  location: {}
};
export default withRouter(InvestorActivistShortOwnershipDisclosures);
