import React, { useState, useCallback, useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import Page from '../../Page';
import bn from '../../../utils/bemnames';
import UnderConstruction from '../../../pages/UnderConstruction';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import DropdownList from '../../GeneralForm/DropdownList';
import { DIRECTORSHIP_AND_EXECUTIVE, QUERY_DIRECTOR } from '../../../constants/PathsConstant';
import { LOADING, NORECORDS } from '../../../constants/MessageConstans';
import { numberWithCommasHandleNulls } from '../../../utils/table-tools-util';

const bem = bn.create('compensationPolicyDetails');

const CompensationPolicyDetails = (props) => {
  const [isOpened, setIsOpened] = useState([]);
  const handleCollapText = (id) => {
    if (isOpened.includes(id)) {
      const data = isOpened.filter((item) => item !== id);
      setIsOpened(data);
    } else {
      setIsOpened([...isOpened, id]);
    }
  };

  const handleCompensationDetails = useCallback(
    (item, index) => {
      const a = index;
      return (
        <div id='accordion' key={`cmp_cmpns_${index}`}>
          <div className='card1'>
            <div
              className={isOpened.includes(index) ? 'card-header1 show collapsText' : 'card-header1 collapsText'}
              id='headingOne'
            >
              <h5 className='mb-0'>
                <div
                  className='textCollaps'
                  data-toggle='collapse'
                  data-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                  onClick={() => handleCollapText(index)}
                >
                  {isOpened.includes(index) ? `▼ ${item.PolicyType}` : `► ${item.PolicyType}`}
                </div>
              </h5>
            </div>

            <div
              id={`collaps${index}`}
              className={isOpened.includes(index) ? 'collapse show collpsDetails' : 'collapse collpsDetails'}
              aria-labelledby='headingOne'
              data-parent='#accordion'
            >
              <div className='card-body1'>{item.Description}</div>
            </div>
          </div>
        </div>
      );
    },
    [isOpened]
  );
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const gridOptionShortIncetiveExecutive = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'director_name',
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['dateColumn', 'autoHeightTrue'],
        minWidth: 150,
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              href={`${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.director_id}`}
            >
              {params.data.director_name}
            </a>
          </div>
        ),
      },
      {
        headerName: 'Position',
        field: 'director_type',
        minWidth: 110,
        maxWidth: 110,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['numberColumn', 'autoHeightTrue'],
      },
      {
        headerName: 'Target Short term incentive award as % of base salary',
        field: 'target_pc_salary',
        minWidth: 160,
        maxWidth: 200,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        type: ['numberColumn', 'autoHeightTrue'],
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.target_pc_salary)
      },
      {
        headerName: 'Target Short term incentive award against base salary (amount)',
        field: 'target_STI_award_amount',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 160,
        maxWidth: 200,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.target_STI_award_amount)

      },
      {
        headerName: 'Max Short term incentive award as % of base salary',
        field: 'max_pc_salary',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 170,
        maxWidth: 220,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.max_pc_salary)
      },
      {
        headerName: 'Max Short term incentive award against base salary (amount)',
        field: 'max_STI_award_amount',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 180,
        maxWidth: 240,
        valueFormatter: (params) => numberWithCommasHandleNulls(params.data.max_STI_award_amount)
      },
    ],
    headerHeight: 80,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData:
      props.tblShortTermIncentiveHighPaidExe !== undefined &&
      props.tblShortTermIncentiveHighPaidExe.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: false,
      })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    paggination: { isPagging: true, pageSize: 6 },
  };
  const gridOptionLongIncetiveExecutive = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Name',
        field: 'director_name',
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['dateColumn', 'autoHeightTrue'],
        minWidth: 150,
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              href={`${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${params.data.director_id}`}
            >
              {params.data.director_name}
            </a>
          </div>
        ),
      },
      {
        headerName: 'Position',
        field: 'director_type',
        minWidth: 110,
        maxWidth: 110,
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['numberColumn', 'autoHeightTrue'],
      },
      {
        headerName: 'Target Long Term incentive award as % of base salary',
        field: 'target_pc_salary',
        minWidth: 160,
        maxWidth: 200,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        type: ['numberColumn', 'autoHeightTrue'],
      },
      {
        headerName: 'Target Long Term incentive award (amount)',
        field: 'target_LTI_award_amount',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 160,
        maxWidth: 220,
      },
      {
        headerName: 'Max Long Term incentive award as % of base salary',
        field: 'max_pc_salary',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 160,
        maxWidth: 220,
      },
      {
        headerName: 'Max Long Term incentive award (amount)',
        field: 'max_LTI_award_amount',
        type: ['numberColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        minWidth: 180,
        maxWidth: 220,
      },
    ],
    headerHeight: 80,
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData:
      props.tblLongTermIncentiveHighPaidExe !== undefined &&
      props.tblLongTermIncentiveHighPaidExe.map((x) => ({
        ...x,
        TrialStatus: props.TrialStatus,
        allowDownload: false,
        // filing_date: x.filing_date !== undefined ? dateToNull(x.filing_date, 'dd-mmm-yy', true) : '',
      })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    animateRows: true,
    suppressAggFuncInHeader: true,
    paggination: { isPagging: true, pageSize: 6 },
  };
  const gridOptionHighestExecutive = {
    masterDetail: true,
    quickSearchFilter: false,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Plan',
            field: 'element',
            flex: 2,
            minWidth: 220,
            maxWidth: 300,
          },
          ...props.tblDynamicHeaders
        ],
        enableCellChangeFlash: true,
        columnTypes: filters,
      },
      getDetailRowData(params) {
        params.successCallback(params.data.data);
      },
    },
    isRowMaster(dataItem) {
      if (dataItem) {
        if (dataItem.status && dataItem.data !== undefined && dataItem.data.length > 0) {
          return true;
        }
      }
      return false;
    },
    deltaRowDataMode: true,
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'director_type',
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 220,
        cellClass: props.TrialUser ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        type: ['autoHeightTrue'],
        colSpan(params) {
          if (params.data.status !== undefined && params.data.status) {
            return 5;
          }
          return 1;
        },
      },
    ],
    detailRowHeight: '500',
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    animateRows: true,
    paggination: { isPagging: false, pageSize: 0 },
    isfloatingFilter: false,
    rowData:
      props.tblCompensationPolicyDetail !== undefined &&
      props.tblCompensationPolicyDetail.map((x) => ({
        ...x,
        TrialStatus: props.TrialUser,
        allowDownload: props.allowDownload,
      })),
  };
  React.useEffect(() => {
    if (props.tblCompensationPolicyDetail !== undefined) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.tblCompensationPolicyDetail]);

  if (
    props.tblShortTermIncentiveHighPaidExe && props.tblShortTermIncentiveHighPaidExe.length === 0
    && props.tblLongTermIncentiveHighPaidExe && props.tblLongTermIncentiveHighPaidExe.length === 0
    && props.tblCompensationPolicyDetail && props.tblCompensationPolicyDetail.length === 0
    && props.tblCompensationPolicyDetails && props.tblCompensationPolicyDetails.length === 0
    && props.isLoaded
    ) {
      return (
        <Page key={1} className=''>
          <div className={bem.b('mb-2')} id='loadItem'>
            <Card>
              No Data Found
            </Card>
          </div>
        </Page>
      );
    }
 return (
    <Page key={1} className=''>
      <div className={bem.b('mb-2')} id='loadItem'>
        {((props.tblShortTermIncentiveHighPaidExe &&
          props.tblShortTermIncentiveHighPaidExe !== undefined &&
          props.tblShortTermIncentiveHighPaidExe.length > 0) ||
          (props.tblLongTermIncentiveHighPaidExe &&
            props.tblLongTermIncentiveHighPaidExe !== undefined &&
            props.tblLongTermIncentiveHighPaidExe.length > 0)) && (
          <Card title='Variable Remuneration Structure'>
            <div className='row'>
              {props.tblShortTermIncentiveHighPaidExe &&
                props.tblShortTermIncentiveHighPaidExe !== undefined &&
                props.tblShortTermIncentiveHighPaidExe.length > 0 && (
                  <div className='col-lg-6 col--md-12 col-sm-12'>
                    <Table
                      IsShowCard
                      title='Short Term Incentive - Highest Paid Executives'
                      smalltitle=''
                      hideExcelDownloadIcon
                      gridOptions={gridOptionShortIncetiveExecutive}
                    />
                  </div>
                )}
              {props.tblLongTermIncentiveHighPaidExe &&
                props.tblLongTermIncentiveHighPaidExe !== undefined &&
                props.tblLongTermIncentiveHighPaidExe.length > 0 && (
                  <div className='col-lg-6 col--md-12 col-sm-12'>
                    <Table
                      IsShowCard
                      title='Long Term Incentive - Highest Paid Executives'
                      smalltitle=''
                      hideExcelDownloadIcon
                      gridOptions={gridOptionLongIncetiveExecutive}
                    />
                  </div>
                )}
            </div>
          </Card>
        )}
        <div className='mt-2 gridStyle'>
          {props.tblCompensationPolicyDetail && props.tblCompensationPolicyDetail.length > 0 &&
          <Table
            IsShowCard
            title='Compensation Policy - Highest Paid Executives'
            pageTitle='Compensation Policy - Highest Paid Executives'
            hideExcelDownloadIcon
            gridOptions={gridOptionHighestExecutive}
          />
          }
        </div>
        { false && props.tblCompensationPolicyDetails && props.tblCompensationPolicyDetails.length > 0 &&
        <>
          <div className='row mt-2 ms-0 mb-0 align-items-center'>
            <div className='col-lg-4'>
              <label>Compensation Policy as Disclosed:</label>
            </div>
            <div className='col-lg-6'>
              <DropdownList
                handleChange={(e) => {
                  props.handleOnChangeDdlOption(e);
                  setIsOpened([]);
                }}
                isMulti={false}
                options={props.ddlCompensationPolicyDetail}
                Dvalue={props.selectionCompensationPolicyDetasil}
                disabled={false}
              />
            </div>
          </div>
          <div className='mt-2'>
            <Card title='Compensation Policy'>
              <>
                {(props.tblCompensationPolicyDetails !== undefined && props.tblCompensationPolicyDetails.length > 0) ?
                  props.tblCompensationPolicyDetails.map((item, index) => handleCompensationDetails(item, index))
                : NORECORDS }

              </>
            </Card>
          </div>
        </>
        }
      </div>
    </Page>
  );
};

export default withRouter(React.memo(CompensationPolicyDetails));
