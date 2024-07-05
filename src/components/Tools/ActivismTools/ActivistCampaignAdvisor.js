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
  gridWidthValues,
  gridWidthDates,
  gridWidthValuesXLrg,
  gridWidthValuesLrg,
} from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';
import {
  ADVISOR_ACTIVISM_OVERVIEW,
  QUERY_COMPANY_ID,
  QUERY_PID,
  QUERY_INVESTOR,
  INVESTOR_ACTIVISM_OVERVIEW,
  ACTIVISM_OVERVIEW,
} from '../../../constants/PathsConstant';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const ActivistCampaignAdvisor = (props) => {
  const gridOptionAdvisorCampaign = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Adviser',
        field: 'intermediary_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            {params.data.company_id !== '' ? (
              <a
                title={params.data.intermediary_name}
                className='text-secondary'
                target='_blank'
                rel='noopener noreferrer'
                href={`${ADVISOR_ACTIVISM_OVERVIEW}${QUERY_COMPANY_ID}${params.data.company_id}`}
              >
                {params.data.intermediary_name}
              </a>
            ) : (
              <span title={params.data.intermediary_name}>{params.data.intermediary_name}</span>
            )}
          </div>
        ),
        getQuickFilterText,
      },
      {
        headerName: 'Investor',
        field: 'activist_name',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            {params.data.investor_id !== '' ? (
              <a
                title={params.data.activist_name}
                className='text-secondary'
                target='_blank'
                rel='noopener noreferrer'
                href={`${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`}
              >
                {params.data.activist_name}
              </a>
            ) : (
              <span title={params.data.activist_name}>{params.data.activist_name}</span>
            )}
          </div>
        ),
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
      },
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            {params.data.PID !== '' ? (
              <a
                title={params.data.company_name}
                className='text-secondary'
                rel='noopener noreferrer'
                target='_blank'
                href={`${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.PID}`}
              >
                {params.data.company_name}
              </a>
            ) : (
              <span title={params.data.company_name}>{params.data.company_name}</span>
            )}
          </div>
        ),
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
      },
      {
        headerName: 'Adviser Type',
        field: 'intermediary_type',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValues,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Acting for',
        field: 'acting_for_v2',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Date Activist Investment Notified',
        field: 'date_first_invested',
        type: ['dateColumn', 'enableRowGroup'],
        enablePivot: true,
        cellClass: 'dateFormat',
        ...gridWidthDates,
        getQuickFilterText,
      },
      {
        headerName: 'Date Activist Exited',
        field: 'exit_date',
        type: ['dateColumn', 'enableRowGroup'],
        enablePivot: true,
        cellClass: 'dateFormat',
        ...gridWidthDates,
        getQuickFilterText,
      },
      {
        headerName: 'Exchange',
        field: 'Exchange',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 160,
        maxWidth: 200,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'sector',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 160,
        maxWidth: 200,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 200,
        maxWidth: 260,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap ($mn)',
        field: 'market_cap_USD',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 140,
        maxWidth: 180,
        chartDataType: 'category',
        hide: true,
        enablePivot: true,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap Category',
        field: 'Market_cap_Category',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 180,
        maxWidth: 220,
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
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    pivotMode: false,
    headerHeight: 60,
    rowData:
      props.lstLawFirmsDataActivismAdvisor !== undefined
        ? props.lstLawFirmsDataActivismAdvisor.map((x) => ({
            ...x,
            //   TrialStatus: trialStatus,
            allowDownload: true,
            date_first_invested: dateToNull(x.date_first_invested, 'dd-mmm-yy', true),
            exit_date: dateToNull(x.exit_date, 'dd-mmm-yy', true),
            //   total_short: x.total_short !== undefined && x.total_short !== null ? x.total_short.toFixed(1) : null,
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

  const gridOptionAdvisorCampaign_Summary = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Adviser',
        field: 'intermediary_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        ...gridWidthValuesXLrg,
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        cellRenderer: (params) => {
          if (params.data.intermediary_name !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = params.data.intermediary_name;
            return eDiv;
          }
          return null;
        },
      },
      {
        headerName: 'Adviser Type',
        field: 'intermediary_type',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
      },
      {
        headerName: 'Campaigns Worked on',
        field: 'count_campaigns',
        type: ['numberColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: 'Campaigns Worked on for Activist',
        field: 'count_campaigns_activist',
        type: ['numberColumn', 'enableRowGroup'],
        enablePivot: true,
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: 'Campaigns Worked on for Company',
        field: 'count_campaigns_company',
        type: ['numberColumn', 'enableRowGroup'],
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
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    pivotMode: false,
    rowData:
      props.lstLawFirmsDataActivismAdvisor_Summary !== undefined
        ? props.lstLawFirmsDataActivismAdvisor_Summary.map((x) => ({
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
        <div className='row mt-3'>
          <div className='col-sm-8 text-end' />
          <div className='col-sm-4 text-end end-0'>
            {!props.toggleSummary ? (
              <button type='button' className='btn btn-primary' onClick={props.handleToggleSwitch}>
                Summary
              </button>
            ) : (
              <button type='button' className='btn btn-primary' onClick={props.handleToggleSwitch}>
                Campaigns
              </button>
            )}
          </div>
        </div>
        <div className='mb-2'>
          {props.isLoadingData ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
              </div>
            </div>
          ) : props.lstLawFirmsDataActivismAdvisor !== undefined ? (
            <Table
              IsShowCard={false}
              title=''
              smalltitle=''
              gridOptions={!props.toggleSummary ? gridOptionAdvisorCampaign : gridOptionAdvisorCampaign_Summary}
              hideExcelDownloadIcon={props.trialUserDisableDownload}
            />
          ) : null}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(ActivistCampaignAdvisor));
