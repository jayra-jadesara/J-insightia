import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { history } from '../../../utils/navigation-util';
import pathConst from '../../../constants/PathsConstant';
// import qs from "qs";

const FAQ_CompensationHeader = (props) => {
  // let query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const navItems = [
    {
      to: pathConst.COMPENSATION_FAQHELP,
      search: '',
      name: 'FAQ',
      exact: true,
      disabled: false
    },
    // {
    //   to: pathConst.VOTING_DEFINITION,
    //   search: '',
    //   name: 'Definitions',
    //   exact: false,
    //   disabled: false
    // }
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
FAQ_CompensationHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func
};

FAQ_CompensationHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {}
};

export default withRouter(React.memo(FAQ_CompensationHeader));
