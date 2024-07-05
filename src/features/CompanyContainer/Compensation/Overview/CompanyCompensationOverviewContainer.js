import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import CompensationOverview from '../../../../components/Company/Compensation/CompensationOverview';
import TypeConstants from '../../../../constants/TrialTypeConstants';
import PathsConstant, { COMPANY_SEARCH } from '../../../../constants/PathsConstant';
import { getCompensationOverviewSummaryDetailsReq, getCompensationOverviewExecutiveAndDirectorDetailsReq, handleResetLoading } from './CompanyCompensationOverviewSlice';
import { addTriallogReq } from '../../../../features/CompanyContainer/TrialSlice';
import { isIdNotNullOrUndefined } from '../../../../utils/general-util';

const CompanyCompensationOverviewContainer = ({
  children,
  location,
  getCompensationOverviewSummaryDetailsReq,
  getCompensationOverviewExecutiveAndDirectorDetailsReq,
  handleResetLoading,
  addTriallogReq,
  trialProductStatus,
  distinctProfile,
  trialUserBlur,
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
    await handleResetLoading();
    await getCompensationOverviewExecutiveAndDirectorDetailsReq(pid);
    await getCompensationOverviewSummaryDetailsReq(pid);
    };
    getAll();
  }, [handleResetLoading, getCompensationOverviewSummaryDetailsReq, getCompensationOverviewExecutiveAndDirectorDetailsReq, distinctProfile]);
  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }
  return <CompensationOverview
    children={children}
    TrialStatus={trialUserBlur}
    TrialProductStatus={trialProductStatus}
    {...props}
  />;
};

const selectcompensationOverviewSummaryData = (state) =>
  state.companyCompensationOverview.compensationOverviewSummaryData;
const selectIsCompensationLoading = (state) => state.companyCompensationOverview.isCompensationLoading;

const selectCompensationOverviewExecutiveData = (state) => state.companyCompensationOverview.compensationOverviewExecutiveData;
const compensationOverviewExecutiveDataYearHeader = (state) => state.companyCompensationOverview.compensationOverviewExecutiveDataYearHeader;
const selectCompensationOverviewDirectorData = (state) => state.companyCompensationOverview.compensationOverviewDirectorData;
const selectSparklineChartData = (state) => state.companyCompensationOverview.sparklineChartData;
const selectSparklineYearData = (state) => state.companyCompensationOverview.sparklineYearData;
const selectcommitteeHeaders = (state) => state.companyCompensationOverview.committeeHeaders;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectDistinctProfile = (state) => state.trial.distinctProfile;

const mapStateToProps = (state) => ({
  isCompensationLoading: selectIsCompensationLoading(state),
  compensationOverviewSummaryData: selectcompensationOverviewSummaryData(state),
  compensationOverviewExecutiveData: selectCompensationOverviewExecutiveData(state),
  compensationOverviewExecutiveDataYearHeader: compensationOverviewExecutiveDataYearHeader(state),
  compensationOverviewDirectorData: selectCompensationOverviewDirectorData(state),
  sparklineChartData: selectSparklineChartData(state),
  sparklineYearData: selectSparklineYearData(state),
  committeeHeaders: selectcommitteeHeaders(state),
  trialUserBlur: selectTrialUserBlur(state),
  trialProductStatus: selectTrialProductStatus(state),
  distinctProfile: selectDistinctProfile(state),
});

const mapDispatchToProps = {
  getCompensationOverviewSummaryDetailsReq,
  getCompensationOverviewExecutiveAndDirectorDetailsReq,
  handleResetLoading,
  addTriallogReq
};

CompanyCompensationOverviewContainer.propTypes = {
  children: PropTypes.object,
};

CompanyCompensationOverviewContainer.defaultProps = {
  children: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyCompensationOverviewContainer));
