import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  ADVISOR_SEARCH,
  LINKEDIN_LARGE_IMG,
  QUERY_INVESTOR,
  QUERY_PID,
  ACTIVISM_OVERVIEW,
  INVESTOR_ACTIVISM_OVERVIEW
} from '../../../constants/PathsConstant';
import { LOADING, NORECORDS } from '../../../constants/MessageConstans';
import '../../../styles/components/_popupTrialUser.scss';
import bn from '../../../utils/bemnames';
import {
  gridWidthValues,
  gridWidthValuesLrg,
  gridWidthValuesSml,
  gridWidthValuesXLrg,
  gridWidthValuesVLrg
} from '../../../utils/table-tools-util';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('investorProfile');

const AdvisersActivismOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const url =
    props.getCompanyWebsiteLink !== undefined
      ? `https://${props.getCompanyWebsiteLink.website}`
      : '';
  if (!query.company_id || query.company_id === undefined || query.company_id === 'undefined') {
    return <Redirect to={ADVISOR_SEARCH} />;
  }

  const gridOptionPersonnel = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Title',
        field: 'title',
        type: ['setColumn'],
        ...gridWidthValuesSml
      },
      {
        headerName: 'Name',
        field: 'name',
        ...gridWidthValuesVLrg,
        type: ['numberColumn'],
        cellRendererFramework: (params) => (
          <span>{`${params.data.firstname}  ${params.data.surname}`}</span>
        )
      },
      {
        headerName: 'Position',
        field: 'job_title',
        type: ['setColumn'],
        ...gridWidthValuesLrg
      },
      {
        headerName: 'Email',
        field: 'email',
        type: ['setColumn'],
        cellRendererFramework: (params) => (
          <div>
            <a className='text-secondary' href={`mailto:${params.data.email}`}>
              {params.data.email}
            </a>
          </div>
        )
      },
      {
        headerName: 'Location',
        field: 'country_name',
        ...gridWidthValuesLrg,
        type: ['setColumn']
      },
      {
        headerName: 'LinkedIn',
        field: 'LinkedIn_profile',
        type: ['setColumn'],
        ...gridWidthValues,
        cellRendererFramework: (params) => (
          <div>
            <a href={params.data.LinkedIn_profile}>
              <img
                src={LINKEDIN_LARGE_IMG}
                className='linkedInImg'
                alt='linkedInImg'
              />
            </a>
          </div>
        )
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    pivotMode: false,
    rowData: props.lstAdvisorActivismPersonnel.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false
    })),
    quickSearchFilter: false,
    domLayout:
      props.TrialStatus || props.isShowLimitedData ? 'autoHeight' : 'normal',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: true, pageSize: 6 },
    gridHeight: '40vh'
  };

  const gridOptionCampaigns = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Investor',
        field: 'activist_name',
        type: ['setColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        ...gridWidthValuesXLrg,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
            href="${INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${params.data.investor_id}">
            ${params.data.activist_name}
          </a>`;
          return eDiv;
        },
        cellRendererFramework1: (params) => (
          <div>
            <a
              className='text-secondary'
              href={
                INVESTOR_ACTIVISM_OVERVIEW +
                QUERY_INVESTOR +
                params.data.investor_id
              }
            >
              {params.data.activist_name}
            </a>
          </div>
        )
      },
      {
        headerName: 'Company',
        field: 'company_name',
        ...gridWidthValuesXLrg,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['numberColumn', 'autoHeightTrue'],
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML += `<a class="text-secondary" rel="noopener noreferrer" 
            href="${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.PID}">
            ${params.data.company_name}
          </a>`;
          return eDiv;
        },
        cellRendererFramework1: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${ACTIVISM_OVERVIEW}${QUERY_PID}${params.data.PID}`}
            >
              {params.data.company_name}
            </Link>
          </div>
        )
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        ...gridWidthValuesLrg,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1'
          : 'ws-normal-lh24 ps-1 pe-1',
        type: ['numberColumn', 'autoHeightTrue']
      },
      {
        headerName: 'Acting For',
        field: 'acting_for',
        type: ['setColumn', 'autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        ...gridWidthValuesLrg
      },
      {
        headerName: 'Date Investment Notified',
        field: 'date_first_invested',
        minWidth: 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['dateColumn', 'autoHeightTrue']
      },
      {
        headerName: 'Date Investment Exited',
        field: 'exit_date',
        minWidth: 120,
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        type: ['dateColumn', 'autoHeightTrue']
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    pivotMode: false,
    rowData: props.lstAdvisorActivismCampaigns.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false,
      date_first_invested:
        x.date_first_invested !== undefined
          ? dateToNull(x.date_first_invested, 'dd-mmm-yy', true)
          : '',
      exit_date:
        x.exit_date !== undefined
          ? dateToNull(x.exit_date, 'dd-mmm-yy', true)
          : ''
    })),
    quickSearchFilter: false,
    domLayout:
      props.TrialStatus || props.isShowLimitedData ? 'autoHeight' : 'normal',
    animateRows: true,
    suppressAggFuncInHeader: true,
    paggination: { isPagging: true, pageSize: 6 },
    gridHeight: '40vh'
  };

  React.useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoading]);

  return (
    <Page {...props} key={1} className='pt-3'>
      {props.isLoading ? (
        LOADING
      ) : (
          <div className='row' id='loadItem'>
            <div className='d-flex col-lg-5 col-md-8 col-sm-12 my-2'>
              <Card title='About'>
                <div
                  className={
                    props.TrialStatus ? 'row card1 blurrytext' : 'row card1'
                  }
                >
                  <span className='col-6 customSubHeadersInCards'>
                    Company:
                  </span>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={url}
                    className='col-6 text-secondary'
                  >
                    {props.getCompanyWebsiteLink !== undefined
                      ? props.getCompanyWebsiteLink.website
                      : ''}
                  </a>
                </div>
              </Card>
            </div>

            <div className='d-flex col-lg-12 my-2'>
              {props.lstAdvisorActivismPersonnel.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Contacts'>
                  <Table
                    IsShowCard
                    title='Contacts'
                    smalltitle=''
                    hideExcelDownloadIcon
                    enableCharts
                    gridOptions={gridOptionPersonnel}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Contacts'>{NORECORDS}</Card>
              )}
            </div>

            <div className='d-flex col-lg-12 my-2'>
              {props.lstAdvisorActivismCampaigns.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Activist Campaigns Worked On'>
                  <Table
                    IsShowCard
                    title='Activist Campaigns Worked On'
                    smalltitle=''
                    hideExcelDownloadIcon
                    enableCharts
                    gridOptions={gridOptionCampaigns}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Activist Campaigns Worked On'>{NORECORDS}</Card>
              )}
            </div>
          </div>
      )}
    </Page>
  );
};

AdvisersActivismOverview.propTypes = {
  location: PropTypes.object
};

AdvisersActivismOverview.defaultProps = {
  location: {}
};

export default withRouter(AdvisersActivismOverview);
