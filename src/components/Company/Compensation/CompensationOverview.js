import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import Page from '../../Page';
import { gridWidthValuesXLrg, gridWidthValuesLrg, numberToCommaString, numberWithCommasHandleNulls } from '../../../utils/table-tools-util';
import UnderConstruction from '../../../pages/UnderConstruction';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import Table from '../../GeneralForm/Table';
import D3SparklineChart from '../../GeneralForm/D3SparklineChart';
import { LOADING, NORECORDS } from '../../../constants/MessageConstans';
import Card from '../../GeneralForm/Card';
import {
  COMPANY_SEARCH,
  DIRECTORSHIP_AND_EXECUTIVE,
  GREEN_DOT,
  GREEN_YES_IMG,
  QUERY_DIRECTOR,
  PEOPLE_OVERVIEW,
  YELLOW_C_DOT,
} from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';

const CompensationOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  // #region "columnsArray" : Add Dynamic columns
  function getCommitteeImage(strCommittee, arrCommittee, iDirectorID) {
    let boolGreen = false;
    let boolYellow = false;

    arrCommittee.forEach((e) => {
      if (e.comm_name === strCommittee) {
        if (e.chair_director_id === iDirectorID) {
          boolYellow = true;
        }
        boolGreen = true;
      }
    });

    if (boolYellow) {
      return <img src={`${window.location.origin}${YELLOW_C_DOT}`} alt='Committee Chair' title='Committee Chair' />;
    }

    if (boolGreen) {
      return <img src={`${window.location.origin}${GREEN_DOT}`} alt='Committee' title='Committee' />;
    }

    return null;
  }
  function setCommitteeHeadersPlusCode(header) {
    return {
      headerName: header.comm_name_abb,
      field: header.comm_name,
      headerTooltip: header.comm_name,
      cellClass: props.TrialStatus
        ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
        : 'ws-normal-lh24 ps-1 pe-1 text-center',
      cellRendererFramework: (params) =>
        getCommitteeImage(header.comm_name, params.data.commit, params.data.director_id),
    };
  }
  function setCommitteeHeaders() {
    let a = [];
    if (props.committeeHeaders.length > numConst.EMPTY_TABLE_LENGTH) {
      if (props.committeeHeaders.length === numConst.NUMBER_ONE) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header) => ({
            minWidth: query.print ? 105 : 80,
            maxWidth: query.print ? 105 : 100,
            ...setCommitteeHeadersPlusCode(header),
          }));
      }
      if (props.committeeHeaders.length === numConst.NUMBER_TWO) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header) => ({
            minWidth: query.print ? 103 : 80,
            maxWidth: query.print ? 103 : 100,
            ...setCommitteeHeadersPlusCode(header),
          }));
      }
      if (props.committeeHeaders.length === numConst.NUMBER_THREE) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header) => ({
            minWidth: query.print ? 102 : 80,
            maxWidth: query.print ? 102 : 100,
            ...setCommitteeHeadersPlusCode(header),
          }));
      }
      if (props.committeeHeaders.length === numConst.NUMBER_FOUR) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 116 : 90,
                maxWidth: query.print ? 116 : 120,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 70 : 90,
              maxWidth: query.print ? 70 : 130,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === numConst.NUMBER_FIVE) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 110 : 80,
                maxWidth: query.print ? 110 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: 60,
              maxWidth: query.print ? 60 : 90,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === numConst.NUMBER_SIX) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 105 : 80,
                maxWidth: query.print ? 105 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 60 : 80,
              maxWidth: query.print ? 60 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === numConst.NUMBER_SEVEN) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 100 : 80,
                maxWidth: query.print ? 100 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 64 : 80,
              maxWidth: query.print ? 64 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === 8) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 110 : 50,
                maxWidth: query.print ? 110 : 70,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 55 : 50,
              maxWidth: query.print ? 55 : 70,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === 9) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 105 : 80,
                maxWidth: query.print ? 105 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 50 : 80,
              maxWidth: query.print ? 50 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === 10) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 102 : 80,
                maxWidth: query.print ? 102 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 48 : 80,
              maxWidth: query.print ? 48 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length === 11) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 104 : 80,
                maxWidth: query.print ? 104 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 48 : 80,
              maxWidth: query.print ? 48 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
      if (props.committeeHeaders.length >= 12) {
        a =
          props.committeeHeaders !== undefined &&
          props.committeeHeaders.map((header, index) => {
            index += 1;
            if (index === props.committeeHeaders.length) {
              return {
                minWidth: query.print ? 100 : 80,
                maxWidth: query.print ? 100 : 100,
                ...setCommitteeHeadersPlusCode(header),
              };
            }
            return {
              minWidth: query.print ? 48 : 80,
              maxWidth: query.print ? 48 : 100,
              ...setCommitteeHeadersPlusCode(header),
            };
          });
      }
    }
    return a;
  }
  // #endregion
  const columnsArray = setCommitteeHeaders();

  const gridOptionCompensationSummary = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Reported Year',
        field: 'filing_date',
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['dateColumn', 'autoHeightTrue'],
        minWidth: 110,
        maxWidth: 150
      },
      {
        headerName: 'CEO Granted Pay',
        field: 'CEO_Granted_Pay',
        minWidth: 120,
        maxWidth: 160,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['numberColumn', 'autoHeightTrue'],
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.CEO_Granted_Pay)
      },
      {
        headerName: 'CEO Pay Ratio',
        field: 'CEO_Pay_Ratio',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: 130,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.CEO_Pay_Ratio)
      },
      {
        headerName: 'CEO Realized Pay',
        field: 'CEO_Realized_Pay',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: 130,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.CEO_Realized_Pay)
      },
      {
        headerName: 'CEO Realized Pay As % Of Executives',
        field: 'Realized_CEO_as_of_Executives',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 150,
        maxWidth: null,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Realized_CEO_as_of_Executives)
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
    rowData:
      props.compensationOverviewSummaryData !== undefined &&
      props.compensationOverviewSummaryData.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: false,
      })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false, pageSize: 0 },
  };

  const gridOptionCompensationExecutive = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        children: [
          {
            headerName: 'Name',
            field: 'director_name',
            cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
            : 'ws-normal-lh24 ps-1 pe-1',
            type: ['dateColumn', 'autoHeightTrue'],
            minWidth: 150,
            maxWidth: null,
            cellRendererFramework: (params) => (
              <div>
            { !props.TrialStatus ?
              <a
                className='text-secondary'
                rel='noreferrer'
                target='_blank'
                href={`${PEOPLE_OVERVIEW}${QUERY_DIRECTOR}${params.data.director_id}`}
              >
                  {params.data.director_name}
              </a>
            :
            <span
              className='text-secondary'
            >
            {params.data.director_name}
            </span>
          }
              </div>

            ),
          },
          {
            headerName: 'Age',
            field: 'CalcAge',
            minWidth: 80,
            maxWidth: 80,
            cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
            : 'ws-normal-lh24 ps-1 pe-1 text-center',
            type: ['numberColumn', 'autoHeightTrue'],
          },
          {
            headerName: 'Tenure',
            field: 'Tenure',
            minWidth: 90,
            maxWidth: 90,
            cellClass: props.TrialStatus
            ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
            : 'ws-normal-lh24 ps-1 pe-1 text-center',
            type: ['numberColumn', 'autoHeightTrue'],
          },
          {
            headerName: 'Current Directorships',
            field: 'Other_boards',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 100,
            maxWidth: 150,
          },
          {
            headerName: 'Position',
            field: 'director_type',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
              : 'ws-normal-lh24 ps-1 pe-1',
            minWidth: 160,
            maxWidth: 200,
          },
        ],
      },
      {
        headerName: 'Base Salary',
        children: [
          {
            headerName: props.compensationOverviewExecutiveDataYearHeader && props.compensationOverviewExecutiveDataYearHeader.length > 0 && props.compensationOverviewExecutiveDataYearHeader[0].yr_current,
            field: 'yr_current',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 100,
            maxWidth: 100,
            valueFormatter: (params) => numberWithCommasHandleNulls(params.data.current_basic)

          },
          {
            headerName: props.compensationOverviewExecutiveDataYearHeader && props.compensationOverviewExecutiveDataYearHeader.length > 0 && props.compensationOverviewExecutiveDataYearHeader[0].yr_prev,
            field: 'yr_prev',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 100,
            maxWidth: 100,
            valueFormatter: (params) => numberWithCommasHandleNulls(params.data.prev_basic)

          },
        ],
      },
      {
        headerName: 'Total Compensation Realized',
        children: [
          {
            headerName: props.compensationOverviewExecutiveDataYearHeader && props.compensationOverviewExecutiveDataYearHeader.length > 0 && props.compensationOverviewExecutiveDataYearHeader[0].yr_current,
            field: 'yr_current',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 100,
            maxWidth: 110,
            valueFormatter: (params) => numberWithCommasHandleNulls(params.data.current_total_compensation)

          },
          {
            headerName: props.compensationOverviewExecutiveDataYearHeader && props.compensationOverviewExecutiveDataYearHeader.length > 0 && props.compensationOverviewExecutiveDataYearHeader[0].yr_prev,
            field: 'yr_prev',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 100,
            maxWidth: 110,
            valueFormatter: (params) => numberWithCommasHandleNulls(params.data.prev_total_compensation)
          },
        ],
      },
      {
        headerName: '',
        children: [
          {
            headerName: '% Change from Previous Year',
            field: 'change_from_prev',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 140,
            maxWidth: 140,
            valueFormatter: (params) => numberWithCommasHandleNulls(params.data.change_from_prev)
          },
          {
            headerName: 'Beneficial Shares',
            field: 'Shareholding',
            type: ['numberColumn', 'autoHeightTrue'],
            cellClass: props.TrialStatus
              ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
            minWidth: 140,
            maxWidth: 140,
            valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Shareholding)
          },
        ],
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
    rowData:
      props.compensationOverviewExecutiveData &&
      props.compensationOverviewExecutiveData.length > 0 &&
      props.compensationOverviewExecutiveData.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: false,
        filing_date: x.filing_date !== undefined ? dateToNull(x.filing_date, 'dd-mmm-yy', true) : '',
        // yr_current: props.compensationOverviewExecutiveData && props.compensationOverviewExecutiveData.length > 0 ? props.compensationOverviewExecutiveData[1].yr_current : '',
        // yr_prev: props.compensationOverviewExecutiveData && props.compensationOverviewExecutiveData.length > 0 ? props.compensationOverviewExecutiveData[1].yr_prev : '',
      })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isgroupChildHeaderVertical: true,
      isHeaderChildren: true,
      groupHeaderHeight: 40,
      oneFieldWithoutChild: true,
    },
    paggination: { isPagging: false, pageSize: 0 },
  };
  const gridOptionCompensationDirectors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'director_name',
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['dateColumn', 'autoHeightTrue'],
        minWidth: 150,
        maxWidth: null,
        cellRendererFramework: (params) => (
          <div>
            { !props.TrialStatus ?
            <a
              className='text-secondary'
              rel='noreferrer'
              target='_blank'
              href={`${PEOPLE_OVERVIEW}${QUERY_DIRECTOR}${params.data.director_id}`}
            >
              {params.data.director_name}
            </a>
            :
            <span
              className='text-secondary'
            >
            {params.data.director_name}
            </span>
          }
          </div>
        ),
      },
      {
        headerName: 'Age',
        field: 'CalcAge',
        minWidth: 80,
        maxWidth: 80,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['numberColumn', 'autoHeightTrue'],
      },
      {
        headerName: 'Tenure',
        field: 'Tenure',
        minWidth: 90,
        maxWidth: 90,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['numberColumn', 'autoHeightTrue'],
      },
      {
        headerName: 'Boards',
        field: 'Other_boards',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 120,
        maxWidth: 120,
      },
      ...columnsArray,
      {
        headerName: 'Total Fees',
        field: 'Base_fee',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: 110,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Base_fee)
      },
      {
        headerName: 'Beneficial Shares',
        field: 'Shareholding',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 120,
        maxWidth: 120,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.Shareholding)
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
    rowData:
      props.compensationOverviewDirectorData !== undefined &&
      props.compensationOverviewDirectorData.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: false,
        filing_date: x.filing_date !== undefined ? dateToNull(x.filing_date, 'dd-mmm-yy', true) : '',
      })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false, pageSize: 0 },
  };
  React.useEffect(() => {
    if (props.compensationOverviewDirectorData !== undefined) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 3000);
    }
  }, [props.compensationOverviewDirectorData]);

  return (
    <Page key={1}>
      <div className='' id='loadItem'>
        <div className='row'>
          {props.compensationOverviewSummaryData !== undefined ? (
            <>
              { props.compensationOverviewSummaryData && props.compensationOverviewSummaryData.length > 0 && (
                <div className='col-lg-6 col-md-12 col-sm-12'>
                  <Table
                    IsShowCard
                    title='Summary'
                    smalltitle=''
                    hideExcelDownloadIcon
                    enableCharts
                    gridOptions={gridOptionCompensationSummary}
                  />
                </div>
              )}
            </>
          ) : (
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <Card title='Summary'>{LOADING}</Card>
            </div>
          )}

          <div
            className={query.print ? 'col-lg-6 col-md-12 col-sm-12 row pdfpagebreak' : 'col-lg-6 col-md-12 col-sm-12'}
          >
            {props.sparklineChartData && props.sparklineChartData.length > 0 && (
              <D3SparklineChart
                title='Summary Chart'
                data={props.sparklineChartData}
                // data={data1}
                width={query.print ? 800 : 550}
                yearData={props.sparklineYearData}
                // yearData={[2019, 2020, 2021]}
                height={350}
                location={props.location}
                trialStatus={props.TrialStatus}
                bottomNote="Displays total realized pay"
              />
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            {props.compensationOverviewSummaryData &&
            props.compensationOverviewSummaryData.length > 0 &&
              <Table
                IsShowCard
                title='Executives'
                smalltitle=''
                hideExcelDownloadIcon
                enableCharts
                gridOptions={gridOptionCompensationExecutive}
              />
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            {props.compensationOverviewDirectorData !== undefined &&
              props.compensationOverviewDirectorData.length > 0 && (
                <Table
                  IsShowCard
                  title='Directors'
                  smalltitle=''
                  hideExcelDownloadIcon
                  enableCharts
                  gridOptions={gridOptionCompensationDirectors}
                />
              )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default withRouter(React.memo(CompensationOverview));
