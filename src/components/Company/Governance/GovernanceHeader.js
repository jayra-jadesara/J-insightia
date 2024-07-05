import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { history } from '../../../utils/navigation-util';
import pathConst, { QUERY_PID } from '../../../constants/PathsConstant';

const GovernanceHeader = ({
  location,
  showBylaws_Charter_GovGuidelinesTab,
  showComplianceTab,
  showLatestFilingsTab,
  showPoisonPillTab,
  showShareholderProposalsTab,
  pid,
  handleHoverSubmenu,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleVisitorLog,
  showHistoricalGov
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (pid !== undefined) {
    query.pid = pid;
  }
  const navItems = [
    {
      to: pathConst.GOVERNANCE_OVERVIEW,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Overview',
      exact: true,
      disabled: false
    },
    {
      to: pathConst.GOVERNANCE_BYLAWSCHARTERGUIDELINES,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Bylaws/ Charter/ Gov Guidelines',
      exact: false,
      disabled: !showBylaws_Charter_GovGuidelinesTab
    },
    {
      to: pathConst.GOVERNANCE_COMPLIANCE,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Compliance',
      exact: false,
      disabled: !showComplianceTab
    },
    {
      to: pathConst.GOVERNANCE_DIRECTORS,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Directors',
      exact: false,
      disabled: false
    },
    {
      to: pathConst.GOVERNANCE_POISONPILL,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Poison Pill',
      exact: false,
      disabled: !showPoisonPillTab
    },
    {
      to: pathConst.GOVERNANCE_LATESTFILINGS,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Latest Filings',
      exact: false,
      disabled: !showLatestFilingsTab
    },
    {
      to: pathConst.GOVERNANCE_SHAREHOLDERPROPOSAL,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Shareholder Proposals',
      exact: false,
      disabled: !showShareholderProposalsTab
    },
    {
      to: pathConst.GOVERNANCE_HISTORICAL,
      search: `${QUERY_PID}${query.pid}`,
      name: 'Historical Governance',
      exact: false,
      disabled: !showHistoricalGov
    }
  ];

  return (
    <nav className='subnavbar navbar navbar-expand-md navbar-light bg-light'>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav me-auto'>
          {navItems.map(({ to, search, name, exact, disabled }, index) => (
            <li
              className='nav-item'
              key={`tem${index + 1}`}
              onMouseEnter={() => handleHoverSubmenu(to.substr(0, to.lastIndexOf('/')))}
              onMouseLeave={() => handleHoverSubmenu('')}
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
                  handleResetBreadcrumbs(to);
                  handleResetCompanyPath(to);
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

GovernanceHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.any,
  pid: PropTypes.number,
  showBylaws_Charter_GovGuidelinesTab: PropTypes.bool,
  showComplianceTab: PropTypes.bool,
  showLatestFilingsTab: PropTypes.bool,
  showPoisonPillTab: PropTypes.bool,
  showShareholderProposalsTab: PropTypes.bool
};

GovernanceHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleVisitorLog: () => {},
  pid: null,
  showBylaws_Charter_GovGuidelinesTab: false,
  showComplianceTab: false,
  showLatestFilingsTab: false,
  showPoisonPillTab: false,
  showShareholderProposalsTab: false
};

export default withRouter(React.memo(GovernanceHeader));
