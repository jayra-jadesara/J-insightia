import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import HistoricalGovernance from '../../components/Company/Governance/HistoricalGovernance';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { getHistoricalGovernanceReq, handleResetHistGovData } from '../CompanyContainer/HistoricalGovernanceSlice';
import TypeConstants from '../../constants/TrialTypeConstants';

const historicalGovernanceContainer = ({
  location,
  children,
  getHistoricalGovernanceReq,
  isLoading,
  lstHistoricalGov,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  handleResetHistGovData
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  let pid;

  const getData = async () => {
    await handleResetHistGovData();
    if (query.pid !== undefined) {
      if (distinctProfile) {
        pid = TypeConstants.TRIAL_PID;
      } else {
        pid = query.pid;
      }
      await getHistoricalGovernanceReq(pid);
    }
  };

  useEffect(() => {
    getData();
  }, [query.pid, distinctProfile, getHistoricalGovernanceReq]);

  return (
    <ErrorBoundary>
      <HistoricalGovernance
        children={children}
        isLoading={isLoading}
        lstHistoricalGov={lstHistoricalGov}
        trialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

historicalGovernanceContainer.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
};

const Select_isLoading = (state) => state.historicalGovernance.isLoading;
const Select_lstHistoricalGov = (state) => state.historicalGovernance.lstHistoricalGov;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  isLoading: Select_isLoading(state),
  lstHistoricalGov: Select_lstHistoricalGov(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});
const mapDispatchToProps = { getHistoricalGovernanceReq, handleResetHistGovData };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(historicalGovernanceContainer));
