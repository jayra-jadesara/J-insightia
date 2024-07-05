import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import News from '../../components/Company/News/News';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const NewsContainer = () => (
  <ErrorBoundary>
    <News />
  </ErrorBoundary>
);
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewsContainer)
);
