import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import pathConst, { INVESTOR_OVERVIEW, QUERY_INVESTOR } from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import Table from '../../GeneralForm/Table';
import { filters, NumberFormatFn } from '../../../utils/AgGridFunctions';
import messageConst from '../../../constants/MessageConstans';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { history } from '../../../utils/navigation-util';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = React.lazy(() => import('../../GeneralForm/Card'));
const OwnershipLongFund = (props) => {
  const bem = bn.create('ownershipCompany');
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [showAllOrTop20, setShowAllOrTop20] = useState(false);
  const [showFundOwnership, setShowFundOwnership] = useState(false);
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  if (!query.pid) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const gridOptionsOwnershipLongFundData = {
    colDefsMedalsIncluded: [
      {
        headerName: props.ownershipLongFund_Heading.regName,
        field: 'regName',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        minWidth: width > breakpoint ? 350 : 150,
        maxWidth: 500
      },
      {
        headerName: props.ownershipLongFund_Heading.seriesName,
        field: 'seriesName',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        minWidth: 350,
        maxWidth: 500
      },
      {
        headerName: props.ownershipLongFund_Heading.balance,
        field: 'balance',
        minWidth: 150,
        maxWidth: 150,
        type: ['numberColumn']
      },
      {
        headerName: props.ownershipLongFund_Heading.valUSD,
        field: 'valUSD',
        minWidth: 150,
        maxWidth: 150,
        type: ['numberColumn']
      },
      {
        headerName: props.ownershipLongFund_Heading.ReppdDate,
        field: 'ReppdDate',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn']
      },
      {
        headerName: props.ownershipLongFund_Heading.voting_managers,
        field: 'voting_managers',
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        type: ['autoHeightTrue', 'setColumn'],
        minWidth: 350,
        maxWidth: 500,
        cellRendererFramework: (params) => (
          <div>
            {params.data.voting_investor_ids !== '' ? (
              <a
                title={params.data.voting_managers}
                rel='noopener noreferrer'
                className='text-secondary'
                href={`${INVESTOR_OVERVIEW}${QUERY_INVESTOR}${params.data.voting_investor_ids}`}
              >
                {params.data.voting_managers}
              </a>
            ) : (
              <span title={params.data.voting_managers}>{params.data.voting_managers}</span>
            )}
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'regName',
          pinned: 'left'
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: true,
    rowData: props.ownershipLongFund_Data.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      balance: x.balance ? NumberFormatFn(x.balance) : '',
      valUSD: x.valUSD ? NumberFormatFn(x.valUSD) : '',
      allowDownload: props.allowDownload
    })),
    alignedGrids: ['regName', 'seriesName', 'balance', 'valUSD', 'ReppdDate', 'voting_managers'],
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh'
  };

  const gridOptionsFooter = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'regName',
        minWidth: width > breakpoint ? 350 : 150,
        maxWidth: 500,
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.regName}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'seriesName',
        minWidth: 350,
        maxWidth: 500,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.type}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'balance',
        minWidth: 150,
        maxWidth: 150,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.balance}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'valUSD',
        minWidth: 150,
        maxWidth: 150,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.valUSD}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'ReppdDate',
        minWidth: 100,
        maxWidth: 100,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.ReppdDate}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'voting_managers',
        minWidth: 350,
        maxWidth: 500,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_managers}</strong>
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    alignedGrids: ['regName', 'seriesName', 'balance', 'valUSD', 'ReppdDate', 'voting_managers'],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'regName',
          pinned: 'left'
        }
      ]
    },
    gridHeight: 60,
    headerHeight: 0,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowClass: 'bold-row',
    rowData: props.ownershipLongFund_Footer.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
    }))
  };

  React.useEffect(() => {
    if (!props.loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.loadingData]);

  return (
    <Page {...props} key={1} className={bem.b('pt-3')}>
      <div>
        <div className='row'>
          <div className='col-md-3 col-12 pt-0 mb-0' />
          <div className='col-md-4 col-12 pt-0 mb-0' />
          <div className='col-md-1 col-12 pt-0 mb-0' />
          <div className='col-md-2 col-12 pt-3'>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={async (e) => {
                e.preventDefault();
                setShowAllOrTop20(!showAllOrTop20);
                props.handleIsLoadingOwnership();
                const status = showAllOrTop20;
                await props.getOwnershipLongFundDataReq({
                  pid: query.pid,
                  filterRecords: status
                });
              }}
            >
              {!showAllOrTop20 ? 'Show All Fund Data' : 'Show Top 20 Funds'}
            </button>
          </div>
          <div className='col-md-2 col-12 pt-3'>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={(e) => {
                e.preventDefault();
                setShowFundOwnership(!showFundOwnership);
                props.handleIsLoadingOwnership();
                let objPath = {};
                if (!showFundOwnership) {
                  objPath = {
                    pathname: pathConst.OWNERSHIP_LONG_INVESTOR,
                    search: props.location.search,
                    state: {}
                  };
                  history.replace(objPath);
                }
              }}
            >
              Show Investor Ownership
            </button>
          </div>
        </div>
        <div className='row '>
          <div className='col-md-12 col-sm-12'>
            {props.loadingData ? (
              <div className='vh-100'>
                <div className='h-50'>
                  {props.procedureRunningEstimateTime !== undefined && (
                    <ProgressBar avgElapsedTime={props.procedureRunningEstimateTime} />
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div id='loadItem'>
                  {props.ownershipLongFund_Data.length > 0 ? (
                    <>
                      <Card
                        title={
                          !showAllOrTop20
                            ? props.ownershipLongFund_Heading.top_20_regName
                            : props.ownershipLongFund_Heading.all_regName
                        }
                      >
                        <p>Fund ownership in this table is sourced from NPORT documents filed on the SEC</p>
                        <ErrorBoundary cardtitle='Ownership Long Fund'>
                          <Table
                            gridOptionsFooter={gridOptionsFooter}
                            pageTitle='Ownership Long Fund'
                            IsShowCard={false}
                            title={
                              !showAllOrTop20
                                ? props.ownershipLongFund_Heading.top_20_regName
                                : props.ownershipLongFund_Heading.all_regName
                            }
                            smalltitle=''
                            gridOptions={gridOptionsOwnershipLongFundData}
                          />
                        </ErrorBoundary>
                      </Card>
                    </>
                  ) : (
                    messageConst.NORECORDS
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

OwnershipLongFund.propTypes = {
  location: PropTypes.object.isRequired,
  getOwnershipLongFundDataReq: PropTypes.func.isRequired,
  ownershipLongFund_Data: PropTypes.array.isRequired,
  ownershipLongFund_Footer: PropTypes.array.isRequired,
  ownershipLongFund_Heading: PropTypes.object.isRequired,
  ownershipLongFund_statusTop5: PropTypes.bool.isRequired,
  loadingData: PropTypes.bool.isRequired,
  procedureRunningEstimateTime: PropTypes.any,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  handleIsLoadingOwnership: PropTypes.func.isRequired
};

OwnershipLongFund.defaultProps = {
  procedureRunningEstimateTime: undefined
};
export default withRouter(OwnershipLongFund);
