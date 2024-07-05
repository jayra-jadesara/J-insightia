import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetAiSCompDisclosedShortPositions,
  GetHistoricShortPositions,
  GetAiSCompTotalShortPositions,
  Adm_Check_PID,
  ListActivistInvestorsForCompanyAiS,
  GetActivismSummary_AiS,
  GetCompanyOverviewProfile,
  GetFDAProductRecallListData
} from '../../../../utils/company-util';

export const getAiSCompDisclosedShortPositionsReq = createAsyncThunk(
  'activistShortsOverview_GetAiSCompDisclosedShortPositions',
  async (pid) => {
    const response = await GetAiSCompDisclosedShortPositions(pid);
    return response;
  }
);
export const getHistoricShortPositionsReq = createAsyncThunk(
  'activistShortsOverview_GetHistoricShortPositions',
  async (pid) => {
    const response = await GetHistoricShortPositions(pid);
    return response;
  }
);
export const getAiSCompTotalShortPositionsReq = createAsyncThunk(
  'activistShortsOverview_GetAiSCompTotalShortPositions',
  async (pid) => {
    const response = await GetAiSCompTotalShortPositions(pid);
    return response;
  }
);
export const getCompanyOverviewProfileReq = createAsyncThunk(
  'activistShortsOverview_GetCompanyOverviewProfile',
  async (pid) => {
    const response = await GetCompanyOverviewProfile(pid);
    return response;
  }
);
export const listActivistInvestorsForCompanyAiSReq = createAsyncThunk(
  'activistShortsOverview_ListActivistInvestorsForCompanyAiS',
  async (companyId) => {
    const response = await ListActivistInvestorsForCompanyAiS(companyId);
    return response;
  }
);
export const getActivismSummary_AiSReq = createAsyncThunk(
  'activistShortsOverview_GetActivismSummary_AiS',
  async (companyId) => {
    const response = await GetActivismSummary_AiS(companyId);
    return response;
  }
);

export const getFDAProductRecallListReq = createAsyncThunk(
  'activistShortsOverview_GetFDAProductRecallList',
  async (companyId) => {
    const response = await GetFDAProductRecallListData(companyId);
    return response;
  }
);

export const adm_Check_PIDReq = createAsyncThunk(
  'activistShortsOverview_adm_Check_PIDReq',
  async (pid) => {
    const response = await Adm_Check_PID(pid);
    return response;
  }
);
// export const adm_Check_PIDReq = async (pid) => {
//   const response = await Adm_Check_PID(pid);
//   return response;
// };

const ActivistShortsOverviewSlice = createSlice({
  name: 'companyActivistShortsOverview',
  initialState: {
    rowData_activistShortCurrentShortPosition: [],
    rowData_activistShortActivistInvestorsForCompany: [],
    rowData_activistShortHistoricShortPosition: [],
    rowData_activistShortTotalShortPosition: [],
    company_overview: {},
    activismshortCurrentShortPositionrowData: [],
    rowData_AiSInvestorForCompany: [],
    rowData_AiSActivismSummary: [],
    rowData_FDAProductRecallList: [],
    ddlShortSellerCampaignData: [],
    adm_Check_PID: {},
    isLoadingData: true
  },
  reducers: {
    handleResetActivistShortsOverview: {
      reducer(state) {
        state.rowData_activistShortCurrentShortPosition = [];
        state.rowData_activistShortHistoricShortPosition = [];
        state.rowData_activistShortActivistInvestorsForCompany = [];
        state.rowData_activistShortTotalShortPosition = [];
        state.company_overview = {};
        state.activismshortCurrentShortPositionrowData = [];
        state.rowData_AiSInvestorForCompany = [];
        state.rowData_AiSActivismSummary = [];
        state.rowData_FDAProductRecallList = [];
        state.ddlShortSellerCampaignData = [];
        state.adm_Check_PID = {};
        state.isLoadingData = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    }
  },
  extraReducers: {
    [adm_Check_PIDReq.fulfilled]: (state, action) => {
      state.adm_Check_PID = action.payload !== undefined ? action.payload : {};
      state.isLoadingData = action.payload === undefined;
    },
    [getAiSCompDisclosedShortPositionsReq.fulfilled]: (state, action) => {
      state.rowData_activistShortCurrentShortPosition =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingData = action.payload === undefined;
    },
    [getHistoricShortPositionsReq.fulfilled]: (state, action) => {
      state.rowData_activistShortHistoricShortPosition =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingData = action.payload === undefined;
    },
    [getAiSCompTotalShortPositionsReq.fulfilled]: (state, action) => {
      state.rowData_activistShortTotalShortPosition =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingData = action.payload === undefined;
    },
    [getCompanyOverviewProfileReq.fulfilled]: (state, action) => {
      state.company_overview =
        action.payload !== undefined &&
        action.payload.data !== undefined &&
        action.payload.data.length > 0
          ? action.payload.data[0]
          : {};
      state.isLoadingData = action.payload === undefined;
    },
    [listActivistInvestorsForCompanyAiSReq.fulfilled]: (state, action) => {
      state.rowData_AiSInvestorForCompany = action.payload !== undefined ? action.payload.data : [];
      if (
        action.payload !== undefined &&
        action.payload.data !== undefined &&
        action.payload.data.length > 0
      ) {
        state.ddlShortSellerCampaignData = action.payload.data.map(
          (investor) => ({
            label: investor.name,
            value: investor.campaign_summary_id
          })
        );
      } else {
        state.ddlShortSellerCampaignData = [];
      }
      state.isLoadingData = action.payload === undefined;
    },
    [getActivismSummary_AiSReq.fulfilled]: (state, action) => {
      state.rowData_AiSActivismSummary =
        action.payload !== undefined ? action.payload.data : [];
      state.isLoadingData = action.payload === undefined;
    },
    [getFDAProductRecallListReq.fulfilled]: (state, action) => {
      state.rowData_FDAProductRecallList = [];
      state.rowData_FDAProductRecallList =
        action.payload !== undefined && action.payload.data !== undefined && action.payload.data.length > 0
          ? action.payload.data
          : [];
      state.isLoadingData = action.payload === undefined;
    }
  }
});

export const { handleResetActivistShortsOverview } =
  ActivistShortsOverviewSlice.actions;

export default ActivistShortsOverviewSlice.reducer;
