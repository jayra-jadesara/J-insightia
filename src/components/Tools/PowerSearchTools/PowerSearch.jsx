import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Page from '../../Page';
import Table from '../../GeneralForm/Table';
import bn from '../../../utils/bemnames';
import { NATIONS_STRING_ARRAY } from '../../../constants/NationsConstants';
import {
  POWERSEARCH_ALLEGATION_NAMES,
  POWERSEARCH_BOOLEAN_SET,
  POWERSEARCH_INDUSTRY_NAMES,
  POWERSEARCH_MARKETCAP_NAMES,
  POWERSEARCH_SECTOR_NAMES,
  TABLE_FILTER_BUTTONS_APPLY_RESET,
  TABLE_FILTER_OPTIONS_DATE,
  TABLE_FILTER_OPTIONS_NUMBER,
  TABLE_FILTER_OPTIONS_TEXT,
  TABLE_FILTER_VALUE_FORMATTER_SET,
  TABLE_FILTER_VALUE_FORMATTER_UNKNOWN
} from '../../../constants/TableConstants';
import { GOVERNANCE, ACTIVIST_SHORTS, ACTIVIST_VULNERABILITY, ACTIVISM } from '../../../constants/ProductConstants';
import { POWERSEARCH_INSIGHTIA_FILTER_LIST } from '../../../constants/PowerSearchConstants';
import { dateToNull } from '../../../utils/general-util';
import config from '../../../config/server-config';
import {
  filters,
  distinctCounts,
  bottomStatusBarServerside,
  columnAndfilterSidebarServerside
} from '../../../utils/AgGridFunctions';
import {
  checkValuesToFixed,
  formatCellEitherMillionsOrPercent,
  gridWidthValuesLrg,
  gridWidthValues,
  gridWidthValuesXLrg
} from '../../../utils/table-tools-util';
import { COMPANY_OVERVIEW } from '../../../constants/PathsConstant';
import { powersearchImageHandlerHTML } from '../../../utils/powerSearch-utils';
import { COLUMNS_DEF_POWERSEARCH_DEFAULT } from '../../../constants/PowerSearchColumnDefConstants';

const bem = bn.create('powersearch');

const PowerSearch = ({
  listFilter,
  deleteFilter,
  createFilter,
  updateFilter,
  createPowerSearchFilterReq,
  deletePowerSearchFilterReq,
  updatePowerSearchFilterReq,
  listPowerSearchFilterReq,
  isMembershipStatus,
  token
}) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      setUserId(token.User_Id);
    }
  }, [token]);

  const gridOptions = {
    rowModelType: 'serverSide',
    serverSideRoute: config.getPowerSearch,
    serverSideTables: {
      from: 'v_PowerSearch_Company'
    },
    defaultFilterList: POWERSEARCH_INSIGHTIA_FILTER_LIST,
    defaultFilterOnClear: COLUMNS_DEF_POWERSEARCH_DEFAULT,
    defaultColDef: {
      sortable: true
    },
    serverSideNotInline: ['Latest_Activist_Short_Campaign_Allegations', 'Latest_Activist_Short_Campaign_Start_Date'],
    colDefsMedalsIncluded: [
      {
        headerName: 'Company Information',
        children: [
          {
            headerName: 'PID',
            field: 'pid',
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'enableValue'],
            aggFunc: 'count(Dist)',
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET
            }
          },
          {
            headerName: 'Company name',
            field: 'Company_Name',
            filter: 'agTextColumnFilter',
            type: ['enableRowGroup', 'enableValue'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            minWidth: 290,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET
            },
            cellRendererFramework: (params) => (
              <div>
                <Link className="text-secondary" to={`${COMPANY_OVERVIEW}?pid=${params.data.pid}`} target='_blank' rel='noopener noreferrer'>
                  {`${params.data.Company_Name}`}
                </Link>
              </div>
            )
          },
          {
            headerName: 'Company HQ',
            field: 'Company_HQ',
            filter: 'agSetColumnFilter',
            type: ['setColumn', 'enableRowGroup', 'enableValue'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: [...NATIONS_STRING_ARRAY]
            }
          },
          {
            headerName: 'Industry',
            field: 'Industry',
            filter: 'agSetColumnFilter',
            type: ['setColumn', 'enableRowGroup', 'enableValue'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesXLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_INDUSTRY_NAMES,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_UNKNOWN
            }
          },
          {
            headerName: 'Sector',
            field: 'Sector',
            filter: 'agSetColumnFilter',
            type: ['setColumn', 'enableRowGroup', 'enableValue'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesXLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_SECTOR_NAMES,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_UNKNOWN
            }
          },
          {
            headerName: 'Index List',
            field: 'IndexList',
            filter: 'agTextColumnFilter',
            type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            minWidth: 325,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_TEXT
            }
          },
          {
            headerName: 'Market Cap ($M)',
            field: 'Market_Cap',
            filter: 'agNumberColumnFilter',
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            numberComparator(aVal, bVal, nodeA, nodeB, isInverted) {
              if (aVal === bVal) {
                return 0;
              }
              return aVal < bVal ? -1 : 1;
            },
            cellRendererFramework: (params) =>
              formatCellEitherMillionsOrPercent(null, false, checkValuesToFixed(params.data.Market_Cap, 1)),
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            }
          },
          {
            headerName: 'Market Cap Category',
            field: 'Market_Cap_Category',
            filter: 'agSetColumnFilter',
            type: ['setColumn', 'enableRowGroup', 'enableValue'],
            allowedAggFuncs: ['count(Dist)', 'count'],
            aggFunc: 'count(Dist)',
            chartDataType: 'category',
            minWidth: 180,
            maxWidth: 200,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_MARKETCAP_NAMES,
              suppressSorting: true,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_UNKNOWN
            }
          },
          {
            headerName: 'IPO',
            field: 'IPO',
            filter: 'agNumberColumnFilter',
            type: ['dateColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_DATE
            }
          },
          {
            headerName: 'Active',
            field: 'Active',
            filter: 'agSetColumnFilter',
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Active)
          }
        ]
      },
      {
        headerName: 'Company Governance',
        toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
        children: [
          {
            headerName: 'Controlled Company',
            field: 'Controlled_Company',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Controlled_Company)
          },
          {
            headerName: 'Staggered Board',
            field: 'Staggered_Board',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Staggered_Board)
          },
          {
            headerName: 'Active Poison Pill',
            field: 'Active_PoisonPill',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Active_PoisonPill)
          },
          {
            headerName: 'Number of Directors',
            field: 'Number_of_Directors',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Number_of_Directors === null) return null;
              if (params.data.Number_of_Directors) {
                return checkValuesToFixed(params.data.Number_of_Directors, 0);
              }
              return null;
            }
          },
          {
            headerName: 'CEO Tenure',
            field: 'CEO_Tenure',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.CEO_Tenure === null) return null;
              if (params.data.CEO_Tenure) {
                return checkValuesToFixed(params.data.CEO_Tenure, 0);
              }
              return null;
            }
          },
          {
            headerName: 'Chairman Tenure',
            field: 'Chairman_Tenure',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Chairman_Tenure === null) return null;
              if (params.data.Chairman_Tenure) {
                return checkValuesToFixed(params.data.Chairman_Tenure, 0);
              }
              return null;
            }
          },
          {
            headerName: 'Separate CEO and Chairman',
            field: 'Separate_CEO_and_Chairman',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            minWidth: 150,
            maxWidth: 160,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Separate_CEO_and_Chairman)
          },
          {
            headerName: 'Females on Board',
            field: 'Females_on_Board',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            sortable: true,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Females_on_Board === null) return null;

              if (params.data.Females_on_Board) {
                return checkValuesToFixed(params.data.Females_on_Board, 1);
              }
              return null;
            }
          },

          {
            headerName: 'Overboarded Directors',
            field: 'Overboarded_Directors',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Overboarded_Directors)
          },
          {
            headerName: 'Governance Score',
            field: 'Governance_score',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Governance_score === null) return null;
              if (params.data.Governance_score) {
                return checkValuesToFixed(params.data.Governance_score, 1);
              }
              return null;
            }
          }
        ]
      },
      {
        headerName: 'Company Voting',
        toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
        children: [
          {
            headerName: 'Latest Minimum Support for Director',
            field: 'Latest_Minimum_Support_for_Director',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            minWidth: 170,
            maxWidth: 170,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Minimum_Support_for_Director === null) {
                return null;
              }
              if (params.data.Latest_Minimum_Support_for_Director) {
                return checkValuesToFixed(params.data.Latest_Minimum_Support_for_Director, 1);
              }
              return null;
            }
          },
          {
            headerName: 'Latest Average Support for Director',
            field: 'Latest_Average_Support_for_Director',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Average_Support_for_Director === null) {
                return null;
              }

              if (params.data.Latest_Average_Support_for_Director) {
                return checkValuesToFixed(params.data.Latest_Average_Support_for_Director, 1);
              }
              return null;
            }
          },
          {
            headerName: 'Latest Support for Remuneration',
            field: 'Latest_Support_for_Remuneration',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            minWidth: 170,
            maxWidth: 170,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Support_for_Remuneration === null) {
                return null;
              }
              if (params.data.Latest_Support_for_Remuneration) {
                return checkValuesToFixed(params.data.Latest_Support_for_Remuneration, 1);
              }
              return null;
            }
          },
          {
            headerName: 'Latest Annual Meeting Date',
            field: 'Latest_Annual_Meeting_Date',
            filter: isMembershipStatus(GOVERNANCE, true, false) && 'agDateColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: ['dateColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            minWidth: 170,
            maxWidth: 170,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_DATE
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Annual_Meeting_Date === null) return null;
              if (params.data.Latest_Annual_Meeting_Date) {
                return dateToNull(params.data.Latest_Annual_Meeting_Date, 'dd-mmm-yyyy', true);
              }
              return null;
            }
          }
        ]
      },
      {
        headerName: 'Company Short Campaigns',
        toolPanelClass: isMembershipStatus(ACTIVIST_SHORTS, '', 'hidden-panel'),
        children: [
          {
            headerName: 'Latest Activist Short Campaign Start Date',
            field: 'Latest_Activist_Short_Campaign_Start_Date',
            filter: isMembershipStatus(ACTIVIST_SHORTS, true, false) && 'agDateColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_SHORTS, '', 'hidden-panel'),
            type: ['dateColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_DATE
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Activist_Short_Campaign_Start_Date === null) {
                return null;
              }
              if (params.data.Latest_Activist_Short_Campaign_Start_Date) {
                return dateToNull(params.data.Latest_Activist_Short_Campaign_Start_Date, 'dd-mmm-yyyy', true);
              }
              return null;
            }
          },
          {
            headerName: 'Latest Activist Short Campaign Activist',
            field: 'Latest_Activist_Short_Campaign_Activist',
            filter: isMembershipStatus(ACTIVIST_SHORTS, true, false) && 'agTextColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_SHORTS, '', 'hidden-panel'),
            type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesXLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_TEXT
            }
          },
          {
            headerName: 'Latest Activist Short Campaign Allegations',
            field: 'Latest_Activist_Short_Campaign_Allegations',
            filter: isMembershipStatus(ACTIVIST_SHORTS, true, false) && 'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_SHORTS, '', 'hidden-panel'),
            type: ['setColumn', 'enableRowGroup', 'enableValue', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesXLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_ALLEGATION_NAMES,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_UNKNOWN
            }
          }
        ]
      },
      {
        headerName: 'Company Activism Vulnerability Fundamentals',
        toolPanelClass:
          isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && isMembershipStatus(ACTIVISM, true, false)
            ? ''
            : 'hidden-panel',
        children: [
          {
            headerName: 'TSR 1 Year',
            field: 'TSR_1_Year',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.TSR_1_Year === null) return null;
              if (params.data.TSR_1_Year) {
                return checkValuesToFixed(params.data.TSR_1_Year, 1);
              }
              return null;
            }
          },
          {
            headerName: 'TSR 3 Year',
            field: 'TSR_3_Year',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.TSR_3_Year === null) return null;
              if (params.data.TSR_3_Year) {
                return checkValuesToFixed(params.data.TSR_3_Year, 1);
              }
              return null;
            }
          },
          {
            headerName: 'TSR 5 Year',
            field: 'TSR_5_Year',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.TSR_5_Year === null) return null;
              if (params.data.TSR_5_Year) {
                return checkValuesToFixed(params.data.TSR_5_Year, 1);
              }
              return null;
            }
          },
          {
            headerName: 'Total Institutional Ownership',
            field: 'Total_Institutional_Ownership',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            minWidth: 170,
            maxWidth: 170,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Total_Institutional_Ownership === null) {
                return null;
              }
              if (params.data.Total_Institutional_Ownership) {
                return checkValuesToFixed(params.data.Total_Institutional_Ownership, 1);
              }
              return null;
            }
          },
          {
            headerName: 'AiV score',
            field: 'AiV_score',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.AiV_score === null) return null;
              if (params.data.AiV_score) {
                return checkValuesToFixed(params.data.AiV_score, 1);
              }
              return null;
            }
          }
        ]
      },
      {
        headerName: 'Company Activism',
        toolPanelClass:
          isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && isMembershipStatus(ACTIVISM, true, false)
            ? ''
            : 'hidden-panel',
        children: [
          {
            headerName: 'Presence of Active Activist Campaign',
            field: 'Presence_of_active_activist_campaign',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              isMembershipStatus(ACTIVISM, true, false) &&
              'agSetColumnFilter',
            toolPanelClass:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && isMembershipStatus(ACTIVISM, true, false)
                ? ''
                : 'hidden-panel',
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              values: POWERSEARCH_BOOLEAN_SET,
              valueFormatter: TABLE_FILTER_VALUE_FORMATTER_SET
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Presence_of_active_activist_campaign)
          },
          {
            headerName: 'Activist Nominee Currently on Board',
            field: 'Activist_Nominee_Currently_on_Board',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['numberColumn', 'rightAligned', 'enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRenderer: (params) => powersearchImageHandlerHTML(params.data.Activist_Nominee_Currently_on_Board)
          },
          {
            headerName: 'Active Activist Campaign Activist',
            field: 'Active_Activist_Campaign_Activist',
            filter: isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) && 'agTextColumnFilter',
            toolPanelClass: isMembershipStatus(ACTIVIST_VULNERABILITY, '', 'hidden-panel'),
            type: ['enableRowGroup', 'hiddenField'],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            minWidth: 200
          }
        ]
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: 10 },
    isfloatingFilter: false,
    pivotMode: false,
    sideBar: columnAndfilterSidebarServerside,
    statusBar: bottomStatusBarServerside,
    suppressAggFuncInHeader: true,
    aggFuncs: {
      'count(Dist)': distinctCounts
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh',
    suppressFieldDotNotation: true,
    saveFilter: true,
    saveFilterParams: {
      listFilter,
      deleteFilter,
      createFilter,
      updateFilter,
      createFilterFx: createPowerSearchFilterReq,
      deleteFilterFx: deletePowerSearchFilterReq,
      listFilterFx: listPowerSearchFilterReq,
      updateFilterFx: updatePowerSearchFilterReq,
      userId
    },
    refreshServer: true,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: 55
    }
  };

  return (
    <div className={bem.b('')}>
      <Page title='PowerSearch'>
        <Table title='PowerSearch' gridOptions={gridOptions} IsShowCard={false} />
      </Page>
    </div>
  );
};

PowerSearch.propTypes = {
  createFilter: PropTypes.array,
  createPowerSearchFilterReq: PropTypes.func,
  deleteFilter: PropTypes.array,
  deletePowerSearchFilterReq: PropTypes.func,
  isMembershipStatus: PropTypes.func,
  listFilter: PropTypes.array,
  listPowerSearchFilterReq: PropTypes.func,
  token: PropTypes.object,
  updateFilter: PropTypes.array,
  updatePowerSearchFilterReq: PropTypes.func
};

PowerSearch.defaultProps = {
  createFilter: [],
  createPowerSearchFilterReq: () => {},
  deleteFilter: [],
  deletePowerSearchFilterReq: () => {},
  isMembershipStatus: () => {},
  listFilter: [],
  listPowerSearchFilterReq: () => {},
  token: {},
  updateFilter: [],
  updatePowerSearchFilterReq: () => {}
};

export default withRouter(React.memo(PowerSearch));
