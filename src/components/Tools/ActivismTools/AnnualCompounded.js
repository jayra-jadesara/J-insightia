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
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';

const bem = bn.create('annualCompounded');

const AnnualCompounded = ({
  location,
  history,
  rowData,
  TrialStatus,
  allowDownload,
  GetPerformanceCompounded,
  trialUserDisableDownload
}) => {
  const [annualCompounded, setAnnualCompounded] = useState([]);

  useEffect(() => {
    if (typeof GetPerformanceCompounded !== 'undefined') {
      setAnnualCompounded(GetPerformanceCompounded);
    }
    return function cleanup() {
      setAnnualCompounded([]);
    };
  }, [GetPerformanceCompounded]);

  const gridOptionsAnnualCompounded = {
    masterDetail: true,
    immutableData: true,
    enableRangeSelection: true,
    enableCharts: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Fund',
            field: 'fund_name',
            cellRendererFramework: (params) => <div> {params.data.fund_name}</div>
          },
          {
            headerName: 'Manager',
            field: 'name',
            cellRendererFramework: (params) => <div> {params.data.name}</div>
          },
          {
            headerName: 'Year Established',
            field: 'launch_year',
            cellRendererFramework: (params) => <div> {params.data.launch_year}</div>
          },
          {
            headerName: 'Fund Size',
            field: 'performance',
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
        headerName: 'Insightia Activist Index',
        field: 'AI_return',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'MSCI World',
        field: 'MSCI_return',
        sortable: false,
        type: 'right-aligned',
        chartDataType: 'series'
      },
      {
        headerName: 'S&P 500',
        field: 'SandP_return',
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
          // take the YEAR field and replace colId to pin left
          colId: 'year',
          pinned: 'left'
        }
      ]
    },
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData:
      annualCompounded !== undefined
        ? annualCompounded.map((x) => ({
            ...x,
            AI_return: x.AI_return !== null ? parseFloat(x.AI_return).toFixed(1) : null,
            MSCI_return: x.MSCI_return !== null ? parseFloat(x.MSCI_return).toFixed(1) : null,
            SandP_return: x.SandP_return !== null ? parseFloat(x.SandP_return).toFixed(1) : null
          }))
        : []
  };

  const sample2 = annualCompounded.map((item) => ({
    ...item,
    year: `${item.year}`
  }));

  const annualCompoundedLineChart = {
    immutableData: true,
    options: {
      autoSize: true,
      data: sample2,
      series: [
        {},
        {
          xKey: 'year',
          yKey: 'MSCI_return',
          yName: 'MSCI World'
        },
        {},
        {
          xKey: 'year',
          yKey: 'AI_return',
          yName: 'Insightia Activist Index'
        },
        {
          xKey: 'year',
          yKey: 'SandP_return',
          yName: 'S&P 500'
        }
      ],
      legend: {
        position: 'bottom'
      }
    }
  };

  agCharts.AgChart.create(annualCompoundedLineChart);

  return (
    <Page
      {...{
        location,
        history,
        TrialStatus,
        GetPerformanceCompounded,
        allowDownload,
        rowData,
      }}
      key={1}
      className={bem.b('')}
    >
      <div className='row px-3'>
        <div className='sticky-outer-wrapper'>
          <div className='mt-3t'>
            {annualCompounded.length > 0 ? (
              <div className='col-lg-12'>
                <Link to={pathConst.ANNUAL_PERFORMANCE} className='btn btn-primary'>
                  Show Performance
                </Link>
              </div>
            ) : null}
          </div>
          {annualCompounded.length > 0 ? (
            <div className='mt-3'>
              <Table
                title='Annual Compounded'
                gridOptions={gridOptionsAnnualCompounded}
                enableCharts
                hideExcelDownloadIcon={trialUserDisableDownload}
              />
            </div>
          ) : null}
        </div>
        {annualCompounded.length > 0 ? (
          <div className='mt-3'>
            <div className='col-lg-12'>
              <AgChartsReact options={annualCompoundedLineChart.options} />
            </div>
          </div>
        ) : null}
        {annualCompounded.length > 0 ? (
          <div className='px-2 mt-3' style={{ fontSize: '0.8rem' }}>
            <div className='col-lg-12'>
              <span>
                * The data for the most recent year enlisted is calculated up to{' '}
                {dateToNull(annualCompounded[annualCompounded.length - 1].most_recent_date, 'dd-mmm-yy', true)}.
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

AnnualCompounded.propTypes = {
  location: PropTypes.any,
  history: PropTypes.object,
  TrialStatus: PropTypes.bool,
  rowData: PropTypes.array,
  allowDownload: PropTypes.bool,
  GetPerformanceCompounded: PropTypes.array
};

AnnualCompounded.defaultProps = {
  history: {},
  TrialStatus: false,
  rowData: [],
  allowDownload: false,
  GetPerformanceCompounded: []
};

export default withRouter(React.memo(AnnualCompounded));
