import React, { lazy } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import { filters } from '../../../utils/AgGridFunctions';
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import { dateToNull, lazyRetry } from '../../../utils/general-util';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const D3PieChart = lazy(() =>
  lazyRetry(() => import('../../GeneralForm/D3PieChart'))
);
const D3barchart = lazy(() =>
  lazyRetry(() => import('../../GeneralForm/D3barchart'))
);
const Card = lazy(() => lazyRetry(() => import('../../GeneralForm/Card')));
const Table = lazy(() => lazyRetry(() => import('../../GeneralForm/Table')));

const bem = bn.create('activismOverview');

const ActivismOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { width } = useWindowDimensions();
  const breakpointMobilescreen = 768;
  const MOBILESCREEN = width >= breakpointMobilescreen;
  const breakpointBigscreen = 1920;
  const BIGSCREEN = width >= breakpointBigscreen;

  const gridOptions_ActivistCampaignSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: 'Investor(s) (Campaign Start Year)',
            field: 'campaign_name',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            minWidth: query.print ? 675 : BIGSCREEN ? 300 : 160,
            maxWidth: query.print ? 675 : null,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              eDiv.className = 'text-wrap';
              const itemArr = params.data.campaign_name
                .split('#| ')
                .filter((item) => item);

              itemArr.forEach((d, i) => {
                if (params.data.investor_id.split(',')[i] === undefined) {
                  eDiv.innerHTML = '';
                } else {
                  eDiv.innerHTML += `<a rel="noopener noreferrer" class="text-secondary" 
                    href="${pathConst.INVESTOR_ACTIVISM_CAMPAIGNS}${
                    pathConst.QUERY_INVESTOR
                  }${params.data.investor_id.split(',')[i].trim()}">
                    ${d}
                    ${
                      params.data.investor_id.split(',').length === i + 1
                        ? ''
                        : ', '
                    }</a>
                    ${
                      params.data.investor_id.split(',').length === i + 1
                        ? ''
                        : '<br/>'
                    }
                    `;
                }
              });
              return eDiv;
            },
          },
        ],
      },
      {
        headerName: 'Campaign Details',
        headerTooltip: false,
        children: [
          {
            headerName: 'Campaign Start Date',
            field: 'Start_Date',
            minWidth: query.print ? 120 : 100,
            maxWidth: query.print ? 120 : 130,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
              : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
          },
          {
            headerName: 'Campaign End Date',
            field: 'End_Date',
            minWidth: query.print ? 120 : 100,
            maxWidth: query.print ? 120 : 130,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
              : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
          },
          {
            headerName: 'Campaign TFR',
            field: 'Campaign_TFR_per',
            minWidth: query.print ? 120 : 100,
            maxWidth: query.print ? 120 : 130,
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            cellClassRules: {
              redFont: (params) => params.data.Campaign_TFR < 0,
              greenFont: (params) => params.data.Campaign_TFR > 0,
            },
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Campaign_TFR !== '') {
                let colorTFR = '';
                if (params.data.Campaign_TFR < 0) {
                  colorTFR = 'text-danger';
                } else if (params.data.Campaign_TFR > 0) {
                  colorTFR = 'text-green';
                } else {
                  colorTFR = 'text-primary';
                }
                eDiv.innerHTML += `<div class="${colorTFR}">${
                  params.data.Campaign_TFR_per !== ''
                    ? params.data.Campaign_TFR_per
                    : ''
                }</div>`;
                return eDiv;
              }
              eDiv.innerHTML +=
                '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
          },
        ],
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: MOBILESCREEN,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 3 },
    isfloatingFilter: false,
    rowData: props.table_ActivistCampaignSummary.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Start_Date:
        x.Start_Date !== undefined &&
        x.Start_Date !== '' &&
        x.Start_Date !== null
          ? dateToNull(x.Start_Date, 'dd-mmm-yy', true)
          : '',
      End_Date:
        x.End_Date !== undefined && x.End_Date !== '' && x.End_Date !== null
          ? dateToNull(x.End_Date, 'dd-mmm-yy', true)
          : '',
      Campaign_TFR:
        x.Campaign_TFR !== undefined &&
        x.Campaign_TFR !== null &&
        x.Campaign_TFR !== ''
          ? Number(checkValuesToFixed(x.Campaign_TFR))
          : '',
      Campaign_TFR_per:
        x.Campaign_TFR !== undefined &&
        x.Campaign_TFR !== null &&
        x.Campaign_TFR !== ''
          ? `${checkValuesToFixed(x.Campaign_TFR)}%`
          : '-',
    })),
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isgroupChildHeaderVertical: true,
      isHeaderChildren: true,
      groupHeaderHeight: 40,
      oneFieldWithoutChild: true,
    },
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_ActivistCampaignTimeline = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'summary_date',
        minWidth: query.print ? 100 : 80,
        maxWidth: query.print ? 100 : 80,
        type: ['dateColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
      },
      {
        headerName: 'Summary',
        field: 'summary_text',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 935 : 600,
        maxWidth: query.print ? 935 : null,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: MOBILESCREEN,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_ActivistCampaignTimeline.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      summary_date:
        x.summary_date !== undefined &&
        x.summary_date !== null &&
        x.summary_date !== ''
          ? dateToNull(x.summary_date, 'dd-mmm-yy')
          : '',
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  React.useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoading]);

  return (
    <Page
      key={1}
      className={
        query.print ? 'cr-ActivismOverviewPDF pt-3 pb-3' : bem.b('pt-3 pb-3')
      }
    >
      {props.isLoading ? (
        msgConst.LOADING
      ) : (
        <>
          <div className='row' id='loadItem'>
            {props.company_overview.has_activism !== null && (
              <div
                className={
                  query.print
                    ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 text-center '
                    : 'col-xs-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 text-center '
                }
              >
                <Card title='Activism Summary'>
                  {props.company_overview.has_activism ===
                  numConst.NUMBER_ZERO ? (
                    <div
                      className={props.TrialStatus ? 'pt-4 blurrytext' : 'pt-4'}
                    >
                      <img
                        src={`${window.location.origin}${pathConst.GREEN_FLAG_LARGE}`}
                        height='85'
                        alt='Green flag'
                      />
                      <div className='text-primary text-center font-italic mt-4'>
                        No Current Activist Campaign
                      </div>
                    </div>
                  ) : (
                    <div
                      className={props.TrialStatus ? 'pt-4 blurrytext' : 'pt-4'}
                    >
                      <img
                        src={`${window.location.origin}${pathConst.RED_FLAG_LARGE}`}
                        height='85'
                        alt='Red flag'
                      />
                      <div className='text-primary text-center font-italic'>
                        Current Activist Campaign
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {!query.print && props.table_ActivistCampaignSummary.length > 0 && (
              <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-4 '>
                <ErrorBoundary hasCard cardtitle='Activist Campaigns'>
                  <Table
                    IsShowCard
                    pageTitle='Activist Campaigns'
                    title='Activist Campaigns'
                    smalltitle=''
                    gridOptions={gridOptions_ActivistCampaignSummary}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                  />
                </ErrorBoundary>
              </div>
            )}

            {props.activismTypeGraphdata.length > 0 && (
              <div
                className={
                  query.print
                    ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 '
                    : 'col-xs-6 col-sm-6 col-md-6 col-lg col-xl-3 '
                }
              >
                <ErrorBoundary hasCard cardtitle='Activist Campaigns'>
                  <D3PieChart
                    data={props.activismTypeGraphdata}
                    cardtitle='Activist Campaigns'
                    isComp={false}
                    isInvest={false}
                    innerRadius={40}
                    outerRadius={100}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
            {props.activismLocationGraphData.length > 0 && (
              <div
                className={
                  query.print
                    ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-2 '
                    : 'col-xs-6 col-sm-6 col-md-6 col-lg col-xl-3 '
                }
              >
                <ErrorBoundary hasCard cardtitle='Activist Location'>
                  <D3PieChart
                    data={props.activismLocationGraphData}
                    cardtitle='Activist Location'
                    isComp={false}
                    isInvest={false}
                    innerRadius={40}
                    outerRadius={100}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>

          {query.print && props.table_ActivistCampaignSummary.length > 0 && (
            <div className='row pdfpagebreak'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              <ErrorBoundary hasCard cardtitle='Activist Campaigns'>
                  <Table
                    IsShowCard
                    pageTitle='Activist Campaigns'
                    title='Activist Campaigns'
                    smalltitle=''
                    gridOptions={gridOptions_ActivistCampaignSummary}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
              </ErrorBoundary>
              </div>
            </div>
          )}

          {props.activsimPublicDemandGraphData.length > 0 && (
            <div className='row pdfpagebreakinsideavoid pb-4'>
              <div className='chart col-12'>
                <ErrorBoundary hasCard cardtitle='Public Demands Summary'>
                  <D3barchart
                    title='Public Demands Summary'
                    addedClass='pb-5 line-height-normal'
                    data={props.activsimPublicDemandGraphData}
                    keys={['value']}
                    xkeysLabel={['label']}
                    innerRadius={60}
                    outerRadius={120}
                    tickTextVertically
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {props.table_ActivistCampaignTimeline.length > 0 && (
            <div className='row'>
              <div className='col-md-12 col-12'>
                <ErrorBoundary hasCard cardtitle='Timelines'>
                  <Table
                    IsShowCard
                    pageTitle='Activist Campaign Timeline'
                    title='Timelines'
                    smalltitle=''
                    addedClass='pdfpb-30'
                    gridOptions={gridOptions_ActivistCampaignTimeline}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

export default withRouter(React.memo(ActivismOverview));
