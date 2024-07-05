import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorVotingOverview from '../../../components/Investor/InvestorVoting/InvestorVotingOverview';
import {
  getInvestorVoteSummaryReq,
  issAndglasslewis_voteReq,
  getManager_voting_againstReq,
  getDissident_Data_for_Investor_v2Req,
  getManager_latest_against2Req,
  handleResetAll,
  handleStartSearch
} from './VotingOverviewSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorVotingOverviewContainer = ({
  location,
  getInvestorVoteSummaryReq,
  investorVoteSum,
  issAndglasslewis_voteReq,
  issAndglasslewis,
  getManager_voting_againstReq,
  manager_voting_against,
  getDissident_Data_for_Investor_v2Req,
  dissDataforInvestor,
  getManager_latest_against2Req,
  managerLatestAgainst,
  isLoadingVotedManagerList,
  handleResetAll,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
  handleStartSearch
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    handleResetAll();
  }, [handleResetAll]);
  if (!query.investor || query.investor === 'undefined' || query.investor === undefined || query.investor === 'null') {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getInvestorVoteSummaryReq(investorId);
      issAndglasslewis_voteReq(investorId);
      getManager_voting_againstReq(investorId);
      getDissident_Data_for_Investor_v2Req(investorId);
      getManager_latest_against2Req(investorId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    query.investor,
    getInvestorVoteSummaryReq,
    issAndglasslewis_voteReq,
    getManager_voting_againstReq,
    getDissident_Data_for_Investor_v2Req,
    getManager_latest_against2Req
  ]);

  return (
    <ErrorBoundary>
      <InvestorVotingOverview
        investorVoteSum={investorVoteSum}
        issAndglasslewis={issAndglasslewis}
        manager_voting_against={manager_voting_against}
        dissDataforInvestor={dissDataforInvestor}
        managerLatestAgainst={managerLatestAgainst}
        isLoading={isLoadingVotedManagerList}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
        handleStartSearch={handleStartSearch}
        location={location}
      />
    </ErrorBoundary>
  );
};

InvestorVotingOverviewContainer.propTypes = {
  location: PropTypes.object,
  isLoadingVotedManagerList: PropTypes.bool,
  getVotedByManagerListReq: PropTypes.func,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  getInvestorVoteSummaryReq: PropTypes.func,
  lstGetVotedByManagerList: PropTypes.array,
  investorVoteSum: PropTypes.array,
  procedureRunningEstimateTime: PropTypes.number
};

InvestorVotingOverviewContainer.defaultProps = {
  procedureRunningEstimateTime: undefined,
  getVotedByManagerListReq: () => {},
  getProcedureRunningEstimateTimeReq: () => {},
  isLoadingVotedManagerList: true,
  investorVoteSum: [],
  location: {}
};

const SelectInvestorVoteSum = (state) =>
  state.invVotingOverview.investorVoteSum;
const SelectIssAndglasslewis = (state) =>
  state.invVotingOverview.issAndglasslewis;
const SelectManager_voting_against = (state) =>
  state.invVotingOverview.manager_voting_against;
const SelectDissDataforInvestor = (state) =>
  state.invVotingOverview.dissDataforInvestor;
const SelectManagerLatestAgainst = (state) =>
  state.invVotingOverview.managerLatestAgainst;
const SelectisLoadingVotedManagerList = (state) =>
  state.invVotingOverview.isLoadingVotedManagerList;
// title slice
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  investorVoteSum: SelectInvestorVoteSum(state),
  issAndglasslewis: SelectIssAndglasslewis(state),
  manager_voting_against: SelectManager_voting_against(state),
  dissDataforInvestor: SelectDissDataforInvestor(state),
  managerLatestAgainst: SelectManagerLatestAgainst(state),
  isLoadingVotedManagerList: SelectisLoadingVotedManagerList(state),
  // title slice
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});
const mapDispatchToProps = {
  getInvestorVoteSummaryReq,
  issAndglasslewis_voteReq,
  getManager_voting_againstReq,
  getDissident_Data_for_Investor_v2Req,
  getManager_latest_against2Req,
  handleResetAll,
  handleStartSearch
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorVotingOverviewContainer)
);
