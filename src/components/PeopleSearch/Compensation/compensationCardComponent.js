import React, { lazy } from 'react';
import { Link, withRouter } from 'react-router-dom';
import bn from '../../../utils/bemnames';
import {
  checkValuesToFixed,
  numberToCommaString,
  positiveOrNegative,
  gridWidthValuesVLrg,
} from '../../../utils/table-tools-util';
import { ARR_INDENTED_VALUES } from '../../../constants/NumberConstants';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import Table from '../../GeneralForm/Table';
import { filters, setNextGroupColumnText } from '../../../utils/AgGridFunctions';

const Card = lazy(() => import('../../GeneralForm/Card'));
const bem = bn.create('peopleDirectorAndExecutive');

const compensationCardComponent = ({ data, yearGrid, TrialStatus, useBlurryText, ...props }) => {
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  const gridOptionsData = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'head',
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        cellRendererFramework: (params) => params.value,
        type: ['rowGroup', 'hiddenField', 'enableValue'],
        aggFunc: 'getNext-ColumnVal',
      },
      ...yearGrid,
      {
        headerName: '1 Year',
        field: 'Yr1',
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        ...gridWidthValuesVLrg,
        cellRenderer: (params) => (params.value ? `${params.value}%` : '-'),
        cellStyle: (params) => positiveOrNegative(params.value),
        aggFunc: 'getNext-ColumnVal',
      },
      {
        headerName: '3 Years',
        field: 'Yr3',
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        ...gridWidthValuesVLrg,
        cellRenderer: (params) => (params.value ? `${params.value}%` : '-'),
        cellStyle: (params) => positiveOrNegative(params.value),
        aggFunc: 'getNext-ColumnVal',
      },
      {
        headerName: '5 Years',
        field: 'Yr5',
        cellClass: TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
        ...gridWidthValuesVLrg,
        cellRendererFramework: (params) => (params.value ? `${params.value}%` : '-'),
        cellStyle: (params) => positiveOrNegative(params.value),
        aggFunc: 'getNext-ColumnVal',
      },
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    autoGroupColumnDef: {
      headerName: '',
      field: 'sub_head',
      minWidth: 300,
      cellClass: TrialStatus
          ? 'ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ps-1 pe-1 text-center',
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<span>
            ${params.value}
          </span>`;
          const eDiv1 = document.createElement('div');
          eDiv1.innerHTML += `<span>&nbsp;&nbsp;&nbsp;&nbsp;
            ${params.value}
          </span>`;
          if (
            ARR_INDENTED_VALUES.includes(params.value)
          ) {
            return eDiv1;
          }
          return eDiv;
        },
      },
    },
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    pivotMode: false,
    rowData: data.compensation !== undefined &&
    data.compensation.map((x) => ({
      ...x,
    })),
    aggFuncs: {
      'getNext-ColumnVal': setNextGroupColumnText,
    },
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    getRowHeight(params) {
      if (params.node.data && params.node.data.sub_head === null) {
        return 0;
      }
      return 48;
    },
  };

  return (
    <div className={bem.b('row py-2')}>
      <div className='col-12 mt-2'>
        <Card smalltitle={<x className={useBlurryText}>{data.Company_name} - {data.director_type}</x>}>
          <div className='row'>
            <div className='col-12'>
              <div className='row'>
                <div className={width > breakpoint ? 'row my-3 pe-5' : 'row my-3'}>
                  <div className='col-12 my-2'>
                    {data ? (
                      <div className='mt-3'>
                        <Table
                          gridOptions={gridOptionsData}
                          hideExcelDownloadIcon
                          IsShowCard={false}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(React.memo(compensationCardComponent));
