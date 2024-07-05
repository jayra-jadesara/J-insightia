import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Activism from '../../../components/Company/Activism/Activism';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
// import qs from "qs";

const ActivismContainer = ({ location, children }) => {
  // let query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (location.state !== undefined && location.state.isLoadChildContent) {
    return (
      <ErrorBoundary>
        <Activism children={children} />
      </ErrorBoundary>
    );
  }
  return null;
};

ActivismContainer.propTypes = {
  children: PropTypes.array,
  location: PropTypes.object
};

ActivismContainer.defaultProps = {
  children: [],
  location: {}
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivismContainer)
);
