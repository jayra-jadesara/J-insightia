import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VotingSummary from '../../components/Investor/InvestorVoting/InvestorVotingComparator';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const InvestorVotingComparatorContainer = ({ location, children }) => (
  <ErrorBoundary>
    <VotingSummary children={children} />
  </ErrorBoundary>
);

InvestorVotingComparatorContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorVotingComparatorContainer)
);
