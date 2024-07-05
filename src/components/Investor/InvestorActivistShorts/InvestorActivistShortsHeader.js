import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import pathConst, { QUERY_INVESTOR } from '../../../constants/PathsConstant';

const InvestorActivistShortsHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { investor } = props;
  if (investor !== undefined) {
    query.investor = investor;
  }

  const navItems = [
    {
      to: pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Overview',
      exact: true,
      disabled: false
    },
    {
      to: pathConst.INVESTOR_ACTIVIST_SHORT_CAMPAIGNS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Activist Short Campaigns',
      exact: false,
      disabled: false
    },
    // {
    //   to: pathConst.INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES,
    //   search: `${QUERY_INVESTOR}${query.investor}`,
    //   name: 'Activist Short Ownership Disclosures',
    //   exact: false,
    //   disabled: true,
    // },
    {
      to: pathConst.INVESTOR_ACTIVIST_SHORT_FILINGS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Filings',
      exact: false,
      disabled: false
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
              onMouseEnter={() => props.handleHoverSubmenu(to)}
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
                  props.handleGlobleResetActivistShort();
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

InvestorActivistShortsHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  investor: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func,
  handleGlobleResetActivistShort: PropTypes.func
};

InvestorActivistShortsHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  handleGlobleResetActivistShort: () => {},
  location: {}
};

export default withRouter(InvestorActivistShortsHeader);
