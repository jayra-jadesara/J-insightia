import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { history } from '../../../utils/navigation-util';
import {
  ADVISOR_ACTIVISM_OVERVIEW,
  ADVISOR_ACTIVISM,
  ADVISOR_ACTIVISTSHORT,
  ADVISOR_VOTING,
  ADVISOR_VOTING_OVERVIEW,
  QUERY_COMPANY_ID,
  QUERY_PID,
  QUERY_PRINT,
} from '../../../constants/PathsConstant';
import { NUMBER_TWO, NUMBER_ONE, NUMBER_FOUR } from '../../../constants/NumberConstants';
import bn from '../../../utils/bemnames';
import PDFNavMenu from '../../GeneralForm/PDFNavMenu';
import prodConst from '../../../constants/ProductConstants';

const bem = bn.create('navigatio-utils');
const bem2 = bn.create('navigation-header-utils');

const AdvisorHeader = ({
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
  investor,
  meetingid,
  handlePDFDownloadNotification,
  lstModuleAccess,
  trialUserDisableDownload,
  handlePDFDownloadCancelClick,
  pdfDownloadCancelBtn,
  handleResetLoading,
  handleGeneratePDF,
  generatePDF,
  pdfDownloadLoader,
  handlePDFDownloadLoader,
  //   companyProductSelection,
}) => {
  let timer;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  let navItems = [];
  let mobileNavItem = [];
  const pdfListItem = useRef([]);

  if (investor !== undefined) {
    query.investor = investor;
  }
  if (meetingid !== undefined) {
    query.meetingid = meetingid;
  }

  navItems = [
    {
      to: ADVISOR_ACTIVISM,
      name: 'Activism',
      exact: true,
      disabled: lstModuleAccess && lstModuleAccess.activism !== NUMBER_ONE,
      firstChild: `${ADVISOR_ACTIVISM}`,
      search: `${QUERY_COMPANY_ID}${query.company_id}`,
    },
    {
      to: ADVISOR_ACTIVISTSHORT,
      name: 'Activist Shorts',
      exact: false,
      disabled: lstModuleAccess && lstModuleAccess.activist_shorts !== NUMBER_ONE,
      firstChild: `${ADVISOR_ACTIVISTSHORT}`,
      search: `${QUERY_COMPANY_ID}${query.company_id}`,
    },
    {
      to: ADVISOR_VOTING,
      name: 'Voting',
      exact: false,
      disabled: lstModuleAccess && lstModuleAccess.voting !== NUMBER_ONE,
      firstChild: `${ADVISOR_VOTING_OVERVIEW}`,
      search: `${QUERY_COMPANY_ID}${query.company_id}`,
    },
  ];
  mobileNavItem = [
    {
      handleVisitorLog,
      name: 'Activism',
      to: ADVISOR_ACTIVISM,
      parameter: `${QUERY_COMPANY_ID}${query.company_id}`,
    },
    {
      handleVisitorLog,
      name: 'Activist Shorts - Overview',
      to: ADVISOR_ACTIVISTSHORT,
      parameter: `${QUERY_COMPANY_ID}${query.company_id}`,
    },
    {
      handleVisitorLog,
      name: 'Voting - Overview',
      to: ADVISOR_VOTING_OVERVIEW,
      parameter: `${QUERY_COMPANY_ID}${query.company_id}`,
    },
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
          (item) => item.product_id === product_id && (item.status === NUMBER_FOUR || item.status === NUMBER_TWO)
        )
      ) {
        return false;
      }
    },
    [token.MemberShip]
  );

  // #region PDF list item
  const isDisableItem = useCallback(
    (product_id) => {
      if (
        token.MemberShip !== undefined &&
        token.MemberShip.some((item) => item.product_id === product_id && item.status !== NUMBER_FOUR)
      ) {
        return true;
      }
    },
    [token.MemberShip]
  );

  useEffect(() => {
    pdfListItem.current = [
      { parent: true, name: 'Activism' },
      {
        module: 'activism',
        id: 'Activism_Overview',
        to: `${window.location.origin}${ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${query.company_id}${QUERY_PRINT}`,
        name: 'Overview',
        checked: defaultChecked({
          checked: false,
          disabled:
            (lstModuleAccess && lstModuleAccess.activism !== NUMBER_ONE) || isDisableItem(prodConst.ACTIVISM)
              ? true
              : isActiveCheckBox(prodConst.ACTIVISM),
          module: 'activism',
        }),
        disabled:
          (lstModuleAccess && lstModuleAccess.activism !== NUMBER_ONE) || isDisableItem(prodConst.ACTIVISM)
            ? true
            : isActiveCheckBox(prodConst.ACTIVISM),
      },
      { parent: true, name: 'Activist Shorts' },
      {
        module: 'activistshorts',
        id: 'ActivistShorts_Overview',
        to: `${window.location.origin}${ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${query.company_id}${QUERY_PRINT}`,
        name: 'Overview',
        checked: defaultChecked({
          checked: false,
          disabled:
            (lstModuleAccess && lstModuleAccess.activist_shorts !== NUMBER_ONE) ||
            isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
          module: 'activistshorts',
        }),
        disabled:
          (lstModuleAccess && lstModuleAccess.activist_shorts !== NUMBER_ONE) ||
          isDisableItem(prodConst.ACTIVIST_SHORTS)
            ? true
            : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
      },
      { parent: true, name: 'Voting' },
      {
        module: 'voting',
        id: 'Voting_Overview',
        to: `${window.location.origin}${ADVISOR_VOTING_OVERVIEW}${QUERY_COMPANY_ID}${query.company_id}${QUERY_PRINT}`,
        name: 'No Action',
        checked: defaultChecked({
          checked: false,
          disabled:
            (lstModuleAccess && lstModuleAccess.voting !== NUMBER_ONE) || isDisableItem(prodConst.VOTING)
              ? true
              : isActiveCheckBox(prodConst.VOTING),
          module: 'voting',
        }),
        disabled:
          (lstModuleAccess && lstModuleAccess.voting !== NUMBER_ONE) || isDisableItem(prodConst.VOTING)
            ? true
            : isActiveCheckBox(prodConst.VOTING),
      },
    ];
  }, [isActiveCheckBox, lstModuleAccess]);

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
  }, [callbackHandlePDFListItems, lstModuleAccess]);
  // #endregion

  // Mobile view
  useEffect(() => {
    const abortController = new AbortController();
    if (isNavbarSelectionClick === '' && mobileNavItem.find((item) => item.to === location.pathname)) {
      setNavbarSelectionClick(mobileNavItem.find((item) => item.to === location.pathname).name);
      handleHoverSubmenu(location.pathname);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [setNavbarSelectionClick, isNavbarSelectionClick, mobileNavItem, handleHoverSubmenu, location.pathname, lstModuleAccess]);

  return (
    <>
      <nav className={bem2.b('mainnavbar navbar navbar-expand-md navbar-light bg-light')}>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs mr-auto'>
            {navItems.map(({ to, firstChild, search, name, exact, disabled }, index) => (
              <li className='nav-item' key={`nav-item${index + 1}`}>
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
                    if (firstChild !== ADVISOR_ACTIVISM_OVERVIEW) {
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
            ))}
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
                selectNavOutsideClick ? handleNavOutsideClick(false) : handleNavOutsideClick(true);
              }}
            >
              <div className='d-flex'>
                <div className='d-inline-block divTitle'>
                  <span className='titleSelection' title={isNavbarSelectionClick}>
                    {isNavbarSelectionClick}
                  </span>
                </div>
                <div className='d-inline-block w-100'>
                  <span className='float-end navbar-toggler-icon' />
                </div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse style={{ border: '2px solid white' }} id='responsive-navbar-nav'>
              <Nav className='ms-auto scrollbar scrollBarSection w-100'>
                {mobileNavItem.map(({ name, to, parameter, disabled, handleVisitorLog }, index) => (
                  <div key={`navitem_top${index + 1}`}>
                    {mobileNavItem[index].length === undefined ? (
                      <Nav.Link
                        key={`navitemunder_${index + 1}`}
                        eventKey={`navItem-${name}-${index}`}
                        className={
                          isNavbarSelectionClick === name
                            ? 'lh-20 ms-10 border-bottom-1w active'
                            : disabled
                            ? 'lh-20 ms-10 border-bottom-1w disabled'
                            : 'lh-20 ms-10 border-bottom-1w'
                        }
                        // className={disabled ? "lh-20 ms-10 border-bottom-1w disabled" : "lh-20 ms-10 border-bottom-1w"}
                        onClick={(e) => {
                          e.preventDefault();
                          history.push({
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
                      <NavDropdown title={mobileNavItem[index][0].title} id='collasible-nav-dropdown'>
                        {mobileNavItem[index].map(
                          ({ name, to, parameter, disabled, handleVisitorLog }, index) =>
                            to !== undefined &&
                            parameter !== undefined && (
                              <NavDropdown.Item
                                className={disabled ? 'disabled' : ''}
                                key={`NavDropdown_${index + 1}`}
                                eventKey={`navItem-${name}-${index}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.push({
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
                ))}
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

AdvisorHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleNavOutsideClick: PropTypes.func,
  handlePDFDownloadNotification: PropTypes.func,
  handlePDFListItems: PropTypes.func,
  handlePDFMenuShow: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  isNavbarSelectionClick: PropTypes.string,
  location: PropTypes.object,
  meetingid: PropTypes.string,
  pdfDownloadNotification: PropTypes.bool,
  pdfListItems: PropTypes.array,
  pdfMenuShow: PropTypes.bool,
  selectNavOutsideClick: PropTypes.bool,
  selectedHoverSubmenu: PropTypes.any,
  setNavbarSelectionClick: PropTypes.func,
  token: PropTypes.object.isRequired,
};

AdvisorHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleNavOutsideClick: () => {},
  handlePDFDownloadNotification: () => {},
  handlePDFListItems: () => {},
  handlePDFMenuShow: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  isNavbarSelectionClick: '',
  location: {},
  meetingid: '',
  pdfDownloadNotification: false,
  pdfListItems: [],
  pdfMenuShow: false,
  selectNavOutsideClick: false,
  setNavbarSelectionClick: () => {},
  selectedHoverSubmenu: '',
};

export default withRouter(React.memo(AdvisorHeader));
