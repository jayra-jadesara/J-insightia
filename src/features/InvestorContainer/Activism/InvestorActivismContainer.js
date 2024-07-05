import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Activism from '../../../components/Investor/InvestorActivism/InvestorActivism';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const InvestorActivismContainer = ({ location, children }) => {
  if (location.state !== undefined && location.state.isLoadChildContent) {
    return (
      <ErrorBoundary>
        <Activism children={children} />
      </ErrorBoundary>
    );
  }
  return null;
};

InvestorActivismContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActivismContainer)
);
