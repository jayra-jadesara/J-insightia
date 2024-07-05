import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  GetInvestorProfile,
  GetInvestorNavReq,
} from '../../utils/investor-util';
import {
  getIssuerProfile,
  GetCompanyProfile,
  getIssuerLatestMeetingId,
  getActivistShortModuleAccess,
} from '../../utils/company-util';
import { GetPropleProfile } from '../../utils/peopleSearch-util';
import {
  TokenDecode,
  ValidTokenReq,
  GetProcedureRunningEstimateTime,
  GetGovShowPoisonPillTab,
  GetGovShowLatestFilingsTab,
  GetGovShowShareholderProposalsTab,
  GetGovShowComplianceTab,
  Get_Bylaws_Charter_GovGuidelines,
  GetProfiles_insightia,
  GetHistoricalGovernanceTab,
} from '../../utils/general-util';
import { GetAdvisorProfile } from '../../utils/advisor-utils';
import productConstant from '../../constants/ProductConstants';
import { isUserAuthenticatedBoolean } from '../../utils/login-util';
import { getTop20AlertResult } from '../../utils/myAlerts-util';
import { FIVE_SECOND_TIMEOUT } from '../../constants/NumberConstants';

// General
export const getIssuerProfileReq = createAsyncThunk(
  'getIssuerProfile',
  async (obj) => {
    const response = await getIssuerProfile(obj.meetingid);
    return response;
  }
);

export const getCompanyProfileReq = createAsyncThunk(
  'company_profile',
  async (pid) => {
    const responseCompany = await GetCompanyProfile(pid);
    const responseMeetingData = await getIssuerLatestMeetingId(pid);
    const responseObj = { responseCompany, responseMeetingData };
    return responseObj;
  }
);
// investor
export const getInvestorProfileReq = createAsyncThunk(
  'investor_profile',
  async (investor) => {
    const responseInvestor = await GetInvestorProfile(investor);
    const responseObj = { responseInvestor };
    return responseObj;
  }
);

export const handleNewsAccessReq = createAsyncThunk(
  'newsAccessReq',
  async (pathname) => {
    const response = await TokenDecode();
    return { pathname, response };
  }
);

export const getProcedureRunningEstimateTimeReq = createAsyncThunk(
  'getProcedureRunningEstimateTimeReq',
  async (procName) => {
    const response = await GetProcedureRunningEstimateTime(procName);
    return response;
  }
);

export const getInvestorNavReq = createAsyncThunk(
  'getInvestorNavReq',
  async (investor) => {
    const response = await GetInvestorNavReq(investor);
    return response;
  }
);

// AiG Header-checks
export const getGovShowPoisonPillTabReq = createAsyncThunk(
  'GetGovShowPoisonPillTab',
  async (productId) => {
    const response = await GetGovShowPoisonPillTab(productId);
    return response;
  }
);
export const getGovShowLatestFilingsTabReq = createAsyncThunk(
  'GetGovShowLatestFilingsTab',
  async (productId) => {
    const response = await GetGovShowLatestFilingsTab(productId);
    return response;
  }
);
export const getGovShowShareholderProposalsTabReq = createAsyncThunk(
  'GetGovShowShareholderProposalsTab',
  async (productId) => {
    const response = await GetGovShowShareholderProposalsTab(productId);
    return response;
  }
);
export const GetHistoricalGovernanceTabReq = createAsyncThunk(
  'GetHistoricalGovernanceTab',
  async (productId) => {
    const response = await GetHistoricalGovernanceTab(productId);
    return response;
  }
);
export const getGovShowComplianceTabReq = createAsyncThunk(
  'GetGovShowComplianceTab',
  async (productId) => {
    const response = await GetGovShowComplianceTab(productId);
    return response;
  }
);
export const get_Bylaws_Charter_GovGuidelinesReq = createAsyncThunk(
  'Get_Bylaws_Charter_GovGuidelines',
  async (productId) => {
    const response = await Get_Bylaws_Charter_GovGuidelines(productId);
    return response;
  }
);

// company header profiles
export const getProfiles_insightiaReq = createAsyncThunk(
  'GetComplianceVotinDissentProfile',
  async (args) => {
    const response = await GetProfiles_insightia(args.userid, args.pid);
    return response;
  }
);

// People Data
export const getPeopleProfileReq = createAsyncThunk(
  'getPeopleProfileReq',
  async (director_id) => {
    const response = await GetPropleProfile(director_id);
    return response;
  }
);
export const getAdvisorProfileReq = createAsyncThunk(
  'getAdvisorProfileReq',
  async (companyId) => {
    const response = await GetAdvisorProfile(companyId);
    return response;
  }
);

export const getActivistShortModuleAccessReq = createAsyncThunk(
  'getActivistShortModuleAccessReq',
  async (arg) => {
    const response = await getActivistShortModuleAccess(arg);
    return response;
  }
);
export const getTop20AlertResultReq = createAsyncThunk(
  'getTop20AlertResultReq',
  async () => {
    const response = await getTop20AlertResult();
    return response;
  }
);

const TitleSlice = createSlice({
  name: 'headerTitle',
  initialState: {
    title: '',
    company_logo: {},
    people_name: {},
    selectedBreadcrumbsPath: '',
    selectedCompanyPath: '',
    selectedHoverSubmenu: '',
    selectNavOutsideClick: false,
    pdfDownloadNotification: false,
    generatePDF: { pdfstatus: false, pdffileURL: '' },

    isDisableNewsActivismLatest: true,
    isDisableNewsActivismCovid19: true,

    isDisableNewsActivistShort: true,
    isDisableNewsActivistVulnerability: true,
    isDisableNewsGovernance: true,
    isDisableNewsVoting: true,
    isDisableNewsCompensation: true,
    procedureRunningEstimateTime: undefined,
    showComplianceTab: true,
    showLatestFilingsTab: true,
    showPoisonPillTab: true,
    showShareholderProposalsTab: true,
    showBylaws_Charter_GovGuidelinesTab: true,

    pdfListItems: [],
    pdfDownloadStartNotification: false,
    pdfDownloadCancelBtn: false,
    pdfDownloadLoader: false,
    pdfMenuShow: false,
    companyProductSelection: {},
    investorNavObj: [],
    searchInvestorRecordsetselection: [],
    isActivistShortModuleAccess: false,

    //alert notoication
    notificationData: [],
    notificationDataPopup: [],
    isAnyNotification: false,
    top20AlertData: [],
    hasCompanyTitle: true,
    showHistoricalGov: true,
  },
  reducers: {
    handleResetCompanyTitle: {
      reducer(state) {
        if (state !== null) {
          state.title = '';
          state.company_logo = '';
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetBreadcrumbs: {
      reducer(state, action) {
        if (state !== null) {
          state.selectedBreadcrumbsPath = action.payload.selectedPath;
        }
      },
      prepare(selectedPath) {
        return {
          payload: { selectedPath },
        };
      },
    },
    handleResetCompanyPath: {
      reducer(state, action) {
        if (state !== null) {
          state.selectedCompanyPath = action.payload.selectedPath;
        }
      },
      prepare(selectedPath) {
        return {
          payload: { selectedPath },
        };
      },
    },
    handleHoverSubmenu: {
      reducer(state, action) {
        if (state !== null) {
          state.selectedHoverSubmenu = action.payload.addClass;
        }
      },
      prepare(addClass) {
        return {
          payload: { addClass },
        };
      },
    },
    handleNavOutsideClick: {
      reducer(state, action) {
        state.selectNavOutsideClick = action.payload.open;
      },
      prepare(open) {
        return {
          payload: { open },
        };
      },
    },
    handleValidTokenReq: {
      reducer() {},
      prepare(userdevice) {
        ValidTokenReq(userdevice);
        return {
          payload: {},
        };
      },
    },
    handleResetLoader: {
      reducer(state) {
        if (state !== null) {
          state.procedureRunningEstimateTime = undefined;
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },

    // #region PDF
    handlePDFDownloadCancelClick: {
      reducer(state, action) {
        state.pdfDownloadCancelBtn = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handlePDFDownloadNotification: {
      reducer(state, action) {
        if (state !== null) {
          state.pdfDownloadNotification = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleGeneratePDF: {
      reducer(state, action) {
        if (state !== null) {
          state.generatePDF = {
            pdfstatus: action.payload.e.pdfstatus,
            pdffileURL: action.payload.e.pdffileURL,
            error: action.payload.e.error,
          };
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handlePDFMenuShow: {
      reducer(state, action) {
        if (state !== null) {
          state.pdfMenuShow = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handlePDFDownloadLoader: {
      reducer(state, action) {
        state.pdfDownloadStartNotification = action.payload.e;
        state.pdfDownloadLoader = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handlePDFListItems: {
      reducer(state, action) {
        if (state !== null) {
          state.pdfListItems = action.payload.array;
        }
      },
      prepare(array) {
        return {
          payload: { array },
        };
      },
    },
    handleOnClickNotification: {
      reducer(state, action) {
        const NotificationData = current(state).notificationData;
        state.notificationData = NotificationData.filter(
          (c) => c.alert_inbox_id !== action.payload.e.alert_inbox_id
        );
        // let UpdatedNotificationData = current(state).notificationData;
        // state.isAnyNotification = UpdatedNotificationData.length > 0 ? true :  false
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResethasCompanyTitle: {
      reducer(state) {
        if (state !== null) {
          state.hasCompanyTitle = true;
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetpdfDownloadStartNotification: {
      reducer(state) {
        if (state !== null) {
          state.pdfDownloadStartNotification = false;
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    //#endregion

    // checkIsValidNewsPageReq: {
    //   reducer(state, action) {
    //     return action.payload.isvalid;
    //   },
    //   prepare(path) {
    //     if (current(state).isDisableNewsActivismLatest === false ) {

    //     }
    //     return {
    //       payload: { path, isvalid: false },
    //     };
    //   },
    // },
  },
  extraReducers: {
    [getIssuerProfileReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.title =
        action.payload !== undefined ? action.payload.company_name : '';
      state.pid = action.payload !== undefined ? action.payload.pid : '';
      state.company_logo =
        action.payload.data !== undefined
          ? action.payload.data.company_logo
          : '';
      state.meetingid =
        action.payload !== undefined ? action.payload.meeting_id : '';
    },
    [getCompanyProfileReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      if (!isUserAuthenticatedBoolean()) return null;
      if (action.payload.responseCompany.company_name.length > 0) {
        state.title =
          action.payload.responseCompany.company_name !== undefined
            ? action.payload.responseCompany.company_name
            : '';
        state.company_logo =
          action.payload.responseCompany !== undefined
            ? action.payload.responseCompany.company_logo
            : '';
        state.pid =
          action.payload.responseCompany !== undefined
            ? action.payload.responseCompany.data.PID
            : '';
      } else {
        state.hasCompanyTitle = undefined;
      }
      if (action.payload.responseMeetingData) {
        state.meetingid =
          action.payload.responseMeetingData !== undefined
            ? action.payload.responseMeetingData.meeting_id
            : '';
        state.pid =
          action.payload.responseMeetingData !== undefined
            ? action.payload.responseMeetingData.PID
            : '';
      }
    },
    [getPeopleProfileReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      // state. = action.payload !== undefined ? action.payload.data : '';
      state.title =
        action.payload !== undefined ? action.payload.people_name : '';
    },
    [getInvestorProfileReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.title =
        action.payload.responseInvestor &&
        action.payload.responseInvestor.data.length > 0
          ? action.payload.responseInvestor.data[0].investor_name
          : '';
    },

    [handleNewsAccessReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      if (
        action.payload !== false &&
        action.payload.response !== null &&
        action.payload.response.MemberShip !== undefined
      ) {
        const membership = action.payload.response.MemberShip;
        // let path = action.payload.pathname;
        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVISM &&
              (p.status === 2 || p.status === 4)
          ) >= 0
        ) {
          state.isDisableNewsActivismLatest = false;
        }

        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.GOVERNANCE &&
              (p.status === 2 || p.status === 4)
          ) >= 0
        ) {
          state.isDisableNewsGovernance = false;
        }

        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVIST_VULNERABILITY &&
              (p.status === 2 || p.status === 4)
          ) >= 0
        ) {
          state.isDisableNewsActivistVulnerability = false;
        }

        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVIST_SHORTS &&
              (p.status === 2 || p.status === 4)
          ) >= 0
        ) {
          state.isDisableNewsActivistShort = false;
        }

        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.VOTING &&
              (p.status === 2 || p.status === 4)
          ) >= 0
        ) {
          state.isDisableNewsVoting = false;
        }

        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.COMPENSATION &&
              (p.status === 2 || p.status === 4)
          ) >= 0
        ) {
          state.isDisableNewsCompensation = false;
        }
      }
    },
    [getProcedureRunningEstimateTimeReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      if (action.payload !== false && action.payload.length > 0) {
        state.procedureRunningEstimateTime = action.payload
          .map((c) => c.avg_elapsed_time)
          .reduce((a, e) => a + e);
      }
    },
    // AiG Header-checks
    [getGovShowPoisonPillTabReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.showPoisonPillTab = action.payload;
    },
    [getGovShowLatestFilingsTabReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.showLatestFilingsTab = action.payload;
    },
    [getGovShowShareholderProposalsTabReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.showShareholderProposalsTab = action.payload;
    },
    [getGovShowComplianceTabReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.showComplianceTabReq = action.payload;
    },
    [get_Bylaws_Charter_GovGuidelinesReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.showBylaws_Charter_GovGuidelinesTab = action.payload;
    },
    [getProfiles_insightiaReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.companyProductSelection = action.payload;
    },
    [getInvestorNavReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.investorNavObj = action.payload !== undefined ? action.payload : {};
    },
    [getAdvisorProfileReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      if (action.payload[0] !== undefined) {
        state.title =
          action.payload[0].name !== undefined ? action.payload[0].name : '';
      }
    },
    [getActivistShortModuleAccessReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      if (!isUserAuthenticatedBoolean()) return null;
      if (action.payload !== undefined) {
        const moduleData = action.payload;
        if (moduleData[0] === undefined) return null;
        state.isActivistShortModuleAccess = !(moduleData[0].counted_record > 0);
      }
    },
    [getTop20AlertResultReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.top20AlertData =
          action.payload !== undefined ? action.payload.data : [];
        const Top20LocalData = JSON.parse(
          localStorage.getItem('alertNotificationData')
        );
        const localStorageData = JSON.parse(
          localStorage.getItem('notificationData')
        );
        if (Top20LocalData === null) {
          localStorage.setItem(
            'alertNotificationData',
            JSON.stringify({ data: action.payload.data, firstLoad: true })
          );
          state.isAnyNotification = true;
        } else {
          if (Top20LocalData && Top20LocalData.firstLoad) {
            state.isAnyNotification = true;
          } else {
            const actionData = action.payload.data;
            let getUpdatedData = [];
            getUpdatedData = actionData.filter(
              (c) =>
                !Top20LocalData.data.some((x) => x.sent_date === c.sent_date)
            );
            getUpdatedData = actionData.filter(
              (c) =>
                !Top20LocalData.data.some((x) => x.sent_date === c.sent_date)
            );
            state.isAnyNotification = getUpdatedData.length > 0;
          }
        }
        if (localStorageData === null) {
          state.notificationDataPopup =
            action.payload !== undefined ? action.payload.popupData : [];
          localStorage.setItem(
            'notificationData',
            JSON.stringify({ data: action.payload.popupData, firstLoad: true })
          );
        } else {
          const PopupData = action.payload.popupData;
          const updatedNotifyData = PopupData.filter(
            (c) =>
              !localStorageData.data.some(
                (x) => x.alert_inbox_id === c.alert_inbox_id
              )
          );
          state.notificationDataPopup =
            updatedNotifyData.length > 0 ? updatedNotifyData : [];
          localStorage.setItem(
            'notificationData',
            JSON.stringify({ data: action.payload.popupData, firstLoad: true })
          );
        }
      }
    },
    [GetHistoricalGovernanceTabReq.fulfilled]: (state, action) => {
      if (state === null) return null;
      state.showHistoricalGov = action.payload;
    },
  },
});

export const {
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleHoverSubmenu,
  handleNavOutsideClick,
  handleValidTokenReq,
  //
  handlePDFDownloadCancelClick,
  handlePDFDownloadNotification,
  handleGeneratePDF,
  handlePDFListItems,
  handlePDFMenuShow,
  handlePDFDownloadLoader,
  handleResetLoader,
  handleOnClickNotification,
  handleResethasCompanyTitle,
  handleResetpdfDownloadStartNotification,
} = TitleSlice.actions;

export default TitleSlice.reducer;
