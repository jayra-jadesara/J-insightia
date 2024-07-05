import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';

const AdvisorOverviewHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { company_id } = props;
  if (company_id !== undefined) {
    query.company_id = company_id;
  }

  // const navItems = [
  //   {
  //     to: ADVISOR_OVERVIEW,
  //     search: `?company_id=${query.company_id}`,
  //     name: 'Overview',
  //     exact: true,
  //     disabled: false,
  //   },
  // ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {/* {navItems.map(({ to, name, exact, search, disabled }, index) => (
            <li
              className="nav-item"
              key={index}
              onMouseEnter={() => props.handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => props.handleHoverSubmenu('')}
            >
              <NavLink
                to={to + search}
                onClick={(e) => {
                  e.preventDefault();
                  history.replace({
                    pathname: to,
                    search,
                    state: {},
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
          ))} */}
        </ul>
      </div>
    </nav>
  );
};

AdvisorOverviewHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  advisor: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func
};

AdvisorOverviewHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: {}
};
export default withRouter(AdvisorOverviewHeader);
