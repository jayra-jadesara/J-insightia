import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import PerformanceMetricBreackDown from '../../../../components/Company/Compensation/PerformanceMetricBreakdown';
import PathsConstant, { COMPANY_SEARCH } from '../../../../constants/PathsConstant';
import { GetCompensationPerformanceMetricBreakDownReq, handleChangeYearDdl, GetCompensationReportYearsReq, handleScrollDownData, handleResetLoading, handleResetYear } from './PerformanceMetricBreakdownSlice';
import TypeConstants from '../../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../../utils/general-util';

const PerformanceMetricBreakdownContainer = ({
  children,
  location,
  GetCompensationPerformanceMetricBreakDownReq,
  GetCompensationReportYearsReq,
  isScrollLoading,
  trialUserBlur,
  distinctProfile,
  handleResetLoading,
  handleResetYear,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={PathsConstant.COMPANY_SEARCH} />;
  }
  useEffect(() => {
    const getAll = async () => {
      let pid = query.pid;
      if (distinctProfile) {
        pid = TypeConstants.TRIAL_PID;
      }
      await handleResetYear();
      await GetCompensationReportYearsReq(pid);
    };
    if (distinctProfile !== null) {
      getAll();
    }
  }, [distinctProfile, GetCompensationReportYearsReq]);
  useEffect(() => {
    const getAll = async () => {
      let pid = query.pid;
      if (distinctProfile) {
        pid = TypeConstants.TRIAL_PID;
      }
      if (props.selectionPerformanceBreackDownYear !== undefined) {
      const body = {
        pid: pid,
        director_appointment_id: null,
        year: props.selectionPerformanceBreackDownYear.value
      };
        await handleResetLoading();
        await GetCompensationPerformanceMetricBreakDownReq(body);
      }
    };

      getAll();
  }, [distinctProfile, props.selectionPerformanceBreackDownYear]);

  return <PerformanceMetricBreackDown
    children={children}
    TrialStatus={trialUserBlur}
    TrialUser={trialUserBlur}
    {...props}
    isScrollLoading={isScrollLoading}
  />;
};

const selectTblPerformanceMetricData = (state) => state.companyPerformanceMetricBreakdown.tblPerformanceMetricData;
const selectDdlPerformanceBreackDownYear = (state) => state.companyPerformanceMetricBreakdown.ddlPerformanceBreackDownYear;

const selectSelectionPerformanceBreackDownYear = (state) => state.companyPerformanceMetricBreakdown.selectionPerformanceBreackDownYear;
const selectLoadingPerformancedata = (state) => state.companyPerformanceMetricBreakdown.loadingPerformancedata;
const selectIsScrollLoading = (state) => state.companyPerformanceMetricBreakdown.isScrollLoading;
const selectOrgTblPerformanceMetricData = (state) => state.companyPerformanceMetricBreakdown.orgTblPerformanceMetricData;

const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectDistinctProfile = (state) => state.trial.distinctProfile;

const mapStateToProps = (state) => ({
  tblPerformanceMetricData: selectTblPerformanceMetricData(state),
  ddlPerformanceBreackDownYear: selectDdlPerformanceBreackDownYear(state),
  selectionPerformanceBreackDownYear: selectSelectionPerformanceBreackDownYear(state),
  loadingPerformancedata: selectLoadingPerformancedata(state),
  isScrollLoading: selectIsScrollLoading(state),
  orgTblPerformanceMetricData: selectOrgTblPerformanceMetricData(state),
  trialUserBlur: selectTrialUserBlur(state),
  distinctProfile: selectDistinctProfile(state),
});
const mapDispatchToProps = {
  GetCompensationPerformanceMetricBreakDownReq,
  handleChangeYearDdl,
  GetCompensationReportYearsReq,
  handleScrollDownData,
  handleResetLoading,
  handleResetYear
};

PerformanceMetricBreakdownContainer.propTypes = {
  children: PropTypes.object,
};

PerformanceMetricBreakdownContainer.defaultProps = {
  children: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformanceMetricBreakdownContainer));
