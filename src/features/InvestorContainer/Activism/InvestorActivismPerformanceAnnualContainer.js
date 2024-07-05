import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import qs from 'qs';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import InvestorActivismPerformanceAnnual from '../../../components/Investor/InvestorActivism/InvestorActivismPerformanceAnnual';
import { getActivistIdFromInvestorIdReq } from './../ActivistShorts/ActivistShortSlice';
import {
  getPerformanceAnnualbyActivistLstReq,
  handleResetActivistPerformance
} from '../Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismPerformanceAnnualContainer = ({
  location,
  children,
  getActivistIdFromInvestorIdReq,
  getPerformanceAnnualbyActivistLstReq,
  lstPerformanceAnnualbyActivist,
  handleResetActivistPerformance,
  isLoading,
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
    handleResetActivistPerformance();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetActivistPerformance]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getActivistIdFromInvestorIdReq(investorId).then(async (res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          getPerformanceAnnualbyActivistLstReq(actid);
        }
      });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.investor,
    getPerformanceAnnualbyActivistLstReq,
    distinctProfile
  ]);

  return (
    <ErrorBoundary>
      <InvestorActivismPerformanceAnnual
        children={children}
        lstPerformanceAnnualbyActivist={lstPerformanceAnnualbyActivist}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivismPerformanceAnnualContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const selectLstPerformanceAnnualbyActivist = (state) =>
  state.InvestorActivismSlice.lstPerformanceAnnualbyActivist;
const selectisLoading = (state) => state.InvestorActivismSlice.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  lstPerformanceAnnualbyActivist: selectLstPerformanceAnnualbyActivist(state),
  isLoading: selectisLoading(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getPerformanceAnnualbyActivistLstReq,
  handleResetActivistPerformance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorActivismPerformanceAnnualContainer);
