import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import bn from '../../utils/bemnames';
import { history } from '../../utils/navigation-util';
import { MY_ALERT_NEW, MY_ALERT_EXISTING_ALERT, MY_ALERT_INBOX } from '../../constants/PathsConstant';
import { NUMBER_ONE } from '../../constants/NumberConstants';

const bem = bn.create('navigatio-utils');

const MyAlertHeader = (props) => {
  const {
    selectNavOutsideClick,
    handleNavOutsideClick,
    isNavbarSelectionClick,
    setNavbarSelectionClick,
    handleResetBreadcrumbs,
    handleVisitorLog,
    handleResetCompanyPath,
    selectedHoverSubmenu,
    handleGlobleResetMyAlert,
    lstAlertModuleAccess
  } = props;

  const navItems = [
    {
      to: MY_ALERT_NEW,
      name: 'New Alerts',
      exact: false,
      disabled: false,
      firstChild: MY_ALERT_NEW
    },
    {
      to: MY_ALERT_EXISTING_ALERT,
      name: 'Existing Alerts',
      exact: false,
      disabled: lstAlertModuleAccess.existing_alert === !NUMBER_ONE,
      firstChild: MY_ALERT_EXISTING_ALERT
    },
    {
      to: MY_ALERT_INBOX,
      name: 'Alert Inbox',
      exact: false,
      disabled: lstAlertModuleAccess.inbox_alert === !NUMBER_ONE,
      firstChild: MY_ALERT_INBOX
    }
  ];

  const mobileNavItem = [
    { name: 'Alerts - New', to: MY_ALERT_NEW, handleVisitorLog, parameter: '' },
    { name: 'Alerts - Existing Alerts', to: MY_ALERT_EXISTING_ALERT, handleVisitorLog, parameter: '' },
    { name: 'Alerts - Inbox', to: MY_ALERT_INBOX, handleVisitorLog, parameter: '' }
  ];

  useEffect(() => {
    if (isNavbarSelectionClick === '') {
      setNavbarSelectionClick(mobileNavItem.find((item) => item.to === props.location.pathname).name);
    }
  }, [setNavbarSelectionClick, isNavbarSelectionClick, mobileNavItem, props.location.pathname]);

  return (
    <>
      <nav className='mainnavbar navbar navbar-expand-md navbar-light bg-light'>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs me-auto'>
            {navItems.map(({ to, firstChild, name, exact, disabled }, index) => (
              <li className='nav-item' key={`item${index + 1}`}>
                <NavLink
                  to={to}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    handleResetCompanyPath(to);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    history.replace({
                      pathname: firstChild,
                      search: '',
                      state: {
                        // isLoadChildContent: true,
                      }
                    });
                    handleGlobleResetMyAlert();
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
                  <div key={`inx${index + 1}`}>
                    {mobileNavItem[index].length === undefined ? (
                      <Nav.Link
                        key={`Nav${index + 1}`}
                        eventKey={`navItem-${name}-${index}`}
                        className={disabled ? 'lh-20 ms-10 border-bottom-1w disabled' : 'lh-20 ms-10 border-bottom-1w'}
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace({
                            pathname: to,
                            search: parameter,
                            state: {}
                          });
                          handleNavOutsideClick(false);
                          setNavbarSelectionClick(name);
                          handleVisitorLog(to, parameter);
                          handleResetBreadcrumbs(to);
                          handleGlobleResetMyAlert();
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
                                key={`key${index + 1}`}
                                eventKey={`navItem-${name}-${index}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.replace({
                                    pathname: to,
                                    search: parameter,
                                    state: {
                                      //isLoadChildContent: true,
                                    }
                                  });
                                  handleVisitorLog(to, parameter);
                                  handleResetBreadcrumbs(to);
                                  handleGlobleResetMyAlert();
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
    </>
  );
};

export default withRouter(React.memo(MyAlertHeader));
