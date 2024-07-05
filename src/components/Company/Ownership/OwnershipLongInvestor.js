import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import DropdownList from '../../GeneralForm/DropdownList';
import Table from '../../GeneralForm/Table';
import {
  filters,
  NumberFormatFn,
  NumberFormatRevertFn,
} from '../../../utils/AgGridFunctions';
import messageConst from '../../../constants/MessageConstans';
import tooltipConst from '../../../constants/TooltipConstant';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { history } from '../../../utils/navigation-util';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import {
  setCellStyleFinancial,
  setCellStyleProposalChange,
} from '../../../utils/table-tools-util';
import CustomToolTipHeader from '../../GeneralForm/CustomToolTipHeader';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = React.lazy(() => import('../../GeneralForm/Card'));
const OwnershipLongInvestor = (props) => {
  const bem = bn.create('ownershipCompany');
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [showAllOrTop20, setShowAllOrTop20] = useState(false);
  const [showFundOwnership, setShowFundOwnership] = useState(false);
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const gridOptionsOwnershipLongData = {
    frameworkComponents: { agColumnHeader: CustomToolTipHeader },
    colDefsMedalsIncluded: [
      // colspan =6
      {
        headerName: '',
        children: [
          {
            headerName: 'Investor',
            field: 'investor',
            type: ['autoHeightTrue', 'setColumn'],
            minWidth: query.print ? 200 : width > breakpoint ? 350 : 150,
            maxWidth: query.print ? 200 : null,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24'
              : query.print
              ? 'ws-normal-lh24 font-size-smaller'
              : 'ws-normal-lh24',
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.investor_id !== '') {
                eDiv.innerHTML = `<a class='text-secondary' title=${params.data.investor} href='${pathConst.INVESTOR_OVERVIEW}?investor=${params.data.investor_id}'>
                ${params.data.investor}</a>`;
              } else {
                eDiv.innerHTML = `<span title=${params.data.investor}>${params.data.investor}</span>`;
              }
              return eDiv;
            },
          },
          // Temporarily removed until future requires
          // {
          //   headerName: props.ownershipLongInvestor_Heading.type,
          //   field: 'type',
          //   minWidth: 90,
          //   maxWidth: 100,
          //   type: ['setColumn'],
          // },
          {
            headerName: props.ownershipLongInvestor_Heading.period_of_report,
            field: 'period_of_report',
            minWidth: query.print ? 80 : 100,
            maxWidth: query.print ? 80 : 120,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 dateFormat text-center font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center dateFormat'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
            type: ['dateColumn'],
          },
          {
            headerName: props.ownershipLongInvestor_Heading.shares_value,
            field: 'shares_value',
            minWidth: query.print ? 80 : 150,
            maxWidth: query.print ? 80 : 250,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            valueFormatter(params) {
              return params.data.shares_value;
            },
          },
          {
            headerName: props.ownershipLongInvestor_Heading.shares,
            field: 'shares',
            minWidth: query.print ? 85 : 150,
            maxWidth: query.print ? 85 : 250,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            valueFormatter(params) {
              return params.data.shares;
            },
          },
          {
            headerName: props.ownershipLongInvestor_Heading.shares_pcent,
            field: 'shares_pcent',
            minWidth: 50,
            maxWidth: query.print ? 50 : 150,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            // valueFormatter(params) {
            //   return NumberFormatFn(params.data.shares_pcent);
            // },
          },
        ],
      },
      // colspan =2
      {
        headerName: 'Change in Holding',
        children: [
          {
            headerName:
              props.ownershipLongInvestor_Heading.change_in_holdings_shares,
            field: 'change_in_holdings_shares',
            minWidth: 85,
            maxWidth: query.print ? 85 : 200,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            cellRendererFramework: (params) =>
              params.data.change_in_holdings_shares
                ? params.data.change_in_holdings_shares
                : 0,
            cellClassRules: {
              dodgerBlueFont: (params) =>
                Number(
                  NumberFormatRevertFn(params.data.change_in_holdings_shares)
                ) > 0,
              redFont: (params) =>
                Number(
                  NumberFormatRevertFn(params.data.change_in_holdings_shares)
                ) < 0,
            },
            cellStyle: (params) =>
              setCellStyleProposalChange(
                Number(
                  NumberFormatRevertFn(params.data.change_in_holdings_shares)
                )
              ),
          },
          {
            // headerName: props.ownershipLongInvestor_Heading.change_in_holdings_pcent,
            headerName: 'Percentage Point Change',
            field: 'change_in_holdings_pcent',
            minWidth: query.print ? 85 : 130,
            maxWidth: query.print ? 85 : 200,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            cellRendererFramework: (params) =>
              params.data.change_in_holdings_pcent
                ? params.data.change_in_holdings_pcent
                : '',
            cellClassRules: {
              greenFont: (params) => params.data.change_in_holdings_pcent > 0,
              redFont: (params) => params.data.change_in_holdings_pcent < 0,
            },
            cellStyle: (params) =>
              setCellStyleFinancial(params.data.change_in_holdings_pcent),
          },
        ],
      },
      // colspan =2
      {
        headerName: 'Voting',
        children: [
          {
            headerName: props.ownershipLongInvestor_Heading.voting_sole,
            field: 'voting_sole',
            headerComponentParams: { text_tooltip: tooltipConst.OWNERSHIP_LONG_INVESTOR_VOTING_SOLE_TOOLTIP },
            minWidth: query.print ? 85 : 150,
            maxWidth: query.print ? 85 : 250,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            valueFormatter(params) {
              return params.data.voting_sole;
            },
          },
          {
            headerName: props.ownershipLongInvestor_Heading.voting_shared,
            field: 'voting_shared',
            headerComponentParams: { text_tooltip: tooltipConst.OWNERSHIP_LONG_INVESTOR_VOTING_SHARED_TOOLTIP },
            minWidth: query.print ? 85 : 150,
            maxWidth: query.print ? 85 : 250,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            valueFormatter(params) {
              return params.data.voting_shared;
            },
          },
          {
            headerName: props.ownershipLongInvestor_Heading.voting_none,
            field: 'voting_none',
            headerComponentParams: { text_tooltip: tooltipConst.OWNERSHIP_LONG_INVESTOR_VOTING_NONE_TOOLTIP },
            minWidth: query.print ? 85 : 150,
            maxWidth: query.print ? 85 : 250,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            valueFormatter(params) {
              return params.data.voting_none;
            },
          },
        ],
      },
      {
        headerName: '',
        children: [
          {
            headerName: props.ownershipLongInvestor_Heading.levelofactivism,
            field: 'levelofactivism',
            type: ['autoHeightTrue', 'setColumn'],
            minWidth: 115,
            maxWidth: query.print ? 115 : 150,
            cellClass: props.TrialStatus
              ? query.print
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-smaller'
                : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : query.print
              ? 'ws-normal-lh24 ps-1 pe-1 text-center font-size-smaller'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
        ],
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'investor',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: !query.print,
    rowData: props.ownershipLongInvestor_Data.map((x) => ({
      ...x,
      shares_value: x.shares_value ? NumberFormatFn(x.shares_value) : '',
      shares: x.shares ? NumberFormatFn(x.shares) : '',
      voting_sole: x.voting_sole ? NumberFormatFn(x.voting_sole) : '',
      voting_shared: x.voting_shared ? NumberFormatFn(x.voting_shared) : '',
      voting_none: x.voting_none ? NumberFormatFn(x.voting_none) : '',
      change_in_holdings_shares: x.change_in_holdings_shares
        ? NumberFormatFn(x.change_in_holdings_shares)
        : 0,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isHeaderChildren: true,
      groupHeaderHeight: null,
    },
    alignedGrids: [
      'investor',
      'type',
      'period_of_report',
      'shares_value',
      'shares',
      'shares_pcent',
      'change_in_holdings_shares',
      'change_in_holdings_pcent',
      'voting_sole',
      'voting_shared',
      'voting_none',
      'levelofactivism',
    ],
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh',
  };

  const gridOptionsFooter = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'investor',
        minWidth: query.print ? 200 : width > breakpoint ? 350 : 150,
        maxWidth: query.print ? 200 : null,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 font-size-smaller'
            : 'ag-cell-blurrytext ws-normal-lh24'
          : query.print
          ? 'ws-normal-lh24 font-size-smaller'
          : 'ws-normal-lh24',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.investor}</strong>
          </div>
        ),
      },
      // {
      //   headerName: "",
      //   field: "type",
      //   minWidth: 90,
      //   // maxWidth: 100,
      //   cellRendererFramework: (params) => (
      //     <div>
      //       <strong>{params.data.type}</strong>
      //     </div>
      //   ),
      // },
      {
        headerName: '',
        field: 'period_of_report',
        minWidth: query.print ? 80 : 100,
        maxWidth: query.print ? 80 : 120,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-smaller'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 text-center font-size-smaller'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.period_of_report}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'shares_value',
        minWidth: query.print ? 80 : 150,
        maxWidth: query.print ? 80 : 250,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.shares_value}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'shares',
        minWidth: query.print ? 85 : 150,
        maxWidth: query.print ? 85 : 250,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.shares}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'shares_pcent',
        minWidth: 50,
        maxWidth: query.print ? 50 : 150,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.shares_pcent}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'change_in_holdings_shares',
        minWidth: 85,
        maxWidth: query.print ? 85 : 200,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.change_in_holdings_shares}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'change_in_holdings_pcent',
        minWidth: query.print ? 85 : 130,
        maxWidth: query.print ? 85 : 200,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.change_in_holdings_pcent}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'voting_sole',
        minWidth: query.print ? 85 : 150,
        maxWidth: query.print ? 85 : 250,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_sole}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'voting_shared',
        minWidth: query.print ? 85 : 150,
        maxWidth: query.print ? 85 : 250,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_shared}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'voting_none',
        minWidth: query.print ? 85 : 150,
        maxWidth: query.print ? 85 : 250,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_none}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'levelofactivism',
        minWidth: 115,
        maxWidth: query.print ? 115 : 150,
        cellClass: props.TrialStatus
          ? query.print
            ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-xx-small'
            : 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : query.print
          ? 'ws-normal-lh24 ps-1 pe-1 text-center font-size-xx-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.levelofactivism}</strong>
          </div>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    alignedGrids: [
      'investor',
      'type',
      'period_of_report',
      'shares_value',
      'shares',
      'shares_pcent',
      'change_in_holdings_shares',
      'change_in_holdings_pcent',
      'voting_sole',
      'voting_shared',
      'voting_none',
      'levelofactivism',
    ],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'investor',
          pinned: 'left',
        },
      ],
    },
    gridHeight: 58,
    headerHeight: 0,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowClass: 'bold-row',
    rowData: props.ownershipLongInvestor_Footer.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
  };

  React.useEffect(() => {
    if (!props.loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.loadingData]);

  return (
    <Page
      key={1}
      className={query.print ? 'cr-ownershipCompanyPDF pt-3' : bem.b('pt-3')}
    >
      <div>
        <div className='row'>
          <div className='col-md-3 col-12 pt-3 mb-2'>
            <DropdownList
              handleChange={async (e) => {
                if (!props.ownershipLongInvestor_statusTop5) {
                  setShowAllOrTop20(!showAllOrTop20);
                  await props.handleSetValueLatestOwnershipDate(e);
                  await props.getOwnershipLongInvestorDataReq({
                    pid: query.pid,
                    period_of_report: props.setValue_latestOwnershipDate.value,
                    change_comparison:
                      props.setValue_changeComparisionMonth.value,
                    filterRecords: showAllOrTop20,
                  });
                }
              }}
              isMulti={false}
              options={props.latestOwnershipDateList}
              Dvalue={props.setValue_latestOwnershipDate}
              disabled={props.loadingData ? true : props.TrialStatus}
            />
          </div>
          <div className='col-md-4 col-12 pt-3 mb-2'>
            <DropdownList
              handleChange={async (e) => {
                if (!props.ownershipLongInvestor_statusTop5) {
                  setShowAllOrTop20(!showAllOrTop20);
                  await props.handleSetValueChangeComparisionMonth(e);
                  await props.getOwnershipLongInvestorDataReq({
                    pid: query.pid,
                    period_of_report: props.setValue_latestOwnershipDate.value,
                    change_comparison:
                      props.setValue_changeComparisionMonth.value,
                    filterRecords: showAllOrTop20,
                  });
                }
              }}
              isMulti={false}
              options={props.changeComparisionMonthList}
              Dvalue={props.setValue_changeComparisionMonth}
              disabled={props.loadingData ? true : props.TrialStatus}
            />
          </div>
          <div className='col-md-1 col-12 pt-0 mb-0' />
          <div className='col-md-2 col-12 pt-3 mb-2'>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={async (e) => {
                e.preventDefault();
                setShowAllOrTop20(!showAllOrTop20);
                props.handleIsLoadingOwnership();
                const status = showAllOrTop20;
                await props.getOwnershipLongInvestorDataReq({
                  pid: query.pid,
                  period_of_report: props.setValue_latestOwnershipDate.value,
                  change_comparison:
                    props.setValue_changeComparisionMonth.value,
                  filterRecords: status,
                });
              }}
            >
              {!showAllOrTop20
                ? 'Show All Investor Data'
                : 'Show Top 20 Investors'}
            </button>
          </div>
          <div className='col-md-2 col-12 pt-3 mb-2'>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={(e) => {
                e.preventDefault();
                setShowFundOwnership(!showFundOwnership);
                props.handleIsLoadingOwnership();
                let objPath = {};
                if (!showFundOwnership) {
                  objPath = {
                    pathname: pathConst.OWNERSHIP_LONG_FUND,
                    search: props.location.search,
                    state: {},
                  };
                  history.replace(objPath);
                }
              }}
              //Disable if data not available
              disabled={props.LongFund && props.LongFund === 0}
            >
              Show Fund Ownership
            </button>
          </div>
        </div>
        {props.loadingData ? (
          <div className='vh-100'>
            <div className='h-50'>
              {props.procedureRunningEstimateTime !== undefined && (
                <ProgressBar
                  avgElapsedTime={props.procedureRunningEstimateTime}
                />
              )}
            </div>
          </div>
        ) : (
          <div className='row' id='loadItem'>
            <div className='col-md-12 col-sm-12 mb-2'>
              <div>
                <div>
                  {props.ownershipLongInvestor_Data.length > 0 ? (
                    <>
                      <Card
                        title={
                          !showAllOrTop20
                            ? props.ownershipLongInvestor_Heading.top_20_investor
                            : props.ownershipLongInvestor_Heading.all_investor
                        }
                      >
                        <p>Investor ownership in this table is sourced from 13F documents filed on the SEC</p>
                        <ErrorBoundary>
                          <Table
                            gridOptionsFooter={gridOptionsFooter}
                            pageTitle='Ownership Long Investor'
                            IsShowCard={false}
                            title={
                              !showAllOrTop20
                                ? props.ownershipLongInvestor_Heading.top_20_investor
                                : props.ownershipLongInvestor_Heading.all_investor
                            }
                            smalltitle=''
                            gridOptions={gridOptionsOwnershipLongData}
                          />
                        </ErrorBoundary>
                      </Card>
                    </>
                  ) : (
                    messageConst.NORECORDS
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

OwnershipLongInvestor.propTypes = {
  location: PropTypes.object.isRequired,
  latestOwnershipDateList: PropTypes.array.isRequired,
  setValue_latestOwnershipDate: PropTypes.object.isRequired,
  changeComparisionMonthList: PropTypes.array.isRequired,
  setValue_changeComparisionMonth: PropTypes.object.isRequired,
  handleSetValueLatestOwnershipDate: PropTypes.func.isRequired,
  handleSetValueChangeComparisionMonth: PropTypes.func.isRequired,
  getOwnershipLongInvestorDataReq: PropTypes.func.isRequired,
  ownershipLongInvestor_Data: PropTypes.array.isRequired,
  ownershipLongInvestor_Footer: PropTypes.array.isRequired,
  ownershipLongInvestor_Heading: PropTypes.object.isRequired,
  ownershipLongInvestor_statusTop5: PropTypes.bool.isRequired,
  loadingData: PropTypes.bool.isRequired,
  procedureRunningEstimateTime: PropTypes.any,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  handleIsLoadingOwnership: PropTypes.func.isRequired,
};
OwnershipLongInvestor.defaultProps = {
  procedureRunningEstimateTime: undefined,
};

export default withRouter(OwnershipLongInvestor);
