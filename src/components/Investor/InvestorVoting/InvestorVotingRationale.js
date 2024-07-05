import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import msgConst from '../../../constants/MessageConstans';
import pathConst from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';
import { filters, bottomStatusBar } from '../../../utils/AgGridFunctions';
import Table from '../../GeneralForm/Table';
import ProgressBar from '../../GeneralForm/ProgressBar';
import Card from '../../GeneralForm/Card';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorVotingRationale = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const gridOptions_VotingRationale = {
    colDefsMedalsIncluded: [
      {
        headerName: props.votingRationale_heading.date,
        field: 'date',
        type: ['autoHeightTrue', 'dateColumn'],
        minWidth: 90,
        maxWidth: query.print ? 90 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center font-size-small'
      },
      {
        headerName: props.votingRationale_heading.issuer,
        field: 'issuer',
        type: ['autoHeightTrue', 'setColumn'],
        minWidth: 140,
        maxWidth: query.print ? 140 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer" 
            href="${pathConst.VOTING_OVERVIEW}?meetingid=${params.data.meeting_id}">
            ${params.data.issuer}</a>`;
          return eDiv;
        }
      },
      {
        headerName: props.votingRationale_heading.no,
        field: 'no',
        type: ['setColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 60,
        maxWidth: query.print ? 60 : null
      },
      {
        headerName: props.votingRationale_heading.proposal,
        field: 'proposal',
        type: ['autoHeightTrue', 'setColumn'],
        minWidth: 150,
        maxWidth: query.print ? 150 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: props.votingRationale_heading.proposal_type,
        field: 'proposal_type',
        type: ['autoHeightTrue', 'setColumn'],
        minWidth: 200,
        maxWidth: query.print ? 200 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: props.votingRationale_heading.rationale,
        field: 'rationale',
        type: ['autoHeightTrue', 'setColumn'],
        minWidth: query.print ? 400 : 500,
        maxWidth: query.print ? 400 : null,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span>${params.data.rationale}</span>`;
          return eDiv;
        }
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: false, pageSize: 10 },
    columnTypes: filters,
    rowSelection: query.print ? null : 'multiple',
    isfloatingFilter: !query.print,
    domLayout: query.print ? null : 'normal',
    gridHeight: query.print ? null : '80vh',
    statusBar: query.print ? null : bottomStatusBar,
    rowData: props.votingRationale_data.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
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
    <Page key={1} className='pt-3'>
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
        <div className='row pdfpagebreak fadeInAnimation pt-2' id='loadItem'>
          <div className='col-lg-12 col-12'>
            {props.votingRationale_data.length > 0 &&
            Object.keys(props.votingRationale_heading).length > 0 ? (
              <ErrorBoundary hasCard cardtitle='Voting Rationale'>
              <Table
                pageTitle='Voting Rationale for recent AGAINST votes'
                title='Voting Rationale'
                smalltitle=' for recent AGAINST votes'
                gridOptions={gridOptions_VotingRationale}
                hideExcelDownloadIcon={props.TrialUserDisableDownload}
              />
              </ErrorBoundary>
            ) : (
              <Card
                title='Voting Rationale'
                smalltitle=' for recent AGAINST votes'
              >
                {msgConst.NORECORDS}
              </Card>
            )}
          </div>
        </div>
      )}
    </Page>
  );
};

InvestorVotingRationale.propTypes = {
  location: PropTypes.object,
  TrialStatus: PropTypes.bool,
  votingRationale_heading: PropTypes.object.isRequired,
  votingRationale_data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

InvestorVotingRationale.defaultProps = {
  location: {},
  TrialStatus: false
};

export default withRouter(InvestorVotingRationale);
