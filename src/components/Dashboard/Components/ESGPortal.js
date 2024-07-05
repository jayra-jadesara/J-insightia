import React, { useEffect, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import DashboardNewsIndivisual from '../../News/Components/DashboardNewsIndivisual';
import { GetNewsDetails } from '../../../utils/news-util';
import HelpAndServicesComponent from '../../GeneralForm/HelpAndServicesComponent';
import WidgetConstant from '../../../constants/WidgetConstant';
import {
  GetStoredProcedureDownload,
  getMagazinesIssuesESG
} from '../../../utils/dashboard-util';
import Table from '../../GeneralForm/Table';
import {
  filters,
  setNextGroupColumnText
} from '../../../utils/AgGridFunctions';
import PdfViewer from '../../GeneralForm/PdfViewer';
import { gridWidthValuesXLrg } from '../../../utils/table-tools-util';
import {
  GetVotingPortalStartAndEndDate,
  demandsImageHandler,
  dateToNull,
  agGridSrickyHeader
} from '../../../utils/general-util';
import D3barChart from '../../GeneralForm/D3barchart';
import ProductConstants from '../../../constants/ProductConstants';
import {
  ARRAY_HAS_NO_LENGTH,
  NUMBER_HUNDRED,
  NUMBER_THREE
} from '../../../constants/NumberConstants';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import MagazinesReportComponentPage from '../../../components/MagazinesReport/MagazinesReportComponentPage';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const D3PieChart = lazy(() => import('../../GeneralForm/D3PieChart'));

const Card = lazy(() => import('../../GeneralForm/Card'));

const bem = bn.create('newsNew');

const ESGPortal = (props) => {
  const [newsDetials, setNewsDeta] = useState([]);
  const [activistCampaigns, setActivistCampaigns] = useState([]);
  const [activistCampaignsChart, setActivistCampaignsChart] = useState([]);
  const [magazineData, setMagazineData] = useState([]);

  const { startDate, endDate } = GetVotingPortalStartAndEndDate();
  const shareHolderProposalTableData = {
    startDate,
    endDate,
    meetingType: 1,
    proponent: '',
    sponsor: 2,
    companySearchId: null
  };

  const Pagging = { isPagging: true, pageSize: 5 };
  const Top3NewsID = props.ESGPortalTop3News;
  const newsDetail = [];
  const newsDetailss = newsDetials !== undefined && newsDetials.length > ARRAY_HAS_NO_LENGTH ? newsDetials.map((item, i) => (
    <div key={`divDashboard${i + 1}`} className='col-lg-4 col-md-12 col-sm-12 mb-3 mt-2'>
      <DashboardNewsIndivisual
        key={`col${i + 1}`}
        newsid={item.newsid}
        itemDetails={item}
        productId={item.productId}
      />
    </div>
  )) : [];
  window.addEventListener('scroll', () => {
    agGridSrickyHeader();
  });

  //news
  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsDetails() {
      if (Top3NewsID !== undefined) {
        for (const item of Top3NewsID) {
          await GetNewsDetails(item.news_id).then((res) => {
            newsDetail.push(res);
          });
          if (newsDetail.length === NUMBER_THREE) {
            setNewsDeta(newsDetail);
          }
        }
      }
    }
    getNewsDetails();
    return function cleanup() {
      abortController.abort();
    };
  }, [Top3NewsID]);

  //table data
  useEffect(() => {
    async function getActivistCampiagnData() {
      const StoredProcedure = 'pDashboard_Widget_ActivistCampaign_Table_ESG';
      const dashboard_widget_link_id = WidgetConstant.ACTIVIST_CAMPAIGNS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setActivistCampaigns(res);
      });
    }
    getActivistCampiagnData();
  }, []);
  useEffect(() => {
    async function getActivistCampiagnChartData() {
      const StoredProcedure = 'pDashboard_Widget_ActivistCampaign_BarChart_ESG';
      const dashboard_widget_link_id = WidgetConstant.ACTIVIST_CAMPAIGNS_CHART;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setActivistCampaignsChart(res);
      });
    }
    getActivistCampiagnChartData();
  }, []);
  useEffect(() => {
    props.shareHolderProposalData(shareHolderProposalTableData);
  }, []);
  useEffect(() => {
    async function getMagazineESGData() {
      await getMagazinesIssuesESG({
        product_id: ProductConstants.GOVERNANCE,
        article_type_list: '6,7'
      }).then((res) => {
        if (res.data !== null && res.data !== undefined) {
          setMagazineData(res.data.top3Mag);
        }
      });
    }
    getMagazineESGData();
  }, []);

  const gridOptionActivistCampaigns = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s)',
        field: 'investors',
        minWidth: 150,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => {
          const obj = JSON.parse(params.data.investors);
          const oMap = obj.investors.length > ARRAY_HAS_NO_LENGTH && obj.investors.map((o) => (
            <span>
              <Link
                className='text-secondary'
                to={`/investor/overview?investor=${o.investor_id}`}
              >
                {o.investor_name}
              </Link>
            </span>
          ));
          return oMap.length > ARRAY_HAS_NO_LENGTH && oMap.map((e, i) => {
            const comma = i === oMap.length - 1 ? <span /> : <span>,</span>;
            return (
              <span>
                {e}
                {comma}
              </span>
            );
          });
        }
      },
      {
        headerName: 'Company',
        field: 'Company',
        minWidth: 150,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`/company/overview?pid=${params.data.pid}`}
            >
              {params.data.Company}
            </Link>
          </div>
        ),
        colId: 'Company'
      },
      {
        headerName: 'Company HQ',
        field: 'Company_HQ',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: 180
      },
      {
        headerName: 'Campaign Start Date',
        field: 'start_camp',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Campaign End Date',
        field: 'end_camp',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Appoint Personnel',
        field: 'appoint_personnel',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: 110,
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.remove_personnel)
      },
      {
        headerName: 'Personnel Removal',
        field: 'remove_personnel',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.remove_personnel)
      },
      {
        headerName: 'Push For M&A',
        field: 'push_for_ma',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.push_for_ma)
      },
      {
        headerName: 'Oppose M&A',
        field: 'oppose_ma',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.oppose_ma)
      },
      {
        headerName: 'Divestiture',
        field: 'divestiture',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.divestiture)
      },
      {
        headerName: 'Return Cash to Shareholders',
        field: 'return_cash_to_shareholders',
        minWidth: 140,
        maxWidth: 140,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.return_cash_to_shareholders)
      },
      {
        headerName: 'Capital Structure',
        field: 'capital_structure',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.capital_structure)
      },
      {
        headerName: 'Operational',
        field: 'operational',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.operational)
      },

      {
        headerName: 'Remuneration',
        field: 'remuneration',
        minWidth: 130,
        maxWidth: 130,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.remuneration)
      },
      {
        headerName: 'Environmental',
        field: 'environmental',
        minWidth: 135,
        maxWidth: 135,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.environmental)
      },
      {
        headerName: 'Social',
        field: 'social',
        minWidth: 80,
        maxWidth: 80,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.social)
      },
      {
        headerName: 'Governance',
        field: 'governance',
        minWidth: 115,
        maxWidth: 115,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          demandsImageHandler(params.data.governance)
      }
    ],
    pinColumns: [
      {
        colId: 'activists',
        pinned: 'left'
      },
      {
        colId: 'Company',
        pinned: 'left'
      }
    ],
    headerHeight: 60,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: activistCampaigns.length > ARRAY_HAS_NO_LENGTH && activistCampaigns.map((x) => ({
      ...x,
      start_camp:
        x.start_camp !== null
          ? dateToNull(x.start_camp, 'dd-mmm-yy', true)
          : '',
      end_camp:
        x.end_camp !== null ? dateToNull(x.end_camp, 'dd-mmm-yy', true) : ''
    }))
  };

  const gridOptionInvestorTrackerProposalTypeTopLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'proposal_top_level',
        type: ['rowGroup', 'hiddenField', 'enableValue', 'autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Resolution Type',
        field: 'Category_Sub_level',
        type: ['rowGroup', 'hiddenField', 'enableValue', 'autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Resolution Type',
        field: 'proposal_type',
        type: ['hiddenField', 'enableValue', 'autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Meetings (#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 120,
        maxWidth: 120
      },
      {
        headerName: 'Proposals (#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 125,
        maxWidth: 125
      },
      {
        headerName: 'Results (#)',
        field: 'number_with_results',
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 120,
        maxWidth: 120
      },
      {
        headerName: 'For (%)',
        valueGetter(params) {
          if (
            params.data !== undefined &&
            params.data !== null &&
            params.data.for_pcent !== null
          ) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return parseFloat(params.data.for_pcent).toFixed(0);
            }
            return parseFloat(params.data.for_pcent).toFixed(1);
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90
      },
      {
        headerName: 'Against (%)',
        valueGetter(params) {
          if (
            params.data !== undefined &&
            params.data !== null &&
            params.data.against_pcent !== null
          ) {
            if (params.data.against_pcent === NUMBER_HUNDRED) {
              return parseFloat(params.data.against_pcent).toFixed(0);
            }
            return parseFloat(params.data.against_pcent).toFixed(1);
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 120,
        maxWidth: 120
      },
      {
        headerName: 'Withhold/ Abstain (%)',
        valueGetter(params) {
          if (
            params.data !== undefined &&
            params.data !== null &&
            params.data.with_abs !== null
          ) {
            if (params.data.with_abs === NUMBER_HUNDRED) {
              return parseFloat(params.data.with_abs).toFixed(0);
            }
            return parseFloat(params.data.with_abs).toFixed(1);
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 185,
        maxWidth: 185
      },
      {
        headerName: 'ISS Support %',
        valueGetter(params) {
          if (
            params.data !== undefined &&
            params.data !== null &&
            params.data.ISS_For_pcent !== null
          ) {
            if (params.data.ISS_For_pcent === NUMBER_HUNDRED) {
              return parseFloat(params.data.ISS_For_pcent).toFixed(0);
            }
            return parseFloat(params.data.ISS_For_pcent).toFixed(1);
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 130,
        maxWidth: 130
      },
      {
        headerName: 'GL Support %',
        valueGetter(params) {
          if (
            params.data !== undefined &&
            params.data !== null &&
            params.data.GL_For_pcent !== null
          ) {
            if (params.data.GL_For_pcent === NUMBER_HUNDRED) {
              return parseFloat(params.data.GL_For_pcent).toFixed(0);
            }
            return parseFloat(params.data.GL_For_pcent).toFixed(1);
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 130,
        maxWidth: 130
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: 'Resolution Type',
      field: 'proposal_type',
      minWidth: 250,
      type: ['autoHeightTrue'],
      cellClass: 'ws-normal-lh24 ps-1 pe-1',
      cellRendererParams: {
        suppressCount: true
      }
    },
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    headerHeight: 60,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: (props.ESGShareHolderProposalData && props.ESGShareHolderProposalData.length > ARRAY_HAS_NO_LENGTH) && props.ESGShareHolderProposalData.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false,
      proposal_top_level:
        x.proposal_top_level === null &&
          x.Category_Sub_level === null &&
          x.proposal_type === null
          ? 'All'
          : x.proposal_top_level
    })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText
    },
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    getRowHeight(params) {
      if (params.node.data && params.node.data.Category_Sub_level === null) {
        return 0;
      }
      if (params.node.data && params.node.data.proposal_type === null) {
        return 0;
      }
    }
  };

  const gridOptionVotingPolicyChanges = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'date_of',
        tyep: ['dateColumn', 'autoHeightTrue'],
        minWidth: 110,
        maxWidth: 110,
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Investor',
        field: 'investor',
        ...gridWidthValuesXLrg,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        // cellRendererFramework: (params) => (
        //   <div>
        //     <Link className="text-secondary"to={`/company/overview?pid=${params.data.pid}`}>{params.data.Company}</Link>
        //   </div>
        // ),
        colId: 'investor'
      },
      {
        headerName: 'Category',
        field: 'policycategory_description',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150
      },
      {
        headerName: 'Sub Category',
        field: 'policysubcategory_description',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150
      },
      {
        headerName: 'Summary of Change',
        field: 'summary_change',
        minWidth: 500,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      }
    ],
    pinColumns: [
      {
        colId: 'investor',
        pinned: 'left'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    isfloatingFilter: false,
    rowData: (props.ESGVotingPolicyChanges && props.ESGVotingPolicyChanges.length > ARRAY_HAS_NO_LENGTH) && props.ESGVotingPolicyChanges.map((x) => ({
      ...x,
      date_of:
        x.date_of !== null ? dateToNull(x.date_of, 'dd-mmm-yy', true) : ''
    }))
  };

  const gridOptionUpCommingShareHolder = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'company_name',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthValuesXLrg
      },
      {
        headerName: 'Meeting Date',
        field: 'meeting_date',
        type: ['dateColumn', 'autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: 110
      },
      {
        headerName: 'Proposal',
        field: 'proposal_detail',
        minWidth: 300,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      }
    ],
    pinColumns: [
      {
        colId: 'investor',
        pinned: 'left'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    isfloatingFilter: false,
    rowData: (props.ESGUpCommingShareHolderData && props.ESGUpCommingShareHolderData.length > ARRAY_HAS_NO_LENGTH) && props.ESGUpCommingShareHolderData.map((x) => ({
      ...x,
      meeting_date:
        x.meeting_date !== null
          ? dateToNull(x.meeting_date, 'dd-mmm-yy', true)
          : ''
    }))
  };

  return (
    <Page key={1} className='pt-0'>
      {props.isLoadingDashboard && LOADING}

      {!props.isLoadingDashboard && (
        <div className={bem.b()}>
          {newsDetailss.length > ARRAY_HAS_NO_LENGTH && (
            <Card title='News'>
              <div className='row widgetNewsContainer'>{newsDetailss}</div>
            </Card>
          )}

          <div className='mt-3'>
            <Card title='ESG Updates and Summaries'>
              <div key='divActivistCampaigns' className='row mt-3'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                  <Card title='Latest ESG Activist Campaigns'>
                    {activistCampaigns.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          key={props.cardTitle}
                          IsShowCard={false}
                          hideExcelDownloadIcon
                          gridOptions={gridOptionActivistCampaigns}
                          title={props.cardTitle}
                        />
                      </ErrorBoundary>
                    ) : (
                        NORECORDS
                      )}
                  </Card>
                </div>
                <div className='col-sm-12 col-md-4 col-lg-4 mt-3'>
                  <ErrorBoundary hasCard cardtitle='ESG Activist Campaigns'>
                      <D3barChart
                        IsShowCard
                        hideExcelDownloadIcon
                        xAxisName='Year'
                        yAxisName='Number of Activist Campaigns'
                        keys={['CampaignCount']}
                        data={activistCampaignsChart}
                        xkeysLabel={['ActionYear']}
                        title='ESG Activist Campaigns'
                      />
                  </ErrorBoundary>
                </div>
                <div className='mt-3 col-lg-8 col-md-6 col-sm-12 mb-2 mt-3'>
                  <Card title='Upcoming ESG Shareholder Proposals'>
                    {props.ESGUpCommingShareHolderData && props.ESGUpCommingShareHolderData.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon
                          gridOptions={gridOptionUpCommingShareHolder}
                        />
                      </ErrorBoundary>
                    ) : (
                        NORECORDS
                      )}
                  </Card>
                </div>
                <div className='mt-3 col-lg-12 col-md-12 col-sm-12 mb-2'>
                  <Card title='Latest Annual ESG Shareholder Proposals Summary'>
                    {props.ESGShareHolderProposalData !== undefined &&
                      props.ESGShareHolderProposalData !== null &&
                      props.ESGShareHolderProposalData.length > ARRAY_HAS_NO_LENGTH ? (
                        <ErrorBoundary>
                          <Table
                            IsShowCard={false}
                            hideExcelDownloadIcon
                            gridOptions={
                              gridOptionInvestorTrackerProposalTypeTopLevel
                            }
                          />
                        </ErrorBoundary>
                      ) : (
                        NORECORDS
                      )}
                  </Card>
                </div>
                <div className='col-sm-12 col-lg-3 mt-3'>
                  <ErrorBoundary hasCard cardtitle='Gender Diversity of Director Appointments at Russell 3000 Companies (past year)'>
                    <D3PieChart
                      data={props.directorAppointmentChartData}
                      isComp={false}
                      isInvest={false}
                      innerRadius={50}
                      outerRadius={100}
                      height={250}
                      cardtitle='Gender Diversity of Director Appointments at Russell 3000 Companies (past year)'
                      isSetChartPercentage
                    />
                  </ErrorBoundary>
                </div>
                <div className='col-sm-12 col-lg-9 mt-3'>
                  <Card title='Latest Investor ESG Voting Policy Changes'>
                    {props.ESGVotingPolicyChanges && props.ESGVotingPolicyChanges.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon
                          gridOptions={gridOptionVotingPolicyChanges}
                        />
                      </ErrorBoundary>
                    ) : (
                        NORECORDS
                      )}
                  </Card>
                </div>
              </div>
            </Card>
          </div>

          <div className='mt-3 mb-2'>
            <Card title='Publications'>
              {!props.isLoadingMagazinesReport && magazineData.length > ARRAY_HAS_NO_LENGTH ? (
                <ErrorBoundary>
                  <MagazinesReportComponentPage
                    {...props}
                    rowDataList={magazineData}
                    dashboardIDValue={props.dashboardIDValue}
                    hidePDFBox
                  />
                </ErrorBoundary>
              ) : (
                  NORECORDS
                )}
            </Card>
          </div>

          <div>
            {props.btnIdForExpandData &&
              props.magazinesReport3_data.length > ARRAY_HAS_NO_LENGTH && (
                <ErrorBoundary hasCard cardtitle='View PDF'>
                  <PdfViewer
                    IsShowCard
                    isHide={false}
                    title='View PDF'
                    smalltitle=''
                    fileUrl={props.viewPDFFileName} // fileUrl="/pdf/pdf-open-parameters.pdf"
                    isOpen={props.btnIdForExpandData}
                    clickEvent={props.handleSetBtnIdForExpandData}
                  />
                </ErrorBoundary>
              )}
          </div>

          <HelpAndServicesComponent />
        </div>
      )}
    </Page>
  );
};

ESGPortal.propTypes = {};

export default React.memo(ESGPortal);
