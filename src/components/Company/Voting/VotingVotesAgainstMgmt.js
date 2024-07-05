import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import messageConst from '../../../constants/MessageConstans';
import pathConst, { QUERY_MEETING } from '../../../constants/PathsConstant';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import { loadingRenderer, filters } from '../../../utils/AgGridFunctions';
import DropdownList from '../../GeneralForm/DropdownList';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const VotingVotesAgainstMgmt = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const title = props.issuerCompanyProfile !== undefined ? props.issuerCompanyProfile.Company_name : '';

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const gridOptionsVotingData_rationale_meeting_againstList = {
    colDefsMedalsIncluded: [
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList && props.votingDataRationaleMeetingAgainstHeadingList.manager,
        field: 'manager',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <a className='text-secondary' href={`${pathConst.INVESTOR_VOTING_OVERVIEW}${pathConst.QUERY_INVESTOR}${params.data ? params.data.investor_id : ''}`}>
              {params.data ? params.data.manager : ''}
            </a>
          </div>
        )
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList && props.votingDataRationaleMeetingAgainstHeadingList.proposal_number_orig,
        field: 'proposal_number_orig',
        type: ['autoHeightTrue'],
        minWidth: 60,
        maxWidth: 60,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList && props.votingDataRationaleMeetingAgainstHeadingList.proposal_detail,
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 150 : 150,
        maxWidth: query.print ? 150 : 200,
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList && props.votingDataRationaleMeetingAgainstHeadingList.vote_cast,
        field: 'vote_cast',
        type: ['autoHeightTrue'],
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList && props.votingDataRationaleMeetingAgainstHeadingList.vote_reason,
        field: 'vote_reason',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 645 : 400,
        maxWidth: query.print ? 645 : null,
        cellClass: props.TrialUser ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: true, pageSize: 100 },
    domLayout: 'normal',
    isfloatingFilter: false,
    rowData: props.votingDataRationaleMeetingAgainstList && props.votingDataRationaleMeetingAgainstList.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload
    })),
    quickSearchFilter: !query.print,
    gridHeight: '70vh',
  };

  const gridOptionsIssuerVotesAgainstList = {
    colDefsMedalsIncluded: [
      {
        headerName:
          props.votingIssuerVotesAgainstMgmtHeadingList &&
          props.votingIssuerVotesAgainstMgmtHeadingList.manager !== undefined &&
          props.votingIssuerVotesAgainstMgmtHeadingList.manager,
        field: 'manager',
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: 200,
        cellRendererFramework: (params) => (
          <div>
            <a className='text-secondary' rel="noreferrer" target='_blank' href={`${pathConst.INVESTOR_VOTING_OVERVIEW}${pathConst.QUERY_INVESTOR}${params.data ? params.data.investor_id : ''}`}>
              {params.data && params.data.manager ? params.data.manager : ''}
            </a>
          </div>
        )
      },
      {
        headerName:
          props.votingIssuerVotesAgainstMgmtHeadingList &&
          props.votingIssuerVotesAgainstMgmtHeadingList.fund_name !== undefined &&
          props.votingIssuerVotesAgainstMgmtHeadingList.fund_name,
        field: 'fund_name',
        type: ['autoHeightTrue'],
        minWidth: 240,
        maxWidth: 240,
        cellClass: props.TrialUser ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName:
          props.votingIssuerVotesAgainstMgmtHeadingList &&
          props.votingIssuerVotesAgainstMgmtHeadingList.number !== undefined &&
          props.votingIssuerVotesAgainstMgmtHeadingList.number,
        field: 'number',
        type: ['autoHeightTrue'],
        minWidth: 60,
        maxWidth: 60,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName:
          props.votingIssuerVotesAgainstMgmtHeadingList &&
          props.votingIssuerVotesAgainstMgmtHeadingList.proposal_detail !== undefined &&
          props.votingIssuerVotesAgainstMgmtHeadingList.proposal_detail,
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 430 : 300,
        maxWidth: query.print ? 430 : null,
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName:
          props.votingIssuerVotesAgainstMgmtHeadingList &&
          props.votingIssuerVotesAgainstMgmtHeadingList.vote_cast !== undefined &&
          props.votingIssuerVotesAgainstMgmtHeadingList.vote_cast,
        field: 'vote_cast',
        type: ['autoHeightTrue'],
        minWidth: 110,
        maxWidth: 110,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center'
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: true, pageSize: 100 },
    domLayout: 'normal',
    isfloatingFilter: false,
    rowData: props.votingIssuerVotesAgainstMgmtList && props.votingIssuerVotesAgainstMgmtList.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser
    })),
    quickSearchFilter: !query.print,
    gridHeight: '70vh',
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

  return (
    <Page {...props} key={1} className='pt-3'>
      <div className='row'>
        <div className='col-md-4 col-sm-12'>
          <DropdownList
            handleChange={(e) => {
              if (e !== null) {
                props.handleResetLoading();
                // toggleTrueFalse(false);
                props.handleSetDdlMeetingDate(e);
                props.history.push({
                  pathname: pathConst.VOTING_VOTESAGAINST_MGMT,
                  search: `${QUERY_MEETING}${e.value}`,
                });
              }
            }}
            isMulti={false}
            options={props.listMeetingDatesOverview}
            Dvalue={props.selectedMeetingDates}
            disabled={props.loadingData ? true : props.TrialUserDisableDownload}
          />
        </div>
      </div>
      {props.loadingData ? (
        messageConst.LOADING
      ) : (
        <>
          <div className='row pt-2' id='loadItem'>
            <div className='col-md-12 col-sm-12'>
              {props.votingDataRationaleMeetingAgainstHeadingList && gridOptionsVotingData_rationale_meeting_againstList.rowData.length > 0 && (
                <CollapseComponent
                  Heading='Voting Rationale'
                  index='1'
                  withoutCollapseComponent={query.print}
                  withoutCollapseWithCard={query.print}
                  isCardStyle
                  isOpen={true}
                >
                  <ErrorBoundary>
                    <Table
                      pageTitle={`Voting Rationale: ${title}`}
                      title='Voting Rationale'
                      gridOptions={gridOptionsVotingData_rationale_meeting_againstList}
                      IsShowCard={false}
                      hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    />`
                  </ErrorBoundary>
                </CollapseComponent>
              )}
            </div>
          </div>

          <div className='row pt-1'>
            <div className='col-md-12 col-sm-12'>
              {props.votingIssuerVotesAgainstMgmtHeadingList &&
                props.votingIssuerVotesAgainstMgmtHeadingList !== undefined &&
                gridOptionsIssuerVotesAgainstList.rowData.length > 0 && (
                <Table
                  pageTitle={`All Voting: ${title}`}
                  title='All Voting'
                  smalltitle=''
                  gridOptions={gridOptionsIssuerVotesAgainstList}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
              )}
            </div>
          </div>

        </>
      )}
    </Page>
  );
};

export default withRouter(React.memo(VotingVotesAgainstMgmt));
