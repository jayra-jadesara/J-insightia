import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import { COMPANY_SEARCH } from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import Table from '../../GeneralForm/Table';
import Card from '../../GeneralForm/Card';
import { dateToNull } from '../../../utils/general-util';
import { filters } from '../../../utils/AgGridFunctions';
import { NORECORDS } from '../../../constants/MessageConstans';
import numConst from '../../../constants/NumberConstants';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('poisonPill');

const PoisonPill = ({ location, TrialLog, poisonPill, poisonPillHeader, item303, allowDownload, TrialUser, TrialUserDisableDownload }) => {
  const [pillActive, setPillActive] = useState(<span className='ppInactive'>Inactive</span>);
  const [pillTerminated, setPillTerminated] = useState(<span className='ppTerminated'>No</span>);

  useEffect(() => {
    if (poisonPillHeader.length > 0) {
      const pStatus = poisonPillHeader[0];
      if (pStatus.final_expiration && pStatus.poison_pill_id) {
        setPillActive(<span className='ppActive'>Active</span>);
      }
      if (new Date(pStatus.final_expiration) > new Date()) {
        setPillActive(<span className='ppActive'>Active</span>);
      } else {
        setPillActive(<span className='ppInactive'>Inactive</span>);
      }
      if (pStatus.terminated && new Date(pStatus.terminated) < new Date()) {
        setPillActive(<span className='ppInactive'>Inactive</span>);
      }
      if (pStatus.adopted) {
        if (new Date(pStatus.adopted) > new Date()) {
          setPillActive(<span className='ppOInactive'>Inactive</span>);
        }
      }
      if (pStatus.terminated) {
        setPillTerminated(<span className='ppTerminated'>Yes</span>);
      }
    }
    if (poisonPill.length > numConst.EMPTY_TABLE_LENGTH) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [poisonPillHeader]);

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (!query.pid) {
    return <Redirect to={COMPANY_SEARCH} />;
  }

  const gridOptionsDetails = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Amendment Number',
        field: 'amendment_number',
        type: ['autoHeightTrue'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Adopted Date',
        field: 'adopted',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : 'ws-normal-lh24 ps-1 pe-1 text-center dateFormat'
      },
      {
        headerName: 'Final Expiration',
        field: 'final_expiration',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center dateFormat'
          : 'ws-normal-lh24 ps-1 pe-1 text-center dateFormat'
      },
      {
        headerName: 'Ownership Threshold',
        field: 'percent',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 ag-right-aligned-cell'
          : 'ws-normal-lh24 ps-1 pe-1  ag-right-aligned-cell',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Flip In',
        field: 'FlipIn',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Flip Over',
        field: 'FlipOver',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'NOL',
        field: 'NOL',
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Rights Agent',
        field: 'rights_agent',
        type: ['autoHeightTrue'],
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        minWidth: 233,
        maxWidth: query.print ? 233 : null
      },
      {
        headerName: 'Document',
        field: 'link',
        minWidth: 100,
        maxWidth: 100,
        cellClass: TrialUser
          ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 text-center'
          : 'ws-normal-lh24 ps-1 pe-1 text-center',
        cellRendererFramework: (params) => {
          if (params.data.link === null) return null;
          return (
            <div>
              {TrialUser ? (
                <span className='link-primary text-secondary'>View</span>
              ) : (
                <a
                  className='link-primary text-secondary'
                  href={params.data.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          );
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    headerHeight: 50,
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true
    },
    rowData: poisonPill.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      final_expiration: x.final_expiration !== null ? dateToNull(x.final_expiration, 'dd-mmm-yy', true) : '',
      adopted: x.adopted !== null ? dateToNull(x.adopted, 'dd-mmm-yy', true) : ''
    }))
  };

  const gridOptionsItem303 = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'date_time',
        minWidth: 100,
        maxWidth: 100,
        type: ['dateColumn'],
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1 dateFormat' : 'ws-normal-lh24 ps-1 pe-1 dateFormat',
      },
      {
        headerName: 'Document',
        field: 'url',
        minWidth: query.print ? 950 : 300,
        maxWidth: query.print ? 950 : null,
        cellClass: TrialUser ? 'ws-normal-lh24 ag-cell-blurrytext ps-1 pe-1' : 'ws-normal-lh24 ps-1 pe-1',
        cellRendererFramework: (params) => {
          if (params.data.url === null) return null;
          return (
            <div>
              {TrialUser ? (
                <span className='link-primary text-secondary'>View</span>
              ) : (
                <a
                  className='link-primary text-secondary'
                  href={params.data.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View
                </a>
              )}
            </div>
          );
        }
      }
    ],
    columnTypes: filters,
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: []
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false,
    defaultColDef: {
      sortable: true
    },
    rowData: item303.map((x) => ({
      ...x,
      TrialUser,
      allowDownload,
      date_time: x.date_time !== null ? dateToNull(x.date_time, 'dd-mmm-yy', true) : ''
    }))
  };

  if (
    poisonPill.length === numConst.EMPTY_TABLE_LENGTH ||
    poisonPillHeader.length === numConst.EMPTY_TABLE_LENGTH
  ) {
    return (
      <Page key={1} className={bem.b('pt-3')}>
        {NORECORDS}
      </Page>
    );
  }

  return (
    <Page
      {...{
        location,
        TrialLog,
        poisonPill,
        item303,
        allowDownload,
        poisonPillHeader
      }}
      key={1}
      className={bem.b('pt-3')}
    >
      <div className='fadeInAnimation' id='loadItem'>
        {pillActive !== undefined && pillTerminated !== undefined && (
          <div className='d-flex col-lg-5 col-md-8 col-sm-12 mb-3'>
            <Card>
              <div className='row pt-2'>
                <div className='col-6'>
                  <h5>Status: {pillActive}</h5>
                </div>
                <div className='col-6'>
                  <h5>Terminated Early: {pillTerminated}</h5>
                </div>
              </div>
            </Card>
          </div>
        )}

        {poisonPill.length > 0 && (
          <div className='row pt-2'>
            <div className='col-12'>
              <ErrorBoundary hasCard cardtitle='Details'>
                <Table
                  gridOptions={gridOptionsDetails}
                  title='Details'
                  pageTitle='Details'
                  hideExcelDownloadIcon={TrialUserDisableDownload}
                />
              </ErrorBoundary>
            </div>
          </div>
        )}

        {item303.length > 0 && (
          <div className='row pt-2'>
            <div className='col-12'>
              <ErrorBoundary hasCard cardtitle='Item 3.03: Material Modifications to Rights of Security Holders'>
                <Table
                  gridOptions={gridOptionsItem303}
                  title='Item 3.03: Material Modifications to Rights of Security Holders'
                  pageTitle='Item 3.03: Material Modifications to Rights of Security Holders'
                  hideExcelDownloadIcon={TrialUserDisableDownload}
                />
              </ErrorBoundary>
            </div>
          </div>
        )}

      </div>
    </Page>
  );
};

PoisonPill.propTypes = {
  TrialLog: PropTypes.bool,
  allowDownload: PropTypes.bool,
  item303: PropTypes.array,
  location: PropTypes.any,
  poisonPill: PropTypes.array,
  poisonPillHeader: PropTypes.array
};

PoisonPill.defaultProps = {
  TrialLog: false,
  allowDownload: false,
  item303: [],
  poisonPill: [],
  poisonPillHeader: []
};

export default withRouter(React.memo(PoisonPill));
