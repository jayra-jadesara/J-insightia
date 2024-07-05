import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../GeneralForm/Table';
import {
  filters,
  setNextGroupColumnText,
} from '../../../../utils/AgGridFunctions';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import pathConst from '../../../../constants/PathsConstant';
import msgConst from '../../../../constants/MessageConstans';

const MultipleInvestorSingleResolutionDetail = ({
  handleCloseInvestorDetails,
  isLoadingInvestorDetails,
  lstResolutionInvDetails,
  pRunningEstTimeForSingleResDetails,
  handleInvestorDetailsSelection,
  handleOnVotingdetailsClick,
  handleResetLoader,
  trialUserDisableDownload,
}) => {
  const gridOptionInvstorSingleResolutionDetails = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'investor_name',
        minWidth: 220,
        chartDataType: 'category',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a rel="noopener noreferrer" class="text-secondary" 
                href="${pathConst.INVESTOR_VOTING_OVERVIEW}${pathConst.QUERY_INVESTOR}${params.data.investor_id}">
                ${params.data.investor_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Investor ID',
        minWidth: 100,
        headerComponentParams: { displayName: 'Investor Voting' },
        maxWidth: 100,
        field: 'investor_id',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={async () => {
                await handleResetLoader();
                await handleInvestorDetailsSelection(params.value);
                await handleOnVotingdetailsClick(params.value);
              }}
              className='btn btn-primary btn-sm'
            >
              Voting Data
            </button>
          </div>
        ),
      },
      {
        headerName: 'AUM ($ bn)',
        field: 'assets_under_mgmt',
        type: ['autoHeightTrue', 'sortDesc'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 80,
      },
      {
        headerName: 'Meetings (#)',
        field: 'number_meetings',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 80,
      },
      {
        headerName: 'For (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.for_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'Agt (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.against_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.against_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'Abs (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.abstain_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.abstain_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'W/H (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.withhold_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.withhold_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'Split (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.split_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.split_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'ISS Match (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.match_iss_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'GL Match (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.match_gl_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'ISS Against Match (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss_against_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.match_iss_against_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
      {
        headerName: 'GL Against Match (%)',
        type: ['autoHeightTrue'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl_against_pcent === null) {
              return '-';
            }
            return parseFloat(params.data.match_gl_against_pcent).toFixed(1);
          }
          return '';
        },
        minWidth: 80,
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'investor_name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstResolutionInvDetails.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false,
    })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    headerHeight: 70,
    quickSearchFilter: false,
    domLayout: lstResolutionInvDetails.length === 1 ? 'autoHeight' : 'normal',
    gridHeight: lstResolutionInvDetails.length === 1 ? '18vh' : '80vh',
    animateRows: true,
    suppressAggFuncInHeader: true,
    getRowHeight(params) {
      return 50;
    },
  };

  return (
    <>
      {isLoadingInvestorDetails ? (
        <div className='vh-100'>
          <div className='h-50'>
            {pRunningEstTimeForSingleResDetails !== undefined ? (
              <ProgressBar
                avgElapsedTime={pRunningEstTimeForSingleResDetails}
              />
            ) : (
            <div className='mt-3'>
              {msgConst.LOADING}
            </div>
          )}
          </div>
        </div>
      ) : (
        lstResolutionInvDetails.length > 0 && (
          <div className='row mt-5'>
            <div className='mx-1 pb-2'>
              <div className='row mx-1 card border-bottom-0'>
                <div className='row m-1 pt-2'>
                  <div className='col-6 mb-0'>
                    <h4>Investor Details</h4>
                  </div>
                  <div className='col-3 mb-0' />
                  <div className='col-3 mb-0'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm float-end mb-1'
                      onClick={handleCloseInvestorDetails}
                    >
                      Close Investor Detail
                    </button>
                  </div>
                </div>
              </div>
              <div className='row mx-1 card pt-2 pb-3 border-top-0'>
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptionInvstorSingleResolutionDetails}
                  enableCharts
                  hideExcelDownloadIcon={trialUserDisableDownload}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

MultipleInvestorSingleResolutionDetail.propTypes = {
  isLoadingInvestorDetails: PropTypes.bool,
  handleCloseInvestorDetails: PropTypes.func,
  pRunningEstTimeForSingleResDetails: PropTypes.number,
  lstResolutionInvDetails: PropTypes.array,
  handleInvestorDetailsSelection: PropTypes.func,
  handleOnVotingdetailsClick: PropTypes.func,
  handleResetLoader: PropTypes.func,
};

MultipleInvestorSingleResolutionDetail.defaultProps = {
  isLoadingInvestorDetails: true,
  handleCloseInvestorDetails: () => null,
  handleInvestorDetailsSelection: () => null,
  handleOnVotingdetailsClick: () => null,
  pRunningEstTimeForSingleResDetails: undefined,
  lstResolutionInvDetails: [],
  handleResetLoader: () => null,
};

export default React.memo(MultipleInvestorSingleResolutionDetail);
