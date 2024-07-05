import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetAlertinboxName,
  GetAlertModuleAccess,
  GetFilingDetailsAlert,
  GetAlertInboxType,
  GetInboxAlertByUser,
  getElementDetails,
  deleteAlert,
  updateAlertStatus
} from '../../../utils/myAlerts-util';
import { dateToNull } from '../../../utils/general-util';

export const getAlertInboxNameReq = createAsyncThunk('getAlertInboxNameReq', async (req) => {
  const response = await GetAlertinboxName(req.element_type_id);
  return response;
});

export const getAlerModulAccessReq = createAsyncThunk('getAlerModulAccessReq', async () => {
  const response = await GetAlertModuleAccess();
  return response;
});

export const getAlertFilingDetailReq = createAsyncThunk('getAlertFilingDetailReq', async () => {
  const response = await GetFilingDetailsAlert();
  return response;
});

export const getAlertInboxTypeReq = createAsyncThunk('getAlertInboxTypeReq', async (req) => {
  const response = await GetAlertInboxType(req.alert_id);
  return response;
});

export const getInboxAlertByUserReq = createAsyncThunk('getInboxAlertByUserReq', async (req) => {
  const response = await GetInboxAlertByUser(req.alert_id, req.element_type_id, req.cancelToken);
  return response;
});

export const getElementDetailReq = createAsyncThunk('getElementDetailReq', async (req) => {
  const response = await getElementDetails(req.element_type_id, req.alert_inbox_id, req.alert_data);
  return response;
});

export const deleteAlertReq = createAsyncThunk('deleteAlertReq', async (alert_id) => {
  const response = await deleteAlert(alert_id);
  return response;
});

export const updateAlertStatusReq = createAsyncThunk('updateAlertStatusReq', async (req) => {
  const response = await updateAlertStatus(req);
  return response;
});

//handled pivot table data
function pivotTableDetail(data) {
  let pid = null;
  let investor_id = null;
  let country_flag;
  const newData = [];
  let filling_header = '';
  let filing_date = '';
  data.forEach((item) => {
    if (item.row_heading === 'Pid') {
      pid = item.element;
    } else if (item.row_heading === 'PID') {
      pid = item.element;
    }
    if (item.row_heading === 'Country_Flag') {
      const country = item.element;
      country_flag = country !== undefined && country !== undefined ? country : '';
    }
    if (item.row_heading === 'investor_id') {
      investor_id = item.element;
    }
    if (item.row_heading === 'Investor_profile_id') {
      investor_id = item.element;
    }
    if (item.row_heading === 'Filing type') {
      filling_header = item.element;
    }
    if (item.row_heading === 'Filing date') {
      filing_date =
        item.element !== '' || item.element !== undefined || item.element !== null
          ? dateToNull(item.element, 'dd-mmm-yyyy', true)
          : '';
    }
    if (
      item.row_heading !== 'Pid' &&
      item.row_heading !== 'PID' &&
      item.row_heading !== 'Investor_profile_id' &&
      item.row_heading !== 'Investor profile ID' &&
      item.row_heading !== 'investor_id' &&
      item.row_heading !== 'Country' &&
      item.row_heading !== 'View PDF'
    ) {
      newData.push({
        row_heading: item.row_heading,
        element: item.element
      });
    }
  });
  const result = {
    pid: pid,
    investor_id: investor_id,
    country_flag: country_flag,
    filling_header: filling_header,
    filing_date:
      filing_date !== '' || filing_date !== undefined || filing_date !== null
        ? dateToNull(filing_date, 'dd-mmm-yyyy', true)
        : '',
    data: newData
  };
  return result;
}

const InboxAlertSlice = createSlice({
  name: 'inboxAlert',
  initialState: {
    lstAlertName: [],
    selectedLstAlertName: null,
    ddlLstAlertName: [],
    lstAlertModuleAccess: [],
    lstFiling: [],

    lstAlertByType: [],
    ddlAlertByteType: [],
    selectedLstAlertByType: null,
    lstAlertInboxByUser: [],

    lstAlertElementId: undefined,

    lstAlertDetails: undefined,

    lstElementDetail: undefined,
    cmp_pid: null,
    investor_id: null,
    country_flag: null,
    elementTypeId: null,
    filling_header: '',
    filing_date: '',
    module_name: undefined,
    arrayIndex: 0,
    alertData: null
  },
  reducers: {
    handleAlertByName: {
      reducer(state, action) {
        state.lstAlertDetails = undefined;
        state.lstElementDetail = undefined;
        state.lstAlertElementId = undefined;
        state.selectedLstAlertName = action.payload.e !== null ? action.payload.e : null;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleAlertByType: {
      reducer(state, action) {
        state.lstAlertDetails = undefined;
        state.lstElementDetail = undefined;
        state.lstAlertElementId = undefined;
        state.selectedLstAlertByType = action.payload.e !== null ? action.payload.e : null;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleResetState: {
      reducer(state) {
        state.lstAlertDetails = undefined;
        state.lstElementDetail = undefined;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleResetelementDetail: {
      reducer(state) {
        state.lstElementDetail = undefined;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    }
  },
  extraReducers: {
    [getAlertInboxNameReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstAlertName = action.payload !== undefined ? action.payload.lstAlertName : [];
        state.ddlLstAlertName = action.payload !== undefined ? action.payload.lstAlertName : [];
      }
    },
    [getAlerModulAccessReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstAlertModuleAccess = action.payload !== undefined ? action.payload[0] : [];
      }
    },
    [getAlertFilingDetailReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstFiling = action.payload;
      }
    },
    [getAlertInboxTypeReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstAlertByType = action.payload !== undefined ? action.payload.lstAlertType : [];
        state.ddlAlertByteType = action.payload !== undefined ? action.payload.lstAlertType : [];
      }
    },
    [getInboxAlertByUserReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstAlertInboxByUser = action.payload !== undefined ? action.payload.elementData : [];
        state.lstAlertElementId = action.payload !== undefined ? action.payload.elementData : [];
      }
    },
    [getElementDetailReq.fulfilled]: (state, action) => {
      state.lstElementDetail = state.lstElementDetail !== undefined ? undefined : state.lstElementDetail;
      state.country_flag = undefined;
      state.cmp_pid = null;
      state.investor_id = null;
      if (action.payload !== null) {
        if (action.payload.pivotTable) {
          const finalData = action.payload.data !== undefined ? pivotTableDetail(action.payload.data) : [];
          state.lstElementDetail = finalData.data;
          state.cmp_pid = finalData.pid;
          state.investor_id = finalData.investor_id;
          state.country_flag = finalData.country_flag;
        } else {
          state.lstElementDetail = action.payload !== undefined ? action.payload.data : [];
        }
        state.lstElementDetail = action.payload !== undefined ? action.payload.data : [];
        state.elementTypeId = action.payload !== undefined ? action.payload.element_type_id : null;
        state.filling_header = action.payload !== undefined ? action.payload.alert_data.Alert_type : undefined;
        state.filing_date = action.payload !== undefined ? action.payload.alert_data.sent_date : undefined;
        state.module_name = action.payload !== undefined ? action.payload.alert_data.module_name : undefined;
        state.alertData = action.payload !== undefined ? action.payload.alert_data : null;
      }
    },
    [deleteAlertReq.fulfilled]: () => {},
    [updateAlertStatusReq.fulfilled]: () => {}
  }
});

export const { handleAlertByType, handleAlertByName, handleResetState, handleResetelementDetail } = InboxAlertSlice.actions;

export default InboxAlertSlice.reducer;
