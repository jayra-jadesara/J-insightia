import PropTypes from 'prop-types';
import React, { useEffect, useState, lazy } from 'react';
import { Link } from 'react-router-dom';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import DashboardNewsIndivisual from '../../News/Components/DashboardNewsIndivisual';
import { GetNewsDetails } from '../../../utils/news-util';
import {
  GetStoredProcedureDownload,
  getMagazinesIssuesESG
} from '../../../utils/dashboard-util';
import {
  filters,
  setNextGroupColumnText
} from '../../../utils/AgGridFunctions';
import WidgetConstant from '../../../constants/WidgetConstant';
import ToolNameConstant from '../../../constants/DashboardComstants';
import Table from '../../GeneralForm/Table';
import { history } from '../../../utils/navigation-util';
import HelpAndServicesComponent from '../../GeneralForm/HelpAndServicesComponent';
import {
  GetVotingPortalStartAndEndDate,
  dateToNull,
  agGridSrickyHeader
} from '../../../utils/general-util';
import { toolListItems } from '../../Tools/tools';
import PdfViewer from '../../GeneralForm/PdfViewer';
import {
  gridWidthValues,
  gridWidthValuesXLrg,
  gridWidthReport
} from '../../../utils/table-tools-util';
import ProductConstants from '../../../constants/ProductConstants';
import {
  ARRAY_HAS_NO_LENGTH,
  NUMBER_HUNDRED,
  NUMBER_THREE
} from '../../../constants/NumberConstants';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import pathsConst from '../../../constants/PathsConstant';
import MagazinesReportComponentPage from '../../../components/MagazinesReport/MagazinesReportComponentPage';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = lazy(() => import('../../GeneralForm/Card'));
const bem = bn.create('newsNew');
const bem2 = bn.create('tools');

const VotingPortal = (props) => {
  const [newsDetials, setNewsDeta] = useState([]);
  const [investorPolicyData, setInvestorPolicyData] = useState([]);
  const [keyProPosalData, setKeyProposalData] = useState([]);
  const [magazineData, setMagazineData] = useState([]);

  const Top3NewsID = props.votingPortalTop3News;
  const newsDetail = [];
  const Pagging = { isPagging: true, pageSize: 5 };
  const PinnedHeaders = [
    {
      colId: 'Voting Policy',
      pinned: 'left'
    }
  ];
  const { startDate, endDate } = GetVotingPortalStartAndEndDate();
  const ResolutionData = {
    startDate,
    endDate,
    meetingType: 1,
    proponent: '',
    sponsor: 2,
    companySearchId: null
  };
  const breakpoint = 768;
  const newsDetailss = newsDetials !== undefined && newsDetials.length > ARRAY_HAS_NO_LENGTH ? newsDetials.map((item, i) => (
    <div
      key={`div_${i.toString()}`}
      className='col-lg-4 col-md-12 col-sm-12 mb-3 mt-2'
    >
      <DashboardNewsIndivisual
        key={`Dashboard${i + 1}`}
        newsid={item.newsid}
        itemDetails={item}
        productId={item.productId}
      />
    </div>
  )) : [];
  window.addEventListener('scroll', () => {
    agGridSrickyHeader();
  });

  function bindTools(element, index) {
    return (
      <div
        key={index}
        className='card bg-light col-xs-12 col-sm-6 col-md-4 col-lg-4'
      >
        <div className='card-header cardTitleHeader'>
          <span>{element.cardHeading}</span>
        </div>
        <div className='card-body'>
          <div className='card-text'>
            <p>{element.cardDesc}</p>
          </div>
        </div>
        <div>
          <button
            id={`cardItem-${index}_${element.cardHeading.replaceAll(' ', '-')}`} // replace(/\s/g, "-")}`}
            className='btn btn-primary card-button'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              // history.replace(element.cardGotoPath);

              history.push(element.cardGotoPath);
            }}
          >
            {element.castButtonName}
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function getNewsDetails() {
      if (Top3NewsID !== undefined) {
        Top3NewsID.length > ARRAY_HAS_NO_LENGTH && Top3NewsID.map(async (item) => {
          await GetNewsDetails(item.news_id).then((res) => {
            newsDetail.push(res);
          });
          if (newsDetail.length === NUMBER_THREE) {
            setNewsDeta(newsDetail);
          }
        });
      }
    }
    getNewsDetails();
    return function cleanup() {
      abortController.abort();
    };
  }, [Top3NewsID]);

  useEffect(() => {
    async function getKPData() {
      const StoredProcedure = 'pDashboard_Widget_KeyProposals_Latest';
      const dashboard_widget_link_id = WidgetConstant.KEY_PROPOSALS;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setKeyProposalData(res);
      });
    }
    getKPData();
  }, []);

  useEffect(() => {
    async function getIPCData() {
      const StoredProcedure = 'pDashboard_Widget_InvestorPolicyChanges';
      const dashboard_widget_link_id = WidgetConstant.INVESTOR_POLICY_CHANGES;
      await GetStoredProcedureDownload({
        StoredProcedure,
        dashboard_widget_link_id
      }).then((res) => {
        setInvestorPolicyData(res);
      });
    }
    getIPCData();
  }, []);

  useEffect(() => {
    props.resolutionsTrackerData(ResolutionData);
  }, []);

  useEffect(() => {
    async function getMagazineVotingData() {
      await getMagazinesIssuesESG({
        product_id: ProductConstants.VOTING,
        article_type_list: null
      }).then((res) => {
        if (res.data !== null && res.data !== undefined) {
          setMagazineData(res.data.top3Mag);
        }
      });
    }
    getMagazineVotingData();
  }, []);

  const InvesterPolicyChangesOption = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'voting_policy',
        minWidth: 200,
        maxWidth: null,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Date',
        field: 'date',
        minWidth: 80,
        maxWidth: 80,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Redline Report',
        field: 'redline_report',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => (
          <div>
            {params.data.redline_report && (
              <a
                className='btn btn-primary btn-sm'
                href={`${pathsConst.DOCS_INSIGHTIA_REDLINE_REPORTS}${params.data.redline_report}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Show
              </a>
            )}
          </div>
        )
      },
      {
        headerName: 'Change Summary',
        field: 'change_summary',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => (
          <div>
            {params.data.investor_id && (
              <a
                className='link-secondary'
                href={`/investor/voting/profile?investor=${params.data.investor_id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                View
              </a>
            )}
          </div>
        )
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: PinnedHeaders,
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: investorPolicyData.length > ARRAY_HAS_NO_LENGTH && investorPolicyData.map((x) => ({
      ...x,
      date: x.date !== null ? dateToNull(x.date, 'dd-mmm-yy', true) : ''
    }))
  };

  const KeyProposalOption = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        ...gridWidthReport,
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <Link
            className='text-secondary'
            to={`${pathsConst.COMPANY_OVERVIEW}${pathsConst.QUERY_PID}${params.data.pid}`}
          >
            {params.data.company_name}
          </Link>
        )
      },
      {
        headerName: 'Meeting Date',
        field: 'meeting_date',
        ...gridWidthValues,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Proposal Details',
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 250
      }
    ],
    pinColumns: [
      {
        colId: 'company_name',
        pinned: 'left'
      },
      {
        colId: 'Meeting_Date',
        pinned: 'left'
      },
      {
        colId: 'Proposal_Details',
        pinned: 'left'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: Pagging,
    groupHeaderHeight: 75,
    isfloatingFilter: false,
    rowData: keyProPosalData.length > ARRAY_HAS_NO_LENGTH && keyProPosalData.map((x) => ({
      ...x,
      meeting_date:
        x.meeting_date !== null
          ? dateToNull(x.meeting_date, 'dd-mmm-yy', true)
          : ''
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
        minWidth: 20
      },
      {
        headerName: 'Proposals (#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 20
      },
      {
        headerName: 'Results (#)',
        field: 'number_with_results',
        aggFunc: 'getNext-ColumnVal',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 20
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
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 90,
        maxWidth: 90
      },
      {
        headerName: 'Agt (%)',
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
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 120,
        maxWidth: 120
      },
      {
        headerName: 'W/H Abs (%)',
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
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 90,
        maxWidth: 90
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
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        aggFunc: 'getNext-ColumnVal',
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
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        aggFunc: 'getNext-ColumnVal',
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
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: props.lstResolutionType.length > ARRAY_HAS_NO_LENGTH && props.lstResolutionType.map((x) => ({
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

  return (
    <Page key={1} className='pt-0'>
      {props.isLoadingDashboard && LOADING}

      {!props.isLoadingDashboard && (
        <div className={bem.b('row')}>
          <div className='row mt-3'>
            <Card title='News'>
              <div className='row widgetNewsContainer'>{newsDetailss}</div>
            </Card>
          </div>
          <div className='row mt-3'>
            <Card title='Voting & Policy Update'>
              <div className='row mt-2'>
                <div className='col-lg-5 col-md-12 col-sm-12 mb-2'>
                  <Card title='Investor Policy Changes'>
                    {investorPolicyData.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon
                          gridOptions={InvesterPolicyChangesOption}
                          title={props.cardTitle}
                        />
                      </ErrorBoundary>
                    ) : (
                      NORECORDS
                    )}
                  </Card>
                </div>
                <div className='col-lg-7 col-md-12 col-sm-12 mb-2'>
                  <Card title='Key Proposals'>
                    {keyProPosalData.length > ARRAY_HAS_NO_LENGTH ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon
                          gridOptions={KeyProposalOption}
                          title={props.cardTitle}
                        />
                      </ErrorBoundary>
                    ) : (
                      NORECORDS
                    )}
                  </Card>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 mb-2'>
                  <Card title='Latest Annual Shareholder Proposals Summary'>
                    {props.lstResolutionType.length > ARRAY_HAS_NO_LENGTH ? (
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
              </div>
            </Card>
          </div>
          <div className=' row mt-3'>
            <Card title='Tools'>
              <div className={bem2.b('')}>
                {[toolListItems[3]].length > ARRAY_HAS_NO_LENGTH && [toolListItems[3]].map((element, index) => (
                  <div className='row ms-03rem' key={`row${index + 1}`}>
                    {element.productItems.length > ARRAY_HAS_NO_LENGTH && element.productItems.map((childelement, index) =>
                      bindTools(childelement, index)
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className='row mt-3 mb-2'>
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
          <div className='row'>
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

VotingPortal.propTypes = {
  btnIdForExpandData: PropTypes.any,
  cardTitle: PropTypes.string,
  dashboardIDValue: PropTypes.number,
  handleSetBtnIdForExpandData: PropTypes.func,
  isLoadingDashboard: PropTypes.bool,
  isLoadingMagazinesReport: PropTypes.bool,
  lstResolutionType: PropTypes.array,
  magazinesReport3_data: PropTypes.array,
  resolutionsTrackerData: PropTypes.func,
  viewPDFFileName: PropTypes.string,
  votingPortalTop3News: PropTypes.array
};

VotingPortal.defaultProps = {
  cardTitle: '',
  dashboardIDValue: 0,
  handleSetBtnIdForExpandData: () => {},
  isLoadingDashboard: false,
  isLoadingMagazinesReport: false,
  lstResolutionType: [],
  magazinesReport3_data: [],
  resolutionsTrackerData: () => {},
  viewPDFFileName: '',
  votingPortalTop3News: []
};

export default React.memo(VotingPortal);
