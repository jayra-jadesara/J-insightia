import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import { Link } from 'react-router-dom';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import pathConst from '../../../constants/PathsConstant';
import Page from '../../Page';
import PeriodConstant from '../../../constants/InvestorActivismConstants';
import Card from '../../GeneralForm/Card';
import { dateToNull } from '../../../utils/general-util';
import Table from '../../GeneralForm/Table';
import DropdownList from '../../GeneralForm/DropdownList';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import { filters } from '../../../utils/AgGridFunctions';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivismPerformance = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  let lineChartData = [];
  const [fundName, setFundName] = useState('');
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  useEffect(() => {
    if (props.lstPerformancePeriodicbyActivist.length > 0) {
      setFundName(props.lstPerformancePeriodicbyActivist[0].fund_name);
    }
  }, [props.lstPerformancePeriodicbyActivist, setFundName]);

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const gridOptions_lstPerformancePeriodicbyActivist = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Fund',
        field: 'fund_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: query.print ? 190 : 250,
        maxWidth: query.print ? 190 : null
      },
      {
        headerName: 'Launched',
        field: 'launch_year',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 80,
        maxWidth: 80
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
        headerName: '1 Month',
        field: 'perf_1_month',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_1_month > 0 ? 'text-success' : 'text-danger'
          }>
          ${params.data.perf_1_month !== null ? params.data.perf_1_month : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '3 Month',
        field: 'perf_3_month',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_3_month > 0 ? 'text-success' : 'text-danger'
          }
        >
        ${params.data.perf_3_month !== null ? params.data.perf_3_month : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: 'YTD',
        field: 'perf_YTD',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_YTD > 0 ? 'text-success' : 'text-danger'
          }
        >
        ${params.data.perf_YTD !== null ? params.data.perf_YTD : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '1 Year',
        field: 'perf_1_year',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_1_year > 0 ? 'text-success' : 'text-danger'
          }
        >
        ${params.data.perf_1_year !== null ? params.data.perf_1_year : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '3 Year',
        field: 'perf_3_year',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 70,
        maxWidth: query.print ? 70 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_3_year > 0 ? 'text-success' : 'text-danger'
          }
        >
        ${params.data.perf_3_year !== null ? params.data.perf_3_year : ''}
        </span>`;
          return eDiv;
        }
      },
      {
        headerName: '5 Year',
        field: 'perf_5_year',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: query.print ? 105 : 70,
        maxWidth: query.print ? 105 : 90,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<span class=${
            params.data.perf_5_year > 0 ? 'text-success' : 'text-danger'
          }
        >
        ${params.data.perf_5_year !== null ? params.data.perf_5_year : ''}
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
    rowData: props.lstPerformancePeriodicbyActivist.map((x) => ({
      ...x,
      date_reported: dateToNull(x.date_reported, 'dd-mmm-yy', true),
      // perf_1_month: x.perf_1_month !== undefined ? Number(x.perf_1_month).toFixed(2) : "",
      // perf_3_month: x.perf_3_month !== undefined ? Number(x.perf_3_month).toFixed(2) : "",
      // perf_YTD: x.perf_YTD !== undefined ? Number(x.perf_YTD).toFixed(2) : "",
      // perf_1_year: x.perf_1_year !== undefined ? Number(x.perf_1_year).toFixed(2) : "",
      // perf_3_year: x.perf_3_year !== undefined ? Number(x.perf_3_year).toFixed(2) : "",
      // perf_5_year: x.perf_5_year !== undefined ? Number(x.perf_5_year).toFixed(2) : "",
      TrialStatus: props.TrialStatus,
      allowDownload: false
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false }
  };

  // **ARRAY MODIFICATION FOR RESULT IN LINE CHART** //

  const month = {};
  month.AI_return = PeriodConstant.MONTH_0;
  month.MSCI_return = PeriodConstant.MONTH_0;
  month.Index_return = PeriodConstant.MONTH_0;
  month.Month = PeriodConstant.MONTH_0;

  if (props.lstPerformancePeriodicbyActivist.length > 0) {
    const month1 = {};
    props.lstPerformancePeriodicbyActivist.map(
      (d) => (month1[d.fund_name] = d.perf_1_month)
    );
    month1.Month = PeriodConstant.MONTH_1;

    const month3 = {};
    props.lstPerformancePeriodicbyActivist.map(
      (d) => (month3[d.fund_name] = d.perf_3_month)
    );
    month3.Month = PeriodConstant.MONTH_3;

    const year1 = {};
    props.lstPerformancePeriodicbyActivist.map(
      (d) => (year1[d.fund_name] = d.perf_1_year)
    );
    year1.Month = PeriodConstant.YEAR_1;

    const year3 = {};
    props.lstPerformancePeriodicbyActivist.map(
      (d) => (year3[d.fund_name] = d.perf_3_year)
    );
    year3.Month = PeriodConstant.YEAR_3;

    const year5 = {};
    props.lstPerformancePeriodicbyActivist.map(
      (d) => (year5[d.fund_name] = d.perf_5_year)
    );
    year5.Month = PeriodConstant.YEAR_5;

    lineChartData = [month, month1, month3, year1, year3, year5];
  }
  const periodicPerformanceLineChart = {
    options: {
      autoSize: true,
      data: lineChartData,
      series: [
        {
          xKey: 'Month',
          yKey: 'MSCI World Total Return',
          yName: 'MSCI World Total Return'
        },
        {
          xKey: 'Month',
          yKey: 'S&P 500 Total Return',
          yName: 'S&P 500 Total Return'
        },
        {
          xKey: 'Month',
          yKey: fundName,
          yName: fundName
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left'
        },
        {
          type: 'number',
          position: 'bottom',
          tick: {
            count: 20
          }
        }
      ],
      legend: {
        position: 'bottom'
      }
    }
  };

  if (lineChartData.length === numConst.EMPTY_TABLE_LENGTH) {
    agCharts.AgChart.create(periodicPerformanceLineChart);
  }

  React.useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        loadedItem.textContent = '';
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoading]);

  return (
    <Page {...props} key={1} className='cr-InvestorActivismPerformance pt-3'>
      {props.isLoading ? (
        msgConst.LOADING
      ) : (
        <>
          <div className='row pt-2' id='loadItem'>
            <div className='col-12 col-md-12 mb-2'>
              <Card title='Periodic Performance'>
                <div className='row'>
                  <div
                    className='col-sm-8 text-start m-0'
                    style={
                      width < breakpoint
                        ? {
                            position: 'relative',
                            paddingTop: '2rem'
                          }
                        : {}
                    }
                  >
                    {props.lstofReprtingDate.length > 0 && (
                      <div className='row align-items-center'>
                        <div className='col-sm-3 text-primary m-0'>
                          Select Reported Date :
                        </div>
                        <div className='col-sm-3 m-0'>
                          <DropdownList
                            options={props.lstofReprtingDate.map((list) => ({
                              label: list.date_reported1,
                              value: list.date_reported
                            }))}
                            handleChange={(e) => {
                              props.handleChangeDate(e);
                            }}
                            placeholder='Reported Date'
                            Dvalue={props.reportedDate}
                            maxHeight={180}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-4 text-start'>
                    <Link
                      to={`${pathConst.INVESTOR_ACTIVISM_PERFORMANCE_ANNUAL}?investor=${query.investor}`}
                      className='btn btn-primary'
                      style={
                        width < breakpoint
                          ? {
                              position: 'relative',
                              bottom: '30px',
                              top: '-6rem',
                              float: 'right'
                            }
                          : { position: 'relative', bottom: '30px' }
                      }
                    >
                      Annual
                    </Link>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-12'>
                    {props.lstPerformancePeriodicbyActivist.length > 0 ? (
                      <ErrorBoundary>
                        <Table
                          IsShowCard={false}
                          hideExcelDownloadIcon={props.TrialUserDisableDownload}
                          isHide={false}
                          title=''
                          smalltitle=''
                          gridOptions={
                            gridOptions_lstPerformancePeriodicbyActivist
                          }
                        />
                      </ErrorBoundary>
                    ) : (
                      <Card title=''>{msgConst.NORECORDS}</Card>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {props.lstPerformancePeriodicbyActivist.length > 0 && (
            <div className='row pdfpagebreak pt-2'>
              <div className='col-12 col-md-12 mb-2'>
                <Card addedClass={props.TrialStatus ? 'blurrytext' : ''}>
                  <ErrorBoundary>
                    <AgChartsReact
                      options={periodicPerformanceLineChart.options}
                    />
                  </ErrorBoundary>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

InvestorActivismPerformance.propTypes = {
  location: PropTypes.object
};

InvestorActivismPerformance.defaultProps = {
  location: {}
};

export default withRouter(React.memo(InvestorActivismPerformance));
