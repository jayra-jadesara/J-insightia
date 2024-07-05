import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import qs from 'qs';
import TitleComponent from '../../components/Company/General/TitleComponent';
import {
  getCompanyProfileReq,
  getIssuerProfileReq,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleHoverSubmenu,
  handleNavOutsideClick,
  getInvestorProfileReq,
  getInvestorNavReq,
  handleNewsAccessReq,
  handleValidTokenReq,
  getGovShowPoisonPillTabReq,
  getGovShowLatestFilingsTabReq,
  getGovShowShareholderProposalsTabReq,
  getGovShowComplianceTabReq,
  get_Bylaws_Charter_GovGuidelinesReq,
  handlePDFDownloadNotification,
  handlePDFDownloadLoader,
  handleGeneratePDF,
  handlePDFDownloadCancelClick,
  handlePDFListItems,
  handlePDFMenuShow,
  handleResetLoader,
  getProfiles_insightiaReq,
  getPeopleProfileReq,
  getAdvisorProfileReq,
  handleResetCompanyTitle,
  // checkIsValidNewsPageReq,
  getActivistShortModuleAccessReq,
  handleOnClickNotification,
  getTop20AlertResultReq,
  GetHistoricalGovernanceTabReq,
  handleResetpdfDownloadStartNotification,
} from './TitleSlice';
import { handleResetLoading } from '../CompanyVotingContainer/CompanyVotingSlice';
import {
  handleVisitorLog,
  getTokenDecode,
  getOwnershipLongShortInvestorDataCheckReq,
  adm_Check_PIDReq,
  GetCompanyActivisamTabDataCheckReq
} from '../CompanyContainer/CompanySlice';
import {
  getBreadcrumbsFromPath,
  subHeader,
  getTitle,
  // mobileViewCompanyHeader
} from '../../utils/navigation-util';
import PathsConstant from '../../constants/PathsConstant';
import { CheckIsValidNewsPageUrl } from '../../utils/news-util';
import { noActionLettersDataExists } from '../../utils/company-util';
import { isIdNotNullOrUndefined } from '../../utils/general-util';
import {
  MAX_MOBILE_WIDTH,
  MD_MIN_WIDTH,
  USER_DEVICE_MOBILE,
  USER_DEVICE_TABLET,
  USER_DEVICE_LAPTOP,
} from '../../constants/ScreenSizeConstant';
import { handleGlobleResetInvestorCmparator, handleActivistCampaignsToolReset } from '../ToolsContainer/ToolsSlice';
import { handleGlobleResetProxyContestVoting } from '../InvestorContainer/Voting/ProxyContestVotingSlice';
import {
  handleGlobleResetActivistShort,
  getActivistIdFromInvestorIdReq,
} from '../InvestorContainer/ActivistShorts/ActivistShortSlice';
import { handleGlobleResetMyAlert } from '../MyAlertContainer/MyAlert/MyAlertSlice';
import { getAdvisorModuleAccessData } from '../AdvisorContainer/AdvisersSlice';
import { handleChangeDashboardId, getDashboardIds } from '../DashboardContainer/DashboardSlice';
import {
  getListofReprtingDateReq,
  getCampaignSummarybyActivistLstReq,
  getFollowerReturnsSearchLstReq,
  getFollowerReturnsActivistStatschartDataReq,
  getFollowerReturnsActivistStatsDataReq,
  GetInvestorActivisamTabDataCheckReq,
} from '../InvestorContainer/Activism/InvestorActivismSlice';
import { isUserAuthenticatedBoolean } from '../../utils/login-util';
import {
  updateAlertStatusReq,
  getElementDetailReq,
  getInboxAlertByUserReq,
} from '../MyAlertContainer/MyAlert/InboxAlertSlice';
import { addTriallogReq, handleResetTrialStatus } from '../../features/CompanyContainer/TrialSlice';
import numConst from '../../constants/NumberConstants';
import TypeConstants from '../../constants/TrialTypeConstants';
import { getInvestorOwnershipLongShortDataCheckReq } from '../InvestorContainer/Ownership/InvestorOwnershipSlice';
import productConst, {
  ACTIVISM,
  ACTIVIST_SHORTS,
  ACTIVIST_VULNERABILITY,
  COMPENSATION,
  GOVERNANCE,
  VOTING,
} from '../../constants/ProductConstants';
import { getlistActivistFilingsByActivist_v2Req } from '../InvestorContainer/InvestorSlice';
import { getdata_FAQS_definitionReq } from '../FAQHelpContainer/FAQHelpSlice';

const TitleContainer = ({
  getTokenDecode,
  token,
  location,
  getIssuerProfileReq,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleResetLoading,
  getCompanyProfileReq,
  getInvestorProfileReq,
  getInvestorNavReq,
  investorNavObj,
  meetingid,
  pid,
  investor,
  title,
  handleVisitorLog,
  selectedBreadcrumbsPath,
  selectedCompanyPath,
  handleHoverSubmenu,
  selectedHoverSubmenu,
  handleNavOutsideClick,
  selectNavOutsideClick,
  handleNewsAccessReq,
  getGovShowPoisonPillTabReq,
  getGovShowLatestFilingsTabReq,
  getGovShowShareholderProposalsTabReq,
  getGovShowComplianceTabReq,
  get_Bylaws_Charter_GovGuidelinesReq,
  showComplianceTab,
  showLatestFilingsTab,
  showPoisonPillTab,
  showShareholderProposalsTab,
  showBylaws_Charter_GovGuidelinesTab,
  match,
  handlePDFDownloadNotification,
  handlePDFDownloadLoader,
  pdfDownloadLoader,
  handleGeneratePDF,
  generatePDF,
  pdfDownloadNotification,
  handlePDFListItems,
  handlePDFDownloadCancelClick,
  pdfListItems,
  pdfDownloadCancelBtn,
  pdfMenuShow,
  handlePDFMenuShow,
  handleGlobleResetInvestorCmparator,
  handleActivistCampaignsToolReset,
  handleResetLoader,
  handleGlobleResetProxyContestVoting,
  handleGlobleResetActivistShort,
  getProfiles_insightiaReq,
  companyProductSelection,
  handleGlobleResetMyAlert,
  getPeopleProfileReq,
  director_id,
  getAdvisorProfileReq,
  company_id,
  handleResetCompanyTitle,
  getAdvisorModuleAccessData,
  lstModuleAccess,
  lstAlertModuleAccess,
  handleChangeDashboardId,
  getDashboardIds,
  getActivistIdFromInvestorIdReq,
  getListofReprtingDateReq,
  accessPerformance,
  getActivistShortModuleAccessReq,
  isActivistShortModuleAccess,
  issuerCompanyProfile,
  //alert system
  getAlertNotificationDataReq,
  //alert system
  notificationData,
  notificationDataPopup,
  updateAlertStatusReq,
  getElementDetailReq,
  handleOnClickNotification,
  getInboxAlertByUserReq,
  getTop20AlertResultReq,
  addTriallogReq,
  handleResetTrialStatus,
  trialUserDisableDownload,
  distinctProfile,
  getOwnershipLongShortInvestorDataCheckReq,
  longAccess,
  shortAccess,
  getInvestorOwnershipLongShortDataCheckReq,
  invLongAccess,
  invShortAccess,
  getCampaignSummarybyActivistLstReq,
  accessDemand,
  getlistActivistFilingsByActivist_v2Req,
  accessInvFilings,
  GetCompanyActivisamTabDataCheckReq,
  GetInvestorActivisamTabDataCheckReq,
  accessComFilings,
  getFollowerReturnsSearchLstReq,
  getFollowerReturnsActivistStatschartDataReq,
  getFollowerReturnsActivistStatsDataReq,
  accessFollowerAccess,
  showHistoricalGov,
  GetHistoricalGovernanceTabReq,
  pdfDownloadStartNotification,
  handleResetpdfDownloadStartNotification,
  people_data,
  compensationNoData,
  getIndividualGrantedPeopleCompensationReq,
  handleResetCompensation,
  getdata_FAQS_definitionReq,
  isCompensationFaq,
  ...props
}) => {
  const [breadcrumbData, setBreadcrumbData] = useState([]);
  const [titleData, setTitleData] = useState(title);
  const [selectedBreadcrumbsPathData, setSelectedBreadcrumbsPathData] =
    useState('');
  const [isExistNoActionLetters_CompanyVoting, setExistNoActionLetters] =
    useState(false);
  const [isNavbarSelectionClick, setNavbarSelectionClick] = useState('');

  let locationpathname = location.pathname;
  const lastElementOfLocationPath = locationpathname.substring(locationpathname.lastIndexOf('/') + 1);
  if (!isNaN(lastElementOfLocationPath) && lastElementOfLocationPath !== '') {
    // if (!Number.isNaN(lastElementOfLocationPath) && lastElementOfLocationPath !== '') {
    const sourcePath = locationpathname;
    const lastIndex = sourcePath.lastIndexOf('/');
    locationpathname = sourcePath.slice(0, lastIndex);
  }

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  // #region dashboard portal
  useEffect(() => {
    const abortController = new AbortController();

    let userDevice = '';
    if (window.screen.width < MAX_MOBILE_WIDTH) {
      userDevice = USER_DEVICE_MOBILE;
    } else if (window.screen.width > MAX_MOBILE_WIDTH && window.screen.width <= MD_MIN_WIDTH) {
      userDevice = USER_DEVICE_TABLET;
    } else if (window.screen.width > MD_MIN_WIDTH) {
      userDevice = USER_DEVICE_LAPTOP;
    }
    const interval = setInterval(async () => {
      handleValidTokenReq(userDevice);
    }, numConst.INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

  const getDashboardIdsData = useCallback(async () => {
    await getDashboardIds();
  }, [getDashboardIds]);

  useEffect(() => {
    const abortController = new AbortController();
    getDashboardIdsData();
    return function cleanup() {
      abortController.abort();
    };
  }, [getDashboardIdsData]);
  // #endregion

  // #region Company Voting - NoActionLetter Has Data
  const getAll = useCallback(async () => {
    if (pid) {
      const status = await noActionLettersDataExists(pid);
      setExistNoActionLetters(status);
    }
  }, [pid]);

  useEffect(() => {
    const abortController = new AbortController();
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [pid, getAll]);
  // #endregion

useEffect(() => {
  if (locationpathname.includes('/faq')) {
    getdata_FAQS_definitionReq({
      ProductID: productConst.COMPENSATION,
      AdditionalSectionID: productConst.FAQ
    });
  }
}, [locationpathname]);

  // #region Trial log
  async function addVisitorLogs() {
    if (locationpathname.includes('/tools')) {
      if (locationpathname.includes('/shortactivism')) {
        await addTriallogReq({
          locationpathname: locationpathname,
          id: 'Short Activism Tools',
          module: TypeConstants.MODULE_COMPANY,
          prod_id: ACTIVIST_SHORTS,
        });
      }
      if (locationpathname.includes('/governance')) {
        await addTriallogReq({
          locationpathname: locationpathname,
          id: 'Governance Tools',
          module: TypeConstants.MODULE_COMPANY,
          prod_id: GOVERNANCE,
        });
      }
      if (locationpathname.includes('/activism')) {
        await addTriallogReq({
          locationpathname: locationpathname,
          id: 'Activism Tools',
          module: TypeConstants.MODULE_COMPANY,
          prod_id: ACTIVISM,
        });
      }
      if (locationpathname.includes('/voting')) {
        await addTriallogReq({
          locationpathname: locationpathname,
          id: 'Voting Tools',
          module: TypeConstants.MODULE_COMPANY,
          prod_id: VOTING,
        });
      }
      if (locationpathname.includes('/vulnerability')) {
        await addTriallogReq({
          locationpathname: locationpathname,
          id: 'Vulnerability Tools',
          module: TypeConstants.MODULE_COMPANY,
          prod_id: ACTIVIST_VULNERABILITY,
        });
      }
      if (locationpathname.includes('/compensation')) {
        await addTriallogReq({
          locationpathname: locationpathname,
          id: 'Compensation Tools',
          module: TypeConstants.MODULE_COMPANY,
          prod_id: COMPENSATION,
        });
      }
    }
  }
  useEffect(() => {
    // if (
    //   locationpathname.substring(0, locationpathname.lastIndexOf('/')) !==
    //   PathsConstant.ACTIVISTSHORTS
    // ) {
    //   handleResetTrialStatus();
    // }
    handleResetTrialStatus();
    if (isIdNotNullOrUndefined(pid)) {
      addTriallogReq({
        locationpathname: locationpathname,
        id: pid,
        module: TypeConstants.MODULE_COMPANY,
      });
    }
    if (isIdNotNullOrUndefined(query.investor)) {
      addTriallogReq({
        locationpathname: locationpathname,
        id: query.investor,
        module: TypeConstants.MODULE_INVESTOR,
      });
    }
    if (isIdNotNullOrUndefined(query.company_id)) {
      addTriallogReq({
        locationpathname: locationpathname,
        id: query.company_id,
        module: TypeConstants.MODULE_ADVISERS,
      });
    }
    if (isIdNotNullOrUndefined(query.director_id)) {
      addTriallogReq({
        locationpathname: locationpathname,
        id: query.director_id,
        module: TypeConstants.MODULE_PEOPLE,
      });
    }
    addVisitorLogs();
  }, [pid, query.investor, query.company_id, locationpathname]);
  // #endregion

  // #region for getting alert
  async function getNotificationData() {
    await getTop20AlertResultReq();
  }
  useEffect(() => {
    const interval = setInterval(async () => {
      getNotificationData();
    }, numConst.INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);
  // #endregion

  // #region breadcrumbs, Title & subHeader

  useEffect(() => {
    if (selectedBreadcrumbsPath !== selectedBreadcrumbsPathData) {
      setBreadcrumbData([]);
    }
    if (locationpathname === selectedBreadcrumbsPath) {
      setSelectedBreadcrumbsPathData(selectedBreadcrumbsPath);
      if (breadcrumbData !== undefined && breadcrumbData.length === 0) {
        const breadcrumbs = getBreadcrumbsFromPath(selectedBreadcrumbsPath, locationpathname);
        setBreadcrumbData(breadcrumbs);
      }
    }
  }, [breadcrumbData, selectedBreadcrumbsPath]);

  useEffect(() => {
    setTitleData('');
  }, [title]);

  useEffect(() => {
    const titleBind = getTitle(locationpathname, title, handleChangeDashboardId, props);
    if (selectedBreadcrumbsPath !== selectedBreadcrumbsPathData) {
      handleResetCompanyPath(locationpathname);
      setTitleData('');
    }
    if (locationpathname === selectedBreadcrumbsPath) {
      if (locationpathname === PathsConstant.DASHBOARD) {
        // For Dashboard
        if (props.dashboardIdOptions.length > 0 && titleData === '') {
          setTitleData(titleBind);
        }
        if (
          titleData.props !== undefined &&
          titleData.props.dashboardID !== undefined &&
          titleBind.props !== undefined &&
          titleBind.props.dashboardID !== undefined &&
          titleData.props.dashboardID.value !== titleBind.props.dashboardID.value
        ) {
          setTitleData('');
        }
      }
      if (
        locationpathname !== PathsConstant.DASHBOARD &&
        titleData === '' &&
        titleBind !== '' &&
        titleBind !== undefined
      ) {
        setTitleData(titleBind);
      }
    }
  }, [titleData, title, selectedBreadcrumbsPath, handleResetCompanyPath, props.dashboardIdOptions, props.dashboardID]);

  // company Ownership Long/Short access
  useEffect(() => {
    if (pid) {
      getOwnershipLongShortInvestorDataCheckReq({ pid: pid });
    }
  }, [pid, longAccess, shortAccess]);

  // Investor Ownership Long/Short accesss
  useEffect(() => {
    if (isIdNotNullOrUndefined(query.investor)) {
      getInvestorOwnershipLongShortDataCheckReq({
        investor_id: query.investor,
      });
    }
  }, [query.investor, invLongAccess, invShortAccess]);

  let headers;
  if (
    breadcrumbData !== undefined &&
    breadcrumbData.length > 0 &&
    titleData !== '' &&
    selectedBreadcrumbsPathData === locationpathname &&
    headers === undefined
  ) {
    headers = subHeader(
      locationpathname,
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
      handleActivistCampaignsToolReset,
      handleResetLoader,
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
    );
  }
  // #endregion

  useEffect(() => {
    const abortController = new AbortController();
    if (isUserAuthenticatedBoolean() && token) {
      if (
        (token.User_Id !== null && token.User_Id !== undefined && issuerCompanyProfile !== undefined) ||
        query.pid !== undefined
      ) {
        getProfiles_insightiaReq({
          userid: token.User_Id,
          pid: query.pid !== undefined ? query.pid : pid,
        });
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [token, pid, query.pid, getProfiles_insightiaReq, issuerCompanyProfile, isUserAuthenticatedBoolean()]);

  const checkValidPath = useCallback(async () => {
    await handleNewsAccessReq(locationpathname);
    let isValid;
    await CheckIsValidNewsPageUrl(locationpathname)
      .then((res) => {
        isValid = res;
      })
      .catch((e) => console.log(e));
    if (isValid === false) {
      // history.push(PathsConstant.NEWSMENU);
      return null;
    }
  }, [handleNewsAccessReq, locationpathname]);

  useEffect(() => {
    if (isIdNotNullOrUndefined(query.pid)) {
      getCompanyProfileReq(query.pid);
      getGovShowPoisonPillTabReq(query.pid);
      getGovShowLatestFilingsTabReq(query.pid);
      getGovShowShareholderProposalsTabReq(query.pid);
      getGovShowComplianceTabReq(query.pid);
      get_Bylaws_Charter_GovGuidelinesReq(query.pid);
      getActivistShortModuleAccessReq(query.pid);
      GetHistoricalGovernanceTabReq(query.pid);
      getCompanyFilings(query.pid);
    }
  }, [query.pid]);

  useEffect(() => {
    if (isIdNotNullOrUndefined(query.meetingid)) {
      getIssuerProfileReq({ meetingid: query.meetingid });
    }
  }, [query.meetingid]);

  const getCompanyFilings = useCallback(
    async (pid) => {
      const companyID = await adm_Check_PIDReq(pid);
      if (companyID.company_id) {
        GetCompanyActivisamTabDataCheckReq({
          company_id: companyID.company_id,
          activist_id: null,
        });
      }
    },
    [GetCompanyActivisamTabDataCheckReq]
  );

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    if (isUserAuthenticatedBoolean()) {
      getTokenDecode();
      // news pages
      if (
        locationpathname === PathsConstant.NEWSMENU ||
        locationpathname === PathsConstant.NEWS_OVERVIEW ||
        locationpathname === PathsConstant.NEWS_ACTIVISM ||
        locationpathname === PathsConstant.NEWS_ACTIVISM_LATEST ||
        locationpathname === PathsConstant.NEWS_ACTIVISM_COVID19 ||
        locationpathname === PathsConstant.NEWS_ACTIVISM_THIS_WEEK ||
        locationpathname === PathsConstant.NEWS_ACTIVISM_WEEKLY_WRAP ||
        locationpathname === PathsConstant.NEWS_ACTIVISM_IN_DEPTH_ARTICLES ||
        locationpathname === PathsConstant.NEWS_ACTIVIST_SHORT ||
        locationpathname ===
          PathsConstant.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES ||
        locationpathname === PathsConstant.NEWS_ACTIVIST_VULNERABILITY ||
        locationpathname === PathsConstant.NEWS_ACTIVIST_VULNERABILITY_LATEST ||
        locationpathname === PathsConstant.NEWS_ACTIVIST_VULNERABILITY_REPORT ||
        locationpathname === PathsConstant.NEWS_ACTIVIST_VULNERABILITY_HIT ||
        locationpathname ===
          PathsConstant.NEWS_ACTIVIST_VULNERABILITY_UPDATES ||
        locationpathname === PathsConstant.NEWS_GOVERNANCE ||
        locationpathname === PathsConstant.NEWS_VOTING ||
        locationpathname === PathsConstant.NEWS_VOTING_IN_DEPTH_ARTICLES ||
        locationpathname === PathsConstant.NEWS_SEARCH ||
        locationpathname === PathsConstant.NEWS_COMPENSATION
      ) {
        checkValidPath();
      }
      handleResetCompanyPath(locationpathname);
      handleResetBreadcrumbs(locationpathname);
      handleHoverSubmenu('');
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    // handleResetCompanyTitle,
    handleResetBreadcrumbs,
    handleResetCompanyPath,
    locationpathname,
    location.search,
    handleVisitorLog,
    location.pathname,
    getTokenDecode,
    isExistNoActionLetters_CompanyVoting,
    checkValidPath,
    isUserAuthenticatedBoolean,
    GetHistoricalGovernanceTabReq,
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    if (isUserAuthenticatedBoolean()) {
      if (isIdNotNullOrUndefined(query.investor_id)) {
        getInvestorProfileReq(query.investor_id);
        getInvestorNavReq(query.investor_id);
      }
      if (
        query.company_id &&
        query.company_id !== undefined &&
        query.company_id !== 'undefined'
      ) {
        getAdvisorProfileReq(query.company_id);
        getAdvisorModuleAccessData(query.company_id);
      }
      if (isIdNotNullOrUndefined(query.investor)) {
        getInvestorProfileReq(query.investor);
        getInvestorNavReq(query.investor);
        getActivistIdFromInvestorIdReq(query.investor).then(async (res) => {
          const actid = res.payload.activist_id;
          if (actid !== null) {
            await GetInvestorActivisamTabDataCheckReq({ activist_id: actid });
            await getListofReprtingDateReq(actid);
          }
        });
      }
      if (isIdNotNullOrUndefined(query.meetingid)) {
        getIssuerProfileReq({ meetingid: query.meetingid });
      }
      if (isIdNotNullOrUndefined(query.director_id)) {
        getPeopleProfileReq(query.director_id);
      }
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.meetingid,
    query.investor,
    query.investor_id,
    query.director_id,
    query.company_id,
    getAdvisorProfileReq,
    getInvestorProfileReq,
    getInvestorNavReq,
    getAdvisorModuleAccessData,
    getPeopleProfileReq,
    isUserAuthenticatedBoolean,
    getCampaignSummarybyActivistLstReq,
    getlistActivistFilingsByActivist_v2Req,
    GetCompanyActivisamTabDataCheckReq,
    getFollowerReturnsSearchLstReq,
    getFollowerReturnsActivistStatschartDataReq,
    getFollowerReturnsActivistStatsDataReq,
    GetInvestorActivisamTabDataCheckReq,
    GetHistoricalGovernanceTabReq,
    location.search
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    // if (
    //   Object.keys(query).length > 0 &&
    //   locationpathname.split('/')[2] === 'overview'
    // ) {
    //   handleVisitorLog(location.pathname, location.search);
    // }
    // if (
    //   Object.keys(query).length > 0 &&
    //   locationpathname === PathsConstant.ADVISOR_ACTIVISM_OVERVIEW
    // ) {
    //   handleVisitorLog(location.pathname, location.search);
    // }
    if (Object.keys(query).length === numConst.EMPTY_TABLE_LENGTH) {
      handleVisitorLog(location.pathname, '');
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [location.pathname]);

  return (
    <TitleComponent
      title={titleData}
      breadcrumbs={breadcrumbData}
      headers={headers}
      pdfDownloadNotification={pdfDownloadNotification}
      handlePDFDownloadNotification={handlePDFDownloadNotification}
      pdfDownloadLoader={pdfDownloadLoader}
      handlePDFDownloadLoader={handlePDFDownloadLoader}
      handleGeneratePDF={handleGeneratePDF}
      generatePDF={generatePDF}
      pdfMenuShow={pdfMenuShow}
      handlePDFMenuShow={handlePDFMenuShow}
      handleVisitorLog={handleVisitorLog}
      pdfListItems={pdfListItems}
      handlePDFDownloadCancelClick={handlePDFDownloadCancelClick}
      pdfDownloadCancelBtn={pdfDownloadCancelBtn}
      showComplianceTab={showComplianceTab}
      showLatestFilingsTab={showLatestFilingsTab}
      showPoisonPillTab={showPoisonPillTab}
      showShareholderProposalsTab={showShareholderProposalsTab}
      showBylaws_Charter_GovGuidelinesTab={showBylaws_Charter_GovGuidelinesTab}
      companyProductSelection={companyProductSelection}
      isActivistShortModuleAccess={isActivistShortModuleAccess}
      isExistNoActionLetters_CompanyVoting={
        isExistNoActionLetters_CompanyVoting
      }
      notificationData={notificationData}
      notificationDataPopup={notificationDataPopup}
      updateAlertStatusReq={updateAlertStatusReq}
      getElementDetailReq={getElementDetailReq}
      getTop20AlertResultReq={getTop20AlertResultReq}
      handleOnClickNotification={handleOnClickNotification}
      getInboxAlertByUserReq={getInboxAlertByUserReq}
      pdfDownloadStartNotification={pdfDownloadStartNotification}
      handleResetpdfDownloadStartNotification={handleResetpdfDownloadStartNotification}
      {...props}
    />
  );
};

TitleContainer.propTypes = {
  getCompanyProfileReq: PropTypes.func,
  getGovShowComplianceTabReq: PropTypes.func,
  getGovShowLatestFilingsTabReq: PropTypes.func,
  getGovShowPoisonPillTabReq: PropTypes.func,
  getGovShowShareholderProposalsTabReq: PropTypes.func,
  getInvestorProfileReq: PropTypes.func,
  getInvestorNavReq: PropTypes.func,
  getIssuerProfileReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  get_Bylaws_Charter_GovGuidelinesReq: PropTypes.func,
  handleHoverSubmenu: PropTypes.func,
  handleNavOutsideClick: PropTypes.func,
  handleNewsAccessReq: PropTypes.func,
  handlePDFDownloadNotification: PropTypes.func,
  handlePDFDownloadLoader: PropTypes.func,
  handleGeneratePDF: PropTypes.func,
  handlePDFListItems: PropTypes.func,
  handlePDFDownloadCancelClick: PropTypes.func,
  handlePDFMenuShow: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetLoading: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  handleGlobleResetActivistShort: PropTypes.func,
  handleGlobleResetInvestorCmparator: PropTypes.func,
  handleActivistCampaignsToolReset: PropTypes.func,
  handleGlobleResetProxyContestVoting: PropTypes.func,
  handleResetLoader: PropTypes.func,
  investor: PropTypes.any,
  location: PropTypes.object,
  match: PropTypes.any.isRequired,
  meetingid: PropTypes.any,
  pdfDownloadNotification: PropTypes.any.isRequired,
  generatePDF: PropTypes.object.isRequired,
  pdfListItems: PropTypes.any.isRequired,
  pdfDownloadCancelBtn: PropTypes.any.isRequired,
  pdfMenuShow: PropTypes.any.isRequired,
  pid: PropTypes.any,
  selectNavOutsideClick: PropTypes.any.isRequired,
  selectedBreadcrumbsPath: PropTypes.any.isRequired,
  selectedCompanyPath: PropTypes.any.isRequired,
  selectedHoverSubmenu: PropTypes.any.isRequired,
  showBylaws_Charter_GovGuidelinesTab: PropTypes.bool,
  showComplianceTab: PropTypes.bool,
  showLatestFilingsTab: PropTypes.bool,
  showPoisonPillTab: PropTypes.bool,
  showShareholderProposalsTab: PropTypes.bool,
  title: PropTypes.string,
  InvestorTitle: PropTypes.string,
  token: PropTypes.any,
  handleGlobleResetMyAlert: PropTypes.func,
  isActivistShortModuleAccess: PropTypes.bool.isRequired,
};

TitleContainer.defaultProps = {
  getCompanyProfileReq: () => {},
  getGovShowComplianceTabReq: () => {},
  getGovShowLatestFilingsTabReq: () => {},
  getGovShowPoisonPillTabReq: () => {},
  getGovShowShareholderProposalsTabReq: () => {},
  getInvestorProfileReq: () => {},
  getInvestorNavReq: () => {},
  getIssuerProfileReq: () => {},
  getTokenDecode: () => {},
  get_Bylaws_Charter_GovGuidelinesReq: () => {},
  handleHoverSubmenu: () => {},
  handleNavOutsideClick: () => {},
  handleNewsAccessReq: () => {},
  handlePDFDownloadNotification: () => {},
  handlePDFDownloadLoader: () => {},
  handleGeneratePDF: () => {},
  handlePDFListItems: () => {},
  handlePDFDownloadCancelClick: () => {},
  handleGlobleResetActivistShort: () => {},
  handlePDFMenuShow: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetLoading: () => {},
  handleVisitorLog: () => {},
  handleGlobleResetInvestorCmparator: () => {},
  handleActivistCampaignsToolReset: () => {},
  handleGlobleResetProxyContestVoting: () => {},
  handleResetLoader: () => {},
  handleGlobleResetMyAlert: () => {},
  location: {},
  meetingid: undefined,
  pid: undefined,
  showBylaws_Charter_GovGuidelinesTab: false,
  showComplianceTab: false,
  showLatestFilingsTab: false,
  showPoisonPillTab: false,
  showShareholderProposalsTab: false,
  title: '',
  InvestorTitle: '',
};

const selectpdfDownloadLoader = (state) =>
  state.headerTitle ? state.headerTitle.pdfDownloadLoader : false;
const selectgeneratePDF = (state) =>
  state.headerTitle
    ? state.headerTitle.generatePDF
    : { pdfstatus: false, pdffileURL: '' };
const selectPdfDownloadNotification = (state) =>
  state.headerTitle ? state.headerTitle.pdfDownloadNotification : false;
const selectPdfListItems = (state) =>
  state.headerTitle ? state.headerTitle.pdfListItems : [];
const selectpdfDownloadCancelBtn = (state) =>
  state.headerTitle ? state.headerTitle.pdfDownloadCancelBtn : false;

const selectPDFMenuShow = (state) =>
  state.headerTitle ? state.headerTitle.pdfMenuShow : false;

const selectIssuerCompanyProfile = (state) => (state.headerTitle ? state.headerTitle.title : undefined);
const selectCompanyLogo = (state) => (state.headerTitle ? state.headerTitle.company_logo : undefined);
const selectInvestorCompanyProfile = (state) => (state.headerTitle ? state.headerTitle.title : undefined);
const SelectDecodeToken = (state) => state.company.getTokenDecode;
const selectPIDCompanyProfile = (state) => (state.headerTitle ? state.headerTitle.pid : undefined);
const selectMeetingIdCompanyProfile = (state) => (state.headerTitle ? state.headerTitle.meetingid : undefined);
const selectSelectedBreadcrumbsPath = (state) =>
  state.headerTitle ? state.headerTitle.selectedBreadcrumbsPath : undefined;
const selectSelectedCompanyPath = (state) => (state.headerTitle ? state.headerTitle.selectedCompanyPath : undefined);
const selectSelectedHoverSubmenu = (state) => (state.headerTitle ? state.headerTitle.selectedHoverSubmenu : undefined);
const selectSelectNavOutsideClick = (state) =>
  state.headerTitle ? state.headerTitle.selectNavOutsideClick : undefined;
const selectInvestorNavObj = (state) => (state.headerTitle ? state.headerTitle.investorNavObj : undefined);
// dashboard portal
const selectDashboarID = (state) => state.dashboard.dashboardID;
const selectDashboardIdOptions = (state) => state.dashboard.dashboardIdOptions;

// tab
const SelectIsAccessNewsActivismLatest = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivismLatest : undefined;
const SelectIsDisableNewsActivistShort = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivistShort : undefined;
const SelectIsDisableNewsActivistVulnerability = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsActivistVulnerability : undefined;
const SelectIsDisableNewsGovernance = (state) =>
  state.headerTitle ? state.headerTitle.isDisableNewsGovernance : undefined;
const SelectIsDisableNewsVoting = (state) => (state.headerTitle ? state.headerTitle.isDisableNewsVoting : undefined);
const SelectIsDisableNewsCompensation = (state) => (state.headerTitle ? state.headerTitle.isDisableNewsCompensation : undefined);

const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle ? state.headerTitle.procedureRunningEstimateTime : undefined;

// AiG Header-Check
const SelectShowPoisonPillTab = (state) => (state.headerTitle ? state.headerTitle.showPoisonPillTab : undefined);
const SelectShowLatestFilingsTab = (state) => (state.headerTitle ? state.headerTitle.showLatestFilingsTab : undefined);
const SelectShowShareholderProposalsTab = (state) =>
  state.headerTitle ? state.headerTitle.showShareholderProposalsTab : undefined;
const SelectShowComplianceTab = (state) => (state.headerTitle ? state.headerTitle.showComplianceTabReq : undefined);
const SelectShowBylaws_Charter_GovGuidelinesTab = (state) =>
  state.headerTitle ? state.headerTitle.showBylaws_Charter_GovGuidelinesTab : undefined;
const SelectCompanyProductSelection = (state) =>
  state.headerTitle ? state.headerTitle.companyProductSelection : undefined;
const SelectShowHistoricalGov = (state) =>
  state.headerTitle ? state.headerTitle.showHistoricalGov : true;

//Advisor
// const SelectLstModuleAccess = (state) => state.advisers.lstModuleAccess;
const SelectLstAlertModuleAccess = (state) => state.myAlert.lstAlertModuleAccess;
// Advisor
const SelectLstModuleAccess = (state) => state.advisers.lstModuleAccess;
// People
const selectPeople_Data = (state) => state.Peoplesearch.people_data;
const selectCompensationNoDate = (state) => state.Peoplesearch.compensationNoData;

// Activism
const selectAccessPerformance = (state) =>
  state.InvestorActivismSlice.accessPerformance;
const selectAccessDemand = (state) =>
  state.InvestorActivismSlice.accessDemand;
const selectAccessInvFilings = (state) =>
  state.InvestorActivismSlice.accessInvFilings;
const selectAccessFollowerAccess = (state) =>
  state.InvestorActivismSlice.accessFollowerAccess;

// company
const selectIsActivistShortModuleAccess = (state) =>
  state.headerTitle ? state.headerTitle.isActivistShortModuleAccess : undefined;
const selectCompanyProfilePID = (state) => state.companyVoting.issuerCompanyProfile;

//alert Notification
const selectPDFDownloadStartNotification = (state) => state.headerTitle.pdfDownloadStartNotification;

const selectNotificationData = (state) =>
  state.headerTitle ? state.headerTitle.notificationData : [];
const selectNotificationDataPopup = (state) =>
  state.headerTitle ? state.headerTitle.notificationDataPopup : [];
const selectTop20AlertData = (state) =>
  state.headerTitle ? state.headerTitle.top20AlertData : [];
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectDistinctProfile = (state) => state.trial.distinctProfile;

//Company Long/short access
const selectLongAccess = (state) => state.company.longAccess;
const selectShortAccess = (state) => state.company.shortAccess;
const selectAccessComFilings = (state) => state.company.accessComFilings;

//Investor Long/short access
const selectInvLongAccess = (state) => state.investorOwnership.invLongAccess;
const selectInvShortAccess = (state) => state.investorOwnership.invShortAccess;

// pepole header data
const selectpeople_data = (state) => state.Peoplesearch.people_data;

//compensation faq
const selectIsCompensationFaq = (state) => state.faqhelp.isCompensationFaq;

const mapStateToProps = (state) => {
  if (state.headerTitle === null) {
    const headerTitle = Cookies.get('headerTitleReducer');
    state.headerTitle =
      headerTitle !== null && headerTitle !== ''
        ? JSON.parse(headerTitle)
        : null;
  }
  return {
    generatePDF: selectgeneratePDF(state),
    pdfDownloadLoader: selectpdfDownloadLoader(state),
    pdfDownloadNotification: selectPdfDownloadNotification(state),
    pdfListItems: selectPdfListItems(state),
    pdfDownloadCancelBtn: selectpdfDownloadCancelBtn(state),
    pdfMenuShow: selectPDFMenuShow(state),
    pdfDownloadStartNotification: selectPDFDownloadStartNotification(state),
    token: SelectDecodeToken(state),

    title: selectIssuerCompanyProfile(state),
    InvestorTitle: selectInvestorCompanyProfile(state),
    company_logo: selectCompanyLogo(state),
    pid: selectPIDCompanyProfile(state),
    meetingid: selectMeetingIdCompanyProfile(state),
    selectedBreadcrumbsPath: selectSelectedBreadcrumbsPath(state),
    selectedCompanyPath: selectSelectedCompanyPath(state),
    selectedHoverSubmenu: selectSelectedHoverSubmenu(state),
    selectNavOutsideClick: selectSelectNavOutsideClick(state),

    isDisableNewsActivismLatest: SelectIsAccessNewsActivismLatest(state),
    isDisableNewsActivistShort: SelectIsDisableNewsActivistShort(state),
    isDisableNewsActivistVulnerability:
      SelectIsDisableNewsActivistVulnerability(state),
    isDisableNewsGovernance: SelectIsDisableNewsGovernance(state),
    isDisableNewsVoting: SelectIsDisableNewsVoting(state),
    isDisableNewsCompensation: SelectIsDisableNewsCompensation(state),

    // dashboard portals
    dashboardID: selectDashboarID(state),
    dashboardIdOptions: selectDashboardIdOptions(state),

    procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),

    showPoisonPillTab: SelectShowPoisonPillTab(state),
    showComplianceTab: SelectShowComplianceTab(state),
    showShareholderProposalsTab: SelectShowShareholderProposalsTab(state),
    showLatestFilingsTab: SelectShowLatestFilingsTab(state),
    showBylaws_Charter_GovGuidelinesTab:
      SelectShowBylaws_Charter_GovGuidelinesTab(state),
    companyProductSelection: SelectCompanyProductSelection(state),
    showHistoricalGov: SelectShowHistoricalGov(state),

    investorNavObj: selectInvestorNavObj(state),

    lstModuleAccess: SelectLstModuleAccess(state),
    lstAlertModuleAccess: SelectLstAlertModuleAccess(state),
    people_data: selectPeople_Data(state),
    compensationNoData: selectCompensationNoDate(state),

    accessPerformance: selectAccessPerformance(state),

    isActivistShortModuleAccess: selectIsActivistShortModuleAccess(state),
    issuerCompanyProfile: selectCompanyProfilePID(state),
    notificationData: selectNotificationData(state),
    notificationDataPopup: selectNotificationDataPopup(state),
    //Alert
    top20AlertData: selectTop20AlertData(state),
    trialUserDisableDownload: selectTrialUserDisableDownload(state),
    distinctProfile: selectDistinctProfile(state),

    //Company Long/short access
    longAccess: selectLongAccess(state),
    shortAccess: selectShortAccess(state),

    //Investor Long/short access
    invLongAccess: selectInvLongAccess(state),
    invShortAccess: selectInvShortAccess(state),

    accessDemand: selectAccessDemand(state),
    accessInvFilings: selectAccessInvFilings(state),
    accessFollowerAccess: selectAccessFollowerAccess(state),
    accessComFilings: selectAccessComFilings(state),
    // compensation faq
    isCompensationFaq: selectIsCompensationFaq(state),
  };
};

const mapDispatchToProps = {
  handleResetLoading,
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleHoverSubmenu,
  handleNavOutsideClick,
  getIssuerProfileReq,
  getCompanyProfileReq,
  getInvestorProfileReq,
  getInvestorNavReq,
  handleNewsAccessReq,
  getGovShowPoisonPillTabReq,
  getGovShowLatestFilingsTabReq,
  getGovShowShareholderProposalsTabReq,
  getGovShowComplianceTabReq,
  get_Bylaws_Charter_GovGuidelinesReq,
  getTokenDecode,
  handlePDFDownloadNotification,
  handlePDFDownloadLoader,
  handleGeneratePDF,
  handlePDFListItems,
  handlePDFDownloadCancelClick,
  handlePDFMenuShow,
  handleGlobleResetInvestorCmparator,
  handleActivistCampaignsToolReset,
  handleResetLoader,
  handleGlobleResetProxyContestVoting,
  handleGlobleResetActivistShort,
  getProfiles_insightiaReq,
  handleGlobleResetMyAlert,
  getPeopleProfileReq,
  getAdvisorProfileReq,
  handleResetCompanyTitle,
  getAdvisorModuleAccessData,
  handleChangeDashboardId,
  getDashboardIds,
  getActivistIdFromInvestorIdReq,
  getListofReprtingDateReq,
  getActivistShortModuleAccessReq,
  updateAlertStatusReq,
  getElementDetailReq,
  handleOnClickNotification,
  getInboxAlertByUserReq,
  getTop20AlertResultReq,
  // Trial
  addTriallogReq,
  handleResetTrialStatus,

  getOwnershipLongShortInvestorDataCheckReq,
  getInvestorOwnershipLongShortDataCheckReq,
  getCampaignSummarybyActivistLstReq,
  getlistActivistFilingsByActivist_v2Req,
  GetCompanyActivisamTabDataCheckReq,
  getFollowerReturnsSearchLstReq,
  getFollowerReturnsActivistStatschartDataReq,
  getFollowerReturnsActivistStatsDataReq,
  GetInvestorActivisamTabDataCheckReq,
  GetHistoricalGovernanceTabReq,
  handleResetpdfDownloadStartNotification,
  getdata_FAQS_definitionReq
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitleContainer));
