import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import pathConst, { QUERY_INVESTOR } from '../../../constants/PathsConstant';

// const headerbem = bn.create('header');
const InvestorVotingHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { investor } = props;
  if (investor !== undefined) {
    query.investor = investor;
  }

  const navItems = [
    {
      to: pathConst.INVESTOR_VOTING_OVERVIEW,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Overview',
      exact: true,
      disabled: false
    },
    {
      to: pathConst.INVESTOR_VOTING_PROFILE,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Voting Profile',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.INVESTOR_VOTING_BY_PROPOSAL,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Voting by Proposal',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.INVESTOR_VOTING_RATIONALE,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Voting Rationale',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.INVESTOR_PROXY_CONTEST_VOTING,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Proxy Contest Voting',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.INVESTOR_FUNDS_VOTED,
      search: `${QUERY_INVESTOR}${query.investor}`,
      name: 'Funds Voted',
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
                  props.handleGlobleResetInvestorCmparator();
                  props.handleGlobleResetProxyContestVoting();
                  props.handleResetLoader();
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

InvestorVotingHeader.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  handleGlobleResetInvestorCmparator: PropTypes.func,
  handleGlobleResetProxyContestVoting: PropTypes.func,
  handleResetLoader: PropTypes.func,
  investor: PropTypes.any,
  location: PropTypes.object
};

InvestorVotingHeader.defaultProps = {
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  handleGlobleResetInvestorCmparator: () => {},
  handleGlobleResetProxyContestVoting: () => {},
  handleResetLoader: () => {},
  location: {}
};

export default withRouter(InvestorVotingHeader);
