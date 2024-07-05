import React from 'react';
import { withRouter } from 'react-router';
import '../../../styles/components/_popupTrialUser.scss';
import qs from 'qs';
import { NORECORDS } from '../../../../constants/MessageConstans';
import {
  filters,
  ChangeName,
  NameToImageIcon,
} from '../../../../utils/AgGridFunctions';
import { checkValuesToFixed } from '../../../../utils/table-tools-util';
import Card from '../../../GeneralForm/Card';
import Table from '../../../GeneralForm/Table';
import pathConst, {
  ADVISOR_VOTING_OVERVIEW,
  ICON_IMAGE_PATH,
  QUERY_COMPANY_ID,
  QUERY_MEETING,
  TOOLMENU,
} from '../../../../constants/PathsConstant';
import CustomToolTipHeader from '../../../GeneralForm/CustomToolTipHeader';
import { dateToNull } from '../../../../utils/general-util';
import Progressbar from '../../../GeneralForm/ProgressBar';
import { DATE_FORMATE } from '../../../../constants/GeneralConstant';
import ErrorBoundary from '../../../GeneralForm/ErrorBoundary';

const NoActionLetterComponent = (props) => {
  const OUTCOME_FIELDS_ANALYSIS = 1;
  const linkStatus = props.location.pathname.includes(TOOLMENU);
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  function getImageName(key) {
    const newkey = key !== null && key !== undefined ? key.toLowerCase() : key;
    switch (newkey) {
      case 'for':
        return 'GreenYes.png';
      case 'against':
        return 'RedCross.png';
      case 'withhold':
        return 'RedCross.png';
      case 'dnv':
        return 'RedCrclWithLine.png';
      case 'abstain':
        return 'OrangeCross.png';
      case 'legend':
        return '';
      default:
        return 'deskIcon.png';
    }
  }

  const handleChangePropentName = async (e) => {
    const Value = [];
    const option = undefined;
    if (props.DDLProponent !== undefined) {
      props.DDLProponent.forEach((x) => {
        if (x.label === e[0]) {
          if (x !== undefined) {
            Value.push(x);
          }
        }
      });
      props.handleIndividualProponentSelection_v2(Value);
      props.onSearch(Value[0], option);
    }
    props.handleOutcomeFieldsChecked(OUTCOME_FIELDS_ANALYSIS);
  };
  const handleChangeShareHolder = async (e) => {
    let optionData;
    const Value = undefined;
    const myJson = [];
    props.DDLShareholderProposalCategory.forEach((x) => {
      const prntNode = [];
      x.children.forEach((y) => {
        const subNode = [];
        y.children.forEach((c) => {
          const chldrnNode = [];
          c.children.forEach((d) => {
            if (d.label === e) {
              optionData = d.value;
              chldrnNode.push({ ...d, checked: true });
            } else {
              chldrnNode.push({ ...d, checked: false });
            }
          });
          subNode.push({ ...c, children: chldrnNode, checked: false });
        });
        prntNode.push({ ...y, children: subNode, checked: false });
      });
      myJson.push({ ...x, children: prntNode, checked: false });
    });

    await props.handleShareHolderProposalType_v2(myJson);
    props.onSearch(Value, optionData);
    props.handleOutcomeFieldsChecked(OUTCOME_FIELDS_ANALYSIS);
  };

  function getProponentName(params) {
    const eDiv = document.createElement('div');
    const arrayIds =
      params.data !== undefined &&
      params.data !== null &&
      params.data.proponent_names.split('#| ').filter((item) => item);
    const val = 1;

    arrayIds.forEach((d, i) => {
      let invArrVal;
      if (
        props.includeLawyerColumn !== undefined &&
        props.includeLawyerColumn === true
      ) {
        invArrVal =
          params.data !== undefined &&
          params.data !== null &&
          params.data.investor_ids !== undefined &&
          params.data.investor_ids !== null &&
          params.data.investor_ids.split(',');
      } else {
        invArrVal =
          params.data !== undefined &&
          params.data !== null &&
          params.data.investor_ids !== undefined &&
          params.data.investor_ids !== null &&
          params.data.investor_ids.split(',');
      }
      if (invArrVal === undefined && invArrVal[i] === undefined) {
        eDiv.innerHTML = '';
      } else {
        const hrefVal = `${pathConst.INVESTOR_VOTING_OVERVIEW}${
          pathConst.QUERY_INVESTOR
        }${
          invArrVal !== undefined && invArrVal[i] !== undefined
            ? invArrVal[i].trim()
            : ''
        }`;

        eDiv.innerHTML += `<a rel="noopener noreferrer" target="_blank" class="text-secondary" href="${hrefVal}">
              ${d}${invArrVal.length === i + val ? '' : ' ,'}
        </a>`;
      }
    });
    return eDiv;
  }

  const propentCellRender = (params) => {
    if (!linkStatus) {
      if (
        params.data.proponent_names !== undefined &&
        params.data.proponent_names !== null &&
        params.data.proponent_names !== ''
      ) {
        return getProponentName(params);
      }
    } else {
      const str = params.data !== undefined && params.data.proponent_names;
      const val = str.split('#|');
      const eDiv = document.createElement('div');
      eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${val.filter(
        (c) => c
      )}</span>`;
      const eButton = eDiv.querySelectorAll('.btn-simple')[0];
      eButton.addEventListener('click', async () => {
        await handleChangePropentName(val.filter((c) => c));
      });
      return eDiv;
    }
  };
  const shareholderCellRender = (params) => {
    if (!linkStatus) {
      if (
        params.data.proposal_type !== null &&
        params.data.proposal_type !== ''
      ) {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = `<span>${params.data.proposal_type}</span>`;
        return eDiv;
      }
    } else {
      const eDiv = document.createElement('div');
      eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.data.proposal_type}</span>`;
      const eButton = eDiv.querySelectorAll('.btn-simple')[0];
      eButton.addEventListener('click', async () => {
        await handleChangeShareHolder(params.data.proposal_type);
      });
      return eDiv;
    }
  };

  function proponentNameWidthFn() {
    if (!query.print) {
      return {
        minWidth: 200,
        maxWidth: null,
      };
    }
    if (props.includeCompanyColumn && props.includeLawyerColumn) {
      return {
        minWidth: 100,
        maxWidth: 100,
      };
    }
    if (!props.includeCompanyColumn && !props.includeLawyerColumn) {
      return {
        minWidth: 230,
        maxWidth: 230,
      };
    }
    if (!props.includeCompanyColumn) {
      return {
        minWidth: 160,
        maxWidth: 160,
      };
    }
    if (!props.includeLawyerColumn) {
      return {
        minWidth: 170,
        maxWidth: 170,
      };
    }
  }

  // includeCompanyColumn , includeLawyerColumn
  const gridOptionsnoActionLettersList = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Decision Date',
        field: 'Decision_date',
        minWidth: 75,
        maxWidth: 75,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 dateFormat ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 dateFormat ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) =>
          dateToNull(params.data.Decision_date, DATE_FORMATE, true),
      },
      {
        headerName: 'Company',
        field: 'Company_name',
        type: props.includeCompanyColumn
          ? ['nonHiddenField', 'autoHeightTrue']
          : ['hiddenField', 'autoHeightTrue'],
        minWidth: query.print ? 60 : 100,
        maxWidth: query.print ? 60 : 150,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
        cellRenderer: (params) => {
          if (
            params.data.Company_name !== null &&
            params.data.Company_name !== ''
          ) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.VOTING_NOACTIONLETTER}${QUERY_MEETING}${params.data.meeting_id}">
                  ${params.data.Company_name}</a>`;
            return eDiv;
          }
        },
      },
      {
        headerName: 'Proponent Name',
        field: 'proponent_names',
        type: ['autoHeightTrue'],
        ...proponentNameWidthFn(),
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
        cellRenderer: (params) =>
          params.data.proponent_names !== undefined &&
          params.data.proponent_names !== null &&
          params.data.proponent_names !== ''
            ? propentCellRender(params)
            : '',
      },
      {
        headerName: 'Proposal Type',
        field: 'proposal_type',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 80 : 100,
        maxWidth: query.print ? 80 : 150,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
        cellRenderer: (params) => shareholderCellRender(params),
      },
      {
        headerName: 'Proposal Detail',
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 80 : 100,
        maxWidth: query.print ? 80 : 150,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Outcome',
        field: 'outcome',
        minWidth: 60,
        maxWidth: 60,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) =>
          NameToImageIcon(params.data.outcome) !== '' && (
            <img
              title={params.data.outcome}
              src={`${ICON_IMAGE_PATH}${NameToImageIcon(params.data.outcome)}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
          ),
      },
      {
        headerName: 'Vote Date',
        field: 'vote_date',
        minWidth: 75,
        maxWidth: 75,
        type: ['dateColumn'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 dateFormat ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 dateFormat ps-1 pe-1 font-size-small',
        cellRendererFramework: (params) =>
          dateToNull(params.data.vote_date, DATE_FORMATE, true),
      },
      {
        headerName: 'SEC Rule',
        field: 'no_actionrules',
        type: ['autoHeightTrue'],
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
      },
      {
        headerName: 'Company Legal Representation',
        field: 'issuer_legal_representation',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 100 : 100,
        maxWidth: query.print ? 100 : 120,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRenderer: (params) => {
          if (
            params.data.issuer_legal_representation !== null &&
            params.data.issuer_legal_representation !== ''
          ) {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<a class="text-secondary" target="_blank"
                    href="${window.location.protocol}//${window.location.host}${ADVISOR_VOTING_OVERVIEW}${QUERY_COMPANY_ID}${params.data.company_id}">
                    ${params.data.issuer_legal_representation}</a>`;
            return eDiv;
          }
        },
      },
      {
        headerName: 'Lawyer',
        field: 'Lawyer',
        type: props.includeLawyerColumn
          ? ['nonHiddenField', 'autoHeightTrue', 'setColumn']
          : ['hiddenField', 'autoHeightTrue', 'setColumn'],
        maxWidth: 70,
        minWidth: 70,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'For (%)',
        field: 'for_pcent_for_agt',
        minWidth: 50,
        maxWidth: 50,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
      },
      {
        headerName: 'ISS',
        field: 'iss_rec',
        headerComponentParams: {
          pcnt_tooltip: props.toolTip
            ? props.toolTip[0] !== undefined
              ? props.toolTip[0].client_facing_description
              : null
            : null,
        },
        minWidth: 50,
        maxWidth: 50,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) => (
          <div className='text-center'>
            <img
              title={params.data.iss_rec}
              src={`${ICON_IMAGE_PATH}${getImageName(params.data.iss_rec)}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
          </div>
        ),
      },
      {
        headerName: 'GL',
        field: 'GL_rec',
        minWidth: 50,
        maxWidth: 50,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) => (
          <div className='text-center'>
            <img
              title={params.data.GL_rec}
              src={`${ICON_IMAGE_PATH}${getImageName(params.data.GL_rec)}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
          </div>
        ),
      },
      {
        headerName: 'URL',
        field: 'URL',
        minWidth: query.print ? 110 : 50,
        maxWidth: query.print ? 110 : 50,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
        cellRendererFramework: (params) =>
          params.data.URL && params.data.URL !== '' ? (
            <a
              className='link-primary text-secondary'
              href={params.data.URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              View
            </a>
          ) : (
            params.data.SEC_link !== '' && (
              <a
                className='link-primary text-secondary'
                href={params.data.SEC_link}
                target='_blank'
                rel='noopener noreferrer'
              >
                View
              </a>
            )
          ),
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'proposal_number_orig',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: !query.print, pageSize: 10 },
    frameworkComponents: { agColumnHeader: CustomToolTipHeader },
    isfloatingFilter: false,
    columnWidth: 180,
    headerRowHeight: 50,
    rowData:
      props.noActionLettersList !== undefined &&
      props.noActionLettersList.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: props.allowDownload,
        outcome: ChangeName(x.outcome),
        URL: x.SEC_link !== undefined ? x.SEC_link : x.URL,
        for_pcent_for_agt: x.for_pcent_for_agt
          ? checkValuesToFixed(x.for_pcent_for_agt, 1)
          : '',
      })),
  };

  return (
    <div className='cr-NoActionLetterComponent pb-3 mt-3'>
      {!props.loadingDataNoactionLetters ? (
        props.procedureRunningEstimateTime !== undefined && (
          <Progressbar avgElapsedTime={props.procedureRunningEstimateTime} />
        )
      ) : (
        <>
          {props.noActionLettersList !== undefined &&
            (props.noActionLettersList.length > 0 ? (
              <ErrorBoundary hasCard cardtitle={props.cardTitle}>
                <Table
                  pageTitle={props.excelPageTitle}
                  title={props.cardTitle}
                  smalltitle=''
                  gridOptions={gridOptionsnoActionLettersList}
                  hideExcelDownloadIcon={props.TrialStatusDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              <Card title={props.cardTitle}>{NORECORDS}</Card>
            ))}
        </>
      )}
    </div>
  );
};

export default withRouter(React.memo(NoActionLetterComponent));
