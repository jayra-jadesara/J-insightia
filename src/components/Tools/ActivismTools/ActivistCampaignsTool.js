import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import '../../../styles/components/_popupTrialUser.scss';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../utils/AgGridFunctions';
import {
  getActivistCampaignToolImageHandlerCellRenderer,
  getActivistCampaignToolExcelDownloadNumberToText,
  dateToNull,
  dateToISOString,
} from '../../../utils/general-util';
import { NUMBER_ZERO, NUMBER_ONE } from '../../../constants/NumberConstants';
import { NORECORDS } from '../../../constants/MessageConstans';
import {
  ACTIVISM_OVERVIEW,
  QUERY_PID,
  INVESTOR_ACTIVISM_OVERVIEW,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const ActivistCampaignsTool = (props) => {
  function getCampaignName(params) {
    const eDiv = document.createElement('div');
    if (params.data.activist_Name != null) {
      const arrayIds = params.data.activist_Name.split('#| ').filter((item) => item);
      const val = 1;

      arrayIds.forEach((d, i) => {
        const invArrVal = params.data.investor_ids !== null ? params.data.investor_ids.split(',') : [];
        if (invArrVal[i] === undefined || invArrVal.length === 0) {
          eDiv.innerHTML = '';
        } else {
          const hrefVal = `${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${invArrVal[i].trim()}`;

          eDiv.innerHTML += `<a rel="noopener noreferrer" class="text-secondary" href="${hrefVal}">
              ${d}${invArrVal.length === i + val ? '' : ' ,'}
        </a>`;
        }
      });
    } else {
      eDiv.innerHTML = '';
    }
      return eDiv;
  }

  // new grid
  console.log('getActivistCampaignsTool', props.getActivistCampaignsTool);
  const gridOptionActivistCampaigns_ShowAllData = {
    // rowModelType: 'serverSide',
    // serverSideTables: {
    //   from: 'pIW_Tool_ActivistCampaignsTool'
    // },
    // paginationPageSize: 100,
    // cacheOverflowSize: 100,
    // maxConcurrentDatasourceRequests: 1,
    // infiniteInitialRowCount: 100,
    // maxBlocksInCache: 10,
    // serverSideRoute: config.getActivistCampaignsTool,
    // serverSideNotInline: [],
    // suppressFieldDotNotation: true,
    // saveFilter: true,
    // refreshServer: true,
    // animateRows: true,
    // maxConcurrentDatasourceRequests: 1,
    // cacheBlockSize: 100,
    // serverSideStoreType: 'partial',

    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 330,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.PID !== '') {
            eDiv.innerHTML = `<a rel="noopener target="_blank" noreferrer" class="text-secondary" 
               href="${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.PID}">
             ${params.data.company_name !== null ? params.data.company_name : ''}</a>`;
          } else if (params.data.company_name !== null) {
            eDiv.innerHTML = `<span title=${params.data.company_name}>${params.data.company_name}</span>`;
          } else {
            eDiv.innerHTML = '';
          }
          return eDiv;
        },
        getQuickFilterText,
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        minWidth: 100,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Company HQ Region',
        field: 'Region_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Investor(s)',
        field: 'activist_Name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 300,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getCampaignName(params),
        getQuickFilterText,
      },
      {
        headerName: 'Investor Type(s)',
        field: 'investor_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 400,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Investor HQ(s)',
        field: 'activist_hqs',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Activist Focus',
        field: 'focus_type_string',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 200,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Campaign Start Date',
        field: 'campaign_start',
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        enablePivot: true,
        minWidth: 150,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName: 'Campaign Start Year',
        field: 'year_campaign_start',
        type: ['numberColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        enablePivot: true,
        minWidth: 150,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Campaign End Date',
        field: 'campaign_end',
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        enablePivot: true,
        minWidth: 120,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName: 'Appoint Personnel',
        field: 'AppointPersonnel',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 200,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.AppointPersonnel),
      },
      {
        headerName: 'Remove Personnel',
        field: 'RemovePersonnel',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 200,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.RemovePersonnel),
      },
      {
        headerName: 'Push For M&A',
        field: 'PushForMA',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.PushForMA),
      },
      {
        headerName: 'Oppose M&A',
        field: 'OpposeMA',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.OpposeMA),
      },
      {
        headerName: 'Operational',
        field: 'Operational',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.Operational),
      },
      {
        headerName: 'Divestiture',
        field: 'Divestiture',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.Divestiture),
      },
      {
        headerName: 'Return Cash to Shareholders',
        field: 'ReturnCashtoShareholders',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 200,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.ReturnCashtoShareholders),
      },
      {
        headerName: 'Capital Structure',
        field: 'CapitalStructure',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.CapitalStructure),
      },
      {
        headerName: 'Remuneration',
        field: 'remuneration',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.remuneration),
      },
      {
        headerName: 'Environmental',
        field: 'Environmental',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 140,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.Environmental),
      },
      {
        headerName: 'Social',
        field: 'Social',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 130,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.Social),
      },
      {
        headerName: 'Governance',
        field: 'Governance',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 140,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => getActivistCampaignToolImageHandlerCellRenderer(params.data.Governance),
      },
      {
        headerName: 'Demand Summary',
        field: 'demand_summary',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        cellClass: 'ws-normal-lh30',
        minWidth: 800,
        aggFunc: 'count(Dist)',
        wrapText: true,
        autoHeight: true,
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Seats Proposed',
        field: 'seats_proposed',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 160,
        chartDataType: 'series',
      },
      {
        headerName: 'Seats Gained',
        field: 'seats_won',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 160,
        chartDataType: 'series',
      },
      {
        headerName: 'Non-Director Shareholder Proposal',
        field: 'shareholder_proposals',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        chartDataType: 'series',
        minWidth: 200,
      },
      {
        headerName: 'Success',
        field: 'at_least_partially_suc',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 300,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Symbol',
        field: 'symb',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: 'Exchange',
        field: 'exchange_name',
        minWidth: 190,
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        aggFunc: 'count(Dist)',
        minWidth: 180,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
        minWidth: 180,
      },
      {
        headerName: 'Market Cap ($mn)',
        field: 'market_cap',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        chartDataType: 'series',
        minWidth: 180,
      },
      {
        headerName: 'Market Cap Category',
        field: 'marketcap_cat',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        chartDataType: 'series',
        minWidth: 180,
      },
      {
        headerName: 'PID',
        field: 'PID',
        type: ['nonFloatingFilter', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'excluded',
      },
      {
        headerName: 'Investor ID(s)',
        field: 'investor_ids',
        type: ['nonFloatingFilter', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'excluded',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
    },
    showColumns: {
      btnName: 'Show All Columns',
      columns: [
        {
          colId: 'company_name',
          hide: false,
        },
        {
          colId: 'Country_name',
          hide: true,
        },
        {
          colId: 'Region_name',
          hide: true,
        },
        {
          colId: 'activist_Name',
          hide: false,
        },
        {
          colId: 'campaign_start',
          hide: false,
        },
        {
          colId: 'year_campaign_start',
          hide: true,
        },
        {
          colId: 'campaign_end',
          hide: false,
        },
        {
          colId: 'investor_ids',
          hide: true,
        },
        {
          colId: 'investor_type',
          hide: true,
        },
        {
          colId: 'activist_hqs',
          hide: true,
        },
        {
          colId: 'focus_type_string',
          hide: true,
        },
        {
          colId: 'PID',
          hide: true,
        },
        {
          colId: 'remuneration',
          hide: true,
        },
        {
          colId: 'Environmental',
          hide: true,
        },
        {
          colId: 'Social',
          hide: true,
        },
        {
          colId: 'Governance',
          hide: true,
        },
        {
          colId: 'AppointPersonnel',
          hide: true,
        },
        {
          colId: 'RemovePersonnel',
          hide: true,
        },
        {
          colId: 'ReturnCashtoShareholders',
          hide: true,
        },
        {
          colId: 'CapitalStructure',
          hide: true,
        },
        {
          colId: 'OpposeMA',
          hide: true,
        },
        {
          colId: 'PushForMA',
          hide: true,
        },
        {
          colId: 'Divestiture',
          hide: true,
        },
        {
          colId: 'Operational',
          hide: true,
        },
        {
          colId: 'demand_summary',
          hide: true,
        },
        {
          colId: 'symb',
          hide: true,
        },
        {
          colId: 'seats_proposed',
          hide: true,
        },
        {
          colId: 'seats_won',
          hide: true,
        },
        {
          colId: 'shareholder_proposals',
          hide: true,
        },
        {
          colId: 'at_least_partially_suc',
          hide: true,
        },
        {
          colId: 'exchange_name',
          hide: true,
        },
        {
          colId: 'industry_sector_name',
          hide: true,
        },
        {
          colId: 'industry_name',
          hide: true,
        },
        {
          colId: 'market_cap',
          hide: true,
        },
        {
          colId: 'marketcap_cat',
          hide: true,
        },
      ],
    },
    hideColumns: {
      btnName: 'Show Defaults Columns',
      columns: [
        {
          colId: 'activist_Name',
          hide: false,
        },
        {
          colId: 'campaign_start',
          hide: false,
        },
        {
          colId: 'year_campaign_start',
          hide: false,
        },
        {
          colId: 'campaign_end',
          hide: false,
        },
        {
          colId: 'investor_ids',
          hide: false,
        },
        {
          colId: 'investor_type',
          hide: false,
        },
        {
          colId: 'activist_hqs',
          hide: false,
        },
        {
          colId: 'company_name',
          hide: false,
        },
        {
          colId: 'focus_type_string',
          hide: false,
        },
        {
          colId: 'PID',
          hide: false,
        },
        {
          colId: 'remuneration',
          hide: false,
        },
        {
          colId: 'Environmental',
          hide: false,
        },
        {
          colId: 'Social',
          hide: false,
        },
        {
          colId: 'Governance',
          hide: false,
        },
        {
          colId: 'AppointPersonnel',
          hide: false,
        },
        {
          colId: 'RemovePersonnel',
          hide: false,
        },
        {
          colId: 'ReturnCashtoShareholders',
          hide: false,
        },
        {
          colId: 'CapitalStructure',
          hide: false,
        },
        {
          colId: 'OpposeMA',
          hide: false,
        },
        {
          colId: 'PushForMA',
          hide: false,
        },
        {
          colId: 'Divestiture',
          hide: false,
        },
        {
          colId: 'Operational',
          hide: false,
        },
        {
          colId: 'demand_summary',
          hide: false,
        },
        {
          colId: 'symb',
          hide: false,
        },
        {
          colId: 'seats_proposed',
          hide: false,
        },
        {
          colId: 'seats_won',
          hide: false,
        },
        {
          colId: 'shareholder_proposals',
          hide: false,
        },
        {
          colId: 'at_least_partially_suc',
          hide: false,
        },
        {
          colId: 'Country_name',
          hide: false,
        },
        {
          colId: 'Region_name',
          hide: false,
        },
        {
          colId: 'exchange_name',
          hide: false,
        },
        {
          colId: 'industry_sector_name',
          hide: false,
        },
        {
          colId: 'industry_name',
          hide: false,
        },
        {
          colId: 'market_cap',
          hide: false,
        },
        {
          colId: 'marketcap_cat',
          hide: false,
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    rowData: props.getActivistCampaignsTool.map((x) => ({
      ...x,
      campaign_start:
        x.campaign_start
          ? dateToNull(dateToISOString(new Date(x.campaign_start)), 'dd-mmm-yy')
          : null,
      campaign_end:
        x.campaign_end
          ? dateToNull(dateToISOString(new Date(x.campaign_end)), 'dd-mmm-yy')
          : null,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      has_activist_focus:
        x.has_activist_focus === NUMBER_ONE && x.has_activist_notfocus === NUMBER_ZERO
          ? 'Primary'
          : x.has_activist_focus === NUMBER_ZERO && x.has_activist_notfocus === NUMBER_ONE
          ? 'Partial'
          : x.has_activist_focus === NUMBER_ONE && x.has_activist_notfocus === NUMBER_ONE
          ? 'Primary, Partial'
          : null,
      market_cap: x.market_cap !== undefined && x.market_cap !== null ? x.market_cap.toFixed(1) : '',

      AppointPersonnel: getActivistCampaignToolExcelDownloadNumberToText(x.AppointPersonnel),
      RemovePersonnel: getActivistCampaignToolExcelDownloadNumberToText(x.RemovePersonnel),
      PushForMA: getActivistCampaignToolExcelDownloadNumberToText(x.PushForMA),
      OpposeMA: getActivistCampaignToolExcelDownloadNumberToText(x.OpposeMA),
      Operational: getActivistCampaignToolExcelDownloadNumberToText(x.Operational),
      Divestiture: getActivistCampaignToolExcelDownloadNumberToText(x.Divestiture),
      ReturnCashtoShareholders: getActivistCampaignToolExcelDownloadNumberToText(x.ReturnCashtoShareholders),
      CapitalStructure: getActivistCampaignToolExcelDownloadNumberToText(x.CapitalStructure),
      remuneration: getActivistCampaignToolExcelDownloadNumberToText(x.remuneration),
      Environmental: getActivistCampaignToolExcelDownloadNumberToText(x.Environmental),
      Social: getActivistCampaignToolExcelDownloadNumberToText(x.Social),
      Governance: getActivistCampaignToolExcelDownloadNumberToText(x.Governance),
    })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    statusBar: bottomStatusBar,
    aggFuncs: {
      'count(Dist)': distinctCounts,
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
  };

  return (
    <Page {...props} key={1} className='m-3 pt-2'>
      <div className='row card'>
        <div className='col-md-12 col-sm-12 pt-3'>
          {props.isLoadingData ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
              </div>
            </div>
          ) : (
            <div className='row tblShortCampData'>
              {props.getActivistCampaignsTool.length > 0 ? (
                <Table
                  IsShowCard={false}
                  title='Activism Campaigns Tool'
                  smalltitle='Activism Campaigns Tool'
                  gridOptions={gridOptionActivistCampaigns_ShowAllData}
                  enableCharts
                  hideExcelDownloadIcon={props.trialUserDisableDownload}
                />
              ) : (
                <div>
                  <span>{NORECORDS}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

ActivistCampaignsTool.propTypes = {
  getActivistCampaignsTool: PropTypes.array,
};

ActivistCampaignsTool.defaultProps = {
  getActivistCampaignsTool: [],
};
export default withRouter(React.memo(ActivistCampaignsTool));
