import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  COMPANY_SEARCH,
  GREEN_FLAG_LARGE,
  GREY_FLAG_IMG,
  RED_FLAG_LARGE,
} from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import bn from '../../../utils/bemnames';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import DropdownList from '../../GeneralForm/DropdownList';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('bylawsCharterGuidelines');

const Bylawscharterguidelines = ({
  location,
  TrialLog,
  allowDownload,
  dataGetItem303,
  companyByLawDirector503,
  isLoadingData,
  TrialUser,
  TrialUserDisableDownload,
  selection_ddlComparision,
  ddlComparision,
  handleSetDDLComparision,
  handledLoadingBylaw,
}) => {
  const arrIndecii = [
    { label: 'S&P 500', value: 'SP500' },
    { label: 'Russell 3000', value: 'Russell3000' },
  ];
  const [comparison, setComparison] = useState(arrIndecii[0]);
  const [isLoading, setIsLoading] = useState(false);

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  const gridOptionsRecentBylawsCharterFilings = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'date_time',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : ['ws-normal-lh24', 'ps-1', 'pe-1', 'text-center', 'dateFormat'],
      },
      {
        headerName: 'Document',
        field: 'url',
        minWidth: 110,
        maxWidth: 110,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => (
          <div>
            {!TrialUserDisableDownload && params.data.url ? (
              <a
                className='text-secondary'
                href={params.data.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                View
              </a>
            ) : (
              <span className='disable-text'>View</span>
            )}
          </div>
        ),
      },
      {
        headerName: 'Details',
        field: 'amends',
        type: ['autoHeightTrue'],
        minWidth: 830,
        maxWidth: query.print ? 830 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => params.data.amends,
      },
      {
        headerName: 'Details',
        field: 'amendsexcel',
        type: ['autoHeightTrue', 'hiddenField'],
        minWidth: 830,
        maxWidth: query.print ? 830 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => params.data.amendsexcel,
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: companyByLawDirector503 && companyByLawDirector503.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      date_time: x.date_time !== undefined ? dateToNull(x.date_time, 'dd-mmm-yy') : '',
      amendsexcel: x.amends !== undefined && x.amends !== '' ? x.amends.replaceAll('</br>', '\n') : '',
    })),
    selectedColumns: [
      'date_time',
      'url',
      'amendsexcel'
    ],
  };
  const gridOptionsBoardAndDirectors = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'metric',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: 150,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Detail',
        field: 'detail',
        type: ['autoHeightTrue'],
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Risk',
        field: 'risk',
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.risk === 'GrayFill') {
            return (
              <img
                className='smallIcon'
                src={`${window.location.origin}${GREY_FLAG_IMG}`}
                alt='Gray Mark'
              />
            );
          }
          return (
            <img
              className='smallIcon'
              src={
                params.data.risk === 'Green'
                  ? `${window.location.origin}${GREEN_FLAG_LARGE}`
                  : `${window.location.origin}${RED_FLAG_LARGE}`
              }
              alt={params.data.risk === 'Green' ? 'Healthy' : 'Warning'}
            />
          );
        },
      },
      {
        headerName: 'Description',
        field: 'descriptions',
        type: ['autoHeightTrue'],
        minWidth: 470,
        maxWidth: query.print ? 470 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Source',
        field: 'sources',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.sources_url ? (
              <a
                className='text-secondary'
                href={params.data.sources_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {params.data.sources}
              </a>
            ) : (
              <span className='disable-text'>{params.data.sources}</span>
            )}
          </div>
        ),
      },
      {
        headerName: `${selection_ddlComparision.label} Comparison`,
        field: `per_comparison_${selection_ddlComparision.value1}`,
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: dataGetItem303[1] && dataGetItem303[1].map((x) => {
      const a = {
        ...x,
        TrialUser,
        allowDownload,
        per_comparison_Russell3000: x.comparison_Russell3000.substring(
          x.comparison_Russell3000.lastIndexOf('- ') + 2,
          x.comparison_Russell3000.length
        ),
        'per_comparison_S&P500': x.comparison_SP500.substring(
          x.comparison_SP500.lastIndexOf('- ') + 2,
          x.comparison_SP500.length
        ),
      };
      return a;
    }),
  };
  const gridOptionsShareholderRights = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'metric',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: 150,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Detail',
        field: 'detail',
        type: ['autoHeightTrue'],
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Risk',
        field: 'risk',
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.risk === 'GrayFill') {
            return (
              <img
                className='smallIcon'
                src={`${window.location.origin}${GREY_FLAG_IMG}`}
                alt='Gray Mark'
              />
            );
          }
          return (
            <img
              className='smallIcon'
              src={
                params.data.risk === 'Green'
                  ? `${window.location.origin}${GREEN_FLAG_LARGE}`
                  : `${window.location.origin}${RED_FLAG_LARGE}`
              }
              alt={params.data.risk === 'Green' ? 'Healthy' : 'Warning'}
            />
          );
        },
      },
      {
        headerName: 'Description',
        field: 'descriptions',
        type: ['autoHeightTrue'],
        minWidth: 470,
        maxWidth: query.print ? 470 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Source',
        field: 'sources',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.sources_url ? (
              <a
                className='text-secondary'
                href={params.data.sources_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {params.data.sources}
              </a>
            ) : (
              <span className='disable-text'>{params.data.sources}</span>
            )}
          </div>
        ),
      },
      {
        headerName: `${selection_ddlComparision.label} Comparison`,
        field: `per_comparison_${selection_ddlComparision.value1}`,
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: dataGetItem303[2] && dataGetItem303[2].map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      per_comparison_Russell3000: x.comparison_Russell3000.substring(
        x.comparison_Russell3000.lastIndexOf('- ') + 2,
        x.comparison_Russell3000.length
      ),
      'per_comparison_S&P500': x.comparison_SP500.substring(
        x.comparison_SP500.lastIndexOf('- ') + 2,
        x.comparison_SP500.length
      ),
    })),
  };
  const gridOptionsAntitakeoverProvisions = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'metric',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: 150,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Detail',
        field: 'detail',
        type: ['autoHeightTrue'],
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Risk',
        field: 'risk',
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.risk === 'Not Mentioned' || params.data.risk === 'GrayFill') {
            return (
              <img
                className='smallIcon'
                src={`${window.location.origin}${GREY_FLAG_IMG}`}
                alt='Not Mentioned'
              />
            );
          }
          return (
            <img
              className='smallIcon'
              src={
                params.data.risk === 'Green'
                  ? `${window.location.origin}${GREEN_FLAG_LARGE}`
                  : `${window.location.origin}${RED_FLAG_LARGE}`
              }
              alt={params.data.risk === 'Green' ? 'Healthy' : 'Warning'}
            />
          );
        },
      },
      {
        headerName: 'Description',
        field: 'descriptions',
        type: ['autoHeightTrue'],
        minWidth: 470,
        maxWidth: query.print ? 470 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Source',
        field: 'sources',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.sources_url ? (
              <a
                className='text-secondary'
                href={params.data.sources_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {params.data.sources}
              </a>
            ) : (
              <span className='disable-text'>{params.data.sources}</span>
            )}
          </div>
        ),
      },
      {
        headerName: `${selection_ddlComparision.label} Comparison`,
        field: `per_comparison_${selection_ddlComparision.value1}`,
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: dataGetItem303[5] && dataGetItem303[5].map((x) => {
      const a = {
        ...x,
        TrialUser,
        allowDownload,
        per_comparison_Russell3000: x.comparison_Russell3000.substring(
          x.comparison_Russell3000.lastIndexOf('- ') + 2,
          x.comparison_Russell3000.length
        ),
        'per_comparison_S&P500': x.comparison_SP500.substring(
          x.comparison_SP500.lastIndexOf('- ') + 2,
          x.comparison_SP500.length
        ),
      };
      return a;
    }),
  };
  const gridOptionsExclusiveForumProvision = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'metric',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: 150,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Detail',
        field: 'detail',
        type: ['autoHeightTrue'],
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Risk',
        field: 'risk',
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.risk === 'GrayFill') {
            return (
              <img
                className='smallIcon'
                src={`${window.location.origin}${GREY_FLAG_IMG}`}
                alt='Gray Mark'
              />
            );
          }
          return (
            <img
              className='smallIcon'
              src={
                params.data.risk === 'Green'
                  ? `${window.location.origin}${GREEN_FLAG_LARGE}`
                  : `${window.location.origin}${RED_FLAG_LARGE}`
              }
              alt={params.data.risk === 'Green' ? 'Healthy' : 'Warning'}
            />
          );
        },
      },
      {
        headerName: 'Description',
        field: 'descriptions',
        type: ['autoHeightTrue'],
        minWidth: 470,
        maxWidth: query.print ? 470 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Source',
        field: 'sources',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.sources_url ? (
              <a
                className='text-secondary'
                href={params.data.sources_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {params.data.sources}
              </a>
            ) : (
              <span className='disable-text'>{params.data.sources}</span>
            )}
          </div>
        ),
      },
      {
        headerName: `${selection_ddlComparision.label} Comparison`,
        field: `per_comparison_${selection_ddlComparision.value1}`,
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: dataGetItem303[3] && dataGetItem303[3].map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      per_comparison_Russell3000: x.comparison_Russell3000.substring(
        x.comparison_Russell3000.lastIndexOf('- ') + 2,
        x.comparison_Russell3000.length
      ),
      'per_comparison_S&P500': x.comparison_SP500.substring(
        x.comparison_SP500.lastIndexOf('- ') + 2,
        x.comparison_SP500.length
      ),
    })),
  };
  const gridOptionsAmendments = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Metric',
        field: 'metric',
        type: ['autoHeightTrue'],
        minWidth: 150,
        maxWidth: 150,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Detail',
        field: 'detail',
        type: ['autoHeightTrue'],
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Risk',
        field: 'risk',
        minWidth: 90,
        maxWidth: query.print ? 90 : 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 pt-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 pt-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.risk === 'GrayFill') {
            return (
              <img
                className='smallIcon'
                src={`${window.location.origin}${GREY_FLAG_IMG}`}
                alt='Gray Mark'
              />
            );
          }
          return (
            <img
              className='smallIcon'
              src={
                params.data.risk === 'Green'
                  ? `${window.location.origin}${GREEN_FLAG_LARGE}`
                  : `${window.location.origin}${RED_FLAG_LARGE}`
              }
              alt={params.data.risk === 'Green' ? 'Healthy' : 'Warning'}
            />
          );
        },
      },
      {
        headerName: 'Description',
        field: 'descriptions',
        type: ['autoHeightTrue'],
        minWidth: 470,
        maxWidth: query.print ? 470 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 font-size-small'
          : 'ws-normal-lh24 ps-1 pe-1 font-size-small',
      },
      {
        headerName: 'Source',
        field: 'sources',
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => (
          <div>
            {params.data.sources_url ? (
              <a
                className='text-secondary'
                href={params.data.sources_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {params.data.sources}
              </a>
            ) : (
              <span className='disable-text'>{params.data.sources}</span>
            )}
          </div>
        ),
      },
      {
        headerName: `${selection_ddlComparision.label} Comparison`,
        field: `per_comparison_${selection_ddlComparision.value1}`,
        minWidth: 120,
        maxWidth: query.print ? 120 : null,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
      },
    ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true,
    },
    rowData: dataGetItem303[4] && dataGetItem303[4].map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      per_comparison_Russell3000: x.comparison_Russell3000.substring(
        x.comparison_Russell3000.lastIndexOf('- ') + 2,
        x.comparison_Russell3000.length
      ),
      'per_comparison_S&P500': x.comparison_SP500.substring(
        x.comparison_SP500.lastIndexOf('- ') + 2,
        x.comparison_SP500.length
      ),
    })),
  };

  React.useEffect(() => {
    if (!isLoadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoadingData]);

  return (
    <Page
      {...{
        location,
        TrialLog,
        allowDownload,
        dataGetItem303,
        companyByLawDirector503,
      }}
      key={1}
      className={bem.b('pt-3 fadeInAnimation')}
    >
      {isLoadingData && selection_ddlComparision.length > 0 ? (
        LOADING
      ) : (
        <>
          {companyByLawDirector503.length > 0 && (
            <div className='row pt-2'>
              <div className='col-12'>
                <ErrorBoundary hasCard cardtitle='Bylaw and Charter Filings'>
                  <Table
                    gridOptions={gridOptionsRecentBylawsCharterFilings}
                    title='Bylaw and Charter Filings'
                    pageTitle='Bylaw and Charter Filings'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}
          <div className='row align-items-center' id='loadItem'>
            {(
              dataGetItem303[1].length > 0 ||
              dataGetItem303[2].length > 0 ||
              dataGetItem303[3].length > 0 ||
              dataGetItem303[4].length > 0 ||
              dataGetItem303[5].length > 0) && (
              <>
                <div className='col-md-8' />
                <div className='col-md-2 col-6 font-weight-bold text-primary text-end m-0'>
                  Comparison:
                </div>
                <div className='col-md-2 col-6 m-0'>
                  <DropdownList
                    handleChange={(e) => {
                      if (e !== null) {
                        handleSetDDLComparision(e);
                        handledLoadingBylaw();
                        // handleIsLoading(true);
                      }
                    }}
                    selectValue={selection_ddlComparision}
                    options={ddlComparision}
                    isMulti={false}
                    Dvalue={selection_ddlComparision}
                    maxHeight={100}
                    placeholder='(Optional) Choose Comparison...'
                    disabled={isLoadingData ? true : TrialUser}
                  />
                </div>
              </>
            )}
          </div>

          {!isLoadingData && (
            <div className={isLoading ? 'fadeOutAnimation' : 'fadeInAnimation'}>
              <div className='row pt-3 mt-1'>
                <div className='col-12'>
                  {dataGetItem303[1].length > 0 ? (
                    <ErrorBoundary hasCard cardtitle='Board and Directors'>
                      <Table
                        gridOptions={gridOptionsBoardAndDirectors}
                        title='Board and Directors'
                        pageTitle='Board and Directors'
                        hideExcelDownloadIcon={TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  ) : (
                    <Card title='Board and Directors'>{NORECORDS}</Card>
                  )}
                </div>
              </div>

              <div className='row'>
                <div className='col-12 mt-2'>
                  {dataGetItem303[2].length > 0 ? (
                    <ErrorBoundary hasCard cardtitle='Shareholder Rights and Voting'>
                      <Table
                        gridOptions={gridOptionsShareholderRights}
                        title='Shareholder Rights and Voting'
                        pageTitle='Shareholder Rights and Voting'
                        hideExcelDownloadIcon={TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  ) : (
                    <Card title='Shareholder Rights and Voting'>
                      {NORECORDS}
                    </Card>
                  )}
                </div>
              </div>

              <div className='row pdfpagebreak'>
                <div className='col-12 mt-2'>
                  {dataGetItem303[5].length > 0 ? (
                    <Table
                      gridOptions={gridOptionsAntitakeoverProvisions}
                      title='Anti-takeover Provisions'
                      pageTitle='Anti-takeover Provisions'
                      hideExcelDownloadIcon={TrialUserDisableDownload}
                    />
                  ) : (
                    <Card title='Anti-takeover Provisions'>
                      {NORECORDS}
                    </Card>
                  )}
                </div>
              </div>

              <div className='row pdfpagebreak'>
                <div className='col-12 mt-2'>
                  {dataGetItem303[3].length > 0 ? (
                    <ErrorBoundary hasCard cardtitle='Exclusive Forum Provision'>
                      <Table
                        gridOptions={gridOptionsExclusiveForumProvision}
                        title='Exclusive Forum Provision'
                        pageTitle='Exclusive Forum Provision'
                        hideExcelDownloadIcon={TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  ) : (
                    <Card title='Shareholder Rights and Voting'>
                      {NORECORDS}
                    </Card>
                  )}
                </div>
              </div>

              <div className='row'>
                <div className='col-12 mt-2'>
                  {dataGetItem303[4].length > 0 ? (
                    <ErrorBoundary hasCard cardtitle='Amendments'>
                      <Table
                        gridOptions={gridOptionsAmendments}
                        title='Amendments'
                        pageTitle='Amendments'
                        hideExcelDownloadIcon={TrialUserDisableDownload}
                      />
                    </ErrorBoundary>
                  ) : (
                    <Card title='Amendments'>{NORECORDS}</Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

Bylawscharterguidelines.propTypes = {
  TrialLog: PropTypes.any,
  allowDownload: PropTypes.bool,
  companyByLawDirector503: PropTypes.array,
  dataGetItem303: PropTypes.array,
  isLoadingData: PropTypes.any,
};

Bylawscharterguidelines.defaultProps = {
  TrialLog: '',
  allowDownload: false,
  companyByLawDirector503: [],
  dataGetItem303: [],
  isLoadingData: undefined,
};

export default withRouter(React.memo(Bylawscharterguidelines));
