import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import {
  ACTIVISM_OVERVIEW,
  ACTIVIST_CAMPAIGNS,
  ACTIVIST_INVESTMENT,
  ACTIVIST_FILINGS,
  QUERY_PID
} from '../../../constants/PathsConstant';

const ActivistShortHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { pid } = props;
  if (pid !== undefined) {
    query.pid = pid;
  }

  const navItems = [
    {
      to: ACTIVISM_OVERVIEW,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Overview',
      exact: true,
      disabled: false
    },
    {
      to: ACTIVIST_CAMPAIGNS,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Activist Campaigns',
      exact: false,
      disabled: false
    },
    {
      to: ACTIVIST_INVESTMENT,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Activist Investments',
      exact: false,
      disabled: false
    },
    {
      to: ACTIVIST_FILINGS,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Filings',
      exact: false,
      disabled: !props.accessComFilings
    }
  ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, name, exact, search, disabled }, index) => (
            <li
              className='nav-item'
              key={`nav-item_${index + 1}`}
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
                  props.handleResetBreadcrumbs(to);
                  props.handleResetCompanyPath(to);
                  props.handleVisitorLog(to, search);
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

export default withRouter(React.memo(ActivistShortHeader));
