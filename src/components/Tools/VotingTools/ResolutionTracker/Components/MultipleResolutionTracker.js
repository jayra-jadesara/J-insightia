import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../../../GeneralForm/ProgressBar';
import Table from '../../../../GeneralForm/Table';
import {
  filters,
  setNextGroupColumnText,
} from '../../../../../utils/AgGridFunctions';
import InvestorComparatorConstant from '../../../../../constants/InvestorComparatorConstant';
import { NUMBER_HUNDRED } from '../../../../../constants/NumberConstants';
import {
  NORECORDS,
  SUPPORT_TEAM_EMAIL_MSG,
} from '../../../../../constants/MessageConstans';

const MultipleResolutionTracker = (props) => {
  const {
    isResolutionByInvestorFilterLoading,
    procedureRunningEstimateTime,
    lstResolutionByInvestorfilterData,
    currentResolutionTypeSelection,
    handleInvestorTrackerOptionsSelection,
    handleOnInvestorTrackerdetailsClick,
    handleResetHistoricalTrendsSelection,
    handleResetHistoricalDetailsSelection,
    getResolutionsTypeIdByNameReq,
    handleResetLoader,
    handleOnHistoricalTrendsClick,
  } = props;
  const {
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
    INVESTOR_COMPARATOR_MORE_DETAILS,
    INVESTOR_COMPARATOR_TRENDS,
  } = InvestorComparatorConstant;

  const commonFields = [
    {
      headerName: 'Meetings (#)',
      field: 'number_of_meetings',
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 100,
    },
    {
      headerName: 'Proposals (#)',
      field: 'votes_cast',
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 100,
    },
    {
      headerName: 'Results (#)',
      field: 'number_with_results',
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 100,
    },
    {
      headerName: 'For (%)',
      field: 'for_pcent',
      valueGetter(params) {
        if (params.data !== undefined) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.for_pcent).toFixed(0);
          }
          return parseFloat(params.data.for_pcent).toFixed(1);
        }
      },
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 80,
    },
    {
      headerName: 'Agt (%)',
      field: 'against_pcent',
      valueGetter(params) {
        if (params.data !== undefined) {
          if (params.data.against_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.against_pcent).toFixed(0);
          }
          return parseFloat(params.data.against_pcent).toFixed(1);
        }
      },
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 80,
    },
    {
      headerName: 'W/H Abs (%)',
      field: 'with_abs',
      valueGetter(params) {
        if (params.data !== undefined) {
          if (params.data.with_abs === NUMBER_HUNDRED) {
            return parseFloat(params.data.with_abs).toFixed(0);
          }
          return parseFloat(params.data.with_abs).toFixed(1);
        }
      },
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 80,
    },
    {
      headerName: 'ISS Support %',
      field: 'ISS_For_pcent',
      valueGetter(params) {
        if (params.data !== undefined) {
          if (params.data.ISS_For_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.ISS_For_pcent).toFixed(0);
          }
          return parseFloat(params.data.ISS_For_pcent).toFixed(1);
        }
      },
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 100,
    },
    {
      headerName: 'GL Support %',
      field: 'GL_For_pcent',
      valueGetter(params) {
        if (params.data !== undefined) {
          if (params.data.GL_For_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.GL_For_pcent).toFixed(0);
          }
          return parseFloat(params.data.GL_For_pcent).toFixed(1);
        }
      },
      aggFunc: 'getNext-ColumnVal',
      minWidth: 80,
      maxWidth: 100,
    },
  ];

  function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }

  function MoreDetailFn(params, pTypedata, proposalType) {
    return (
      <div>
        <button
          type='button'
          onClick={async () => {
            await handleResetLoader();
            await handleResetHistoricalDetailsSelection();
            let lavel;
            if (pTypedata.lavel === INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL) {
              lavel = 'proposal_top_level';
            }
            if (pTypedata.lavel === INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL) {
              lavel = 'Category_Sub_level';
            }
            if (pTypedata.lavel === INVESTOR_COMPARATOR_PROPOSAL_TYPE) {
              lavel = 'proposal_type';
            }
            await handleInvestorTrackerOptionsSelection(
              lavel,
              proposalType,
              params.value,
              INVESTOR_COMPARATOR_MORE_DETAILS
            );
            await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
              handleOnInvestorTrackerdetailsClick(res);
            });
          }}
          className='btn btn-primary btn-sm'
        >
          More Details
        </button>
      </div>
    );
  }
  function TrendsFn(params, pTypedata, proposalType) {
    return (
      <div>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={async () => {
            await handleResetHistoricalTrendsSelection();
            await handleResetLoader();
            await handleResetHistoricalTrendsSelection();
                await handleResetLoader();
                let pTypedata;
                let nodeField = params.node.field;
                let nodeKey = params.node.key;
                let proposalType = params.data
                  ? params.data.proposal_type
                  : null;
                if (nodeKey !== 'All') {
                  if (proposalType !== null && proposalType.includes('[')) {
                    proposalType = addStr(
                      proposalType,
                      proposalType.indexOf('['),
                      '|'
                    );
                  }
                }
                if (params.data.proposal_top_level !== null && params.data.Category_Sub_level === null && params.data.proposal_type === null) {
                  if (params.data.proposal_top_level === 'All') {
                    nodeField = 'proposal_top_level';
                    nodeKey = params.data.proposal_top_level;
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
                      proposalType: params.data.proposal_top_level,
                    };
                  } else {
                    nodeField = 'proposal_top_level';
                    nodeKey = params.data.proposal_top_level;
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                      proposalType: params.data.proposal_top_level,
                    };
                  }
                } else if (params.data.proposal_top_level !== null && params.data.Category_Sub_level !== null && params.data.proposal_type === null) {
                  if (nodeKey !== null) {
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.node.key,
                  };
                } else {
                  nodeField = 'Category_Sub_level';
                  nodeKey = params.data.Category_Sub_level;
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.data.Category_Sub_level,
                  };
                }
                } else {
                  nodeField = 'proposal_type';
                  nodeKey = params.data.proposal_type;
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                    proposalType: proposalType,
                  };
                }

                props.handledChangeResolutionType(pTypedata);
            // await handleResetInvestorComparatorTool();
            let lavel;
            if (pTypedata.lavel === INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL) {
              lavel = 'proposal_top_level';
            }
            if (pTypedata.lavel === INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL) {
              lavel = 'Category_Sub_level';
            }
            if (pTypedata.lavel === INVESTOR_COMPARATOR_PROPOSAL_TYPE) {
              lavel = 'proposal_type';
            }
            await handleInvestorTrackerOptionsSelection(nodeField, nodeKey, params.value, INVESTOR_COMPARATOR_TRENDS);
            await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
              handleOnHistoricalTrendsClick(res);
            });
          }}
        >
          Trends
        </button>
      </div>
    );
  }

  const gridOptionInvestorComparator = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'proposal_top_level',
        type: ['rowGroup', 'hiddenField', 'enableValue'],
        tooltipField: 'proposal_top_level',
      },
      {
        headerName: 'Resolution Type',
        field: 'Category_Sub_level',
        type: ['rowGroup', 'hiddenField', 'enableValue'],
        tooltipField: 'Category_Sub_level',
      },
      {
        headerName: 'Resolution Type',
        field: 'proposal_type',
        type: ['hiddenField', 'enableValue'],
        tooltipField: 'proposal_type',
      },
      {
        headerName: 'Voting Detail',
        minWidth: 100,
        maxWidth: 100,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        cellClass: 'ps-2 pe-2',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={async () => {
                await handleResetLoader();
                let pTypedata;
                let nodeField = params.node.field;
                let nodeKey = params.node.key;
                let proposalType = params.data
                  ? params.data.proposal_type
                  : null;
                if (nodeKey !== 'All') {
                  if (proposalType !== null && proposalType.includes('[')) {
                    proposalType = addStr(
                      proposalType,
                      proposalType.indexOf('['),
                      '|'
                    );
                  }
                }
                if (params.node.field === 'proposal_top_level') {
                  if (nodeKey === 'All') {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
                      proposalType: params.node.key,
                    };
                  } else {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                      proposalType: params.node.key,
                    };
                  }
                } else if (params.node.field === 'Category_Sub_level') {
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.node.key,
                  };
                } else {
                  nodeField = 'proposal_type';
                  nodeKey = params.data.proposal_type;
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                    proposalType: proposalType,
                  };
                }
                await handleInvestorTrackerOptionsSelection(
                  nodeField,
                  nodeKey,
                  params.value,
                  INVESTOR_COMPARATOR_MORE_DETAILS
                );
                await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                  handleOnInvestorTrackerdetailsClick(res);
                });
              }}
              className='btn btn-primary btn-sm'
            >
              More Details
            </button>
          </div>
        ),
      },
      {
        headerName: 'Historical Trends',
        field: 'HistoricalTrends',
        minWidth: 100,
        maxWidth: 100,
        cellStyle: {
          textAlign: 'left',
        },
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async () => {
                await handleResetHistoricalTrendsSelection();
                await handleResetLoader();
                let pTypedata;
                let nodeField = params.node.field;
                let nodeKey = params.node.key;
                let proposalType = params.data
                  ? params.data.proposal_type
                  : null;
                if (nodeKey !== 'All') {
                  if (proposalType !== null && proposalType.includes('[')) {
                    proposalType = addStr(
                      proposalType,
                      proposalType.indexOf('['),
                      '|'
                    );
                  }
                }
                if (params.node.field === 'proposal_top_level') {
                  if (nodeKey === 'All') {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
                      proposalType: params.node.key,
                    };
                  } else {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                      proposalType: params.node.key,
                    };
                  }
                } else if (params.node.field === 'Category_Sub_level') {
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.node.key,
                  };
                } else {
                  nodeField = 'proposal_type';
                  nodeKey = params.data.proposal_type;
                  pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                    proposalType: proposalType,
                  };
                }

                await handleInvestorTrackerOptionsSelection(
                  nodeField,
                  nodeKey,
                  params.value,
                  INVESTOR_COMPARATOR_TRENDS
                );
                props.handledChangeResolutionType(pTypedata);
                await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                  handleOnHistoricalTrendsClick(res);
                });
              }}
            >
              Trends
            </button>
          </div>
        ),
      },
      ...commonFields,
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: 'Resolution Type',
      field: 'proposal_type',
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
      },
      tooltipField: 'proposal_type',
    },
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData:
      lstResolutionByInvestorfilterData.length > 0 &&
      lstResolutionByInvestorfilterData.map((x) => ({
        ...x,
        TrialStatus: false,
        allowDownload: false,
        proposal_top_level:
          x.proposal_top_level === null &&
          x.Category_Sub_level === null &&
          x.proposal_type === null
            ? 'All'
            : x.proposal_top_level,
      })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    headerHeight: 70,
    getRowHeight(params) {
      if (params.node.data && params.node.data.Category_Sub_level === null) {
        return 0;
      }
      if (params.node.data && params.node.data.proposal_type === null) {
        return 0;
      }
    },
  };

  const gridOptionInvestorTrackerProposalTypeTopLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'proposal_top_level',
        minWidth: 350,
        tooltipField: 'proposal_top_level',
      },
      {
        headerName: 'Voting Detail',
        minWidth: 100,
        maxWidth: 100,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        cellClass: 'ps-2 pe-2',
        cellRendererFramework: (params) => {
          const pTypedata = {
            lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
            proposalType: params.data.proposal_top_level,
          };
          return MoreDetailFn(params, pTypedata, params.data.proposal_top_level);
        },
      },
      {
        headerName: 'Historical Trends',
        field: 'HistoricalTrends',
        minWidth: 100,
        maxWidth: 100,
        cellStyle: {
          textAlign: 'left',
        },
        cellRendererFramework: (params) => {
          const pTypedata = {
            lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
            proposalType: params.data.proposal_top_level,
          };
          return TrendsFn(params, pTypedata, params.data.proposal_top_level);
        },
      },
      ...commonFields,
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData:
      lstResolutionByInvestorfilterData.length > 0 &&
      lstResolutionByInvestorfilterData.map((x) => ({
        ...x,
        TrialStatus: false,
        allowDownload: false,
        proposal_top_level:
          x.proposal_top_level === null &&
          x.Category_Sub_level === null &&
          x.proposal_type === null
            ? 'All'
            : x.proposal_top_level,
      })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    headerHeight: 70,
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
  };

  const gridOptionInvestorTrackerProposalTypeSubLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'Category_Sub_level',
        minWidth: 220,
        tooltipField: 'Category_Sub_level',
      },
      {
        headerName: 'Investor Detail',
        minWidth: 100,
        maxWidth: 100,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        cellClass: 'ps-2 pe-2',
        cellRendererFramework: (params) => {
          const pTypedata = {
            lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
            proposalType: params.data.Category_Sub_level,
          };
          return MoreDetailFn(params, pTypedata, params.data.Category_Sub_level);
        },
      },
      {
        headerName: 'Historical Trends',
        field: 'HistoricalTrends',
        minWidth: 100,
        maxWidth: 100,
        cellStyle: {
          textAlign: 'left',
        },
        cellRendererFramework: (params) => {
          const pTypedata = {
            lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
            proposalType: params.data.Category_Sub_level,
          };
          return TrendsFn(params, pTypedata, params.data.Category_Sub_level);
        },
      },
      ...commonFields,
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData:
      lstResolutionByInvestorfilterData.length > 0 &&
      lstResolutionByInvestorfilterData.map((x) => ({
        ...x,
        TrialStatus: false,
        allowDownload: false,
        proposal_top_level:
          x.proposal_top_level === null &&
          x.Category_Sub_level === null &&
          x.proposal_type === null
            ? 'All'
            : x.proposal_top_level,
      })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
  };

  const gridOptionInvestorTrackerProposalType = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'proposal_type',
        minWidth: 220,
      },
      {
        headerName: 'Investor Detail',
        minWidth: 100,
        maxWidth: 100,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        cellClass: 'ps-2 pe-2',
        cellRendererFramework: (params) => {
          const proposalType = params.data ? params.data.proposal_type : null;
          let proposalTypeMod = params.data ? params.data.proposal_type : null;
          if (proposalTypeMod !== null && proposalTypeMod.includes('[')) {
            proposalTypeMod = addStr(proposalTypeMod, proposalTypeMod.indexOf('['), '|');
          }
          const pTypedata = {
            lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
            proposalType: proposalTypeMod,
          };
          return MoreDetailFn(params, pTypedata, proposalType);
        },
      },
      {
        headerName: 'Historical Trends',
        field: 'HistoricalTrends',
        minWidth: 100,
        maxWidth: 100,
        cellStyle: {
          textAlign: 'left',
        },
        cellRendererFramework: (params) => {
          const proposalType = params.data ? params.data.proposal_type : null;
          let proposalTypeMod = params.data ? params.data.proposal_type : null;
          if (proposalTypeMod !== null && proposalTypeMod.includes('[')) {
            proposalTypeMod = addStr(proposalTypeMod, proposalTypeMod.indexOf('['), '|');
          }
          const pTypedata = {
            lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
            proposalType: proposalTypeMod,
          };
          return TrendsFn(params, pTypedata, proposalType);
        },
      },
      ...commonFields,
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData:
      lstResolutionByInvestorfilterData.length > 0 &&
      lstResolutionByInvestorfilterData.map((x) => ({
        ...x,
        TrialStatus: false,
        allowDownload: false,
        proposal_top_level:
          x.proposal_top_level === null &&
          x.Category_Sub_level === null &&
          x.proposal_type === null
            ? 'All'
            : x.proposal_top_level,
      })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
  };
function addDataToExportTable() {
  if (currentResolutionTypeSelection === INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL) {
    const data = {
      colDefsMedalsIncluded: gridOptionInvestorComparator.colDefsMedalsIncluded,
      data: lstResolutionByInvestorfilterData
    };
    props.setMultiresolutionTableData(data);
  } else if (currentResolutionTypeSelection === INVESTOR_COMPARATOR_PROPOSAL_TYPE) {
      const data = {
        colDefsMedalsIncluded: gridOptionInvestorTrackerProposalType.colDefsMedalsIncluded,
        data: lstResolutionByInvestorfilterData
      };
      props.setMultiresolutionTableData(data);
  } else if (currentResolutionTypeSelection === INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL) {
      const data = {
        colDefsMedalsIncluded: gridOptionInvestorTrackerProposalTypeSubLevel.colDefsMedalsIncluded,
        data: lstResolutionByInvestorfilterData
      };
      props.setMultiresolutionTableData(data);
  } else {
    const data = {
      colDefsMedalsIncluded: gridOptionInvestorTrackerProposalTypeTopLevel.colDefsMedalsIncluded,
      data: lstResolutionByInvestorfilterData
    };
    props.setMultiresolutionTableData(data);
  }
}
  useEffect(() => {
    addDataToExportTable();
  }, [lstResolutionByInvestorfilterData, props.handledChangeResolutionType]);
  return (
    <div>
      {isResolutionByInvestorFilterLoading ? (
        procedureRunningEstimateTime !== undefined && (
          <div className='vh-100'>
            <div className='h-50'>
              <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
            </div>
          </div>
        )
      ) : (
        <div id='MultipleResolutionTracker' className='row pt-3'>
          {lstResolutionByInvestorfilterData.length > 0 ? (
            <>
              {currentResolutionTypeSelection ===
                INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL && (
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptionInvestorComparator}
                  hideExcelDownloadIcon
                  enableCharts
                />
              )}

              {currentResolutionTypeSelection ===
                INVESTOR_COMPARATOR_PROPOSAL_TYPE && (
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptionInvestorTrackerProposalType}
                  hideExcelDownloadIcon
                  enableCharts
                />
              )}

              {currentResolutionTypeSelection ===
                INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL && (
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptionInvestorTrackerProposalTypeSubLevel}
                  hideExcelDownloadIcon
                  enableCharts
                />
              )}

              {currentResolutionTypeSelection ===
                INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL && (
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptionInvestorTrackerProposalTypeTopLevel}
                  hideExcelDownloadIcon
                  enableCharts
                />
              )}
            </>
          ) : (
            SUPPORT_TEAM_EMAIL_MSG
          )}
        </div>
      )}
    </div>
  );
};

MultipleResolutionTracker.propTypes = {
  isResolutionByInvestorFilterLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.number,
  currentResolutionTypeSelection: PropTypes.number,
  lstResolutionByInvestorfilterData: PropTypes.array,
  handleResetLoader: PropTypes.func,
  handleInvestorTrackerOptionsSelection: PropTypes.func,
  handleOnInvestorTrackerdetailsClick: PropTypes.func,
  getResolutionsTypeIdByNameReq: PropTypes.func,
  handleResetHistoricalTrendsSelection: PropTypes.func,
  handleResetHistoricalDetailsSelection: PropTypes.func,
  handleOnHistoricalTrendsClick: PropTypes.func,
};

MultipleResolutionTracker.defaultProps = {
  isResolutionByInvestorFilterLoading: true,
  procedureRunningEstimateTime: undefined,
  currentResolutionTypeSelection:
    InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
  lstResolutionByInvestorfilterData: [],
  handleResetLoader: () => null,
  handleInvestorTrackerOptionsSelection: () => null,
  handleOnInvestorTrackerdetailsClick: () => null,
  getResolutionsTypeIdByNameReq: () => null,
  handleResetHistoricalTrendsSelection: () => null,
  handleResetHistoricalDetailsSelection: () => null,
  handleOnHistoricalTrendsClick: () => null,
};

export default MultipleResolutionTracker;
