import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetCompanyPeerGroup,
  GetInvestorPeerGroup,
  AddSelectionCompanyPeerGroup,
  GetPeerGroupsData,
  AddSelectionInvestorPeerGroup,
  ValidateOldPasswordHash,
  HandleChangePassword,
  GetEmailPreferences
} from '../../utils/preferences-util';
import { TokenDecode } from '../../utils/general-util';
import prodConst from '../../constants/ProductConstants';
import { NUMBER_TWO, NUMBER_FOUR } from '../../constants/NumberConstants';
import { GetUserDashboard } from '../../utils/dashboard-util';

// Preferences page get all data
export const getPreferencesdata = createAsyncThunk('getPreferencesdata', async () => {
  const responseCompanyPeerGroup = await GetCompanyPeerGroup();
  const responseInvestorPeerGroup = await GetInvestorPeerGroup();
  const responsePeerGroups = await GetPeerGroupsData();
  const responseGetEmailPreferences = await GetEmailPreferences();

  async function getDisabledStatus(productId) {
    const response = await TokenDecode()
      .then((res) =>
        res && res.MemberShip && res.MemberShip !== undefined &&
        res.MemberShip.length > 0 && res.MemberShip.every(
          (item) => !(item.product_id === productId && (item.status === NUMBER_TWO || item.status === NUMBER_FOUR))
        )
      )
      .catch((e) => console.log(e));
    return response;
  }
  const myJson = [
    {
      id: 'Email1MonthlyNewsLetter',
      name: 'Receive Weekly / Monthly Newsletter',
      checked: responseGetEmailPreferences.Email1MonthlyNewsletter,
      disabled: false
    },
    {
      id: 'Email2EmailUpdates',
      name: 'Receive Email Updates',
      checked: responseGetEmailPreferences.Email2EmailUpdates,
      disabled: false
    },
    {
      id: 'Email33rdParty',
      name: 'Receive 3rd Party Emails',
      checked: responseGetEmailPreferences.Email33rdParty,
      disabled: false
    },
    {
      id: 'daily_activim_newsletter',
      name: 'Receive Activism Daily News Summary Emails',
      checked: responseGetEmailPreferences.daily_newsletter,
      isOpen: !!responseGetEmailPreferences.daily_newsletter,
      disabled: await getDisabledStatus(prodConst.ACTIVISM),
      children: [
        {
          id: 'NAEmailUpdates',
          name: 'Receive North America Daily News Summary Update',
          disabled: false,
          checked: responseGetEmailPreferences.NAEmailUpdates
        },
        {
          id: 'AAEmailUpdates',
          name: 'Receive Asia/Australasia Daily News Summary Update',
          disabled: false,
          checked: responseGetEmailPreferences.AAEmailUpdates
        }
      ]
    },
    {
      id: 'ais_weekly_newsletter',
      name: 'Receive Activist Shorts Weekly News Summary',
      checked: responseGetEmailPreferences.ais_weekly_newsletter
    }
  ];

  return {
    reponseEmailArrayList: myJson,
    responseCompanyPeerGroup,
    responseInvestorPeerGroup,
    responsePeerGroups
  };
});

// User preferences
export const validateOldPasswordHashReq = createAsyncThunk('ValidateOldPasswordHash', async (txt_oldpassword) => {
  const response = await ValidateOldPasswordHash(txt_oldpassword);
  return response;
});

export const handleChangePasswordReq = createAsyncThunk('HandleChangePassword', async (password) => {
  const response = await HandleChangePassword(password);
  return response;
});

export const getUserDashboardPreferencesReq = createAsyncThunk(
  'getUserDashboardPreferencesReq',
  async () => {
    const response = await GetUserDashboard();
    return response;
  }
);

const PreferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    investorPeerGroupDataList: [],
    investorPeerGroupSelection: undefined,
    companyPeerGroupDataList: [],
    companyPeerGroupSelection: undefined,
    validateOldPasswod: false,
    activimEmailPreferencesStatus: false,
    emailListItems: [],
    preferencesIsLoading: true,
    lstWidgetSelections: [],
    ddlWidgetSelections: [],
    cmpWidgetValue: undefined,
    invWidgetValue: undefined
  },
  reducers: {
    handleCompanyPeerGroupSelectionChange: {
      reducer(state, action) {
        state.companyPeerGroupSelection = action.payload.companyPeerGroupSelection;
        if (action.payload.companyPeerGroupSelection !== undefined) {
          AddSelectionCompanyPeerGroup(
            action.payload.companyPeerGroupSelection !== null ? action.payload.companyPeerGroupSelection.value : null
          );
        }
      },
      prepare(companyPeerGroupSelection) {
        return {
          payload: { companyPeerGroupSelection }
        };
      }
    },
    handleInvestorPeerGroupSelectionChange: {
      reducer(state, action) {
        state.investorPeerGroupSelection = action.payload.investorPeerGroupSelection;
        if (action.payload.investorPeerGroupSelection !== undefined) {
          AddSelectionInvestorPeerGroup(
            action.payload.investorPeerGroupSelection !== null ? action.payload.investorPeerGroupSelection.value : null
          );
        }
      },
      prepare(investorPeerGroupSelection) {
        return {
          payload: { investorPeerGroupSelection }
        };
      }
    },
    handleEmailPreferences: {
      reducer(state, action) {
        state.emailListItems = action.payload.array;
      },
      prepare(array) {
        return {
          payload: { array }
        };
      }
    },
    handleResetLoading: {
      reducer(state) {
        state.preferencesIsLoading = true;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleCompanyWidgetSelection: {
      reducer(state, action) {
        const data = action.payload;
        let options = [];
        if (data.length > 0) {
          data.forEach((item) => {
            if (item.value !== null) {
              options = [...options, item];
              state.cmpWidgetValue = options.length > 0 ? options : undefined;
            } else {
              state.cmpWidgetValue = [{ label: 'All', value: null }];
            }
          });
        } else {
          state.cmpWidgetValue = [];
        }
      },
      prepare(e) {
        return { payload: e };
      }
    },
    handledInvestorWidgetSelection: {
      reducer(state, action) {
        const data = action.payload;
        let options = [];
        if (data.length > 0) {
          data.forEach((item) => {
            if (item.value !== null) {
              options = [...options, item];
              state.invWidgetValue = options;
            } else {
              state.invWidgetValue = [{ label: 'All', value: null }];
            }
          });
        } else {
          state.invWidgetValue = [];
        }
      },
      prepare(e) {
        return { payload: e };
      }
    },
    handleResetCompanyWidgetSelection: {
      reducer(state, action) {
        state.cmpWidgetValue = undefined;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleResetInvestorWidgetSelection: {
      reducer(state, action) {
        state.invWidgetValue = undefined;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
  },
  extraReducers: {
    [getPreferencesdata.fulfilled]: (state, action) => {
      state.companyPeerGroupDataList =
        action.payload !== undefined ? action.payload.responseCompanyPeerGroup.recordset : [];
      state.investorPeerGroupDataList =
        action.payload !== undefined ? action.payload.responseInvestorPeerGroup.recordset : [];
      state.investorPeerGroupSelection =
        action.payload !== undefined ? action.payload.responsePeerGroups.investor_peer_group : [];
      state.companyPeerGroupSelection =
        action.payload !== undefined ? action.payload.responsePeerGroups.company_peer_group : [];
      state.emailListItems = action.payload !== undefined ? action.payload.reponseEmailArrayList : false;
      state.preferencesIsLoading = action.payload === undefined;
    },

    [validateOldPasswordHashReq.fulfilled]: (state, action) => {
      state.validateOldPasswod = action.payload !== undefined;
    },
    [handleChangePasswordReq.fulfilled]: () => {},
    [getUserDashboardPreferencesReq.fulfilled]: (state, action) => {
      state.lstWidgetSelections = [];
      state.lstWidgetSelections = action.payload !== undefined && action.payload.length > 0 ? action.payload : [];
      if (action.payload.length > 0 && action.payload !== undefined) {
        state.ddlWidgetSelections = [{ label: 'All', value: null }];
        const data = action.payload;
        data.forEach((item) => {
          state.ddlWidgetSelections.push({
            label: item.widget_name,
            value: item.widget_id
          });
        });
      } else {
        state.cmpWidgetValue = undefined;
        state.invWidgetValue = undefined;
      }
      state.dashboardSelection = [];
      let data = action.payload;
      if (typeof action.payload === 'string') {
        data = JSON.parse(action.payload);
      } else {
        data = action.payload;
      }
      data.forEach((e) => {
        state.dashboardSelectionId = e.dashboard_id;
        state.txtDashboardName = e.Dashboard_name;
        state.dashboardSelection.push({
          ...JSON.parse(e.position),
          dashboard_widget_link_id: e.dashboard_widget_link_id,
          company_search_id: e.company_search_id,
          investor_search_id: e.investor_search_id
        });
      });
    },
  }
});

export const {
  handleInvestorPeerGroupSelectionChange,
  handleResetLoading,
  handleCompanyPeerGroupSelectionChange,
  handleEmailPreferences,
  handleCompanyWidgetSelection,
  handledInvestorWidgetSelection,
  handleResetCompanyWidgetSelection,
  handleResetInvestorWidgetSelection
} = PreferencesSlice.actions;

export default PreferencesSlice.reducer;
