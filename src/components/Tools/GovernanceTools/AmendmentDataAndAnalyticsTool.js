import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import { filters,
  bottomStatusBar } from '../../../utils/AgGridFunctions';
import { dateToNull } from '../../../utils/general-util';
import {
  GOVERNANCE_OVERVIEW,
  QUERY_PID
} from '../../../constants/PathsConstant';
import { NORECORDS } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import ProgressBar from '../../GeneralForm/ProgressBar';

const AmendmentDataAndAnalyticsTool = (props) => {
  const gridOptions_AmendmentDataAndAnalyticsTool = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'PI_Company_name',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 180,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" href="${GOVERNANCE_OVERVIEW}${QUERY_PID}${params.data.PID}">
                  ${params.data.PI_Company_name}</a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Amendment Type',
        field: 'gov_amend_type',
        minWidth: 150,
        maxWidth: 180,
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Categories',
        field: 'amend_cat',
        minWidth: 120,
        type: ['autoHeightTrue', 'setColumn'],
        filter: 'agSetColumnFilter',
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Date',
        field: 'datetime',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
      },
      {
        headerName: 'Year',
        field: 'year',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue', 'numberColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1 text-center'
      },
      {
        headerName: 'Industry',
        field: 'industry',
        minWidth: 120,
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Sector',
        field: 'sector',
        minWidth: 180,
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Indexes',
        field: 'indexes',
        type: ['autoHeightTrue', 'textColumn'],
        minWidth: 180,
        cellClass: 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Link',
        field: 'url',
        minWidth: 80,
        maxWidth: 500,
        type: ['nonFloatingFilter'],
        cellClass: 'hyperlinksExcelExport ws-normal-lh24 ps-1 pe-1 text-center',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" target="_blank" href="${params.data.url}">View</a>`;
          return eDiv;
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'campaign_name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: true,
    statusBar: bottomStatusBar,
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '72vh',
    rowData: props.table_AmendmentDataandAnalytics && props.table_AmendmentDataandAnalytics.map((x) => ({
      ...x,
      datetime:
        x.datetime !== null ? dateToNull(x.datetime, 'dd-mmm-yy', true) : ''
    })),
    columnWidth: 280,
  };

  return (
    <Page {...props} key={1} className='pt-3 pb-3'>
      {props.isLoading && (
        <div className='vh-100'>
          <div className='h-50'>
            {props.procedureRunningEstimateTime !== undefined && (
              <ProgressBar
                avgElapsedTime={props.procedureRunningEstimateTime}
              />
            )}
          </div>
        </div>
      )}

      {!props.isLoading &&
        (props.table_AmendmentDataandAnalytics.length > 0 ? (
          <Table
            IsShowCard
            pageTitle='Amendment Data and Analytics'
            title='Amendment Data and Analytics'
            smalltitle=''
            gridOptions={gridOptions_AmendmentDataAndAnalyticsTool}
            hideExcelDownloadIcon={props.trialUserDisableDownload}
          />
        ) : (
          <Card title='Amendment Data and Analytics'>{NORECORDS}</Card>
        ))}
    </Page>
  );
};

export default withRouter(React.memo(AmendmentDataAndAnalyticsTool));
