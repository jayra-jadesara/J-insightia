import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  getVotingToolNoActionLetterDDL,
  getVotingToolNoActionLetterAnalysisData,
  getNoActionLetterDummyData,
} from '../../../utils/tools-util';
import {
  threeLayerTreeView,
  HandleTrialLog,
  AllowDownload,
  GetVotingResultsPageTrialList,
  getTreeViewDDLSelection,
} from '../../../utils/general-util';
import products from '../../../constants/ProductConstants';
import { GetPeerGroupsData } from '../../../utils/preferences-util';
import { GetNoActionTrackInfo } from '../../../utils/company-util';
import {
  NUMBER_ZERO,
  NUMBER_TWO,
  NUMBER_ONE,
  NUMBER_THREE,
} from '../../../constants/NumberConstants';
import { TRIAL_USER } from '../../../constants/CompanyTrialTypeConstants';

// #region No action letters
const startDate = new Date('01/05/15');
const endDate = new Date();

export const getVotingToolNoActionLetterDDLReq = createAsyncThunk(
  'getVotingToolNoActionLetterDDL',
  async () => {
    const response = await getVotingToolNoActionLetterDDL();
    return response;
  }
);

export const getVotingToolNoActionLetterAnalysisDataReq = createAsyncThunk(
  'getVotingToolNoActionLetterAnalysisData',
  async (res) => {
    let TrialStatus = false;
    const productsId = products.VOTING;
    const resTrial = await HandleTrialLog(productsId); // Trial User Check
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option
    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }

    let response = [];
    if (TrialStatus) {
      response = await getNoActionLetterDummyData();
    } else {
      response = await getVotingToolNoActionLetterAnalysisData(res);
    }

    if (response.data !== undefined) {
      return {
        ...response.data,
        TrialStatus_NoActionLetter: TrialStatus,
        allowDownload_NoActionLetter: resAllowDownload,
      };
    }
    return {
      ...response,
      TrialStatus_NoActionLetter: TrialStatus,
      allowDownload_NoActionLetter: resAllowDownload,
    };
  }
);

export const getPeerGroupDataReq = createAsyncThunk(
  'votingToolsGetPeerGroupDataReq',
  async (req) => {
    const responsePeerGroups = await GetPeerGroupsData();
    return {
      responsePeerGroups,
      companyOption: req.comp,
      investerOption: req.inve,
    };
  }
);

export const getNoActionTrackInfoReq = createAsyncThunk(
  'VottingToolGetNoActionTrackInfo',
  async (res) => {
    let TrialStatus = false;
    const productsId = products.VOTING;
    const { meeting_id } = res;
    const resTrial = await HandleTrialLog(productsId); // Trial User Check
    const resAllowDownload = await AllowDownload(productsId); // Allow Download Option

    if (resTrial !== undefined) {
      TrialStatus = resTrial.response;
    }

    if (TrialStatus) {
      const responseList = await GetVotingResultsPageTrialList();
      const responseObj = {
        responseList: responseList.GetVoteResults_v3,
        TrialStatus_VotingNoActionLetters: TrialStatus,
        meetingId: meeting_id,
        allowDownload: resAllowDownload,
      };
      return responseObj;
    }
    const responseList = await GetNoActionTrackInfo(res);
    const responseObj = {
      responseList,
      TrialStatus_VotingNoActionLetters: TrialStatus,
      meetingId: meeting_id,
      allowDownload: resAllowDownload,
    };
    return responseObj;
  }
);
// #endregion

const VotingToolsSlice = createSlice({
  name: 'votingTool',
  initialState: {
    // #region No action letters
    // filter
    startInvCompDate: startDate,
    endInvCompDate: endDate,
    isInvCompDateChecked: true,
    filterByCompanySelection: null,
    filterByInvestorSelection: null,
    isResetInvestorPeerGroupSelection: false,
    isResetCompanyPeerGroupSelection: false,
    //
    DDLShareholderProposalCategory: [],
    SetDDLShareholderProposalCategory: [],
    DDLProponent: [],
    individualProponentSelection: {},
    isCheckedOutcomeFieldsData: false,
    isCheckedOutcomeFieldsAnalysis: false,
    outcomeFieldsSelection: 0,
    isDateChecked: true,
    selection_ByShareholderProposalCategory: '',
    selection_ByShareholderProposalSubCategory: '',
    selection_ByShareholderProposalType: '',
    chartProposalsBy: [],
    chartProposalsThatWentToAVote: [],
    tableSupportfromTop20Investors: undefined,
    tableAverage: undefined,
    tableAverageHeading: [],
    tableISS: [],
    tableISSHeading: [],
    tableGL: [],
    tableGLHeading: [],
    loadingDataNoactionLetters: false,
    TrialStatus_NoActionLetter: false,
    allowDownload_NoActionLetter: true,
    noActionLettersList: [],
    // #endregion
  },
  reducers: {
    // #region No action letters
    handleStartDateSelection: {
      reducer(state, action) {
        state.startInvCompDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: value, e },
        };
      },
    },
    handleEndDateSelection: {
      reducer(state, action) {
        state.endInvCompDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: value, e },
        };
      },
    },
    handleProponentGroupsearch: {
      reducer(state, action) {
        state.isProponentGroup = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIndividualProponentSelection: {
      reducer(state, action) {
        state.individualProponentSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIndividualProponentSelection_v2: {
      reducer(state, action) {
        state.isCheckedOutcomeFieldsData = false;
        state.isCheckedOutcomeFieldsAnalysis = true;
        state.individualProponentSelection =
          action.payload !== undefined
            ? action.payload.e[0]
            : state.DDLProponent[0];
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleShareHolderProposalType_v2: {
      reducer(state, action) {
        state.isCheckedOutcomeFieldsData = false;
        state.isCheckedOutcomeFieldsAnalysis = true;
        state.DDLShareholderProposalCategory =
          action.payload !== undefined
            ? action.payload.e
            : state.DDLShareholderProposalCategory;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    HandleTreeviewShareholderProposalCategory: {
      reducer(state, action) {
        state.SetDDLShareholderProposalCategory = action.payload.selectedNodes;
        const selectedArea = action.payload.selectedNodes;
        const depth1_Array = selectedArea
          .filter((item) => item._depth === NUMBER_ONE)
          .map((item) => item.value);
        const depth2_Array = selectedArea
          .filter((item) => item._depth === NUMBER_TWO)
          .map((item) => item.value);
        const depth3_Array = selectedArea
          .filter((item) => item._depth === NUMBER_THREE)
          .map((item) => item.value);

        const selection_Main = depth1_Array.toString();
        const selection_Category = depth2_Array.toString();
        const selection_SubCategory = depth3_Array.toString();

        // state.selection_ByShareholderProposalCategory = depth1_Array.toString();
        // state.selection_ByShareholderProposalSubCategory = depth2_Array.toString();
        // state.selection_ByShareholderProposalType = depth3_Array.toString();

        state.selection_ByShareholderProposalType = `${selection_Main},${selection_Category},${selection_SubCategory}`;

        const oldJson = current(state).DDLShareholderProposalCategory;
        if (
          action.payload.currentNode._depth === NUMBER_ZERO &&
          action.payload.currentNode.checked
        ) {
          state.SetDDLShareholderProposalCategory = oldJson; // CHECKED_ALL;
        }
        state.DDLShareholderProposalCategory = threeLayerTreeView(
          oldJson,
          action
        );
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleOutcomeFieldsChecked: {
      reducer(state, action) {
        state.isCheckedOutcomeFieldsData = false;
        state.isCheckedOutcomeFieldsAnalysis = false;

        const OUTCOME_FIELDS_DATA = 0;
        const OUTCOME_FIELDS_ANALYSIS = 1;
        switch (action.payload.e) {
          case OUTCOME_FIELDS_DATA:
            state.isCheckedOutcomeFieldsData = true;
            state.isCheckedOutcomeFieldsAnalysis = false;
            state.outcomeFieldsSelection = OUTCOME_FIELDS_DATA;
            break;
          case OUTCOME_FIELDS_ANALYSIS:
            state.isCheckedOutcomeFieldsData = false;
            state.isCheckedOutcomeFieldsAnalysis = true;
            state.outcomeFieldsSelection = OUTCOME_FIELDS_ANALYSIS;
            break;
          default:
            break;
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIsDateChecked: {
      reducer(state, action) {
        state.isDateChecked = action.payload.isChecked;
      },
      prepare(e) {
        return {
          payload: { isChecked: e.target.checked },
        };
      },
    },
    handleClearPeerGroupCompanySelection_v2: {
      reducer(state) {
        state.companyPeerGroupSelection = undefined;
        state.investorPeerGroupSelection = undefined;
        state.isResetCompanyPeerGroupSelection = true;
        state.isResetInvestorPeerGroupSelection = true;
        state.filterByCompanySelection = null;
      },
      prepare() {
        return {};
      },
    },
    handleComapnySearchSelection: {
      reducer(state, action) {
        state.companyPeerGroupSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetupOutputFields: {
      reducer(state, action) {
        state.isCheckedOutcomeFieldsData = action.payload.e !== TRIAL_USER;
        state.isCheckedOutcomeFieldsAnalysis = action.payload.e === TRIAL_USER;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleResetNoActiontool: {
      reducer(state, action) {
        state.noActionLettersList = undefined;
        state.chartProposalsBy = [];
        state.chartProposalsThatWentToAVote = [];
        state.tableSupportfromTop20Investors = [];
        state.tableAverage = [];
        state.tableAverageHeading = [];
        state.tableISS = [];
        state.tableGL = [];
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleUpdateDataNoActionLetterFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.individualProponentSelection = data.individualProponentSelection;
        state.isDateChecked = data.isDateChecked;
        state.startInvCompDate = new Date(data.startInvCompDate);
        state.endInvCompDate = new Date(data.endInvCompDate);

        const DDLShareholderProposalCategoryArr =
          current(state).DDLShareholderProposalCategory;

        const { depth0_Arr, depthValue } = getTreeViewDDLSelection(
          data.DDLShareholderProposalCategory,
          DDLShareholderProposalCategoryArr
        );
        if (data.DDLShareholderProposalCategory.length > 0) {
          state.SetDDLShareholderProposalCategory =
            data.DDLShareholderProposalCategory;
          state.DDLShareholderProposalCategory = depth0_Arr;
          state.selection_ByShareholderProposalType = depthValue;
        }
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
    // #endregion
  },
  extraReducers: {
    // #region No action letters
    [getVotingToolNoActionLetterDDLReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.DDLShareholderProposalCategory =
          action.payload !== undefined
            ? action.payload.DDLShareholderProposalCategory
            : [];

        state.DDLProponent =
          action.payload !== undefined ? action.payload.DDLProponent : [];
        state.individualProponentSelection =
          action.payload !== undefined ? action.payload.DDLProponent[0] : [];
      }
    },
    [getVotingToolNoActionLetterAnalysisDataReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        const chartJson_ProposalsThatWentToaVote = [];
        action.payload.chartProposalsThatWentToAVote.forEach((e) => {
          chartJson_ProposalsThatWentToaVote.push({
            meeting_year: e.meeting_date,
            Proposals: e.total_number_graph,
            pop_num: 0,
            Support:
              e.avg_for_pcent_graph !== null
                ? Number(e.avg_for_pcent_graph).toFixed(2)
                : null,
            'ISS* For':
              e.ISS_for_pcent_graph !== null
                ? Number(e.ISS_for_pcent_graph).toFixed(2)
                : null,
            'GL For':
              e.GL_for_pcent_graph !== null
                ? Number(e.GL_for_pcent_graph).toFixed(2)
                : null,
            ceiling: 100,
            floor: 0,
          });
        });

        state.chartProposalsBy =
          action.payload !== undefined ? action.payload.chartProposalsBy : [];
        state.chartProposalsThatWentToAVote =
          action.payload !== undefined
            ? chartJson_ProposalsThatWentToaVote
            : []; // action.payload.chartProposalsThatWentToAVote : [];
        state.tableSupportfromTop20Investors = [];
        state.tableSupportfromTop20Investors =
          action.payload !== undefined
            ? action.payload.tableSupportfromTop20Investors
            : [];
        state.tableAverage = [];
        state.tableAverage =
          action.payload !== undefined ? action.payload.tableAverage.data : [];
        state.tableAverageHeading =
          action.payload !== undefined
            ? action.payload.tableAverage.heading
            : [];
        state.tableISS =
          action.payload !== undefined ? action.payload.tableISS.data : [];
        state.tableISSHeading =
          action.payload !== undefined ? action.payload.tableISS.heading : [];
        state.tableGL =
          action.payload !== undefined ? action.payload.tableGL.data : [];
        state.tableGLHeading =
          action.payload !== undefined ? action.payload.tableGL.heading : [];
        state.TrialStatus_NoActionLetter =
          action.payload !== undefined
            ? action.payload.TrialStatus_NoActionLetter
            : false;
        state.allowDownload_NoActionLetter =
          action.payload !== undefined
            ? action.payload.allowDownload_NoActionLetter
            : true;

        state.loadingDataNoactionLetters = action.payload !== undefined;
      }
    },
    [getPeerGroupDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (state.isResetCompanyPeerGroupSelection === false) {
          if (action.payload.companyOption !== undefined) {
            state.companyPeerGroupSelection = action.payload.companyOption;
            state.filterByCompanySelection = action.payload.companyOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.company_peer_group !== undefined
          ) {
            state.companyPeerGroupSelection =
              action.payload.responsePeerGroups.company_peer_group;
            state.filterByCompanySelection =
              action.payload.responsePeerGroups.company_peer_group.value;
          }
        }
        if (state.isResetInvestorPeerGroupSelection === false) {
          if (action.payload.investerOption !== undefined) {
            state.investorPeerGroupSelection = action.payload.investerOption;
            state.filterByInvestorSelection =
              action.payload.investerOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.investor_peer_group !== undefined
          ) {
            state.investorPeerGroupSelection =
              action.payload.responsePeerGroups.investor_peer_group;
            state.filterByInvestorSelection =
              action.payload.responsePeerGroups.investor_peer_group.value;
          }
        }
      }
    },
    [getNoActionTrackInfoReq.fulfilled]: (state, action) => {
      state.noActionLettersList =
        action.payload.responseList.data !== undefined
          ? action.payload.responseList.data
          : [];
      state.TrialStatus_NoActionLetter =
        action.payload !== undefined
          ? action.payload.TrialStatus_VotingNoActionLetters
          : false;
      state.allowDownload_NoActionLetter =
        action.payload !== undefined ? action.payload.allowDownload : true;
      state.loadingDataNoactionLetters =
        action.payload.responseList.data !== undefined;
    },
    // #endregion
  },
});

export const {
  // #region No action letters
  handleEndDateSelection,
  handleStartDateSelection,
  handleProponentGroupsearch,
  handleIndividualProponentSelection,
  handleIndividualProponentSelection_v2,
  handleShareHolderProposalType_v2,
  HandleTreeviewShareholderProposalCategory,
  handleOutcomeFieldsChecked,
  handleIsDateChecked,
  handleClearPeerGroupCompanySelection_v2,
  handleComapnySearchSelection,
  handleSetupOutputFields,
  handleResetNoActiontool,
  handleUpdateDataNoActionLetterFilters,
  // #endregion
} = VotingToolsSlice.actions;

export default VotingToolsSlice.reducer;
