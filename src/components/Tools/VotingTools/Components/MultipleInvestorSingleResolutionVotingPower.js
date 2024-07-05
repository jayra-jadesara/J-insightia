import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../GeneralForm/Table';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import msgConst from '../../../../constants/MessageConstans';

const MultipleInvestorSingleResolutionVotingPower = ({
  isLoadVotingPowerData,
  pRunningEstTimeForVotingDetails,
  handleCloseInvestorDetails,
  lstVotingInvestorPower,
  lstVotingPvaImpact,
  trialUserDisableDownload,
}) => {
  const gridOptionVotingPower = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        chartDataType: 'category',
        children: [
          {
            headerName: 'Investor Voting Power',
            field: 'investor_name',
            minWidth: 250,
          },
        ],
      },
      {
        headerName: 'Vote AGAINST',
        chartDataType: 'series',
        children: [
          {
            headerName: 'Avg FOR',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_AvgFor === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_AvgFor).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 20,
          },
          {
            headerName: '% FAIL (50%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_Fail === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_Fail).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 20,
            chartDataType: 'series',
          },
          {
            headerName: '% FAIL (60%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_Fail_60 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_Fail_60).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 20,
            chartDataType: 'series',
          },
          {
            headerName: '% FAIL (75%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_Fail_75 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_Fail_75).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 20,
            chartDataType: 'series',
          },
        ],
      },
      {
        headerName: 'Vote FOR',
        children: [
          {
            headerName: 'Avg FOR',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_AvgFor === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_AvgFor).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 30,
            chartDataType: 'series',
          },
          {
            headerName: '% FAIL(50%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_Fail === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_Fail).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 30,
            chartDataType: 'series',
          },
          {
            headerName: '% FAIL(60%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_Fail_60 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_Fail_60).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 30,
          },
          {
            headerName: '% FAIL(75%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_Fail_75 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_Fail_75).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 30,
            chartDataType: 'series',
          },
        ],
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: null,
    },
    rowData: lstVotingInvestorPower.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false,
    })),
    headerHeight: null,
    domLayout: 'normal',
    gridHeight: '80vh',
    animateRows: true,
  };

  const gridOptionPvaImpact = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        chartDataType: 'category',
        children: [
          {
            headerName: 'PVA Impact',
            field: 'pva',
            minWidth: 250,
          },
        ],
      },
      {
        headerName: 'Recommend AGAINST',
        chartDataType: 'series',
        children: [
          {
            headerName: 'Avg FOR',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_AvgFor === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_AvgFor).toFixed(2)}%`;
              }
              return '';
            },
            minWidth: 20,
          },
          {
            headerName: '% FAIL (50%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_Fail === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_Fail).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 20,
          },
          {
            headerName: '% FAIL (60%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_Fail_60 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_Fail_60).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 20,
          },
          {
            headerName: '% FAIL (75%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.Against_Fail_75 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.Against_Fail_75).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 20,
          },
        ],
      },
      {
        headerName: 'Recommend FOR',
        children: [
          {
            headerName: 'Avg FOR',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_AvgFor === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_AvgFor).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 30,
          },
          {
            headerName: '% FAIL(50%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_Fail === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_Fail).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 30,
          },
          {
            headerName: '% FAIL(60%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_Fail_60 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_Fail_60).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 30,
          },
          {
            headerName: '% FAIL(75%)',
            valueGetter(params) {
              if (params.data !== undefined) {
                if (params.data.For_Fail_75 === null) {
                  return '-';
                }
                return `${parseFloat(params.data.For_Fail_75).toFixed(2)}%`;
              }
              return '';
            },
            chartDataType: 'series',
            minWidth: 30,
          },
        ],
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: null,
    },
    rowData: lstVotingPvaImpact.map((x) => ({
      ...x,
      TrialStatus: false,
      allowDownload: false,
    })),
    headerHeight: null,
  };

  return (
    <>
      {isLoadVotingPowerData ? (
        <div className='vh-100'>
          <div className='h-50'>
            {pRunningEstTimeForVotingDetails !== undefined ? (
              <ProgressBar avgElapsedTime={pRunningEstTimeForVotingDetails} />
            ) : (
            <div className='mt-3'>
              {msgConst.LOADING}
            </div>
          )}
          </div>
        </div>
      ) : (
        <div className='row mt-5'>
          <div className='mx-1 pb-2'>
            <div className='row card mx-1 mt-4 '>
              <div className='row mt-3'>
                <div className='col-6 mb-0'>
                  <h4>Voting Power</h4>
                </div>
                <div className='col-3 mb-0' />
                <div className='col-3 mb-0'>
                  {' '}
                  <button
                    type='button'
                    className='btn btn-primary btn-sm float-end'
                    style={{
                      position: 'absolute',
                      right: '125px',
                      top: '14.5px',
                    }}
                    onClick={handleCloseInvestorDetails}
                  >
                    Close Voting Power
                  </button>
                </div>
              </div>
              <div className='row mx-1'>
                <div className='col-12'>
                  {lstVotingPvaImpact.length > 0 && (
                    <div>
                      <div className='row'>
                        <Table
                          enableCharts
                          IsShowCard={false}
                          title=''
                          smalltitle=''
                          gridOptions={gridOptionPvaImpact}
                          hideExcelDownloadIcon={trialUserDisableDownload}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-12'>
                  {lstVotingInvestorPower.length > 0 ? (
                    <div>
                      <div className='row'>
                        <Table
                          IsShowCard={false}
                          title=''
                          smalltitle=''
                          gridOptions={gridOptionVotingPower}
                          enableCharts
                          hideExcelDownloadIcon={trialUserDisableDownload}
                        />
                      </div>
                    </div>
                  ) : (
                    <>{msgConst.SUPPORT_TEAM_EMAIL_MSG}</>
                  )}
                </div>
              </div>
            </div>
          </div>{' '}
        </div>
      )}
    </>
  );
};

MultipleInvestorSingleResolutionVotingPower.propTypes = {
  isLoadVotingPowerData: PropTypes.bool,
  pRunningEstTimeForVotingDetails: PropTypes.number,
  handleCloseInvestorDetails: PropTypes.func,
  lstVotingInvestorPower: PropTypes.array,
  lstVotingPvaImpact: PropTypes.array,
};

MultipleInvestorSingleResolutionVotingPower.defaultProps = {
  isLoadVotingPowerData: true,
  pRunningEstTimeForVotingDetails: undefined,
  handleCloseInvestorDetails: () => null,
  lstVotingInvestorPower: [],
  lstVotingPvaImpact: [],
};

export default React.memo(MultipleInvestorSingleResolutionVotingPower);
