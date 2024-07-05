import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import messageConst from '../../../constants/MessageConstans';
import { loadingRenderer, filters } from '../../../utils/AgGridFunctions';
import DropdownList from '../../GeneralForm/DropdownList';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import pathConst, { INVESTOR_VOTING_OVERVIEW, QUERY_MEETING, QUERY_INVESTOR } from '../../../constants/PathsConstant';
// import SearchInput from "../../GeneralForm/DropdownVirtualized";

const VotingVoteDetail = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  // const title = props.issuerCompanyProfile.Company_name;
  const title = props.issuerCompanyProfile !== undefined ? props.issuerCompanyProfile.Company_name : '';

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const gridOptionsVoteDetailsList = {
    colDefsMedalsIncluded: [
      {
        headerName: props.votingDataAllVotesHeadingList.proposal_number_orig,
        field: 'proposal_number_orig',
        type: ['autoHeightTrue'],
        minWidth: 50,
        maxWidth: 70,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRenderer: 'loadingRenderer',
      },
      {
        headerName: props.votingDataAllVotesHeadingList.proposal_detail,
        field: 'proposal_detail',
        minWidth: 180,
        maxWidth: null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: props.votingDataAllVotesHeadingList.manager,
        field: 'manager',
        minWidth: 180,
        maxWidth: 250,
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              rel='noreferrer'
              target='_blank'
              href={`${INVESTOR_VOTING_OVERVIEW}${QUERY_INVESTOR}${params.data ? params.data.investor_id : ''}`}
            >
              {params.data ? params.data.manager : ''}
            </a>
          </div>
        ),
      },
      {
        headerName: props.votingDataAllVotesHeadingList.fund_name,
        field: 'fund_name',
        minWidth: 180,
        maxWidth: null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: props.votingDataAllVotesHeadingList.vote_cast,
        field: 'vote_cast',
        type: ['autoHeightTrue'],
        minWidth: 50,
        maxWidth: 100,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: true, pageSize: 100 },
    domLayout: 'normal',
    isfloatingFilter: false,
    rowData: props.votingDataAllVotesList.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload,
    })),
    gridHeight: '70vh',
  };

  const gridOptionsVotingData_rationale_meeting_againstList = {
    colDefsMedalsIncluded: [
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList.manager,
        field: 'manager',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: 150,
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              href={`${pathConst.INVESTOR_VOTING_OVERVIEW}${pathConst.QUERY_INVESTOR}${
                params.data ? params.data.investor_id : ''
              }`}
            >
              {params.data ? params.data.manager : ''}
            </a>
          </div>
        ),
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList.proposal_number_orig,
        field: 'proposal_number_orig',
        type: ['autoHeightTrue'],
        minWidth: 60,
        maxWidth: 60,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList.proposal_detail,
        field: 'proposal_detail',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 150 : 150,
        maxWidth: query.print ? 150 : 200,
        cellClass: props.TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList.vote_cast,
        field: 'vote_cast',
        type: ['autoHeightTrue'],
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: props.votingDataRationaleMeetingAgainstHeadingList.vote_reason,
        field: 'vote_reason',
        type: ['autoHeightTrue'],
        minWidth: query.print ? 645 : 400,
        maxWidth: query.print ? 645 : null,
        cellClass: props.TrialUser ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: true, pageSize: 100 },
    domLayout: 'normal',
    isfloatingFilter: false,
    rowData: props.votingDataRationaleMeetingAgainstList.map((x) => ({
      ...x,
      TrialStatus: props.TrialUser,
      allowDownload: props.allowDownload,
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

  // const FilterFn = () => {
  //   props.listGetVotingDataAllVotesReq({ meetingId: meetingId, proposals: null, voteCast: props.voteCastSelection.value });
  // };

  return (
    <Page {...props} key={1} className={query.print ? 'cr-VotingVoteDetailPDF pt-3' : 'pt-3'}>
      {/* <div className="row">
        <div className="col-md-4 col-sm-12 pt-3">
          <SearchInput onChange={(e) => props.handleVoteCastChange(e)} selectValue={props.voteCastSelection} options={props.voteCastList} />
          <div className="col-md-3 col-sm-12 pt-3">
            <button className="btn btn-primary m-1 btn-sm" onClick={FilterFn}>
              Filter
            </button>
          </div>
        </div>
      </div> */}
      <div className='row'>
        <div className='col-md-4 col-sm-12'>
          <DropdownList
            handleChange={(e) => {
              if (e !== null) {
                props.handleResetLoading();
                // toggleTrueFalse(false);
                props.handleSetDdlMeetingDate(e);
                props.history.push({
                  pathname: pathConst.VOTING_VOTEDETAIL,
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

      <div className='row fadeInAnimation'>
        <div className='col-md-12 col-sm-12 pt-2' id='loadItem'>
          {props.loadingData ? (
            messageConst.LOADING
          ) : (
            <>
              {query.print && (
                <Card IsShowCard isHide={false} title='Vote Details' smalltitle='' addedClass=''>
                  {props.votingDataAllVotesList.length > 0 ? (
                    <table className='table table-striped tableborder'>
                      <thead>
                        <tr>
                          <th
                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                            scope='col'
                            style={{ width: '5%' }}
                          >
                            No.
                          </th>
                          <th
                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                            scope='col'
                            style={{ width: '45%' }}
                          >
                            Proposal Detail
                          </th>
                          <th
                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                            scope='col'
                            style={{ width: '20%' }}
                          >
                            Voting Manager
                          </th>
                          <th
                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                            scope='col'
                            style={{ width: '20%' }}
                          >
                            Fund
                          </th>
                          <th
                            className='text-primary font-weight-bold fontHeaderData ptb-2'
                            scope='col'
                            style={{ width: '10%' }}
                          >
                            Vote Cast
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.votingDataAllVotesList.map(
                          (i, index) =>
                            index < 15000 && (
                              <tr
                                key={`AllVotes${index + 1}`}
                                className={
                                  props.TrialStatus
                                    ? index % 2 !== 0
                                      ? 'blurrytext'
                                      : 'oddRowBG blurrytext'
                                    : index % 2 !== 0
                                    ? ''
                                    : 'oddRowBG'
                                }
                              >
                                <td className='text-primary fontRowData ptb-2'>{i.proposal_number_orig}</td>
                                <td className='text-primary fontRowData ptb-2'>{i.proposal_detail}</td>
                                <td className='text-primary fontRowData ptb-2'>{i.manager}</td>
                                <td className='text-primary fontRowData ptb-2'>{i.fund_name}</td>
                                <td className='text-primary fontRowData ptb-2'>{i.vote_cast}</td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    messageConst.NORECORDS
                  )}
                </Card>
              )}

              {!query.print && (
                <>
                  <div className='col-md-12 col-sm-12'>
                    {props.votingDataRationaleMeetingAgainstList.length > 0 &&
                      props.votingDataRationaleMeetingAgainstHeadingList && (
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
                            />
                          </ErrorBoundary>
                        </CollapseComponent>
                      )}
                  </div>
                  <div className='pt-2'>
                    {gridOptionsVoteDetailsList.rowData.length > 0 ? (
                      <ErrorBoundary hasCard cardtitle='Vote Details'>
                        <Table
                          pageTitle='Vote Details'
                          title='Vote Details'
                          smalltitle=''
                          gridOptions={gridOptionsVoteDetailsList}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        />
                      </ErrorBoundary>
                    ) : (
                      <Card title='Vote Details'>{messageConst.NORECORDS}</Card>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(VotingVoteDetail));
