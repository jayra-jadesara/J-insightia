import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import HoldingsDataAndAnalyticsTool from '../../components/Tools/ActivismTools/HoldingsDataAndAnalyticsTool';
import {
  getRegionsTradeReq,
  handleRegionChange,
  getInvestmentPublicDataReq,
  getCompaniesTargetedTrendsReq,
  handlePublicChange,
  getActiveActivistsTrendsReg,
  getActiveCompanyRegiontrendsReq,
  getActiveActivistsRegiontrendsReq,
  getIndustryTargetedTrendsReq,
  getCompaniesWithMultipleactivistsTrendsReq,
  getMarketCapbyYearTrendsReq,
  getActiveActivistsAUMReq,
  getSuccessRatesTrendsReq,
  handleDownloadExcel,
  handleRegionReset
} from './ActivismTrendsSlice';
import ActivismTrends from '../../components/Tools/ActivismTools/ActivismTrends';
import TrendsConst from '../../constants/ActivismTrendsConstant';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from './ToolsSlice';
import { GetPageAccess } from '../../utils/tools-util';
import { ACTIVISM } from '../../constants/ProductConstants';

const ActivismTrendsContainer = ({
  token,
  getRegionsTradeReq,
  handleRegionChange,
  getInvestmentPublicDataReq,
  getCompaniesTargetedTrendsReq,
  getActiveActivistsTrendsReg,
  getActiveCompanyRegiontrendsReq,
  getActiveActivistsRegiontrendsReq,
  getIndustryTargetedTrendsReq,
  getCompaniesWithMultipleactivistsTrendsReq,
  getMarketCapbyYearTrendsReq,
  getActiveActivistsAUMReq,
  getSuccessRatesTrendsReq,
  handleDownloadExcel,
  trialUserDisableDownload,
  handleRegionReset,
  ...props
}) => {
  useEffect(() => {
    handleRegionReset();
  }, []);

  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      const obj1 = {
        region: props.selectedRegion.value,
        shortlong: TrendsConst.LONG,
        public: props.selectedInvestmentPublic.value
      };
      const obj2 = {
        shortlong: TrendsConst.LONG,
        public: props.selectedInvestmentPublic.value
      };
      getRegionsTradeReq();
      getInvestmentPublicDataReq();
      getCompaniesTargetedTrendsReq(obj1);
      getActiveActivistsTrendsReg(obj1);
      getActiveCompanyRegiontrendsReq(obj2);
      getActiveActivistsRegiontrendsReq(obj2);
      getIndustryTargetedTrendsReq(obj1);
      getCompaniesWithMultipleactivistsTrendsReq(obj1);
      getMarketCapbyYearTrendsReq(obj1);
      getActiveActivistsAUMReq(obj1);
      getSuccessRatesTrendsReq({ region: props.selectedRegion.value });
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, ACTIVISM);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getAll();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    getRegionsTradeReq,
    getInvestmentPublicDataReq,
    getCompaniesTargetedTrendsReq,
    getActiveActivistsTrendsReg,
    props.selectedRegion,
    props.selectedInvestmentPublic,
    getActiveCompanyRegiontrendsReq,
    getActiveActivistsRegiontrendsReq,
    getIndustryTargetedTrendsReq,
    getCompaniesWithMultipleactivistsTrendsReq,
    getMarketCapbyYearTrendsReq,
    getActiveActivistsAUMReq,
    getSuccessRatesTrendsReq,
  ]);

  return (
    <ErrorBoundary>
      <ActivismTrends
        handleRegionChange={handleRegionChange}
        handleDownloadExcel={handleDownloadExcel}
        trialUserDisableDownload={trialUserDisableDownload}
        {...props}
      />
    </ErrorBoundary>
  );
};

ActivismTrendsContainer.propTypes = {
  getActiveActivistsAUMReq: PropTypes.func,
  getActiveActivistsRegiontrendsReq: PropTypes.func,
  getActiveActivistsTrendsReg: PropTypes.func,
  getActiveCompanyRegiontrendsReq: PropTypes.func,
  getCompaniesTargetedTrendsReq: PropTypes.func,
  getCompaniesWithMultipleactivistsTrendsReq: PropTypes.func,
  getIndustryTargetedTrendsReq: PropTypes.func,
  getInvestmentPublicDataReq: PropTypes.func,
  getMarketCapbyYearTrendsReq: PropTypes.func,
  getRegionsTradeReq: PropTypes.func,
  getSuccessRatesTrendsReq: PropTypes.func,
  handleDownloadExcel: PropTypes.func,
  handleRegionChange: PropTypes.func
};

ActivismTrendsContainer.defaultProps = {
  getActiveActivistsAUMReq: () => {},
  getActiveActivistsRegiontrendsReq: () => {},
  getActiveActivistsTrendsReg: () => {},
  getActiveCompanyRegiontrendsReq: () => {},
  getCompaniesTargetedTrendsReq: () => {},
  getCompaniesWithMultipleactivistsTrendsReq: () => {},
  getIndustryTargetedTrendsReq: () => {},
  getInvestmentPublicDataReq: () => {},
  getMarketCapbyYearTrendsReq: () => {},
  getRegionsTradeReq: () => {},
  getSuccessRatesTrendsReq: () => {},
  handleRegionChange: () => {},
  handleDownloadExcel: () => {}
};

const selectLstRegionTrade = (state) => state.activismtrends.lstRegionTrade;
const selectSelectedRegion = (state) => state.activismtrends.selectedRegion;
const selectLstInvestmentPublic = (state) =>
  state.activismtrends.lstInvestmentPublic;
const selectSelectedInvestmentPublic = (state) =>
  state.activismtrends.selectedInvestmentPublic;
const selectCompaniesTargetedTrendsChartData = (state) =>
  state.activismtrends.companiesTargetedTrendsChartData;
const selectActiveActivistsTrendsChartData = (state) =>
  state.activismtrends.activeActivistsTrendsChartData;
const selectActiveCompanyRegiontrendsChartData = (state) =>
  state.activismtrends.activeCompanyRegiontrendsChartData;
const selectChartKeyCompanyRegion = (state) =>
  state.activismtrends.chartKeyCompanyRegion;
const selectActiveActivistsRegiontrendsChartData = (state) =>
  state.activismtrends.activeActivistsRegiontrendsChartData;
const selectChartKeyActivistsRegion = (state) =>
  state.activismtrends.chartKeyActivistsRegion;
const selectIndustryTargetedTrendsChartData = (state) =>
  state.activismtrends.industryTargetedTrendsChartData;
const selectChartKeyIndustryTargetedTrends = (state) =>
  state.activismtrends.chartKeyIndustryTargetedTrends;
const selectLstCompaniesWithMultipleactivistsTrends = (state) =>
  state.activismtrends.lstCompaniesWithMultipleactivistsTrends;
const selectLstMarketCapbyYearTrends = (state) =>
  state.activismtrends.lstMarketCapbyYearTrends;
const selectChartKeyMarketCapbyYearTrends = (state) =>
  state.activismtrends.chartKeyMarketCapbyYearTrends;
const selectActiveActivistsAUMChartData = (state) =>
  state.activismtrends.activeActivistsAUMChartData;
const selectSuccessRatesTrendsChartData = (state) =>
  state.activismtrends.successRatesTrendsChartData;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  lstRegionTrade: selectLstRegionTrade(state),
  selectedRegion: selectSelectedRegion(state),
  lstInvestmentPublic: selectLstInvestmentPublic(state),
  selectedInvestmentPublic: selectSelectedInvestmentPublic(state),
  companiesTargetedTrendsChartData:
    selectCompaniesTargetedTrendsChartData(state),
  activeActivistsTrendsChartData: selectActiveActivistsTrendsChartData(state),
  activeCompanyRegiontrendsChartData:
    selectActiveCompanyRegiontrendsChartData(state),
  chartKeyCompanyRegion: selectChartKeyCompanyRegion(state),
  activeActivistsRegiontrendsChartData:
    selectActiveActivistsRegiontrendsChartData(state),
  chartKeyActivistsRegion: selectChartKeyActivistsRegion(state),
  industryTargetedTrendsChartData: selectIndustryTargetedTrendsChartData(state),
  chartKeyIndustryTargetedTrends: selectChartKeyIndustryTargetedTrends(state),
  lstCompaniesWithMultipleactivistsTrends:
    selectLstCompaniesWithMultipleactivistsTrends(state),
  lstMarketCapbyYearTrends: selectLstMarketCapbyYearTrends(state),
  chartKeyMarketCapbyYearTrends: selectChartKeyMarketCapbyYearTrends(state),
  activeActivistsAUMChartData: selectActiveActivistsAUMChartData(state),
  successRatesTrendsChartData: selectSuccessRatesTrendsChartData(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getRegionsTradeReq,
  handleRegionChange,
  getInvestmentPublicDataReq,
  getCompaniesTargetedTrendsReq,
  handlePublicChange,
  getActiveActivistsTrendsReg,
  getActiveCompanyRegiontrendsReq,
  getActiveActivistsRegiontrendsReq,
  getIndustryTargetedTrendsReq,
  getCompaniesWithMultipleactivistsTrendsReq,
  getMarketCapbyYearTrendsReq,
  getActiveActivistsAUMReq,
  getSuccessRatesTrendsReq,
  handleDownloadExcel,
  handleRegionReset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivismTrendsContainer);
