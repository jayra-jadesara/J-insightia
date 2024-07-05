import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import Table from '../../GeneralForm/Table';
import { getColorArr, dateToNull } from '../../../utils/general-util';
import Card from '../../GeneralForm/Card';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import numConst from '../../../constants/NumberConstants';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivismFollowerReturns = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  function getGridOption(rowdata, exitDate, status) {
    // status => exited: 0, current: 1
    const gridOptions = {
      colDefsMedalsIncluded: [
        {
          headerName: 'Company',
          field: 'company_name',
          minWidth: query.print ? 150 : 180,
          maxWidth: query.print ? 150 : null,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
            : 'ws-normal-lh24 ps-1 pe-1',
          cellRenderer: (params) => {
            if (!params.data) return null;
            if (!params.data.PID) return null;
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer" href="${pathConst.ACTIVISM_OVERVIEW}?pid=${params.data.PID}">
            ${params.data.company_name}</a>`;
            return eDiv;
          },
        },
        {
          headerName: 'Sector',
          field: 'industry_sector_name',
          minWidth: query.print ? 100 : 80,
          maxWidth: query.print ? 100 : 150,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
            : 'ws-normal-lh24 ps-1 pe-1',
        },
        {
          headerName: 'Mkt Cap ($mn)',
          field: 'market_cap_USD',
          minWidth: 60,
          maxWidth: query.print ? 60 : 100,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        },
        {
          headerName: 'Date Notified',
          field: 'date_first_invested',
          minWidth: 90,
          maxWidth: 90,
          type: ['autoHeightTrue', 'dateColumn'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
            : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        },
        {
          headerName: 'Long/ Short',
          field: 'LongShort',
          minWidth: 50,
          maxWidth: 50,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
            : 'ws-normal-lh24 ps-1 pe-1 text-center',
        },
        {
          headerName: 'Price when Notified',
          field: 'price_start_period',
          minWidth: query.print ? 60 : 70,
          maxWidth: query.print ? 60 : 70,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        },
        // exited add column
        {
          headerName: 'Exit Date',
          field: 'exit_date',
          minWidth: 90,
          maxWidth: 90,
          type:
            status === numConst.NUMBER_ZERO
              ? ['autoHeightTrue', 'dateColumn', 'nonHiddenField']
              : ['autoHeightTrue', 'dateColumn', 'hiddenField'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext dateFormat ps-1 pe-1 text-center'
            : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
        },
        {
          headerName: exitDate,
          field: 'price_end_period',
          minWidth: query.print ? 90 : 70,
          maxWidth: query.print ? 90 : 100,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        },
        {
          headerName: 'Total Follower Return (TFR) (%)',
          field: 'price_change',
          minWidth: query.print ? 70 : 70,
          maxWidth: query.print ? 70 : 80,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          cellRenderer: (params) => {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="${
              checkValuesToFixed(params.data.price_change) >= 0
                ? 'text-success'
                : 'text-danger'
            }" >${checkValuesToFixed(params.data.price_change, 2)}</span>`;
            return eDiv;
          },
        },
        {
          headerName: 'S&P Total Return (S&P TR) (%)',
          field: 'index_change_period',
          minWidth: query.print ? 70 : 70,
          maxWidth: query.print ? 70 : 80,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          cellRenderer: (params) => {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="${
              checkValuesToFixed(params.data.index_change_period) >= 0
                ? 'text-success'
                : 'text-danger'
            }" >${checkValuesToFixed(
              params.data.index_change_period,
              2
            )}</span>`;
            return eDiv;
          },
        },
        {
          headerName: 'Annualised TFR',
          field: 'annualised_return_period',
          minWidth: query.print ? 70 : 70,
          maxWidth: query.print ? 70 : 90,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          cellRenderer: (params) => {
            const eDiv = document.createElement('div');
            eDiv.innerHTML = `<span class="${
              checkValuesToFixed(params.data.annualised_return_period) >= 0
                ? 'text-success'
                : 'text-danger'
            }" >${checkValuesToFixed(
              params.data.annualised_return_period,
              2
            )}</span>`;
            return eDiv;
          },
        },
        {
          headerName: 'Annualised S&P  TR',
          field: 'annualised_return_index',
          minWidth: query.print ? 70 : 70,
          maxWidth: query.print ? 70 : 80,
          type: ['autoHeightTrue'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          cellRenderer: (params) => {
            const eDiv = document.createElement('div');
            if (params.data.annualised_return_index === '') {
              eDiv.innerHTML = `<span> ${params.data.annualised_return_index}</span>`;
            } else {
              eDiv.innerHTML = `<span class="${
                params.data.annualised_return_index >= 0
                  ? 'text-success'
                  : 'text-danger'
              }" > ${checkValuesToFixed(
                params.data.annualised_return_index,
                2
              )}</span>`;
            }
            return eDiv;
          },
        },
        // exited add column
        {
          headerName: 'TFR since Exit (%)',
          field: 'change_since_exit',
          minWidth: 60,
          maxWidth: query.print ? 60 : 80,
          type:
            status === numConst.NUMBER_ZERO
              ? ['autoHeightTrue', 'nonHiddenField']
              : ['autoHeightTrue', 'hiddenField'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          cellRenderer: (params) => {
            const eDiv = document.createElement('div');
            if (params.data.change_since_exit === '') {
              eDiv.innerHTML = `<span> ${params.data.change_since_exit}</span>`;
            } else {
              eDiv.innerHTML = `<span class="${
                params.data.change_since_exit >= 0
                  ? 'text-success'
                  : 'text-danger'
              }" > ${checkValuesToFixed(
                params.data.change_since_exit,
                2
              )}</span>`;
            }
            return eDiv;
          },
        },
        // exited add column
        {
          headerName: 'S&P TR since Exit',
          field: 'Index_change_since_exit',
          minWidth: 60,
          maxWidth: query.print ? 60 : 80,
          type:
            status === numConst.NUMBER_ZERO
              ? ['autoHeightTrue', 'nonHiddenField']
              : ['autoHeightTrue', 'hiddenField'],
          cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
            : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        },
      ],
      columnTypes: filters,
      colDefsMedalsExcluded: [],
      pinColumns: {
        isPinOption: true,
        columns: [
          {
            colId: 'company_name',
            pinned: 'left',
          },
        ],
      },
      rowData: rowdata.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: false,
        date_first_invested:
          x.date_first_invested !== undefined && x.date_first_invested != null
            ? dateToNull(x.date_first_invested, 'dd-mmm-yy', true)
            : '',
        exit_date:
          x.exit_date !== undefined && x.exit_date != null
            ? dateToNull(x.exit_date, 'dd-mmm-yy', true)
            : '',
        price_start_period:
          x.price_start_period !== undefined && x.price_start_period != null
            ? checkValuesToFixed(x.price_start_period, 2)
            : '',
        price_end_period:
          x.price_end_period !== undefined && x.price_end_period != null
            ? checkValuesToFixed(x.price_end_period, 2)
            : '',
        market_cap_USD:
          x.market_cap_USD !== undefined && x.market_cap_USD != null
            ? checkValuesToFixed(x.market_cap_USD, 0)
            : '',
        change_since_exit:
          x.change_since_exit !== undefined && x.change_since_exit != null
            ? checkValuesToFixed(x.change_since_exit, 2)
            : '',
      })),
      headerHeight: 95,
      paggination: { isPagging: false },
    };
    return gridOptions;
  }

  function getBarChart() {
    return (
      <Card addedClass='overflow-auto'>
        <div
          className={props.TrialStatus ? 'm-0-auto blurrytext' : 'm-0-auto'}
          style={{ maxWidth: '500px' }}
        >
          <BarChart
            width={450}
            height={300}
            data={props.FollowerReturnsActivistStatschartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='return_type' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='avg_all'
              name='All Time'
              className='pt-5'
              fill={getColorArr(4)[0]}
            />
            <Bar
              dataKey='avg_current'
              name='Current'
              className='pt-5'
              fill={getColorArr(4)[1]}
            />
            <Bar
              dataKey='avg_exited'
              name='Exited'
              className='pt-5'
              fill={getColorArr(4)[2]}
            />
            <Bar
              dataKey='avg_index'
              name='S&P'
              className='pt-5'
              fill={getColorArr(4)[3]}
            />
          </BarChart>
        </div>
      </Card>
    );
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
    <Page {...props} key={1} className='cr-follower_return pt-3'>
      {props.isLoading ? (
        LOADING
      ) : (
        <>
          <div className='row pt-2' id='loadItem'>
            {props.FollowerReturnsActivistStatsData.length > 0 && (
              <div className='col-md-12 col-lg-7 col-12 m-0 mt-2'>
                <Card title='Summary' addedClass='overflow-auto'>
                  <table className='table bg-light'>
                    <thead>
                      <tr>
                        <th style={{ width: '50%' }} aria-label=' ' />
                        <th style={{ width: '20%' }}>All Investments</th>
                        <th style={{ width: '10%' }}>Current</th>
                        <th style={{ width: '10%' }}>Exited</th>
                        <th style={{ width: '10%' }}>Since Exit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.FollowerReturnsActivistStatsData.map((item, i) => (
                        <tr
                          key={`item_${i + 1}`}
                          className={props.TrialStatus ? 'blurrytext' : ''}
                        >
                          {item.map((d, i) =>
                            i === numConst.NUMBER_ZERO ? (
                              <th key={`th${i + 1}`}>{d}</th>
                            ) : (
                              <td key={`td${i + 1}`}>
                                {d !== null ? d.toFixed(2) : 'NULL'}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}

            {/* BarChart */}
            {props.FollowerReturnsActivistStatschartData.length > 0 &&
              !query.print && (
                <div className='col-md-12 col-lg-5 col-12 m-0 mt-2'>
                  {getBarChart()}
                </div>
              )}
          </div>

          {props.FollowerReturnsActivistStatschartData.length > 0 &&
            query.print && (
              <div className='row pdfpagebreak'>
                <div className='col-md-12 col-lg-12 col-12 m-0 mt-2'>
                  {getBarChart()}
                </div>
              </div>
            )}

          {props.lstFollowerReturnsSearch_current.length > 0 && (
            <div className='row pdfpagebreak pt-2'>
              <div className='col-12 my-2'>
                {query.print ? (
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    isHide={false}
                    title='Current Investments'
                    smalltitle='Current Investments'
                    addedClass='pdfpb-30'
                    gridOptions={getGridOption(
                      props.lstFollowerReturnsSearch_current,
                      props.lstFollowerReturnsSearch_date,
                      1
                    )}
                  />
                ) : (
                  <CollapseComponent
                    isOpen={false}
                    index={1}
                    Heading='Current Investments'
                  >
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        isHide={false}
                        title='Current Investments'
                        smalltitle='Current Investments'
                        gridOptions={getGridOption(
                          props.lstFollowerReturnsSearch_current,
                          props.lstFollowerReturnsSearch_date,
                          1
                        )}
                      />
                    </ErrorBoundary>
                  </CollapseComponent>
                )}
              </div>
            </div>
          )}

          {props.lstFollowerReturnsSearch_exited.length > 0 && (
            <div className='row pdfpagebreak pt-2'>
              <div className='col-12 my-2'>
                {query.print ? (
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    isHide={false}
                    title='Exited Investments'
                    smalltitle='Exited Investments'
                    addedClass='pdfpb-30'
                    gridOptions={getGridOption(
                      props.lstFollowerReturnsSearch_exited,
                      'Price on Exit Date',
                      0
                    )}
                  />
                ) : (
                  <CollapseComponent
                    isOpen={false}
                    index={1}
                    Heading='Exited Investments'
                  >
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        isHide={false}
                        title='Exited Investments'
                        smalltitle='Exited Investments'
                        gridOptions={getGridOption(
                          props.lstFollowerReturnsSearch_exited,
                          'Price on Exit Date',
                          0
                        )}
                      />
                    </ErrorBoundary>
                  </CollapseComponent>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {!props.isLoading &&
        props.FollowerReturnsActivistStatschartData.length ===
          numConst.EMPTY_TABLE_LENGTH &&
        props.lstFollowerReturnsSearch_current.length ===
          numConst.EMPTY_TABLE_LENGTH &&
        props.lstFollowerReturnsSearch_exited.length ===
          numConst.EMPTY_TABLE_LENGTH &&
        Object.keys(props.FollowerReturnsActivistStatsData).length ===
          numConst.EMPTY_TABLE_LENGTH && <Card addedClass=''>{NORECORDS}</Card>}
    </Page>
  );
};

InvestorActivismFollowerReturns.propTypes = {
  location: PropTypes.object,
};

InvestorActivismFollowerReturns.defaultProps = {
  location: {},
};
export default withRouter(React.memo(InvestorActivismFollowerReturns));
