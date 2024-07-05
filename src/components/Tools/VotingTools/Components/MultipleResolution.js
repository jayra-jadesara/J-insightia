import React from 'react';
import PropTypes from 'prop-types';
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
  gridWidthForDigits,
  gridWidthValues,
  gridWidthValuesForSml
} from '../../../../utils/table-tools-util';
import { NUMBER_HUNDRED } from '../../../../constants/NumberConstants';
import { SUPPORT_TEAM_EMAIL_MSG } from '../../../../constants/MessageConstans';

const MultipleResolution = ({
  handleResetInvestorComparatorTool,
  handleResetInvestorComparatorTool_HistoricalTrends,
  isLoading,
  handleInvestorComparatorSelection,
  handleOnInvestordetailsClick,
  procedureRunningEstimateTime,
  lstResolutionsByInvestorFilter,
  handleOnloadHistoricalTrends,
  handleOnVotingPowerclick,
  getResolutionsTypeIdByNameReq,
  currentResolutionTypeSelection,
  handleResetLoader,
  isShowInvestorDetails,
  isShowVotingPower,
  isShowInvestorTrends,
  isLoadingVotingDetails,
  isLoadingInvestorDetails,
  isLoadHistoricalTrends,
  handleCloseInvestorDetails,
  TrialUserDisableDownload,
  setIsProposalType,
}) => {
  const {
    INVESTOR_COMPARATOR_MORE_DETAILS,
    INVESTOR_COMPARATOR_TRENDS,
    INVESTOR_COMPARATOR_VOTING_POWER,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
    INVESTOR_COMPARATOR_PROPOSAL_TYPE,
  } = InvestorComparatorConstant;

  function resetBtnstate() {
    handleCloseInvestorDetails();
  }

  function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }

  function addDataFotPdf(data) {
    setIsProposalType(data);
  }
  const gridOptionInvestorComparator = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        chartDataType: 'category',
        field: 'proposal_top_level',
        type: ['rowGroup', 'hiddenField', 'enableValue'],
        minWidth: 400,
        tooltipField: 'proposal_top_level',
      },
      {
        headerName: 'Resolution Type',
        field: 'Category_Sub_level',
        type: ['rowGroup', 'hiddenField', 'enableValue'],
        chartDataType: 'category',
        minWidth: 400,
        tooltipField: 'Category_Sub_level'
      },
      {
        headerName: 'Resolution Type',
        field: 'proposal_type',
        type: ['hiddenField', 'enableValue'],
        chartDataType: 'category',
        minWidth: 400,
        tooltipField: 'proposal_type'
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
      },
      {
        headerName: 'Investor Detail',
        minWidth: 120,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={async (e) => {
                e.preventDefault();
                if (
                  isShowInvestorDetails &&
                  !isShowVotingPower &&
                  !isShowInvestorTrends
                ) {
                  resetBtnstate();
                } else {
                  await handleResetLoader();

                  let pTypedata;
                  let proposalType = params.data
                    ? params.data.proposal_type
                    : null;
                  if (params.node.key !== 'All') {
                    if (proposalType !== null && proposalType.includes('[')) {
                      proposalType = addStr(
                        proposalType,
                        proposalType.indexOf('['),
                        '|'
                      );
                    }
                  }
                  if (params.node.field === 'proposal_top_level') {
                    if (params.node.key === 'All') {
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
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                      proposalType: proposalType,
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
                }
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
        minWidth: 100,
        field: 'proposal_top_level_Historical',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                if (
                  !isShowInvestorDetails &&
                  !isShowVotingPower &&
                  isShowInvestorTrends
                ) {
                  resetBtnstate();
                } else {
                  await handleResetLoader();

                  let pTypedata;
                  let pTypeId = params.value;
                  let proposalType = params.data
                    ? params.data.proposal_type
                    : null;
                  if (params.node.key !== 'All') {
                    if (proposalType !== null && proposalType.includes('[')) {
                      proposalType = addStr(
                        proposalType,
                        proposalType.indexOf('['),
                        '|'
                      );
                    }
                  }
                  if (params.node.field === 'proposal_top_level') {
                    if (params.node.key === 'All') {
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
                    if (
                      params.value === undefined &&
                      params.data !== undefined
                    ) {
                      pTypeId = params.data.proposal_type_id;
                    }
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                      proposalType: proposalType,
                    };
                  }

                  await getResolutionsTypeIdByNameReq(pTypedata);
                  // await handleResetInvestorComparatorTool();
                  await handleResetInvestorComparatorTool_HistoricalTrends();
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    pTypeId,
                    INVESTOR_COMPARATOR_TRENDS
                  );
                  addDataFotPdf(pTypedata);
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnloadHistoricalTrends(res);
                  });
                }
              }}
            >
              Trends
            </button>
          </div>
        ),
      },
      {
        headerName: 'Voting Power',
        minWidth: 120,
        field: 'proposal_top_level_Voting',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                if (
                  !isShowInvestorDetails &&
                  isShowVotingPower &&
                  !isShowInvestorTrends
                  // isShowVotingPower &&
                  // !isShowInvestorDetails &&
                  // !isShowInvestorTrends
                ) {
                  resetBtnstate();
                } else {
                  await handleResetLoader();

                  let pTypedata;
                  let pTypeId = params.value;
                  let proposalType = params.data
                    ? params.data.proposal_type
                    : null;
                  if (params.node.key !== 'All') {
                    if (proposalType !== null && proposalType.includes('[')) {
                      proposalType = addStr(
                        proposalType,
                        proposalType.indexOf('['),
                        '|'
                      );
                    }
                  }
                  if (params.node.field === 'proposal_top_level') {
                    if (params.node.key === 'All') {
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
                    if (
                      params.value === undefined &&
                      params.data !== undefined
                    ) {
                      pTypeId = params.data.proposal_type_id;
                    }
                    pTypedata = {
                      lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                      proposalType: proposalType,
                    };
                  }
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    pTypeId,
                    INVESTOR_COMPARATOR_VOTING_POWER
                  );
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnVotingPowerclick(res);
                  });
                }
              }}
            >
              Voting Power
            </button>
          </div>
        ),
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 120,
        maxWidth: 120,
        chartDataType: 'series',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'For(%)',
        field: 'for_pcent',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.for_pcent).toFixed(0);
          }
          return parseFloat(params.data.for_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'Agt(%)',
        field: 'against_pcent',
        valueGetter(params) {
          if (params.data.against_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.against_pcent).toFixed(0);
          }
          return parseFloat(params.data.against_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Split(%)',
        field: 'split_pcent',
        valueGetter(params) {
          if (params.data.split_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.split_pcent).toFixed(0);
          }
          return parseFloat(params.data.split_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Abs(%)',
        field: 'abstain_pcent',
        valueGetter(params) {
          if (params.data.abstain_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.abstain_pcent).toFixed(0);
          }
          return parseFloat(params.data.abstain_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'W/H(%)',
        field: 'withheld_pcent',
        valueGetter(params) {
          if (params.data.withheld_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.withheld_pcent).toFixed(0);
          }
          return parseFloat(params.data.withheld_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 110,
        maxWidth: 110,
        chartDataType: 'series',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss === undefined) {
            return;
          }
          if (params.data.match_iss === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss).toFixed(0);
          }
          return parseFloat(params.data.match_iss).toFixed(1);
        },
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl === undefined) {
            return;
          }
          if (params.data.match_gl === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl).toFixed(0);
          }
          return parseFloat(params.data.match_gl).toFixed(1);
        },
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss_against === undefined) {
            return;
          }
          if (params.data.match_iss_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss_against).toFixed(0);
          }
          return parseFloat(params.data.match_iss_against).toFixed(1);
        },
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl_against === undefined) {
            return;
          }
          if (params.data.match_gl_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl_against).toFixed(0);
          }
          return parseFloat(params.data.match_gl_against).toFixed(1);
        },
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.iss_for_match === undefined) {
            return;
          }
          if (params.data.iss_for_match === NUMBER_HUNDRED) {
            return parseFloat(params.data.iss_for_match).toFixed(0);
          }
          return parseFloat(params.data.iss_for_match).toFixed(1);
        },
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.gl_for_Match === undefined) {
            return;
          }
          if (params.data.gl_for_Match === NUMBER_HUNDRED) {
            return parseFloat(params.data.gl_for_Match).toFixed(0);
          }
          return parseFloat(params.data.gl_for_Match).toFixed(1);
        },
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: 'Resolution Type',
      field: 'proposal_type',
      tooltipField: 'proposal_type',
      minWidth: 400,
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
      TrialStatus: false,
      allowDownload: false,
      proposal_top_level:
        x.proposal_top_level === null &&
        x.Category_Sub_level === null &&
        x.proposal_type === null
          ? 'All'
          : x.proposal_top_level,
    })),
    // selectedColumns - input field from grid and this lets you choose what columns to show on excel download
    selectedColumns: [
      'proposal_top_level',
      'Category_Sub_level',
      'proposal_type',
      'proposal_sponsor',
      'number_of_meetings',
      'votes_cast',
      'for_pcent',
      'against_pcent',
      'split_pcent',
      'abstain_pcent',
      'withheld_pcent',
      'dnv',
      'match_iss',
      'match_gl',
      'match_iss_against',
      'match_gl_against',
      'iss_for_match',
      'gl_for_Match',
    ],
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
      return 48;
    },
  };

  const gridOptionInvestorComparatorProposalType = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'proposal_type',
        minWidth: 400,
        chartDataType: 'category',
        tooltipField: 'proposal_type',
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
      },
      {
        headerName: 'Investor Detail',
        minWidth: 120,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();
                  let proposalType = params.data
                    ? params.data.proposal_type
                    : null;
                  if (proposalType !== null && proposalType.includes('[')) {
                    proposalType = addStr(
                      proposalType,
                      proposalType.indexOf('['),
                      '|'
                    );
                  }
                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                    proposalType: proposalType,
                  };
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
              className='btn btn-primary btn-sm'
            >
              More Details
            </button>
          </div>
        ),
      },
      {
        headerName: 'Historical Trends',
        minWidth: 100,
        field: 'proposal_top_level_Historical',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();
                  let proposalType = params.data
                    ? params.data.proposal_type
                    : null;
                  if (proposalType !== null && proposalType.includes('[')) {
                    proposalType = addStr(
                      proposalType,
                      proposalType.indexOf('['),
                      '|'
                    );
                  }
                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                    proposalType: proposalType,
                  };
                  await getResolutionsTypeIdByNameReq(pTypedata);
                  // await handleResetInvestorComparatorTool();
                  await handleResetInvestorComparatorTool_HistoricalTrends();
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_TRENDS
                  );
                  addDataFotPdf(pTypedata);
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnloadHistoricalTrends(res);
                  });
              }}
            >
              Trends
            </button>
          </div>
        ),
      },
      {
        headerName: 'Voting Power',
        minWidth: 120,
        field: 'proposal_top_level_Voting',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();
                  let proposalType = params.data
                    ? params.data.proposal_type
                    : null;
                  if (proposalType !== null && proposalType.includes('[')) {
                    proposalType = addStr(
                      proposalType,
                      proposalType.indexOf('['),
                      '|'
                    );
                  }
                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE,
                    proposalType: proposalType,
                  };
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_VOTING_POWER
                  );
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnVotingPowerclick(res);
                  });
              }}
            >
              Voting Power
            </button>
          </div>
        ),
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 120,
        maxWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.for_pcent).toFixed(0);
          }
          return parseFloat(params.data.for_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data.against_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.against_pcent).toFixed(0);
          }
          return parseFloat(params.data.against_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data.split_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.split_pcent).toFixed(0);
          }
          return parseFloat(params.data.split_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data.abstain_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.abstain_pcent).toFixed(0);
          }
          return parseFloat(params.data.abstain_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.withheld_pcent).toFixed(0);
          }
          return parseFloat(params.data.withheld_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 110,
        maxWidth: 110,
        chartDataType: 'series',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss === undefined) {
            return;
          }
          if (params.data.match_iss === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss).toFixed(0);
          }
          return parseFloat(params.data.match_iss).toFixed(1);
        },
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl === undefined) {
            return;
          }
          if (params.data.match_gl === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl).toFixed(0);
          }
          return parseFloat(params.data.match_gl).toFixed(1);
        },
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss_against === undefined) {
            return;
          }
          if (params.data.match_iss_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss_against).toFixed(0);
          }
          return parseFloat(params.data.match_iss_against).toFixed(1);
        },
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl_against === undefined) {
            return;
          }
          if (params.data.match_gl_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl_against).toFixed(0);
          }
          return parseFloat(params.data.match_gl_against).toFixed(1);
        },
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.iss_for_match === undefined) {
            return;
          }
          if (params.data.iss_for_match === NUMBER_HUNDRED) {
            return parseFloat(params.data.iss_for_match).toFixed(0);
          }
          return parseFloat(params.data.iss_for_match).toFixed(1);
        },
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.gl_for_Match === undefined) {
            return;
          }
          if (params.data.gl_for_Match === NUMBER_HUNDRED) {
            return parseFloat(params.data.gl_for_Match).toFixed(0);
          }
          return parseFloat(params.data.gl_for_Match).toFixed(1);
        },
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: 'Resolution Type',
      field: 'proposal_type',
      minWidth: 400,
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
    rowData: lstResolutionsByInvestorFilter.map((x) => ({
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
    getRowHeight(params) {
      if (params.node.data && params.node.data.Category_Sub_level === null) {
        return 0;
      }
      if (params.node.data && params.node.data.proposal_type === null) {
        return 0;
      }
      return 48;
    },
  };

  const gridOptionInvestorComparatorProposalTypeSubLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'Category_Sub_level',
        minWidth: 400,
        tooltipField: 'Category_Sub_level',
        chartDataType: 'category',
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
      },
      {
        headerName: 'Investor Detail',
        minWidth: 120,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();

                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.data.Category_Sub_level,
                  };

                  await getResolutionsTypeIdByNameReq(pTypedata);
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
              className='btn btn-primary btn-sm'
            >
              More Details
            </button>
          </div>
        ),
      },
      {
        headerName: 'Historical Trends',
        field: 'proposal_top_level_Historical',
        minWidth: 100,
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();

                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.data.Category_Sub_level,
                  };

                  await getResolutionsTypeIdByNameReq(pTypedata);
                  // await handleResetInvestorComparatorTool();
                  await handleResetInvestorComparatorTool_HistoricalTrends();
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_TRENDS
                  );
                  addDataFotPdf(pTypedata);
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnloadHistoricalTrends(res);
                  });
              }}
            >
              Trends
            </button>
          </div>
        ),
      },
      {
        headerName: 'Voting Power',
        minWidth: 120,
        field: 'proposal_top_level_Voting',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();

                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL,
                    proposalType: params.data.Category_Sub_level,
                  };
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_VOTING_POWER
                  );
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnVotingPowerclick(res);
                  });
              }}
            >
              Voting Power
            </button>
          </div>
        ),
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 120,
        maxWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.for_pcent).toFixed(0);
          }
          return parseFloat(params.data.for_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data.against_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.against_pcent).toFixed(0);
          }
          return parseFloat(params.data.against_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data.split_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.split_pcent).toFixed(0);
          }
          return parseFloat(params.data.split_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data.abstain_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.abstain_pcent).toFixed(0);
          }
          return parseFloat(params.data.abstain_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.withheld_pcent).toFixed(0);
          }
          return parseFloat(params.data.withheld_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 110,
        maxWidth: 110,
        chartDataType: 'series',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss === undefined) {
            return;
          }
          if (params.data.match_iss === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss).toFixed(0);
          }
          return parseFloat(params.data.match_iss).toFixed(1);
        },
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl === undefined) {
            return;
          }
          if (params.data.match_gl === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl).toFixed(0);
          }
          return parseFloat(params.data.match_gl).toFixed(1);
        },
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss_against === undefined) {
            return;
          }
          if (params.data.match_iss_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss_against).toFixed(0);
          }
          return parseFloat(params.data.match_iss_against).toFixed(1);
        },
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl_against === undefined) {
            return;
          }
          if (params.data.match_gl_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl_against).toFixed(0);
          }
          return parseFloat(params.data.match_gl_against).toFixed(1);
        },
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.iss_for_match === undefined) {
            return;
          }
          if (params.data.iss_for_match === NUMBER_HUNDRED) {
            return parseFloat(params.data.iss_for_match).toFixed(0);
          }
          return parseFloat(params.data.iss_for_match).toFixed(1);
        },
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.gl_for_Match === undefined) {
            return;
          }
          if (params.data.gl_for_Match === NUMBER_HUNDRED) {
            return parseFloat(params.data.gl_for_Match).toFixed(0);
          }
          return parseFloat(params.data.gl_for_Match).toFixed(1);
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
    getRowHeight(params) {
      return 48;
    },
  };

  // click on Voting power btn table
  const gridOptionInvestorComparatorProposalTypeTopLevel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Resolution Type',
        field: 'proposal_top_level',
        minWidth: 400,
        chartDataType: 'category',
        tooltipField: 'proposal_top_level',
      },
      {
        headerName: 'M/S',
        field: 'proposal_sponsor',
        ...gridWidthValues,
        chartDataType: 'category',
      },
      {
        headerName: 'Investor Detail',
        minWidth: 120,
        field: 'proposal_type_id',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();

                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                    proposalType: params.data.proposal_top_level,
                  };
                  await handleInvestorComparatorSelection(
                    'proposal_top_level', //params.node.field,
                    params.node.data.proposal_top_level, //params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_MORE_DETAILS
                  );
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnInvestordetailsClick(res);
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
        minWidth: 100,
        field: 'proposal_top_level_Historical',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();

                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                    proposalType: params.data.proposal_top_level,
                  };
                  await getResolutionsTypeIdByNameReq(pTypedata);
                  // await handleResetInvestorComparatorTool();
                  await handleResetInvestorComparatorTool_HistoricalTrends();
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_TRENDS
                  );
                  addDataFotPdf(pTypedata);
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnloadHistoricalTrends(res);
                  });
              }}
            >
              Trends
            </button>
          </div>
        ),
      },
      {
        headerName: 'Voting Power',
        minWidth: 120,
        field: 'proposal_top_level_Voting',
        cellStyle: {
          textAlign: 'left',
        },
        chartDataType: 'excluded',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={async (e) => {
                e.preventDefault();
                  await handleResetLoader();

                  const pTypedata = {
                    lavel: INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL,
                    proposalType: params.data.proposal_top_level,
                  };
                  await handleInvestorComparatorSelection(
                    params.node.field,
                    params.node.key,
                    params.value,
                    INVESTOR_COMPARATOR_VOTING_POWER
                  );
                  await getResolutionsTypeIdByNameReq(pTypedata).then((res) => {
                    handleOnVotingPowerclick(res);
                  });
              }}
            >
              Voting Power
            </button>
          </div>
        ),
      },
      {
        headerName: 'Meetings(#)',
        field: 'number_of_meetings',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 120,
        maxWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName: 'Votes(#)',
        field: 'votes_cast',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'For(%)',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.for_pcent).toFixed(0);
          }
          return parseFloat(params.data.for_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        minWidth: 100,
        maxWidth: 100,
        chartDataType: 'series',
      },
      {
        headerName: 'Agt(%)',
        valueGetter(params) {
          if (params.data.against_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.against_pcent).toFixed(0);
          }
          return parseFloat(params.data.against_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Split(%)',
        valueGetter(params) {
          if (params.data.split_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.split_pcent).toFixed(0);
          }
          return parseFloat(params.data.split_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'Abs(%)',
        valueGetter(params) {
          if (params.data.abstain_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.abstain_pcent).toFixed(0);
          }
          return parseFloat(params.data.abstain_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'W/H(%)',
        valueGetter(params) {
          if (params.data.for_pcent === NUMBER_HUNDRED) {
            return parseFloat(params.data.withheld_pcent).toFixed(0);
          }
          return parseFloat(params.data.withheld_pcent).toFixed(1);
        },
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthValuesForSml,
        chartDataType: 'series',
      },
      {
        headerName: 'DNV(#)',
        field: 'dnv',
        aggFunc: 'getNext-ColumnVal',
        minWidth: 110,
        maxWidth: 110,
        chartDataType: 'series',
      },
      {
        headerName: 'ISS Match (%)',
        field: 'match_iss',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss === undefined) {
            return;
          }
          if (params.data.match_iss === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss).toFixed(0);
          }
          return parseFloat(params.data.match_iss).toFixed(1);
        },
      },
      {
        headerName: 'GL Match (%)',
        field: 'match_gl',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl === undefined) {
            return;
          }
          if (params.data.match_gl === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl).toFixed(0);
          }
          return parseFloat(params.data.match_gl).toFixed(1);
        },
      },
      {
        headerName: 'ISS Against Match (%)',
        field: 'match_iss_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_iss_against === undefined) {
            return;
          }
          if (params.data.match_iss_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_iss_against).toFixed(0);
          }
          return parseFloat(params.data.match_iss_against).toFixed(1);
        },
      },
      {
        headerName: 'GL Against Match (%)',
        field: 'match_gl_against',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.match_gl_against === undefined) {
            return;
          }
          if (params.data.match_gl_against === NUMBER_HUNDRED) {
            return parseFloat(params.data.match_gl_against).toFixed(0);
          }
          return parseFloat(params.data.match_gl_against).toFixed(1);
        },
      },
      {
        headerName: 'ISS For Match (%)',
        field: 'iss_for_match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.iss_for_match === undefined) {
            return;
          }
          if (params.data.iss_for_match === NUMBER_HUNDRED) {
            return parseFloat(params.data.iss_for_match).toFixed(0);
          }
          return parseFloat(params.data.iss_for_match).toFixed(1);
        },
      },
      {
        headerName: 'GL For Match (%)',
        field: 'gl_for_Match',
        aggFunc: 'getNext-ColumnVal',
        ...gridWidthForDigits,
        chartDataType: 'series',
        valueGetter(params) {
          if (params.data.gl_for_Match === undefined) {
            return;
          }
          if (params.data.gl_for_Match === NUMBER_HUNDRED) {
            return parseFloat(params.data.gl_for_Match).toFixed(0);
          }
          return parseFloat(params.data.gl_for_Match).toFixed(1);
        },
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'proposal_top_level',
          pinned: 'left',
        },
        {
          colId: 'proposal_sponsor',
          pinned: 'left',
        },
        {
          colId: 'proposal_type_id',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: lstResolutionsByInvestorFilter.map((x) => ({
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
    getRowHeight(params) {
      return 48;
    },
  };

  return (
    <div>
      {isLoading ? (
        <div className='vh-100'>
          <div className='h-50'>
            {procedureRunningEstimateTime !== undefined && (
              <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className='row mt-5 '>
            {lstResolutionsByInvestorFilter.length > 0 ? (
              <>
                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL && (
                  <Table
                    IsShowCard={false}
                    title='Investor Comparator'
                    smalltitle=''
                    gridOptions={gridOptionInvestorComparator}
                    enableCharts
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                )}

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE && (
                  <Table
                    IsShowCard={false}
                    title='Investor Comparator'
                    smalltitle=''
                    gridOptions={gridOptionInvestorComparatorProposalType}
                    enableCharts
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                )}

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL && (
                  <Table
                    IsShowCard={false}
                    title='Investor Comparator'
                    smalltitle=''
                    gridOptions={
                      gridOptionInvestorComparatorProposalTypeSubLevel
                    }
                    enableCharts
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                )}

                {currentResolutionTypeSelection ===
                  INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL && (
                  <Table
                    IsShowCard={false}
                    title='Investor Comparator'
                    smalltitle=''
                    gridOptions={
                      gridOptionInvestorComparatorProposalTypeTopLevel
                    }
                    enableCharts
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                )}
              </>
            ) : (
              SUPPORT_TEAM_EMAIL_MSG
            )}
          </div>
        </div>
      )}
    </div>
  );
};

MultipleResolution.propTypes = {
  handleResetInvestorComparatorTool: PropTypes.func,
  isLoading: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.number,
  lstResolutionsByInvestorFilter: PropTypes.array,
  handleInvestorComparatorSelection: PropTypes.func,
  handleOnInvestordetailsClick: PropTypes.func,
  handleResetLoader: PropTypes.func,

  // Historical Trends
  handleOnloadHistoricalTrends: PropTypes.func,

  // Voting Power
  handleOnVotingPowerclick: PropTypes.func,

  // Investor Details
  getResolutionsTypeIdByNameReq: PropTypes.func,
};

MultipleResolution.defaultProps = {
  handleResetInvestorComparatorTool: () => null,
  isLoading: true,
  procedureRunningEstimateTime: undefined,
  lstResolutionsByInvestorFilter: [],
  handleInvestorComparatorSelection: () => null,
  handleOnInvestordetailsClick: () => null,
  handleOnloadHistoricalTrends: () => null,
  handleOnVotingPowerclick: () => null,
  getResolutionsTypeIdByNameReq: () => null,
  handleResetLoader: () => null,
};

export default React.memo(MultipleResolution);
