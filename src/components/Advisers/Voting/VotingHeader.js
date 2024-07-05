import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { QUERY_COMPANY_ID, ADVISOR_VOTING_OVERVIEW } from '../../../constants/PathsConstant';
import { history } from '../../../utils/navigation-util';

const ActivistVotingHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { company_id } = props;
  if (company_id !== undefined) {
    query.company_id = company_id;
  }

  const navItems = [
    {
      to: ADVISOR_VOTING_OVERVIEW,
      search: `${QUERY_COMPANY_ID}${query.company_id}`,
      name: 'No Action',
      exact: true,
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
              key={`navit_${index + 1}`}
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

ActivistVotingHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  advisor: PropTypes.any,
  location: PropTypes.object,
  handleHoverSubmenu: PropTypes.func
};

ActivistVotingHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  location: {}
};
export default withRouter(ActivistVotingHeader);
