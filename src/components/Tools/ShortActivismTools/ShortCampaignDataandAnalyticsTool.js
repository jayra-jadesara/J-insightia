import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Table from '../../GeneralForm/Table';
import Page from '../../Page';
import {
  filters,
  distinctCounts,
  getQuickFilterText,
  bottomStatusBar,
  columnAndfilterSidebarNoPivotNoColNoRow,
} from '../../../utils/AgGridFunctions';
import {
  ACTIVISTSHORTS_OVERVIEW,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW,
  ACTIVISTSHORTS_CAMPAIGNS,
  QUERY_PID,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';
import { setCellStyleFinancial } from '../../../utils/table-tools-util';

const ProgressBar = React.lazy(() => import('../../GeneralForm/ProgressBar'));

const ShortCampaignDataandAnalyticsTool = ({
  isCampaignDataandAnalyticsLoading,
  lstCampaignDataandAnalyticsData,
  procedureRunningEstimateTime,
  trialStatus,
  allowDownload,
  userMessage,
  lstShortCampaignSampleData,
  handleOnChangeDdlSelectedValue,
  ddlSelectedValue,
  trialUserDisableDownload,
}) => {
  function custom_sort(a, b) {
    return (
      new Date(b.action_date).getTime() - new Date(a.action_date).getTime()
    );
  }
  const gridJSON = lstCampaignDataandAnalyticsData && lstCampaignDataandAnalyticsData
    .slice()
    .sort(custom_sort)
    .map((x) => ({
      ...x,
      TrialStatus: trialStatus,
      allowDownload,
      Downside_Target:
        x.Downside_Target !== null
          ? parseFloat(x.Downside_Target).toFixed(2)
          : null,
      return: x.return !== null ? parseFloat(x.return).toFixed(2) : null,
      return_snp:
        x.return_snp !== null ? parseFloat(x.return_snp).toFixed(2) : null,
      week_return:
        x.week_return !== null ? parseFloat(x.week_return).toFixed(2) : null,
      week_return_snp:
        x.week_return_snp !== null
          ? parseFloat(x.week_return_snp).toFixed(2)
          : null,
      month_return:
        x.month_return !== null ? parseFloat(x.month_return).toFixed(2) : null,
      month_return_snp:
        x.month_return_snp !== null
          ? parseFloat(x.month_return_snp).toFixed(2)
          : null,
      year_return:
        x.year_return !== null ? parseFloat(x.year_return).toFixed(2) : null,
      year_return_snp:
        x.year_return_snp !== null
          ? parseFloat(x.year_return_snp).toFixed(2)
          : null,
      returnf: x.returnf !== null ? parseFloat(x.returnf).toFixed(2) : null,
      return_snpf:
        x.return_snpf !== null ? parseFloat(x.return_snpf).toFixed(2) : null,
      week_returnf:
        x.week_returnf !== null ? parseFloat(x.week_returnf).toFixed(2) : null,
      week_return_snpf:
        x.week_return_snpf !== null
          ? parseFloat(x.week_return_snpf).toFixed(2)
          : null,
      month_returnf:
        x.month_returnf !== null
          ? parseFloat(x.month_returnf).toFixed(2)
          : null,
      month_return_snpf:
        x.month_return_snpf !== null
          ? parseFloat(x.month_return_snpf).toFixed(2)
          : null,
      year_returnf:
        x.year_returnf !== null ? parseFloat(x.year_returnf).toFixed(2) : null,
      year_return_snpf:
        x.year_return_snpf !== null
          ? parseFloat(x.year_return_snpf).toFixed(2)
          : null,
      market_cap_USD:
        x.market_cap_USD !== null && x.market_cap_USD !== undefined
          ? x.market_cap_USD.toFixed(1)
          : '',
    }));

  function showDefaultColfn() {
    const b = [];
    Object.keys(gridJSON).length > 0 &&
      Object.keys(gridJSON[0]).map((x) => {
        if (
          x === 'activist_name' ||
          x === 'company_name' ||
          x === 'action_date' ||
          x === 'action' ||
          x === 'campaign_summary_id'
        ) {
          b.push({ colId: x, hide: false });
        } else {
          b.push({ colId: x, hide: true });
        }
      });
    return b;
  }
  function showAllColfn() {
    const b = [];
    Object.keys(gridJSON).length > 0 &&
      Object.keys(gridJSON[0]).map((x) => {
        if (
          x === 'campaign_summary_id' ||
          x === 'return_snp' ||
          x === 'week_return' ||
          x === 'week_return_snp' ||
          x === 'month_return' ||
          x === 'month_return_snp' ||
          x === 'year_return' ||
          x === 'year_return_snp' ||
          x === 'returnf' ||
          x === 'return_snpf' ||
          x === 'week_returnf' ||
          x === 'week_return_snpf' ||
          x === 'month_returnf' ||
          x === 'month_return_snpf' ||
          x === 'year_returnf' ||
          x === 'year_return_snpf'
        ) {
          b.push({ colId: x, hide: true });
        } else {
          b.push({ colId: x, hide: false });
        }
      });
    return b;
  }
  function showAllReturnColfn() {
    const b = [];
    Object.keys(gridJSON).length > 0 &&
      Object.keys(gridJSON[0]).map((x) => {
        if (
          x === 'activist_name' ||
          x === 'company_name' ||
          x === 'action_date' ||
          x === 'action' ||
          x === 'campaign_summary_id' ||
          x === 'return' ||
          x === 'return_snp' ||
          x === 'week_return' ||
          x === 'week_return_snp' ||
          x === 'month_return' ||
          x === 'month_return_snp' ||
          x === 'year_return' ||
          x === 'year_return_snp' ||
          x === 'returnf' ||
          x === 'return_snpf' ||
          x === 'week_returnf' ||
          x === 'week_return_snpf' ||
          x === 'month_returnf' ||
          x === 'month_return_snpf' ||
          x === 'year_returnf' ||
          x === 'year_return_snpf'
        ) {
          b.push({ colId: x, hide: false });
        } else {
          b.push({ colId: x, hide: true });
        }
      });
    return b;
  }

  const gridOptionsPublicDemandToolList = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'activist_name',
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstCampaignDataandAnalyticsData.filter(
                (c) => c.activist_name === params.value
              );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${lstData[0].investor_id}`,
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
              const lstData = lstCampaignDataandAnalyticsData.filter(
                (c) => c.activist_name === params.value
              );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${lstData[0].investor_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'enableValue', 'enableRowGroup', 'autoHeightTrue'],
        minWidth: 180,
        allowedAggFuncs: ['count(Dist)', 'count'],
        aggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        getQuickFilterText,
      },
      {
        headerName: 'Investor ID',
        field: 'investor_id',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 120,
        chartDataType: 'series',
        getQuickFilterText,
      },
      {
        headerName: 'Investor HQ',
        field: 'activist_HQ',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        minWidth: 150,
        enablePivot: true,
        chartDataType: 'category',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
      },
      {
        headerName: 'Investor Founded',
        field: 'activist_founded',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 150,
        chartDataType: 'series',
        getQuickFilterText,
      },
      {
        headerName: 'Company',
        field: 'company_name',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstCampaignDataandAnalyticsData.filter(
                (c) => c.company_name === params.value
              );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer">${params.node.key}</span>`;
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstCampaignDataandAnalyticsData.filter(
                (c) => c.company_name === params.value
              );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${lstData[0].PID}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 180,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        getQuickFilterText,
      },
      {
        headerName: 'PID',
        field: 'PID',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 100,
        chartDataType: 'series',
        getQuickFilterText,
      },
      {
        headerName: 'Symbol',
        field: 'symbol',
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        minWidth: 100,
        chartDataType: 'category',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
      },
      {
        headerName: 'Announce Date',
        field: 'action_date',
        minWidth: 150,
        type: ['dateColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        cellClass: 'dateFormat',
        getQuickFilterText,
      },
      {
        headerName: 'Announce Year',
        field: 'Year_action',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 150,
        filter: 'agSetColumnFilter',
        getQuickFilterText,
      },
      {
        headerName: 'Allegations',
        field: 'action',
        filterParams: {
          caseSensitive: true,
          defaultOption: 'startsWith',
        },
        type: ['setColumn', 'enableRowGroup', 'enableValue', 'autoHeightTrue'],
        minWidth: 120,
        enablePivot: true,
        chartDataType: 'category',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        getQuickFilterText,
      },
      {
        headerName: 'Campaign',
        field: 'campaign_summary_id',
        cellRenderer: (params) => {
          if (params.value !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML =
              '<span class="btn-simple btn-link cursor-pointer text-secondary">Details</span>';
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstCampaignDataandAnalyticsData.filter(
                (c) => c.campaign_summary_id === params.value
              );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${ACTIVISTSHORTS_CAMPAIGNS}${QUERY_PID}${lstData[0].PID}&cmpid=${lstData[0].campaign_summary_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          if (params.node !== undefined) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML =
              '<span class="btn-simple btn-link cursor-pointer text-secondary">Details</span>';
            const eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eButton.addEventListener('click', () => {
              const lstData = lstCampaignDataandAnalyticsData.filter(
                (c) => c.campaign_summary_id === params.value
              );
              if (lstData.length > 0) {
                window.open(
                  `${window.location.protocol}//${window.location.host}${ACTIVISTSHORTS_CAMPAIGNS}${QUERY_PID}${lstData[0].PID}&cmpid=${lstData[0].campaign_summary_id}`,
                  '_blank'
                );
              }
            });
            return eDiv;
          }
          return null;
        },
        type: [
          'setColumn',
          'enableRowGroup',
          'enableValue',
          'nonFloatingFilter',
          'autoHeightTrue',
        ],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 130,
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Company HQ',
        field: 'country',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        minWidth: 130,
        enablePivot: true,
        allowedAggFuncs: ['count(Dist)', 'count'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
        getQuickFilterText,
      },
      {
        headerName: 'Company Region',
        field: 'company_region',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Exchange',
        field: 'exchange_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
        minWidth: 100,
        getQuickFilterText,
      },
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'series',
        minWidth: 160,
        getQuickFilterText,
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        chartDataType: 'category',
        minWidth: 160,
        getQuickFilterText,
      },
      {
        headerName: 'Mkt Cap ($mn)',
        field: 'market_cap_USD',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 150,
        getQuickFilterText,
      },
      {
        headerName: 'Mkt Cap Category',
        field: 'market_cap_category',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 150,
        getQuickFilterText,
      },
      {
        headerName: 'Status',
        field: 'current_status',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 100,
        getQuickFilterText,
      },
      {
        headerName: 'End Date',
        field: 'exit_date',
        cellClass: 'dateFormat',
        type: ['dateColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 120,
        getQuickFilterText,
      },
      {
        headerName: 'Downside Target %',
        field: 'Downside_Target',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          if (params.value !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${
              params.value < 0 ? 'text-danger' : 'text-success'
            }>${params.value}</span>`;
            return eDiv;
          }
          if (params.node !== undefined && params.value !== null) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class=${
              params.value < 0 ? 'text-danger' : 'text-success'
            }>${params.value}</span>`;
            return eDiv;
          }
          return null;
        },
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 150,
        getQuickFilterText,
      },
      {
        headerName: 'Follower Return',
        field: 'return',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        tyep: ['autoHeightTrue'],
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: ['numberColumn', 'enableRowGroup', 'hiddenField'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 150,
        getQuickFilterText,
      },
      {
        headerName: 'S&P 500 Return',
        field: 'return_snp',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Week Campaign',
        field: 'week_return',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Week S&P 500',
        field: 'week_return_snp',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Month Campaign ',
        field: 'month_return',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Month S&P 500',
        field: 'month_return_snp',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Year Campaign ',
        field: 'year_return',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Year S&P 500',
        field: 'year_return_snp',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Campaign Return',
        field: 'returnf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'S&P 500 Return',
        field: 'return_snpf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Follower 1 week',
        field: 'week_returnf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 100,
        getQuickFilterText,
      },
      {
        headerName: '1 Week S&P 500',
        field: 'week_return_snpf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Month Follower',
        field: 'month_returnf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 150,
        getQuickFilterText,
      },
      {
        headerName: '1 Month S&P 500',
        field: 'month_return_snpf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 150,
        getQuickFilterText,
      },
      {
        headerName: '1 Year Follower',
        field: 'year_returnf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: '1 Year S&P 500',
        field: 'year_return_snpf',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.value !== undefined && params.value !== null) {
            eDiv.innerHTML = `<span>${params.value}</span>`;
          } else {
            eDiv.innerHTML = '<span>-</span>';
          }
          return eDiv;
        },
        cellClassRules: {
          redFont: (params) => params.value < 0,
          greenFont: (params) => params.value > 0,
        },
        cellStyle: (params) =>
          params.value !== '' && setCellStyleFinancial(params.value),
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Price Per Share',
        field: 'price_per_share',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Purchase Value (Mn)',
        field: 'Purchase_Value_mn',
        cellClass: 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        type: [
          'numberColumn',
          'enableRowGroup',
          'hiddenField',
          'autoHeightTrue',
        ],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'series',
        minWidth: 120,
        getQuickFilterText,
      },
      {
        headerName: 'Currency',
        field: 'currency',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['setColumn', 'enableRowGroup', 'hiddenField', 'autoHeightTrue'],
        allowedAggFuncs: ['count(Dist)', 'count'],
        chartDataType: 'category',
        minWidth: 100,
        getQuickFilterText,
      },
      {
        headerName: 'Buyer',
        field: 'buyer',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: ['hiddenField'],
        chartDataType: 'category',
        minWidth: 100,
        getQuickFilterText,
      },
      {
        headerName: 'Class Action',
        field: 'class_action',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: [
          'setColumn',
          'enableRowGroup',
          'enableValue',
          'hiddenField',
          'autoHeightTrue',
        ],
        chartDataType: 'category',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Auditor Resigned',
        field: 'auditor_resigned',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: [
          'setColumn',
          'enableRowGroup',
          'enableValue',
          'hiddenField',
          'autoHeightTrue',
        ],
        chartDataType: 'category',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Full Report',
        field: 'full_report',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: [
          'setColumn',
          'enableRowGroup',
          'enableValue',
          'hiddenField',
          'autoHeightTrue',
        ],
        chartDataType: 'category',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Delisted in Campaign',
        field: 'delisted',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: [
          'setColumn',
          'enableRowGroup',
          'enableValue',
          'hiddenField',
          'autoHeightTrue',
        ],
        chartDataType: 'category',
        minWidth: 130,
        getQuickFilterText,
      },
      {
        headerName: 'Company Responds',
        field: 'company_respnd',
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        type: [
          'setColumn',
          'enableRowGroup',
          'enableValue',
          'hiddenField',
          'autoHeightTrue',
        ],
        chartDataType: 'category',
        minWidth: 130,
        getQuickFilterText,
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
    showReturnColumns: {
      btnName: 'Show Return Data',
      columns: showDefaultColfn(),
    },
    hideReturnColumns: {
      btnName: 'Show Default Columns',
      columns: showAllReturnColfn(),
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: true,
    pivotMode: false,
    rowData: gridJSON,
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
    tableSmallLabel: userMessage,
  };

  useEffect(() => window.scrollTo(0, 500));

  return (
    <Page key={1}>
      <div className='row card'>
        <div className='col-md-12 col-sm-12 pt-3'>
          {isCampaignDataandAnalyticsLoading ? (
            <div className='vh-100'>
              <div className='h-50'>
                <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
              </div>
            </div>
          ) : (
            <div>
              <div className='row tblShortCampData'>
                <Table
                  IsShowCard={false}
                  title=''
                  smalltitle=''
                  gridOptions={gridOptionsPublicDemandToolList}
                  enableCharts
                  isDropDown={lstShortCampaignSampleData}
                  handleDropDownSelection={handleOnChangeDdlSelectedValue}
                  handledChangedDDLValue={handleOnChangeDdlSelectedValue}
                  DropDownSelection={ddlSelectedValue}
                  hideExcelDownloadIcon={trialUserDisableDownload}
                  chartJSON={gridJSON && gridJSON
                    .slice()
                    .sort((a, b) => a.Year_action - b.Year_action)
                    .map((x) => ({
                      ...x,
                      Year_action:
                        x.Year_action === new Date().getFullYear()
                          ? `${x.Year_action} YTD`
                          : x.Year_action,
                    }))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

ShortCampaignDataandAnalyticsTool.propTypes = {
  isCampaignDataandAnalyticsLoading: PropTypes.bool,
  allowDownload: PropTypes.bool,
  trialStatus: PropTypes.bool,
  procedureRunningEstimateTime: PropTypes.number,
  lstCampaignDataandAnalyticsData: PropTypes.array,
  userMessage: PropTypes.string,
};

ShortCampaignDataandAnalyticsTool.defaultProps = {
  isCampaignDataandAnalyticsLoading: true,
  allowDownload: true,
  trialStatus: true,
  procedureRunningEstimateTime: undefined,
  lstCampaignDataandAnalyticsData: [],
  userMessage: '',
};

export default withRouter(React.memo(ShortCampaignDataandAnalyticsTool));
