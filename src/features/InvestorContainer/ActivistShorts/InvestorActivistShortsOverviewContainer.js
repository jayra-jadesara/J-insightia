import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { INVESTOR_SEARCH, CONTACT_IMG_PATH } from '../../../constants/PathsConstant';
import InvestorActivistShortOverview from '../../../components/Investor/InvestorActivistShorts/InvestorActivistShortOverview';
import {
  getActivistIdFromInvestorIdReq,
  getListCampaignTypesbyActivistReq,
  getHoldingsbyCountryAiSReq,
  getHoldingsbyIndustryAiSReq,
  getHoldingsbyMarketCapAiSReq,
  handleResetInvestorActivistShortsCharts,
  handleGlobleResetActivistShort
} from './ActivistShortSlice';
import {
  getActivistProfileDataReq,
  getActivistOfficesLstReq,
  getActivistPersonnelLstReq
} from '../../InvestorContainer/Activism/InvestorActivismSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorActivistShortsOverviewContainer = ({
  location,
  lstCampaignTypesbyActivist,
  getActivistIdFromInvestorIdReq,
  getListCampaignTypesbyActivistReq,
  getHoldingsbyIndustryAiSReq,
  getHoldingsbyCountryAiSReq,
  getHoldingsbyMarketCapAiSReq,
  lstCountryFocusChartData,
  lstSectorFocusData,
  lstMarketCapOfInvestmentData,
  handleResetInvestorActivistShortsCharts,
  investmentStrategy,
  activistProfileData,
  lstActivistOffices,
  lstActivistPersonnel,
  getActivistProfileDataReq,
  getActivistOfficesLstReq,
  getActivistPersonnelLstReq,
  loadingData,
  handleGlobleResetActivistShort,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const [jsonNew, setJsonNew] = useState([]);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    handleGlobleResetActivistShort();
    handleResetInvestorActivistShortsCharts();
  }, [handleResetInvestorActivistShortsCharts, handleGlobleResetActivistShort]);

  useEffect(() => {
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_ACTIVIST_SHORTS;
      }
      getActivistIdFromInvestorIdReq(investorId).then(async (res) => {
        const actid = res.payload.activist_id;
        if (actid !== null) {
          await getActivistProfileDataReq(actid);
          await getActivistPersonnelLstReq(actid);
          await getActivistOfficesLstReq(actid);
          //
          await getListCampaignTypesbyActivistReq(actid);
          await getHoldingsbyCountryAiSReq(actid);
          await getHoldingsbyIndustryAiSReq(actid);
          await getHoldingsbyMarketCapAiSReq(actid);
        }
      });
    }
  }, [
    distinctProfile,
    getHoldingsbyCountryAiSReq,
    getHoldingsbyIndustryAiSReq,
    getHoldingsbyMarketCapAiSReq,
    getListCampaignTypesbyActivistReq,
    query.investor
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
      const jsonImgExists = [];
      for (const obj of lstActivistPersonnel) {
        const pathUrl = `${
          window.location.origin
        }${CONTACT_IMG_PATH}${encodeURIComponent(obj.picture)}`;
        const link = await getImageOrFallback(pathUrl, '');
        jsonImgExists.push({ ...obj, imageExists: link !== '' });
      }
      setJsonNew(jsonImgExists);
    }
    getAll();
  }, [lstActivistPersonnel]);

  return (
    <ErrorBoundary>
      <InvestorActivistShortOverview
        lstCampaignTypesbyActivist={lstCampaignTypesbyActivist}
        lstCountryFocusChartData={lstCountryFocusChartData}
        lstMarketCapOfInvestmentData={lstMarketCapOfInvestmentData}
        lstSectorFocusData={lstSectorFocusData}
        investmentStrategy={investmentStrategy}
        activistProfileData={activistProfileData}
        lstActivistOffices={lstActivistOffices}
        dataContactDetails={jsonNew}
        lstActivistPersonnel={lstActivistPersonnel}
        loadingData={loadingData}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorActivistShortsOverviewContainer.propTypes = {
  lstCampaignTypesbyActivist: PropTypes.array,
  getActivistIdFromInvestorIdReq: PropTypes.func,
  getListCampaignTypesbyActivistReq: PropTypes.func,
  getHoldingsbyIndustryAiSReq: PropTypes.func,
  getHoldingsbyCountryAiSReq: PropTypes.func,
  getHoldingsbyMarketCapAiSReq: PropTypes.func,
  lstCountryFocusChartData: PropTypes.array,
  lstSectorFocusData: PropTypes.array,
  lstMarketCapOfInvestmentData: PropTypes.array,
  location: PropTypes.object,
  investmentStrategy: PropTypes.any,
  activistProfileData: PropTypes.any,
  lstActivistOffices: PropTypes.any,
  lstActivistPersonnel: PropTypes.any,
  getActivistProfileDataReq: PropTypes.func.isRequired,
  getActivistOfficesLstReq: PropTypes.func.isRequired,
  getActivistPersonnelLstReq: PropTypes.func.isRequired,
  loadingData: PropTypes.any
};

InvestorActivistShortsOverviewContainer.defaultProps = {
  getActivistIdFromInvestorIdReq: () => null,
  getListCampaignTypesbyActivistReq: () => null,
  getHoldingsbyIndustryAiSReq: () => null,
  getHoldingsbyCountryAiSReq: () => null,
  getHoldingsbyMarketCapAiSReq: () => null,
  lstCountryFocusChartData: [],
  lstSectorFocusData: [],
  lstMarketCapOfInvestmentData: [],
  lstCampaignTypesbyActivist: [],
  investmentStrategy: undefined,
  activistProfileData: undefined,
  lstActivistOffices: undefined,
  lstActivistPersonnel: undefined,
  loadingData: undefined
};

// Investor Activist Short
const selectInvestmentStrategy = (state) =>
  state.InvestorActivismSlice.investmentStrategy;
const selectLstActivistOffices = (state) =>
  state.InvestorActivismSlice.lstActivistOffices;
const selectLstActivistPersonnel = (state) =>
  state.InvestorActivismSlice.lstActivistPersonnel;
const selectactivistProfileData = (state) =>
  state.InvestorActivismSlice.activistProfileData;
//
const SelectLstCampaignTypesbyActivist = (state) =>
  state.investorActivistShort.lstCampaignTypesbyActivist;
const SelectCurrentActivistId = (state) =>
  state.investorActivistShort.currentActivistId;
const SelectLstCountryFocusChartData = (state) =>
  state.investorActivistShort.lstCountryFocusChartData;
const SelectLstSectorFocusData = (state) =>
  state.investorActivistShort.lstSectorFocusData;
const SelectLstMarketCapOfInvestmentData = (state) =>
  state.investorActivistShort.lstMarketCapOfInvestmentData;
const SelectloadingData = (state) => state.investorActivistShort.loadingData;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  // Investor Activist Short
  lstCampaignTypesbyActivist: SelectLstCampaignTypesbyActivist(state),
  currentActivistId: SelectCurrentActivistId(state),
  lstCountryFocusChartData: SelectLstCountryFocusChartData(state),
  lstSectorFocusData: SelectLstSectorFocusData(state),
  lstMarketCapOfInvestmentData: SelectLstMarketCapOfInvestmentData(state),
  loadingData: SelectloadingData(state),

  activistProfileData: selectactivistProfileData(state),
  investmentStrategy: selectInvestmentStrategy(state),
  lstActivistOffices: selectLstActivistOffices(state),
  lstActivistPersonnel: selectLstActivistPersonnel(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  getActivistIdFromInvestorIdReq,
  getListCampaignTypesbyActivistReq,
  getHoldingsbyCountryAiSReq,
  getHoldingsbyIndustryAiSReq,
  getHoldingsbyMarketCapAiSReq,
  handleResetInvestorActivistShortsCharts,
  //
  getActivistProfileDataReq,
  getActivistOfficesLstReq,
  getActivistPersonnelLstReq,
  handleGlobleResetActivistShort
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorActivistShortsOverviewContainer)
);
