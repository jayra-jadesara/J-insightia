import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { handleVisitorLog, handleResetFiling } from '../InvestorSlice';
import {
  getActivistIdFromInvestorIdReq,
  getListActivistFilingsByActivistAiSReq,
  handleSetLoadingInvestorActivistShorts
} from './ActivistShortSlice';
import InvestorActivistShortsFilings from '../../../components/Investor/InvestorActivistShorts/InvestorActivistShortsFilings';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivistShortsFilingsContainer = ({
  location,
  children,
  handleResetFiling,
  getListActivistFilingsByActivistAiSReq,
  TrialLog,
  activistFilingsAiS,
  loadingData,
  getActivistIdFromInvestorIdReq,
  handleSetLoadingInvestorActivistShorts,
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
    handleResetFiling();
    handleSetLoadingInvestorActivistShorts();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetFiling, handleSetLoadingInvestorActivistShorts]);

  const getAll = useCallback(
    async (investorId) => {
      getActivistIdFromInvestorIdReq(investorId).then(async (res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          await getListActivistFilingsByActivistAiSReq({
            company_id: investorId,
            activist_id: actid,
            longShort: null
          });
        }
      });
    },
    [getListActivistFilingsByActivistAiSReq]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_ACTIVIST_SHORTS;
      }
      getAll(investorId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [getAll, query.investor, distinctProfile]);

  return (
    <ErrorBoundary>
      <InvestorActivistShortsFilings
        children={children}
        TrialLog={TrialLog}
        location={location}
        activistFilingsAiS={activistFilingsAiS}
        loadingData={loadingData}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivistShortsFilingsContainer.propTypes = {
  TrialLog: PropTypes.any,
  activistFilingsAiS: PropTypes.any.isRequired,
  children: PropTypes.any,
  getListActivistFilingsByActivistAiSReq: PropTypes.func,
  handleResetFiling: PropTypes.func,
  location: PropTypes.object,
  loadingData: PropTypes.any.isRequired
};

InvestorActivistShortsFilingsContainer.defaultProps = {
  getListActivistFilingsByActivistAiSReq: () => {},
  handleResetFiling: () => {},
  location: {},
  children: undefined,
  TrialLog: undefined
};

const SelectTrialLog = (state) => state.investor.TrialLog_activistShort;
const SelectloadingData = (state) => state.investorActivistShort.loadingData;
const SelectActivismFilings = (state) =>
  state.investorActivistShort.activistFilingsAiS;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  TrialLog: SelectTrialLog(state),
  activistFilingsAiS: SelectActivismFilings(state),
  loadingData: SelectloadingData(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  handleVisitorLog,
  handleResetFiling,
  getListActivistFilingsByActivistAiSReq,
  handleSetLoadingInvestorActivistShorts,
  getActivistIdFromInvestorIdReq
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivistShortsFilingsContainer)
);
