import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import '../../../styles/components/_popupTrialUser.scss';
import pathConst from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import { checkValuesToFixed, gridWidthDates } from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';

const bem = bn.create('annualPerformance');

const AnnualPerformance = ({
  location,
  history,
  rowData,
  TrialStatus,
  allowDownload,
  GetPerformanceOverviewV2,
  trialUserDisableDownload
}) => {
  const [annualPerformance, setAnnualPerformance] = useState([]);

  useEffect(() => {
    if (typeof GetPerformanceOverviewV2 !== 'undefined') {
      setAnnualPerformance(GetPerformanceOverviewV2);
    }
    return function cleanup() {
      setAnnualPerformance([]);
    };
  }, [GetPerformanceOverviewV2]);

  const gridOptionsAnnualPerformance = {
    masterDetail: true,
    immutableData: true,
    sizeColumnsToFit: true,
    enableCharts: true,
    enableRangeSelection: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Fund',
            field: 'fund_name',
            flex: 2
          },
          {
            headerName: 'Manager',
            field: 'name',
            flex: 2
          },
          {
            headerName: 'Year Established',
            field: 'launch_year',
            ...gridWidthDates
          },
          {
            headerName: 'Fund Size',
            field: 'performance',
            ...gridWidthDates,
            cellRendererFramework: (params) => (
              <div>
                {' '}
                {params.data.currency} {checkValuesToFixed(params.data.assets)}
              </div>
            )
          }
        ]
      },
      getDetailRowData(params) {
        params.successCallback(params.data.listOfPerformance);
      }
    },
    // Callback to be used with Master Detail to determine if a row should be a master row. If false is returned no detail row will exist for this row.
    isRowMaster(dataItem) {
      return dataItem ? dataItem.listOfPerformance.length > 0 : false;
    },

    colDefsMedalsIncluded: [
      {
        headerName: 'Year',
        field: 'year',
        sortable: false,
        type: 'right-aligned',
        cellRenderer: 'agGroupCellRenderer',
        chartDataType: 'category'
      },
      {
        headerName: 'No. of Funds',
        field: 'num_funds',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'Insightia Activist Index',
        field: 'AI',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'Best Fund',
        field: 'max_performance',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'Worst Fund',
        field: 'min_performance',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'MSCI World',
        field: 'MSCI',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'S&P 500',
        field: 'SandP',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'year',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData:
      GetPerformanceOverviewV2 !== undefined
        ? GetPerformanceOverviewV2.map((x) => ({
            ...x,
            AI: x.AI !== null ? parseFloat(x.AI).toFixed(1) : null,
            max_performance: x.max_performance !== null ? parseFloat(x.max_performance).toFixed(1) : null,
            min_performance: x.min_performance !== null ? parseFloat(x.min_performance).toFixed(1) : null,
            MSCI: x.MSCI !== null ? parseFloat(x.MSCI).toFixed(1) : null,
            SandP: x.SandP !== null ? parseFloat(x.SandP).toFixed(1) : null
          }))
        : []
  };

  // map and overide the year and transform the year into string for AgBar to read xKey
  const annualPerformanceData = annualPerformance.map((item) => ({
    ...item,
    year: `${item.year}`
  }));

  const annualPerformanceBarChart = {
    immutableData: true,
    options: {
      autoSize: true,
      data: annualPerformanceData,
      series: [
        {
          type: 'column',
          xKey: 'year',
          yKeys: ['min_performance', 'MSCI', 'max_performance', 'AI', 'SandP'],
          yNames: ['Worst Fund', 'MSCI World', 'Best Fund', 'Insightia Activist Index', 'S&P 500'],
          grouped: true
        }
      ],
      legend: {
        position: 'bottom'
      }
    }
  };

  agCharts.AgChart.create(annualPerformanceBarChart);

  return (
    <Page
      {...{
        location,
        TrialStatus,
        history,
        GetPerformanceOverviewV2,
        allowDownload,
        rowData,
      }}
      key={1}
      className={bem.b('')}
    >
      <div className='row px-3'>
        <div className='sticky-outer-wrapper'>
          <div className='mt-3'>
            {GetPerformanceOverviewV2.length > 0 ? (
              <div className='col-lg-12'>
                <Link to={pathConst.ANNUAL_COMPOUNDED} className='btn btn-primary'>
                  Show Compounded
                </Link>
              </div>
            ) : null}
          </div>
          {GetPerformanceOverviewV2.length > 0 ? (
            <div className='mt-3'>
              <Table
                title='Annual Performance'
                gridOptions={gridOptionsAnnualPerformance}
                enableCharts
                hideExcelDownloadIcon={trialUserDisableDownload}
              />
            </div>
          ) : null}
        </div>
        {GetPerformanceOverviewV2.length > 0 ? (
          <div className='mt-3 p-0'>
            <div className='col-lg-12'>
              <AgChartsReact options={annualPerformanceBarChart.options} />
            </div>
          </div>
        ) : null}
        {GetPerformanceOverviewV2.length > 0 ? (
          <div className='px-2 mt-3' style={{ fontSize: '0.8rem' }}>
            <div className='col-lg-12'>
              <span>
                * The data for the most recent year enlisted is calculated up to{' '}
                {dateToNull(
                  GetPerformanceOverviewV2[GetPerformanceOverviewV2.length - 1].most_recent_date,
                  'dd-mmm-yy',
                  true
                )}
                .
              </span>
            </div>
            <div className='col-lg-12 mt-2'>
              <span>
                The table above shows the performance of the Insightia Activist Index which has been calculated using
                the performance figures for individual funds focused on activism. To full details of the methodology for
                calculating the index please view our
                <a className='text-secondary' href='/faqhelp/activism/faq' target='_blank' rel='noopener noreferrer'>
                  {' '}
                  FAQ page
                </a>
                .
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </Page>
  );
};

AnnualPerformance.propTypes = {
  location: PropTypes.any,
  history: PropTypes.object,
  TrialStatus: PropTypes.bool,
  rowData: PropTypes.array,
  allowDownload: PropTypes.bool,
  GetPerformanceOverviewV2: PropTypes.array
};

AnnualPerformance.defaultProps = {
  history: {},
  TrialStatus: false,
  rowData: [],
  allowDownload: false,
  GetPerformanceOverviewV2: []
};

export default withRouter(React.memo(AnnualPerformance));
