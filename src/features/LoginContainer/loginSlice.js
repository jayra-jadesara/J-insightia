import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  STATE_LOGIN,
  STATE_CONFIRM_FORGOT_PASSWORD,
  STATE_PASSWORD_RESET_SUCCESS,
  STATE_LOGIN_CONFIRMATION
} from '../../constants/LoginConstants';
import {
  authenticate,
  sendForgotPasswordEmail,
  resetNewPassword,
  lookupDecIPForIPLogin,
  authenticateIPLogin,
  createComputer,
  UpdateComputerLogin,
  IsBranchUpToDate
} from '../../utils/login-util';
import { NUMBER_ZERO } from '../../constants/NumberConstants';

export const resetFormReq = createAsyncThunk('resetPassword', async (arg) => {
  const response = await resetNewPassword(arg.password, arg.resetcode, arg.email);
  return response;
});

export const loginFormReq = createAsyncThunk('login', async (arg) => {
  try {
    const response = await authenticate(arg.username, arg.password, arg.costCode);
    return response;
  } catch (error) {
    return { text: 'Error' };
  }
});

export const loginIPFormReq = createAsyncThunk('loginIP', async () => {
  const response = await authenticateIPLogin();
  return response;
});

export const lookupDecIPForIPLoginReq = createAsyncThunk('lookupDecIPForIPLogin', async () => {
  const response = await lookupDecIPForIPLogin();
  return response;
});

export const createComputerReq = createAsyncThunk('createComputer', async (arg) => {
  const response = await createComputer(arg.computer_code, arg.owner, arg.user_agent, arg.browser, arg.version);
  return response;
});

export const updateComputerLoginReq = createAsyncThunk('UpdateComputerLogin', async (arg) => {
  const response = await UpdateComputerLogin(arg.computer_id);
  return response;
});

export const IsBranchUpToDateReq = createAsyncThunk('IsBranchUpToDate', async (arg) => {
  const response = await IsBranchUpToDate(arg);
  return response;
});

const { search } = window.location;
const params = new URLSearchParams(search);
let currentScreen = STATE_LOGIN;
let QueryEmail;
if (params.get('key') !== null || params.get('email') !== null) {
  currentScreen = STATE_CONFIRM_FORGOT_PASSWORD;
  QueryEmail = true;
} else {
  currentScreen = STATE_LOGIN;
  QueryEmail = false;
}

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    screen: currentScreen,
    isModalPopupVisible: false,
    ipLogin: [{ Ok: 0 }],
    computer_id: null,
    isOutdatedVersion: false,
    serverVersion: {},
    localVersion: {},
    isQueryEmail: QueryEmail,
    isPwdShow: false,
    isPaygUser: false,
    cost_code: null,
  },
  reducers: {
    switchScreen: {
      reducer(state, action) {
        const { screen } = action.payload;
        state.screen = screen;
      },
      prepare(screen) {
        return { payload: { screen } };
      }
    },
    sendEmailResetPassword: {
      reducer(state, action) {
        const { screen } = action.payload;
        state.screen = screen;
      },
      prepare(email) {
        sendForgotPasswordEmail(email);
        return {
          payload: { screen: STATE_LOGIN_CONFIRMATION }
        };
      }
    },
    handleCloaseModelPopup: {
      reducer(state) {
        state.isModalPopupVisible = false;
      },
      prepare() {
        return { payload: {} };
      }
    },
    handleLocalVersion: {
      reducer(state, action) {
        state.localVersion = action.payload;
      },
      prepare() {
        return { payload: {} };
      }
    },
    handleOnShowPassword: {
      reducer(state) {
        state.isPwdShow = !state.isPwdShow;
      },
      prepare() {
        return { payload: {} };
      }
    },
    handleCloseModel: {
      reducer(state, action) {
        const ispayguserData = current(state).isPaygUser;
        state.isPaygUser = !ispayguserData;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnChangeCostCode: {
      reducer(state, action) {
          state.cost_code = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value.trimStart()
        };
      }
    }
  },
  extraReducers: {
    [resetFormReq.fulfilled]: (state, action) => {
      if (action.payload.output.ResetStatus === NUMBER_ZERO) {
        state.screen = STATE_PASSWORD_RESET_SUCCESS;
      }
      state.resetPasswordStatus = action.payload;
    },
    [loginFormReq.fulfilled]: (state, action) => {
      if (action.payload.ispayguser) {
        state.isPaygUser = action.payload.ispayguser;
      }
      state.userDetails = action.payload;
      if (action.payload.isValid === false) {
        state.isModalPopupVisible = true;
      }
      if (action.payload === false) {
        state.userDetails = { message: 'Error connecting to server' };
        state.isModalPopupVisible = true;
      }
    },
    [loginIPFormReq.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
      if (action.payload.isValid === false) {
        state.isModalPopupVisible = true;
      }
      if (action.payload === false) {
        state.userDetails = { message: 'Error connecting to server' };
        state.isModalPopupVisible = true;
      }
    },
    [lookupDecIPForIPLoginReq.fulfilled]: (state, action) => {
      state.ipLogin = action.payload;
    },
    [createComputerReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.computer_id = action.payload[0].computer_id;
      }
    },
    [IsBranchUpToDateReq.fulfilled]: (state, action) => {
      state.isOutdatedVersion = action.payload.isOutdatedVersion;
      state.serverVersion = action.payload.serverVersion;
    }
  }
});

export const {
  switchScreen,
  sendEmailResetPassword,
  handleConfirmPassword,
  handleCloaseModelPopup,
  handleCreateComputer,
  handleLocalVersion,
  handleOnShowPassword,
  handleCloseModel,
  handleOnChangeCostCode
} = loginSlice.actions;

export default loginSlice.reducer;
