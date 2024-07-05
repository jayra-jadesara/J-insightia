import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../utils/AgGridFunctions';
import Table from '../../GeneralForm/Table';
import {
  gridWidthValuesDigits,
  gridWidthDates,
  gridWidthValuesXLrg,
  gridWidthValuesLrg,
  gridWidthReport,
} from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';
import {
  ADVISOR_ACTIVISTSHORT,
  QUERY_COMPANY_ID,
  QUERY_PID,
  QUERY_INVESTOR,
  INVESTOR_OVERVIEW,
  COMPANY_OVERVIEW,
} from '../../../constants/PathsConstant';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const ShortActivistCampaignAdvisor = (props) => {
  const gridOptionShortsAdvisorCampaign = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Adviser',
        field: 'intermediary_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        ...gridWidthValuesDigits,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.company_id !== '') {
            eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" title="${params.data.intermediary_name}" 
            href="${ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${params.data.company_id}">
            ${params.data.intermediary_name}
          </a>`;
          } else {
            eDiv.innerHTML += `<span title="${params.data.intermediary_name}">${params.data.intermediary_name}</span>`;
          }
          return eDiv;
        },
      },
      {
        headerName: 'Investor',
        field: 'activist_name',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        ...gridWidthValuesXLrg,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.investor_id !== '') {
            eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" title="${params.data.activist_name}" 
            href="${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}">
            ${params.data.activist_name}
          </a>`;
          } else {
            eDiv.innerHTML += `<span title="${params.data.activist_name}">${params.data.activist_name}</span>`;
          }
          return eDiv;
        },
      },
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        ...gridWidthValuesXLrg,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.PID !== '') {
            eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" title="${params.data.company_name}" 
            href="${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}">
            ${params.data.company_name}
          </a>`;
          } else {
            eDiv.innerHTML += `<span title="${params.data.company_name}">${params.data.company_name}</span>`;
          }
          return eDiv;
        },
      },
      {
        headerName: 'Adviser Type',
        field: 'intermediary_type',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        ...gridWidthValuesLrg,
        enablePivot: true,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
      },
      {
        headerName: 'Acting for',
        field: 'acting_for_v2',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
      },
      {
        headerName: 'Date Activist Investment Notified',
        field: 'date_first_invested',
        type: ['dateColumn', 'enableRowGroup', 'autoHeightTrue'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        cellClass: 'dateFormat',
        getQuickFilterText,
      },
      {
        headerName: 'Date Activist Exited',
        field: 'exit_date',
        type: ['dateColumn', 'enableRowGroup', 'autoHeightTrue'],
        enablePivot: true,
        cellClass: 'dateFormat',
        ...gridWidthDates,
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 200,
        maxWidth: 280,
        enablePivot: true,
        hide: true,
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'sector',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        hide: true,
        minWidth: 140,
        maxWidth: 180,
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Exchange',
        field: 'Exchange',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 140,
        maxWidth: 200,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap ($mn)',
        field: 'market_cap_USD',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 120,
        maxWidth: 160,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap Category',
        field: 'Market_cap_Category',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 160,
        maxWidth: 200,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    headerHeight: 60,
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    pivotMode: false,
    rowData: props.lstShortLawFirmsDataActivismAdvisor.map((x) => ({
      ...x,
      //   TrialStatus: trialStatus,
      allowDownload: true,
      date_first_invested: dateToNull(x.date_first_invested, 'dd-mmm-yy', true),
      exit_date: dateToNull(x.exit_date, 'dd-mmm-yy', true),
      //   total_short: x.total_short !== undefined && x.total_short !== null ? x.total_short.toFixed(1) : null,
    })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    // tableSmallLabel: userMessage,
  };

  const gridOptionShortsAdvisorCampaign_Summary = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Adviser',
        field: 'intermediary_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        minWidth: 400,
        maxWidth: null,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
      },
      {
        headerName: 'Adviser Type',
        field: 'intermediary_type',
        type: ['setColumn', 'enableRowGroup', 'autoHeightTrue'],
        ...gridWidthReport,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
      },
      {
        headerName: 'Activist Short Campaigns Worked On',
        field: 'count_campaigns',
        type: ['numberColumn', 'enableRowGroup', 'autoHeightTrue'],
        ...gridWidthValuesXLrg,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: 'Activist Short Campaigns Worked On For Investor',
        field: 'count_campaigns_activist',
        type: ['numberColumn', 'enableRowGroup', 'autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        enablePivot: true,
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: 'Activist Short Campaigns Worked On For Company',
        field: 'count_campaigns_company',
        type: ['numberColumn', 'enableRowGroup', 'autoHeightTrue'],
        ...gridWidthValuesXLrg,
        enablePivot: true,
        getQuickFilterText,
        cellStyle: { textAlign: 'center' },
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    headerHeight: 60,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    pivotMode: false,
    rowData:
      props.lstShortLawFirmsDataActivismAdvisor_Summary !== undefined
        ? props.lstShortLawFirmsDataActivismAdvisor_Summary.map((x) => ({
            ...x,
            //   TrialStatus: trialStatus,
            allowDownload: true,
          }))
        : null,
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    // tableSmallLabel: userMessage,
  };

  return (
    <Page {...props} key={1}>
      <div className='row card'>
        <div className='row mt-3 '>
          <div className='col-sm-8 text-end' />
          <div className='col-sm-4 text-end end-0 '>
            {!props.toggleShortsSummary ? (
              <button type='button' className='btn btn-primary' onClick={props.handleToggleShortsSwitch}>
                Summary
              </button>
            ) : (
              <button type='button' className='btn btn-primary' onClick={props.handleToggleShortsSwitch}>
                Campaigns
              </button>
            )}
          </div>
        </div>
        <div className='mb-2'>
          {props.isLoadingShortData ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
              </div>
            </div>
          ) : props.lstShortLawFirmsDataActivismAdvisor !== undefined ? (
            <div className=''>
              <Table
                IsShowCard={false}
                title=''
                smalltitle=''
                gridOptions={
                  !props.toggleShortsSummary ? gridOptionShortsAdvisorCampaign : gridOptionShortsAdvisorCampaign_Summary
                }
                hideExcelDownloadIcon={props.trialUserDisableDownload}
              />
            </div>
          ) : null}
        </div>
      </div>
    </Page>

    /* <Page {...props} key={1}>
          <div className="row card">
          <div className="my-3">
            {props.isLoadingShortData ? (
              <div className="vh-100">
                <div className="h-50">
                     <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} /> 
                </div>
              </div>
            ) : 
              props.lstShortLawFirmsDataActivismAdvisor !== undefined ? (
               <Table IsShowCard={false} title="" smalltitle="" gridOptions={gridOptionShortsAdvisorCampaign} /> 
              ) : null
            }
          </div>
        </div>
    </Page> */
  );
};

export default withRouter(React.memo(ShortActivistCampaignAdvisor));
