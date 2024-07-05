import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import qs from 'qs';
import InvestorVotingRationale from '../../../components/Investor/InvestorVoting/InvestorVotingRationale';
import {
  getVotingRationale_byInvestorReq,
  handleResetVotingrationale
} from '../InvestorSlice';
import {
  getProcedureRunningEstimateTimeReq,
  handleResetLoader
} from '../../General/TitleSlice';
import { INVESTOR_VOTING_GETVOTINGRATIONALE_BYINVESTOR } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorVotingRationaleContainer = ({
  location,
  children,
  votingRationale_data,
  votingRationale_heading,
  getVotingRationale_byInvestorReq,
  getProcedureRunningEstimateTimeReq,
  isLoading,
  procedureRunningEstimateTime,
  handleResetVotingrationale,
  handleResetLoader,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetLoader();
    handleResetVotingrationale();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetLoader, handleResetVotingrationale]);

  if (!query.investor || query.investor === 'undefined' || query.investor === undefined || query.investor === 'null') {
    return <Redirect to={INVESTOR_SEARCH} />;
  }
  useEffect(() => {
    const abortController = new AbortController();
    async function getAll() {
      if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
        let investorId = query.investor;
        if (distinctProfile) {
          investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
        }
        await getProcedureRunningEstimateTimeReq(
          INVESTOR_VOTING_GETVOTINGRATIONALE_BYINVESTOR
        );
        await getVotingRationale_byInvestorReq(investorId);
      }
    }
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    getProcedureRunningEstimateTimeReq,
    getVotingRationale_byInvestorReq,
    query.investor_id,
    query.investor
  ]);

  return (
    <ErrorBoundary>
      <InvestorVotingRationale
        children={children}
        location={location}
        votingRationale_heading={votingRationale_heading}
        votingRationale_data={votingRationale_data}
        isLoading={isLoading}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        handleResetLoader={handleResetLoader}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorVotingRationaleContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  votingRationale_data: PropTypes.array,
  votingRationale_heading: PropTypes.any,
  getVotingRationale_byInvestorReq: PropTypes.func,
  isLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.number,
  getProcedureRunningEstimateTimeReq: PropTypes.func
};

InvestorVotingRationaleContainer.defaultProps = {
  getVotingRationale_byInvestorReq: () => {},
  votingRationale_data: [],
  votingRationale_heading: undefined,
  procedureRunningEstimateTime: undefined,
  location: {},
  getProcedureRunningEstimateTimeReq: () => {}
};

const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectVotingRationale_data = (state) =>
  state.investor.votingRationale_data;
const SelectVotingRationale_heading = (state) =>
  state.investor.votingRationale_heading;
const SelectVotingRationale_isLoading = (state) => state.investor.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  votingRationale_data: SelectVotingRationale_data(state),
  votingRationale_heading: SelectVotingRationale_heading(state),
  isLoading: SelectVotingRationale_isLoading(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});
const mapDispatchToProps = {
  getVotingRationale_byInvestorReq,
  getProcedureRunningEstimateTimeReq,
  handleResetVotingrationale,
  handleResetLoader
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorVotingRationaleContainer)
);
