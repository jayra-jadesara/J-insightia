import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import { gridWidthValuesXLrg, gridWidthReport, gridWidthValuesLrg } from '../../../utils/table-tools-util';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../utils/AgGridFunctions';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { dateToNull } from '../../../utils/general-util';
import {
  DIRECTORSHIP_AND_EXECUTIVE,
  GOVERNANCE_DIRECTORS,
  GOVERNANCE_OVERVIEW,
  QUERY_DIRECTOR,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';

const UpcomingEventsTool = (props) => {
  const gridOption_UpcomingMeetings = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'Meeting_date',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: ['dateColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Company',
        field: 'Company_name',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 290,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        wrapText: true,
        autoHeight: true,
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.meetingCardData &&
                props.meetingCardData !== undefined &&
                props.meetingCardData.length > 0 &&
                props.meetingCardData.filter((c) => c.Company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${GOVERNANCE_OVERVIEW}${QUERY_PID}${lstData[0].pid}`,
                  '_self'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.meetingCardData &&
                props.meetingCardData !== undefined &&
                props.meetingCardData.length > 0 &&
                props.meetingCardData.filter((c) => c.Company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${GOVERNANCE_OVERVIEW}${QUERY_PID}${lstData[0].pid}`,
                  '_self'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
      },
      {
        headerName: 'Proxy Statement',
        field: 'proxy_statement',
        ...gridWidthReport,
        cellRendererFramework: (params) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='link-primary text-secondary'
            href={params.data.proxy_statement}
          >
            View
          </a>
        ),
      },
      {
        headerName: 'Next Shareholder Proposal Deadline',
        field: 'shareholder_prop_deadline',
        type: ['dateColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: 'Next Director Nomination Deadline',
        field: 'nomination_deadline',
        type: ['dateColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: 'Company HQ',
        field: 'company_HQ',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap',
        field: 'Market Cap',
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap Category',
        field: 'Market Cap Category',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Exchange',
        field: 'exchange_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Index',
        field: 'index_names',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        filter: 'agTextColumnFilter',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Symbol',
        field: 'symbol',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        filter: 'agTextColumnFilter',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    rowData:
      props.meetingCardData &&
      props.meetingCardData !== undefined &&
      props.meetingCardData.length > 0 &&
      props.meetingCardData.map((x) => ({
        ...x,
        allowDownload: true,
        Meeting_date: dateToNull(x.Meeting_date, 'dd-mmm-yy', true),
        shareholder_prop_deadline: dateToNull(x.shareholder_prop_deadline, 'dd-mmm-yy', true),
        nomination_deadline: dateToNull(x.nomination_deadline, 'dd-mmm-yy', true),
        //   TrialStatus: trialStatus,
      })),
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

  const gridOption_UpcomingAppointmentsAndDepartures = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'Director_since',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: ['dateColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 290,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        getQuickFilterText,
        wrapText: true,
        autoHeight: true,
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.appointmentsAndDeparturesCardData &&
                props.appointmentsAndDeparturesCardData !== undefined &&
                props.appointmentsAndDeparturesCardData.length > 0 &&
                props.appointmentsAndDeparturesCardData.filter((c) => c.company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${GOVERNANCE_DIRECTORS}${QUERY_PID}${lstData[0].pid}`,
                  '_self'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.appointmentsAndDeparturesCardData &&
                props.appointmentsAndDeparturesCardData !== undefined &&
                props.appointmentsAndDeparturesCardData.length > 0 &&
                props.appointmentsAndDeparturesCardData.filter((c) => c.company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${GOVERNANCE_DIRECTORS}${QUERY_PID}${lstData[0].pid}`,
                  '_self'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
      },
      {
        headerName: 'Name',
        field: 'name',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 150,
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count'],
        wrapText: true,
        autoHeight: true,
        getQuickFilterText,
        filter: 'agSetColumnFilter',
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.appointmentsAndDeparturesCardData &&
                props.appointmentsAndDeparturesCardData !== undefined &&
                props.appointmentsAndDeparturesCardData.length > 0 &&
                props.appointmentsAndDeparturesCardData.filter((c) => c.name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${lstData[0].director_id}`,
                  '_self'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData =
                props.appointmentsAndDeparturesCardData &&
                props.appointmentsAndDeparturesCardData !== undefined &&
                props.appointmentsAndDeparturesCardData.length > 0 &&
                props.appointmentsAndDeparturesCardData.filter((c) => c.name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${lstData[0].director_id}`,
                  '_self'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
      },
      {
        headerName: 'Type (s)',
        field: 'director_type',
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
        //filter: "agTextColumnFilter",
      },
      {
        headerName: 'Start / End',
        field: 'event_type',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 130,
        getQuickFilterText,
        // filter: "agTextColumnFilter",
      },
      {
        headerName: 'Company HQ',
        field: 'company_HQ',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap',
        field: 'Market Cap',
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Market Cap Category',
        field: 'Market_Cap_Category',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Exchange',
        field: 'exchange_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Index',
        field: 'index_names',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        filter: 'agTextColumnFilter',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
      {
        headerName: 'Symbol',
        field: 'symbol',
        type: ['setColumn', 'enableRowGroup', 'hiddenField'],
        filter: 'agTextColumnFilter',
        ...gridWidthValuesXLrg,
        getQuickFilterText,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    quickSearchFilter: true,
    rowData:
      props.appointmentsAndDeparturesCardData &&
      props.appointmentsAndDeparturesCardData !== undefined &&
      props.appointmentsAndDeparturesCardData.length > 0 &&
      props.appointmentsAndDeparturesCardData.map((x) => ({
        ...x,
        allowDownload: true,
        Director_since: dateToNull(x.Director_since, 'dd-mmm-yy', true),
      })),
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
  };

  return (
    <Page {...props} key={1}>
      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='row'>
                <label htmlFor='inputPassword' className='col-sm-4 col-form-label'>
                  Output Fields:
                </label>
                <div className='col-sm-8 p-2'>
                  <div className='form-check form-check-inline '>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='inlineRadioOptions'
                      id='individualChecked'
                      value='option1'
                      onClick={() => props.handleSwitchDataAndStats(true)}
                      defaultChecked={props.isMeetingData}
                    />
                    <label className='form-check-label' htmlFor='individualChecked'>
                      Meetings
                    </label>
                  </div>
                  <div className='form-check form-check-inline '>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='inlineRadioOptions'
                      id='GroupChecked'
                      value='option2'
                      onClick={() => props.handleSwitchDataAndStats(false)}
                      defaultChecked={!props.isMeetingData}
                    />
                    <label className='form-check-label' htmlFor='GroupChecked'>
                      Appointments / Departures
                    </label>
                  </div>
                  {/* <div className='form-check form-check-inline '>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='inlineRadioOptions'
                      id='GroupChecked'
                      value='option2'
                      onClick={() => props.handleSwitchDataAndStats(false)}
                      defaultChecked={!props.isMeetingData}
                    />
                    <label className='form-check-label' htmlFor='GroupChecked'>
                      Proposal Deadline Dates
                    </label>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-3'>
        {props.isMeetingData ? (
          <div className='mb-3'>
            <div className='col-12'>
              {props.isLoadingMeetingData ? (
                <div className='vh-100'>
                  <div className='h-50'>
                    <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                  </div>
                </div>
              ) : props.meetingCardData && props.meetingCardData !== undefined && props.meetingCardData.length > 0 ? (
                <div className='row '>
                  <Table
                    IsShowCard
                    title=''
                    smalltitle=''
                    gridOptions={gridOption_UpcomingMeetings}
                    hideExcelDownloadIcon={props.trialUserDisableDownload}
                  />
                </div>
              ) : (
                msgConst.SUPPORT_TEAM_EMAIL_MSG
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className='mb-2'>
              {props.appointmentsAndDeparturesCardData &&
              props.appointmentsAndDeparturesCardData !== undefined &&
              props.appointmentsAndDeparturesCardData.length > 0 ? (
                <Table
                  IsShowCard
                  title=''
                  smalltitle=''
                  gridOptions={gridOption_UpcomingAppointmentsAndDepartures}
                  hideExcelDownloadIcon={props.trialUserDisableDownload}
                />
              ) : (
                msgConst.SUPPORT_TEAM_EMAIL_MSG
              )}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default withRouter(React.memo(UpcomingEventsTool));
