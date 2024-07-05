import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import pathConst, { QUERY_PID } from '../../../constants/PathsConstant';
import { history } from '../../../utils/navigation-util';

const OwnershipHeader = (props) => {
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const navItems = [
    {
      to:
        props.location.pathname === pathConst.OWNERSHIP_LONG_FUND
          ? pathConst.OWNERSHIP_LONG_FUND
          : pathConst.OWNERSHIP_LONG_INVESTOR,
      search: `${QUERY_PID}${props.pid}`,
      name: 'Long',
      exact: true,
      disabled: props.longShortAcces.long !== null && props.longShortAcces.long === 0
    },
    {
      to:
        props.location.pathname === pathConst.OWNERSHIP_SHORT_FUND
          ? pathConst.OWNERSHIP_SHORT_FUND
          : pathConst.OWNERSHIP_SHORT_INVESTOR,
      search: `${QUERY_PID}${props.pid}`,
      name: 'Short',
      exact: false,
      disabled: props.longShortAcces.short !== null && props.longShortAcces.short === 0
    }
  ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, search, name, exact, disabled }, index) => (
            <li
              className='nav-item'
              key={`Items${index + 1}`}
              onMouseEnter={() => props.handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => props.handleHoverSubmenu('')}
            >
              <NavLink
                to={to + search}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: to,
                    search,
                    state: {}
                  });
                  // props.handleResetBreadcrumbs(to);
                  // props.handleResetCompanyPath(to);
                  props.handleResetLoading();
                  props.handleVisitorLog(to, search);
                }}
                className={disabled ? 'nav-link disabled' : 'nav-link'}
                activeClassName={disabled ? '' : 'active disabled'}
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
  );
};

export default withRouter(OwnershipHeader);
