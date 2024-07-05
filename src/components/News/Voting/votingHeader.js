import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { getTitle, history } from '../../../utils/navigation-util';
import pathConst from '../../../constants/PathsConstant';

const ActivistShortHeader = (props) => {
  const navItems = [
    {
      to: pathConst.NEWS_VOTING,
      search: '',
      name: 'Latest',
      exact: true,
      disabled: false
    },
    {
      to: pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES,
      search: '',
      name: getTitle(pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES),
      exact: false,
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
              key={`nav${index + 1}`}
              onMouseEnter={() => props.handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => props.handleHoverSubmenu('')}
            >
              <NavLink
                to={to}
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

ActivistShortHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func
};

ActivistShortHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {}
};

export default withRouter(React.memo(ActivistShortHeader));
