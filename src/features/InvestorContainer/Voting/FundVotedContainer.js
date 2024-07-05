import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import FundsVoted from '../../../components/Investor/InvestorVoting/InvestorVotingFundsVoted';
import {
  getVotedByManagerListReq,
  handleResetFundVoted
} from './FundVotedSlice';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader
} from '../../General/TitleSlice';
import { INVESTOR_FUND_VOTES_GETVOTEDBYMANAGERLIST } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const FundVotedContainer = ({
  location,
  isLoadingVotedManagerList,
  getVotedByManagerListReq,
  lstGetVotedByManagerList,
  procedureRunningEstimateTime,
  getProcedureRunningEstimateTimeReq,
  handleResetFundVoted,
  handleResetLoader,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetLoader();
    handleResetFundVoted();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetLoader, handleResetFundVoted]);

  if (!query.investor || query.investor === 'undefined' || query.investor === undefined || query.investor === 'null') {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getProcedureRunningEstimateTimeReq(
        INVESTOR_FUND_VOTES_GETVOTEDBYMANAGERLIST
      );
      getVotedByManagerListReq(investorId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    getVotedByManagerListReq,
    query.investor,
    getProcedureRunningEstimateTimeReq
  ]);

  return (
    <ErrorBoundary>
      <FundsVoted
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        isLoadingVotedManagerList={isLoadingVotedManagerList}
        lstGetVotedByManagerList={lstGetVotedByManagerList}
        handleResetLoader={handleResetLoader}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

FundVotedContainer.propTypes = {
  location: PropTypes.object,
  isLoadingVotedManagerList: PropTypes.bool,
  getVotedByManagerListReq: PropTypes.func,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  lstGetVotedByManagerList: PropTypes.array,
  procedureRunningEstimateTime: PropTypes.number,
  handleResetLoader: PropTypes.func.isRequired
};

FundVotedContainer.defaultProps = {
  procedureRunningEstimateTime: undefined,
  getVotedByManagerListReq: () => {},
  getProcedureRunningEstimateTimeReq: () => {},
  isLoadingVotedManagerList: true,
  lstGetVotedByManagerList: [],
  location: {}
};

// #region states assign
const SelectLstGetVotedByManagerList = (state) =>
  state.invFundVoted.lstGetVotedByManagerList;
const SelectIsLoadingVotedManagerList = (state) =>
  state.invFundVoted.isLoadingVotedManagerList;
// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
// #endregion

const mapStateToProps = (state) => ({
  lstGetVotedByManagerList: SelectLstGetVotedByManagerList(state),
  isLoadingVotedManagerList: SelectIsLoadingVotedManagerList(state),
  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getVotedByManagerListReq,
  // Title slice
  getProcedureRunningEstimateTimeReq,
  handleResetLoader,
  handleResetFundVoted
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FundVotedContainer)
);
