import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { history } from '../../../utils/navigation-util';
import pathConst, {
  QUERY_MEETING,
  QUERY_PID,
  QUERY_PRINT
} from '../../../constants/PathsConstant';
import { NUMBER_TWO, NUMBER_FOUR } from '../../../constants/NumberConstants';
import bn from '../../../utils/bemnames';
import prodConst from '../../../constants/ProductConstants';
import PDFNavMenu from '../../GeneralForm/PDFNavMenu';

const bem = bn.create('navigatio-utils');
const bem2 = bn.create('navigation-header-utils');

const CompanyHeader = ({
  location,
  handleVisitorLog,
  handleResetLoading,
  token,
  handleHoverSubmenu,
  handlePDFListItems,
  handlePDFDownloadCancelClick,
  pdfListItems,
  pdfDownloadCancelBtn,
  handleResetCompanyPath,
  selectedHoverSubmenu,
  handlePDFMenuShow,
  pdfMenuShow,
  pdfDownloadNotification,
  generatePDF,
  selectNavOutsideClick,
  handleNavOutsideClick,
  isNavbarSelectionClick,
  setNavbarSelectionClick,
  handleResetBreadcrumbs,
  pid,
  meetingid,
  handlePDFDownloadNotification,
  handleGeneratePDF,
  showBylaws_Charter_GovGuidelinesTab,
  showComplianceTab,
  showPoisonPillTab,
  showLatestFilingsTab,
  showShareholderProposalsTab,
  companyProductSelection,
  isExistNoActionLetters_CompanyVoting,
  isActivistShortModuleAccess,
  trialUserDisableDownload,
  longShortAcces,
  pdfDownloadLoader,
  handlePDFDownloadLoader,
  showHistoricalGov
}) => {
  let timer;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [stateLongAccess, setStateLongAccess] = useState(0);
  const [stateShortAccess, setStateShortAccess] = useState(0);
  let navItems = [];
  let mobileNavItem = [];

  const pdfListItem = useRef([]);
  if (pid !== undefined) {
    query.pid = pid;
  }
  if (meetingid !== undefined) {
    query.meetingid = meetingid;
  }

  useEffect(() => {
    setStateLongAccess(longShortAcces.long);
    setStateShortAccess(longShortAcces.short);
  }, [longShortAcces]);

  navItems = [
    {
      to: pathConst.COMPANY_OVERVIEW,
      name: 'Overview',
      exact: true,
      disabled: false,
      firstChild: `${pathConst.COMPANY_OVERVIEW}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.ACTIVISM,
      name: 'Activism',
      exact: false,
      disabled: !companyProductSelection.activism,
      firstChild: `${pathConst.ACTIVISM_OVERVIEW}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.ACTIVISTSHORTS,
      name: 'Activist Shorts',
      exact: false,
      disabled: !companyProductSelection.activist_shorts,
      firstChild: `${pathConst.ACTIVISTSHORTS_OVERVIEW}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.ACTIVIST_VULNERABILITY,
      name: 'Activist Vulnerability',
      exact: false,
      disabled: !companyProductSelection.vulnerability,
      firstChild: `${pathConst.ACTIVIST_VULNERABILITY}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.GOVERNANCE,
      name: 'Governance',
      exact: false,
      disabled: !companyProductSelection.governance,
      firstChild: `${pathConst.GOVERNANCE_OVERVIEW}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.VOTING,
      name: 'Voting',
      exact: false,
      disabled: !companyProductSelection.voting,
      firstChild: `${pathConst.VOTING_OVERVIEW}`,
      search: `${QUERY_MEETING}${query.meetingid}`
    },
    {
      to: pathConst.COMPANY_COMPENSATION,
      name: 'Compensation',
      exact: false,
      disabled: !companyProductSelection.compensation,
      firstChild: `${pathConst.COMPANY_COMPENSATION_OVERVIEW}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.NEWS,
      name: 'News',
      exact: false,
      disabled: !companyProductSelection.news,
      firstChild: `${pathConst.NEWS}`,
      search: `${QUERY_PID}${query.pid}`
    },
    {
      to: pathConst.OWNERSHIP,
      name: 'Ownership',
      exact: false,
      disabled:
        !companyProductSelection.ownership ||
        (longShortAcces.long === 0 && longShortAcces.short === 0),
      firstChild:
        longShortAcces.long === 1
          ? `${pathConst.OWNERSHIP_LONG_INVESTOR}`
          : longShortAcces.short === 1
          ? `${pathConst.OWNERSHIP_SHORT_INVESTOR}`
          : '',
      search: `${QUERY_PID}${query.pid}`
    }
  ];
  mobileNavItem = [
    {
      name: 'Overview',
      to: pathConst.COMPANY_OVERVIEW,
      handleVisitorLog,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      handleVisitorLog,
      name: 'Activism - Overview',
      to: pathConst.ACTIVISM_OVERVIEW,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      handleVisitorLog,
      name: 'Activism - Activist Campaigns',
      to: pathConst.ACTIVIST_CAMPAIGNS,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      disabled: true,
      handleVisitorLog,
      name: 'Activism - Activist Investments',
      to: '#',
      parameter: ''
    },
    {
      handleVisitorLog,
      name: 'Activist Shorts - Overview',
      to: pathConst.ACTIVISTSHORTS_OVERVIEW,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Activist Shorts - Campaigns',
      handleVisitorLog,
      to: pathConst.ACTIVISTSHORTS_CAMPAIGNS,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Activist Vulnerability',
      handleVisitorLog,
      to: pathConst.ACTIVIST_VULNERABILITY,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Governance - Overview',
      handleVisitorLog,
      to: pathConst.GOVERNANCE_OVERVIEW,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Governance - Bylaws/ Charter/ Gov Guidelines',
      handleVisitorLog,
      to: pathConst.GOVERNANCE_BYLAWSCHARTERGUIDELINES,
      parameter: `${QUERY_PID}${pid}`,
      disabled: !showBylaws_Charter_GovGuidelinesTab
    },
    {
      handleVisitorLog,
      name: 'Governance - Compliance',
      to: pathConst.GOVERNANCE_COMPLIANCE,
      parameter: `${QUERY_PID}${pid}`,
      disabled: !showComplianceTab
    },
    {
      handleVisitorLog,
      name: 'Governance - Directors',
      to: pathConst.GOVERNANCE_DIRECTORS,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      handleVisitorLog,
      name: 'Governance - Poison Pill',
      to: pathConst.GOVERNANCE_POISONPILL,
      parameter: `${QUERY_PID}${pid}`,
      disabled: !showPoisonPillTab
    },
    {
      handleVisitorLog,
      name: 'Governance - Latest Filings',
      to: pathConst.GOVERNANCE_LATESTFILINGS,
      parameter: `${QUERY_PID}${pid}`,
      disabled: !showLatestFilingsTab
    },
    {
      handleVisitorLog,
      name: 'Governance - Shareholder Proposals',
      to: pathConst.GOVERNANCE_SHAREHOLDERPROPOSAL,
      parameter: `${QUERY_PID}${pid}`,
      disabled: !showShareholderProposalsTab
    },
    {
      handleVisitorLog,
      name: 'Historical Governance',
      to: pathConst.GOVERNANCE_HISTORICAL,
      parameter: `${QUERY_PID}${pid}`,
      disabled: !showHistoricalGov
    },
    {
      handleResetLoading,
      handleVisitorLog,
      name: 'Voting - Overview',
      to: pathConst.VOTING_OVERVIEW,
      parameter: `${QUERY_MEETING}${meetingid}`
    },
    {
      handleResetLoading,
      handleVisitorLog,
      name: 'Voting - Quick View',
      to: pathConst.VOTING_QUICKVIEW,
      parameter: `${QUERY_MEETING}${meetingid}`
    },
    {
      handleResetLoading,
      handleVisitorLog,
      name: 'Voting - Results',
      to: pathConst.VOTING_RESULTS,
      parameter: `${QUERY_MEETING}${meetingid}`
    },
    {
      handleResetLoading,
      handleVisitorLog,
      name: 'Voting - Vote Detail',
      to: pathConst.VOTING_VOTEDETAIL,
      parameter: `${QUERY_MEETING}${meetingid}`
    },
    {
      name: 'Voting - Votes Against Mgmt',
      handleResetLoading,
      handleVisitorLog,
      to: pathConst.VOTING_VOTESAGAINST_MGMT,
      parameter: `${QUERY_MEETING}${meetingid}`
    },
    {
      name: 'Voting - Policy Checker',
      handleResetLoading,
      handleVisitorLog,
      to: pathConst.VOTING_POLICYCHECKER,
      parameter: `${QUERY_MEETING}${meetingid}`
    },
    {
      name: 'Compensation - Overview',
      handleResetLoading,
      handleVisitorLog,
      to: pathConst.COMPANY_COMPENSATION_OVERVIEW,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Compensation - Executive Pay',
      handleResetLoading,
      handleVisitorLog,
      to: pathConst.COMPANY_COMPENSATION_EXECUTIVE_PAY,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Compensation - Compensation Policy Details',
      handleResetLoading,
      handleVisitorLog,
      to: pathConst.COMPANY_COMPENSATION_POLICY_DETAILS,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Compensation - Performance Metric Break Down',
      handleResetLoading,
      handleVisitorLog,
      to: pathConst.COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'News',
      to: pathConst.NEWS,
      handleVisitorLog,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Ownership - Long',
      to: pathConst.OWNERSHIP_LONG_INVESTOR,
      handleVisitorLog,
      parameter: `${QUERY_PID}${pid}`
    },
    {
      name: 'Ownership - Short',
      to: pathConst.OWNERSHIP_SHORT_INVESTOR,
      handleVisitorLog,
      parameter: `${QUERY_PID}${pid}`
    }
  ];

  function defaultChecked(element) {
    const { checked, disabled, module } = element;
    if (!disabled) {
      if (checked) {
        return checked;
      }
      if (window.location.pathname.split('/')[2] === module && !checked) {
        return true;
      }
      if (window.location.pathname.split('/')[2] === module && checked) {
        return false;
      }
      return false;
    }
    return false;
  }
  const isActiveCheckBox = useCallback(
    (product_id) => {
      if (
        token.MemberShip !== undefined &&
        token.MemberShip.some(
          (item) =>
            item.product_id === product_id && item.status === NUMBER_FOUR
        )
      ) {
        return false;
      }
    },
    [token.MemberShip]
  );

  const isStatus = [NUMBER_FOUR];

  const isDisableItem = useCallback(
    (product_id) => {
      if (
        token.MemberShip !== undefined &&
        token.MemberShip.some(
          (item) =>
            item.product_id === product_id && item.status !== NUMBER_FOUR
        )
      ) {
        return true;
      }
    },
    [token.MemberShip]
  );

  const isDisableOverview = useCallback(() => {
    if (
      token && token.MemberShip && token.MemberShip !== undefined &&
      token.MemberShip.length > 0 &&
      token.MemberShip.every((item) => item.status === NUMBER_TWO)
    ) {
      return true;
    }
  }, [token.MemberShip]);

  useEffect(() => {
    const abortController = new AbortController();
    if (
      isNavbarSelectionClick === '' &&
      mobileNavItem.find((item) => item.to === location.pathname)
    ) {
      setNavbarSelectionClick(
        mobileNavItem.find((item) => item.to === location.pathname).name
      );
      handleHoverSubmenu(location.pathname);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    setNavbarSelectionClick,
    isNavbarSelectionClick,
    mobileNavItem,
    handleHoverSubmenu,
    location.pathname,
    companyProductSelection
  ]);

  // #region PDFMenu

  // pdfListItem List
  useEffect(() => {
    pdfListItem.current = [
      //#region companyoverview
      {
        id: 'Company_Overview',
        module: 'overview',
        to: `${window.location.origin}${pathConst.COMPANY_OVERVIEW}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Company Overview',
        checked: !isDisableOverview(),
        disabled: isDisableOverview(),
        pdfPageName: 'Company: Overview',
      },
      //#endregion

      //#region activism
      { parent: true, name: 'Activism' },
      {
        module: 'activism',
        id: 'Activism_Overview',
        to: `${window.location.origin}${pathConst.ACTIVISM_OVERVIEW}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Overview',
        pdfPageName: 'Company: Activism Overview',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.activism ||
            isDisableItem(prodConst.ACTIVISM)
              ? true
              : isActiveCheckBox(prodConst.ACTIVISM),
          module: 'activism',
        }),
        disabled:
          !companyProductSelection.activism || isDisableItem(prodConst.ACTIVISM)
            ? true
            : isActiveCheckBox(prodConst.ACTIVISM),
      },
      {
        module: 'activism',
        id: 'Activist_Campaigns',
        to: `${window.location.origin}${pathConst.ACTIVIST_CAMPAIGNS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Campaigns',
        pdfPageName: 'Company: Activist Campaigns',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.activism ||
            isDisableItem(prodConst.ACTIVISM)
              ? true
              : isActiveCheckBox(prodConst.ACTIVISM),
          module: 'activism',
        }),
        disabled:
          !companyProductSelection.activism || isDisableItem(prodConst.ACTIVISM)
            ? true
            : isActiveCheckBox(prodConst.ACTIVISM),
      },
      {
        module: 'activism',
        id: 'Activist_Investments',
        to: `${window.location.origin}${pathConst.ACTIVIST_INVESTMENT}?pid=${pid}&print=1`,
        name: 'Investments',
        pdfPageName: 'Company: Activist Investments',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.activism ||
            isDisableItem(prodConst.ACTIVISM)
              ? true
              : isActiveCheckBox(prodConst.ACTIVISM),
          module: 'activism',
        }),
        disabled:
          !companyProductSelection.activism || isDisableItem(prodConst.ACTIVISM)
            ? true
            : isActiveCheckBox(prodConst.ACTIVISM),
      },
      {
        module: 'activism',
        id: 'Activist_Filings',
        to: `${window.location.origin}${pathConst.ACTIVIST_FILINGS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Filings',
        pdfPageName: 'Company: Activism Filings',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.activism ||
            isDisableItem(prodConst.ACTIVISM)
              ? true
              : isActiveCheckBox(prodConst.ACTIVISM),
          module: 'activism',
        }),
        disabled:
          !companyProductSelection.activism || isDisableItem(prodConst.ACTIVISM)
            ? true
            : isActiveCheckBox(prodConst.ACTIVISM),
      },
      //#endregion

      //#region activistshorts
      { parent: true, name: 'Activist Shorts' },
      {
        module: 'activistshorts',
        id: 'ActivistShorts_Overview',
        to: `${window.location.origin}${pathConst.ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Overview',
        pdfPageName: 'Company: Activist Shorts Overview',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.activist_shorts ||
            isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
          module: 'activistshorts',
        }),
        disabled:
          !companyProductSelection.activist_shorts ||
          isDisableItem(prodConst.ACTIVIST_SHORTS)
            ? true
            : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
      },
      {
        module: 'activistshorts',
        id: 'ActivistShorts_Campaigns',
        to: `${window.location.origin}${pathConst.ACTIVISTSHORTS_CAMPAIGNS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Campaigns',
        pdfPageName: 'Company: Activist Shorts Campaigns',
        checked: defaultChecked({
          checked: false,
          disabled:
            isActivistShortModuleAccess ||
            isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
          module: 'activistshorts',
        }),
        disabled:
          isActivistShortModuleAccess ||
          isDisableItem(prodConst.ACTIVIST_SHORTS)
            ? true
            : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
      },
      {
        module: 'activistshorts',
        id: 'ActivistShorts_Filings',
        to: `${window.location.origin}${pathConst.ACTIVISTSHORTS_FILINGS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Filings',
        pdfPageName: 'Company: Activist Shorts Filings',
        checked: defaultChecked({
          checked: false,
          disabled:
            isActivistShortModuleAccess ||
            isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
          module: 'activistshorts',
        }),
        disabled:
          isActivistShortModuleAccess ||
          isDisableItem(prodConst.ACTIVIST_SHORTS)
            ? true
            : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
      },
      //#endregion

      //#region activistvulnerability
      { parent: true, name: 'Activist Vulnerability' },
      {
        module: 'activistvulnerability',
        id: 'Activist_Vulnerability',
        to: `${window.location.origin}${pathConst.ACTIVIST_VULNERABILITY}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Report',
        pdfPageName: 'Company: Activist Vulnerability',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.vulnerability ||
            isDisableItem(prodConst.ACTIVIST_VULNERABILITY)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_VULNERABILITY),
          module: 'activistvulnerability',
        }),
        disabled:
          !companyProductSelection.vulnerability ||
          isDisableItem(prodConst.ACTIVIST_VULNERABILITY)
            ? true
            : isActiveCheckBox(prodConst.ACTIVIST_VULNERABILITY),
      },
      //#endregion

      //#region governance
      { parent: true, name: 'Governance' },
      {
        module: 'governance',
        id: 'Governance_Overview',
        to: `${window.location.origin}${pathConst.GOVERNANCE_OVERVIEW}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Overview',
        pdfPageName: 'Company: Governance Overview',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : isActiveCheckBox(prodConst.GOVERNANCE),
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : isActiveCheckBox(prodConst.GOVERNANCE)
      },
      {
        module: 'governance',
        id: 'Governance_BylawsCharterGovGuidelines',
        to: `${window.location.origin}${pathConst.GOVERNANCE_BYLAWSCHARTERGUIDELINES}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Bylaws/ Charter/ Gov Guidelines',
        pdfPageName: 'Company: Governance Bylaws/ Charter/ Gov Guidelines',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : !showBylaws_Charter_GovGuidelinesTab,
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : !showBylaws_Charter_GovGuidelinesTab
      },
      {
        module: 'governance',
        id: 'Governance_Compliance',
        to: `${window.location.origin}${pathConst.GOVERNANCE_COMPLIANCE}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Compliance',
        pdfPageName: 'Company: Governance Compliance',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : !showComplianceTab,
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : !showComplianceTab
      },
      {
        module: 'governance',
        id: 'Governance_Directors',
        to: `${window.location.origin}${pathConst.GOVERNANCE_DIRECTORS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Directors',
        pdfPageName: 'Company: Governance Directors',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : isActiveCheckBox(prodConst.GOVERNANCE),
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : isActiveCheckBox(prodConst.GOVERNANCE)
      },
      {
        module: 'governance',
        id: 'Governance_Poison Pill',
        to: `${window.location.origin}${pathConst.GOVERNANCE_POISONPILL}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Poison Pill',
        pdfPageName: 'Company: Governance Poison Pill',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : !showPoisonPillTab,
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : !showPoisonPillTab,
      },
      {
        module: 'governance',
        id: 'Governance_LatestFilings',
        to: `${window.location.origin}${pathConst.GOVERNANCE_LATESTFILINGS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Latest Filings',
        pdfPageName: 'Company: Governance Latest Filings',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : !showLatestFilingsTab,
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : !showLatestFilingsTab,
      },
      {
        module: 'governance',
        id: 'Governance_ShareholderProposals',
        to: `${window.location.origin}${pathConst.GOVERNANCE_SHAREHOLDERPROPOSAL}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Shareholder Proposals',
        pdfPageName: 'Company: Governance Shareholder Proposals',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : !showShareholderProposalsTab,
          module: 'governance',
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : !showShareholderProposalsTab,
      },
      {
        module: 'governance',
        id: 'Governance_Historical',
        to: `${window.location.origin}${pathConst.GOVERNANCE_HISTORICAL}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Historical Governance',
        pdfPageName: 'Company: Governance Historical Governance',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.governance ||
            isDisableItem(prodConst.GOVERNANCE)
              ? true
              : !showHistoricalGov,
          module: 'governance'
        }),
        disabled:
          !companyProductSelection.governance ||
          isDisableItem(prodConst.GOVERNANCE)
            ? true
            : !showHistoricalGov
      },
      //#endregion

      //#region Voting
      { parent: true, name: 'Voting' },
      {
        module: 'voting',
        id: 'Voting_Overview',
        to: `${window.location.origin}${pathConst.VOTING_OVERVIEW}${QUERY_MEETING}${meetingid}${QUERY_PRINT}`,
        name: 'Overview',
        pdfPageName: 'Company: Voting Overview',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
              ? true
              : isActiveCheckBox(prodConst.VOTING),
          module: 'voting',
        }),
        disabled:
          !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
            ? true
            : isActiveCheckBox(prodConst.VOTING),
      },
      {
        module: 'voting',
        id: 'Voting_QuickView',
        to: `${window.location.origin}${pathConst.VOTING_QUICKVIEW}?meetingid=${meetingid}&print=1`,
        name: 'Quickview',
        pdfPageName: 'Company: Voting Quickview',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
              ? true
              : isActiveCheckBox(prodConst.VOTING),
          module: 'voting',
        }),
        disabled:
          !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
            ? true
            : isActiveCheckBox(prodConst.VOTING),
      },
      {
        module: 'voting',
        id: 'Voting_Results',
        to: `${window.location.origin}${pathConst.VOTING_RESULTS}${QUERY_MEETING}${meetingid}${QUERY_PRINT}`,
        name: 'Results',
        pdfPageName: 'Company: Voting Results',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
              ? true
              : isActiveCheckBox(prodConst.VOTING),
          module: 'voting',
        }),
        disabled:
          !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
            ? true
            : isActiveCheckBox(prodConst.VOTING),
      },
      // {
      //   module: 'voting',
      //   id: 'Voting_VoteDetail',
      //   to: `${window.location.origin}${pathConst.VOTING_VOTEDETAIL}${QUERY_MEETING}${meetingid}${QUERY_PRINT}`,
      //   name: 'Vote Detail',
      //   pdfPageName: 'Company: Voting Vote Detail',
      //   checked: defaultChecked({
      //     checked: false,
      //     disabled:
      //       !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
      //         ? true
      //         : isActiveCheckBox(prodConst.VOTING),
      //     module: 'voting',
      //   }),
      //   disabled:
      //     !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
      //       ? true
      //       : isActiveCheckBox(prodConst.VOTING),
      // },
      // {
      //   module: 'voting',
      //   id: 'Voting_VotesAgainstMgmt',
      //   to: `${window.location.origin}${pathConst.VOTING_VOTESAGAINST_MGMT}${QUERY_MEETING}${meetingid}${QUERY_PRINT}`,
      //   name: 'Votes Against Mgmt',
      //   pdfPageName: 'Company: Voting Votes Against Mgmt',
      //   checked: defaultChecked({
      //     checked: false,
      //     disabled:
      //       !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
      //         ? true
      //         : isActiveCheckBox(prodConst.VOTING),
      //     module: 'voting',
      //   }),
      //   disabled:
      //     !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
      //       ? true
      //       : isActiveCheckBox(prodConst.VOTING),
      // },
      {
        module: 'voting',
        id: 'Voting_PolicyChecker',
        to: `${window.location.origin}${pathConst.VOTING_POLICYCHECKER}${QUERY_MEETING}${meetingid}${QUERY_PRINT}`,
        name: 'Policy Checker',
        pdfPageName: 'Company: Voting Policy Checker',
        checked: defaultChecked({
          checked: false,
          disabled:
            !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
              ? true
              : isActiveCheckBox(prodConst.VOTING),
          module: 'voting',
        }),
        disabled:
          !companyProductSelection.voting || isDisableItem(prodConst.VOTING)
            ? true
            : isActiveCheckBox(prodConst.VOTING),
      },
      {
        module: 'voting',
        id: 'Voting_NoActionLetters',
        to: `${window.location.origin}${pathConst.VOTING_NOACTIONLETTER}${QUERY_MEETING}${meetingid}${QUERY_PRINT}`,
        name: 'No Action Letters',
        pdfPageName: 'Company: Voting No Action Letters',
        checked: defaultChecked({
          checked: false,
          disabled:
            !isExistNoActionLetters_CompanyVoting ||
            isDisableItem(prodConst.VOTING)
              ? true
              : !isExistNoActionLetters_CompanyVoting,
          module: 'voting',
        }),
        disabled:
          !isExistNoActionLetters_CompanyVoting ||
          isDisableItem(prodConst.VOTING)
            ? true
            : !isExistNoActionLetters_CompanyVoting,
      },
      //#endregion

      //#region Compensation
      // { parent: true, name: 'Compensation' },
      // {
      //   module: 'Compensation',
      //   id: 'CompensationOverview',
      //   name: 'Overview',
      //   pdfPageName: 'Company: Compensation Overview',
      //   to: `${window.location.origin}${pathConst.COMPANY_COMPENSATION_OVERVIEW}${QUERY_PID}${pid}${QUERY_PRINT}`,
      //   checked: defaultChecked({
      //     checked: false,
      //     disabled: !companyProductSelection.compensation || isDisableItem(prodConst.COMPENSATION)
      //     ? true
      //     : isActiveCheckBox(prodConst.COMPENSATION), // isActiveCheckBox(''),
      //     module: 'compensation',
      //   }),
      //   disabled: !companyProductSelection.compensation || isDisableItem(prodConst.COMPENSATION)
      //   ? true
      //   : isActiveCheckBox(prodConst.COMPENSATION),
      // },
      // {
      //   module: 'Compensation',
      //   id: 'ExecutivePay',
      //   name: 'Executive Pay',
      //   pdfPageName: 'Company: Executive Pay',
      //   to: `${window.location.origin}${pathConst.COMPANY_COMPENSATION_EXECUTIVE_PAY}${QUERY_PID}${pid}${QUERY_PRINT}`,
      //   checked: defaultChecked({
      //     checked: false,
      //     disabled: !companyProductSelection.compensation, // isActiveCheckBox(''),
      //     module: 'compensation',
      //   }),
      //   disabled: !companyProductSelection.compensation,
      // },
      // {
      //   module: 'Compensation',
      //   id: 'CompensationPolidyDetails',
      //   name: 'Compensation Polidy Details',
      //   pdfPageName: 'Company: Compensation Polidy Details',
      //   to: `${window.location.origin}${pathConst.COMPANY_COMPENSATION_POLICY_DETAILS}${QUERY_PID}${pid}${QUERY_PRINT}`,
      //   checked: defaultChecked({
      //     checked: false,
      //     disabled: !companyProductSelection.compensation, // isActiveCheckBox(''),
      //     module: 'compensation',
      //   }),
      //   disabled: !companyProductSelection.compensation,
      // },
      // {
      //   module: 'Compensation',
      //   id: 'PerformanceMetrixBreakDown',
      //   name: 'Performance Metrix Break Down',
      //   pdfPageName: 'Company: Performance Metrix Break Down',
      //   to: `${window.location.origin}${pathConst.COMPANY_COMPENSATION_PERFORMANCE_METRIC_BREAKDOWN}${QUERY_PID}${pid}${QUERY_PRINT}`,
      //   checked: defaultChecked({
      //     checked: false,
      //     disabled: !companyProductSelection.compensation, // isActiveCheckBox(''),
      //     module: 'compensation',
      //   }),
      //   disabled: !companyProductSelection.compensation,
      // },

      //#endregion

      //#region news
      { parent: true, name: 'News' },
      {
        module: 'news',
        id: 'News',
        name: 'News',
        pdfPageName: 'Company: News',
        to: `${window.location.origin}${pathConst.NEWS}${QUERY_PID}${pid}${QUERY_PRINT}`,
        checked: defaultChecked({
          checked: false,
          disabled: !companyProductSelection.news,
          module: 'news'
        }),
        disabled: !companyProductSelection.news,
      },
      //#endregion

      //#region ownership
      { parent: true, name: 'Ownership' },
      {
        module: 'ownership',
        id: 'OWNERSHIP_LONG_INVESTOR',
        to: `${window.location.origin}${pathConst.OWNERSHIP_LONG_INVESTOR}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Long',
        pdfPageName: 'Company: Ownership Long',
        checked: defaultChecked({
          checked: false,
          disabled: stateLongAccess === 0,
          module: 'ownership'
        }),
        disabled: stateLongAccess === 0
      },
      {
        module: 'ownership',
        id: 'OWNERSHIP_SHORT_INVESTOR',
        to: `${window.location.origin}${pathConst.OWNERSHIP_SHORT_INVESTOR}${QUERY_PID}${pid}${QUERY_PRINT}`,
        name: 'Short',
        pdfPageName: 'Company: Ownership Short',
        checked: defaultChecked({
          checked: false,
          disabled: stateShortAccess === 0,
          module: 'ownership'
        }),
        disabled: stateShortAccess === 0
      }
      //#endregion
    ];
  }, [
    isActiveCheckBox,
    companyProductSelection,
    meetingid,
    pid,
    showBylaws_Charter_GovGuidelinesTab,
    showComplianceTab,
    showLatestFilingsTab,
    showPoisonPillTab,
    showShareholderProposalsTab,
    stateLongAccess,
    stateShortAccess,
    showHistoricalGov
  ]);

  const callbackHandlePDFListItems = useCallback(
    (pdfListItem) => {
      handlePDFListItems(pdfListItem);
    },
    [handlePDFListItems, companyProductSelection, stateLongAccess, stateShortAccess]
  );
  useEffect(() => {
    const abortController = new AbortController();
    callbackHandlePDFListItems(pdfListItem.current);
    return function cleanup() {
      abortController.abort();
    };
  }, [callbackHandlePDFListItems, stateLongAccess, stateShortAccess]);
  // #endregion

  return (
    <>
      <nav
        className={bem2.b(
          'mainnavbar navbar navbar-expand-md navbar-light bg-light'
        )}
      >
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs mr-auto'>
            {navItems.map(
              ({ to, firstChild, search, name, exact, disabled }, index) => (
                <li className='nav-item' key={`exact${index + 1}`}>
                  <NavLink
                    to={to + search}
                    onMouseMove={(e) => {
                      e.preventDefault();
                      clearTimeout(timer);
                      timer = setTimeout(stopmouse, 0);
                      function stopmouse() {
                        handleResetCompanyPath(to);
                      }
                    }}
                    onMouseOut={(e) => {
                      e.preventDefault();
                      clearTimeout(timer);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push({
                        pathname: firstChild,
                        search: search,
                        state: {
                          isLoadChildContent: true
                        }
                      });
                      if (firstChild !== pathConst.COMPANY_OVERVIEW) {
                        handleVisitorLog(firstChild, search);
                      }
                    }}
                    className={
                      selectedHoverSubmenu === to
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
              )
            )}
          </ul>
        </div>
      </nav>
      {/* mobile */}
      <div className={bem.b('')}>
        <nav className='mobilenavbar navbar navbar-expand-md navbar-light bg-light'>
          <Navbar
            className='w-100 navbar-toggler border-color-white p-0'
            collapseOnSelect
            expanded={selectNavOutsideClick}
            expand='lg'
            variant='dark'
            onBlur={(e) => {
              e.preventDefault();
              selectNavOutsideClick && handleNavOutsideClick(false);
            }}
          >
            <Navbar.Toggle
              className='w-100 bg-primary btnToogle'
              aria-controls='responsive-navbar-nav'
              onClick={(e) => {
                e.preventDefault();
                selectNavOutsideClick
                  ? handleNavOutsideClick(false)
                  : handleNavOutsideClick(true);
              }}
            >
              <div className='d-flex'>
                <div className='d-inline-block divTitle'>
                  <span
                    className='titleSelection'
                    title={isNavbarSelectionClick}
                  >
                    {isNavbarSelectionClick}
                  </span>
                </div>
                <div className='d-inline-block w-100'>
                  <span className='float-end navbar-toggler-icon' />
                </div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse
              style={{ border: '2px solid white' }}
              id='responsive-navbar-nav'
            >
              <Nav className='ms-auto scrollbar scrollBarSection w-100'>
                {mobileNavItem.map(
                  (
                    { name, to, parameter, disabled, handleVisitorLog },
                    index
                  ) => (
                    <div key={`name${index + 1}`}>
                      {mobileNavItem[index].length === undefined ? (
                        <Nav.Link
                          key={`bar${index + 1}`}
                          eventKey={`navItem-${name}-${index}`}
                          className={
                            isNavbarSelectionClick === name
                              ? 'lh-20 ms-10 border-bottom-1w active'
                              : disabled
                              ? 'lh-20 ms-10 border-bottom-1w disabled'
                              : 'lh-20 ms-10 border-bottom-1w'
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            history.push({
                              pathname: to,
                              search: parameter,
                              state: {
                                isLoadChildContent: true
                              }
                            });
                            handleNavOutsideClick(false);
                            setNavbarSelectionClick(name);
                            handleVisitorLog(to, parameter);
                            handleResetBreadcrumbs(to);
                          }}
                        >
                          {name}
                        </Nav.Link>
                      ) : (
                        <NavDropdown
                          title={mobileNavItem[index][0].title}
                          id='collasible-nav-dropdown'
                        >
                          {mobileNavItem[index].map(
                            (
                              {
                                name,
                                to,
                                parameter,
                                disabled,
                                handleVisitorLog
                              },
                              index
                            ) =>
                              to !== undefined &&
                              parameter !== undefined && (
                                <NavDropdown.Item
                                  className={disabled ? 'disabled' : ''}
                                  key={`disabled${index + 1}`}
                                  eventKey={`navItem-${name}-${index}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    history.push({
                                      pathname: to,
                                      search: parameter,
                                      state: {
                                        isLoadChildContent: true
                                      }
                                    });
                                    handleVisitorLog(to, parameter);
                                    handleResetBreadcrumbs(to);
                                  }}
                                >
                                  {name}
                                </NavDropdown.Item>
                              )
                          )}
                        </NavDropdown>
                      )}
                    </div>
                  )
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </nav>
      </div>
      {/* PDF MENU */}
      <PDFNavMenu
        location={location}
        handleVisitorLog={handleVisitorLog}
        handleResetLoading={handleResetLoading}
        token={token}
        handleHoverSubmenu={handleHoverSubmenu}
        handlePDFListItems={handlePDFListItems}
        pdfListItems={pdfListItems}
        handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
        pdfDownloadCancelBtn={pdfDownloadCancelBtn}
        handleResetCompanyPath={handleResetCompanyPath}
        selectedHoverSubmenu={selectedHoverSubmenu}
        handlePDFMenuShow={handlePDFMenuShow}
        pdfMenuShow={pdfMenuShow}
        pdfDownloadNotification={pdfDownloadNotification}
        generatePDF={generatePDF}
        selectNavOutsideClick={selectNavOutsideClick}
        handleNavOutsideClick={handleNavOutsideClick}
        isNavbarSelectionClick={isNavbarSelectionClick}
        setNavbarSelectionClick={setNavbarSelectionClick}
        handleResetBreadcrumbs={handleResetBreadcrumbs}
        pid={pid}
        meetingid={meetingid}
        handlePDFDownloadNotification={handlePDFDownloadNotification}
        handleGeneratePDF={handleGeneratePDF}
        showBylaws_Charter_GovGuidelinesTab={
          showBylaws_Charter_GovGuidelinesTab
        }
        showComplianceTab={showComplianceTab}
        showPoisonPillTab={showPoisonPillTab}
        showLatestFilingsTab={showLatestFilingsTab}
        showShareholderProposalsTab={showShareholderProposalsTab}
        companyProductSelection={companyProductSelection}
        trialUserDisableDownload={trialUserDisableDownload}
        pdfDownloadLoader={pdfDownloadLoader}
        handlePDFDownloadLoader={handlePDFDownloadLoader}
      />
    </>
  );
};

CompanyHeader.propTypes = {
  handleHoverSubmenu: PropTypes.func,
  handleNavOutsideClick: PropTypes.func,
  handlePDFDownloadNotification: PropTypes.func,
  handleGeneratePDF: PropTypes.func,
  handlePDFListItems: PropTypes.func,
  handlePDFDownloadCancelClick: PropTypes.func,
  handlePDFMenuShow: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetLoading: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  isNavbarSelectionClick: PropTypes.string,
  location: PropTypes.object,
  meetingid: PropTypes.any,
  pdfDownloadNotification: PropTypes.bool,
  generatePDF: PropTypes.object.isRequired,
  pdfListItems: PropTypes.array,
  pdfDownloadCancelBtn: PropTypes.bool,
  pdfMenuShow: PropTypes.bool,
  pid: PropTypes.any,
  selectNavOutsideClick: PropTypes.bool,
  selectedHoverSubmenu: PropTypes.any,
  setNavbarSelectionClick: PropTypes.func,
  showBylaws_Charter_GovGuidelinesTab: PropTypes.bool,
  showComplianceTab: PropTypes.bool,
  showLatestFilingsTab: PropTypes.bool,
  showPoisonPillTab: PropTypes.bool,
  showShareholderProposalsTab: PropTypes.bool,
  token: PropTypes.object.isRequired,
  isActivistShortModuleAccess: PropTypes.any
};

CompanyHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleNavOutsideClick: () => {},
  handlePDFDownloadNotification: () => {},
  handleGeneratePDF: () => {},
  handlePDFListItems: () => {},
  handlePDFDownloadCancelClick: () => {},
  handlePDFMenuShow: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetLoading: () => {},
  handleVisitorLog: () => {},
  isNavbarSelectionClick: '',
  location: {},
  meetingid: undefined,
  pdfDownloadNotification: false,
  pdfListItems: [],
  pdfDownloadCancelBtn: false,
  pdfMenuShow: false,
  pid: undefined,
  selectNavOutsideClick: false,
  setNavbarSelectionClick: () => {},
  showBylaws_Charter_GovGuidelinesTab: false,
  showComplianceTab: false,
  showLatestFilingsTab: false,
  showPoisonPillTab: false,
  showShareholderProposalsTab: false,
  selectedHoverSubmenu: '',
  isActivistShortModuleAccess: undefined
};

export default withRouter(React.memo(CompanyHeader));
