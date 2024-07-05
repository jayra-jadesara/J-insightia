import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getdata_FAQS_definition } from '../../utils/faqhelp-util';
import numConst from '../../constants/NumberConstants';
import productConst from '../../constants/ProductConstants';

export const getdata_FAQS_definitionReq = createAsyncThunk('getdata_FAQS_definition', async (res) => {
  const response = await getdata_FAQS_definition(res);
  return { response, ProductID: res.ProductID };
});

const FAQHelpSlice = createSlice({
  name: 'faqhelp',
  initialState: {
    faqhelpIsLoading: true,
    faqhelpHasRecord: false,
    faqhelpData: [],
    isCompensationFaq: false,
  },
  reducers: {
    handleResetLoading: {
      reducer(state) {
        state.faqhelpIsLoading = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetHasRecord: {
      reducer(state) {
        state.faqhelpHasRecord = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
  },
  extraReducers: {
    [getdata_FAQS_definitionReq.fulfilled]: (state, action) => {
      state.faqhelpData = action.payload.response.data.length > 0 ? action.payload.response.data : [];
      state.faqhelpIsLoading = !(action.payload.response.data.length > 0);
      state.faqhelpHasRecord = action.payload.response.data.length === numConst.EMPTY_TABLE_LENGTH;
      if (action.payload.ProductID === productConst.COMPENSATION) {
        state.isCompensationFaq = action.payload.response.data.length === numConst.EMPTY_TABLE_LENGTH;
      }
    },
  },
});

export const { handleResetLoading, handleResetHasRecord } = FAQHelpSlice.actions;

export default FAQHelpSlice.reducer;
