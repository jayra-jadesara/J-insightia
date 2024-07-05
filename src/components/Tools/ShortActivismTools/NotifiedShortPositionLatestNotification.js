import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import {
  NOTIFIED_SHORT_POSITION_DATA,
  COMPANY_OVERVIEW,
  UP_ARROW_BLUE_IMG,
  DOWN_ARROW_RED_IMG,
  N0_CHANGE_IMG,
  NEW_POSITION_IMG,
  QUERY_PID
} from '../../../constants/PathsConstant';
import Table from '../../GeneralForm/Table';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow
} from '../../../utils/AgGridFunctions';
import { dateToNull } from '../../../utils/general-util';
import { NUMBER_ZERO } from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const NotifiedShortPositionLatestNotification = ({
  lstAiSRecentShortPositions,
  trialStatus,
  userMessage,
  procedureRunningEstimateTime,
  isLoadingLatestNotificationData,
  trialUserDisableDownload
}) => {
  const gridOptionLatestNotification = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="my-css-class btn-simple btn-link text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstAiSRecentShortPositions.filter((c) => c.company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}${QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="my-css-class btn-simple btn-link">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstAiSRecentShortPositions.filter((c) => c.company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}${QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 250,
        chartDataType: 'category',
        getQuickFilterText
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        type: ['setColumn', 'enableRowGroup'],
        chartDataType: 'category',
        minWidth: 50,
        getQuickFilterText
      },
      {
        headerName: 'Announcement Date',
        field: 'latest_date',
        type: ['dateColumn', 'enableRowGroup'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 50,
        getQuickFilterText,
        cellClass: 'dateFormat',
      },
      {
        headerName: 'Investor',
        field: 'Investor',
        type: ['setColumn', 'enableRowGroup'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 250,
        getQuickFilterText
      },
      {
        headerName: 'Date of Initial Position',
        field: 'initial_date',
        type: ['dateColumn', 'enableRowGroup'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 50,
        getQuickFilterText,
        cellClass: 'dateFormat',
      },
      {
        headerName: 'Initial Short Position (%)',
        field: 'initial_position',
        type: ['numberColumn', 'enableRowGroup'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 15,
        getQuickFilterText
      },
      {
        headerName: 'Latest Disclosed Position (%)',
        field: 'latest_position',
        type: ['numberColumn', 'enableRowGroup'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 15,
        getQuickFilterText
      },
      {
        headerName: 'Change Since Last Notified',
        field: 'change_since_last_notified',
        cellRenderer: (params) => {
          if (params.value !== undefined && params.value > 0) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<div><img src=${UP_ARROW_BLUE_IMG} alt="flag" /></div>`;
            return eDiv;
          }
          if (params.value !== undefined && params.value < 0) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<div><img src=${DOWN_ARROW_RED_IMG} alt="flag" /></div>`;
            return eDiv;
          }
          if (params.value !== undefined && params.value === NUMBER_ZERO) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<div><img src=${N0_CHANGE_IMG} alt="flag" /></div>`;
            return eDiv;
          }
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<div><img src=${NEW_POSITION_IMG} alt="flag" /></div>`;
          return eDiv;
        },
        minWidth: 30
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    rowData:
      lstAiSRecentShortPositions.length > 0 &&
      lstAiSRecentShortPositions.map((x) => ({
        ...x,
        latest_date: dateToNull(x.latest_date, 'dd-mmm-yy', true),
        initial_date: dateToNull(x.initial_date, 'dd-mmm-yy', true),
        latest_position: parseFloat(x.latest_position).toFixed(2),
        initial_position: parseFloat(x.initial_position).toFixed(2),
        TrialStatus: trialStatus,
        allowDownload: true
      })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    aggFuncs: {
      'count(Dist)': distinctCounts
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    tableSmallLabel: userMessage
  };

  return (
    <Page key={1}>
      <div className='row mt-3 '>
        <div className='col-sm-8 text-end' />
        <div className='col-sm-4 text-end end-0 '>
          <Link to={NOTIFIED_SHORT_POSITION_DATA} className='btn btn-primary '>
            Most Shorted Companies
          </Link>
        </div>
      </div>
      <div className='row '>
        <div className='col-12'>
          {isLoadingLatestNotificationData ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
              </div>
            </div>
          ) : lstAiSRecentShortPositions.length > 0 ? (
            <Table
              IsShowCard={false}
              title=''
              smalltitle=''
              gridOptions={gridOptionLatestNotification}
              enableCharts
              hideExcelDownloadIcon={trialUserDisableDownload}
            />
          ) : (
            msgConst.SUPPORT_TEAM_EMAIL_MSG
          )}
        </div>
      </div>
    </Page>
  );
};

NotifiedShortPositionLatestNotification.propTypes = {
  getAiSRecentShortPositionsReq: PropTypes.func,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  handleResetLoader: PropTypes.func,
  handleOnChangeLatestNotificationDdlCountriesAndState: PropTypes.func,
  lstDdlAISCountriesAndState: PropTypes.array,
  lstAiSRecentShortPositions: PropTypes.array,
  lstDdlAISCountriesAndStateLetestNotificationSelection: PropTypes.object,
  trialStatus: PropTypes.bool,
  isLoadingLatestNotificationData: PropTypes.bool,
  userMessage: PropTypes.string,
  procedureRunningEstimateTime: PropTypes.number
};

NotifiedShortPositionLatestNotification.defaultProps = {
  getAiSRecentShortPositionsReq: () => null,
  handleOnChangeLatestNotificationDdlCountriesAndState: () => null,
  getProcedureRunningEstimateTimeReq: () => null,
  handleResetLoader: () => null,
  lstDdlAISCountriesAndState: [],
  lstAiSRecentShortPositions: [],
  lstDdlAISCountriesAndStateLetestNotificationSelection: {},
  trialStatus: false,
  isLoadingLatestNotificationData: false,
  userMessage: '',
  procedureRunningEstimateTime: undefined
};

export default withRouter(React.memo(NotifiedShortPositionLatestNotification));
