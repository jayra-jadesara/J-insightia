import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import Table from '../../../GeneralForm/Table';
import Card from '../../../GeneralForm/Card';
import { filters } from '../../../../utils/AgGridFunctions';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileSummary = ({
  location,
  tableVotingPolicyChanges,
  loadingData,
  allowDownload,
  TrialStatus,
  TrialUserDisableDownload,
  InvestorTitle
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  const gridOptions_VotingPolicyChanges = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'date',
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 dateFormat text-center'
          : 'ws-normal-lh24 ps-1 pe-1 dateFormat text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Category',
        field: 'category',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: 200
      },
      {
        headerName: 'Sub Category',
        field: 'subCategory',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 200,
        maxWidth: query.print ? 200 : 600
      },
      {
        headerName: 'Summary of Change',
        field: 'summaryChange',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 540,
        maxWidth: query.print ? 540 : 1000
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'document_type',
          pinned: 'left'
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: false,
    rowData: tableVotingPolicyChanges.map((x) => ({
      ...x,
      TrialStatus,
      allowDownload
    }))
  };

  return (
    <div className='pt-2'>
      {!loadingData &&
        tableVotingPolicyChanges.length === numConst.EMPTY_TABLE_LENGTH && (
          <Card title='Voting Policy Changes'>{NORECORDS}</Card>
        )}
      {!loadingData && tableVotingPolicyChanges.length > 0 && (
        <Table
          hideExcelDownloadIcon={TrialUserDisableDownload}
          pageTitle={InvestorTitle}
          title='Voting Policy Changes'
          smalltitle=''
          gridOptions={gridOptions_VotingPolicyChanges}
        />
      )}
    </div>
  );
};

VotingProfileSummary.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableVotingPolicyChanges: PropTypes.array
};
VotingProfileSummary.defaultProps = {
  tableVotingPolicyChanges: []
};

export default withRouter(VotingProfileSummary);
