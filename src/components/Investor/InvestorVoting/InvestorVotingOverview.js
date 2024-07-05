import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import { Link } from 'react-router-dom';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import pathConst from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import {
  checkValuesToFixed,
  numberToCommaString
} from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';
import Card from '../../GeneralForm/Card';
import { filters } from '../../../utils/AgGridFunctions';
import { history } from '../../../utils/navigation-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorVotingOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const tempProps = JSON.parse(JSON.stringify(props.manager_voting_against));
  Object.preventExtensions(tempProps);

  const gridOptionsISSVoteComparator = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: '',
            field: 'mg_proposal_top_level',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            minWidth: 210,
            maxWidth: query.print && 210
          }
        ]
      },
      {
        headerName: 'Management',
        children: [
          {
            headerName: '#',
            field: 'Num_ISS_potentialsMan',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 80,
            maxWidth: 80
          },
          {
            headerName: '%',
            field: 'percfollow_ISSMan',
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 60,
            maxWidth: 60
            // cellRenderer: (params) => {
            //   const eDiv = document.createElement('div');
            //   eDiv.innerHTML = params.data.percfollow_ISSMan !== null
            //     ? params.data.percfollow_ISSMan.toFixed(1)
            //     : '';
            //   return eDiv;
            // },
          }
        ]
      },
      {
        headerName: 'Shareholder',
        children: [
          {
            headerName: '#',
            field: 'Num_ISS_potentialsShar',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 80,
            maxWidth: 80
          },
          {
            headerName: '%',
            field: 'percfollow_ISSShar',
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 60,
            maxWidth: 60
          }
        ]
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'proposal_number_orig',
          pinned: 'left'
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: null
    },
    rowData: props.issAndglasslewis.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      percfollow_ISSMan:
        x.percfollow_ISSMan !== null ? x.percfollow_ISSMan.toFixed(1) : '',
      percfollow_ISSShar:
        x.percfollow_ISSShar !== null
          ? parseFloat(x.percfollow_ISSShar).toFixed(1)
          : '',
      Num_ISS_potentialsMan:
        x.Num_ISS_potentialsMan !== null
          ? numberToCommaString(x.Num_ISS_potentialsMan)
          : '',
      Num_ISS_potentialsShar:
        x.Num_ISS_potentialsShar !== null
          ? numberToCommaString(x.Num_ISS_potentialsShar)
          : ''
    }))
  };

  const gridOptionsGlassLewisVoteComparator = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: '',
            field: 'sh_proposal_top_level',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            minWidth: 210,
            maxWidth: query.print && 210
          }
        ]
      },
      {
        headerName: 'Management',
        children: [
          {
            headerName: '#',
            field: 'Num_gl_potentialsMan',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 80,
            maxWidth: 80
          },
          {
            headerName: '%',
            field: 'percfollow_glMan',
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 60,
            maxWidth: 60
            // cellRenderer: (params) => {
            //   const eDiv = document.createElement("div");
            //   eDiv.innerHTML =
            //     params.data.percfollow_ISSShar !== null ? parseFloat(params.data.percfollow_ISSShar).toFixed(1) : "";
            //   return eDiv;
            // },
          }
        ]
      },
      {
        headerName: 'Shareholder',
        children: [
          {
            headerName: '#',
            field: 'Num_gl_potentialsShar',
            type: ['autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 80,
            maxWidth: 80
          },
          {
            headerName: '%',
            field: 'percfollow_glShar',
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            minWidth: 60,
            maxWidth: 60
          }
        ]
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'proposal_number_orig',
          pinned: 'left'
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: null
    },
    rowData: props.issAndglasslewis.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      percfollow_glShar:
        x.percfollow_glShar !== null
          ? parseFloat(x.percfollow_glShar).toFixed(1)
          : '',
      percfollow_glMan:
        x.percfollow_glMan !== null ? x.percfollow_glMan.toFixed(1) : '',
      Num_gl_potentialsMan:
        x.Num_gl_potentialsMan !== null
          ? numberToCommaString(x.Num_gl_potentialsMan)
          : '',
      Num_gl_potentialsShar:
        x.Num_gl_potentialsShar !== null
          ? numberToCommaString(x.Num_gl_potentialsShar)
          : ''
    }))
  };

  const gridOptionsMostFreqVotedAgainstMan = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal',
        field: 'proposal_type',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 430 : 250,
        maxWidth: query.print ? 430 : 800
      },
      {
        headerName: '# Proposals',
        field: 'occurs',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 120 : 120,
        maxWidth: query.print ? 120 : 120,
      },
      {
        headerName: '% Against',
        field: 'pcent_against',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          minWidth: query.print ? 120 : 120,
          maxWidth: query.print ? 120 : 120,
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'Proposal',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: tempProps.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      pcent_against: x.pcent_against !== null ? x.pcent_against.toFixed(1) : '',
      occurs: x.occurs !== null ? numberToCommaString(x.occurs) : ''
    }))
  };

  const dataRenderCompany = () => {
    const objPrint = {
      headerName: 'Company',
      field: 'company_name',
      type: ['autoHeightTrue'],
      cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      minWidth: query.print ? 400 : 300,
      maxWidth: query.print ? 400 : 800,
    };
    const obj = {
      headerName: 'Company',
      field: 'company_name',
      type: ['autoHeightTrue'],
      cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      minWidth: query.print ? 400 : 300,
      maxWidth: query.print ? 400 : 800,
      cellRendererFramework: (params) => (
        <Link
          className='text-secondary'
          to={`${pathConst.VOTING_OVERVIEW}${pathConst.QUERY_MEETING}${params.data.meeting_id}`}
        >
          {params.data.company_name}
        </Link>
      ),
    };
    if (query.print) {
      return objPrint;
    }
    return obj;
  };

  const dataRenderProposal = () => {
    const objPrint = {
      headerName: 'Proposal',
      field: 'proposal_detail',
      type: ['autoHeightTrue'],
      cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      minWidth: query.print ? 550 : 300,
      maxWidth: query.print ? 550 : null,
    };
    const obj = {
      headerName: 'Proposal',
      field: 'proposal_detail',
      type: ['autoHeightTrue'],
      cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      minWidth: query.print ? 550 : 300,
      maxWidth: query.print ? 550 : null,
      cellRendererFramework: (params) => (
        <Link
          className='text-secondary'
          to={`${pathConst.VOTING_OVERVIEW}${pathConst.QUERY_MEETING}${params.data.meeting_id}`}
        >
          {params.data.proposal_detail}
        </Link>
      ),
    };
    if (query.print) {
      return objPrint;
    }
    return obj;
  };

  const gridOptionsLatestVotesAgainstMan = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'meeting_date',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue']
      },
      dataRenderCompany(),
      dataRenderProposal(),
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'Date',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    rowData: props.managerLatestAgainst.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
      meeting_date:
        x.meeting_date !== undefined
          ? dateToNull(x.meeting_date, 'dd-mmm-yy')
          : ''
    }))
  };

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
    <Page {...props} key={1} className='zoom-out pt-3'>
      {props.isLoading ? (
        LOADING
      ) : (
        <>
          <div className='row pdfpagebreak pt-2' id='loadItem'>
          {props.investorVoteSum &&
            <div className='col-12 col-md-12 pt-2'>
              <Card title='Voting Summary'>
                <div className={props.TrialStatus ? 'blurrytext' : ''}>
                  {props.investorVoteSum.total_votes !== null &&
                    props.investorVoteSum.total_votes !== undefined && (
                      <div className='row cardISection'>
                        <span className='col-6 mb-1 customSubHeadersInCards'>
                          Total Votes Recorded:
                        </span>
                        <span className='col-6 mb-1'>
                          {numberToCommaString(
                            props.investorVoteSum.total_votes
                          )}
                        </span>
                      </div>
                    )}
                  <div className='row cardISection'>
                    <span className='col-6 mb-1 customSubHeadersInCards'>
                      For Management Proposals(%):
                    </span>
                    <span className='col-6 mb-1'>
                      {Math.round(props.investorVoteSum.votes_for * 10) / 10}%
                    </span>
                  </div>
                  <div className='row cardISection'>
                    <span className='col-6 mb-1 customSubHeadersInCards'>
                      Opposing Management Proposals(%):
                    </span>
                    <span className='col-6 mb-1'>
                      {Math.round(props.investorVoteSum.votes_against * 10) /
                        10}
                      %
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          }

            <div className='col-12 col-md-6 my-2'>
              {props.issAndglasslewis.length > 0 ? (
                <ErrorBoundary hadCard cardtitle='ISS Vote Comparator'>
                  <Table
                    title='ISS Vote Comparator'
                    pageTitle='ISS Vote Comparator'
                    smalltitle=''
                    gridOptions={gridOptionsISSVoteComparator}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='ISS Vote Comparator'>{NORECORDS}</Card>
              )}
            </div>

            <div className='col-12 col-md-6 my-2'>
              {props.issAndglasslewis.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Glass Lewis Vote Comparator'>
                  <Table
                    pageTitle='Glass Lewis Vote Comparator'
                    title='Glass Lewis Vote Comparator'
                    smalltitle=''
                    gridOptions={gridOptionsGlassLewisVoteComparator}
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Glass Lewis Vote Comparator'>{NORECORDS}</Card>
              )}
            </div>
          </div>

          <div className='row pt-2'>
            <div className='col-sm-12 col-md-8 my-2'>
              {tempProps.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Proposals Most Frequently Voted Against Management'>
                <Table
                  IsShowCard
                  pageTitle='Proposals Most Frequently Voted Against Management'
                  title='Proposals Most Frequently Voted Against Management'
                  smalltitle=''
                  gridOptions={gridOptionsMostFreqVotedAgainstMan}
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                />
                </ErrorBoundary>
              ) : (
                <Card title='Proposals Most Frequently Voted Against Management'>
                  {NORECORDS}
                </Card>
              )}
            </div>
            {props.dissDataforInvestor !== undefined && (
              <div className='col-sm-12 col-md-4 my-2'>
                <Card title='Voting at Proxy Contests'>
                  <div
                    className={props.TrialStatus ? 'blurrytext mt-4' : 'mt-4'}
                  >
                    <div className='row cardISection'>
                      <span className='col-8 customSubHeadersInCards my-2'>
                        Number of Proxy Contests Voted:
                      </span>
                      <span className='col-4 my-2'>
                        {props.dissDataforInvestor.Num_of_Proxy_Contests_Voted}
                      </span>
                    </div>
                    <div className='row cardISection'>
                      <span className='col-8 customSubHeadersInCards my-2'>
                        No. of Meetings Voted Dissident Slate:
                      </span>
                      <span className='col-4 my-2'>
                        {props.dissDataforInvestor.no_meetings_diss}
                      </span>
                    </div>
                    <div className='row cardISection'>
                      <span className='col-8 customSubHeadersInCards my-2'>
                        % Times Voted Dissident Slate:
                      </span>
                      <span className='col-4 my-2'>
                        {Math.round(
                          props.dissDataforInvestor
                            .perc_Times_Voted_Dissident_Card * 10
                        ) / 10}
                      </span>
                    </div>
                    <div className='row cardISection'>
                      <span className='col-8 customSubHeadersInCards my-2'>
                        No. of Times Voted all Dissidents:
                      </span>
                      <span className='col-4 my-2'>
                        {Math.round(
                          props.dissDataforInvestor.no_times_all_diss
                        )}
                      </span>
                    </div>
                    <div className='row cardISection'>
                      <span className='col-8 customSubHeadersInCards my-2'>
                        % Voted all Dissidents:
                      </span>
                      <span className='col-4 my-2'>
                        {Math.round(
                          props.dissDataforInvestor.perc_Voted_all_Dissidents *
                            10
                        ) / 10}
                      </span>
                    </div>
                    <div className='row cardISection'>
                      <span className='col-8 customSubHeadersInCards my-2'>
                        % of Dissidents voted for when not voting for all
                        dissidents
                      </span>
                      <span className='col-4 my-2'>
                        {Math.round(
                          props.dissDataforInvestor.perc_Voted_some_Dissidents *
                            10
                        ) / 10}
                      </span>
                    </div>
                    <div className='row cardISection'>
                      <div className='col-8 my-2' />
                      <div className='col-4 my-2'>
                        <a
                          className='link-primary text-secondary btnToLink'
                          type='button'
                          href={`${pathConst.INVESTOR_PROXY_CONTEST_VOTING}${props.location.search}`}
                        >
                          View More
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          <div className='col-12 col-md-12 pt-3'>
            {props.managerLatestAgainst.length > 0 ? (
              <div className='row pdfpagebreak'>
              <ErrorBoundary hasCard cardtitle='Latest Proposals Voted Against Management'>
              <Table
                IsShowCard
                pageTitle='Latest Proposals Voted Against Management'
                title='Latest Proposals Voted Against Management'
                smalltitle=''
                gridOptions={gridOptionsLatestVotesAgainstMan}
                hideExcelDownloadIcon={props.TrialUserDisableDownload}
              />
              </ErrorBoundary>
              </div>
            ) : (
              <Card title='Latest Proposals Voted Against Management'>
                {NORECORDS}
              </Card>
            )}
          </div>
        </>
      )}
    </Page>
  );
};

InvestorVotingOverview.propTypes = {
  location: PropTypes.object,
  issAndglasslewis_vote: PropTypes.array.isRequired
};

InvestorVotingOverview.defaultProps = {
  location: {}
};
export default withRouter(InvestorVotingOverview);
