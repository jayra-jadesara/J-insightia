import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  handleVisitorLog,
  handleResetFiling,
  getlistActivistFilingsByActivist_v2Req
} from '../InvestorSlice';
import InvestorActivismFilings from '../../../components/Investor/InvestorActivism/InvestorActivismFilings';
import { GetActivistIdFromInvestor } from '../../../utils/investorActivistShort-util';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismFilingsContainer = ({
  location,
  children,
  handleResetFiling,
  getlistActivistFilingsByActivist_v2Req,
  activistFilings,
  loadingData,
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

  const getAll = useCallback(async () => {
    if (query.investor !== undefined && query.investor !== 'undefined') {
      let investorId = query.investor;
    if (distinctProfile) {
      investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
    }
    const actId = await GetActivistIdFromInvestor(investorId);
    await getlistActivistFilingsByActivist_v2Req({
      activist_id: actId.activist_id
    });
  }
    // company id does not need to be passed to the overview so it is stored and used here.
  }, [getlistActivistFilingsByActivist_v2Req, query.investor, distinctProfile]);

  useEffect(() => {
    const abortController = new AbortController();
    handleResetFiling();
    if (query.investor && distinctProfile != null) {
      getAll();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [query.pid, getAll, handleResetFiling, query.investor, distinctProfile]);

  return (
    <ErrorBoundary>
      <InvestorActivismFilings
        children={children}
        location={location}
        activistFilings={activistFilings}
        loadingData={loadingData}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivismFilingsContainer.propTypes = {
  activistFilings: PropTypes.any.isRequired,
  children: PropTypes.any,
  getlistActivistFilingsByActivist_v2Req: PropTypes.func,
  handleResetFiling: PropTypes.func,
  handleVisitorLog: PropTypes.any.isRequired,
  loadingData: PropTypes.bool.isRequired,
  location: PropTypes.object,
  distinctProfile: PropTypes.any
};

InvestorActivismFilingsContainer.defaultProps = {
  getlistActivistFilingsByActivist_v2Req: () => {},
  handleResetFiling: () => {},
  location: {},
  children: undefined,
  distinctProfile: null
};

const SelectTrialLog = (state) => state.investor.TrialLog_activistShort;
const SelectActivismFilings = (state) => state.investor.activistFilings;
const SelectActivismFilingsloadingData = (state) => state.investor.loadingData;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  TrialLog: SelectTrialLog(state),
  activistFilings: SelectActivismFilings(state),
  loadingData: SelectActivismFilingsloadingData(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  handleVisitorLog,
  handleResetFiling,
  getlistActivistFilingsByActivist_v2Req
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActivismFilingsContainer)
);
