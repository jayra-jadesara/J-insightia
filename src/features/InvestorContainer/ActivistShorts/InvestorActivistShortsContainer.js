import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvestorActivistShorts from '../../../components/Investor/InvestorActivistShorts/InvestorActivistShorts';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const InvestorActivistShortsContainer = ({ location, children }) => {
  if (location.state !== undefined && location.state.isLoadChildContent) {
    return <InvestorActivistShorts children={children} />;
  }
  return null;
};

InvestorActivistShortsContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActivistShortsContainer)
);
