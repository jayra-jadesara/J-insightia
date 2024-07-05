import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import UnderConstruction from '../../../pages/UnderConstruction';

const InvestorActivism = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  return (
    <Page {...props} key={1}>
      <UnderConstruction />
    </Page>
  );
};

InvestorActivism.propTypes = {
  location: PropTypes.object
};

InvestorActivism.defaultProps = {
  location: {}
};

export default withRouter(React.memo(InvestorActivism));
