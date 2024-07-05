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

const InvestorOwnershipShortInvestor = (props) => {
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
        headerName: props.ownershipShortInvestor_Heading.company_name,
        field: 'company_name',
        type: ['autoHeightTrue', 'setColumn'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh24' : 'ws-normal-lh24',
        minWidth: query.print ? 733 : width > breakpoint ? 350 : 150,
        maxWidth: query.print ? 733 : 1000,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          if (params.data.pid !== '') {
            eDiv.innerHTML = `<a class='text-secondary' title=${params.data.company_name} href='${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}'>
            ${params.data.company_name}</a>`;
          } else {
            eDiv.innerHTML = `<span title=${params.data.company_name}>${params.data.company_name}</span>`;
          }
          return eDiv;
        }
      },
      {
        headerName: props.ownershipShortInvestor_Heading.balance,
        field: 'balance',
        type: ['numberColumn'],
        minWidth: 100,
        maxWidth: query.print ? 100 : 400,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
      },
      {
        headerName: props.ownershipShortInvestor_Heading.valUSD,
        field: 'valUSD',
        type: ['numberColumn'],
        minWidth: 100,
        maxWidth: query.print ? 100 : 400,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
      },
      {
        headerName: props.ownershipShortInvestor_Heading.ReppdDate,
        field: 'ReppdDate',
        minWidth: 100,
        maxWidth: query.print ? 100 : 400,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1  text-center'
          : 'ws-normal-lh24 ps-1 pe-1  text-center',
        type: ['dateColumn']
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
    isfloatingFilter: !query.print,
    rowData: props.ownershipShortInvestor_Data.map((x) => ({
      ...x,
      balance: x.balance ? NumberFormatFn(x.balance) : '',
      valUSD: x.valUSD ? NumberFormatFn(x.valUSD) : '',
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload
    })),
    headerHeight: 60,
    alignedGrids: ['company_name', 'balance', 'valUSD', 'ReppdDate'],
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh'
  };

  const gridOptionsFooter = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'company_name',
        minWidth: query.print ? 733 : width > breakpoint ? 350 : 150,
        maxWidth: query.print ? 733 : 1000,
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh24' : 'ws-normal-lh24',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.company_name}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'balance',
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-smaller'
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-smaller',
        minWidth: 100,
        maxWidth: query.print ? 100 : 400,
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.balance}</strong>
          </div>
        )
      },
      {
        headerName: '',
        field: 'valUSD',
        type: ['autoHeightTrue'],
        minWidth: 100,
        maxWidth: query.print ? 100 : 400,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-smaller'
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-smaller',
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
        maxWidth: query.print ? 100 : 400,
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 text-center'
          : 'ws-normal-lh24 ps-0 pe-0 text-center',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.ReppdDate}</strong>
          </div>
        )
      }
    ],
    colDefsMedalsExcluded: [],
    alignedGrids: ['company_name', 'balance', 'valUSD', 'ReppdDate'],
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
    gridHeight: 48,
    headerHeight: 0,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowClass: 'bold-row',
    rowData: props.ownershipShortInvestor_Footer.map((x) => ({
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
    <Page key={1} className='pt-3'>
      <div className={bem.b('')}>
        <div className='row'>
          <div className='col-md-3 col-12 pt-0 mb-0' />
          <div className='col-md-4 col-12 pt-0 mb-0' />
          <div className='col-md-1 col-12 pt-0 mb-0' />
          <div className='col-md-2 col-12 mb-2'>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={async (e) => {
                e.preventDefault();
                setShowAllOrTop20(!showAllOrTop20);
                props.handleIsLoadingOwnership();
                const status = showAllOrTop20;
                await props.getOwnershipShortInvestorDataReq({
                  investor_id: query.investor,
                  filterRecords: status
                });
              }}
            >
              {!showAllOrTop20 ? 'Show All Company Data' : 'Show Top 20 Companies'}
            </button>
          </div>
          <div className='col-md-2 col-12 mb-2'>
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
                    pathname: pathConst.OWNERSHIP_INVESTOR_SHORT_FUND,
                    search: props.location.search,
                    state: {}
                  };
                  history.replace(objPath);
                }
              }}
              disabled={props.invShortFund !== null && props.invShortFund === 0}
            >
              Show Fund Ownership
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 col-sm-12 mb-2'>
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
                  {props.ownershipShortInvestor_Data.length > 0 ? (
                    <>
                      <ErrorBoundary hasCard cardtitle='Ownership Short Investor'>
                        <Table
                          gridOptionsFooter={gridOptionsFooter}
                          pageTitle='Ownership Short Investor'
                          title={
                            !showAllOrTop20
                              ? props.ownershipShortInvestor_Heading.top_20_company_name
                              : props.ownershipShortInvestor_Heading.all_company_name
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
                {props.TrialStatus && <PopupTrialUser TrialLightboxSection='Ownership' />}
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

InvestorOwnershipShortInvestor.propTypes = {
  location: PropTypes.object.isRequired,
  getOwnershipShortInvestorDataReq: PropTypes.func.isRequired,
  ownershipShortInvestor_Data: PropTypes.array.isRequired,
  ownershipShortInvestor_Footer: PropTypes.array.isRequired,
  ownershipShortInvestor_Heading: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  procedureRunningEstimateTime: PropTypes.any,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  handleIsLoadingOwnership: PropTypes.func.isRequired,
  ownershipShortInvestor_statusTop5: PropTypes.bool.isRequired
};

InvestorOwnershipShortInvestor.defaultProps = {
  procedureRunningEstimateTime: undefined
};
export default withRouter(InvestorOwnershipShortInvestor);
