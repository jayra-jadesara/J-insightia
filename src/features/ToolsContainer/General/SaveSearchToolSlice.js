import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  UserSearchFilter_Create,
  UserSearchFilter_Update,
  UserSearchFilter_Delete,
  UserSearchFilter_Get,
} from '../../../utils/saveSearches-utils';

//#region save search

export const userSearchFilter_CreateReq = createAsyncThunk(
  'userSearchFilter_CreateReq',
  async (req) => {
    const resCrete = await UserSearchFilter_Create(req);
    const resDDL = await UserSearchFilter_Get(req);
    return { resCrete, resDDL };
  }
);
export const userSearchFilter_UpdateReq = createAsyncThunk(
  'userSearchFilter_UpdateReq',
  async (req) => {
    await UserSearchFilter_Update(req);
    const resDDL = await UserSearchFilter_Get(req);
    const resCrete = { filter_id: req.filter_id };
    return { resCrete, resDDL };
  }
);
export const userSearchFilter_DeleteReq = createAsyncThunk(
  'userSearchFilter_DeleteReq',
  async (req) => {
    await UserSearchFilter_Delete(req);
    const response = await UserSearchFilter_Get(req);
    return response;
  }
);
export const userSearchFilter_GetReq = createAsyncThunk(
  'userSearchFilter_GetReq',
  async (req) => {
    const response = await UserSearchFilter_Get(req);
    return response;
  }
);
//#endregion

const SaveSearchToolSlice = createSlice({
  name: 'saveSearchFilter',
  initialState: {
    saveSearchTextboxValue: '',
    isShow_SaveThisSearch_Modal: false,
    saveSearch_list: [],
    saveSearchDDLList: [],
    saveSearchedDDLSelection: null,
  },
  reducers: {
    handleSaveSearchTextboxValue: {
      reducer(state, action) {
        const data = action.payload.e;
        state.saveSearchTextboxValue = data;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleShow_SaveThisSearch_Modal: {
      reducer(state, action) {
        const data = action.payload.e;
        state.isShow_SaveThisSearch_Modal = data;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleSetSaveSearchedDDLSelection: {
      reducer(state, action) {
        const data = action.payload.e;
        state.saveSearchedDDLSelection = data;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
  },
  extraReducers: {
    // save search
    [userSearchFilter_CreateReq.fulfilled]: (state, action) => {
      const saveSearchDDLList =
        action.payload !== undefined ? action.payload.resDDL.ddllist : [];
      const saveSearch_list =
        action.payload !== undefined ? action.payload.resDDL.data : [];

      state.saveSearch_list = saveSearch_list;
      state.saveSearchDDLList = saveSearchDDLList;

      const labelSelection = saveSearchDDLList.filter(
        (x) =>
          x.value ===
          (action.payload.resCrete.data.length > 0
            ? action.payload.resCrete.data[0].filter_id
            : 0)
      );

      state.saveSearchedDDLSelection =
        labelSelection.length > 0 ? labelSelection[0] : null;
      state.saveSearchTextboxValue = '';
    },
    [userSearchFilter_UpdateReq.fulfilled]: (state, action) => {
      const saveSearchDDLList =
        action.payload !== undefined ? action.payload.resDDL.ddllist : [];
      const saveSearch_list =
        action.payload !== undefined ? action.payload.resDDL.data : [];

      state.saveSearch_list = saveSearch_list;
      state.saveSearchDDLList = saveSearchDDLList;

      const labelSelection = saveSearchDDLList.filter(
        (x) =>
          x.value ===
          (action.payload.resCrete ? action.payload.resCrete.filter_id : 0)
      );

      state.saveSearchedDDLSelection =
        labelSelection.length > 0 ? labelSelection[0] : null;
      state.saveSearchTextboxValue =
        labelSelection.length > 0 ? labelSelection[0].label : '';
    },
    [userSearchFilter_DeleteReq.fulfilled]: (state, action) => {
      state.saveSearchedDDLSelection = null;
      state.saveSearch_list =
        action.payload !== undefined ? action.payload.data : [];
      state.saveSearchDDLList =
        action.payload !== undefined ? action.payload.ddllist : [];
    },
    [userSearchFilter_GetReq.fulfilled]: (state, action) => {
      state.saveSearchedDDLSelection = null;
      state.saveSearch_list =
        action.payload !== undefined ? action.payload.data : [];
      state.saveSearchDDLList =
        action.payload !== undefined ? action.payload.ddllist : [];
    },
  },
});

export const {
  handleSaveSearchTextboxValue,
  handleShow_SaveThisSearch_Modal,
  handleSetSaveSearchedDDLSelection,
} = SaveSearchToolSlice.actions;

export default SaveSearchToolSlice.reducer;
