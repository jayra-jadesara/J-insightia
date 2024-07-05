import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  getMagazinesReportList,
  GetMagazine_ProxyOrSpecialReports_insightiaList,
  SearchAiMMagazineText
} from '../../utils/magazinesreport-util';
import { TokenDecode } from '../../utils/general-util';
import prodConst from '../../constants/ProductConstants';
import pathConst from '../../constants/PathsConstant';
import { NUMBER_TWO, NUMBER_FOUR } from '../../constants/NumberConstants';

const activismMonthly = 0;
const proxyMonthly = 2;
const specialReport = 1;

function isBtnEnableFn(item, token) {
  if (item.is_aim === undefined || item.is_aim === null || !item.is_aim) {
    return true;
  }
  if (
    token.MemberShip.some(
      (e) =>
        e.product_id === prodConst.ACTIVIST_INSIGHT_MONTHLY &&
        e.status === NUMBER_FOUR
    )
  ) {
    return true;
  }
  if (
    token.MemberShip.some(
      (e) =>
        e.product_id === prodConst.ACTIVIST_INSIGHT_MONTHLY &&
        e.status === NUMBER_TWO
    )
  ) {
    if (item.is_aim && item.is_latest_aim) {
      return true;
    }
    if (item.is_aim) {
      return false;
    }
  }
  if (
    token.MemberShip.some(
      (e) =>
        e.product_id === prodConst.ACTIVIST_INSIGHT_MONTHLY &&
        (e.status !== NUMBER_FOUR || e.status !== NUMBER_TWO)
    )
  ) {
    return false;
  }
}

export const searchAiMMagazineTextReq = createAsyncThunk(
  'searchAiMMagazineText',
  async (search) => {
    let myJson = [];
    const response = await SearchAiMMagazineText(search);
    const token = await TokenDecode();

    myJson = await Promise.all(
      response.data.map(async (item) => ({
        ...item,
        enableBtn: await isBtnEnableFn(item, token)
      }))
    );
    return { data: myJson, article_type_id: activismMonthly };
  }
);

/* for reference on product_ids
ACTIVISM = Activist Insight Online = AiO = 1
ACTIVIST_INSIGHT_MONTHLY = Activist Insight Monthly = AiM = 2
VOTING = Proxy Insight = PiO = 3
ACTIVIST_VULNERABILITY = Activist Insight Vulnerability = AiV = 4
ACTIVIST_SHORTS = Activist Insgith Shorts = AiS = 5
GOVERNANCE = Activist Insight Governance = AiG = 6
*/

export const getMagazinesReportListPortalReq = createAsyncThunk(
  'getMagazinesReportList',
  async () => {
    let myJson = [];
    let TopMyJson = [];
    const response = await getMagazinesReportList();
    const token = await TokenDecode();

    myJson = await Promise.all(
      response.data.map((item) => ({
        ...item,
        enableBtn: isBtnEnableFn(item, token)
      }))
    );
    TopMyJson = await Promise.all(
      response.top3Mag.map((item) => ({
        ...item,
        enableBtn: isBtnEnableFn(item, token)
      }))
    );
    return {
      data: myJson,
      article_type_id: activismMonthly,
      top3Mags: TopMyJson
    };
  }
);

export const getMagazinesReportListReq = createAsyncThunk(
  'getMagazinesReportList',
  async (obj) => {
    let myJson = [];
    let TopMyJson = [];
    const response = await getMagazinesReportList(
      obj.product_id,
      obj.article_type_list
    );
    const token = await TokenDecode();

    myJson = await Promise.all(
      response.data.map((item) => ({
        ...item,
        enableBtn: isBtnEnableFn(item, token)
      }))
    );
    TopMyJson = await Promise.all(
      response.top3Mag.map((item) => ({
        ...item,
        enableBtn: isBtnEnableFn(item, token)
      }))
    );
    return {
      data: myJson,
      product_id: obj.product_id,
      article_type_list: obj.article_type_list,
      top3Mags: TopMyJson,
      location: obj.location
    };
  }
);

export const GetMagazine_ProxyOrSpecialReports_insightiaListReq =
  createAsyncThunk(
    'GetMagazine_ProxyOrSpecialReports_insightiaList',
    async (Article_type_id) => {
      let myJson = [];
      const response = await GetMagazine_ProxyOrSpecialReports_insightiaList(
        Article_type_id
      );
      // myJson = await getMagazinesReportData(response);
      const token = await TokenDecode();

      myJson = await Promise.all(
        response.data.map((item) => ({
          ...item,
          enableBtn: isBtnEnableFn(item, token)
        }))
      );
      return { data: myJson, article_type_id: Article_type_id };
    }
  );

const MagazinesReportSlice = createSlice({
  name: 'magazinesReport',
  initialState: {
    magazinesReport_proxyMonthlyData: [],
    magazinesReport_specialReportData: [],
    magazinesReport_searchResults: [],

    // create initial states for each section of magazine
    magazinesReport_latestData: [],
    magazinesReport_activism_latestData: [],
    magazinesReport_activism_monthlyData: [],
    magazinesReport_activism_quarterlyStatsData: [],
    magazinesReport_activism_specialData: [],
    magazinesReport_activism_13FData: [],

    magazinesReport_voting_latestData: [],
    magazinesReport_voting_monthlyData: [],
    magazinesReport_voting_specialData: [],

    magazinesReport_shorts_latestData: [],
    magazinesReport_governance_latestData: [],

    magazinesReport_article_type_id: 0,
    magazinesReport_article_type_list: 0,
    magazinesReport_product_id: 0,
    btnIdForExpandData: false,
    viewPDFFileName: '',
    isLoadingMagazinesReport: true,
    magazinesReport3_data: [],
    magazinesReport_activismMonthlyDataSave: []
  },
  reducers: {
    handleViewPDFFileName: {
      reducer(state, action) {
        state.viewPDFFileName = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleMagazineIsLoading: {
      reducer(state) {
        state.magazinesReport_proxyMonthlyData = [];
        state.magazinesReport_specialReportData = [];
        state.magazinesReport_searchResults = [];

        state.magazinesReport_latestData = [];
        state.magazinesReport_activism_latestData = [];
        state.magazinesReport_activism_monthlyData = [];
        state.magazinesReport_activism_quarterlyStatsData = [];
        state.magazinesReport_activism_specialData = [];
        state.magazinesReport_activism_13FData = [];

        state.magazinesReport_voting_latestData = [];
        state.magazinesReport_voting_monthlyData = [];
        state.magazinesReport_voting_specialData = [];

        state.magazinesReport_shorts_latestData = [];
        state.magazinesReport_governance_latestData = [];

        state.magazinesReport_article_type_id = 0;
        state.magazinesReport_article_type_list = 0;
        state.magazinesReport_product_id = 0;
        state.btnIdForExpandData = false;
        state.viewPDFFileName = '';
        state.magazinesReport3_data = [];
        state.magazinesReport_activismMonthlyDataSave = [];
        state.isLoadingMagazinesReport = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleUpdateData: {
      reducer() {},
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },

    handleSetBtnIdForExpandData: {
      reducer(state, action) {
        state.btnIdForExpandData = action.payload.e;
        if (!action.payload.e) {
          // magazinesReport_product_id replace article_type_list
          if (
            current(state).magazinesReport_product_id === prodConst.ACTIVISM
          ) {
            const arr = current(state).magazinesReport_activismMonthlyDataSave;
            const newData = arr.map((x) => ({
              ...x,
              viewPdfBtn: false,
              moreInfoBtn: false,
              uniqueId: Math.random().toString(36).substr(2, 6)
            }));
            state.magazinesReport_activism_monthlyData = newData;
          }
          if (
            current(state).magazinesReport_article_type_id === specialReport
          ) {
            const arr = current(state).magazinesReport_specialReportDataSave;
            const newData = arr.map((x) => ({
              ...x,
              viewPdfBtn: false,
              moreInfoBtn: false,
              uniqueId: Math.random().toString(36).substr(2, 6)
            }));
            state.magazinesReport_specialReportData = newData;
          }
        }
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    }
  },
  extraReducers: {
    [getMagazinesReportListReq.fulfilled]: (state, action) => {
      // Latest
      state.magazinesReport_latestData =
      action.payload !== undefined ? action.payload.data : [];

      // ACTIVISM
      if (action.payload.product_id === prodConst.ACTIVISM) {
        if (pathConst.ACTIVISM_LATEST_REPORTS === action.payload.location) {
          state.magazinesReport_activism_latestData =
            action.payload !== undefined ? action.payload.data : [];
        }
        if (
          pathConst.ACTIVISM_QUARTERLY_STATS_REPORTS === action.payload.location
        ) {
          state.magazinesReport_activism_quarterlyStatsData =
            action.payload !== undefined ? action.payload.data : [];
        }
        if (pathConst.ACTIVISM_SPECIAL_REPORTS === action.payload.location) {
          state.magazinesReport_activism_specialData =
            action.payload !== undefined ? action.payload.data : [];
        }
        if (pathConst.ACTIVISM_13F_REPORTS === action.payload.location) {
          state.magazinesReport_activism_13FData =
            action.payload !== undefined ? action.payload.data : [];
        }
      }

      // // check if article type id is monthly
      // ACTIVISM > Monthly
      if (action.payload.product_id === prodConst.ACTIVIST_INSIGHT_MONTHLY) {
        if (pathConst.ACTIVISM_MONTHLY_REPORTS === action.payload.location) {
          state.magazinesReport_activism_monthlyData =
            action.payload !== undefined ? action.payload.data : [];
        }
      }

      // VOTING
      if (action.payload.product_id === prodConst.VOTING) {
        if (pathConst.VOTING_LATEST_REPORTS === action.payload.location) {
          state.magazinesReport_voting_latestData =
            action.payload !== undefined ? action.payload.data : [];
        }
        if (pathConst.VOTING_MONTHLY_REPORTS === action.payload.location) {
          state.magazinesReport_voting_monthlyData =
            action.payload !== undefined ? action.payload.data : [];
        }
        if (pathConst.VOTING_SPECIAL_REPORTS === action.payload.location) {
          state.magazinesReport_voting_specialData =
            action.payload !== undefined ? action.payload.data : [];
        }
      }

      // ACTIVIST_SHORTS
      if (action.payload.product_id === prodConst.ACTIVIST_SHORTS) {
        if (pathConst.SHORTS_LATEST_REPORTS === action.payload.location) {
          state.magazinesReport_shorts_latestData =
            action.payload !== undefined ? action.payload.data : [];
        }
      }

      // GOVERNANCE
      if (action.payload.product_id === prodConst.GOVERNANCE) {
        if (pathConst.GOVERNANCE_LATEST_REPORTS === action.payload.location) {
          state.magazinesReport_governance_latestData =
            action.payload !== undefined ? action.payload.data : [];
        }
      }

      state.magazinesReport_activismMonthlyDataSave =
        action.payload !== undefined ? action.payload.data : [];
      state.magazinesReport_article_type_list =
        action.payload !== undefined ? action.payload.article_type_list : 0;
      state.magazinesReport_product_id =
        action.payload !== undefined ? action.payload.product_id : 0;
      state.magazinesReport3_data =
        action.payload !== undefined ? action.payload.top3Mags : [];
      state.isLoadingMagazinesReport = false;
    },
    [GetMagazine_ProxyOrSpecialReports_insightiaListReq.fulfilled]: (
      state,
      action
    ) => {
      if (action.payload.article_type_id === proxyMonthly) {
        // Proxy Monthly
        state.magazinesReport_proxyMonthlyData =
          action.payload !== undefined ? action.payload.data : [];
        state.magazinesReport_proxyMonthlyDataSave =
          action.payload !== undefined ? action.payload.data : [];
        state.magazinesReport_article_type_id =
          action.payload !== undefined ? action.payload.article_type_id : 0;
      }
      if (action.payload.article_type_id === specialReport) {
        // Special Reports
        state.magazinesReport_specialReportData =
          action.payload !== undefined ? action.payload.data : [];
        state.magazinesReport_specialReportDataSave =
          action.payload !== undefined ? action.payload.data : [];
        state.magazinesReport_article_type_id =
          action.payload !== undefined ? action.payload.article_type_id : 0;
      }
      state.isLoadingMagazinesReport = false;
    },
    [searchAiMMagazineTextReq.fulfilled]: (state, action) => {
      state.magazinesReport_searchResults = action.payload.data;
      state.magazinesReport_activismMonthlyDataSave =
        action.payload !== undefined ? action.payload.data : [];
      state.magazinesReport_article_type_id =
        action.payload !== undefined ? action.payload.article_type_id : [];
      state.isLoadingMagazinesReport = false;
    }
  }
});

export const {
  handleSetBtnIdForExpandData,
  handleViewPDFFileName,
  handleMagazineIsLoading,
  handleUpdateData
} = MagazinesReportSlice.actions;

export default MagazinesReportSlice.reducer;
