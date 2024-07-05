import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import CompensationPolicyDetails from '../../../../components/Company/Compensation/CompensationPolicyDetails';
import PathsConstant, { COMPANY_SEARCH } from '../../../../constants/PathsConstant';
import {
  GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq,
  GetCompensationPolicyDetailsReq,
  handleOnChangeDdlOption,
  GetCompensationPolicyHighestPaidExecutiveDataReq,
  handleSetIsLoaded,
} from './CompensationPolicyDetailsSlice';
import TypeConstants from '../../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../../utils/general-util';

const CompensationPolicyDetailsContainer = ({
  children,
  location,
  GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq,
  GetCompensationPolicyDetailsReq,
  handleSetIsLoaded,
  GetCompensationPolicyHighestPaidExecutiveDataReq,
  trialUserBlur,
  distinctProfile,
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
      await GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq(pid);
      await GetCompensationPolicyHighestPaidExecutiveDataReq(pid);
      await GetCompensationPolicyDetailsReq(pid);
      await handleSetIsLoaded(true);
    };
    getAll();
  }, [distinctProfile, GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq, GetCompensationPolicyDetailsReq, GetCompensationPolicyHighestPaidExecutiveDataReq]);

  return <CompensationPolicyDetails
    children={children}
    TrialStatus={trialUserBlur}
    TrialUser={trialUserBlur}
    {...props}
  />;
};

const selectLongIncentiveExecutiveData = (state) => state.companyCompensationPolicy.tblLongTermIncentiveHighPaidExe;
const selectShortIncentiveExecutiveData = (state) => state.companyCompensationPolicy.tblShortTermIncentiveHighPaidExe;
const selectTblCompensationPolicyDetails = (state) => state.companyCompensationPolicy.tblCompensationPolicyDetails;
const selectTblCompensationPolicyDetailsOrg = (state) =>
  state.companyCompensationPolicy.tblCompensationPolicyDetailsOrg;

const selectDdlCompensationPolicyDetail = (state) => state.companyCompensationPolicy.ddlCompensationPolicyDetail;
const selectSelectionCompensationPolicyDetasil = (state) =>
  state.companyCompensationPolicy.selectionCompensationPolicyDetasil;
const selectTblCompensationPolicyDetail = (state) => state.companyCompensationPolicy.tblCompensationPolicyDetail;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTblDynamicHeaders = (state) => state.companyCompensationPolicy.tblDynamicHeaders;
const selectIsLoaded = (state) => state.companyCompensationPolicy.isLoaded;

const mapStateToProps = (state) => ({
  tblLongTermIncentiveHighPaidExe: selectLongIncentiveExecutiveData(state),
  tblShortTermIncentiveHighPaidExe: selectShortIncentiveExecutiveData(state),
  tblCompensationPolicyDetails: selectTblCompensationPolicyDetails(state),
  ddlCompensationPolicyDetail: selectDdlCompensationPolicyDetail(state),
  selectionCompensationPolicyDetasil: selectSelectionCompensationPolicyDetasil(state),
  tblCompensationPolicyDetailsOrg: selectTblCompensationPolicyDetailsOrg(state),
  tblCompensationPolicyDetail: selectTblCompensationPolicyDetail(state),
  trialUserBlur: selectTrialUserBlur(state),
  distinctProfile: selectDistinctProfile(state),
  tblDynamicHeaders: selectTblDynamicHeaders(state),
  isLoaded: selectIsLoaded(state),
});

const mapDispatchToProps = {
  GetCompensatioCompanyolicyDetailsHighestPaidExecutiveReq,
  GetCompensationPolicyDetailsReq,
  handleOnChangeDdlOption,
  GetCompensationPolicyHighestPaidExecutiveDataReq,
  handleSetIsLoaded,
};

CompensationPolicyDetailsContainer.propTypes = {
  children: PropTypes.object,
};

CompensationPolicyDetailsContainer.defaultProps = {
  children: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompensationPolicyDetailsContainer));
