import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import DropdownList from '../../GeneralForm/DropdownList';
import messageConst from '../../../constants/MessageConstans';
import pathConst, { QUERY_MEETING } from '../../../constants/PathsConstant';
import CustomToolTipHeader from '../../GeneralForm/CustomToolTipHeader';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const VotingResults = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const title =
    props.issuerCompanyProfile !== undefined
      ? props.issuerCompanyProfile.Company_name
      : '';
  const pcnt_tooltip =
    "Note: % figures for For and Against votes are calculated as a % of votes For and Against. %'s for Management Director proposals are calculated as a % of votes For, Against and Withheld for plurality voting. % figures for Withheld/Abstain votes are calculated as a % of votes For, Against, Withheld and Abstain. Broker Non-Votes are shown as a % of all votes logged. For TSX listed companies in Canada withhold votes are included as Against votes as of 1 July 2014.";

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const gridOptionsvoteResultsList = {
    frameworkComponents: { agColumnHeader: CustomToolTipHeader },
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: props.voteResultsHeadingList.proposal_number_orig,
            field: 'proposal_number_orig',
            type: ['autoHeightTrue'],
            minWidth: query.print ? 60 : 50,
            maxWidth: query.print ? 60 : 50,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
          },
          {
            headerName: props.voteResultsHeadingList.proposal_detail,
            field: 'proposal_detail',
            type: ['autoHeightTrue'],
            minWidth: query.print ? 160 : 300,
            maxWidth: query.print ? 160 : 700,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
          },
          {
            headerName: props.voteResultsHeadingList.sponsor,
            field: 'sponsor',
            minWidth: query.print ? 50 : 65,
            maxWidth: query.print ? 50 : 65,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
          },
        ],
      },
      {
        headerName: 'For',
        children: [
          {
            headerName: props.voteResultsHeadingList.for_shares,
            field: 'for_shares',
            type: ['autoHeightTrue'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
          },
          {
            headerName: props.voteResultsHeadingList.for_pcent,
            field: 'for_pcent',
            minWidth: 65,
            maxWidth: query.print ? 65 : 80,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
          },
        ],
      },
      {
        headerName: 'Against',
        children: [
          {
            headerName: props.voteResultsHeadingList.against_shares,
            field: 'against_shares',
            type: ['autoHeightTrue'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
          },
          {
            headerName: props.voteResultsHeadingList.against_pcent,
            field: 'against_pcent',
            minWidth: 65,
            maxWidth: query.print ? 65 : 80,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
          },
        ],
      },
      {
        headerName: 'Withheld/Abstained',
        children: [
          {
            headerName: props.voteResultsHeadingList.abstain_shares,
            field: 'abstain_shares',
            type: ['autoHeightTrue'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
          },
          {
            headerName: props.voteResultsHeadingList.abstain_pcent,
            field: 'abstain_pcent',
            minWidth: 65,
            maxWidth: query.print ? 65 : 80,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
            headerComponentParams: { text_tooltip: pcnt_tooltip },
          },
        ],
      },
      {
        headerName: 'Broker Non-Votes',
        children: [
          {
            headerName: props.voteResultsHeadingList.broker_shares,
            field: 'broker_shares',
            type: ['autoHeightTrue'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
          },
          {
            headerName: props.voteResultsHeadingList.broker_pcent,
            field: 'broker_pcent',
            minWidth: 65,
            maxWidth: query.print ? 65 : 80,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell font-size-small',
            headerComponentParams: { text_tooltip: pcnt_tooltip },
          },
        ],
      },
      {
        headerName: '',
        children: [
          {
            headerName: props.voteResultsHeadingList.outcome,
            field: 'outcome',
            type: ['autoHeightTrue'],
            minWidth: query.print ? 110 : 80,
            maxWidth: query.print ? 110 : null,
            cellClass: props.TrialUser
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center font-size-small'
              : 'ws-normal-lh24 ps-1 pe-1 text-center font-size-small',
          },
        ],
      },
    ],
    defaultColDefs: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    columnTypes: filters,
    colDefsMedalsExcluded: [],
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
      ],
    },
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
    },
    rowData: props.voteResultsList.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
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
    <Page {...props} key={1} className='pt-3'>
      <div className='row pt-2'>
        <div className='col-md-4 col-sm-12'>
          <DropdownList
            handleChange={(e) => {
              if (e !== null) {
                props.handleResetLoading(!props.loadingData);
                props.history.push({
                  pathname: pathConst.VOTING_RESULTS,
                  search: `${QUERY_MEETING}${e.value}`,
                });
              }
            }}
            isMulti={false}
            options={props.listMeetingDatesVotingResults}
            Dvalue={props.selectedMeetingDatesVotingResults}
            disabled={props.loadingData ? true : props.TrialUserDisableDownload}
          />
        </div>
      </div>

      <div className='row fadeInAnimation pt-2'>
        <div className='col-md-12 col-sm-12'>
          {props.loadingData ? (
            messageConst.LOADING
          ) : (
            <>
              <div className='pt-1' id='loadItem'>
                {gridOptionsvoteResultsList.rowData.length > 0 ? (
                  <ErrorBoundary hasCard cardtitle='Voting Results'>
                    <Table
                      pageTitle={`Voting Results: ${title}`}
                      title='Voting Results'
                      smalltitle=''
                      gridOptions={gridOptionsvoteResultsList}
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                ) : (
                  messageConst.NORECORDS
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(VotingResults));
