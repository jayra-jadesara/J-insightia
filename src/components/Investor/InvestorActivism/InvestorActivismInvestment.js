import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import Table from '../../GeneralForm/Table';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import msgConst from '../../../constants/MessageConstans';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const InvestorActivismInvestment = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const gridOptions_lstActivistHoldings = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        minWidth: 180,
        maxWidth: query.print ? 180 : null,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" href="${pathConst.COMPANY_OVERVIEW}?pid=${params.data.PID}">
            ${params.data.company_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Industry',
        field: 'industry_name',
        minWidth: 170,
        maxWidth: query.print ? 170 : 700,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Sector',
        field: 'industry_sector_name',
        minWidth: 90,
        maxWidth: query.print ? 90 : 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Company HQ',
        field: 'Country_name',
        minWidth: 100,
        maxWidth: 100,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Exchange',
        field: 'exchange_name',
        minWidth: 100,
        maxWidth: query.print ? 100 : 150,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'First Investment',
        field: 'date_first_invested',
        minWidth: query.print ? 90 : 110,
        maxWidth: query.print ? 90 : 110,
        type: ['autoHeightTrue', 'dateColumn'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Status',
        field: 'current',
        minWidth: query.print ? 80 : 60,
        maxWidth: query.print ? 80 : 60,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Holding (%)',
        field: 'pcent_held',
        minWidth: 90,
        maxWidth: 90,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: props.lstActivistHoldings.map((x) => ({
      ...x,
      date_first_invested: dateToNull(x.date_first_invested, 'dd-mmm-yy', true),
      TrialStatus: props.trialStatus,
      allowDownload: false,
      current: x.current ? 'Current' : 'Exited',
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false },
  };

  const gridOptions_lst13F_Filings_by_Activist = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Filing Entity',
        field: 'Filer_name',
        minWidth: 533,
        maxWidth: query.print ? 533 : 1200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
      },
      {
        headerName: 'Filing Date',
        field: 'Filing_date',
        minWidth: 100,
        maxWidth: query.print ? 100 : 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Period of Report',
        field: 'Period_of_report',
        minWidth: 100,
        maxWidth: query.print ? 100 : 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Filing Type',
        field: 'doc_type',
        minWidth: 100,
        maxWidth: query.print ? 100 : 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Amendment Type',
        field: 'amendment_type',
        minWidth: 100,
        maxWidth: query.print ? 100 : 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
      },
      {
        headerName: 'Link',
        minWidth: 100,
        maxWidth: query.print ? 100 : 200,
        type: ['autoHeightTrue'],
        cellClass: props.TrialStatus
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a class="text-secondary" target="_blank" rel="noopener noreferrer" href="${params.data.url}">Link</a>`;
          return eDiv;
        },
      },
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    groupUseEntireRow: false,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    pivotMode: false,
    rowData: props.lst13F_Filings_by_Activist.map((x) => ({
      ...x,
      Filing_date: dateToNull(x.Filing_date, 'dd-mmm-yy', true),
      Period_of_report: dateToNull(x.Period_of_report, 'dd-mmm-yy', true),
      TrialStatus: props.trialStatus,
      allowDownload: false,
    })),
    quickSearchFilter: false,
    domLayout: 'autoHeight',
    suppressAggFuncInHeader: true,
    paggination: { isPagging: false },
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
    <Page {...props} key={1} className='cr-InvestorActivismInvestment pt-4 pb-2'>
      {props.isLoading ? (
        msgConst.LOADING
      ) : (
        <>
          {props.lstActivistHoldings.length > 0 && (
            <div className='row' id='loadItem'>
              <div className='col-12 my-2 mt-0 mb-0'>
              <ErrorBoundary hasCard cardtitle='Activist Portfolio Summary'>
                <Table
                  IsShowCard
                  hideExcelDownloadIcon={props.TrialUserDisableDownload}
                  isHide={false}
                  title='Activist Portfolio Summary'
                  pageTitle='Portfolio Summary'
                  smalltitle=''
                  gridOptions={gridOptions_lstActivistHoldings}
                />
              </ErrorBoundary>
              </div>
            </div>
          )}

          {props.lst13F_Filings_by_Activist.length > 0 && (
            <div className='row'>
              <div className='col-12 my-2 mt-2 mb-2'>
                {query.print ? (
                  <Table
                    IsShowCard
                    hideExcelDownloadIcon
                    isHide={false}
                    title='13F Filings'
                    smalltitle=''
                    gridOptions={gridOptions_lst13F_Filings_by_Activist}
                  />
                ) : (
                  <CollapseComponent isOpen={false} Heading='13F Filings'>
                    <ErrorBoundary>
                      <Table
                        IsShowCard={false}
                        hideExcelDownloadIcon={props.TrialUserDisableDownload}
                        isHide={false}
                        title=''
                        smalltitle=''
                        pageTitle='13F Filings'
                        gridOptions={gridOptions_lst13F_Filings_by_Activist}
                      />
                    </ErrorBoundary>
                  </CollapseComponent>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Page>
  );
};

InvestorActivismInvestment.propTypes = {
  location: PropTypes.object,
};

InvestorActivismInvestment.defaultProps = {
  location: {},
};

export default withRouter(React.memo(InvestorActivismInvestment));
