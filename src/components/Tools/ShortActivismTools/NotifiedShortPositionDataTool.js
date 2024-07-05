import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Table from '../../GeneralForm/Table';
import Page from '../../Page';
import {
  NOTIFIED_SHORT_POSITION_DATA_Latest_Notification,
  COMPANY_OVERVIEW,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../utils/AgGridFunctions';
import msgConst from '../../../constants/MessageConstans';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const NotifiedShortPositionDataTool = ({
  lstShortPosition,
  trialStatus,
  userMessage,
  procedureRunningEstimateTime,
  isLoadingMostShortedData,
  trialUserDisableDownload,
}) => {
  const gridOptionMostShorted = {
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
              const lstData = lstShortPosition.filter((c) => c.company_name === params.value);
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
              const lstData = lstShortPosition.filter((c) => c.company_name === params.value);
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
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 225,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Total Shares Shorted (%)',
        field: 'total_short',
        type: ['numberColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 80,
        chartDataType: 'series',
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count', 'avg'],
        getQuickFilterText,
      },
      {
        headerName: 'No. of Current Short Positions',
        field: 'count_short',
        type: ['numberColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 80,
        chartDataType: 'series',
        aggFuncs: 'avg',
        allowedAggFuncs: ['count(Dist)', 'count', 'avg'],
        getQuickFilterText,
      },
      {
        headerName: 'Company HQ',
        field: 'country_name',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        minWidth: 120,
        maxWidth: 160,
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup'],
        minWidth: 120,
        maxWidth: 160,
        enablePivot: true,
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup'],
        enablePivot: true,
        minWidth: 120,
        maxWidth: 160,
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
        minWidth: 130,
        maxWidth: 180,
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
    pivotMode: false,
    rowData: lstShortPosition.map((x) => ({
      ...x,
      TrialStatus: trialStatus,
      allowDownload: true,
      total_short: x.total_short !== undefined && x.total_short !== null ? x.total_short.toFixed(1) : null,
    })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    tableSmallLabel: userMessage,
  };

  return (
    <Page key={1}>
      <div className='row mt-3'>
        <div className='col-sm-8 text-end' />
        <div className='col-sm-4 text-end end-0 '>
          <Link to={NOTIFIED_SHORT_POSITION_DATA_Latest_Notification} className='btn btn-primary '>
            Latest Short Regulatory Notifications
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          {isLoadingMostShortedData ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
              </div>
            </div>
          ) : lstShortPosition.length > 0 ? (
            <div className=''>
              <Table
                IsShowCard={false}
                title=''
                smalltitle=''
                gridOptions={gridOptionMostShorted}
                enableCharts
                hideExcelDownloadIcon={trialUserDisableDownload}
              />
              <p className='mt-1'>
                <span className='text-danger'>Note :</span> Blanks in the number of short sellers are an unknown number
                as this data is already aggregated
              </p>
            </div>
          ) : (
            msgConst.SUPPORT_TEAM_EMAIL_MSG
          )}
        </div>
      </div>
    </Page>
  );
};

NotifiedShortPositionDataTool.propTypes = {
  getShortPositionsReq: PropTypes.func,
  handleResetLoader: PropTypes.func,
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  handleOnChangeDdlCountriesAndState: PropTypes.func,
  lstDdlAISCountriesAndState: PropTypes.array,
  lstShortPosition: PropTypes.array,
  lstDdlAISCountriesAndStateMostShortedSelection: PropTypes.object,
  trialStatus: PropTypes.bool,
  userMessage: PropTypes.string,
  procedureRunningEstimateTime: PropTypes.number,
  isLoadingMostShortedData: PropTypes.bool,
};

NotifiedShortPositionDataTool.defaultProps = {
  getShortPositionsReq: () => null,
  handleOnChangeDdlCountriesAndState: () => null,
  getProcedureRunningEstimateTimeReq: () => null,
  handleResetLoader: () => null,
  lstDdlAISCountriesAndState: [],
  lstShortPosition: [],
  lstDdlAISCountriesAndStateMostShortedSelection: {},
  trialStatus: false,
  userMessage: '',
  procedureRunningEstimateTime: undefined,
  isLoadingMostShortedData: true,
};

export default withRouter(React.memo(NotifiedShortPositionDataTool));
