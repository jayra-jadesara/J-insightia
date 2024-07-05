import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { DIRECTORSHIP_AND_EXECUTIVE, QUERY_DIRECTOR } from '../../../constants/PathsConstant';
import { history } from '../../../utils/navigation-util';

const DirectorshipAndExecutiveHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { director_id } = props;
  if (director_id !== undefined) {
    query.director_id = director_id;
  }

  const navItems = [
    {
      to: DIRECTORSHIP_AND_EXECUTIVE,
      search: `${QUERY_DIRECTOR}${query.director_id}`,
      name: 'Overview',
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

DirectorshipAndExecutiveHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  director_id: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func
};

DirectorshipAndExecutiveHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: {}
};
export default withRouter(DirectorshipAndExecutiveHeader);
