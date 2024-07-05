import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TokenDecode } from '../../../utils/general-util';

import {
  listPowerSearchFilter,
  createPowerSearchFilter,
  updatePowerSearchFilter,
  deletePowerSearchFilter
} from '../../../utils/powerSearch-utils';

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const listPowerSearchFilterReq = createAsyncThunk('listPowerSearchFilterReq', async (obj) => {
  const response = await listPowerSearchFilter(obj);
  return response;
});

export const createPowerSearchFilterReq = createAsyncThunk('createPowerSearchFilterReq', async (obj) => {
  const response = await createPowerSearchFilter(obj);
  return response;
});

export const updatePowerSearchFilterReq = createAsyncThunk('updatePowerSearchFilterReq', async (obj) => {
  const response = await updatePowerSearchFilter(obj);
  return response;
});

export const deletePowerSearchFilterReq = createAsyncThunk('deletePowerSearchFilterReq', async (obj) => {
  const response = await deletePowerSearchFilter(obj);
  return response;
});

const PowerSearchSlice = createSlice({
  name: 'powersearch',
  initialState: {
    listFilter: [],
    deleteFilter: [],
    createFilter: [],
    updateFilter: [],
    getTokenDecode: []
  },
  reducers: {
    handleDeleteFilterLocally: {
      reducer() {
        // state.listFilter = action.payload.listFilter;
      },
      prepare(listFilter) {
        return {
          payload: { listFilter }
        };
      }
    }
  },
  extraReducers: {
    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
    [listPowerSearchFilterReq.fulfilled]: (state, action) => {
      state.listFilter = action.payload;
    },
    [deletePowerSearchFilterReq.fulfilled]: (state, action) => {
      state.deleteFilter = action.payload;
    },
    [createPowerSearchFilterReq.fulfilled]: (state, action) => {
      state.createFilter = action.payload;
    },
    [updatePowerSearchFilterReq.fulfilled]: (state, action) => {
      state.updateFilter = action.payload;
    }
  }
});

export const { handleDeleteFilterLocally } = PowerSearchSlice.actions;

export default PowerSearchSlice.reducer;
