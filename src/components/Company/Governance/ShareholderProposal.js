import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import { COMPANY_SEARCH, INVESTOR_OVERVIEW, QUERY_INVESTOR } from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { checkValuesToFixed } from '../../../utils/table-tools-util';
import { dateToNull } from '../../../utils/general-util';
import { GetInvestorIdFromActivist } from '../../../utils/investorActivistShort-util';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const ShareholderProposal = ({
  location,
  TrialLog,
  allowDownload,
  shareholderProposalData,
  isLoadingData,
  TrialUser,
  TrialUserDisableDownload
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  // function multiCompany(params) {
  //   let itemArr = [];
  //   itemArr = params.data.proponents;
  //   return itemArr;
  // }

  const gridOptionsShareholderProposals = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Proposal',
        field: 'Proposal',
        type: ['autoHeightTrue'],
        minWidth: 450,
        maxWidth: query.print ? 450 : null,
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1'
      },
      {
        headerName: 'Proponent',
        field: 'proponents',
        type: ['autoHeightTrue'],
        minWidth: 360,
        maxWidth: query.print ? 360 : null,
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          const actId = params.data.proponents_text_id[0];
          if (actId !== undefined && actId !== null && actId !== '') {
            GetInvestorIdFromActivist(actId).then((r) => {
              eDiv.innerHTML = `<a class="text-secondary" rel="noopener noreferrer" href="${INVESTOR_OVERVIEW}?investor=${r.investor_id}">
            ${params.data.proponents_text}</a>`;
            });
          } else {
            eDiv.innerHTML = `<span>${params.data.proponents_text}</span>`;
          }
          return eDiv;
        }
      },
      {
        headerName: 'Date of Meeting',
        field: 'Date of Meeting',
        sort: 'desc',
        minWidth: 120,
        maxWidth: 120,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => dateToNull(params.data['Date of Meeting'], 'dd-mmm-yy', true)
      },
      {
        headerName: 'ISS Rec',
        field: 'iss_pva_rec',
        minWidth: 105,
        maxWidth: 105,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => params.data.iss_pva_rec
      },
      {
        headerName: 'GL Rec',
        field: 'gl_pva_rec',
        minWidth: 105,
        maxWidth: 105,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => params.data.gl_pva_rec
      },
      {
        headerName: 'Votes for (%)',
        field: 'Votes for at AGM (%)',
        minWidth: 105,
        maxWidth: 105,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1 ag-right-aligned-cell',
        cellRendererFramework: (params) => checkValuesToFixed(params.data['Votes for at AGM (%)'], 1)
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
    headerHeight: 50,
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true
    },
    rowData: shareholderProposalData.map((x) => ({
      ...x,
      ['Date of Meeting']:
        x['Date of Meeting'] !== undefined ? dateToNull(x['Date of Meeting'], 'dd-mmm-yy', true) : '',
      ['Votes for at AGM (%)']:
        x['Votes for at AGM (%)'] !== undefined ? checkValuesToFixed(x['Votes for at AGM (%)'], 1) : '',
      proponent_name: x.proponent_name !== null || x.proponent_name ? x.proponent_name : null,
      proponents: x.proponents.map((d) => d.proponent_name),
      proponents_text: x.proponents.map((d) => d.proponent_name),
      proponents_text_id: x.proponents.map((d) => d.activist_id),
      TrialUser,
      allowDownload
    }))
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
    <Page key={1} className='pt-3'>
      {isLoadingData ? (
        LOADING
      ) : (
        <>
          <div className='row pb-3 pt-2' id='loadItem'>
            <div className='col-md-12 col-12 m-0'>
              {shareholderProposalData.length > 0 ? (
                <ErrorBoundary hasCard cardtitle='Shareholder Proposals'>
                  <Table
                    IsShowCard
                    gridOptions={gridOptionsShareholderProposals}
                    isHide={false}
                    title='Shareholder Proposals'
                    smalltitle=''
                    pageTitle='Shareholder Proposals'
                    hideExcelDownloadIcon={TrialUserDisableDownload}
                  />
                </ErrorBoundary>
              ) : (
                <Card title='Shareholder Proposals'>{NORECORDS}</Card>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

ShareholderProposal.propTypes = {
  location: PropTypes.object,
  TrialLog: PropTypes.bool,
  allowDownload: PropTypes.bool,
  shareholderProposalData: PropTypes.array,
  isLoadingData: PropTypes.any
};

ShareholderProposal.defaultProps = {
  location: {},
  TrialLog: false,
  allowDownload: false,
  shareholderProposalData: [],
  isLoadingData: undefined
};
export default withRouter(React.memo(ShareholderProposal));
