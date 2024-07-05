import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Page from '../../../Page';
import pathConst from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import VotingProfileSummary from './VotingProfileSummary';
import VotingProfileContacts from './VotingProfileContacts';
import VotingProfileBoards from './VotingProfileBoards';
import VotingProfileCommittes from './VotingProfileCommittes';
import VotingProfileRemuneration from './VotingProfileRemuneration';
import VotingProfileStructure from './VotingProfileStructure';
import VotingProfileGeneral from './VotingProfileGeneral';
import VotingProfileESG from './VotingProfileESG';
import VotingProfileVotingPolicy from './VotingProfileVotingPolicy';
import VotingProfileTopSection from './VotingProfileTopSection';
import ErrorBoundary from '../../../GeneralForm/ErrorBoundary';

const InvestorVotingProfile = ({
  location,
  loadingData,
  allowDownload,
  TrialStatus,

  handleSetInvestor,
  ddlAllInvestor,
  ddlSetInvestor,
  votingProfile,

  handleSetSection,
  tableKeyDocument,
  tableVotingPolicyChanges,
  tableContacts,
  tableBoards,
  tableCommittes,
  tableRemuneration,
  tableStructure,
  tableGeneral,
  tableESG,
  tableVotingPolicy,

  tableProxyVotingSummary,
  setSection,
  InvestorTitle,
  TrialUserDisableDownload,
  handleResetVotingProfile,
}) => {
  const [selectNavOutsideClick, setSelectNavOutsideClick] = useState(false);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bemnavigatio = bn.create('navigatio-utils');

  const [jsonNew, setJsonNew] = useState([]);

  const getImageOrFallback = (path, fallback) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
      if (!img.complete) {
        return false;
      }
      return true;
    });

  useEffect(() => {
    async function getAll() {
      const jsonImgExists = [];
      for (const obj of tableContacts) {
        const pathUrl = `${window.location.origin}${
          pathConst.CONTACT_IMG_PATH
        }${encodeURIComponent(obj.picture)}`;
        const link = await getImageOrFallback(pathUrl, '');
        jsonImgExists.push({ ...obj, imageExists: link !== '' });
      }
      setJsonNew(jsonImgExists);
    }
    getAll();
  }, [tableContacts, tableContacts.length]);

  if (!query.investor) {
    return <Redirect to={pathConst.INVESTOR_SEARCH} />;
  }

  const navItems = [
    {
      name: 'Policy Changes',
      id: 'PolicyChanges',
      exact: true,
      disabled: false,
    },
    {
      name: 'Contacts',
      id: 'Contacts',
      exact: true,
      disabled: false,
    },
    {
      name: 'Board',
      id: 'Board',
      exact: true,
      disabled: false,
    },
    {
      name: 'Committees',
      id: 'Committes',
      exact: true,
      disabled: false,
    },
    {
      name: 'Remuneration',
      id: 'Remuneration',
      exact: true,
      disabled: false,
    },
    {
      name: 'Structure',
      id: 'Structure',
      exact: true,
      disabled: false,
    },
    {
      name: 'General',
      id: 'General',
      exact: true,
      disabled: false,
    },
    {
      name: 'ESG',
      id: 'ESG',
      exact: true,
      disabled: false,
    },
    {
      name: 'Voting Policy',
      id: 'VotingPolicy',
      exact: true,
      disabled: false,
    },
  ];

  useEffect(() => {
    if (!loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [loadingData]);

  return (
    <div>
      <VotingProfileTopSection
        location={location}
        loadingData={loadingData}
        allowDownload={allowDownload}
        TrialStatus={TrialStatus}
        TrialUserDisableDownload={TrialUserDisableDownload}
        ddlAllInvestor={ddlAllInvestor}
        handleSetInvestor={handleSetInvestor}
        ddlSetInvestor={ddlSetInvestor}
        votingProfile={votingProfile}
        tableProxyVotingSummary={tableProxyVotingSummary}
        tableKeyDocument={tableKeyDocument}
        InvestorTitle={InvestorTitle}
        handleResetVotingProfile={handleResetVotingProfile}
      />
      <div>
        <div id='loadItem' />

        {/* Navbar */}
        {!query.print && !loadingData && (
          <div className='sticky-outer-wrapper pt-4 pb-2' id='BottomNavBar'>
            <nav className='navbar navbar-expand-md navbar-light bg-light'>
              <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent'
              >
                <ul className='navbar-nav me-auto'>
                  {navItems.length > 0 &&
                    navItems.map(({ name, exact, id, disabled }, index) => (
                      <li className='nav-item' key={`item${index + 1}`}>
                        <NavLink
                          to=''
                          onClick={(e) => {
                            e.preventDefault();
                            const eleName = e.target.getAttribute('idname');
                            handleSetSection({ status: true, id: eleName });
                          }}
                          className={
                            setSection.id === id
                              ? 'nav-link active'
                              : disabled
                              ? 'nav-link disabled'
                              : 'nav-link'
                          }
                          activeClassName={disabled ? '' : 'active'}
                          id={`navItem-${name}-${index}`}
                          exact={exact}
                          idname={id}
                        >
                          {name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            </nav>
            {/* mobile */}
            <div className={bemnavigatio.b('')}>
              <nav className='mobilenavbar navbar navbar-expand-md navbar-light bg-light'>
                <Navbar
                  className='w-100 navbar-toggler border-color-white p-0'
                  collapseOnSelect
                  expanded={selectNavOutsideClick}
                  expand='lg'
                  variant='dark'
                  // onBlur={(e) => {
                  //   e.preventDefault();
                  //   setSelectNavOutsideClick(!selectNavOutsideClick);
                  // }}
                >
                  <Navbar.Toggle
                    className='w-100 bg-primary btnToogle'
                    aria-controls='responsive-navbar-nav'
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectNavOutsideClick(!selectNavOutsideClick);
                    }}
                  >
                    <div className='d-flex'>
                      <div className='d-inline-block divTitle'>
                        <span className='titleSelection' title={setSection.id}>
                          {setSection.id}
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
                      {navItems.length > 0 &&
                        navItems.map(({ name, id, disabled }, index) => (
                          <div key={`key${index + 1}`}>
                            <Nav.Link
                              key={`lnk${index + 1}`}
                              eventKey={`navItem-${name}-${index}`}
                              id={`navItem-${name}-${index}`}
                              idname={id}
                              className={
                                setSection.id === id
                                  ? 'lh-20 ms-10 border-bottom-1w active'
                                  : disabled
                                  ? 'lh-20 ms-10 border-bottom-1w disabled'
                                  : 'lh-20 ms-10 border-bottom-1w'
                              }
                              onClick={async (e) => {
                                e.preventDefault();
                                const eleName = e.target.getAttribute('idname');
                                await setSelectNavOutsideClick(
                                  !selectNavOutsideClick
                                );
                                await handleSetSection({
                                  status: true,
                                  id: eleName,
                                });
                              }}
                            >
                              {name}
                            </Nav.Link>
                          </div>
                        ))}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </nav>
            </div>
          </div>
        )}

        <div>
          {!loadingData && (
            <Page key={20} className='pt-0'>
              <div id={`div${setSection.id}`} className='pt-2 pb-3'>
                {(query.print || setSection.id === 'PolicyChanges') && (
                  <ErrorBoundary hasCard cardtitle='Voting Policy Changes'>
                    <VotingProfileSummary
                      location={location}
                      InvestorTitle={InvestorTitle}
                      tableVotingPolicyChanges={tableVotingPolicyChanges}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'Contacts') && (
                  <ErrorBoundary hasCard cardtitle='Contacts'>
                    <VotingProfileContacts
                      location={location}
                      tableContacts={tableContacts}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                      dataContactDetails={
                        jsonNew.length === tableContacts.length
                          ? jsonNew
                          : tableContacts
                      }
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'Board') && (
                  <ErrorBoundary hasCard cardtitle='Board of Directors Policy'>
                    <VotingProfileBoards
                      location={location}
                      tableBoards={tableBoards}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'Committes') && (
                  <ErrorBoundary
                    hasCard
                    cardtitle='Committees & Reporting Policy'
                  >
                    <VotingProfileCommittes
                      location={location}
                      tableCommittes={tableCommittes}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'Remuneration') && (
                  <ErrorBoundary
                    hasCard
                    cardtitle='Remuneration / Compensation Policy'
                  >
                    <VotingProfileRemuneration
                      location={location}
                      tableRemuneration={tableRemuneration}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'Structure') && (
                  <ErrorBoundary hasCard cardtitle='Corporate Structure Policy'>
                    <VotingProfileStructure
                      location={location}
                      tableStructure={tableStructure}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'General') && (
                  <ErrorBoundary hasCard cardtitle='General Governance Policy'>
                    <VotingProfileGeneral
                      location={location}
                      tableGeneral={tableGeneral}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'ESG') && (
                  <ErrorBoundary
                    hasCard
                    cardtitle='Environmental & Social Policy'
                  >
                    <VotingProfileESG
                      location={location}
                      tableESG={tableESG}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
                {(query.print || setSection.id === 'VotingPolicy') && (
                  <ErrorBoundary hasCard cardtitle='Voting Policy'>
                    <VotingProfileVotingPolicy
                      location={location}
                      tableVotingPolicy={tableVotingPolicy}
                      loadingData={loadingData}
                      allowDownload={allowDownload}
                      TrialStatus={TrialStatus}
                      TrialUserDisableDownload={TrialUserDisableDownload}
                    />
                  </ErrorBoundary>
                )}
              </div>
            </Page>
          )}
        </div>
      </div>
    </div>
  );
};

InvestorVotingProfile.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  //
  getVotingProfileTopSectionReq: PropTypes.func.isRequired,
  getInvestorDDLListReq: PropTypes.func.isRequired,
  handleSetInvestor: PropTypes.func.isRequired,
  ddlAllInvestor: PropTypes.array.isRequired,
  ddlSetInvestor: PropTypes.object.isRequired,
  votingProfile: PropTypes.object.isRequired,
  handleSetSection: PropTypes.func.isRequired,
  tableKeyDocument: PropTypes.array.isRequired,
  tableVotingPolicyChanges: PropTypes.array.isRequired,
  tableContacts: PropTypes.array.isRequired,
  tableBoards: PropTypes.object.isRequired,
  tableCommittes: PropTypes.object.isRequired,
  tableRemuneration: PropTypes.object.isRequired,
  tableStructure: PropTypes.object.isRequired,
  tableGeneral: PropTypes.object.isRequired,
  tableESG: PropTypes.object.isRequired,
  tableVotingPolicy: PropTypes.object.isRequired,
  tableNews: PropTypes.array.isRequired,
  tableProxyVotingSummary: PropTypes.array.isRequired,
  setSection: PropTypes.object.isRequired,
  dataContactDetails: PropTypes.any,
};
InvestorVotingProfile.defaultProps = {
  dataContactDetails: undefined,
};

export default withRouter(InvestorVotingProfile);
