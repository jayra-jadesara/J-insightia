import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  COMPANY_OVERVIEW,
  ACTIVISTSHORTS_CAMPAIGNS,
  QUERY_PID
} from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { MAX_MOBILE_WIDTH } from '../../../constants/ScreenSizeConstant';
import { dateToNull } from '../../../utils/general-util';
import { history } from '../../../utils/navigation-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivistShortCampaign = ({
  lstCampaignSummarybyActivistAiS,
  TrialStatus,
  loadingData,
  TrialUserDisableDownload
}) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const { width } = useWindowDimensions();

  const gridOptionActivistShortCampaign = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'name',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 240 : width < MAX_MOBILE_WIDTH ? 150 : 225,
        maxWidth: query.print ? 240 : 300,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer"
                            href="${COMPANY_OVERVIEW}${QUERY_PID}${params.data.PID}">
                            ${params.data.name}</a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Announce Date',
        field: 'action_date',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 dateFormat ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 dateFormat ps-1 pe-1 text-center'
      },
      {
        headerName: 'Allegations',
        field: 'action',
        minWidth: 250,
        maxWidth: query.print ? 250 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'End Date',
        field: 'End_Date',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 dateFormat ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 dateFormat ps-1 pe-1 text-center'
      },
      {
        headerName: 'Campaign Return (%)',
        field: 'Campaign_Return',
        minWidth: 120,
        maxWidth: 120,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
      },
      {
        headerName: 'Campaign',
        field: 'PID',
        minWidth: 110,
        maxWidth: 110,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer" 
                            href="${ACTIVISTSHORTS_CAMPAIGNS}${QUERY_PID}${params.data.PID}">
                                Details
                            </a>`;
          return eDiv;
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width < MAX_MOBILE_WIDTH,
      columns: [
        {
          colId: 'name',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: lstCampaignSummarybyActivistAiS.map((x) => ({
      ...x,
      Campaign_Return:
        x.Campaign_Return !== null && x.Campaign_Return !== undefined
          ? x.Campaign_Return.toFixed(2)
          : '',

      action_date:
        x.action_date !== undefined && x.action_date !== null
          ? dateToNull(x.action_date, 'dd-mmm-yy', true)
          : '',

      End_Date:
        x.End_Date !== undefined && x.End_Date !== null
          ? dateToNull(x.End_Date, 'dd-mmm-yy', true)
          : '',

      TrialStatus: TrialStatus,
      allowDownload: false
    })),
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh'
  };

  React.useEffect(() => {
    if (!loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [loadingData]);

  return (
    <Page key={1} className='fadeInAnimation pt-4 pb-2'>
      {loadingData ? (
        LOADING
      ) : (
        <>
          <div className='row pt-2' id='loadItem'>
            <div className='col-lg-12'>
              {lstCampaignSummarybyActivistAiS.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Activist Short Campaigns'>
                  <Table
                    gridOptions={gridOptionActivistShortCampaign}
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                    title='Activist Short Campaigns'
                    pageTitle='Activist Short Campaigns'
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Activist Short Campaigns'>{NORECORDS}</Card>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

InvestorActivistShortCampaign.propTypes = {
  lstCampaignSummarybyActivistAiS: PropTypes.array,
  location: PropTypes.object
};

InvestorActivistShortCampaign.defaultProps = {
  lstCampaignSummarybyActivistAiS: [],
  location: {}
};
export default withRouter(InvestorActivistShortCampaign);
