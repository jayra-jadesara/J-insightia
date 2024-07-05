import React, { useEffect, useState, useCallback, lazy } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import pathConst, {
  ACTIVIST_CAMPAIGNS,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { NORECORDS, DOWNLOADXLS } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import { filters } from '../../../utils/AgGridFunctions';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import {
  checkValuesToFixed,
  setCellStyleFinancial,
} from '../../../utils/table-tools-util';
import {
  getCampaignsExcelDownloadNumberToText,
  dateToNull,
  getCampaignsImageHandlerCellRendererFramework,
} from '../../../utils/general-util';
import { downloadExcelByJsonFn } from '../../../utils/exportExcel-util';
import DropdownList from '../../GeneralForm/DropdownList';
import Card from '../../GeneralForm/Card';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import bn from '../../../utils/bemnames';
import MultiNewsComponent from '../../News/Components/MultiNewsComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('newsNew');

const InvestorActivismCampaign = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { width } = useWindowDimensions();
  const breakpoint = 768;
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const [articleMode, setArticleMode] = useState(false);
  const [staticPathConsts] = useState(
    `${props.location.pathname}${props.location.search}`
  );
  const [isOpenedOn, setIsOpenedOn] = useState(true);
  const [newsDetailsArray, setNewsDetailsArray] = useState([]);
  const [loadedIds, setLoadedIds] = useState([]);
  const [articleID, setArticleID] = useState(0);
  const [newsDetailsLocation, setNewsDetailsLocation] = useState(null);
  const [openOnLoad, setOpenOnLoad] = useState(true);
  const [article404, setArticle404] = useState(true);
  const [isClickMostRead, setIsClickMostRead] = useState(false);
  const [isMostReadorNot, setIsMostReadorNot] = useState(false);
  const [isNewsComponent, setIsNewsComponent] = useState(null);

  function multiCompany(params) {
    let itemArr = [];
    itemArr = params.data.campaign_name.split('#|').filter((item) => item);
    return itemArr.map((item) => item.replace('#|', ','));
  }

  function getChildrenColumns() {
    let a = {};
    a = props.header_InvestorActivistCampaignSummary.map((head) => ({
      headerName: head.head,
      field: head.field,
      minWidth: query.print ? 50 : 120,
      maxWidth: query.print ? 50 : null,
      hide:
        props.table_InvestorActivistCampaignSummary.filter(
          (e) => e[head.field] && e[head.field] !== ''
        ).length === 0,
      cellClass: props.TrialStatus
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
        : 'ws-normal-lh24 ps-1 pe-1',
      cellRendererFramework: (params) =>
        getCampaignsImageHandlerCellRendererFramework(params.data[head.field]),
    }));
    return a;
  }

  const gridOptions_InvestorActivistCampaignSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: 'Company (Campaign Start Year)',
            field: 'campaign_name',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            minWidth: query.print ? 150 : 250,
            maxWidth: query.print ? 150 : null,
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              multiCompany(params).map(
                (d, i) =>
                  (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
                  href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
                  ${d}
                  ${
                    params.data.campaign_name.split(',').length === i + 1
                      ? ''
                      : ' ,'
                  }
                </a>`)
              );
              return eDiv;
            },
          },
        ],
      },
      {
        headerName: 'Campaign Details',
        headerTooltip: false,
        children: [
          {
            headerName: 'Campaign Start Date',
            field: 'Start_Date',
            minWidth: query.print ? 80 : 110,
            maxWidth: query.print ? 80 : 120,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
              : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
          },
          {
            headerName: 'Campaign End Date',
            field: 'End_Date',
            minWidth: query.print ? 80 : 110,
            maxWidth: query.print ? 80 : 120,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
              : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
          },
          {
            headerName: 'Campaign TFR',
            field: 'Campaign_TFR_per',
            minWidth: query.print ? 70 : 110,
            maxWidth: query.print ? 70 : 120,
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.Campaign_TFR !== '') {
                let colorTFR = '';
                if (params.data.Campaign_TFR < 0) {
                  colorTFR = 'text-danger';
                } else if (params.data.Campaign_TFR > 0) {
                  colorTFR = 'text-green';
                } else {
                  colorTFR = 'text-primary';
                }
                eDiv.innerHTML += `<div class="${colorTFR}">
                ${
                  params.data.Campaign_TFR_per !== ''
                    ? params.data.Campaign_TFR_per
                    : ''
                }
                </div>`;
                return eDiv;
              }
              eDiv.innerHTML +=
                '<span class="text-center text-primary">-</span>';
              return eDiv;
            },
            cellClassRules: {
              redFont: (params) => params.data.Campaign_TFR < 0,
              greenFont: (params) => params.data.Campaign_TFR > 0,
            },
          },
        ],
      },
      // new pub demands
      {
        headerName: 'Public Demand Highlights',
        headerTooltip: false,
        children: [...getChildrenColumns()],
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorActivistCampaignSummary.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Start_Date:
        x.Start_Date !== undefined ? dateToNull(x.Start_Date, 'dd-mmm-yy') : '',
      End_Date:
        x.End_Date !== undefined ? dateToNull(x.End_Date, 'dd-mmm-yy') : '',
      Campaign_TFR:
        x.Campaign_TFR !== '' &&
        x.Campaign_TFR !== null &&
        x.Campaign_TFR !== undefined
          ? Number(checkValuesToFixed(x.Campaign_TFR))
          : '',
      Campaign_TFR_per:
        x.Campaign_TFR !== '' ? `${checkValuesToFixed(x.Campaign_TFR)}%` : '-',
      appoint_personnel: getCampaignsExcelDownloadNumberToText(
        x.appoint_personnel
      ),
      remove_personnel: getCampaignsExcelDownloadNumberToText(
        x.remove_personnel
      ),
      push_for_ma: getCampaignsExcelDownloadNumberToText(x.push_for_ma),
      oppose_ma: getCampaignsExcelDownloadNumberToText(x.oppose_ma),
      divestiture: getCampaignsExcelDownloadNumberToText(x.divestiture),
      return_cash_to_shareholders: getCampaignsExcelDownloadNumberToText(
        x.return_cash_to_shareholders
      ),
      capital_structure: getCampaignsExcelDownloadNumberToText(
        x.capital_structure
      ),
      operational: getCampaignsExcelDownloadNumberToText(x.operational),
      remuneration: getCampaignsExcelDownloadNumberToText(x.remuneration),
      environmental: getCampaignsExcelDownloadNumberToText(x.environmental),
      social: getCampaignsExcelDownloadNumberToText(x.social),
      governance: getCampaignsExcelDownloadNumberToText(x.governance),
    })),
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isgroupChildHeaderVertical: true,
      isHeaderChildren: true,
      groupHeaderHeight: 40,
      oneFieldWithoutChild: true,
    },
    headerHeight: 60,
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_PublicDemandDetail = {
    masterDetail: !query.print,
    detailRowAutoHeight: !query.print,
    detailRowHeight: 125,
    detailCellRendererParams: {
      template(params) {
        return (
          '<div class="divChildBlock">' +
          '<table>' +
          `${
            params.data.subdemand_name !== ''
              ? `<tr><td>Sub Demand </td><td>:</td><td>${params.data.subdemand_name}</td></tr>`
              : ''
          }` +
          `${
            params.data.development_name !== ''
              ? `<tr><td>Development(s)</td><td>:</td><td>${params.data.development_name}</td></tr>`
              : ''
          }` +
          `${
            params.data.MechanismsName !== ''
              ? `<tr><td>Mechanism(s)</td><td>:</td><td>${params.data.MechanismsName}</td></tr>`
              : ''
          }` +
          '</table>'
        );
      },
    },
    isRowMaster(dataItem) {
      if (
        dataItem !== undefined &&
        (dataItem.subdemand_name !== '' ||
          dataItem.development_name !== '' ||
          dataItem.MechanismsName !== '')
      ) {
        return true;
      }
      return false;
    },
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).map(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
              href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
              ${d}
              ${
                params.data.campaign_name.split(',').length === i + 1
                  ? ''
                  : ' ,'
              }
            </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: 'Demand Date',
        field: 'Demand_date',
        minWidth: query.print ? 100 : 110,
        maxWidth: query.print ? 100 : 120,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat text-center ps-1 pe-1'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        cellRendererFramework: (params) =>
          dateToNull(params.data.Demand_date, 'dd-mmm-yy'),
      },
      {
        headerName: 'Demand Group',
        field: 'Demand_group',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 150 : 110,
        maxWidth: query.print ? 150 : 200,
      },
      {
        headerName: 'Demand',
        field: 'Demand',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 200 : 150,
        maxWidth: query.print ? 200 : 250,
      },
      {
        headerName: 'Outcome Date',
        field: 'Outcome_date',
        minWidth: query.print ? 100 : 110,
        maxWidth: query.print ? 100 : 120,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat text-center ps-1 pe-1'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        cellRendererFramework: (params) =>
          dateToNull(params.data.Outcome_date, 'dd-mmm-yy', true),
      },
      {
        headerName: 'Outcome',
        field: 'Outcome',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 200 : 110,
        maxWidth: query.print ? 200 : null,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_PublicDemandDetail.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_ActivistCampaignCharacteristics = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 370 : 300,
        maxWidth: query.print ? 370 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).forEach(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
            href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
            ${d}
            ${params.data.campaign_name.split(',').length === i + 1 ? '' : ' ,'}
          </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: '13D Filed',
        field: '13d_filed',
        minWidth: 70,
        maxWidth: query.print ? 70 : 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data['13d_filed']
          ),
      },
      {
        headerName: 'Exempt Solicitation',
        field: 'Exempt_Solicitation',
        minWidth: query.print ? 70 : 80,
        maxWidth: query.print ? 70 : 150,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Exempt_Solicitation
          ),
      },
      {
        headerName: 'Consent Solicitation',
        field: 'Consent_Solicitation',
        minWidth: query.print ? 70 : 90,
        maxWidth: query.print ? 70 : 150,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Consent_Solicitation
          ),
      },
      {
        headerName: 'Activist Letter',
        field: 'Public_Letter',
        minWidth: query.print ? 70 : 100,
        maxWidth: query.print ? 70 : 150,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Public_Letter
          ),
      },
      {
        headerName: 'Requisitioned Meeting',
        field: 'Requistion_Meeting',
        minWidth: query.print ? 70 : 100,
        maxWidth: query.print ? 70 : 150,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Requistion_Meeting
          ),
      },
      {
        headerName: 'Non-Director S. Proposal',
        field: 'Non_director_SH_Proposal',
        minWidth: query.print ? 70 : 100,
        maxWidth: query.print ? 70 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Non_director_SH_Proposal
          ),
      },
      {
        headerName: 'Proxy Contest',
        field: 'Proxy_Contest',
        minWidth: query.print ? 70 : 70,
        maxWidth: query.print ? 70 : 150,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Proxy_Contest
          ),
      },
      {
        headerName: 'Settlement',
        field: 'Settlement',
        minWidth: query.print ? 70 : 80,
        maxWidth: query.print ? 70 : 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(params.data.Settlement),
      },
      {
        headerName: 'Went to vote',
        field: 'Went_to_vote',
        minWidth: query.print ? 105 : 60,
        maxWidth: query.print ? 105 : 150,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Went_to_vote
          ),
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorActivistCampaignCharacteristics.map((x) => ({
      ...x,
      '13d_filed': getCampaignsExcelDownloadNumberToText(x['13d_filed']),
      Exempt_Solicitation: getCampaignsExcelDownloadNumberToText(
        x.Exempt_Solicitation
      ),
      Consent_Solicitation: getCampaignsExcelDownloadNumberToText(
        x.Consent_Solicitation
      ),
      Public_Letter: getCampaignsExcelDownloadNumberToText(x.Public_Letter),
      Requistion_Meeting: getCampaignsExcelDownloadNumberToText(
        x.Requistion_Meeting
      ),
      Non_director_SH_Proposal: getCampaignsExcelDownloadNumberToText(
        x.Non_director_SH_Proposal
      ),
      Proxy_Contest: getCampaignsExcelDownloadNumberToText(x.Proxy_Contest),
      Settlement: getCampaignsExcelDownloadNumberToText(x.Settlement),
      Standstill_Agreement: getCampaignsExcelDownloadNumberToText(
        x.Standstill_Agreement
      ),
      Went_to_vote: getCampaignsExcelDownloadNumberToText(x.Went_to_vote),

      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    headerHeight: 80,
    headerRowHeight: 100,
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_Filings = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 270 : 150,
        maxWidth: query.print ? 270 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
            href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
            ${params.data.campaign_name}
          </a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Date',
        field: 'date',
        minWidth: query.print ? 80 : 110,
        maxWidth: query.print ? 80 : 120,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh30 ag-cell-blurrytext dateFormat text-center ps-1 pe-1'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        cellRendererFramework: (params) =>
          dateToNull(params.data.date, 'dd-mmm-yy'),
      },
      {
        headerName: 'Filing Type',
        field: 'filing_type',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 80 : 50,
        maxWidth: query.print ? 80 : 120,
      },
      {
        headerName: 'Filer',
        field: 'filer',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 150 : 100,
        maxWidth: query.print ? 150 : 200,
      },
      {
        headerName: 'Filing Characteristics',
        field: 'filing_characteristics',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 100 : 120,
        maxWidth: query.print ? 100 : 200,
      },
      {
        headerName: 'Filing Description',
        field: 'document_description',
        minWidth: query.print ? 250 : 200,
        maxWidth: query.print ? 250 : 500,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Link',
        field: 'file_link',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: query.print ? 105 : 80,
        maxWidth: query.print ? 105 : 100,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
            href="${params.data.file_link}" target="_blank">
            ${'View'} </a>`;
          return eDiv;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_Filings.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_ActivistCampaignTimeline = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 200 : 250,
        maxWidth: query.print ? 200 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).forEach(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
            href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
            ${d}
            ${params.data.campaign_name.split(',').length === i + 1 ? '' : ' ,'}
          </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: 'Date',
        field: 'summary_date',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Timeline',
        field: 'summary_text',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 735 : 800,
        maxWidth: query.print ? 735 : null,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorActivistCampaignTimeline.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      summary_date:
        x.summary_date !== undefined
          ? dateToNull(x.summary_date, 'dd-mmm-yy')
          : '',
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_Theses = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: query.print ? 200 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).forEach(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
          href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
          ${d}
          ${params.data.campaign_name.split(',').length === i + 1 ? '' : ' ,'}
        </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: 'Date',
        field: 'Date',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Description',
        field: 'document_description',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 633,
        maxWidth: query.print ? 633 : 1000,
      },
      {
        headerName: 'Link',
        field: 'document_link',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 hyperlinksExcelExport ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 hyperlinksExcelExport ps-1 pe-1 text-center',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a class="link-primary text-secondary" target="_blank" rel="noopener noreferrer" 
          href="${params.data.document_link}">View</a>`;
          return eDiv;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorTheses.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Date: x.Date !== undefined ? dateToNull(x.Date, 'dd-mmm-yy') : '',
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_ShareholderProposals = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proponent (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: query.print ? 200 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).forEach(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
          href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${params.data.pid}">
          ${d}
          ${params.data.campaign_name.split(',').length === i + 1 ? '' : ' ,'}
        </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: 'Proposal',
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 433,
        maxWidth: query.print ? 433 : 800,
      },
      {
        headerName: 'Date of Meeting',
        field: 'meeting_date',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat text-center ps-1 pe-1'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'ISS Rec',
        field: 'ISS_Recomm',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'GL Rec',
        field: 'Glass_Lewis',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Votes For (%)',
        field: 'for_pcent',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'proponent_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorShareholderProposals.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      meeting_date:
        x.meeting_date !== undefined
          ? dateToNull(x.meeting_date, 'dd-mmm-yy')
          : '',
      for_pcent: x.for_pcent !== '' ? checkValuesToFixed(x.for_pcent) : '',
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_Advisers = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 435,
        maxWidth: query.print ? 435 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).forEach(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
                                  href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${
                params.data.pid
              }">
              ${d}
              ${
                params.data.campaign_name.split(',').length === i + 1
                  ? ''
                  : ' ,'
              }
            </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: 'Adviser',
        field: 'CompanyName',
        type: ['autoHeightTrue'],
        minWidth: 200,
        maxWidth: query.print ? 200 : 800,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Adviser Type',
        field: 'IntermediaryType',
        type: ['autoHeightTrue'],
        minWidth: 200,
        maxWidth: query.print ? 200 : 800,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Acting For',
        field: 'acting_for',
        type: ['autoHeightTrue'],
        minWidth: 200,
        maxWidth: query.print ? 200 : 800,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.acting_for === 'Issuer') {
            eDiv.innerHTML = '<span>Company</span>';
          } else {
            eDiv.innerHTML = `<span>${params.data.acting_for}</span>`;
          }
          return eDiv;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'proponent_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorAdvisors.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_StockPerformance = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 140,
        maxWidth: query.print ? 140 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          multiCompany(params).forEach(
            (d, i) =>
              (eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
                                href="${ACTIVIST_CAMPAIGNS}${QUERY_PID}${
                params.data.pid
              }">
            ${d}
            ${params.data.campaign_name.split(',').length === i + 1 ? '' : ' ,'}
          </a>`)
          );
          return eDiv;
        },
      },
      {
        headerName: 'Price T0',
        field: 'Price_T0',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML =
            params.data.Price_T0 !== ''
              ? checkValuesToFixed(params.data.Price_T0)
              : '';
          return eDiv;
        },
      },
      {
        headerName: 'Price T1',
        field: 'Price_T1',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML =
            params.data.Price_T1 !== ''
              ? checkValuesToFixed(params.data.Price_T1)
              : '';
          return eDiv;
        },
      },
      {
        headerName: 'Price Change',
        field: 'Price_Change',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        // cellRenderer: (params) => {
        //   const eDiv = document.createElement("div");
        //   eDiv.innerHTML = params.data.Price_Change !== "" ? `${checkValuesToFixed(params.data.Price_Change)}%` : "";
        //   return eDiv;
        // },
      },
      {
        headerName: 'Total Dividends',
        field: 'Total_dividends',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
      },
      {
        headerName: 'Dividend Yield',
        field: 'Dividends_Yield',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
      },
      {
        headerName: 'Spin-off Proceeds',
        field: 'spinoff_amount',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML =
            params.data.spinoff_amount !== ''
              ? checkValuesToFixed(params.data.spinoff_amount)
              : '';
          return eDiv;
        },
      },
      {
        headerName: 'Spin-off Yield',
        field: 'spinoff_yield',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
      },
      {
        headerName: 'TFR',
        field: 'TotalFollowerReturn',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        // cellRenderer: (params) => {
        //   const eDiv = document.createElement("div");
        //   eDiv.innerHTML =
        //     params.data.TotalFollowerReturn !== "" ? `${checkValuesToFixed(params.data.TotalFollowerReturn)}%` : "";
        //   return eDiv;
        // },
      },
      {
        headerName: 'Index TFR',
        field: 'Index_TR',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        // cellRenderer: (params) => {
        //   const eDiv = document.createElement("div");
        //   eDiv.innerHTML = params.data.Index_TR !== "" ? `${checkValuesToFixed(params.data.Index_TR)}%` : "";
        //   return eDiv;
        // },
      },
      {
        headerName: '+/-',
        field: 'TFR_Varience',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 65,
        maxWidth: query.print ? 65 : 100,
        cellRendererFramework: (params) =>
          params.data.TFR_Varience !== '' ? `${params.data.TFR_Varience}` : '',
        cellClassRules: {
          redFont: (params) => params.data.TFR_Varience.slice(0, -1) < 0,
          greenFont: (params) => params.data.TFR_Varience.slice(0, -1) > 0,
        },
        cellStyle: (params) =>
          params.data.TFR_Varience !== '' &&
          setCellStyleFinancial(params.data.TFR_Varience.slice(0, -1)),
      },
      {
        headerName: 'TFR An',
        field: 'TFRAnnualized',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 100,
        // cellRenderer: (params) => {
        //   const eDiv = document.createElement("div");
        //   eDiv.innerHTML = params.data.TFRAnnualized !== "" ? `${checkValuesToFixed(params.data.TFRAnnualized)}%` : "";
        //   return eDiv;
        // },
      },
      {
        headerName: 'Index TR An',
        field: 'Index_TR_An',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 100,
        // cellRenderer: (params) => {
        //   const eDiv = document.createElement("div");
        //   eDiv.innerHTML = params.data.Index_TR_An !== "" ? `${checkValuesToFixed(params.data.Index_TR_An)}%` : "";
        //   return eDiv;
        // },
      },
      {
        headerName: '+/-',
        field: 'Annualised_Variance',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 105 : 70,
        maxWidth: query.print ? 105 : 100,
        cellRendererFramework: (params) =>
          params.data.Annualised_Variance !== ''
            ? `${params.data.Annualised_Variance}`
            : '',
        cellClassRules: {
          redFont: (params) => params.data.Annualised_Variance.slice(0, -1) < 0,
          greenFont: (params) =>
            params.data.Annualised_Variance.slice(0, -1) > 0,
        },
        cellStyle: (params) =>
          params.data.Annualised_Variance !== '' &&
          setCellStyleFinancial(params.data.Annualised_Variance.slice(0, -1)),
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'proponent_name',
          pinned: 'left',
        },
      ],
    },
    headerHeight: 50,
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_InvestorStockPerformance.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Price_Change:
        x.Price_Change !== '' ? `${checkValuesToFixed(x.Price_Change)}%` : '',
      Total_dividends:
        x.Total_dividends !== ''
          ? `${checkValuesToFixed(x.Total_dividends)}%`
          : '',
      Dividends_Yield:
        x.Dividends_Yield !== ''
          ? `${checkValuesToFixed(x.Dividends_Yield)}%`
          : '',
      spinoff_yield:
        x.spinoff_yield !== '' ? `${checkValuesToFixed(x.spinoff_yield)}%` : '',
      TotalFollowerReturn:
        x.TotalFollowerReturn !== ''
          ? `${checkValuesToFixed(x.TotalFollowerReturn)}%`
          : '',
      TFRAnnualized:
        x.TFRAnnualized !== '' ? `${checkValuesToFixed(x.TFRAnnualized)}%` : '',
      Index_TR_An:
        x.Index_TR_An !== '' ? `${checkValuesToFixed(x.Index_TR_An)}%` : '',
      Index_TR: x.Index_TR !== '' ? `${checkValuesToFixed(x.Index_TR)}%` : '',
      TFR_Varience:
        x.TFR_Varience !== '' ? `${checkValuesToFixed(x.TFR_Varience)}%` : '',
      Annualised_Variance:
        x.Annualised_Variance !== ''
          ? `${checkValuesToFixed(x.Annualised_Variance)}%`
          : '',
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (props.table_InvestorNews.length > 0) {
      setIsNewsComponent(getNewsComponent());
    } else {
      setIsNewsComponent(null);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [props.table_InvestorNews]);

  function getNewsComponent() {
    return (
      <div className='row pdfpagebreak'>
        <div className='col-md-12 col-12 m-0 mt-2 pb-3'>
          <Card title='News' addedClass={bem.b('')}>
            <button
              className='btn excelAdjust ag-excel float-end cursor-pointer'
              type='button'
              onClick={() =>
                downloadExcelByJsonFn(
                  props.table_InvestorNews,
                  'Investor Activism campaigns News',
                  {
                    Companies: 'Companies',
                    newsDate: 'Date',
                    headLine: 'Headline',
                    article: 'Article',
                  }
                )
              }
            >
              {DOWNLOADXLS}
            </button>
            <div className='col-md-12 col-12 m-0 mt-2 divScrollActivismCampaign'>
              <MultiNewsComponent
                isInvestorCampaignNews // news article shown by true
                newsIds={props.table_NewsId}
                hash={
                  query.print
                    ? props.table_InvestorNews.slice(0, 20)
                    : props.table_InvestorNews
                }
                newsDetailsArray={
                  query.print
                    ? props.table_InvestorNews.slice(0, 20)
                    : props.table_InvestorNews
                }
                isOpenedOn={isOpenedOn}
                setIsOpenedOn={setIsOpenedOn}
                setNewsDetailsArray={setNewsDetailsArray}
                loadedIds={loadedIds}
                setLoadedIds={setLoadedIds}
                topIndex={0}
                staticPathConst={staticPathConsts}
                articleID={articleID}
                setArticleID={setArticleID}
                newsDetailsLocation={newsDetailsLocation}
                setNewsDetailsLocation={setNewsDetailsLocation}
                articleMode={articleMode}
                setArticleMode={setArticleMode}
                openOnLoad={openOnLoad}
                setOpenOnLoad={setOpenOnLoad}
                article404={article404}
                setArticle404={setArticle404}
                location={props.location}
                history={history}
                newsid={query.newsID}
                selectedSidebarNews={null}
                handleSelectSidebarNews={() => {}}
                isClickMostRead={isClickMostRead}
                setIsClickMostRead={setIsClickMostRead}
                isMostReadorNot={isMostReadorNot}
                setIsMostReadorNot={setIsMostReadorNot}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }
  function getInvestorData() {
    return (
      <>
        <div className='row pt-2'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.header_InvestorActivistCampaignSummary.length > 0 &&
            props.table_InvestorActivistCampaignSummary.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Activist Campaign Summary'>
                <Table
                  IsShowCard
                  pageTitle='Activist Campaign Summary'
                  title='Activist Campaign Summary'
                  smalltitle=''
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  gridOptions={gridOptions_InvestorActivistCampaignSummary}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Activist Campaign Summary'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-3'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_PublicDemandDetail.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Public Demand Detail'>
                <Table
                  IsShowCard
                  pageTitle='Public Demand Detail'
                  title='Public Demand Detail'
                  smalltitle=''
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  gridOptions={gridOptions_PublicDemandDetail}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Public Demand Detail'> {NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-3'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_InvestorActivistCampaignCharacteristics.length > 0 ? (
              <ErrorBoundary
                hasCard
                cardtitle='Company Campaign Characteristics'
              >
                <Table
                  IsShowCard
                  pageTitle='Activist Campaign Characteristics'
                  title='Company Campaign Characteristics'
                  smalltitle=''
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  gridOptions={gridOptions_ActivistCampaignCharacteristics}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Activist Campaign Characteristics'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-2'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_Filings.length > 0 ? (
              query.print ? (
                <ErrorBoundary hasCard cardtitle='Filings'>
                  <Table
                    IsShowCard
                    pageTitle='Filings'
                    title='Filings'
                    smalltitle=''
                    gridOptions={gridOptions_Filings}
                  />
                </ErrorBoundary>
              ) : (
                <CollapseComponent isOpen={false} Heading='Filings'>
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      pageTitle='Filings'
                      title='Filings'
                      smalltitle=''
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                      gridOptions={gridOptions_Filings}
                    />
                  </ErrorBoundary>
                </CollapseComponent>
              )
            ) : (
              <Card title='Filings'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        {/* News Section */}
        {isNewsComponent}

        <div className='row pt-2'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_InvestorActivistCampaignTimeline.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Company Campaign Timeline'>
                <Table
                  IsShowCard
                  pageTitle='Company Campaign Timeline'
                  title='Company Campaign Timeline'
                  smalltitle=''
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  gridOptions={gridOptions_ActivistCampaignTimeline}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Company Campaign Timeline'> {NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-3'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_InvestorTheses.length > 0 ? (
              query.print ? (
                <Table
                  IsShowCard
                  pageTitle='Theses'
                  title='Theses'
                  smalltitle=''
                  gridOptions={gridOptions_Theses}
                />
              ) : (
                <CollapseComponent isOpen={false} Heading='Theses'>
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      pageTitle='Theses'
                      title='Theses'
                      smalltitle=''
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                      gridOptions={gridOptions_Theses}
                    />
                  </ErrorBoundary>
                </CollapseComponent>
              )
            ) : (
              <Card title='Theses'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-3'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_InvestorShareholderProposals.length > 0 ? (
              query.print ? (
                <Table
                  IsShowCard
                  pageTitle='Shareholder Proposals'
                  title='Shareholder Proposals'
                  smalltitle=''
                  gridOptions={gridOptions_ShareholderProposals}
                />
              ) : (
                <CollapseComponent
                  isOpen={false}
                  Heading='Shareholder Proposals'
                >
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      pageTitle='Shareholder Proposals'
                      title='Shareholder Proposals'
                      smalltitle=''
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                      gridOptions={gridOptions_ShareholderProposals}
                    />
                  </ErrorBoundary>
                </CollapseComponent>
              )
            ) : (
              <Card title='Shareholder Proposals'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-3'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_InvestorAdvisors.length > 0 ? (
              query.print ? (
                <Table
                  IsShowCard
                  pageTitle='Advisers'
                  title='Advisers'
                  smalltitle=''
                  gridOptions={gridOptions_Advisers}
                />
              ) : (
                <CollapseComponent isOpen={false} Heading='Advisers'>
                  <ErrorBoundary>
                    <Table
                      IsShowCard={false}
                      pageTitle='Advisers'
                      title='Advisers'
                      smalltitle=''
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                      gridOptions={gridOptions_Advisers}
                    />
                  </ErrorBoundary>
                </CollapseComponent>
              )
            ) : (
              <Card title='Advisers'>{NORECORDS}</Card>
            )}
          </div>
        </div>

        <div className='row pt-2'>
          <div className='col-md-12 col-12 pt-2 m-0'>
            {props.table_InvestorStockPerformance.length > 0 ? (
              query.print ? (
                <Card title='Stock Performance'>
                  <div className='ps-2'>
                    <p className='m-0'>
                      Prices are adjusted for stock splits where necessary.
                    </p>
                    <p className='m-0'>
                      T0 represents the date the period commenced.
                    </p>
                    <p className='m-0'>
                      T1 represents the earlier of the investors exit or the
                      date of the most recent close.
                    </p>
                  </div>
                  <Table
                    IsShowCard={false}
                    pageTitle='Stock Performance'
                    title='Stock Performance'
                    smalltitle=''
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    gridOptions={gridOptions_StockPerformance}
                  />
                </Card>
              ) : (
                <CollapseComponent isOpen={false} Heading='Stock Performance'>
                  <>
                    <div className='ps-2'>
                      <p className='m-0'>
                        Prices are adjusted for stock splits where necessary.
                      </p>
                      <p className='m-0'>
                        T0 represents the date the period commenced.
                      </p>
                      <p className='m-0'>
                        T1 represents the earlier of the investors exit or the
                        date of the most recent close.
                      </p>
                    </div>
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        pageTitle='Stock Performance'
                        title='Stock Performance'
                        smalltitle=''
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        gridOptions={gridOptions_StockPerformance}
                      />
                    </ErrorBoundary>
                  </>
                </CollapseComponent>
              )
            ) : (
              <Card title='Stock Performance'>{NORECORDS}</Card>
            )}
          </div>
        </div>
      </>
    );
  }

  React.useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoading]);

  return (
    <Page
      key={1}
      className={
        query.print
          ? 'cr-InvestorActivismCampaignPDF pt-3'
          : 'cr-InvestorActivismCampaign pt-3'
      }
    >
      <div className='row pt-2'>
        <div className='col-12'>
          {/* filter Section */}
          {props.DDLCampaign.length > 0 && (
            <div className='row mt-2'>
              <span className='col-12 col-md-1 col-form-label text-primary font-weight-bold pt-0 pb-0 mb-1'>
                Campaign:
              </span>
              <div className='col-12 col-md-4 mb-1'>
                <DropdownList
                  handleChange={async (e) => {
                    await props.handleSetCampaignDDL(e);
                  }}
                  isMulti
                  options={props.DDLCampaign}
                  Dvalue={props.SetDDLCampaign}
                  placeholder='Choose one or more campaign...'
                  disabled={props.isLoading ? true : props.TrialStatus}
                />
              </div>
              <div className='col-12 col-md-2 mb-1'>
                <button
                  id='btnUpdateData'
                  type='button'
                  disabled={props.isLoading ? true : props.TrialStatus}
                  className='btn btn-sm btn-primary'
                  onClick={async (e) => {
                    e.preventDefault();
                    await props.handleResetLoader();
                    await props.handleIsLoading(true);
                  }}
                >
                  Update Data
                </button>
              </div>
            </div>
          )}

          {props.isLoading ? (
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
            <div id='loadItem'>{getInvestorData()}</div>
          )}
        </div>
      </div>
    </Page>
  );
};

InvestorActivismCampaign.propTypes = {
  location: PropTypes.object,
};

InvestorActivismCampaign.defaultProps = {
  location: {},
};

export default withRouter(React.memo(InvestorActivismCampaign));
