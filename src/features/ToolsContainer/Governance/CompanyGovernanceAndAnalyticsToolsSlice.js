import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  oneChildtreeView,
  getTreeViewDDLSelection,
} from '../../../utils/general-util';
import {
  GetProvisionsList,
  GetActivistNomineeOnBoardList,
  GetStateOfIncorporationdList,
  GetGovernanceAdvSearchReq,
} from '../../../utils/companyGovernanceAndAnalyticsTools-utils';
import { NUMBER_ZERO } from '../../../constants/NumberConstants';

export const getProvisionsReq = createAsyncThunk(
  'getProvisionsReq',
  async () => {
    const response = await GetProvisionsList();
    return response;
  }
);

export const getActivistNomineeOnBoardReq = createAsyncThunk(
  'getActivistNomineeOnBoardReq',
  async () => {
    const response = await GetActivistNomineeOnBoardList();
    return response;
  }
);

export const getStateOfIncorporationList = createAsyncThunk(
  'getStateOfIncorporationdList',
  async () => {
    const response = await GetStateOfIncorporationdList();
    return response;
  }
);

export const getGovernanceAdvSearchReq = createAsyncThunk(
  'getGovernanceAdvSearchReq',
  async (req) => {
    const response = await GetGovernanceAdvSearchReq(
      req.company_search_id,
      req.StateOfIncorporation,
      req.BoardSizeMin,
      req.BoardSizeMax,
      req.PoisonPillOwnershipPcentMin,
      req.PoisonPillOwnershipPcentMax,
      req.PoisonPillExpiryDateMin,
      req.PoisonPillExpiryDateMax,
      req.AvgDirectorTimeMin,
      req.AvgDirectorTimeMax,
      req.AvgDirectorAgeMin,
      req.AvgDirectorAgeMax,
      req.AnyDirectorTimeMin,
      req.FemaleDirPcentMin,
      req.FemaleDirPcentMax,
      req.NomineeActivists,
      req.notParameters,
      req.yesParameters
    );
    return response;
  }
);

const initialState = {
  stateOfIncorporationSelection: [],
  lstStateOfIncorporationSelection: [],
  boardSizeMin: '',
  boardSizeMax: '',
  poisonPillOwnershipMin: '',
  poisonPillOwnershipMax: '',
  poisonPillExpiryDateMin: '', // new Date('2017-07-01'),
  poisonPillExpiryDateMax: '', // new Date('2018-06-30'),
  poisonPillExpiryDateChecked: false,
  avgDirectorTenureMin: '',
  avgDirectorTenureMax: '',
  avgAgeMin: '',
  avgAgeMax: '',
  directorTerm: '',
  currentFemaleDirectorMin: '',
  currentFemaleDirectorMax: '',
  provisionSelectionHas: [],
  provisionSelectionHasNot: [],
  listProvisionHasNot: [],
  listProvisionHas: [],
  activistNomineeOnBoardSelection: [],
  lstActivistNomineeOnBoard: [],
  governanceAdvSearch: [],

  // Loader
  isLoadingGovernanceAdvSearch: true,
};

const CompanyGovernanceAndAnalyticsToolsSlice = createSlice({
  name: 'companyGovernance',
  initialState,
  reducers: {
    handleResetCompanyGovernanceAndAnalyticsTool: {
      reducer(state, action) {
        state.stateOfIncorporationSelection = [];
        state.lstStateOfIncorporationSelection = [];
        state.boardSizeMin = '';
        state.boardSizeMax = '';
        state.poisonPillOwnershipMin = '';
        state.poisonPillOwnershipMax = '';
        state.poisonPillExpiryDateMin = ''; // new Date('2017-07-01'),
        state.poisonPillExpiryDateMax = ''; // new Date('2018-06-30'),
        state.poisonPillExpiryDateChecked = false;
        state.avgDirectorTenureMin = '';
        state.avgDirectorTenureMax = '';
        state.avgAgeMin = '';
        state.avgAgeMax = '';
        state.directorTerm = '';
        state.currentFemaleDirectorMin = '';
        state.currentFemaleDirectorMax = '';
        state.provisionSelectionHas = [];
        state.provisionSelectionHasNot = [];
        state.listProvisionHasNot = [];
        state.listProvisionHas = [];
        state.activistNomineeOnBoardSelection = [];
        state.lstActivistNomineeOnBoard = [];
        state.governanceAdvSearch = [];
        state.isLoadingGovernanceAdvSearch = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },

    handleStateOfIncorporationSelection: {
      reducer(state, action) {
        state.stateOfIncorporationSelection =
          action.payload.stateOfIncorporationSelection;
      },
      prepare(stateOfIncorporationSelection) {
        return {
          payload: { stateOfIncorporationSelection },
        };
      },
    },

    handleBoardSizeMin: {
      reducer(state, action) {
        state.boardSizeMin = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },

    handleBoardSizeMax: {
      reducer(state, action) {
        state.boardSizeMax = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },

    handlePoisonPillOwnershipMin: {
      reducer(state, action) {
        state.poisonPillOwnershipMin = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },
    handlePoisonPillOwnershipMax: {
      reducer(state, action) {
        state.poisonPillOwnershipMax = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },

    handlePoisonPillExpiryDateMin: {
      reducer(state, action) {
        if (action.payload !== null) {
          state.poisonPillExpiryDateMin = action.payload;
          state.poisonPillExpiryDateMax = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handlePoisonPillExpiryDateMax: {
      reducer(state, action) {
        if (action.payload !== null) {
          state.poisonPillExpiryDateMax = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handlePoisonPillExpiryDateChecked: {
      reducer(state, action) {
        if (action.payload !== null) {
          state.poisonPillExpiryDateChecked =
            !state.poisonPillExpiryDateChecked;
        }
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleAvgDirectorTenureMin: {
      reducer(state, action) {
        state.avgDirectorTenureMin = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },
    handleAvgDirectorTenureMax: {
      reducer(state, action) {
        state.avgDirectorTenureMax = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },

    handleAvgAgeMin: {
      reducer(state, action) {
        state.avgAgeMin = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/[^0-9]/g, ''),
        };
      },
    },
    handleAvgAgeMax: {
      reducer(state, action) {
        state.avgAgeMax = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/[^0-9]/g, ''),
        };
      },
    },

    handleDirectorTerm: {
      reducer(state, action) {
        state.directorTerm = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value.replace(/[^0-9]/g, ''),
        };
      },
    },

    handleCurrentFemaleDirectorMin: {
      reducer(state, action) {
        state.currentFemaleDirectorMin = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },
    handleCurrentFemaleDirectorMax: {
      reducer(state, action) {
        state.currentFemaleDirectorMax = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1'),
        };
      },
    },
    handleTreeViewProvisionHas: {
      reducer(state, action) {
        state.provisionSelectionHas = action.payload.selectedNodes;
        const oldJson = current(state).listProvisionHas;
        state.listProvisionHas = oneChildtreeView(oldJson, action);

        const selectionArray = action.payload.selectedNodes;
        const valuearr = [];

        state.listProvisionHas.forEach((e) => {
          selectionArray.forEach((x) => {
            if (e.value === x.value && x._depth === NUMBER_ZERO) {
              e.children.forEach((c) => {
                valuearr.push(c.value);
              });
              x.value = valuearr;
            }
          });
        });
        state.provisionSelectionHas = selectionArray;
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },
    handleTreeViewProvisionHasNot: {
      reducer(state, action) {
        state.provisionSelectionHasNot = action.payload.selectedNodes;
        const oldJson = current(state).listProvisionHasNot;
        state.listProvisionHasNot = oneChildtreeView(oldJson, action);

        const selectionArray = action.payload.selectedNodes;
        const valuearr = [];

        state.listProvisionHasNot.forEach((e) => {
          selectionArray.forEach((x) => {
            if (e.value === x.value && x._depth === NUMBER_ZERO) {
              e.children.forEach((c) => {
                valuearr.push(c.value);
              });
              x.value = valuearr;
            }
          });
        });
        state.provisionSelectionHasNot = selectionArray;
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes },
        };
      },
    },

    handleResetOnSearchClick: {
      reducer(state) {
        state.governanceAdvSearch = [];
        state.isLoadingGovernanceAdvSearch = true;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },

    handleActivistNomineeOnBoard: {
      reducer(state, action) {
        if (action.payload.activistNomineeOnBoardSelection === null) {
          state.activistNomineeOnBoardSelection = [];
        } else {
          state.activistNomineeOnBoardSelection =
            action.payload.activistNomineeOnBoardSelection;
        }
      },
      prepare(activistNomineeOnBoardSelection) {
        return {
          payload: { activistNomineeOnBoardSelection },
        };
      },
    },
    handleUpdateDataCompanyGovernanceAndAnalyticsToolsFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.stateOfIncorporationSelection =
          data.stateOfIncorporationSelection;
        state.boardSizeMin = data.boardSizeMin;
        state.boardSizeMax = data.boardSizeMax;
        state.poisonPillOwnershipMin = data.poisonPillOwnershipMin;
        state.poisonPillOwnershipMax = data.poisonPillOwnershipMax;
        state.poisonPillExpiryDateChecked = data.poisonPillExpiryDateChecked;
        state.poisonPillExpiryDateMin =
          data.poisonPillExpiryDateMin !== '' &&
          data.poisonPillExpiryDateMin !== null
            ? new Date(data.poisonPillExpiryDateMin)
            : '';
        state.poisonPillExpiryDateMax =
          data.poisonPillExpiryDateMax !== '' &&
          data.poisonPillExpiryDateMax !== null
            ? new Date(data.poisonPillExpiryDateMax)
            : '';
        state.avgDirectorTenureMin = data.avgDirectorTenureMin;
        state.avgDirectorTenureMax = data.avgDirectorTenureMax;
        state.avgAgeMin = data.avgAgeMin;
        state.avgAgeMax = data.avgAgeMax;
        state.directorTerm = data.directorTerm;
        state.currentFemaleDirectorMin = data.currentFemaleDirectorMin;
        state.currentFemaleDirectorMax = data.currentFemaleDirectorMax;
        state.activistNomineeOnBoardSelection =
          data.activistNomineeOnBoardSelection;

        const provisionSelectionHasArr = current(state).listProvisionHas;
        const provisionSelectionHasNotArr = current(state).listProvisionHasNot;

        let depth0_provisionSelectionHasArr = [];
        depth0_provisionSelectionHasArr = getTreeViewDDLSelection(
          data.provisionSelectionHas,
          provisionSelectionHasArr
        );
        let depth0_provisionSelectionHasNotArr = [];
        depth0_provisionSelectionHasNotArr = getTreeViewDDLSelection(
          data.provisionSelectionHasNot,
          provisionSelectionHasNotArr
        );

        if (data.provisionSelectionHas.length > 0) {
          state.listProvisionHas = depth0_provisionSelectionHasArr.depth0_Arr;
          const arr = [];
          data.provisionSelectionHas.map((x, index) => {
            if (index === 0) {
              arr.push({
                ...x,
                value: depth0_provisionSelectionHasArr.valueArr,
              });
            } else {
              arr.push({
                ...x,
                value: '',
              });
            }
          });
          state.provisionSelectionHas = arr;
        } else {
          const dataarr = [];
          provisionSelectionHasArr.map((x) => {
            if (!x.checked) {
              const arr = [];
              x.children.map((y) => {
                if (y.checked) {
                  arr.push({ ...y, checked: false });
                } else {
                  arr.push({ ...y });
                }
              });
              dataarr.push({ ...x, checked: false, children: arr });
            } else {
              dataarr.push({ ...x });
            }
          });
          state.listProvisionHas = dataarr;
          state.provisionSelectionHas = [];
        }

        if (data.provisionSelectionHasNot.length > 0) {
          state.provisionSelectionHasNot = data.provisionSelectionHasNot;
          state.listProvisionHasNot =
            depth0_provisionSelectionHasNotArr.depth0_Arr;
        } else {
          const dataarr = [];
          provisionSelectionHasNotArr.map((x) => {
            if (!x.checked) {
              const arr = [];
              x.children.map((y) => {
                if (y.checked) {
                  arr.push({ ...y, checked: false });
                } else {
                  arr.push({ ...y });
                }
              });
              dataarr.push({ ...x, checked: false, children: arr });
            } else {
              dataarr.push({ ...x });
            }
          });
          state.listProvisionHasNot = dataarr;
          state.provisionSelectionHasNot = [];
        }
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
  },
  extraReducers: {
    [getProvisionsReq.fulfilled]: (state, action) => {
      state.listProvisionHas = action.payload;
      state.listProvisionHasNot = action.payload;
    },
    [getActivistNomineeOnBoardReq.fulfilled]: (state, action) => {
      state.lstActivistNomineeOnBoard = action.payload;
    },
    [getStateOfIncorporationList.fulfilled]: (state, action) => {
      state.lstStateOfIncorporationSelection = action.payload;
    },
    [getGovernanceAdvSearchReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.governanceAdvSearch = action.payload;
        state.isLoadingGovernanceAdvSearch = action.payload === undefined;
      }
    },
  },
});

export const {
  handleStateOfIncorporationSelection,
  handleBoardSizeMin,
  handleBoardSizeMax,
  handlePoisonPillOwnershipMin,
  handlePoisonPillOwnershipMax,
  handlePoisonPillExpiryDateMin,
  handlePoisonPillExpiryDateMax,
  handlePoisonPillExpiryDateChecked,
  handleAvgDirectorTenureMin,
  handleAvgDirectorTenureMax,
  handleAvgAgeMin,
  handleAvgAgeMax,
  handleDirectorTerm,
  handleCurrentFemaleDirectorMin,
  handleCurrentFemaleDirectorMax,
  handleTreeViewProvisionHas,
  handleTreeViewProvisionHasNot,
  handleActivistNomineeOnBoard,
  handleResetOnSearchClick,
  handleResetCompanyGovernanceAndAnalyticsTool,
  handleUpdateDataCompanyGovernanceAndAnalyticsToolsFilters,
} = CompanyGovernanceAndAnalyticsToolsSlice.actions;
export default CompanyGovernanceAndAnalyticsToolsSlice.reducer;
