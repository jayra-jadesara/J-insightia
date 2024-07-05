import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ActivistShorts from '../../../components/Company/ActivistShorts/ActivistShorts';
// import qs from "qs";
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const ActivistShortsContainer = ({ location, children }) => {
  // let query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (location.state !== undefined && location.state.isLoadChildContent) {
    return (
      <ErrorBoundary>
        <ActivistShorts children={children} />
      </ErrorBoundary>
    );
  }
  return null;
};

ActivistShortsContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistShortsContainer)
);
