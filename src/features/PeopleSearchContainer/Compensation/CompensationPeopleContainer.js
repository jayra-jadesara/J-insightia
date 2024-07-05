import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import CompensationPeople from '../../../components/PeopleSearch/Compensation/compensationPeople';
import CompensationCardComponent from '../../../components/PeopleSearch/Compensation/compensationCardComponent';
import { getIndividualGrantedPeopleCompensationReq, handleYearOnChange, handleTrialStatusCell, handleResetCompensation } from '../PeoplesearchSlice';
import typeConstants from '../../../constants/TrialTypeConstants';
// import {
//   HIDDEN_USER_ID,
//   PEOPLE_ACCESS_CODE,
//   PEOPLE_TRIAL_CODE
// } from '../../../constants/PeopleConstant';
// import { PEOPLE } from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
// import typeConstants from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const CompensationPeopleContainer = ({
  location,
  children,
  getIndividualGrantedPeopleCompensationReq,
  lstNonExecutiveAppointment,
  lstHistoricalAppointment,
  isLoadingPeopleCompensation,
  compensationPeriods,
  compensationYearSelected,
  handleYearOnChange,
  availYears1,
  availYears2,
  yearGrid,
  compensationNoData,
  people_data,
  trialUserBlur,
  handleTrialStatusCell,
  TrialStatusCell,
  distinctProfile,
  handleResetCompensation,
}) => {
  const textBlur = useRef(false);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.director_id)) {
    return <Redirect to={pathConst.PEOPLE_SEARCH} />;
  }

  useEffect(() => {
    const getAll = async () => {
        let id;
        if (distinctProfile) {
          id = typeConstants.TRIAL_DIRECTOR_ID;
        } else {
          id = query.director_id;
        }
        if (isLoadingPeopleCompensation) getIndividualGrantedPeopleCompensationReq(id);
    };
    getAll();
  }, [query.director_id, isLoadingPeopleCompensation, trialUserBlur, TrialStatusCell, distinctProfile]);

  return (
    <ErrorBoundary>
      <CompensationPeople
        children={children}
        location={location}
        lstNonExecutiveAppointment={lstNonExecutiveAppointment}
        lstHistoricalAppointment={lstHistoricalAppointment}
        isLoadingPeopleCompensation={isLoadingPeopleCompensation}
        compensationPeriods={compensationPeriods}
        compensationYearSelected={compensationYearSelected}
        handleYearOnChange={handleYearOnChange}
        availYears1={availYears1}
        availYears2={availYears2}
        yearGrid={yearGrid}
        compensationNoData={compensationNoData}
        people_data={people_data}
        TrialStatus={trialUserBlur}
        TrialUser={trialUserBlur}
        handleTrialStatusCell={handleTrialStatusCell}
      />
    </ErrorBoundary>
  );
};

const selectLstNonExecutiveAppointment = (state) => state.Peoplesearch.lstNonExecutiveAppointment;
const selectLstHistoricalAppointment = (state) => state.Peoplesearch.lstHistoricalAppointment;
const selectIsLoadingPeopleCompensation = (state) => state.Peoplesearch.isLoadingPeopleCompensation;
const selectCompensationPeriods = (state) => state.Peoplesearch.compensationPeriods;
const selectCompensationYearSelected = (state) => state.Peoplesearch.compensationYearSelected;
const selectAvailYears1 = (state) => state.Peoplesearch.availYears1;
const selectAvailYears2 = (state) => state.Peoplesearch.availYears2;
const selectYearGrid = (state) => state.Peoplesearch.yearGrid;
const selectCompensationNoData = (state) => state.Peoplesearch.compensationNoData;
const selectPeople_data = (state) => state.Peoplesearch.people_data;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectTrialStatusCell = (state) => state.Peoplesearch.TrialStatusCell;

const mapStateToProps = (state) => ({
  lstNonExecutiveAppointment: selectLstNonExecutiveAppointment(state),
  lstHistoricalAppointment: selectLstHistoricalAppointment(state),
  isLoadingPeopleCompensation: selectIsLoadingPeopleCompensation(state),
  compensationPeriods: selectCompensationPeriods(state),
  compensationYearSelected: selectCompensationYearSelected(state),
  availYears1: selectAvailYears1(state),
  availYears2: selectAvailYears2(state),
  yearGrid: selectYearGrid(state),
  compensationNoData: selectCompensationNoData(state),
  people_data: selectPeople_data(state),
  //   //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserBlur: selectTrialUserBlur(state),
  TrialStatusCell: selectTrialStatusCell(state)
});
const mapDispatchToProps = {
  getIndividualGrantedPeopleCompensationReq,
  handleYearOnChange,
  handleTrialStatusCell
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompensationPeopleContainer));
