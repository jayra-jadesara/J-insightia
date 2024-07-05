import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import bn from '../../../utils/bemnames';
import {
  checkValuesToFixed,
  gridWidthValues,
  gridWidthValuesLrg,
} from '../../../utils/table-tools-util';
import { filters } from '../../../utils/AgGridFunctions';
import {
  getCampaignsImageHandlerCellRendererFramework,
  getCampaignsExcelDownloadNumberToText,
  dateToNull,
} from '../../../utils/general-util';
import { downloadExcelByJsonFn } from '../../../utils/exportExcel-util';
import pathConst from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';
import DropdownList from '../../GeneralForm/DropdownList';
import Card from '../../GeneralForm/Card';
import Checkbox from '../../GeneralForm/CheckboxComponent';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ProgressBar from '../../GeneralForm/ProgressBar';
import Table from '../../GeneralForm/Table';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import MultiNewsComponent from '../../News/Components/MultiNewsComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const ActivistCampaigns = (props) => {
  Object.preventExtensions(props);
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  // #region NEWS
  const bem = bn.create('newsNew');

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
  // #endregion

  function getChildrenColumns() {
    let a = {};
    a = props.header_ActivistCampaignSummary.map((head) => ({
      headerName: head.head,
      field: head.field,
      minWidth: query.print ? 45 : 50,
      maxWidth: query.print ? 65 : null,
      hide:
        props.table_ActivistCampaignSummary.filter(
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

  function getCampaignName(params) {
    const eDiv = document.createElement('div');
    const arrayIds = params.data.campaign_name
      .split('#| ')
      .filter((item) => item);
    const val = 1;

    arrayIds.forEach((d, i) => {
      const invArrVal = params.data.investor_id.split(',');
      if (invArrVal[i] === undefined) {
        eDiv.innerHTML = '';
      } else {
        const hrefVal = `${pathConst.INVESTOR_ACTIVISM_CAMPAIGNS}${
          pathConst.QUERY_INVESTOR
        }${invArrVal[i].trim()}`;

        eDiv.innerHTML += `<a rel="noopener noreferrer" class="text-secondary" href="${hrefVal}">
              ${d}${invArrVal.length === i + val ? '' : ' ,'}
        </a>
        ${invArrVal.length === i + val ? '' : '<br/>'}`;
      }
    });
    return eDiv;
  }

  function getCampaignNamePublicDemand(params) {
    const eDiv = document.createElement('div');
    const arrayIds = params.data.campaign_name
      .split('#| ')
      .filter((item) => item);
    const val = 1;
    let ind = 0;
    arrayIds.forEach((d, i) => {
      let campName = d;
      ind += d.length;
      const invArrVal = params.data.investor_id.split(',');
      if (invArrVal[i] === undefined) {
        eDiv.innerHTML = '';
      } else {
        if (ind > 180) {
          campName = campName.substring(0, campName.length - 30);
        }
        const hrefVal = `${pathConst.INVESTOR_ACTIVISM_CAMPAIGNS}${
          pathConst.QUERY_INVESTOR
        }${invArrVal[i].trim()}`;

        eDiv.innerHTML += `<a rel="noopener noreferrer" class="text-secondary" href="${hrefVal}">
              ${campName}${invArrVal.length === i + val ? '' : ' ,'}
        </a>`;
        if (ind > 180) {
          eDiv.innerHTML += '<span class="text-secondary">...</spam>';
        }
      }
    });
    return eDiv;
  }

  const gridOptions_ActivistCampaignSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: 'Investor(s) (Campaign Start Year)',
            field: 'campaign_name',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            minWidth: query.print ? 470 : 250, // query.print ? 160 : 250,
            maxWidth: query.print ? 570 : null, // query.print ? 160 : null,
            cellRenderer: (params) => getCampaignName(params),
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
            minWidth: query.print ? 75 : 110,
            maxWidth: query.print ? 75 : 110,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-0 pe-0 text-center'
              : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
          },
          {
            headerName: 'Campaign End Date',
            field: 'End_Date',
            minWidth: query.print ? 75 : 110,
            maxWidth: query.print ? 75 : 110,
            type: ['dateColumn'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-0 pe-0 text-center'
              : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
            cellRendererFramework: (params) => {
              if (
                params.data.appoint_personnel !== 1 &&
                params.data.remove_personnel !== 1 &&
                params.data.divestiture !== 1 &&
                params.data.return_cash_to_shareholders !== 1 &&
                params.data.governance !== 1
              ) {
                return <div> {params.data.End_Date} </div>;
              }
              return '';
            },
          },
          // temporarily removed for now - will re-insert later
          // {
          //  headerName: 'Campaign Status',
          //  field: 'campaign_status',
          //  minWidth: 100,
          //  cellClass: props.TrialStatus ? 'ag-cell-blurrytext text-center' : 'text-center',
          // },
          // {
          //  headerName: 'Campaign Start Source',
          //  field: 'Source',
          //  minWidth: 100,
          //  cellClass: props.TrialStatus ? 'ag-cell-blurrytext text-center' : 'text-center',
          // },
          // {
          //  headerName: 'Stack Start of Campaign (%)',
          //  field: 'Stake_pcent_start_campaign',
          //  minWidth: 100,
          //  cellRendererFramework: (params) => (
          //    <div className="text-center">
          //      {params.data.Stake_pcent_start_campaign !== '' ? NumberFormatFn(checkValuesToFixed(params.data.Stake_pcent_start_campaign, 0)) : ''}
          //    </div>
          //  ),
          // },
          // {
          //  headerName: 'Stack Value at Start of Campaign (Mn)',
          //  field: 'Stake_value_start_campaign',
          //  minWidth: 100,
          //  cellRendererFramework: (params) => (
          //    <div className="text-center">
          //      {params.data.Stake_value_start_campaign !== '' ? checkValuesToFixed(params.data.Stake_value_start_campaign) : ''}
          //    </div>
          //  ),
          // },
          // {
          //  headerName: 'Max Campaign Stack Date',
          //  field: 'Max_Campaign_Start_Date',
          //  minWidth: 110,
          //  cellClass: props.TrialStatus ? 'ws-normal-lh30 ag-cell-blurrytext dateFormat' : 'ws-normal-lh30 dateFormat',
          //  cellRendererFramework: (params) => <div className="text-center">{dateFormat(params.data.Max_Campaign_Start_Date, 'dd-mmm-yy', true)}</div>,
          // },
          // {
          //  headerName: 'Max Campaign Stack (%)',
          //  field: 'Max_Stake_pcent',
          //  minWidth: 100,
          //  cellRendererFramework: (params) => (
          //    <div className="text-center">{params.data.Max_Stake_pcent !== '' ? checkValuesToFixed(params.data.Max_Stake_pcent) : ''}</div>
          //  ),
          // },
          // {
          //  headerName: 'Max Campaign Stack Value (%)',s
          //  field: 'Max_Stake_Value',
          //  minWidth: 100,
          //  cellRendererFramework: (params) => (
          //    <div className="text-center">{params.data.Max_Stake_Value !== '' ? NumberFormatFn(checkValuesToFixed(params.data.Max_Stake_Value, 0)) : ''}</div>
          //  ),
          // },
          {
            headerName: 'Campaign TFR',
            field: 'Campaign_TFR_per',
            minWidth: query.print ? 60 : 110,
            maxWidth: query.print ? 60 : 110,
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            cellClassRules: {
              redFont: (params) => params.data.Campaign_TFR < 0,
              greenFont: (params) => params.data.Campaign_TFR > 0,
            },
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
          },
        ],
      },
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
    headerHeight: 80,
    headerRowHeight: 100,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_ActivistCampaignSummary.map((x) => ({
      ...x,
      Start_Date:
        x.Start_Date !== '' &&
        x.Start_Date !== null &&
        x.Start_Date !== undefined
          ? dateToNull(x.Start_Date, 'dd-mmm-yy')
          : '',
      End_Date:
        x.End_Date !== '' && x.End_Date !== null && x.End_Date !== undefined
          ? dateToNull(x.End_Date, 'dd-mmm-yy')
          : '',
      Campaign_TFR:
        x.Campaign_TFR !== null && x.Campaign_TFR !== ''
          ? Number(checkValuesToFixed(x.Campaign_TFR))
          : '',
      Campaign_TFR_per:
        x.Campaign_TFR !== null && x.Campaign_TFR !== ''
          ? `${checkValuesToFixed(x.Campaign_TFR)}%`
          : '-',
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
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isgroupChildHeaderVertical: true,
      isHeaderChildren: true,
      groupHeaderHeight: 40,
      oneFieldWithoutChild: true,
    },
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
        headerName: 'Campaign: Investor(s) (Campaign Start date)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 160 : 250,
        maxWidth: query.print ? 160 : null,
        cellRenderer: (params) => getCampaignNamePublicDemand(params),
      },
      {
        headerName: 'Investor',
        field: 'investor_name',
        ...gridWidthValuesLrg.maxWidth,
        type: [''],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext'
          : 'ws-normal-lh24',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a rel="noopener noreferrer" class="text-secondary" target="_blank"
                  href="${pathConst.INVESTOR_ACTIVISM_CAMPAIGNS}${pathConst.QUERY_INVESTOR}${params.data.invid}">${params.data.investor_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Demand Date',
        field: 'Demand_date',
        ...gridWidthValues,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Demand Group',
        field: 'Demand_group',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext '
          : 'ws-normal-lh24 ',
        type: ['autoHeightTrue'],
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Demand',
        field: 'Demand',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext '
          : 'ws-normal-lh24 ',
        minWidth: 100,
        maxWidth: 320,
      },
      {
        headerName: 'Outcome Date',
        field: 'Outcome_date',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateformat text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        ...gridWidthValues,
        type: ['dateColumn'],
      },
      {
        headerName: 'Outcome',
        field: 'Outcome',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 100,
        maxWidth: null,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    getRowHeight(params) {
      if (params.data.campaign_name && params.data.campaign_name.length > 180) {
        return 64;
      }
      return 42;
    },
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_PublicDemandDetail.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Outcome_date:
        x.Outcome_date !== null
          ? dateToNull(x.Outcome_date, 'dd-mmm-yy', true)
          : '',
      Demand_date:
        x.Demand_date !== null
          ? dateToNull(x.Demand_date, 'dd-mmm-yy', true)
          : '',
    })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_ActivistCampaignCharacteristics = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 290 : 300,
        maxWidth: query.print ? 290 : null,
        cellRenderer: (params) => getCampaignName(params),
      },
      {
        headerName: '13D Filed',
        field: '13d_filed',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 80 : 100,
        maxWidth: query.print ? 80 : 100,
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data['13d_filed']
          ),
      },
      {
        headerName: 'Exempt Solicitation',
        field: 'Exempt_Solicitation',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 80 : 120,
        maxWidth: query.print ? 80 : 120,
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Exempt_Solicitation
          ),
      },
      {
        headerName: 'Consent Solicitation',
        field: 'Consent_Solicitation',
        minWidth: query.print ? 80 : 120,
        maxWidth: query.print ? 80 : 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Consent_Solicitation
          ),
      },
      {
        headerName: 'Activist Letter',
        field: 'Public_Letter',
        minWidth: query.print ? 80 : 120,
        maxWidth: query.print ? 80 : 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Public_Letter
          ),
      },
      {
        headerName: 'Requisitioned Meeting',
        field: 'Requistion_Meeting',
        minWidth: query.print ? 80 : 130,
        maxWidth: query.print ? 80 : 130,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Requistion_Meeting
          ),
      },
      {
        headerName: 'Non-Director S. Proposal',
        field: 'Non_director_SH_Proposal',
        minWidth: query.print ? 80 : 120,
        maxWidth: query.print ? 80 : 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Non_director_SH_Proposal
          ),
      },
      {
        headerName: 'Proxy Contest',
        field: 'Proxy_Contest',
        minWidth: query.print ? 80 : 100,
        maxWidth: query.print ? 80 : 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Proxy_Contest
          ),
      },
      {
        headerName: 'Settlement',
        field: 'Settlement',
        minWidth: query.print ? 80 : 120,
        maxWidth: query.print ? 80 : 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(params.data.Settlement),
      },
      {
        headerName: 'Went to vote',
        field: 'Went_to_vote',
        minWidth: 110,
        maxWidth: query.print ? 110 : 110,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) =>
          getCampaignsImageHandlerCellRendererFramework(
            params.data.Went_to_vote
          ),
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    headerHeight: 60,
    headerRowHeight: 90,
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_ActivistCampaignCharacteristics.map((x) => ({
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
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_Filings = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 220 : 250,
        maxWidth: query.print ? 220 : null,
      },
      {
        headerName: 'Date',
        field: 'date',
        minWidth: query.print ? 80 : 80,
        maxWidth: query.print ? 80 : 120,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext dateFormat text-center ps-1 pe-1'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Filing Type',
        field: 'filing_type',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 100 : 100,
        maxWidth: query.print ? 100 : 120,
      },
      {
        headerName: 'Filer',
        field: 'filer',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 100 : 100,
        maxWidth: query.print ? 100 : null,
      },
      {
        headerName: 'Filing Characteristics',
        field: 'filing_characteristics',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 200 : 200,
        maxWidth: query.print ? 200 : 250,
      },
      {
        headerName: 'Filing Description',
        field: 'document_description',
        minWidth: query.print ? 250 : 250,
        maxWidth: query.print ? 250 : null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Link',
        field: 'file_link',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 85 : 80,
        maxWidth: query.print ? 85 : 100,
        cellRendererFramework: (params) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='text-secondary'
            href={params.data.file_link}
          >
            View
          </a>
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
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_Filings
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: props.allowDownload,
        date:
          x.date !== null && x.date !== undefined
            ? dateToNull(x.date, 'dd-mmm-yy', true)
            : '',
      })),
    rowClassRules: {
      'bg-green-highlight': (params) => params.data.rowHighlight,
    },
  };

  const gridOptions_ActivistCampaignTimeline = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 210 : 250,
        maxWidth: query.print ? 210 : 500,
        cellRenderer: (params) => getCampaignName(params),
      },
      {
        headerName: 'Date',
        field: 'summary_date',
        minWidth: 110,
        maxWidth: 110,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh30 ag-cell-blurrytext dateFormat'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Summary',
        field: 'summary_text',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 720 : 850,
        maxWidth: query.print ? 720 : null,
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
    rowData: props.table_ActivistCampaignTimeline.map((x) => ({
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
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        cellRenderer: (params) => getCampaignName(params),
      },
      {
        headerName: 'Date',
        field: 'Date',
        minWidth: 110,
        maxWidth: 110,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        cellRendererFramework: (params) => (
          <div className='text-center'>
            {dateToNull(params.data.Date, 'dd-mmm-yy')}
          </div>
        ),
      },
      {
        headerName: 'Author',
        field: 'Author',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 220 : 100,
        maxWidth: query.print ? 220 : null,
      },
      {
        headerName: 'Description',
        field: 'document_description',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 300 : 500,
        maxWidth: query.print ? 300 : 1000,
      },
      {
        headerName: 'Link',
        field: 'document_link',
        minWidth: 105,
        maxWidth: 105,
        cellRendererFramework: (params) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='text-secondary'
            href={params.data.document_link}
          >
            View
          </a>
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
    rowData: props.table_Theses.map((x) => ({
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
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        cellRenderer: (params) => getCampaignName(params),
      },
      {
        headerName: 'Proposal',
        field: 'proposal_detail',
        minWidth: query.print ? 300 : 300,
        maxWidth: query.print ? 300 : 1000,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Date of Meeting',
        field: 'meeting_date',
        minWidth: 120,
        maxWidth: 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        cellRendererFramework: (params) => (
          <div className='text-center'>
            {dateToNull(params.data.meeting_date, 'dd-mmm-yy')}
          </div>
        ),
      },
      {
        headerName: 'ISS Rec',
        field: 'ISS_Recomm',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext text-center ps-1 pe-1'
          : 'ws-normal-lh24 text-center ps-1 pe-1',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'GL Rec',
        field: 'Glass_Lewis',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Votes For (%)',
        field: 'for_pcent',
        minWidth: 120,
        maxWidth: 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
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
    rowData: props.table_ShareholderProposals.map((x) => ({
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

  const gridOptions_Advisors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 630 : 200,
        maxWidth: query.print ? 630 : null,
        cellRenderer: (params) => getCampaignName(params),
      },
      {
        headerName: 'Adviser Name',
        field: 'CompanyName',
        minWidth: query.print ? 200 : 120,
        maxWidth: query.print ? 200 : 140,
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext' : '',
      },
      {
        headerName: 'Adviser Type',
        field: 'IntermediaryType',
        minWidth: query.print ? 200 : 120,
        maxWidth: query.print ? 200 : 140,
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext' : '',
      },
      {
        headerName: 'Acting For',
        field: 'acting_for',
        minWidth: query.print ? 200 : 120,
        maxWidth: query.print ? 200 : 140,
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext' : '',
        cellRendererFramework: (params) => {
          if (params.data.acting_for === 'Issuer') {
            return <div>Company</div>;
          }
          if (params.data.acting_for === 'Activist') {
            return <div>Investor</div>;
          }
          return params.data.acting_for;
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
    rowData: props.table_Advisors.map((x) => ({
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
        headerName: 'Investor(s) (Campaign Start Year)',
        field: 'campaign_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 150 : 200,
        maxWidth: query.print ? 150 : null,
        cellRenderer: (params) => getCampaignName(params),
      },
      {
        headerName: 'Price T0',
        field: 'Price_T0',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Price T1',
        field: 'Price_T1',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Price Change',
        field: 'Price_Change',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Total Dividends',
        field: 'Total_dividends',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Dividend Yield',
        field: 'Dividends_Yield',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Spin-off Proceeds',
        field: 'spinoff_amount',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Spin-off Yield',
        field: 'spinoff_yield',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'TFR',
        field: 'TotalFollowerReturn',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Index TFR',
        field: 'Index_TR',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: '+/-',
        field: 'TFR_Varience',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
        cellRendererFramework: (params) => {
          if (params.data.TFR_Varience !== '') {
            if (Number(params.data.TFR_Varience) < 0) {
              return (
                <div className='text-center text-danger'>
                  {params.data.TFR_Varience !== ''
                    ? `${checkValuesToFixed(params.data.TFR_Varience)}%`
                    : ''}
                </div>
              );
            }
            return (
              <div className='text-center text-green '>
                {params.data.TFR_Varience !== ''
                  ? `${checkValuesToFixed(params.data.TFR_Varience)}%`
                  : ''}
              </div>
            );
          }
          return <span className='text-center'>{null}</span>;
        },
      },
      {
        headerName: 'TFR An',
        field: 'TFRAnnualized',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: 'Index TR An',
        field: 'Index_TR_An',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 65 : 70,
        maxWidth: query.print ? 65 : null,
      },
      {
        headerName: '+/-',
        field: 'Annualised_Variance',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 110 : 70,
        maxWidth: query.print ? 110 : null,
        cellRendererFramework: (params) => {
          if (params.data.Annualised_Variance !== '') {
            if (Number(params.data.Annualised_Variance) < 0) {
              return (
                <div className='text-center text-danger'>
                  {params.data.Annualised_Variance !== ''
                    ? `${checkValuesToFixed(params.data.Annualised_Variance)}%`
                    : ''}
                </div>
              );
            }
            return (
              <div className='text-center text-green '>
                {params.data.Annualised_Variance !== ''
                  ? `${checkValuesToFixed(params.data.Annualised_Variance)}%`
                  : ''}
              </div>
            );
          }
          return <span className='text-center'>{null}</span>;
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
    headerHeight: 50,
    paggination: { isPagging: !query.print, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_StockPerformance.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Price_T0: x.Price_T0 !== '' ? checkValuesToFixed(x.Price_T0) : '',
      Price_T1: x.Price_T1 !== '' ? checkValuesToFixed(x.Price_T1) : '',
      Price_Change:
        x.Price_Change !== '' ? `${checkValuesToFixed(x.Price_Change)}%` : '',
      Total_dividends:
        x.Total_dividends !== '' ? checkValuesToFixed(x.Total_dividends) : '',
      Dividends_Yield:
        x.Dividends_Yield !== ''
          ? `${checkValuesToFixed(x.Dividends_Yield)}%`
          : '',
      spinoff_amount:
        x.spinoff_amount !== '' ? checkValuesToFixed(x.spinoff_amount) : '',
      spinoff_yield:
        x.spinoff_yield !== '' ? checkValuesToFixed(x.spinoff_yield) : '',
      TotalFollowerReturn:
        x.TotalFollowerReturn !== ''
          ? `${checkValuesToFixed(x.TotalFollowerReturn)}%`
          : '',
      Index_TR: x.Index_TR !== '' ? checkValuesToFixed(x.Index_TR) : '',
      TFR_Varience:
        x.TFR_Varience !== '' ? checkValuesToFixed(x.TFR_Varience) : '',
      TFRAnnualized:
        x.TFRAnnualized !== '' ? `${checkValuesToFixed(x.TFRAnnualized)}%` : '',
      Index_TR_An:
        x.Index_TR_An !== '' ? `${checkValuesToFixed(x.Index_TR_An)}%` : '',
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
    if (props.table_CompanyCampaign_News.length > 0) {
      setIsNewsComponent(getNewsComponent());
    } else {
      setIsNewsComponent(null);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [props.table_CompanyCampaign_News]);

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
                  props.table_CompanyCampaign_News,
                  'Company Activism campaigns News',
                  {
                    Investors: 'Investor(s)',
                    newsDate: 'Date',
                    headLine: 'Headline',
                    article: 'Article',
                  }
                )
              }
            >
              {msgConst.DOWNLOADXLS}
            </button>
            <div className='col-md-12 col-12 m-0 mt-2 divScrollActivismCampaign'>
              <MultiNewsComponent
                isCompanyCampaignNews // news article shown by true
                newsIds={props.table_CompanyCampaign_NewsIds}
                hash={
                  query.print
                    ? props.table_CompanyCampaign_News.slice(0, 20)
                    : props.table_CompanyCampaign_News
                }
                newsDetailsArray={
                  query.print
                    ? props.table_CompanyCampaign_News.slice(0, 20)
                    : props.table_CompanyCampaign_News
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
  function getData() {
    return (
      <>
        {/* Activist Campaign Summary */}
        <div className='row'>
          <div className='col-md-12 col-12 pt-3'>
            {props.header_ActivistCampaignSummary.length > 0 &&
            props.table_ActivistCampaignSummary.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Activist Campaign Summary'>
                <Table
                  IsShowCard
                  pageTitle='Activist Campaign Summary'
                  title='Activist Campaign Summary'
                  smalltitle=''
                  gridOptions={gridOptions_ActivistCampaignSummary}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Activist Campaign Summary'>
                {msgConst.NORECORDS}
              </Card>
            )}
          </div>
        </div>

        {/* PublicDemandDetail */}
        <div className='row'>
          <div className='col-md-12 col-12 pt-2 '>
            {props.table_PublicDemandDetail.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Public Demand Detail'>
                <Table
                  IsShowCard
                  pageTitle='Public Demand Detail'
                  title='Public Demand Detail'
                  smalltitle=''
                  gridOptions={gridOptions_PublicDemandDetail}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              msgConst.NORECORDS
            )}
          </div>
        </div>

        {/* Activist Campaign Characteristics */}
        <div className='row pdfpagebreak'>
          <div className='col-md-12 col-12 pt-2 '>
            {props.table_ActivistCampaignCharacteristics.length > 0 ? (
              <ErrorBoundary
                hasCard
                cardtitle='Activist Campaign Characteristics'
              >
                <Table
                  IsShowCard
                  pageTitle='Activist Campaign Characteristics'
                  title='Activist Campaign Characteristics'
                  smalltitle=''
                  gridOptions={gridOptions_ActivistCampaignCharacteristics}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Activist Campaign Characteristics'>
                {msgConst.NORECORDS}
              </Card>
            )}
          </div>
        </div>

        {/* Filings */}
        <div className='row'>
          <div className='col-md-12 col-12 pt-1 m-0'>
            <CollapseComponent
              isOpen={false}
              Heading='Filings'
              withoutCollapseComponent={query.print}
            >
              {props.table_Filings.length > 0 ? (
                <ErrorBoundary hasCard={!!query.print} cardtitle='Filings'>
                  <Table
                    IsShowCard={!!query.print}
                    pageTitle='Filings'
                    title='Filings'
                    smalltitle=''
                    gridOptions={gridOptions_Filings}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : query.print ? (
                <Card title='Filings'>{msgConst.NORECORDS}</Card>
              ) : (
                msgConst.NORECORDS
              )}
            </CollapseComponent>
          </div>
        </div>

        {/* News */}
        {isNewsComponent}

        {/* Activist Campaign Timeline */}
        <div className='row'>
          <div className='col-md-12 col-12 pt-2 mt-2 '>
            {props.table_ActivistCampaignTimeline.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Activist Campaign Timeline'>
                <Table
                  IsShowCard
                  pageTitle='Activist Campaign Timeline'
                  title='Activist Campaign Timeline'
                  smalltitle=''
                  gridOptions={gridOptions_ActivistCampaignTimeline}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              <Card title='Activist Campaign Timeline'>
                {msgConst.NORECORDS}
              </Card>
            )}
          </div>
        </div>

        {/* Theses */}
        <div className='row'>
          <div className='col-md-12 col-12 m-0'>
            <CollapseComponent
              isOpen={false}
              Heading='Theses'
              withoutCollapseComponent={query.print}
            >
              {props.table_Theses.length > 0 ? (
                <ErrorBoundary hasCard={!!query.print} cardtitle='Theses'>
                  <Table
                    IsShowCard={!!query.print}
                    pageTitle='Theses'
                    title='Theses'
                    smalltitle=''
                    gridOptions={gridOptions_Theses}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : query.print ? (
                <Card title='Theses'>{msgConst.NORECORDS}</Card>
              ) : (
                msgConst.NORECORDS
              )}
            </CollapseComponent>
          </div>
        </div>

        {/* Shareholder Proposals */}
        <div className='row'>
          <div className='col-md-12 col-12 m-0 mt-2'>
            <CollapseComponent
              isOpen={false}
              Heading='Shareholder Proposals'
              withoutCollapseComponent={query.print}
            >
              {props.table_ShareholderProposals.length > 0 ? (
                <ErrorBoundary
                  hasCard={!!query.print}
                  cardtitle='Shareholder Proposals'
                >
                  <Table
                    IsShowCard={!!query.print}
                    pageTitle='Shareholder Proposals'
                    title='Shareholder Proposals'
                    smalltitle=''
                    gridOptions={gridOptions_ShareholderProposals}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : query.print ? (
                <Card title='Shareholder Proposals'>{msgConst.NORECORDS}</Card>
              ) : (
                msgConst.NORECORDS
              )}
            </CollapseComponent>
          </div>
        </div>

        {/* Advisers */}
        <div className='row'>
          <div className='col-md-12 col-12 m-0 mt-2'>
            <CollapseComponent
              isOpen={false}
              Heading='Advisers'
              withoutCollapseComponent={query.print}
            >
              {props.table_Advisors !== undefined &&
              props.table_Advisors.length > 0 ? (
                <ErrorBoundary
                  hasCard={!!query.print}
                  cardtitle='Shareholder Proposals'
                >
                  <Table
                    IsShowCard={!!query.print}
                    pageTitle='Advisers'
                    title='Advisers'
                    smalltitle=''
                    gridOptions={gridOptions_Advisors}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : query.print ? (
                <Card title='Advisers'>{msgConst.NORECORDS}</Card>
              ) : (
                msgConst.NORECORDS
              )}
            </CollapseComponent>
          </div>
        </div>

        {/* Stock Performance */}
        <div className='row pdfpagebreak'>
          <div className='col-md-12 col-12 m-0 mt-2'>
            <CollapseComponent
              isOpen={false}
              Heading='Stock Performance'
              withoutCollapseComponent={query.print}
              withoutCollapseWithCard={query.print}
            >
              {props.table_StockPerformance.length > 0 ? (
                <>
                  <div className='ps-2'>
                    <p className='mb-0'>
                      Prices are adjusted for stock splits where necessary.
                    </p>
                    <p className='mb-0'>
                      T0 represents the date the period commenced.
                    </p>
                    <p className='mb-0'>
                      T1 represents the earlier of the activists exit or the
                      date of the most recent close.
                    </p>
                  </div>
                  <Table
                    IsShowCard={false}
                    pageTitle='Stock Performance'
                    title='Stock Performance'
                    smalltitle=''
                    gridOptions={gridOptions_StockPerformance}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </>
              ) : query.print ? (
                <Card title='Stock Performance'>{msgConst.NORECORDS}</Card>
              ) : (
                msgConst.NORECORDS
              )}
            </CollapseComponent>
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
      className={query.print ? 'cr-ActivistCampaignsPDF pt-3' : 'pt-3'}
    >
      <div className='row' id='loadItem'>
        <div className='col-12'>
          {/* filter Section */}
          {props.DDLCampaign.length !== 0 && (
            <div className='row align-items-center'>
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
                  maxHeight={180}
                  placeholder='Choose one or more campaign...'
                  disabled={props.isLoading ? true : props.TrialStatus}
                />
              </div>
              <div className='col-12 col-md-2 mb-1'>
                <button
                  id='btnUpdateData'
                  type='button'
                  className='btn btn-sm btn-primary'
                  disabled={props.isLoading ? true : props.TrialStatus}
                  onClick={async (e) => {
                    e.preventDefault();
                    await props.handleResetLoader();
                    await props.handleIsLoading(true);
                  }}
                >
                  Update Data
                </button>
              </div>
              <div className='col-12 col-md-5 mb-1'>
                <Checkbox
                  checked={props.chkCampaign}
                  onChange={() => {
                    props.handleSetChkCampaign(!props.chkCampaign);
                  }}
                  disabled={props.isLoading ? true : props.TrialStatus}
                  labelName='Click to display all other campaigns for activists involved in the campaigns you have selected (your selections will be highlighted appropriately)'
                  labelClassName='col-12 pt-0 pb-0 m-0 col-form-label text-primary font-weight-bold'
                  checkBoxClassName='appearance-auto smallcheckbox form-check-input p-2 me-2'
                  id='chk_campaign_id'
                />
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
            getData()
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(ActivistCampaigns));
