import React from 'react';
import { withRouter } from 'react-router';
import Table from '../../GeneralForm/Table';
import { dateToNull } from '../../../utils/general-util';
import {
  COMPANY_OVERVIEW,
  INVESTOR_OVERVIEW,
  INVESTOR_VOTING_PROFILE,
} from '../../../constants/PathsConstant';
import NewsArticleComponent from '../../News/Components/NewsArticleComponent';
import bn from '../../../utils/bemnames';
import { filters } from '../../../utils/AgGridFunctions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('newsNew');

const EventElements = ({
  lstElementDetail,
  elementTypeId,
  cmp_pid,
  investor_id,
  country_flag,
  filling_header,
  filing_date,
  module_name,
  match,
  location,
  history,
  initialisePDFModal,
  alertData,
}) => {
  const [articleMode, setArticleMode] = React.useState(false);
  const [isOpenedOn, setIsOpenedOn] = React.useState(true);
  const [newsDetailsArray, setNewsDetailsArray] = React.useState([]);
  const [loadedIds, setLoadedIds] = React.useState([]);
  const [articleID, setArticleID] = React.useState(0);
  const [newsDetailsLocation, setNewsDetailsLocation] = React.useState(null);
  const [openOnLoad, setOpenOnLoad] = React.useState(true);
  const [article404, setArticle404] = React.useState(true);
  const [newsIds, setNewsIds] = React.useState([]);

  const gridOptionFailedManagement = {
    colDefsMedalsIncluded:
      elementTypeId === 171
        ? [
            {
              headerName: 'Company',
              field: 'Issuer',
              minWidth: 180,
              cellRenderer: (params) => {
                if (params.value !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                if (params.node !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                return null;
              },
            },
            {
              headerName: 'Company HQ',
              field: 'Country',
              minWidth: 100,
            },
            {
              headerName: 'Meeting Date',
              field: 'Date',
              minWidth: 130,
            },
            {
              headerName: 'Resolution Text',
              field: 'proposal_detail',
              minWidth: 180,
            },
            {
              headerName: 'Investor Voting Against Proposal',
              field: 'Investor',
              minWidth: 180,
              cellRenderer: (params) => {
                if (params.value !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Investor === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${INVESTOR_OVERVIEW}?investor=${lstData[0].Investor_id}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                if (params.node !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Investor === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${INVESTOR_OVERVIEW}?investor=${lstData[0].Investor_id}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                return null;
              },
            },
          ]
        : elementTypeId === 51
        ? [
            {
              headerName: 'Date',
              field: 'EffectiveDate',
              minWidth: 120,
              maxWidth: 120,
            },
            {
              headerName: 'Company',
              field: 'Issuer',
              minWidth: 180,

              cellRenderer: (params) => {
                if (params.value !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                if (params.node !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                return null;
              },
            },

            {
              headerName: 'Company HQ',
              field: 'Country',
              minWidth: 100,
            },
            {
              headerName: 'Name',
              field: 'director_name',
              minWidth: 180,
            },
            {
              headerName: 'Appointment Type',
              field: 'appointment_type',
              minWidth: 100
            },
            {
              headerName: 'Start/End',
              field: 'start_end',
              minWidth: 100
            }
          ]
        : elementTypeId === 61 || elementTypeId === 62
        ? [
            {
              headerName: 'Date',
              field: 'EffectiveDate',
              minWidth: 90,
              maxWidth: 100,
              cellClass: 'ws-normal-lh30 dateFormat ps-1 pe-1 text-center font-size-small',
            },
            {
              headerName: 'Company',
              field: 'Issuer',
              minWidth: 180,
              cellRenderer: (params) => {
                if (params.value !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                if (params.node !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                return null;
              },
            },
            {
              headerName: 'Company HQ',
              field: 'Country',
              minWidth: 88,
              maxWidth: 88,
            },

            {
              headerName: 'Category.',
              field: 'category',
              type: ['autoHeightTrue'],
              cellClass: 'ws-normal-lh24 ps-1 pe-1 font-size-small',
              minWidth: 180,
            },
          ]
        : elementTypeId === 181
        ? [
            {
              headerName: 'Date',
              field: 'EffectiveDate',
              minWidth: 130,
              maxWidth: 130,
            },
            {
              headerName: 'Company',
              field: 'Issuer',
              minWidth: 180,
              cellRenderer: (params) => {
                if (params.value !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.value}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                if (params.node !== undefined) {
                  const eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="btn-simple btn-link cursor-pointer text-secondary">${params.node.key}</span>`;
                  const eButton = eDiv.querySelectorAll('.btn-simple')[0];
                  eButton.addEventListener('click', () => {
                    const lstData = lstElementDetail.filter(
                      (c) => c.Issuer === params.value
                    );
                    if (lstData.length > 0) {
                      window.open(
                        `${window.location.protocol}//${window.location.host}${COMPANY_OVERVIEW}?pid=${lstData[0].PID}`,
                        '_blank'
                      );
                    }
                  });
                  return eDiv;
                }
                return null;
              },
            },
            {
              headerName: 'Country HQ',
              field: 'Country',
              maxWidth: 120,
              minWidth: 120,
            },
            {
              headerName: 'Update',
              field: 'PP_update',
              maxWidth: 120,
              minWidth: 120,
            },
          ]
        : [
            {
              headerName: 'Company',
              field: 'Issuer',
              minWidth: 180,
              cellRendererFramework: (params) => {
                if (params.data.PID > 0) {
                  return (
                    <a
                      target={`${'_blank'}`}
                      href={`${COMPANY_OVERVIEW}?pid=${params.data.PID}`}
                      className='btn-simple btn-link cursor-pointer text-secondary'
                    >
                      {params.value}
                    </a>
                  );
                }
                return params.value;
              },
            },
            {
              headerName: 'Country',
              field: 'Country',
              minWidth: 100,
            },
            {
              headerName: 'Meeting Date',
              field: 'Date',
              minWidth: 130,
            },
            {
              headerName: 'Resolution Text',
              field: 'proposal_detail',
              minWidth: 180,
            },
            {
              headerName: 'For %',
              field: 'for_pcent',
              minWidth: 180,
            },
          ],
    colDefsMedalsExcluded: [],
    columnTypes: filters,
    pinColumns: {
      isPinOption: false,
      columns: [],
    },
    paggination: { isPagging: true, pageSize: 10 },
    isfloatingFilter: false,
    pivotMode: false,
    defaultColDef: {
      sortable: true,
    },
    rowData:
      lstElementDetail !== undefined &&
      lstElementDetail.map((x) => ({
        ...x,
        meeting_date: dateToNull(x.meeting_date, 'dd-mmm-yyyy', true),
        Date: dateToNull(x.Date, 'dd-mmm-yyyy', true),
      })),
  };

  return (
    <ErrorBoundary>
      {lstElementDetail !== undefined ? (
        <>
          {/* news section */}
          {elementTypeId === 11 ||
          elementTypeId === 31 ||
          elementTypeId === 191 ||
          elementTypeId === 141 ? (
            <>
              {lstElementDetail.length > 0 ? (
                <div className={bem.b('')}>
                  <NewsArticleComponent
                    newsIds={[lstElementDetail[0].newsid]}
                    setNewsIds={setNewsIds}
                    selectedSidebarNews={null}
                    articleMode={articleMode}
                    setArticleMode={setArticleMode}
                    setIsOpenedOn={setIsOpenedOn}
                    newsDetailsArray={lstElementDetail}
                    setNewsDetailsArray={setNewsDetailsArray}
                    loadedIds={[lstElementDetail[0].newsid]}
                    setLoadedIds={setLoadedIds}
                    articleID={lstElementDetail[0].newsid}
                    setArticleID={setArticleID}
                    newsDetailsLocation={0}
                    setNewsDetailsLocation={setNewsDetailsLocation}
                    openOnLoad={openOnLoad}
                    setOpenOnLoad={setOpenOnLoad}
                    article404={article404}
                    setArticle404={setArticle404}
                    match={match}
                    staticPathConst={null}
                    location={location}
                    history={history}
                    newsid={lstElementDetail[0].newsid}
                    handleSelectSidebarNews={() => {}}
                  />
                </div>
              ) : (
                'No Records found'
              )}
            </>
          ) : (
            ''
          )}
          {elementTypeId === 21 ||
          elementTypeId === 23 ||
          elementTypeId === 111 ||
          elementTypeId === 121 ||
          elementTypeId === 131 ||
          elementTypeId === 41 ? (
            <>
              {lstElementDetail !== undefined ? (
                <>
                  {lstElementDetail.length > 0 ? (
                    <div className='row itemAlert fadeInAnimation expandBlock'>
                      <div className='col-9 text-secondary py-auto my-auto mb-3 p-0'>
                        {dateToNull(filing_date, 'dd-mmm-yyyy', true)}
                      </div>
                      <div className='col-3 text-secondary py-auto my-auto mb-3 text-end'>
                        {module_name}
                      </div>
                      <div className='py-auto p-0 newsExpandHeadline'>
                        <p>{filling_header}</p>
                      </div>

                      <table className='table tblAgGridStyle' border='2'>
                        <tbody>
                          {lstElementDetail.map((item) =>
                            item.element !== null &&
                            item.row_heading !== 'Pid' &&
                            item.row_heading !== 'PID' &&
                            item.row_heading !== 'pid' &&
                            item.row_heading !== 'Country_Flag' &&
                            item.row_heading !== 'Country' &&
                            item.row_heading !== 'investor_id' &&
                            item.row_heading !== 'Investor_profile_id' ? (
                              <tr>
                                {item.row_heading !== 'Summary' ? (
                                  <>
                                    <td className='tblHeader'>
                                      {item.row_heading === 'Summary'
                                        ? ' '
                                        : item.row_heading === 'Issuer'
                                        ? 'Company'
                                        : item.row_heading === 'Activist'
                                        ? 'Investor'
                                        : item.row_heading}
                                    </td>
                                    <td>
                                      {item.row_heading === 'Link' ||
                                      item.row_heading === 'Document link' ? (
                                        <a
                                          className='text-secondary'
                                          target='_blank'
                                          rel='noreferrer'
                                          href={`${item.element}`}
                                        >
                                          {' '}
                                          View
                                        </a>
                                      ) : item.row_heading === 'Activist' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}`}
                                            style={{
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            rel='noreferrer'
                                            href={`${INVESTOR_OVERVIEW}?investor=${
                                              investor_id !== null
                                                ? investor_id
                                                : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Issuer' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}`}
                                            style={{
                                              height: '22px',
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;{' '}
                                          <a
                                            className='text-secondary'
                                            rel='noreferrer'
                                            target='_blank'
                                            href={`${COMPANY_OVERVIEW}?pid=${
                                              cmp_pid !== null ? cmp_pid : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Summary' ? (
                                        ''
                                      ) : item.row_heading === 'Market cap' ? (
                                        `${
                                          Math.round(
                                            item.element !== null &&
                                              item.element * 100
                                          ) / 100
                                        }  Million USD`
                                      ) : item.row_heading ===
                                        'ADTV(30-Day)' ? (
                                        `${
                                          Math.round(
                                            item.element !== null &&
                                              item.element * 100
                                          ) / 100
                                        }  Million USD`
                                      ) : item.row_heading === 'Investor' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}`}
                                            style={{
                                              height: '22px',
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            rel='noreferrer'
                                            href={`${INVESTOR_OVERVIEW}?investor=${
                                              investor_id !== null
                                                ? investor_id
                                                : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading ===
                                        'Short seller' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}`}
                                            style={{
                                              height: '22px',
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            rel='noreferrer'
                                            href={`${INVESTOR_OVERVIEW}?investor=${
                                              investor_id !== null
                                                ? investor_id
                                                : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading ===
                                        'Change Summary' ? (
                                        <div>
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            rel='noreferrer'
                                            href={`${INVESTOR_VOTING_PROFILE}?investor=${
                                              investor_id !== null
                                                ? investor_id
                                                : 0
                                            }&invpfid=${item.element}`}
                                          >
                                            View
                                          </a>
                                        </div>
                                      ) : item.row_heading ===
                                          'Redline Report' ||
                                        item.row_heading === 'View PDF' ? (
                                        <div>
                                          <button
                                            type='button'
                                            className='btn-primary'
                                            onClick={() => {
                                              initialisePDFModal(
                                                item.element,
                                                item.element
                                                  .split('.')
                                                  .slice(0, -1)
                                                  .join('.')
                                              );
                                            }}
                                          >
                                            View PDF
                                          </button>
                                        </div>
                                      ) : item.row_heading === 'Pid' ? (
                                        <></>
                                      ) : item.row_heading ===
                                        'Country Flag' ? (
                                        <></>
                                      ) : item.row_heading === 'Filing date' ||
                                        item.row_heading === 'Date' ||
                                        item.row_heading ===
                                          'Announcement date' ? (
                                        item.element !== '' ||
                                        item.element !== undefined ||
                                        item.element !== null ? (
                                          dateToNull(
                                            item.element,
                                            'dd-mmm-yyyy',
                                            true
                                          )
                                        ) : (
                                          ''
                                        )
                                      ) : (
                                        item.element
                                      )}
                                    </td>
                                  </>
                                ) : (
                                  <td colSpan='2' className='summaryTab'>
                                    <tr className='summaryHeader'>
                                      <b>{item.row_heading}</b>
                                    </tr>
                                    <tr className='summary'>&nbsp;</tr>
                                    <tr className='summary'>
                                      <p>{item.element}</p>
                                    </tr>
                                    {/* </td>
                                    <td>
                                      {item.row_heading === 'Link' || item.row_heading === 'Document link' ? (
                                        <a className='text-secondary' target='_blank' href={`${item.element}`}>
                                          {' '}
                                          View
                                        </a>
                                      ) : item.row_heading === 'Activist' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}.png`}
                                            style={{
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            href={`${INVESTOR_OVERVIEW}?investor=${
                                              investor_id !== null ? investor_id : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Issuer' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}.png`}
                                            style={{
                                              height: '22px',
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;{' '}
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            href={`${COMPANY_OVERVIEW}?pid=${cmp_pid !== null ? cmp_pid : 0}`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Summary' ? (
                                        ''
                                      ) : item.row_heading === 'Market cap' ? (
                                        Math.round(item.element !== null && item.element * 100) /
                                          100 +
                                        ' Million USD'
                                      ) : item.row_heading === 'ADTV(30-Day)' ? (
                                        Math.round(item.element !== null && item.element * 100) /
                                          100 +
                                        ' Million USD'
                                      ) : item.row_heading === 'Investor' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}.png`}
                                            style={{
                                              height: '22px',
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            href={`${INVESTOR_OVERVIEW}?investor=${
                                              investor_id !== null ? investor_id : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Short seller' ? (
                                        <div>
                                          <img
                                            src={`/images/Flags/${country_flag}.png`}
                                            style={{
                                              height: '22px',
                                              maxHeight: '22px',
                                              maxWidth: '22px',
                                              margin: '0px',
                                            }}
                                            alt='img'
                                          />
                                          &nbsp;
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            href={`${INVESTOR_OVERVIEW}?investor=${
                                              investor_id !== null ? investor_id : 0
                                            }`}
                                          >
                                            {item.element}
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Change Summary' ? (
                                        <div>
                                          <a
                                            className='text-secondary'
                                            target='_blank'
                                            href={`${INVESTOR_VOTING_PROFILE}?investor=${
                                              investor_id !== null ? investor_id : 0
                                            }&invpfid=${item.element}`}
                                          >
                                            View
                                          </a>
                                        </div>
                                      ) : item.row_heading === 'Redline Report' ? (
                                        <div>
                                          <button
                                            className='btn-primary'
                                            onClick={(e) => {
                                              initialisePDFModal(
                                                item.element,
                                                item.element.split('.').slice(0, -1).join('.')
                                              );
                                            }}
                                          >
                                            View PDF
                                          </button>
                                        </div>
                                      ) : (
                                        item.element
                                      )}
                                    </td>
                                  </>
                                ) : (
                                  <td colSpan='2' className='summaryTab'>
                                    <tr className='summaryHeader'>
                                      <b>{item.row_heading}</b>
                                    </tr>
                                    <tr className='summary'>&nbsp;</tr>
                                    <tr className='summary'>
                                      <p>{item.element}</p>
                                    </tr> */}
                                  </td>
                                )}
                              </tr>
                            ) : (
                              ''
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    'No Records found'
                  )}
                </>
              ) : (
                'Loading '
              )}
            </>
          ) : (
            ''
          )}

          {elementTypeId === 151 ||
          elementTypeId === 161 ||
          elementTypeId === 171 ||
          elementTypeId === 51 ||
          elementTypeId === 61 ||
          elementTypeId === 62 ||
          elementTypeId === 181 ? (
            <>
              {lstElementDetail.length > 0 ? (
                <div className='row itemAlert fadeInAnimation expandBlock'>
                  <div className='col-9 text-secondary py-auto my-auto mb-3'>
                    {dateToNull(filing_date, 'dd-mmm-yyyy', true)}
                  </div>
                  <div className='col-3 text-secondary py-auto my-auto mb-3 text-end'>
                    {module_name}
                  </div>
                  <div className='py-auto newsExpandHeadline'>
                    <p>{filling_header}</p>
                  </div>
                  {elementTypeId === 51 ||
                  elementTypeId === 61 ||
                  elementTypeId === 62 ||
                  elementTypeId === 151 ||
                  elementTypeId === 152 ||
                  elementTypeId === 161 ||
                  elementTypeId === 162 ||
                  elementTypeId === 171 ||
                  elementTypeId === 172 ||
                  elementTypeId === 173 ||
                  elementTypeId === 181 ? (
                    <span>
                      <p>Alert Name : {alertData.alert_name} </p>
                    </span>
                  ) : (
                    ''
                  )}

                  <Table
                    IsShowCard={false}
                    gridOptions={gridOptionFailedManagement}
                    isfloatingFilter={false}
                    hideExcelDownloadIcon
                  />
                </div>
              ) : (
                'No Records found'
              )}
            </>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}
    </ErrorBoundary>
  );
};

EventElements.propTypes = {};

EventElements.defaultProps = {};
export default React.memo(withRouter(EventElements));
