import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { history } from '../../../utils/navigation-util';
import { MY_ALERT_NEW, MY_ALERT_EXISTING_ALERT, MY_ALERT_INBOX } from '../../../constants/PathsConstant';

const AlertHeader = ({ handleHoverSubmenu, handleResetBreadcrumbs, handleResetCompanyPath, handleVisitorLog }) => {
  const navItems = [
    {
      to: MY_ALERT_NEW,
      search: '',
      name: 'New Alerts',
      exact: true,
      disabled: false
    },
    {
      to: MY_ALERT_EXISTING_ALERT,
      search: '',
      name: 'Existing Alerts',
      exact: false,
      disabled: false
    },
    {
      to: MY_ALERT_INBOX,
      search: '',
      name: 'Alert Inbox',
      exact: false,
      disabled: false
    }
  ];

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems && navItems.map(({ to, name, exact, search, disabled }, index) => (
            <li
              className='nav-item'
              key={`index_${index + 1}`}
              onMouseEnter={() => handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => handleHoverSubmenu('')}
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

AlertHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func
};

AlertHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {}
};

export default withRouter(React.memo(AlertHeader));
