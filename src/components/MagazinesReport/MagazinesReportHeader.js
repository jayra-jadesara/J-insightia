import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { history } from '../../utils/navigation-util';
import pathConst from '../../constants/PathsConstant';
import bn from '../../utils/bemnames';

const bem = bn.create('navigatio-utils');

const MagazinesReportHeader = (props) => {
  const {
    selectNavOutsideClick,
    handleNavOutsideClick,
    isNavbarSelectionClick,
    setNavbarSelectionClick,
    handleResetBreadcrumbs,
    handleResetCompanyPath,
    selectedHoverSubmenu
  } = props;

  let timer;
  const navItems = [
    // {
    //   to: pathConst.ACTIVISM_MONTHLY,
    //   name: 'Activism Monthly',
    //   exact: true,
    //   disabled: false,
    //   firstChild: pathConst.ACTIVISM_MONTHLY,
    // },
    // {
    //   to: pathConst.PROXY_MONTHLY,
    //   name: 'Proxy Monthly',
    //   exact: false,
    //   disabled: false,
    //   firstChild: pathConst.PROXY_MONTHLY,
    // },
    // {
    //   to: pathConst.SPECIAL_REPORTS,
    //   name: 'Special Reports',
    //   exact: false,
    //   disabled: false,
    //   firstChild: pathConst.SPECIAL_REPORTS,
    // },
    {
      to: pathConst.LATEST_REPORTS,
      name: 'Latest',
      exact: true,
      disabled: false,
      firstChild: pathConst.LATEST_REPORTS
    },
    {
      to: pathConst.ACTIVISM_LATEST_REPORTS,
      name: 'Activism',
      exact: false,
      disabled: false,
      firstChild: pathConst.ACTIVISM_LATEST_REPORTS
    },
    {
      to: pathConst.VOTING_LATEST_REPORTS,
      name: 'Voting',
      exact: false,
      disabled: false,
      firstChild: pathConst.VOTING_LATEST_REPORTS
    },
    {
      to: pathConst.SHORTS_LATEST_REPORTS,
      name: 'Activist Shorts',
      exact: false,
      disabled: false,
      firstChild: pathConst.SHORTS_LATEST_REPORTS
    },
    {
      to: pathConst.GOVERNANCE_LATEST_REPORTS,
      name: 'Governance',
      exact: false,
      disabled: false,
      firstChild: pathConst.GOVERNANCE_LATEST_REPORTS
    },
    {
      to: pathConst.SEARCH_ALLREPORTS,
      name: 'Search All Reports',
      exact: false,
      disabled: false,
      firstChild: pathConst.SEARCH_ALLREPORTS
    }
  ];

  const mobileNavItem = [
    // {
    //   name: 'Activism Monthly',
    //   to: pathConst.ACTIVISM_MONTHLY,
    //   handleVisitorLog: props.handleVisitorLog,
    //   handleResetLoading: props.handleResetLoading,
    //   parameter: '',
    // },
    // {
    //   handleVisitorLog: props.handleVisitorLog,
    //   handleResetLoading: props.handleResetLoading,
    //   name: 'Proxy Monthly',
    //   to: pathConst.PROXY_MONTHLY,
    //   parameter: '',
    // },
    // {
    //   handleVisitorLog: props.handleVisitorLog,
    //   handleResetLoading: props.handleResetLoading,
    //   name: 'Special Reports',
    //   to: pathConst.SPECIAL_REPORTS,
    //   parameter: '',
    //   //   disabled: true,
    // },
    {
      name: 'Latest',
      to: pathConst.LATEST_REPORTS,
      handleResetLoading: props.handleResetLoading,
      parameter: ''
    },
    {
      name: 'Activism',
      to: pathConst.ACTIVISM_LATEST_REPORTS,
      handleResetLoading: props.handleResetLoading,
      parameter: ''
    },
    {
      name: 'Voting',
      to: pathConst.VOTING_LATEST_REPORTS,
      handleResetLoading: props.handleResetLoading,
      parameter: ''
    },
    {
      name: 'Activist Shorts',
      to: pathConst.SHORTS_LATEST_REPORTS,
      handleResetLoading: props.handleResetLoading,
      parameter: ''
    },
    {
      name: 'Governance',
      to: pathConst.GOVERNANCE_LATEST_REPORTS,
      handleResetLoading: props.handleResetLoading,
      parameter: ''
    },
    {
      handleResetLoading: props.handleResetLoading,
      name: 'Search All Reports',
      to: pathConst.SEARCH_ALLREPORTS,
      parameter: ''
    }
  ];

  useEffect(() => {
    if (
      isNavbarSelectionClick === '' &&
      mobileNavItem.find((item) => item.to === props.location.pathname)
    ) {
      setNavbarSelectionClick(
        mobileNavItem.find((item) => item.to === props.location.pathname).name
      );
      props.handleHoverSubmenu(props.location.pathname);
    }
  }, [setNavbarSelectionClick, isNavbarSelectionClick, mobileNavItem, props]);

  return (
    <div>
      <nav className='mainnavbar navbar navbar-expand-md navbar-light bg-light'>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs mr-auto'>
            {navItems.map(
              ({ to, firstChild, name, exact, disabled }, index) => (
                <li className='nav-item' key={`key${index + 1}`}>
                  <NavLink
                    to={to}
                    onMouseMove={(e) => {
                      e.preventDefault();
                      clearTimeout(timer);
                      timer = setTimeout(stopmouse, 300);
                      function stopmouse() {
                        handleResetCompanyPath(to);
                      }
                    }}
                    onMouseOut={() => {
                      clearTimeout(timer);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push({
                        pathname: firstChild.split('?')[0],
                        search: firstChild.split('?')[1],
                        state: {
                          isLoadChildContent: true
                        }
                      });
                      handleResetBreadcrumbs(firstChild.split('?')[0]);
                      handleResetCompanyPath(firstChild.split('?')[0]);
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
                  ({ name, to, parameter, disabled }, index) => (
                    <div key={`key${index + 1}`}>
                      {mobileNavItem[index].length === undefined ? (
                        <Nav.Link
                          key={`lnk${index + 1}`}
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
                                isLoadChildContent: true
                              }
                            });
                            handleNavOutsideClick(false);
                            setNavbarSelectionClick(name);
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
                            ({ name, to, parameter, disabled }, index) =>
                              to !== undefined &&
                              parameter !== undefined && (
                                <NavDropdown.Item
                                  className={disabled ? 'disabled' : ''}
                                  key={`disabled${index + 1}`}
                                  eventKey={`navItem-${name}-${index}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    history.push({
                                      pathname: to,
                                      search: parameter,
                                      state: {
                                        isLoadChildContent: true
                                      }
                                    });
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
    </div>
  );
};

MagazinesReportHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleNavOutsideClick: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetLoading: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  isNavbarSelectionClick: PropTypes.string,
  location: PropTypes.object,
  selectNavOutsideClick: PropTypes.bool,
  setNavbarSelectionClick: PropTypes.func
};

MagazinesReportHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleNavOutsideClick: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetLoading: () => {},
  handleVisitorLog: () => {},
  isNavbarSelectionClick: '',
  location: {},
  selectNavOutsideClick: false,
  setNavbarSelectionClick: () => {}
};

export default withRouter(MagazinesReportHeader);
