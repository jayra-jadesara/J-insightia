import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import InvestorActivismDemand from '../../../components/Investor/InvestorActivism/InvestorActivismDemand';
import { getActivistIdFromInvestorIdReq } from './../ActivistShorts/ActivistShortSlice';
import {
  getActivistGBRCampaignsLstReq,
  getCampaignSummarybyActivistLstReq,
  handleResetActivistDemands,
} from '../Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismDemandContainer = ({
  location,
  children,
  getActivistIdFromInvestorIdReq,
  getActivistGBRCampaignsLstReq,
  lstActivistGBRCampaigns,
  getCampaignSummarybyActivistLstReq,
  lstCampaignSummarybyActivist,
  handleResetActivistDemands,
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
    handleResetActivistDemands();
  }, [
    handleResetActivistDemands,
  ]);
  useEffect(() => {
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getActivistIdFromInvestorIdReq(investorId).then((res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          getCampaignSummarybyActivistLstReq(actid);
          getActivistGBRCampaignsLstReq(actid);
        }
      });
    }
  }, [
    getActivistGBRCampaignsLstReq,
    getCampaignSummarybyActivistLstReq,
    query.investor,
    distinctProfile
  ]);

  return (
    <ErrorBoundary>
      <InvestorActivismDemand
        children={children}
        lstActivistGBRCampaigns={lstActivistGBRCampaigns}
        lstCampaignSummarybyActivist={lstCampaignSummarybyActivist}
        isLoading={isLoading}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivismDemandContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

const selectLstActivistGBRCampaigns = (state) =>
  state.InvestorActivismSlice.lstActivistGBRCampaigns;
const selectLstCampaignSummarybyActivist = (state) =>
  state.InvestorActivismSlice.lstCampaignSummarybyActivist;
const selectisLoading = (state) => state.InvestorActivismSlice.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  lstActivistGBRCampaigns: selectLstActivistGBRCampaigns(state),
  lstCampaignSummarybyActivist: selectLstCampaignSummarybyActivist(state),
  isLoading: selectisLoading(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getActivistGBRCampaignsLstReq,
  getCampaignSummarybyActivistLstReq,
  handleResetActivistDemands
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActivismDemandContainer)
);
