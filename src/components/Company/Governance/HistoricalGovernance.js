import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import pathConst from '../../../constants/PathsConstant';
import {
  gridWidthValuesVLrg,
  gridWidthValuesXLrg
} from '../../../utils/table-tools-util';
import Table from '../../GeneralForm/Table';
import { filters, getQuickFilterText, columnAndfilterSidebarNoPivotNoColNoRow } from '../../../utils/AgGridFunctions';

const bem = bn.create('collapseCardToolPane');

const historicalGovernance = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.pid) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

const getValueFromNum = (val) => {
  if (val) {
    if (val === '1') {
      return 'Yes';
    }
    if (val === '0') {
      return 'No';
    }
    return val;
  }
};

  const gridOptionsHistoricalGov = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Quarter',
        field: 'display',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        maxWidth: 110,
        minWidth: 110,
        toolPanelClass: 'hidden-panel',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : 'ws-normal-lh24 ps-1 pe-1 text-center dateFormat',
      },
      {
        headerName: 'State Of Incorporation',
        field: 'state_of_incorp',
        ...gridWidthValuesVLrg,
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Board Size',
        field: 'Board Size',
        ...gridWidthValuesVLrg,
        getQuickFilterText,
        type: ['numberColumn'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Females on board',
        field: 'Females on board',
        ...gridWidthValuesVLrg,
        getQuickFilterText,
        type: ['numberColumn'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Gender Diversity (%)',
        field: 'Gender Diversity (%)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Average Age (years)',
        field: 'Average Age (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Max Age (years)',
        field: 'Max Age (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Average Tenure (years)',
        field: 'Average Tenure (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Max Tenure (years)',
        field: 'Max Tenure (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Chairman Tenure (years)',
        field: 'Chairman Tenure (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'CEO Tenure (years)',
        field: 'CEO Tenure (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Separate CEO and Chairman',
        field: 'Separate CEO and Chairman',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellClassRules: 'numToVal'
      },
      {
        headerName: 'Shared Board',
        field: 'Shared Board',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Overboarding',
        field: 'Overboarding',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Auditor Name',
        field: 'Auditor Name',
        ...gridWidthValuesVLrg,
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Auditor Tenure (years)',
        field: 'Auditor Tenure (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Amendments to size of board without shareholder approval',
        field: 'Amendments to size of board without shareholder approval',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Board can Amend Bylaws Without Shareholder Approval',
        field: 'Board can Amend Bylaws Without Shareholder Approval',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Board fills all Vacancies',
        field: 'Board fills all Vacancies',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Directors Removed only for Cause',
        field: 'Directors Removed only for Cause',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Directors Removed only for Cause (%)',
        field: 'Directors Removed only for Cause (%)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Exclusive Forum Provision',
        field: 'Exclusive Forum Provision',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Retirement Policy',
        field: 'Retirement Policy',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Retirement Policy (years)',
        field: 'Retirement Policy (years)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Staggered board',
        field: 'Staggered board',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Supermajority Shareholder Vote Required to Amend Certain Provisions',
        field: 'Supermajority Shareholder Vote Required to Amend Certain Provisions',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Supermajority Shareholder Vote Required to Amend Certain Provisions (%)',
        field: 'Supermajority Shareholder Vote Required to Amend Certain Provisions (%)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Action by Written Consent',
        field: 'Action by Written Consent',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Advance Notice Bylaws',
        field: 'Advance Notice Bylaws',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Proxy Access',
        field: 'Proxy Access',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Right for Shareholders to call special meeting',
        field: 'Right for Shareholders to call special meeting',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Right for Shareholders to call special meeting (%)',
        field: 'Right for Shareholders to call special meeting (%)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesXLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Controlled Company',
        field: 'Controlled Company',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Cumulative Voting',
        field: 'Cumulative Voting',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Majority Vote for Uncontested Election',
        field: 'Majority Vote for Uncontested Election',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Pre-emptive rights to existing shareholders',
        field: 'Pre-emptive rights to existing shareholders',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Sunset Provision',
        field: 'Sunset Provision',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Dual Share Class',
        field: 'Dual Share Class',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Active Poison Pill',
        field: 'Active Poison Pill',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Constituency',
        field: 'Constituency',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Control Share Acquisition',
        field: 'Control Share Acquisition',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Fair Price',
        field: 'Fair Price',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Business Combination',
        field: 'Business Combination',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Poison Pill Validation',
        field: 'Poison Pill Validation',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Supermajority Vote for Merger',
        field: 'Supermajority Vote for Merger',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Supermajority Vote for Merger (%)',
        field: 'Supermajority Vote for Merger (%)',
        getQuickFilterText,
        type: ['numberColumn'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Holding Period Based Voting Rights',
        field: 'Holding Period Based Voting Rights',
        getQuickFilterText,
        type: ['setColumn', 'enableRowGroup'],
        ...gridWidthValuesVLrg,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    isfloatingFilter: true,
    sideBar: columnAndfilterSidebarNoPivotNoColNoRow,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'display',
          pinned: 'left',
        },
      ]
    },
    paggination: { isPagging: false, pageSize: 10 },
    defaultColDef: {
      sortable: true,
    },
    rowData: props.lstHistoricalGov.map((x) => ({
      ...x,
      'Board Size': x['Board Size'] && Number(x['Board Size']) ? Number(x['Board Size']) : '',
      'Females on board': x['Females on board'] && Number(x['Females on board']) ? Number(x['Females on board']) : '0',
      'Average Age (years)': x['Average Age (years)'] && Number(x['Average Age (years)']) ? Number(x['Average Age (years)']) : '',
      'Max Age (years)': x['Max Age (years)'] && Number(x['Max Age (years)']) ? Number(x['Max Age (years)']) : '',
      'Gender Diversity (%)': x['Gender Diversity (%)'] && Number(x['Gender Diversity (%)']) ? Number(x['Gender Diversity (%)']) : '0',
      'Average Tenure (years)': x['Average Tenure (years)'] && Number(x['Average Tenure (years)']) ? Number(x['Average Tenure (years)']) : '',
      'Max Tenure (years)': x['Max Tenure (years)'] && Number(x['Max Tenure (years)']) ? Number(x['Max Tenure (years)']) : '',
      'Chairman Tenure (years)': x['Chairman Tenure (years)'] && Number(x['Chairman Tenure (years)']) ? Number(x['Chairman Tenure (years)']) : '',
      'CEO Tenure (years)': x['CEO Tenure (years)'] && Number(x['CEO Tenure (years)']) ? Number(x['CEO Tenure (years)']) : '',
      'Auditor Tenure (years)': x['Auditor Tenure (years)'] && Number(x['Auditor Tenure (years)']) ? Number(x['Auditor Tenure (years)']) : '',
      'Retirement Policy (years)': x['Retirement Policy (years)'] && Number(x['Retirement Policy (years)']) ? Number(x['Retirement Policy (years)']) : '',
      'Supermajority Shareholder Vote Required to Amend Certain Provisions (%)': x[
        'Supermajority Shareholder Vote Required to Amend Certain Provisions (%)'
      ] && Number(x['Supermajority Shareholder Vote Required to Amend Certain Provisions (%)'])
        ? Number(x['Supermajority Shareholder Vote Required to Amend Certain Provisions (%)'])
        : '',
      'Right for Shareholders to call special meeting (%)': x['Right for Shareholders to call special meeting (%)'] && Number(x['Right for Shareholders to call special meeting (%)'])
        ? Number(x['Right for Shareholders to call special meeting (%)'])
        : '',
      'Supermajority Vote for Merger (%)': x['Supermajority Vote for Merger (%)'] && Number(x['Supermajority Vote for Merger (%)'])
        ? Number(x['Supermajority Vote for Merger (%)'])
        : '',
      'Directors Removed only for Cause (%)': x['Directors Removed only for Cause (%)'] && Number(x['Directors Removed only for Cause (%)']) ? Number(x['Directors Removed only for Cause (%)']) : '',

      'Separate CEO and Chairman': x['Separate CEO and Chairman'] && getValueFromNum(x['Separate CEO and Chairman']),
      'Shared Board': x['Shared Board'] && getValueFromNum(x['Shared Board']),
      'Amendments to size of board without shareholder approval':
        x['Amendments to size of board without shareholder approval'] &&
        getValueFromNum(x['Amendments to size of board without shareholder approval']),
      'Board can Amend Bylaws Without Shareholder Approval': x['Board can Amend Bylaws Without Shareholder Approval'] && getValueFromNum(x['Board can Amend Bylaws Without Shareholder Approval']),
      'Board fills all Vacancies': x['Board fills all Vacancies'] && getValueFromNum(x['Board fills all Vacancies']),
      'Directors Removed only for Cause': x['Directors Removed only for Cause'] && getValueFromNum(x['Directors Removed only for Cause']),
      'Exclusive Forum Provision': x['Exclusive Forum Provision'] && getValueFromNum(x['Exclusive Forum Provision']),
      'Retirement Policy': x['Retirement Policy'] && getValueFromNum(x['Retirement Policy']),
      'Staggered board': x['Staggered board'] && getValueFromNum(x['Staggered board']),
      'Supermajority Shareholder Vote Required to Amend Certain Provisions': x[
        'Supermajority Shareholder Vote Required to Amend Certain Provisions'
      ] && getValueFromNum(x['Supermajority Shareholder Vote Required to Amend Certain Provisions']),
      'Action by Written Consent': x['Action by Written Consent'] && getValueFromNum(x['Action by Written Consent']),
      'Advance Notice Bylaws': x['Advance Notice Bylaws'] && getValueFromNum(x['Advance Notice Bylaws']),
      'Proxy Access': x['Proxy Access'] && getValueFromNum(x['Proxy Access']),
      'Right for Shareholders to call special meeting': x['Right for Shareholders to call special meeting'] && getValueFromNum(x['Right for Shareholders to call special meeting']),
      'Controlled Company': x['Controlled Company'] && getValueFromNum(x['Controlled Company']),
      'Cumulative Voting': x['Cumulative Voting'] && getValueFromNum(x['Cumulative Voting']),
      'Majority Vote for Uncontested Election': x['Majority Vote for Uncontested Election'] && getValueFromNum(x['Majority Vote for Uncontested Election']),
      'Pre-emptive rights to existing shareholders': x['Pre-emptive rights to existing shareholders'] && getValueFromNum(x['Pre-emptive rights to existing shareholders']),
      'Sunset Provision': x['Sunset Provision'] && getValueFromNum(x['Sunset Provision']),
      'Dual Share Class': x['Dual Share Class'] && getValueFromNum(x['Dual Share Class']),
      'Active Poison Pill': x['Active Poison Pill'] && getValueFromNum(x['Active Poison Pill']),
      'Control Share Acquisition': x['Control Share Acquisition'] && getValueFromNum(x['Control Share Acquisition']),
      'Fair Price': x['Fair Price'] && getValueFromNum(x['Fair Price']),
      'Business Combination': x['Business Combination'] && getValueFromNum(x['Business Combination']),
      'Poison Pill Validation': x['Poison Pill Validation'] && getValueFromNum(x['Poison Pill Validation']),
      'Supermajority Vote for Merger': x['Supermajority Vote for Merger'] && getValueFromNum(x['Supermajority Vote for Merger']),
      'Holding Period Based Voting Rights': x['Holding Period Based Voting Rights'] && getValueFromNum(x['Holding Period Based Voting Rights']),
      Overboarding: x.Overboarding && getValueFromNum(x.Overboarding),
      Constituency: x.Constituency && getValueFromNum(x.Constituency),
      TrialUser: props.TrialUser,
    })),
    selectedColumns: [],
    suppressAggFuncInHeader: true,
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
  };

  React.useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        loadedItem.textContent = '';
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoading]);

  return (
    <Page key={1} className={bem.b('')}>
      <>
        {props.isLoading ? (
          'Loading...'
        ) : props.lstHistoricalGov && props.lstHistoricalGov.length > 0 ? (
          <div className='row pt-2' id='loadItem'>
            <div className='col-12'>
              <Table
                gridOptions={gridOptionsHistoricalGov}
                hideExcelDownloadIcon={props.TrialUserDisableDownload}
                pageTitle='Historical Governance'
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    </Page>
  );
};

historicalGovernance.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(React.memo(historicalGovernance));
