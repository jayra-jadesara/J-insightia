import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import bn from '../../../utils/bemnames';
import {
  ADVISOR_SEARCH,
  LINKEDIN_LARGE_IMG,
  ACTIVISTSHORTS_OVERVIEW,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW,
  QUERY_PID,
  QUERY_INVESTOR
} from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import '../../../styles/components/_popupTrialUser.scss';
import {
  gridWidthValues,
  gridWidthValuesLrg,
  gridWidthValuesSml,
  gridWidthValuesXLrg,
  gridWidthValuesVLrg,
  gridWidthDates
} from '../../../utils/table-tools-util';
import Table from '../../GeneralForm/Table';
import { dateToNull } from '../../../utils/general-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = lazy(() => import('../../GeneralForm/Card'));
const bem = bn.create('investorProfile');

const AdvisersActivistShortOverview = (props) => {
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
            <a className='text-secondary' href={params.data.LinkedIn_profile}>
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
        type: ['setColumn'],
        ...gridWidthValuesXLrg,
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={
                INVESTOR_ACTIVIST_SHORT_OVERVIEW +
                QUERY_INVESTOR +
                params.data.investor_id
              }
            >
              {params.data.activist_name}
            </Link>
          </div>
        )
      },
      {
        headerName: 'Company',
        field: 'company_name',
        ...gridWidthValuesXLrg,
        type: ['numberColumn'],
        cellRendererFramework: (params) => (
          <div>
            <Link
              className='text-secondary'
              to={`${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${params.data.PID}`}
            >
              {params.data.company_name}
            </Link>
          </div>
        )
      },
      {
        headerName: 'Acting For',
        field: 'acting_for',
        type: ['setColumn'],
        ...gridWidthDates
      },
      {
        headerName: 'Date Investment Notified',
        field: 'action_date',
        minWidth: 200,
        type: ['setColumn'],
        cellRendererFramework: (params) => (
          <div>{dateToNull(params.data.action_date, 'dd-mmm-yy', true)}</div>
        )
      },
      {
        headerName: 'Date Investment Exited',
        field: 'campaign_end_date',
        minWidth: 150,
        type: ['setColumn'],
        cellRendererFramework: (params) => (
          <div>
            {dateToNull(params.data.campaign_end_date, 'dd-mmm-yy', true)}
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    pivotMode: false,
    rowData: props.lstAdvisorActivistShortCampaigns.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: false
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
        <div className={bem.b('')}>
          <div className='row' id='loadItem'>
            <div className='d-flex col-lg-5 col-md-8 col-sm-12 my-2 '>
              <Card title='About'>
                <div
                  className={`row card1 ${
                    props.TrialStatus ? 'blurrytext' : ''
                  }`}
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

            <div className='d-flex col-lg-12 my-2 '>
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

            <div className='d-flex col-lg-12 my-2 '>
              {props.lstAdvisorActivistShortCampaigns.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Activist Short Campaigns Worked On'>
                  <Table
                    IsShowCard
                    title='Activist Short Campaigns Worked On'
                    smalltitle=''
                    hideExcelDownloadIcon
                    enableCharts
                    gridOptions={gridOptionCampaigns}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Activist Short Campaigns Worked On'>
                  {NORECORDS}
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

AdvisersActivistShortOverview.propTypes = {
  location: PropTypes.object
};

AdvisersActivistShortOverview.defaultProps = {
  location: {}
};

export default withRouter(AdvisersActivistShortOverview);
