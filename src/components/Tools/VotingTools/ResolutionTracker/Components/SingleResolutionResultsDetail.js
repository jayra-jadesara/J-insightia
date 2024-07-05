import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../../../GeneralForm/ProgressBar';
import Table from '../../../../GeneralForm/Table';
import pathConstant from '../../../../../constants/PathsConstant';
import msgConst from '../../../../../constants/MessageConstans';
import { dateToNull } from '../../../../../utils/general-util';
import { filters } from '../../../../../utils/AgGridFunctions';
import useWindowDimensions from '../../../../GeneralForm/useWindowDimensions';

const SingleResolutionResultsDetail = ({
  handleCloseResultsDetail,
  lstResultDetails,
  lstResultDetailsFullDataForExcel,
  pRunningEstTimeForSingleResDetails,
  isLoadingResultDetailsData,
  trialUserDisableDownload,
}) => {
  const { width } = useWindowDimensions();
  const breakpointMobilescreen = 768;
  const MOBILESCREEN = width >= breakpointMobilescreen;

  const gridOptionResultDetails = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
          href="${pathConstant.COMPANY_OVERVIEW}${pathConstant.QUERY_PID}${params.data.PID}">
          ${params.data.company_name}</a>`;
          return eDiv;
        },
        minWidth: 150,
      },
      {
        headerName: 'Meeting Date',
        field: 'meeting_date',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: ['dateColumn'],
        minWidth: 100,
      },
      {
        headerName: 'Meeting Type',
        field: 'meeting_type',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 20,
      },
      {
        headerName: 'Proposal',
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 220,
      },
      {
        headerName: 'ISS Synth',
        field: 'ISS_vote',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 15,
      },
      {
        headerName: 'GL Synth',
        field: 'GL_vote',
        type: ['autoHeightTrue', 'hiddenField'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 15,
      },
      {
        headerName: 'GL Actual',
        field: 'GL_actual',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 15,
      },
      {
        headerName: 'Country',
        field: 'country',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 15,
      },
      {
        headerName: 'Spnsr',
        field: 'sponsor',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 10,
      },
      {
        headerName: 'Vote Result For (%)',
        field: 'votes_for',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 110,
      },
      {
        headerName: 'Vote Result Against (%)',
        field: 'votes_against',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 110,
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'company_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstResultDetails.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false,
      votes_against:
        x.votes_against === null ? '' : parseFloat(x.votes_against).toFixed(1),
      votes_for: x.votes_for === null ? '' : parseFloat(x.votes_for).toFixed(1),
      meeting_date:
        x.meeting_date !== null
          ? dateToNull(x.meeting_date, 'dd-mmm-yy', true)
          : '',
    })),
    quickSearchFilter: false,
    domLayout: 'normal',
    gridHeight: '80vh',
    animateRows: true,
    suppressAggFuncInHeader: true,
    tableSmallLabel:
      lstResultDetails.length > 10000
        ? 'Please note the table below has been restricted to the top 10,000 most recent proposals as this is a large data set. For the full data set please click the above Excel download button.'
        : '',
    selectedColumns: [
      'company_name',
      'meeting_date',
      'meeting_type',
      'proposal_detail',
      'ISS_vote',
      'GL_vote',
      'country',
      'sponsor',
      'votes_for',
      'votes_against',
    ],
  };

  return (
    <>
      <div className='row'>
        <div className='col-6 mb-0'>
          <h4>Results Detail</h4>
        </div>
        <div className='col-3 mb-0' />
        <div className='col-3 mb-0'>
          <button
            type='button'
            className='btn btn-primary btn-sm float-end'
            onClick={handleCloseResultsDetail}
          >
            Close Results Detail
          </button>
        </div>
      </div>
      <div>
        {isLoadingResultDetailsData
          ? (pRunningEstTimeForSingleResDetails !== undefined ? (
              <div className='vh-100'>
                <div className='h-50'>
                  <ProgressBar
                    avgElapsedTime={pRunningEstTimeForSingleResDetails}
                  />
                </div>
              </div>
            ) : (
              <div>{msgConst.LOADING}</div>
            )
          ) : lstResultDetails.length > 0 ? (
              <div className='card p-3'>
                <div
                  className={`text-primary ${
                    !MOBILESCREEN ? '' : 'position-absolute'
                  }`}
                >
                  <p>
                    Please note the table below includes the actual Glass Lewis
                    recommendations. The Excel download will only include
                    synthetic Glass Lewis recommendations.
                  </p>
                </div>
                <div className='row'>
                  <Table
                    IsShowCard={false}
                    title='Resolution Tracker Tool : Results Detail'
                    hideExcelDownloadIcon={trialUserDisableDownload}
                    smalltitle=''
                    gridOptions={gridOptionResultDetails}
                    enableCharts
                    pageTitle='Resolution Tracker Tool : Results Detail'
                  />
                </div>
              </div>
            ) : (
              <div>
                {msgConst.SUPPORT_TEAM_EMAIL_MSG}
              </div>
            )}
      </div>
    </>
  );
};

SingleResolutionResultsDetail.propTypes = {
  handleCloseResultsDetail: PropTypes.func,
  lstResultDetails: PropTypes.array,
  lstResultDetailsFullDataForExcel: PropTypes.array,
  pRunningEstTimeForSingleResDetails: PropTypes.number,
  isLoadingResultDetailsData: PropTypes.bool,
};

SingleResolutionResultsDetail.defaultProps = {
  handleCloseResultsDetail: () => null,
  lstResultDetails: [],
  lstResultDetailsFullDataForExcel: [],
  pRunningEstTimeForSingleResDetails: undefined,
  isLoadingResultDetailsData: true,
};

export default SingleResolutionResultsDetail;
