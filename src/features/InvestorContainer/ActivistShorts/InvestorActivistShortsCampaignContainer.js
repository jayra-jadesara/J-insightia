import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import InvestorActivistShortCampaign from '../../../components/Investor/InvestorActivistShorts/InvestorActivistShortCampaign';
import {
  getCampaignSummarybyActivistAiSReq,
  getActivistIdFromInvestorIdReq,
  handleGlobleResetActivistShort
} from './ActivistShortSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivistShortsCampaignContainer = ({
  location,
  getCampaignSummarybyActivistAiSReq,
  getActivistIdFromInvestorIdReq,
  lstCampaignSummarybyActivistAiS,
  loadingData,
  handleGlobleResetActivistShort,
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
    handleGlobleResetActivistShort();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleGlobleResetActivistShort]);

  const getAll = useCallback(async () => {
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_ACTIVIST_SHORTS;
      }
      await getActivistIdFromInvestorIdReq(investorId).then(async (res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          await getCampaignSummarybyActivistAiSReq(actid);
        }
      });
    }
  }, [
    distinctProfile,
    getCampaignSummarybyActivistAiSReq
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [getAll]);

  return (
    <ErrorBoundary>
      <InvestorActivistShortCampaign
        lstCampaignSummarybyActivistAiS={lstCampaignSummarybyActivistAiS}
        loadingData={loadingData}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivistShortsCampaignContainer.propTypes = {
  location: PropTypes.object,
  loadingData: PropTypes.any
};

InvestorActivistShortsCampaignContainer.defaultProps = {
  location: '',
  loadingData: undefined
};

// Investor Activist Short
const SelectLstCampaignSummarybyActivistAiS = (state) =>
  state.investorActivistShort.lstCampaignSummarybyActivistAiS;
const SelectloadingData = (state) => state.investorActivistShort.loadingData;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  // Investor Activist Short
  lstCampaignSummarybyActivistAiS: SelectLstCampaignSummarybyActivistAiS(state),
  loadingData: SelectloadingData(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getCampaignSummarybyActivistAiSReq,
  getActivistIdFromInvestorIdReq,
  handleGlobleResetActivistShort
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivistShortsCampaignContainer)
);
