import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Page from '../../Page';
import ProgressBar from '../../GeneralForm/ProgressBar';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { dateToNull } from '../../../utils/general-util';
import { history } from '../../../utils/navigation-util';
import { NORECORDS } from '../../../constants/MessageConstans';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorVotingFundsVoted = ({
  procedureRunningEstimateTime,
  isLoadingVotedManagerList,
  lstGetVotedByManagerList,
  TrialStatus,
  TrialUserDisableDownload,
}) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const gridOptionFundVotes = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Fund Name',
        field: 'fund_name',
        minWidth: query.print ? 805 : 500,
        maxWidth: query.print ? 805 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Start Date',
        field: 'fund_start_date',
        minWidth: 115,
        maxWidth: 115,
        type: ['dateColumn', 'autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
      },
      {
        headerName: 'End Date',
        field: 'fund_end_date',
        minWidth: 115,
        maxWidth: 115,
        type: ['dateColumn', 'autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    pivotMode: false,
    rowData: lstGetVotedByManagerList.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
      allowDownload: true,
      fund_start_date: x.fund_start_date
        ? dateToNull(x.fund_start_date, 'dd-mmm-yy', true)
        : '',
      fund_end_date: x.fund_end_date
        ? dateToNull(x.fund_end_date, 'dd-mmm-yy', true)
        : '',
    })),

    suppressAggFuncInHeader: true,
    rowSelection: 'multiple',
    domLayout: lstGetVotedByManagerList.length > 10 ? 'normal' : undefined,
    gridHeight: lstGetVotedByManagerList.length > 10 ? '80vh' : undefined,
  };

  React.useEffect(() => {
    if (!isLoadingVotedManagerList) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoadingVotedManagerList]);

  return (
    <Page key={1} className='pt-4'>
      <div className='row pdfpagebreak pt-2'>
        <div className='col-12' id='loadItem'>
          {isLoadingVotedManagerList ? (
            <div className='vh-100'>
              <div className='h-50'>
                {procedureRunningEstimateTime !== undefined && (
                  <ProgressBar avgElapsedTime={procedureRunningEstimateTime} />
                )}
              </div>
            </div>
          ) : lstGetVotedByManagerList.length > 0 ? (
            <div>
              <ErrorBoundary hasCard cardtitle=''>
              <Table
                gridOptions={gridOptionFundVotes}
                hideExcelDownloadIcon={TrialUserDisableDownload}
              />
              </ErrorBoundary>
            </div>
          ) : (
            <Card title=''>{NORECORDS}</Card>
          )}
        </div>
      </div>
    </Page>
  );
};

InvestorVotingFundsVoted.propTypes = {
  isLoadingVotedManagerList: PropTypes.bool,
  lstGetVotedByManagerList: PropTypes.array,
  procedureRunningEstimateTime: PropTypes.number,
  TrialStatus: PropTypes.bool,
  TrialUserDisableDownload: PropTypes.bool,
};

InvestorVotingFundsVoted.defaultProps = {
  procedureRunningEstimateTime: undefined,
  isLoadingVotedManagerList: true,
  lstGetVotedByManagerList: [],
  TrialStatus: false,
  TrialUserDisableDownload: false,
};

export default InvestorVotingFundsVoted;
