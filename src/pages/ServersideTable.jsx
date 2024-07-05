import React, { useEffect } from 'react';
import Page from '../components/Page';
import Table from '../components/GeneralForm/Table';
import config from '../config/server-config';
import {
  filters,
  distinctCounts,
  bottomStatusBar,
  columnAndfilterSidebarServerside
} from '../utils/AgGridFunctions';
import {
  checkValuesToFixed,
  formatCellEitherMillionsOrPercent,
  gridWidthValues,
  gridWidthValuesLrg,
  gridWidthValuesXLrg
} from '../utils/table-tools-util';
import { NATIONS_STRING_ARRAY } from '../constants/NationsConstants';
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
} from '../constants/TableConstants';
import bn from '../utils/bemnames';
import {
  GOVERNANCE,
  ACTIVIST_SHORTS,
  ACTIVIST_VULNERABILITY,
  ACTIVISM
} from '../constants/ProductConstants';
import { dateToNull } from '../utils/general-util';
import { listPowerSearchFilter } from '../utils/powerSearch-utils';
import { NUMBER_TWO, NUMBER_FOUR } from '../constants/NumberConstants';

const bem = bn.create('powersearch');

function TableExample() {
  const token = {
    MemberShip: [
      {
        product_id: 1,
        status: 4,
        start_date: '2020-01-01T00:00:00.000Z',
        end_date: '2025-08-26T00:00:00.000Z',
        short_name: 'Activism',
        product_name: 'Activist Insight Online'
      },
      {
        product_id: 2,
        status: 4,
        start_date: '2020-01-01T00:00:00.000Z',
        end_date: '2025-08-26T00:00:00.000Z',
        short_name: 'AiM',
        product_name: 'Activist Insight Monthly'
      },
      {
        product_id: 3,
        status: 4,
        start_date: '2021-01-13T00:00:00.000Z',
        end_date: '2025-05-14T00:00:00.000Z',
        short_name: 'Voting',
        product_name: 'Proxy Insight'
      },
      {
        product_id: 4,
        status: 4,
        start_date: '2020-01-01T00:00:00.000Z',
        end_date: '2025-08-26T00:00:00.000Z',
        short_name: 'Vulnerability',
        product_name: 'Activist Insight Vulnerability'
      },
      {
        product_id: 4,
        status: 4,
        start_date: '2020-01-01T00:00:00.000Z',
        end_date: '2025-08-26T00:00:00.000Z',
        short_name: 'Activist Shorts',
        product_name: 'Activist Insight Shorts'
      },
      {
        product_id: 6,
        status: 4,
        start_date: '2020-01-01T00:00:00.000Z',
        end_date: '2025-08-26T00:00:00.000Z',
        short_name: 'Governance',
        product_name: 'Activist Insight Governance'
      }
    ]
  };

  useEffect(() => {
    awaitlistPowerSearchFilter();
  }, [listPowerSearchFilter]);
  function isMembershipStatus(product_id, hasStatus, noStatus) {
    if (
      token.MemberShip !== undefined &&
      token.MemberShip.filter(
        (item) =>
          item.product_id === product_id &&
          (item.status === NUMBER_FOUR || item.status === NUMBER_TWO)
      ).length > 0
    ) {
      return hasStatus;
    }
    return noStatus;
  }

  const gridOptions = {
    rowModelType: 'serverSide',
    serverSideRoute: config.getPowerSearch,
    serverSideTables: {
      from: 'v_PowerSearch_Company'
    },
    serverSideNotInline: [
      'Latest_Activist_Short_Campaign_Allegations',
      'Latest_Activist_Short_Campaign_Start_Date'
    ],
    colDefsMedalsIncluded: [
      {
        headerName: 'Company Information',
        children: [
          {
            headerName: 'PID',
            field: 'pid',
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'enableValue',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            chartDataType: 'category',
            ...gridWidthValues,
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
            ...gridWidthValuesXLrg,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET
            }
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
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_TEXT
            }
          },
          {
            headerName: 'Market Cap',
            field: 'Market_Cap',
            filter: 'agNumberColumnFilter',
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'enableValue',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValuesLrg,
            cellRendererFramework: (params) =>
              formatCellEitherMillionsOrPercent(
                null,
                false,
                params.data.Market_Cap
              ),
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
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValuesLrg,
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
            filter: 'agDateColumnFilter',
            type: [
              'dateColumn',
              'enableRowGroup',
              'enableValue',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_DATE
            },
            cellRendererFramework: (params) => {
              if (params.data.IPO === null) return null;
              if (params.data.IPO) {
                return dateToNull(params.data.IPO, 'dd-mmm-yyyy', true);
              }
              return null;
            }
          },
          {
            headerName: 'Active',
            field: 'Active',
            filter: 'agSetColumnFilter',
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Active === null) return null;
              if (params.data.Active) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
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
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Controlled_Company === null) return null;
              if (params.data.Controlled_Company) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
          },
          {
            headerName: 'Staggered Board',
            field: 'Staggered_Board',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Staggered_Board === null) return null;
              if (params.data.Staggered_Board) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
          },
          {
            headerName: 'Active Poison Pill',
            field: 'Active_PoisonPill',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Active_PoisonPill === null) return null;
              if (params.data.Active_PoisonPill) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
          },
          {
            headerName: 'Number of Directors',
            field: 'Number_of_Directors',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Number_of_Directors === null) return null;
              if (params.data.Number_of_Directors) {
                return checkValuesToFixed(params.data.Number_of_Directors);
              }
              return null;
            }
          },
          {
            headerName: 'CEO Tenure',
            field: 'CEO_Tenure',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.CEO_Tenure === null) return null;
              if (params.data.CEO_Tenure) {
                return checkValuesToFixed(params.data.CEO_Tenure);
              }
              return null;
            }
          },
          {
            headerName: 'Chairman Tenure',
            field: 'Chairman_Tenure',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Chairman_Tenure === null) return null;
              if (params.data.Chairman_Tenure) {
                return checkValuesToFixed(params.data.Chairman_Tenure);
              }
              return null;
            }
          },
          {
            headerName: 'Separate CEO and Chairman',
            field: 'Separate_CEO_and_Chairman',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Separate_CEO_and_Chairman === null) return null;
              if (params.data.Separate_CEO_and_Chairman) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
          },
          {
            headerName: 'Females on Board',
            field: 'Females_on_Board',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Females_on_Board === null) return null;

              if (params.data.Females_on_Board) {
                return checkValuesToFixed(params.data.Females_on_Board);
              }
              return null;
            }
          },

          {
            headerName: 'Overboarded Directors',
            field: 'Overboarded_Directors',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Overboarded_Directors === null) return null;
              if (params.data.Overboarded_Directors) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
          },
          {
            headerName: 'Latest Minimum Support for Director',
            field: 'Latest_Minimum_Support_for_Director',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Minimum_Support_for_Director === null)
                return null;
              if (params.data.Latest_Minimum_Support_for_Director) {
                return checkValuesToFixed(
                  params.data.Latest_Minimum_Support_for_Director
                );
              }
              return null;
            }
          },

          {
            headerName: 'Latest Average Support for Director',
            field: 'Latest_Average_Support_for_Director',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Average_Support_for_Director === null)
                return null;

              if (params.data.Latest_Average_Support_for_Director) {
                return checkValuesToFixed(
                  params.data.Latest_Average_Support_for_Director
                );
              }
              return null;
            }
          },
          {
            headerName: 'Latest Support for Remuneration',
            field: 'Latest_Support_for_Remuneration',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Support_for_Remuneration === null)
                return null;
              if (params.data.Latest_Support_for_Remuneration) {
                return checkValuesToFixed(
                  params.data.Latest_Support_for_Remuneration
                );
              }
              return null;
            }
          },
          {
            headerName: 'Latest Annual Meeting Date',
            field: 'Latest_Annual_Meeting_Date',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agDateColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'dateColumn',
              'enableRowGroup',
              'enableValue',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_DATE
            },
            cellRendererFramework: (params) => {
              if (params.data.Latest_Annual_Meeting_Date === null) return null;
              if (params.data.Latest_Annual_Meeting_Date) {
                return dateToNull(
                  params.data.Latest_Annual_Meeting_Date,
                  'dd-mmm-yyyy',
                  true
                );
              }
              return null;
            }
          },
          {
            headerName: 'Governance Score',
            field: 'Governance_score',
            filter:
              isMembershipStatus(GOVERNANCE, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(GOVERNANCE, '', 'hidden-panel'),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Governance_score === null) return null;
              if (params.data.Governance_score) {
                return checkValuesToFixed(params.data.Governance_score);
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
            filter:
              isMembershipStatus(ACTIVIST_SHORTS, true, false) &&
              'agDateColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_SHORTS,
              '',
              'hidden-panel'
            ),
            type: [
              'dateColumn',
              'enableRowGroup',
              'enableValue',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_DATE
            },
            cellRendererFramework: (params) => {
              if (
                params.data.Latest_Activist_Short_Campaign_Start_Date === null
              )
                return null;
              if (params.data.Latest_Activist_Short_Campaign_Start_Date) {
                return dateToNull(
                  params.data.Latest_Activist_Short_Campaign_Start_Date,
                  'dd-mmm-yyyy',
                  true
                );
              }
              return null;
            }
          },
          {
            headerName: 'Latest Activist Short Campaign Activist',
            field: 'Latest_Activist_Short_Campaign_Activist',
            filter:
              isMembershipStatus(ACTIVIST_SHORTS, true, false) &&
              'agTextColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_SHORTS,
              '',
              'hidden-panel'
            ),
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
            filter:
              isMembershipStatus(ACTIVIST_SHORTS, true, false) &&
              'agSetColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_SHORTS,
              '',
              'hidden-panel'
            ),
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
        headerName: 'Company Fundamentals',
        toolPanelClass:
          isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
          isMembershipStatus(ACTIVISM, true, false)
            ? ''
            : 'hidden-panel',
        children: [
          {
            headerName: 'TSR 1 Year',
            field: 'TSR_1_Year',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_VULNERABILITY,
              '',
              'hidden-panel'
            ),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.TSR_1_Year === null) return null;
              if (params.data.TSR_1_Year) {
                return checkValuesToFixed(params.data.TSR_1_Year);
              }
              return null;
            }
          },
          {
            headerName: 'TSR 3 Year',
            field: 'TSR_3_Year',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_VULNERABILITY,
              '',
              'hidden-panel'
            ),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.TSR_3_Year === null) return null;
              if (params.data.TSR_3_Year) {
                return checkValuesToFixed(params.data.TSR_3_Year);
              }
              return null;
            }
          },
          {
            headerName: 'TSR 5 Year',
            field: 'TSR_5_Year',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_VULNERABILITY,
              '',
              'hidden-panel'
            ),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.TSR_5_Year === null) return null;
              if (params.data.TSR_5_Year) {
                return checkValuesToFixed(params.data.TSR_5_Year);
              }
              return null;
            }
          },
          {
            headerName: 'Total Institutional Ownership',
            field: 'Total_Institutional_Ownership',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_VULNERABILITY,
              '',
              'hidden-panel'
            ),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Total_Institutional_Ownership === null)
                return null;
              if (params.data.Total_Institutional_Ownership) {
                return checkValuesToFixed(
                  params.data.Total_Institutional_Ownership
                );
              }
              return null;
            }
          },
          {
            headerName: 'Presence of active activist campaign',
            field: 'Presence_of_active_activist_campaign',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              isMembershipStatus(ACTIVISM, true, false) &&
              'agSetColumnFilter',
            toolPanelClass:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              isMembershipStatus(ACTIVISM, true, false)
                ? ''
                : 'hidden-panel',
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
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
            cellRendererFramework: (params) => {
              if (params.data.Presence_of_active_activist_campaign === null)
                return null;
              if (params.data.Presence_of_active_activist_campaign) {
                return (
                  <img
                    src={`${window.location.origin}/images/icons/GreenYes.png`}
                    alt='Green Tick'
                  />
                );
              }
              return (
                <img
                  src={`${window.location.origin}/images/icons/RedCross.png`}
                  alt='Red Cross'
                />
              );
            }
          },
          {
            headerName: 'Activist Nominee Currently on Board',
            field: 'Activist_Nominee_Currently_on_Board',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_VULNERABILITY,
              '',
              'hidden-panel'
            ),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.Activist_Nominee_Currently_on_Board === null)
                return null;
              if (params.data.Activist_Nominee_Currently_on_Board) {
                return checkValuesToFixed(
                  params.data.Activist_Nominee_Currently_on_Board
                );
              }
              return null;
            }
          },
          {
            headerName: 'AiV score',
            field: 'AiV_score',
            filter:
              isMembershipStatus(ACTIVIST_VULNERABILITY, true, false) &&
              'agNumberColumnFilter',
            toolPanelClass: isMembershipStatus(
              ACTIVIST_VULNERABILITY,
              '',
              'hidden-panel'
            ),
            type: [
              'numberColumn',
              'rightAligned',
              'enableRowGroup',
              'hiddenField'
            ],
            aggFunc: 'count(Dist)',
            allowedAggFuncs: ['count(Dist)', 'count'],
            enablePivot: true,
            chartDataType: 'category',
            ...gridWidthValues,
            filterParams: {
              buttons: TABLE_FILTER_BUTTONS_APPLY_RESET,
              filterOptions: TABLE_FILTER_OPTIONS_NUMBER
            },
            cellRendererFramework: (params) => {
              if (params.data.AiV_score === null) return null;
              if (params.data.AiV_score) {
                return checkValuesToFixed(params.data.AiV_score);
              }
              return null;
            }
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
    statusBar: bottomStatusBar,
    suppressAggFuncInHeader: true,
    aggFuncs: {
      'count(Dist)': distinctCounts
    },
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh',
    suppressFieldDotNotation: true,
    saveFilter: true,
    refreshServer: false,
    HeaderGrouping: {
      isHeaderChildren: true,
      isgroupHeaderVertical: false,
      groupHeaderHeight: 55
    }
  };

  return (
    <div className={bem.b('')}>
      <Page title='Table Sample'>
        <Table title='Table' smalltitle='Example' gridOptions={gridOptions} />
      </Page>
    </div>
  );
}

export default TableExample;
