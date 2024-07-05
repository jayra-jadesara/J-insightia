import React, { useCallback, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { SlideDown } from 'react-slidedown';
import qs from 'qs';
import PropTypes from 'prop-types';
import { history } from '../../../utils/navigation-util';
import pathConst, { DIRECTORSHIP_AND_EXECUTIVE, QUERY_DIRECTOR, QUERY_PRINT, PEOPLE_COMPENSATION, COMPENSATION } from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import prodConst from '../../../constants/ProductConstants';
import Checkbox from '../../GeneralForm/CheckboxComponent';
import { NUMBER_FOUR } from '../../../constants/NumberConstants';
import PDFNavMenu from '../../GeneralForm/PDFNavMenu';

const bem = bn.create('navigatio-utils');
const bem2 = bn.create('navigation-header-utils');
const headerbem = bn.create('header');

const PeopleHeader = ({
  location,
  handleVisitorLog,
  token,
  handleHoverSubmenu,
  handlePDFListItems,
  pdfListItems,
  handleResetCompanyPath,
  selectedHoverSubmenu,
  handlePDFMenuShow,
  pdfMenuShow,
  pdfDownloadNotification,
  selectNavOutsideClick,
  handleNavOutsideClick,
  isNavbarSelectionClick,
  setNavbarSelectionClick,
  handleResetBreadcrumbs,
  director_id,
  meetingid,
  lstModuleAccess,
  trialUserDisableDownload,
  handlePDFDownloadNotification,
  handlePDFDownloadCancelClick,
  pdfDownloadCancelBtn,
  handleResetLoading,
  handleGeneratePDF,
  generatePDF,
  pdfDownloadLoader,
  handlePDFDownloadLoader,
  compensationNoData,
  people_data
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  let navItems = [];
  let mobileNavItem = [];
  let timer;
  const pdfListItem = useRef([]);

  if (director_id !== undefined) {
    query.director_id = director_id;
  }
  if (meetingid !== undefined) {
    query.meetingid = meetingid;
  }

  navItems = [
    {
      to: pathConst.PEOPLE_OVERVIEW,
      name: 'Overview',
      exact: true,
      disabled: false,
      firstChild: `${pathConst.PEOPLE_OVERVIEW}`,
      search: `${QUERY_DIRECTOR}${query.director_id}`
    },
    {
      to: pathConst.DIRECTORSHIP_AND_EXECUTIVE,
      name: 'Governance',
      exact: true,
      disabled: !people_data.governance,
      firstChild: `${pathConst.DIRECTORSHIP_AND_EXECUTIVE}`,
      search: `${QUERY_DIRECTOR}${query.director_id}`
    },
    {
      to: pathConst.PEOPLE_COMPENSATION,
      name: 'Compensation',
      exact: true,
      disabled: !people_data.compensation,
      firstChild: `${pathConst.PEOPLE_COMPENSATION}`,
      search: `${QUERY_DIRECTOR}${query.director_id}`
    }
  ];
  mobileNavItem = [
    {
      handleVisitorLog,
      name: 'Director & Executive',
      to: pathConst.DIRECTORSHIP_AND_EXECUTIVE,
      parameter: `${QUERY_DIRECTOR}${director_id}`
    },
    {
      handleVisitorLog,
      name: 'Compensation',
      to: pathConst.PEOPLE_COMPENSATION,
      parameter: `${QUERY_DIRECTOR}${director_id}`
    }
  ];

  function defaultChecked(element) {
    const { checked } = element;
    const { disabled } = element;
    const { module } = element;
    if (!disabled) {
      if (checked) {
        return checked;
      }
      if (window.location.pathname.split('/')[2] === module && !checked) {
        return true;
      }
      if (window.location.pathname.split('/')[2] === module && checked) {
        return false;
      }
      return false;
    }
    return false;
  }

  const isActiveCheckBox = useCallback(
    (product_id) => {
      if (
        token.MemberShip !== undefined &&
        token.MemberShip.some(
          (item) =>
            item.product_id === product_id && item.status === NUMBER_FOUR
        )
      ) {
        return false;
      }
    },
    [token.MemberShip]
  );
  const isDisableItem = useCallback(
    (product_id) => {
      if (
        token.MemberShip !== undefined &&
        token.MemberShip.some(
          (item) =>
            item.product_id === product_id && item.status !== NUMBER_FOUR
        )
      ) {
        return true;
      }
    },
    [token.MemberShip]
  );

  pdfListItem.current = [
    {
      id: 'People_Overview',
      module: 'overview',
      to: `${window.location.origin}${pathConst.PEOPLE_OVERVIEW}${QUERY_DIRECTOR}${query.director_id}${QUERY_PRINT}`,
      name: 'People Overview',
      checked: defaultChecked({
        checked: false,
        disabled: false,
        module: 'overview',
      }),
    },
    { parent: true, name: 'Directorship & Executive' },
    {
      module: 'directorshipandexecutive',
      id: 'Directorship_And_Executive',
      to: `${window.location.origin}${DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${query.director_id}${QUERY_PRINT}`,
      name: 'Directorship_And_Executive',
      checked: defaultChecked({
        checked: false,
        disabled: isDisableItem(prodConst.GOVERNANCE) ? true : isActiveCheckBox(prodConst.GOVERNANCE),
        module: 'directorshipandexecutive',
      }),
      disabled: isDisableItem(prodConst.GOVERNANCE),
    },
    // { parent: true, name: 'Compensation' },
    // {
    //   module: 'compensation',
    //   id: 'Compensation',
    //   to: `${window.location.origin}${PEOPLE_COMPENSATION}${QUERY_DIRECTOR}${query.director_id}${QUERY_PRINT}`,
    //   name: 'Compensation',
    //   checked: defaultChecked({
    //     checked: false,
    //     disabled: !(people_data.compensation && !compensationNoData),
    //     module: 'compensation',
    //   }),
    //   disabled: !(people_data.compensation && !compensationNoData),
    // },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    if (
      isNavbarSelectionClick === '' &&
      mobileNavItem.find((item) => item.to === location.pathname)
    ) {
      setNavbarSelectionClick(
        mobileNavItem.find((item) => item.to === location.pathname).name
      );
      handleHoverSubmenu(location.pathname);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    setNavbarSelectionClick,
    isNavbarSelectionClick,
    mobileNavItem,
    handleHoverSubmenu,
    location.pathname,
  ]);
  const callbackHandlePDFListItems = useCallback(
    (pdfListItem) => {
      handlePDFListItems(pdfListItem);
    },
    [handlePDFListItems]
  );

  useEffect(() => {
    const abortController = new AbortController();

    callbackHandlePDFListItems(pdfListItem.current);
    return function cleanup() {
      abortController.abort();
    };
  }, [callbackHandlePDFListItems]);

  const handleClick = async (e) => {
    let array = [];
    array = pdfListItems.map((item) =>
      item.id === e.target.id
        ? {
            ...item,
            checked: e.target.checked,
          }
        : item
    );
    await handlePDFListItems(array);
  };

  if (people_data === '' && people_data === undefined) {
    return null;
  }

  return (
    <>
      <nav
        className={bem2.b(
          'mainnavbar navbar navbar-expand-md navbar-light bg-light'
        )}
      >
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs mr-auto'>
            {navItems.map(
              ({ to, firstChild, search, name, exact, disabled }, index) => (
                <li className='nav-item' key={`inx${index + 1}`}>
                  <NavLink
                    to={to + search}
                    onMouseMove={(e) => {
                      e.preventDefault();
                      clearTimeout(timer);
                      timer = setTimeout(stopmouse, 300);
                      function stopmouse() {
                        handleResetCompanyPath(to);
                      }
                    }}
                    onMouseOut={(e) => {
                      e.preventDefault();
                      clearTimeout(timer);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push({
                        pathname: firstChild,
                        search: search,
                        state: {
                          isLoadChildContent: true,
                        },
                      });
                      if (firstChild !== pathConst.DIRECTORSHIP_AND_EXECUTIVE) {
                        handleVisitorLog(firstChild, search);
                      }
                    }}
                    className={
                      selectedHoverSubmenu === to
                        ? 'nav-link primary-link active'
                        : disabled
                        ? 'nav-link primary-link disabled'
                        : 'nav-link primary-link'
                    }
                    activeClassName={disabled ? '' : 'active'}
                    id={`navItem-${name}-${index}`}
                    exact={exact}
                  >
                    {name}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
      {/* mobile */}
      <div className={bem.b('')}>
        <nav className='mobilenavbar navbar navbar-expand-md navbar-light bg-light'>
          <Navbar
            className='w-100 navbar-toggler border-color-white p-0'
            collapseOnSelect
            expanded={selectNavOutsideClick}
            expand='lg'
            variant='dark'
            onBlur={(e) => {
              e.preventDefault();
              selectNavOutsideClick && handleNavOutsideClick(false);
            }}
          >
            <Navbar.Toggle
              className='w-100 bg-primary btnToogle'
              aria-controls='responsive-navbar-nav'
              onClick={(e) => {
                e.preventDefault();
                selectNavOutsideClick
                  ? handleNavOutsideClick(false)
                  : handleNavOutsideClick(true);
              }}
            >
              <div className='d-flex'>
                <div className='d-inline-block divTitle'>
                  <span
                    className='titleSelection'
                    title={isNavbarSelectionClick}
                  >
                    {isNavbarSelectionClick}
                  </span>
                </div>
                <div className='d-inline-block w-100'>
                  <span className='float-end navbar-toggler-icon' />
                </div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse
              style={{ border: '2px solid white' }}
              id='responsive-navbar-nav'
            >
              <Nav className='ms-auto scrollbar scrollBarSection w-100'>
                {mobileNavItem.map(
                  (
                    { name, to, parameter, disabled, handleVisitorLog },
                    index
                  ) => (
                    <div key={`map${index + 1}`}>
                      {mobileNavItem[index].length === undefined ? (
                        <Nav.Link
                          key={`key${index + 1}`}
                          eventKey={`navItem-${name}-${index}`}
                          className={
                            isNavbarSelectionClick === name
                              ? 'lh-20 ms-10 border-bottom-1w active'
                              : disabled
                              ? 'lh-20 ms-10 border-bottom-1w disabled'
                              : 'lh-20 ms-10 border-bottom-1w'
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            history.replace({
                              pathname: to,
                              search: parameter,
                              state: {
                                isLoadChildContent: true,
                              },
                            });
                            handleNavOutsideClick(false);
                            setNavbarSelectionClick(name);
                            handleVisitorLog(to, parameter);
                            handleResetBreadcrumbs(to);
                          }}
                        >
                          {name}
                        </Nav.Link>
                      ) : (
                        <NavDropdown
                          title={mobileNavItem[index][0].title}
                          id='collasible-nav-dropdown'
                        >
                          {mobileNavItem[index].map(
                            (
                              {
                                name,
                                to,
                                parameter,
                                disabled,
                                handleVisitorLog,
                              },
                              index
                            ) =>
                              to !== undefined &&
                              parameter !== undefined && (
                                <NavDropdown.Item
                                  className={disabled ? 'disabled' : ''}
                                  key={`key${index + 1}`}
                                  eventKey={`navItem-${name}-${index}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    history.replace({
                                      pathname: to,
                                      search: parameter,
                                      state: {
                                        isLoadChildContent: true,
                                      },
                                    });
                                    handleVisitorLog(to, parameter);
                                    handleResetBreadcrumbs(to);
                                  }}
                                >
                                  {name}
                                </NavDropdown.Item>
                              )
                          )}
                        </NavDropdown>
                      )}
                    </div>
                  )
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </nav>
      </div>
      {/* PDF MENU */}
      <PDFNavMenu
        location={location}
        handleVisitorLog={handleVisitorLog}
        handleResetLoading={handleResetLoading}
        token={token}
        handleHoverSubmenu={handleHoverSubmenu}
        handlePDFListItems={handlePDFListItems}
        pdfListItems={pdfListItems}
        handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
        pdfDownloadCancelBtn={pdfDownloadCancelBtn}
        handleResetCompanyPath={handleResetCompanyPath}
        selectedHoverSubmenu={selectedHoverSubmenu}
        handlePDFMenuShow={handlePDFMenuShow}
        pdfMenuShow={pdfMenuShow}
        pdfDownloadNotification={pdfDownloadNotification}
        generatePDF={generatePDF}
        selectNavOutsideClick={selectNavOutsideClick}
        handleNavOutsideClick={handleNavOutsideClick}
        isNavbarSelectionClick={isNavbarSelectionClick}
        setNavbarSelectionClick={setNavbarSelectionClick}
        handleResetBreadcrumbs={handleResetBreadcrumbs}
        handlePDFDownloadNotification={handlePDFDownloadNotification}
        handleGeneratePDF={handleGeneratePDF}
        trialUserDisableDownload={trialUserDisableDownload}
        lstModuleAccess={lstModuleAccess}
        pdfDownloadLoader={pdfDownloadLoader}
        handlePDFDownloadLoader={handlePDFDownloadLoader}
      />
    </>
  );
};

PeopleHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleNavOutsideClick: PropTypes.func,
  handlePDFDownloadNotification: PropTypes.func,
  handleGeneratePDF: PropTypes.func,
  handlePDFListItems: PropTypes.func,
  handlePDFMenuShow: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetLoading: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  isNavbarSelectionClick: PropTypes.string,
  location: PropTypes.object,
  meetingid: PropTypes.string,
  pdfDownloadNotification: PropTypes.bool,
  generatePDF: PropTypes.object.isRequired,
  pdfListItems: PropTypes.array,
  pdfMenuShow: PropTypes.bool,
  director_id: PropTypes.any,
  selectNavOutsideClick: PropTypes.bool,
  selectedHoverSubmenu: PropTypes.any,
  setNavbarSelectionClick: PropTypes.func,
  showBylaws_Charter_GovGuidelinesTab: PropTypes.bool,
  showComplianceTab: PropTypes.bool,
  showLatestFilingsTab: PropTypes.bool,
  showPoisonPillTab: PropTypes.bool,
  showShareholderProposalsTab: PropTypes.bool,
  token: PropTypes.object.isRequired,
};

PeopleHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleNavOutsideClick: () => {},
  handlePDFDownloadNotification: () => {},
  handleGeneratePDF: () => {},
  handlePDFListItems: () => {},
  handlePDFMenuShow: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetLoading: () => {},
  handleVisitorLog: () => {},
  isNavbarSelectionClick: '',
  location: {},
  meetingid: '',
  pdfDownloadNotification: false,
  pdfListItems: [],
  pdfMenuShow: false,
  director_id: undefined,
  selectNavOutsideClick: false,
  setNavbarSelectionClick: () => {},
  showBylaws_Charter_GovGuidelinesTab: false,
  showComplianceTab: false,
  showLatestFilingsTab: false,
  showPoisonPillTab: false,
  showShareholderProposalsTab: false,
  selectedHoverSubmenu: '',
};

export default withRouter(React.memo(PeopleHeader));
