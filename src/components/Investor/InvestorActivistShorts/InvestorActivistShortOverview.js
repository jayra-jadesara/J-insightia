import PropTypes from 'prop-types';
import React, { lazy, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import { history } from '../../../utils/navigation-util';
import { filters } from '../../../utils/AgGridFunctions';
import VotingProfileContacts from '../InvestorVoting/VotingProfile/VotingProfileContacts';
import msgConst from '../../../constants/MessageConstans';
import Card from '../../GeneralForm/Card';
import TwitterComponent from '../../GeneralForm/TwitterComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Table = lazy(() => import('../../GeneralForm/Table'));
const D3PieChart = lazy(() => import('../../GeneralForm/D3PieChart'));

const InvestorActivistShortOverview = ({
  lstCampaignTypesbyActivist,
  lstCountryFocusChartData,
  lstSectorFocusData,
  lstMarketCapOfInvestmentData,
  investmentStrategy,
  lstActivistPersonnel,
  dataContactDetails,
  lstActivistOffices,
  activistProfileData,
  loadingData,
  TrialUserDisableDownload,
  TrialStatus,
}) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const [strategyIdDiv, SetStrategyIdDiv] = useState(null);
  const [twitterDiv, SetTwiteerDiv] = useState(null);
  const divStrategyIdRef = useRef(null);

  const gridOptionActivistShortOverview = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Primary Allegation',
        field: 'action',
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 210,
        maxWidth: query.print ? 210 : null,
      },
      {
        headerName: new Date().getUTCFullYear() - 8,
        field: 'year_2',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 7,
        field: 'year_3',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 6,
        field: 'year_4',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 5,
        field: 'year_5',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 4,
        field: 'year_6',

        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 3,
        field: 'year_7',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 2,
        field: 'year_8',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: new Date().getUTCFullYear() - 1,
        field: 'year_9',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: `${new Date().getUTCFullYear()} YTD`,
        field: 'current_year',
        cellClass: TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-2 pe-2 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-2 pe-2 ag-right-aligned-cell',
        minWidth: query.print ? 110 : 90,
        maxWidth: query.print ? 110 : 90,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData: lstCampaignTypesbyActivist,
  };
  const gridOptionActivistOffices = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Address',
        field: 'address',
        minWidth: 300,
        maxWidth: query.print ? 300 : null,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'City',
        field: 'city',
        minWidth: 130,
        maxWidth: 130,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'State',
        field: 'state',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Zip',
        field: 'zip',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Country',
        field: 'country_name',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Tel',
        field: 'telephone',
        minWidth: 150,
        maxWidth: 150,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Fax',
        field: 'fax',
        minWidth: 153,
        maxWidth: 153,
        type: ['autoHeightTrue'],
        cellClass: TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
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
    rowData: lstActivistOffices.map((x) => ({
      ...x,
      TrialStatus: TrialStatus,
      allowDownload: false,
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false },
  };

  useEffect(() => {
    if (divStrategyIdRef.current !== null && strategyIdDiv === null) {
      setTimeout(() => {
        SetStrategyIdDiv(divStrategyIdRef.current);
      }, 1000);
    }
  });

  useEffect(() => {
    if (strategyIdDiv !== null) {
      SetTwiteerDiv(
        <>
          {!query.print &&
            activistProfileData.twitter_URL !== undefined &&
            activistProfileData.twitter_URL !== null &&
            activistProfileData.twitter_URL !== '' && (
              <div className='col-4 fadeInAnimation'>
                <ErrorBoundary hasCard cardtitle='Twitter'>
                  <TwitterComponent
                    twitter_URL={activistProfileData.twitter_URL}
                    TrialStatus={TrialStatus}
                    twitterCardHeight={strategyIdDiv.scrollHeight < 200 ? '200px' : `${strategyIdDiv.scrollHeight}px`}
                    tweetScrollable
                  />
                </ErrorBoundary>
              </div>
            )}
        </>
      );
    }
  }, [strategyIdDiv, activistProfileData, query.print]);

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
        msgConst.LOADING
      ) : (
        <>
          {/* Charts */}
          {(lstCountryFocusChartData.length > 0 ||
            lstMarketCapOfInvestmentData.length > 0 ||
            lstSectorFocusData.length > 0) && (
            <div className='row pt-2' id='loadItem'>
              {lstCountryFocusChartData.length > 0 && (
                <div className='chartArea d-flex col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                  <ErrorBoundary hasCard cardtitle='Country Focus'>
                    <D3PieChart
                      data={lstCountryFocusChartData}
                      cardtitle='Country Focus'
                      isComp={false}
                      isInvest={false}
                      innerRadius={50}
                      outerRadius={100}
                      isDynamicViewbox
                      svgMainHeight={250}
                      svgMainWidth={250}
                      TrialUser={TrialStatus}
                    />
                  </ErrorBoundary>
                </div>
              )}
              {lstMarketCapOfInvestmentData.length > 0 && (
                <div className='chartArea d-flex col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                  <ErrorBoundary hasCard cardtitle='Market Cap of Investments ($mn)'>
                    <D3PieChart
                      data={lstMarketCapOfInvestmentData}
                      cardtitle='Market Cap of Investments ($mn)'
                      isComp={false}
                      isInvest={false}
                      innerRadius={50}
                      outerRadius={100}
                      isDynamicViewbox
                      svgMainHeight={250}
                      svgMainWidth={250}
                      TrialUser={TrialStatus}
                    />
                  </ErrorBoundary>
                </div>
              )}
              {lstSectorFocusData.length > 0 && (
                <div className='chartArea d-flex col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                  <ErrorBoundary hasCard cardtitle='Sector Focus'>
                    <D3PieChart
                      data={lstSectorFocusData}
                      cardtitle='Sector Focus'
                      isComp={false}
                      isInvest={false}
                      innerRadius={50}
                      outerRadius={100}
                      isDynamicViewbox
                      svgMainHeight={250}
                      svgMainWidth={250}
                      TrialUser={TrialStatus}
                    />
                  </ErrorBoundary>
                </div>
              )}
            </div>
          )}

          {/* Investment Strategy  &  Twitter */}
          <div className='row pt-4'>
            <div
              className={
                query.print ||
                activistProfileData.twitter_URL === undefined ||
                activistProfileData.twitter_URL === null ||
                activistProfileData.twitter_URL === ''
                  ? 'col-12'
                  : 'col-8'
              }
            >
              <Card title='Investment Strategy'>
                <div className={TrialStatus ? 'card2 blurrytext' : 'card2'} id='strategyId' ref={divStrategyIdRef}>
                  <span className='col-12'>{investmentStrategy !== '' ? investmentStrategy : msgConst.NORECORDS}</span>
                </div>
              </Card>
            </div>
            {twitterDiv}
          </div>

          {/* Allegations */}
          {lstCampaignTypesbyActivist.length > 0 && (
            <div className='row pt-2'>
              <div className='col-lg-12'>
                <ErrorBoundary hasCard cardtitle='Allegations'>
                  <Table
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                    gridOptions={gridOptionActivistShortOverview}
                    title='Allegations'
                    pageTitle='Allegations'
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {/* Offices */}
          {lstCampaignTypesbyActivist.length > 0 && (
            <div className='row pt-2'>
              <div className='d-flex col-md-12 col-12'>
                <ErrorBoundary hasCard cardtitle='Offices'>
                  <Table
                    isHide={false}
                    IsShowCard
                    title='Offices'
                    smalltitle=''
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                    enableCharts
                    gridOptions={gridOptionActivistOffices}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {/* Contacts */}
          {lstActivistPersonnel.length > 0 && (
            <div className='row m-0 pt-2'>
              <div className='col mt-2 p-0'>
                <ErrorBoundary hasCard cardtitle='Contacts'>
                  <VotingProfileContacts
                    tableContacts={lstActivistPersonnel}
                    dataContactDetails={dataContactDetails}
                    TrialStatus={TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

InvestorActivistShortOverview.propTypes = {
  location: PropTypes.object,
};

InvestorActivistShortOverview.defaultProps = {
  location: {},
};

export default withRouter(InvestorActivistShortOverview);
