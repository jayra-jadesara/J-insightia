import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import D3barchart from '../../GeneralForm/D3barchart';
import '../../../styles/components/_popupTrialUser.scss';
import DropdownList from '../../GeneralForm/DropdownList';
import bn from '../../../utils/bemnames';
import messageConst from '../../../constants/MessageConstans';
import tooltipConst from '../../../constants/TooltipConstant';
import pathConst, {
  ICON_IMAGE_PATH,
  QUERY_MEETING,
  DOCS_INSIGHTIA_REDLINE_REPORTS,
} from '../../../constants/PathsConstant';
import { filters, NameToImageIcon } from '../../../utils/AgGridFunctions';
import {
  checkValuesToFixed,
  gridWidthDates,
  setCellStyleProposalChange,
} from '../../../utils/table-tools-util';
import IWidget from '../../GeneralForm/IWidget';
import VotingNoActionLetterProposalDetail from './VotingNoActionLetterProposalDetail';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import {
  isIdNotNullOrUndefined,
  dateToNull,
} from '../../../utils/general-util';
import { downloadAllExcelByJsonFn } from '../../../utils/exportExcel-util';

const bem = bn.create('votingOverview');

const VotingOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.meetingid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const title =
    props.issuerCompanyProfile !== undefined
      ? props.issuerCompanyProfile.Company_name
      : '';
  const showIsShareClasses = props.isShareClasses
    ? props.isShareClasses.length > 0
    : false;

  // toggle new widget
  const [isToggled, setToggled] = useState(false);
  const [btnadjustment, setbtnAdjustment] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(undefined);

  const [downloadAllXLSJson, setDownloadAllXLSJson] = useState([]);

  function passAbwhFn(data_start, data, tooltip) {
    if (Number(data)) {
      return <span>{data_start}</span>;
    }
    if (Number.isNaN(Number(data))) {
      if (data === 'n/a') {
        return <span>{data_start}</span>;
      }

      return (
        <div>
          <img
            src={`${ICON_IMAGE_PATH}${NameToImageIcon(data)}`}
            title={tooltip}
            style={{ height: '22px', marginRight: '5px' }}
            alt='flag'
          />
          <span>{data_start}</span>
        </div>
      );
    }
  }

  function diffDays(d1, d2) {
    let ndays;
    const tv1 = d1.valueOf();
    const tv2 = d2.valueOf();

    ndays = (tv2 - tv1) / 1000 / 86400;
    ndays = Math.round(ndays - 0.5);
    return ndays;
  }

  function currentYearCalculation() {
    const newDate = new Date(
      props.selectedMeetingDates !== undefined
        ? props.selectedMeetingDates.label.substr(0, 11)
        : ''
    );
    if (newDate.toString() !== 'Invalid Date') {
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      const now = new Date();
      const datebuilder = new Date(month > 6 ? year : year - 1, 6, 1);

      const dateDiffDays = diffDays(datebuilder, now);
      if (dateDiffDays < 365) {
        return month > 6 ? year.toString() : (year - 1).toString();
      }
      return month > 6 ? (year + 1).toString() : year.toString();
    }
    return '';
  }

  // toggle
  const toggleTrueFalse = (toggle = !isToggled) => {
    setSelectedProposal(undefined);
    setToggled(toggle);
  };

  // Meeting Table
  const gridOptionsIssuerMeetingStatsList = {
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Meeting Date',
        field: 'Meeting Date',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 535 : 150,
        maxWidth: query.print ? 535 : null,
        cellRendererFramework: (params) => {
          if (
            params.data['Meeting Date'] !== undefined &&
            params.data['Meeting Date'] !== null &&
            params.data['Meeting Date'] !== ''
          ) {
            if (params.data['Meeting Date'] === 'Voter Turnout (%)') {
              return (
                <div>
                  {' '}
                  {params.data['Meeting Date']}{' '}
                  <IWidget
                    tooltipOverrideString={
                      tooltipConst.VOTING_OVERVIEW_VOTERTURNOUT_TOOLTIP
                    }
                  />{' '}
                </div>
              );
            }
            return params.data['Meeting Date'];
          }
          return '';
        },
      },
      {
        headerName:
          props.selectedMeetingDateOnly !== undefined &&
          props.selectedMeetingDateOnly,
        field: 'CurrDate',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 250 : 100,
        maxWidth: query.print ? 250 : 150,
      },
      {
        headerName:
          props.issuerMeetingStatsListHeading !== undefined &&
          props.issuerMeetingStatsListHeading,
        field: 'PrevDate',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 250 : 100,
        maxWidth: query.print ? 250 : 150,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    rowSelection: 'single',
    isfloatingFilter: false,
    rowData:
      props.issuerMeetingStatsList.length > 0 &&
      props.issuerMeetingStatsList.map((x) => ({
        ...x,
        TrialStatus: props.TrialUser,
        allowDownload: props.allowDownload,
      })),
  };

  // #region Proposal Tables
  function getProposalListColumns(isPreMeeting) {
    if (isPreMeeting) {
      return [
        {
          headerName:
            props.selectedMeetingDateOnly.length > 0
              ? `${props.selectedMeetingDateOnly} Vote Results %`
              : '-',
          children: [
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading.Spn,
              field: 'Spn',
              minWidth: 50,
              maxWidth: 50,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
            },
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading.MRec,
              field: 'MRec',
              minWidth: 45,
              maxWidth: 45,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
              cellRendererFramework: (params) => (
                <div>
                  {params.data.MRecImage !== '' ? (
                    <img
                      src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                        params.data.MRecImage
                      )}`}
                      title={params.data.MRec}
                      style={{ height: '22px', marginRight: '5px' }}
                      alt='flag'
                    />
                  ) : (
                    ''
                  )}
                </div>
              ),
            },
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading.For,
              field: 'For',
              minWidth: 70,
              maxWidth: 70,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
            },
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading['Chg_AG/AB'],
              field: 'Chg_AG/AB',
              minWidth: 60,
              maxWidth: 60,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
              cellRendererFramework: (params) =>
                params.data['Chg_AG/AB'] !== null ||
                params.data['Chg_AG/AB'] !== ''
                  ? params.data['Chg_AG/AB']
                  : '',
              cellClassRules: {
                dodgerBlueFont: (params) => params.data['Chg_AG/AB'] >= 0,
                redFont: (params) => params.data['Chg_AG/AB'] !== 'n/a',
              },
              cellStyle: (params) =>
                setCellStyleProposalChange(params.data['Chg_AG/AB']),
            },
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading.AG_FOR,
              field: 'AG_FOR',
              minWidth: 70,
              maxWidth: 70,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
            },
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading['AB/WH_AG'],
              field: 'AB/WH_AG',
              minWidth: 60,
              maxWidth: 60,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
            },
            {
              headerName:
                props.getProposalListHeading !== undefined &&
                props.getProposalListHeading['Pass_AB/WH'],
              field: 'Pass_AB/WH_Tooltip',
              minWidth: 50,
              maxWidth: 50,
              cellClass: props.TrialUser
                ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
                : 'ws-normal-lh24 ps-1 pe-1 text-center',
              cellRendererFramework: (params) => (
                <div>
                  {passAbwhFn(
                    params.data['Pass_AB/WH_star'],
                    params.data['Pass_AB/WH'],
                    params.data['Pass_AB/WH_Tooltip']
                  )}
                </div>
              ),
            },
          ],
        },
      ];
    }
    return [
      {
        headerName:
          props.selectedMeetingDateOnly.length > 0
            ? props.selectedMeetingDateOnly
            : '-',
        children: [
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.Spn,
            field: 'Spn',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.MRec,
            field: 'MRec',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data.MRecImage && params.data.MRecImage !== '' ? (
                  <img
                    src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                      params.data.MRecImage
                    )}`}
                    title={params.data.MRec}
                    style={{ height: '22px', marginRight: '5px' }}
                    alt='flag'
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.For,
            field: 'For',
            minWidth: 60,
            maxWidth: 60,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading['Chg_AG/AB'],
            field: 'Chg_AG/AB',
            minWidth: 60,
            maxWidth: 60,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data['Chg_AG/AB'] >= 0 ? (
                  <span
                    style={{
                      color: 'DodgerBlue',
                      height: '22px',
                      marginRight: '5px',
                    }}
                  >
                    {params.data['Chg_AG/AB']}
                  </span>
                ) : params.data['Chg_AG/AB'] !== 'n/a' ? (
                  <span
                    style={{
                      color: 'red',
                      height: '22px',
                      marginRight: '5px',
                    }}
                  >
                    {params.data['Chg_AG/AB']}
                  </span>
                ) : (
                  <span style={{ height: '22px', marginRight: '5px' }}>
                    {params.data['Chg_AG/AB']}
                  </span>
                )}
              </div>
            ),
          },
        ],
      },
      {
        headerName:
          props.issuerMeetingStatsListHeading.substr(7, 4) < 1990
            ? 'No Previous Vote Results'
            : `${props.issuerMeetingStatsListHeading} Vote Results`,
        children: [
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.AG_FOR,
            field: 'AG_FOR',
            minWidth: 60,
            maxWidth: 60,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading['AB/WH_AG'],
            field: 'AB/WH_AG',
            minWidth: 60,
            maxWidth: 60,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading['Pass_AB/WH'],
            field: 'Pass_AB/WH',
            minWidth: 60,
            maxWidth: 60,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {passAbwhFn(
                  params.data['Pass_AB/WH_star'],
                  params.data['Pass_AB/WH']
                )}
              </div>
            ),
          },
        ],
      },
    ];
  }
  // ISS section column
  function getProposalList_ISSsectionColumn() {
    return [
      {
        headerName: 'ISS**',
        children: [
          {
            headerName:
              props.selectedMeetingDates !== undefined
                ? props.selectedMeetingDates.label.substr(9, 2)
                : '',
            field: 'IssCurrYearTooltip',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data.IssCurrYear && params.data.IssCurrYear !== '' ? (
                  <img
                    src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                      params.data.IssCurrYear
                    )}`}
                    title={params.data.IssCurrYearTooltip}
                    style={{ height: '22px', marginRight: '5px' }}
                    alt='flag'
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.IssPrevYear,
            field: 'IssPrevYearTooltip',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data.IssPrevYear && params.data.IssPrevYear !== '' ? (
                  <img
                    src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                      params.data.IssPrevYear
                    )}`}
                    title={params.data.IssPrevYearTooltip}
                    style={{ height: '22px', marginRight: '5px' }}
                    alt='flag'
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
        ],
      },
    ];
  }
  // GL section Column
  function getProposalList_GLsectionColumn() {
    return [
      {
        headerName: 'GL',
        children: [
          {
            headerName:
              props.selectedMeetingDates !== undefined
                ? props.selectedMeetingDates.label.substr(9, 2)
                : '',
            field: 'GlCurrYearTooltip',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data !== undefined &&
                params.data.GlCurrYear !== undefined &&
                params.data.GlCurrYear !== '' ? (
                  <img
                    src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                      params.data.GlCurrYear
                    )}`}
                    title={params.data.GlCurrYearTooltip}
                    style={{ height: '22px', marginRight: '5px' }}
                    alt='flag'
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
          {
            headerName:
              props.getProposalListHeading !== undefined
                ? `${props.getProposalListHeading.GlPrevYear} `
                : '',
            field: 'GlPrevYearTooltip',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data.GlPrevYear !== '' ? (
                  <img
                    src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                      params.data.GlPrevYear
                    )}`}
                    title={params.data.GlPrevYearTooltip}
                    style={{ height: '22px', marginRight: '5px' }}
                    alt='flag'
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
        ],
      },
    ];
  }
  // if props.issuerCompanyProfile show header US% FOR section
  function getProposalList_US_PerFORsectionColumn() {
    return [
      {
        headerName:
          props.issuerCompanyProfile !== undefined
            ? `${props.issuerCompanyProfile.country} % FOR`
            : '',
        children: [
          {
            headerName: currentYearCalculation(),
            field: 'currentMeetingDateYear',
            minWidth: 70,
            maxWidth: 70,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.Chg,
            field: 'ChgTooltip',
            minWidth: 50,
            maxWidth: 50,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            cellRendererFramework: (params) => (
              <div>
                {params.data.Chg !== '' ? (
                  <img
                    src={`${ICON_IMAGE_PATH}${NameToImageIcon(
                      params.data.Chg
                    )}`}
                    title={params.data.ChgTooltip}
                    style={{ height: '22px', marginRight: '5px' }}
                    alt='flag'
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
        ],
      },
    ];
  }

  const gridOptionsProposalList = {
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.No,
            field: 'No',
            type: ['autoHeightTrue'],
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 55,
            maxWidth: 55,
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.ProposalDetail,
            field: 'ProposalDetailCombo',
            minWidth: query.print ? 200 : 280,
            maxWidth: query.print ? 200 : null,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            type: ['autoHeightTrue', 'hiddenField'],
            cellRenderer(params) {
              const proposal_typeVal = params.data.proposal_type;
              let div = '<div>';
              div += `<span>${params.data.ProposalDetail}</span>`;
              if (proposal_typeVal !== null && proposal_typeVal !== '') {
                div += `<br/><span style="color: grey;">${proposal_typeVal}</span>`;
              }
              div += '</div>';
              return div;
            },
          },
          {
            headerName:
              props.getProposalListHeading !== undefined &&
              props.getProposalListHeading.ProposalDetail,
            field: 'ProposalDetail',
            minWidth: query.print ? 200 : 280,
            maxWidth: query.print ? 200 : null,
            cellClass: props.TrialUser
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            type: ['autoHeightTrue'],
          },
          {
            headerName: 'Voting Details',
            field: 'proposal_id',
            minWidth: query.print ? 130 : 120,
            maxWidth: query.print ? 130 : 120,
            type:
              !query.print && selectedProposal === undefined
                ? ['autoHeightTrue', 'nonHiddenField']
                : ['hiddenField'],
            cellRendererFramework: (params) => (
              <button
                type='button'
                className='btn btn-sm btn-primary'
                onClick={() => {
                  toggleTrueFalse();
                  if (props.listVotingOwnershipForProposalReq !== undefined) {
                    props.listVotingOwnershipForProposalReq({
                      meeting_id: query.meetingid,
                      proposal_id: params.data.proposal_id,
                    });
                  }
                  if (props.get_OtherBoardsReq !== undefined) {
                    props.get_OtherBoardsReq({
                      proposal_id: params.data.proposal_id,
                    });
                  }
                  if (props.getVotingData_rationaleReq !== undefined) {
                    props.getVotingData_rationaleReq({
                      meeting_id: query.meetingid,
                      proposal_id: params.data.proposal_id,
                    });
                  }
                  if (
                    props.listVotingAndOwnerhipForProposal_insightiaReq !==
                    undefined
                  ) {
                    props.listVotingAndOwnerhipForProposal_insightiaReq({
                      meeting_id: query.meetingid,
                      proposal_id: params.data.proposal_id,
                      prev_meeting_id: params.data.prev_meeting_id,
                      prev_proposal_id: params.data.prev_proposal_id,
                      vote_type: params.data.MRec,
                    });
                  }
                  props.getNoActionLetterProposalDetailReq !== undefined &&
                    props.getNoActionLetterProposalDetailReq(
                      params.data.proposal_id
                    );
                  setSelectedProposal(params.rowIndex);
                }}
              >
                More Details
              </button>
            ),
          },
        ],
      },
      ...getProposalListColumns(
        props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.isPreMeeting
      ),
      ...getProposalList_US_PerFORsectionColumn(),
      ...getProposalList_ISSsectionColumn(),
      ...getProposalList_GLsectionColumn(),
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'No',
          pinned: 'left',
        },
        {
          colId: 'ProposalDetailCombo',
          pinned: 'left',
        },
        {
          colId: 'ProposalDetail',
          pinned: 'left',
        },
        {
          colId: 'proposal_id',
          pinned: 'left',
        },
      ],
    },
    showColumns: {
      btnName: 'Show Proposal Type',
      columns: [
        {
          colId: 'ProposalDetailCombo',
          hide: true,
        },
        {
          colId: 'ProposalDetail',
          hide: false,
        },
      ],
    },
    hideColumns: {
      btnName: 'Hide Proposal Type',
      columns: [
        {
          colId: 'ProposalDetailCombo',
          hide: false,
        },
        {
          colId: 'ProposalDetail',
          hide: true,
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    rowSelection: 'single',
    isfloatingFilter: false,
    rowData:
      selectedProposal !== undefined
        ? [
            {
              ...props.getProposalList[selectedProposal],
            },
          ]
        : props.getProposalList,
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isHeaderChildren: true,
      groupHeaderHeight: null,
    },
  };
  // #endregion

  const gridOptionsProposalListMeetingTypeId5 = {
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.No,
        field: 'proposal_number_orig',
        maxWidth: 60,
        minWidth: 60,
        cellStyle(params) {
          if (params.data.section === 'heading') {
            return { 'font-weight': '700' };
          }
        },
        colSpan(params) {
          if (params.data.section === 'heading') {
            return 11;
          }
        },
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.Proposal,
        field: 'proposal_detail',
      },
      {
        headerName: 'Voting Details',
        field: 'proposal_id',
        minWidth: query.print ? 130 : 120,
        maxWidth: query.print ? 130 : 120,
        type:
          !query.print && selectedProposal === undefined
            ? ['autoHeightTrue', 'nonHiddenField']
            : ['hiddenField'],
        cellRendererFramework: (params) => {
          if (params.data.section !== 'heading') {
            return (
              <button
                type='button'
                className='btn btn-sm btn-primary'
                onClick={() => {
                  toggleTrueFalse();
                  if (props.listVotingOwnershipForProposalReq !== undefined) {
                    props.listVotingOwnershipForProposalReq({
                      meeting_id: query.meetingid,
                      proposal_id: params.data.proposal_id,
                    });
                  }
                  if (props.get_OtherBoardsReq !== undefined) {
                    props.get_OtherBoardsReq({
                      proposal_id: params.data.proposal_id,
                    });
                  }
                  if (props.getVotingData_rationaleReq !== undefined) {
                    props.getVotingData_rationaleReq({
                      meeting_id: query.meetingid,
                      proposal_id: params.data.proposal_id,
                    });
                  }
                  if (
                    props.listVotingAndOwnerhipForProposal_insightiaReq !==
                    undefined
                  ) {
                    props.listVotingAndOwnerhipForProposal_insightiaReq({
                      meeting_id: query.meetingid,
                      proposal_id: params.data.proposal_id,
                      prev_meeting_id: params.data.prev_meeting_id,
                      prev_proposal_id: params.data.prev_proposal_id,
                      vote_type: params.data.MRec,
                    });
                  }
                  props.getNoActionLetterProposalDetailReq !== undefined &&
                    props.getNoActionLetterProposalDetailReq(
                      params.data.proposal_id
                    );
                  setSelectedProposal(params.rowIndex);
                }}
              >
                More Details
              </button>
            );
          }
          return '';
        },
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.Spnsr,
        field: 'Sponsor',
        maxWidth: 60,
        minWidth: 60,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.ProposalDetail,
        field: 'proposal_type',
        maxWidth: 270,
        minWidth: 270,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.ISS,
        field: 'ISS',
        maxWidth: 80,
        minWidth: 80,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.GL,
        field: 'GL',
        maxWidth: 80,
        minWidth: 80,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.For,
        field: 'votes_for',
        maxWidth: 80,
        minWidth: 80,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.Agt,
        field: 'votes_against',
        maxWidth: 80,
        minWidth: 80,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.Abs,
        field: 'votes_abstained',
        maxWidth: 80,
        minWidth: 80,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading['W/H'],
        field: 'votes_withheld',
        maxWidth: 80,
        minWidth: 80,
      },
      {
        headerName:
          props.getProposalListHeading !== undefined &&
          props.getProposalListHeading.Total,
        field: 'total_votes',
        maxWidth: 90,
        minWidth: 90,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData:
      selectedProposal !== undefined
        ? [
            {
              ...props.getProposalList[selectedProposal],
            },
          ]
        : props.getProposalList,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'proposal_number_orig',
          pinned: 'left',
        },
        {
          colId: 'proposal_detail',
          pinned: 'left',
        },
        {
          colId: 'proposal_id',
          pinned: 'left',
        },
      ],
    },
  };

  // PVARecommendation Table
  const gridOptionsPVARecommendation = {
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Proxy Voting Adviser',
        field: 'pva',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Rec',
        field: 'recommendation',
      },
      {
        headerName: '% ISC Autovoted',
        field: 'autovote',

        cellRendererFramework: (params) => (
          <div>{checkValuesToFixed(params.data.autovote, 1)}</div>
        ),
      },
      {
        headerName: 'V Frequent (99%+)',
        field: 'veryfrequent_pcent',

        cellRendererFramework: (params) => (
          <div>{checkValuesToFixed(params.data.veryfrequent_pcent, 1)}</div>
        ),
      },
      {
        headerName: 'Frequent (95%)',
        field: 'frequent_pcent',

        cellRendererFramework: (params) => (
          <div>{checkValuesToFixed(params.data.frequent_pcent, 1)}</div>
        ),
      },
      {
        headerName: 'Mostly (90%)',
        field: 'mostly_pcent',

        cellRendererFramework: (params) => (
          <div>{checkValuesToFixed(params.data.mostly_pcent, 1)}</div>
        ),
      },
      {
        headerName: 'Many (80%)',
        field: 'many_pcent',

        cellRendererFramework: (params) => (
          <div>{checkValuesToFixed(params.data.many_pcent, 1)}</div>
        ),
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    headerHeight: 50,
    paggination: { isPagging: false, pageSize: 10 },
    rowSelection: 'single',
    isfloatingFilter: false,
    rowData:
      props.listVotingOwnershipForProposal_v2 !== undefined &&
      props.listVotingOwnershipForProposal_v2.map((x) => ({
        ...x,
        TrialStatus: props.TrialUser,
        allowDownload: props.allowDownload,
      })),
  };

  // Other Boards
  const gridOptionsOtherBoards = {
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'Company_name',
      },
      {
        headerName: 'Appointed',
        field: 'appointed',
        cellRendererFramework: (params) => <div>{params.data.appointed}</div>,
      },
      {
        headerName: 'Position',
        field: 'Position',
      },
      {
        headerName: 'Last Meeting',
        field: 'meeting_date',
        ...gridWidthDates,
      },
      {
        headerName: '% For',
        field: 'for_pcent_for_agt',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    rowSelection: 'single',
    isfloatingFilter: false,
    rowData:
      props.get_OtherBoards !== undefined &&
      props.get_OtherBoards.map((x) => ({
        ...x,
        meeting_date:
          x.meeting_date !== null
            ? dateToNull(x.meeting_date, 'dd-mmm-yy', true)
            : '',
        for_pcent_for_agt:
          x.for_pcent_for_agt !== null
            ? checkValuesToFixed(x.for_pcent_for_agt)
            : '',
        TrialStatus: props.TrialUser,
        allowDownload: props.allowDownload,
      })),
  };

  // Voting Rationale
  const gridOptionsVotingRationale = {
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Voting Manager',
        field: 'manager',
        minWidth: 260,
        maxWidth: 300,
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Vote Cast',
        field: 'vote_cast',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Rationale',
        field: 'vote_reason',
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'manager',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 15 },
    rowSelection: 'single',
    isfloatingFilter: false,
    quickSearchFilter: true,
    rowData:
      props.getVotingData_rationale !== undefined &&
      props.getVotingData_rationale.map((x) => ({
        ...x,
        TrialStatus: props.TrialUser,
        allowDownload: props.allowDownload,
      })),
  };

  // masterdetail version of All Votings Table
  const gridOptionsAllVoting = {
    masterDetail: true,
    quickSearchFilter: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Fund',
            field: 'fund_name',
            flex: 2,
          },
          {
            headerName:
              props.selectedMeetingDateOnly !== undefined
                ? `Vote ${props.selectedMeetingDateOnly.substr(6, 10)}`
                : 'Vote -',
            field: 'vote',
            cellRendererFramework: (params) => {
              if (params.data !== undefined) {
                return (
                  <div>
                    {params.data.vote !== null ? (
                      <div>{params.data.vote}</div>
                    ) : (
                      ''
                    )}
                    {params.data.Vote !== null ? (
                      <div>{params.data.Vote}</div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              }
              return '';
            },
          },
          {
            headerName:
              props.selectedMeetingDateOnly !== undefined
                ? `Vote ${
                    Number(props.selectedMeetingDateOnly.substr(6, 10)) - 1
                  }`
                : 'Vote -',
            field: 'prev_vote_cast',
            cellRendererFramework: (params) => {
              if (params.data !== undefined) {
                return (
                  <div>
                    {params.data.prev_vote !== null ? (
                      <div>{params.data.prev_vote}</div>
                    ) : (
                      ''
                    )}
                    {params.data.prev_Vote !== null ? (
                      <div>{params.data.prev_Vote}</div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              }
              return '';
            },
          },
        ],
      },
      getDetailRowData(params) {
        params.successCallback(params.data.fund_name);
      },
    },
    isRowMaster(dataItem) {
      if (dataItem) {
        if (dataItem.fund_name !== undefined && dataItem.fund_name.length > 0) {
          if (
            dataItem.fund_name.length === 1 &&
            dataItem.fund_name[0].fund_name === null
          ) {
            return false;
          }
          return true;
        }
      }
      return false;
    },
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: 'Voting Manager',
        field: 'investor_name',
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 220,
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        getQuickFilterText: (params) => params.data.investor_name,
      },
      {
        headerName: 'Policy',
        field: 'Voting_Policy_Summary',
        cellRendererFramework: (params) => {
          if (params.data !== undefined) {
            return (
              <div>
                {params.data.Voting_Policy_Summary !== null ? (
                  <div>
                    <a
                      href={`${DOCS_INSIGHTIA_REDLINE_REPORTS}${params.data.Policy_Download}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='link-secondary m-1'
                    >
                      {params.data.Voting_Policy_Summary}
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            );
          }
          return '';
        },
      },
      {
        headerName: 'Proxy Adviser',
        field: 'PVA',
        cellClass: props.TrialUser
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
      },
      {
        headerName: '% Dec ',
        field: 'owns_pcent',
      },
      {
        headerName: 'vs Prev Year',
        field: 'owns_pcent_pq',
      },
      {
        headerName:
          props.selectedMeetingDateOnly !== undefined
            ? `Vote ${props.selectedMeetingDateOnly.substr(6, 10)}`
            : 'Vote -',
        field: 'Vote',
      },
      {
        headerName:
          props.selectedMeetingDateOnly !== undefined
            ? `Vote ${Number(props.selectedMeetingDateOnly.substr(6, 10)) - 1}`
            : 'Vote -',
        field: 'prev_Vote',
      },
      {
        headerName:
          props.selectedMeetingDateOnly !== undefined
            ? `Avg ${props.vote_type} ${
                props.issuerCompanyProfile !== undefined &&
                props.issuerCompanyProfile.country
              } % ${props.selectedMeetingDateOnly.substr(6, 10)}`
            : 'Avg -',
        field: 'avg_for',
      },
      {
        headerName:
          props.selectedMeetingDateOnly !== undefined
            ? `Avg ${props.vote_type} ${
                props.issuerCompanyProfile !== undefined &&
                props.issuerCompanyProfile.country
              } % ${Number(props.selectedMeetingDateOnly.substr(6, 10)) - 1}`
            : 'Avg -',
        field: 'avg_for_prev',
      },
      {
        headerName: '% ISS (For)',
        field: 'ISS_match',
      },
      {
        headerName: '% GL (For)',
        field: 'GL_match',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'Voting Manager',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: true, pageSize: 10 },
    isfloatingFilter: false,
    rowData:
      props.listVotingAndOwnerhipForProposal_insightia !== undefined &&
      props.listVotingAndOwnerhipForProposal_insightia.map((x) => ({
        ...x,
        owns_pcent:
          x.owns_pcent !== null ? checkValuesToFixed(x.owns_pcent, 1) : '',
        owns_pcent_pq:
          x.owns_pcent_pq !== null
            ? checkValuesToFixed(x.owns_pcent_pq, 1)
            : '',
        Vote: x.Vote !== null ? checkValuesToFixed(x.Vote, 1) : '',
        prev_Vote:
          x.prev_Vote !== null ? checkValuesToFixed(x.prev_Vote, 1) : '',
        avg_for: x.avg_for !== null ? checkValuesToFixed(x.avg_for, 1) : '',
        avg_for_prev:
          x.avg_for_prev !== null ? checkValuesToFixed(x.avg_for_prev, 1) : '',
        ISS_match:
          x.ISS_match !== null ? checkValuesToFixed(x.ISS_match, 1) : '',
        GL_match: x.GL_match !== null ? checkValuesToFixed(x.GL_match, 1) : '',
        TrialStatus: props.TrialUser,
        allowDownload: props.allowDownload,
      })),
  };

  useEffect(() => {
    if (!props.loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.loadingData]);

  React.useEffect(() => {
    if (!props.loadingData) {
      const dataHyperlink = [];
      if (props.meetingSECURL !== undefined && props.meetingSECURL !== null) {
        dataHyperlink.push({
          text: 'Meeting Proxy Statement (filed with SEC)',
          link: props.meetingSECURL,
        });
      }
      if (
        props.meetingResultURL !== undefined &&
        props.meetingResultURL !== null
      ) {
        dataHyperlink.push({
          text: 'Meeting Vote Results (original document)',
          link: props.meetingResultURL,
        });
      }

      let meetingType = '';
      if (
        props.selectedMeetingDates !== undefined &&
        props.selectedMeetingDates !== null
      ) {
        const splitWord = props.selectedMeetingDates.label.split(' (');
        meetingType = splitWord[1].substr(0, splitWord[1].length - 1);
      }

      const title =
        props.issuerCompanyProfile !== undefined
          ? props.issuerCompanyProfile.Company_name !== undefined
            ? props.issuerCompanyProfile.Company_name
            : ''
          : '';

      const allxls = [
        {
          type: 'header',
          title: title,
        },
        {
          type: 'label',
          data: [
            {
              label: 'Meeting Date:',
              value: props.selectedMeetingDateOnly,
            },
            {
              label: 'Meeting Type:',
              value: meetingType,
            },
          ],
        },
        {
          type: 'table',
          data: gridOptionsIssuerMeetingStatsList.rowData,
          colDef: gridOptionsIssuerMeetingStatsList.colDefsMedalsIncluded,
        },
        {
          type: 'hyperlink',
          data: dataHyperlink,
        },
        {
          type: 'header',
          title: 'Proposal Detail',
        },
        {
          type: 'table',
          data: props.tableMeetingTypeId_5
            ? gridOptionsProposalListMeetingTypeId5.rowData
            : gridOptionsProposalList.rowData,
          colDef: props.tableMeetingTypeId_5
            ? gridOptionsProposalListMeetingTypeId5.colDefsMedalsIncluded
            : gridOptionsProposalList.colDefsMedalsIncluded,
          excludeCol: ['proposal_id'],
        },
      ];

      setDownloadAllXLSJson(allxls);
    }
  }, [props.meetingSECURL, props.loadingData]);

  useEffect(() => {
    if (!props.loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, [1000]);
    }
  }, [props.loadingData]);

  return (
    <Page {...props} key={1} className={bem.b('pb-2 pt-3')}>
      <div id='loadItem'>
        <div className='row float-end'>
          <button
            type='button'
            className='btn btn-link cursor-pointer'
            disabled={props.loadingData}
            title='Download all to xls'
            onClick={() =>
              downloadAllExcelByJsonFn(
                downloadAllXLSJson,
                'VotingOverview',
                `${title}_VotingOverview`
              )
            }
          >
            <u>Download all to xls</u>
          </button>
        </div>

        <div className='row'>
          <div className='col-md-4 col-sm-12'>
            <DropdownList
              handleChange={(e) => {
                if (e !== null) {
                  props.handleResetLoading();
                  toggleTrueFalse(false);
                  props.handleSetDdlMeetingDate(e);
                  props.history.push({
                    pathname: pathConst.VOTING_OVERVIEW,
                    search: `${QUERY_MEETING}${e.value}`,
                  });
                }
              }}
              isMulti={false}
              options={props.listMeetingDatesOverview}
              Dvalue={props.selectedMeetingDates}
              disabled={
                props.loadingData ? true : props.TrialUserDisableDownload
              }
            />
          </div>
        </div>

        <div>
          {props.loadingData ? (
            messageConst.LOADING
          ) : (
            <div>
              <div className='row'>
                {props.issuerMeetingStatsList.length > 0 ? (
                  <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                    <ErrorBoundary hasCard cardtitle='Meeting'>
                      <Table
                        pageTitle={title}
                        title='Meeting'
                        smalltitle=''
                        gridOptions={gridOptionsIssuerMeetingStatsList}
                        addedClass='pb-5'
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  </div>
                ) : null}
                {props.getProposalListChart.length > 0 ? (
                  <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 chart'>
                    <D3barchart
                      style={{ height: '480px' }}
                      isDummyData={props.TrialStatus}
                      smalltitle={
                        title !== undefined ? (
                          <div className='h3'>
                            {title} Voting vs{' '}
                            {props.issuerCompanyProfile !== undefined &&
                            props.issuerCompanyProfile.country !== undefined
                              ? props.issuerCompanyProfile.country
                              : ''}{' '}
                            Average Votes
                          </div>
                        ) : (
                          ''
                        )
                      }
                      title=''
                      data={props.getProposalListChart}
                      keys={['value']}
                      dataLegends={['+ Value', '- Value']}
                      xkeysLabel={['label']}
                      yAxisTitle='% Support'
                      adjustSize
                      svgHeight='350'
                      svgWidth='600'
                      TrialUser={props.TrialUser}
                    />
                  </div>
                ) : null}
              </div>

              <div className='row p-1 pdfpagebreak'>
                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                  <div className='m-1'>
                    {props.meetingSECURL !== undefined &&
                      props.meetingSECURL !== null && (
                        <a
                          href={props.meetingSECURL}
                          Target='_blank'
                          className='link-primary m-1'
                        >
                          Meeting Proxy Statement (filed with SEC)
                        </a>
                      )}

                    {props.meetingResultURL !== undefined &&
                      props.meetingResultURL !== null && (
                        <a
                          href={props.meetingResultURL}
                          Target='_blank'
                          className='link-primary m-1'
                        >
                          Meeting Vote Results (original document)
                        </a>
                      )}
                  </div>
                </div>
              </div>

              {/* Proposal Details Table */}
              <div className='cr-myCard card'>
                <div className='d-inline-block divTitle'>
                  <div className='titleSelection'>
                    <h2> Proposal Detail</h2>
                  </div>
                </div>

                {showIsShareClasses ? (
                  <div className='col-md-12 col-12'>
                    <button
                      type='button'
                      status={Number(btnadjustment)}
                      className='votingDualClassBtn btn btn-primary'
                      onClick={async (e) => {
                        e.preventDefault();
                        await props.listMeetingDatesOverviewReq({
                          meetingId: query.meetingid,
                          set_adjustment: Number(btnadjustment),
                        });
                        setbtnAdjustment(!btnadjustment);
                      }}
                    >
                      {!btnadjustment
                        ? 'Show Dual Class Shares'
                        : 'Remove Dual Class Shares'}
                    </button>
                  </div>
                ) : null}

                {props.getProposalListHeading !== undefined &&
                props.getProposalListHeading &&
                gridOptionsProposalListMeetingTypeId5.rowData.length > 0 ? (
                  props.tableMeetingTypeId_5 ? (
                    <div className='card-body'>
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          title='Proposal detail'
                          gridOptions={gridOptionsProposalListMeetingTypeId5}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        />
                      </ErrorBoundary>
                    </div>
                  ) : (
                    <div className='card-body'>
                      {props.getProposalList.length > 0 ? (
                        <>
                          <Table
                            title='Proposal detail'
                            pageTitle='Proposal detail'
                            IsShowCard={false}
                            gridOptions={gridOptionsProposalList}
                            hideExcelDownloadIcon={
                              props.TrialUserDisableDownload
                            }
                          />
                        </>
                      ) : null}
                    </div>
                  )
                ) : null}
              </div>

              {isToggled && props.listVotingOwnershipForProposalReq ? (
                <>
                  <div className='row'>
                    <div>
                      <button
                        type='button'
                        className='btn-sm btn-primary mt-3 mb-3 me-2 float-end'
                        onClick={() => toggleTrueFalse()}
                      >
                        Close Proposal Details
                      </button>
                    </div>

                    {props.noActionLetterProposalDetailList !== undefined &&
                    props.noActionLetterProposalDetailList !== null &&
                    Object.keys(props.noActionLetterProposalDetailList).length >
                      0 ? (
                      <ErrorBoundary hasCard cardtitle='PVA Recommendation'>
                        <VotingNoActionLetterProposalDetail
                          loadingData={props.loadingData}
                          noActionLetterProposalDetailList={
                            props.noActionLetterProposalDetailList
                          }
                        />
                      </ErrorBoundary>
                    ) : null}

                    {props.listVotingOwnershipForProposal_v2.length > 0 ? (
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                        <ErrorBoundary hasCard cardtitle='PVA Recommendation'>
                          <Table
                            title='PVA Recommendation'
                            pageTitle='PVA Recommendation'
                            gridOptions={gridOptionsPVARecommendation}
                            hideExcelDownloadIcon={
                              props.TrialUserDisableDownload
                            }
                            isHeaderInfoTooltip={
                              tooltipConst.VOTING_OVERVIEW_PVA_RECOMM_TOOLTIP
                            }
                          />
                        </ErrorBoundary>
                      </div>
                    ) : null}
                    {props.get_OtherBoards.length > 0 ? (
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6'>
                        <ErrorBoundary hasCard cardtitle='Other Boards'>
                          <Table
                            title='Other Boards'
                            pageTitle='Other Boards'
                            gridOptions={gridOptionsOtherBoards}
                            hideExcelDownloadIcon={
                              props.TrialUserDisableDownload
                            }
                          />
                        </ErrorBoundary>
                      </div>
                    ) : null}
                    {props.getVotingData_rationale.length > 0 ? (
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3 mt-1'>
                        <CollapseComponent
                          Heading='Voting Rationale'
                          index='1'
                          isCardStyle
                          isOpen
                        >
                          <ErrorBoundary>
                            <Table
                              title='Voting Rationale'
                              pageTitle='Voting Rationale'
                              gridOptions={gridOptionsVotingRationale}
                              IsShowCard={false}
                              hideExcelDownloadIcon={
                                props.TrialUserDisableDownload
                              }
                            />
                          </ErrorBoundary>
                        </CollapseComponent>
                      </div>
                    ) : null}
                  </div>

                  {props.listVotingAndOwnerhipForProposal_insightia.length >
                  0 ? (
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 pt-1'>
                      <ErrorBoundary hasCard cardtitle='All Voting'>
                        <Table
                          title='All Voting'
                          pageTitle='All Voting'
                          gridOptions={gridOptionsAllVoting}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        />
                      </ErrorBoundary>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(VotingOverview));
