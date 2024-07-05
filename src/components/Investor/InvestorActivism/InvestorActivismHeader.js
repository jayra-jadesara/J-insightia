import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import pathConst, { QUERY_INVESTOR } from '../../../constants/PathsConstant';

const InvestorActivismHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { investor } = props;
  if (investor !== undefined) {
    query.investor = investor;
  }

  const navItems = [
    {
      to: pathConst.INVESTOR_ACTIVISM_OVERVIEW,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Overview',
      exact: true,
      disabled: false,
    },
    {
      to: pathConst.INVESTOR_ACTIVISM_CAMPAIGNS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Activist Campaigns',
      exact: false,
      disabled: false,
    },
    {
      to: pathConst.INVESTOR_ACTIVISM_INVESTMENTS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Investments',
      exact: false,
      disabled: false,
    },
    {
      to: pathConst.INVESTOR_ACTIVISM_DEMANDS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Demands',
      exact: false,
      disabled: !props.accessDemand
    },
    {
      to: pathConst.INVESTOR_ACTIVISM_FOLLOWER_RETURNS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Follower Returns',
      exact: false,
      disabled: !props.accessFollowerAccess
    },
    {
      to: pathConst.INVESTOR_ACTIVISM_PERFORMANCE,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Performance',
      exact: false,
      disabled: !props.accessPerformance,
    },
    {
      to: pathConst.INVESTOR_ACTIVISM_FILINGS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Filings',
      exact: false,
      disabled: !props.accessInvFilings
    }
  ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, name, exact, search, disabled }, index) => (
            <li
              className='nav-item'
              key={`item${index + 1}`}
              onMouseEnter={() =>
                props.handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))
              }
              onMouseLeave={() => props.handleHoverSubmenu('')}
            >
              <NavLink
                to={to + search}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: to,
                    search,
                    state: {},
                  });
                  props.handleResetBreadcrumbs(to);
                  props.handleResetCompanyPath(to);
                  props.handleVisitorLog(to, search);
                  props.handleResetLoader();
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

InvestorActivismHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  investor: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func,
};

InvestorActivismHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: {},
};
export default withRouter(React.memo(InvestorActivismHeader));
