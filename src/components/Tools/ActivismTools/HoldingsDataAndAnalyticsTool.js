import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import {
  ACTIVISM_OVERVIEW,
  QUERY_PID,
  INVESTOR_ACTIVISM_OVERVIEW,
  QUERY_INVESTOR
} from '../../../constants/PathsConstant';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow
} from '../../../utils/AgGridFunctions';
import { numberToCommaString } from '../../../utils/table-tools-util';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const HoldingsDataAndAnalyticsTool = (props) => {
  const gridOptionsHoldingDataAndAnalytics = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.activist_name,
        field: 'activist_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 180,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = props.holdingdData.filter((c) => c.activist_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${lstData[0].investor_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = props.holdingdData.filter((c) => c.activist_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${lstData[0].investor_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
        getQuickFilterText
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.investor_id,
        field: 'investor_id',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'category',
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.Activist_country,
        field: 'Activist_country',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.focused_type,
        field: 'focused_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.AUM_dollars,
        field: 'AUM_dollars',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        chartDataType: 'series'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.assets_date,
        field: 'assets_date',
        type: ['dateColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.company_name,
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = props.holdingdData.filter((c) => c.company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${ACTIVISM_OVERVIEW}${QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = props.holdingdData.filter((c) => c.company_name === params.value);
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${ACTIVISM_OVERVIEW}${QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
        minWidth: 180,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.PID,
        field: 'PID',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.Company_country,
        field: 'Company_country',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.industry_name,
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.industry_sector_name,
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.market_cap_USD,
        field: 'market_cap_USD',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'series',
        valueFormatter: (params) => (params.data.market_cap_USD !== null ? Math.round(params.data.market_cap_USD) : '')
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.market_cap_category,
        field: 'market_cap_category',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.symbol,
        field: 'symbol',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },

      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.exchange_name,
        field: 'exchange_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.date_first_invested,
        field: 'date_first_invested',
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.year_first_invested,
        field: 'year_first_invested',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        enablePivot: true,
        aggFunc: 'count(Dist)',
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.pcent_held,
        field: 'pcent_held',
        type: ['numberColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 120,
        chartDataType: 'series',
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.Status,
        field: 'Status',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.exit_date,
        field: 'exit_date',
        type: ['dateColumn', 'enableRowGroup', 'enableValue'],
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        cellClass: 'dateFormat'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.exit_type,
        field: 'exit_type',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 180,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.price_per_share,
        field: 'price_per_share',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'series'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.Purchase_Value_mn,
        field: 'Purchase_Value_mn',
        type: ['numberColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        chartDataType: 'series'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.currency,
        field: 'currency',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.Buyer,
        field: 'Buyer',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
        minWidth: 120,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.publicDemand,
        field: 'publicDemand',
        type: ['setColumn', 'enableRowGroup', 'enableValue'],
        minWidth: 180,
        aggFunc: 'count(Dist)',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category'
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.returnf,
        field: 'returnf',
        cellRenderer: (params) => {
          if (params.value !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          if (params.node !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          return null;
        },
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        aggFunc: 'count(Dist)',
        minWidth: 180,
        getQuickFilterText
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.return_snpf,
        field: 'return_snpf',
        minWidth: 180,
        cellRenderer: (params) => {
          if (params.value !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          if (params.node !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          return null;
        },
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        aggFunc: 'count(Dist)',
        getQuickFilterText
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.return_annf,
        field: 'return_annf',
        minWidth: 180,
        cellRenderer: (params) => {
          if (params.value !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          if (params.node !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          return null;
        },
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        aggFunc: 'count(Dist)',
        getQuickFilterText
      },
      {
        headerName: props.holdingdDataHeading !== undefined && props.holdingdDataHeading.return_snp_annf,
        field: 'return_snp_annf',
        minWidth: 180,
        cellRenderer: (params) => {
          if (params.value !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          if (params.node !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${params.value < 0 ? 'text-danger' : 'text-success'}>${params.value}</span>`;
            return eDiv;
          }
          return null;
        },
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        aggFunc: 'count(Dist)',
        getQuickFilterText
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    showColumns: {
      btnName: 'Show All Columns', // this is the default columns
      columns: [
        {
          colId: 'activist_name',
          hide: false
        },
        {
          colId: 'investor_id',
          hide: true
        },
        {
          colId: 'Activist_country',
          hide: true
        },
        {
          colId: 'Company_country',
          hide: true
        },
        {
          colId: 'focused_type',
          hide: true
        },
        {
          colId: 'activist_founded',
          hide: true
        },
        {
          colId: 'company_name',
          hide: false
        },
        {
          colId: 'PID',
          hide: true
        },
        {
          colId: 'symbol',
          hide: true
        },
        {
          colId: 'AUM_dollars',
          hide: true
        },
        {
          colId: 'date_first_invested',
          hide: false
        },
        {
          colId: 'year_first_invested',
          hide: true
        },
        {
          colId: 'pcent_held',
          hide: false
        },
        {
          colId: 'Status',
          hide: false
        },
        {
          colId: 'assets_date',
          hide: true
        },
        {
          colId: 'industry_name',
          hide: true
        },
        {
          colId: 'industry_sector_name',
          hide: true
        },
        {
          colId: 'market_cap_USD',
          hide: true
        },
        {
          colId: 'market_cap_category',
          hide: true
        },

        {
          colId: 'exit_date',
          hide: false
        },
        {
          colId: 'exit_type',
          hide: true
        },
        {
          colId: 'price_per_share',
          hide: true
        },
        {
          colId: 'Purchase_Value_mn',
          hide: true
        },
        {
          colId: 'currency',
          hide: true
        },
        {
          colId: 'exchange_name',
          hide: true
        },
        {
          colId: 'Buyer',
          hide: true
        },
        {
          colId: 'publicDemand',
          hide: false
        },
        {
          colId: 'returnf',
          hide: true
        },
        {
          colId: 'return_snpf',
          hide: true
        },
        {
          colId: 'return_annf',
          hide: true
        },
        {
          colId: 'return_snp_annf',
          hide: true
        }
      ]
    },
    hideColumns: {
      btnName: 'Show Defaults Columns',
      columns: [
        {
          colId: 'activist_name',
          hide: false
        },
        {
          colId: 'investor_id',
          hide: false
        },
        {
          colId: 'Activist_country',
          hide: false
        },
        {
          colId: 'focused_type',
          hide: false
        },
        {
          colId: 'AUM_dollars',
          hide: false
        },
        {
          colId: 'assets_date',
          hide: false
        },
        {
          colId: 'company_name',
          hide: false
        },
        {
          colId: 'PID',
          hide: false
        },

        {
          colId: 'symbol',
          hide: false
        },
        {
          colId: 'Company_country',
          hide: false
        },
        {
          colId: 'date_first_invested',
          hide: false
        },
        {
          colId: 'year_first_invested',
          hide: false
        },
        {
          colId: 'pcent_held',
          hide: false
        },
        {
          colId: 'exchange_name',
          hide: false
        },
        {
          colId: 'industry_name',
          hide: false
        },
        {
          colId: 'industry_sector_name',
          hide: false
        },
        {
          colId: 'market_cap_USD',
          hide: false
        },
        {
          colId: 'market_cap_category',
          hide: false
        },
        {
          colId: 'Status',
          hide: false
        },
        {
          colId: 'exit_date',
          hide: false
        },
        {
          colId: 'exit_type',
          hide: false
        },
        {
          colId: 'price_per_share',
          hide: false
        },
        {
          colId: 'Purchase_Value_mn',
          hide: false
        },
        {
          colId: 'currency',
          hide: false
        },
        {
          colId: 'Buyer',
          hide: false
        },
        {
          colId: 'publicDemand',
          hide: false
        },
        {
          colId: 'returnf',
          hide: false
        },
        {
          colId: 'return_snpf',
          hide: false
        },
        {
          colId: 'return_annf',
          hide: false
        },
        {
          colId: 'return_snp_annf',
          hide: false
        }
      ]
    },
    showReturnColumns: {
      btnName: 'Show Follower',
      columns: [
        {
          colId: 'activist_name',
          hide: false
        },
        {
          colId: 'investor_id',
          hide: true
        },
        {
          colId: 'Activist_country',
          hide: true
        },
        {
          colId: 'focused_type',
          hide: true
        },
        {
          colId: 'AUM_dollars',
          hide: true
        },
        {
          colId: 'assets_date',
          hide: true
        },
        {
          colId: 'company_name',
          hide: false
        },
        {
          colId: 'PID',
          hide: true
        },
        {
          colId: 'symbol',
          hide: true
        },
        {
          colId: 'Company_country',
          hide: true
        },
        {
          colId: 'date_first_invested',
          hide: false
        },
        {
          colId: 'year_first_invested',
          hide: true
        },
        {
          colId: 'pcent_held',
          hide: false
        },
        {
          colId: 'exchange_name',
          hide: true
        },
        {
          colId: 'industry_name',
          hide: true
        },
        {
          colId: 'industry_sector_name',
          hide: true
        },
        {
          colId: 'market_cap_USD',
          hide: true
        },
        {
          colId: 'market_cap_category',
          hide: true
        },
        {
          colId: 'Status',
          hide: false
        },
        {
          colId: 'exit_date',
          hide: false
        },
        {
          colId: 'exit_type',
          hide: true
        },
        {
          colId: 'price_per_share',
          hide: true
        },
        {
          colId: 'Purchase_Value_mn',
          hide: true
        },
        {
          colId: 'currency',
          hide: true
        },
        {
          colId: 'Buyer',
          hide: true
        },
        {
          colId: 'publicDemand',
          hide: false
        },
        {
          colId: 'returnf',
          hide: true
        },
        {
          colId: 'return_snpf',
          hide: true
        },
        {
          colId: 'return_annf',
          hide: true
        },
        {
          colId: 'return_snp_annf',
          hide: true
        }
      ]
    },
    hideReturnColumns: {
      btnName: 'Show Default Column',
      columns: [
        {
          colId: 'activist_name',
          hide: false
        },
        {
          colId: 'investor_id',
          hide: true
        },
        {
          colId: 'Activist_country',
          hide: true
        },
        {
          colId: 'Company_country',
          hide: true
        },
        {
          colId: 'focused_type',
          hide: true
        },
        {
          colId: 'activist_founded',
          hide: true
        },
        {
          colId: 'company_name',
          hide: false
        },
        {
          colId: 'PID',
          hide: true
        },
        {
          colId: 'symbol',
          hide: true
        },
        {
          colId: 'date_first_invested',
          hide: false
        },
        {
          colId: 'exchange_name',
          hide: true
        },
        {
          colId: 'Year_first_invested',
          hide: true
        },
        {
          colId: 'pcent_held',
          hide: false
        },
        {
          colId: 'Status',
          hide: true
        },
        {
          colId: 'assets_date',
          hide: true
        },
        {
          colId: 'industry_name',
          hide: true
        },
        {
          colId: 'industry_sector_name',
          hide: true
        },
        {
          colId: 'market_cap_USD',
          hide: true
        },
        {
          colId: 'market_cap_category',
          hide: true
        },

        {
          colId: 'exit_date',
          hide: false
        },
        {
          colId: 'exit_type',
          hide: true
        },
        {
          colId: 'price_per_share',
          hide: true
        },
        {
          colId: 'Purchase_Value_mn',
          hide: true
        },
        {
          colId: 'currency',
          hide: true
        },
        {
          colId: 'Buyer',
          hide: true
        },
        {
          colId: 'publicDemand',
          hide: false
        },
        {
          colId: 'returnf',
          hide: false
        },
        {
          colId: 'return_snpf',
          hide: false
        },
        {
          colId: 'return_annf',
          hide: false
        },
        {
          colId: 'return_snp_annf',
          hide: false
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    rowData:
      props.holdingdData !== undefined &&
      props.holdingdData.map((x) => ({
        ...x,
        returnf: x.returnf !== null ? parseFloat(x.returnf).toFixed(1) : null,
        return_snpf: x.return_snpf !== null ? parseFloat(x.return_snpf).toFixed(1) : null,
        return_annf: x.return_annf !== null ? parseFloat(x.return_annf).toFixed(1) : null,
        return_snp_annf: x.return_snp_annf !== null ? parseFloat(x.return_snp_annf).toFixed(1) : null,
        AUM_dollars: x.AUM_dollars !== null ? numberToCommaString(parseFloat(x.AUM_dollars).toFixed(0)) : null,
        currency:
          x.price_per_share !== undefined &&
          x.price_per_share !== null &&
          x.Purchase_Value_mn !== undefined &&
          x.Purchase_Value_mn !== null
            ? x.currency
            : '',
        pcent_held:
          x.pcent_held !== undefined && x.pcent_held !== null
            ? x.pcent_held < 0
              ? x.pcent_held.toFixed(1).toString().replace('-', '<')
              : x.pcent_held.toFixed(1)
            : '',
        allowDownload: true
      })),
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    quickSearchFilter: true,
    aggFuncs: {
      'count(Dist)': distinctCounts
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh'
  };

  return (
    <Page {...props} key={1}>
      <div>
        <div className='row card'>
          <div className='col-md-12 col-sm-12 pt-3'>
            {props.isLoading ? (
              <div className='vh-100'>
                <div className='h-50'>
                  <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                </div>
              </div>
            ) : (
              <div>
                <div className='row tblShortCampData'>
                  {props.holdingdDataHeading !== undefined && (
                    <>
                      <Table
                        IsShowCard={false}
                        title='Holdings Data and Analytics Tool'
                        smalltitle='Holdings Data and Analytics Tool'
                        gridOptions={gridOptionsHoldingDataAndAnalytics}
                        enableCharts
                        hideExcelDownloadIcon={props.trialUserDisableDownload}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(HoldingsDataAndAnalyticsTool));
