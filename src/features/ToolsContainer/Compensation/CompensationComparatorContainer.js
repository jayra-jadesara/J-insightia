import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as ToolsSlice from '../ToolsSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../../utils/tools-util';
import { ACTIVISM, COMPENSATION } from '../../../constants/ProductConstants';
import CompensationComparatorTool from '../../../components/Tools/CompensationTools/CompensationComparatorTools/CompensationComparatorTool';
import {
  getCompensationComparatorDataReq,
  handleOnChangeDdlValue,
  handleResetComparatorToolData,
  handleCompensationTenure,
  GetDirectorTypesDataReq,
  handleCompensationDirectorType,
  handleCompensationIndividualSelection,
  handleStartInvCompensationDateSelection,
  handleEndInvCompensationDateSelection,
  handleIsInvCompendationDateChecked,
  handleResetCompensationTools
} from './CompensationToolsSlice';
import {
  handleResetInvestorComparatorTool,
  handleSponsorSelection,
  getAllMeetingTypeReq,
  handleMeetingTypeSelection,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  handleIndividualProponentSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleIsInvCompDateChecked,
  handleProponentGroupsearch,
  resolutionsByInvestorFilterReq,
  handleComapnySearchSelectionInvComp,
  handleInvestorSearchSelectionInvComp,
  getDefaultPeerGroupDataReq,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  handleClearResult,
} from '../ToolsSlice';
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
  getAumCategorylistReq,
  handleAumCategorySelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
} from '../../DashboardContainer/DashboardSlice';
import { TokenDecodeForProductStatus } from '../../../utils/general-util';

const CompensationComparatorContainer = ({
  token,
  HoldingsDataAndAnalyticsListReq,
  holdingdData,
  holdingdDataHeading,
  isLoading,
  allowDownload,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  trialUserDisableDownload,
  getCompensationComparatorDataReq,
  GetDirectorTypesDataReq,
  handleCompensationDirectorType,
  handleCompensationIndividualSelection,
  handleStartInvCompensationDateSelection,
  handleEndInvCompensationDateSelection,
  handleIsInvCompendationDateChecked,
  getDefaultPeerGroupDataReq,
  investorSearchOptionsSelection,
  getInvestorSearchOptions,
  getCompanySearchOptions,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  allCountriesAndRegions,
  listInvestorTypeAndSubtypeReq,
  piListSectorsAndIndustries,
  getCurrentShareholderReq,
  isShowInvestorDetails,
  handleResetCompensationTools,
  ...props
}) => {
  const [status, setStatus] = useState(null);
  const getStatus = async () => {
    const resp = await TokenDecodeForProductStatus(COMPENSATION);
    setStatus(resp);
  };
  useEffect(() => {
    handleResetCompensationTools();
  }, [handleResetCompensationTools]);
  useEffect(() => {
    GetDirectorTypesDataReq();
  }, [GetDirectorTypesDataReq]);

  useEffect(() => {
    // let validation = false;
    // let pageAccess = false;
    const abortController = new AbortController();
    async function getData() {
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
      getInvestorSearchOptions();
      const optionData = {
        comp: props.companySearchOptionSelection,
        inve: investorSearchOptionsSelection,
      };
      getDefaultPeerGroupDataReq(optionData);
    }
    // async function getAccess() {
    //   await ToolsSlice.getTokenDecode();
    //   pageAccess = await GetPageAccess(token.MemberShip, COMPENSATION);
    // }
    async function prepAccess() {
    //   // await getAccess();
    //   validation = true;
      await getData();
    //   await getStatus();
    }

    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    getCompanySearchOptions,
    getInvestorSearchOptions,
    piListSectorsAndIndustries,
    piListOfIndices,
    allListOfExchange,
    listAIPeerGroup,
    allCountriesAndRegions,
    listInvestorTypeAndSubtypeReq,
    // getCurrentShareholderReq,
    getDefaultPeerGroupDataReq,
    props.companySearchOptionSelection,
    investorSearchOptionsSelection,
  ]);

  return (
    <ErrorBoundary>
      <CompensationComparatorTool
        getCompensationComparatorDataReq={getCompensationComparatorDataReq}
        getProcedureRunningEstimateTimeReq={getProcedureRunningEstimateTimeReq}
        handleCompensationDirectorType={handleCompensationDirectorType}
        handleCompensationIndividualSelection={handleCompensationIndividualSelection}
        handleStartInvCompensationDateSelection={handleStartInvCompensationDateSelection}
        handleEndInvCompensationDateSelection={handleEndInvCompensationDateSelection}
        handleIsInvCompendationDateChecked={handleIsInvCompendationDateChecked}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        companySearchOptionSelection={props.companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getDefaultPeerGroupDataReq={getDefaultPeerGroupDataReq}
        {...props}
      />
    </ErrorBoundary>
  );
};

CompensationComparatorContainer.propTypes = {
  HoldingsDataAndAnalyticsListReq: PropTypes.func,
  allowDownload: PropTypes.bool,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  isLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.any,
  holdingdDataHeading: PropTypes.any,
};

CompensationComparatorContainer.defaultProps = {
  HoldingsDataAndAnalyticsListReq: () => {},
  allowDownload: false,
  getProcedureRunningEstimateTimeReq: () => {},
  isLoading: false,
};

const SelectHoldingdData = (state) => state.tools.holdingdData;
const SelectHoldingdDataHeading = (state) => state.tools.holdingdDataHeading;
const SelecIsLoading = (state) => state.tools.isLoading;
const selectAllowDownload = (state) => state.tools.allowDownload;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const selectTblCompensationComparatorToolData = (state) => state.CompensationTools.tblCompensationComparatorToolData;
const selectDdlCompensationType = (state) => state.CompensationTools.ddlCompensationType;
const selectSelectionCompensationType = (state) => state.CompensationTools.selectionCompensationType;
const selectIsComparatorToolLoading = (state) => state.CompensationTools.isComparatorToolLoading;
const selectSelectionDdlCompensationTenure = (state) => state.CompensationTools.selectionDdlCompensationTenure;
const selectDdlCompensationTenure = (state) => state.CompensationTools.ddlCompensationTenure;
const selectCompensatinStartDate = (state) => state.CompensationTools.compensatinStartDate;
const selectCompensationEndDate = (state) => state.CompensationTools.compensationEndDate;
const selectIsCompensationDateChecked = (state) => state.CompensationTools.isCompensationDateChecked;
const selectDdlDirectortypes = (state) => state.CompensationTools.ddlDirectortypes;
const selectSelectionDirectortypes = (state) => state.CompensationTools.selectionDirectortypes;
const selectSelectionCompensationIndivisual = (state) => state.CompensationTools.selectionCompensationIndivisual;
const selectselectionCompenPeerGroupData = (state) => state.CompensationTools.selectionCompenPeerGroupData;
// selection
const SelectInvCompCompanyPeerGroupSelection = (state) => state.investorComparatorTool.invCompCompanyPeerGroupSelection;
const SelectInvCompInvestorPeerGroupSelection = (state) =>
  state.investorComparatorTool.invCompInvestorPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) => state.investorComparatorTool.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.investorComparatorTool.isResetInvestorPeerGroupSelection;

// dashboard - company search
const selectIndustrySelection = (state) => state.dashboard.industrySelection;
const selectShowFilterModel = (state) => state.dashboard.showFilterModel;
const selectCompanySelection = (state) => state.dashboard.companySelection;
const selectShowIndividualOption = (state) => state.dashboard.showIndividualOption;
const selectBulkCompanySelectRecordset = (state) => state.dashboard.freeSearchRecordset;
const selectListOfIndicesRecordSet = (state) => state.dashboard.piListIndices;
const selectIndexSelection = (state) => state.dashboard.indexSelection;
const selectListOfExchange = (state) => state.dashboard.listExchange;
const selectExchangeSelection = (state) => state.dashboard.exchangeSelection;
const selectAIPeerGroup = (state) => state.dashboard.listAIPeersGroups;
const selectAIPeerGroupSelection = (state) => state.dashboard.aiPeerGroupSelection;
const selectListMarketCap = (state) => state.dashboard.listMarketCap;
const selectMarketCapSelection = (state) => state.dashboard.marketCapSelection;
const selectTextMarketCapMinRange = (state) => state.dashboard.txtMarketCapMinRange;
const selectTextMarketCapMaxRange = (state) => state.dashboard.txtMarketCapMaxRange;
const selectCompanyLocationSelection = (state) => state.dashboard.companyLocationSelection;
const selectListRegeionAndCountries = (state) => state.dashboard.listRegeionAndCountries;
const selectPIListSectorsAndIndustries = (state) => state.dashboard.piListSectorsAndIndustries;
const selectCompanySearchOptionSelection = (state) => state.dashboard.companySearchOptionSelection;
const selectCompanySearchOptions = (state) => state.dashboard.companySearchOptions;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectSaveCurrentListButtonText = (state) => state.dashboard.saveCurrentListButtonText;
const selectCompanySingleSelection = (state) => state.dashboard.companySingleSelection;

// dashboard - investor search
const selectInvListRegeionAndCountries = (state) => state.dashboard.invListRegeionAndCountries;
const selectInvTxtMarketCapMinRange = (state) => state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) => state.dashboard.invTxtMarketCapMaxRange;
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectInvestorSearchOptions = (state) => state.dashboard.investorSearchOptions;
const selectInvestorSearchOptionsSelection = (state) => state.dashboard.investorSearchOptionsSelection;
const selectShowInvestorFilterModel = (state) => state.dashboard.showInvestorFilterModel;
const selectInvestorLocationSelection = (state) => state.dashboard.investorLocationSelection;
const selectListInvestorTypeAndSubtype = (state) => state.dashboard.listInvestorTypeAndSubtype;
const selectListInvestorTypeAndSubtypeSelection = (state) => state.dashboard.listInvestorTypeAndSubtypeSelection;
const selectInvestorBulkUpload = (state) => state.dashboard.isInvestorBulkUpload;
const selectlistByIndivProponent = (state) => state.dashboard.listByIndivProponent;
const selectSelectionByIndivProponent = (state) => state.dashboard.selectionByIndivProponent;
const selectIsSaveCurrentListButtonDeleteDisable = (state) => state.dashboard.isSaveCurrentListButtonDeleteDisable;

// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) => state.dashboard.aumCategorySelection;

const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  holdingdData: SelectHoldingdData(state),
  holdingdDataHeading: SelectHoldingdDataHeading(state),
  isLoading: SelecIsLoading(state),
  allowDownload: selectAllowDownload(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
  tblCompensationComparatorToolData: selectTblCompensationComparatorToolData(state),
  selectionCompensationType: selectSelectionCompensationType(state),
  ddlCompensationType: selectDdlCompensationType(state),
  isComparatorToolLoading: selectIsComparatorToolLoading(state),
  selectionDdlCompensationTenure: selectSelectionDdlCompensationTenure(state),
  ddlCompensationTenure: selectDdlCompensationTenure(state),
  compensatinStartDate: selectCompensatinStartDate(state),
  compensationEndDate: selectCompensationEndDate(state),
  isCompensationDateChecked: selectIsCompensationDateChecked(state),
  ddlDirectortypes: selectDdlDirectortypes(state),
  selectionDirectortypes: selectSelectionDirectortypes(state),
  selectionCompensationIndivisual: selectSelectionCompensationIndivisual(state),
  selectionCompenPeerGroupData: selectselectionCompenPeerGroupData(state),
  // investor search selection
  investorSearchOptionsSelection: selectInvestorSearchOptionsSelection(state),
  investorSelection: selectInvestorSelection(state),
  isInvestorBulkUpload: selectInvestorBulkUpload(state),
  investorSearchOptions: selectInvestorSearchOptions(state),
  showInvestorFilterModel: selectShowInvestorFilterModel(state),
  investorLocationSelection: selectInvestorLocationSelection(state),
  listInvestorTypeAndSubtype: selectListInvestorTypeAndSubtype(state),
  listInvestorTypeAndSubtypeSelection: selectListInvestorTypeAndSubtypeSelection(state),
  listByIndivProponent: selectlistByIndivProponent(state),
  selectionByIndivProponent: selectSelectionByIndivProponent(state),
  isSaveCurrentListButtonDeleteDisable: selectIsSaveCurrentListButtonDeleteDisable(state),
  // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),

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
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  piListOfSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  listOfcompanySearchOptions: selectCompanySearchOptions(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  companySingleSelection: selectCompanySingleSelection(state),
  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),
  invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),

  // selection
  invCompCompanyPeerGroupSelection: SelectInvCompCompanyPeerGroupSelection(state),
  invCompInvestorPeerGroupSelection: SelectInvCompInvestorPeerGroupSelection(state),
  isResetCompanyPeerGroupSelection: SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection: SelectIsResetInvestorPeerGroupSelection(state),
  defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
});
const mapDispatchToProps = {
  HoldingsDataAndAnalyticsListReq: ToolsSlice.HoldingsDataAndAnalyticsListReq,
  getProcedureRunningEstimateTimeReq,
  getCompensationComparatorDataReq,
  handleOnChangeDdlValue,
  handleResetComparatorToolData,
  handleCompensationTenure,
  GetDirectorTypesDataReq,
  handleCompensationDirectorType,
  handleCompensationIndividualSelection,
  handleStartInvCompensationDateSelection,
  handleEndInvCompensationDateSelection,
  handleResetCompensationTools,
  //
  handleIsInvCompendationDateChecked,
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

  handleAumCategorySelection,
  getAumCategorylistReq,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  ResetInvestorSearchOptionSelection,
  // handlePDFListItems,
  // handlePDFMenuShow,
  // handlePDFDownloadLoader,
  // handleGeneratePDF,
  // handlePDFDownloadCancelClick,
  // Filter - Tool Slice
  getDefaultPeerGroupDataReq,
  getAllIndividualProponentReq,
  getAllGroupProponentReq,
  handleProponentGroupsearch,
  getAllMeetingTypeReq,
  handleMeetingTypeSelection,
  handleClearResult,
  handleIsInvCompDateChecked,
  handleSponsorSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleIndividualProponentSelection,
  handleInvestorSearchSelectionInvComp,
  handleComapnySearchSelectionInvComp,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleResetInvestorComparatorTool,
  resolutionsByInvestorFilterReq,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompensationComparatorContainer);
