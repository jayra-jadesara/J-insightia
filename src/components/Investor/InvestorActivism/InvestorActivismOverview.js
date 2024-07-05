import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';
import VotingProfileContacts from '../InvestorVoting/VotingProfile/VotingProfileContacts';
import Table from '../../GeneralForm/Table';
import D3PieChart from '../../GeneralForm/D3PieChart';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import { dateToNull } from '../../../utils/general-util';
import Card from '../../GeneralForm/Card';
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivismOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const gridOptionCampaignTypesbyActivist = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Public Demand',
        field: 'Public Demand',
        minWidth: 290,
        maxWidth: query.print ? 290 : null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: new Date().getUTCFullYear() - 8,
        field: 'year_2',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 7,
        field: 'year_3',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 6,
        field: 'year_4',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 5,
        field: 'year_5',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 4,
        field: 'year_6',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 3,
        field: 'year_7',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 2,
        field: 'year_8',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: new Date().getUTCFullYear() - 1,
        field: 'year_9',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
      {
        headerName: `${new Date().getUTCFullYear()} YTD`, //current year
        field: 'current_year',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext text-center' : 'ws-normal-lh24 text-center',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: props.lstCampaignTypesbyActivist.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false,
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false },
  };

  const gridOptionActivistOffices = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Address',
        field: 'address',
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'City',
        field: 'city',
        minWidth: 130,
        maxWidth: 130,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'State',
        field: 'state',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Zip',
        field: 'zip',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Country',
        field: 'country_name',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Tel',
        field: 'telephone',
        minWidth: 150,
        maxWidth: 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Fax',
        field: 'fax',
        minWidth: 153,
        maxWidth: 153,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: props.lstActivistOffices.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false,
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false },
  };

  const gridOptions_Timeline = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'Date',
        minWidth: 100,
        maxWidth: 100,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
      },
      {
        headerName: 'Company',
        field: 'Company',
        minWidth: 200,
        maxWidth: query.print ? 200 : 500,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.ACTIVISM_OVERVIEW}?pid=${params.data.PID}">
          ${params.data.Company}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Timeline',
        field: 'Timeline',
        minWidth: 633,
        maxWidth: query.print ? 633 : null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Campaign',
        field: '',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 text-center'
          : 'ws-normal-lh24 ps-2 pe-2 text-center',
        minWidth: 100,
        maxWidth: query.print ? 100 : 120,
        type: ['autoHeightTrue'],
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.ACTIVIST_CAMPAIGNS}?pid=${params.data.PID}">
          Detail</a>`;
          return eDiv;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: props.lstActivistTimeline.map((x) => ({
      ...x,
      Date: dateToNull(x.Date, 'dd-mmm-yy', true),
      TrialStatus: props.TrialStatus,
      allowDownload: false,
    })),
    selectedColumns: ['Date', 'Company', 'Timeline'],
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: !query.print, pageSize: 10 },
  };

  const gridOptions_ShareholderProposals = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'Company_name',
        minWidth: 180,
        maxWidth: 300,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.ACTIVISM_OVERVIEW}?pid=${params.data.PID}">
            ${params.data.Company_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Proposal',
        field: 'proposal_detail',
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Date of Meeting',
        field: 'meeting_date',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'dateFormat', 'text-center'],
      },
      {
        headerName: 'ISS Recommendations(i)',
        field: 'ISS_Recomm',
        minWidth: 150,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          const data = params.data.ISS_Recomm;
          if (data !== null) {
            const splitvalue = data.split('*').slice(0, -1);
            eDiv.innerHTML = `${splitvalue}<label title='${splitvalue}'>*</label>`;
          } else {
            eDiv.innerHTML = `${data !== null ? data : ''}`;
          }
          return eDiv;
        },
      },
      {
        headerName: 'Glass Lewis Recommendations',
        field: 'Glass_Lewis',
        minWidth: 100,
        maxWidth: 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Vote for at AGM',
        field: 'for_pcent',
        minWidth: 100,
        maxWidth: query.print ? 100 : 150,
        type: ['autoHeightTrue'],
        cellRendererFramework: (params) => checkValuesToFixed(params.data.for_pcent, 1),
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: props.lstActivistSharholderProposals.map((x) => ({
      ...x,
      meeting_date: dateToNull(x.meeting_date, 'dd-mmm-yy', true),
      TrialStatus: props.TrialStatus,
      allowDownload: false,
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false },
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
    <Page {...props} key={1} className='pt-4'>
      {props.isLoading ? (
        msgConst.LOADING
      ) : (
        <>
          <div className='row investorOverview pt-2' id='loadItem'>
            <div className='col-md-12 col-12 mb-3'>
              <Card title='Summary'>
                <div className={props.TrialStatus ? 'blurrytext' : ''}>
                  <div className='row card1'>
                    <span className='col-6 mb-1 customSubHeadersInCards'>Level of Activism:</span>
                    <span className='col-6 mb-1'>
                      {props.activismStrategyData !== undefined && props.activismStrategyData.focused_type}
                    </span>
                  </div>
                  <div className='row card2'>
                    <span className='col-6 mb-1 customSubHeadersInCards'>Approach:</span>
                    <span className='col-6 mb-1'>
                      {props.activismStrategyData !== undefined && props.activismStrategyData.strategy_type}
                    </span>
                  </div>
                  <div className='row card2'>
                    <span className='col-6 mb-1 customSubHeadersInCards'>Board Representation:</span>
                    <span className='col-6 mb-1'>
                      {props.activismStrategyData !== undefined && props.activismStrategyData.board_representation}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className='row m-0 investorOverview pt-1'>
            {props.holdingsbyCountryChartData !== undefined && props.holdingsbyCountryChartData.length !== 0 && (
              <div className='col-md-3 col-12 ps-0'>
                <ErrorBoundary hasCard cardtitle='Country Focus'>
                  <D3PieChart
                    data={props.holdingsbyCountryChartData}
                    isComp={false}
                    isInvest={false}
                    innerRadius={query.print ? 40 : 50}
                    outerRadius={query.print ? 80 : 100}
                    // height={300}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    cardtitle='Country Focus'
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
            {props.holdingsbyMarketCapChartData !== undefined && props.holdingsbyMarketCapChartData.length !== 0 && (
              <div className='col-md-3 col-12'>
                <ErrorBoundary hasCard cardtitle='Market Cap of of Investments($mn)'>
                  <D3PieChart
                    data={props.holdingsbyMarketCapChartData}
                    isComp={false}
                    isInvest={false}
                    innerRadius={query.print ? 40 : 50}
                    outerRadius={query.print ? 80 : 100}
                    // height={300}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    cardtitle='Market Cap of of Investments($mn)'
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
            {props.holdingsbyIndustryChartData !== undefined && props.holdingsbyIndustryChartData.length !== 0 && (
              <div className='col-md-3 col-12'>
                <ErrorBoundary hasCard cardtitle='Sector Focus'>
                  <D3PieChart
                    data={props.holdingsbyIndustryChartData}
                    isComp={false}
                    isInvest={false}
                    innerRadius={query.print ? 40 : 50}
                    outerRadius={query.print ? 80 : 100}
                    // height={300}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    cardtitle='Sector Focus'
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
            {props.holdingsbyExitTypeChartData !== undefined && props.holdingsbyExitTypeChartData.length !== 0 && (
              <div className='col-md-3 col-12 pe-0'>
                <ErrorBoundary hasCard cardtitle='Exit Types'>
                  <D3PieChart
                    data={props.holdingsbyExitTypeChartData}
                    isComp={false}
                    isInvest={false}
                    innerRadius={query.print ? 40 : 50}
                    outerRadius={query.print ? 80 : 100}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    cardtitle='Exit Types'
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>

          <div className='row pt-2'>
            <div className='col-12'>
              <Card title='Investment Strategy'>
                <div className='card2'>
                  <span className={props.TrialStatus ? 'col-12 blurrytext' : 'col-12'}>{props.investmentStrategy}</span>
                </div>
              </Card>
            </div>
          </div>

          {props.lstCampaignTypesbyActivist.length > 0 && (
            <div className='row pt-2'>
              <div className='d-flex col-md-12 col-12'>
                <ErrorBoundary hasCard cardtitle='Public Activist Demands'>
                  <Table
                    isHide={false}
                    IsShowCard
                    title='Public Activist Demands'
                    smalltitle=''
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    enableCharts
                    gridOptions={gridOptionCampaignTypesbyActivist}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {props.lstCampaignTypesbyActivist.length > 0 && (
            <div className='row pt-4'>
              <div className='d-flex col-md-12 col-12'>
                <ErrorBoundary hasCard cardtitle='Offices'>
                  <Table
                    isHide={false}
                    IsShowCard
                    title='Offices'
                    smalltitle=''
                    hideExcelDownloadIcon={props.TrialUserDisableDownload}
                    enableCharts
                    gridOptions={gridOptionActivistOffices}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {props.lstActivistPersonnel.length > 0 && (
            <div className='row pt-4'>
              <div className='col'>
                <ErrorBoundary hasCard cardtitle='Contacts'>
                  <VotingProfileContacts
                    tableContacts={props.lstActivistPersonnel}
                    dataContactDetails={props.dataContactDetails}
                    TrialStatus={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {props.lstActivistTimeline.length > 0 && (
            <div className='row pt-1'>
              <div className='col-12 m-0 p-0'>
                {query.print ? (
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    isHide={false}
                    title='Timelines'
                    smalltitle=''
                    gridOptions={gridOptions_Timeline}
                  />
                ) : (
                  <CollapseComponent isOpen={false} Heading='Timelines'>
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        isHide={false}
                        title='Timelines'
                        smalltitle=''
                        gridOptions={gridOptions_Timeline}
                      />
                    </ErrorBoundary>
                  </CollapseComponent>
                )}
              </div>
            </div>
          )}

          {props.lstActivistSharholderProposals.length > 0 && (
            <div className='row pt-1 pdfpagebreak'>
              <div className='col-md-12 col-12 mt-3 p-0'>
                {query.print ? (
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    isHide={false}
                    title='Shareholder Proposals'
                    smalltitle=''
                    gridOptions={gridOptions_ShareholderProposals}
                  />
                ) : (
                  <CollapseComponent isOpen={false} Heading='Shareholder Proposals'>
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        isHide={false}
                        title='Shareholder Proposals'
                        smalltitle=''
                        gridOptions={gridOptions_ShareholderProposals}
                      />
                    </ErrorBoundary>
                  </CollapseComponent>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

InvestorActivismOverview.propTypes = {
  location: PropTypes.object,
  lstActivistPersonnel: PropTypes.array,
};

InvestorActivismOverview.defaultProps = {
  location: {},
  lstActivistPersonnel: [],
};

export default withRouter(React.memo(InvestorActivismOverview));
