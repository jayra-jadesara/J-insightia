import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  getActivistCampaignsDataList,
  ActivistCampiagnDummyData,
  GetActivistShortCampaignAdvisersData,
  GetInvestorIdFromCampaignIdData
} from '../../../utils/company-util';
import products from '../../../constants/ProductConstants';
import { HandleTrialLog, AllowDownload } from '../../../utils/general-util';
import numConst from '../../../constants/NumberConstants';

export const getActivistCampaignsDataListReq = createAsyncThunk(
  'getActivistCampaignsDataList',
  async (res) => {
    let TrialStatus = false;
    const productsId = products.ACTIVISM;
    const { SetDDLCampaign } = res;
    let response = [];

    const resTrial = await HandleTrialLog(productsId); // Trial User Check
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option

    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }

    if (TrialStatus) {
      const trialResponse = await ActivistCampiagnDummyData();
      response = trialResponse !== undefined ? trialResponse.data : [];
    } else {
      response = await getActivistCampaignsDataList(res);
    }

    if (SetDDLCampaign === undefined) {
      return {
        data: {
          overviewData: [
            response.table_ActivistCampaignTimeline,
            response.table_ActivistCampaignSummary
          ]
        }
      };
    }
    const table_ActivistCampaignSummary = updateStateTable(
      response.table_ActivistCampaignSummary,
      SetDDLCampaign
    );
    const table_PublicDemandDetail = updateStateTable(
      response.table_PublicDemandDetail,
      SetDDLCampaign
    );
    const table_ActivistCampaignCharacteristics = updateStateTable(
      response.table_ActivistCampaignCharacteristics,
      SetDDLCampaign
    );
    const table_Filings = updateStateTable(
      response.table_Filings,
      SetDDLCampaign
    );
    const header_ActivistCampaignSummary =
      response.header_ActivistCampaignSummary;
    const table_ActivistCampaignTimeline = updateStateTable(
      response.table_ActivistCampaignTimeline,
      SetDDLCampaign
    );
    const table_Theses = updateStateTable(
      response.table_Theses,
      SetDDLCampaign
    );
    const table_ShareholderProposals = updateStateTable(
      response.table_ShareholderProposals,
      SetDDLCampaign
    );
    const table_Advisors = updateStateTable(
      response.table_Advisors,
      SetDDLCampaign
    );
    const table_StockPerformance = updateStateTable(
      response.table_StockPerformance,
      SetDDLCampaign
    );

    const DDLCampaign = response.myJsonDDLNewCampaign;

    if (SetDDLCampaign !== undefined) {
      const responseObj = {
        data: {
          table_ActivistCampaignSummary,
          table_PublicDemandDetail,
          header_ActivistCampaignSummary,
          table_ActivistCampaignCharacteristics,
          table_Filings,
          table_ActivistCampaignTimeline,
          table_Theses,
          table_ShareholderProposals,
          table_Advisors,
          table_StockPerformance,
          DDLCampaign
        },
        trialStatus: TrialStatus,
        allowDownload: resAllowDownload
      };
      return responseObj;
    }
  }
);
export const getActivistShortCampaignAdvisersDataReq = createAsyncThunk(
  'getActivistShortCampaignAdvisersDataReq',
  async (campaign_id) => {
    const response = await GetActivistShortCampaignAdvisersData(campaign_id);
    return response;
  }
);

export const getInvestorIdFromCampaignIdDataReq = createAsyncThunk(
  'getInvestorIdFromCampaignIdDataReqThunk',
  async (campaign_id) => {
    const response = await GetInvestorIdFromCampaignIdData(campaign_id);
    return response;
  }
);

function updateStateTable(table, selectedNodes) {
  let arr = [];
  if (selectedNodes.length > 0) {
    table.forEach((x) => {
      arr.push({
        ...x,
        rowHighlight: selectedNodes.some(
          (itemDDL) => itemDDL.label === x.campaign_name
        )
      });
    });
  }
  if (
    selectedNodes.length === numConst.EMPTY_TABLE_LENGTH ||
    selectedNodes[0].value === '0'
  ) {
    arr = [];
    table.forEach((x) => {
      arr.push({ ...x, rowHighlight: false });
    });
  }
  return arr;
}

const ActivistShortCampaignsSlice = createSlice({
  name: 'activistShortCampaigns',
  initialState: {
    table_ActivistCampaignSummary: [],
    table_PublicDemandDetail: [],
    header_ActivistCampaignSummary: [],
    table_ActivistCampaignCharacteristics: [],
    table_Filings: [],
    table_ActivistCampaignTimeline: [],
    table_Theses: [],
    table_ShareholderProposals: [],
    table_Advisors: [],
    table_StockPerformance: [],
    table_ActivismOverviewTimeline: [],
    table_ActivismOverviewSummary: [],

    tbl_avdviser_activist_short: [],
    investor_data: [],
    DDLCampaign: [],
    SetDDLCampaign: [{ label: 'All', value: null }],
    DDLValues: null,

    chkCampaign: false,
    trialStatus: false,
    allowDownload: true,
    isLoading: true
  },
  reducers: {
    handleSetChkCampaign: {
      reducer(state, action) {
        state.chkCampaign = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleSetCampaignDDL: {
      reducer(state, action) {
        if (action.payload.selectedNodes.length > 0) {
          if (action.payload.selectedNodes[0].value === null) {
            state.SetDDLCampaign = action.payload.selectedNodes.slice(1);
          } else {
            state.SetDDLCampaign = action.payload.selectedNodes;
          }
        } else {
          state.SetDDLCampaign = [{ label: 'All', value: null }];
        }

        const values = state.SetDDLCampaign.map((x) => x.value).toString();
        if (values !== '' && values !== '0') {
          state.DDLValues = values;
        } else {
          state.DDLValues = null;
        }

        const {
          table_ActivistCampaignSummary,
          table_PublicDemandDetail,
          table_ActivistCampaignCharacteristics,
          table_Filings,
          table_ActivistCampaignTimeline,
          table_Theses,
          table_ShareholderProposals,
          table_Advisors,
          table_StockPerformance
        } = current(state);

        state.table_ActivistCampaignSummary = updateStateTable(
          table_ActivistCampaignSummary,
          action.payload.selectedNodes
        );

        Object.preventExtensions(state.table_PublicDemandDetail);

        state.table_PublicDemandDetail = updateStateTable(
          table_PublicDemandDetail,
          action.payload.selectedNodes
        );

        Object.preventExtensions(state.table_PublicDemandDetail);

        state.table_ActivistCampaignCharacteristics = updateStateTable(
          table_ActivistCampaignCharacteristics,
          action.payload.selectedNodes
        );
        state.table_Filings = updateStateTable(
          table_Filings,
          action.payload.selectedNodes
        );

        state.table_ActivistCampaignTimeline = updateStateTable(
          table_ActivistCampaignTimeline,
          action.payload.selectedNodes
        );
        state.table_Theses = updateStateTable(
          table_Theses,
          action.payload.selectedNodes
        );
        state.table_ShareholderProposals = updateStateTable(
          table_ShareholderProposals,
          action.payload.selectedNodes
        );
        state.table_Advisors = updateStateTable(
          table_Advisors,
          action.payload.selectedNodes
        );
        state.table_StockPerformance = updateStateTable(
          table_StockPerformance,
          action.payload.selectedNodes
        );
      },
      prepare(selectedNodes) {
        return {
          payload: { selectedNodes }
        };
      }
    },
    handleIsLoading: {
      reducer(state, action) {
        state.isLoading = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleResetCampaign: {
      reducer(state) {
        state.table_ActivistCampaignSummary = [];
        state.table_PublicDemandDetail = [];
        state.table_ActivistCampaignCharacteristics = [];
        state.table_Filings = [];
        state.table_ActivistCampaignTimeline = [];
        state.table_Theses = [];
        state.table_ShareholderProposals = [];
        state.table_Advisors = [];
        state.table_StockPerformance = [];
        state.table_ActivismOverviewTimeline = [];
        state.table_ActivismOverviewSummary = [];
        state.DDLCampaign = [];
        state.SetDDLCampaign = [{ label: 'All', value: null }];
        state.DDLValues = null;
        state.chkCampaign = false;
        state.trialStatus = false;
        state.allowDownload = true;
        state.isLoading = true;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    }
  },
  extraReducers: {
    [getActivistCampaignsDataListReq.fulfilled]: (state, action) => {
      if (!action.payload.data.overviewData) {
        state.DDLCampaign =
          action.payload !== undefined ? action.payload.data.DDLCampaign : [];
        state.table_ActivistCampaignSummary =
          action.payload !== undefined
            ? action.payload.data.table_ActivistCampaignSummary
            : [];
        state.table_PublicDemandDetail =
          action.payload !== undefined
            ? action.payload.data.table_PublicDemandDetail
            : [];
        state.header_ActivistCampaignSummary =
          action.payload !== undefined
            ? action.payload.data.header_ActivistCampaignSummary
            : [];
        state.table_ActivistCampaignCharacteristics =
          action.payload !== undefined
            ? action.payload.data.table_ActivistCampaignCharacteristics
            : [];
        state.table_Filings =
          action.payload !== undefined ? action.payload.data.table_Filings : [];
        state.table_ActivistCampaignTimeline =
          action.payload !== undefined
            ? action.payload.data.table_ActivistCampaignTimeline
            : [];
        state.table_Theses =
          action.payload !== undefined ? action.payload.data.table_Theses : [];
        state.table_ShareholderProposals =
          action.payload !== undefined
            ? action.payload.data.table_ShareholderProposals
            : [];
        state.table_Advisors =
          action.payload !== undefined
            ? action.payload.data.table_Advisors
            : [];
        state.table_StockPerformance =
          action.payload !== undefined
            ? action.payload.data.table_StockPerformance
            : [];

        state.trialStatus =
          action.payload !== undefined ? action.payload.trialStatus : false;
        state.allowDownload =
          action.payload !== undefined ? action.payload.allowDownload : true;
        state.isLoading = action.payload === undefined;
      } else {
        state.table_ActivismOverviewTimeline =
          action.payload !== undefined
            ? action.payload.data.overviewData[0]
            : [];
        state.table_ActivismOverviewSummary =
          action.payload !== undefined
            ? [].concat(action.payload.data.overviewData[1])
            : [];
      }
    },
    [getActivistShortCampaignAdvisersDataReq.fulfilled]: (state, action) => {
      state.tbl_avdviser_activist_short = action.payload !== undefined ? action.payload : [];
    },
    [getInvestorIdFromCampaignIdDataReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.investor_data =
          action.payload !== undefined ? action.payload : [];
      }
    }
  }
});

export const {
  handleResetLoading,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  handleResetCampaign
} = ActivistShortCampaignsSlice.actions;

export default ActivistShortCampaignsSlice.reducer;
