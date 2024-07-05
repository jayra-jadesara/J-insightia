import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import {
  ACTIVISTSHORTS_OVERVIEW,
  ACTIVISTSHORTS_CAMPAIGNS,
  ACTIVISTSHORTS_FILINGS,
  QUERY_PID
} from '../../../constants/PathsConstant';

const ActivistShortHeader = ({
  pid,
  location,
  handleHoverSubmenu,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleVisitorLog,
  isActivistShortModuleAccess
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  // if (pid !== undefined) {
  //   query.pid = pid;
  // }
  const navItems = [
    {
      to: ACTIVISTSHORTS_OVERVIEW,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Overview',
      exact: true,
      disabled: false
    },
    {
      to: ACTIVISTSHORTS_CAMPAIGNS,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Activist Short Campaigns',
      exact: false,
      disabled: isActivistShortModuleAccess
    },
    {
      to: ACTIVISTSHORTS_FILINGS,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Filings',
      exact: false,
      disabled: isActivistShortModuleAccess
    }
  ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, search, name, exact, disabled }, index) => (
            <li
              className='nav-item'
              key={`item_${index + 1}`}
              onMouseEnter={() => handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => handleHoverSubmenu('')}
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
                  handleVisitorLog(to, search);
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

ActivistShortHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  pid: PropTypes.number,
  isActivistShortModuleAccess: PropTypes.bool
};

ActivistShortHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: { search: '' },
  pid: null
};

export default withRouter(React.memo(ActivistShortHeader));
