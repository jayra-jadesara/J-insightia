import { NUMBER_HUNDRED } from '../constants/NumberConstants';
import { dateToNull, dateToISOString } from './general-util';
import CustomVulnFiltersToolPanel from './AgGridVulnAdvancedSearchToolPanel';
// allowedAggFuncs: ['sum', 'min', 'max', 'count', 'avg', 'first', 'last'],

function dateComparator(date1, date2) {
  // DATE COMPARATOR FOR SORTING
  const date1Number = _monthToNum(date1);
  const date2Number = _monthToNum(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}
function _monthToNum(dateAsString) {
  // HELPER FOR DATE COMPARISON
  const date = dateToNull(dateAsString, 'dd-mm-yyyy', true);
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = date.substring(6, 10);
  const monthNumber = date.substring(3, 5);
  const dayNumber = date.substring(0, 2);

  const result = yearNumber * 10000 + monthNumber * 100 + dayNumber; // 29/08/2004 => 20040829
  return result;
}

export const filters = {
  nonEditableColumn: { editable: false },
  nonFloatingFilter: { floatingFilter: false },
  enableRowGroup: { enableRowGroup: true },
  rowGroup: { rowGroup: true },
  enableValue: { enableValue: true },
  hiddenField: { hide: true },
  nonHiddenField: { hide: false },
  sortableFalse: { sortable: false },
  sortableTrue: { sortable: true },
  aggFuncSum: { aggFunc: 'sum' },
  flex1: { flex: 1 },
  autoHeightTrue: { autoHeight: true },
  wrapTextTrue: { wrapText: true },
  sortDesc: { sort: 'desc' },
  sortAsc: { sort: 'asc' },
  // Filters
  numberColumn: {
    filter: 'agNumberColumnFilter',
    filterParams: {
      newRowsAction: 'keep',
      buttons: ['reset'],
    },
  },
  textColumn: {
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
    },
  },
  dateColumn: {
    filter: 'agDateColumnFilter',
    minWidth: 200,
    comparator: dateComparator,
    filterParams: {
      comparator(filterLocalDateAtMidnight, cellValue) {
        if (cellValue === null) {
          return 0;
        }
        const dateAsString = dateToNull(dateToISOString(new Date(cellValue)), 'dd-mm-yyyy', true);
        const dateParts = dateAsString.split('-');
        const day = Number(dateParts[0]);
        const month = Number(dateParts[1]) - 1;
        const year = Number(dateParts[2]);
        const cellDate = new Date(year, month, day);

        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
        return 0;
      },
      debounceMs: 500,
      suppressAndOrCondition: false,
      browserDatePicker: true,
      newRowsAction: 'keep',
      buttons: ['reset'],
    },
  },
  setColumn: {
    filter: 'agSetColumnFilter',
    filterParams: {
      showTooltips: true,
      newRowsAction: 'keep',
      buttons: ['reset'],
      debounceMs: 200,
    },
  },
};

function isNull(obj, key) {
  return obj[key] === null || obj[key] === undefined || obj[key] === 'null';
}
export function validateNulltoEmptyString(obj) {
  const objKeys = Object.keys(obj);
  objKeys.forEach((key) => {
    if (isNull(obj, key)) {
      obj[key] = '';
    }
  });
}
export function NumberFormatFn(objNumber) {
  if (objNumber !== null && objNumber !== undefined) {
    const nf = new Intl.NumberFormat();
    return nf.format(Math.round(objNumber));
  }
  return '';
}

export function NumberFormatRevertFn(objNumber) {
  if (objNumber !== null && objNumber !== undefined) {
    // const b = objNumber.toString().replace(/\\,/g, '');
    const b = objNumber.toString().replace(/,/g, '');
    const a = Number(b);
    return a;
    // 1125, but a string, so convert it to number a=parseInt(a,10);
  }
  return 0;
}

export const distinctCounts = (params) => {
  const value = new Set(params.values).size;
  return value;
};

export const getQuickFilterText = (params) => params.value;

export const setNextGroupColumnText = (params) =>
  params.values.length > 0 ? params.values[0] : '';

export const converHistoricalTrendsFloatingNumber = (params) => {
  if (params.data.for_pcent === NUMBER_HUNDRED) {
    return parseFloat(params.data.for_pcent).toFixed(0);
  }
  return parseFloat(params.data.for_pcent).toFixed(1);
};

export const bottomStatusBar = {
  statusPanels: [
    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
    { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
    { statusPanel: 'agAggregationComponent', align: 'left' },
  ],
};

export const bottomStatusBarServerside = {
  statusPanels: [
    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
    { statusPanel: 'agAggregationComponent', align: 'left' },
  ],
};

export const columnSidebar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
      },
    },
  ],
};

export const filterSidebar = {
  toolPanels: [
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },
  ],
};

export const columnSidebarNoPivotNoColNoRow = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressValues: true,
        suppressPivotMode: true,
        suppressColumnFilter: true,
        suppressRowGroups: true,
      },
    },
  ],
};

export const columnAndfilterSidebar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
      },
    },
  ],
  position: 'right',
};

export const columnAndfilterSidebarNoPivotNoColNoRow = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressValues: true,
        suppressPivotMode: true,
        suppressColumnFilter: true,
        suppressRowGroups: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
      },
    },
  ],
  position: 'right',
};

export const columnAndfilterSidebarServerside = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressColumnSelectAll: true,
        suppressPivotMode: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressExpandAll: true,
      },
    },
  ],
  position: 'right',
};

export const columnAndfilterVulnAdvSearchSidebarServerside = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressColumnSelectAll: true,
        suppressPivotMode: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressExpandAll: true,
      },
    },
    {
      id: 'CustomVulnFiltersToolPanel',
      labelDefault: 'Advanced Search',
      labelKey: 'toolPanel',
      iconKey: 'filter',
      toolPanel: 'CustomVulnFiltersToolPanel',
      toolPanelParams: {
        hiddenByDefault: true,
        suppressExpandAll: true,
      },
    },
  ],
  position: 'right',
};

export const customVulnFiltersToolPanelComponent = {
  CustomVulnFiltersToolPanel: CustomVulnFiltersToolPanel,
};

export const loadingRenderer = {
  loadingRenderer(params) {
    if (params.value !== undefined) {
      return params.value;
    }
    return `<img src=${'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/images/loading.gif'}>`;
  },
};

export function ChangeName(data) {
  if (data === 'tick.png') {
    return 'True';
  }
  if (data === 'redflag_large.png') {
    return 'False';
  }
  if (data === 'GreenYes.png') {
    return 'For';
  }
  if (data === 'RedCross.png') {
    return 'Against';
  }
  if (data === 'RedCrclWithLine.png') {
    return 'Stop';
  }
  if (data === 'OrangeCross.png') {
    return 'Warning';
  }
  if (data === 'deskIcon.png') {
    return 'Unknown or N/A';
  }
  if (data === 'Up.png') {
    return 'Up';
  }
  if (data === 'Down.png') {
    return 'Down';
  }
  if (data === 'SEC Accept No Action') {
    return 'SEC Accept No Action';
  }
  if (data === 'SEC Reject No Action') {
    return 'SEC Reject No Action';
  }
  if (data === 'Proponent Withdrew') {
    return 'Proponent Withdrew';
  }
  if (data === 'Company accepts and Proponent withdrew') {
    return 'Company accepts and Proponent withdrew';
  }
  if (data === 'Reconsideration Declined') {
    return 'Reconsideration Declined';
  }
  return data;
}

export function NameToLetter(data) {
  if (data === 'True') {
    return 'T';
  }
  if (data === 'False') {
    return 'F';
  }
}

export function NameToImageIcon(data) {
  if (data === 'True') {
    return 'GreenYes.png';
  }
  if (data === 'False') {
    return 'RedCross.png';
  }
  if (data === 'For' || data === 'Yes' || data === 'SEC Accept No Action') {
    return 'GreenYes.png';
  }
  if (data === 'Against' || data === 'SEC Reject No Action') {
    return 'RedCross.png';
  }
  if (data === 'Left' || data === 'Proponent Withdrew') {
    return 'Left.png';
  }
  if (data === 'Right' || data === 'Company accepts and Proponent withdrew') {
    return 'Right.png';
  }
  if (data === 'Unknown or N/A' || data === null) {
    return 'deskIcon.png';
  }
  if (data === 'Stop' || data === 'Reconsideration Declined') {
    return 'RedCrclWithLine.png';
  }
  if (data === 'Warning') {
    return 'OrangeCross.png';
  }
  if (data === 'Up') {
    return 'Up.png';
  }
  if (data === 'Down') {
    return 'Down.png';
  }
  if (data === 'Warn') {
    return 'exclaim.png';
  }
  // if (data === null) {
  //   return 'deskIcon.png';
  // }
  return data;
}

export default {
  distinctCounts,
  getQuickFilterText,
  setNextGroupColumnText,
  converHistoricalTrendsFloatingNumber,
  ChangeName,
  NameToImageIcon,
  bottomStatusBar,
  columnAndfilterSidebar,
  columnSidebarNoPivotNoColNoRow,
  filterSidebar,
  columnSidebar,
  loadingRenderer,
  filters,
  columnAndfilterVulnAdvSearchSidebarServerside,
  customVulnFiltersToolPanelComponent,
  columnAndfilterSidebarNoPivotNoColNoRow,
};
