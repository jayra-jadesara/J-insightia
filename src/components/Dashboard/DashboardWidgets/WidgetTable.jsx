import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { dateToNull } from '../../../utils/general-util';
import Table from '../../GeneralForm/Table';
import FilterInvestor from './FilterInvestor';
import FilterCompany from './FilterCompany';
import { GetStoredProcedureDownload } from '../../../utils/dashboard-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import { ARRAY_HAS_NO_LENGTH, ARRAY_START_VALUE } from '../../../constants/NumberConstants';

const WidgetTable = (props) => {
  const [isExcelDownloadLoading, setExcelDownloadLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, [props.widgetData, props.isCompanyFilterd, props.isInvestorFilter]);

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  async function downloadExcelWidgetFn(
    storedProcedure,
    fileName,
    dashWisdgetLinkId
  ) {
    const ExcelDownloadStoredProcedure = storedProcedure;
    const ExcelFileName = fileName;
    if (ExcelDownloadStoredProcedure !== null) {
      const dashboard_widget_link_id = dashWisdgetLinkId;
      //  send stored procedure to get data
      const downloadSP = await GetStoredProcedureDownload({
        StoredProcedure: ExcelDownloadStoredProcedure,
        dashboard_widget_link_id
      });

      if (downloadSP !== undefined && downloadSP.length > ARRAY_HAS_NO_LENGTH) {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Insightia';
        workbook.created = new Date();
        const sheet = workbook.addWorksheet(ExcelFileName);

        const arrColumns = Object.keys(downloadSP[ARRAY_START_VALUE]);
        const jsonColumns = arrColumns !== undefined && arrColumns.length > ARRAY_HAS_NO_LENGTH && arrColumns.map((col) => ({
          name: col,
          totalsRowLabel: col,
          filterButton: true
        }));
        sheet.addTable({
          name: ExcelFileName.replace(/[.,/#!$%^&*;:{}=\-_`~()\s]/g, '_'),
          ref: 'A1',
          headerRow: true,
          totalsRow: false,
          style: {
            theme: 'TableStyleMedium16', // TableStyleMedium2
            showRowStripes: true
          },
          columns: jsonColumns,
          rows: (downloadSP && downloadSP.length > ARRAY_HAS_NO_LENGTH) && downloadSP.map((obj) => Object.values(obj))
        });

        sheet.columns && sheet.columns.forEach((column) => {
          let maxLength = 0;
          let dateInspect;
          column.eachCell({ includeEmpty: true }, (cell) => {
            if (isNaN(cell.value)) dateInspect = new Date(cell.value);
            if (
              cell.value &&
              dateInspect.toString() !== 'Invalid Date'
            ) {
              cell.value = new Date(cell.value);
            }
            const columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength;
        });

        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, `${ExcelFileName}.xlsx`);
        });
      }
    }
    setTimeout(() => {
      setExcelDownloadLoading(false);
    }, 600);
  }

  const gridOption = {
    colDefsMedalsIncluded: props.widgetHeaders,
    colDefsMedalsExcluded: [],
    pinColumns: { isPinOption: true, columns: props.widgetPinnedHeaders },
    paggination: props.widgetPaggination,
    rowHeight: 32,
    isfloatingFilter: false,
    headerHeight: 30,
    isPinOption: true,
    rowData: props.widgetData,
    domLayout:
      props.widgetPaggination.isPagging === true ? 'autoHeight' : 'normal',
    gridHeight: props.widgetPaggination.isPagging === true ? '100%' : '15rem',
    inVisibleColumns: props.inVisibleColumns
  };

  return (
    <div className='custom-gridstack'>
      <ErrorBoundary>
      <FilterCompany {...props} />
      <FilterInvestor {...props} />

      <div className='d-flex justify-content-between'>
        <span className='titleSelection'>{props.cardTitle}</span>
        <div className='flex-row'>
          {props.isInvest && (
            <span
              className={`${
                props.isInvestorFilter
                  ? 'filterSelection btn order-1 font-weight-bold'
                  : 'filterSelection btn order-1'
              }`}
              onClick={() => {
                if (props.invFiltervalue !== null) {
                  props.GetInvestorSearchSelection(props.invFiltervalue);
                  props.HandleInvestorFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                } else {
                  props.handleReset();
                  props.HandleInvestorFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                }
              }}
            >
              Investor Filter
              <span
                className={`${
                  props.isInvestorFilter
                    ? 'bi bi-funnel-fill'
                    : 'bi bi-chevron-down'
                }`}
              />
            </span>
          )}
          {props.isComp && (
            <span
              className={`${
                props.isCompanyFilterd
                  ? 'filterSelection btn order-2 font-weight-bold'
                  : 'filterSelection btn order-2'
              }`}
              onClick={() => {
                if (props.cmpFiltervalue !== null) {
                  props.getAllCompanySearchSelection(props.cmpFiltervalue);
                  props.HandleFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                } else {
                  props.handleReset();
                  props.HandleFilterModel(true);
                  props.HandleDashBoardWidgetIdSet(
                    props.dashboard_widget_link_id
                  ); // dashBoardWidgetId
                }
              }}
            >
              {/* Company Filter <span className={`${props.companySearchOptionSelection !== undefined && props.companySearchOptionSelection.widget_id === props.dashboard_widget_link_id ? 'bi bi-funnel-fill' : 'bi bi-chevron-down'}`} /> */}
              Company Filter
              <span
                className={`${
                  props.isCompanyFilterd
                    ? 'bi bi-funnel-fill'
                    : 'bi bi-chevron-down'
                }`}
              />
            </span>
          )}
          {props.DownloadStoredProcedure !== null && (
            <button
              id={`btndownload_${props.dashboard_widget_link_id}`}
              type='button'
              title={
                !isExcelDownloadLoading
                  ? 'Export to excel'
                  : 'Excel processing...'
              }
              className='widgetDownload shadow-none text-primary pt-1'
              disabled={isExcelDownloadLoading}
              dashboard_widget_link_id={props.dashboard_widget_link_id}
              dashboard_download_sp={props.DownloadStoredProcedure}
              dashboard_download_excel_filetitle={props.cardTitle}
              onClick={async (e) => {
                e.preventDefault();
                setExcelDownloadLoading(!isExcelDownloadLoading);
                await downloadExcelWidgetFn(
                  props.DownloadStoredProcedure,
                  props.cardTitle,
                  props.dashboard_widget_link_id
                );
              }}
            >
              <span
                className={
                  !isExcelDownloadLoading
                    ? 'bi bi-download'
                    : 'spinner-border spinner-border-sm'
                }
                aria-hidden='true'
              />
            </button>
          )}
        </div>
      </div>
      <Table
        IsShowCard={false}
        hideExcelDownloadIcon
        isComp={props.isComp}
        isInvest={props.isInvest}
        gridOptions={gridOption}
        title={props.cardTitle}
        handleComapnyCog={() => {
          props.HandleFilterModel(true);
          props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id); // dashBoardWidgetId
          props.handleReset();
        }}
        handleInvestorCog={() => {
          props.HandleInvestorFilterModel(true);
          props.HandleDashBoardWidgetIdSet(props.dashboard_widget_link_id); // dashBoardWidgetId
          props.handleReset();
        }}
      />
      </ErrorBoundary>
    </div>
  );
};

export default React.memo(WidgetTable);
