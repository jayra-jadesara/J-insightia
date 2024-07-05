import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../GeneralForm/Table';
import {
  filters,
  setNextGroupColumnText,
} from '../../../../utils/AgGridFunctions';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import { dateToNull } from '../../../../utils/general-util';
import msgConst from '../../../../constants/MessageConstans';
import useWindowDimensions from '../../../GeneralForm/useWindowDimensions';

const SingleInvestorSingleResolutionDetail = ({
  isLoadingVotingDetails,
  handleCloseVoringDetails,
  pRunningEstTimeForVotingDetails,
  lstVotingDetails,
  // Trial
  trialUserDisableDownload,
  TrialStatus,
}) => {
  const { width } = useWindowDimensions();
  const breakpointMobilescreen = 768;
  const MOBILESCREEN = width >= breakpointMobilescreen;

  const gridOptionVotingDetails = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        minWidth: 220,
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        chartDataType: 'category',
      },
      {
        headerName: 'Meeting Date',
        field: 'meeting_date',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'Meeting Type',
        field: 'meeting_type',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'Proposal',
        field: 'proposal_detail',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 120,
      },
      {
        headerName: 'Vote Cast',
        field: 'vote_cast',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'ISS Synth',
        field: 'ISS_vote',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'GL Synth',
        field: 'GL_vote',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue', 'hiddenField'],
        minWidth: 20,
      },
      {
        headerName: 'GL Actual',
        field: 'GL_actual',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'Company HQ',
        field: 'country',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'Spn',
        field: 'sponsor',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'Vote Result For (%)',
        field: 'votes_for',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
      },
      {
        headerName: 'Vote Result Against (%)',
        field: 'votes_against',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: 20,
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
        {
          colId: 'meeting_date',
          pinned: 'left',
        },
        {
          colId: 'meeting_type',
          pinned: 'left',
        },
        {
          colId: 'proposal_detail',
          pinned: 'left',
        },
      ],
    },
    selectedColumns: [
      'company_name',
      'meeting_date',
      'meeting_type',
      'proposal_detail',
      'vote_cast',
      'ISS_vote',
      'GL_vote',
      'country',
      'sponsor',
      'votes_for',
      'votes_against',
    ],
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstVotingDetails.map((x) => {
      let sponsor = '';
      if (x !== undefined) {
        if (x.sponsor === null) {
          sponsor = '-';
        }
        if (x.sponsor === 'Mgmt') {
          sponsor = 'M';
        }
        if (x.sponsor === 'S/H') {
          sponsor = 'S';
        }
      }

      return {
        ...x,
        TrialStatus: TrialStatus,
        allowDownload: false,
        meeting_date:
          x.meeting_date !== null
            ? dateToNull(x.meeting_date, 'dd-mmm-yy', true)
            : null,
        votes_against:
          x.votes_against === null
            ? ''
            : parseFloat(x.votes_against).toFixed(1),
        votes_for:
          x.votes_for === null ? '' : parseFloat(x.votes_for).toFixed(1),
        sponsor: sponsor,
      };
    }),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    quickSearchFilter: false,
    domLayout: lstVotingDetails.length > 15 ? 'normal' : 'autoHeight',
    gridHeight: lstVotingDetails.length > 15 ? '80vh' : null,
    animateRows: true,
    suppressAggFuncInHeader: true,
  };

  return (
    <>
      <div className='row mt-3 mx-1'>
        <div className='col-6 mb-0'>
          <h4>Voting Detail</h4>
        </div>
        <div className='col-3 mb-0' />
        <div className='col-3 mb-0'>
          <button
            type='button'
            className='btn btn-primary btn-sm float-end'
            onClick={handleCloseVoringDetails}
          >
            Close Voting Detail
          </button>
        </div>
      </div>
      <div className='row mt-3 mx-1'>
        {isLoadingVotingDetails
          ? pRunningEstTimeForVotingDetails !== undefined && (
              <div className='vh-100'>
                <div className='h-50'>
                  <ProgressBar
                    avgElapsedTime={pRunningEstTimeForVotingDetails}
                  />
                </div>
              </div>
            )
          : lstVotingDetails.length > 0 ? (
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
                    hideExcelDownloadIcon={trialUserDisableDownload}
                    smalltitle=''
                    gridOptions={gridOptionVotingDetails}
                    enableCharts
                    pageTitle='Investor Voting by Proposal : Voting Detail'
                    title='Investor Voting by Proposal : Voting Detail'
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

SingleInvestorSingleResolutionDetail.propTypes = {
  isLoadingVotingDetails: PropTypes.bool,
  handleCloseVoringDetails: PropTypes.func,
  pRunningEstTimeForVotingDetails: PropTypes.number,
  lstVotingDetails: PropTypes.array,
};

SingleInvestorSingleResolutionDetail.defaultProps = {
  isLoadingVotingDetails: true,
  handleCloseVoringDetails: () => null,
  pRunningEstTimeForVotingDetails: undefined,
  lstVotingDetails: [],
};

export default React.memo(SingleInvestorSingleResolutionDetail);
