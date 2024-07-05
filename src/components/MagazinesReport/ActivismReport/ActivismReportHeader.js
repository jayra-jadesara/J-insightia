import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { history } from '../../../utils/navigation-util';
import {
  ACTIVISM_LATEST_REPORTS,
  ACTIVISM_MONTHLY_REPORTS,
  ACTIVISM_QUARTERLY_STATS_REPORTS,
  ACTIVISM_SPECIAL_REPORTS,
  ACTIVISM_13F_REPORTS,
} from '../../../constants/PathsConstant';

const ActivismReportHeader = ({ handleHoverSubmenu, handleResetBreadcrumbs, handleResetCompanyPath }) => {
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const navItems = [
    {
      to: ACTIVISM_LATEST_REPORTS,
      name: 'Latest',
      exact: true,
    },
    {
      to: ACTIVISM_MONTHLY_REPORTS,
      name: 'Monthly',
      exact: false,
    },
    {
      to: ACTIVISM_QUARTERLY_STATS_REPORTS,
      name: 'Quarterly Stats',
      exact: false,
    },
    {
      to: ACTIVISM_SPECIAL_REPORTS,
      name: 'Special',
      exact: false,
    },
    {
      to: ACTIVISM_13F_REPORTS,
      name: '13F',
      exact: false,
    },
  ];

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, search, name, exact, disabled }, index) => (
            <li
              className='nav-item'
              key={`nav${index + 1}`}
              onMouseEnter={() => handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => handleHoverSubmenu('')}
            >
              <NavLink
                to={to}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: to,
                    search,
                    state: {},
                  });
                  handleResetBreadcrumbs(to);
                  handleResetCompanyPath(to);
                }}
                className={disabled ? 'nav-link disabled' : 'nav-link'}
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
  );
};

ActivismReportHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
};

ActivismReportHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
};

export default React.memo(withRouter(ActivismReportHeader));
