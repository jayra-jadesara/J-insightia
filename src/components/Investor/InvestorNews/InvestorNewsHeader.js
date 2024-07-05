import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import pathConst, { QUERY_INVESTOR } from '../../../constants/PathsConstant';

const InvestorNewsHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { investor } = props;
  if (investor !== undefined) {
    query.investor = investor;
  }

  const navItems = [
    {
      to: pathConst.INVESTOR_NEWS,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Investor News',
      exact: true,
      disabled: false
    }
  ];

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, name, exact, search, disabled }, index) => (
            <li
              className='nav-item'
              key={index}
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

InvestorNewsHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  investor: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func
};

InvestorNewsHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: {}
};

export default withRouter(InvestorNewsHeader);
