import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Collapse from 'react-bootstrap/Collapse';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import DropdownList from '../../GeneralForm/DropdownList';
import D3Map from '../../GeneralForm/D3Map';
import '../../../styles/components/_popupTrialUser.scss';
import { filters, bottomStatusBar } from '../../../utils/AgGridFunctions';
import Card from '../../GeneralForm/Card';
import bn from '../../../utils/bemnames';
import msgConst from '../../../constants/MessageConstans';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';
import { gridWidthValuesLrg } from '../../../utils/table-tools-util';
import GlobalGovToolsPDFLightbox from '../../GeneralForm/GlobalGovTools_PDFLightbox';
import { dateToNull } from '../../../utils/general-util';
import { NUMBER_ZERO } from '../../../constants/NumberConstants';
import {
  TRIAL_GOVERNANCE_STATE,
  TRIAL_USER,
} from '../../../constants/TrialTypeConstants';

const bemCard = bn.create('myCard');
const bem = bn.create('faqhelp');

const GlobalGovernanceDataTool = (props) => {
  const [stateName, setStateName] = React.useState('');
  const { width } = useWindowDimensions();
  const breakpoint = 768;
  const US_id = 181;
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const [open, setOpen] = useState(
    props.isOpen === undefined ? true : props.isOpen
  );
  // create function to minimise accordion on clicking dropdown and worldmap
  function minimiseAccordion() {
    setOpen(false);
  }

  const initialisePDFModal = (fileName, desc) => {
    setIsPDFModal(true);
    setPDFFileName(fileName);
    setPDFTitleName(desc);
  };

  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };

  function xScrollIntoView(id, number) {
    setTimeout(() => {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, number);
  }

  function getDescExpandCollpase_RowHeight(
    params,
    key,
    widthOfCell,
    heightOfCell
  ) {
    let newlines = 2.3;
    const words = key.split(' ');
    let current = words[0].length;
    const characterLengthOneLine = Math.round((widthOfCell * 12.8) / 100);
    while (current > characterLengthOneLine) {
      newlines += 1;
      current -= characterLengthOneLine;
    }
    for (let i = 1; i < words.length; i += 1) {
      const test = current + words[i].length + 1;
      if (test > characterLengthOneLine) {
        newlines += 1;
        current = words[i].length;
        while (current > characterLengthOneLine) {
          newlines += 1;
          current -= characterLengthOneLine;
        }
      } else {
        current = test;
      }
    }

    const row = params.node;
    const selected = !row.selected;
    const paramsObj = {
      force: true,
      rowNodes: [row],
    };

    row.data.isDescExpand = !row.data.isDescExpand;
    row.data.firstLoadRowHeight =
      row.data.firstLoadRowHeight === NUMBER_ZERO
        ? row.rowHeight
        : row.data.firstLoadRowHeight;
    let finalHeight = row.data.isDescExpand
      ? newlines * 17.3
      : row.data.firstLoadRowHeight;

    if (
      (row.data.afterExpandConRowHeight !== undefined &&
        row.data.afterExpandConRowHeight === NUMBER_ZERO) ||
      row.data.afterExpandDescRowHeight === NUMBER_ZERO
    ) {
      if (row.data.isDescExpand) {
        row.data.afterExpandDescRowHeight = 28 + newlines * 17.3;
      }
    }

    if (!row.data.isDescExpand) {
      finalHeight =
        row.data.afterExpandConRowHeight === undefined
          ? row.data.firstLoadRowHeight
          : row.data.afterExpandConRowHeight;
    }
    if (
      !row.data.isDescExpand &&
      row.data.isConExpand !== undefined &&
      !row.data.isConExpand
    ) {
      finalHeight = row.data.firstLoadRowHeight;
      row.data.afterExpandDescRowHeight = 0;
      if (row.data.afterExpandConRowHeight !== undefined) {
        row.data.afterExpandConRowHeight = 0;
      }
    }
    row.setRowHeight(finalHeight);
    row.setSelected(selected);
    row.gridApi.refreshCells(paramsObj);
    row.gridApi.onRowHeightChanged();
  }
  function getConExpandCollpase_RowHeight(
    params,
    key,
    widthOfCell,
    heightOfCell
  ) {
    let newlines = 2;
    const words = key.split(' ');
    let current = words[0].length;
    const characterLengthOneLine = Math.round((widthOfCell * 11) / 100);
    while (current > characterLengthOneLine) {
      newlines += 1;
      current -= characterLengthOneLine;
    }
    for (let i = 1; i < words.length; i += 1) {
      const test = current + words[i].length + 1;
      if (test > characterLengthOneLine) {
        newlines += 1;
        current = words[i].length;
        while (current > characterLengthOneLine) {
          newlines += 1;
          current -= characterLengthOneLine;
        }
      } else {
        current = test;
      }
    }

    const row = params.node;
    const selected = !row.selected;
    const paramsObj = {
      force: true,
      rowNodes: [row],
    };
    row.data.isConExpand = !row.data.isConExpand;
    row.data.firstLoadRowHeight =
      row.data.firstLoadRowHeight === NUMBER_ZERO
        ? row.rowHeight
        : row.data.firstLoadRowHeight;
    let finalHeight = row.data.isConExpand
      ? newlines * 17
      : row.data.firstLoadRowHeight;

    if (
      row.data.afterExpandConRowHeight === NUMBER_ZERO ||
      row.data.afterExpandDescRowHeight === NUMBER_ZERO
    ) {
      if (row.data.isConExpand !== undefined && row.data.isConExpand) {
        row.data.afterExpandConRowHeight = 28 + newlines * 17;
      }
    }
    if (row.data.afterExpandDescRowHeight > row.data.afterExpandConRowHeight) {
      finalHeight = row.data.afterExpandDescRowHeight;
    }
    if (!row.data.isConExpand) {
      finalHeight = row.data.afterExpandDescRowHeight;
    }

    if (!row.data.isDescExpand && !row.data.isConExpand) {
      finalHeight = row.data.firstLoadRowHeight;
      row.data.afterExpandDescRowHeight = 0;
      row.data.afterExpandConRowHeight = 0;
    }

    row.setRowHeight(finalHeight);
    row.setSelected(selected);
    row.gridApi.refreshCells(paramsObj);
    row.gridApi.onRowHeightChanged();
  }

  function getDescriptionData(params, key) {
    return (
      <div className='d-flex'>
        {key.length > 100 ? (
          <>
            <button
              id={`btnplus_${Math.random().toString(36).substr(2, 6)}`}
              type='button'
              className='btn btn-sm btn-primary ag-grid-expand-collapse-btn'
              onClick={async (e) => {
                e.preventDefault();
                const widthOfCell =
                  e.target.parentNode.parentNode.parentNode.offsetWidth;
                const heightOfCell =
                  e.target.parentNode.parentNode.parentNode.offsetHeight;
                getDescExpandCollpase_RowHeight(
                  params,
                  key,
                  widthOfCell,
                  heightOfCell
                );
              }}
            >
              {params.node.data.isDescExpand ? '-' : '+'}
            </button>
            <span
              className={
                params.node.data.isDescExpand
                  ? 'ws-normal-d-block-lh pt-2'
                  : 'text-overflow-ellipsis overflow-hidden'
              }
            >
              {key}
            </span>
          </>
        ) : (
          <span className='text-wrap' style={{ lineHeight: '30px' }}>
            {key}
          </span>
        )}
      </div>
    );
  }
  function getConditionData(params, key) {
    return (
      <div className='d-flex'>
        {key.length > 100 ? (
          <>
            <button
              id={`btnplus_${Math.random().toString(36).substr(2, 6)}`}
              type='button'
              className='btn btn-sm btn-primary ag-grid-expand-collapse-btn'
              onClick={async (e) => {
                e.preventDefault();
                const widthOfCell =
                  e.target.parentNode.parentNode.parentNode.offsetWidth;
                const heightOfCell =
                  e.target.parentNode.parentNode.parentNode.offsetHeight;
                getConExpandCollpase_RowHeight(
                  params,
                  key,
                  widthOfCell,
                  heightOfCell
                );
              }}
            >
              {params.node.data.isConExpand ? '-' : '+'}
            </button>
            <span
              className={
                params.node.data.isConExpand
                  ? 'ws-normal-d-block-lh pt-2'
                  : 'text-overflow-ellipsis overflow-hidden'
              }
            >
              {key}
            </span>
          </>
        ) : (
          <span className='text-wrap' style={{ lineHeight: '30px' }}>
            {key}
          </span>
        )}
      </div>
    );
  }

  async function countryChangeDDL(e) {
    if (e !== null) {
      if (e.value === US_id) {
        // for state gov.
        props.handleSetCountyGovDDL(e);
        props.handleSetStateGovDDL(props.stateGovernanceList[0]);
        await props.getStateGovListReq(props.stateGovernanceList[0].value);
        xScrollIntoView('stateComponentId', 200);
      } else {
        // for country gov.
        props.handleSetCountyGovDDL(e);
        await props.getCountryGovListReq(e.value); // e.value = country_id
        xScrollIntoView('countyComponentId', 200);
      }
    } else {
      props.handleSetCountyGovDDL('');
      xScrollIntoView('globalGovId', 100);
    }
  }

  // summary
  const gridOptionsSummaryData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Provision',
        field: 'Provision',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh30 ag-cell-blurrytext'
          : 'ws-normal-lh30',
        minWidth: width < breakpoint ? 150 : 250,
        chartDataType: 'category',
      },
      {
        headerName: 'Type',
        field: 'Type',
        minWidth: width < breakpoint ? 120 : 150,
      },
      {
        headerName: 'Australia',
        field: 'Australia',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Brazil',
        field: 'Brazil',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Canada',
        field: 'Canada',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'France',
        field: 'France',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Germany',
        field: 'Germany',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Hong Kong',
        field: 'Hong Kong',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'India',
        field: 'India',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Ireland',
        field: 'Ireland',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Italy',
        field: 'Italy',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Japan',
        field: 'Japan',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Korea, Republic of',
        field: 'Korea, Republic of',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Malaysia',
        field: 'Malaysia',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Netherlands',
        field: 'Netherlands',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Norway',
        field: 'Norway',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Singapore',
        field: 'Singapore',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'South Africa',
        field: 'South Africa',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Spain',
        field: 'Spain',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'Sweden',
        field: 'Sweden',
        ...gridWidthValuesLrg,
      },
      {
        headerName: 'UK',
        field: 'UK',
        ...gridWidthValuesLrg,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns:
        width < breakpoint
          ? [
              {
                colId: 'Provision',
                pinned: 'left',
              },
            ]
          : [
              {
                colId: 'Provision',
                pinned: 'left',
              },
              {
                colId: 'Type',
                pinned: 'left',
              },
            ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.summaryData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    statusBar: bottomStatusBar,
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh',
  };

  // country gov.
  const gridOptionsDocumentsDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Document Name',
        field: 'Document_Name',
        minWidth: width < breakpoint ? 150 : 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Date',
        field: 'Date',
        minWidth: 120,
        maxWidth: 120,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext dateFormat'
          : 'dateFormat',
      },
      {
        headerName: 'Binding',
        field: 'Binding',
        minWidth: 180,
      },
      {
        headerName: 'Link',
        field: 'URL',
        cellRendererFramework: (params) => (
          <a
            type='button'
            className='text-secondary'
            onClick={() => {
              initialisePDFModal(params.data.pdf, params.data.Document_Name);
            }}
          >
            View
          </a>
        ),
        minWidth: 120,
        maxWidth: 120,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Document_Name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.documentsDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      Date: x.Date !== null ? dateToNull(x.Date, 'dd-mmm-yy', true) : '',
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsBoardDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Board Details',
        field: 'Board_Details',
        minWidth: 250,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Yes/ No',
        field: 'Yes_no',
        minWidth: 120,
        maxWidth: 180,
      },
      {
        headerName: 'Number',
        field: 'number_global',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Link',
        field: 'url',
        cellRendererFramework: (params) => (
          <a
            className='link-primary text-secondary'
            rel='noopener noreferrer'
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              window.open(params.data.url, '_blank');
            }}
          >
            View
          </a>
        ),
        minWidth: 120,
        maxWidth: 120,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Board_Details',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.boardDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsVotingDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Voting and M&A',
        field: 'Voting_MA',
        minWidth: 250,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Yes/ No',
        field: 'Yes_no',
        minWidth: 120,
        maxWidth: 180,
      },
      {
        headerName: 'Number',
        field: 'number_global',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => (
          <a
            className='text-secondary'
            rel='noopener noreferrer'
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              window.open(params.data.url, '_blank');
            }}
          >
            View
          </a>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Voting_MA',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.votingDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsGeneralGovDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'General Governance',
        field: 'General_Gov',
        minWidth: 250,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Yes/ No',
        field: 'Yes_no',
        minWidth: 120,
        maxWidth: 180,
      },
      {
        headerName: 'Number',
        field: 'number_global',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => (
          <a
            className='text-secondary'
            rel='noopener noreferrer'
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              window.open(params.data.url, '_blank');
            }}
          >
            View
          </a>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'General_Gov',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.generalGovDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsShareholderActDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Shareholder Activism',
        field: 'Shareholder_Act',
        minWidth: 250,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Yes/ No',
        field: 'Yes_no',
        minWidth: 120,
        maxWidth: 180,
      },
      {
        headerName: 'Number',
        field: 'number_global',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => (
          <a
            className='text-secondary'
            rel='noopener noreferrer'
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              window.open(params.data.url, '_blank');
            }}
          >
            View
          </a>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Shareholder_Act',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.shareholderActDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsGovTakeoverDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Takeover',
        field: 'Gov_Takeover',
        minWidth: 250,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Yes/ No',
        field: 'Yes_no',
        minWidth: 120,
        maxWidth: 120,
      },
      {
        headerName: 'Number',
        field: 'number_global',
        minWidth: 120,
        maxWidth: 180,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => (
          <a
            className='text-secondary'
            rel='noopener noreferrer'
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              window.open(params.data.url, '_blank');
            }}
          >
            View
          </a>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Gov_Takeover',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.govTakeoverDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsProvisionDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Provision',
        field: 'Comply_Provision',
        minWidth: 250,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
        chartDataType: 'category',
      },
      {
        headerName: 'Yes/ No',
        field: 'Yes_no',
        minWidth: 120,
        maxWidth: 180,
      },
      {
        headerName: 'Number',
        field: 'number_global',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => (
          <a
            className='text-secondary'
            rel='noopener noreferrer'
            target='_blank'
            onClick={(e) => {
              e.preventDefault();
              window.open(params.data.url, '_blank');
            }}
          >
            View
          </a>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Comply_Provision',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.provisionDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };

  // State Gov. gridoptions
  const gridOptions_StateGov_BoardDetails = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'State',
        field: 'State_name',
        minWidth: 150,
        cellClass: 'ps-2 pe-2',
        cellRendererFramework: (params) => {
          if (
            props.status === TRIAL_USER &&
            params.data.State_name !== TRIAL_GOVERNANCE_STATE
          ) {
            return (
              <button
                type='button'
                className='w-100 btn btn-sm btn-primary'
                disabled
              >
                {params.data.State_name}
              </button>
            );
          }
          return (
            <button
              type='button'
              className='w-100 btn btn-sm btn-primary'
              onClick={async () => {
                await props.getStateGovDetailsListReq(params.data.State_name);
                await props.handleSetStateGovList([params.data]);
                setStateName(params.data.State_name);
                xScrollIntoView('stateComponentDetailId', 500);
              }}
            >
              {params.data.State_name}
            </button>
          );
        },
      },
      {
        headerName: 'Staggered Board',
        field: '2',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['2']}
          </span>
        ),
      },
      {
        headerName: 'Board Fills All Vacancies',
        field: '1',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['1']}
          </span>
        ),
      },
      {
        headerName: 'Separate CEO & Chairman Requirement',
        field: '4',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['4']}
          </span>
        ),
      },
      {
        headerName: 'Directors Removed only for Cause',
        field: '3',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['3']}
          </span>
        ),
      },
      {
        headerName: 'Board can Amend Bylaws Without Shareholder Approval',
        field: '27',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['27']}
          </span>
        ),
      },
      {
        headerName: 'Amendments to size of board without shareholder approval',
        field: '6',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['6']}
          </span>
        ),
      },
      {
        headerName: 'Action by Written Consent',
        field: '12',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['12']}
          </span>
        ),
      },
      {
        headerName: 'Right for Shareholders to call special meeting',
        field: '13',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['13']}
          </span>
        ),
      },
      {
        headerName: 'Exclusive Forum Provision',
        field: '35',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['35']}
          </span>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'State_name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovList.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    headerHeight: 120,
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptions_StateGov_VotingRights = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'State',
        field: 'State_name',
        minWidth: 150,
        chartDataType: 'category',
        cellRendererFramework: (params) => {
          if (
            props.status === TRIAL_USER &&
            params.data.State_name !== TRIAL_GOVERNANCE_STATE
          ) {
            return (
              <button
                type='button'
                className='w-100 btn btn-sm btn-primary'
                disabled
              >
                {params.data.State_name}
              </button>
            );
          }
          return (
            <button
              type='button'
              aria-hidden='true'
              className='w-100 btn btn-sm btn-primary'
              onClick={async () => {
                await props.getStateGovDetailsListReq(params.data.State_name);
                await props.handleSetStateGovList([params.data]);
                setStateName(params.data.State_name);
                xScrollIntoView('stateComponentDetailId', 500);
              }}
            >
              {params.data.State_name}
            </button>
          );
        },
      },
      {
        headerName: 'Majority Vote (Other than Election)',
        field: '34',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['34']}
          </span>
        ),
      },
      {
        headerName: 'Majority Vote for Uncontested Election',
        field: '14',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['14']}
          </span>
        ),
      },
      {
        headerName: 'Cumulative Voting',
        field: '17',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['17']}
          </span>
        ),
      },
      {
        headerName: 'Pre-emptive rights for existing shareholders',
        field: '19',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['19']}
          </span>
        ),
      },
      {
        headerName: 'Multiple Share Classes',
        field: '16',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['16']}
          </span>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'State_name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovList.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    headerHeight: 120,
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptions_StateGov_MandN = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'State',
        field: 'State_name',
        minWidth: 150,
        chartDataType: 'category',
        cellRendererFramework: (params) => {
          if (
            props.status === TRIAL_USER &&
            params.data.State_name !== TRIAL_GOVERNANCE_STATE
          ) {
            return (
              <button
                type='button'
                className='w-100 btn btn-sm btn-primary'
                disabled
              >
                {params.data.State_name}
              </button>
            );
          }
          return (
            <button
              type='button'
              aria-hidden='true'
              className='w-100 btn btn-sm btn-primary'
              onClick={async () => {
                await props.getStateGovDetailsListReq(params.data.State_name);
                await props.handleSetStateGovList([params.data]);
                setStateName(params.data.State_name);
                xScrollIntoView('stateComponentDetailId', 500);
              }}
            >
              {params.data.State_name}
            </button>
          );
        },
      },
      {
        headerName: 'Business Combination',
        field: '30',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['30']}
          </span>
        ),
      },
      {
        headerName: 'Constituency',
        field: '32',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['32']}
          </span>
        ),
      },
      {
        headerName: 'Control Share Acquisition',
        field: '29',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['29']}
          </span>
        ),
      },
      {
        headerName: 'Fair Price',
        field: '31',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['31']}
          </span>
        ),
      },
      {
        headerName: 'Interested Shareholder',
        field: '9',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['9']}
          </span>
        ),
      },
      {
        headerName: 'Poison Pill Validation',
        field: '33',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['33']}
          </span>
        ),
      },
      {
        headerName: 'Supermajority Vote for Merger',
        field: '21',
        minWidth: 120,
        cellRendererFramework: (params) => (
          <span aria-hidden='true'>
            {' '}
            {props.TrialStatus ? 'N/S' : params.data['21']}
          </span>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'State_name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovList.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    headerHeight: 120,
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };

  // State Gov. Details gridoptions
  const gridOptionsStateGov_BoardDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Board Details',
        chartDataType: 'category',
        field: 'Board_Detail',
        minWidth: 200,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Yes/ No',
        field: 'yes_no',
        cellClass: 'text-center',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: 'Conditions',
        field: 'Conditions',
        filters: ['autoHeightTrue'],
        minWidth: 250,
        maxWidth: 250,
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getConditionData(params, params.data.Conditions),
      },
      {
        headerName: 'Number',
        field: 'number',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30 text-center'
          : 'ws-normal-lh30 text-center',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Source',
        field: 'source',
        cellRendererFramework: (params) =>
          props.TrialStatus ? (
            <span className='text-primary'>Link</span>
          ) : (
            <a
              className='text-secondary'
              rel='noopener noreferrer'
              href={params.data.source}
              target='_blank'
            >
              Link
            </a>
          ),
        minWidth: 100,
        maxWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Board_Detail',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovboardDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
      afterExpandConRowHeight: 0,
      afterExpandDescRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsStateGov_ShareholderDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Shareholder Control',
        field: 'Shareholder_Activism',
        minWidth: 200,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Yes/ No',
        field: 'yes_no',
        minWidth: 90,
        maxWidth: 90,
        cellClass: 'text-center',
      },
      {
        headerName: 'Conditions',
        field: 'Conditions',
        filters: ['autoHeightTrue'],
        minWidth: 250,
        maxWidth: 250,
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getConditionData(params, params.data.Conditions),
      },
      {
        headerName: 'Number',
        field: 'number',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30 text-center'
          : 'ws-normal-lh30 text-center',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Source',
        field: 'source',
        cellRendererFramework: (params) =>
          props.TrialStatus ? (
            <span className='text-primary'>Link</span>
          ) : (
            <a
              className='text-secondary'
              rel='noopener noreferrer'
              href={params.data.source}
              target='_blank'
            >
              Link
            </a>
          ),
        minWidth: 100,
        maxWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Shareholder_Activism',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovshareholderDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
      afterExpandConRowHeight: 0,
      afterExpandDescRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsStateGov_VotingDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Voting',
        field: 'Voting',
        minWidth: 200,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Yes/ No',
        field: 'yes_no',
        minWidth: 90,
        maxWidth: 90,
        cellClass: 'text-center',
      },
      {
        headerName: 'Conditions',
        field: 'Conditions',
        filters: ['autoHeightTrue'],
        minWidth: 250,
        maxWidth: 250,
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getConditionData(params, params.data.Conditions),
      },
      {
        headerName: 'Number',
        field: 'number',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30 text-center'
          : 'ws-normal-lh30 text-center',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Source',
        field: 'source',
        cellRendererFramework: (params) =>
          props.TrialStatus ? (
            <span className='text-primary'>Link</span>
          ) : (
            <a
              className='text-secondary'
              rel='noopener noreferrer'
              href={params.data.source}
              target='_blank'
            >
              Link
            </a>
          ),
        minWidth: 100,
        maxWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Voting',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovvotingDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
      afterExpandConRowHeight: 0,
      afterExpandDescRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };
  const gridOptionsStateGov_MNDetailsData = {
    enableCharts: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'M&A',
        field: 'Voting',
        minWidth: 200,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30'
          : 'ws-normal-lh30',
      },
      {
        headerName: 'Yes/ No',
        field: 'yes_no',
        minWidth: 90,
        maxWidth: 90,
        cellClass: 'text-center',
      },
      {
        headerName: 'Conditions',
        field: 'Conditions',
        filters: ['autoHeightTrue'],
        minWidth: 250,
        maxWidth: 250,
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getConditionData(params, params.data.Conditions),
      },
      {
        headerName: 'Number',
        field: 'number',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh30 text-center'
          : 'ws-normal-lh30 text-center',
      },
      {
        headerName: 'Description',
        field: 'description',
        filters: ['autoHeightTrue', 'flex1'],
        cellClass: props.TrialStatus
          ? 'ps-2 pe-2 ag-cell-blurrytext'
          : 'ps-2 pe-2',
        cellRendererFramework: (params) =>
          getDescriptionData(params, params.data.description),
      },
      {
        headerName: 'Source',
        field: 'source',
        cellRendererFramework: (params) =>
          props.TrialStatus ? (
            <span className='text-primary'>Link</span>
          ) : (
            <a
              className='text-secondary'
              rel='noopener noreferrer'
              href={params.data.source}
              target='_blank'
            >
              Link
            </a>
          ),
        minWidth: 100,
        maxWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < breakpoint,
      columns: [
        {
          colId: 'Voting',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    heightData: 0,
    paggination: { isPagging: false, pageSize: 10 },
    rowData: props.stateGovmnDetails.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      isDescExpand: false,
      isConExpand: false,
      firstLoadRowHeight: 0,
      afterExpandConRowHeight: 0,
      afterExpandDescRowHeight: 0,
    })),
    rowSelection: 'multiple',
    domLayout: 'autoHeight',
  };

  return (
    <>
      <Page key={1}>
        <div id='globalGovId'>
          <div className='pb-3'>
            <div className='pt-3 '>
              <D3Map
                onCountyClickEvent={(e) => {
                  countryChangeDDL(e);
                  minimiseAccordion(e);
                }}
                cardTitle='Map'
                D3Class='w-75 m-0-auto'
                dashboard_widget_link_id={1}
                index={1}
                mobileScreenStopZoom={width < breakpoint}
              />
            </div>
            <div className='pt-2 '>
              <div className='row col-12'>
                <p className='text-primary mb-1'>
                  Click a country above or select from the drop down list to see
                  more information&nbsp;
                </p>
                <div className='col-md-3 col-12'>
                  <DropdownList
                    handleChange={(e) => {
                      countryChangeDDL(e);
                      minimiseAccordion(e);
                    }}
                    isMulti={false}
                    options={props.countryData}
                    Dvalue={props.selectedCountyGov}
                  />
                </div>
              </div>
            </div>

            <div className={bem.b('faqhelp')}>
              <div className='row definitionMain'>
                <div
                  className={open ? 'collapse-card-header' : 'faqcardheader'}
                >
                  <h4 className='mb-0 w-100'>
                    <span
                      className='col-12 col-md-12 col-sm-12 btn btn-link text-start btnOutlineNone p-3'
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(!open);
                      }}
                      aria-controls={`collapse-text-${props.index}`}
                      aria-expanded={open}
                    >
                      Summary
                    </span>
                  </h4>

                  <span
                    onClick={() => setOpen(!open)}
                    className={
                      open
                        ? 'iconUpDownColor text-primary bi bi-dash p-3'
                        : 'iconUpDownColor text-primary bi bi-plus p-3'
                    }
                  />
                </div>
                <Collapse in={open}>
                  <div className='pb-2 pt-2'>
                    <div className='row'>
                      <div className='col-md-12 col-12 align-items-baseline'>
                        <p className='text-primary mb-1'>
                          Definitions: Yes - Companies incorporated in this
                          country can choose whether to adopt this provision.
                        </p>
                        <p className='text-primary mb-1'>
                          Mandatory - Companies incorporated in this country
                          have to comply with this provision or does not allow
                          for differences.
                        </p>
                        <p className='text-primary mb-1'>
                          No - Companies incorporated in this country are not
                          permitted to adopt this provision.
                        </p>
                        <p className='text-primary m-0'>
                          Not Specified - The countries corporate law does not
                          specify whether this provision is allowed.
                        </p>
                      </div>

                      <div className='col-md-12 col-12'>
                        <Table
                          enableCharts
                          IsShowCard={false}
                          title=''
                          smalltitle=''
                          gridOptions={gridOptionsSummaryData}
                          hideExcelDownloadIcon={props.trialUserDisableDownload}
                        />
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>

            {props.selectedCountyGov !== '' &&
              props.selectedCountyGov.value !== US_id && (
                <div id='countyComponentId'>
                  {props.overviewDetails.length > 0 && (
                    <>
                      <h2
                        className='text-primary pt-4 ps-3 pb-3'
                        style={{ fontWeight: 400 }}
                      >
                        {props.TrialStatus
                          ? props.selectedCountyGov.label
                          : props.countryProfileDetails.Country_name}
                      </h2>
                      <Card title='Overview' smalltitle=''>
                        <p
                          className={
                            props.TrialStatus
                              ? 'blurrytext text-primary'
                              : 'text-primary'
                          }
                        >
                          {props.overviewDetails}
                        </p>
                      </Card>

                      {props.documentsDetails.length > 0 && (
                        <div className='pt-3'>
                          <Card
                            title='Corporate Governance Documents'
                            smalltitle=''
                          >
                            <div className='col-md-12 col-12'>
                              <Table
                                enableCharts
                                IsShowCard={false}
                                title=''
                                smalltitle=''
                                gridOptions={gridOptionsDocumentsDetailsData}
                                hideExcelDownloadIcon={
                                  props.trialUserDisableDownload
                                }
                              />
                            </div>
                          </Card>
                        </div>
                      )}

                      <div className='pt-3'>
                        <Card
                          title='Regulatory Governance Provisions'
                          smalltitle=''
                        >
                          {props.boardDetails.length > 0 && (
                            /* Board Details */
                            <div className='col-md-12 col-12'>
                              <div className='row'>
                                <Table
                                  enableCharts
                                  IsShowCard={false}
                                  title=''
                                  smalltitle=''
                                  gridOptions={gridOptionsBoardDetailsData}
                                  hideExcelDownloadIcon={
                                    props.trialUserDisableDownload
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {props.shareholderActDetails.length > 0 && (
                            /* Shareholder Activism Details */
                            <div className='col-md-12 col-12'>
                              <div className='row'>
                                <Table
                                  enableCharts
                                  IsShowCard={false}
                                  title=''
                                  smalltitle=''
                                  gridOptions={
                                    gridOptionsShareholderActDetailsData
                                  }
                                  hideExcelDownloadIcon={
                                    props.trialUserDisableDownload
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {props.votingDetails.length > 0 && (
                            /* Voting and M&A */
                            <div className='col-md-12 col-12'>
                              <div className='row'>
                                <Table
                                  enableCharts
                                  IsShowCard={false}
                                  title=''
                                  smalltitle=''
                                  gridOptions={gridOptionsVotingDetailsData}
                                  hideExcelDownloadIcon={
                                    props.trialUserDisableDownload
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {props.generalGovDetails.length > 0 && (
                            /* General Gov details */
                            <div className='col-md-12 col-12'>
                              <div className='row'>
                                <Table
                                  enableCharts
                                  IsShowCard={false}
                                  title=''
                                  smalltitle=''
                                  gridOptions={gridOptionsGeneralGovDetailsData}
                                  hideExcelDownloadIcon={
                                    props.trialUserDisableDownload
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {props.govTakeoverDetails.length > 0 && (
                            /* Takeover details */
                            <div className='col-md-12 col-12'>
                              <div className='row'>
                                <Table
                                  enableCharts
                                  IsShowCard={false}
                                  title=''
                                  smalltitle=''
                                  gridOptions={
                                    gridOptionsGovTakeoverDetailsData
                                  }
                                  hideExcelDownloadIcon={
                                    props.trialUserDisableDownload
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </Card>
                      </div>

                      {props.provisionDetails.length > 0 && (
                        <div className='pt-3'>
                          <Card
                            title='Comply or Explain Provisions'
                            smalltitle=''
                          >
                            <div className='col-md-12 col-12'>
                              <Table
                                enableCharts
                                IsShowCard={false}
                                title=''
                                smalltitle=''
                                gridOptions={gridOptionsProvisionDetailsData}
                                hideExcelDownloadIcon={
                                  props.trialUserDisableDownload
                                }
                              />
                            </div>
                          </Card>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

            {props.setStateGovernanceDDL !== '' &&
              props.selectedCountyGov.value === US_id && (
                <div id='stateComponentId'>
                  <div>
                    <h2
                      className='text-primary pt-4 ps-3 pb-3'
                      style={{ fontWeight: 400 }}
                    >
                      State Governance
                    </h2>
                    <div className='pt-2'>
                      <div className='col-md-4 col-12'>
                        <DropdownList
                          handleChange={async (e) => {
                            if (e !== null) {
                              props.handleSetStateGovDDL(e);
                              await props.getStateGovListReq(e.value);
                            } else {
                              props.handleSetStateGovDDL('');
                              props.handleSetCountyGovDDL('');
                              xScrollIntoView('globalGovId', 100);
                            }
                          }}
                          isMulti={false}
                          options={props.stateGovernanceList}
                          Dvalue={props.setStateGovernanceDDL}
                        />
                      </div>
                    </div>
                    {props.setStateGovernanceDDL.value === 'Board Details and Shareholder Activism' && (
                        <div className='col-md-12 col-12 pt-3'>
                          <Table
                            enableCharts
                            IsShowCard
                            title='States'
                            smalltitle=''
                            gridOptions={gridOptions_StateGov_BoardDetails}
                            hideExcelDownloadIcon={props.trialUserDisableDownload}
                          />
                        </div>
                     )}
                     {props.setStateGovernanceDDL.value === 'Voting Rights' && (
                        <div className='col-md-12 col-12 pt-3'>
                          <Table
                            enableCharts
                            IsShowCard
                            title='States'
                            smalltitle=''
                            gridOptions={gridOptions_StateGov_VotingRights}
                            hideExcelDownloadIcon={props.trialUserDisableDownload}
                          />
                        </div>
                      )}
                      {props.setStateGovernanceDDL.value === 'M&A' && (
                        <div className='col-md-12 col-12 pt-3'>
                          <Table
                            enableCharts
                            IsShowCard
                            title='States'
                            smalltitle=''
                            gridOptions={gridOptions_StateGov_MandN}
                            hideExcelDownloadIcon={props.trialUserDisableDownload}
                          />
                        </div>
                      )}
                  </div>
                  <div className='col-md-12 col-12 align-items-baseline pt-3 ps-1'>
                    <p className='text-primary mb-1'>Definitions:</p>
                    <p className='text-primary mb-1'>
                      Yes - The states law permits companies incorporated here
                      to have this provision.
                    </p>
                    <p className='text-primary mb-1'>
                      No - The states law does not permit companies incorporated
                      here to have this provision.
                    </p>
                    <p className='text-primary mb-1'>
                      N/S- The states law does not specify whether this
                      provision is allowed.
                    </p>
                    <p className='text-primary m-0'>
                      * denotes whether the provision is a Yes or No conditional
                      on other provisions, please see the provisions text for
                      further detail.
                    </p>
                  </div>

                  {stateName !== '' && (
                    <div className='pt-3'>
                      <div
                        className={bemCard.b(
                          'card justify-content-around w-100 cursor-auto'
                        )}
                      >
                        <div className='card-header text-primary'>
                          <div className='d-flex'>
                            <div className='d-inline-block divTitle'>
                              <span
                                className='titleSelection'
                                title='Summary'
                              />
                            </div>
                            <div className='d-inline-block w-25'>
                              <button
                                onClick={async () => {
                                  await props.getStateGovListReq(
                                    props.setStateGovernanceDDL !== ''
                                      ? props.setStateGovernanceDDL.value
                                      : ''
                                  );
                                  setStateName('');
                                  xScrollIntoView('stateComponentId', 100);
                                }}
                                type='button'
                                className='btn btn-primary btn-sm float-end'
                              >
                                Close State Detail
                              </button>
                            </div>
                          </div>
                        </div>

                        <div id='stateComponentDetailId'>
                          <h2
                            className='text-primary pt-4 ps-3 pb-3'
                            style={{ fontWeight: 400 }}
                          >
                            {stateName}
                          </h2>

                          {props.stateGovdescDetails.length > 0 ? (
                            <>
                              <div className='ps-3'>
                                <p
                                  className={
                                    props.TrialStatus
                                      ? 'blurrytext text-primary mb-1'
                                      : 'text-primary mb-1'
                                  }
                                >
                                  Number of companies incorporated (Russell
                                  3000) -{' '}
                                  {props.stateGovdescDetails[0].russ3000}(
                                  {props.stateGovdescDetails[0].russ3000_pcent})
                                </p>
                                <p
                                  className={
                                    props.TrialStatus
                                      ? 'blurrytext text-primary m-0'
                                      : 'text-primary m-0'
                                  }
                                >
                                  Number of companies incorporated (S&P500) -{' '}
                                  {props.stateGovdescDetails[0].sp500}(
                                  {props.stateGovdescDetails[0].sp500_pcent})
                                </p>
                              </div>
                              <div className='pt-3 card-body slideBottomToUp d-block'>
                                {props.stateGovboardDetails.length > 0 && (
                                  /* Board Details */
                                  <div className='col-md-12 col-12 mb-3'>
                                    <Table
                                      enableCharts
                                      IsShowCard
                                      title='Board Details'
                                      smalltitle=''
                                      gridOptions={
                                        gridOptionsStateGov_BoardDetailsData
                                      }
                                      hideExcelDownloadIcon={
                                        props.trialUserDisableDownload
                                      }
                                    />
                                  </div>
                                )}
                                {props.stateGovshareholderDetails.length >
                                  0 && (
                                  /* Shareholder Activism Details */
                                  <div className='col-md-12 col-12 mb-3'>
                                    <Table
                                      enableCharts
                                      IsShowCard
                                      title='Shareholder Rights Details'
                                      smalltitle=''
                                      gridOptions={
                                        gridOptionsStateGov_ShareholderDetailsData
                                      }
                                      hideExcelDownloadIcon={
                                        props.trialUserDisableDownload
                                      }
                                    />
                                  </div>
                                )}
                                {props.stateGovvotingDetails.length > 0 && (
                                  /* Voting details */
                                  <div className='col-md-12 col-12 mb-3'>
                                    <Table
                                      enableCharts
                                      IsShowCard
                                      title='Voting Details'
                                      smalltitle=''
                                      gridOptions={
                                        gridOptionsStateGov_VotingDetailsData
                                      }
                                      hideExcelDownloadIcon={
                                        props.trialUserDisableDownload
                                      }
                                    />
                                  </div>
                                )}
                                {props.stateGovmnDetails.length > 0 && (
                                  /* M & N details */
                                  <div className='col-md-12 col-12 mb-3'>
                                    <Table
                                      enableCharts
                                      IsShowCard
                                      title='M&A Details'
                                      smalltitle=''
                                      gridOptions={
                                        gridOptionsStateGov_MNDetailsData
                                      }
                                      hideExcelDownloadIcon={
                                        props.trialUserDisableDownload
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <span className='row ps-5'>
                              {msgConst.NORECORDS}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            <GlobalGovToolsPDFLightbox
              handleCloseModelPopup={handlePDFModal}
              viewModalPopup={isPDFModal}
              handleSetBtnIdForExpandData={handlePDFModal}
              viewPDFFileName={pdfFileName}
              pdfTitle={pdfTitleName}
              IsShowCard
              isShowFooter
            />
          </div>
        </div>
      </Page>
      <ScrollToTopBtn />
    </>
  );
};

export default withRouter(React.memo(GlobalGovernanceDataTool));
