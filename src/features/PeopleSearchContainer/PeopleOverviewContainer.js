import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PeopleOverview from '../../components/PeopleSearch/General/PeopleOverview';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { getPeopleOverviewReq, handleResetPeopleOverview } from '../PeopleSearchContainer/PeoplesearchSlice';
import { isIdNotNullOrUndefined } from '../../utils/general-util';
import pathConst from '../../constants/PathsConstant';

const PeopleOverviewContainer = ({
  location,
  children,
  getPeopleOverviewReq,
  isLoadingOverviewPeople,
  dataGovRole,
  dataCompensation,
  handleResetPeopleOverview
}) => {
  const textBlur = useRef(false);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.director_id)) {
    return <Redirect to={pathConst.PEOPLE_SEARCH} />;
  }

  useEffect(() => {
    handleResetPeopleOverview();
  }, [handleResetPeopleOverview]);

  useEffect(() => {
    getPeopleOverviewReq(query.director_id);
  }, [query.director_id]);

  return (
    <ErrorBoundary>
      <PeopleOverview
        children={children}
        location={location}
        dataGovRole={dataGovRole}
        dataCompensation={dataCompensation}
        isLoadingOverviewPeople={isLoadingOverviewPeople}
      />
    </ErrorBoundary>
  );
};

PeopleOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

PeopleOverviewContainer.defaultProps = {
  location: {},
  children: undefined,
};

const selectDataGovRole = (state) => state.Peoplesearch.dataGovRole;
const selectDataCompensation = (state) => state.Peoplesearch.dataCompensation;
const selectIsLoadingOverviewPeople = (state) => state.Peoplesearch.isLoadingOverviewPeople;

const mapStateToProps = (state) => ({
  dataGovRole: selectDataGovRole(state),
  dataCompensation: selectDataCompensation(state),
  isLoadingOverviewPeople: selectIsLoadingOverviewPeople(state),
});
const mapDispatchToProps = {
  getPeopleOverviewReq,
  handleResetPeopleOverview
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleOverviewContainer));
