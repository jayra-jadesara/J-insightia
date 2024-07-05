import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
// import messageConst from '../../../constants/MessageConstans';
import '../../../styles/components/_popupTrialUser.scss';
import {
  ACTIVISM_OVERVIEW,
  QUERY_PID,
  INVESTOR_ACTIVISM_OVERVIEW,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../utils/AgGridFunctions';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const PublicDemandTool = (props) => {
  function showDefaultColfn() {
    const arr = [];
    props.publicDemandToolHeading !== undefined &&
      Object.keys(props.publicDemandToolHeading).length > 0 &&
      Object.keys(props.publicDemandToolHeading).map((x) => {
        if (
          x === 'activist_name' ||
          x === 'company_name' ||
          x === 'company_HQ' ||
          x === 'first_action_date' ||
          x === 'Year_action' ||
          x === 'action' ||
          x === 'response_date'
        ) {
          arr.push({ colId: x, hide: false });
        } else {
          arr.push({ colId: x, hide: true });
        }
      });
    return arr;
  }
  function showAllColfn() {
    const arr = [];
    props.publicDemandToolHeading !== undefined &&
      Object.keys(props.publicDemandToolHeading).length > 0 &&
      Object.keys(props.publicDemandToolHeading).map((x) => {
        arr.push({ colId: x, hide: false });
      });
    return arr;
  }
  function getLinkCellRenderer(params, hrefVal) {
    const eDiv = document.createElement('div');
    let value = '';
    if (params.value !== undefined) {
      value = params.value;
    } else if (params.node !== undefined) {
      value = params.node.key;
    } else {
      return null;
    }
    eDiv.innerHTML = `<a class="btn-simple btn-link cursor-pointer text-secondary" href="${hrefVal}">${value}</a>`;
    return eDiv;
  }

  const gridOptionsPublicDemandToolList = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.company_name, //*
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        cellRenderer: (params) => {
          const hrefVal = `${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.PID}`;
          return getLinkCellRenderer(params, hrefVal);
        },
        minWidth: 290,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.company_HQ,
        field: 'company_HQ',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 130,
        maxWidth: 130,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.company_region,
        field: 'company_region',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 140,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.activist_name, //*
        field: 'activist_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 290,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'], // ["count", "count(Dist)"]
        chartDataType: 'category',
        cellRenderer: (params) => {
          const hrefVal = `${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}`;
          return getLinkCellRenderer(params, hrefVal);
        },
        getQuickFilterText,
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.investor_HQ,
        field: 'investor_HQ',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        maxWidth: 130,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.investor_region,
        field: 'investor_region',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 140,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.investor_type_name,
        field: 'investor_type_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.investor_sub_type_names,
        field: 'investor_sub_type_names',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 140,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.focused_type,
        field: 'focused_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.activist_founded,
        field: 'activist_founded',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.first_action_date, //*
        field: 'action_date',
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.Year_action,
        field: 'Year_action',
        type: ['numberColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 140,
        maxWidth: 140,
        enablePivot: true,
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.action, //*
        field: 'action',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 290,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.activism_group_name,
        field: 'activism_group_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 180,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.response,
        field: 'response',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 210,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.response_date,
        field: 'response_date',
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.outcome, //*
        field: 'outcome',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 180,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.seats_proposed,
        field: 'seats_proposed',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 250,
        chartDataType: 'series',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.seats_won,
        field: 'seats_won',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 230,
        maxWidth: 230,
        chartDataType: 'series',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.vote_settlement,
        field: 'vote_settlement',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 250,
        maxWidth: 250,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.pcent_held,
        field: 'pcent_held',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.date_first_invested, //*
        field: 'date_first_invested',
        type: ['dateColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.symbol,
        field: 'symbol',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.exchange_name,
        field: 'exchange_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.industry_name,
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.industry_sector_name,
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.market_cap_USD,
        field: 'market_cap_USD',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'series',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.market_cap_category,
        field: 'market_cap_category',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.current_status,
        field: 'current_status',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.exit_date,
        field: 'exit_date',
        type: ['dateColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.exit_type,
        field: 'exit_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 180,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.price_per_share,
        field: 'price_per_share',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'series',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.Purchase_Value_mn,
        field: 'Purchase_Value_mn',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'series',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.currency,
        field: 'currency',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.buyer,
        field: 'buyer',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.PID,
        field: 'PID',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName:
          props.publicDemandToolHeading !== undefined &&
          props.publicDemandToolHeading.investor_id,
        field: 'investor_id',
        type: ['nonFloatingFilter', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'excluded',
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    showColumns: {
      btnName: 'Show All Columns',
      columns: showDefaultColfn(),
    },
    hideColumns: {
      btnName: 'Show Defaults Columns',
      columns: showAllColfn(),
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    rowData:
      props.publicDemandToolData !== undefined &&
      props.publicDemandToolData.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: props.allowDownload,
        // vote_settlement: x.vote_settlement === 'Settlement' ? 'Settlement' : null,
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
    gridHeight: '80vh',
  };

  return (
    <Page {...props} key={1} className='m-3 pt-2'>
      <div>
        <div className='row card'>
          <div className='col-md-12 col-sm-12 pt-3'>
            {props.isLoading ? (
              <div className='vh-100'>
                <div className='h-50'>
                  <ProgressBar
                    avgElapsedTime={props.procedureRunningEstimateTime}
                  />
                </div>
              </div>
            ) : (
              <div className='row tblShortCampData'>
                <Table
                  IsShowCard={false}
                  title='Public Demand Tool'
                  smalltitle='Public Demand Tool'
                  gridOptions={gridOptionsPublicDemandToolList}
                  enableCharts
                  hideExcelDownloadIcon={props.trialUserDisableDownload}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(PublicDemandTool));
