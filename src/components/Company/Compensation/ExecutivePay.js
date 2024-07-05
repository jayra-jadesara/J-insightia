import React, { useState, useEffect, useCallback } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import Page from '../../Page';
import UnderConstruction from '../../../pages/UnderConstruction';
import DropdownList from '../../GeneralForm/DropdownList';
import { filters, setNextGroupColumnText } from '../../../utils/AgGridFunctions';
import { numberWithCommasHandleNulls, positiveOrNegative } from '../../../utils/table-tools-util';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { LOADING, NORECORDS } from '../../../constants/MessageConstans';
import PathsConstant from '../../../constants/PathsConstant';
import FAQComponent from '../../FAQ/FAQComponent';

const ExecutivePay = (props) => {
  const innerValues = [
    'Cash Bonus',
    'Non-Equity Incentive Plan',
    'Shares',
    'Options',
    'LTI Cash',
    'Deferred Cash',
    'Deferred Shares',
    'Unvested Restricted Shares',
    'Unvested Performance Shares',
    'Unexercisable Options',
    'Exercisable Options',
  ];
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const date = new Date();
  const GetGridOption = (data) => {
    const gridOption = {
      colDefsMedalsIncluded: [
        {
          headerName: '',
          field: 'type',
          type: ['rowGroup', 'hiddenField', 'enableValue'],
          aggFunc: 'getNext-ColumnVal',
          cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
          minWidth: 110,
          maxWidth: query.print ? 350 : null,
          // type: ['dateColumn']
          cellRendererFramework: (params) => {
            if (params.value === 'Granted') {
              return <div>Total Granted Compensation*</div>;
            }
            if (params.value === 'Realized') {
              return <div>Total Realised Compensation</div>;
            }
            if (params.value === 'Outstanding') {
              return <div>Total Outstanding Compensation*</div>;
            }
          },
        },
        ...props.yearData,
        {
          headerName: '1 Year',
          field: 'yr1',
          aggFunc: 'getNext-ColumnVal',
          cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
          minWidth: 110,
          maxWidth: query.print ? 110 : 150,
          cellRendererFramework: (params) => (params.value ? `${numberWithCommasHandleNulls(params.value)}%` : '-'),
          cellStyle: (params) => positiveOrNegative(params.value),
        },
        {
          headerName: '3 Year',
          field: 'yr3',
          aggFunc: 'getNext-ColumnVal',
          cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
          minWidth: 110,
          maxWidth: query.print ? 110 : 150,
          cellRendererFramework: (params) => (params.value ? `${numberWithCommasHandleNulls(params.value)}%` : '-'),
          cellStyle: (params) => positiveOrNegative(params.value),
        },
        {
          headerName: '5 Year',
          field: 'yr5',
          aggFunc: 'getNext-ColumnVal',
          cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
          minWidth: 110,
          maxWidth: query.print ? 110 : 150,
          cellRendererFramework: (params) => (params.value ? `${numberWithCommasHandleNulls(params.value)}%` : '-'),
          cellStyle: (params) => positiveOrNegative(params.value),
        },
      ],
      columnTypes: filters,
      colDefsMedalsExcluded: [],
      pinColumns: {
        isPinOption: false,
        columns: [{}],
      },
      aggFuncs: {
        'getNext-ColumnVal': setNextGroupColumnText,
      },
      paggination: { isPagging: false, pageSize: 20 },
      suppressAggFuncInHeader: true,
      isfloatingFilter: false,
      groupUseEntireRow: false,
      autoGroupColumnDef: {
        headerName: '',
        field: 'element',
        cellClass: props.TrialUser
        ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
        : 'ps-1 pe-1 text-center',
        minWidth: 300,
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params) => {
            const eDiv = document.createElement('div');
            eDiv.innerHTML += `<span>&nbsp;&nbsp;&nbsp;
            ${params.value}
          </span>`;
            const eDiv1 = document.createElement('div');
            eDiv1.innerHTML += `<span>
            ${params.value}
          </span>`;
            if (innerValues.includes(params.value)) {
              return eDiv;
            }
            return eDiv1;
          },
        },
      },
      rowData:
        data !== undefined &&
        data.map((x) => ({
          ...x,
          TrialStatus: props.TrialStatus,
        })),
      // rowSelection: 'multiple',
      domLayout: query.print ? null : 'autoHeight',
      gridHeight: query.print ? null : null,
      getRowHeight(params) {
        if (params.node.data && params.node.data.element === null) {
          return 0;
        }
        return 48;
      },
    };
    return gridOption;
  };
  const gridOptionNonExecutive = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Position',
        field: 'Position',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 200 : 200,
      },
      {
        headerName: 'Name',
        field: 'director_name',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 200 : 280,
      },
      {
        headerName: 'Total Compensation',
        field: 'Total Compensation',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 200 : 200,
        cellRendererFramework: (params) => (
          <div>
            {params.data.Currency} ${params.value}
          </div>
        ),
      },
      {
        headerName: 'Stock Ownership as Multiple of Base Salary',
        field: 'stock_ownership',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 260 : null,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [{}],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: props.tblNonExecutiveData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
    })),
    rowSelection: 'multiple',
    domLayout: query.print ? null : 'autoHeight',
    gridHeight: query.print ? null : null,
  };
  const gridOptionHighestExecutive = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Position',
        field: 'Position',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 200 : 200,
      },
      {
        headerName: 'Name',
        field: 'director_name',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 200 : 280,
      },
      {
        headerName: 'Total Compensation',
        field: 'Total Compensation',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 200 : 200,
        cellRendererFramework: (params) => (
          <div>
            {params.data.Currency} ${params.value}
          </div>
        ),
      },
      {
        headerName: 'Stock Ownership as Multiple of Base Salary',
        field: 'stock_ownership',
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        minWidth: 110,
        maxWidth: query.print ? 260 : null,
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [{}],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: props.tblNonExecutiveData.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      // target: x.target !== null ? (x.unit !== null ? `${x.target}${x.unit}` : x.target) : null,
      // threshold: x.threshold !== null ? (x.unit !== null ? `${x.threshold}${x.unit}` : x.threshold) : null,
    })),
    rowSelection: 'multiple',
    domLayout: query.print ? null : 'autoHeight',
    gridHeight: query.print ? null : null,
  };
  React.useEffect(() => {
    if (props.executivePayData !== undefined) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.executivePayData]);
  if (
    props.executivePayData !== undefined &&
    props.executivePayData.length === 0 &&
    props.tblNonExecutiveData.length === 0
    && !props.loadingData) {
    return (
      <Page key={1}>
        <div>{NORECORDS}</div>
      </Page>
    );
  }
  return (
    <Page key={1}>
      <div className='' id='loadItem'>
        {props.executivePayData && !props.loadingData ? (
          <>
            {props.executivePayData.length > 0 && (
              <>
                <div className='row align-items-center'>
                  <div className='col-1'>
                    <lable>Period:</lable>
                  </div>
                  <div className='col-4'>
                    <DropdownList
                      handleChange={async (e) => {
                        await props.handleChangeYearDdl();
                        await props.handledOnChangeYear(e);
                      }}
                      isMulti={false}
                      options={props.ddlPeriodData}
                      Dvalue={props.selectedDdlPeriodData}
                      disabled={
                        !props.loadingData &&
                        props.executivePayData !== undefined &&
                        props.executivePayData.length === 0
                      }
                    />
                  </div>
                </div>
                {props.highestExecutiveTotal.map((item) => (
                  <div className='pt-3'>
                    <Table
                      gridOptions={GetGridOption(item.tableData)}
                      title={item.director_name !== null ? item.director_name : ''}
                      pageTitle={item.director_name !== null ? item.director_name : ''}
                      hideExcelDownloadIcon
                    />
                  </div>
                ))}
                {props.executivePayData.map((item) => {
                  let directoNames = '';
                  props.directorList.filter((item1) => {
                    if (item1.type === item.director_name) {
                      item1.list.filter((items, i) => {
                        directoNames =
                          item1.list.length === i + 1 ? `${directoNames}${items}` : `${directoNames}${items}, `;
                      });
                    }
                  });
                  return (
                    <div className='pt-3'>
                      <Table
                        gridOptions={GetGridOption(item.tableData)}
                        title={item.director_name !== null ? item.director_name : ''}
                        extratitle={<span className={props.TrialStatus ? 'blurrytext' : ''}>{directoNames}</span>}
                        pageTitle={item.director_name !== null ? item.director_name : ''}
                        hideExcelDownloadIcon
                      />
                    </div>
                  );
                })}
                {props.NonExecutiveTotal.map((item) => {
                  let directoNames = '';
                  const eDiv = document.createElement('div');
                  props.nonExeDirectorList.filter((item, i) => {
                    directoNames =
                      props.nonExeDirectorList.length === i + 1
                        ? `${directoNames}${item.director_name}`
                        : `${directoNames}${item.director_name}, `;
                  });
                  return (
                    <div className='pt-3'>
                      <Table
                        gridOptions={GetGridOption(item.tableData)}
                        extratitle={<span className={props.TrialStatus ? 'blurrytext' : ''}>{directoNames}</span>}
                        title={item.director_name !== null ? item.director_name : ''}
                        pageTitle={item.director_name !== null ? item.director_name : ''}
                        hideExcelDownloadIcon
                      />
                    </div>
                  );
                })}
              </>
            )}
            <div className='pt-3 pb-3'>
              <Card>
              <div className='row'>
                <span className='col-12'> <span className='font-weight-bold'>*</span>  Shares and options are based on present value applying market rates at grant date and not the expected value at point of vesting based on a discounted fair value technique</span>
              </div>
              </Card>
            </div>
          </>
        ) : (
          <Card>{LOADING}</Card>
        )}
        {props.tblNonExecutiveData.length > 0 && (
          <div className='pt-3'>
            <Table
              gridOptions={gridOptionHighestExecutive}
              title={`Highest Paid Executives (${date.getFullYear()} Disclosure)`}
              hideExcelDownloadIcon={false}
            />
          </div>
        )}
        {props.tblNonExecutiveData.length > 0 && (
          <div className='pt-3 pb-3'>
            <Table
              gridOptions={gridOptionNonExecutive}
              title={`Non-Executives (${date.getFullYear()} Disclosure)`}
              hideExcelDownloadIcon={false}
            />
          </div>
        )}
      </div>
    </Page>
  );
};

export default withRouter(React.memo(ExecutivePay));
