import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import DirectorshipAndExecutive from '../../../components/PeopleSearch/DirectorshipAndExecutive/DirectorshipAndExecutive';
import {
  getDirectorPersonInfoReq,
  getDirectorAppointmentInfoReq,
  getDirectorAppointmentInfo2Req,
  getTokenDecode,
  handleTrialLogReq,
  handleResetPeople,
  getDirectorsDetailsReq,
  getDirectorContactDataReq,
  getGanttChartSampleDataReq,
  handleResetAll,
  handleVisitorLog
} from '../PeoplesearchSlice';
import {
  HIDDEN_USER_ID,
  PEOPLE_ACCESS_CODE,
  PEOPLE_TRIAL_CODE
} from '../../../constants/PeopleConstant';
import { PEOPLE } from '../../../constants/ProductConstants';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConstants from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const DirectorshipAndExecutiveContainer = ({
  getDirectorPersonInfoReq,
  person_info,
  director_appointment_info,
  director_appointment_info2,
  token_decode,
  getDirectorAppointmentInfoReq,
  getDirectorAppointmentInfo2Req,
  location,
  children,
  handleTrialLogReq,
  handleResetPeople,
  getDirectorsDetailsReq,
  tblCurrentDirector,
  tblPastDirector,
  getDirectorContactDataReq,
  lstActivistEmployee,
  tblOnBoardActivist,
  getGanttChartSampleDataReq,
  ganttChartData,
  handleResetAll,
  distinctProfile,
  trialProductStatus,
  handleResetCampaign,
  trialUserBlur
}) => {
  const textBlur = useRef(false);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.director_id)) {
    return <Redirect to={pathConst.PEOPLE_SEARCH} />;
  }

  useEffect(() => {
    handleResetAll();
    handleResetPeople();
    getTokenDecode();
  }, [handleResetPeople, handleResetAll, getGanttChartSampleDataReq]);

  useEffect(() => {
    const token_access_filter = token_decode.MemberShip.filter(
      (product) => product.product_id === PEOPLE
    );
    let id;
    if (query.director_id && distinctProfile !== null) {
      if (distinctProfile) {
        id = typeConstants.TRIAL_DIRECTOR_ID;
      } else {
        id = query.director_id;
      }
      if (token_access_filter[0].status === PEOPLE_ACCESS_CODE) {
        getDirectorPersonInfoReq(id);
        handleVisitorLog(location.pathname, location.search);
      } else if (token_access_filter[0].status === PEOPLE_TRIAL_CODE) {
        handleTrialLogReq(PEOPLE);
        getDirectorPersonInfoReq(id);
      } else {
        getDirectorPersonInfoReq(HIDDEN_USER_ID);
        textBlur.current = true;
      }
    }
    if (id && query.current !== null) {
      getDirectorAppointmentInfoReq({
        director_id: id,
        current: query.current
      });
      getDirectorAppointmentInfo2Req({
        director_id: id,
        current: query.current
      });
      getDirectorsDetailsReq(id);
      getDirectorContactDataReq(id);
      getGanttChartSampleDataReq(id);
    }
    handleResetAll();
  }, [
    getDirectorAppointmentInfo2Req,
    getDirectorAppointmentInfoReq,
    getDirectorPersonInfoReq,
    handleTrialLogReq,
    token_decode.MemberShip,
    location.search,
    getDirectorsDetailsReq,
    getDirectorContactDataReq,
    getGanttChartSampleDataReq,
    distinctProfile
  ]);
  return (
    <ErrorBoundary>
      <DirectorshipAndExecutive
        children={children}
        location={location}
        person_info={person_info}
        director_appointment_info={director_appointment_info}
        director_appointment_info2={director_appointment_info2}
        textBlur={trialUserBlur}
        tblCurrentDirector={tblCurrentDirector}
        tblPastDirector={tblPastDirector}
        lstActivistEmployee={lstActivistEmployee}
        tblOnBoardActivist={tblOnBoardActivist}
        ganttChartData={ganttChartData}
      />
    </ErrorBoundary>
  );
};

DirectorshipAndExecutiveContainer.propTypes = {
  person_info: PropTypes.any,
  director_appointment_info: PropTypes.any,
  director_appointment_info2: PropTypes.any,
  getDirectorPersonInfoReq: PropTypes.func,
  children: PropTypes.any,
  location: PropTypes.any.isRequired,
  token_decode: PropTypes.any.isRequired
};

DirectorshipAndExecutiveContainer.defaultProps = {
  getDirectorPersonInfoReq: () => {},
  children: undefined,
  person_info: [],
  director_appointment_info: {},
  director_appointment_info2: {}
};

const selectPersonInfo = (state) => state.Peoplesearch.person_info;
const selectLstDirectorAppointmentInfo = (state) =>
  state.Peoplesearch.director_appointment_info;
const selectLstDirectorAppointmentInfo2 = (state) =>
  state.Peoplesearch.director_appointment_info2;
const selectTokenDecode = (state) => state.Peoplesearch.getTokenDecode;
const selectTrailLog = (state) => state.Peoplesearch.trail_log;
const selectTblCurrentDirector = (state) =>
  state.Peoplesearch.tblCurrentDirector;
const selectTblPastDirector = (state) => state.Peoplesearch.tblPastDirector;
const selectLstActivistEmployee = (state) =>
  state.Peoplesearch.lstActivistEmployee;
const selectTblOnBoardActivist = (state) =>
  state.Peoplesearch.tblOnBoardActivist;
const selectGanttChartData = (state) => state.Peoplesearch.ganttChartData;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  person_info: selectPersonInfo(state),
  director_appointment_info: selectLstDirectorAppointmentInfo(state),
  director_appointment_info2: selectLstDirectorAppointmentInfo2(state),
  token_decode: selectTokenDecode(state),
  trail_log: selectTrailLog(state),
  tblPastDirector: selectTblPastDirector(state),
  tblCurrentDirector: selectTblCurrentDirector(state),
  lstActivistEmployee: selectLstActivistEmployee(state),
  tblOnBoardActivist: selectTblOnBoardActivist(state),
  ganttChartData: selectGanttChartData(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserBlur: selectTrialUserBlur(state)
});
const mapDispatchToProps = {
  handleVisitorLog,
  getDirectorPersonInfoReq,
  getDirectorAppointmentInfoReq,
  getDirectorAppointmentInfo2Req,
  handleTrialLogReq,
  handleResetPeople,
  getDirectorsDetailsReq,
  getDirectorContactDataReq,
  getGanttChartSampleDataReq,
  handleResetAll
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DirectorshipAndExecutiveContainer)
);
