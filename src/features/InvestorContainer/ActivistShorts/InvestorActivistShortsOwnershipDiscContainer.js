import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvestorActivistShortsOwnershipDisclosures from '../../../components/Investor/InvestorActivistShorts/InvestorActivistShortOwnershipDisclosures';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const InvestorActivistShortsOwnershipDisclosuresContainer = ({
  location,
  children
}) => (
  <ErrorBoundary>
    <InvestorActivistShortsOwnershipDisclosures children={children} />
  </ErrorBoundary>
);
InvestorActivistShortsOwnershipDisclosuresContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivistShortsOwnershipDisclosuresContainer)
);
