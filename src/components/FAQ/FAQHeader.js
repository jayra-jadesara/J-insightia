import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { getTitle } from "../../utils/navigation-util";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { history } from '../../utils/navigation-util';
import pathConst from '../../constants/PathsConstant';
import bn from '../../utils/bemnames';

const bem = bn.create('navigatio-utils');

const FAQHeader = (props) => {
  const {
    selectNavOutsideClick,
    handleNavOutsideClick,
    isNavbarSelectionClick,
    setNavbarSelectionClick,
    handleResetBreadcrumbs
  } = props;

  const navItems = [
    {
      to: pathConst.FAQHELP_GENERAL,
      name: 'General',
      exact: false,
      disabled: false,
      firstChild: pathConst.GENERAL_FAQ
    },
    {
      to: pathConst.FAQHELP_ACTIVISM,
      name: 'Activism',
      exact: false,
      disabled: false,
      firstChild: pathConst.ACTIVISM_FAQ
    },
    {
      to: pathConst.FAQHELP_ACTIVISTSHORTS,
      name: 'Activist Shorts',
      exact: false,
      disabled: false,
      firstChild: pathConst.ACTIVISTSHORTS_FAQ
    },
    {
      to: pathConst.FAQHELP_ACTIVIST_VULNERABILITY,
      name: 'Activist Vulnerability',
      exact: false,
      disabled: false,
      firstChild: pathConst.ACTIVIST_VULNERABILITY_FAQ
    },
    {
      to: pathConst.FAQHELP_GOVERNANCE,
      name: 'Governance',
      exact: false,
      disabled: false,
      firstChild: pathConst.GOVERNANCE_FAQ
    },
    {
      to: pathConst.FAQHELP_VOTING,
      name: 'Voting',
      exact: false,
      disabled: false,
      firstChild: pathConst.VOTING_FAQ
    },
    {
      to: pathConst.FAQHELP_COMPENSATION,
      name: 'Compensation',
      exact: false,
      disabled: props.isCompensationFaq,
      firstChild: pathConst.COMPENSATION_FAQHELP
    }
  ];

  const mobileNavItem = [
    { name: 'General - FAQ', to: pathConst.GENERAL_FAQ, handleVisitorLog: props.handleVisitorLog, parameter: '' },
    {
      name: 'General - Definitions',
      to: pathConst.GENERAL_DEFINITION,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    { name: 'Activism - FAQ', to: pathConst.ACTIVISM_FAQ, handleVisitorLog: props.handleVisitorLog, parameter: '' },
    {
      name: 'Activism - Definitions',
      to: pathConst.ACTIVISM_DEFINITION,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    {
      name: 'Activist Shorts - FAQ',
      to: pathConst.ACTIVISTSHORTS_FAQ,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    {
      name: 'Activist Shorts - Definitions',
      to: pathConst.ACTIVISTSHORTS_DEFINITION,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    {
      name: 'Activist Vulnerability - FAQ',
      to: pathConst.ACTIVIST_VULNERABILITY_FAQ,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    {
      name: 'Activist Vulnerability - Definitions',
      to: pathConst.ACTIVIST_VULNERABILITY_DEFINITION,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    { name: 'Governance - FAQ', to: pathConst.GOVERNANCE_FAQ, handleVisitorLog: props.handleVisitorLog, parameter: '' },
    {
      name: 'Governance - Definitions',
      to: pathConst.GOVERNANCE_DEFINITION,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    { name: 'Voting - FAQ', to: pathConst.VOTING_FAQ, handleVisitorLog: props.handleVisitorLog, parameter: '' },
    {
      name: 'Voting - Definitions',
      to: pathConst.VOTING_DEFINITION,
      handleVisitorLog: props.handleVisitorLog,
      parameter: ''
    },
    { name: 'Compensation - FAQ', to: pathConst.COMPENSATION_FAQHELP, handleVisitorLog: props.handleVisitorLog, parameter: '' },
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
              <li className='nav-item' key={`nav${index + 1}`}>
                <NavLink
                  to={to}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    props.handleResetCompanyPath(to);
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
                    props.handleResetBreadcrumbs(firstChild);
                    props.handleResetCompanyPath(firstChild);
                    props.handleVisitorLog(firstChild, '');
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
                  <div key={`to_${index + 1}`}>
                    {mobileNavItem[index].length === undefined ? (
                      <Nav.Link
                        key={`link_${index + 1}`}
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
                                key={`disabled${index + 1}`}
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

export default withRouter(React.memo(FAQHeader));
