import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import { MAGAZINE_OVERVIEW, QUERY_MAGAZINE } from '../../../constants/PathsConstant';

const MagazineHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  let navItems = [];
  // 	const { investor } = props;
  // 	 if (investor !== undefined) {
  //     query.investor = investor;
  //   }

  navItems = [
    {
      to: MAGAZINE_OVERVIEW,
      name: 'Activism Monthly',
      exact: false,
      disabled: false,
      firstChild: `${MAGAZINE_OVERVIEW}${QUERY_MAGAZINE}${query.mag}`
    },
    {
      to: MAGAZINE_OVERVIEW,
      name: 'Proxy Monthly',
      exact: false,
      disabled: false,
      firstChild: `${MAGAZINE_OVERVIEW}${QUERY_MAGAZINE}${query.mag}`
    },
    {
      to: MAGAZINE_OVERVIEW,
      name: 'Special Reports',
      exact: true,
      disabled: false,
      firstChild: `${MAGAZINE_OVERVIEW}${QUERY_MAGAZINE}${query.mag}`
    }
  ];

  return (
    <nav className='mainnavbar navbar navbar-expand-md navbar-light bg-light '>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='nav nav-tabs mr-auto'>
          {navItems.map(({ to, firstChild, name, exact, disabled }, index) => (
            <li className='nav-item' key={index}>
              <NavLink
                to={to}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  props.handleResetCompanyPath(to);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: firstChild.split('?')[0],
                    search: firstChild.split('?')[1],
                    state: {
                      isLoadChildContent: true
                    }
                  });

                  // original
                  props.handleResetBreadcrumbs(firstChild.split('?')[0]);
                  props.handleResetCompanyPath(firstChild.split('?')[0]);
                  props.handleVisitorLog(firstChild.split('?')[0], firstChild.split('?')[1]);
                }}
                className={
                  props.selectedHoverSubmenu === to
                    ? 'nav-link primary-link active'
                    : disabled
                    ? 'nav-link primary-link disabled'
                    : 'nav-link primary-link'
                }
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

export default withRouter(MagazineHeader);
