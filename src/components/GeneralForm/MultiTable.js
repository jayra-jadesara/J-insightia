import PropTypes from 'prop-types';
import React from 'react';
import Table from './Table';
import GraphBarChart from './GraphBarChart';
import bn from '../../utils/bemnames';
import { history } from '../../utils/navigation-util';
import {
  LATEST_ACTIVIST_STAKES,
  LATEST_ACTIVIST_DEEMANDS,
  TIMELINES,
  LETEST_ACTIVISM_STATISTICS
} from '../../constants/MultiTableTabConstant';
import { dateToNull } from '../../utils/general-util';
import {
  ACTIVISM,
  COMPANY_OVERVIEW,
  FLAG_IMAGE_PATH,
  N0_CHANGE_IMG,
  NEW_POSITION_IMG,
  QUERY_AND_ACTIVIST,
  QUERY_COMPANY
} from '../../constants/PathsConstant';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('multitable');

const MultiTable = (props) => {
  const recordset_LatestActivistStackes = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'filing_date',
        cellRendererFramework: (params) => <div>{dateToNull(params.data.filing_date, 'dd-mmm-yy', true)}</div>
      },
      {
        headerName: 'Activist',
        field: 'activist_name',
        cellRendererFramework: (params) => (
          <div>
            <img src={`${FLAG_IMAGE_PATH}${params.data.act_image_link}`} style={{ height: '22px' }} alt='flag' />
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(
                  `${ACTIVISM}${QUERY_COMPANY}${params.data.company_id}${QUERY_AND_ACTIVIST}${params.data.activist_id}`
                );
              }}
            >
              {params.data.activist_name}
            </button>
          </div>
        )
      },
      {
        headerName: 'Company',
        field: 'company_name',
        cellRendererFramework: (params) => (
          <div>
            <img src={`${FLAG_IMAGE_PATH}${params.data.image_link}`} style={{ height: '22px' }} alt='flag' />
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(`${COMPANY_OVERVIEW}${QUERY_COMPANY}${params.data.company_id}`);
              }}
            >
              {params.data.company_name}
            </button>
          </div>
        )
      },
      {
        headerName: '%',
        field: 'pcent_held',
        cellStyle: { textAlign: 'right' },
        suppressSizeToFit: true,
        cellRendererFramework: (params) => (
          <div>
            <span>{params.data.pcent_held}% &nbsp;</span>
            {(() => {
              if (params.data.transaction_type === 'Buy' || params.data.transaction_type === 'SC 13D') {
                return <img src={`${FLAG_IMAGE_PATH}`} alt='signature' />;
              }
              if (params.data.transaction_type === 'Sold') return <img src={`${FLAG_IMAGE_PATH}`} alt='signature' />;
              if (params.data.transaction_type === 'New') return <img src={`${NEW_POSITION_IMG}`} alt='signature' />;
              if (params.data.seq_id !== null && params.data.Previous13D < params.data.pcent_held) {
                return <img src={`${FLAG_IMAGE_PATH}`} alt='signature' />;
              }
              if (params.data.seq_id !== null && params.data.Previous13D > params.data.pcent_held) {
                return <img src={`${FLAG_IMAGE_PATH}`} alt='signature' />;
              }
              return <img src={`${N0_CHANGE_IMG}`} alt='signature' />;
            })()}
          </div>
        )
      },
      {
        headerName: 'Details',
        field: 'company_id',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(
                  `${ACTIVISM}${QUERY_COMPANY}${params.data.company_id}${QUERY_AND_ACTIVIST}${params.data.activist_id}`
                );
              }}
            >
              Details
            </button>
          </div>
        ),
        sortable: false,
        suppressMovable: true,
        filter: false
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left'
        },
        {
          colId: 'company_id',
          pinned: 'right'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: props.listTopTwentyActivistActivity.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
    }))
  };

  const recordset_ActivistDemands = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'Date',
        cellRendererFramework: (params) => <div>{dateToNull(params.data.Date, 'dd-mmm-yy', true)}</div>
      },
      {
        headerName: 'Activist',
        field: 'Activist',
        cellRendererFramework: (params) => (
          <div>
            <img
              src={`${FLAG_IMAGE_PATH}${params.data['Activist Country']}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(
                  `${ACTIVISM}${QUERY_COMPANY}${params.data.company_id}${QUERY_AND_ACTIVIST}${params.data.activist_id}`
                );
              }}
            >
              {params.data.Activist}
            </button>
          </div>
        )
      },
      {
        headerName: 'Company',
        field: 'Company',
        cellRendererFramework: (params) => (
          <div>
            <img
              src={`${FLAG_IMAGE_PATH}${params.data['Company Country']}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />

            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(`${COMPANY_OVERVIEW}${QUERY_COMPANY}${params.data.company_id}`);
              }}
            >
              {params.data.Company}
            </button>
          </div>
        )
      },
      { headerName: 'Demand', field: 'Demand' },
      {
        headerName: 'Details',
        field: 'company_id',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(
                  `${ACTIVISM}${QUERY_COMPANY}${params.data.company_id}${QUERY_AND_ACTIVIST}${params.data.activist_id}`
                );
              }}
            >
              Details
            </button>
          </div>
        ),
        sortable: false,
        suppressMovable: true,
        filter: false
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left'
        },
        {
          colId: 'company_id',
          pinned: 'right'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: props.listActivistDemands.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
    }))
  };

  const recordset_Timelines = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'summary_date',
        cellRendererFramework: (params) => <div>{dateToNull(params.data.summary_date, 'dd-mmm-yy', true)}</div>
      },
      {
        headerName: 'Activist',
        field: 'actName',
        cellRendererFramework: (params) => (
          <div>
            <img
              src={`${FLAG_IMAGE_PATH}${params.data['Activist Country']}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(
                  `${ACTIVISM}${QUERY_COMPANY}${params.data.company_id}${QUERY_AND_ACTIVIST}${params.data.activist_id}`
                );
              }}
            >
              {params.data.actName}
            </button>
          </div>
        )
      },
      {
        headerName: 'Company',
        field: 'compName',
        cellRendererFramework: (params) => (
          <div>
            <img
              src={`${FLAG_IMAGE_PATH}${params.data['Company Country']}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />

            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(`${COMPANY_OVERVIEW}${QUERY_COMPANY}${params.data.company_id}`);
              }}
            >
              {params.data.compName}
            </button>
          </div>
        )
      },
      {
        headerName: 'Timeline',
        field: 'summary_text'
      },
      {
        headerName: 'Details',
        field: 'company_id',
        cellRendererFramework: (params) => (
          <div>
            <button
              type='button'
              className='btn btn-link btn-sm'
              onClick={() => {
                history.push(
                  `${ACTIVISM}${QUERY_COMPANY}${params.data.company_id}${QUERY_AND_ACTIVIST}${params.data.activist_id}`
                );
              }}
            >
              Details
            </button>
          </div>
        ),
        sortable: false,
        suppressMovable: true,
        filter: false
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'make',
          pinned: 'left'
        },
        {
          colId: 'id',
          pinned: 'right'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    rowData: props.timeLinesRecordSet.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
    }))
  };

  const navItems = [
    {
      name: LATEST_ACTIVIST_STAKES,
      isActive: props.activeListTopTwentyActivistActivity,
      component: [{ type: 'table', data: recordset_LatestActivistStackes }]
    },
    {
      name: LATEST_ACTIVIST_DEEMANDS,
      isActive: props.activeLetestActivistDemand,
      component: [{ type: 'table', data: recordset_ActivistDemands }]
    },
    { name: TIMELINES, isActive: props.activeTimelines, component: [{ type: 'table', data: recordset_Timelines }] },
    {
      name: LETEST_ACTIVISM_STATISTICS,
      isActive: props.activeLetestActivisamStatestics,
      component: [
        { type: 'barGraph', data: props.activeActivistTradeOverview },
        { type: 'barGraph', data: props.companiesTargetTradeOverview }
      ]
    }
  ];

  return (
    <ErrorBoundary>
    <div className={bem.b('p-4')}>
      <nav>
        <div className='nav nav-tabs' id='nav-tab' role='tablist'>
          {navItems.map(({ name, isActive }, index) => (
            <span
              key={`tablist${index + 1}`}
              className={isActive ? 'nav-link active' : 'nav-link'}
              id={`navItem-${name}-${index}`}
              onClick={() => props.handleActiveTab(name)}
            >
              {name}
            </span>
          ))}
        </div>
      </nav>
      <div className='tab-content' id='nav-tabContent'>
        {navItems.map(({ isActive, component }, index) => (
          <div key={`tab_${index + 1}`} className={isActive ? 'tab-pane fade show active' : 'tab-pane fade'}>
            <div className='card-body row'>
              {component.map(({ type, data }, index) => (
                <div
                  key={`dv${index + 1}`}
                  className={type === 'barGraph' ? 'col-lg-6 col-md-6 col-sm-12 d-block justify-content-center' : ''}
                >
                  {type === 'table' ? (
                    <Table key={`tbl${index + 1}`} title='Table' smalltitle='Example' gridOptions={data} />
                  ) : (
                    ''
                  )}
                  {type === 'barGraph' ? (
                    <div className=''>
                      <div className='chart m-2 d-inline'>
                        {' '}
                        <GraphBarChart
                          cardsmalltitle='Number of companies publicly subjected to activist demands (Global)'
                          data={data}
                          yKeyVal='Target'
                          xKeyVal='year_action'
                        />{' '}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </ErrorBoundary>
  );
};

MultiTable.propTypes = {
  TrialStatus: PropTypes.bool,
  activeActivistTradeOverview: PropTypes.any.isRequired,
  activeLetestActivisamStatestics: PropTypes.any.isRequired,
  activeLetestActivistDemand: PropTypes.any.isRequired,
  activeListTopTwentyActivistActivity: PropTypes.any.isRequired,
  activeTimelines: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool,
  companiesTargetTradeOverview: PropTypes.any.isRequired,
  handleActiveTab: PropTypes.func,
  listActivistDemands: PropTypes.array,
  listTopTwentyActivistActivity: PropTypes.array,
  timeLinesRecordSet: PropTypes.array
};

MultiTable.defaultProps = {
  TrialStatus: false,
  allowDownload: false,
  handleActiveTab: () => {},
  listActivistDemands: [],
  listTopTwentyActivistActivity: [],
  timeLinesRecordSet: []
};

export default React.memo(MultiTable);
