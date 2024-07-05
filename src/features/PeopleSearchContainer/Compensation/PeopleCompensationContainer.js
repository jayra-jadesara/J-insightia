import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { PEOPLE_SEARCH } from '../../../constants/PathsConstant';
import PeopleCompensation from '../../../components/PeopleSearch/Compensation/PeopleCompensation';

const PeopleCompensationContainer = ({ children, location, trialUserBlur }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (!query.director_id) {
    return <Redirect to={PEOPLE_SEARCH} />;
  }

  return <PeopleCompensation
    children={children}
    TrialStatus={true}
    TrialUser={true}
  />;
};

const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {};

PeopleCompensationContainer.propTypes = {
  children: PropTypes.object,
};

PeopleCompensationContainer.defaultProps = {
  children: {},
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PeopleCompensationContainer)
);
