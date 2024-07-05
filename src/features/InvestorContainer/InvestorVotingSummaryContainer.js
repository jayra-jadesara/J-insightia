import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VotingSummary from '../../components/Investor/InvestorVoting/InvestorVotingSummary';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const InvestorVotingSummaryContainer = ({ location, children }) => (
    <ErrorBoundary>
      <VotingSummary children={children} />
    </ErrorBoundary>
  );

InvestorVotingSummaryContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorVotingSummaryContainer)
);
