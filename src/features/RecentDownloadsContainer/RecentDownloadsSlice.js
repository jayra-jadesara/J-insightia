import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRecentDownloadList } from '../../utils/pdf-util';

export const getRecentDownloadListReq = createAsyncThunk(
  'getRecentDownloadList',
  async () => {
    const response = await getDataRecentDownloadList();
    return response;
  }
);

const RecentDownloadsSlice = createSlice({
  name: 'RecentDownloads',
  initialState: {
    recentDownloadsDataList: [],
    loadingData: true
  },
  reducers: {},
  extraReducers: {
    [getRecentDownloadListReq.fulfilled]: (state, action) => {
      state.recentDownloadsDataList =
        action.payload !== undefined ? action.payload.data : [];
      state.loadingData = action.payload === undefined;
    }
  }
});

export default RecentDownloadsSlice.reducer;
