import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import qs from 'qs';
import { NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { history } from '../../../utils/navigation-util';
import bn from '../../../utils/bemnames';
import {
  INVESTOR_OVERVIEW,
  INVESTOR_ACTIVISM,
  INVESTOR_ACTIVISM_OVERVIEW,
  INVESTOR_ACTIVIST_SHORT_OVERVIEW,
  INVESTOR_VOTING_OVERVIEW,
  INVESTOR_ACTIVISM_CAMPAIGNS,
  INVESTOR_ACTIVISM_INVESTMENTS,
  INVESTOR_ACTIVISM_DEMANDS,
  INVESTOR_ACTIVISM_FOLLOWER_RETURNS,
  INVESTOR_ACTIVISM_PERFORMANCE,
  INVESTOR_ACTIVISM_FILINGS,
  INVESTOR_ACTIVIST_SHORT,
  INVESTOR_ACTIVIST_SHORT_CAMPAIGNS,
  INVESTOR_ACTIVIST_SHORT_FILINGS,
  INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES,
  INVESTOR_VOTING,
  INVESTOR_VOTING_PROFILE,
  INVESTOR_VOTING_SUMMARY,
  INVESTOR_VOTING_BY_PROPOSAL,
  INVESTOR_VOTING_RATIONALE,
  INVESTOR_PROXY_CONTEST_VOTING,
  INVESTOR_FUNDS_VOTED,
  INVESTOR_NEWS,
  INVESTOR_OWNERSHIP,
  OWNERSHIP_INVESTOR_LONG_INVESTOR,
  OWNERSHIP_INVESTOR_SHORT_INVESTOR,
  QUERY_INVESTOR,
} from '../../../constants/PathsConstant';
import { NUMBER_TWO, NUMBER_FOUR } from '../../../constants/NumberConstants';
import PDFNavMenu from '../../GeneralForm/PDFNavMenu';
import prodConst from '../../../constants/ProductConstants';

const bem = bn.create('navigatio-utils');

const InvestorHeader = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [stateLongAccess, setStateLongAccess] = useState(0);
  const [stateShortAccess, setStateShortAccess] = useState(0);
  let navItems = [];
  let mobileNavItem = [];
  let timer;
  const pdfListItem = useRef([]);
  const { investor } = props;

  if (investor !== undefined) {
    query.investor = investor;
  }

  useEffect(() => {
    setStateLongAccess(props.InvLongShort.long);
    setStateShortAccess(props.InvLongShort.short);
  }, [props.InvLongShort]);

  if (props.investorNavObj.data !== undefined) {
    const obj = props.investorNavObj.data[0];
    navItems = [
      {
        to: INVESTOR_OVERVIEW,
        name: 'Overview',
        id: 'overview',
        exact: true,
        disabled: false,
        firstChild: `${INVESTOR_OVERVIEW}`,
        search: `${QUERY_INVESTOR}${query.investor}`,
      },
      {
        to: INVESTOR_ACTIVISM,
        name: 'Activism',
        id: 'activism',
        exact: false,
        disabled: !obj.activism,
        firstChild: `${INVESTOR_ACTIVISM_OVERVIEW}`,
        search: `${QUERY_INVESTOR}${query.investor}`,
      },
      {
        to: INVESTOR_ACTIVIST_SHORT,
        name: 'Activist Shorts',
        id: 'activistshorts',
        exact: false,
        disabled: !obj.activist_shorts,
        firstChild: `${INVESTOR_ACTIVIST_SHORT_OVERVIEW}`,
        search: `${QUERY_INVESTOR}${query.investor}`,
      },
      {
        to: INVESTOR_VOTING,
        name: 'Voting',
        id: 'voting',
        exact: false,
        disabled: !obj.voting,
        firstChild: `${INVESTOR_VOTING_OVERVIEW}`,
        search: `${QUERY_INVESTOR}${query.investor}`,
      },
      {
        to: INVESTOR_NEWS,
        name: 'News',
        id: 'news',
        exact: false,
        disabled: !obj.news,
        firstChild: `${INVESTOR_NEWS}`,
        search: `${QUERY_INVESTOR}${query.investor}`,
      },
      {
        to: INVESTOR_OWNERSHIP,
        name: 'Ownership',
        id: 'ownership',
        exact: false,
        disabled: !obj.ownership,
        firstChild:
          props.InvLongShort.long === 1
            ? `${OWNERSHIP_INVESTOR_LONG_INVESTOR}`
            : props.InvLongShort.short === 1
            ? `${OWNERSHIP_INVESTOR_SHORT_INVESTOR}`
            : '',
        search: `${QUERY_INVESTOR}${query.investor}`,
      },
    ];
    mobileNavItem = [
      {
        name: 'Overview',
        to: INVESTOR_OVERVIEW,
        handleVisitorLog: props.handleVisitorLog,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activism - Overview',
        to: INVESTOR_ACTIVISM_OVERVIEW,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activism,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activism - Activist Campaigns',
        to: INVESTOR_ACTIVISM_CAMPAIGNS,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activism,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activism - Investments',
        to: INVESTOR_ACTIVISM_INVESTMENTS,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activism,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activism - Demands',
        to: INVESTOR_ACTIVISM_DEMANDS,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activism,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activism - Follower Returns',
        to: INVESTOR_ACTIVISM_FOLLOWER_RETURNS,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activism,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activism - Performance',
        to: INVESTOR_ACTIVISM_PERFORMANCE,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activism,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activist Shorts - Overview',
        to: INVESTOR_ACTIVIST_SHORT_OVERVIEW,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activistshorts,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activist Shorts - Campaigns',
        to: INVESTOR_ACTIVIST_SHORT_CAMPAIGNS,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activistshorts,
      },
      {
        handleVisitorLog: props.handleVisitorLog,
        name: 'Activist Shorts - Ownership Disclousures',
        to: INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        disabled: !obj.activistshorts,
      },
      {
        name: 'Voting - Overview',
        to: INVESTOR_VOTING_OVERVIEW,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },
      {
        to: INVESTOR_VOTING_PROFILE,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Voting - Profile',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },
      {
        to: INVESTOR_VOTING_SUMMARY,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Voting - Summary',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },
      {
        to: INVESTOR_VOTING_BY_PROPOSAL,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Voting - Resolution',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },
      {
        to: INVESTOR_VOTING_RATIONALE,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Voting - Rationale',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },
      {
        to: INVESTOR_PROXY_CONTEST_VOTING,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Voting - Proxy Contest Voting',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },
      {
        to: INVESTOR_FUNDS_VOTED,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Voting - Funds Voted',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.voting,
      },

      {
        to: INVESTOR_NEWS,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'News - Investor News',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.news,
      },
      {
        to: OWNERSHIP_INVESTOR_LONG_INVESTOR,
        parameter: `${QUERY_INVESTOR}${query.investor}`,
        name: 'Ownership - Investor Ownership',
        handleVisitorLog: props.handleVisitorLog,
        disabled: !obj.ownership,
      },
    ];
  }

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
        props.token.MemberShip !== undefined &&
        props.token.MemberShip.some(
          (item) => item.product_id === product_id && (item.status === NUMBER_FOUR || item.status === NUMBER_TWO)
        )
      ) {
        return false;
      }
    },
    [props.token.MemberShip]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (props.isNavbarSelectionClick === '' && mobileNavItem.find((item) => item.to === props.location.pathname)) {
      props.setNavbarSelectionClick(mobileNavItem.find((item) => item.to === props.location.pathname).name);
      props.handleHoverSubmenu(props.location.pathname);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    props,
    props.setNavbarSelectionClick,
    props.isNavbarSelectionClick,
    mobileNavItem,
    props.handleHoverSubmenu,
    props.location.pathname,
  ]);

  // #region PDFMenu

  const isDisableItem = useCallback(
    (product_id) => {
      if (
        props.token.MemberShip !== undefined &&
        props.token.MemberShip.some((item) => item.product_id === product_id && item.status !== NUMBER_FOUR)
      ) {
        return true;
      }
    },
    [props.token.MemberShip]
  );

  const isDisableOverview = useCallback(() => {
    if (props.token && props.token.MemberShip &&
        props.token.MemberShip !== undefined && props.token.MemberShip.length > 0 &&
        props.token.MemberShip.every((item) => item.status === NUMBER_TWO)) {
      return true;
    }
  }, [props.token.MemberShip]);

  // pdfListItem List
  useEffect(() => {
    if (props.investorNavObj.data !== undefined) {
      const obj = props.investorNavObj.data[0];
      pdfListItem.current = [
        //#region overview
        {
          module: 'overview',
          id: 'Investor_Overview',
          name: 'Investor Overview',
          checked: !isDisableOverview(),
          disabled: isDisableOverview(),
          to: `${window.location.origin}${INVESTOR_OVERVIEW}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Overview',
        },
        //#endregion

        //#region Activism
        { parent: true, name: 'Activism' },
        {
          module: 'activism',
          id: 'Activism_Overview',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_OVERVIEW}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activism Overview',
          name: 'Overview',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        {
          module: 'activism',
          id: 'Activist_Campaigns',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_CAMPAIGNS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activist Campaigns',
          name: 'Activist Campaigns',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        {
          module: 'activism',
          id: 'Activist_Investments',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_INVESTMENTS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activist Investments',
          name: 'Investments',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        {
          module: 'activism',
          id: 'Activist_Demands',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_DEMANDS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activist Demands',
          name: 'Demands',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        {
          module: 'activism',
          id: 'Follower_Returns',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_FOLLOWER_RETURNS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Follower Returns',
          name: 'Follower Returns',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        {
          module: 'activism',
          id: 'Performance',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_PERFORMANCE}?investor=${query.investor}&print=1`,
          name: 'Performance',
          pdfPageName: 'Investor: Activism Performance',
          checked: defaultChecked({
            checked: false,
            disabled:
              !props.accessPerformance || isDisableItem(prodConst.ACTIVISM)
                ? true
                : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled:
            !props.accessPerformance || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        {
          module: 'activism',
          id: 'Filings',
          to: `${window.location.origin}${INVESTOR_ACTIVISM_FILINGS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activism Filings',
          name: 'Filings',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
            module: 'activism',
          }),
          disabled: !obj.activism || isDisableItem(prodConst.ACTIVISM) ? true : isActiveCheckBox(prodConst.ACTIVISM),
        },
        //#endregion

        //#region Activist Shorts
        { parent: true, name: 'Activist Shorts' },
        {
          module: 'activistshorts',
          id: 'ActivistShorts_Overview',
          to: `${window.location.origin}${INVESTOR_ACTIVIST_SHORT_OVERVIEW}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activist Shorts Overview',
          name: 'Overview',
          checked: defaultChecked({
            checked: false,
            disabled:
              !obj.activist_shorts || isDisableItem(prodConst.ACTIVIST_SHORTS)
                ? true
                : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
            module: 'activistshorts',
          }),
          disabled:
            !obj.activist_shorts || isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
        },
        {
          module: 'activistshorts',
          id: 'ActivistShorts_Campaigns',
          to: `${window.location.origin}${INVESTOR_ACTIVIST_SHORT_CAMPAIGNS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activist Short Campaigns',
          name: 'Activist Short Campaigns',
          checked: defaultChecked({
            checked: false,
            disabled:
              !obj.activist_shorts || isDisableItem(prodConst.ACTIVIST_SHORTS)
                ? true
                : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
            module: 'activistshorts',
          }),
          disabled:
            !obj.activist_shorts || isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
        },
        // {
        //   module: "activistshorts",
        //   id: "ActivistShorts_Ownership_Disclosures",
        //   to: `${window.location.origin}${INVESTOR_ACTIVIST_SHORT_OWNERSHIP_DISCLOSURES}?investor=${query.investor}&print=1`,
        //   pdfPageName: "Investor: Activist Short Ownership Disclosures",
        //   name: "Ownership Disclosures",
        //   checked: defaultChecked({
        //     checked: false,
        //     disabled: true, // !obj.activist_shorts,
        //     module: "activistshorts",
        //   }),
        //   disabled: true, // !obj.activist_shorts,
        // },
        {
          module: 'activistshorts',
          id: 'ActivistShorts_Filings',
          to: `${window.location.origin}${INVESTOR_ACTIVIST_SHORT_FILINGS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Activist Shorts Filings',
          name: 'Filings',
          checked: defaultChecked({
            checked: false,
            disabled:
              !obj.activist_shorts || isDisableItem(prodConst.ACTIVIST_SHORTS)
                ? true
                : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
            module: 'activistshorts',
          }),
          disabled:
            !obj.activist_shorts || isDisableItem(prodConst.ACTIVIST_SHORTS)
              ? true
              : isActiveCheckBox(prodConst.ACTIVIST_SHORTS),
        },
        //#endregion

        //#region Voting
        { parent: true, name: 'Voting' },
        {
          module: 'voting',
          id: 'Voting_Overview',
          to: `${window.location.origin}${INVESTOR_VOTING_OVERVIEW}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Voting Overview',
          name: 'Overview',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
            module: 'voting',
          }),
          disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
        },
        {
          module: 'voting',
          id: 'Voting_Profile',
          to: `${window.location.origin}${INVESTOR_VOTING_PROFILE}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Voting Profile',
          name: 'Voting Profile',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
            module: 'voting',
          }),
          disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
        },
        {
          module: 'voting',
          id: 'Voting_by_Proposal',
          to: `${window.location.origin}${INVESTOR_VOTING_BY_PROPOSAL}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Voting by Proposal',
          name: 'Voting by Proposal',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
            module: 'voting',
          }),
          disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
        },
        {
          module: 'voting',
          id: 'Voting_Rationale',
          to: `${window.location.origin}${INVESTOR_VOTING_RATIONALE}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Voting Rationale',
          name: 'Voting Rationale',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
            module: 'voting',
          }),
          disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
        },
        {
          module: 'voting',
          id: 'Voting_Proxy_Content',
          to: `${window.location.origin}${INVESTOR_PROXY_CONTEST_VOTING}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Proxy Contest Voting',
          name: 'Proxy Contest Voting',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
            module: 'voting',
          }),
          disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
        },
        {
          module: 'voting',
          id: 'Voting_Funds_Voted',
          to: `${window.location.origin}${INVESTOR_FUNDS_VOTED}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Voting Funds Voted',
          name: 'Funds Voted',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
            module: 'voting',
          }),
          disabled: !obj.voting || isDisableItem(prodConst.VOTING) ? true : isActiveCheckBox(prodConst.VOTING),
        },
        //#endregion

        //#region news
        { parent: true, name: 'News' },
        {
          module: 'news',
          id: 'News',
          name: 'News',
          to: `${window.location.origin}${INVESTOR_NEWS}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: News',
          checked: defaultChecked({
            checked: false,
            disabled: !obj.news ? true : isActiveCheckBox(''),
            module: 'news',
          }),
          disabled: !obj.news ? true : isActiveCheckBox(''),
        },
        //#endregion

        //#region ownership
        { parent: true, name: 'Ownership' },
        {
          module: 'ownership',
          id: 'OWNERSHIP_LONG_INVESTOR',
          name: 'Long',
          to: `${window.location.origin}${OWNERSHIP_INVESTOR_LONG_INVESTOR}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Ownership Long',
          checked: defaultChecked({
            checked: false,
            disabled: stateLongAccess === 0,
            module: 'ownership',
          }),
          disabled: stateLongAccess === 0,
        },
        {
          module: 'ownership',
          id: 'OWNERSHIP_SHORT_INVESTOR',
          name: 'Short',
          to: `${window.location.origin}${OWNERSHIP_INVESTOR_SHORT_INVESTOR}?investor=${query.investor}&print=1`,
          pdfPageName: 'Investor: Ownership Short',
          checked: defaultChecked({
            checked: false,
            disabled: stateShortAccess === 0,
            module: 'ownership',
          }),
          disabled: stateShortAccess === 0,
        },
        //#endregion
      ];
    }
  }, [isActiveCheckBox, props.investorNavObj, props.accessPerformance, query.investor, stateLongAccess, stateShortAccess]);

  const callbackHandlePDFListItems = useCallback(
    (pdfListItem) => {
      props.handlePDFListItems(pdfListItem);
    },
    [props.handlePDFListItems, props.investorNavObj, stateLongAccess, stateShortAccess]
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
      <nav className='mainnavbar navbar navbar-expand-md navbar-light bg-light '>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='nav nav-tabs me-auto'>
            {navItems.map(({ to, firstChild, search, name, exact, disabled, id }, index) => (
              <li className='nav-item' key={`nav${index + 1}`}>
                <NavLink
                  to={to + search}
                  onMouseMove={(e) => {
                    e.preventDefault();
                    clearTimeout(timer);
                    timer = setTimeout(stopmouse, 300);
                    function stopmouse() {
                      props.handleResetCompanyPath(to);
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
                        // isLoadChildContent: true,
                      },
                    });
                    // original
                    // props.handleResetBreadcrumbs(firstChild);
                    // props.handleResetCompanyPath(firstChild);
                    if (firstChild !== INVESTOR_OVERVIEW) {
                      props.handleVisitorLog(firstChild, search);
                    }
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
                  idname={id}
                  exact={exact}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* mobile */}
      <div className={bem.b('')}>
        <nav className='mobilenavbar navbar navbar-expand-md navbar-light bg-light'>
          <Navbar
            className='w-100 navbar-toggler border-color-white p-0'
            collapseOnSelect
            expanded={props.selectNavOutsideClick}
            expand='lg'
            variant='dark'
            onBlur={(e) => {
              e.preventDefault();
              props.selectNavOutsideClick && props.handleNavOutsideClick(false);
            }}
          >
            <Navbar.Toggle
              className='w-100 bg-primary btnToogle'
              aria-controls='responsive-navbar-nav'
              onClick={(e) => {
                e.preventDefault();
                props.selectNavOutsideClick ? props.handleNavOutsideClick(false) : props.handleNavOutsideClick(true);
              }}
            >
              <div className='d-flex'>
                <div className='d-inline-block divTitle'>
                  <span className='titleSelection' title={props.isNavbarSelectionClick}>
                    {props.isNavbarSelectionClick}
                  </span>
                </div>
                <div className='d-inline-block w-100'>
                  <span className='float-end navbar-toggler-icon' />
                </div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse style={{ border: '2px solid white' }} id='responsive-navbar-nav'>
              <Nav className='ms-auto scrollbar scrollBarSection w-100'>
                {mobileNavItem.map(({ name, to, parameter, disabled, handleVisitorLog }, index) => (
                  <div key={`name${index + 1}`}>
                    {mobileNavItem[index].length === undefined ? (
                      <Nav.Link
                        key={`lnk${index + 1}`}
                        eventKey={`navItem-${name}-${index}`}
                        className={
                          props.isNavbarSelectionClick === name
                            ? 'lh-20 ms-10 border-bottom-1w active'
                            : disabled
                            ? 'lh-20 ms-10 border-bottom-1w disabled'
                            : 'lh-20 ms-10 border-bottom-1w'
                        }
                        // className={disabled ? "lh-20 ms-10 border-bottom-1w disabled" : "lh-20 ms-10 border-bottom-1w"}
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace({
                            pathname: to,
                            search: parameter,
                            state: {
                              isLoadChildContent: true,
                            },
                          });
                          props.handleNavOutsideClick(false);
                          props.setNavbarSelectionClick(name);
                          handleVisitorLog(to, parameter);
                          props.handleResetBreadcrumbs(to);
                        }}
                      >
                        {name}
                      </Nav.Link>
                    ) : (
                      <NavDropdown title={mobileNavItem[index][0].title} id='collasible-nav-dropdown'>
                        {mobileNavItem[index].map(
                          ({ name, to, parameter, disabled, handleVisitorLog }, index) =>
                            to !== undefined &&
                            parameter !== undefined && (
                              <NavDropdown.Item
                                className={disabled ? 'disabled' : ''}
                                key={`disabled${index + 1}`}
                                eventKey={`navItem-${name}-${index}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.replace({
                                    pathname: to,
                                    search: parameter,
                                    state: {
                                      isLoadChildContent: true,
                                    },
                                  });
                                  handleVisitorLog(to, parameter);
                                  props.handleResetBreadcrumbs(to);
                                }}
                              >
                                {name}
                              </NavDropdown.Item>
                            )
                        )}
                      </NavDropdown>
                    )}
                  </div>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </nav>
      </div>
      {/* PDF MENU */}
      <PDFNavMenu
        {...props}
        investor={query.investor}
        pdfListItems={props.pdfListItems}
        handlePDFListItems={props.handlePDFListItems}
        pdfDownloadLoader={props.pdfDownloadLoader}
        handlePDFDownloadLoader={props.handlePDFDownloadLoader}
      />
    </>
  );
};

InvestorHeader.propTypes = {
  investor: PropTypes.any,
  handleHoverSubmenu: PropTypes.func,
  handleNavOutsideClick: PropTypes.func,
  handlePDFDownloadNotification: PropTypes.func,
  handleGeneratePDF: PropTypes.func,
  handlePDFListItems: PropTypes.func,
  handlePDFMenuShow: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetLoading: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  isNavbarSelectionClick: PropTypes.string,
  location: PropTypes.object,
  pdfDownloadNotification: PropTypes.bool,
  generatePDF: PropTypes.object.isRequired,
  pdfListItems: PropTypes.array,
  pdfMenuShow: PropTypes.bool,
  selectNavOutsideClick: PropTypes.bool,
  selectedHoverSubmenu: PropTypes.any,
  setNavbarSelectionClick: PropTypes.func,
  token: PropTypes.object.isRequired,
};

InvestorHeader.defaultProps = {
  handleHoverSubmenu: () => {},
  handleNavOutsideClick: () => {},
  handlePDFDownloadNotification: () => {},
  handleGeneratePDF: () => {},
  handlePDFListItems: () => {},
  handlePDFMenuShow: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetLoading: () => {},
  handleVisitorLog: () => {},
  isNavbarSelectionClick: '',
  location: {},
  pdfDownloadNotification: false,
  pdfListItems: [],
  pdfMenuShow: false,
  selectNavOutsideClick: false,
  setNavbarSelectionClick: () => {},
  selectedHoverSubmenu: '',
};

export default withRouter(InvestorHeader);
