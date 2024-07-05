import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Table from '../../../GeneralForm/Table';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import {
  filters,
  setNextGroupColumnText,
} from '../../../../utils/AgGridFunctions';
import InvestorComparatorConstant, {
  INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,
} from '../../../../constants/InvestorComparatorConstant';
import {
  gridWidthValuesDigits,
  gridWidthValues,
} from '../../../../utils/table-tools-util';
import { history } from '../../../../utils/navigation-util';
import { NUMBER_HUNDRED } from '../../../../constants/NumberConstants';
import { NORECORDS } from '../../../../constants/MessageConstans';
import ErrorBoundary from '../../../GeneralForm/ErrorBoundary';

const MultipleResolutionForVotingRationale = ({
  isLoading,
  handleInvestorComparatorSelection,
  handleOnInvestordetailsClick,
  procedureRunningEstimateTime,
  lstResolutionsByInvestorFilter,
  getResolutionsTypeIdByNameReq,
  currentResolutionTypeSelection,
  handleResetLoader,
  downloadExcelByJsonFn,
  lstExcelDownload_ResolutionsByInvestorFilter,
  // Trial
  TrialStatus,
}) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });

  function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }

  const {
    INVESTOR_COMPARATOR_MORE_DETAILS,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE,
  } = InvestorComparatorConstant;

  const gridOptionInvestorComparator = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal Type',
        field: 'proposal_top_level',
        type: ['rowGroup', 'hiddenField', 'enableValue', 'autoHeightTrue'],
        chartDataType: 'category',
        minWidth: query.print ? 100 : 200,
        maxWidth: query.print ? 100 : 800,
        cellClass: TrialStatus ? 'ws-normal-lh24 ps-1 pe-1 blurrytext' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Proposal Type',
        field: 'Category_Sub_level',
        type: ['rowGroup', 'hiddenField', 'enableValue', 'autoHeightTrue'],
        chartDataType: 'category',
        minWidth: query.print ? 100 : 200,
        maxWidth: query.print ? 100 : 800,
        cellClass: TrialStatus ? 'ws-normal-lh24 ps-1 pe-1 blurrytext' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Proposal Type',
        field: 'proposal_type',
        type: ['hiddenField', 'enableValue', 'autoHeightTrue'],
        chartDataType: 'category',
        minWidth: query.print ? 100 : 200,
        maxWidth: query.print ? 100 : 800,
        cellClass: TrialStatus ? 'ws-normal-lh24 ps-1 pe-1 blurrytext' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        chartDataType: 'category',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 text-center blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Investor Detail',
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        minWidth: query.print ? 60 : 60,
        maxWidth: query.print ? 60 : 120,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 text-center blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => (
         !query.print && (
            <div>
              <button
                type='button'
                onClick={async () => {
                  await handleResetLoader();
                  let pTypedata;
                  if (params.node.field === 'proposal_top_level') {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                      proposalType: params.node.key,
                    };
                  } else if (params.node.field === 'Category_Sub_level') {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                      proposalType: params.node.key,
                    };
                  } else {
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                      proposalType: params.data.proposal_type,
                    };
                  }
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_MORE_DETAILS
                  );
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnInvestordetailsClick(res);
                  });
                }}
                style={{ lineHeight: '14px' }}
                className={TrialStatus ? 'btn btn-primary btn-sm font-size-small disabled' : 'btn btn-primary btn-sm font-size-small'}
              >
                More Details
              </button>
            </div>
          )
        ),
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 60 : 50,
        maxWidth: query.print ? 60 : 110,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 80 : 50,
        maxWidth: query.print ? 80 : 100,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.for_pcent ? parseFloat(params.data.for_pcent).toFixed(0) : '';
            }
            return params.data.for_pcent ? parseFloat(params.data.for_pcent).toFixed(1) : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.against_pcent === NUMBER_HUNDRED) {
              return params.data.against_pcent ? parseFloat(params.data.against_pcent).toFixed(0) : '';
            }
            return params.data.against_pcent ? parseFloat(params.data.against_pcent).toFixed(1) : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 60,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.split_pcent === NUMBER_HUNDRED) {
              return params.data.split_pcent ? parseFloat(params.data.split_pcent).toFixed(0) : '';
            }
            return params.data.split_pcent ? parseFloat(params.data.split_pcent).toFixed(1) : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 40 : 40,
        maxWidth: query.print ? 40 : 70,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.abstain_pcent === NUMBER_HUNDRED) {
              return params.data.abstain_pcent ? parseFloat(params.data.abstain_pcent).toFixed(0) : '';
            }
            return params.data.abstain_pcent ? parseFloat(params.data.abstain_pcent).toFixed(1) : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 40 : 40,
        maxWidth: query.print ? 40 : 70,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.withheld_pcent ? parseFloat(params.data.withheld_pcent).toFixed(0) : '';
            }
            return params.data.withheld_pcent ? parseFloat(params.data.withheld_pcent).toFixed(1) : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 40 : 40,
        maxWidth: query.print ? 40 : 70,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 70 : 40,
        maxWidth: query.print ? 70 : 110,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 110,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss === undefined) {
              return;
            }
            if (params.data.match_iss === NUMBER_HUNDRED) {
              return params.data.match_iss ? parseFloat(params.data.match_iss).toFixed(0) : '';
            }
            return params.data.match_iss ? parseFloat(params.data.match_iss).toFixed(1) : '';
          }
          return null;
        },
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 110,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl === undefined) {
              return;
            }
            if (params.data.match_gl === NUMBER_HUNDRED) {
              return params.data.match_gl ? parseFloat(params.data.match_gl).toFixed(0) : '';
            }
            return params.data.match_gl ? parseFloat(params.data.match_gl).toFixed(1) : '';
          }
          return null;
        },
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 130,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss_against === undefined) {
              return;
            }
            if (params.data.match_iss_against === NUMBER_HUNDRED) {
              return params.data.match_iss_against ? parseFloat(params.data.match_iss_against).toFixed(0) : '';
            }
            return params.data.match_iss_against ? parseFloat(params.data.match_iss_against).toFixed(1) : '';
          }
          return null;
        },
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 130,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl_against === undefined) {
              return;
            }
            if (params.data.match_gl_against === NUMBER_HUNDRED) {
              return params.data.match_gl_against ? parseFloat(params.data.match_gl_against).toFixed(0) : '';
            }
            return params.data.match_gl_against ? parseFloat(params.data.match_gl_against).toFixed(1) : '';
          }
          return null;
        },
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 50 : 50,
        maxWidth: query.print ? 50 : 130,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.iss_for_match === undefined) {
              return;
            }
            if (params.data.iss_for_match === NUMBER_HUNDRED) {
              return params.data.iss_for_match ? parseFloat(params.data.iss_for_match).toFixed(0) : '';
            }
            return params.data.iss_for_match ? parseFloat(params.data.iss_for_match).toFixed(1) : '';
          }
          return null;
        },
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        chartDataType: 'series',
        minWidth: query.print ? 106 : 50,
        maxWidth: query.print ? 106 : 140,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.gl_for_Match === undefined) {
              return;
            }
            if (params.data.gl_for_Match === NUMBER_HUNDRED) {
              return params.data.gl_for_Match ? parseFloat(params.data.gl_for_Match).toFixed(0) : '';
            }
            return params.data.gl_for_Match ? parseFloat(params.data.gl_for_Match).toFixed(1) : '';
          }
          return null;
        },
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: 'Proposal Type',
      field: 'proposal_type',
      minWidth: query.print ? 170 : 250,
      maxWidth: query.print ? 170 : 800,
      type: ['autoHeightTrue'],
      cellClass: TrialStatus ? 'ws-normal-lh24 ps-1 pe-1 blurrytext' : 'ws-normal-lh24 ps-1 pe-1',
      cellRendererParams: {
        suppressCount: true,
      },
    },
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstResolutionsByInvestorFilter.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
      allowDownload: false,
      proposal_top_level:
        x.proposal_top_level === null && x.Category_Sub_level === null && x.proposal_type === null
          ? 'All'
          : x.proposal_top_level,
    })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    headerHeight: 80,
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    getRowHeight(params) {
      if (params.node.data && params.node.data.Category_Sub_level === null) {
        return 0;
      }
      if (params.node.data && params.node.data.proposal_type === null) {
        return 0;
      }
    },
  };

  const gridOptionInvestorComparatorProposalType = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal Type',
        field: 'proposal_type',
        minWidth: 220,
        chartDataType: 'category',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'category',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.for_pcent
                ? parseFloat(params.data.for_pcent).toFixed(0)
                : '';
            }
            return params.data.for_pcent
              ? parseFloat(params.data.for_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.against_pcent === NUMBER_HUNDRED) {
              return params.data.against_pcent
                ? parseFloat(params.data.against_pcent).toFixed(0)
                : '';
            }
            return params.data.against_pcent
              ? parseFloat(params.data.against_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.split_pcent === NUMBER_HUNDRED) {
              return params.data.split_pcent
                ? parseFloat(params.data.split_pcent).toFixed(0)
                : '';
            }
            return params.data.split_pcent
              ? parseFloat(params.data.split_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.abstain_pcent === NUMBER_HUNDRED) {
              return params.data.abstain_pcent
                ? parseFloat(params.data.abstain_pcent).toFixed(0)
                : '';
            }
            return params.data.abstain_pcent
              ? parseFloat(params.data.abstain_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.withheld_pcent
                ? parseFloat(params.data.withheld_pcent).toFixed(0)
                : '';
            }
            return params.data.withheld_pcent
              ? parseFloat(params.data.withheld_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss === undefined) {
              return;
            }
            if (params.data.match_iss === NUMBER_HUNDRED) {
              return params.data.match_iss
                ? parseFloat(params.data.match_iss).toFixed(0)
                : '';
            }
            return params.data.match_iss
              ? parseFloat(params.data.match_iss).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl === undefined) {
              return;
            }
            if (params.data.match_gl === NUMBER_HUNDRED) {
              return params.data.match_gl
                ? parseFloat(params.data.match_gl).toFixed(0)
                : '';
            }
            return params.data.match_gl
              ? parseFloat(params.data.match_gl).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss_against === undefined) {
              return;
            }
            if (params.data.match_iss_against === NUMBER_HUNDRED) {
              return params.data.match_iss_against
                ? parseFloat(params.data.match_iss_against).toFixed(0)
                : '';
            }
            return params.data.match_iss_against
              ? parseFloat(params.data.match_iss_against).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl_against === undefined) {
              return;
            }
            if (params.data.match_gl_against === NUMBER_HUNDRED) {
              return params.data.match_gl_against
                ? parseFloat(params.data.match_gl_against).toFixed(0)
                : '';
            }
            return params.data.match_gl_against
              ? parseFloat(params.data.match_gl_against).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.iss_for_match === undefined) {
              return;
            }
            if (params.data.iss_for_match === NUMBER_HUNDRED) {
              return params.data.iss_for_match
                ? parseFloat(params.data.iss_for_match).toFixed(0)
                : '';
            }
            return params.data.iss_for_match
              ? parseFloat(params.data.iss_for_match).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.gl_for_Match === undefined) {
              return;
            }
            if (params.data.gl_for_Match === NUMBER_HUNDRED) {
              return params.data.gl_for_Match
                ? parseFloat(params.data.gl_for_Match).toFixed(0)
                : '';
            }
            return params.data.gl_for_Match
              ? parseFloat(params.data.gl_for_Match).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: 'Proposal Type',
      field: 'proposal_type',
      minWidth: 220,
      cellClass: TrialStatus
        ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
        : 'ws-normal-lh24 ps-1 pe-1',
      cellRendererParams: {
        suppressCount: true,
      },
    },
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstResolutionsByInvestorFilter.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
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
    getRowHeight(params) {
      if (params.node.data && params.node.data.Category_Sub_level === null) {
        return 0;
      }
      if (params.node.data && params.node.data.proposal_type === null) {
        return 0;
      }
    },
  };

  const gridOptionInvestorComparatorProposalTypeSubLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal Type',
        field: 'Category_Sub_level',
        minWidth: 220,
        chartDataType: 'category',
      },

      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'category',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.for_pcent
                ? parseFloat(params.data.for_pcent).toFixed(0)
                : '';
            }
            return params.data.for_pcent
              ? parseFloat(params.data.for_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.against_pcent === NUMBER_HUNDRED) {
              return params.data.against_pcent
                ? parseFloat(params.data.against_pcent).toFixed(0)
                : '';
            }
            return params.data.against_pcent
              ? parseFloat(params.data.against_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.split_pcent === NUMBER_HUNDRED) {
              return params.data.split_pcent
                ? parseFloat(params.data.split_pcent).toFixed(0)
                : '';
            }
            return params.data.split_pcent
              ? parseFloat(params.data.split_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.abstain_pcent === NUMBER_HUNDRED) {
              return params.data.abstain_pcent
                ? parseFloat(params.data.abstain_pcent).toFixed(0)
                : '';
            }
            return params.data.abstain_pcent
              ? parseFloat(params.data.abstain_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.withheld_pcent
                ? parseFloat(params.data.withheld_pcent).toFixed(0)
                : '';
            }
            return params.data.withheld_pcent
              ? parseFloat(params.data.withheld_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss === undefined) {
              return;
            }
            if (params.data.match_iss === NUMBER_HUNDRED) {
              return params.data.match_iss
                ? parseFloat(params.data.match_iss).toFixed(0)
                : '';
            }
            return params.data.match_iss
              ? parseFloat(params.data.match_iss).toFixed(1)
              : '';
          }
          return null;
        },
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl === undefined) {
              return;
            }
            if (params.data.match_gl === NUMBER_HUNDRED) {
              return params.data.match_gl
                ? parseFloat(params.data.match_gl).toFixed(0)
                : '';
            }
            return params.data.match_gl
              ? parseFloat(params.data.match_gl).toFixed(1)
              : '';
          }
          return null;
        },
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss_against === undefined) {
              return;
            }
            if (params.data.match_iss_against === NUMBER_HUNDRED) {
              return params.data.match_iss_against
                ? parseFloat(params.data.match_iss_against).toFixed(0)
                : '';
            }
            return params.data.match_iss_against
              ? parseFloat(params.data.match_iss_against).toFixed(1)
              : '';
          }
          return null;
        },
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl_against === undefined) {
              return;
            }
            if (params.data.match_gl_against === NUMBER_HUNDRED) {
              return params.data.match_gl_against
                ? parseFloat(params.data.match_gl_against).toFixed(0)
                : '';
            }
            return params.data.match_gl_against
              ? parseFloat(params.data.match_gl_against).toFixed(1)
              : '';
          }
          return null;
        },
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.iss_for_match === undefined) {
              return;
            }
            if (params.data.iss_for_match === NUMBER_HUNDRED) {
              return params.data.iss_for_match
                ? parseFloat(params.data.iss_for_match).toFixed(0)
                : '';
            }
            return params.data.iss_for_match
              ? parseFloat(params.data.iss_for_match).toFixed(1)
              : '';
          }
          return null;
        },
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.gl_for_Match === undefined) {
              return;
            }
            if (params.data.gl_for_Match === NUMBER_HUNDRED) {
              return params.data.gl_for_Match
                ? parseFloat(params.data.gl_for_Match).toFixed(0)
                : '';
            }
            return params.data.gl_for_Match
              ? parseFloat(params.data.gl_for_Match).toFixed(1)
              : '';
          }
          return null;
        },
      },
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
    rowData: lstResolutionsByInvestorFilter.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
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

  const gridOptionInvestorComparatorProposalTypeTopLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal Type',
        field: 'proposal_top_level',
        minWidth: 220,
        chartDataType: 'category',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'category',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.for_pcent
                ? parseFloat(params.data.for_pcent).toFixed(0)
                : '';
            }
            return params.data.for_pcent
              ? parseFloat(params.data.for_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.against_pcent === NUMBER_HUNDRED) {
              return params.data.against_pcent
                ? parseFloat(params.data.against_pcent).toFixed(0)
                : '';
            }
            return params.data.against_pcent
              ? parseFloat(params.data.against_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.split_pcent === NUMBER_HUNDRED) {
              return params.data.split_pcent
                ? parseFloat(params.data.split_pcent).toFixed(0)
                : '';
            }
            return params.data.split_pcent
              ? parseFloat(params.data.split_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.abstain_pcent === NUMBER_HUNDRED) {
              return params.data.abstain_pcent
                ? parseFloat(params.data.abstain_pcent).toFixed(0)
                : '';
            }
            return params.data.abstain_pcent
              ? parseFloat(params.data.abstain_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.for_pcent === NUMBER_HUNDRED) {
              return params.data.withheld_pcent
                ? parseFloat(params.data.withheld_pcent).toFixed(0)
                : '';
            }
            return params.data.withheld_pcent
              ? parseFloat(params.data.withheld_pcent).toFixed(1)
              : '';
          }
          return null;
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss === undefined) {
              return;
            }
            if (params.data.match_iss === NUMBER_HUNDRED) {
              return params.data.match_iss
                ? parseFloat(params.data.match_iss).toFixed(0)
                : '';
            }
            return params.data.match_iss
              ? parseFloat(params.data.match_iss).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl === undefined) {
              return;
            }
            if (params.data.match_gl === NUMBER_HUNDRED) {
              return params.data.match_gl
                ? parseFloat(params.data.match_gl).toFixed(0)
                : '';
            }
            return params.data.match_gl
              ? parseFloat(params.data.match_gl).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_iss_against === undefined) {
              return;
            }
            if (params.data.match_iss_against === NUMBER_HUNDRED) {
              return params.data.match_iss_against
                ? parseFloat(params.data.match_iss_against).toFixed(0)
                : '';
            }
            return params.data.match_iss_against
              ? parseFloat(params.data.match_iss_against).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.match_gl_against === undefined) {
              return;
            }
            if (params.data.match_gl_against === NUMBER_HUNDRED) {
              return params.data.match_gl_against
                ? parseFloat(params.data.match_gl_against).toFixed(0)
                : '';
            }
            return params.data.match_gl_against
              ? parseFloat(params.data.match_gl_against).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.iss_for_match === undefined) {
              return;
            }
            if (params.data.iss_for_match === NUMBER_HUNDRED) {
              return params.data.iss_for_match
                ? parseFloat(params.data.iss_for_match).toFixed(0)
                : '';
            }
            return params.data.iss_for_match
              ? parseFloat(params.data.iss_for_match).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data !== undefined) {
            if (params.data.gl_for_Match === undefined) {
              return;
            }
            if (params.data.gl_for_Match === NUMBER_HUNDRED) {
              return params.data.gl_for_Match
                ? parseFloat(params.data.gl_for_Match).toFixed(0)
                : '';
            }
            return params.data.gl_for_Match
              ? parseFloat(params.data.gl_for_Match).toFixed(1)
              : '';
          }
          return null;
        },
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ps-1 pe-1 blurrytext'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
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
    rowData: lstResolutionsByInvestorFilter.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
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

  return (
    <div id='loadItem'>
      {isLoading && (
        <div className='vh-100'>
          <div className='h-50'>
            {procedureRunningEstimateTime !== undefined && (
              <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
            )}
          </div>
        </div>
      )}
      {!isLoading && (
        <div>
          <div className='row mt-3 card ms-1 me-1 pb-3 pdfpagebreakinsideavoid'>
            {lstResolutionsByInvestorFilter.length > 0 ? (
              <>
                <div className='col-lg pt-2'>
                  <div>
                    <button
                      type='button'
                      className='btn excelAdjust ag-excel float-end'
                      title='Download xls'
                      onClick={() =>
                        downloadExcelByJsonFn(
                          lstExcelDownload_ResolutionsByInvestorFilter,
                          'Investor_Voting_by_Proposal'
                        )
                      }
                    >
                      <u>Download xls</u>
                    </button>
                  </div>
                </div>

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL && (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      title=''
                      smalltitle=''
                      gridOptions={gridOptionInvestorComparator}
                      enableCharts
                      hideExcelDownloadIcon
                    />
                  </ErrorBoundary>
                )}

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE && (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      title=''
                      smalltitle=''
                      gridOptions={gridOptionInvestorComparatorProposalType}
                      enableCharts
                      hideExcelDownloadIcon
                    />
                  </ErrorBoundary>
                )}

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL && (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      title=''
                      smalltitle=''
                      gridOptions={
                        gridOptionInvestorComparatorProposalTypeSubLevel
                      }
                      enableCharts
                      hideExcelDownloadIcon
                    />
                  </ErrorBoundary>
                )}

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL && (
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      title=''
                      smalltitle=''
                      gridOptions={
                        gridOptionInvestorComparatorProposalTypeTopLevel
                      }
                      enableCharts
                      hideExcelDownloadIcon
                    />
                  </ErrorBoundary>
                )}
              </>
            ) : (
              lstResolutionsByInvestorFilter.length === 0 && (
                <div>{NORECORDS}</div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

MultipleResolutionForVotingRationale.propTypes = {
  //   handleResetInvestorComparatorTool: PropTypes.func,
  isLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.number,
  lstResolutionsByInvestorFilter: PropTypes.array,
  handleInvestorComparatorSelection: PropTypes.func,
  handleOnInvestordetailsClick: PropTypes.func,
  handleResetLoader: PropTypes.func,

  // Investor Details
  getResolutionsTypeIdByNameReq: PropTypes.func,
};

MultipleResolutionForVotingRationale.defaultProps = {
  isLoading: true,
  procedureRunningEstimateTime: undefined,
  lstResolutionsByInvestorFilter: [],
  handleInvestorComparatorSelection: () => null,
  handleOnInvestordetailsClick: () => null,
  getResolutionsTypeIdByNameReq: () => null,
  handleResetLoader: () => null,
};

export default MultipleResolutionForVotingRationale;
