import React from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import {
  ACTIVISTSHORTS_CAMPAIGNS,
  GREEN_FLAG_LARGE,
  QUERY_PID,
  RED_FLAG_LARGE
} from '../../../constants/PathsConstant';
import D3LineChart from '../../GeneralForm/D3LineChart';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import bn from '../../../utils/bemnames';
import Card from '../../GeneralForm/Card';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import { history } from '../../../utils/navigation-util';
import {
  checkValuesToFixed,
  setCellStyleFinancial,
  gridWidthDates,
  gridWidthValues,
  gridWidthValuesLrg
} from '../../../utils/table-tools-util';
import { SM_MAX_WIDTH } from '../../../constants/ScreenSizeConstant';
import { dateToNull } from '../../../utils/general-util';
import messageConst from '../../../constants/MessageConstans';
import numConst from '../../../constants/NumberConstants';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const ActivistShortsOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const bem = bn.create('activistShortsOverview');
  const { width } = useWindowDimensions();

  const handelDdl = (e) => {
    props.ddlShortSellerCampaignData.forEach((x) => {
      if (e !== undefined && e.data !== undefined) {
        if (x.value === e.data.campaign_summary_id) {
          props.handleShortSellerCampaign(x);
          history.push(`${ACTIVISTSHORTS_CAMPAIGNS}${QUERY_PID}${query.pid}`);
        }
      }
    });
  };

  // Activist Short sellers activity gridoptions
  const gridOptionsActivistShortSellers = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'name',
        type: ['autoHeightTrue'],
        minWidth: 180,
        maxWidth: query.print ? 180 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Announce Date',
        field: 'date_first_invested',
        cellClass: props.TrialStatus
          ? 'dateFormat ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'dateFormat ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['dateColumn'],
        minWidth: 100,
        maxWidth: query.print ? 100 : null
      },
      {
        headerName: 'Allegations',
        field: 'campaignDetails1',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 100,
        maxWidth: query.print ? 100 : null
      },
      {
        headerName: 'One Week Campaign Return (%)',
        field: 'price_change_since_exit',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 100,
        maxWidth: query.print ? 100 : null,
        cellRendererFramework: (params) =>
          params.data.price_change_since_exit !== ''
            ? params.data.price_change_since_exit
            : '',
        cellClassRules: {
          redFont: (params) => params.data.price_change_since_exit < 0,
          greenFont: (params) => params.data.price_change_since_exit > 0
        },
        cellStyle: (params) =>
          params.data.price_change_since_exit !== '' &&
          setCellStyleFinancial(params.data.price_change_since_exit)
      },
      {
        headerName: 'Campaign Return (%)',
        field: 'price_change',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 100,
        maxWidth: query.print ? 100 : null,
        cellRendererFramework: (params) =>
          params.data.price_change !== '' ? params.data.price_change : '',
        cellClassRules: {
          redFont: (params) => params.data.price_change < 0,
          greenFont: (params) => params.data.price_change > 0
        },
        cellStyle: (params) =>
          params.data.price_change !== '' &&
          setCellStyleFinancial(params.data.price_change)
      },
      {
        headerName: 'Campaign Status',
        field: 'current',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: query.print ? 100 : null
      },
      {
        headerName: 'Campaign',
        field: 'campaign',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 90,
        maxWidth: query.print ? 90 : null,
        cellRendererFramework: (params) => {
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={`${window.location.protocol}//${window.location.host}${ACTIVISTSHORTS_CAMPAIGNS}${QUERY_PID}${query.pid}&cmpid=${params.data.campaign_summary_id}`}
              >
                View
              </a>
            );
          }
          return (
            <div
              className='text-secondary Link'
              onClick={(e) => {
                e.preventDefault();
                handelDdl(params);
              }}
            >
              Detail
            </div>
          );
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < SM_MAX_WIDTH,
      columns: [
        {
          colId: 'name',
          pinned: 'left'
        }
      ]
    },
    headerHeight: 60,
    paggination: { isPagging: !query.print, pageSize: 3 },
    isfloatingFilter: false,
    rowData: props.aiSInvestorForCompanyrowData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      date_first_invested:
        x.date_first_invested !== null && x.date_first_invested !== undefined
          ? dateToNull(x.date_first_invested, 'dd-mmm-yy', true)
          : '',
      price_change_since_exit:
        x.price_change_since_exit !== null &&
        x.price_change_since_exit !== undefined
          ? checkValuesToFixed(x.price_change_since_exit, 1)
          : '',
      price_change:
        x.price_change !== null && x.price_change !== undefined
          ? checkValuesToFixed(x.price_change, 1)
          : '',
      current: x.current === numConst.NUMBER_ONE ? 'Current' : 'Ended',
      campaign:
        x.campaign_summary_id !== null && x.campaign_summary_id !== undefined
          ? x.campaign_summary_id
          : ''
    }))
  };

  // Current Short sellers activity gridoptions, includes non-activists
  const gridOptionsCurrentShortPositions = {
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Date Disclosed',
            field: 'date_disclosure',
            flex: 2,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext'
              : 'ws-normal-lh24',
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              eDiv.innerHTML =
                params.data.date_disclosure !== null
                  ? dateToNull(params.data.date_disclosure, 'dd-mmm-yy', true)
                  : '';
              return eDiv;
            }
          },
          {
            headerName: 'Net Position (%)',
            type: 'rightAligned',
            field: 'Net_position',
            flex: 1,
            cellRendererFramework: (params) =>
              checkValuesToFixed(params.data.Net_position)
          }
        ]
      },
      getDetailRowData(params) {
        params.successCallback(params.data.historicPositions);
      }
    },
    isRowMaster(dataItem) {
      return dataItem ? dataItem.historicPositions.length > 0 : false;
    },
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'Investor',
        cellRenderer: 'agGroupCellRenderer',
        type: ['autoHeightTrue'],
        minWidth: 200,
        maxWidth: null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Position First Disclosed',
        field: 'date_first_disc',
        ...gridWidthDates,
        type: ['dateColumn', 'flex1']
      },
      {
        headerName: 'Latest Disclosed',
        field: 'date_most_recent_disc',
        type: ['dateColumn', 'flex1'],
        ...gridWidthValues
      },
      {
        headerName: 'Current Short Position (%)',
        field: 'net_position',
        type: 'rightAligned',
        flex: 1,
        ...gridWidthValues,
        cellRendererFramework: (params) =>
          checkValuesToFixed(params.data.Net_position)
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    // alignedGrids: ["investor_name", "net_position"],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'investor_name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: props.activismshortCurrentShortPositionrowData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      date_most_recent_disc:
        x.date_most_recent_disc !== null &&
        x.date_most_recent_disc !== undefined
          ? dateToNull(x.date_most_recent_disc, 'dd-mmm-yy', true)
          : '',
      date_first_disc:
        x.date_first_disc !== null && x.date_first_disc !== undefined
          ? dateToNull(x.date_first_disc, 'dd-mmm-yy', true)
          : ''
    }))
  };

  // Footer for current short sellers with total of current short net postions
  const gridOptionsCurrentShortPositionsFooter = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Total',
        field: 'investor_name_footer',
        flex: 2,
        cellRendererFramework: () => <strong>Total</strong>
      },
      {
        headerName: 'Current Short Position (%)',
        field: 'net_position_total',
        type: 'rightAligned',
        flex: 1,
        cellRendererFramework: (params) => (
          <strong>{checkValuesToFixed(params.data)}</strong>
        )
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    headerHeight: 0,
    // alignedGrids: ["investor_name", "net_position"],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'investor_name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowClass: 'bold-row',
    rowData: [
      props.activismshortCurrentShortPositionrowData
        .map((el) => el.Net_position)
        .reduce((curr, next) => curr + next, 0)
    ]
  };

  // Historic Short sellers activity gridoptions, includes non-activists & TODO innertable with historic data
  const gridOptionsHistoricShortPositions = {
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Date Disclosed',
            field: 'date_disclosure',
            flex: 2,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'dateFormat ws-normal-lh24 ag-cell-blurrytext'
              : 'dateFormat ws-normal-lh24',
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              eDiv.innerHTML =
                params.data.date_disclosure !== null
                  ? dateToNull(params.data.date_disclosure, 'dd-mmm-yy', true)
                  : '';
              return eDiv;
            }
          },
          {
            headerName: 'Net Position (%)',
            type: 'rightAligned',
            field: 'Net_position',
            flex: 1,
            cellRendererFramework: (params) =>
              checkValuesToFixed(params.data.Net_position)
          }
        ]
      },
      getDetailRowData(params) {
        params.successCallback(params.data.historicPositions);
      }
    },
    isRowMaster(dataItem) {
      return dataItem ? dataItem.historicPositions.length > 0 : false;
    },
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'Investor',
        minWidth: 300,
        flex: 3,
        cellRenderer: 'agGroupCellRenderer',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext'
          : 'ws-normal-lh24'
      },
      {
        headerName: 'Position First Disclosed',
        field: 'first_position_date',
        type: ['dateColumn', 'flex1'],
        cellClass: props.TrialStatus
          ? 'dateFormat ws-normal-lh24 ag-cell-blurrytext text-center'
          : 'dateFormat ws-normal-lh24 text-center',
        ...gridWidthDates
      },
      {
        headerName: 'Maximum Short Position (%)',
        field: 'max_position_net',
        ...gridWidthValuesLrg,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ag-right-aligned-cell'
          : 'ws-normal-lh24 ag-right-aligned-cell',
        cellRendererFramework: (params) =>
          checkValuesToFixed(params.data.max_position_net)
      },
      {
        headerName: 'Final Notification - Date (Position %)',
        field: 'final_position',
        ...gridWidthDates,
        type: ['dateColumn', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ag-right-aligned-cell'
          : 'ws-normal-lh24 ag-right-aligned-cell',
        cellRendererFramework: (params) => (
          <>
            {dateToNull(params.data.final_position, 'dd-mmm-yy', true)}
            {'\u00A0'}({params.data.Net_position})
          </>
        )
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'investor_name',
          pinned: 'left'
        }
      ]
    },
    headerHeight: 50,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: props.activistShortHistoricShortPositionrowData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      first_position_date:
        x.first_position_date !== null && x.first_position_date !== undefined
          ? dateToNull(x.first_position_date, 'dd-mmm-yy', true)
          : ''
    }))
  };

  // summery table
  // const gridOptionSummary = {
  //   colDefsMedalsIncluded: [
  //     {
  //       headerName: 'Investor',
  //       field: 'name',
  //       flex: 1,
  //       cellRendererFramework: (params) => (
  //         <div>
  //           <Link to={COMPANY_SEARCH}>{params.data.name}</Link>
  //         </div>
  //       )
  //     },
  //     {
  //       headerName: 'Announcement Date',
  //       field: 'action_date',
  //       flex: 1,
  //       ...gridWidthDates,
  //       cellRendererFramework: (params) => <div>{dateToNull(params.data.action_date, 'dd-mmm-yy', true)}</div>
  //     },
  //     {
  //       headerName: 'Allegations',
  //       field: 'latest_close_value',
  //       flex: 1,
  //       cellRendererFramework: (params) => <div>{params.data.campaignDetails[0].all_allegations}</div>
  //     },
  //     {
  //       headerName: 'Campaign Status',
  //       field: 'Camp_status',
  //       flex: 1,
  //       ...gridWidthValues,
  //       cellRendererFramework: (params) => <div>{params.data.Camp_status}</div>
  //     },
  //     {
  //       headerName: 'Campaign',
  //       field: 'campaign',
  //       flex: 1,
  //       ...gridWidthLink,
  //       cellRendererFramework: (params) => (
  //         <div
  //           className='text-secondary Link'
  //           onClick={() => {
  //             handelDdl(params);
  //           }}
  //         >
  //           Detail
  //         </div>
  //       )
  //     }
  //   ],
  //     columnTypes: filters,
  // colDefsMedalsExcluded: [],
  //   pinColumns: {
  //     isPinOption: false,
  //     columns: [
  //       {
  //         colId: 'summary_date',
  //         pinned: 'left'
  //       }
  //     ]
  //   },
  //   paggination: { isPagging: false },
  //   isfloatingFilter: false,
  //   rowData: aiSInvestorForCompanyrowData.map((x) => ({ ...x, TrialLog }))
  // };

  // timeline table

  const gridOptionsActivismSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'summary_date',
        cellClass: props.TrialStatus
          ? 'dateFormat ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'dateFormat ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['dateColumn'],
        minWidth: 100,
        maxWidth: query.print ? 100 : 150
      },
      {
        headerName: 'Summary',
        field: 'summary_text',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 935,
        maxWidth: query.print ? 935 : null
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'summary_date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.aiSActivismSummaryrowData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      summary_date:
        x.summary_date !== null && x.summary_date !== undefined
          ? dateToNull(x.summary_date, 'dd-mmm-yy', true)
          : ''
    }))
  };

  const gridOptionStockEvents = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Recall Date',
        field: 'recall_date',
        cellClass: props.TrialStatus
          ? 'dateFormat ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'dateFormat ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['dateColumn'],
        minWidth: 100,
        maxWidth: query.print ? 90 : 100,
        cellRendererFramework: (params) => <div>{dateToNull(params.data.recall_date, 'dd-mmm-yy', true)}</div>
      },
      {
        headerName: 'Brand Name',
        field: 'brand_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: query.print ? 200 : 250
      },
      {
        headerName: 'Product Description',
        field: 'product_description',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: query.print ? 200 : 230
      },
      {
        headerName: 'Product Type(s)',
        field: 'product_type',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: query.print ? 200 : 250
      },
      {
        headerName: 'Recall Reason Description',
        field: 'recall_reason',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 250,
        maxWidth: query.print ? 250 : null
      },
      {
        headerName: 'Terminated Recall',
        field: 'terminated',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: query.print ? 130 : 150
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 80,
        maxWidth: query.print ? 70 : 80,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pt-1 pe-1'
          : 'ws-normal-lh24 ps-1 pt-1 pe-1',
        cellRendererFramework: (params) => {
          if (params.data.url === null) return null;
          if (query.print) {
            return (
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='link-primary text-secondary'
                href={params.data.url}
              >
                View
              </a>
            );
          }
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary'
              href={params.data.url}
            >
              View
            </a>
          );
        },
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    pivotMode: false,
    rowData: props.rowData_FDAProductRecallList.map((x) => ({
      ...x,
      TrialStatus: props.trialStatus,
      allowDownload: false
    })),
    paggination: { isPagging: !query.print, pageSize: 10 }
  };

  React.useEffect(() => {
    if (!props.isLoadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoadingData]);

  return (
    <Page {...props} key={1} className={bem.b('pt-3')}>
      {props.isLoadingData ? (
        messageConst.LOADING
      ) : (
        <>
          <div className='row pt-2' id='loadItem'>
            {props.company_overview !== undefined &&
              props.company_overview.has_short_campaign !== null &&
              props.company_overview.has_short_campaign !== undefined && (
                <div className='col-lg-3 col-sm-12 col-md-3 text-center'>
                  <Card title='Shorts Summary'>
                    <div className='pt-4'>
                      <img
                        className={
                          props.TrialStatus ? 'mp-2 blurrytext' : 'mp-2'
                        }
                        src={`${window.location.origin}${
                          props.company_overview.has_short_campaign ===
                          numConst.NUMBER_ZERO
                            ? GREEN_FLAG_LARGE
                            : RED_FLAG_LARGE
                        }`}
                        height='85'
                        alt={
                          props.company_overview.has_short_campaign ===
                          numConst.NUMBER_ZERO
                            ? 'Green flag'
                            : 'Red flag'
                        }
                      />
                      <div className='text-primary text-center font-italic'>
                        {props.company_overview.has_short_campaign ===
                        numConst.NUMBER_ZERO
                          ? 'No Recent Activist Short Campaigns'
                          : 'Recent Activist Short Campaigns'}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

            {props.activistShortTotalShortPositionrowData !== undefined &&
            props.activistShortTotalShortPositionrowData.length > 0 ? (
              <div className='col-lg-9 col-md-9 col-12 text-center'>
                <div className='col-lg-12'>
                  <div>
                    <ErrorBoundary hasCard cardtitle='Total Shares Held Short Over Time'>
                      <D3LineChart
                        isDummyData={props.TrialStatus}
                        smalltitle=''
                        cardtitle='Total Shares Held Short Over Time'
                        lineData={props.activistShortTotalShortPositionrowData}
                        xAxisKey='thedate'
                        yAxisKey='net_pos'
                        xAxisTitle='Date'
                        yAxisTitle='Total % Shares Held Short'
                        maxValueY
                      />
                    </ErrorBoundary>
                  </div>
                </div>
              </div>
            ) : (
              <div className='col-lg-9 col-md-9'>
                {props.aiSInvestorForCompanyrowData !== undefined &&
                props.aiSInvestorForCompanyrowData.length > 0 ? (
                  <ErrorBoundary hasCard cardtitle='Activist Short Campaigns'>
                    <Table
                      gridOptions={gridOptionsActivistShortSellers}
                      title='Activist Short Campaigns'
                      pageTitle='Activist Short Campaigns'
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                ) : (
                  <Card title='Activist Short Campaigns'>
                    {messageConst.NORECORDS}
                  </Card>
                )}
              </div>
            )}

            {props.aiSInvestorForCompanyrowData.length > 0 &&
              props.activistShortTotalShortPositionrowData.length > 0 && (
                <div className='col-lg-12 col-md-12'>
                  <ErrorBoundary hasCard cardtitle='Activist Short Campaigns'>
                    <Table
                      gridOptions={gridOptionsActivistShortSellers}
                      title='Activist Short Campaigns'
                      pageTitle='Activist Short Campaigns'
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                </div>
              )}
          </div>

          {/* Current Short Positions */}
          {query.print &&
            props.activismshortCurrentShortPositionrowData.length > 0 && (
              <div className='row pdfpagebreak'>
                <div className='col-lg-12 gridOptionsCurrentShortPositions'>
                  <Card
                    IsShowCard
                    isHide={false}
                    title='Current Short Positions'
                    smalltitle=''
                  >
                    {props.activismshortCurrentShortPositionrowData.length >
                    0 ? (
                      <table className='table table-striped tableborder m-0'>
                        <thead>
                          <tr>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '40%' }}
                            >
                              Investor
                            </th>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '20%' }}
                            >
                              Position First Disclosed
                            </th>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '20%' }}
                            >
                              Latest Disclosed
                            </th>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '20%' }}
                            >
                              Short Position
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.activismshortCurrentShortPositionrowData.map(
                            (i, index) => (
                              <>
                                <tr
                                  key={`map_${index + 1}`}
                                  className={
                                    props.TrialStatus
                                      ? index % 2 !== 0
                                        ? 'blurrytext'
                                        : 'oddRowBG blurrytext'
                                      : index % 2 !== 0
                                      ? ''
                                      : 'oddRowBG'
                                  }
                                >
                                  <td className='text-primary fontRowData ptb-2'>
                                    {i.Investor !== '' && (
                                      <>
                                        <img
                                          src='https://cdn-icons-png.flaticon.com/512/566/566015.png'
                                          width='8'
                                          height='10'
                                          alt='Expand Img'
                                          title='Expand'
                                          className=''
                                        />
                                        <span className='ps-2'>
                                          {i.Investor}
                                        </span>
                                      </>
                                    )}
                                  </td>
                                  <td className='text-primary fontRowData ptb-2'>
                                    {dateToNull(
                                      i.date_first_disc,
                                      'dd-mmm-yy',
                                      true
                                    )}
                                  </td>
                                  <td className='text-primary fontRowData ptb-2'>
                                    {dateToNull(
                                      i.date_most_recent_disc,
                                      'dd-mmm-yy',
                                      true
                                    )}
                                  </td>
                                  <td className='text-primary fontRowData ptb-2'>
                                    {checkValuesToFixed(i.Net_position)}
                                  </td>
                                </tr>
                                <tr
                                  key={`child_${index + 1}`}
                                  className={
                                    props.TrialStatus ? 'blurrytext' : ''
                                  }
                                >
                                  <td colSpan='100' className='p-3'>
                                    <table className='table table-striped tableborder m-0'>
                                      <thead>
                                        <tr>
                                          <th
                                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                                            scope='col'
                                            style={{ width: '80%' }}
                                          >
                                            Date Disclosed
                                          </th>
                                          <th
                                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                                            scope='col'
                                            style={{ width: '20%' }}
                                          >
                                            Net Position (%)
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {i.historicPositions.map((i, index) => (
                                          <tr
                                            key={`map_${index + 1}`}
                                            className={
                                              props.TrialStatus
                                                ? index % 2 !== 0
                                                  ? 'blurrytext'
                                                  : 'oddRowBG blurrytext'
                                                : index % 2 !== 0
                                                ? ''
                                                : 'oddRowBG'
                                            }
                                          >
                                            <td className='text-primary fontRowData ptb-2'>
                                              {dateToNull(
                                                i.date_disclosure,
                                                'dd-mmm-yy',
                                                true
                                              )}
                                            </td>
                                            <td className='text-primary fontRowData ptb-2'>
                                              {checkValuesToFixed(
                                                i.Net_position
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </>
                            )
                          )}
                          <tr className='footer'>
                            <td
                              colSpan='3'
                              className='text-primary font-weight-bold'
                            >
                              Total
                            </td>
                            <td
                              colSpan='1'
                              className='text-align-end text-primary font-weight-bold'
                            >
                              {props.activismshortCurrentShortPositionrowData
                                .map((el) => el.Net_position)
                                .reduce((curr, next) => curr + next, 0)
                                .toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      messageConst.NORECORDS
                    )}
                  </Card>
                </div>
              </div>
            )}
          {!query.print &&
            props.activismshortCurrentShortPositionrowData.length > 0 && (
              <div className='row'>
                <div className='col-lg-12 gridOptionsCurrentShortPositions'>
                  {props.activismshortCurrentShortPositionrowData.length > 0 ? (
                    <ErrorBoundary hasCard cardtitle='Current Short Positions'>
                      <Table
                        gridOptions={gridOptionsCurrentShortPositions}
                        gridOptionsFooter={gridOptionsCurrentShortPositionsFooter}
                        title='Current Short Positions'
                        pageTitle='Current Short Positions'
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  ) : (
                    <Card title='Current Short Positions'>
                      {messageConst.NORECORDS}
                    </Card>
                  )}
                </div>
              </div>
            )}

          {/* Historic Short Poisitions */}
          {query.print &&
            props.activistShortHistoricShortPositionrowData.length > 0 && (
              <div className='row'>
                <div className='col-lg-12'>
                  <Card
                    IsShowCard
                    isHide={false}
                    title='Historic Short Poisitions'
                    smalltitle=''
                    addedClass='pdfpagebreak'
                  >
                    {props.activistShortHistoricShortPositionrowData.length >
                    0 ? (
                      <table className='table table-striped tableborder m-0'>
                        <thead>
                          <tr>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '40%' }}
                            >
                              Investor
                            </th>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '20%' }}
                            >
                              Position First Disclosed
                            </th>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '20%' }}
                            >
                              Short Position
                            </th>
                            <th
                              className='text-primary font-weight-bold fontHeaderData ptb-2'
                              scope='col'
                              style={{ width: '20%' }}
                            >
                              Final Notification - Date (Position %)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.activistShortHistoricShortPositionrowData.map(
                            (i, index) => (
                              <>
                                <tr
                                  key={`tr${index + 1}`}
                                  className={
                                    props.TrialStatus
                                      ? index % 2 !== 0
                                        ? 'blurrytext'
                                        : 'oddRowBG blurrytext'
                                      : index % 2 !== 0
                                      ? ''
                                      : 'oddRowBG'
                                  }
                                >
                                  <td className='text-primary fontRowData ptb-2'>
                                    {i.Investor !== '' && (
                                      <>
                                        <img
                                          src='https://cdn-icons-png.flaticon.com/512/566/566015.png'
                                          width='8'
                                          height='10'
                                          alt='Expand Img'
                                          title='Expand'
                                          className=''
                                        />
                                        <span className='ps-2'>
                                          {i.Investor}
                                        </span>
                                      </>
                                    )}
                                  </td>
                                  <td className='text-primary fontRowData ptb-2'>
                                    {dateToNull(
                                      i.first_position_date,
                                      'dd-mmm-yy',
                                      true
                                    )}
                                  </td>
                                  <td className='text-primary fontRowData ptb-2'>
                                    {i.max_position_net}
                                  </td>
                                  <td className='text-primary fontRowData ptb-2'>
                                    {dateToNull(
                                      i.final_position,
                                      'dd-mmm-yy',
                                      true
                                    )}
                                    {'\u00A0'}({i.Net_position})
                                  </td>
                                </tr>
                                <tr
                                  key={`child_${index + 1}`}
                                  className={
                                    props.TrialStatus ? 'blurrytext' : ''
                                  }
                                >
                                  <td colSpan='100' className='p-3'>
                                    <table className='table table-striped tableborder m-0'>
                                      <thead>
                                        <tr>
                                          <th
                                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                                            scope='col'
                                            style={{ width: '80%' }}
                                          >
                                            Date Disclosed
                                          </th>
                                          <th
                                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                                            scope='col'
                                            style={{ width: '20%' }}
                                          >
                                            Net Position (%)
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {i.historicPositions.map((i, index) => (
                                          <tr
                                            key={`tr${index + 1}`}
                                            className={
                                              props.TrialStatus
                                                ? index % 2 !== 0
                                                  ? 'blurrytext'
                                                  : 'oddRowBG blurrytext'
                                                : index % 2 !== 0
                                                ? ''
                                                : 'oddRowBG'
                                            }
                                          >
                                            <td className='text-primary fontRowData ptb-2'>
                                              {dateToNull(
                                                i.date_disclosure,
                                                'dd-mmm-yy',
                                                true
                                              )}
                                            </td>
                                            <td className='text-primary fontRowData ptb-2'>
                                              {checkValuesToFixed(
                                                i.Net_position
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      messageConst.NORECORDS
                    )}
                  </Card>
                </div>
              </div>
            )}
          {!query.print &&
            props.activistShortHistoricShortPositionrowData.length > 0 && (
              <div className='row'>
                <div className='col-lg-12 pt-2'>
                  <ErrorBoundary hasCard cardtitle='Historic Short Poisitions'>
                    <Table
                      gridOptions={gridOptionsHistoricShortPositions}
                      title='Historic Short Poisitions'
                      pageTitle='Historic Short Poisitions'
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            )}

          <div className='row pt-2'>
            <div className='col-lg-12'>
              {props.aiSActivismSummaryrowData.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Timelines'>
                  <Table
                    gridOptions={gridOptionsActivismSummary}
                    title='Timelines'
                    pageTitle='Timelines'
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Timelines'>{messageConst.NORECORDS}</Card>
              )}
            </div>
          </div>

          {props.rowData_FDAProductRecallList.length > 0 && (
            <div className='row'>
              <div className='col-12'>
                <CollapseComponent
                  Heading='FDA Recalls'
                  index='1'
                  isOpen={false}
                  withoutCollapseComponent={query.print}
                  withoutCollapseWithCard={query.print}
                >
                  <Table
                    IsShowCard={false}
                    gridOptions={gridOptionStockEvents}
                    hideExcelDownloadIcon
                  />
                </CollapseComponent>
              </div>
            </div>
          )}

        </>
      )}
    </Page>
  );
};

ActivistShortsOverview.propTypes = {
  location: PropTypes.object.isRequired,
  TrialLog: PropTypes.bool.isRequired,
  aiSInvestorForCompanyrowData: PropTypes.array.isRequired,
  activismshortCurrentShortPositionrowData: PropTypes.array.isRequired,
  activistShortHistoricShortPositionrowData: PropTypes.array.isRequired,
  activistShortTotalShortPositionrowData: PropTypes.array.isRequired,
  allowDownload: PropTypes.bool.isRequired
};

export default withRouter(React.memo(ActivistShortsOverview));
