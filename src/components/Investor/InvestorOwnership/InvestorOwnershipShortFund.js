import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import pathConst, { COMPANY_OVERVIEW, QUERY_PID } from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import Table from '../../GeneralForm/Table';
import { filters, NumberFormatFn } from '../../../utils/AgGridFunctions';
import PopupTrialUser from '../../GeneralForm/PopupTrialLightboxEffect';
import messageConst from '../../../constants/MessageConstans';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { history } from '../../../utils/navigation-util';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorOwnershipShortFund = (props) => {
  const bem = bn.create('ownershipCompany');
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [showAllOrTop20, setShowAllOrTop20] = useState(false);
  const [showFundOwnership, setShowFundOwnership] = useState(false);
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const gridOptionsOwnershipShortInvestorData = {
    colDefsMedalsIncluded: [
      {
        headerName: props.ownershipShortFund_Heading.company_name,
        field: 'company_name',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        minWidth: width > breakpoint ? 350 : 150,
        maxWidth: 500,
        cellRendererFramework: (params) => (
          <div>
            {params.data.pid !== '' ? (
              <a
                title={params.data.company_name}
                rel='noopener noreferrer'
                className='text-secondary'
                href={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}
                target='_blank'
              >
                {params.data.company_name}
              </a>
            ) : (
              <span title={params.data.company_name}>{params.data.company_name}</span>
            )}
          </div>
        )
      },
      {
        headerName: props.ownershipShortFund_Heading.balance,
        field: 'balance',
        minWidth: 200,
        maxWidth: 200,
        type: ['numberColumn']
      },
      {
        headerName: props.ownershipShortFund_Heading.valUSD,
        field: 'valUSD',
        minWidth: 200,
        maxWidth: 200,
        type: ['numberColumn']
      },
      {
        headerName: props.ownershipShortFund_Heading.ReppdDate,
        field: 'ReppdDate',
        minWidth: 120,
        maxWidth: 120,
        type: ['dateColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30'
      },
      {
        headerName: props.ownershipShortFund_Heading.seriesName,
        field: 'seriesName',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        minWidth: 350,
        maxWidth: 500
      },
      {
        headerName: props.ownershipShortFund_Heading.regName,
        field: 'regName',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        minWidth: 350
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'company_name',
          pinned: 'left'
        }
      ]
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: true,
    rowData: props.ownershipShortFund_Data.map((x) => ({
      ...x,
      balance: x.balance ? NumberFormatFn(x.balance) : '',
      valUSD: x.valUSD ? NumberFormatFn(x.valUSD) : '',
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
    })),
    alignedGrids: ['company_name', 'balance', 'valUSD', 'ReppdDate', 'seriesName', 'regName'],
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh'
  };

  const gridOptionsFooter = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'company_name',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        minWidth: width > breakpoint ? 350 : 150,
        maxWidth: 500,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.company_name}</strong>
          </div>
        )
      },

      {
        headerName: '',
        field: 'balance',
        minWidth: 200,
        maxWidth: 200,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.balance}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'valUSD',
        minWidth: 200,
        maxWidth: 200,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.valUSD}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'ReppdDate',
        minWidth: 120,
        maxWidth: 120,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.ReppdDate}</strong>
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
            <strong>{params.data.seriesName}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'regName',
        minWidth: 350,
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh30' : 'ws-normal-lh30',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.regName}</strong>
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    alignedGrids: ['company_name', 'balance', 'valUSD', 'ReppdDate', 'seriesName', 'regName'],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'company_name',
          pinned: 'left'
        }
      ]
    },
    gridHeight: 60,
    headerHeight: 0,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowClass: 'bold-row',
    rowData: props.ownershipShortFund_Footer.map((x) => ({
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
    <Page {...props} key={1} className='pt-3'>
      <div className={bem.b('')}>
        <div className='row'>
          <div className='col-md-3 col-12 pt-0 mb-0' />
          <div className='col-md-4 col-12 pt-0 mb-0' />
          <div className='col-md-1 col-12 pt-0 mb-0' />
          <div className='col-md-2 col-12'>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={async (e) => {
                e.preventDefault();
                setShowAllOrTop20(!showAllOrTop20);
                props.handleIsLoadingOwnership();
                const status = showAllOrTop20;
                await props.getOwnershipShortFundDataReq({
                  investor_id: query.investor,
                  filterRecords: status
                });
              }}
            >
              {!showAllOrTop20 ? 'Show All Company Data' : 'Show Top 20 Companies'}
            </button>
          </div>
          <div className='col-md-2 col-12'>
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
                    pathname: pathConst.OWNERSHIP_INVESTOR_SHORT_INVESTOR,
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
                  {props.ownershipShortFund_Data.length > 0 ? (
                    <>
                      <ErrorBoundary hasCard cardtitle='Ownership Short Fund'>
                        <Table
                          gridOptionsFooter={gridOptionsFooter}
                          pageTitle='Ownership Short Fund'
                          title={
                            !showAllOrTop20
                              ? props.ownershipShortFund_Heading.top_20_company_name_by_fund
                              : props.ownershipShortFund_Heading.all_company_name_by_fund
                          }
                          smalltitle=''
                          gridOptions={gridOptionsOwnershipShortInvestorData}
                        />
                      </ErrorBoundary>
                    </>
                  ) : (
                    messageConst.NORECORDS
                  )}
                </div>
                <div className='row'>
                  <div>{props.TrialStatus ? <PopupTrialUser TrialLightboxSection='Ownership Short Fund' /> : null}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

InvestorOwnershipShortFund.propTypes = {
  location: PropTypes.object.isRequired,
  getOwnershipShortFundDataReq: PropTypes.func.isRequired,
  ownershipShortFund_Data: PropTypes.array.isRequired,
  ownershipShortFund_Footer: PropTypes.array.isRequired,
  ownershipShortFund_Heading: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  procedureRunningEstimateTime: PropTypes.any,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  handleIsLoadingOwnership: PropTypes.func.isRequired,
  ownershipShortFund_statusTop5: PropTypes.bool.isRequired
};

InvestorOwnershipShortFund.defaultProps = {
  procedureRunningEstimateTime: undefined
};
export default withRouter(InvestorOwnershipShortFund);
