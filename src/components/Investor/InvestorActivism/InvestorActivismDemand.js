import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import { gridWidthReport } from '../../../utils/table-tools-util';
import Table from '../../GeneralForm/Table';
import { dateToNull } from '../../../utils/general-util';
import Card from '../../GeneralForm/Card';
import messageConst from '../../../constants/MessageConstans';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivismDemand = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const gridOptions_lstActivistGBRCampaigns = {
    immutableData: true,
    rowModelType: query.print ? '' : 'infinite',
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'name',
        minWidth: query.print ? 180 : 150,
        maxWidth: query.print ? 180 : null,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          if (!params.data) return null;
          if (!params.data.PID) return null;
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" target="_blank" rel="noopener noreferrer" href="${pathConst.ACTIVISM_OVERVIEW}?pid=${params.data.PID}">
            ${params.data.name}</a>`;
          return eDiv;
        }
      },
      {
        headerName: 'Date',
        field: 'action_date',
        minWidth: 100,
        maxWidth: 100,
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        cellRenderer: (params) => {
          if (!params.data) return null;
          if (!params.data.action_date) return null;

          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span>${dateToNull(params.data.action_date, 'dd-mmm-yy', true)}</span>`;
          return eDiv;
        }
      },
      {
        headerName: 'Board Seats Demanded',
        field: 'seats_proposed',
        minWidth: 100,
        maxWidth: 100,
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
      },
      {
        headerName: 'Board Seats Won/Agreed Upon',
        field: 'seats_won',
        minWidth: 100,
        maxWidth: 100,
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
      },
      {
        headerName: 'Went To Vote/Settlement',
        field: 'vote_settlement',
        minWidth: 120,
        maxWidth: 120,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Developments',
        field: 'response',
        minWidth: 120,
        maxWidth: 120,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Outcome Date',
        field: 'response_date',
        minWidth: 100,
        maxWidth: 100,
        autoHeight: true,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
        cellRenderer: (params) => {
          if (!params.data) return null;
          if (!params.data.response_date) return null;

          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span>${dateToNull(params.data.response_date, 'dd-mmm-yy', true)}</span>`;
          return eDiv;
        }
      },
      {
        headerName: 'Outcome',
        field: 'outcome',
        minWidth: 220,
        maxWidth: 220,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      }
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'Company',
          pinned: 'left'
        }
      ]
    },
    headerHeight: 60,
    pivotMode: false,
    rowData: props.lstActivistGBRCampaigns.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false,
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false }
  };

  const gridOptions_lstCampaignSummarybyActivist = {
    //masterDetail: false,
    // detailCellRendererParams: {
    //   detailGridOptions: {
    //     columnDefs: [
    //       {
    //         headerName: 'Detail',
    //         flex: 2,
    //         cellRendererFramework: (params) => (
    //           <div>
    //             <span style={{ 'font-weight': 'bold' }}>
    //               {params.data.characteristics_type ? `${params.data.characteristics_type} : ` : null}
    //             </span>
    //             <span>{params.data.date_from ? `${params.data.date_from} - ` : null}</span>
    //             <span>{params.data.characteristics_name ? params.data.characteristics_name : null}</span>
    //           </div>
    //         )
    //       }
    //     ]
    //   },
    //   getDetailRowData(params) {
    //     params.successCallback(params.data.subData);
    //   }
    // },
    // isRowMaster(dataItem) {
    //   return !!dataItem;
    // },
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'name',
        minWidth: 200,
        maxWidth: null,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
        //cellRenderer: 'agGroupCellRenderer'
        //rowGroup: true,
        //cellRendererFramework: (params) => (
        // <a href={`${pathConst.ACTIVISM_OVERVIEW}${pathConst.QUERY_PID} ${params.data.PID} target='_blank' rel='noopener noreferrer' `}
        // >
        //   {params.data.name}
        // </a>
        //)
      },
      {
        headerName: 'Company HQ',
        field: 'company_hq',
        minWidth: 170,
        maxWidth: 350,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Demand Date',
        field: 'action_date',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center']
      },
      {
        headerName: 'Demand',
        field: 'action',
        ...gridWidthReport,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Outcome Date',
        field: 'response_date',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center']
      },
      {
        headerName: 'Outcome',
        field: 'outcome',
        ...gridWidthReport,
        autoHeight: true,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      }
    ],
    colDefsMedalsExcluded: [],
    detailRowAutoHeight: true,
    defaultColDef: { flex: 1 },
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: true,
      columns: [
        {
          colId: 'Company',
          pinned: 'left'
        }
      ]
    },
    pivotMode: false,
    rowData: props.lstCampaignSummarybyActivist.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false,
      action_date: x.action_date ? dateToNull(x.action_date, 'dd-mmm-yy', true) : '',
      response_date: x.response_date ? dateToNull(x.response_date, 'dd-mmm-yy', true) : ''
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false }
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
    <Page {...props} key={1} className='cr-InvestorActivismDemand pt-3'>
      {props.isLoading ? (
        messageConst.LOADING
      ) : (
        <>
        <div id='loadItem'>
          {props.lstActivistGBRCampaigns.length > 0 && (
            <div className='row pt-2'>
              <div className='col-12 my-2 mt-0 mb-0'>
                {query.print ? (
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    isHide={false}
                    title='Gain Board Representation Demands'
                    smalltitle=''
                    gridOptions={gridOptions_lstActivistGBRCampaigns}
                  />
                ) : (
                  <CollapseComponent isOpen={false} Heading='Gain Board Representation Demands'>
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        isHide={false}
                        title=''
                        smalltitle=''
                        gridOptions={gridOptions_lstActivistGBRCampaigns}
                      />
                    </ErrorBoundary>
                  </CollapseComponent>
                )}
              </div>
            </div>
          )}

          {props.lstCampaignSummarybyActivist.length > 0 && (
            <div className='row pt-2'>
              <div className='col-12 my-2 mt-2 mb-2'>
                <ErrorBoundary hasCard cardtitle='Demands'>
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    isHide={false}
                    title='Demands'
                    smalltitle='Demands'
                    gridOptions={gridOptions_lstCampaignSummarybyActivist}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </div>
        </>
      )}
    </Page>
  );
};

InvestorActivismDemand.propTypes = {
  location: PropTypes.object
};

InvestorActivismDemand.defaultProps = {
  location: {}
};

export default withRouter(React.memo(InvestorActivismDemand));
