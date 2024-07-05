import PropTypes from 'prop-types';
import React, { useState, lazy, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import qs from 'qs';
import { LicenseManager } from 'ag-grid-enterprise';
import { ModuleRegistry, AllModules } from '@ag-grid-enterprise/all-modules';
import bn from '../../utils/bemnames';
import { MIN_MOBILE_WIDTH } from '../../constants/ScreenSizeConstant';
import useWindowDimensions from './useWindowDimensions';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getTitle, history } from '../../utils/navigation-util';
import DropdownList from './DropdownList';
import TableFilter from './TableFilter';
import {
  dateToNull,
  TokenDecodeForProductStatus,
  dateToISOString,
} from '../../utils/general-util';
import {
  NUMBER_ZERO,
  NUMBER_TWO,
  NUMBER_ONE,
  NUMBER_THREE,
  NUMBER_FOUR,
} from '../../constants/NumberConstants';
import { ACTIVIST_VULNERABILITY } from '../../constants/ProductConstants';
import { FULL_USER } from '../../constants/CompanyTrialTypeConstants';
import { DOWNLOADXLS } from '../../constants/MessageConstans';
import ErrorBoundary from './ErrorBoundary';

const Card = lazy(() => import('./Card'));

LicenseManager.setLicenseKey(process.env.REACT_APP_AGGRID_CREDENTIALS);
ModuleRegistry.registerModules(AllModules);

const bem = bn.create('agGrid');

const Table = ({
  gridOptions,
  isComp,
  isInvest,
  IsShowCard,
  cancelSlideBottomToUp,
  title,
  smalltitle,
  gridOptionsFooter,
  addedClass,
  pageTitle,
  hideExcelDownloadIcon,
  isDropDown,
  isAllColumnOnExcel,
  DropDownSelection,
  handledChangedDDLValue,
  chartJSON,
  defaultWidthSetToAllColumns,
  showInfoLable,
  linebreakInfoLable,
  isHeaderInfoTooltip,
  extratitle,
}) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const [serverButtonColour, setServerButtonColour] = useState(false);
  const [serverRefreshButton, setserverRefreshButton] = useState(false);
  const defaultColDef = {
    editable: false,
    sortable: true,
    suppressMenu: true,
    resizable: true,
    enableColResize: true,
    flex: 1,
    floatingFilter: gridOptions.isfloatingFilter
      ? gridOptions.isfloatingFilter
      : null,
    cellClass: (params) => {
      if (params.data !== undefined) {
        if (params.data.TrialStatus) {
          return 'ag-cell-blurrytext';
        }
        if (params.data.TrialLog) {
          return 'ag-cell-blurrytext';
        }
        return '';
      }
    },
    cellClassRules: {
      even: function (params) {
        return Math.abs(Number(params.rowIndex) % 2) === NUMBER_ZERO;
      },
      odd: function (params) {
        return Math.abs(Number(params.rowIndex) % 2) === NUMBER_ONE;
      },
      'generic-search-highlight': function (params) {
        if (
          document.getElementById(
            `filter-text-box-${title.replaceAll(' ', '_')}`
          ) === null
        ) {
          return null;
        }
        return (
          document.getElementById(
            `filter-text-box-${title.replaceAll(' ', '_')}`
          ).value !== '' &&
          params.value !== null &&
          params.value !== '' &&
          params.value !== undefined &&
          params.value
            .toString()
            .toLowerCase()
            .indexOf(
              document
                .getElementById(`filter-text-box-${title.replaceAll(' ', '_')}`)
                .value.toString()
                .toLowerCase()
            ) > -1
        );
      },
    },
  };

  const { width } = useWindowDimensions();

  const defaultColDefFooter = {
    editable: false,
    sortable: true,
    suppressMenu: true,
    resizable: true,
    enableColResize: true,
    flex: 1,
    wrapText: true,
    autoHeight: true,
    floatingFilter:
      gridOptionsFooter === undefined
        ? false
        : gridOptionsFooter.isfloatingFilter,
    cellClass: (params) => {
      if (params.data !== undefined) {
        if (params.data.TrialStatus) {
          return 'ag-cell-blurrytext';
        }
        if (params.data.TrialLog) {
          return 'ag-cell-blurrytext';
        }
        return '';
      }
    },
    cellClassRules: {
      even: function (params) {
        return Math.abs(Number(params.rowIndex) % 2) === NUMBER_ZERO;
      },
      odd: function (params) {
        return Math.abs(Number(params.rowIndex) % 2) === NUMBER_ONE;
      },
    },
  };

  const { colDefsMedalsExcluded } = gridOptions;

  const setColumns = gridOptions.colDefsMedalsIncluded;
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridColumnApiFooter, setGridColumnApiFooter] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridApiFooter, setGridApiFooter] = useState(null);
  const [isHideShowBtn, setisHideShowBtn] = useState(true);
  const [isHideReturnShowBtn, setisHideReturnShowBtn] = useState(true);
  const [toggleExcludeColumns, setToggleExcludeColumns] = useState(true);
  const [chartRef, setChartRef] = useState(null);

  const allColumnBtn = document.getElementById('showAllColumn');
  const returnDataBtn = document.getElementById('showReturnData');

  const onFirstDataRendered = () => {
    if (!query.print && gridApi) {
      gridApi.resetRowHeights();
    }
    if (
      defaultWidthSetToAllColumns !== undefined &&
      defaultWidthSetToAllColumns
    ) {
      autoSizeAll(true);
    }
  };
  const onFirstDataRenderedFooter = () => {
    if (!query.print) {
      gridApiFooter.sizeColumnsToFit();
      gridApiFooter.resetRowHeights();
    }
  };

  const getChartToolbarItems = () => [
    'chartDownload',
    'chartData',
    'chartSettings',
  ];

  function isExternalFilterPresent(params) {
    if (params !== undefined) {
      const newVal = gridOptions.isExternalFilterPresent;
      if (newVal !== undefined) {
        gridApi.refreshServerSideStore({ purge: true });
      }
    }
  }

  function autoSizeAll(skipHeader) {
    const allColumnIds = [];
    gridColumnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  const onGridSizeChanged = () => {
    if (!query.print && gridApi) {
      if (width >= MIN_MOBILE_WIDTH && gridColumnApi) {
        gridColumnApi.applyColumnState({
          state:
            gridColumnApi !== null &&
            gridOptions.pinColumns &&
            gridOptions.pinColumns.isPinOption
              ? gridOptions.pinColumns.columns
              : [],
          defaultState: { pinned: null },
        });
      }
      if (
        defaultWidthSetToAllColumns === undefined ||
        !defaultWidthSetToAllColumns
      ) {
        gridApi.sizeColumnsToFit();
      }
    }
  };
  const onGridSizeChangedFooter = () => {
    if (!query.print) {
      if (width >= MIN_MOBILE_WIDTH) {
        gridColumnApiFooter.applyColumnState({
          state:
            gridColumnApiFooter !== null && gridOptions.pinColumns.isPinOption
              ? gridOptions.pinColumns.columns
              : [],
          defaultState: { pinned: null },
        });
      }
      gridApiFooter.sizeColumnsToFit();
    }
  };
  // !!!!!Do not delete - uncomment code below to activate auto height on AGHeaders!!!!
  //all table cell spacing remove. CD: Added Eslint Exception
  /* eslint-disable */
  function headerHeightGetter() {
    // eslint-disable-line no-unused-vars
    const columnHeaderTexts = [
      ...document.querySelectorAll('.ag-header-cell-text'),
    ];
    const clientHeights = columnHeaderTexts.map(
      (headerText) => headerText.clientHeight
    );
    const tallestHeaderTextHeight = Math.max(...clientHeights);

    return tallestHeaderTextHeight;
  }
  /* eslint-enable */

  function headerHeightSetter() {
    const padding = 20;
    // !!!!!!Do not delete - uncomment code below to activate auto height on AGHeaders!!!!
    // const height = headerHeightGetter() + padding;
    let height = 0;
    if (
      gridOptions.headerHeight !== undefined ||
      gridOptions.headerHeight === null ||
      gridOptions.headerHeight === 0
    ) {
      height = gridOptions.headerHeight;
    } else {
      const gridheaderHeight =
        gridOptions.headerHeight !== undefined ? gridOptions.headerHeight : 30;
      height = gridheaderHeight + padding;
    }
    this.api.setHeaderHeight(height);
  }
  function sortAndFilter(allOfTheData, sortModel, filterModel) {
    return sortData(sortModel, filterData(filterModel, allOfTheData));
  }
  function sortData(sortModel, data) {
    const sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }
    const resultOfSort = data.slice();
    resultOfSort.sort((a, b) => {
      for (let k = 0; k < sortModel.length; k += 1) {
        const sortColModel = sortModel[k];
        const valueA = a[sortColModel.colId];
        const valueB = b[sortColModel.colId];
        const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        }
        return sortDirection * -1;
      }
      return 0;
    });
    return resultOfSort;
  }
  function filterData(filterModel, data) {
    const filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    const resultOfFilter = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      if (filterModel.age) {
        const { age } = item;
        const allowedAge = Number(filterModel.age.filter);
        if (filterModel.age.type === 'equals') {
          if (age !== allowedAge) {
            continue;
          }
        } else if (filterModel.age.type === 'lessThan') {
          if (age >= allowedAge) {
            continue;
          }
        } else if (age <= allowedAge) {
          continue;
        }
      }
      if (filterModel.year) {
        if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
          continue;
        }
      }
      if (filterModel.country) {
        if (filterModel.country.values.indexOf(item.country) < 0) {
          continue;
        }
      }
      resultOfFilter.push(item);
    }
    return resultOfFilter;
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.refreshHeader();
    params.api.refreshCells({ force: true });
    if (query.print) {
      params.api.forEachNode((node) => {
        node.setExpanded(true);
      });
      const eGridDiv = document.querySelector('#grid');
      eGridDiv.style.width = '';
      eGridDiv.style.height = '';
      params.api.setDomLayout('print');
    } else {
      if (gridOptions.rowModelType === 'infinite') {
        const updateData = (data) => {
          const dataSource = {
            rowCount: null,
            getRows(params) {
              setTimeout(() => {
                const dataAfterSortingAndFiltering = sortAndFilter(
                  data,
                  params.sortModel,
                  params.filterModel
                );
                const rowsThisPage = dataAfterSortingAndFiltering.slice(
                  params.startRow,
                  params.endRow
                );
                let lastRow = -1;
                if (dataAfterSortingAndFiltering.length <= params.endRow) {
                  lastRow = dataAfterSortingAndFiltering.length;
                }
                params.successCallback(rowsThisPage, lastRow);
              }, 500);
            },
          };
          params.api.setDatasource(dataSource);
        };
        updateData(gridOptions.rowData);
        params.api.refreshCells({ force: true });
      }
    }
    if (gridOptions.rowModelType === 'serverSide') {
      const updateData = () => {
        let datasource = {};
        datasource = {
          async getRows(params) {
            const a =
              params.parentNode.columnController.getAllDisplayedColumns();
            const checkedRows = params.request.valueCols.map((request) => {
              let isShown = false;
              a.forEach((column) => {
                if (request.id === column.colId) {
                  isShown = true;
                }
              });
              return { ...request, isShown };
            });
            for (const [key] of Object.entries(params.request.filterModel)) {
              let isInline = true;
              if (
                gridOptions.serverSideNotInline !== undefined &&
                gridOptions.serverSideNotInline.includes(key)
              ) {
                isInline = false;
              }
              params.request.filterModel[key] = {
                ...params.request.filterModel[key],
                isInline,
              };
            }
            params.request.valueCols = checkedRows;
            const status = gridOptions.serversideProduct
              ? await TokenDecodeForProductStatus(gridOptions.serversideProduct)
              : FULL_USER;
            fetch(gridOptions.serverSideRoute, {
              method: 'post',
              body: JSON.stringify({
                ...params.request,
                serverSideTables: gridOptions.serverSideTables,
                refreshButton: gridOptions.refreshServer,
                dataContextFilter: gridOptions.dataContextFilter,
                status: status,
              }),
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
              .then((httpResponse) => httpResponse.json())
              .then((response) => {
                params.successCallback(
                  response.rows.recordset,
                  response.lastRow
                );
              })
              .catch((error) => {
                console.error(error);
                params.failCallback();
              });
          },
        };
        params.api.setServerSideDatasource(datasource);
        // params.api.refreshCells({ force: true });
      };
      updateData();
      params.api.refreshCells({ force: true });
    }
  };

  useEffect(() => {
    if (
      gridOptions.inVisibleColumns &&
      gridOptions.inVisibleColumns !== undefined &&
      gridColumnApi !== null
    ) {
      gridColumnApi.setColumnsVisible(gridOptions.inVisibleColumns, false);
    }
  }, [gridColumnApi, gridOptions.inVisibleColumns]);

  const listener = (event) => {
    setServerButtonColour(true);
  };

  gridApi ? gridApi.addEventListener('filterChanged', listener) : null;
  gridApi ? gridApi.addEventListener('columnVisible', listener) : null;
  document.getElementById('setCustomFilter') &&
    document
      .getElementById('setCustomFilter')
      .addEventListener('click', listener);
  document.getElementById('clearCustomFilter') &&
    document
      .getElementById('clearCustomFilter')
      .addEventListener('click', listener);
  const onGridReadyFooter = (params) => {
    setGridApiFooter(params.api);
    setGridColumnApiFooter(params.columnApi);

    params.api.refreshCells({ force: true });
    if (query.print) {
      const eGridDiv = document.querySelector('#grid');
      eGridDiv.style.width = '';
      eGridDiv.style.height = '';
      params.api.setDomLayout('print');
    } else {
      if (gridOptionsFooter.rowModelType === 'infinite') {
        const updateData = (data) => {
          const dataSource = {
            rowCount: null,
            getRows(params) {
              setTimeout(() => {
                const dataAfterSortingAndFiltering = sortAndFilter(
                  data,
                  params.sortModel,
                  params.filterModel
                );
                const rowsThisPage = dataAfterSortingAndFiltering.slice(
                  params.startRow,
                  params.endRow
                );
                let lastRow = -1;
                if (dataAfterSortingAndFiltering.length <= params.endRow) {
                  lastRow = dataAfterSortingAndFiltering.length;
                }
                params.successCallback(rowsThisPage, lastRow);
              }, 500);
            },
          };
          params.api.setDatasource(dataSource);
        };
        updateData(gridOptionsFooter.rowData);
        params.api.refreshCells({ force: true });
      }
      if (gridOptionsFooter.rowModelType === 'serverSide') {
        const updateData = (data) => {
          const fakeServer = createFakeServer(data);
          const datasource = createServerSideDatasource(fakeServer);
          params.api.setServerSideDatasource(datasource);
        };
        updateData(gridOptionsFooter.rowData);
        params.api.refreshCells({ force: true });
      }
    }
  };

  function createServerSideDatasource(server) {
    return {
      getRows(params) {
        const response = server.getData(params.request);
        setTimeout(() => {
          if (response.success) {
            params.successCallback(response.rows, response.lastRow);
          } else {
            params.failCallback();
          }
        }, 500);
      },
    };
  }
  function createFakeServer(allData) {
    return {
      getData(request) {
        const requestedRows = allData.slice(request.startRow, request.endRow);
        const lastRow = getLastRowIndex(request, requestedRows);
        return {
          success: true,
          rows: requestedRows,
          lastRow,
        };
      },
    };
  }
  function getLastRowIndex(request, results) {
    if (!results) return undefined;
    const currentLastRow = request.startRow + results.length;
    return currentLastRow < request.endRow ? currentLastRow : undefined;
  }

  const onBtExcludeMedalColumns = () => {
    setColumns(colDefsMedalsExcluded);
    setToggleExcludeColumns(false);
  };
  const onBtIncludeMedalColumns = () => {
    setColumns(gridOptions.colDefsMedalsIncluded);
    setToggleExcludeColumns(true);
  };

  const ChartParams = (chartState, ChartType, titleText) => {
    allColumnBtn.disabled = true;
    returnDataBtn.disabled = true;
    if (chartJSON !== undefined && chartJSON.length > 0) {
      gridApi.setRowData(chartJSON);
    }
    gridApi.onFilterChanged();
    //gridApi.refreshServerSideStore({ purge: true });
    gridColumnApi.resetColumnState();
    gridColumnApi.applyColumnState({
      state: chartState,
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });

    const params = {
      chartType: ChartType,
      chartThemeName: 'ag-default',
      chartContainer: document.querySelector('#myChart'),
      processChartOptions: (params) => {
        const option = params.options;
        if (ChartType !== 'groupedColumn') {
          option.yAxis.label.formatter = function (params) {
            return `${params.value} %`;
          };
        }
        return option;
      },
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: titleText,
          },
          tooltip: {
            renderer: function (params) {
              return {
                content: `<b>${params.xName.toUpperCase()}:</b>${
                  params.xValue
                } <br/><b>${params.yName.toUpperCase()}:</b>${params.yValue}`,
              };
            },
          },
          legend: {
            enabled: true,
          },
        },

        bar: {
          series: {
            tooltip: {
              renderer: function (params) {
                return {
                  content: `<b>${params.xName.toUpperCase()}:</b>${
                    params.xValue
                  } <br/><b>${params.yName.toUpperCase()}:</b>${params.yValue}`,
                };
              },
            },
          },
        },
      },
    };

    setChartRef(gridApi.createPivotChart(params));

    if (document.getElementById('chartArea') !== null) {
      document.getElementById('chartArea').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  const handleDropDown = (e) => {
    if (chartRef !== null) {
      chartRef.destroyChart();
    }
    if (e.value.toString() === '0') {
      allColumnBtn.disabled = false;
      returnDataBtn.disabled = false;
      gridApi.onFilterChanged();
      gridColumnApi.setPivotMode(false);
      if (chartJSON !== undefined && chartJSON.length > 0) {
        gridApi.setRowData(gridOptions.rowData);
      }
      gridColumnApi.applyColumnState({
        defaultState: {
          pivot: false,
          rowGroup: false,
        },
      });
    } else if (e.value.toString() === '2') {
      const state = [
        {
          colId: 'Year_action',
          rowGroup: true,
          chartDataType: 'category',
        },
        {
          colId: 'activist_name',
          chartDataType: 'series',
          aggFunc: 'count(Dist)',
        },
      ];
      ChartParams(
        state,
        'groupedColumn',
        'Number of short sellers publicly subjecting companies to allegations'
      );
    } else if (e.value.toString() === '1') {
      const state = [
        {
          colId: 'Year_action',
          rowGroup: true,
        },
        {
          colId: 'company_name',
          aggFunc: 'count(Dist)',
        },
      ];
      ChartParams(
        state,
        'groupedColumn',
        'Number of companies publicly subjected to short sellers allegations'
      );
    } else if (e.value.toString() === '3') {
      const state = [
        {
          colId: 'Year_action',
          rowGroup: true,
        },
        {
          colId: 'company_name',
          aggFunc: 'count',
        },
        {
          colId: 'industry_sector_name',
          rowGroup: true,
          pivot: true,
        },
      ];
      ChartParams(
        state,
        'normalizedColumn',
        'Industry sectors of companies publicly subjected to short sellers allegations (%)'
      );
    } else if (e.value.toString() === '4') {
      const state = [
        {
          colId: 'Year_action',
          rowGroup: true,
        },
        {
          colId: 'company_name',
          aggFunc: 'count',
          chartDataType: 'series',
        },
        {
          colId: 'market_cap_category',
          rowGroup: true,
          pivot: true,
          chartDataType: 'series',
        },
      ];
      ChartParams(
        state,
        'normalizedColumn',
        'Market caps of companies publicly subjected to short seller allegations'
      );
    }
  };

  const onBtColHide = () => {
    setisHideShowBtn(false);
    if (!isHideReturnShowBtn) {
      setisHideReturnShowBtn(true);
    }
    gridColumnApi.applyColumnState({ state: gridOptions.hideColumns.columns });
    gridApi.resetRowHeights();
    gridApi.sizeColumnsToFit();
  };
  const onBtColReturnHide = () => {
    setisHideReturnShowBtn(false);
    if (!isHideShowBtn) {
      setisHideShowBtn(true);
    }
    gridColumnApi.applyColumnState({
      state: gridOptions.hideReturnColumns.columns,
    });
    gridApi.resetRowHeights();
    gridApi.sizeColumnsToFit();
  };

  const onBtColReturnShow = () => {
    setisHideReturnShowBtn(true);
    gridColumnApi.applyColumnState({
      state: gridOptions.showReturnColumns.columns,
    });
    gridApi.resetRowHeights();
    gridApi.sizeColumnsToFit();
  };

  const onBtColShow = () => {
    setisHideShowBtn(true);
    gridColumnApi.applyColumnState({ state: gridOptions.showColumns.columns });
    gridApi.resetRowHeights();
    gridApi.sizeColumnsToFit();
  };
  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(
      document.getElementById(`filter-text-box-${title.replaceAll(' ', '_')}`)
        .value
    );
    gridApi.refreshCells();
  };

  const onMasterDetailFilterTextBoxChanged = () => {
    const toFilterBy = document.getElementById(
      `filter-text-box-${title.replaceAll(' ', '_')}`
    ).value;
    let existsInMaster = false;
    gridApi.forEachNode((node) => {
      if (node.data.investor_name.includes(toFilterBy)) existsInMaster = true;
    });

    // Nothing in search.
    if (toFilterBy === '') {
      gridApi.setFilterModel(null);
      gridApi.forEachDetailGridInfo((detailGridInfo) => {
        detailGridInfo.api.setQuickFilter(null);
      });
    }
    // Found match in master grid.
    if (existsInMaster) {
      gridApi.setQuickFilter(toFilterBy);
    } else {
      // Not in master -> check in detail grids.
      gridApi.setQuickFilter(toFilterBy);
      gridApi.forEachDetailGridInfo((detailGridInfo) => {
        detailGridInfo.api.setQuickFilter(toFilterBy);
      });
    }
    gridApi.refreshCells();
  };

  const onFilterTextBoxClear = () => {
    document.getElementById(
      `filter-text-box-${title.replaceAll(' ', '_')}`
    ).value = '';
    gridApi.setQuickFilter('');
    gridApi.refreshCells();
    gridApi.setFilterModel(null);
    gridApi.onFilterChanged();
  };
  const getCustomContextMenuItems = () => {
    const arrContxtMenu = [
      'copy',
      'copyWithHeaders',
      'paste',
      'export',
      'chartRange',
    ];
    return arrContxtMenu;
  };
  function onBtExport() {
    function myColumnWidthCallback(params) {
      return params.column.getActualWidth();
    }
    function formattingFunction(params) {
      if (
        params.column.colDef.cellClass !== '' &&
        params.column.colDef.cellClass.includes !== undefined &&
        params.column.colDef.cellClass.toString().includes('dateFormat') &&
        params.value &&
        params.value !== null &&
        !isFinite(params.value)
      ) {
        function parseDate(s) {
          const months = {
            jan: 1,
            feb: 2,
            mar: 3,
            apr: 4,
            may: 5,
            jun: 6,
            jul: 7,
            aug: 8,
            sep: 9,
            oct: 10,
            nov: 11,
            dec: 12,
          };
          const p = s.split('-');
          const date = new Date(
            `${months[p[1].toLowerCase()]}/${p[0]}/${p[2]}`
          );
          return date;
        }
        const date = parseDate(params.value);
        return dateToISOString(date);
      }
      if (
        params.column.colDef.cellClass.includes !== undefined &&
        params.column.colDef.cellClass.includes('hyperlinksExcelExport') &&
        params.value
      ) {
        return `=HYPERLINK("${params.value}")`;
      }
      if (
        params.value === null ||
        params.value === undefined ||
        params.value.toString().trim() === ''
      ) {
        return ' ';
      }
      return params.value;
    }
    const params = {
      fileName:
        title !== undefined
          ? `${title.replaceAll(' ', '_').replaceAll('/', '_').toString()}.xlsx`
          : 'ag-grid.xlsx',
      sheetName: 'sheet1',
      columnWidth:
        gridOptions.columnWidth !== undefined
          ? gridOptions.columnWidth
          : myColumnWidthCallback,
      headerRowHeight:
        gridOptions.headerRowHeight !== undefined
          ? gridOptions.headerRowHeight
          : 48,
      prependContent: true,
      columnKeys: gridOptions.selectedColumns,
      exportMode: 'xlsx',
      customHeader: [
        [
          {
            styleId: 'bigHeader',
            data: {
              type: 'String',
              value:
                pageTitle !== '' && pageTitle !== undefined
                  ? pageTitle
                  : getTitle(
                      window.location.pathname,
                      pageTitle !== '' && pageTitle !== undefined
                        ? pageTitle
                        : title
                    ),
            },
          },
        ],
        [],
      ],
      autoConvertFormulas: true,
      processCellCallback: formattingFunction,
      allColumns: isAllColumnOnExcel,
      skipRowGroups: true,
    };
    gridApi.exportDataAsExcel(params);
  }

  const myExcelStyles = [
    {
      id: 'header',
      alignment: {
        wrapText: true,
        vertical: 'Center',
        indent: 1,
        shrinkToFit: true,
      },
      interior: {
        color: '#193d75',
        pattern: 'Solid',
      },
      font: { color: '#ffffff', bold: true },
      borders: {
        borderBottom: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderLeft: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderRight: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderTop: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
      },
    },
    {
      id: 'headerGroup',
      alignment: {
        shrinkToFit: true,
        wrapText: true,
      },
      interior: {
        color: '#193d75',
        pattern: 'Solid',
      },
      font: { color: '#ffffff', bold: true },
      borders: {
        borderBottom: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderLeft: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderRight: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderTop: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
      },
    },
    {
      id: 'booleanType',
      dataType: 'boolean',
    },

    {
      id: 'even',
      interior: {
        color: '#f5f5f5',
        pattern: 'Solid',
      },
      alignment: {
        wrapText: true,
        vertical: 'Center',
        indent: gridOptions.indent !== undefined ? gridOptions.indent : 1,
      },
      font: { color: '#181d1f', bold: false },
      borders: {
        borderBottom: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderLeft: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderRight: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderTop: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
      },
    },
    {
      id: 'odd',
      interior: {
        color: '#ffffff',
        pattern: 'Solid',
      },
      alignment: {
        wrapText: true,
        vertical: 'Center',
        indent: gridOptions.indent !== undefined ? gridOptions.indent : 1,
      },
      font: { color: '#181d1f', bold: false },
      borders: {
        borderBottom: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderLeft: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderRight: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderTop: {
          color: '#CCCCCC',
          lineStyle: 'Continuous',
          weight: 1,
        },
      },
    },
    {
      id: 'ws-normal-lh30',
      dataType: 'string',
      alignment: {
        wrapText: true,
        vertical: 'Center',
        indent: 1,
      },
    },
    {
      id: 'ws-normal-lh24',
      dataType: 'string',
      alignment: {
        wrapText: true,
        vertical: 'Center',
        indent: 1,
      },
    },
    {
      id: 'dateFormat',
      dataType: 'DateTime',
      numberFormat: { format: 'dd-mmm-yy' },
    },
    {
      id: 'bigHeader',
      alignment: {
        indent: 1,
      },
      font: { color: '#193d75', size: 25 },
    },
    {
      id: 'redFont',
      font: {
        color: '#ff0000',
      },
    },
    {
      id: 'greenFont',
      font: {
        color: '#008000',
      },
    },
    {
      id: 'cellAlign',
      alignment: {
        horizontal: 'Left',
      },
    },
    {
      id: 'dodgerBlueFont',
      font: {
        color: '#1E90FF',
      },
    },
    {
      id: 'greyBackground',
      alignment: {
        horizontal: 'Right',
        vertical: 'Bottom',
      },
      borders: {
        borderBottom: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderLeft: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderRight: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 1,
        },
        borderTop: {
          color: '#000000',
          lineStyle: 'Continuous',
          weight: 1,
        },
      },
      font: { color: '#e0ffc1' },
      interior: {
        color: '#cccccc',
        pattern: 'Solid',
      },
    },
    {
      id: 'hyperlinksExcelExport',
      dataType: 'Formula',
      font: {
        underline: 'Single',
        color: '#358ccb',
      },
    },
  ];

  const refreshCache = () => {
    setServerButtonColour(false);
    gridApi.refreshServerSideStore({ purge: true });
  };
  useEffect(() => {
    if (serverRefreshButton) {
      setserverRefreshButton(false);
      gridApi.refreshServerSideStore({ purge: true });
    }
  }, [serverRefreshButton]);

  // If the data is updated by a function this ensures that the rowData is updated
  // controlled by the "dataUpdatesFX" gridoption
  if (
    gridOptions.dataUpdatesFX === true &&
    gridApi &&
    gridOptions.rowData.length !== 0
  ) {
    gridApi.setRowData(gridOptions.rowData);
  }

  return (
    <Card
      IsShowCard={IsShowCard}
      cancelSlideBottomToUp={cancelSlideBottomToUp}
      isComp={isComp}
      isInvest={isInvest}
      title={title}
      extratitle={extratitle}
      smalltitle={smalltitle}
      addedClass={addedClass}
      isHeaderInfoTooltip={isHeaderInfoTooltip}
    >
      <ErrorBoundary>
        <div className='row p-0'>
          {gridOptions.quickSearchFilter &&
            gridOptions.quickSearchFilter !== undefined && (
              <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 divFilterTable  mb-0 px-3 mx-2'>
                <div className='row'>
                  <div className='col-9'>
                    {gridOptions.masterDetail ? (
                      <input
                        id={`filter-text-box-${title.replaceAll(' ', '_')}`}
                        type='text'
                        autoComplete='off'
                        className='form-control'
                        placeholder='Search...'
                        onInput={onMasterDetailFilterTextBoxChanged}
                      />
                    ) : (
                      <input
                        id={`filter-text-box-${title.replaceAll(' ', '_')}`}
                        type='text'
                        autoComplete='off'
                        className='form-control'
                        placeholder='Search...'
                        onInput={onFilterTextBoxChanged}
                      />
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-9'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm w-100'
                      onClick={onFilterTextBoxClear}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          <div className='row'>
            {gridOptions.saveFilter === true &&
              gridOptions.saveFilterParams && (
                <div className='col-11'>
                  <TableFilter
                    gridApi={gridApi}
                    gridOptions={gridOptions}
                    saveFilterParams={gridOptions.saveFilterParams}
                    defaultFilterList={gridOptions.defaultFilterList}
                    setServerButtonColour={setServerButtonColour}
                  />
                </div>
              )}
            {gridOptions.refreshServer && (
              <div className='col-1'>
                <button
                  type='button'
                  className={
                    serverButtonColour
                      ? 'btn btn-danger btn-sm btn-sm-danger'
                      : 'btn btn-primary btn-sm'
                  }
                  onClick={refreshCache}
                >
                  Refresh Data
                </button>
              </div>
            )}
          </div>
          <div className='divShowHideTable'>
            <div className=''>
              {gridOptions.hideReturnColumns !== undefined &&
                gridOptions.showReturnColumns !== undefined && (
                  <button
                    className='btn btn-primary btnsecond btn-sm btnShowHide'
                    id='showReturnData'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      if (isHideReturnShowBtn) {
                        onBtColReturnHide();
                      } else {
                        onBtColReturnShow();
                      }
                    }}
                  >
                    {isHideReturnShowBtn
                      ? gridOptions.showReturnColumns.btnName
                      : gridOptions.hideReturnColumns.btnName}
                  </button>
                )}
              {/* Show Hide Column */}
              {gridOptions.hideColumns !== undefined &&
                gridOptions.showColumns !== undefined && (
                  <button
                    className='btn btn-primary btn-sm btnShowHide col'
                    id='showAllColumn'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      if (isHideShowBtn) {
                        onBtColHide();
                      } else {
                        onBtColShow();
                      }
                    }}
                  >
                    {isHideShowBtn
                      ? gridOptions.showColumns.btnName
                      : gridOptions.hideColumns.btnName}
                  </button>
                )}
            </div>
          </div>

          {gridOptions.colDefsMedalsExcluded.length !== 0 && (
            <button
              type='button'
              className='btn btn-primary m-1 btn-sm'
              onClick={() =>
                toggleExcludeColumns
                  ? onBtExcludeMedalColumns()
                  : onBtIncludeMedalColumns()
              }
            >
              {toggleExcludeColumns
                ? 'Exclude Medal Columns'
                : 'Include Medal Columns'}
            </button>
          )}
          {hideExcelDownloadIcon !== undefined && hideExcelDownloadIcon ? (
            ''
          ) : (
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 divShowHideTable mb-1 mt-2'>
              {showInfoLable !== undefined ? (
                <label
                  className={
                    linebreakInfoLable !== undefined
                      ? 'lblInfo display-linebreak '
                      : 'lblInfo '
                  }
                >
                  {showInfoLable}{' '}
                </label>
              ) : (
                ''
              )}
              {!query.print && (
                <button
                  type='button'
                  className='btn excelAdjust ag-excel float-end'
                  onClick={() => onBtExport()}
                >
                  <u>{DOWNLOADXLS}</u>
                </button>
              )}
            </div>
          )}
          {gridOptions.tableSmallLabel &&
            gridOptions.tableSmallLabel !== undefined && (
              <div className='col-12 mb-0'>
                <p className='text-primary mb-0'>
                  <small>{gridOptions.tableSmallLabel}</small>
                </p>
              </div>
            )}
        </div>

        <div
          id='grid'
          className={
            gridOptions.isTableHide && gridOptions.isTableHide !== undefined
              ? bem.b('ag-theme-alpine d-tables d-none')
              : bem.b('ag-theme-alpine d-tables')
          }
          style={{
            width: '100%',
            height:
              gridOptions.gridHeight !== undefined
                ? gridOptions.gridHeight
                : '100%',
          }}
        >
          {gridOptions.HeaderGrouping ? (
            gridOptions.HeaderGrouping.isHeaderChildren ? (
              <AgGridReact
                isRowMaster={gridOptions.isRowMaster}
                detailRowHeight={gridOptions.detailRowHeight}
                suppressHorizontalScroll={gridOptions.suppressHorizontalScroll}
                detailRowAutoHeight={gridOptions.detailRowAutoHeight}
                getRowNodeId={gridOptions.getRowNodeId}
                excelStyles={
                  gridOptions.excelStyles !== undefined
                    ? gridOptions.excelStyles
                    : myExcelStyles
                }
                getContextMenuItems={getCustomContextMenuItems.bind(this)}
                autoGroupColumnDef={gridOptions.autoGroupColumnDef}
                groupUseEntireRow={gridOptions.groupUseEntireRow}
                rowClassRules={gridOptions.rowClassRules}
                groupSuppressAutoColumn={gridOptions.groupSuppressAutoColumn}
                isExternalFilterPresent={isExternalFilterPresent}
                components={gridOptions.components}
                rowBuffer={gridOptions.rowBuffer}
                rowSelection={gridOptions.rowSelection}
                rowModelType={gridOptions.rowModelType}
                serverSideStoreType={
                  gridOptions.serverSideStoreType !== undefined
                    ? gridOptions.serverSideStoreType
                    : 'full'
                }
                cacheBlockSize={
                  gridOptions.cacheBlockSize !== undefined
                    ? gridOptions.gridOptions
                    : 50000
                }
                paginationPageSize={
                  gridOptions.paginationPageSize !== undefined
                    ? gridOptions.paginationPageSize
                    : gridOptions.paggination.pageSize
                }
                cacheOverflowSize={gridOptions.cacheOverflowSize}
                maxConcurrentDatasourceRequests={
                  gridOptions.maxConcurrentDatasourceRequests
                }
                infiniteInitialRowCount={gridOptions.infiniteInitialRowCount}
                maxBlocksInCache={
                  gridOptions.maxBlocksInCache
                    ? gridOptions.maxBlocksInCache
                    : 500
                }
                enableCellTextSelection={gridOptions.enableCellTextSelection}
                domLayout={
                  gridOptions.domLayout !== undefined
                    ? gridOptions.domLayout
                    : 'autoHeight'
                }
                animateRows
                rowData={gridOptions.rowData}
                onGridReady={onGridReady.bind(this)}
                getChartToolbarItems={getChartToolbarItems}
                getRowHeight={gridOptions.getRowHeight}
                rowHeight={gridOptions.rowHeight}
                groupHeaderHeight={gridOptions.HeaderGrouping.groupHeaderHeight}
                headerHeight={gridOptions.headerHeight}
                pagination={gridOptions.paggination.isPagging}
                defaultColDef={defaultColDef}
                getRowStyle={gridOptions.getRowStyle}
                getRowClass={gridOptions.getRowClass}
                rowClass={gridOptions.rowClass}
                onGridSizeChanged={onGridSizeChanged.bind(this)}
                cellFlashDelay={1000}
                cellFadeDelay={500}
                sideBar={gridOptions.sideBar}
                pivotMode={gridOptions.pivotMode}
                suppressAggFuncInHeader={gridOptions.suppressAggFuncInHeader}
                statusBar={gridOptions.statusBar}
                columnTypes={gridOptions.columnTypes}
                aggFuncs={gridOptions.aggFuncs}
                onColumnResized={
                  gridOptions.heightData !== undefined ? '' : headerHeightSetter
                }
                popupParent={document.body}
                enableCharts={
                  gridOptions.enableCharts !== undefined
                    ? gridOptions.enableCharts
                    : false
                }
                enableRangeSelection={
                  gridOptions.enableRangeSelection !== undefined
                    ? gridOptions.enableRangeSelection
                    : true
                }
                immutableData={
                  gridOptions.immutableData !== undefined
                    ? gridOptions.immutableData
                    : false
                }
                alignedGrids={gridOptions.alignedGrids}
                masterDetail={gridOptions.masterDetail}
                detailCellRendererParams={gridOptions.detailCellRendererParams}
                getDetailRowData={gridOptions.getDetailRowData}
                suppressRowTransform={
                  gridOptions.suppressRowTransform !== undefined
                    ? gridOptions.suppressRowTransform
                    : false
                }
                autoHeight={
                  gridOptions.autoHeight !== undefined
                    ? gridOptions.autoHeight
                    : false
                }
                wrapText={
                  gridOptions.wrapText !== undefined
                    ? gridOptions.wrapText
                    : false
                }
                suppressFieldDotNotation={
                  gridOptions.suppressFieldDotNotation !== undefined
                    ? gridOptions.suppressFieldDotNotation
                    : false
                }
                frameworkComponents={
                  gridOptions.frameworkComponents !== undefined
                    ? gridOptions.frameworkComponents
                    : false
                }
              >
                {gridOptions.colDefsMedalsIncluded.map((column, index) => (
                  <AgGridColumn
                    key={`AgGridColumn${index + 1}`}
                    headerName={column.headerName}
                    headerTooltip={
                      column.headerTooltip
                        ? column.headerTooltip
                        : column.headerName
                    }
                    headerClass={
                      gridOptions.HeaderGrouping.isgroupHeaderVertical
                        ? 'ag-gridVertically'
                        : 'text-center'
                    }
                    chartDataType={column.chartDataType}
                    field={
                      gridOptions.HeaderGrouping.oneFieldWithoutChild
                        ? column.field
                        : ''
                    }
                    toolPanelClass={
                      column.toolPanelClass ? column.toolPanelClass : ''
                    }
                  >
                    {column.children.map((columnchild, index) => (
                      <AgGridColumn
                        {...columnchild}
                        headerClass={
                          gridOptions.HeaderGrouping.isgroupChildHeaderVertical
                            ? 'ag-gridVertically'
                            : 'text-center'
                        }
                        headerTooltip={
                          columnchild.headerTooltip
                            ? columnchild.headerTooltip
                            : columnchild.headerName
                        }
                        field={columnchild.field}
                        chartDataType={columnchild.chartDataType}
                        key={`${index + 1}child`}
                      />
                    ))}
                  </AgGridColumn>
                ))}
              </AgGridReact>
            ) : (
              ''
            )
          ) : (
            <AgGridReact
              enableColResize={true}
              isRowMaster={gridOptions.isRowMaster}
              masterDetail={gridOptions.masterDetail}
              detailRowHeight={gridOptions.detailRowHeight}
              suppressHorizontalScroll={gridOptions.suppressHorizontalScroll}
              detailRowAutoHeight={gridOptions.detailRowAutoHeight}
              getRowNodeId={gridOptions.getRowNodeId}
              excelStyles={
                gridOptions.excelStyles !== undefined
                  ? gridOptions.excelStyles
                  : myExcelStyles
              }
              getContextMenuItems={getCustomContextMenuItems.bind(this)}
              enableCellTextSelection={gridOptions.enableCellTextSelection}
              autoGroupColumnDef={gridOptions.autoGroupColumnDef}
              groupUseEntireRow={gridOptions.groupUseEntireRow}
              rowClassRules={gridOptions.rowClassRules}
              groupSuppressAutoColumn={gridOptions.groupSuppressAutoColumn}
              isExternalFilterPresent={isExternalFilterPresent}
              components={gridOptions.components}
              rowBuffer={gridOptions.rowBuffer}
              rowSelection={gridOptions.rowSelection}
              rowModelType={gridOptions.rowModelType}
              paginationPageSize={
                gridOptions.paginationPageSize !== undefined
                  ? gridOptions.paginationPageSize
                  : gridOptions.paggination.pageSize
              }
              cacheOverflowSize={gridOptions.cacheOverflowSize}
              maxConcurrentDatasourceRequests={
                gridOptions.maxConcurrentDatasourceRequests
              }
              infiniteInitialRowCount={gridOptions.infiniteInitialRowCount}
              maxBlocksInCache={gridOptions.maxBlocksInCache}
              domLayout={
                gridOptions.domLayout !== undefined
                  ? gridOptions.domLayout
                  : 'autoHeight'
              }
              animateRows
              rowData={gridOptions.rowData}
              getRowHeight={gridOptions.getRowHeight}
              headerHeight={gridOptions.headerHeight}
              rowHeight={gridOptions.rowHeight}
              pagination={gridOptions.paggination.isPagging}
              getRowStyle={gridOptions.getRowStyle}
              getRowClass={gridOptions.getRowClass}
              rowClass={gridOptions.rowClass}
              onFirstDataRendered={onFirstDataRendered.bind(this)}
              onGridSizeChanged={onGridSizeChanged.bind(this)}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady.bind(this)}
              getChartToolbarItems={getChartToolbarItems}
              cellFlashDelay={1000}
              cellFadeDelay={500}
              sideBar={gridOptions.sideBar}
              pivotMode={gridOptions.pivotMode}
              suppressAggFuncInHeader={gridOptions.suppressAggFuncInHeader}
              statusBar={gridOptions.statusBar}
              columnTypes={gridOptions.columnTypes}
              aggFuncs={gridOptions.aggFuncs}
              serverSideStoreType={
                gridOptions.serverSideStoreType !== undefined
                  ? gridOptions.serverSideStoreType
                  : 'full'
              }
              cacheBlockSize={
                gridOptions.cacheBlockSize !== undefined
                  ? gridOptions.gridOptions
                  : 50000
              }
              onColumnResized={
                gridOptions.heightData !== undefined ? '' : headerHeightSetter
              }
              popupParent={document.body}
              enableCharts={
                gridOptions.enableCharts !== undefined
                  ? gridOptions.enableCharts
                  : false
              }
              enableRangeSelection={
                gridOptions.enableRangeSelection !== undefined
                  ? gridOptions.enableRangeSelection
                  : true
              }
              immutableData={
                gridOptions.immutableData !== undefined
                  ? gridOptions.immutableData
                  : false
              }
              alignedGrids={gridOptions.alignedGrids}
              detailCellRendererParams={gridOptions.detailCellRendererParams}
              getDetailRowData={gridOptions.getDetailRowData}
              suppressRowTransform={
                gridOptions.suppressRowTransform !== undefined
                  ? gridOptions.suppressRowTransform
                  : false
              }
              autoHeight={
                gridOptions.autoHeight !== undefined
                  ? gridOptions.autoHeight
                  : false
              }
              wrapText={
                gridOptions.wrapText !== undefined
                  ? gridOptions.wrapText
                  : false
              }
              suppressFieldDotNotation={
                gridOptions.suppressFieldDotNotation !== undefined
                  ? gridOptions.suppressFieldDotNotation
                  : false
              }
              frameworkComponents={
                gridOptions.frameworkComponents !== undefined
                  ? gridOptions.frameworkComponents
                  : false
              }
            >
              {gridOptions.colDefsMedalsIncluded.map((column, index) => (
                <AgGridColumn
                  {...column}
                  headerTooltip={
                    column.headerTooltip
                      ? column.headerTooltip
                      : column.headerName
                  }
                  key={`ind_${index + 1}`}
                  chartDataType={column.chartDataType}
                  field={column.field}
                />
              ))}
            </AgGridReact>
          )}
        </div>

        {isDropDown !== undefined && (
          <>
            <div className='row'>
              <div className='col mt-3 mb-3'>
                <DropdownList
                  handleChange={async (e) => {
                    if (e !== null) {
                      handledChangedDDLValue();
                      handleDropDown(e);
                    } else {
                      const eNull = { lable: 'Defaule', value: 0 };
                      handleDropDown(eNull);
                    }
                  }}
                  maxHeight={250}
                  options={isDropDown}
                  isMulti={false}
                  placeholder='Choose a pre-set trend to graph (Optional)'
                  Dvalue={DropDownSelection}
                />
              </div>
            </div>
            <div className='row' id='chartArea'>
              <div className='ag-theme-balhamm mb-3' id='myChart' />
            </div>
          </>
        )}

        {gridOptionsFooter && (
          <div
            id='grid-footer'
            className={bem.b('ag-theme-alpine d-tables')}
            style={{
              width: '100%',
              height:
                gridOptionsFooter.gridHeight !== undefined
                  ? gridOptionsFooter.gridHeight
                  : '45px',
            }}
          >
            <AgGridReact
              components={gridOptionsFooter.components}
              rowBuffer={gridOptionsFooter.rowBuffer}
              rowSelection={gridOptionsFooter.rowSelection}
              rowModelType={gridOptionsFooter.rowModelType}
              suppressHorizontalScroll={
                gridOptionsFooter.suppressHorizontalScroll
              }
              paginationPageSize={
                gridOptionsFooter.paginationPageSize !== undefined
                  ? gridOptionsFooter.paginationPageSize
                  : gridOptionsFooter.paggination.pageSize
              }
              cacheOverflowSize={gridOptionsFooter.cacheOverflowSize}
              maxConcurrentDatasourceRequests={
                gridOptionsFooter.maxConcurrentDatasourceRequests
              }
              infiniteInitialRowCount={
                gridOptionsFooter.infiniteInitialRowCount
              }
              maxBlocksInCache={gridOptionsFooter.maxBlocksInCache}
              domLayout={
                gridOptionsFooter.domLayout !== undefined
                  ? gridOptionsFooter.domLayout
                  : 'normal'
              }
              animateRows
              rowData={gridOptionsFooter.rowData}
              headerHeight={gridOptionsFooter.headerHeight}
              getRowHeight={gridOptionsFooter.getRowHeight}
              rowHeight={gridOptionsFooter.rowHeight}
              pagination={gridOptionsFooter.paggination.isPagging}
              getRowStyle={gridOptionsFooter.getRowStyle}
              getRowClass={gridOptionsFooter.getRowClass}
              rowClass={gridOptionsFooter.rowClass}
              onFirstDataRendered={onFirstDataRenderedFooter.bind(this)}
              onGridSizeChanged={onGridSizeChangedFooter.bind(this)}
              defaultColDef={defaultColDefFooter}
              onGridReady={onGridReadyFooter}
              cellFlashDelay={1000}
              cellFadeDelay={500}
              sideBar={gridOptionsFooter.sideBar}
              pivotMode={gridOptionsFooter.pivotMode}
              suppressAggFuncInHeader={
                gridOptionsFooter.suppressAggFuncInHeader
              }
              statusBar={gridOptionsFooter.statusBar}
              columnTypes={gridOptionsFooter.columnTypes}
              aggFuncs={gridOptionsFooter.aggFuncs}
              alignedGrids={gridOptionsFooter.alignedGrids}
              suppressFieldDotNotation={
                gridOptions.suppressFieldDotNotation !== undefined
                  ? gridOptions.suppressFieldDotNotation
                  : false
              }
              frameworkComponents={
                gridOptions.frameworkComponents !== undefined
                  ? gridOptions.frameworkComponents
                  : false
              }
            >
              {gridOptionsFooter.colDefsMedalsIncluded.map((column) => (
                <AgGridColumn
                  {...column}
                  headerTooltip={column.headerName}
                  key={column.field}
                  field={column.field}
                />
              ))}
            </AgGridReact>
          </div>
        )}
      </ErrorBoundary>
    </Card>
  );
};
Table.propTypes = {
  IsShowCard: PropTypes.bool,
  addedClass: PropTypes.string,
  gridOptions: PropTypes.object.isRequired,
  gridOptionsFooter: PropTypes.object,
  hideExcelDownloadIcon: PropTypes.bool,
  isComp: PropTypes.bool,
  isInvest: PropTypes.bool,
  pageTitle: PropTypes.string,
  smalltitle: PropTypes.string,
  title: PropTypes.string,
  extratitle: PropTypes.string,
  cancelSlideBottomToUp: PropTypes.bool,
  showInfoLable: PropTypes.any,
  linebreakInfoLable: PropTypes.any,
};

Table.defaultProps = {
  IsShowCard: true,
  addedClass: '',
  hideExcelDownloadIcon: false,
  isComp: false,
  isInvest: false,
  pageTitle: '',
  smalltitle: '',
  title: '',
  extratitle: '',
  cancelSlideBottomToUp: false,
  showInfoLable: undefined,
  linebreakInfoLable: undefined,
};
export default React.memo(Table);
