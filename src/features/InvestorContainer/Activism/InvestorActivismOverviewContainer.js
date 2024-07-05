import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorActivismOverview from '../../../components/Investor/InvestorActivism/InvestorActivismOverview';
import { INVESTOR_SEARCH, CONTACT_IMG_PATH } from '../../../constants/PathsConstant';
import { getActivistIdFromInvestorIdReq } from './../ActivistShorts/ActivistShortSlice';
import {
  getActiviststrategyReq,
  getHoldingsbyCountryChartDataReq,
  getHoldingsbyIndustryChartDataReq,
  getHoldingsbyExitTypeChartDataReq,
  getHoldingsbyMarketCapChartDataReq,
  getActivistProfileDataReq,
  getCampaignTypesbyActivistLstReq,
  getActivistOfficesLstReq,
  getActivistPersonnelLstReq,
  getActivistTimelineLstReq,
  getActivistSharholderProposalsLstReq,
  handleResetInvestorActivismCharts,
  handleResetActivismOverview,
  handleUpdateContactData,
} from '../Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivismOverviewContainer = ({
  location,
  children,
  // Overview
  getActivistIdFromInvestorIdReq,
  getActiviststrategyReq,
  activismStrategyData,
  getHoldingsbyCountryChartDataReq,
  getHoldingsbyIndustryChartDataReq,
  getHoldingsbyExitTypeChartDataReq,
  getHoldingsbyMarketCapChartDataReq,
  holdingsbyCountryChartData,
  holdingsbyIndustryChartData,
  holdingsbyExitTypeChartData,
  holdingsbyMarketCapChartData,
  getActivistProfileDataReq,
  activistProfileData,
  investmentStrategy,
  getCampaignTypesbyActivistLstReq,
  lstCampaignTypesbyActivist,
  getActivistOfficesLstReq,
  lstActivistOffices,
  getActivistPersonnelLstReq,
  lstActivistPersonnel,
  getActivistTimelineLstReq,
  lstActivistTimeline,
  getActivistSharholderProposalsLstReq,
  lstActivistSharholderProposals,
  handleResetInvestorActivismCharts,
  handleResetActivismOverview,
  isLoading,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
  handleUpdateContactData,
  lstActivistPersonnelNew,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    // reset
    handleResetInvestorActivismCharts();
    handleResetActivismOverview();
  }, [handleResetInvestorActivismCharts, handleResetActivismOverview]);

  useEffect(() => {
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getActivistIdFromInvestorIdReq(investorId).then((res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          getActiviststrategyReq(actid);
          getHoldingsbyCountryChartDataReq(actid);
          getHoldingsbyIndustryChartDataReq(actid);
          getHoldingsbyExitTypeChartDataReq(actid);
          getHoldingsbyMarketCapChartDataReq(actid);
          getCampaignTypesbyActivistLstReq(actid);
          getActivistTimelineLstReq(actid);
          getActivistSharholderProposalsLstReq(actid);
          //
          getActivistProfileDataReq(actid);
          getActivistPersonnelLstReq(actid);
          getActivistOfficesLstReq(actid);
        }
      });
    }
  }, [
    getActiviststrategyReq,
    getHoldingsbyCountryChartDataReq,
    getHoldingsbyIndustryChartDataReq,
    getHoldingsbyExitTypeChartDataReq,
    getHoldingsbyMarketCapChartDataReq,
    getActivistProfileDataReq,
    getCampaignTypesbyActivistLstReq,
    getActivistOfficesLstReq,
    getActivistPersonnelLstReq,
    getActivistTimelineLstReq,
    getActivistSharholderProposalsLstReq,
    query.investor,
    distinctProfile,
  ]);

  const getImageOrFallback = (path, fallback) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
      if (!img.complete) {
        return false;
      }
      return true;
    });

  useEffect(() => {
    async function getAll() {
      const jsonImgExists = lstActivistPersonnel.map((obj) => {
        // const pathUrl = `${window.location.origin}${CONTACT_IMG_PATH}${encodeURIComponent(obj.picture)}`;
        const pathUrl = `${CONTACT_IMG_PATH}${encodeURIComponent(obj.picture)}`;
        let linklist = '';
        const link = getImageOrFallback(pathUrl, '').then((res) => {
          linklist = res;
        });
        return { ...obj, imageExists: linklist !== '' };
      });
      handleUpdateContactData(jsonImgExists);
    }
    getAll();
  }, [lstActivistPersonnel, lstActivistPersonnel.length]);

  return (
    <ErrorBoundary>
      <InvestorActivismOverview
        children={children}
        activismStrategyData={activismStrategyData}
        holdingsbyCountryChartData={holdingsbyCountryChartData}
        holdingsbyIndustryChartData={holdingsbyIndustryChartData}
        holdingsbyExitTypeChartData={holdingsbyExitTypeChartData}
        holdingsbyMarketCapChartData={holdingsbyMarketCapChartData}
        lstCampaignTypesbyActivist={lstCampaignTypesbyActivist}
        lstActivistPersonnel={lstActivistPersonnel}
        lstActivistTimeline={lstActivistTimeline}
        lstActivistSharholderProposals={lstActivistSharholderProposals}
        //
        activistProfileData={activistProfileData}
        investmentStrategy={investmentStrategy}
        lstActivistOffices={lstActivistOffices}
        dataContactDetails={lstActivistPersonnelNew}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
        //
        isLoading={isLoading}
      />
    </ErrorBoundary>
  );
};

InvestorActivismOverviewContainer.propTypes = {
  children: PropTypes.any,
};

// overview
const selectActivismStrategyData = (state) => state.InvestorActivismSlice.activismStrategyData;
const selectHoldingsbyCountryChartData = (state) => state.InvestorActivismSlice.holdingsbyCountryChartData;
const selectHoldingsbyIndustryChartData = (state) => state.InvestorActivismSlice.holdingsbyIndustryChartData;
const selectHoldingsbyExitTypeChartData = (state) => state.InvestorActivismSlice.holdingsbyExitTypeChartData;
const selectHoldingsbyMarketCapChartData = (state) => state.InvestorActivismSlice.holdingsbyMarketCapChartData;
const selectInvestmentStrategy = (state) => state.InvestorActivismSlice.investmentStrategy;
const selectactivistProfileData = (state) => state.InvestorActivismSlice.activistProfileData;
const selectstCampaignTypesbyActivist = (state) => state.InvestorActivismSlice.lstCampaignTypesbyActivist;
const selectLstActivistOffices = (state) => state.InvestorActivismSlice.lstActivistOffices;
const selectLstActivistPersonnel = (state) => state.InvestorActivismSlice.lstActivistPersonnel;
const selectLstActivistTimeline = (state) => state.InvestorActivismSlice.lstActivistTimeline;
const selectLstActivistSharholderProposals = (state) => state.InvestorActivismSlice.lstActivistSharholderProposals;
const selectisLoading = (state) => state.InvestorActivismSlice.isLoading;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectLstActivistPersonnelNew = (state) => state.InvestorActivismSlice.lstActivistPersonnelNew;
const mapStateToProps = (state) => ({
  isLoading: selectisLoading(state),
  activismStrategyData: selectActivismStrategyData(state),
  holdingsbyCountryChartData: selectHoldingsbyCountryChartData(state),
  holdingsbyIndustryChartData: selectHoldingsbyIndustryChartData(state),
  holdingsbyExitTypeChartData: selectHoldingsbyExitTypeChartData(state),
  holdingsbyMarketCapChartData: selectHoldingsbyMarketCapChartData(state),
  investmentStrategy: selectInvestmentStrategy(state),
  activistProfileData: selectactivistProfileData(state),
  lstCampaignTypesbyActivist: selectstCampaignTypesbyActivist(state),
  lstActivistOffices: selectLstActivistOffices(state),
  lstActivistPersonnel: selectLstActivistPersonnel(state),
  lstActivistTimeline: selectLstActivistTimeline(state),
  lstActivistSharholderProposals: selectLstActivistSharholderProposals(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  lstActivistPersonnelNew: selectLstActivistPersonnelNew(state),
});
const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getActiviststrategyReq,
  getHoldingsbyCountryChartDataReq,
  getHoldingsbyIndustryChartDataReq,
  getHoldingsbyExitTypeChartDataReq,
  getHoldingsbyMarketCapChartDataReq,
  getActivistProfileDataReq,
  getCampaignTypesbyActivistLstReq,
  getActivistOfficesLstReq,
  getActivistPersonnelLstReq,
  getActivistTimelineLstReq,
  getActivistSharholderProposalsLstReq,
  handleResetInvestorActivismCharts,
  handleResetActivismOverview,
  handleUpdateContactData,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorActivismOverviewContainer));
