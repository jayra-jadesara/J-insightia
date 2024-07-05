import React from 'react';
import Page from '../Page';
import bn from '../../utils/bemnames';
import { history } from '../../utils/navigation-util';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  ACTIVIST_SHORTS,
  ACTIVISM,
  VOTING,
  GOVERNANCE,
  ACTIVIST_VULNERABILITY,
  COMPENSATION,
} from '../../constants/ProductConstants';
import CollapseComponent from '../GeneralForm/CollapseComponent';
import {
  ACTIVIST_CAMPAIGNS_TOOL,
  PUBLICDEMANDS_TOOL,
  HOLDINGSDATA_AND_ANALYTICS_TOOL,
  SHAREHOLDER_PROPOSALS_TOOL,
  ANNUAL_PERFORMANCE,
  FILLINGS_SEARCH_TOOL,
  RESOLUTION_TRACKER_TOOL,
  INVESTOR_COMPARATOR_TOOL,
  NOACTIONDATA_AND_ANALYTICS_TOOL,
  DISSIDENT_VOTING_SUMMARY_TOOL,
  COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL,
  GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
  US_STATEGOVERNANCEDATA_TOOL,
  GLOBAL_GOVERNANCEDATA_TOOL,
  DIRECTORDATA_AND_ANALYTICS_TOOL,
  UPCOMING_EVENTS_TOOL,
  AMENDMENT_DATA_AND_ANALYTICS_TOOL,
  POISONPILLDATA_AND_ANALYTICS_TOOL,
  VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
  SHORT_CAMPAIGN_DATA_AND_ANALYTICS,
  NOTIFIED_SHORT_POSITION_DATA,
  ADVANCED_VOTING_DATA_SEARCH,
  SHORT_ACTIVIST_FILLINGS_SEARCH,
  ACTIVIST_CAMPAIGN_ADVISOR,
  SHORT_ACTIVIST_CAMPAIGN_ADVISOR,
  POWERSEARCH_TOOL,
  ACTIVISM_TRENDS,
  GOVERNANCE_SCORE_DATA_TOOL,
  VULNAREBILITY_ADVANCED_SEARCH,
  GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL,
  COMPENSATION_P4P_MODELER,
  COMPENSATION_SAY_ON_PAY_VOTE_RESULTS,
  COMPENSATION_REMUNERATION_COMMITEE_MEMBER,
  COMPENSATION_COMPARATOR,
} from '../../constants/PathsConstant';
import {
  SHORT_CAMPAIGN_DATA_AND_ANALYTICS_BLURB,
  NOTIFIED_SHORT_POSITION_DATA_BLURB,
  ACTIVIST_CAMPAIGNS_TOOL_BLURB,
  PUBLICDEMANDS_TOOL_BLURB,
  HOLDINGSDATA_AND_ANALYTICS_TOOL_BLURB,
  ANNUAL_PERFORMANCE_BLURB,
  FILLINGS_SEARCH_TOOL_BLURB,
  ACTIVIST_CAMPAIGNS_ADVISORS_BLURB,
  ACTIVIST_TRENDS_BLURB,
  RESOLUTION_TRACKER_TOOL_BLURB,
  INVESTOR_COMPARATOR_TOOL_BLURB,
  NOACTIONDATA_AND_ANALYTICS_TOOL_BLURB,
  DISSIDENT_VOTING_SUMMARY_TOOL_BLURB,
  ADVANCED_VOTING_DATA_SEARCH_BLURB,
  COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL_BLURB,
  GLOBAL_GOVERNANCEDATA_TOOL_BLURB,
  DIRECTORDATA_AND_ANALYTICS_TOOL_BLURB,
  UPCOMING_EVENTS_TOOL_BLURB,
  AMENDMENT_DATA_AND_ANALYTICS_TOOL_BLURB,
  POISONPILLDATA_AND_ANALYTICS_TOOL_BLURB,
  VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
  POWERSEARCH_TOOL_BLURB,
  GOVERNANCE_SCORE_DATA,
  GOVERNANCE_DIRECTOR_SKILLS_AND_ANALYTICS_TOOL_BLURB,
  VULNAREBILITY_ADVANCED_SEARCH_BLURB,
  COMPENSATION_P4P_MODELER_BLURB,
  COMPENSATION_SAY_ON_PAY_VOTE_RESULTS_BLURB,
  COMPENSATION_REMUNERATION_COMMITEE_MEMBER_BLURB,
  COMPENSATION_COMPARATOR_BLURB
} from '../../constants/ToolBlurbsConstant';
import { NUMBER_TWO, NUMBER_FOUR } from '../../constants/NumberConstants';

const bem = bn.create('tools');
const bem2 = bn.create('faqhelp');

const castButtonName = 'Use this tool';
// add new tool card in this const
//These are not used on this page, are they in use elsewhere? - Chris Darrall
export const toolListItems = [
  {
    title: 'Insightia',
    isTitle: true,
    productId: ACTIVISM,
    productItems: [
      {
        cardHeading: 'Powersearch',
        cardDesc: POWERSEARCH_TOOL_BLURB,
        castButtonName,
        cardGotoPath: POWERSEARCH_TOOL,
      },
    ],
  },
  // Activist Shorts
  {
    title: 'Activist Shorts',
    isTitle: true,
    productId: ACTIVIST_SHORTS,
    productItems: [
      {
        cardHeading: 'Activist Shorts Campaign Data and Analytics',
        cardDesc: SHORT_CAMPAIGN_DATA_AND_ANALYTICS_BLURB,
        castButtonName,
        cardGotoPath: SHORT_CAMPAIGN_DATA_AND_ANALYTICS,
      },
      {
        cardHeading: 'Notified Short Position Data',
        cardDesc: NOTIFIED_SHORT_POSITION_DATA_BLURB,
        castButtonName,
        cardGotoPath: NOTIFIED_SHORT_POSITION_DATA,
      },
      {
        cardHeading: 'Activist Shorts Campaign Advisers',
        cardDesc:
          'The activist shorts campaign advisers tool contains information on which advisers represented investors and companies during activist short campaigns.',
        castButtonName,
        cardGotoPath: SHORT_ACTIVIST_CAMPAIGN_ADVISOR,
      },
      {
        cardHeading: 'Filings Search',
        cardDesc:
          'The filings search tool allows you to filter and search for investor and company filings attached to short activist campaigns.',
        castButtonName,
        cardGotoPath: SHORT_ACTIVIST_FILLINGS_SEARCH,
      },
    ],
  },
  // Activism
  {
    title: 'Activism',
    isTitle: true,
    productId: ACTIVISM,
    productItems: [
      {
        cardHeading: 'Activist Campaigns',
        cardDesc: ACTIVIST_CAMPAIGNS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: ACTIVIST_CAMPAIGNS_TOOL,
      },
      {
        cardHeading: 'Public Demands Data and Analytics',
        cardDesc: PUBLICDEMANDS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: PUBLICDEMANDS_TOOL,
      },
      {
        cardHeading: 'Holdings Data and Analytics',
        cardDesc: HOLDINGSDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: HOLDINGSDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Performance',
        cardDesc: ANNUAL_PERFORMANCE_BLURB,
        castButtonName,
        cardGotoPath: ANNUAL_PERFORMANCE,
      },
      // {
      //   cardHeading: "Follower Returns Data and Analytics",
      //   cardDesc:
      //     "The public demand tool contains information on all public demands available in our database. You can get a straight download of the data or more data is available to do analytics directly on our site.",
      //   castButtonName,
      //   cardGotoPath: FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL,
      // },
      {
        cardHeading: 'Filings Search',
        cardDesc: FILLINGS_SEARCH_TOOL_BLURB,
        castButtonName,
        cardGotoPath: FILLINGS_SEARCH_TOOL,
      },
      {
        cardHeading: 'Activist Campaign Advisers',
        cardDesc: ACTIVIST_CAMPAIGNS_ADVISORS_BLURB,
        castButtonName,
        cardGotoPath: ACTIVIST_CAMPAIGN_ADVISOR,
      },
      {
        cardHeading: 'Activism Trends',
        cardDesc: ACTIVIST_TRENDS_BLURB,
        castButtonName,
        cardGotoPath: ACTIVISM_TRENDS,
      },
    ],
  },
  // Voting
  {
    title: 'Voting',
    isTitle: true,
    productId: VOTING,
    productItems: [
      {
        cardHeading: 'Resolution Tracker',
        cardDesc: RESOLUTION_TRACKER_TOOL_BLURB,
        castButtonName,
        cardGotoPath: RESOLUTION_TRACKER_TOOL,
      },
      {
        cardHeading: 'Investor Comparator',
        cardDesc: INVESTOR_COMPARATOR_TOOL_BLURB,
        castButtonName,
        cardGotoPath: INVESTOR_COMPARATOR_TOOL,
      },
      {
        cardHeading: 'No Action Data and Analytics',
        cardDesc: NOACTIONDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: NOACTIONDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Dissident Voting Summary',
        cardDesc: DISSIDENT_VOTING_SUMMARY_TOOL_BLURB,
        castButtonName,
        cardGotoPath: DISSIDENT_VOTING_SUMMARY_TOOL,
      },
      {
        cardHeading: 'Advanced Voting Data Search',
        cardDesc: ADVANCED_VOTING_DATA_SEARCH_BLURB,
        castButtonName,
        cardGotoPath: ADVANCED_VOTING_DATA_SEARCH,
      },
    ],
  },
  // Governance
  {
    title: 'Governance',
    isTitle: true,
    productId: GOVERNANCE,
    productItems: [
      {
        cardHeading: 'Company Governance Data and Analytics',
        cardDesc: COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL,
      },
      // {
      //   cardHeading: 'Company Peer Group Comparison Matrix',
      //   cardDesc: GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
      //   castButtonName,
      //   cardGotoPath: GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
      // },
      // {
      //   cardHeading: 'US State Governance Data',
      //   cardDesc: US_STATEGOVERNANCEDATA_TOOL_BLURB,
      //   castButtonName,
      //   cardGotoPath: US_STATEGOVERNANCEDATA_TOOL,
      // },
      {
        cardHeading: 'Global Governance Data',
        cardDesc: GLOBAL_GOVERNANCEDATA_TOOL_BLURB,
        castButtonName,
        cardGotoPath: GLOBAL_GOVERNANCEDATA_TOOL,
      },
      {
        cardHeading: 'Director Data and Analytics',
        cardDesc: DIRECTORDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: DIRECTORDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Upcoming Events',
        cardDesc: UPCOMING_EVENTS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: UPCOMING_EVENTS_TOOL,
      },
      {
        cardHeading: 'Amendment Data and Analytics',
        cardDesc: AMENDMENT_DATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: AMENDMENT_DATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Poison Pill Data and Analytics',
        cardDesc: POISONPILLDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: POISONPILLDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Governance Score Data',
        cardDesc: GOVERNANCE_SCORE_DATA,
        castButtonName,
        cardGotoPath: GOVERNANCE_SCORE_DATA_TOOL,
      },
    ],
  },
  // Vulnerability
  {
    title: 'Vulnerability',
    isTitle: true,
    productId: ACTIVIST_VULNERABILITY,
    productItems: [
      {
        cardHeading: 'Company Peer Group Comparison Matrix',
        cardDesc: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
        castButtonName,
        cardGotoPath: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
      },
      {
        cardHeading: 'Advanced Vulnerability Search',
        cardDesc: VULNAREBILITY_ADVANCED_SEARCH_BLURB,
        castButtonName,
        cardGotoPath: VULNAREBILITY_ADVANCED_SEARCH,
      },
    ],
  },
  //Compensation
  // {
  //   title: 'Compensation',
  //   isTitle: true,
  //   productId: COMPENSATION,
  //   productItems: [
  //     {
  //       cardHeading: 'Company Peer Group Comparison Matrix',
  //       cardDesc: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
  //       castButtonName,
  //       cardGotoPath: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
  //     },
  //     {
  //       cardHeading: 'Advanced Vulnerability Search',
  //       cardDesc: VULNAREBILITY_ADVANCED_SEARCH_BLURB,
  //       castButtonName,
  //       cardGotoPath: VULNAREBILITY_ADVANCED_SEARCH,
  //     },
  //   ],
  // },
];

export const toolListItems1 = [
  {
    title: 'Insightia',
    isTitle: true,
    productId: ACTIVISM,
    productItems: [
      {
        cardHeading: 'Powersearch',
        cardDesc:
          'The public demand tool contains information on all public demands available in our database. You can get a straight download of the data or more data is available to do analytics directly on our site.',
        castButtonName,
        cardGotoPath: POWERSEARCH_TOOL,
      },
    ],
  },
  // Activist Shorts
  {
    title: 'Activist Shorts',
    isTitle: true,
    productId: ACTIVIST_SHORTS,
    productItems: [
      {
        cardHeading: 'Activist Shorts Campaign Data and Analytics',
        cardDesc: SHORT_CAMPAIGN_DATA_AND_ANALYTICS_BLURB,
        castButtonName,
        cardGotoPath: SHORT_CAMPAIGN_DATA_AND_ANALYTICS,
      },
      {
        cardHeading: 'Notified Short Position Data',
        cardDesc: NOTIFIED_SHORT_POSITION_DATA_BLURB,
        castButtonName,
        cardGotoPath: NOTIFIED_SHORT_POSITION_DATA,
      },
      {
        cardHeading: 'Activist Shorts Campaign Advisers',
        cardDesc:
          'The activist shorts campaign advisers tool contains information on which advisers represented investors and companies during activist short campaigns.',
        castButtonName,
        cardGotoPath: SHORT_ACTIVIST_CAMPAIGN_ADVISOR,
      },
      {
        cardHeading: 'Filings Search',
        cardDesc:
          'The filings search tool allows you to filter and search for investor and company filings attached to short activist campaigns.',
        castButtonName,
        cardGotoPath: SHORT_ACTIVIST_FILLINGS_SEARCH,
      },
    ],
  },
  // Activism
  {
    title: 'Activism',
    isTitle: true,
    productId: ACTIVISM,
    productItems: [
      {
        cardHeading: 'Public Demands Data and Analytics',
        cardDesc: PUBLICDEMANDS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: PUBLICDEMANDS_TOOL,
      },
      {
        cardHeading: 'Holdings Data and Analytics',
        cardDesc: HOLDINGSDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: HOLDINGSDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Performance',
        cardDesc: ANNUAL_PERFORMANCE_BLURB,
        castButtonName,
        cardGotoPath: ANNUAL_PERFORMANCE,
      },
      // {
      //   cardHeading: "Follower Returns Data and Analytics",
      //   cardDesc:
      //     "The public demand tool contains information on all public demands available in our database. You can get a straight download of the data or more data is available to do analytics directly on our site.",
      //   castButtonName,
      //   cardGotoPath: FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL,
      // },
      {
        cardHeading: 'Filings Search',
        cardDesc: FILLINGS_SEARCH_TOOL_BLURB,
        castButtonName,
        cardGotoPath: FILLINGS_SEARCH_TOOL,
      },
      {
        cardHeading: 'Activist Campaign Advisers',
        cardDesc: ACTIVIST_CAMPAIGNS_ADVISORS_BLURB,
        castButtonName,
        cardGotoPath: ACTIVIST_CAMPAIGN_ADVISOR,
      },
      {
        cardHeading: 'Activism Trends',
        cardDesc: ACTIVIST_TRENDS_BLURB,
        castButtonName,
        cardGotoPath: ACTIVISM_TRENDS,
      },
    ],
  },
  // Voting
  {
    title: 'Voting',
    isTitle: true,
    productId: VOTING,
    productItems: [
      {
        cardHeading: 'Resolution Tracker',
        cardDesc: RESOLUTION_TRACKER_TOOL_BLURB,
        castButtonName,
        cardGotoPath: RESOLUTION_TRACKER_TOOL,
      },
      {
        cardHeading: 'Investor Comparator',
        cardDesc: INVESTOR_COMPARATOR_TOOL_BLURB,
        castButtonName,
        cardGotoPath: INVESTOR_COMPARATOR_TOOL,
      },
      {
        cardHeading: 'No Action Data and Analytics',
        cardDesc: NOACTIONDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: NOACTIONDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Dissident Voting Summary',
        cardDesc: DISSIDENT_VOTING_SUMMARY_TOOL_BLURB,
        castButtonName,
        cardGotoPath: DISSIDENT_VOTING_SUMMARY_TOOL,
      },
      {
        cardHeading: 'Advanced Voting Data Search',
        cardDesc: ADVANCED_VOTING_DATA_SEARCH_BLURB,
        castButtonName,
        cardGotoPath: ADVANCED_VOTING_DATA_SEARCH,
      },
    ],
  },
  // Governance
  {
    title: 'Governance',
    isTitle: true,
    productId: GOVERNANCE,
    productItems: [
      {
        cardHeading: 'Company Governance Data and Analytics',
        cardDesc: COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL,
      },
      // {
      //   cardHeading: 'Company Peer Group Comparison Matrix',
      //   cardDesc: GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
      //   castButtonName,
      //   cardGotoPath: GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
      // },
      // {
      //   cardHeading: 'US State Governance Data',
      //   cardDesc: US_STATEGOVERNANCEDATA_TOOL_BLURB,
      //   castButtonName,
      //   cardGotoPath: US_STATEGOVERNANCEDATA_TOOL,
      // },
      {
        cardHeading: 'Global Governance Data',
        cardDesc: GLOBAL_GOVERNANCEDATA_TOOL_BLURB,
        castButtonName,
        cardGotoPath: GLOBAL_GOVERNANCEDATA_TOOL,
      },
      {
        cardHeading: 'Director Data and Analytics',
        cardDesc: DIRECTORDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: DIRECTORDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Upcoming Events',
        cardDesc: UPCOMING_EVENTS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: UPCOMING_EVENTS_TOOL,
      },
      {
        cardHeading: 'Amendment Data and Analytics',
        cardDesc: AMENDMENT_DATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: AMENDMENT_DATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Poison Pill Data and Analytics',
        cardDesc: POISONPILLDATA_AND_ANALYTICS_TOOL_BLURB,
        castButtonName,
        cardGotoPath: POISONPILLDATA_AND_ANALYTICS_TOOL,
      },
      {
        cardHeading: 'Governance Score Data',
        cardDesc: GOVERNANCE_SCORE_DATA,
        castButtonName,
        cardGotoPath: GOVERNANCE_SCORE_DATA_TOOL,
      },
    ],
  },
  // Vulnerability
  {
    title: 'Vulnerability',
    isTitle: true,
    productId: ACTIVIST_VULNERABILITY,
    productItems: [
      {
        cardHeading: 'Company Peer Group Comparison Matrix',
        cardDesc: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
        castButtonName,
        cardGotoPath: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
      },
    ],
  },
];

const Tools = ({
  token,
  handleResetLoading,
  handleButtonAccess,
  handleResetLoader,
  handleGlobleResetNotifiedShortPosition,
  handleResetShortCampaignDataAndAnalyticsTool,
  isActivismButtonDisabled,
  isActivist_ShortsButtonDisabled,
  isVotingButtonDisabled,
  isGovernanceButtonDisabled,
  isVulnerabilityButtonDisabled,
  isAmalgamatedButtonDisabled,
  procedureRunningEstimateTime,
}) => {
  // button + note message
  const castButtonName = 'Use this tool';
  const noteMessage = 'The tools for this module are not available on your subscription';

  const toolListItems = [
    {
      title: 'Insightia',
      isTitle: true,
      productId: ACTIVISM,
      productItems: [
        {
          cardHeading: 'Powersearch',
          cardDesc: POWERSEARCH_TOOL_BLURB,
          castButtonName,
          cardGotoPath: POWERSEARCH_TOOL,
          disabled: isAmalgamatedButtonDisabled,
        },
      ],
    },
    // Activist Shorts
    {
      title: 'Activist Shorts',
      isTitle: true,
      productId: ACTIVIST_SHORTS,
      productItems: [
        {
          cardHeading: 'Activist Shorts Campaign Data and Analytics',
          cardDesc: SHORT_CAMPAIGN_DATA_AND_ANALYTICS_BLURB,
          castButtonName,
          cardGotoPath: SHORT_CAMPAIGN_DATA_AND_ANALYTICS,
          disabled: isActivist_ShortsButtonDisabled,
        },
        {
          cardHeading: 'Notified Short Position Data',
          cardDesc: NOTIFIED_SHORT_POSITION_DATA_BLURB,
          castButtonName,
          cardGotoPath: NOTIFIED_SHORT_POSITION_DATA,
          disabled: isActivist_ShortsButtonDisabled,
        },
        {
          cardHeading: 'Activist Shorts Campaign Advisers',
          cardDesc:
            'The activist shorts campaign advisers tool contains information on which advisers represented investors and companies during activist short campaigns.',
          castButtonName,
          cardGotoPath: SHORT_ACTIVIST_CAMPAIGN_ADVISOR,
          disabled: isActivist_ShortsButtonDisabled,
        },
        {
          cardHeading: 'Filings Search',
          cardDesc:
            'The filings search tool allows you to filter and search for investor and company filings attached to short activist campaigns.',
          castButtonName,
          cardGotoPath: SHORT_ACTIVIST_FILLINGS_SEARCH,
          disabled: isActivist_ShortsButtonDisabled,
        },
      ],
    },
    // Activism
    {
      title: 'Activism',
      isTitle: true,
      productId: ACTIVISM,
      productItems: [
        {
          cardHeading: 'Activist Campaigns',
          cardDesc: ACTIVIST_CAMPAIGNS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: ACTIVIST_CAMPAIGNS_TOOL,
          disabled: isActivismButtonDisabled,
        },
        {
          cardHeading: 'Public Demands Data and Analytics',
          cardDesc: PUBLICDEMANDS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: PUBLICDEMANDS_TOOL,
          disabled: isActivismButtonDisabled,
        },
        {
          cardHeading: 'Holdings Data and Analytics',
          cardDesc: HOLDINGSDATA_AND_ANALYTICS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: HOLDINGSDATA_AND_ANALYTICS_TOOL,
          disabled: isActivismButtonDisabled,
        },
        {
          cardHeading: 'Performance',
          cardDesc: ANNUAL_PERFORMANCE_BLURB,
          castButtonName,
          cardGotoPath: ANNUAL_PERFORMANCE,
          disabled: isActivismButtonDisabled,
        },
        // {
        //   cardHeading: "Follower Returns Data and Analytics",
        //   cardDesc:
        //     "The public demand tool contains information on all public demands available in our database. You can get a straight download of the data or more data is available to do analytics directly on our site.",
        //   castButtonName,
        //   cardGotoPath: FOLLOWER_RETURNS_DATA_AND_ANALYTICS_TOOL,
        // },
        {
          cardHeading: 'Filings Search',
          cardDesc: FILLINGS_SEARCH_TOOL_BLURB,
          castButtonName,
          cardGotoPath: FILLINGS_SEARCH_TOOL,
          disabled: isActivismButtonDisabled,
        },
        {
          cardHeading: 'Activist Campaign Advisers',
          cardDesc: ACTIVIST_CAMPAIGNS_ADVISORS_BLURB,
          castButtonName,
          cardGotoPath: ACTIVIST_CAMPAIGN_ADVISOR,
          disabled: isActivismButtonDisabled,
        },
        {
          cardHeading: 'Activism Trends',
          cardDesc: ACTIVIST_TRENDS_BLURB,
          castButtonName,
          cardGotoPath: ACTIVISM_TRENDS,
          disabled: isActivismButtonDisabled,
        },
      ],
    },
    // Voting
    {
      title: 'Voting',
      isTitle: true,
      productId: VOTING,
      productItems: [
        {
          cardHeading: 'Resolution Tracker',
          cardDesc: RESOLUTION_TRACKER_TOOL_BLURB,
          castButtonName,
          cardGotoPath: RESOLUTION_TRACKER_TOOL,
          disabled: isVotingButtonDisabled,
        },
        {
          cardHeading: 'Investor Comparator',
          cardDesc: INVESTOR_COMPARATOR_TOOL_BLURB,
          castButtonName,
          cardGotoPath: INVESTOR_COMPARATOR_TOOL,
          disabled: isVotingButtonDisabled,
        },
        {
          cardHeading: 'No Action Data and Analytics',
          cardDesc: NOACTIONDATA_AND_ANALYTICS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: NOACTIONDATA_AND_ANALYTICS_TOOL,
          disabled: isVotingButtonDisabled,
        },
        {
          cardHeading: 'Dissident Voting Summary',
          cardDesc: DISSIDENT_VOTING_SUMMARY_TOOL_BLURB,
          castButtonName,
          cardGotoPath: DISSIDENT_VOTING_SUMMARY_TOOL,
          disabled: isVotingButtonDisabled,
        },
        {
          cardHeading: 'Advanced Voting Data Search',
          cardDesc: ADVANCED_VOTING_DATA_SEARCH_BLURB,
          castButtonName,
          cardGotoPath: ADVANCED_VOTING_DATA_SEARCH,
          disabled: isVotingButtonDisabled,
        },
      ],
    },
    // Governance
    {
      title: 'Governance',
      isTitle: true,
      productId: GOVERNANCE,
      productItems: [
        {
          cardHeading: 'Company Governance Data and Analytics',
          cardDesc: COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: COMPANY_GOVERNANCEDATA_AND_ANALYTICS_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
        // {
        //   cardHeading: 'Company Peer Group Comparison Matrix',
        //   cardDesc: GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
        //   castButtonName,
        //   cardGotoPath: GOVERNANCE_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
        // },
        // {
        //   cardHeading: 'US State Governance Data',
        //   cardDesc: US_STATEGOVERNANCEDATA_TOOL_BLURB,
        //   castButtonName,
        //   cardGotoPath: US_STATEGOVERNANCEDATA_TOOL,
        // },
        {
          cardHeading: 'Global Governance Data',
          cardDesc: GLOBAL_GOVERNANCEDATA_TOOL_BLURB,
          castButtonName,
          cardGotoPath: GLOBAL_GOVERNANCEDATA_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
        {
          cardHeading: 'Director Data and Analytics',
          cardDesc: DIRECTORDATA_AND_ANALYTICS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: DIRECTORDATA_AND_ANALYTICS_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
        {
          cardHeading: 'Upcoming Events',
          cardDesc: UPCOMING_EVENTS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: UPCOMING_EVENTS_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
        {
          cardHeading: 'Amendment Data and Analytics',
          cardDesc: AMENDMENT_DATA_AND_ANALYTICS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: AMENDMENT_DATA_AND_ANALYTICS_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
        {
          cardHeading: 'Poison Pill Data and Analytics',
          cardDesc: POISONPILLDATA_AND_ANALYTICS_TOOL_BLURB,
          castButtonName,
          cardGotoPath: POISONPILLDATA_AND_ANALYTICS_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
        {
          cardHeading: 'Governance Score Data',
          cardDesc: GOVERNANCE_SCORE_DATA,
          castButtonName,
          cardGotoPath: GOVERNANCE_SCORE_DATA_TOOL,
          disabled: isGovernanceButtonDisabled,
        },
      ],
    },
    // Vulnerability
    {
      title: 'Vulnerability',
      isTitle: true,
      productId: ACTIVIST_VULNERABILITY,
      productItems: [
        {
          cardHeading: 'Company Peer Group Comparison Matrix',
          cardDesc: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL_BLURB,
          castButtonName,
          cardGotoPath: VULNAREBILITY_COMPANY_PEERGROUP_COMPARISONMATRIX_TOOL,
          disabled: isVulnerabilityButtonDisabled,
        },
        {
          cardHeading: 'Advanced Vulnerability Search',
          cardDesc: VULNAREBILITY_ADVANCED_SEARCH_BLURB,
          castButtonName,
          cardGotoPath: VULNAREBILITY_ADVANCED_SEARCH,
          disabled: isVulnerabilityButtonDisabled,
        },
      ],
    },
    //Compensation
  //  {
  //    title: 'Compensation',
  //    isTitle: true,
  //    productId: COMPENSATION,
  //    productItems: [
        // {
        //   cardHeading: 'P4P Modeler',
        //   cardDesc: COMPENSATION_P4P_MODELER_BLURB,
        //   castButtonName,
        //   cardGotoPath: COMPENSATION_P4P_MODELER,
        // },
        // {
        //   cardHeading: 'Say on Pay Vote Results',
        //   cardDesc: COMPENSATION_SAY_ON_PAY_VOTE_RESULTS_BLURB,
        //   castButtonName,
        //   cardGotoPath: COMPENSATION_SAY_ON_PAY_VOTE_RESULTS,
        // },
        // {
        //   cardHeading: 'Remuneration Commitee Member Search',
        //   cardDesc: COMPENSATION_REMUNERATION_COMMITEE_MEMBER_BLURB,
        //   castButtonName,
        //   cardGotoPath: COMPENSATION_REMUNERATION_COMMITEE_MEMBER,
        // },
    //    {
    //      cardHeading: 'Compensation Comparator',
    //      cardDesc: COMPENSATION_COMPARATOR_BLURB,
    //      castButtonName,
    //      cardGotoPath: COMPENSATION_COMPARATOR,
    //    },
    //  ],
    //},
  ];

  function bindTools(element, index) {
    return (
      <div key={index} className='card bg-light col-xs-12 col-sm-6 col-md-4 col-lg-4'>
        <div className='card-header cardTitleHeader'>
          <span>{element.cardHeading}</span>
        </div>
        <div className='card-body'>
          <div className='card-text'>
            <p>{element.cardDesc}</p>
          </div>
        </div>
        <div>
          <button
            id={`cardItem-${index}_${element.cardHeading.replaceAll(' ', '-')}`} // replace(/\s/g, "-")}`}
            className='btn btn-primary card-button'
            type='button'
            disabled={element.disabled}
            onClick={(e) => {
              e.preventDefault();
              // history.replace(element.cardGotoPath);
              handleResetLoading();
              procedureRunningEstimateTime !== undefined && handleResetLoader();
              handleGlobleResetNotifiedShortPosition();
              history.push(element.cardGotoPath);
            }}
          >
            {element.castButtonName}
          </button>
        </div>
      </div>
    );
  }

  return (
    // original code
    // <Page>
    //   <div className={bem.b('pt-3')}>
    //     {toolListItems.map((element, index) => (
    //       <div key={index} id={element.title}>
    //         <CollapseComponent Heading={element.title} index={element.index}>
    //         {element.isTitle ? (
    //           <div>
    //             <hr className="hr-line col-xs-10 col-sm-10 col-md-10 col-lg-10" />
    //             <div className="d-flex">
    //               {/* <span className="title-tool">{element.title}</span> */}
    //               {token !== undefined
    //                 && element.productId !== undefined
    //                 && token.some((c) => c.product_id === element.productId && c.status !== NUMBER_TWO && c.status !== 4) && (
    //                   <span className="ps-3 text-danger">
    //                     <i className="bi bi-exclamation-triangle" />
    //                     <span className="ps-1 note-message">{noteMessage}</span>
    //                   </span>
    //               )}
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="row ms-03rem" key={index}>
    //             {element.map((childelement, index) => bindTools(childelement, index))}
    //           </div>
    //         )}
    //         </CollapseComponent>
    //       </div>
    //     ))}
    //   </div>
    // </Page>
    //

    <Page>
      <div className={bem.b('pt-3')}>
        <hr className='hr-line col-xs-12 col-sm-12 col-md-12 col-lg-12' />
        {toolListItems.map((element, index) => (
          <div key={`key_${index + 1}`} id={element.title} className={bem2.b('')}>
            {element.isTitle && (
              <CollapseComponent Heading={element.title}>
                {Array.isArray(token) &&
                element.productId !== undefined &&
                token.some(
                  (c) => c.product_id === element.productId && c.status !== NUMBER_TWO && c.status !== NUMBER_FOUR
                ) ? (
                  <>
                    <span className='ps-3 text-danger'>
                      <i className='bi bi-exclamation-triangle' />
                      <span className='ps-1 note-message'>{noteMessage}</span>
                    </span>
                    <div className='row ms-03rem' key={`row${index + 1}`}>
                      {element.productItems.map((childelement, index) => bindTools(childelement, index))}
                    </div>
                  </>
                ) : (
                  <div className='row ms-03rem' key={`row${index + 1}`}>
                    {element.productItems.map((childelement, index) => bindTools(childelement, index))}
                  </div>
                )}
              </CollapseComponent>
            )}
          </div>
        ))}
      </div>
    </Page>
  );
};

export default React.memo(Tools);
