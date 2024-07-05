import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AdvisorOverview from '../../components/Advisers/AdvisorOverview';

const AdvisorOverviewContainer = ({ location, children }) => (
  <AdvisorOverview loaction={location} children={children} />
);

AdvisorOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

AdvisorOverviewContainer.defaultProps = {
  location: {}
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvisorOverviewContainer)
);
