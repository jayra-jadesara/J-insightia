import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import qs from 'qs';
import NewsSearch from '../../../components/News/Search/NewsSearch';
import {
  getNewsEventReq,
  handleNewsEventOnChange,
  handleNewsPeriodSelection,
  handleOnStartDateChange,
  handleNewsFreeSearchText,
  handleOnEndDateChange,
  getStakeholdingReq,
  handleNewsStakeholding,
  getActivistObjectiveReq,
  getPeerGroupDataReq,
  handleTreeViewActivistObjective,
  handleNewsfilterSelection,
  NewsFilterReq,
  handleResetNewsSelection,
  handlequickSearchReq,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleCompanyChangePeerGrp,
  handleInvestorChangePeerGrp,
  handleSelectSidebarNews,
  handleResetSidebarNews,
  handleModalClickEvent,
  getProductMembershipsReq,
  handleNewsProductOnChange
} from '../NewsSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import {
  // company
  handleCompanySearchOptionSelection,
  handleIndustrySelection,
  handleCompanySelection,
  HandleFilterModel,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleBulkCompanySelection,
  piListOfIndicesReq,
  getAIPeersGroups,
  getListOfExchange,
  getUserDashboardReq,
  getTreeRegionsAndCountries,
  listInvestorTypeAndSubtype,
  getPIListSectorsAndIndustriesReq,
  getCompanySearchOptions,
  getInvestorSearchOptions,
  getCurrentShareholderReq,
  allIssuersReq,
  handleIndexSelectionChange,
  handleExchangeSelectionChange,
  handleAIPeerGroupSelection,
  handleMarketCapSelection,
  searchInvestorsReq,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  handleSaveCurrentList,
  HandleTreeViewCompanyLocation,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  handleCompanySearchUpdateReq,
  searchCompanyAndIndustriesReq,
  handleCompanySingleSelection,
  handleRunReq,
  handleCompanySearchDeleteReq,

  // investor
  HandleInvestorFilterModel,
  HandleTreeViewInvestorLocation,
  getInvestorSearchSelectionReq,
  handleInvestorSelection,
  handleInvestorIsBulkUpload,
  handleBulkInvestorSelection,
  handleByShareholderOfCompany,
  getAllInvestorsFromShareholderOfCompany,
  HandleTreeViewListInvestorTypeAndSubtype,
  handleSaveInvestorCurrentList,
  handleInvestorSearchDeleteReq,
  handleInvestorSearchUpdateReq,
  handleInvestorSearchOptionSelection,
  handleReset,
  ResetInvestorSearchOptionSelection,
  handleAumCategorySelection,
  getAumCategorylistReq,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetCompnaySelections,
  handleResetInvestorSelections,
} from '../../DashboardContainer/DashboardSlice';
import NewsTagConstant from '../../../constants/NewsTagConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const SearchContainer = ({
  getNewsEventReq,
  getStakeholdingReq,
  getActivistObjectiveReq,
  getPeerGroupDataReq,
  piListOfIndices,
  allListOfExchange,
  getUserDashboardReq,
  listAIPeerGroup,
  allCountriesAndRegions,
  listInvestorTypeAndSubtypeReq,
  piListSectorsAndIndustries,
  getInvestorSearchOptions,
  getCompanySearchOptions,
  getCurrentShareholderReq,
  allIssuers,
  NewsFilterReq,
  companySearchOptionSelection,
  investorSearchOptionsSelection,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleResetSidebarNews,
  handleModalClickEvent,
  getProductMembershipsReq,
  lstProductMembership,
  handleNewsProductOnChange,
  getAumCategorylistReq,
  handleResetCompnaySelections,
  handleResetInvestorSelections,
  ...props
}) => {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    handleResetSidebarNews();
  }, [handleResetSidebarNews]);

  useEffect(() => {
    getNewsEventReq(
      NewsTagConstant.ACTIVISM_CATEGORY_ID,
      NewsTagConstant.NEWS_LONG_SHORT,
      false
    );
    getStakeholdingReq(2, false);
    getActivistObjectiveReq(1);
    if (query.q) {
      handleClearPeerGroupInvestorSelection();
      handleClearPeerGroupCompanySelection();
    } else {
      const optionData = {
        comp: companySearchOptionSelection,
        inve: investorSearchOptionsSelection
      };
      getPeerGroupDataReq(optionData);
    }
  }, [
    getNewsEventReq,
    getStakeholdingReq,
    getActivistObjectiveReq,
    companySearchOptionSelection,
    investorSearchOptionsSelection,
    getPeerGroupDataReq,
    handleClearPeerGroupCompanySelection,
    handleClearPeerGroupInvestorSelection,
    query.q
  ]);

  React.useEffect(() => {
    function getData() {
      // const filterReq = {};
      // NewsFilterReq(filterReq);
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
      getInvestorSearchOptions();
      getCurrentShareholderReq();
      getProductMembershipsReq();
      getAumCategorylistReq();
    }
    getData();
  }, [
    getCompanySearchOptions,
    getInvestorSearchOptions,
    piListSectorsAndIndustries,
    piListOfIndices,
    allListOfExchange,
    listAIPeerGroup,
    allCountriesAndRegions,
    listInvestorTypeAndSubtypeReq,
    getCurrentShareholderReq,
    getAumCategorylistReq,
    // NewsFilterReq,
    getPeerGroupDataReq,
    handleClearPeerGroupCompanySelection,
    handleClearPeerGroupInvestorSelection,
    query.q
  ]);

  return (
    <ErrorBoundary>
      <NewsSearch
        {...props}
        allIssuers={allIssuers}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getUserDashboardReq={getUserDashboardReq}
        NewsFilterReq={NewsFilterReq}
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        handleClearPeerGroupInvestorSelection={
          handleClearPeerGroupInvestorSelection
        }
        handleClearPeerGroupCompanySelection={
          handleClearPeerGroupCompanySelection
        }
        handleModalClickEvent={handleModalClickEvent}
        lstProductMembership={lstProductMembership}
        handleNewsProductOnChange={handleNewsProductOnChange}
        handleResetCompnaySelections={handleResetCompnaySelections}
        handleResetInvestorSelections={handleResetInvestorSelections}
      />
    </ErrorBoundary>
  );
};

SearchContainer.propTypes = {
  NewsFilterReq: PropTypes.func,
  allCountriesAndRegions: PropTypes.func,
  allIssuers: PropTypes.func,
  allListOfExchange: PropTypes.func,
  companySearchOptionSelection: PropTypes.any,
  getActivistObjectiveReq: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
  getCurrentShareholderReq: PropTypes.func,
  getInvestorSearchOptions: PropTypes.func,
  getNewsEventReq: PropTypes.func,
  getPeerGroupDataReq: PropTypes.func,
  getStakeholdingReq: PropTypes.func,
  getUserDashboardReq: PropTypes.func,
  handleClearPeerGroupCompanySelection: PropTypes.func,
  handleClearPeerGroupInvestorSelection: PropTypes.func,
  investorSearchOptionsSelection: PropTypes.any,
  listAIPeerGroup: PropTypes.func,
  listInvestorTypeAndSubtypeReq: PropTypes.func,
  piListOfIndices: PropTypes.func,
  piListSectorsAndIndustries: PropTypes.func
};

SearchContainer.defaultProps = {
  NewsFilterReq: () => {},
  allCountriesAndRegions: () => {},
  allIssuers: () => {},
  allListOfExchange: () => {},
  getActivistObjectiveReq: () => {},
  getCompanySearchOptions: () => {},
  getCurrentShareholderReq: () => {},
  getInvestorSearchOptions: () => {},
  getNewsEventReq: () => {},
  getPeerGroupDataReq: () => {},
  getStakeholdingReq: () => {},
  getUserDashboardReq: () => {},
  handleClearPeerGroupCompanySelection: () => {},
  handleClearPeerGroupInvestorSelection: () => {},
  listAIPeerGroup: () => {},
  listInvestorTypeAndSubtypeReq: () => {},
  piListOfIndices: () => {},
  piListSectorsAndIndustries: () => {}
};

const SelectNewsEvents = (state) => state.news.newsEvents;
const SelectNewsEventSelection = (state) => state.news.newsEventSelection;
const SelectNewsPeriod = (state) => state.news.newsPeriod;
const SelectNewsPeriodSelection = (state) => state.news.newsPeriodSelection;
const SelectStartNewsPeriodDate = (state) => state.news.startNewsPeriodDate;
const SelectEndNewsPeriodDate = (state) => state.news.endNewsPeriodDate;
const SelectNewsFreeSearchText = (state) => state.news.newsFreeSearchText;
const SelectNewsStakeholding = (state) => state.news.newsStakeholding;
const SelectNewsStakeholdingSelection = (state) =>
  state.news.newsStakeholdingSelection;
const SelectAllActivistObjective = (state) => state.news.allActivistObjective;
const SelectActivistObjectiveSelection = (state) =>
  state.news.activistObjectiveSelection;
const SelectCompanyPeerGroupSelection = (state) =>
  state.news.companyPeerGroupSelection;
const SelectInvestorPeerGroupSelection = (state) =>
  state.news.investorPeerGroupSelection;

// dashboard - company search
const selectIndustrySelection = (state) => state.dashboard.industrySelection;
const selectShowFilterModel = (state) => state.dashboard.showFilterModel;
const selectCompanySelection = (state) => state.dashboard.companySelection;
const selectShowIndividualOption = (state) =>
  state.dashboard.showIndividualOption;
const selectBulkCompanySelectRecordset = (state) =>
  state.dashboard.freeSearchRecordset;
const selectListOfIndicesRecordSet = (state) => state.dashboard.piListIndices;
const selectIndexSelection = (state) => state.dashboard.indexSelection;
const selectListOfExchange = (state) => state.dashboard.listExchange;
const selectExchangeSelection = (state) => state.dashboard.exchangeSelection;
const selectAIPeerGroup = (state) => state.dashboard.listAIPeersGroups;
const selectAIPeerGroupSelection = (state) =>
  state.dashboard.aiPeerGroupSelection;
const selectListMarketCap = (state) => state.dashboard.listMarketCap;
const selectMarketCapSelection = (state) => state.dashboard.marketCapSelection;
const selectTextMarketCapMinRange = (state) =>
  state.dashboard.txtMarketCapMinRange;
const selectTextMarketCapMaxRange = (state) =>
  state.dashboard.txtMarketCapMaxRange;
const selectCompanyLocationSelection = (state) =>
  state.dashboard.companyLocationSelection;
const selectListRegeionAndCountries = (state) =>
  state.dashboard.listRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) =>
  state.dashboard.defaultCmpRegeionAndCountries;
const selectLstInvestorRegeionAndCountries = (state) =>
  state.dashboard.lstInvestorRegeionAndCountries;
const selectPIListSectorsAndIndustries = (state) =>
  state.dashboard.piListSectorsAndIndustries;
const selectCompanySearchOptionSelection = (state) =>
  state.dashboard.companySearchOptionSelection;
const selectCompanySearchOptions = (state) =>
  state.dashboard.companySearchOptions;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectSaveCurrentListButtonText = (state) =>
  state.dashboard.saveCurrentListButtonText;
const selectCompanySingleSelection = (state) =>
  state.dashboard.companySingleSelection;
const selectDefaultPiListSectorsAndIndustries = (state) =>
  state.dashboard.defaultPiListSectorsAndIndustries;

// dashboard - investor search
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectInvestorSearchOptions = (state) =>
  state.dashboard.investorSearchOptions;
const selectInvestorSearchOptionsSelection = (state) =>
  state.dashboard.investorSearchOptionsSelection;
const selectShowInvestorFilterModel = (state) =>
  state.dashboard.showInvestorFilterModel;
const selectInvestorLocationSelection = (state) =>
  state.dashboard.investorLocationSelection;
const selectListInvestorTypeAndSubtype = (state) =>
  state.dashboard.listInvestorTypeAndSubtype;
const selectListInvestorTypeAndSubtypeSelection = (state) =>
  state.dashboard.listInvestorTypeAndSubtypeSelection;
const selectInvestorBulkUpload = (state) =>
  state.dashboard.isInvestorBulkUpload;
const selectlistByIndivProponent = (state) =>
  state.dashboard.listByIndivProponent;
const selectSelectionByIndivProponent = (state) =>
  state.dashboard.selectionByIndivProponent;
const selectIsSaveCurrentListButtonDeleteDisable = (state) =>
  state.dashboard.isSaveCurrentListButtonDeleteDisable;
// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) =>
  state.dashboard.aumCategorySelection;
const selectInvTxtMarketCapMinRange = (state) =>
  state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) =>
  state.dashboard.invTxtMarketCapMaxRange;

// filter - selection
const SelectFilterByCompanySelection = (state) =>
  state.news.filterByCompanySelection;
const SelectFilterByInvestorSelection = (state) =>
  state.news.filterByInvestorSelection;
const SelectFilterEvent = (state) => state.news.filterEvent;
const SelectFilterPeriodStart = (state) => state.news.filterPeriodStart;
const SelectFilterPeriodEnd = (state) => state.news.filterPeriodEnd;
const SelectFilterFreeSearch = (state) => state.news.filterFreeSearch;
const SelectFilterActiveObjectiveGroupSelection = (state) =>
  state.news.filterActiveObjectiveGroupSelection;
const SelectFilterActiveObjectiveTypeSelection = (state) =>
  state.news.filterActiveObjectiveTypeSelection;
const SelectFilterStackHolding = (state) => state.news.filterStackHolding;
const SelectNewsSearchResult = (state) => state.news.newsSearchResult;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
  state.news.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.news.isResetInvestorPeerGroupSelection;

const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectSelectedSidebarNews = (state) => state.news.selectedSidebarNews;

const SelectIsClickModal = (state) => state.news.isClickModal;
const SelectLstProductMembership = (state) => state.news.lstProductMembership;
const SelectProductSelections = (state) => state.news.productSelections;
const SelectFilterProduct = (state) => state.news.filterProduct;

const mapStateToProps = (state) => ({
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),

  // filter-selection
  filterByCompanySelection: SelectFilterByCompanySelection(state),
  filterByInvestorSelection: SelectFilterByInvestorSelection(state),
  filterEvent: SelectFilterEvent(state),
  filterPeriodStart: SelectFilterPeriodStart(state),
  filterPeriodEnd: SelectFilterPeriodEnd(state),
  filterFreeSearch: SelectFilterFreeSearch(state),
  filterActiveObjectiveGroupSelection:
    SelectFilterActiveObjectiveGroupSelection(state),
  filterActiveObjectiveTypeSelection:
    SelectFilterActiveObjectiveTypeSelection(state),
  filterStackHolding: SelectFilterStackHolding(state),
  newsSearchResult: SelectNewsSearchResult(state),
  isResetCompanyPeerGroupSelection:
    SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection:
    SelectIsResetInvestorPeerGroupSelection(state),

  // investor search selection
  investorSearchOptionsSelection: selectInvestorSearchOptionsSelection(state),
  investorSelection: selectInvestorSelection(state),
  isInvestorBulkUpload: selectInvestorBulkUpload(state),
  investorSearchOptions: selectInvestorSearchOptions(state),
  showInvestorFilterModel: selectShowInvestorFilterModel(state),
  investorLocationSelection: selectInvestorLocationSelection(state),
  listInvestorTypeAndSubtype: selectListInvestorTypeAndSubtype(state),
  listInvestorTypeAndSubtypeSelection:
    selectListInvestorTypeAndSubtypeSelection(state),
  listByIndivProponent: selectlistByIndivProponent(state),
  selectionByIndivProponent: selectSelectionByIndivProponent(state),
  isSaveCurrentListButtonDeleteDisable:
    selectIsSaveCurrentListButtonDeleteDisable(state),

  // Company search selection
  companySearchOptionSelection: selectCompanySearchOptionSelection(state),
  industrySelection: selectIndustrySelection(state),
  showFilterModel: selectShowFilterModel(state),
  companySelection: selectCompanySelection(state),
  showIndividualOption: selectShowIndividualOption(state),
  freeSearchRecordset: selectBulkCompanySelectRecordset(state),
  piListIndices: selectListOfIndicesRecordSet(state),
  indexSelection: selectIndexSelection(state),
  listOfExchange: selectListOfExchange(state),
  exchangeSelection: selectExchangeSelection(state),
  aiPeerGroups: selectAIPeerGroup(state),
  aiPeerGroupSelection: selectAIPeerGroupSelection(state),
  listMarketCap: selectListMarketCap(state),
  marketCapSelection: selectMarketCapSelection(state),
  companyLocationSelection: selectCompanyLocationSelection(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  piListOfSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  listOfcompanySearchOptions: selectCompanySearchOptions(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  companySingleSelection: selectCompanySingleSelection(state),
    // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),

  newsEvents: SelectNewsEvents(state),
  newsEventSelection: SelectNewsEventSelection(state),
  newsPeriod: SelectNewsPeriod(state),
  newsPeriodSelection: SelectNewsPeriodSelection(state),
  startNewsPeriodDate: SelectStartNewsPeriodDate(state),
  endNewsPeriodDate: SelectEndNewsPeriodDate(state),
  newsFreeSearchText: SelectNewsFreeSearchText(state),
  newsStakeholding: SelectNewsStakeholding(state),
  newsStakeholdingSelection: SelectNewsStakeholdingSelection(state),
  allActivistObjective: SelectAllActivistObjective(state),
  activistObjectiveSelection: SelectActivistObjectiveSelection(state),
  companyPeerGroupSelection: SelectCompanyPeerGroupSelection(state),
  investorPeerGroupSelection: SelectInvestorPeerGroupSelection(state),
  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),
  selectedSidebarNews: SelectSelectedSidebarNews(state),
  isClickModal: SelectIsClickModal(state),
  lstProductMembership: SelectLstProductMembership(state),
  productSelections: SelectProductSelections(state),
  filterProduct: SelectFilterProduct(state),
  defaultPiListSectorsAndIndustries:
    selectDefaultPiListSectorsAndIndustries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),
});

const mapDispatchToProps = {
  getNewsEventReq,
  handleNewsEventOnChange,
  handleNewsPeriodSelection,
  handleOnStartDateChange,
  handleOnEndDateChange,
  handleNewsFreeSearchText,
  getStakeholdingReq,
  handleNewsStakeholding,
  getActivistObjectiveReq,
  handleTreeViewActivistObjective,
  getPeerGroupDataReq,
  handleNewsfilterSelection,
  NewsFilterReq,
  handleResetNewsSelection,
  ResetInvestorSearchOptionSelection,
  handlequickSearchReq,
  getProcedureRunningEstimateTimeReq,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleCompanyChangePeerGrp,
  handleInvestorChangePeerGrp,

  // Company search selection
  handleCompanySearchOptionSelection,
  handleIndustrySelection,
  HandleFilterModel,
  handleCompanySelection,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleBulkCompanySelection,
  piListOfIndices: piListOfIndicesReq,
  allListOfExchange: getListOfExchange,
  listAIPeerGroup: getAIPeersGroups,
  getUserDashboardReq,
  allCountriesAndRegions: getTreeRegionsAndCountries,
  listInvestorTypeAndSubtypeReq: listInvestorTypeAndSubtype,
  piListSectorsAndIndustries: getPIListSectorsAndIndustriesReq,
  getCompanySearchOptions,
  getInvestorSearchOptions,
  getCurrentShareholderReq,
  allIssuers: allIssuersReq,
  handleIndexSelectionChange,
  handleExchangeSelectionChange,
  handleAIPeerGroupSelection,
  handleMarketCapSelection,
  handleSearchInvestor: searchInvestorsReq,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  handleSaveCurrentList,
  HandleTreeViewCompanyLocation,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  handleCompanySearchUpdateReq,
  handleCompanyAndIndustry: searchCompanyAndIndustriesReq,
  handleCompanySingleSelection,
  handdleRun: handleRunReq,
  handleCompanySearchDeleteReq,
  getAumCategorylistReq,

  // investor search selection
  HandleInvestorFilterModel,
  HandleTreeViewInvestorLocation,
  GetInvestorSearchSelection: getInvestorSearchSelectionReq,
  handleInvestorSelection,
  handleInvestorIsBulkUpload,
  handleBulkInvestorSelection,
  handleByShareholderOfCompany,
  getAllInvestorsFromShareholderOfCompany,
  HandleTreeViewListInvestorTypeAndSubtype,
  handleSaveInvestorCurrentList,
  handleInvestorSearchDeleteReq,
  handleInvestorSearchUpdateReq,
  handleInvestorSearchOptionSelection,
  handleReset,
  handleSelectSidebarNews,
  handleResetSidebarNews,
  handleModalClickEvent,
  getProductMembershipsReq,
  handleNewsProductOnChange,
  handleAumCategorySelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetCompnaySelections,
  handleResetInvestorSelections,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
);
