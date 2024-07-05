/* eslint-disable import/no-cycle */
import { createBrowserHistory } from 'history';
import React from 'react';
import CompanyHeader from '../components/Company/General/CompanyHeader';
import FAQHeader from '../components/FAQ/FAQHeader';
import FAQGeneralHeader from '../components/FAQ/General/FAQ_GeneralHeader';
import FAQActivismHeader from '../components/FAQ/Activism/FAQ_ActivismHeader';
import FAQActivistShortHeader from '../components/FAQ/ActivistShorts/FAQ_ActivistShortHeader';
import FAQActivistVulnerabilityHeader from '../components/FAQ/ActivistVulnerability/FAQ_ActivistVulnerabilityHeader';
import FAQGovernanceHeader from '../components/FAQ/Governance/FAQ_GovernanceHeader';
import FAQVotingHeader from '../components/FAQ/Voting/FAQ_VotingHeader';
import DashboardDropDown from '../components/Dashboard/Components/TitleDropDown';

import NewsHeader from '../components/News/NewsHeader';
import ActivismHeader from '../components/Company/Activism/ActivismHeader';
import CompensationHeader from '../components/Company/Compensation/General/CompensationHeader';
import ActivistShortHeader from '../components/Company/ActivistShorts/ActivistShortHeader';
import GovernanceHeader from '../components/Company/Governance/GovernanceHeader';
import VotingHeader from '../components/Company/Voting/VotingHeader';
import InvestorHeader from '../components/Investor/General/InvestorHeader';
import InvestorActivismHeader from '../components/Investor/InvestorActivism/InvestorActivismHeader';
import InvestorActivistShortHeader from '../components/Investor/InvestorActivistShorts/InvestorActivistShortsHeader';
import InvestorVotingHeader from '../components/Investor/InvestorVoting/InvestorVotingHeader';
import InvestorOwnershipHeader from '../components/Investor/InvestorOwnership/InvestorOwnershipHeader';
import AdvisorHeader from '../components/Advisers/General/AdvisorHeader';
import AdvisorVotingHeader from '../components/Advisers/Voting/VotingHeader';
import pathConst from '../constants/PathsConstant';
import NewsActivismHeader from '../components/News/Activism/ActivismHeader';
import NewActivistShortHeader from '../components/News/ActivistShorts/ActivistShortHeader';
import NewsVotingHeader from '../components/News/Voting/votingHeader';
import ActivismVulnerabilityHeader from '../components/News/ActivistVulnerability/ActivistVulnerabilityHeader';
import OwnershipHeader from '../components/Company/Ownership/OwnershipHeader';
import MagazinesReportHeader from '../components/MagazinesReport/MagazinesReportHeader';
import ActivismReportHeader from '../components/MagazinesReport/ActivismReport/ActivismReportHeader';
import VotingReportHeader from '../components/MagazinesReport/VotingReport/VotingReportHeader';
import ShortsReportHeader from '../components/MagazinesReport/ShortsReport/ShortsReportHeader';
import GovernanceReportHeader from '../components/MagazinesReport/GovernanceReport/GovernanceReportHeader';
import MyAlertHeader from '../components/MyAlert/MyAlertHeader';
import PeopleHeader from '../components/PeopleSearch/General/PeopleHeader';
import FAQCompensationHeader from '../components/FAQ/Compensation/FAQ_CompensationHeader';

export const history = createBrowserHistory();
const timer = 300;

export const getTitle = (path, title, handleChangeDashboardId, props) => {
  switch (path) {
    // #region Dashboard
    case pathConst.DASHBOARD:
      return <DashboardDropDown handleChangeDashboardId={handleChangeDashboardId} {...props} />;
    // #endregion

    // #region Company
    case pathConst.COMPANY_SEARCH:
      return 'Company Search';
    // #endregion

    // #region Preferences
    case pathConst.PREFERENCES:
      return 'Preferences';
    // #endregion

    // #region RECENT_DOWNLOADS
    case pathConst.RECENT_DOWNLOADS:
      return 'Recent Downloads';
    // #endregion

    // #region Investor
    case pathConst.INVESTOR_SEARCH:
      return 'Investor Search';
    // #endregion

    // #region Advisors
    case pathConst.ADVISOR_SEARCH:
      return 'Adviser Search';

    // #endregion

    // #region News
    case pathConst.NEWSMENU:
      return 'News';
    case pathConst.NEWS_OVERVIEW:
      return 'Latest';
    case pathConst.NEWS_ACTIVISM:
      return 'Activism';
    case pathConst.NEWS_ACTIVISM_THIS_WEEK:
      return 'This Week';
    case pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES:
      return 'In-depth Articles';
    case pathConst.NEWS_ACTIVISM_LATEST:
      return 'Latest';
    case pathConst.NEWS_ACTIVIST_SHORT:
      return 'Activist Shorts';
    case pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES:
      return 'In-depth Articles';
    case pathConst.NEWS_ACTIVIST_VULNERABILITY:
      return 'Activist Vulnerability';
    case pathConst.NEWS_ACTIVIST_VULNERABILITY_LATEST:
      return 'Latest';
    case pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT:
      return 'New Reports';
    case pathConst.NEWS_ACTIVIST_VULNERABILITY_HIT:
      return 'Hits';
    case pathConst.NEWS_ACTIVIST_VULNERABILITY_UPDATES:
      return 'Updates';
    case pathConst.NEWS_GOVERNANCE:
      return 'Governance';
    case pathConst.NEWS_VOTING:
      return 'Voting';
    case pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES:
      return 'In-depth Articles';
    case pathConst.NEWS_COMPENSATION:
      return 'Compensation';
    case pathConst.NEWS_SEARCH:
      return 'Search';
    // #endregion

    // #region People Search
    case pathConst.PEOPLE_SEARCH:
      return 'People Search';
    // #endregion

    // #region Tools
    //  = ======================================================
    // TOOLMENU
    case pathConst.TOOLMENU:
      return 'Insightia Tools';
    case pathConst.POWERSEARCH_TOOL:
      return 'Powersearch';
    // TOOLS > ACTIVISM
    case pathConst.ACTIVIST_CAMPAIGNS_TOOL:
      return 'Activist Campaigns Tool';
    case pathConst.PUBLICDEMANDS_TOOL:
      return 'Public Demands Tool';
    case pathConst.HOLDINGSDATA_AND_ANALYTICS_TOOL:
      return 'Holdings Data and Analytics Tool';
    case pathConst.SHAREHOLDER_PROPOSALS_TOOL:
      return 'Shareholder Proposals Tool';
    case pathConst.ANNUAL_PERFORMANCE:
      return 'Annual Performance';
    case pathConst.ANNUAL_COMPOUNDED:
      return 'Annual Compounded';
    // case pathConst.FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL:
    //   return 'Follower Returns Data and Analytics Tool';
    case pathConst.FILLINGS_SEARCH_TOOL:
      return 'Filings Search Tool';
    case pathConst.ACTIVIST_CAMPAIGN_ADVISOR:
      return 'Activist Campaign Advisers Tool';
    case pathConst.ACTIVISM_TRENDS:
      return 'Activism Trends';
    case pathConst.INVESTOR_COMPARATOR_TOOL:
      return 'Investor Comparator';
    case pathConst.ISS_GL_RESOLUTIONANALYSIS_TOOL:
      return 'ISS/GL Resolution Analysis Tool';
    case pathConst.NOACTIONDATA_AND_ANALYTICS_TOOL:
      return 'No Action Data and Analytics';
    case pathConst.DISSIDENT_VOTING_SUMMARY_TOOL:
      return 'Dissident Voting Summary';
    case pathConst.ADVANCED_VOTING_DATA_SEARCH:
      return 'Advanced Voting Data Search';
    // TOOLS > GOVERNANCE
    case pathConst.COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL:
      return 'Company Governance Data and Analytics Tool';
    case pathConst.GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL:
      return 'Company Peer Group Comparison Matrix Tool';
    case pathConst.US_STATEGOVERNANCEDATA_TOOL:
      return 'US State Governance Data Tool';
    case pathConst.GLOBAL_GOVERNANCEDATA_TOOL:
      return 'Global Governance Data Tool';
    case pathConst.DIRECTORDATA_AND_ANALYTICS_TOOL:
      return 'Director Data and Analytics Tool';
    case pathConst.UPCOMING_EVENTS_TOOL:
      return 'Upcoming Events Tool';
    case pathConst.AMENDMENT_DATA_AND_ANALYTICS_TOOL:
      return 'Amendment Data and Analytics Tool';
    case pathConst.POISONPILLDATA_AND_ANALYTICS_TOOL:
      return 'Poison Pill Data and Analytics Tool';
    case pathConst.GOVERNANCE_SCORE_DATA_TOOL:
      return 'Governance Score Data';
    case pathConst.GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL:
        return 'Director Skills and Analytics';
    case pathConst.RESOLUTION_TRACKER_TOOL:
      return 'Resolution Tracker Tool';
    // TOOLS > VULNERABILITY
    case pathConst.VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL:
      return 'Company Peer Group Comparison Matrix Tool';
    case pathConst.VULNAREBILITY_ADVANCED_SEARCH:
      return 'Advanced Vulnerability Search Tool';

    // TOOLS > SHORT_ACTIVISM
    case pathConst.SHORT_CAMPAIGN_DATA_AND_ANALYTICS:
      return 'Activist Shorts Campaign Data and Analytics';
    case pathConst.NOTIFIED_SHORT_POSITION_DATA:
      return 'Most Shorted Companies';
    case pathConst.NOTIFIED_SHORT_POSITION_DATA_Latest_Notification:
      return 'Latest Short Regulatory Notifications';
    case pathConst.SHORT_ACTIVIST_CAMPAIGN_ADVISOR:
      return 'Activist Shorts Campaign Advisers';
    case pathConst.SHORT_ACTIVIST_FILLINGS_SEARCH:
      return 'Filings Search Tool';

    case pathConst.COMPENSATION_P4P_MODELER:
        return 'P4P Modeler Tool';
    case pathConst.COMPENSATION_SAY_ON_PAY_VOTE_RESULTS:
        return 'Say on Pay Vote Results Tool';
    case pathConst.COMPENSATION_REMUNERATION_COMMITEE_MEMBER:
        return 'Remuneration Commitee Member Search Tool';
    case pathConst.COMPENSATION_COMPARATOR:
        return 'Compensation Comparator Tool';
    // #endregion

    // #region FAQ/Help
    case pathConst.FAQHELP_GENERAL:
    case pathConst.GENERAL_FAQ:
    case pathConst.GENERAL_DEFINITION:
    case pathConst.FAQHELP_ACTIVISM:
    case pathConst.ACTIVISM_FAQ:
    case pathConst.ACTIVISM_DEFINITION:
    case pathConst.FAQHELP_ACTIVISTSHORTS:
    case pathConst.ACTIVISTSHORTS_FAQ:
    case pathConst.ACTIVISTSHORTS_DEFINITION:
    case pathConst.FAQHELP_ACTIVIST_VULNERABILITY:
    case pathConst.ACTIVIST_VULNERABILITY_FAQ:
    case pathConst.ACTIVIST_VULNERABILITY_DEFINITION:
    case pathConst.FAQHELP_GOVERNANCE:
    case pathConst.GOVERNANCE_FAQ:
    case pathConst.GOVERNANCE_DEFINITION:
    case pathConst.FAQHELP_VOTING:
    case pathConst.VOTING_FAQ:
    case pathConst.VOTING_DEFINITION:
    case pathConst.COMPENSATION_FAQHELP:
    return 'FAQ/ Help';
    // #endregion

    // #region My Alert
    case pathConst.MY_ALERT_NEW:
    case pathConst.MY_ALERT_EXISTING_ALERT:
    case pathConst.MY_ALERT_INBOX:
      return 'Alerts';
    // #endregion

    // #region MAGAZINES_REPORTS
    // case pathConst.ACTIVISM_MONTHLY:
    case pathConst.LATEST_REPORTS:
    case pathConst.PROXY_MONTHLY:
    case pathConst.SPECIAL_REPORTS:
    case pathConst.SEARCH_ALLREPORTS:
    case pathConst.ACTIVISM_MAGAZINE:
    case pathConst.ACTIVISM_LATEST_REPORTS:
    case pathConst.ACTIVISM_MONTHLY_REPORTS:
    case pathConst.ACTIVISM_QUARTERLY_STATS_REPORTS:
    case pathConst.ACTIVISM_SPECIAL_REPORTS:
    case pathConst.ACTIVISM_13F_REPORTS:
    case pathConst.VOTING_MAGAZINE:
    case pathConst.VOTING_LATEST_REPORTS:
    case pathConst.VOTING_MONTHLY_REPORTS:
    case pathConst.VOTING_SPECIAL_REPORTS:
    case pathConst.SHORTS_MAGAZINE:
    case pathConst.SHORTS_LATEST_REPORTS:
    case pathConst.GOVERNANCE_MAGAZINE:
    case pathConst.GOVERNANCE_LATEST_REPORTS:
      return 'Publications';
    // #endregion

    // #region UNIVERSAL_SEARCH
    case pathConst.UNIVERSAL_SEARCH:
      return 'Universal Search';
    // #endregion

    default:
      return title;
  }
};

export const getBreadcrumbsFromPath = (statePath, path) => {
  // //Other Breadcrumbs
  // if (statePath !== path) {
  //   switch (path) {
  //     default:
  //       break;
  //   }
  // }

  // Conditional related Breadcrumbs
  if (statePath === path) {
    switch (statePath) {
      // #region  tools
      // TOOLMENU
      case pathConst.TOOLMENU:
        return [{ name: 'Tools', active: 'true' }];
      case pathConst.POWERSEARCH_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Insightia',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Powersearch' },
        ];
      // TOOLMENU > ACTIVISM
      case pathConst.ACTIVIST_CAMPAIGNS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Activist Campaigns Tool' },
        ];
      case pathConst.PUBLICDEMANDS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Public Demands Tool' },
        ];
      case pathConst.HOLDINGSDATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Holdings Data and Analytics Tool' },
        ];
      case pathConst.SHAREHOLDER_PROPOSALS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Shareholder Proposals Tool' },
        ];
      // case pathConst.PERFORMANCE_TOOL:
      case pathConst.ANNUAL_PERFORMANCE:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Performance' },
          { name: 'Annual' },
        ];
      case pathConst.ANNUAL_COMPOUNDED:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Performance' },
          { name: 'Compounded' },
        ];
      case pathConst.FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Follower Returns Data and Analytics Tool' },
        ];
      case pathConst.FILLINGS_SEARCH_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Filings Search Tool' },
        ];
      case pathConst.ACTIVIST_CAMPAIGN_ADVISOR:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Activist Campaign Advisers Tool' }
        ];
      case pathConst.ACTIVISM_TRENDS:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Activism Trends' },
        ];
      // TOOLMENU > VOTING
      case pathConst.RESOLUTION_TRACKER_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Resolution Tracker Tool' },
        ];
      case pathConst.INVESTOR_COMPARATOR_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Investor Comparator' },
        ];
      case pathConst.ISS_GL_RESOLUTIONANALYSIS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Voting' },
          { name: 'ISS/GL Resolution Analysis Tool' },
        ];
      case pathConst.NOACTIONDATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'No Action Data and Analytics' },
        ];
      case pathConst.DISSIDENT_VOTING_SUMMARY_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Dissident Voting Summary' },
        ];
      case pathConst.ADVANCED_VOTING_DATA_SEARCH:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Advanced Voting Data Search' },
        ];
      // TOOLMENU > GOVERNANCE
      case pathConst.COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Company Governance Data and Analytics Tool' },
        ];
      case pathConst.GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Company Peer Group Comparison Matrix Tool' },
        ];
      case pathConst.US_STATEGOVERNANCEDATA_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'US State Governance Data Tool' },
        ];
      case pathConst.GLOBAL_GOVERNANCEDATA_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Global Governance Data Tool' },
        ];
      case pathConst.DIRECTORDATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Director Data and Analytics Tool' },
        ];
      case pathConst.UPCOMING_EVENTS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Upcoming Events Tool' },
        ];
      case pathConst.AMENDMENT_DATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Amendment Data and Analytics Tool' },
        ];
      case pathConst.POISONPILLDATA_AND_ANALYTICS_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Poison Pill Data and Analytics Tool' },
        ];
      case pathConst.GOVERNANCE_SCORE_DATA_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Governance Score Data' },
        ];
        case pathConst.GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL:
          return [
            {
              name: 'Tools',
              active: 'true',
              isLink: true,
              url: pathConst.TOOLMENU
            },
            {
              name: 'Governance',
              active: 'true',
              isLink: true,
              url: pathConst.TOOLMENU
            },
            { name: 'Director Skills and Analytics' }
          ];
      // TOOLMENU > VULNERABILITY
      case pathConst.VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Vulnerability',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Company Peer Group Comparison Matrix Tool' },
        ];
      case pathConst.VULNAREBILITY_ADVANCED_SEARCH:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Vulnerability',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Advanced Vulnerability Search' },
        ];
      // TOOLMENU > SHORT_ACTIVISM
      case pathConst.SHORT_CAMPAIGN_DATA_AND_ANALYTICS:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activist Shorts',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Activist Shorts Campaign Data and Analytics' },
        ];
      case pathConst.NOTIFIED_SHORT_POSITION_DATA:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activist Shorts',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Notified Short Position Data' },
          { name: 'Most Shorted Companies' },
        ];
      case pathConst.NOTIFIED_SHORT_POSITION_DATA_Latest_Notification:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activist Shorts',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Notified Short Position Data' },
          { name: 'Latest Short Regulatory Notifications' },
        ];
      case pathConst.SHORT_ACTIVIST_CAMPAIGN_ADVISOR:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activist Shorts',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Activist Shorts Campaign Advisers' },
        ];
      case pathConst.SHORT_ACTIVIST_FILLINGS_SEARCH:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Activist Shorts',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Filings Search Tool' },
        ];

      case pathConst.COMPENSATION_P4P_MODELER:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Compensation',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'P4P Modeler Tool' },
        ];

      case pathConst.COMPENSATION_SAY_ON_PAY_VOTE_RESULTS:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Compensation',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Say on Pay Vote Results Tool' },
        ];

      case pathConst.COMPENSATION_REMUNERATION_COMMITEE_MEMBER:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Compensation',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Remuneration Commitee Member Search Tool' },
        ];
      case pathConst.COMPENSATION_COMPARATOR:
        return [
          {
            name: 'Tools',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          {
            name: 'Compensation',
            active: 'true',
            isLink: true,
            url: pathConst.TOOLMENU,
          },
          { name: 'Compensation Comparator Tool' },
        ];
      // #endregion

      // #region Dashboard
      case pathConst.DASHBOARD:
        return [{ name: 'Dashboard', active: 'true' }];
      // #endregion

      // #region News
      // = ==========================News================================
      // NEWSMENU
      case pathConst.NEWSMENU:
        return [{ name: 'News', active: 'true' }];
      // NEWS => OVERVIEW
      case pathConst.NEWS_OVERVIEW:
        return [{ name: 'News', active: 'true' }];
      case pathConst.NEWS_ACTIVISM:
        return [
          {
            name: getTitle(pathConst.NEWS_ACTIVISM),
            active: 'true',
            isLink: false,
            url: pathConst.NEWS_ACTIVISM,
          },
        ];
      case pathConst.NEWS_ACTIVISM_COVID19:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVISM,
          },
          { name: 'Covid-19', active: 'true' },
        ];
      case pathConst.NEWS_ACTIVISM_THIS_WEEK:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVISM,
          },
          { name: getTitle(pathConst.NEWS_ACTIVISM_THIS_WEEK), active: 'true' },
        ];
      case pathConst.NEWS_ACTIVISM_WEEKLY_WRAP:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVISM,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM_WEEKLY_WRAP),
            active: 'true',
          },
        ];
      case pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVISM,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES),
            active: 'true',
          },
        ];
      case pathConst.NEWS_ACTIVISM_LATEST:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVISM),
            active: 'true',
            isLink: false,
            url: pathConst.NEWS_ACTIVISM,
          },
        ];
      case pathConst.NEWS_ACTIVIST_SHORT:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          { name: 'Activist short', active: 'true' },
        ];
      case pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_VOTING),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_VOTING,
          },
          {
            name: getTitle(pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES),
            active: 'true',
          },
        ];
      case pathConst.NEWS_ACTIVIST_VULNERABILITY:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          { name: 'Latest', active: 'true' },
        ];
      // case pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT:
      //   return [
      //     {
      //       name: 'News',
      //       active: 'true',
      //       isLink: true,
      //       url: pathConst.NEWSMENU,
      //     },
      //     {
      //       name: 'Activist Vulnerability',
      //       active: 'true',
      //       isLink: false,
      //       url: pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT,
      //     },
      //   ];
      case pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT),
            active: 'true',
          },
        ];
      case pathConst.NEWS_ACTIVIST_VULNERABILITY_HIT:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY_HIT),
            active: 'true',
          },
        ];
      case pathConst.NEWS_ACTIVIST_VULNERABILITY_UPDATES:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVIST_VULNERABILITY_UPDATES,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_VULNERABILITY_HIT),
            active: 'true',
          },
        ];
      case pathConst.NEWS_GOVERNANCE:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          { name: getTitle(pathConst.NEWS_GOVERNANCE), active: 'true' },
        ];
      case pathConst.NEWS_VOTING:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          { name: getTitle(pathConst.NEWS_VOTING), active: 'true' },
        ];
      case pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES),
            active: 'true',
            isLink: true,
            url: pathConst.NEWS_ACTIVISM,
          },
          {
            name: getTitle(pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES),
            active: 'true',
          },
        ];
      case pathConst.NEWS_COMPENSATION:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          { name: getTitle(pathConst.NEWS_COMPENSATION), active: 'true' },
        ];
      case pathConst.NEWS_SEARCH:
        return [
          {
            name: 'News',
            active: 'true',
            isLink: true,
            url: pathConst.NEWSMENU,
          },
          { name: getTitle(pathConst.NEWS_SEARCH), active: 'true' },
        ];
      // #endregion

      // #region Company
      // = ==========================Company================================
      // COMPANY SEARCGH
      case pathConst.COMPANY_SEARCH:
        return [{ name: 'Company', active: 'true' }];
      // OVERVIEW
      case pathConst.COMPANY_OVERVIEW:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      // ACTIVISM
      case pathConst.ACTIVISM:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Activism', active: 'true' },
        ];
      case pathConst.ACTIVISM_OVERVIEW:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '/',
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.ACTIVIST_CAMPAIGNS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Activist Campaigns',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.ACTIVIST_FILINGS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Filings',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.ACTIVIST_INVESTMENT:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Activist Investments',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      // ACTIVIST SHORTS
      case pathConst.ACTIVISTSHORTS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Activist Shorts', active: 'true' },
        ];
      case pathConst.ACTIVISTSHORTS_OVERVIEW:
        return [
          {
            name: 'Company',
            active: 'false',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activist-Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.ACTIVISTSHORTS_CAMPAIGNS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activist Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Activist Shorts Campaigns',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.ACTIVISTSHORTS_FILINGS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          {
            name: 'Activist Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Filings',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      // ACTIVIST VULNERABILITY
      case pathConst.ACTIVIST_VULNERABILITY:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Activist Vulnerability', active: 'true' },
        ];
      // COMPANY_COMPENSATION
      case pathConst.COMPANY_COMPENSATION_OVERVIEW:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Compensation', active: 'true' },
        ];
      case pathConst.COMPANY_COMPENSATION_EXECUTIVE_PAY:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Compensation', active: 'true' },
          { name: 'Executive Pay', active: 'true' },
        ];
      case pathConst.COMPANY_COMPENSATION_POLICY_DETAILS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Compensation', active: 'true' },
          { name: 'Compensation Policy Details', active: 'true' },
        ];
      case pathConst.COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN:
          return [
            {
              name: 'Company',
              active: 'true',
              isLink: true,
              url: pathConst.COMPANY_SEARCH,
            },
            { name: 'Compensation', active: 'true' },
            { name: 'Performance Metric Breakdown', active: 'true' },
          ];
      // GOVERNANCE
      case pathConst.GOVERNANCE:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
        ];
      case pathConst.GOVERNANCE_OVERVIEW:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'Overview', active: 'true' },
        ];
      case pathConst.GOVERNANCE_BYLAWSCHARTERGUIDELINES:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'Bylaws/ Charter/ Gov Guidelines', active: 'true' },
        ];
      case pathConst.GOVERNANCE_DIRECTORS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'Directors', active: 'true' },
        ];
      case pathConst.GOVERNANCE_COMPLIANCE:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'Compliance', active: 'true' },
        ];
      case pathConst.GOVERNANCE_POISONPILL:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'PoisonPill', active: 'true' },
        ];
      case pathConst.GOVERNANCE_LATESTFILINGS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'LatestFilings', active: 'true' },
        ];
      case pathConst.GOVERNANCE_SHAREHOLDERPROPOSAL:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Governance', active: 'true' },
          { name: 'ShareholderProposal', active: 'true' },
        ];
        case pathConst.GOVERNANCE_HISTORICAL:
          return [
            {
              name: 'Company',
              active: 'true',
              isLink: true,
              url: pathConst.COMPANY_SEARCH
            },
            { name: 'Governance', active: 'true' },
            { name: 'Historical Governance', active: 'true' }
          ];
      // VOTING
      case pathConst.VOTING:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
        ];
      case pathConst.VOTING_OVERVIEW:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Overview', active: 'true' },
        ];
      case pathConst.VOTING_QUICKVIEW:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Quick View', active: 'true' },
        ];
      case pathConst.VOTING_POLICYCHECKER:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Policy Checker', active: 'true' },
        ];
      case pathConst.VOTING_RESULTS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Voting Results', active: 'true' },
        ];
      case pathConst.VOTING_VOTEDETAIL:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Vote Detail', active: 'true' },
        ];
      case pathConst.VOTING_VOTESAGAINST_MGMT:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Votes Against Mgmt', active: 'true' },
        ];
      case pathConst.VOTING_NOACTIONLETTER:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'No Action Letters', active: 'true' },
        ];
      // COMPANY NEWS
      case pathConst.NEWS:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'News', active: 'true' },
        ];
      // OWNERSHIP
      case pathConst.OWNERSHIP:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
        ];
      case pathConst.OWNERSHIP_LONG_INVESTOR:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Long', active: 'true' },
          { name: 'Investor', active: 'true' },
        ];
      case pathConst.OWNERSHIP_SHORT_INVESTOR:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Short', active: 'true' },
          { name: 'Investor', active: 'true' },
        ];
      case pathConst.OWNERSHIP_LONG_FUND:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Long', active: 'true' },
          { name: 'Fund', active: 'true' },
        ];
      case pathConst.OWNERSHIP_SHORT_FUND:
        return [
          {
            name: 'Company',
            active: 'true',
            isLink: true,
            url: pathConst.COMPANY_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Short', active: 'true' },
          { name: 'Fund', active: 'true' },
        ];
      case pathConst.OWNERSHIP_INVESTOR_LONG_INVESTOR:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Long', active: 'true' },
          { name: 'Investors', active: 'true' },
        ];
      case pathConst.OWNERSHIP_INVESTOR_SHORT_INVESTOR:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Short', active: 'true' },
          { name: 'Investor', active: 'true' },
        ];
      case pathConst.OWNERSHIP_INVESTOR_LONG_FUND:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Long', active: 'true' },
          { name: 'Fund', active: 'true' },
        ];
      case pathConst.OWNERSHIP_INVESTOR_SHORT_FUND:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Ownership', active: 'true' },
          { name: 'Short', active: 'true' },
          { name: 'Fund', active: 'true' },
        ];

      // INVESTOR
      case pathConst.INVESTOR_SEARCH:
        return [{ name: 'Investors', active: 'true' }];
      // INVESTOR OVERVIEW
      case pathConst.INVESTOR_OVERVIEW:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      // INVESTOR ACTIVISM
      case pathConst.INVESTOR_ACTIVISM:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Activism', active: 'true', url: '' },
        ];
      case pathConst.INVESTOR_ACTIVISM_OVERVIEW:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_CAMPAIGNS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Activist Campaigns',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_INVESTMENTS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Activism Investments',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_DEMANDS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Activism Demand',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_FOLLOWER_RETURNS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Follower Returns',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_FILINGS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Filings',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_PERFORMANCE:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Performance - Periodic',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVISM_PERFORMANCE_ANNUAL:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Performance - Annual',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      /// /// INVESTOR ACTIVIST SHORTS
      case pathConst.INVESTOR_ACTIVIST_SHORT:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Activist Shorts', active: 'true' },
        ];
      case pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activist Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Overview',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVIST_SHORT_CAMPAIGNS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activist Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Campaigns',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activist Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Ownership Disclosures',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ACTIVIST_SHORT_FILINGS:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Activist Shorts',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Filings',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      /// /// INVESTOR VOTING
      case pathConst.INVESTOR_VOTING:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          { name: 'Voting', active: 'true' },
        ];
      case pathConst.INVESTOR_VOTING_OVERVIEW:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Overview',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_VOTING_PROFILE:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Profile',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_VOTING_SUMMARY:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Summary',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_VOTING_BY_PROPOSAL:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Proposal',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_ISS_GL_COMPARATOR:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'ISS/GL Comparator',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_VOTING_RATIONALE:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Rationale',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_PROXY_CONTEST_VOTING:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Proxy Contest Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.INVESTOR_FUNDS_VOTED:
        return [
          {
            name: 'Investors',
            active: 'true',
            isLink: true,
            url: pathConst.INVESTOR_SEARCH,
          },
          {
            name: 'Voting',
            active: 'false',
            isLink: false,
            url: '',
          },
          {
            name: 'Funds Voted',
            active: 'false',
            isLink: false,
            url: '',
          },
        ];

      case pathConst.INVESTOR_NEWS:
        return [{ name: 'Investors News', active: 'true' }];
      case pathConst.INVESTOR_OWNERSHIP:
        return [{ name: 'Investors Ownership', active: 'true' }];

      default:
        break;
      // #endregion
      // = ==========================Advisor================================
      // COMPANY SEARCGH
      case pathConst.ADVISOR_SEARCH:
        return [{ name: 'Adviser', active: 'true' }];
      // Advisor Overview
      // case pathConst.ADVISOR_OVERVIEW:
      //   return [
      //     {
      //       name: 'Advisor',
      //       active: 'true',
      //       isLink: true,
      //       url: pathConst.ADVISOR_SEARCH,
      //     },
      //     {
      //       name: 'Overview',
      //       active: 'true',
      //       isLink: false,
      //       url: '',
      //     },
      //   ];
      // ACTIVISM
      case pathConst.ADVISOR_ACTIVISM:
        return [
          {
            name: 'Adviser',
            active: 'true',
            isLink: true,
            url: pathConst.ADVISOR_SEARCH,
          },
          { name: 'Activism', active: 'true' },
        ];
      case pathConst.ADVISOR_ACTIVISM_OVERVIEW:
        return [
          {
            name: 'Adviser',
            active: 'true',
            isLink: true,
            url: pathConst.ADVISOR_SEARCH,
          },
          {
            name: 'Activism',
            active: 'false',
            isLink: false,
            url: '/',
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      // ACTIVIST SHORTS
      case pathConst.ADVISOR_ACTIVISTSHORT:
        return [
          {
            name: 'Adviser',
            active: 'true',
            isLink: true,
            url: pathConst.ADVISOR_SEARCH,
          },
          { name: 'Activist Shorts', active: 'true' },
        ];
      // case pathConst.ADVISOR_ACTIVISTSHORT_OVERVIEW:
      //   return [
      //     {
      //       name: 'Advisor',
      //       active: 'false',
      //       isLink: true,
      //       url: pathConst.ADVISOR_SEARCH,
      //     },
      //     {
      //       name: 'Activist-Shorts',
      //       active: 'false',
      //       isLink: false,
      //       url: '',
      //     },
      //     {
      //       name: 'Overview',
      //       active: 'true',
      //       isLink: false,
      //       url: '',
      //     },
      //   ];
      // VOTING
      case pathConst.ADVISOR_VOTING:
        return [
          {
            name: 'Adviser',
            active: 'true',
            isLink: true,
            url: pathConst.ADVISOR_SEARCH,
          },
          { name: 'Voting', active: 'true' },
        ];
      case pathConst.ADVISOR_VOTING_OVERVIEW:
        return [
          {
            name: 'Adviser',
            active: 'true',
            isLink: true,
            url: pathConst.ADVISOR_SEARCH,
          },
          { name: 'Voting', active: 'true' },
          { name: 'No Action', active: 'true' },
        ];

      // #region FAQ
      // GENERAL
      case pathConst.FAQHELP_GENERAL:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          {
            name: 'General',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.GENERAL_FAQ:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'General', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.GENERAL_DEFINITION:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'General', active: 'true' },
          { name: 'Definitions', active: 'true' },
        ];
      // ACTIVISM
      case pathConst.FAQHELP_ACTIVISM:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activism', active: 'true' },
        ];
      case pathConst.ACTIVISM_FAQ:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activism', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.ACTIVISM_DEFINITION:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activism', active: 'true' },
          { name: 'Definitions', active: 'true' },
        ];
      // ACTIVIST SHORTS
      case pathConst.FAQHELP_ACTIVISTSHORTS:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activist Shorts', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.ACTIVISTSHORTS_FAQ:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activist Shorts', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.ACTIVISTSHORTS_DEFINITION:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activist Shorts', active: 'true' },
          { name: 'Definitions', active: 'true' },
        ];
      // ACTIVIST VULNERABILITY
      case pathConst.FAQHELP_ACTIVIST_VULNERABILITY:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activist Vulnerability', active: 'true' },
        ];
      case pathConst.ACTIVIST_VULNERABILITY_FAQ:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activist Vulnerability', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.ACTIVIST_VULNERABILITY_DEFINITION:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Activist Vulnerability', active: 'true' },
          { name: 'Definitions', active: 'true' },
        ];
      // GOVERNANCE
      case pathConst.FAQHELP_GOVERNANCE:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Governance', active: 'true' },
        ];
      case pathConst.GOVERNANCE_FAQ:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Governance', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.GOVERNANCE_DEFINITION:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Governance', active: 'true' },
          { name: 'Definitions', active: 'true' },
        ];
      // VOTING
      case pathConst.FAQHELP_VOTING:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Voting', active: 'true' },
        ];
      case pathConst.VOTING_FAQ:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Voting', active: 'true' },
          { name: 'FAQ', active: 'true' },
        ];
      case pathConst.VOTING_DEFINITION:
        return [
          {
            name: 'FAQ / Definitions',
            active: 'true',
            isLink: true,
            url: pathConst.FAQHELP_GENERAL,
          },
          { name: 'Voting', active: 'true' },
          { name: 'Definitions', active: 'true' },
        ];
        case pathConst.COMPENSATION_FAQHELP:
          return [
            {
              name: 'FAQ / Definitions',
              active: 'true',
              isLink: true,
              url: pathConst.FAQHELP_GENERAL,
            },
            { name: 'Compensation', active: 'true' },
            { name: 'FAQ', active: 'true' },
          ];
      // #endregion

      // #region My Alert

      // My Alert - General
      case pathConst.MY_ALERT_NEW:
        return [
          {
            name: 'My Alerts',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.MY_ALERT_EXISTING_ALERT:
        return [
          {
            name: 'Existing Alerts',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.MY_ALERT_INBOX:
        return [
          {
            name: 'Alert Inbox',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.PEOPLE_SEARCH:
        return [
          {
            name: 'People',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.PEOPLE_OVERVIEW:
        return [
          {
            name: 'People',
            active: 'true',
            isLink: true,
            url: pathConst.PEOPLE_SEARCH,
          },
          {
            name: 'Overview',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.DIRECTORSHIP_AND_EXECUTIVE:
        return [
          {
            name: 'People',
            active: 'true',
            isLink: true,
            url: pathConst.PEOPLE_SEARCH,
          },
          {
            name: 'Directorship & Executive',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
        case pathConst.PEOPLE_COMPENSATION:
        return [
          {
            name: 'People',
            active: 'true',
            isLink: true,
            url: pathConst.PEOPLE_COMPENSATION,
          },
          {
            name: 'Compensation',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];

      // #endregion

      // #region PREFERENCES
      case pathConst.PREFERENCES:
        return [{ name: 'Preferences', active: 'true' }];
      // #endregion

      // #region RECENT_DOWNLOADS
      case pathConst.RECENT_DOWNLOADS:
        return [{ name: 'Recent Downloads', active: 'true' }];
      // #endregion

      // #region MAGAZINES_REPORTS
      case pathConst.MAGAZINES_REPORTS:
        return [{ name: 'Publications', active: 'true' }];

      case pathConst.LATEST_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.LATEST_REPORTS,
          },
          {
            name: 'Latest',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.ACTIVISM_MAGAZINE:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MAGAZINE,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.ACTIVISM_LATEST_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.LATEST_REPORTS,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Latest',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.ACTIVISM_MONTHLY_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_LATEST_REPORTS,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Monthly Reports',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.ACTIVISM_QUARTERLY_STATS_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MAGAZINE,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Quarterly Stats',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.ACTIVISM_SPECIAL_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MAGAZINE,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Special Reports',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.ACTIVISM_13F_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MAGAZINE,
          },
          {
            name: 'Activism',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: '13F',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.VOTING_MAGAZINE:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.VOTING_MAGAZINE,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.VOTING_LATEST_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.VOTING_MAGAZINE,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Latest',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.VOTING_MONTHLY_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.VOTING_MAGAZINE,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Monthly',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.VOTING_SPECIAL_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.VOTING_MAGAZINE,
          },
          {
            name: 'Voting',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Special',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.SHORTS_LATEST_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.SHORTS_MAGAZINE,
          },
          {
            name: 'Shorts',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Latest',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.GOVERNANCE_LATEST_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.GOVERNANCE_MAGAZINE,
          },
          {
            name: 'Governance',
            active: 'true',
            isLink: true,
            url: '',
          },
          {
            name: 'Latest',
            active: 'true',
            isLink: false,
            url: '/',
          },
        ];
      case pathConst.PROXY_MONTHLY:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MONTHLY,
          },
          {
            name: 'Proxy Monthly',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.SPECIAL_REPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MONTHLY,
          },
          {
            name: 'Special Reports',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      case pathConst.SEARCH_ALLREPORTS:
        return [
          {
            name: 'Publications',
            active: 'true',
            isLink: true,
            url: pathConst.ACTIVISM_MONTHLY,
          },
          {
            name: 'Search All Reports',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      // #endregion

      // #region UNIVERSAL_SEARCH
      case pathConst.UNIVERSAL_SEARCH:
        return [
          {
            name: 'Universal Seach',
            active: 'true',
            isLink: false,
            url: '',
          },
        ];
      // #endregion

      // default:
      //   break;
    }
  }
};

export const subHeader = (
  path,
  meetingid,
  pid,
  investor,
  handleResetLoading,
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  selectedCompanyPath,
  handleHoverSubmenu,
  selectedHoverSubmenu,
  props,
  isNavbarSelectionClick,
  setNavbarSelectionClick,
  handleNavOutsideClick,
  selectNavOutsideClick,
  token,
  handlePDFDownloadNotification,
  handleGeneratePDF,
  generatePDF,
  pdfDownloadNotification,
  handlePDFDownloadCancelClick,
  handlePDFListItems,
  pdfListItems,
  pdfDownloadCancelBtn,
  pdfMenuShow,
  handlePDFMenuShow,
  showComplianceTab,
  showLatestFilingsTab,
  showPoisonPillTab,
  showShareholderProposalsTab,
  showBylaws_Charter_GovGuidelinesTab,
  handleGlobleResetInvestorCmparator,
  handleResetLoader,
  handleActivistCampaignsToolReset,
  handleGlobleResetProxyContestVoting,
  handleGlobleResetActivistShort,
  companyProductSelection,
  investorNavObj,
  handleGlobleResetMyAlert,
  isExistNoActionLetters_CompanyVoting,
  director_id,
  company_id,
  lstModuleAccess,
  lstAlertModuleAccess,
  accessPerformance,
  isActivistShortModuleAccess,
  trialUserDisableDownload,
  longAccess,
  shortAccess,
  invLongAccess,
  invShortAccess,
  pdfDownloadLoader,
  handlePDFDownloadLoader,
  accessDemand,
  accessInvFilings,
  accessComFilings,
  accessFollowerAccess,
  showHistoricalGov,
  people_data,
  compensationNoData,
  isCompensationFaq,
) => {
  // Without Header Pages
  if (pathConst.COMPANY_SEARCH === path || pathConst.DASHBOARD === path) {
    return;
  }
  switch (selectedCompanyPath) {
    // #region Advisor
    case pathConst.ADVISOR_ACTIVISM:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <AdvisorHeader
              company_id={company_id}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              lstModuleAccess={lstModuleAccess}
              {...props}
            />
          </div>
        </div>
      );
    case pathConst.ADVISOR_ACTIVISTSHORT:
      // case pathConst.ADVISOR_ACTIVISTSHORT_OVERVIEW:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <AdvisorHeader
              company_id={company_id}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              lstModuleAccess={lstModuleAccess}
              {...props}
            />
          </div>
        </div>
      );
    case pathConst.ADVISOR_VOTING:
    case pathConst.ADVISOR_VOTING_OVERVIEW:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <AdvisorHeader
              company_id={company_id}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              lstModuleAccess={lstModuleAccess}
              {...props}
            />
            <AdvisorVotingHeader
              company_id={company_id}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              lstModuleAccess={lstModuleAccess}
              {...props}
            />
          </div>
        </div>
      );
    // #endregion

    // #region news
    case pathConst.NEWS_OVERVIEW:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVISM:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVISM_LATEST:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVISM_COVID19:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />

            {/* {newsMobileNavbar(
              handleResetLoading,
              handleVisitorLog,
              handleResetBreadcrumbs,
              isNavbarSelectionClick,
              setNavbarSelectionClick,
              handleNavOutsideClick,
              selectNavOutsideClick
            )} */}
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVISM_THIS_WEEK:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVISM_WEEKLY_WRAP:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVISM_IN_DEPTH_ARTICLES:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_SHORT:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewActivistShortHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, 800)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewActivistShortHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_VULNERABILITY:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />

            <ActivismVulnerabilityHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_VULNERABILITY_LATEST:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <ActivismVulnerabilityHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_VULNERABILITY_REPORT:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <ActivismVulnerabilityHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_VULNERABILITY_HIT:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <ActivismVulnerabilityHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_ACTIVIST_VULNERABILITY_UPDATES:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <ActivismVulnerabilityHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_GOVERNANCE:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_VOTING:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsVotingHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_VOTING_IN_DEPTH_ARTICLES:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, 800)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
            <NewsVotingHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
              {...props}
            />
          </div>
        </div>
      );

      case pathConst.NEWS_COMPENSATION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
          </div>
        </div>
      );

    case pathConst.NEWS_SEARCH:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <NewsHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              {...props}
            />
          </div>
        </div>
      );
    // #endregion

    // #region INVESTOR
    case pathConst.INVESTOR_OVERVIEW:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              selectNavOutsideClick={selectNavOutsideClick}
              handleNavOutsideClick={handleNavOutsideClick}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleHoverSubmenu={handleHoverSubmenu}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              token={token}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
          </div>
        </div>
      );
    case pathConst.INVESTOR_ACTIVISM:
    case pathConst.INVESTOR_ACTIVISM_OVERVIEW:
    case pathConst.INVESTOR_ACTIVISM_CAMPAIGNS:
    case pathConst.INVESTOR_ACTIVISM_INVESTMENTS:
    case pathConst.INVESTOR_ACTIVISM_DEMANDS:
    case pathConst.INVESTOR_ACTIVISM_FOLLOWER_RETURNS:
    case pathConst.INVESTOR_ACTIVISM_PERFORMANCE:
    case pathConst.INVESTOR_ACTIVISM_PERFORMANCE_ANNUAL:
    case pathConst.INVESTOR_ACTIVISM_FILINGS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              selectNavOutsideClick={selectNavOutsideClick}
              handleNavOutsideClick={handleNavOutsideClick}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleHoverSubmenu={handleHoverSubmenu}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              token={token}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              accessPerformance={accessPerformance}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              accessDemand={accessDemand}
              accessInvFilings={accessInvFilings}
              accessFollowerAccess={accessFollowerAccess}
            />
            <InvestorActivismHeader
              investor={investor}
              handleHoverSubmenu={handleHoverSubmenu}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              accessPerformance={accessPerformance}
              accessDemand={accessDemand}
              accessInvFilings={accessInvFilings}
              accessFollowerAccess={accessFollowerAccess}
              handleResetLoader={handleResetLoader}
            />
          </div>
        </div>
      );
    case pathConst.INVESTOR_ACTIVIST_SHORT:
    case pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW:
    case pathConst.INVESTOR_ACTIVIST_SHORT_CAMPAIGNS:
    case pathConst.INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES:
    case pathConst.INVESTOR_ACTIVIST_SHORT_FILINGS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              selectNavOutsideClick={selectNavOutsideClick}
              handleNavOutsideClick={handleNavOutsideClick}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleHoverSubmenu={handleHoverSubmenu}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              token={token}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
            <InvestorActivistShortHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              handleHoverSubmenu={handleHoverSubmenu}
              handleGlobleResetActivistShort={handleGlobleResetActivistShort}
              handleResetLoader={handleResetLoader}
            />
          </div>
        </div>
      );
    case pathConst.INVESTOR_VOTING:
    case pathConst.INVESTOR_VOTING_OVERVIEW:
    case pathConst.INVESTOR_VOTING_PROFILE:
    case pathConst.INVESTOR_VOTING_SUMMARY:
    case pathConst.INVESTOR_VOTING_BY_PROPOSAL:
    case pathConst.INVESTOR_ISS_GL_COMPARATOR:
    case pathConst.INVESTOR_VOTING_RATIONALE:
    case pathConst.INVESTOR_PROXY_CONTEST_VOTING:
    case pathConst.INVESTOR_FUNDS_VOTED:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              selectNavOutsideClick={selectNavOutsideClick}
              handleNavOutsideClick={handleNavOutsideClick}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleHoverSubmenu={handleHoverSubmenu}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              token={token}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
            <InvestorVotingHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              handleGlobleResetInvestorCmparator={handleGlobleResetInvestorCmparator}
              handleGlobleResetProxyContestVoting={handleGlobleResetProxyContestVoting}
              handleResetLoader={handleResetLoader}
              handleHoverSubmenu={handleHoverSubmenu}
            />
          </div>
        </div>
      );
    case pathConst.INVESTOR_NEWS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              selectNavOutsideClick={selectNavOutsideClick}
              handleNavOutsideClick={handleNavOutsideClick}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleHoverSubmenu={handleHoverSubmenu}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              token={token}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
          </div>
        </div>
      );

    // Ownership Long Short
    // OWNERSHIP
    case pathConst.INVESTOR_OWNERSHIP:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
            <InvestorOwnershipHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleResetLoading={handleResetLoading}
              handleVisitorLog={handleVisitorLog}
              investor={investor}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
          </div>
        </div>
      );
    case pathConst.OWNERSHIP_INVESTOR_LONG_INVESTOR:
    case pathConst.OWNERSHIP_INVESTOR_SHORT_INVESTOR:
    case pathConst.OWNERSHIP_INVESTOR_LONG_FUND:
    case pathConst.OWNERSHIP_INVESTOR_SHORT_FUND:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <InvestorHeader
              investor={investor}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              investorNavObj={investorNavObj}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
            <InvestorOwnershipHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleResetLoading={handleResetLoading}
              handleVisitorLog={handleVisitorLog}
              investor={investor}
              InvLongShort={{ long: invLongAccess, short: invShortAccess }}
              handleResetLoader={handleResetLoader}
            />
          </div>
        </div>
      );

    // #endregion

    // #region People search
    case pathConst.PEOPLE_OVERVIEW:
      return (
        // for sub header remove noSubheader class
        <div className='row navFixed noSubHeader'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <PeopleHeader
              director_id={director_id}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              people_data={people_data}
              compensationNoData={compensationNoData}
              {...props}
            />
          </div>
        </div>
      );
    case pathConst.DIRECTORSHIP_AND_EXECUTIVE:
    case pathConst.COMPENSATION:
      return (
        // for sub header remove noSubheader class
        <div className='row navFixed noSubHeader'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <PeopleHeader
              director_id={director_id}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              people_data={people_data}
              compensationNoData={compensationNoData}
              {...props}
            />
            {/* removed temporarily */}
            {/* <DirectorshipAndExecutiveHeader
              director_id={director_id}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              {...props} />
            {...props}/> */}
          </div>
        </div>
      );

      case pathConst.PEOPLE_COMPENSATION:
      return (
        // for sub header remove noSubheader class
        <div className='row navFixed noSubHeader'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <PeopleHeader
              director_id={director_id}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              people_data={people_data}
              compensationNoData={compensationNoData}
              {...props}
            />
            {/* removed temporarily */}
            {/* <DirectorshipAndExecutiveHeader
              director_id={director_id}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              {...props} />
            {...props}/> */}
          </div>
        </div>
      );

    // #endregion

    // #region company
    // OVERVIEW
    case pathConst.COMPANY_OVERVIEW:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={
                isExistNoActionLetters_CompanyVoting
              }
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
          </div>
        </div>
      );
    // ACTIVISM
    case pathConst.ACTIVISM:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              accessComFilings={accessComFilings}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <ActivismHeader
              pid={pid}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
              accessComFilings={accessComFilings}
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    case pathConst.ACTIVISM_OVERVIEW:
    case pathConst.ACTIVIST_CAMPAIGNS:
    case pathConst.ACTIVIST_FILINGS:
    case pathConst.ACTIVIST_INVESTMENT:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              accessComFilings={accessComFilings}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <ActivismHeader
              pid={pid}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              accessComFilings={accessComFilings}
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    // ACTIVIST SHORTS
    case pathConst.ACTIVISTSHORTS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <ActivistShortHeader
              pid={pid}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    case pathConst.ACTIVISTSHORTS_OVERVIEW:
    case pathConst.ACTIVISTSHORTS_CAMPAIGNS:
    case pathConst.ACTIVISTSHORTS_FILINGS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <ActivistShortHeader
              pid={pid}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    // ACTIVIST VULNERABILITY
    case pathConst.ACTIVIST_VULNERABILITY:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
          </div>
        </div>
      );
    // COMPENSATION
    case pathConst.COMPANY_COMPENSATION:
    case pathConst.COMPANY_COMPENSATION_OVERVIEW:
    case pathConst.COMPANY_COMPENSATION_EXECUTIVE_PAY:
    case pathConst.COMPANY_COMPENSATION_POLICY_DETAILS:
    case pathConst.COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={
                showBylaws_Charter_GovGuidelinesTab
              }
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={
                isExistNoActionLetters_CompanyVoting
              }
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <CompensationHeader
              pid={pid}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={
                showBylaws_Charter_GovGuidelinesTab
              }
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
          </div>
        </div>
      );
    // GOVERNANCE
    case pathConst.GOVERNANCE:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <GovernanceHeader
              pid={pid}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={
                showBylaws_Charter_GovGuidelinesTab
              }
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
          </div>
        </div>
      );
    case pathConst.GOVERNANCE_OVERVIEW:
    case pathConst.GOVERNANCE_BYLAWSCHARTERGUIDELINES:
    case pathConst.GOVERNANCE_DIRECTORS:
    case pathConst.GOVERNANCE_POISONPILL:
    case pathConst.GOVERNANCE_LATESTFILINGS:
    case pathConst.GOVERNANCE_COMPLIANCE:
    case pathConst.GOVERNANCE_SHAREHOLDERPROPOSAL:
    case pathConst.GOVERNANCE_HISTORICAL:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              meetingid={meetingid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <GovernanceHeader
              pid={pid}
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={
                showBylaws_Charter_GovGuidelinesTab
              }
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
          </div>
        </div>
      );
    // VOTING
    case pathConst.VOTING:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              pid={pid}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              meetingid={meetingid}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <VotingHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              meetingid={meetingid}
              pid={pid}
              handleResetLoading={handleResetLoading}
              handleVisitorLog={handleVisitorLog}
              isExistNoActionLetters_CompanyVoting={
                isExistNoActionLetters_CompanyVoting
              }
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    case pathConst.VOTING_OVERVIEW:
    case pathConst.VOTING_QUICKVIEW:
    case pathConst.VOTING_POLICYCHECKER:
    case pathConst.VOTING_RESULTS:
    case pathConst.VOTING_VOTEDETAIL:
    case pathConst.VOTING_VOTESAGAINST_MGMT:
    case pathConst.VOTING_NOACTIONLETTER:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              selectedHoverSubmenu={selectedHoverSubmenu}
              meetingid={meetingid}
              pid={pid}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              trialUserDisableDownload={trialUserDisableDownload}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <VotingHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleResetLoading={handleResetLoading}
              handleVisitorLog={handleVisitorLog}
              meetingid={meetingid}
              pid={pid}
              isExistNoActionLetters_CompanyVoting={
                isExistNoActionLetters_CompanyVoting
              }
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    // COMPANY -> NEWS
    case pathConst.NEWS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              longShortAcces={{ long: longAccess, short: shortAccess }}
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              meetingid={meetingid}
              pid={pid}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
          </div>
        </div>
      );
    // OWNERSHIP
    case pathConst.OWNERSHIP:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              meetingid={meetingid}
              pid={pid}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={
                isExistNoActionLetters_CompanyVoting
              }
              showHistoricalGov={showHistoricalGov}
              longShortAcces={{ long: longAccess, short: shortAccess }}
              {...props}
            />
            <OwnershipHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleResetLoading={handleResetLoading}
              handleVisitorLog={handleVisitorLog}
              meetingid={meetingid}
              pid={pid}
              longShortAcces={{ long: longAccess, short: shortAccess }}
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    case pathConst.OWNERSHIP_LONG_INVESTOR:
    case pathConst.OWNERSHIP_SHORT_INVESTOR:
    case pathConst.OWNERSHIP_LONG_FUND:
    case pathConst.OWNERSHIP_SHORT_FUND:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <CompanyHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              selectedHoverSubmenu={selectedHoverSubmenu}
              meetingid={meetingid}
              pid={pid}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
              token={token}
              handlePDFListItems={handlePDFListItems}
              handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
              pdfListItems={pdfListItems}
              pdfDownloadCancelBtn={pdfDownloadCancelBtn}
              handlePDFDownloadNotification={handlePDFDownloadNotification}
              handleGeneratePDF={handleGeneratePDF}
              pdfDownloadLoader={pdfDownloadLoader}
              handlePDFDownloadLoader={handlePDFDownloadLoader}
              generatePDF={generatePDF}
              pdfDownloadNotification={pdfDownloadNotification}
              pdfMenuShow={pdfMenuShow}
              handlePDFMenuShow={handlePDFMenuShow}
              showComplianceTab={showComplianceTab}
              showLatestFilingsTab={showLatestFilingsTab}
              showPoisonPillTab={showPoisonPillTab}
              showShareholderProposalsTab={showShareholderProposalsTab}
              showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
              isActivistShortModuleAccess={isActivistShortModuleAccess}
              companyProductSelection={companyProductSelection}
              isExistNoActionLetters_CompanyVoting={isExistNoActionLetters_CompanyVoting}
              longShortAcces={{ long: longAccess, short: shortAccess }}
              showHistoricalGov={showHistoricalGov}
              {...props}
            />
            <OwnershipHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleResetLoading={handleResetLoading}
              handleVisitorLog={handleVisitorLog}
              meetingid={meetingid}
              pid={pid}
              longShortAcces={{ long: longAccess, short: shortAccess }}
              showHistoricalGov={showHistoricalGov}
            />
          </div>
        </div>
      );
    // #endregion

    // #region FAQ
    // GENERAL
    case pathConst.FAQHELP_GENERAL:
    case pathConst.GENERAL_FAQ:
    case pathConst.GENERAL_DEFINITION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <FAQHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              isCompensationFaq={isCompensationFaq}
            />
            <FAQGeneralHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );
    // ACTIVISM
    case pathConst.FAQHELP_ACTIVISM:
    case pathConst.ACTIVISM_FAQ:
    case pathConst.ACTIVISM_DEFINITION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <FAQHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              isCompensationFaq={isCompensationFaq}
            />
            <FAQActivismHeader
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleHoverSubmenu={handleHoverSubmenu}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );
    // ACTIVIST SHORTS
    case pathConst.FAQHELP_ACTIVISTSHORTS:
    case pathConst.ACTIVISTSHORTS_FAQ:
    case pathConst.ACTIVISTSHORTS_DEFINITION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <FAQHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              isCompensationFaq={isCompensationFaq}
            />
            <FAQActivistShortHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );
    // ACTIVIST VULNERABILITY
    case pathConst.FAQHELP_ACTIVIST_VULNERABILITY:
    case pathConst.ACTIVIST_VULNERABILITY_FAQ:
    case pathConst.ACTIVIST_VULNERABILITY_DEFINITION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <FAQHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              isCompensationFaq={isCompensationFaq}
            />
            <FAQActivistVulnerabilityHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );
    // GOVERNANCE
    case pathConst.FAQHELP_GOVERNANCE:
    case pathConst.GOVERNANCE_FAQ:
    case pathConst.GOVERNANCE_DEFINITION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <FAQHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              isCompensationFaq={isCompensationFaq}
            />
            <FAQGovernanceHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );
    // VOTING
    case pathConst.FAQHELP_VOTING:
    case pathConst.VOTING_FAQ:
    case pathConst.VOTING_DEFINITION:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <FAQHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              isCompensationFaq={isCompensationFaq}
            />
            <FAQVotingHeader
              handleHoverSubmenu={handleHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
            />
          </div>
        </div>
      );
    //Compensation
    case pathConst.FAQHELP_COMPENSATION:
      case pathConst.COMPENSATION_FAQHELP:
        return (
          <div className='row navFixed'>
            <div
              className='sticky-outer-wrapper'
              onMouseLeave={() =>
                setTimeout(() => {
                  handleResetCompanyPath(path);
                }, timer)
              }
            >
              <FAQHeader
                selectedHoverSubmenu={selectedHoverSubmenu}
                handleResetCompanyPath={handleResetCompanyPath}
                handleResetBreadcrumbs={handleResetBreadcrumbs}
                handleVisitorLog={handleVisitorLog}
                isNavbarSelectionClick={isNavbarSelectionClick}
                setNavbarSelectionClick={setNavbarSelectionClick}
                handleNavOutsideClick={handleNavOutsideClick}
                selectNavOutsideClick={selectNavOutsideClick}
                isCompensationFaq={isCompensationFaq}
              />
              <FAQCompensationHeader
                handleHoverSubmenu={handleHoverSubmenu}
                handleResetCompanyPath={handleResetCompanyPath}
                handleResetBreadcrumbs={handleResetBreadcrumbs}
                handleVisitorLog={handleVisitorLog}
              />
            </div>
          </div>
        );
    // #endregion

    // #region My Alert
    // My Alert - General
    case pathConst.MY_ALERT_NEW:
    case pathConst.MY_ALERT_EXISTING_ALERT:
    case pathConst.MY_ALERT_INBOX:
      return (
        // for sub header remove noSubheader class
        <div className='row navFixed noSubHeader'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <MyAlertHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleGlobleResetMyAlert={handleGlobleResetMyAlert}
              lstAlertModuleAccess={lstAlertModuleAccess}
            />
          </div>
        </div>
      );
    // #endregion

    // ACTIVISM
    case pathConst.ACTIVISM_MONTHLY:
    case pathConst.PROXY_MONTHLY:
    case pathConst.SPECIAL_REPORTS:
    case pathConst.LATEST_REPORTS:
    case pathConst.SEARCH_ALLREPORTS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <MagazinesReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
          </div>
        </div>
      );

    case pathConst.ACTIVISM_MAGAZINE:
    case pathConst.ACTIVISM_LATEST_REPORTS:
    case pathConst.ACTIVISM_MONTHLY_REPORTS:
    case pathConst.ACTIVISM_QUARTERLY_STATS_REPORTS:
    case pathConst.ACTIVISM_SPECIAL_REPORTS:
    case pathConst.ACTIVISM_13F_REPORTS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <MagazinesReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
            <ActivismReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
          </div>
        </div>
      );

    case pathConst.VOTING_MAGAZINE:
    case pathConst.VOTING_LATEST_REPORTS:
    case pathConst.VOTING_MONTHLY_REPORTS:
    case pathConst.VOTING_SPECIAL_REPORTS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <MagazinesReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
            <VotingReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
          </div>
        </div>
      );

    case pathConst.SHORTS_MAGAZINE:
    case pathConst.SHORTS_LATEST_REPORTS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <MagazinesReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
            <ShortsReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
          </div>
        </div>
      );

    case pathConst.GOVERNANCE_MAGAZINE:
    case pathConst.GOVERNANCE_LATEST_REPORTS:
      return (
        <div className='row navFixed'>
          <div
            className='sticky-outer-wrapper'
            onMouseLeave={() =>
              setTimeout(() => {
                handleResetCompanyPath(path);
              }, timer)
            }
          >
            <MagazinesReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
            <GovernanceReportHeader
              selectedHoverSubmenu={selectedHoverSubmenu}
              handleResetCompanyPath={handleResetCompanyPath}
              handleResetBreadcrumbs={handleResetBreadcrumbs}
              handleVisitorLog={handleVisitorLog}
              isNavbarSelectionClick={isNavbarSelectionClick}
              setNavbarSelectionClick={setNavbarSelectionClick}
              handleNavOutsideClick={handleNavOutsideClick}
              selectNavOutsideClick={selectNavOutsideClick}
              handleHoverSubmenu={handleHoverSubmenu}
            />
          </div>
        </div>
      );

    default:
      break;
  }
};
