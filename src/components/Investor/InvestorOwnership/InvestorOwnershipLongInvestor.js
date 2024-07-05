import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import pathConst, { COMPANY_OVERVIEW, QUERY_PID } from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import DropdownList from '../../GeneralForm/DropdownList';
import Table from '../../GeneralForm/Table';
import { filters, NumberFormatFn, NumberFormatRevertFn } from '../../../utils/AgGridFunctions';
import PopupTrialUser from '../../GeneralForm/PopupTrialLightboxEffect';
import messageConst from '../../../constants/MessageConstans';
import ProgressBar from '../../GeneralForm/ProgressBar';
import { history } from '../../../utils/navigation-util';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import { setCellStyleFinancial } from '../../../utils/table-tools-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorOwnershipLongInvestor = (props) => {
  const bem = bn.create('ownershipInvestor');
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [showAllOrTop20, setShowAllOrTop20] = useState(false);
  const [showFundOwnership, setShowFundOwnership] = useState(false);
  const { width } = useWindowDimensions();
  const breakpoint = 768;

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const gridOptionsOwnershipLongData = {
    colDefsMedalsIncluded: [
      // colspan =6
      {
        headerName: '',
        children: [
          {
            headerName: props.ownershipLongInvestor_Heading.company_name,
            field: 'company_name',
            type: ['autoHeightTrue', 'setColumn'],
            minWidth: query.print ? 200 : width > breakpoint ? 350 : 200,
            maxWidth: query.print ? 200 : 1000,
            cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh24' : 'ws-normal-lh24',
            cellRenderer: (params) => {
              const eDiv = document.createElement('div');
              if (params.data.pid !== '') {
                eDiv.innerHTML = `<a class='text-secondary' title=${params.data.investor} href='${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}'>
                ${params.data.company_name}</a>`;
              } else {
                eDiv.innerHTML = `<span title=${params.data.company_name}>${params.data.company_name}</span>`;
              }
              return eDiv;
            },
            cellRendererFramework1: (params) => (
              <div>
                {params.data.pid !== '' ? (
                  <a
                    title={params.data.company_name}
                    className='text-secondary'
                    rel='noopener noreferrer'
                    href={`${COMPANY_OVERVIEW}${QUERY_PID}${params.data.pid}`}
                    target='_blank'
                  >
                    {params.data.company_name}
                  </a>
                ) : (
                  <span title={params.data.company_name}>{params.data.company_name}</span>
                )}
              </div>
            ),
          },
          {
            headerName: props.ownershipLongInvestor_Heading.period_of_report,
            field: 'period_of_report',
            type: ['autoHeightTrue'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 130,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 text-center'
              : 'ws-normal-lh24 ps-1 pe-1 text-center',
          },
          {
            headerName: props.ownershipLongInvestor_Heading.shares_value,
            field: 'shares_value',
            type: ['numberColumn', 'rightAligned'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          },
          {
            headerName: props.ownershipLongInvestor_Heading.shares,
            field: 'shares',
            type: ['numberColumn', 'rightAligned'],
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
          },
          {
            headerName: props.ownershipLongInvestor_Heading.shares_pcent,
            field: 'shares_pcent',
            minWidth: 70,
            maxWidth: query.print ? 70 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
          },
        ],
      },
      // colspan =2
      {
        headerName: 'Change in Holding',
        children: [
          {
            headerName: props.ownershipLongInvestor_Heading.change_in_holdings_shares,
            field: 'change_in_holdings_shares',
            minWidth: 85,
            maxWidth: query.print ? 85 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            cellRendererFramework: (params) =>
              params.data.change_in_holdings_shares ? params.data.change_in_holdings_shares : '',
            cellClassRules: {
              greenFont: (params) => Number(NumberFormatRevertFn(params.data.change_in_holdings_shares)) > 0,
              redFont: (params) => Number(NumberFormatRevertFn(params.data.change_in_holdings_shares)) < 0,
            },
            cellStyle: (params) =>
              setCellStyleFinancial(Number(NumberFormatRevertFn(params.data.change_in_holdings_shares))),
          },
          {
            // headerName: props.ownershipLongInvestor_Heading.change_in_holdings_pcent,
            headerName: 'Percentage Point Change',
            field: 'change_in_holdings_pcent',
            minWidth: 85,
            maxWidth: query.print ? 85 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
            cellRendererFramework: (params) =>
              params.data.change_in_holdings_pcent ? params.data.change_in_holdings_pcent : '',
            cellClassRules: {
              greenFont: (params) => params.data.change_in_holdings_pcent > 0,
              redFont: (params) => params.data.change_in_holdings_pcent < 0,
            },
            cellStyle: (params) => setCellStyleFinancial(params.data.change_in_holdings_pcent),
          },
        ],
      },
      // colspan =2
      {
        headerName: 'Voting',
        children: [
          {
            headerName: props.ownershipLongInvestor_Heading.voting_sole,
            field: 'voting_sole',
            minWidth: 90,
            maxWidth: query.print ? 90 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
          },
          {
            headerName: props.ownershipLongInvestor_Heading.voting_shared,
            field: 'voting_shared',
            minWidth: 100,
            maxWidth: query.print ? 100 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
          },
          {
            headerName: props.ownershipLongInvestor_Heading.voting_none,
            field: 'voting_none',
            minWidth: 105,
            maxWidth: query.print ? 105 : 150,
            cellClass: props.TrialStatus
              ? 'ag-cell-blurrytext ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell'
              : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
            type: ['numberColumn', 'rightAligned'],
          },
        ],
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'company_name',
          pinned: 'left',
        },
      ],
    },
    columnTypes: filters,
    paggination: { isPagging: false, pageSize: null },
    isfloatingFilter: !query.print,
    rowData: props.ownershipLongInvestor_Data.map((x) => ({
      ...x,
      shares_value: x.shares_value ? NumberFormatFn(x.shares_value / 1000) : '',
      shares: x.shares ? NumberFormatFn(x.shares) : '',
      change_in_holdings_shares: x.change_in_holdings_shares ? NumberFormatFn(x.change_in_holdings_shares) : '',
      voting_sole: x.voting_sole ? NumberFormatFn(x.voting_sole) : '',
      voting_shared: x.voting_shared ? NumberFormatFn(x.voting_shared) : '',
      voting_none: x.voting_none ? NumberFormatFn(x.voting_none) : '',
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
    HeaderGrouping: {
      isgroupHeaderVertical: false,
      isHeaderChildren: true,
      groupHeaderHeight: null,
    },
    alignedGrids: [
      'company_name',
      'period_of_report',
      'shares_value',
      'shares',
      'shares_pcent',
      'change_in_holdings_shares',
      'change_in_holdings_pcent',
      'voting_sole',
      'voting_shared',
      'voting_none',
    ],
    // statusBar: bottomStatusBar,
    rowSelection: 'multiple',
    domLayout: 'normal',
    gridHeight: '80vh',
  };

  const gridOptionsFooter = {
    colDefsMedalsIncluded: [
      {
        headerName: '',
        field: 'company_name',
        minWidth: query.print ? 200 : width > breakpoint ? 350 : 200,
        maxWidth: query.print ? 200 : 1000,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh24 ps-3 pe-1' : 'ws-normal-lh24 ps-3 pe-1',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.company_name}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'period_of_report',
        minWidth: 100,
        maxWidth: query.print ? 100 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0' : 'ws-normal-lh24 ps-0 pe-0',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.period_of_report}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'shares_value',
        minWidth: 100,
        maxWidth: query.print ? 100 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.shares_value}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'shares',
        minWidth: 100,
        maxWidth: query.print ? 100 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.shares}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'shares_pcent',
        minWidth: 70,
        maxWidth: query.print ? 70 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.shares_pcent}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'change_in_holdings_shares',
        minWidth: 85,
        maxWidth: query.print ? 85 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.change_in_holdings_shares}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'change_in_holdings_pcent',
        minWidth: 85,
        maxWidth: query.print ? 85 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.change_in_holdings_pcent}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'voting_sole',
        minWidth: 90,
        maxWidth: query.print ? 90 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_sole}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'voting_shared',
        minWidth: 100,
        maxWidth: query.print ? 100 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_shared}</strong>
          </div>
        ),
      },
      {
        headerName: '',
        field: 'voting_none',
        minWidth: 105,
        maxWidth: query.print ? 105 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ag-cell-blurrytext ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small '
          : 'ws-normal-lh24 ps-0 pe-0 ag-right-aligned-cell font-size-small ',
        cellRendererFramework: (params) => (
          <div>
            <strong>{params.data.voting_none}</strong>
          </div>
        ),
      },
    ],
    colDefsMedalsExcluded: [],
    alignedGrids: [
      'company_name',
      'period_of_report',
      'shares_value',
      'shares',
      'shares_pcent',
      'change_in_holdings_shares',
      'change_in_holdings_pcent',
      'voting_sole',
      'voting_shared',
      'voting_none',
    ],
    pinColumns: {
      isPinOption: width > breakpoint,
      columns: [
        {
          colId: 'company_name',
          pinned: 'left',
        },
      ],
    },
    gridHeight: 48,
    headerHeight: 0,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowClass: 'bold-row',
    columnTypes: filters,
    rowData: props.ownershipLongInvestor_Footer.map((x) => ({
      ...x,
      TrialStatus: props.TrialStatus,
      allowDownload: props.allowDownload,
    })),
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
      <div className={query.print ? bem.b('') : ''}>
        <div className='row'>
          <div className='col-md-3 col-12 mb-2'>
            <DropdownList
              handleChange={async (e) => {
                if (!props.ownershipLongInvestor_statusTop5) {
                  setShowAllOrTop20(false);
                  await props.handleSetValueLatestOwnershipDate(e);
                }
              }}
              isMulti={false}
              options={props.latestOwnershipDateList}
              Dvalue={props.setValue_latestOwnershipDate}
              disabled={props.loadingData ? true : props.ownershipLongInvestor_statusTop5}
            />
          </div>
          <div className='col-md-4 col-12 mb-2'>
            <DropdownList
              handleChange={async (e) => {
                if (!props.ownershipLongInvestor_statusTop5) {
                  setShowAllOrTop20(false);
                  await props.handleSetValueChangeComparisionMonth(e);
                }
              }}
              isMulti={false}
              options={props.changeComparisionMonthList}
              Dvalue={props.setValue_changeComparisionMonth}
              disabled={props.loadingData ? true : props.ownershipLongInvestor_statusTop5}
            />
          </div>
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
                await props.getOwnershipLongInvestorDataReq({
                  investor_id: query.investor,
                  period_of_report: props.setValue_latestOwnershipDate.value,
                  change_comparison: props.setValue_changeComparisionMonth.value,
                  filterRecords: status,
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
                    pathname: pathConst.OWNERSHIP_INVESTOR_LONG_FUND,
                    search: props.location.search,
                    state: {},
                  };
                  history.replace(objPath);
                }
              }}
              disabled={props.invLongFund !== null && props.invLongFund === 0}
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
                  {props.ownershipLongInvestor_Data.length > 0 ? (
                    <>
                      <ErrorBoundary hasCard cardtitle='Ownership Long Investor'>
                        <Table
                          gridOptionsFooter={gridOptionsFooter}
                          pageTitle='Ownership Long Investor'
                          title={
                            !showAllOrTop20
                              ? props.ownershipLongInvestor_Heading.top_20_company_name
                              : props.ownershipLongInvestor_Heading.all_company_name
                          }
                          smalltitle=''
                          gridOptions={gridOptionsOwnershipLongData}
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

InvestorOwnershipLongInvestor.propTypes = {
  location: PropTypes.object.isRequired,
  latestOwnershipDateList: PropTypes.array.isRequired,
  setValue_latestOwnershipDate: PropTypes.object.isRequired,
  changeComparisionMonthList: PropTypes.array.isRequired,
  setValue_changeComparisionMonth: PropTypes.object.isRequired,
  handleSetValueLatestOwnershipDate: PropTypes.func.isRequired,
  handleSetValueChangeComparisionMonth: PropTypes.func.isRequired,
  getOwnershipLongInvestorDataReq: PropTypes.func.isRequired,
  ownershipLongInvestor_Data: PropTypes.array.isRequired,
  ownershipLongInvestor_Footer: PropTypes.array.isRequired,
  ownershipLongInvestor_Heading: PropTypes.object.isRequired,
  ownershipLongInvestor_statusTop5: PropTypes.bool.isRequired,
  loadingData: PropTypes.bool.isRequired,
  procedureRunningEstimateTime: PropTypes.any,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  handleIsLoadingOwnership: PropTypes.func.isRequired,
};
InvestorOwnershipLongInvestor.defaultProps = {
  procedureRunningEstimateTime: undefined,
};

export default withRouter(InvestorOwnershipLongInvestor);
