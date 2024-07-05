import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import '../../../styles/components/_popupTrialUser.scss';
import NotificationSystem from 'react-notification-system';
import bn from '../../../utils/bemnames';
import { history } from '../../../utils/navigation-util';
import pathConst from '../../../constants/PathsConstant';
import { NOTIFICATION_SYSTEM_STYLE } from '../../../utils/notificationStyle';

const bem = bn.create('title');
const Title = ({
  title,
  InvestorTitle,
  company_logo,
  breadcrumbs,
  headers,
  pdfDownloadNotification,
  handlePDFDownloadNotification,
  handleGeneratePDF,
  generatePDF,
  pdfListItems,
  handleVisitorLog,
}) => {
  const notificationSystem = React.createRef();

  useEffect(() => {
    const abortController = new AbortController();
    if (pdfDownloadNotification) {
      setTimeout(() => {
        handlePDFDownloadNotification(!pdfDownloadNotification);
      }, 60000);

      const notification = notificationSystem.current;
      if (notification !== null) {
        notification.addNotification({
          title: (
            <span className='h6'>
              <b>
                "{title}" <br /> PDF complete.
              </b>
            </span>
          ),
          message: (
            <div className='d-flex align-items-center'>
              <div>
                Click&nbsp;
                <a
                  className='text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                  href='##'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePDFDownloadNotification(!pdfDownloadNotification);
                  }}
                >
                  <u>here</u>
                </a>
                &nbsp; to download.
              </div>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  handlePDFDownloadNotification(!pdfDownloadNotification);
                }}
                className='custom-notification-dismiss notifyClosebtn'
                aria-hidden='true'
              >
                ×
              </span>
            </div>
          ),
          level: 'info',
          position: 'br',
          autoDismiss: 600000,
        });
      }

      // Create Log of pdf download module
      if (pdfListItems !== undefined) {
        let arrayOfModule = [];
        arrayOfModule = pdfListItems
          .filter((item) => (item.checked ? item.module : ''))
          .map((item) => item.to.split('3000/')[1].split('?')[0])
          .filter((v, i, a) => a.indexOf(v) === i);
        arrayOfModule.forEach((element) => {
          handleVisitorLog(`/${element}/PDF_Download`, window.location.search);
        });
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    handlePDFDownloadNotification,
    pdfDownloadNotification,
    pdfListItems,
    title,
    InvestorTitle,
    company_logo,
    handleVisitorLog,
    notificationSystem,
  ]);

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

  return (
    <div className='px-3'>
      <div className={bem.e('')}>
        <div className='row mt-2'>
          {title === people_name &&
          company_logo !== null &&
          company_logo !== 'null' &&
          company_logo !== '' ? (
            <div className='col-1 d-flex justify-content-center titleComponentLogo'>
              <img
                src=""
                style={{
                  maxWidth: '100%',
                  maxHeight: '70%',
                  overflow: 'visible',
                  objectFit: 'contain',
                }}
                alt='icon'
              />
            </div>
          ) : null}
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
                                key={index}
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
                                key={index}
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
      {title !== '' && headers}

      {pdfDownloadNotification && (
        <NotificationSystem
          dismissible={false}
          ref={notificationSystem}
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      )}
    </div>
  );
};

Title.propTypes = {
  breadcrumbs: PropTypes.array,
  handlePDFDownloadNotification: PropTypes.func,
  handleGeneratePDF: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  headers: PropTypes.any,
  pdfDownloadNotification: PropTypes.any.isRequired,
  generatePDF: PropTypes.object.isRequired,
  pdfListItems: PropTypes.array,
  title: PropTypes.string,
};

Title.defaultProps = {
  breadcrumbs: [],
  handlePDFDownloadNotification: () => {},
  handleGeneratePDF: () => {},
  handleVisitorLog: () => {},
  pdfListItems: [],
  title: '',
};
export default React.memo(Title);
