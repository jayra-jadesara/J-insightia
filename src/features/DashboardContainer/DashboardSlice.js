import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  ACTIVISM,
  SHORTS,
  VOTING,
  GOVERNANCE,
  COMPENSATION,
  VULNERABILITY,
} from '../../constants/DashboardSidebarTabConstant';
import productConstant from '../../constants/ProductConstants';
import {
  NUMBER_NEGATIVE_ONE,
  NUMBER_POSITIVE_ONE,
  ARRAY_HAS_NO_LENGTH,
  ARRAY_START_VALUE,
  NUMBER_TWO,
  NUMBER_FOUR,
  NUMBER_MARKET_CAP_MAX
} from '../../constants/NumberConstants';

// import { json } from "d3";
import {
  GetAllIssuers,
  PIListIndices,
  GetAllExchange,
  GetAIPeerGroups,
  GetListRegionsAndCountries,
  PIListSectorsAndIndustries,
  FreeSearchCompanyAndIndustry,
  GetCompanySearchOptions,
  UpdateCompanySearchOptions,
  AddTblCopmanySearchCopmanies,
  AddTblInvestorSearchInvestors,
  GetAllCompanySearchSelection,
  AddTblcompanySearchIndex,
  AddTblcompanySearchExchange,
  AddTblCompanySearchPeerGroup,
  AddTblCompanySearchIndustry,
  AddTblCompanySearchMarketCap,
  AddTblInvestorSearchAUM,
  AddtblCompanySearchCountry,
  AddtblInvestors_SearchType,
  GetUserRightsForWidgets,
  GetAllDashboardWidgets,
  UpdateTblDashboard,
  AddtblDashboardWidgetLink,
  GetUserDashboard,
  DeleteDashboardSelection,
  DeletetblCompanySearchCountry,
  Deletetblinvestor_search_country,
  DeletetblInvestors_SearchType,
  DeleteTblCompanySearchIndustry,
  GetCurrentShareholder,
  UpdateInvestorSearchOptions,
  GetInvestorsSearchOptions,
  Addtblinvestor_search_country,
  ListInvestorTypeAndSubtype,
  AddtblInvestors_byshareholdercompany,
  getInvestorSearchSelection,
  FreeSearchInvestor,
  GetAllInvestorsFromShareholderOfCompany,
  GetAllDashboardWidgetsList,
  GetStoredProcedure,
  ResetDashboardWidgetCompanySearch,
  ResetDashboardWidgetInvestorSearch,
  GetPortalsTop3News,
  GetDashboardIdData,
  getHotActivistData,
  getDirectorAppointmentChartData,
  getAigRussell3000Score,
  getShareHolderProposalESG,
  getVotingPolicyChangesESG,
  getUpCommingShareHolderESG,
  getAumCategorylist,
} from '../../utils/dashboard-util';
import { oneChildtreeView } from '../../utils/general-util';
import { ResolutionsByInvestorTrackerFilter } from '../../utils/toolsResolutionTracker-util';

export const allIssuersReq = createAsyncThunk('getAllIssuers', async () => {
  const response = await GetAllIssuers(null);
  return response;
});

export const piListOfIndicesReq = createAsyncThunk(
  'piListIndices',
  async () => {
    const response = await PIListIndices();
    return response;
  }
);

export const getListOfExchange = createAsyncThunk('getExchange', async () => {
  const response = await GetAllExchange();
  return response;
});

export const getAIPeersGroups = createAsyncThunk('allPeersGroups', async () => {
  const response = await GetAIPeerGroups();
  return response;
});

export const getTreeRegionsAndCountries = createAsyncThunk(
  'getAllRegionsAndCountries',
  async () => {
    const response = await GetListRegionsAndCountries();
    return response;
  }
);

export const listInvestorTypeAndSubtype = createAsyncThunk(
  'ListInvestorTypeAndSubtype',
  async () => {
    const response = await ListInvestorTypeAndSubtype();
    return response;
  }
);

export const getPIListSectorsAndIndustriesReq = createAsyncThunk(
  'PIListSectorsAndIndustries',
  async () => {
    const reponse = await PIListSectorsAndIndustries();
    return reponse;
  }
);

export const searchCompanyAndIndustriesReq = createAsyncThunk(
  'searchCompanyAndIndustries',
  async (arg) => {
    const response = await FreeSearchCompanyAndIndustry(arg.rowdata);
    return response;
  }
);
export const searchInvestorsReq = createAsyncThunk(
  'searchInvestor',
  async (arg) => {
    const response = await FreeSearchInvestor(arg.rowdata);
    return response;
  }
);

export const getCompanySearchOptions = createAsyncThunk(
  'companySearchOptions',
  async () => {
    const response = await GetCompanySearchOptions();
    return response;
  }
);

export const getStoredProcedureReq = createAsyncThunk(
  'getStoredProcedure',
  async (arg) => {
    const response = await GetStoredProcedure({
      StoredProcedure: arg.StoredProcedure,
      dashboard_widget_link_id: arg.dashboard_widget_link_id,
    });
    return response;
  }
);

// export const getTblDashboardWidgetsReq = createAsyncThunk('getTblDashboardWidgets', async () => {
//   const response = await GetTblDashboardWidgets();
//   return response;
// });

export const handleCompanySearchUpdateReq = createAsyncThunk(
  'companysearchupdate',
  async (res) => {
    let companySingleSelection = null;
    let companySearchId = null;
    let labelSelection = '';
    let txtSaveCurrentList = res.txtSaveCurrentList;
    if (res.txtSaveCurrentList.includes('(')) {
      txtSaveCurrentList = res.txtSaveCurrentList.substring(
        0,
        res.txtSaveCurrentList.indexOf('(')
      );
    }
    let widgetId = 0;
    const { dashboard_widget_link_id } = res;
    widgetId = dashboard_widget_link_id;
    if (res.action !== 'removefilter') {
      if (res.companySingleSelection !== undefined) {
        companySingleSelection = res.companySingleSelection.value;
        labelSelection = `${txtSaveCurrentList} (Indiv)`;
      } else {
        labelSelection = `${txtSaveCurrentList} (Group)`;
      }
    }

    if (res.cmpSearchId !== undefined && res.cmpSearchId !== null) {
      companySearchId = res.cmpSearchId === null ? null : res.cmpSearchId.value;
    }

    const response = await UpdateCompanySearchOptions(
      res.txtSaveCurrentList,
      companySearchId,
      res.action,
      res.marketCapMinRange,
      res.marketCapMaxRange,
      res.isSaved,
      companySingleSelection,
      dashboard_widget_link_id
    );
    let resResult = '';
    if (response === '') {
      resResult = await {
        value: companySearchId,
        label: labelSelection,
        isSaved: res.isSaved,
        widget_id: widgetId,
      };
    } else {
      resResult = await {
        value: response[ARRAY_START_VALUE].company_search_id,
        label: labelSelection,
        isSaved: res.isSaved,
        widget_id: widgetId,
      };
      companySearchId = response[ARRAY_START_VALUE].company_search_id;
    }

    // added company selection
    // await AddTblCopmanySearchCopmanies(response[ARRAY_START_VALUE].company_search_id, res.companySingleSelection.value + ",");

    // added multiple companies selection
    if (
      res.companySelection &&
      res.companySelection.length > ARRAY_HAS_NO_LENGTH
    ) {
      const compIds = `${res.companySelection
        .map(({ value }) => value)
        .join(',')},`;
      await AddTblCopmanySearchCopmanies(companySearchId, compIds);
    }

    // added multiple index
    if (res.indexSelection && res.indexSelection.length > ARRAY_HAS_NO_LENGTH) {
      const indexIds = `${res.indexSelection
        .map(({ value }) => value)
        .join(',')},`;
      await AddTblcompanySearchIndex(companySearchId, indexIds);
    }

  // added multiple companies selection  
  if (res.companySelection && res.companySelection !== undefined && res.companySelection.length > ARRAY_HAS_NO_LENGTH) {
    const compIds = `${res.companySelection.map(({ value }) => value).join(',')},`;
    await AddTblCopmanySearchCopmanies(companySearchId, compIds);
  }

  // added multiple index
  if (res.indexSelection && res.indexSelection !== undefined && res.indexSelection.length > ARRAY_HAS_NO_LENGTH) {
    const indexIds = `${res.indexSelection.map(({ value }) => value).join(',')},`;
    await AddTblcompanySearchIndex(companySearchId, indexIds);
  }

  // added multiple exchange selection
  if (res.exchangeSelection && res.exchangeSelection !== undefined && res.exchangeSelection.length > ARRAY_HAS_NO_LENGTH) {
    const exchangeIds = `${res.exchangeSelection.map(({ value }) => value).join(',')},`;
    await AddTblcompanySearchExchange(companySearchId, exchangeIds);
  }

  // ai peer group
  if (res.aiPeerGroupSelection && res.aiPeerGroupSelection !== undefined && res.aiPeerGroupSelection.length > ARRAY_HAS_NO_LENGTH) {
    const pGrp = `${res.aiPeerGroupSelection.map(({ value }) => value).join(',')},`;
    await AddTblCompanySearchPeerGroup(companySearchId, pGrp);
  }

// market cap
if (
  res.marketCapSelection !== undefined &&
  typeof res.marketCapSelection[0] === 'object'
) {
  if (
    res.marketCapSelection !== undefined &&
    Object.keys(res.marketCapSelection).length > 0
  ) {
    const marketCpSelection = res.marketCapSelection[0].value;
    await AddTblCompanySearchMarketCap(companySearchId, marketCpSelection);
  }
} else {
  if (
    res.marketCapSelection !== undefined &&
    Object.keys(res.marketCapSelection).length > 0
  ) {
    const marketCpSelection = res.marketCapSelection.value;
    await AddTblCompanySearchMarketCap(companySearchId, marketCpSelection);
  }
}

    // industry
    if (
      res.industrySelection &&
      res.industrySelection.length > ARRAY_HAS_NO_LENGTH
    ) {
      await DeleteTblCompanySearchIndustry(companySearchId);
      res.industrySelection.forEach((e) => {
        if (e._depth === ARRAY_HAS_NO_LENGTH) {
          AddTblCompanySearchIndustry(companySearchId, e.value, null);
        }
        if (e._depth === NUMBER_POSITIVE_ONE) {
          const parentId = Number(
            e._parent.charAt(e._parent.length - NUMBER_POSITIVE_ONE)
          );
          const lstCountry = res.piListOfSectorsAndIndustries;
          AddTblCompanySearchIndustry(
            companySearchId,
            lstCountry[parentId].value,
            e.value
          );
        }
      });
      // await AddTblCompanySearchIndustry(companySearchId, sectorIds.join(","), industryIds.join(","), JSON.stringify(res.industrySelection));
      // await AddTblCompanySearchIndustry(companySearchId, sectorIds.join(",") + ",", industryIds.join(",") + ",");
    }

    // location
    if (
      res.companyLocationSelection &&
      res.companyLocationSelection.length > ARRAY_HAS_NO_LENGTH
    ) {
      await DeletetblCompanySearchCountry(companySearchId);
      res.companyLocationSelection.forEach((e) => {
        if (e._depth === ARRAY_HAS_NO_LENGTH) {
          AddtblCompanySearchCountry(companySearchId, e.value, null);
        }
        if (e._depth === NUMBER_POSITIVE_ONE) {
          const parentId = Number(
            e._parent.charAt(e._parent.length - NUMBER_POSITIVE_ONE)
          );
          const lstCountry = res.listRegeionAndCountries;
          AddtblCompanySearchCountry(
            companySearchId,
            lstCountry[parentId].value,
            e.value
          );
        }
      });
    }
    return resResult;
  }
);

export const handleCompanySearchDeleteReq = createAsyncThunk(
  'companysearchDelete',
  async (res) => {
    const response = await UpdateCompanySearchOptions(
      res.txtSaveCurrentList,
      res.companySearchOptionSelection.value,
      res.action
    );
    return response;
  }
);

export const getAllCompanySearchSelection = createAsyncThunk(
  'allCompanySearchSelection',
  async (res) => {
    const response = await GetAllCompanySearchSelection(res);
    return response;
  }
);

export const getInvestorSearchSelectionReq = createAsyncThunk(
  'getInvestorSearchSelection',
  async (res) => {
    const response = await getInvestorSearchSelection(res);
    return response;
  }
);

export const handleRunReq = createAsyncThunk('handleRunReq', async () => {
  // run
});

export const resolutionsByInvestorTrackerFilterReq = createAsyncThunk(
  'resolutionsByInvestorTrackerFilterReq',
  async (req) => {
    const response = await ResolutionsByInvestorTrackerFilter(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.sponsor,
      req.companySearchId
    );
    return response;
  }
);

export const GetHotActivistDataReq = createAsyncThunk(
  'GetHotActivistDataReq',
  async () => {
    const response = await getHotActivistData();
    return response;
  }
);
export const userRightsForWidgetsReq = createAsyncThunk(
  'userRightsForWidgets',
  async () => {
    const response = await GetUserRightsForWidgets(null);
    return response;
  }
);

export const getAllDashboardWidgetsReq = createAsyncThunk(
  'GetAllDashboardWidgets',
  async () => {
    const response = await GetAllDashboardWidgets();
    return response;
  }
);

export const getAllDashboardWidgetsListReq = createAsyncThunk(
  'GetAllDashboardWidgetsList',
  async () => {
    const response = await GetAllDashboardWidgetsList();
    return response;
  }
);

export const dashboardSubmitReq = createAsyncThunk(
  'dashboardSubmit',
  async (req) => {
    const response = await UpdateTblDashboard(
      req.dashboardName,
      req.dashboardId
    );
    return response;
  }
);

export const addtblDashboardWidgetLinkReq = createAsyncThunk(
  'addtblDashboardWidgetLink',
  async (req) => {
    const response = await AddtblDashboardWidgetLink(req);
    // return (response = { position: req.position });
    return response;
  }
);

export const addtblDashboardNewWidgetLinkReq = createAsyncThunk(
  'addtblDashboardNewWidgetLinkReq',
  async (req) => {
    const response = await AddtblDashboardWidgetLink(req);
    return {
      position: req.position,
      dashboard_widget_link_id:
        response.recordset[ARRAY_START_VALUE].dashboard_widget_link_id,
    };
  }
);

export const getUserDashboardReq = createAsyncThunk(
  'getUserDashboardReq',
  async () => {
    const response = await GetUserDashboard();
    return response;
  }
);

// Investor
export const getCurrentShareholderReq = createAsyncThunk(
  'getCurrentShareholderReq',
  async () => {
    const response = await GetCurrentShareholder();
    return response;
  }
);
export const handleInvestorSearchDeleteReq = createAsyncThunk(
  'investorsearchDelete',
  async (res) => {
    const response = await UpdateInvestorSearchOptions(
      res.txtSaveCurrentList,
      res.investorSearchOptionsSelection.value,
      res.action
    );
    return response;
  }
);
// dashboard portals
export const getPortalsTop3NewsReq = createAsyncThunk(
  'getPortalsTop3NewsReq',
  async () => {
    const response = await GetPortalsTop3News();
    return response;
  }
);

export const getDashboardIds = createAsyncThunk('getDashboardIds', async () => {
  const response = await GetDashboardIdData();
  return response;
});
//
export const handleInvestorSearchUpdateReq = createAsyncThunk(
  'investorsearchupdate',
  async (res) => {
    let actions = '';
    let labelSelection = '';
    let InvestorSearchId = null;
    let aum_min = '';
    let aum_max = '';
    let isSaved = false;
    const { dashboard_widget_link_id } = res;
    if (
      res.investorSelection.length <= ARRAY_HAS_NO_LENGTH &&
      (res.AumSelection === null || res.AumSelection === undefined) &&
      res.investorLocationSelection.length <= ARRAY_HAS_NO_LENGTH &&
      res.listInvestorTypeAndSubtypeSelection.length <= ARRAY_HAS_NO_LENGTH &&
      res.byShareholderOfCompany === undefined &&
      res.action === 'usefilter' &&
      res.aum_min === '' &&
      res.aum_max === '' &&
      !res.isSaved
    ) {
      actions = 'removefilter';
      labelSelection = '';
      InvestorSearchId = null;
      aum_min = '';
      aum_max = '';
      isSaved = false;
      await ResetDashboardWidgetInvestorSearch({
        dashboard_widget_link_id: dashboard_widget_link_id,
      });
    } else {
      actions = res.action;
      labelSelection = res.txtSaveCurrentList;
      InvestorSearchId =
        res.investorSearchId === undefined || res.investorSearchId === null
          ? null
          : res.investorSearchId.value;
      aum_min = res.aum_min;
      aum_max = res.aum_max;
      isSaved = res.isSaved;
    }
    // let labelSelection = '';
    // labelSelection = res.txtSaveCurrentList; // + " (Group)";

    // if (res.investorSearchId !== undefined) {
    //   InvestorSearch = res.investorSearchId === null ? null : res.investorSearchId.value;
    // }

    const response = await UpdateInvestorSearchOptions(
      labelSelection,
      InvestorSearchId,
      actions,
      aum_min,
      aum_max,
      isSaved,
      dashboard_widget_link_id
    );
    let resResult = '';
    if (response === '') {
      resResult = await {
        value: InvestorSearchId,
        label: labelSelection,
        isSaved: res.isSaved,
      };
    } else {
      resResult = await {
        value: response[ARRAY_START_VALUE].investor_search_id,
        label: labelSelection,
        isSaved: res.isSaved,
      };
      InvestorSearchId = response[ARRAY_START_VALUE].investor_search_id;
    }

  // added multiple investors selection
  if (res.investorSelection && res.investorSelection !== undefined && res.investorSelection.length > ARRAY_HAS_NO_LENGTH) {
    const invIds = `${res.investorSelection.map(({ value }) => value).join(',')},`;
    await AddTblInvestorSearchInvestors(InvestorSearchId, invIds);
  }

    // AUM ($bn):
    if (res.AumSelection !== undefined && res.AumSelection !== null) {
      await AddTblInvestorSearchAUM(InvestorSearchId, res.AumSelection.value);
    }

    // location
    if (
      res.investorLocationSelection &&
      res.investorLocationSelection.length > ARRAY_HAS_NO_LENGTH
    ) {
      await Deletetblinvestor_search_country(InvestorSearchId);
      res.investorLocationSelection.forEach(async (e) => {
        if (e._depth === ARRAY_HAS_NO_LENGTH) {
          await Addtblinvestor_search_country(InvestorSearchId, e.value, null);
        }
        if (e._depth === NUMBER_POSITIVE_ONE) {
          const parentId = Number(
            e._parent.charAt(e._parent.length - NUMBER_POSITIVE_ONE)
          );
          const lstCountry = res.listRegeionAndCountries;
          await Addtblinvestor_search_country(
            InvestorSearchId,
            lstCountry[parentId].value,
            e.value
          );
        }
      });
    }

    // investorType
    if (
      res.listInvestorTypeAndSubtypeSelection &&
      res.listInvestorTypeAndSubtypeSelection.length > ARRAY_HAS_NO_LENGTH
    ) {
      await DeletetblInvestors_SearchType(InvestorSearchId);
      res.listInvestorTypeAndSubtypeSelection.forEach(async (e) => {
        if (e._depth === ARRAY_HAS_NO_LENGTH) {
          await AddtblInvestors_SearchType(
            InvestorSearchId,
            e.value,
            null,
            null
          );
        }
        if (e._depth === NUMBER_POSITIVE_ONE) {
          const parentId = Number(
            e._parent.charAt(e._parent.length - NUMBER_POSITIVE_ONE)
          );
          const lst = res.listInvestorTypeAndSubtype;
          await AddtblInvestors_SearchType(
            InvestorSearchId,
            e.value,
            lst[parentId].value,
            null
          );
        }
      });
    }

    // byShareholderOfCompany
    if (res.byShareholderOfCompany !== undefined) {
      await AddtblInvestors_byshareholdercompany(
        InvestorSearchId,
        res.byShareholderOfCompany.value
      );
    }
    return resResult;
  }
);

export const getInvestorSearchOptions = createAsyncThunk(
  'investorSearchOptions',
  async () => {
    const response = await GetInvestorsSearchOptions();
    return response;
  }
);

export const getAllInvestorsFromShareholderOfCompany = createAsyncThunk(
  'getAllInvestorsFromShareholderOfCompany',
  async (res) => {
    const response = await GetAllInvestorsFromShareholderOfCompany(res);
    return response;
  }
);

export const resetDashboardWidgetCompanySearchReq = createAsyncThunk(
  'ResetDashboardWidgetCompanySearch',
  async (res) => {
    const response = await ResetDashboardWidgetCompanySearch(res);
    return response;
  }
);

export const resetDashboardWidgetInvestorSearchReq = createAsyncThunk(
  'ResetDashboardWidgetInvestorSearch',
  async (res) => {
    const response = await ResetDashboardWidgetInvestorSearch(res);
    return response;
  }
);

export const getDirectorAppointmentChartDataReq = createAsyncThunk(
  'getDirectorAppointmentChartDataReq',
  async (res) => {
    const response = await getDirectorAppointmentChartData(res);
    return response;
  }
);

export const getAigRussell3000ScoreReq = createAsyncThunk(
  'getAigRussell3000ScoreReq',
  async (res) => {
    const response = await getAigRussell3000Score(res);
    return response;
  }
);

export const getShareHolderProposalESGZReq = createAsyncThunk(
  'getShareHolderProposalESGZReq',
  async (req) => {
    const response = await getShareHolderProposalESG(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.sponsor,
      req.companySearchId
    );
    return response;
  }
);

export const getVotingPolicyChangesESGReq = createAsyncThunk(
  'getVotingPolicyChangesESGReq',
  async () => {
    const response = await getVotingPolicyChangesESG();
    return response;
  }
);

export const getUpCommingShareHolderESGReq = createAsyncThunk(
  'getUpCommingShareHolderESGReq',
  async () => {
    const response = await getUpCommingShareHolderESG();
    return response;
  }
);

export const getAumCategorylistReq = createAsyncThunk(
  'getAumCategorylistReq',
  async () => {
    const response = await getAumCategorylist();
    return response;
  }
);

const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    DecodeToken: [],
    saveCurrentListButtonText: 'Save List',
    txtSaveCurrentList: '',
    txtMarketCapMinRange: '',
    txtMarketCapMaxRange: '',
    marketCapSelection: undefined,
    isSaveCurrentListButtonSaveDisable: true,
    isSaveCurrentListButtonDeleteDisable: true,
    showIndividualOption: true,
    showFilterModel: false,
    showInvestorFilterModel: false,

    // dashboard
    dashboardSelectionId: null,
    txtDashboardName: 'Dashboard',
    dashboardSelection: [],
    // dashboardSelection: [
    //   { id: "item-1", dashboard_widget_id: 2, name: "Board Seats Won (Custom)", x: 0, y: 0, w: 4, h: 3 },
    //   { id: "item-2", dashboard_widget_id: 1, name: "Activist Campaigns (Custom)", x: 3, y: 0, w: 4, h: 3 },
    //   { id: "item-3", dashboard_widget_id: 2, name: "Board Seats Won (Custom)", x: 9, y: 0, w: 4, h: 3 },
    // ],

    // sidebar
    widgetListForProductSelection: [],

    // investor
    listByIndivProponent: [],
    selectionByIndivProponent: undefined,
    investorSearchOptions: [],
    listInvestorTypeAndSubtype: [],
    listDefaultInvestorTypeAndSubtype: [],
    listInvestorTypeAndSubtypeSelection: [],
    investorLocationSelection: [],
    investorSelection: [],
    isInvestorBulkUpload: false,

    listAumCategory: [],
    aumCategorySelection: undefined,

    // sidebartab
    activisamTab: false,
    shortsTab: false,
    votingTab: false,
    goveranceTab: false,
    varneblityTab: false,
    sideBarOpen: false,

    // sidebartab - user access
    isUserAccessActivisam: false,
    isUserAccessShorts: false,
    isUserAccessVoting: false,
    isUserAccessGoverance: false,
    isUserAccessCompensation: false,
    isUserAccessVarneblityTab: false,

    // Companies
    issersRecordset: [],
    companySelection: [],

    // exchange
    listExchange: [],
    exchangeSelection: [],

    // Index
    piListIndices: [],
    indexSelection: [],

    // AI Peer Groups
    listAIPeersGroups: [],
    aiPeerGroupSelection: [],

    // Market Cap ($mn):
    listMarketCap: [
      { value: 0, label: 'Nano Cap (<$50mn)' },
      { value: 1, label: 'Micro Cap ($50mn-$250mn)' },
      { value: 2, label: 'Small Cap ($250mn-$2bn)' },
      { value: 3, label: 'Mid Cap ($2bn-$10bn)' },
      { value: 4, label: 'Large Cap (>$10bn)' },
    ],

    // Industry
    piListSectorsAndIndustries: [],
    defaultPiListSectorsAndIndustries: [],
    industrySelection: [],

    // By Company Location:
    listRegeionAndCountries: [],
    defaultCmpRegeionAndCountries: [],
    companyLocationSelection: [],
    //By investor location:
    invListRegeionAndCountries: [],
    lstInvestorRegeionAndCountries: [],

    // By My Saved Peer Groups
    companySearchOptions: [],
    // companySearchOptionSelection: [],

    freeSearchRecordset: [],
    freeSearchRecordsetFullList: [],
    widgetList: [],
    // dashBoard Id
    dashboardID: [],
    dashboardIdOptions: [],
    lstResolutionType: [],
    lstHotActivist: [],
    directorAppointmentChartData: [],
    AigScoreChartData: [],

    votingPortalTop3News: [],
    activismPortalTop3News: [],
    governancePortalTop3News: [],
    vulnerabilityPortalTop3News: [],
    ESGPortalTop3News: [],
    activistShortTop3News: [],

    ESGShareHolderProposalData: [],
    ESGVotingPolicyChanges: [],
    ESGUpCommingShareHolderData: [],

    ddlShortSellertSelectedVal: undefined,
    isLoadingDashboard: true,
    invTxtMarketCapMinRange: '',
    invTxtMarketCapMaxRange: '',
  },
  reducers: {
    handleIsLoadingDashboard: {
      reducer(state) {
        state.isLoadingDashboard = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleShowIndividualOption: {
      reducer(state, action) {
        state.showIndividualOption = action.payload.showIndividualOption;
        state.companySingleSelection = undefined;
        state.companySearchOptionSelection = undefined;
      },
      prepare() {
        return {
          payload: { showIndividualOption: false },
        };
      },
    },
    handleShowGroupOption: {
      reducer(state, action) {
        state.showIndividualOption = action.payload.showIndividualOption;
      },
      prepare() {
        return {
          payload: { showIndividualOption: true },
        };
      },
    },
    handleExchangeSelectionChange: {
      reducer(state, action) {
        state.exchangeSelection = action.payload.exchangeSelection;
      },
      prepare(exchangeSelection) {
        return {
          payload: { exchangeSelection },
        };
      },
    },
    handleIndexSelectionChange: {
      reducer(state, action) {
        state.indexSelection = action.payload.indexSelection;
      },
      prepare(indexSelection) {
        return {
          payload: { indexSelection },
        };
      },
    },
    handleAIPeerGroupSelection: {
      reducer(state, action) {
        state.aiPeerGroupSelection = action.payload.aiPeerGroupSelection;
      },
      prepare(aiPeerGroupSelection) {
        return {
          payload: { aiPeerGroupSelection },
        };
      },
    },
    handleCompanySelection: {
      reducer(state, action) {
        state.companySelection =
          action.payload.companySelection !== null
            ? action.payload.companySelection
            : [];
        // action.payload.companySelection.forEach((element) => {
        //   const indexfreeSearchRecordsetFullList = state.freeSearchRecordsetFullList.findIndex((item) => item.pid === element.value);
        //   const indexFreeSearchRecordSet = state.freeSearchRecordset.findIndex((item) => item.pid === element.value);

        //   if (indexfreeSearchRecordsetFullList !== NUMBER_NEGATIVE_ONE && indexFreeSearchRecordSet === NUMBER_NEGATIVE_ONE) {
        //     state.freeSearchRecordset.push(element);
        //   }
        // });
      },
      prepare(companySelection) {
        return {
          payload: { companySelection },
        };
      },
    },
    handleCompanySingleSelection: {
      reducer(state, action) {
        state.companySingleSelection = action.payload.companySingleSelection;
      },
      prepare(companySingleSelection) {
        return {
          payload: { companySingleSelection },
        };
      },
    },
    handleMarketCapSelection: {
      reducer(state, action) {
        state.marketCapSelection = action.payload.marketCapSelection;
      },
      prepare(marketCapSelection) {
        return {
          payload: { marketCapSelection },
        };
      },
    },
    // AUM ($bn).
    handleAumCategorySelection: {
      reducer(state, action) {
        state.aumCategorySelection = action.payload.aumCategorySelection;
      },
      prepare(aumCategorySelection) {
        return {
          payload: { aumCategorySelection },
        };
      },
    },
    handleIndustrySelection: {
      reducer(state, action) {
        state.industrySelection = action.payload.industrySelection;
      },
      prepare(industrySelection) {
        return {
          payload: { industrySelection },
        };
      },
    },
    handleCompanySearchOptionSelection: {
      reducer(state, action) {
        state.companySearchOptionSelection =
          action.payload.companySearchOptionSelection;
        if (action.payload.companySearchOptionSelection !== undefined) {
          state.isSaveCurrentListButtonDeleteDisable = false;
          state.isSaveCurrentListButtonSaveDisable = true;
          if (state.txtSaveCurrentList.length > ARRAY_HAS_NO_LENGTH) {
            state.saveCurrentListButtonText = 'Update Existing';
            state.isSaveCurrentListButtonSaveDisable = false;
          } else {
            state.saveCurrentListButtonText = 'Save List';
          }
        } else {
          state.isSaveCurrentListButtonDeleteDisable = true;
          state.isSaveCurrentListButtonSaveDisable = true;
          state.saveCurrentListButtonText = 'Save List';
        }
      },
      prepare(companySearchOptionSelection) {
        return {
          payload: { companySearchOptionSelection },
        };
      },
    },
    handleBulkCompanySelection: {
      reducer(state, action) {
        // remove from list
        const indexFreeSearchRecordSet = state.freeSearchRecordset.findIndex(
          (item) => item.pid === action.payload.d.value
        );
        if (indexFreeSearchRecordSet !== NUMBER_NEGATIVE_ONE) {
          state.freeSearchRecordset.splice(
            indexFreeSearchRecordSet,
            NUMBER_POSITIVE_ONE
          );
        }

        // added drop down list
        const indexcompanySelection = state.companySelection.findIndex(
          (item) => item.value === action.payload.d.value
        );
        if (indexcompanySelection === NUMBER_NEGATIVE_ONE) {
          state.companySelection.push(action.payload.d);
        }
      },
      prepare(e) {
        const d = { value: e.pid, label: e.company_name };
        return {
          payload: { d },
        };
      },
    },
    handleSaveCurrentList: {
      reducer(state, action) {
        state.txtSaveCurrentList = action.payload;
        if (action.payload.length) {
          state.isSaveCurrentListButtonSaveDisable = false;
          if (state.companySearchOptionSelection !== undefined) {
            state.saveCurrentListButtonText = 'Update Existing';
          } else {
            state.saveCurrentListButtonText = 'Save List';
          }
          if (state.companySearchOptionSelection !== undefined) {
            state.isSaveCurrentListButtonDeleteDisable = false;
          } else {
            state.isSaveCurrentListButtonDeleteDisable = true;
          }
        } else {
          state.isSaveCurrentListButtonDeleteDisable = true;
          state.isSaveCurrentListButtonSaveDisable = true;
          state.saveCurrentListButtonText = 'Save List';
        }
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleCompanySearchOptionsReq: {
      reducer(state, action) {
        const selection = current(state).companySearchOptionSelection;
        const newText = current(state).txtSaveCurrentList;
        if (selection === undefined) {
          UpdateCompanySearchOptions(newText, null, action.payload);
          // current(state).companySearchOptionSelection = [{ value: newText, label: companySearchId }];
        } else {
          UpdateCompanySearchOptions(newText, selection.value, action.payload);
        }
        // set default selection
        state.companySearchOptionSelection = undefined;
        state.txtSaveCurrentList = '';
        // state.isSaveCurrentListButtonDeleteDisable = true;
        state.isSaveCurrentListButtonSaveDisable = true;
        state.saveCurrentListButtonText = 'Save List';
      },
      prepare(res) {
        return {
          payload: res.action,
        };
      },
    },
    handleMarketCapMinRange: {
      reducer(state, action) {
        if (action.payload > NUMBER_MARKET_CAP_MAX) {
          state.txtMarketCapMinRange = NUMBER_MARKET_CAP_MAX;
        } else {
          state.txtMarketCapMinRange = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/\D/, ''),
        };
      },
    },
    handleMarketCapMaxRange: {
      reducer(state, action) {
        if (action.payload > NUMBER_MARKET_CAP_MAX) {
          state.txtMarketCapMaxRange = NUMBER_MARKET_CAP_MAX;
        } else {
          state.txtMarketCapMaxRange = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/\D/, ''),
        };
      },
    },
    handleInvMarketCapMinRange: {
      reducer(state, action) {
        if (action.payload > NUMBER_MARKET_CAP_MAX) {
          state.invTxtMarketCapMinRange = NUMBER_MARKET_CAP_MAX;
        } else {
          state.invTxtMarketCapMinRange = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/\D/, ''),
        };
      },
    },
    handleInvMarketCapMaxRange: {
      reducer(state, action) {
        if (action.payload > NUMBER_MARKET_CAP_MAX) {
          state.invTxtMarketCapMaxRange = NUMBER_MARKET_CAP_MAX;
        } else {
          state.invTxtMarketCapMaxRange = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/\D/, ''),
        };
      },
    },
    HandleTreeViewIndustry: {
      reducer(state, action) {
        state.industrySelection = action.payload.selectedNodes;
        const oldJson = current(state).piListSectorsAndIndustries;
        if (oldJson.length > 0) {
          state.piListSectorsAndIndustries = oneChildtreeView(oldJson, action);
        } else {
          const oldJson1 = current(state).defaultPiListSectorsAndIndustries;
          state.piListSectorsAndIndustries = oneChildtreeView(oldJson1, action);
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    HandleTreeViewCompanyLocation: {
      reducer(state, action) {
        state.companyLocationSelection = action.payload.selectedNodes;
        const oldJson = current(state).listRegeionAndCountries;
        if (oldJson.length > 0) {
          state.listRegeionAndCountries = oneChildtreeView(oldJson, action);
        } else {
          const oldJson1 = current(state).defaultCmpRegeionAndCountries;
          state.listRegeionAndCountries = oneChildtreeView(oldJson1, action);
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleSavedPeerGroupsInputChange: {
      reducer(state) {
        // state.industrySelection = action.payload.selectedNodes;
        const selection = current(state).companySearchOptionSelection;
        if (selection !== undefined) {
          state.isSaveCurrentListButtonDeleteDisable = false;
        } else {
          state.isSaveCurrentListButtonDeleteDisable = true;
        }
        state.isSaveCurrentListButtonSaveDisable = true;
        state.saveCurrentListButtonText = 'Save List';
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    ResetCompanySearchOptionSelection: {
      reducer(state) {
        state.companySearchOptionSelection = undefined;
        state.currentSelectionComapanySearchid = undefined;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    HandleFilterModel: {
      reducer(state, action) {
        state.showFilterModel = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    HandleDashBoardWidgetIdSet: {
      reducer(state, action) {
        state.dashBoardWidgetId = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },

    HandleInvestorFilterModel: {
      reducer(state, action) {
        state.showInvestorFilterModel = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleInvestorIsBulkUpload: {
      reducer(state, action) {
        state.isInvestorBulkUpload = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleReset: {
      reducer(state) {
        state.saveCurrentListButtonText = 'Save List';
        state.txtSaveCurrentList = '';
        state.txtMarketCapMinRange = '';
        state.txtMarketCapMaxRange = '';
        state.isSaveCurrentListButtonSaveDisable = true;
        state.isSaveCurrentListButtonDeleteDisable = true;
        state.showIndividualOption = true;
        state.companySelection = [];
        state.exchangeSelection = [];
        state.indexSelection = [];
        state.aiPeerGroupSelection = [];
        state.industrySelection = [];
        state.companyLocationSelection = [];
        state.freeSearchRecordsetFullList = [];
        state.freeSearchRecordset = [];
        state.companySingleSelection = undefined;
        state.companySearchOptionSelection = undefined;
        state.investorSearchOptionsSelection = undefined;
        state.marketCapSelection = undefined;

        // AUM ($bn).
        state.aumCategorySelection = undefined;

        // investor
        state.selectionByIndivProponent = undefined;
        state.listInvestorTypeAndSubtypeSelection = [];
        state.investorLocationSelection = [];
        state.investorSelection = [];
        state.isInvestorBulkUpload = false;
        state.invTxtMarketCapMinRange = '';
        state.invTxtMarketCapMaxRange = '';
        // reset industry
        const myIndustryJson = [];
        const oldIndustryJson =
          current(state).defaultPiListSectorsAndIndustries;
        if (oldIndustryJson !== undefined) {
          oldIndustryJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            myIndustryJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
              expanded: false,
            });
          });
          state.piListSectorsAndIndustries = myIndustryJson;
        }

        // reset location
        const mylocationJson = [];
        const oldLocationJson = current(state).defaultCmpRegeionAndCountries;
        if (oldLocationJson !== undefined) {
          oldLocationJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            mylocationJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
            });
          });
          state.listRegeionAndCountries = mylocationJson;
        }

        // reset investorType
        const myInvestorTypeJson = [];
        const oldInvestorTypeJson =
          current(state).listDefaultInvestorTypeAndSubtype;
        if (oldInvestorTypeJson !== undefined) {
          oldInvestorTypeJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            myInvestorTypeJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
            });
          });
          state.listInvestorTypeAndSubtype = myInvestorTypeJson;
        }

        const myInvlocationJson = [];
        const oldInvLocationJson =
          current(state).lstInvestorRegeionAndCountries;
        if (oldInvLocationJson !== undefined) {
          oldInvLocationJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            myInvlocationJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
            });
          });
          state.invListRegeionAndCountries = myInvlocationJson;
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleSideBar: {
      reducer(state) {
        state.sideBarOpen = !state.sideBarOpen;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSidebarTab: {
      reducer(state, action) {
        let isSameTabSelection = false;
        if (state.selectedSidebarTab === action.payload.e) {
          isSameTabSelection = true;
          state.selectedSidebarTab = '';
        } else {
          state.selectedSidebarTab = action.payload.e;
        }

        state.activisamTab = false;
        state.shortsTab = false;
        state.votingTab = false;
        state.goveranceTab = false;
        state.varneblityTab = false;
        if (isSameTabSelection === false) {
          switch (action.payload.e) {
            case ACTIVISM:
              state.activisamTab = true;
              break;
            case SHORTS:
              state.shortsTab = true;
              break;
            case VOTING:
              state.votingTab = true;
              break;
            case GOVERNANCE:
              state.goveranceTab = true;
              break;
            case VULNERABILITY:
              state.varneblityTab = true;
              break;
            default:
              break;
          }
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    addToDashboardSelection: {
      reducer(state, action) {
        const length = state.dashboardSelection.length + NUMBER_POSITIVE_ONE;
        const data = action.payload;
        let widgetTitle = `${data.name}(Custom)`;

        const lstWidgetSelection = current(state).dashboardSelection;
        const currentWidgetSelectionIndex = lstWidgetSelection.filter(
          (e) => e.dashboard_widget_id === data.dashboard_widget_id
        ).length;

        if (currentWidgetSelectionIndex > ARRAY_HAS_NO_LENGTH) {
          widgetTitle = `${data.name}(Custom) ${
            currentWidgetSelectionIndex + NUMBER_POSITIVE_ONE
          }`;
        }

        state.dashboardSelection.push({
          ...data,
          name: widgetTitle,
          id: `item-${length}`,
          dashboard_widget_id: Number(data.dashboard_widget_id),
          dashboard_widget_link_id: '',
        });
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleSaveDashboardSelectionArray: {
      reducer(state, action) {
        state.dashboardSelectionArray = action.payload;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleTxtDashboardName: {
      reducer(state, action) {
        state.txtDashboardName = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleDashboardUpdatePosition: {
      reducer(state, action) {
        const updateIndex = current(state).dashboardSelection.findIndex(
          (c) => c.id === action.payload.id
        );
        state.dashboardSelection[updateIndex] = action.payload.arrPosition;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleRemoveWidget: {
      reducer(state, action) {
        const dashboardSel = state.dashboardSelection.filter(
          (c) =>
            c.dashboard_widget_link_id !==
            Number(action.payload.dashboard_widget_link_id)
        );
        return { ...state, dashboardSelection: dashboardSel };
      },
      prepare(e) {
        DeleteDashboardSelection(e.dashboard_widget_link_id);
        return {
          payload: e,
        };
      },
    },
    // investor
    handleByShareholderOfCompany: {
      reducer(state, action) {
        state.selectionByIndivProponent =
          action.payload.ByShareholderOfCompanySelection;
      },
      prepare(ByShareholderOfCompanySelection) {
        return {
          payload: { ByShareholderOfCompanySelection },
        };
      },
    },
    handleSaveInvestorCurrentList: {
      reducer(state, action) {
        state.txtSaveCurrentList = action.payload;
        if (action.payload.length) {
          state.isSaveCurrentListButtonSaveDisable = false;
          if (state.investorSearchOptionsSelection !== undefined) {
            state.saveCurrentListButtonText = 'Update Existing';
          } else {
            state.saveCurrentListButtonText = 'Save List';
          }
          if (state.investorSearchOptionsSelection !== undefined) {
            state.isSaveCurrentListButtonDeleteDisable = false;
          } else {
            state.isSaveCurrentListButtonDeleteDisable = true;
          }
        } else {
          state.isSaveCurrentListButtonDeleteDisable = true;
          state.isSaveCurrentListButtonSaveDisable = true;
          state.saveCurrentListButtonText = 'Save List';
        }
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
    handleInvestorSearchOptionSelection: {
      reducer(state, action) {
        state.investorSearchOptionsSelection =
          action.payload.investorSearchOptionsSelection;

        if (action.payload.investorSearchOptionsSelection !== undefined) {
          state.isSaveCurrentListButtonDeleteDisable = false;
          state.isSaveCurrentListButtonSaveDisable = true;
          if (state.txtSaveCurrentList.length > ARRAY_HAS_NO_LENGTH) {
            state.saveCurrentListButtonText = 'Update Existing';
            state.isSaveCurrentListButtonSaveDisable = false;
          } else {
            state.saveCurrentListButtonText = 'Save List';
          }
        } else {
          state.isSaveCurrentListButtonDeleteDisable = true;
          state.isSaveCurrentListButtonSaveDisable = true;
          state.saveCurrentListButtonText = 'Save List';
        }
      },
      prepare(investorSearchOptionsSelection) {
        return {
          payload: { investorSearchOptionsSelection },
        };
      },
    },
    ResetInvestorSearchOptionSelection: {
      reducer(state) {
        state.investorSearchOptionsSelection = undefined;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleInvestorSavedPeerGroupsInputChange: {
      reducer(state) {
        const selection = current(state).investorSearchOptionsSelection;
        if (selection !== undefined) {
          state.isSaveCurrentListButtonDeleteDisable = false;
        } else {
          state.isSaveCurrentListButtonDeleteDisable = true;
        }
        state.isSaveCurrentListButtonSaveDisable = true;
        state.saveCurrentListButtonText = 'Save List';
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    HandleTreeViewListInvestorTypeAndSubtype: {
      reducer(state, action) {
        state.listInvestorTypeAndSubtypeSelection =
          action.payload.selectedNodes;
        const oldJson = current(state).listInvestorTypeAndSubtype;
        if (oldJson.length > 0) {
          state.listInvestorTypeAndSubtype = oneChildtreeView(oldJson, action);
        } else {
          const oldJson1 = current(state).listDefaultInvestorTypeAndSubtype;
          state.listInvestorTypeAndSubtype = oneChildtreeView(oldJson1, action);
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },

    HandleTreeViewInvestorLocation: {
      reducer(state, action) {
        state.investorLocationSelection = action.payload.selectedNodes;
        const oldJson = current(state).invListRegeionAndCountries;
        if (oldJson.length > 0) {
          state.invListRegeionAndCountries = oneChildtreeView(oldJson, action);
        } else {
          const oldJson1 = current(state).lstInvestorRegeionAndCountries;
          state.invListRegeionAndCountries = oneChildtreeView(oldJson1, action);
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleInvestorSelection: {
      reducer(state, action) {
        state.investorSelection =
          action.payload.investorSelection !== null
            ? action.payload.investorSelection
            : [];
      },
      prepare(investorSelection) {
        return {
          payload: { investorSelection },
        };
      },
    },
    handleBulkInvestorSelection: {
      reducer(state, action) {
        // remove from list
        const indexFreeSearchRecordSet = state.freeSearchRecordset.findIndex(
          (item) => item.investor_id === action.payload.d.value
        );
        if (indexFreeSearchRecordSet !== NUMBER_NEGATIVE_ONE) {
          state.freeSearchRecordset.splice(
            indexFreeSearchRecordSet,
            NUMBER_POSITIVE_ONE
          );
        }
        // added drop down list
        const indexinvestorSelection = state.investorSelection.findIndex(
          (item) => item.value === action.payload.d.value
        );
        if (indexinvestorSelection === NUMBER_NEGATIVE_ONE) {
          state.investorSelection.push(action.payload.d);
        }
      },
      prepare(e) {
        const d = { value: e.investor_id, label: e.investor_name };
        return {
          payload: { d },
        };
      },
    },
    handleChangeDashboardId: {
      reducer(state, action) {
        state.dashboardID = action.payload;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleDashboardFromModule: {
      reducer(state, action) {
        const data = current(state.dashboardIdOptions);
        state.dashboardID = data[0];
        data.forEach((c) => {
          if (c.product_id === action.payload) {
            state.dashboardID = c;
          }
        });
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleShortSellerCampaign: {
      reducer(state, action) {
        if (action.payload !== undefined) {
          state.ddlShortSellertSelectedVal = action.payload;
        } else {
          state.ddlShortSellertSelectedVal = undefined;
        }
      },
      prepare(e) {
        return { payload: e };
      },
    },
    handleResetCompnaySelections: {
      reducer(state, action) {
        state.companySelection = [];
        state.indexSelection = [];
        state.exchangeSelection = [];
        state.aiPeerGroupSelection = [];
        state.marketCapSelection = undefined;
        state.txtMarketCapMinRange = '';
        state.txtMarketCapMaxRange = '';
        state.companySearchOptionSelection = undefined;
        state.currentSelectionComapanySearchid = undefined;
        state.companySingleSelection = undefined;
        state.industrySelection = [];
        state.companyLocationSelection = [];

        // reset industry
        const myIndustryJson = [];
        const oldIndustryJson =
          current(state).defaultPiListSectorsAndIndustries;
        if (oldIndustryJson !== undefined) {
          oldIndustryJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            myIndustryJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
              expanded: false,
            });
          });
          state.piListSectorsAndIndustries = myIndustryJson;
        }

        // reset location
        const mylocationJson = [];
        const oldLocationJson = current(state).defaultCmpRegeionAndCountries;
        if (oldLocationJson !== undefined) {
          oldLocationJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            mylocationJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
            });
          });
          state.listRegeionAndCountries = mylocationJson;
        }
        if (action.payload) {
          localStorage.removeItem('companyFilterData');
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleResetInvestorSelections: {
      reducer(state, action) {
        state.investorSelection = [];
        state.selectionByIndivProponent = undefined;
        state.aumCategorySelection = undefined;
        state.invTxtMarketCapMinRange = '';
        state.invTxtMarketCapMaxRange = '';
        state.investorSearchOptionsSelection = undefined;
        state.investorLocationSelection = [];
        state.listInvestorTypeAndSubtypeSelection = [];

        //reset investor locations
        const myInvlocationJson = [];
        const oldInvLocationJson =
          current(state).lstInvestorRegeionAndCountries;
        if (oldInvLocationJson !== undefined) {
          oldInvLocationJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            myInvlocationJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
            });
          });
          state.invListRegeionAndCountries = myInvlocationJson;
        }

        // reset investorType
        const myInvestorTypeJson = [];
        const oldInvestorTypeJson =
          current(state).listDefaultInvestorTypeAndSubtype;
        if (oldInvestorTypeJson !== undefined) {
          oldInvestorTypeJson.forEach((element) => {
            const myJsonChilds = [];
            element.children.forEach((e) => {
              myJsonChilds.push({ ...e, checked: false, expanded: false });
            });
            myInvestorTypeJson.push({
              ...element,
              children: myJsonChilds,
              checked: false,
            });
          });
          state.listInvestorTypeAndSubtype = myInvestorTypeJson;
        }
        if (action.payload) {
          localStorage.removeItem('investorFilterData');
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
  },
  extraReducers: {
    [allIssuersReq.fulfilled]: (state, action) => {
      state.issersRecordset = action.payload !== undefined ? action.payload.data : [];
    },
    [piListOfIndicesReq.fulfilled]: (state, action) => {
      state.piListIndices = action.payload !== undefined ? action.payload.data : [];
    },
    [getListOfExchange.fulfilled]: (state, action) => {
      state.listExchange = action.payload !== undefined ? action.payload.data : [];
    },
    [getAIPeersGroups.fulfilled]: (state, action) => {
      state.listAIPeersGroups = action.payload !== undefined ? action.payload.data : [];
    },
    [getTreeRegionsAndCountries.fulfilled]: (state, action) => {
      const mylocationJson = [];
      const oldLocationJson = action.payload;
      if (oldLocationJson !== undefined) {
        oldLocationJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          mylocationJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
            expanded: false,
          });
        });
        state.defaultCmpRegeionAndCountries = mylocationJson;
        state.lstInvestorRegeionAndCountries = mylocationJson;
      }
      // state.listRegeionAndCountries = action.payload;
    },
    [listInvestorTypeAndSubtype.fulfilled]: (state, action) => {
      // state.listDefaultInvestorTypeAndSubtype = action.payload;
      const myInvestorTypeJson = [];
      const oldInvestorTypeJson = action.payload;
      if (oldInvestorTypeJson !== undefined) {
        oldInvestorTypeJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          myInvestorTypeJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
          });
        });
        state.listDefaultInvestorTypeAndSubtype = myInvestorTypeJson;
      }
    },
    [getPIListSectorsAndIndustriesReq.fulfilled]: (state, action) => {
      // reset industry
      const myIndustryJson = [];
      const oldIndustryJson = action.payload;
      if (oldIndustryJson !== undefined) {
        oldIndustryJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          myIndustryJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
            expanded: false,
          });
        });
        state.defaultPiListSectorsAndIndustries = myIndustryJson;
      }
    },
    [searchCompanyAndIndustriesReq.fulfilled]: (state, action) => {
      state.freeSearchRecordsetFullList = [];
      state.freeSearchRecordset = [];
      if (action.payload !== undefined && action.payload !== null) {
        state.freeSearchRecordsetFullList = action.payload;
        state.freeSearchRecordset = action.payload;
      }
    },
    [searchInvestorsReq.fulfilled]: (state, action) => {
      state.freeSearchRecordsetFullList = action.payload;
      state.freeSearchRecordset = action.payload;
    },
    [getCompanySearchOptions.fulfilled]: (state, action) => {
      const mySearchOptions = [];
      if (action.payload !== null && action.payload !== false) {
        let data = [];
        if (typeof action.payload === 'string') {
          data = JSON.parse(action.payload);
        } else {
          data = action.payload;
        }
        data.forEach((e) => {
          if (e.pid !== null) {
            mySearchOptions.push({ ...e, label: `${e.label} (Indiv)` });
          } else {
            mySearchOptions.push({ ...e, label: `${e.label} (Group)` });
          }
        });
      }
      state.companySearchOptions = mySearchOptions;
    },
    [getInvestorSearchOptions.fulfilled]: (state, action) => {
      const mySearchOptions = [];
      if (action.payload !== null && action.payload !== false) {
        let data = [];
        if (typeof action.payload === 'string') {
          data = JSON.parse(action.payload);
        } else {
          data = action.payload;
        }
        data.forEach((e) => {
          mySearchOptions.push({ ...e, label: e.label }); // + " (Group)" });
        });
      }
      state.investorSearchOptions = mySearchOptions;
    },

    [handleCompanySearchUpdateReq.fulfilled]: (state, action) => {
      state.companySearchOptionSelection = action.payload;
      state.currentSelectionComapanySearchid = action.payload.value;
      state.txtSaveCurrentList = '';
      state.isSaveCurrentListButtonDeleteDisable = false;
      state.isSaveCurrentListButtonSaveDisable = true;
      state.saveCurrentListButtonText = 'Save List';
      if (action.payload.isSaved !== undefined) {
        state.showFilterModel = action.payload.isSaved;
      }
    },
    [handleInvestorSearchUpdateReq.fulfilled]: (state, action) => {
      state.investorSearchOptionsSelection = action.payload;
      state.currentSelectionInvestorSearchid = action.payload.value;
      state.txtSaveCurrentList = '';
      state.isSaveCurrentListButtonDeleteDisable = false;
      state.isSaveCurrentListButtonSaveDisable = true;
      state.saveCurrentListButtonText = 'Save List';
      if (action.payload.isSaved !== undefined) {
        state.showInvestorFilterModel = action.payload.isSaved;
      }
    },

    [handleCompanySearchDeleteReq.fulfilled]: (state) => {
      state.companySearchOptionSelection = undefined;
      state.txtSaveCurrentList = '';
      state.isSaveCurrentListButtonDeleteDisable = false;
      state.isSaveCurrentListButtonSaveDisable = true;
      state.saveCurrentListButtonText = 'Update Existing';
    },
    [handleInvestorSearchDeleteReq.fulfilled]: (state) => {
      state.investorSearchOptionsSelection = undefined;
      state.txtSaveCurrentList = '';
      state.isSaveCurrentListButtonDeleteDisable = false;
      state.isSaveCurrentListButtonSaveDisable = true;
      state.saveCurrentListButtonText = 'Update Existing';
    },

    [getAllCompanySearchSelection.fulfilled]: (state, action) => {
      // clear selection
      state.companySingleSelection = undefined;
      state.txtMarketCapMinRange = '';
      state.txtMarketCapMaxRange = '';
      state.companySelection = [];
      state.indexSelection = [];
      state.exchangeSelection = [];
      state.aiPeerGroupSelection = [];
      state.marketCapSelection = undefined;
      state.industrySelection = [];
      state.companyLocationSelection = [];

      // reset industry
      const myIndustryJson = [];
      const oldIndustryJson = current(state).defaultPiListSectorsAndIndustries;
      if (oldIndustryJson !== undefined) {
        oldIndustryJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          myIndustryJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
            expanded: false,
          });
        });
        state.piListSectorsAndIndustries = myIndustryJson;
      }

      // reset location
      const mylocationJson = [];
      const oldLocationJson = current(state).defaultCmpRegeionAndCountries;
      if (oldLocationJson !== undefined) {
        oldLocationJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          mylocationJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
          });
        });
        state.listRegeionAndCountries = mylocationJson;
      }

      if (action.payload !== undefined && action.payload !== false) {
        // company_search
        if (action.payload.company_search.length > ARRAY_HAS_NO_LENGTH) {
          state.companySearchOptionSelection = {
            label: action.payload.company_search[0].Name,
            value: action.payload.company_search[0].company_search_id,
          };
          // single company
          if (
            action.payload.company_search[ARRAY_START_VALUE].selectedCompany !==
            null
          ) {
            state.companySingleSelection = JSON.parse(
              action.payload.company_search[ARRAY_START_VALUE].selectedCompany
            )[ARRAY_START_VALUE];
            state.showIndividualOption = true;
          } else {
            state.showIndividualOption = false;

            // market cap min
            if (
              action.payload.company_search[ARRAY_START_VALUE]
                .market_cap_min !== null &&
              action.payload.company_search[ARRAY_START_VALUE]
                .market_cap_min !== ARRAY_HAS_NO_LENGTH
            ) {
              state.txtMarketCapMinRange =
                action.payload.company_search[
                  ARRAY_START_VALUE
                ].market_cap_min.toString();
            }

            // market cap min
            if (
              action.payload.company_search[ARRAY_START_VALUE]
                .market_cap_max !== null &&
              action.payload.company_search[ARRAY_START_VALUE]
                .market_cap_max !== ARRAY_HAS_NO_LENGTH
            ) {
              state.txtMarketCapMaxRange =
                action.payload.company_search[
                  ARRAY_START_VALUE
                ].market_cap_max.toString();
            }

            // multiple company
            if (
              action.payload.companies.length > ARRAY_HAS_NO_LENGTH &&
              action.payload.index[ARRAY_START_VALUE].companies !== null
            ) {
              state.companySelection = JSON.parse(
                action.payload.companies[ARRAY_START_VALUE].companies
              );
            }

            // index
            if (
              action.payload.index.length > ARRAY_HAS_NO_LENGTH &&
              action.payload.index[ARRAY_START_VALUE].Indices !== null
            ) {
              state.indexSelection = JSON.parse(
                action.payload.index[ARRAY_START_VALUE].Indices
              );
            }

            // exchange
            if (
              action.payload.exchange.length > ARRAY_HAS_NO_LENGTH &&
              action.payload.exchange[ARRAY_START_VALUE].exchange !== null
            ) {
              state.exchangeSelection = JSON.parse(
                action.payload.exchange[ARRAY_START_VALUE].exchange
              );
            }

            // ai peer group
            if (
              action.payload.peer_group.length > ARRAY_HAS_NO_LENGTH &&
              action.payload.peer_group[ARRAY_START_VALUE].peerGroup !== null
            ) {
              state.aiPeerGroupSelection = JSON.parse(
                action.payload.peer_group[ARRAY_START_VALUE].peerGroup
              );
            }

            // market cap
            if (action.payload.market_cap.length > ARRAY_HAS_NO_LENGTH) {
              const mCap = current(state).listMarketCap;
              mCap.forEach((element) => {
                if (element.value === action.payload.market_cap[ARRAY_START_VALUE].market_cap_group_id) {
                  state.marketCapSelection = element;
                }
              });
            }

            // industry
            if (action.payload.industry.length > ARRAY_HAS_NO_LENGTH) {
              // state.industrySelection = JSON.parse(action.payload.industry[ARRAY_START_VALUE].industrySelection);

              const oldIndustry =
                current(state).defaultPiListSectorsAndIndustries;
              const prepareSelection = [];
              const sector = [];
              const industry = [];
              action.payload.industry.forEach((e) => {
                if (e.sector_id !== null && e.industry_id === null) {
                  prepareSelection.push({ value: e.sector_id, _depth: 0 });
                  sector.push(e.sector_id);
                }
                if (e.industry_id !== null) {
                  const parentid = oldIndustry.findIndex(
                    (c) => c.value === e.sector_id
                  );
                  prepareSelection.push({
                    value: e.industry_id,
                    _depth: 1,
                    _parent: `rdts2-${parentid}`,
                  });
                  industry.push({
                    sector: e.sector_id,
                    industry: e.industry_id,
                  });
                }
              });
              state.industrySelection = prepareSelection;

              const myJson = [];
              // let selectsector = action.payload.industry[ARRAY_START_VALUE].sector_id.split(",");
              // let selectindustry = action.payload.industry[ARRAY_START_VALUE].industry_id.split(",");

              const selectsector = sector;
              const selectindustry = industry;

              let parentId;
              oldIndustry.forEach((e) => {
                const myJsonChild = [];
                parentId = e.value;
                if (selectsector.indexOf(e.value) !== NUMBER_NEGATIVE_ONE) {
                  e.children.forEach((eChild) => {
                    myJsonChild.push({ ...eChild, checked: true });
                  });
                  myJson.push({ ...e, children: myJsonChild, checked: true });
                } else {
                  e.children.forEach((eChild) => {
                    // if (selectindustry.indexOf(eChild.value) !== NUMBER_NEGATIVE_ONE) {
                    if (
                      selectindustry.findIndex(
                        (c) =>
                          c.sector === parentId && c.industry === eChild.value
                      ) !== NUMBER_NEGATIVE_ONE
                    ) {
                      myJsonChild.push({ ...eChild, checked: true });
                    } else {
                      myJsonChild.push({ ...eChild, checked: false });
                    }
                  });
                  myJson.push({ ...e, children: myJsonChild, checked: false });
                }
              });

              state.piListSectorsAndIndustries = myJson;
            }

            // location
            if (action.payload.country.length > ARRAY_HAS_NO_LENGTH) {
              // state.companyLocationSelection = JSON.parse(action.payload.country[ARRAY_START_VALUE].location_selection);

              const oldLocation = current(state).defaultCmpRegeionAndCountries;
              const prepareSelection = [];
              const region = [];
              const country = [];
              action.payload.country.forEach((e) => {
                if (e.region_id !== null && e.country_id === null) {
                  prepareSelection.push({ value: e.region_id, _depth: 0 });
                  region.push(e.region_id);
                }

                if (e.country_id !== null) {
                  const parentid = oldLocation.findIndex(
                    (c) => c.value === e.region_id
                  );
                  prepareSelection.push({
                    value: e.country_id,
                    _depth: 1,
                    _parent: `rdts2-${parentid}`,
                  });
                  country.push({ region: e.region_id, country: e.country_id });
                }
              });
              state.companyLocationSelection = prepareSelection;

              const myJsonInvestorSearchType = [];

              const selectregion = region;
              const selectcountry = country;

              // let selectregion = action.payload.country[ARRAY_START_VALUE].region_id.split(",");
              // let selectcountry = action.payload.country[ARRAY_START_VALUE].country_id.split(",");

              let parentId;
              oldLocation.forEach((e) => {
                const myJsonChildLocation = [];
                parentId = e.value;
                if (selectregion.indexOf(e.value) !== NUMBER_NEGATIVE_ONE) {
                  e.children.forEach((eChild) => {
                    myJsonChildLocation.push({ ...eChild, checked: true });
                  });
                  myJsonInvestorSearchType.push({
                    ...e,
                    children: myJsonChildLocation,
                    checked: true,
                  });
                } else {
                  e.children.forEach((eChild) => {
                    if (
                      selectcountry.findIndex(
                        (c) =>
                          c.region === parentId && c.country === eChild.value
                      ) !== NUMBER_NEGATIVE_ONE
                    ) {
                      myJsonChildLocation.push({ ...eChild, checked: true });
                    } else {
                      myJsonChildLocation.push({ ...eChild, checked: false });
                    }
                  });
                  myJsonInvestorSearchType.push({
                    ...e,
                    children: myJsonChildLocation,
                    checked: false,
                  });
                }
              });
              state.listRegeionAndCountries = myJsonInvestorSearchType;
            }
          }
        }
      }
    },
    [userRightsForWidgetsReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        if (
          action.payload.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVISM &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= ARRAY_HAS_NO_LENGTH
        ) {
          state.isUserAccessActivisam = true;
        }

        if (
          action.payload.findIndex(
            (p) =>
              p.product_id === productConstant.GOVERNANCE &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= ARRAY_HAS_NO_LENGTH
        ) {
          state.isUserAccessGoverance = true;
        }

        if (
          action.payload.findIndex(
            (p) =>
              p.product_id === productConstant.COMPENSATION &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= ARRAY_HAS_NO_LENGTH
        ) {
          state.isUserAccessCompensation = true;
        }

        if (
          action.payload.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVIST_VULNERABILITY &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= ARRAY_HAS_NO_LENGTH
        ) {
          state.isUserAccessVarneblityTab = true;
        }

        if (
          action.payload.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVIST_SHORTS &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= ARRAY_HAS_NO_LENGTH
        ) {
          state.isUserAccessShorts = true;
        }

        if (
          action.payload.findIndex(
            (p) =>
              p.product_id === productConstant.VOTING &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= ARRAY_HAS_NO_LENGTH
        ) {
          state.isUserAccessVoting = true;
        }
      }
    },
    [getAllDashboardWidgetsReq.fulfilled]: (state, action) => {
      state.widgetListForProductSelection = action.payload !== undefined ? action.payload.data : [];
    },
    [getAllDashboardWidgetsListReq.fulfilled]: (state, action) => {
      state.widgetList = action.payload !== undefined ? action.payload.data : [];
      state.isLoadingDashboard = false;
    },
    [dashboardSubmitReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.dashboardSelectionId = action.payload;
      }
    },
    [addtblDashboardWidgetLinkReq.fulfilled]: () => {
      // state.widgetListForProductSelection = action.payload;
    },
    [addtblDashboardNewWidgetLinkReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        const array = {
          ...JSON.parse(action.payload.position),
          dashboard_widget_link_id: action.payload.dashboard_widget_link_id,
        };
        state.dashboardSelection.push(array);
      }
    },
    [getUserDashboardReq.fulfilled]: (state, action) => {
      state.dashboardSelection = [];
      const data = action.payload;
      data.forEach((e) => {
        state.dashboardSelectionId = e.dashboard_id;
        state.txtDashboardName = e.Dashboard_name;
        state.dashboardSelection.push({
          ...JSON.parse(e.position),
          dashboard_widget_link_id: e.dashboard_widget_link_id,
          company_search_id: e.company_search_id,
          investor_search_id: e.investor_search_id,
        });
      });
    },
    //
    // [getTblDashboardWidgetsReq.fulfilled]: (state, action) => {
    //   state.listWidgets = action.payload.data;
    // },
    [getCurrentShareholderReq.fulfilled]: (state, action) => {
      state.listByIndivProponent = action.payload;
    },
    [getInvestorSearchSelectionReq.fulfilled]: (state, action) => {
      // clear selection
      state.invTxtMarketCapMinRange = '';
      state.invTxtMarketCapMaxRange = '';
      state.investorSelection = [];
      state.marketCapSelection = undefined;
      state.aumCategorySelection = undefined;

      state.investorLocationSelection = [];
      state.selectionByIndivProponent = undefined;
      state.listInvestorTypeAndSubtypeSelection = [];

      // reset location
      const mylocationJson = [];
      const oldLocationJson = current(state).lstInvestorRegeionAndCountries;
      if (oldLocationJson !== undefined) {
        oldLocationJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          mylocationJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
          });
        });
        state.invListRegeionAndCountries = mylocationJson;
      }

      // reset investorType
      const myInvestorTypeJson = [];
      const oldInvestorTypeJson =
        current(state).listDefaultInvestorTypeAndSubtype;
      if (oldInvestorTypeJson !== undefined) {
        oldInvestorTypeJson.forEach((element) => {
          const myJsonChilds = [];
          element.children.forEach((e) => {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          });
          myInvestorTypeJson.push({
            ...element,
            children: myJsonChilds,
            checked: false,
          });
        });
        state.listInvestorTypeAndSubtype = myInvestorTypeJson;
      }

      if (action.payload !== undefined) {
        // investor_search
        if (
          action.payload.investor_search !== undefined &&
          action.payload.investor_search.length > ARRAY_HAS_NO_LENGTH
        ) {
          state.investorSearchOptionsSelection = {
            label: action.payload.investor_search[0].Name,
            value: action.payload.investor_search[0].investor_search_id,
          };
          // aum_min
          if (
            action.payload.investor_search[ARRAY_START_VALUE].aum_min !==
              null &&
            action.payload.investor_search[ARRAY_START_VALUE].aum_min !==
              ARRAY_HAS_NO_LENGTH
          ) {
            state.invTxtMarketCapMinRange =
              action.payload.investor_search[ARRAY_START_VALUE].aum_min;
          }

          // aum_max
          if (
            action.payload.investor_search[ARRAY_START_VALUE].aum_max !==
              null &&
            action.payload.investor_search[ARRAY_START_VALUE].aum_max !==
              ARRAY_HAS_NO_LENGTH
          ) {
            state.invTxtMarketCapMaxRange =
              action.payload.investor_search[ARRAY_START_VALUE].aum_max;
          }

          // multiple investors
          if (
            action.payload.investors.length > ARRAY_HAS_NO_LENGTH &&
            action.payload.investors[ARRAY_START_VALUE].investors !== null
          ) {
            state.investorSelection = JSON.parse(
              action.payload.investors[ARRAY_START_VALUE].investors
            );
          }

          // AUM
          // if (action.payload.AUM.length > ARRAY_HAS_NO_LENGTH) {
          //   const mCap = current(state).listMarketCap;
          //   mCap.forEach((element) => {
          //     if (element.value === action.payload.AUM[ARRAY_START_VALUE].AUM_group_id) {
          //       state.marketCapSelection = element;
          //     }
          //   });
          // }

          // AUM ($bn).
          if (action.payload.AUM.length > ARRAY_HAS_NO_LENGTH) {
            const aumCategory = current(state).listAumCategory;
            if (aumCategory.length > 0) {
              aumCategory.forEach((element) => {
                if (
                  element.value ===
                  action.payload.AUM[ARRAY_START_VALUE].AUM_group_id
                ) {
                  state.aumCategorySelection = element;
                }
              });
            }
          }

          // byshareholdercompany
          if (
            action.payload.byshareholdercompany.length > ARRAY_HAS_NO_LENGTH
          ) {
            const mCap = current(state).listByIndivProponent;
            mCap.forEach((element) => {
              if (
                element.value ===
                action.payload.byshareholdercompany[ARRAY_START_VALUE].pid
              ) {
                state.selectionByIndivProponent = element;
              }
            });
          }

          // location
          if (action.payload.country.length > ARRAY_HAS_NO_LENGTH) {
            // state.companyLocationSelection = JSON.parse(action.payload.country[ARRAY_START_VALUE].location_selection);
            const oldLocation = current(state).lstInvestorRegeionAndCountries;
            const prepareSelection = [];
            const region = [];
            const country = [];
            action.payload.country.forEach((e) => {
              if (e.region_id !== null && e.country_id === null) {
                prepareSelection.push({ value: e.region_id, _depth: 0 });
                region.push(e.region_id);
              }

              if (e.country_id !== null) {
                const parentid = oldLocation.findIndex(
                  (c) => c.value === e.region_id
                );
                prepareSelection.push({
                  value: e.country_id,
                  _depth: 1,
                  _parent: `rdts2-${parentid}`,
                });
                country.push({ region: e.region_id, country: e.country_id });
              }
            });
            state.investorLocationSelection = prepareSelection;

            const myJsonLocation = [];
            const selectregion = region;
            const selectcountry = country;
            let parentId;

            oldLocation.forEach((e) => {
              const myJsonChildLocation = [];
              parentId = e.value;
              if (selectregion.indexOf(e.value) !== NUMBER_NEGATIVE_ONE) {
                e.children.forEach((eChild) => {
                  myJsonChildLocation.push({ ...eChild, checked: true });
                });
                myJsonLocation.push({
                  ...e,
                  children: myJsonChildLocation,
                  checked: true,
                });
              } else {
                e.children.forEach((eChild) => {
                  if (
                    selectcountry.findIndex(
                      (c) => c.region === parentId && c.country === eChild.value
                    ) !== NUMBER_NEGATIVE_ONE
                  ) {
                    myJsonChildLocation.push({ ...eChild, checked: true });
                  } else {
                    myJsonChildLocation.push({ ...eChild, checked: false });
                  }
                });
                myJsonLocation.push({
                  ...e,
                  children: myJsonChildLocation,
                  checked: false,
                });
              }
            });
            state.invListRegeionAndCountries = myJsonLocation;
          }

          // type & subtype
          if (action.payload.search_type.length > ARRAY_HAS_NO_LENGTH) {
            // state.companyInvestorTypeSelection = JSON.parse(action.payload.investorSubType[ARRAY_START_VALUE].InvestorType_selection);
            const oldInvestorType =
              current(state).listDefaultInvestorTypeAndSubtype;
            const prepareSelection = [];
            const investorType = [];
            const investorSubType = [];

            action.payload.search_type.forEach((e) => {
              if (
                e.investor_type_id !== null &&
                e.investor_subtype_id === null
              ) {
                prepareSelection.push({ value: e.investor_type_id, _depth: 0 });
                investorType.push(e.investor_type_id);
              }
              if (e.investor_subtype_id !== null) {
                const parentid = oldInvestorType.findIndex(
                  (c) => c.value === e.investor_type_id
                );
                prepareSelection.push({
                  value: e.investor_subtype_id,
                  _depth: 1,
                  _parent: `rdts2-${parentid}`,
                });
                investorSubType.push({
                  investorType: e.investor_type_id,
                  investorSubType: e.investor_subtype_id,
                });
              }
            });
            state.listInvestorTypeAndSubtypeSelection = prepareSelection;

            const myJsonInvestorType = [];
            const selectinvestorType = investorType;
            const selectinvestorSubType = investorSubType;
            let parentId;

            oldInvestorType.forEach((e) => {
              const myJsonChildInvestorType = [];
              parentId = e.value;
              if (selectinvestorType.indexOf(e.value) !== NUMBER_NEGATIVE_ONE) {
                e.children.forEach((eChild) => {
                  myJsonChildInvestorType.push({ ...eChild, checked: true });
                });
                myJsonInvestorType.push({
                  ...e,
                  children: myJsonChildInvestorType,
                  checked: true,
                });
              } else {
                e.children.forEach((eChild) => {
                  if (
                    selectinvestorSubType.findIndex(
                      (c) =>
                        c.investorSubType === parentId &&
                        c.investorType === eChild.value
                    ) !== NUMBER_NEGATIVE_ONE
                  ) {
                    myJsonChildInvestorType.push({ ...eChild, checked: true });
                  } else {
                    myJsonChildInvestorType.push({ ...eChild, checked: false });
                  }
                });
                myJsonInvestorType.push({
                  ...e,
                  children: myJsonChildInvestorType,
                  checked: false,
                });
              }
            });

            state.listInvestorTypeAndSubtype = myJsonInvestorType;
          }
        }
      }
    },
    [getAllInvestorsFromShareholderOfCompany.fulfilled]: (state, action) => {
      // let oldInvestorSelection = [];
      // oldInvestorSelection = current(state).investorSelection;
      // oldInvestorSelection = Object.assign([], oldInvestorSelection);
      state.investorSelection = action.payload !== undefined && action.payload !== null ? action.payload.data : [];
      // if (action.payload.data === undefined) {
      //   state.investorSelection = action.payload.data;
      // } else {
      //   if (oldInvestorSelection.length > ARRAY_HAS_NO_LENGTH) {
      //     action.payload.data.map((e) => {
      //       if (oldInvestorSelection.findIndex((item) => item.value === e.value) === NUMBER_NEGATIVE_ONE) {
      //         oldInvestorSelection.push({ value: e.value, label: e.label });
      //       }
      //     });
      //     state.investorSelection = oldInvestorSelection;
      //   } else {
      //     state.investorSelection = action.payload.data;
      //   }
      // }
    },
    [getPortalsTop3NewsReq.fulfilled]: (state, action) => {
      state.votingPortalTop3News = action.payload !== undefined && action.payload !== null ? action.payload.votingNewsData : [];
      state.activismPortalTop3News = action.payload !== undefined && action.payload !== null ? action.payload.activismNewsData : [];
      state.governancePortalTop3New = action.payload !== undefined && action.payload !== null ? action.payload.governanceNewsData : [];
      state.ESGPortalTop3News = action.payload !== undefined && action.payload !== null ? action.payload.ESGNewsData : [];
      state.vulnerabilityPortalTop3News = action.payload !== undefined && action.payload !== null ? action.payload.vulnerabilityNewsData : [];
      state.activistShortTop3News = action.payload !== undefined && action.payload !== null ? action.payload.activistShortsNewsData : [];
    },
    [getDashboardIds.fulfilled]: (state, action) => {
      state.dashboardIdOptions = action.payload !== undefined && action.payload !== null ? action.payload.data : [];
      state.dashboardID = action.payload !== undefined && action.payload !== null && action.payload.data !== undefined && action.payload.data.length > 0 ? action.payload.data[0] : [];
    },
    [resolutionsByInvestorTrackerFilterReq.fulfilled]: (state, action) => {
      state.lstResolutionType = action.payload !== undefined && action.payload !== null ? action.payload.data : [];
    },
    [GetHotActivistDataReq.fulfilled]: (state, action) => {
      state.lstHotActivist = action.payload !== null && action.payload !== undefined ? action.payload.data : [];
    },
    [getDirectorAppointmentChartDataReq.fulfilled]: (state, action) => {
      state.directorAppointmentChartData = action.payload !== null && action.payload !== undefined ? action.payload.data : [];
    },
    [getAigRussell3000ScoreReq.fulfilled]: (state, action) => {
      state.AigScoreChartData = action.payload !== null && action.payload !== undefined ? action.payload.data : [];
    },
    [getShareHolderProposalESGZReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.ESGShareHolderProposalData = action.payload !== null && action.payload !== undefined && action.payload.data.length > 0 ? action.payload.data : [];
      }
    },
    [getVotingPolicyChangesESGReq.fulfilled]: (state, action) => {
      state.ESGVotingPolicyChanges = action.payload !== null && action.payload !== undefined ? action.payload.data : [];
    },
    [getUpCommingShareHolderESGReq.fulfilled]: (state, action) => {
      state.ESGUpCommingShareHolderData = action.payload !== null && action.payload !== undefined ? action.payload.data : [];
      state.isLoadingDashboard = false;
    },
    // AUM ($bn).
    [getAumCategorylistReq.fulfilled]: (state, action) => {
      if (typeof action.payload === 'string') {
        state.listAumCategory = JSON.parse(action.payload.data);
      } else {
        state.listAumCategory = action.payload;
      }
      // if (action.payload !== undefined) {
      //   state.listAumCategory = JSON.parse(action.payload.data);
      // }
    },
    [getStoredProcedureReq.fulfilled]: (state, action) => {
      state.dashboardSelection = [];
      const data = action.payload.dashbordData;
      data.forEach((e) => {
        state.dashboardSelectionId = e.dashboard_id;
        state.txtDashboardName = e.Dashboard_name;
        state.dashboardSelection.push({
          ...JSON.parse(e.position),
          dashboard_widget_link_id: e.dashboard_widget_link_id,
          company_search_id: e.company_search_id,
          investor_search_id: e.investor_search_id,
        });
      });
    }
  },
});

export const {
  handleIsLoadingDashboard,
  handleCompanySingleSelection,
  handleExchangeSelectionChange,
  handleIndexSelectionChange,
  handleAIPeerGroupSelection,
  handleCompanySelection,
  handleShowIndividualOption,
  handleShowGroupOption,
  handleMarketCapSelection,
  handleIndustrySelection,
  handleCompanySearchOptionSelection,
  handleBulkCompanySelection,
  handleCompanySearchOptionsReq,
  handleSaveCurrentList,
  handleMarketCapMinRange,
  handleMarketCapMaxRange,
  HandleTreeViewIndustry,
  HandleTreeViewCompanyLocation,
  handleSavedPeerGroupsInputChange,
  handleInvestorSavedPeerGroupsInputChange,
  updateIndustryTreeViewDefaultSelection,
  ResetCompanySearchOptionSelection,
  ResetInvestorSearchOptionSelection,
  HandleFilterModel,
  HandleInvestorFilterModel,
  handleReset,
  handleSidebarTab,
  addToDashboardSelection,
  handleSaveDashboardSelectionArray,
  handleTxtDashboardName,
  handleDashboardUpdatePosition,
  handleRemoveWidget,
  // investor
  handleByShareholderOfCompany,
  handleSaveInvestorCurrentList,
  handleInvestorSearchOptionSelection,
  HandleTreeViewListInvestorTypeAndSubtype,
  HandleTreeViewInvestorLocation,
  handleInvestorSelection,
  handleBulkInvestorSelection,
  handleInvestorIsBulkUpload,

  handleAumCategorySelection,
  //
  HandleDashBoardWidgetIdSet,
  //
  handleSideBar,
  handleChangeDashboardId,
  handleDashboardFromModule,
  handleShortSellerCampaign,
  handleInvMarketCapMinRange,
  handleInvMarketCapMaxRange,
  handleResetInvestorSelections,
  handleResetCompnaySelections,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
