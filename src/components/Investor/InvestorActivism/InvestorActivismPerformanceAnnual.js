import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import { Link } from 'react-router-dom';
import Page from '../../Page';
import pathConst, { QUERY_INVESTOR } from '../../../constants/PathsConstant';
import msgConst from '../../../constants/MessageConstans';
import numConst from '../../../constants/NumberConstants';
import Card from '../../GeneralForm/Card';
import Table from '../../GeneralForm/Table';
import PeriodConstant from '../../../constants/InvestorActivismConstants';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivismPerformanceAnnual = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [fundName, setFundName] = useState('');
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  useEffect(() => {
    if (props.lstPerformanceAnnualbyActivist.length > 0) {
      setFundName(props.lstPerformanceAnnualbyActivist[0].fund_name);
    }
  }, [props.lstPerformanceAnnualbyActivist, setFundName]);

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  let BarChartData = [];
  const gridOptions_lstPerformanceAnnualbyActivist = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Fund',
        field: 'fund_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 190,
        maxWidth: query.print ? 190 : null
      },
      {
        headerName: 'Launched',
        field: 'launch_year',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Region',
        field: 'regional_focus',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 120,
        maxWidth: 120
      },
      {
        headerName: 'Assets (mn)',
        field: 'assets',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Date',
        field: 'date_reported',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 90,
        maxWidth: 90
      },
      {
        headerName: '2015',
        field: 'perf_1',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_1 > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_1 !== null ? params.data.perf_1 : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '2016',
        field: 'perf_2',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_2 > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_2 !== null ? params.data.perf_2 : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '2017',
        field: 'perf_3',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_3 > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_3 !== null ? params.data.perf_3 : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '2018',
        field: 'perf_4',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_4 > 0 ? 'text-success' : 'text-danger'
          }>
          
          ${params.data.perf_4 !== null ? params.data.perf_4 : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '2019',
        field: 'perf_5',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_5 > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_5 !== null ? params.data.perf_5 : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '2020',
        field: 'perf_6',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_6 > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_6 !== null ? params.data.perf_6 : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '2021 YTD',
        field: 'perf_7',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_7 > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_7 !== null ? params.data.perf_7 : ''}
        </span>`;
          return eDiv;
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    pivotMode: false,
    rowData: props.lstPerformanceAnnualbyActivist.map((x) => ({
      ...x,
      date_reported: dateToNull(x.date_reported, 'dd-mmm-yy', true),
      // perf_1: x.perf_1 !== undefined ? Number(x.perf_1).toFixed(2) : "",
      // perf_2: x.perf_2 !== undefined ? Number(x.perf_2).toFixed(2) : "",
      // perf_3: x.perf_1 !== undefined ? Number(x.perf_3).toFixed(2) : "",
      // perf_4: x.perf_1 !== undefined ? Number(x.perf_4).toFixed(2) : "",
      // perf_5: x.perf_1 !== undefined ? Number(x.perf_5).toFixed(2) : "",
      // perf_6: x.perf_1 !== undefined ? Number(x.perf_6).toFixed(2) : "",
      // perf_7: x.perf_1 !== undefined ? Number(x.perf_7).toFixed(2) : "",
      TrialStatus: props.TrialStatus,
      allowDownload: false
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false }
  };

  // **ARRAY MODIFICATION FOR RESULT IN LINE CHART

  if (props.lstPerformanceAnnualbyActivist.length > 0) {
    const year1 = {};
    year1.AI_return = props.lstPerformanceAnnualbyActivist.map(
      (d) => (year1[d.fund_name] = d.perf_1)
    );
    year1.Year = PeriodConstant.AYEAR_1;

    const year2 = {};
    props.lstPerformanceAnnualbyActivist.map(
      (d) => (year2[d.fund_name] = d.perf_2)
    );
    year2.Year = PeriodConstant.AYEAR_2;

    const year3 = {};
    props.lstPerformanceAnnualbyActivist.map(
      (d) => (year3[d.fund_name] = d.perf_3)
    );
    year3.Year = PeriodConstant.AYEAR_3;

    const year4 = {};
    props.lstPerformanceAnnualbyActivist.map(
      (d) => (year4[d.fund_name] = d.perf_4)
    );
    year4.Year = PeriodConstant.AYEAR_4;

    const year5 = {};
    props.lstPerformanceAnnualbyActivist.map(
      (d) => (year5[d.fund_name] = d.perf_5)
    );
    year5.Year = PeriodConstant.AYEAR_5;

    const year6 = {};
    props.lstPerformanceAnnualbyActivist.map(
      (d) => (year6[d.fund_name] = d.perf_6)
    );
    year6.Year = PeriodConstant.AYEAR_6;

    const year7 = {};
    props.lstPerformanceAnnualbyActivist.map(
      (d) => (year7[d.fund_name] = d.perf_7)
    );
    year7.Year = PeriodConstant.AYEAR_7;

    BarChartData = [year1, year2, year3, year4, year5, year6, year7];
  }

  const annualPerformanceBarChart = {
    immutableData: true,
    options: {
      autoSize: true,
      data: BarChartData,
      series: [
        {
          type: 'column',
          xKey: 'Year',
          yKeys: [
            'AI Activist Index',
            'MSCI World Total Return',
            'S&P 500 Total Return',
            fundName
          ],
          yNames: ['AI Activist Index', 'MSCI World', 'S&P 500', fundName],
          grouped: true
        }
      ],
      legend: {
        position: 'bottom'
      }
    }
  };

  if (BarChartData.length === numConst.EMPTY_TABLE_LENGTH) {
    agCharts.AgChart.create(annualPerformanceBarChart);
  }

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
    <Page {...props} key={1} className='pt-3'>
      {props.isLoading ? (
        msgConst.LOADING
      ) : (
        <>
          <div className='row' id='loadItem'>
            <div className='col-sm-12 my-2'>
              <Card title='Annual Performance'>
                <div className='row'>
                  <div className='col-8 text-start m-0' />
                  <div className='col-4 text-start m-0'>
                    <Link
                      to={
                        pathConst.INVESTOR_ACTIVISM_PERFORMANCE +
                        QUERY_INVESTOR +
                        query.investor
                      }
                      className='btn btn-primary'
                      style={
                        width < breakpoint
                          ? {
                              position: 'relative',
                              float: 'right'
                            }
                          : { position: 'relative', bottom: '30px' }
                      }
                    >
                      Periodic
                    </Link>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    {props.lstPerformanceAnnualbyActivist.length > 0 ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                          isHide={false}
                          title=''
                          smalltitle=''
                          gridOptions={gridOptions_lstPerformanceAnnualbyActivist}
                        />
                      </ErrorBoundary>
                    ) : (
                      <Card>{msgConst.NORECORDS}</Card>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-12 my-2 mt-2 mb-3'>
              {props.lstPerformanceAnnualbyActivist.length > 0 ? (
                <Card addedClass={props.TrialStatus ? 'blurrytext' : ''}>
                  <ErrorBoundary>
                    <AgChartsReact options={annualPerformanceBarChart.options} />
                  </ErrorBoundary>
                </Card>
              ) : (
                <Card>{msgConst.NORECORDS}</Card>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

InvestorActivismPerformanceAnnual.propTypes = {
  location: PropTypes.object
};

InvestorActivismPerformanceAnnual.defaultProps = {
  location: {}
};

export default withRouter(React.memo(InvestorActivismPerformanceAnnual));
