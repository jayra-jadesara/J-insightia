import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { getActivistCampaignsDataListV2 } from '../../../../utils/company-util';
import products from '../../../../constants/ProductConstants';
import { AllowDownload } from '../../../../utils/general-util';
import numConst from '../../../../constants/NumberConstants';

function updateStateTable(table, selectedNodes) {
  let arr = [];
  if (selectedNodes.length > 0) {
    table.forEach((x) => {
      arr.push({
        ...x,
        rowHighlight: selectedNodes.some(
          (itemDDL) => itemDDL.label === x.campaign_name
        ),
      });
    });
  }

  if (
    selectedNodes.length === numConst.EMPTY_TABLE_LENGTH ||
    (selectedNodes[0] !== undefined && selectedNodes[0].value === null)
  ) {
    arr = [];
    table.forEach((x) => {
      arr.push({ ...x, rowHighlight: false });
    });
  }
  return arr;
}

export const getActivistCampaignsDataListReq = createAsyncThunk(
  'getActivistCampaignsDataListV2',
  async (req) => {
    const productsId = products.ACTIVISM;
    const { SetDDLCampaign } = req;
    let response = [];

    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option
    response = await getActivistCampaignsDataListV2(req);

    if (SetDDLCampaign === undefined) {
      return {
        data: {
          overviewData: [
            response.table_ActivistCampaignTimeline,
            response.table_ActivistCampaignSummary,
          ],
        },
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
    const table_News = updateStateTable(response.table_News, SetDDLCampaign);
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
          table_News,
          table_NewsId: response.table_NewsId,
          DDLCampaign,
        },
        allowDownload: resAllowDownload,
      };
      return responseObj;
    }
  }
);

const ActivistCampaignsSlice = createSlice({
  name: 'activistCampaigns',
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
    table_News: [],
    table_NewsId: [],
    table_ActivismOverviewTimeline: [],
    table_ActivismOverviewSummary: [],

    DDLCampaign: [],
    SetDDLCampaign: [{ label: 'All', value: null }],
    DDLValues: null,

    chkCampaign: false,
    trialStatus: false,
    allowDownload: true,
    isLoading: true,
  },
  reducers: {
    handleSetChkCampaign: {
      reducer(state, action) {
        state.chkCampaign = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetCampaignDDL: {
      reducer(state, action) {
        if (
          action.payload.selectedNodes !== null &&
          action.payload.selectedNodes.length > 0
        ) {
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
          table_StockPerformance,
          table_News,
        } = current(state);

        state.table_ActivistCampaignSummary = updateStateTable(
          table_ActivistCampaignSummary,
          current(state).SetDDLCampaign
        );

        Object.preventExtensions(state.table_PublicDemandDetail);

        state.table_PublicDemandDetail = updateStateTable(
          table_PublicDemandDetail,
          current(state).SetDDLCampaign
        );

        Object.preventExtensions(state.table_PublicDemandDetail);

        state.table_ActivistCampaignCharacteristics = updateStateTable(
          table_ActivistCampaignCharacteristics,
          current(state).SetDDLCampaign
        );
        state.table_Filings = updateStateTable(
          table_Filings,
          current(state).SetDDLCampaign
        );

        state.table_ActivistCampaignTimeline = updateStateTable(
          table_ActivistCampaignTimeline,
          current(state).SetDDLCampaign
        );
        state.table_Theses = updateStateTable(
          table_Theses,
          current(state).SetDDLCampaign
        );
        state.table_ShareholderProposals = updateStateTable(
          table_ShareholderProposals,
          current(state).SetDDLCampaign
        );
        state.table_Advisors = updateStateTable(
          table_Advisors,
          current(state).SetDDLCampaign
        );
        state.table_StockPerformance = updateStateTable(
          table_StockPerformance,
          current(state).SetDDLCampaign
        );
        state.table_News = updateStateTable(
          table_News,
          current(state).SetDDLCampaign
        );
      },
      prepare(selectedNodes) {
        return {
          payload: { selectedNodes },
        };
      },
    },
    handleIsLoading: {
      reducer(state, action) {
        state.isLoading = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
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
        state.table_News = [];
        state.table_NewsId = [];
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
          payload: { e },
        };
      },
    },
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
        state.table_News =
          action.payload !== undefined ? action.payload.data.table_News : [];
        state.table_NewsId =
          action.payload !== undefined ? action.payload.data.table_NewsId : [];

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
        state.isLoading = action.payload === undefined;
      }
    },
  },
});

export const {
  handleResetLoading,
  handleSetCampaignDDL,
  handleSetChkCampaign,
  handleIsLoading,
  handleResetCampaign,
} = ActivistCampaignsSlice.actions;

export default ActivistCampaignsSlice.reducer;
