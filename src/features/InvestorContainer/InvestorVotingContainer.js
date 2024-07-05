import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorVoting from '../../components/Investor/InvestorVoting/InvestorVoting';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { INVESTOR_SEARCH } from '../../constants/PathsConstant';

const query = qs.parse(location.search, { ignoreQueryPrefix: true });
const InvestorVotingContainer = ({ location, children }) => {
  if (location.state !== undefined && location.state.isLoadChildContent) {
    if (!query.investor || query.investor === 'undefined' || query.investor === undefined || query.investor === 'null') {
      return <Redirect to={INVESTOR_SEARCH} />;
    }
    return (
      <ErrorBoundary>
        <InvestorVoting children={children} />
      </ErrorBoundary>
    );
  }
  return null;
};

InvestorVotingContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorVotingContainer)
);
