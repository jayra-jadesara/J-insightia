import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import pathConst, { QUERY_MEETING } from '../../../constants/PathsConstant';
import { history } from '../../../utils/navigation-util';

const VotingHeader = (props) => {
  let navItems = [];
  navItems = [
    {
      to: pathConst.VOTING_OVERVIEW,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'Overview',
      exact: true,
      disabled: false
    },
    {
      to: pathConst.VOTING_QUICKVIEW,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'Quick View',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.VOTING_RESULTS,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'Voting Results',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.VOTING_VOTEDETAIL,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'Vote Detail',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.VOTING_VOTESAGAINST_MGMT,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'Votes Against Mgmt',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.VOTING_POLICYCHECKER,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'Policy Checker',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.VOTING_NOACTIONLETTER,
      search: `${QUERY_MEETING}${props.meetingid}`,
      name: 'No Action Letters',
      exact: false,
      disabled: !props.isExistNoActionLetters_CompanyVoting
    }
  ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, search, name, exact, disabled }, index) => (
            <li
              className='nav-item'
              key={`exact${index + 1}`}
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
                  props.handleResetLoading();
                  props.handleVisitorLog(to, search);
                }}
                className={disabled ? 'nav-link disabled' : 'nav-link'}
                activeClassName={disabled ? '' : 'active disabled'}
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

export default withRouter(React.memo(VotingHeader));
