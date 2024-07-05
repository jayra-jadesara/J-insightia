import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import qs from 'qs';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
import bn from '../../../utils/bemnames';
import { history } from '../../../utils/navigation-util';
import pathConst, {
  COMPANY_LOGO_PATH,
  MY_ALERT_INBOX,
} from '../../../constants/PathsConstant';
import { ALERT_NOTIFICATION_SYSTEM_STYLE } from '../../../utils/notificationStyle';
import { getPDF, getPDFClose } from '../../../utils/pdf-util';
import { dateToNull } from '../../../utils/general-util';

const bem = bn.create('title');

const TitleComponent = ({
  title,
  breadcrumbs,
  headers,
  pdfDownloadNotification,
  handlePDFDownloadNotification,
  generatePDF,
  handleGeneratePDF,
  handleVisitorLog,
  pdfListItems,
  InvestorTitle,
  company_logo,
  handlePDFDownloadCancelClick,
  pdfDownloadCancelBtn,
  notificationDataPopup,
  updateAlertStatusReq,
  getElementDetailReq,
  handleOnClickNotification,
  getInboxAlertByUserReq,
  handlePDFDownloadLoader,
  pdfDownloadLoader,
  pdfDownloadStartNotification,
  handleResetpdfDownloadStartNotification
}) => {
  const [confirmPDFTitle, setConfirmPDFTitle] = useState('');
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });

  const notificationSystem = React.createRef();

  function xScrollIntoView(id, number) {
    setTimeout(() => {
      if (document.getElementById(id) !== null) {
        document.getElementById(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, number);
  }

  // #region generate PDF
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const cancelToken = axios.CancelToken.source();

    async function htmlToPdfFn() {
      const pdfstatus = await getPDF({
        pdfTitle: title,
        pdfListItems,
        cancelToken: cancelToken.token,
        signal,
        setConfirmPDFTitle,
      });
      if (pdfstatus === undefined) {
        handlePDFDownloadLoader(false);
        handlePDFDownloadNotification(false);
      } else if (pdfstatus.pdfstatus && pdfstatus.error === '') {
        await handleGeneratePDF({
          pdfstatus: pdfstatus.pdfstatus,
          pdffileURL: pdfstatus.pdffileURL,
          error: pdfstatus.error,
        });
        handlePDFDownloadLoader(false);
        handlePDFDownloadNotification(true);
        handlePDFDownloadCancelClick(false);
      } else if (!pdfstatus.pdfstatus && pdfstatus.error !== '') {
        await handleGeneratePDF({
          pdfstatus: pdfstatus.pdfstatus,
          pdffileURL: pdfstatus.pdffileURL,
          error: pdfstatus.error,
        });
        handlePDFDownloadLoader(false);
        handlePDFDownloadNotification(true);
        handlePDFDownloadCancelClick(false);
      } else {
        handlePDFDownloadLoader(false);
        handlePDFDownloadNotification(false);
        handlePDFDownloadCancelClick(true);
      }
    }

    if (pdfDownloadLoader) {
      handleResetpdfDownloadStartNotification();
      htmlToPdfFn();
    }
    return function cleanup() {
      cancelToken.cancel();
      abortController.abort();
    };
  }, [
    pdfDownloadLoader,
    handleGeneratePDF,
    generatePDF.pdfstatus,
    pdfDownloadCancelBtn,
  ]);

  // Notification
  useEffect(() => {
    const abortController = new AbortController();
    if (pdfDownloadNotification) {
      handleResetpdfDownloadStartNotification();
      generatePDFNotification();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [pdfDownloadNotification]);
  useEffect(() => {
    const abortController = new AbortController();
    if (pdfDownloadStartNotification) {
      generatePDFDownloadStartNotification();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [pdfDownloadStartNotification]);

  useEffect(() => {
    const abortController = new AbortController();
    if (notificationDataPopup.length) {
      notificationAlert();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [notificationDataPopup.length, notificationDataPopup]);

  function ResetPDF_AfterGeneratePDF() {
    handlePDFDownloadNotification(false);
    handlePDFDownloadCancelClick(false);
    handlePDFDownloadLoader(false);
    handleGeneratePDF({
      pdfstatus: false,
      pdffileURL: '',
      error: '',
    });
  }
  function generatePDFNotification() {
    const notification = notificationSystem.current;
    if (notification !== null && generatePDF.error === '') {
      notification.addNotification({
        level: 'info',
        position: 'br',
        autoDismiss: null,
        dismissible: true,
        onRemove: function removed() {
          ResetPDF_AfterGeneratePDF();
        },
        children: (
          <div className='pdfBorder'>
            <div className='notifications-wrapper fadeInAnimation'>
              <div className='notifications-{position}'>
                <div
                  className='alert-notificaitons'
                  onClick={async (e) => {
                    e.preventDefault();
                    if (generatePDF.pdffileURL !== '') {
                      window.open(generatePDF.pdffileURL);
                    }
                    ResetPDF_AfterGeneratePDF();
                  }}
                >
                  <div className='alert-notification-title'>
                    <span className=''>
                      <b>
                        PDF complete :&quot;{confirmPDFTitle}&quot; <br />
                      </b>
                    </span>
                  </div>
                  <div className='d-flex align-items-center pdf-notify-link '>
                    <div>
                      Click&nbsp;
                      <span
                        className='text-white link-alert'
                        rel='noopener noreferrer'
                        onClick={async (e) => {
                          e.preventDefault();
                          if (generatePDF.pdffileURL !== '') {
                            window.open(generatePDF.pdffileURL);
                          }
                          ResetPDF_AfterGeneratePDF();
                        }}
                      >
                        <u>here</u>
                      </span>
                      &nbsp; to download.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      });
    } else if (notification !== null && generatePDF.error !== '') {
      notification.addNotification({
        level: 'error',
        position: 'br',
        dismissible: true,
        onRemove: function removed() {
          ResetPDF_AfterGeneratePDF();
        },
        children: (
          <>
            <div className='notifications-wrapper fadeInAnimation'>
              <div className='notifications-{position}'>
                <div className='alert-notificaitons'>
                  <div className='alert-notification-title'>
                    <span className=''>
                      <b>
                        PDF Error : {generatePDF.error} <br />
                      </b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='notification-progressBar error' />
          </>
        ),
      });
    }
    if (generatePDF.error === '') {
      if (pdfListItems !== undefined) {
        let arrayOfModule = [];
        const splitText = window.origin;
        arrayOfModule = pdfListItems
          .filter((item) => (item.checked ? item.module : ''))
          .map((item) => item.to.split(`${splitText}/`)[1].split('?')[0])
          .filter((v, i, a) => a.indexOf(v) === i);
        arrayOfModule.forEach((element) => {
          handleVisitorLog(`/${element}/PDF_Download`, window.location.search);
        });
      }
    }
  }
  function notificationAlert() {
    const alertNotification = notificationSystem.current;
    if (alertNotification !== null) {
      notificationDataPopup.map((itemN, i) => {
        const item = itemN;
        return setTimeout(() => {
          alertNotification.addNotification({
            level: 'info',
            position: 'br',
            autoDismiss: 10,
            dismissible: true,
            onAdd: function move() {
              const elem = document.getElementsByClassName(
                'notification-progressBar'
              );
              let width = 100;
              const id = setInterval(frame, 100);
              function frame() {
                if (width <= 0) {
                  clearInterval(id);
                } else {
                  width -= 1;
                  Object.keys(elem).forEach((items) => {
                    if (elem[items].id === `${item.alert_inbox_id}`) {
                      elem[items].style.width = `${width}%`;
                    }
                  });
                }
              }
            },
            children: (
              <>
                <div className='notifications-wrapper fadeInAnimation'>
                  <div className='notifications-{position}'>
                    <div className='alert-notificaitons'>
                      <p className='alert-notification-title m-0'>
                        {item.alert_option_id === 1 ||
                        item.alert_option_id === 3 ||
                        item.alert_option_id === 14 ||
                        item.alert_option_id === 19 ? (
                          <>
                            <span className=''>
                              <b>{item.type.toUpperCase()}:</b>
                              {item.info}
                            </span>
                          </>
                        ) : (
                          <span className=''>
                            <b>{item.type.toUpperCase()}:</b>
                          </span>
                        )}
                        <span>
                          {item.filing_type !== null &&
                            item.filing_type !== undefined && (
                              <>
                                <b>Type:</b> {item.filing_type}
                              </>
                            )}
                        </span>
                        <span>
                          {item.Company_name !== null &&
                            item.Company_name !== undefined && (
                              <>
                                <b>Company: </b> {item.Company_name}
                              </>
                            )}
                        </span>
                        <span>
                          {item.investor_name !== null &&
                            item.investor_name !== undefined &&
                            item.element_type_id !== undefined &&
                            item.element_type_id === 41 && (
                              <>
                                <b>Short seller:</b> {item.investor_name}
                              </>
                            )}
                          {item.investor_name !== null &&
                            item.investor_name !== undefined &&
                            (item.element_type_id === undefined ||
                              item.element_type_id !== 41) && (
                              <>
                                <b>Investor:</b> {item.investor_name}
                              </>
                            )}
                        </span>
                        <span>
                          {item.meeting_date !== null &&
                            item.meeting_date !== undefined && (
                              <p>
                                <b>Meeting Date:</b>
                                {dateToNull(
                                  item.meeting_date,
                                  'dd-mmm-yyyy',
                                  true
                                )}
                              </p>
                            )}
                        </span>
                        <span>
                          {item.alert_name !== null &&
                          item.alert_name !== undefined ? (
                            item.element_type_id === 151 ||
                            item.element_type_id === 152 ||
                            item.element_type_id === 161 ||
                            item.element_type_id === 162 ||
                            item.element_type_id === 171 ||
                            item.element_type_id === 172 ||
                            item.element_type_id === 173 ||
                            item.element_type_id === 61 ||
                            item.element_type_id === 62 ||
                            item.element_type_id === 51 ? (
                              <>
                                <b>Alert Name:</b> {item.alert_name}
                              </>
                            ) : (
                              ''
                            )
                          ) : (
                            ''
                          )}
                        </span>
                        <span>
                          {item.investor_profile_name !== null &&
                            item.investor_profile_name !== undefined && (
                              <>
                                <b>Investor Profile Name: </b>
                                {item.investor_profile_name}
                              </>
                            )}
                        </span>
                      </p>
                      <div className='d-flex align-items-center alert-notify-link'>
                        <div>
                          Click&nbsp;
                          <span
                            className='text-white link-alert'
                            rel='noopener noreferrer'
                            onClick={async (e) => {
                              await updateAlertStatusReq(item.alert_inbox_id);
                              await handleOnClickNotification({
                                alert_inbox_id: item.alert_inbox_id,
                              });
                              await getElementDetailReq({
                                element_type_id: item.element_type_id,
                                alert_inbox_id: item.alert_inbox_id,
                                alert_data: item,
                              });
                              await getInboxAlertByUserReq({
                                alert_id: item.alert_id,
                                alert_inbox_id: item.alert_inbox_id,
                              });
                              history.push(MY_ALERT_INBOX);
                              e.preventDefault();
                            }}
                          >
                            <u>here</u>
                          </span>
                          &nbsp; to view.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='notification-progressBar'
                  id={item.alert_inbox_id}
                />
              </>
            ),
          });
        }, 500 * i);
      });
    }
  }
  function generatePDFDownloadStartNotification() {
    const alertNotification = notificationSystem.current;
    if (alertNotification !== null) {
      alertNotification.addNotification({
        level: 'info',
        position: 'br',
        autoDismiss: 10,
        dismissible: true,
        children: (
          <>
            <div className='notifications-wrapper fadeInAnimation'>
              <div className='notifications-{position}'>
                <div className='alert-notificaitons'>
                  <p className='alert-notification-title m-0'>
                    PDF Download Started
                  </p>
                </div>
              </div>
            </div>
          </>
        ),
      });
    }
  }
  // #endregion

  return (
    !query.print && (
      <div className='px-3 titleSection mainTitleBar'>
        {title !== '' && (
          <>
            <div className={bem.e('')}>
              <div className='row mt-2 mb-2'>
                {title === InvestorTitle &&
                  typeof company_logo !== 'object' &&
                  company_logo !== null &&
                  company_logo !== 'null' &&
                  company_logo !== '' && (
                    <div className='col-1 d-flex justify-content-center titleComponentLogo'>
                      <img
                        src={`${COMPANY_LOGO_PATH}${company_logo}`}
                        style={{
                          height: '80px',
                          width: '100px',
                          overflow: 'visible',
                          objectFit: 'contain',
                        }}
                        alt='icon'
                      />
                    </div>
                  )}

                <div className='col-11'>
                  <div className='row'>
                    <div className='col-12'>
                      {title && typeof title === 'string' ? (
                        <h1 className={bem.e('title')}>{title}</h1>
                      ) : (
                        title
                      )}
                    </div>
                    <div className='col-12'>
                      {title !== '' && breadcrumbs && (
                        <nav aria-label='breadcrumb'>
                          <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                              <a
                                href={pathConst.DASHBOARD}
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.replace(pathConst.DASHBOARD);
                                }}
                              >
                                Home
                              </a>
                            </li>
                            {breadcrumbs.length &&
                              breadcrumbs.map(
                                ({ name, active, isLink, url }, index) =>
                                  isLink ? (
                                    <li
                                      className='breadcrumb-item active'
                                      key={`breadcrumb_${index + 1}`}
                                      active={active}
                                      aria-current='page'
                                    >
                                      <a
                                        href='/'
                                        rel='noopener noreferrer'
                                        onClick={(e) => {
                                          e.preventDefault();
                                          history.replace(url);
                                          xScrollIntoView(name);
                                        }}
                                      >
                                        {name}
                                      </a>
                                    </li>
                                  ) : (
                                    <li
                                      className='breadcrumb-item active'
                                      key={`breadcrumbactive_${index + 2}`}
                                      active={active}
                                      aria-current='page'
                                    >
                                      {name}
                                    </li>
                                  )
                              )}
                          </ol>
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {headers}
          </>
        )}
        {
          <div className='alert-notify pdfNotification'>
            <NotificationSystem
              ref={notificationSystem}
              style={ALERT_NOTIFICATION_SYSTEM_STYLE}
            />
          </div>
        }
        {
          notificationDataPopup.length > 0 && (
            <div className='alert-notify'>
              <NotificationSystem
                ref={notificationSystem}
                style={ALERT_NOTIFICATION_SYSTEM_STYLE}
              />
            </div>
          )
        }
      </div>
    )
  );
};

TitleComponent.propTypes = {
  breadcrumbs: PropTypes.array,
  handlePDFDownloadNotification: PropTypes.func,
  handleGeneratePDF: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  headers: PropTypes.any,
  pdfDownloadNotification: PropTypes.any.isRequired,
  handlePDFDownloadLoader: PropTypes.func,
  generatePDF: PropTypes.object.isRequired,
  pdfDownloadLoader: PropTypes.bool.isRequired,
  pdfListItems: PropTypes.array,
  title: PropTypes.any,
  company_logo: PropTypes.any,
};

TitleComponent.defaultProps = {
  breadcrumbs: [],
  handlePDFDownloadNotification: () => {},
  handlePDFDownloadLoader: () => {},
  handleGeneratePDF: () => {},
  handleVisitorLog: () => {},
  pdfListItems: [],
  title: undefined,
  company_logo: null,
};
export default React.memo(TitleComponent);
