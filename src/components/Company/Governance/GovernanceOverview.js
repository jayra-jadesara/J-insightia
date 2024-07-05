import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import '../../../styles/components/_popupTrialUser.scss';
import pathConst, { GREEN_FLAG_LARGE, ICON_IMAGE_PATH, RED_FLAG_LARGE } from '../../../constants/PathsConstant';
import Card from '../../GeneralForm/Card';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import { filters } from '../../../utils/AgGridFunctions';
import SearchInput from '../../GeneralForm/DropdownVirtualized';
import ProgressBar from '../../GeneralForm/ProgressBar';
import D3DoughnutChart from '../../GeneralForm/D3DoughnutChart';

import { toCapitaliseFirstCase } from '../../../utils/general-util';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const GovernanceOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const score =
    props.data_ChartInfo !== '' && props.data_ChartInfo !== null && props.data_ChartInfo !== undefined
      ? props.data_ChartInfo.split('\n')
      : '';

  if (!query.pid) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const selectionComparision =
    props.selection_ddlComparision.label !== undefined ? props.selection_ddlComparision.label : '';

  if (
    props.table_BoardandDirectors.length === numConst.NUMBER_ZERO &&
    props.table_Ownership.length === numConst.NUMBER_ZERO &&
    props.table_Stock &&
    props.table_Stock.length === numConst.NUMBER_ZERO
  ) {
    return <div className='px-3 pt-3'>{LOADING}</div>;
  }

  const gridOptionsBoardandDirectors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'Metric',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
      },
      {
        headerName: 'Detail',
        field: 'Detail',
        minWidth: 110,
        maxWidth: query.print ? 110 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Risk',
        field: 'flagColor',
        minWidth: 80,
        maxWidth: query.print ? 80 : 100,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext text-center ps-1 pe-1 pt-1'
          : 'ws-normal-lh24 text-center ps-1 pe-1 pt-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.flagColor === 'Green' && (
              <img alt='Info' className='smallIcon' src={`${window.location.origin}${GREEN_FLAG_LARGE}`} />
            )}
            {params.data.flagColor === 'Red' && (
              <img alt='Red' className='smallIcon' src={`${window.location.origin}${RED_FLAG_LARGE}`} />
            )}
          </div>
        ),
      },
      {
        headerName: 'Description',
        field: 'Descriptions',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 430,
        maxWidth: query.print ? 430 : null,
      },
      {
        headerName: 'Source',
        field: 'Source_text',
        type: ['autoHeightTrue'],
        minWidth: 120,
        maxWidth: 120,
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Comparison',
        field: 'Comparison',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
        cellRendererFramework: (params) => toCapitaliseFirstCase(params.data.Comparison),
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'Metric',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData: props.table_BoardandDirectors.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload,
    })),
  };

  const gridOptionsOwnership = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'Metric',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
        cellRenderer: (params) => {
          if (params.data.proposal_information !== '') {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span>${params.data.Metric}</span>
            <img alt='shpimage' title='${params.data.proposal_information}' className="smallIcon" src="${
              window.location.origin
            }${ICON_IMAGE_PATH}shpimage.png" />
            <img
                        alt="i-img"
                        title="${'Shareholder Proposals'}"
                        style="height: 16px"
                        className="ps-1"
                        src="${window.location.origin}${ICON_IMAGE_PATH}info.png"
                      />`;
            return eDiv;
          }
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span>${params.data.Metric}</span>`;
          return eDiv;
        },
      },
      {
        headerName: 'Detail',
        field: 'YesOrNo',
        type: ['autoHeightTrue'],
        minWidth: 110,
        maxWidth: 110,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Risk',
        field: 'flagColor',
        minWidth: 80,
        maxWidth: query.print ? 80 : 100,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext text-center ps-1 pe-1 pt-1'
          : 'ws-normal-lh24 text-center ps-1 pe-1 pt-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.flagColor === 'Green' && (
              <img alt='Info' className='smallIcon' src={`${window.location.origin}${GREEN_FLAG_LARGE}`} />
            )}
            {params.data.flagColor === 'Red' && (
              <img alt='Red' className='smallIcon' src={`${window.location.origin}${RED_FLAG_LARGE}`} />
            )}
          </div>
        ),
      },
      {
        headerName: 'Description',
        field: 'Descriptions',
        type: ['autoHeightTrue'],
        minWidth: 430,
        maxWidth: query.print ? 430 : null,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Source',
        field: 'source',
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 120,
        maxWidth: query.print ? 120 : 180,
        cellRendererFramework: (params) =>
          params.data.url !== '' ? (
            <a
              rel='noopener noreferrer'
              target='_blank'
              className='text-secondary text-decoration-none'
              href={params.data.url}
            >
              {params.data.source}
            </a>
          ) : (
            <span>{params.data.source}</span>
          ),
      },
      {
        headerName: 'Comparison',
        field: selectionComparision === 'S&P500' ? 'sp500%' : 'russel3000%',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 150,
        maxWidth: 150,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'Metric',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_Ownership.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload,
    })),
  };
  const gridOptionsStock = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Share Class',
        field: 'share_class',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 180,
        maxWidth: query.print ? 180 : null,
      },
      {
        headerName: 'Active',
        field: 'active',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 90,
        maxWidth: query.print ? 90 : null,
      },
      {
        headerName: 'Listed',
        field: 'Listed',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 80,
        maxWidth: query.print ? 80 : null,
      },
      {
        headerName: 'Exchange',
        field: 'Exchange',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 110 : null,
      },
      {
        headerName: 'Ticker',
        field: 'ticker',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 90,
        maxWidth: query.print ? 90 : null,
      },
      {
        headerName: 'Votes Per Share',
        field: 'votes_per_share',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
      },
      {
        headerName: 'Outstanding Shares',
        field: 'shares_outstanding',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
      },
      {
        headerName: 'Sunset Provision',
        field: 'Sunset_Provision',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: query.print ? 100 : null,
      },
      {
        headerName: 'Sunset Expiry',
        field: 'Sunset_Expiry',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span>${params.data.Sunset_Expiry !== '' ? params.data.Sunset_Expiry : '-'}</span>`;
          return eDiv;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'Metric',
          pinned: 'left',
        },
      ],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.table_Stock && props.table_Stock.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload,
    })),
  };

  function getElement(array) {
    return (
      <>
        {array
          .filter((item) => item.element === 'hyperlink' || item.element === 'img' || item.element === 'label')
          .map((item, index) => {
            if (item.element === 'hyperlink') {
              return (
                <a
                  key={`filter_${index + 1}`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='text-secondary text-decoration-none pe-2'
                  href={item.link}
                >
                  {item.label}
                </a>
              );
            }
            if (item.element === 'img') {
              return (
                <img
                  key={`item_${index + 1}`}
                  src={`${window.location.origin}${ICON_IMAGE_PATH}${item.label}`}
                  className='pe-2'
                  title={item.ToolTip}
                  style={{ height: '20px' }}
                  alt='img'
                />
              );
            }
            return (
              <span key={`span_${index + 1}`} className='pe-2'>
                {item.label}
              </span>
            );
          })}
      </>
    );
  }
  // function getDescExpandCollpase_RowHeight(params, key, widthOfCell) {
  //   let newlines = 2.3;
  //   const words = key.split(' ');
  //   let current = words[0].length;
  //   const characterLengthOneLine = Math.round((widthOfCell * 12.8) / 100);
  //   while (current > characterLengthOneLine) {
  //     newlines += 1;
  //     current -= characterLengthOneLine;
  //   }
  //   for (let i = 1; i < words.length; i += 1) {
  //     const test = current + words[i].length + 1;
  //     if (test > characterLengthOneLine) {
  //       newlines += 1;
  //       current = words[i].length;
  //       while (current > characterLengthOneLine) {
  //         newlines += 1;
  //         current -= characterLengthOneLine;
  //       }
  //     } else {
  //       current = test;
  //     }
  //   }

  //   const row = params.node;
  //   const selected = !row.selected;
  //   const paramsObj = {
  //     force: true,
  //     rowNodes: [row]
  //   };

  //   row.data.isDescExpand = !row.data.isDescExpand;
  //   row.data.firstLoadRowHeight =
  //     row.data.firstLoadRowHeight === numConst.NUMBER_ZERO ? row.rowHeight : row.data.firstLoadRowHeight;
  //   let finalHeight = row.data.isDescExpand ? 28 + newlines * 17.3 : row.data.firstLoadRowHeight;

  //   if (row.data.isConExpand !== undefined && !row.data.isConExpand && !row.data.isDescExpand) {
  //     finalHeight = row.data.firstLoadRowHeight;
  //   }

  //   row.setRowHeight(finalHeight);
  //   row.setSelected(selected);
  //   row.gridApi.refreshCells(paramsObj);
  //   row.gridApi.onRowHeightChanged();
  // }
  // function getDescriptionData(params, key) {
  //   return (
  //     <div className="d-flex">
  //       {key.length > 100 ? (
  //         <>
  //           <button
  //             id={`btnplus_${Math.random().toString(36).substr(2, 6)}`}
  //             type="button"
  //             className="btn btn-sm btn-primary ag-grid-expand-collapse-btn"
  //             onClick={async (e) => {
  //               e.preventDefault();
  //               const widthOfCell = e.target.parentNode.parentNode.parentNode.offsetWidth;
  //               const heightOfCell = e.target.parentNode.parentNode.parentNode.offsetHeight;
  //               getDescExpandCollpase_RowHeight(
  //                 params,
  //                 key,
  //                 widthOfCell,
  //                 heightOfCell,
  //               );
  //             }}
  //           >
  //             {params.node.data.isDescExpand ? '-' : '+'}
  //           </button>
  //           <span
  //             className={
  //               params.node.data.isDescExpand
  //                 ? 'ws-normal-d-block-lh pt-2'
  //                 : 'text-overflow-ellipsis overflow-hidden'
  //             }
  //           >
  //             {key}
  //           </span>
  //         </>
  //       ) : (
  //         <span className="text-wrap" style={{ lineHeight: '30px' }}>
  //           {key}
  //         </span>
  //       )}
  //     </div>
  //   );
  // }

  function GetData() {
    return (
      <>
        <div className='row pt-2'>
          {props.data_ChartInfo !== '' && score.length > 0 && (
            <div className='col-md-5 col-12'>
              <Card IsShowCard isHide={false} title='Governance Score' smalltitle='' addedClass=''>
                <div className='row'>
                  <div className={props.TrialUser ? 'col-md-6 col-12 m-0 blurrytext' : 'col-md-6 col-12 m-0'}>
                    <span
                      className={props.TrialStatus ? 'text-primary blurrytext' : 'text-primary'}
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {/* {props.data_ChartInfo} */}
                      {score[0]}
                      <img
                        alt='i-img'
                        title='The total scores are categorized from highest to lowest into the following five rankings: Excellent, Good, Average, Bad, Poor.
                                Please see the Governance FAQ page for full methodology of score and ranking calculations.'
                        style={{ height: '16px' }}
                        className='ps-1'
                        src={`${window.location.origin}${ICON_IMAGE_PATH}info.png`}
                      />
                      <br />
                      {`${score[1]}\n`}
                      {score[2]}
                    </span>
                  </div>
                  <div className='col-md-4 col-12 m-0'>
                    <ErrorBoundary>
                      <D3DoughnutChart
                        isDummyData={props.TrialStatus}
                        isHide={false}
                        isShowCard={false}
                        cardtitle=''
                        cardsmalltitle=''
                        data={props.data_Chart}
                        height={100}
                        TrialUser={props.TrialUser}
                      />
                    </ErrorBoundary>
                  </div>
                </div>
              </Card>
            </div>
          )}
          {Object.keys(props.table_QuickView).length > 0 && (
            <div className='col-md-7'>
              <Card IsShowCard isHide={false} title='Summary' smalltitle='' addedClass=''>
                <div className={props.TrialUser ? 'blurrytext' : ''}>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>Auditor:</div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                    >
                      {props.table_QuickView.Auditor}
                    </div>
                    {/* </div> */}
                  </div>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>
                      Chief Executive Officer:
                    </div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {props.table_QuickView.CEO_name}
                    </div>
                    {/* </div> */}
                  </div>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>Chairman:</div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {props.table_QuickView.Chairman_name}
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {Object.keys(props.table_MeetingInfo).length > 0 && (
          <div className='mt-2'>
            <Card IsShowCard isHide={false} title='Meeting Information' smalltitle='' addedClass=''>
              <div className={props.TrialUser ? 'row blurrytext' : 'row'}>
                <div className='col-12 col-md-4 pt-2 m-0'>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>
                      Upcoming Annual Meeting:
                    </div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                    >
                      {getElement(props.table_MeetingInfo.upcoming_annual_meeting)}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>
                      Previous Annual Meeting:
                    </div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                    >
                      {getElement(props.table_MeetingInfo.previous_annual_meeting)}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>
                      Upcoming Special Meeting:
                    </div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                    >
                      {getElement(props.table_MeetingInfo.upcoming_special_meeting)}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6 col-md-6 mb-0 pb-0 text-primary font-weight-bold'>
                      Previous Special Meeting:
                    </div>
                    <div
                      className={
                        props.TrialStatus
                          ? 'col-6 col-md-6 mb-0 pb-0 text-primary blurrytext'
                          : 'col-6 col-md-6 mb-0 pb-0 text-primary'
                      }
                    >
                      {getElement(props.table_MeetingInfo.previous_special_meeting)}
                    </div>
                  </div>
                </div>
                {props.table_QuickView.Company_HQ !== 'UK' && (
                  <div className='col-12 col-md-8 pt-2 m-0'>
                    <div className='row'>
                      <div className='col-6 col-md-8 mb-0 pb-0 text-primary font-weight-bold'>
                        Shareholder Proposal Deadline for Upcoming Annual Meeting:
                      </div>
                      <div
                        className={
                          props.TrialStatus
                            ? 'col-6 col-md-4 mb-0 pb-0 text-primary blurrytext'
                            : 'col-6 col-md-4 mb-0 pb-0 text-primary'
                        }
                      >
                        {props.table_MeetingInfo.shareholder_prop_deadline}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6 col-md-8 mb-0 pb-0 text-primary font-weight-bold'>
                        Shareholder Proposal/ Nomination Deadline for Upcoming Annual Meeting:
                      </div>
                      <div
                        className={
                          props.TrialStatus
                            ? 'col-6 col-md-4 mb-0 pb-0 text-primary blurrytext'
                            : 'col-6 col-md-4 mb-0 pb-0 text-primary'
                        }
                      >
                        {props.table_MeetingInfo.nomination_deadline}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6 col-md-8 mb-0 pb-0 text-primary font-weight-bold'>
                        Number of Board Meetings Held Last Year:
                      </div>
                      <div
                        className={
                          props.TrialStatus
                            ? 'col-6 col-md-4 mb-0 pb-0 text-primary blurrytext'
                            : 'col-6 col-md-4 mb-0 pb-0 text-primary'
                        }
                      >
                        {props.table_MeetingInfo.board_meetings_last_year}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {(props.table_BoardandDirectors.length > 0 ||
          props.table_ShareholderRightsandVoting.length > 0 ||
          props.table_Ownership.length > 0) && (
          <>
            <div className='row align-items-center mt-2 pt-3'>
              <div className='col-md-8' />
              <div className='col-md-2 col-6 font-weight-bold text-primary text-end m-0'>Comparison:</div>
              <div className='col-md-2 col-6 m-0'>
                <SearchInput
                  onChange={(e) => {
                    if (e !== null) {
                      props.handleSetDDLComparision(e);
                      props.handleIsLoading(true);
                    }
                  }}
                  selectValue={props.selection_ddlComparision}
                  options={props.ddlComparision}
                  isMulti={false}
                  placeholder='(Optional) Choose Comparison...'
                />
              </div>
            </div>
            {props.isLoading ? (
              <div className='vh-100'>
                <div className='h-50'>
                  {props.procedureRunningEstimateTime !== undefined && (
                    <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className='row pt-4'>
                  <div className='col-md-12 col-12'>
                    {props.table_BoardandDirectors.length > 0 ? (
                      <ErrorBoundary hasCard cardtitle='Board and Directors'>
                        <Table
                          IsShowCard
                          pageTitle='Board and Directors'
                          isHide={false}
                          title='Board and Directors'
                          smalltitle=''
                          gridOptions={gridOptionsBoardandDirectors}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        />
                      </ErrorBoundary>
                    ) : (
                      !props.isLoading && (
                        <Card IsShowCard isHide={false} title='Board and Directors' smalltitle='' addedClass=''>
                          {NORECORDS}
                        </Card>
                      )
                    )}
                  </div>
                </div>
                <div className='row pt-2'>
                  <div className='col-md-12 col-12'>
                    {props.table_ShareholderRightsandVoting.length > 0 ? (
                      <ErrorBoundary hasCard cardtitle='Ownership'>
                        <Table
                          IsShowCard
                          pageTitle='Ownership'
                          isHide={false}
                          title='Ownership'
                          smalltitle=''
                          gridOptions={gridOptionsOwnership}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        />
                      </ErrorBoundary>
                    ) : (
                      !props.isLoading && (
                        <Card IsShowCard isHide={false} title='Ownership' smalltitle='' addedClass=''>
                          {NORECORDS}
                        </Card>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className='row pt-3'>
          <div className='col-md-12 col-12'>
            {props.table_Stock && props.table_Stock.length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Stock'>
                <Table
                  IsShowCard
                  pageTitle='Stock'
                  isHide={false}
                  title='Stock'
                  smalltitle=''
                  gridOptions={gridOptionsStock}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
              </ErrorBoundary>
            ) : (
              !props.isLoading && (
                <Card IsShowCard isHide={false} title='Stock' smalltitle='' addedClass=''>
                  {NORECORDS}
                </Card>
              )
            )}
          </div>
        </div>
      </>
    );
  }

  if (
    props.table_BoardandDirectors &&
    props.table_BoardandDirectors.length >= numConst.NUMBER_ZERO &&
    props.table_Ownership &&
    props.table_Ownership.length >= numConst.NUMBER_ZERO &&
    props.table_Stock &&
    props.table_Stock.length >= numConst.NUMBER_ZERO &&
    props.table_BoardandDirectors &&
    props.table_BoardandDirectors.length >= numConst.NUMBER_ZERO
  ) {
    setTimeout(() => {
      const doc = document.getElementById('loadItem');
      const loadedItem = document.createElement('div');
      doc && doc.appendChild(loadedItem);
      loadedItem.setAttribute('id', 'loadedItem');
    }, [3000]);
  }

  return (
    <Page key={1} className='pt-2'>
      <div id='loadItem'>{GetData()}</div>
    </Page>
  );
};

GovernanceOverview.propTypes = {
  TrialStatus: PropTypes.bool,
  allowDownload: PropTypes.bool,
  location: PropTypes.object,
  rowData: PropTypes.array,
};

GovernanceOverview.defaultProps = {
  TrialStatus: false,
  allowDownload: false,
  location: {},
  rowData: [],
};

export default withRouter(GovernanceOverview);
