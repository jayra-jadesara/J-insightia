import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { history, getTitle } from '../../utils/navigation-util';
import pathConst from '../../constants/PathsConstant';

import bn from '../../utils/bemnames';

const bem = bn.create('navigatio-utils');

const NewsHeader = (props) => {
  const {
    selectNavOutsideClick,
    handleNavOutsideClick,
    isNavbarSelectionClick,
    setNavbarSelectionClick,
    handleResetBreadcrumbs
  } = props;
  let timer;

  const navItems = [
    {
      to: pathConst.NEWS_OVERVIEW,
      name: 'Latest',
      exact: true,
      disabled: false,
      firstChild: pathConst.NEWS_OVERVIEW
    },
    {
      to: pathConst.NEWS_ACTIVISM,
      name: getTitle(pathConst.NEWS_ACTIVISM),
      exact: false,
      disabled: props.isDisableNewsActivismLatest,
      firstChild: pathConst.NEWS_ACTIVISM_LATEST
    },
    {
      to: pathConst.NEWS_ACTIVIST_SHORT,
      name: getTitle(pathConst.NEWS_ACTIVIST_SHORT),
      exact: false,
      disabled: props.isDisableNewsActivistShort,
      firstChild: pathConst.NEWS_ACTIVIST_SHORT
    },
    {
      to: pathConst.NEWS_ACTIVIST_VULNERABILITY,
      name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY),
      exact: false,
      disabled: props.isDisableNewsActivistVulnerability,
      firstChild: pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT
    },
    {
      to: pathConst.NEWS_VOTING,
      name: getTitle(pathConst.NEWS_VOTING),
      exact: false,
      disabled: props.isDisableNewsVoting,
      firstChild: pathConst.NEWS_VOTING
    },
    // {
    //   to: pathConst.NEWS_COMPENSATION,
    //   name: getTitle(pathConst.NEWS_COMPENSATION),
    //   exact: false,
    //   disabled: props.isDisableNewsCompensation,
    //   firstChild: pathConst.NEWS_COMPENSATION
    // },
    {
      to: pathConst.NEWS_SEARCH,
      name: getTitle(pathConst.NEWS_SEARCH),
      exact: false,
      disabled: false,
      firstChild: pathConst.NEWS_SEARCH
    }
  ];

  const mobileNavItem = [
    {
      name: 'Latest',
      to: pathConst.NEWSMENU,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVISM)} - ${getTitle(
        pathConst.NEWS_ACTIVISM_LATEST
      )}`,
      to: pathConst.NEWS_ACTIVISM_LATEST,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivismLatest
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVISM)} - ${getTitle(
        pathConst.NEWS_ACTIVISM_COVID19
      )}`,
      to: pathConst.NEWS_ACTIVISM_COVID19,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivismLatest
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVISM)} - ${getTitle(
        pathConst.NEWS_ACTIVISM_THIS_WEEK
      )}`,
      to: pathConst.NEWS_ACTIVISM_THIS_WEEK,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivismLatest
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVISM)} - ${getTitle(
        pathConst.NEWS_ACTIVISM_WEEKLY_WRAP
      )}`,
      to: pathConst.NEWS_ACTIVISM_WEEKLY_WRAP,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivismLatest
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVISM)} - ${getTitle(
        pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES
      )}`,
      to: pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivismLatest
    },
    {
      name: getTitle(pathConst.NEWS_ACTIVIST_SHORT),
      to: pathConst.NEWS_ACTIVIST_SHORT,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivistShort
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY)} - ${getTitle(
        pathConst.NEWS_ACTIVIST_VULNERABILITY_LATEST
      )}`,
      to: pathConst.NEWS_ACTIVIST_VULNERABILITY_LATEST,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivistVulnerability
    },
    {
      name: `${getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY)} - ${getTitle(
        pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT
      )}`,
      to: pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsActivistVulnerability
    },
    {
      name: getTitle(pathConst.NEWS_VOTING),
      to: pathConst.NEWS_VOTING,
      handleVisitorLog: props.handleVisitorLog,
      parameter: '',
      disabled: props.isDisableNewsVoting
    },
    // {
    //   name: getTitle(pathConst.NEWS_COMPENSATION),
    //   to: pathConst.NEWS_COMPENSATION,
    //   handleVisitorLog: props.handleVisitorLog,
    //   parameter: '',
    //   disabled: props.isDisableNewsCompensation
    // },
    {
      name: getTitle(pathConst.NEWS_SEARCH),
      to: pathConst.NEWS_SEARCH,
      handleVisitorLog: props.handleVisitorLog,
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
    }
  }, [
    setNavbarSelectionClick,
    isNavbarSelectionClick,
    mobileNavItem,
    props.location.pathname
  ]);

  return (
    <>
      <nav className='mainnavbar navbar navbar-expand-md navbar-light bg-light'>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs me-auto'>
            {navItems.map(
              ({ to, firstChild, name, exact, disabled }, index) => (
                <li className='nav-item' key={`item${index + 1}`}>
                  <NavLink
                    to={to}
                    onMouseMove={(e) => {
                      e.preventDefault();
                      clearTimeout(timer);
                      timer = setTimeout(stopmouse, 300);
                      function stopmouse() {
                        props.handleResetCompanyPath(to);
                      }
                    }}
                    onMouseOut={() => {
                      clearTimeout(timer);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push({
                        pathname: firstChild,
                        search: '',
                        state: {
                          isLoadChildContent: true
                        }
                      });
                      props.handleResetBreadcrumbs(firstChild);
                      props.handleResetCompanyPath(firstChild);
                    }}
                    className={
                      props.selectedHoverSubmenu === to
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

      {/* mobile                   */}
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
                    <div key={`key${index + 1}`}>
                      {mobileNavItem[index].length === undefined ? (
                        <Nav.Link
                          key={`Link${index + 1}`}
                          eventKey={`navItem-${name}-${index}`}
                          className={
                            disabled
                              ? 'lh-20 ms-10 border-bottom-1w disabled'
                              : 'lh-20 ms-10 border-bottom-1w'
                          }
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
                                handleVisitorLog
                              },
                              index
                            ) =>
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
    </>
  );
};

NewsHeader.propTypes = {
  handleNavOutsideClick: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  isDisableNewsActivismLatest: PropTypes.bool,
  isDisableNewsActivistShort: PropTypes.bool,
  isDisableNewsActivistVulnerability: PropTypes.bool,
  isDisableNewsGovernance: PropTypes.bool,
  isDisableNewsVoting: PropTypes.bool,
  isDisableNewsCompensation: PropTypes.bool,
  isNavbarSelectionClick: PropTypes.string,
  location: PropTypes.object,
  selectNavOutsideClick: PropTypes.bool,
  selectedHoverSubmenu: PropTypes.string,
  setNavbarSelectionClick: PropTypes.func
};

NewsHeader.defaultProps = {
  handleNavOutsideClick: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  isDisableNewsActivismLatest: false,
  isDisableNewsActivistShort: false,
  isDisableNewsActivistVulnerability: false,
  isDisableNewsGovernance: false,
  isDisableNewsVoting: false,
  isDisableNewsCompensation: false,
  isNavbarSelectionClick: '',
  location: {},
  selectNavOutsideClick: false,
  setNavbarSelectionClick: () => {},
  selectedHoverSubmenu: ''
};

export default withRouter(React.memo(NewsHeader));
