import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import { async } from 'regenerator-runtime';
import ExecutivePay from '../../../../components/Company/Compensation/ExecutivePay';
import PathsConstant, { COMPANY_SEARCH } from '../../../../constants/PathsConstant';
import {
  GetCompensationExecutivePayDataReq,
  handleChangeYearDdl,
  GetCompensationNonExecutivePayReq,
  GetCompensationHighestPaidExeReq,
  handledOnChangeYear,
  handleChangeUserTrial,
  handleResetLoading,
} from './ExecutivePaySlice';
import TypeConstants from '../../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../../utils/general-util';

const ExecutivePayContainer = ({
  children,
  location,
  GetCompensationExecutivePayDataReq,
  GetCompensationHighestPaidExeReq,
  GetCompensationNonExecutivePayReq,
  handleChangeUserTrial,
  trialUserBlur,
  distinctProfile,
  handleResetLoading,
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
      await handleChangeUserTrial(trialUserBlur);
      await GetCompensationExecutivePayDataReq(pid);
      await GetCompensationHighestPaidExeReq(pid);
      await GetCompensationNonExecutivePayReq(pid);
    };
    getAll();
  }, [GetCompensationExecutivePayDataReq, GetCompensationHighestPaidExeReq, trialUserBlur, GetCompensationNonExecutivePayReq, distinctProfile]);
  return <ExecutivePay
    children={children}
    TrialStatus={trialUserBlur}
    TrialUser={trialUserBlur}
    {...props}
  />;
};

const selectExecutivePayData = (state) => state.companyCompensationExecutivePay.executivePayData;

const selectDdlPeriodData = (state) => state.companyCompensationExecutivePay.ddlPeriodData;
const selectSelectedDdlPeriodData = (state) => state.companyCompensationExecutivePay.selectedDdlPeriodData;
const selectLoadingData = (state) => state.companyCompensationExecutivePay.loadingData;

const selectYearData = (state) => state.companyCompensationExecutivePay.yearData;
const selectDirectorList = (state) => state.companyCompensationExecutivePay.directorList;

const selectTblNonExecutiveData = (state) => state.companyCompensationExecutivePay.tblNonExecutiveData;
const selectTblHighestExecutiveData = (state) => state.companyCompensationExecutivePay.tblHighestExecutiveData;
const selectNonExecutiveTotal = (state) => state.companyCompensationExecutivePay.NonExecutiveTotal;
const selectHighestExecutiveTotal = (state) => state.companyCompensationExecutivePay.highestExecutiveTotal;
const selectNonExeDirectorList = (state) => state.companyCompensationExecutivePay.nonExeDirectorList;

const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectDistinctProfile = (state) => state.trial.distinctProfile;

const mapStateToProps = (state) => ({
  executivePayData: selectExecutivePayData(state),
  ddlPeriodData: selectDdlPeriodData(state),
  selectedDdlPeriodData: selectSelectedDdlPeriodData(state),
  loadingData: selectLoadingData(state),
  yearData: selectYearData(state),
  directorList: selectDirectorList(state),
  tblNonExecutiveData: selectTblNonExecutiveData(state),
  tblHighestExecutiveData: selectTblHighestExecutiveData(state),
  NonExecutiveTotal: selectNonExecutiveTotal(state),
  highestExecutiveTotal: selectHighestExecutiveTotal(state),
  nonExeDirectorList: selectNonExeDirectorList(state),
  trialUserBlur: selectTrialUserBlur(state),
  distinctProfile: selectDistinctProfile(state),
});

const mapDispatchToProps = {
  GetCompensationExecutivePayDataReq,
  handleChangeYearDdl,
  GetCompensationHighestPaidExeReq,
  GetCompensationNonExecutivePayReq,
  handledOnChangeYear,
  handleChangeUserTrial,
  handleResetLoading,
};

ExecutivePayContainer.propTypes = {
  children: PropTypes.object,
};

ExecutivePayContainer.defaultProps = {
  children: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExecutivePayContainer));
