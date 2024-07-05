import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WidgetStackedBarChart from '../../components/Dashboard/DashboardWidgets/WidgetStackedBarChart';
import WidgetBarChart from '../../components/Dashboard/DashboardWidgets/WidgetBarChart';
import WidgetTable from '../../components/Dashboard/DashboardWidgets/WidgetTable';
import WidgetConstant from '../../constants/WidgetConstant';
import Modal from '../../components/GeneralForm/Modal';
import { demandsImageHandler, dateToNull, validateNulltoEmptyString } from '../../utils/general-util';
import { formatCellEitherMillionsOrPercentExcelDownload } from '../../utils/table-tools-util';
import PathsConstant, {
  DOCS_INSIGHTIA_REDLINE_REPORTS,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW,
  ACTIVISTSHORTS_OVERVIEW,
  COMPANY_OVERVIEW,
  GOVERNANCE_OVERVIEW,
  INVESTOR_OVERVIEW,
  INVESTOR_VOTING_PROFILE,
  QUERY_INVESTOR,
  QUERY_PID,
  ACTIVIST_CAMPAIGNS,
  INVESTOR_ACTIVISM_OVERVIEW,
} from '../../constants/PathsConstant';
import LightBoxPDFViewer from '../../components/GeneralForm/LightBoxPDFViewer';

import { ifUrlExist } from '../../utils/checkURL-util';

import {
  piListOfIndicesReq,
  getListOfExchange,
  getAIPeersGroups,
  getTreeRegionsAndCountries,
  getPIListSectorsAndIndustriesReq,
  searchCompanyAndIndustriesReq,
  getCompanySearchOptions,
  handleShowIndividualOption,
  handleExchangeSelectionChange,
  handleIndexSelectionChange,
  handleAIPeerGroupSelection,
  handleCompanySelection,
  handleCompanySingleSelection,
  handleShowGroupOption,
  handleCompanySearchOptionSelection,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  handleRunReq,
  handleMarketCapSelection,
  handleSaveCurrentList,
  handleSavedPeerGroupsInputChange,
  HandleTreeViewCompanyLocation,
  HandleTreeViewIndustry,
  handleCompanySearchUpdateReq,
  handleCompanySearchDeleteReq,
  getAllCompanySearchSelection,
  HandleFilterModel,
  handleReset,
  ResetCompanySearchOptionSelection,
  getCurrentShareholderReq,
  //
  handleInvestorSavedPeerGroupsInputChange,
  handleInvestorSearchUpdateReq,
  handleSaveInvestorCurrentList,
  ResetInvestorSearchOptionSelection,
  HandleInvestorFilterModel,
  handleByShareholderOfCompany,
  handleInvestorSearchDeleteReq,
  getInvestorSearchOptions,
  handleInvestorSearchOptionSelection,
  HandleTreeViewListInvestorTypeAndSubtype,
  getInvestorSearchSelectionReq,
  HandleTreeViewInvestorLocation,
  handleInvestorSelection,
  searchInvestorsReq,
  handleInvestorIsBulkUpload,
  getAllInvestorsFromShareholderOfCompany,
  handleBulkInvestorSelection,
  //
  HandleDashBoardWidgetIdSet,
  getUserDashboardReq,
  getStoredProcedureReq,
  resetDashboardWidgetInvestorSearchReq,
  resetDashboardWidgetCompanySearchReq,
  getAumCategorylistReq,
  handleAumCategorySelection,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
} from './DashboardSlice';
import WidgetNews from '../../components/Dashboard/DashboardWidgets/WidgetNews';
import WidgetMapTable from '../../components/Dashboard/DashboardWidgets/WidgetMapTable';
import { getUpCommingShareHolderESG } from '../../utils/dashboard-util';

const ComapnyInvestorFilterContainer = ({
  getCompanySearchOptions,
  piListSectorsAndIndustries,
  allIssuers,
  piListOfIndices,
  allListOfExchange,
  listAIPeerGroup,
  allCountriesAndRegions,
  getCurrentShareholderReq,
  //
  getInvestorSearchOptions,
  //
  getUserDashboardReq,
  widgetGraphData,
  dashboardSelectionId,
  dashboard_widget_id,
  dashboard_widget_link_id,
  name,
  isComp,
  isInvest,
  StoredProcedure,
  DownloadStoredProcedure,
  investor_search_id,
  company_search_id,
  getStoredProcedureReq,
  currentSelectionComapanySearchid,
  currentSelectionInvestorSearchid,

  getAumCategorylistReq,
  ...props
}) => {
  const [widgetData, setWidgetData] = useState([]);

  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [linkFileName, setLinkFileName] = useState('');
  const current_year = new Date().getFullYear();
  // modal
  const [isModalPopupVisible, setIsModalPopupVisible] = useState(false);

  const initialisePDFModal = (fileName, desc) => {
    setIsPDFModal(true);
    setPDFFileName(fileName);
    setPDFTitleName(desc);
  };
  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };
  const handleCloseModelPopup = () => {
    setIsModalPopupVisible(false);
  };

  async function checkLink(file_name) {
    let url = file_name;
    if (file_name.search('.pdf') > 0) {
      url = `${DOCS_INSIGHTIA_REDLINE_REPORTS}${file_name}`;
    }
    const exists = await ifUrlExist(url);
    if (exists) {
      return true;
    }

    // otherwise open warning modal
    setIsModalPopupVisible(true);
    // set state for url to continue in modal
    setLinkFileName(file_name);
    return false;
  }

  const widgetDataReturn = useRef({});

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      // await getUserDashboardReq();
      //
      piListOfIndices();
      allListOfExchange();
      listAIPeerGroup();
      allCountriesAndRegions();
      piListSectorsAndIndustries();
      getCurrentShareholderReq();
    }
    getData();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    piListSectorsAndIndustries,
    piListOfIndices,
    allListOfExchange,
    listAIPeerGroup,
    allCountriesAndRegions,
    getCurrentShareholderReq,
    //
    dashboardSelectionId,
    DownloadStoredProcedure,
    currentSelectionComapanySearchid,
    currentSelectionInvestorSearchid,
  ]);

  useEffect(() => {
    async function getDAta() {
      widgetDataReturn.current = await getStoredProcedureReq({
        StoredProcedure,
        dashboard_widget_link_id,
      });
      getCompanySearchOptions();
      //
      getInvestorSearchOptions();
      setWidgetData(widgetDataReturn.current.payload.orgData);
    }
    getDAta();
  }, [getStoredProcedureReq, StoredProcedure, dashboard_widget_link_id, currentSelectionComapanySearchid,
    currentSelectionInvestorSearchid]);
  let widgetHeaders = [];
  let widgetPinnedHeaders = [];
  const widgetPaggination = { isPagging: true, pageSize: 5 };
  const widgetPagginationFalse = { isPagging: false };
  const paggingFour = { isPagging: true, pageSize: 4 };
  const groupHeaderHeight = 15;
  let isCompanyFilterd = false;
  let isInvestorFilter = false;
  let cmpFiltervalue = null;
  let invFiltervalue = null;

  // popup section
  const [show, setShow] = useState(false);
  const [timelineDesc, setTimelineDesc] = useState('');

  // const handleCloseModelPopup = () => {
  //   setShow(false);
  // };

  const date = new Date();

  function get_Filter(dashboardWidgetLinkId) {
    props.dashboardSelection.filter((item) => {
      if (item.dashboard_widget_link_id === dashboardWidgetLinkId) {
        if (item.company_search_id !== null && item.investor_search_id !== null) {
          isCompanyFilterd = true;
          isInvestorFilter = true;
          cmpFiltervalue = item.company_search_id;
          invFiltervalue = item.investor_search_id;
        } else if (item.company_search_id !== null && item.investor_search_id === null) {
          isCompanyFilterd = true;
          isInvestorFilter = false;
          cmpFiltervalue = item.company_search_id;
          invFiltervalue = item.investor_search_id;
        } else if (item.company_search_id === null && item.investor_search_id !== null) {
          isCompanyFilterd = false;
          isInvestorFilter = true;
          cmpFiltervalue = item.company_search_id;
          invFiltervalue = item.investor_search_id;
        }
      }
    });
  }

  let finalData;
  let inVisibleColumns;
  function removedNullColumnsFromResults(data) {
    try {
      const rmColumnResult = data;
      if (rmColumnResult && rmColumnResult.length) {
        rmColumnResult.forEach((element) => validateNulltoEmptyString(element));
      }
      return rmColumnResult;
    } catch (error) {
      console.log(error);
    }
  }
  function getInVisibleColumns(data) {
    const objKeys = Object.keys(data[0]);
    const arrayData = [];
    objKeys.filter((item) => {
      if (data.filter((e) => e[item] !== '').length === 0) {
        arrayData.push(item);
      }
    });
    return arrayData;
  }

  switch (Number(dashboard_widget_id)) {
    case WidgetConstant.ACTIVIST_CAMPAIGN_WEBSITES:
      widgetHeaders = [
        {
          field: 'Investor',
          minWidth: 240,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.Investor_Id}`}>
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 100,
        },
        {
          headerName: 'Link',
          field: 'Link',
          minWidth: 100,
          cellRendererFramework: (params) => (
            <div>
              {params.data.Link !== undefined && (
                <a
                  className='link-primary text-secondary'
                  href={params.data.Link.includes('http') ? params.data.Link : `https://${params.data.Link}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.MOST_VULNERABLE_COMPANIES:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Sector',
          field: 'industry_sector_name',
          minWidth: 180,
        },
        {
          headerName: 'Vulnerability Score',
          field: 'score',
          minWidth: 150,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={false}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.INVESTOR_POLICY_CHANGES:
      widgetHeaders = [
        {
          headerName: 'Investor',
          field: 'voting_policy',
        },
        {
          headerName: 'Date',
          field: 'date',
          maxWidth: 120,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Redline Report',
          field: 'redline_report',
          maxWidth: 105,
          cellRendererFramework: (params) => (
            <button
              type='button'
              className='btn btn-primary btn-grid'
              onClick={() => {
                checkLink(params.data.redline_report).then((exists) => {
                  if (exists) {
                    initialisePDFModal(params.data.redline_report);
                  }
                });
              }}
            >
              Show
            </button>
          ),
        },
        {
          headerName: 'Change Summary',
          field: 'change_summary',
          maxWidth: 120,
          cellRendererFramework: (params) => (
            <div>
              {params.data.investor_id && (
                <a
                  className='link-primary text-secondary'
                  href={`${INVESTOR_VOTING_PROFILE}${QUERY_INVESTOR}${params.data.investor_id}`}
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <>
          <LightBoxPDFViewer
            handleCloseModelPopup={handlePDFModal}
            viewModalPopup={isPDFModal}
            handleSetBtnIdForExpandData={handlePDFModal}
            viewPDFFileName={`${DOCS_INSIGHTIA_REDLINE_REPORTS}${pdfFileName}`}
            pdfTitle={pdfTitleName}
            IsShowCard
            isShowFooter
          />

          <WidgetTable
            {...props}
            dashboard_widget_link_id={dashboard_widget_link_id}
            dashboardSelectionId={dashboardSelectionId}
            cardTitle={name}
            widgetHeaders={widgetHeaders}
            widgetPinnedHeaders={widgetPinnedHeaders}
            widgetPaggination={widgetPaggination}
            getUserDashboardReq={getUserDashboardReq}
            getInvestorSearchOptions={getInvestorSearchOptions}
            getCompanySearchOptions={getCompanySearchOptions}
            isComp={isComp}
            isInvest={isInvest}
            widgetData={widgetData}
            DownloadStoredProcedure={DownloadStoredProcedure}
            StoredProcedure={StoredProcedure}
            isCompanyFilterd={isCompanyFilterd}
            isInvestorFilter={isInvestorFilter}
            dashboard_widget_id={dashboard_widget_id}
            cmpFiltervalue={cmpFiltervalue}
            invFiltervalue={invFiltervalue}
          />
        </>
      );
    case WidgetConstant.PROXY_ADVISOR_RECOMMENDATION:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Meeting Date',
          field: 'meeting_date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Proposal Detail',
          field: 'proposal_detail',
          minWidth: 250,
        },
        {
          headerName: 'Proxy Adviser',
          field: 'proxy_advisor',
          minWidth: 200,
        },
        {
          headerName: 'Recommendation',
          field: 'Recommendation',
          minWidth: 160,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.RIGHTS_AGREEMENT_ADOPTION:
      widgetHeaders = [
        {
          headerName: 'Adopted Date',
          field: 'adopted',
          minWidth: 120,
          maxWidth: 120,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.adopted, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 150,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${PathsConstant.GOVERNANCE_OVERVIEW}?pid=${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Ownership Threshold',
          field: 'Ownership_Threshold',
          minWidth: 140,
        },
        {
          headerName: 'Final Expiration Date',
          field: 'final_expiration',
          minWidth: 140,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.final_expiration, 'dd-mmm-yy')}</div>,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.CHARTER_AMENDMENT:
      widgetHeaders = [
        {
          field: 'Date',
          maxWidth: 140,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Date, 'dd-mmm-yy')}</div>,
        },
        {
          field: 'Company',
          columnWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${PathsConstant.GOVERNANCE_OVERVIEW}?pid=${params.data.PID}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          field: 'Categories',
          autoHeight: true,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ACTIVIST_DIRECTOR_NOMINATION:
      widgetHeaders = [
        {
          headerName: 'Nomination Date',
          field: 'date_of_nomination',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.date_of_nomination, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Investor',
          field: 'investor_name',
          minWidth: 190,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}?investor=${params.data.investor_id}`}>
                {params.data.investor_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 190,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Nominee',
          field: 'director_name',
          minWidth: 150,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.MEETING:
      widgetHeaders = [
        {
          headerName: 'Meeting Date',
          field: 'Meeting_Date',
          maxWidth: 130,
          minWidth: 130,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Meeting_Date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Meeting Type',
          field: 'Meeting_Type',
          maxWidth: 120,
          minWidth: 120,
        },
        {
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 150,
        },
        {
          headerName: 'Proxy Statement Link',
          field: 'proxy_statement',
          minWidth: 120,
          cellRendererFramework: (params) => (
            <a
              className='link-primary text-secondary'
              href={params.data.proxy_statement}
              target='_blank'
              rel='noopener noreferrer'
            >
              View
            </a>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.VOTING_MEETINGS:
      widgetHeaders = [
        {
          headerName: 'Meeting Date',
          field: 'Meeting_Date',
          maxWidth: 100,
          minWidth: 100,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Meeting_Date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Meeting Type',
          field: 'Meeting_Type',
          maxWidth: 100,
          minWidth: 100,
        },
        {
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 200,
        },
        {
          headerName: 'Proxy Statement Link',
          field: 'proxy_statement',
          minWidth: 120,
          cellRendererFramework: (params) => (
            <a
              className='link-primary text-secondary'
              href={params.data.proxy_statement}
              target='_blank'
              rel='noopener noreferrer'
            >
              View
            </a>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
        />
      );
    case WidgetConstant.TOP_ACTIVIST_SHORT_SELLERS:
      widgetHeaders = [
        {
          headerName: 'Investor',
          field: 'investor_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
                {params.data.investor_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Recent Campaigns (past year)',
          field: 'num_short_campaigns',
          minWidth: 150,
        },
        {
          headerName: 'Average One Week Campaign Return %',
          field: 'one_week_avg',
          minWidth: 150,
          cellRendererFramework: (params) => <>{params.data.one_week_avg !== undefined && params.data.one_week_avg !== null ? params.data.one_week_avg.toFixed(1) : ''}</>,
        },
        {
          headerName: 'Average One Month Campaign Return %',
          field: 'one_month_avg',
          minWidth: 150,
          cellRendererFramework: (params) => <>{params.data.one_month_avg !== undefined && params.data.one_month_avg !== null ? params.data.one_month_avg.toFixed(1) : ''}</>,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={false}
          isInvest={false}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.KEY_PROPOSALS:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 230,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Meeting Results Filing Date',
          field: 'meeting_date',
          minWidth: 180,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Proposal Details',
          field: 'proposal_detail',
          minWidth: 260,
        },
        {
          headerName: 'Proponent (S/M)',
          field: 'proponent',
          minWidth: 150,
        },
        {
          headerName: 'For (%)',
          field: 'for_pcent_all',
          type: 'rightAligned',
          minWidth: 130,
        },
        {
          field: 'Link',
          cellRendererFramework: (params) => (
            <div>
              {params.data.Link !== undefined && (
                <a
                  className='link-primary text-secondary'
                  href={params.data.Link.includes('http') ? params.data.Link : `https://${params.data.Link}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ACTIVIST_SHORT_CAMPAIGN:
      widgetHeaders = [
        {
          headerName: 'Date',
          field: 'date',
          minWidth: 130,
          maxWidth: 130,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Investor',
          field: 'investor_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
                {params.data.investor_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Allegations',
          field: 'all_allegations',
          minWidth: 280,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ACTIVIST_SHORT_CAMPAIGN_CHART:
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetBarChart
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          xAxisName='Year'
          yAxisName='Number of Activist Short Campaigns'
          keys={['CampaignCount']}
          xkeysLabel='ActionYear'
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.MOST_SHORTED_STOCKS:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'company_hq',
          minWidth: 130,
          maxWidth: 130,
        },
        {
          headerName: 'Shares Shorted (%)',
          field: 'total_short',
          type: 'rightAligned',
          minWidth: 150,
          maxWidth: 150,
          cellRendererFramework: (params) => <>{params.data.total_short !== undefined && params.data.total_short !== null ? params.data.total_short.toFixed(1) : ''}</>,
        },
        {
          headerName: 'Current Short Positions',
          field: 'count_short',
          type: 'rightAligned',
          minWidth: 170,
          maxWidth: 170,
        },
        {
          headerName: 'Sector',
          field: 'sector',
          minWidth: 130,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={false}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.RECENTLY_NOTIFIED_SHORT_POSITIONS:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 270,
          // cellRendererFramework: (params) => (
          //   <div>
          //     <Link className='text-secondary' to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
          //       {params.data.company_name}
          //     </Link>
          //   </div>
          // )
        },
        {
          headerName: 'Company HQ',
          field: 'company_hq',
          minWidth: 200,
          maxWidth: 200,
        },
        {
          headerName: 'Date Announced',
          field: 'announce_date',
          minWidth: 195,
          maxWidth: 195,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.announce_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Investor',
          field: 'investor_name',
          minWidth: 400,
          maxWidth: 420,
          // cellRendererFramework: (params) => (
          //   <div>
          //     <Link
          //       className='text-secondary'
          //       to={`${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
          //     >
          //       {params.data.investor_name}
          //     </Link>
          //   </div>
          // )
        },
        {
          headerName: 'Date of Initial Position',
          field: 'initial_date',
          minWidth: 240,
          maxWidth: 240,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.initial_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Initial Position (%)',
          field: 'initial_position',
          minWidth: 240,
        },
        {
          headerName: 'Latest Disclosed Position (%)',
          field: 'latest_position',
          minWidth: 210,
        },
        {
          headerName: 'Change Since Last Notified',
          field: 'change_since_last_notified',
          minWidth: 210,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.TIMELINES_SHORTS:
      widgetHeaders = [
        {
          headerName: 'Date',
          field: 'summary_date',
          minWidth: 150,
          maxWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.summary_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: 200,
          maxWidth: 250,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Timeline',
          field: 'timeline',
          cellClass: 'ws-normal-lh24',
          autoHeight: true,
          // minWidth: 500,
          // cellStyle: { overflow: 'auto', height: '30px' },
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPagginationFalse}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={false}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ACTIVIST_CAMPAIGNS_CHART:
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetBarChart
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          xAxisName='Year'
          yAxisName='Number of Activist Campaigns'
          keys={['CampaignCount']}
          xkeysLabel='ActionYear'
          ykeysLabel='CampaignCount'
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.RIGHTS_AGREEMENT_ADOPTION_CHART:
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetBarChart
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          xAxisName='Years'
          yAxisName='Number of Adopted Poison Pills'
          keys={['Num_Adopted']}
          xkeysLabel='Years'
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.CONTACT_CHANGES:
      widgetHeaders = [
        {
          headerName: 'Investor Name',
          field: 'investor_name',
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
                {params.data.investor_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Name',
          field: 'name',
        },
        {
          headerName: 'Date Started',
          field: 'date_started',
          cellRendererFramework: (params) => <div>{dateToNull(params.data.date_started, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Link',
          field: 'link',
          cellRendererFramework: (params) => (
            <div>
              {params.data.link !== undefined && (
                <a
                  className='link-primary text-secondary'
                  href={`mailto:${params.data.link}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.AUDITOR_APPOINTMENT:
      widgetHeaders = [
        {
          headerName: 'Date',
          field: 'year_from',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.year_from, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 250,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${GOVERNANCE_OVERVIEW}?pid=${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Auditor',
          field: 'auditor_name',
          minWidth: 220,
        },
      ];
      widgetPinnedHeaders = [
        {
          colId: 'From_Date',
          pinned: 'left',
        },
        {
          colId: 'Company',
          pinned: 'left',
        },
        {
          colId: 'Auditor_Name',
          pinned: 'left',
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.AUDITOR_RESIGNATION:
      widgetHeaders = [
        {
          headerName: 'To Date',
          field: 'year_to',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.year_to, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 250,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Auditor Name',
          field: 'auditor_name',
          minWidth: 250,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.TIMELINES_ACTIVISM: // latest timeline
      widgetHeaders = [
        {
          field: 'Date',
          minWidth: 120,
          maxWidth: 120,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Date, 'dd-mmm-yy')}</div>,
        },
        {
          field: 'Investor',
          minWidth: 280,
          maxWidth: 380,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.Investor_id}`}>
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          field: 'Company',
          minWidth: 200,
          maxWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 200,
        },
        {
          headerName: 'Timeline',
          field: 'Timeline',
          cellClass: 'ws-normal-lh24',
          autoHeight: true,
          minWidth: 500,
          // cellStyle: { overflowY: 'scroll', height: 'inherit' }
          cellStyle: { overflow: 'auto', height: '30px' },
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <>
          <WidgetTable
            {...props}
            dashboard_widget_link_id={dashboard_widget_link_id}
            dashboardSelectionId={dashboardSelectionId}
            cardTitle={name}
            widgetHeaders={widgetHeaders}
            widgetPinnedHeaders={widgetPinnedHeaders}
            widgetPaggination={paggingFour}
            getUserDashboardReq={getUserDashboardReq}
            getInvestorSearchOptions={getInvestorSearchOptions}
            getCompanySearchOptions={getCompanySearchOptions}
            isComp={isComp}
            isInvest={isInvest}
            widgetData={widgetData}
            DownloadStoredProcedure={DownloadStoredProcedure}
            StoredProcedure={StoredProcedure}
            isCompanyFilterd={isCompanyFilterd}
            isInvestorFilter={isInvestorFilter}
            dashboard_widget_id={dashboard_widget_id}
            cmpFiltervalue={cmpFiltervalue}
            invFiltervalue={invFiltervalue}
          />

          {show ? (
            <Modal
              title='Timeline Description'
              handleClose={handleCloseModelPopup}
              show={show}
              id='displayModal'
              aria-labelledby='modelLightBox' // contained-modal-title-vcenter"
              onHide={handleCloseModelPopup}
              backdrop='static' // false then no background black
              keyboard // true => Close the modal when escape key is pressed
              centered
              scrollable
            >
              <div>({timelineDesc})</div>
            </Modal>
          ) : (
            ''
          )}
        </>
      );

    case WidgetConstant.NEW_ACTIVIST_INVESTORS:
      widgetHeaders = [
        {
          field: 'Investor',
          cellRendererFramework: (params) => (
            <div>
              <Link
                className='text-secondary'
                to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.Investor_id}`}
              >
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Investor HQ',
          field: 'Company_HQ',
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={paggingFour}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );

    case WidgetConstant.ACTIVIST_CAMPAIGNS: // latest Activist Campaigns
    finalData = removedNullColumnsFromResults(widgetData);
    inVisibleColumns = finalData !== undefined && finalData !== null && finalData.length > 0 && getInVisibleColumns(finalData);
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
          colId: 'Company',
        },
        {
          headerName: 'Investors',
          field: 'investors',
          minWidth: 200,
          cellRendererFramework: (params) => {
            if (!params.data.investors) {
              return null;
            }
            const obj = JSON.parse(params.data.investors);
            const oMap = (obj.investors && obj.investors.length > 0) && obj.investors.map((o) => (
              <span>
                <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${o.investor_id}`}>
                  {o.investor_name}
                </Link>
              </span>
            ));
            const investors = (oMap && oMap.length > 0) ? oMap.map((e, i) => {
              const comma = i === oMap.length - 1 ? <span /> : <span>,</span>;
              return (
                <span>
                  {e}
                  {comma}
                </span>
              );
            })
            : null;
            return investors;
          },
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 150,
        },
        {
          headerName: 'Campaign Start Date',
          field: 'start_camp',
          minWidth: 150,
          cellRendererFramework: (params) => dateToNull(params.data.start_camp, 'dd-mmm-yy'),
        },
        {
          headerName: 'Campaign End Date',
          field: 'end_camp',
          minWidth: 150,
          cellRendererFramework: (params) => dateToNull(params.data.end_camp, 'dd-mmm-yy'),
        },
        {
          headerName: 'Appoint Personnel',
          field: 'appoint_personnel',
          minWidth: 150,
          cellRendererFramework: (params) => (
            <div>
              {params.data.appoint_personnel !== null && params.data.appoint_personnel !== undefined
                ? demandsImageHandler(params.data.appoint_personnel)
                : null}
            </div>
          ),
          // hide: finalData.filter((e) => e.appoint_personnel !== '').length === 0,
        },
        {
          headerName: 'Personnel Removal',
          field: 'remove_personnel',
          minWidth: 150,
          cellRendererFramework: (params) => demandsImageHandler(params.data.remove_personnel),
          // hide: finalData.filter((e) => e.remove_personnel !== '').length === 0,
        },
        {
          headerName: 'Push For M&A',
          field: 'push_for_ma',
          minWidth: 100,
          cellRendererFramework: (params) => demandsImageHandler(params.data.push_for_ma),
          // hide: finalData.filter((e) => e.push_for_ma !== '').length === 0,
        },
        {
          headerName: 'Oppose M&A',
          field: 'oppose_ma',
          minWidth: 100,
          cellRendererFramework: (params) => demandsImageHandler(params.data.oppose_ma),
          // hide: finalData.filter((e) => e.oppose_ma !== '').length === 0,
        },
        {
          headerName: 'Divestiture',
          field: 'divestiture',
          minWidth: 150,
          cellRendererFramework: (params) => demandsImageHandler(params.data.divestiture),
          // hide: finalData.filter((e) => e.divestiture !== '').length === 0,
        },
        {
          headerName: 'Return Cash to Shareholders',
          field: 'return_cash_to_shareholders',
          minWidth: 250,
          cellRendererFramework: (params) => demandsImageHandler(params.data.return_cash_to_shareholders),
          // hide: finalData.filter((e) => e.return_cash_to_shareholders !== '').length === 0,
        },
        {
          headerName: 'Capital Structure',
          field: 'capital_structure',
          minWidth: 100,
          cellRendererFramework: (params) => demandsImageHandler(params.data.capital_structure),
          // hide: finalData.filter((e) => e.capital_structure !== '').length === 0,
        },
        {
          headerName: 'Operational',
          field: 'operational',
          minWidth: 130,
          cellRendererFramework: (params) => demandsImageHandler(params.data.operational),
          // hide: finalData.filter((e) => e.operational !== '').length === 0,
        },

        {
          headerName: 'Remuneration',
          field: 'remuneration',
          minWidth: 130,
          cellRendererFramework: (params) => demandsImageHandler(params.data.remuneration),
          // hide: finalData.filter((e) => e.remuneration !== '').length === 0,
        },
        {
          headerName: 'Environmental',
          field: 'environmental',
          minWidth: 150,
          cellRendererFramework: (params) => demandsImageHandler(params.data.environmental),
          // hide: finalData.filter((e) => e.environmental !== '').length === 0,
        },
        {
          headerName: 'Social',
          field: 'social',
          minWidth: 100,
          cellRendererFramework: (params) => demandsImageHandler(params.data.social),
          // hide: finalData.filter((e) => e.social !== '').length === 0,
        },
        {
          headerName: 'Governance',
          field: 'governance',
          minWidth: 130,
          // hide: finalData.filter((e) => e.governance !== '').length === 0,
          cellRendererFramework: (params) => demandsImageHandler(params.data.governance),
        },
      ];
      // widgetPinnedHeaders = [
      //   {
      //     colId: 'activists',
      //     pinned: 'left',
      //   },
      //   {
      //     colId: 'Company',
      //     pinned: 'left',
      //   },
      // ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={finalData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
          inVisibleColumns={inVisibleColumns}
        />
      );
    case WidgetConstant.BOARD_SEATS_WON: // Board seats won
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetStackedBarChart
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          allKeys={['Settlement_Seats_Won', 'Went_to_Vote_Seats_Won']}
          xkey='Year'
          xAxisName='Year'
          yAxisName='Number of Seats Gained'
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ACTIVIST_CAMPAIGNS_WORLD_MAP: // Board seats won
      widgetHeaders = [
        {
          headerName: 'Company HQ Region',
          field: 'Region_name',
          minWidth: 150,
        },
        {
          headerName: date.getFullYear() - 5,
          field: 'year6',
          type: 'rightAligned',
          flex: 1,
        },
        {
          headerName: date.getFullYear() - 4,
          field: 'year5',
          type: 'rightAligned',
        },
        {
          headerName: date.getFullYear() - 3,
          field: 'year4',
          type: 'rightAligned',
        },
        {
          headerName: date.getFullYear() - 2,
          field: 'year3',
          type: 'rightAligned',
        },
        {
          headerName: date.getFullYear() - 1,
          field: 'year2',
          type: 'rightAligned',
        },
        {
          headerName: date.getFullYear() === current_year ? `${date.getFullYear()} YTD` : date.getFullYear(),
          field: 'year1',
          type: 'rightAligned',
        },
      ];
      widgetPinnedHeaders = [
        {
          colId: 'Region_name',
          pinned: 'left',
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetMapTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          groupHeaderHeight={groupHeaderHeight}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
        />
      );
    case WidgetConstant.DEMAND_OUTCOMES:
      widgetHeaders = [
        {
          field: 'Investor',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <Link
                className='text-secondary'
                to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
              >
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          field: 'Company',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 180,
        },
        {
          field: 'Demand',
          minWidth: 240,
        },
        {
          headerName: 'Demand Date',
          field: 'Demand_date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Demand_date, 'dd-mmm-yy')}</div>,
        },
        {
          field: 'Outcome',
          minWidth: 230,
        },
        {
          headerName: 'Outcome Date',
          field: 'Outcome_date',
          minWidth: 180,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Outcome_date, 'dd-mmm-yy')}</div>,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.EXECUTIVE_DIRECTOR_UPDATES: // personnel changes
      widgetHeaders = [
        {
          headerName: 'Date',
          field: 'CustDate',
          cellRendererFramework: (params) => <div>{dateToNull(params.data.CustDate, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${PathsConstant.GOVERNANCE_DIRECTORS}?pid=${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Name',
          field: 'Dir_Name',
          cellRendererFramework: (params) => (
            <div>
              <Link
                className='text-secondary'
                to={`${PathsConstant.DIRECTORSHIP_AND_EXECUTIVE}?director_id=${params.data.director_id}`}
              >
                {params.data.Dir_Name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Type',
          field: 'director_type',
        },
        {
          headerName: 'Start/End',
          field: 'StartEnd',
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          // isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.EXECUTIVE_DIRECTOR_UPDATES_UPCOMING:
      widgetHeaders = [
        {
          field: 'Date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Date, 'dd-mmm-yy')}</div>,
        },
        {
          field: 'Company',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          field: 'Name',
          minWidth: 180,
        },
        {
          field: 'Type',
          minWidth: 150,
        },
        {
          headerName: 'Start/End',
          field: 'Start_End',
          minWidth: 150,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.VOTING_MEETING_RESULTS:
      widgetHeaders = [
        {
          headerName: 'Meeting Results Filing Date',
          field: 'meeting_results_filing_date',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>{dateToNull(params.data.meeting_results_filing_date, 'dd-mmm-yy')}</div>
          ),
        },

        {
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Meeting Date',
          field: 'meeting_date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy', true)}</div>,
        },
        {
          headerName: 'Meeting Results',
          field: 'meeting_results_link',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <a
                className='link-primary text-secondary'
                href={`${params.data.meeting_results_link}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                View
              </a>
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
        />
      );
    case WidgetConstant.MEETING_RESULTS:
      widgetHeaders = [
        {
          headerName: 'Meeting Results Filing Date',
          field: 'meeting_results_filing_date',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>{dateToNull(params.data.meeting_results_filing_date, 'dd-mmm-yy')}</div>
          ),
        },

        {
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Meeting Date',
          field: 'meeting_date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy', true)}</div>,
        },
        {
          headerName: 'Meeting Results',
          field: 'meeting_results_link',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <a
                className='link-primary text-secondary'
                href={`${params.data.meeting_results_link}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                View
              </a>
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ANNUAL_REPORT:
      widgetHeaders = [
        {
          headerName: 'Annual Report Date',
          field: 'annual_report_filing_date',
          minWidth: 150,
          cellRendererFramework: (params) => (
            <div>{dateToNull(params.data.annual_report_filing_date, 'dd-mmm-yy')}</div>
          ),
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Annual Report',
          field: 'annual_report_link',
          minWidth: 150,
          cellRendererFramework: (params) => (
            <div>
              <a
                className='link-primary text-secondary'
                href={`${params.data.annual_report_link}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                View
              </a>
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.VOTING_PROXY_STATEMENT:
      widgetHeaders = [
        {
          headerName: 'Proxy Statement Filing Date',
          field: 'proxy_date',
          minWidth: 130,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.proxy_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Meeting Date',
          field: 'meeting_date',
          minWidth: 100,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 100,
        },
        {
          headerName: 'Proxy Statement',
          field: 'link',
          minWidth: 150,
          cellRendererFramework: (params) => (
            <div>
              {params.data.link !== undefined && (
                <a
                  className='link-primary text-secondary'
                  href={`${params.data.link}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      widgetPinnedHeaders = [
        {
          colId: 'Proxy_Statement_Filing_Date',
          pinned: 'left',
        },
        {
          colId: 'Meeting_Date',
          pinned: 'left',
        },
        {
          colId: 'Company',
          pinned: 'left',
        },
        {
          colId: 'Company_HQ',
          pinned: 'left',
        },
        {
          colId: 'Link',
          pinned: 'left',
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.PROXY_STATEMENT:
      widgetHeaders = [
        {
          headerName: 'Proxy Statement Filing Date',
          field: 'proxy_date',
          minWidth: 180,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.proxy_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Meeting Date',
          field: 'meeting_date',
          minWidth: 100,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Proxy Statement',
          field: 'link',
          minWidth: 140,
          cellRendererFramework: (params) => (
            <div>
              {params.data.link !== undefined && (
                <a
                  className='link-primary text-secondary'
                  href={`${params.data.link}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      widgetPinnedHeaders = [
        {
          colId: 'Proxy_Statement_Filing_Date',
          pinned: 'left',
        },
        {
          colId: 'Meeting_Date',
          pinned: 'left',
        },
        {
          colId: 'Company',
          pinned: 'left',
        },
        {
          colId: 'Company_HQ',
          pinned: 'left',
        },
        {
          colId: 'Link',
          pinned: 'left',
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.SETTLEMENT_FOR_BOARD_SEATS:
      widgetHeaders = [
        {
          field: 'Investor',
          minWidth: 220,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}>
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          field: 'Company',
          minWidth: 220,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Settlement Date (Outcome Date)',
          field: 'Settelement_Date',
          minWidth: 160,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Settelement_Date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Seats Won',
          field: 'seats_won',
          minWidth: 100,
          maxWidth: 110,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp
          isInvest
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.NOTIFIED_STAKES:
      widgetHeaders = [
        {
          headerName: 'Notified Stake Date',
          field: 'Notified_date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Notified_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Investor',
          field: 'investor_name',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <Link
                className='text-secondary'
                to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.Investor}`}
              >
                {params.data.investor_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Notified Stake Type',
          field: 'Notified_Stake_Type',
          minWidth: 160,
        },
        {
          headerName: 'Notified Stake (%)',
          field: 'Notified_Stake',
          minWidth: 160,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.ACTIVIST_WHITE_PAPER:
      widgetHeaders = [
        {
          field: 'Investor',
          minWidth: 190,
          cellRendererFramework: (params) => (
            <div>
              <Link
                className='text-secondary'
                to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
              >
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          field: 'Date',
          minWidth: 150,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Date, 'dd-mmm-yy')}</div>,
        },
        {
          field: 'Title',
          minWidth: 160,
        },
        {
          field: 'Link',
          minWidth: 100,
          cellRendererFramework: (params) => (
            <div>
              {params.data.Link !== undefined && (
                <a
                  className='link-primary text-secondary'
                  href={`${params.data.Link}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.NEWS:
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetNews
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.DEADLINE_DATE_INCLUSION_IN_PROXY_STATEMENT:
      widgetHeaders = [
        {
          headerName: 'Deadline Date',
          field: 'shareholder_prop_deadline',
          minWidth: 120,
          maxWidth: 180,
          cellRendererFramework: (params) => (
            <div>{dateToNull(params.data.shareholder_prop_deadline, 'dd-mmm-yy')}</div>
          ),
        },
        {
          headerName: 'Previous Meeting Date',
          field: 'meeting_date',
          minWidth: 170,
          maxWidth: 240,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.DEADLINE_DATE_NOT_FOR_INCLUSION_IN_PROXY_STATEMENT:
      widgetHeaders = [
        {
          headerName: 'Deadline Date',
          field: 'nomination_deadline',
          minWidth: 120,
          maxWidth: 180,
          cellRendererFramework: (params) => (
            <div>{dateToNull(params.data.nomination_deadline, 'dd-mmm-yy', true)}</div>
          ),
        },
        {
          headerName: 'Previous Meeting Date',
          field: 'meeting_date',
          minWidth: 170,
          maxWidth: 240,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          field: 'Company',
          minWidth: 180,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.KEY_PROPOSALS_UPCOMING:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'company',
          minWidth: 180,
          maxWidth: 250,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Meeting Date',
          field: 'meeting_date',
          minWidth: 150,
          maxWidth: 180,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.meeting_date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Proposal Details',
          field: 'proposal_detail',
          minWidth: 200,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.PROXY_CONTEST_MEETING:
      widgetHeaders = [
        {
          headerName: 'Investor',
          field: 'investor_name',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link
                className='text-secondary'
                to={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
              >
                {params.data.investor_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company',
          field: 'Company',
          minWidth: 200,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Company_HQ',
          minWidth: 120,
        },
        {
          headerName: 'Scheduled Meeting Date',
          field: 'scheduled_meeting_date',
          minWidth: 180,
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Schedules_Meeting_Date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Seats Proposed',
          field: 'seats_proposed',
          minWidth: 150,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.STANDSTILL_EXPIRY:
      widgetHeaders = [
        {
          field: 'Investor',
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.Investor_Id}`}>
                {params.data.Investor}
              </Link>
            </div>
          ),
        },
        {
          field: 'Company',
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}>
                {params.data.Company}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Settlement Date',
          field: 'Settlement_Date',
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Settlement_Date, 'dd-mmm-yy')}</div>,
        },
        {
          headerName: 'Standstill Expiry Date',
          field: 'Standstill_Expiry_Date',
          cellRendererFramework: (params) => <div>{dateToNull(params.data.Standstill_Expiry_Date, 'dd-mmm-yy')}</div>,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
    case WidgetConstant.RIGHTS_AGREEMENT_EXPIRY:
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetBarChart
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          xAxisName='Years'
          yAxisName='Number of Expired Poison Pills'
          keys={['Expiration']}
          xkeysLabel='Years'
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
      case WidgetConstant.LATEST_COMPENSATION_RELEASES:
      widgetHeaders = [
        {
          headerName: 'Company',
          field: 'Company_name',
          minWidth: 240,
          cellRendererFramework: (params) => (
            <div>
              <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                {params.data.Company_name}
              </Link>
            </div>
          ),
        },
        {
          headerName: 'Company HQ',
          field: 'Country_name',
          minWidth: 120,
        },
        {
          headerName: 'Date',
          field: 'filing_date',
          cellRendererFramework: (params) => <div>{dateToNull(params.data.filing_date, 'dd-mmm-yy')}</div>,
          minWidth: 180,
        },
        {
          headerName: 'Filing Type',
          field: 'filing_type',
          minWidth: 240,
        },
      ];
      get_Filter(Number(dashboard_widget_link_id));
      return (
        <WidgetTable
          {...props}
          dashboard_widget_link_id={dashboard_widget_link_id}
          dashboardSelectionId={dashboardSelectionId}
          cardTitle={name}
          widgetHeaders={widgetHeaders}
          widgetPinnedHeaders={widgetPinnedHeaders}
          widgetPaggination={widgetPaggination}
          getUserDashboardReq={getUserDashboardReq}
          getInvestorSearchOptions={getInvestorSearchOptions}
          getCompanySearchOptions={getCompanySearchOptions}
          isComp={isComp}
          // isInvest={isInvest}
          widgetData={widgetData}
          DownloadStoredProcedure={DownloadStoredProcedure}
          StoredProcedure={StoredProcedure}
          isCompanyFilterd={isCompanyFilterd}
          isInvestorFilter={isInvestorFilter}
          dashboard_widget_id={dashboard_widget_id}
          cmpFiltervalue={cmpFiltervalue}
          invFiltervalue={invFiltervalue}
        />
      );
      case WidgetConstant.LATEST_CEO_PAY_RATIO:
        widgetHeaders = [
          {
            headerName: 'Company',
            field: 'Company_name',
            minWidth: 250,
            cellRendererFramework: (params) => (
              <div>
                <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                  {params.data.Company_name}
                </Link>
              </div>
            ),
          },
          {
            headerName: 'Filing Date',
            field: 'filing_date',
            minWidth: 150,
            cellRendererFramework: (params) => <div>{dateToNull(params.data.filing_date, 'dd-mmm-yy')}</div>,
          },
          {
            headerName: 'CEO Name',
            field: 'director_name',
            minWidth: 250,
            cellRendererFramework: (params) => (
              <div>
                <Link
                  className='text-secondary'
                  to={`${PathsConstant.PEOPLE_OVERVIEW}${PathsConstant.QUERY_DIRECTOR}${params.data.director_id}`}
                >
                  {params.data.director_name}
                </Link>
              </div>
            ),
          },
          {
            headerName: 'CEO Pay',
            field: 'CEO_pay',
            minWidth: 100,
            cellRendererFramework: (params) => <div>{formatCellEitherMillionsOrPercentExcelDownload(params.data.CEO_pay, false, params.data.CEO_pay, false)}</div>,
          },
          {
            headerName: 'Median Employee Pay',
            field: 'median_employee_pay',
            minWidth: 160,
            cellRendererFramework: (params) => <div>{formatCellEitherMillionsOrPercentExcelDownload(params.data.median_employee_pay, false, params.data.median_employee_pay, false)}</div>,
          },
          {
            headerName: 'CEO Pay Ratio',
            field: 'CEO_pay_ratio',
            minWidth: 160,
            cellRendererFramework: (params) => <>{params.data.CEO_pay_ratio !== undefined && params.data.CEO_pay_ratio !== null ? params.data.CEO_pay_ratio.toFixed(1) : ''}</>,
          },
        ];
        get_Filter(Number(dashboard_widget_link_id));
        return (
          <WidgetTable
            {...props}
            dashboard_widget_link_id={dashboard_widget_link_id}
            dashboardSelectionId={dashboardSelectionId}
            cardTitle={name}
            widgetHeaders={widgetHeaders}
            widgetPinnedHeaders={widgetPinnedHeaders}
            widgetPaggination={widgetPaggination}
            getUserDashboardReq={getUserDashboardReq}
            getInvestorSearchOptions={getInvestorSearchOptions}
            getCompanySearchOptions={getCompanySearchOptions}
            isComp={isComp}
            isInvest={isInvest}
            widgetData={widgetData}
            DownloadStoredProcedure={DownloadStoredProcedure}
            StoredProcedure={StoredProcedure}
            isCompanyFilterd={isCompanyFilterd}
            isInvestorFilter={isInvestorFilter}
            dashboard_widget_id={dashboard_widget_id}
            cmpFiltervalue={cmpFiltervalue}
            invFiltervalue={invFiltervalue}
          />
        );
      case WidgetConstant.TOP20_HIGHEST_PAID_EXECUTIVES:
        widgetHeaders = [
          {
            headerName: 'Name',
            field: 'Director_Name',
            minWidth: 250,
            cellRendererFramework: (params) => (
              <div>
                <Link
                  className='text-secondary'
                  to={`${PathsConstant.PEOPLE_OVERVIEW}${PathsConstant.QUERY_DIRECTOR}${params.data.director_id}`}
                >
                  {params.data.Director_Name}
                </Link>
              </div>
            ),
          },
          {
            headerName: 'Company',
            field: 'Company_name',
            minWidth: 250,
            cellRendererFramework: (params) => (
              <div>
                <Link className='text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}`}>
                  {params.data.Company_name}
                </Link>
              </div>
            ),
          },
          {
            headerName: 'Total Compensation',
            field: 'Total_Compensation',
            minWidth: 200,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Total_Compensation !== undefined &&
                  params.data.Total_Compensation !== '' &&
                  params.data.Total_Compensation !== null) {
                let finalCellVal = '';
                if (params.data.symbol && params.data.symbol !== undefined &&
                    params.data.symbol !== '') {
                  finalCellVal = `${params.data.symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Total_Compensation, false, params.data.Total_Compensation, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Total_Compensation, false, params.data.Total_Compensation, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: '% Change from Previous Year',
            field: 'Change_from_Previous_Year',
            minWidth: 250,
            // cellClassRules: {
            //   redFont: (params) => params.data.Change_from_Previous_Year !== undefined && params.data.Change_from_Previous_Year < 0,
            //   greenFont: (params) => params.data.Change_from_Previous_Year !== undefined && params.data.Change_from_Previous_Year > 0,
            // },
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Change_from_Previous_Year !== '' && params.data.Change_from_Previous_Year !== null) {
                let colorTFR = '';
                if (params.data.Change_from_Previous_Year < 0) {
                  colorTFR = 'text-danger';
                } else if (params.data.Change_from_Previous_Year > 0) {
                  colorTFR = 'text-green';
                } else {
                  colorTFR = 'text-primary';
                }
                eDiv.innerHTML += `<div class="${colorTFR}">${params.data.Change_from_Previous_Year !== '' ? `${params.data.Change_from_Previous_Year.toFixed(1)}%` : ''}</div>`;
                return eDiv;
              }
              eDiv.innerHTML +=
                '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
        ];
        get_Filter(Number(dashboard_widget_link_id));
        return (
          <WidgetTable
            {...props}
            dashboard_widget_link_id={dashboard_widget_link_id}
            dashboardSelectionId={dashboardSelectionId}
            cardTitle={name}
            widgetHeaders={widgetHeaders}
            widgetPinnedHeaders={widgetPinnedHeaders}
            widgetPaggination={widgetPaggination}
            getUserDashboardReq={getUserDashboardReq}
            getInvestorSearchOptions={getInvestorSearchOptions}
            getCompanySearchOptions={getCompanySearchOptions}
            isComp={isComp}
            isInvest={isInvest}
            widgetData={widgetData}
            DownloadStoredProcedure={DownloadStoredProcedure}
            StoredProcedure={StoredProcedure}
            isCompanyFilterd={isCompanyFilterd}
            isInvestorFilter={isInvestorFilter}
            dashboard_widget_id={dashboard_widget_id}
            cmpFiltervalue={cmpFiltervalue}
            invFiltervalue={invFiltervalue}
          />
        );
      case WidgetConstant.AVERAGE_GLOBAL_CEO_PAY_BREAKDOWN_REALIZED:
        widgetHeaders = [
          {
            headerName: 'Region',
            field: 'Country',
            minWidth: 200,
          },
          {
            headerName: 'Index',
            field: 'index_name',
            minWidth: 150,
          },
          {
            headerName: 'Salary',
            field: 'Base_Salary',
            minWidth: 250,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Base_Salary !== undefined && params.data.Base_Salary !== '' && params.data.Base_Salary !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Base_Salary, false, params.data.Base_Salary, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Base_Salary, false, params.data.Base_Salary, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Benefits',
            field: 'Benefits_Expense',
            minWidth: 100,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Benefits_Expense !== undefined && params.data.Benefits_Expense !== '' && params.data.Benefits_Expense !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Benefits_Expense, false, params.data.Benefits_Expense, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Benefits_Expense, false, params.data.Benefits_Expense, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Pension',
            field: 'Pension_Actual',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Pension_Actual !== undefined && params.data.Pension_Actual !== '' && params.data.Pension_Actual !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Pension_Actual, false, params.data.Pension_Actual, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Pension_Actual, false, params.data.Pension_Actual, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Cash Bonus',
            field: 'Cash_Bonus',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Cash_Bonus !== undefined && params.data.Cash_Bonus !== '' && params.data.Cash_Bonus !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Cash_Bonus, false, params.data.Cash_Bonus, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Cash_Bonus, false, params.data.Cash_Bonus, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Non-Equity Incentive Plan',
            field: 'NEIP',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.NEIP !== undefined && params.data.NEIP !== '' && params.data.NEIP !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.NEIP, false, params.data.NEIP, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.NEIP, false, params.data.NEIP, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Shares Vested',
            field: 'Shares',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Shares !== undefined && params.data.Shares !== '' && params.data.Shares !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Shares, false, params.data.Shares, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Shares, false, params.data.Shares, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Options Exercised',
            field: 'Options',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Options !== undefined && params.data.Options !== '' && params.data.Options !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Options, false, params.data.Options, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Options, false, params.data.Options, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Severence',
            field: 'Severence_Amounts',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Severence_Amounts !== undefined && params.data.Severence_Amounts !== '' && params.data.Severence_Amounts !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Severence_Amounts, false, params.data.Severence_Amounts, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Severence_Amounts, false, params.data.Severence_Amounts, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Sign on Bonus',
            field: 'Sign_on_Bonus',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Sign_on_Bonus !== undefined && params.data.Sign_on_Bonus !== '' && params.data.Sign_on_Bonus !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Sign_on_Bonus, false, params.data.Sign_on_Bonus, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Sign_on_Bonus, false, params.data.Sign_on_Bonus, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
          {
            headerName: 'Total',
            field: 'Total_Actual',
            minWidth: 160,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Total_Actual !== undefined && params.data.Total_Actual !== '' && params.data.Total_Actual !== null) {
                let finalCellVal = '';
                if (params.data.currency_symbol && params.data.currency_symbol !== undefined && params.data.currency_symbol !== '') {
                  finalCellVal = `${params.data.currency_symbol}${formatCellEitherMillionsOrPercentExcelDownload(params.data.Total_Actual, false, params.data.Total_Actual, false)}`;
                } else {
                  finalCellVal = formatCellEitherMillionsOrPercentExcelDownload(params.data.Total_Actual, false, params.data.Total_Actual, false);
                }
                eDiv.innerHTML += `<div>${finalCellVal}</div>`;
                return eDiv;
              }
              eDiv.innerHTML += '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
        ];
        get_Filter(Number(dashboard_widget_link_id));
        return (
          <WidgetTable
            {...props}
            dashboard_widget_link_id={dashboard_widget_link_id}
            dashboardSelectionId={dashboardSelectionId}
            cardTitle={name}
            widgetHeaders={widgetHeaders}
            widgetPinnedHeaders={widgetPinnedHeaders}
            widgetPaggination={widgetPaggination}
            getUserDashboardReq={getUserDashboardReq}
            getInvestorSearchOptions={getInvestorSearchOptions}
            getCompanySearchOptions={getCompanySearchOptions}
            isComp={isComp}
            isInvest={isInvest}
            widgetData={widgetData}
            DownloadStoredProcedure={DownloadStoredProcedure}
            StoredProcedure={StoredProcedure}
            isCompanyFilterd={isCompanyFilterd}
            isInvestorFilter={isInvestorFilter}
            dashboard_widget_id={dashboard_widget_id}
            cmpFiltervalue={cmpFiltervalue}
            invFiltervalue={invFiltervalue}
          />
        );
    default:
      return <h1> No Widget Data</h1>;
  }
};

ComapnyInvestorFilterContainer.propTypes = {
  allCountriesAndRegions: PropTypes.func,
  allIssuers: PropTypes.func,
  allListOfExchange: PropTypes.func,
  dashboardSelectionId: PropTypes.any,
  getCompanySearchOptions: PropTypes.func,
  getCurrentShareholderReq: PropTypes.func,
  getInvestorSearchOptions: PropTypes.func,
  getUserDashboardReq: PropTypes.func,
  listAIPeerGroup: PropTypes.func,
  piListOfIndices: PropTypes.func,
  piListSectorsAndIndustries: PropTypes.func,
  widgetGraphData: PropTypes.any,
};

ComapnyInvestorFilterContainer.defaultProps = {
  allCountriesAndRegions: () => {},
  allIssuers: () => {},
  allListOfExchange: () => {},
  getCompanySearchOptions: () => {},
  getCurrentShareholderReq: () => {},
  getInvestorSearchOptions: () => {},
  getUserDashboardReq: () => {},
  listAIPeerGroup: () => {},
  piListOfIndices: () => {},
  piListSectorsAndIndustries: () => {},
};

// #region States assign

// dashboard
const selectDashboardSelectionId = (state) => state.dashboard.dashboardSelectionId;
//

const selectHandleDashBoardWidgetIdSet = (state) => state.dashboard.dashBoardWidgetId;
const selectShowIndividualOption = (state) => state.dashboard.showIndividualOption;
// companies
const selectallIssersRecordset = (state) => state.dashboard.issersRecordset;
const selectCompanySingleSelection = (state) => state.dashboard.companySingleSelection;
const selectCompanySelection = (state) => state.dashboard.companySelection;

// exchange
const selectListOfExchange = (state) => state.dashboard.listExchange;
const selectExchangeSelection = (state) => state.dashboard.exchangeSelection;

// Index
const selectListOfIndicesRecordSet = (state) => state.dashboard.piListIndices;
const selectIndexSelection = (state) => state.dashboard.indexSelection;

// AI Peer Groups
const selectAIPeerGroup = (state) => state.dashboard.listAIPeersGroups;
const selectAIPeerGroupSelection = (state) => state.dashboard.aiPeerGroupSelection;

// Market Cap ($mn):
const selectListMarketCap = (state) => state.dashboard.listMarketCap;
const selectMarketCapSelection = (state) => state.dashboard.marketCapSelection;

// AUM ($bn)
const selectListAumCategory = (state) => state.dashboard.listAumCategory;
const selectAumCategorySelection = (state) => state.dashboard.aumCategorySelection;

// Industry
const selectIndustrySelection = (state) => state.dashboard.industrySelection;

// By Company Location:
const selectListRegeionAndCountries = (state) => state.dashboard.listRegeionAndCountries;
const selectCompanyLocationSelection = (state) => state.dashboard.companyLocationSelection;

// By My Saved Peer Groups
const selectCompanySearchOptions = (state) => state.dashboard.companySearchOptions;
const selectCompanySearchOptionSelection = (state) => state.dashboard.companySearchOptionSelection;

const selectPIListSectorsAndIndustries = (state) => state.dashboard.piListSectorsAndIndustries;
const selectBulkCompanySelectRecordset = (state) => state.dashboard.freeSearchRecordset;

const selectSaveCurrentListButtonText = (state) => state.dashboard.saveCurrentListButtonText;
const selectIsSaveCurrentListDisable = (state) => state.dashboard.isSaveCurrentListButtonSaveDisable;
const selectIsSaveCurrentListButtonDeleteDisable = (state) => state.dashboard.isSaveCurrentListButtonDeleteDisable;
const selectTextSaveCurrentList = (state) => state.dashboard.txtSaveCurrentList;
const selectTextMarketCapMinRange = (state) => state.dashboard.txtMarketCapMinRange;
const selectTextMarketCapMaxRange = (state) => state.dashboard.txtMarketCapMaxRange;
const selectCurrentSelectionComapanySearchid = (state) => state.dashboard.currentSelectionComapanySearchid;
const selectCurrentSelectionInvestorSearchid = (state) => state.dashboard.currentSelectionInvestorSearchid;

const selectShowFilterModel = (state) => state.dashboard.showFilterModel;

const selectHandleReset = (state) => state.dashboard.handleReset;
// Investor
const selectlistByIndivProponent = (state) => state.dashboard.listByIndivProponent;
const selectSelectionByIndivProponent = (state) => state.dashboard.selectionByIndivProponent;
const selectInvestorSearchOptions = (state) => state.dashboard.investorSearchOptions;
const selectInvestorSearchOptionsSelection = (state) => state.dashboard.investorSearchOptionsSelection;
const selectListInvestorTypeAndSubtype = (state) => state.dashboard.listInvestorTypeAndSubtype;
const selectListInvestorTypeAndSubtypeSelection = (state) => state.dashboard.listInvestorTypeAndSubtypeSelection;
const selectInvestorLocationSelection = (state) => state.dashboard.investorLocationSelection;
const selectInvestorSelection = (state) => state.dashboard.investorSelection;
const selectInvestorBulkUpload = (state) => state.dashboard.isInvestorBulkUpload;
const selectShowInvestorFilterModel = (state) => state.dashboard.showInvestorFilterModel;
//
const selectWidgetGraphData = (state) => state.dashboard.widgetGraphData;

const selectDashboardSelection = (state) => state.dashboard.dashboardSelection;

// #endregion
const selectCmpWidgetValue = (state) => state.preferences.cmpWidgetValue;
const selectInvWidgetValue = (state) => state.preferences.invWidgetValue;
const selectInvListRegeionAndCountries = (state) => state.dashboard.invListRegeionAndCountries;
const selectInvTxtMarketCapMinRange = (state) => state.dashboard.invTxtMarketCapMinRange;
const selectInvTxtMarketCapMaxRange = (state) => state.dashboard.invTxtMarketCapMaxRange;
//default selection tree view
const selectListDefaultInvestorTypeAndSubtype = (state) => state.dashboard.listDefaultInvestorTypeAndSubtype;
const selectLstInvestorRegeionAndCountries = (state) => state.dashboard.lstInvestorRegeionAndCountries;
const selectDefaultCmpRegeionAndCountries = (state) => state.dashboard.defaultCmpRegeionAndCountries;
const selectDefaultPiListSectorsAndIndustries = (state) => state.dashboard.defaultPiListSectorsAndIndustries;

const mapStateToProps = (state) => ({
  // dashboard
  cmpWidgetValue: selectCmpWidgetValue(state),
  invWidgetValue: selectInvWidgetValue(state),
  dashboardSelectionId: selectDashboardSelectionId(state),
  //
  widgetGraphData: selectWidgetGraphData(state),
  dashBoardWidgetId: selectHandleDashBoardWidgetIdSet(state),
  // investor
  isInvestorBulkUpload: selectInvestorBulkUpload(state),
  investorSelection: selectInvestorSelection(state),
  listByIndivProponent: selectlistByIndivProponent(state),
  selectionByIndivProponent: selectSelectionByIndivProponent(state),
  investorSearchOptions: selectInvestorSearchOptions(state),
  investorSearchOptionsSelection: selectInvestorSearchOptionsSelection(state),
  listInvestorTypeAndSubtype: selectListInvestorTypeAndSubtype(state),
  listInvestorTypeAndSubtypeSelection: selectListInvestorTypeAndSubtypeSelection(state),
  investorLocationSelection: selectInvestorLocationSelection(state),
  showInvestorFilterModel: selectShowInvestorFilterModel(state),

  //
  showIndividualOption: selectShowIndividualOption(state),
  saveCurrentListButtonText: selectSaveCurrentListButtonText(state),
  isSaveCurrentListButtonSaveDisable: selectIsSaveCurrentListDisable(state),
  isSaveCurrentListButtonDeleteDisable: selectIsSaveCurrentListButtonDeleteDisable(state),
  txtSaveCurrentList: selectTextSaveCurrentList(state),
  txtMarketCapMinRange: selectTextMarketCapMinRange(state),
  txtMarketCapMaxRange: selectTextMarketCapMaxRange(state),
  currentSelectionComapanySearchid: selectCurrentSelectionComapanySearchid(state),
  currentSelectionInvestorSearchid: selectCurrentSelectionInvestorSearchid(state),
  showFilterModel: selectShowFilterModel(state),
  handleReset: selectHandleReset(state),
  invListRegeionAndCountries: selectInvListRegeionAndCountries(state),
  invTxtMarketCapMinRange: selectInvTxtMarketCapMinRange(state),
  invTxtMarketCapMaxRange: selectInvTxtMarketCapMaxRange(state),

  // companies
  issersRecordset: selectallIssersRecordset(state),
  companySelection: selectCompanySelection(state),
  companySingleSelection: selectCompanySingleSelection(state),

  // exchange
  listOfExchange: selectListOfExchange(state),
  exchangeSelection: selectExchangeSelection(state),

  // Index
  piListIndices: selectListOfIndicesRecordSet(state),
  indexSelection: selectIndexSelection(state),

  // AI Peer Groups
  aiPeerGroups: selectAIPeerGroup(state),
  aiPeerGroupSelection: selectAIPeerGroupSelection(state),

  // Market Cap ($mn):
  listMarketCap: selectListMarketCap(state),
  marketCapSelection: selectMarketCapSelection(state),

  // AUM ($bn)
  listAumCategory: selectListAumCategory(state),
  aumCategorySelection: selectAumCategorySelection(state),

  // Industry
  piListOfSectorsAndIndustries: selectPIListSectorsAndIndustries(state),
  industrySelection: selectIndustrySelection(state),

  // By Company Location:
  listRegeionAndCountries: selectListRegeionAndCountries(state),
  companyLocationSelection: selectCompanyLocationSelection(state),

  // By My Saved Peer Groups
  listOfcompanySearchOptions: selectCompanySearchOptions(state),
  companySearchOptionSelection: selectCompanySearchOptionSelection(state),

  freeSearchRecordset: selectBulkCompanySelectRecordset(state),
  dashboardSelection: selectDashboardSelection(state),
  //default selection tree view
  listDefaultInvestorTypeAndSubtype: selectListDefaultInvestorTypeAndSubtype(state),
  lstInvestorRegeionAndCountries: selectLstInvestorRegeionAndCountries(state),
  defaultCmpRegeionAndCountries: selectDefaultCmpRegeionAndCountries(state),
  defaultPiListSectorsAndIndustries: selectDefaultPiListSectorsAndIndustries(state),
});

const mapDispatchToProps = {
  handleShowIndividualOption,
  handleCompanySingleSelection,
  handleShowGroupOption,
  handleCompanySelection,
  handleCompanyAndIndustry: searchCompanyAndIndustriesReq,
  handleIndexSelectionChange,
  handleExchangeSelectionChange,
  handleAIPeerGroupSelection,
  handleMarketCapSelection,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  HandleTreeViewCompanyLocation,
  HandleFilterModel,
  handleReset,
  handleCompanySearchOptionSelection,
  ResetCompanySearchOptionSelection,
  getAllCompanySearchSelection,
  handleSavedPeerGroupsInputChange,
  handleSaveCurrentList,
  handleCompanySearchDeleteReq,
  getCompanySearchOptions,
  handleCompanySearchUpdateReq,
  piListOfIndices: piListOfIndicesReq,
  allListOfExchange: getListOfExchange,
  listAIPeerGroup: getAIPeersGroups,
  allCountriesAndRegions: getTreeRegionsAndCountries,
  piListSectorsAndIndustries: getPIListSectorsAndIndustriesReq,
  getCurrentShareholderReq,
  handdleRun: handleRunReq,
  //
  handleInvestorIsBulkUpload,
  handleInvestorSelection,
  handleSearchInvestor: searchInvestorsReq,
  HandleTreeViewInvestorLocation,
  handleByShareholderOfCompany,
  getAllInvestorsFromShareholderOfCompany,
  HandleTreeViewListInvestorTypeAndSubtype,
  HandleInvestorFilterModel,
  handleInvestorSearchOptionSelection,
  GetInvestorSearchSelection: getInvestorSearchSelectionReq,
  ResetInvestorSearchOptionSelection,
  handleInvestorSavedPeerGroupsInputChange,
  handleSaveInvestorCurrentList,
  handleInvestorSearchDeleteReq,
  getInvestorSearchOptions,
  handleInvestorSearchUpdateReq,
  handleBulkInvestorSelection,

  getAumCategorylistReq,
  handleAumCategorySelection,
  //
  HandleDashBoardWidgetIdSet,
  getUserDashboardReq,
  getStoredProcedureReq,
  resetDashboardWidgetInvestorSearchReq,
  resetDashboardWidgetCompanySearchReq,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComapnyInvestorFilterContainer);
