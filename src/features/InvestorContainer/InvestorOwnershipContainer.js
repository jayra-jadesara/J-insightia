import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InvestorOwnership from '../../components/Investor/InvestorOwnership/InvestorOwnership';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const InvestorOwnershipContainer = ({ location, children }) => {
  if (location.state !== undefined && location.state.isLoadChildContent) {
    return (
      <ErrorBoundary>
        <InvestorOwnership children={children} />
      </ErrorBoundary>
    );
  }
  return null;
};

InvestorOwnershipContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorOwnershipContainer)
);
