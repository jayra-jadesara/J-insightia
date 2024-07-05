import PropTypes from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import saveSearchConst from '../../constants/SaveSearchToolConstants';
import CompanyPeerGroupComparisonMatrixTool from '../../components/Tools/VulnerabilityTools/CompanyPeerGroupComparisonMatrixTool';
import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';
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
  handleResetInvestorSelections,
  handleResetCompnaySelections,
} from '../DashboardContainer/DashboardSlice';
import {
  getVulDDLReq,
  HandleTreeView_KeyRatios,
  HandleTreeView_KeyFinancials,
  HandleTreeView_Vulnerability,
  HandleTreeView_Ownership,
  HandleTreeView_Governance,
  HandleTreeView_Voting,
  HandleTreeView_PeerGroupSelection,
  handleInvestorChangePeerGrp,
  handleCompanyChangePeerGrp,
  getPeerGroupDataReq,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  // searchCriteriaVulToolReq,
  getVCIdReq,
  getVulDataListReq,
  handleResetLoading,
  getTokenDecode,
  handleComapnySearchSelectionInvComp,
  getDefaultPeerGroupDataReq,
  handleInvestorSearchSelectionInvComp,
  //
  handleUpdateDataCompanypeergroupcomparisonmatrixFilters,
} from './ToolsSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { ACTIVIST_VULNERABILITY } from '../../constants/ProductConstants';
import { GetPageAccess } from '../../utils/tools-util';
import {
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
} from './General/SaveSearchToolSlice';

const CompanyPeerGroupComparisonMatrixContainer = ({
  token,
  getVulDDLReq,
  getPeerGroupDataReq,
  handleCompanySearchOptionSelection,
  getAllCompanySearchSelection,
  ResetCompanySearchOptionSelection,
  //
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
  companySearchOptionSelection,
  investorSearchOptionsSelection,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  txtMarketCapMinRange,
  txtMarketCapMaxRange,
  companySelection,
  handleReset,
  //
  showFilterModel,
  listOfcompanySearchOptions,
  HandleFilterModel,
  handleCompanySelection,
  handleShowIndividualOption,
  showIndividualOption,
  handleShowGroupOption,
  handleBulkCompanySelection,
  piListIndices,
  handleIndexSelectionChange,
  indexSelection,
  listOfExchange,
  handleExchangeSelectionChange,
  exchangeSelection,
  aiPeerGroups,
  handleAIPeerGroupSelection,
  aiPeerGroupSelection,
  listMarketCap,
  marketCapSelection,
  handleMarketCapSelection,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  handleIndustrySelection,
  industrySelection,
  companyLocationSelection,
  piListOfSectorsAndIndustries,
  HandleTreeViewIndustry,
  listRegeionAndCountries,
  handleSaveCurrentList,
  HandleTreeViewCompanyLocation,
  txtSaveCurrentList,
  saveCurrentListButtonText,
  handleCompanyAndIndustry,
  freeSearchRecordset,
  companySingleSelection,
  handleCompanySearchUpdateReq,
  handleCompanySearchDeleteReq,
  handleCompanySingleSelection,
  handdleRun,
  // //
  DDLKeyFinancials,
  DDLKeyRatios,
  DDLVulnerability,
  DDLOwnership,
  DDLGovernance,
  DDLVoting,
  SetKeyFinancials,
  SetKeyRatios,
  SetVulnerability,
  SetOwnership,
  SetGovernance,
  SetVoting,
  SetPeerGroupSelection,
  DDLPeerGroupSelection,
  HandleTreeView_KeyRatios,
  HandleTreeView_KeyFinancials,
  HandleTreeView_Vulnerability,
  HandleTreeView_Ownership,
  HandleTreeView_Governance,
  HandleTreeView_Voting,
  HandleTreeView_PeerGroupSelection,
  handleInvestorChangePeerGrp,
  handleCompanyChangePeerGrp,
  // searchCriteriaVulToolReq,
  getVCIdReq,
  vcid_VulTool,
  getVulDataListReq,
  VulTool_data,
  VulTool_dataHeader,
  VulTool_dataSummarySelection,
  isLoading,
  handleResetLoading,
  companyPeerGroupSelection,
  vulToolTrialStatus,
  allowDownload,
  getDefaultPeerGroupDataReq,
  // save search
  saveSearchTextboxValue,
  isShow_SaveThisSearch_Modal,
  saveSearch_list,
  saveSearchDDLList,
  saveSearchedDDLSelection,
  //
  ...props
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;

    function getData() {
      getVulDDLReq();
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      listInvestorTypeAndSubtypeReq();
      piListSectorsAndIndustries();
      getCompanySearchOptions();
      getInvestorSearchOptions();
      getCurrentShareholderReq();
      const optionData = {
        comp: companySearchOptionSelection,
        inve: investorSearchOptionsSelection,
      };
      getDefaultPeerGroupDataReq(optionData);
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(
        token.MemberShip,
        ACTIVIST_VULNERABILITY
      );
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getData();
    }
    prepAccess();
  }, [
    getVulDDLReq,
    getCompanySearchOptions,
    getInvestorSearchOptions,
    piListSectorsAndIndustries,
    piListOfIndices,
    allListOfExchange,
    listAIPeerGroup,
    allCountriesAndRegions,
    listInvestorTypeAndSubtypeReq,
    getCurrentShareholderReq,
    getDefaultPeerGroupDataReq,
    investorSearchOptionsSelection,
    companySearchOptionSelection,
  ]);

  // #region Saved search

  useEffect(() => {
    props.userSearchFilter_GetReq({
      filter_type_id: saveSearchConst.COMPANYPEERGROUP_COMPARISON_MATRIX_TOOL,
    });
  }, []);

  const onSavedSearches_btnApply = useCallback(async () => {
    const data = saveSearch_list.filter(
      (x) => x.filter_id === saveSearchedDDLSelection.value
    );
    if (data.length > 0) {
      const filter_definition = JSON.parse(data[0].filter_definition);
      const cmp_search_id = filter_definition.companySearchId;
      await props.handleUpdateDataCompanypeergroupcomparisonmatrixFilters(
        filter_definition
      );
      async function get_cmpData() {
        if (cmp_search_id !== null && getAllCompanySearchSelection) {
          const cmp_data = await getAllCompanySearchSelection(cmp_search_id);
          const obj = {
            value: cmp_data.payload.company_search[0].company_search_id,
            label: cmp_data.payload.company_search[0].Name,
            isSaved: cmp_data.payload.company_search[0].is_saved,
          };
          await props.handleComapnySearchSelectionInvComp(obj);
        } else {
          ResetCompanySearchOptionSelection();
          props.handleResetCompnaySelections();
        }
      }
      get_cmpData();
    }
  }, [props]);

  function filterDataObj() {
    const CHECKED_ALL = 'checked all';
    const depthDDLSetKeyFinancials =
      SetKeyFinancials !== CHECKED_ALL
        ? SetKeyFinancials.map((x) => ({
            _depth: x._depth !== undefined ? x._depth : 0,
            label: x.label,
          }))
        : [];
    const depthDDLSetKeyRatios =
      SetKeyRatios !== CHECKED_ALL
        ? SetKeyRatios.map((x) => ({
            _depth: x._depth !== undefined ? x._depth : 0,
            label: x.label,
          }))
        : [];
    const depthDDLSetVulnerabilitys =
      SetVulnerability !== CHECKED_ALL
        ? SetVulnerability.map((x) => ({
            _depth: x._depth !== undefined ? x._depth : 0,
            label: x.label,
          }))
        : [];
    const depthDDLSetOwnership =
      SetOwnership !== CHECKED_ALL
        ? SetOwnership.map((x) => ({
            _depth: x._depth !== undefined ? x._depth : 0,
            label: x.label,
          }))
        : [];
    const depthDDLSetGovernance =
      SetGovernance !== CHECKED_ALL
        ? SetGovernance.map((x) => ({
            _depth: x._depth !== undefined ? x._depth : 0,
            label: x.label,
          }))
        : [];
    const depthDDLSetVoting =
      SetVoting !== CHECKED_ALL
        ? SetVoting.map((x) => ({
            _depth: x._depth !== undefined ? x._depth : 0,
            label: x.label,
          }))
        : [];
    const data = {
      SetKeyFinancials: depthDDLSetKeyFinancials,
      SetKeyRatios: depthDDLSetKeyRatios,
      SetVulnerability: depthDDLSetVulnerabilitys,
      SetOwnership: depthDDLSetOwnership,
      SetGovernance: depthDDLSetGovernance,
      SetVoting: depthDDLSetVoting,
      SetPeerGroupSelection: SetPeerGroupSelection,
      companySearchId:
        companySearchOptionSelection !== undefined
          ? companySearchOptionSelection.value
          : null,
    };
    return data;
  }
  const onSavedSearches_Create = useCallback(async () => {
    const data = filterDataObj();
    const obj = {
      filter_name: saveSearchTextboxValue,
      filter_definition: JSON.stringify(data),
      filter_type_id: saveSearchConst.COMPANYPEERGROUP_COMPARISON_MATRIX_TOOL,
      privacy: 1,
      permission: 1,
    };
    await props.userSearchFilter_CreateReq(obj);
  }, [props]);

  const onSavedSearches_Update = useCallback(async () => {
    const data = filterDataObj();
    if (saveSearchedDDLSelection) {
      const obj = {
        filter_id: saveSearchedDDLSelection.value,
        filter_name: saveSearchTextboxValue,
        filter_definition: JSON.stringify(data),
        filter_type_id: saveSearchConst.COMPANYPEERGROUP_COMPARISON_MATRIX_TOOL,
        privacy: 1,
        permission: 1,
      };
      await props.userSearchFilter_UpdateReq(obj);
    }
  }, [props]);

  const onSavedSearches_btnDelete = useCallback(async () => {
    const data = {
      filter_id:
        saveSearchedDDLSelection !== null && saveSearchedDDLSelection.value,
      filter_type_id: saveSearchConst.COMPANYPEERGROUP_COMPARISON_MATRIX_TOOL,
    };
    await props.userSearchFilter_DeleteReq(data);
  }, [props]);

  // #endregion

  return (
    <ErrorBoundary>
      <CompanyPeerGroupComparisonMatrixTool
        key='CompanyPeerGroupComparisonMatrixTool'
        {...props}
        companyPeerGroupSelection={companyPeerGroupSelection}
        allIssuers={allIssuers}
        getCompanySearchOptions={getCompanySearchOptions}
        getInvestorSearchOptions={getInvestorSearchOptions}
        getUserDashboardReq={getUserDashboardReq}
        handleClearPeerGroupInvestorSelection={
          handleClearPeerGroupInvestorSelection
        }
        handleClearPeerGroupCompanySelection={
          handleClearPeerGroupCompanySelection
        }
        handleInvestorChangePeerGrp={handleInvestorChangePeerGrp}
        handleCompanyChangePeerGrp={handleCompanyChangePeerGrp}
        ResetCompanySearchOptionSelection={ResetCompanySearchOptionSelection}
        //
        companySearchOptionSelection={companySearchOptionSelection}
        investorSearchOptionsSelection={investorSearchOptionsSelection}
        txtMarketCapMinRange={txtMarketCapMinRange}
        txtMarketCapMaxRange={txtMarketCapMaxRange}
        companySelection={companySelection}
        //
        showFilterModel={showFilterModel}
        listOfcompanySearchOptions={listOfcompanySearchOptions}
        HandleFilterModel={HandleFilterModel}
        handleCompanySelection={handleCompanySelection}
        handleShowIndividualOption={handleShowIndividualOption}
        showIndividualOption={showIndividualOption}
        handleShowGroupOption={handleShowGroupOption}
        handleBulkCompanySelection={handleBulkCompanySelection}
        piListIndices={piListIndices}
        handleIndexSelectionChange={handleIndexSelectionChange}
        indexSelection={indexSelection}
        listOfExchange={listOfExchange}
        handleExchangeSelectionChange={handleExchangeSelectionChange}
        exchangeSelection={exchangeSelection}
        aiPeerGroups={aiPeerGroups}
        handleAIPeerGroupSelection={handleAIPeerGroupSelection}
        aiPeerGroupSelection={aiPeerGroupSelection}
        listMarketCap={listMarketCap}
        marketCapSelection={marketCapSelection}
        handleMarketCapSelection={handleMarketCapSelection}
        handleMarketCapMinRange={handleMarketCapMinRange}
        handleMarketCapMaxRange={handleMarketCapMaxRange}
        handleIndustrySelection={handleIndustrySelection}
        industrySelection={industrySelection}
        companyLocationSelection={companyLocationSelection}
        piListOfSectorsAndIndustries={piListOfSectorsAndIndustries}
        HandleTreeViewIndustry={HandleTreeViewIndustry}
        listRegeionAndCountries={listRegeionAndCountries}
        handleSaveCurrentList={handleSaveCurrentList}
        HandleTreeViewCompanyLocation={HandleTreeViewCompanyLocation}
        txtSaveCurrentList={txtSaveCurrentList}
        saveCurrentListButtonText={saveCurrentListButtonText}
        handleCompanyAndIndustry={handleCompanyAndIndustry}
        freeSearchRecordset={freeSearchRecordset}
        companySingleSelection={companySingleSelection}
        handleCompanySearchUpdateReq={handleCompanySearchUpdateReq}
        handleCompanySearchDeleteReq={handleCompanySearchDeleteReq}
        handleCompanySingleSelection={handleCompanySingleSelection}
        handdleRun={handdleRun}
        //
        DDLKeyFinancials={DDLKeyFinancials}
        DDLKeyRatios={DDLKeyRatios}
        DDLVulnerability={DDLVulnerability}
        DDLOwnership={DDLOwnership}
        DDLGovernance={DDLGovernance}
        DDLVoting={DDLVoting}
        DDLPeerGroupSelection={DDLPeerGroupSelection}
        SetKeyFinancials={SetKeyFinancials}
        SetKeyRatios={SetKeyRatios}
        SetVulnerability={SetVulnerability}
        SetOwnership={SetOwnership}
        SetGovernance={SetGovernance}
        SetVoting={SetVoting}
        SetPeerGroupSelection={SetPeerGroupSelection}
        HandleTreeView_KeyFinancials={HandleTreeView_KeyFinancials}
        HandleTreeView_KeyRatios={HandleTreeView_KeyRatios}
        HandleTreeView_Vulnerability={HandleTreeView_Vulnerability}
        HandleTreeView_Ownership={HandleTreeView_Ownership}
        HandleTreeView_Governance={HandleTreeView_Governance}
        HandleTreeView_Voting={HandleTreeView_Voting}
        HandleTreeView_PeerGroupSelection={HandleTreeView_PeerGroupSelection}
        handleReset={handleReset}
        handleCompanySearchOptionSelection={handleCompanySearchOptionSelection}
        getAllCompanySearchSelection={getAllCompanySearchSelection}
        //
        // searchCriteriaVulToolReq={searchCriteriaVulToolReq}
        getVCIdReq={getVCIdReq}
        vcid_VulTool={vcid_VulTool}
        getVulDataListReq={getVulDataListReq}
        VulTool_data={VulTool_data}
        VulTool_dataHeader={VulTool_dataHeader}
        VulTool_dataSummarySelection={VulTool_dataSummarySelection}
        isLoading={isLoading}
        handleResetLoading={handleResetLoading}
        TrialStatus={vulToolTrialStatus}
        allowDownload={allowDownload}
        // save search
        onSavedSearches_btnApply={onSavedSearches_btnApply}
        onSavedSearches_btnDelete={onSavedSearches_btnDelete}
        onSavedSearches_Create={onSavedSearches_Create}
        onSavedSearches_Update={onSavedSearches_Update}
        isShow_SaveThisSearch_Modal={isShow_SaveThisSearch_Modal}
        saveSearchTextboxValue={saveSearchTextboxValue}
        saveSearch_list={saveSearch_list}
        saveSearchDDLList={saveSearchDDLList}
        saveSearchedDDLSelection={saveSearchedDDLSelection}
      />
    </ErrorBoundary>
  );
};

CompanyPeerGroupComparisonMatrixContainer.propTypes = {
  NewsFilterReq: PropTypes.any,
  allCountriesAndRegions: PropTypes.func,
  allIssuers: PropTypes.any,
  allListOfExchange: PropTypes.func,
  companySearchOptionSelection: PropTypes.any,
  getActivistObjectiveReq: PropTypes.func,
  getCompanySearchOptions: PropTypes.func,
  getCurrentShareholderReq: PropTypes.func,
  getInvestorSearchOptions: PropTypes.func,
  getNewsEventReq: PropTypes.func,
  getPeerGroupDataReq: PropTypes.func,
  getAllCompanySearchSelection: PropTypes.func,
  handleCompanySearchOptionSelection: PropTypes.func,
  ResetCompanySearchOptionSelection: PropTypes.func,
  //
  getStakeholdingReq: PropTypes.func,
  getUserDashboardReq: PropTypes.any,
  handleClearPeerGroupCompanySelection: PropTypes.func,
  handleClearPeerGroupInvestorSelection: PropTypes.func,
  investorSearchOptionsSelection: PropTypes.any,
  listAIPeerGroup: PropTypes.func,
  listInvestorTypeAndSubtypeReq: PropTypes.func,
  piListOfIndices: PropTypes.func,
  piListSectorsAndIndustries: PropTypes.func,
  txtMarketCapMinRange: PropTypes.string,
  txtMarketCapMaxRange: PropTypes.string,
};

CompanyPeerGroupComparisonMatrixContainer.defaultProps = {
  NewsFilterReq: PropTypes.any,
  allCountriesAndRegions: () => {},
  allIssuers: PropTypes.any,
  allListOfExchange: () => {},
  // companySearchOptionSelection: PropTypes.any,
  getActivistObjectiveReq: () => {},
  getCompanySearchOptions: () => {},
  getCurrentShareholderReq: () => {},
  getInvestorSearchOptions: () => {},
  getNewsEventReq: () => {},
  getPeerGroupDataReq: () => {},
  getAllCompanySearchSelection: () => {},
  handleCompanySearchOptionSelection: () => {},
  ResetCompanySearchOptionSelection: () => {},
  //
  getStakeholdingReq: () => {},
  // getUserDashboardReq: PropTypes.any,
  handleClearPeerGroupCompanySelection: () => {},
  handleClearPeerGroupInvestorSelection: () => {},
  // investorSearchOptionsSelection: PropTypes.any,
  listAIPeerGroup: () => {},
  listInvestorTypeAndSubtypeReq: () => {},
  piListOfIndices: () => {},
  piListSectorsAndIndustries: () => {},
  txtMarketCapMinRange: '',
  txtMarketCapMaxRange: '',
};

// #region save search

const selectsaveSearchTextboxValue = (state) =>
  state.saveSearchFilter.saveSearchTextboxValue;
const selectisShow_SaveThisSearch_Modal = (state) =>
  state.saveSearchFilter.isShow_SaveThisSearch_Modal;
const selectsaveSearch_list = (state) => state.saveSearchFilter.saveSearch_list;
const selectsaveSearchDDLList = (state) =>
  state.saveSearchFilter.saveSearchDDLList;
const selectsaveSearchedDDLSelection = (state) =>
  state.saveSearchFilter.saveSearchedDDLSelection;

//#endreion
const SelectVulTool_vulToolTrialStatus = (state) =>
  state.tools.vulToolTrialStatus;
const SelectVulTool_allowDownload = (state) => state.tools.allowDownload;
const SelectVulTool_isLoading = (state) => state.tools.isLoading;
const SelectVulTool_dataSummarySelection = (state) =>
  state.tools.VulTool_dataSummarySelection;
const SelectVulTool_dataHeader = (state) => state.tools.VulTool_dataHeader;
const SelectVulTool_data = (state) => state.tools.VulTool_data;
const SelectVcid_VulTool = (state) => state.tools.vcid_VulTool;
//
const SelectDDLKeyFinancials = (state) => state.tools.DDLKeyFinancials;
const SelectDDLKeyRatios = (state) => state.tools.DDLKeyRatios;
const SelectDDLVulnerability = (state) => state.tools.DDLVulnerability;
const SelectDDLOwnership = (state) => state.tools.DDLOwnership;
const SelectDDLGovernance = (state) => state.tools.DDLGovernance;
const SelectDDLVoting = (state) => state.tools.DDLVoting;
const SelectDDLPeerGroupSelection = (state) =>
  state.tools.DDLPeerGroupSelection;

const SelectSetKeyFinancials = (state) => state.tools.SetKeyFinancials;
const SelectSetKeyRatios = (state) => state.tools.SetKeyRatios;
const SelectSetVulnerability = (state) => state.tools.SetVulnerability;
const SelectSetOwnership = (state) => state.tools.SetOwnership;
const SelectSetGovernance = (state) => state.tools.SetGovernance;
const SelectSetVoting = (state) => state.tools.SetVoting;
const SelectSetPeerGroupSelection = (state) =>
  state.tools.SetPeerGroupSelection;
//
const SelectCompanyPeerGroupSelection = (state) =>
  state.tools.companyPeerGroupSelection;
const SelectInvestorPeerGroupSelection = (state) =>
  state.tools.investorPeerGroupSelection;
const SelectIsResetCompanyPeerGroupSelection = (state) =>
  state.tools.isResetCompanyPeerGroupSelection;
const SelectIsResetInvestorPeerGroupSelection = (state) =>
  state.tools.isResetInvestorPeerGroupSelection;
const SelectFilterByCompanySelection = (state) =>
  state.news.filterByCompanySelection;
const SelectFilterByInvestorSelection = (state) =>
  state.news.filterByInvestorSelection;
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
const selectPIListSectorsAndIndustries = (state) =>
  state.dashboard.piListSectorsAndIndustries;
const selectCompanySearchOptionSelection = (state) =>
  state.dashboard.companySearchOptionSelection;
const selectCompanySearchOptions = (state) =>
  state.dashboard.companySearchOptions;
const selectlistOfcompanySearchOptions = (state) =>
  state.dashboard.companySearchOptions;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectSaveCurrentListButtonText = (state) =>
  state.dashboard.saveCurrentListButtonText;
const selectCompanySingleSelection = (state) =>
  state.dashboard.companySingleSelection;

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
const selectPIListOfSectorsAndIndustries = (state) =>
  state.dashboard.piListSectorsAndIndustries;

const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectInvCompCompanyPeerGroupSelection = (state) =>
  state.tools.invCompCompanyPeerGroupSelection;
//default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) =>
  state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) =>
  state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) =>
  state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) =>
  state.dashboard.defaultPiListSectorsAndIndustries;
//
const SelectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  // #region save search

  saveSearchTextboxValue: selectsaveSearchTextboxValue(state),
  isShow_SaveThisSearch_Modal: selectisShow_SaveThisSearch_Modal(state),
  saveSearch_list: selectsaveSearch_list(state),
  saveSearchDDLList: selectsaveSearchDDLList(state),
  saveSearchedDDLSelection: selectsaveSearchedDDLSelection(state),

  //#endreion
  token: SelectDecodeToken(state),
  vulToolTrialStatus: SelectVulTool_vulToolTrialStatus(state),
  allowDownload: SelectVulTool_allowDownload(state),
  isLoading: SelectVulTool_isLoading(state),

  VulTool_dataSummarySelection: SelectVulTool_dataSummarySelection(state),
  VulTool_dataHeader: SelectVulTool_dataHeader(state),
  VulTool_data: SelectVulTool_data(state),
  vcid_VulTool: SelectVcid_VulTool(state),
  //
  DDLPeerGroupSelection: SelectDDLPeerGroupSelection(state),
  DDLKeyFinancials: SelectDDLKeyFinancials(state),
  DDLKeyRatios: SelectDDLKeyRatios(state),
  DDLVulnerability: SelectDDLVulnerability(state),
  DDLOwnership: SelectDDLOwnership(state),
  DDLGovernance: SelectDDLGovernance(state),
  DDLVoting: SelectDDLVoting(state),
  SetPeerGroupSelection: SelectSetPeerGroupSelection(state),
  SetKeyFinancials: SelectSetKeyFinancials(state),
  SetKeyRatios: SelectSetKeyRatios(state),
  SetVulnerability: SelectSetVulnerability(state),
  SetOwnership: SelectSetOwnership(state),
  SetGovernance: SelectSetGovernance(state),
  SetVoting: SelectSetVoting(state),
  //
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
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
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  piListSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  piListOfSectorsAndIndustries: selectPIListOfSectorsAndIndustries(state),
  listOfcompanySearchOptions: selectlistOfcompanySearchOptions(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  companySingleSelection: selectCompanySingleSelection(state),
  companySearchOptions: selectCompanySearchOptions(state),
  companyPeerGroupSelection: SelectCompanyPeerGroupSelection(state),
  investorPeerGroupSelection: SelectInvestorPeerGroupSelection(state),
  // filter-selection
  isResetCompanyPeerGroupSelection:
    SelectIsResetCompanyPeerGroupSelection(state),
  isResetInvestorPeerGroupSelection:
    SelectIsResetInvestorPeerGroupSelection(state),
  filterByCompanySelection: SelectFilterByCompanySelection(state),
  filterByInvestorSelection: SelectFilterByInvestorSelection(state),

  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),
  invCompCompanyPeerGroupSelection:
    SelectInvCompCompanyPeerGroupSelection(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
  //default selection tree view
  listDefaultInvestorTypeAndSubtype:
    selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries:
    selectDefaultPiListSectorsAndIndustries(state),
});

const mapDispatchToProps = {
  // save search
  userSearchFilter_CreateReq,
  userSearchFilter_UpdateReq,
  userSearchFilter_DeleteReq,
  userSearchFilter_GetReq,
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
  /////
  ResetInvestorSearchOptionSelection,
  getProcedureRunningEstimateTimeReq,

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
  //
  getVulDDLReq,
  HandleTreeView_KeyRatios,
  HandleTreeView_KeyFinancials,
  HandleTreeView_Vulnerability,
  HandleTreeView_Ownership,
  HandleTreeView_Governance,
  HandleTreeView_Voting,
  HandleTreeView_PeerGroupSelection,
  handleInvestorChangePeerGrp,
  handleCompanyChangePeerGrp,
  getPeerGroupDataReq,
  handleClearPeerGroupCompanySelection,
  handleClearPeerGroupInvestorSelection,
  // searchCriteriaVulToolReq,
  getVCIdReq,
  getVulDataListReq,
  handleResetLoading,
  handleComapnySearchSelectionInvComp,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
  getDefaultPeerGroupDataReq,
  handleInvestorSearchSelectionInvComp,
  //
  handleUpdateDataCompanypeergroupcomparisonmatrixFilters,
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyPeerGroupComparisonMatrixContainer)
);
