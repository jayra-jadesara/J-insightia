import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FundsVoted from '../../components/Investor/InvestorVoting/InvestorVotingFundsVoted';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const InvestorVotingFundsVotedContainer = ({ location, children }) => {
  return (
    <ErrorBoundary>
      <FundsVoted children={children} />
    </ErrorBoundary>
  )
};

InvestorVotingFundsVotedContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorVotingFundsVotedContainer));
