import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  GetActivismNewsAlerts,
  GetActivismEventNewsAlerts,
  ListFilingGroups,
  GetAlertOptionsAndSubOptions,
  IsProductAvaibleForCurrentUser,
  GetDirectorType,
  GetGovAmendemntCategories,
  GetExistingAlerts,
  GetAlertDetails,
  DeleteTblAlertOptionLink,
  GetAlertModuleAccess,
  GetAlertinboxName,
  GetFilingDetailsAlert,
  GetSampleData
} from '../../../utils/myAlerts-util';
import { GOVERNANCE, ACTIVISM, ACTIVIST_SHORTS, VOTING } from '../../../constants/ProductConstants';
import { MAX_MOBILE_WIDTH } from '../../../constants/ScreenSizeConstant';
import { oneChildtreeView, TokenDecode } from '../../../utils/general-util';
import {
  MY_ALERT_ACTIVISM_NEWS_ALERT_OPTION_ID,
  MY_ALERT_SHORT_ACTIVISM_NEWS_ALERT_OPTION_ID,
  MY_ALERT_ACTIVISM_FILING_ALERT_OPTION_ID,
  MY_ALERT_ACTIVIST_DEMANDS_ALERT_OPTION_ID
} from '../../../constants/MyAlertConstant';
import numConst from '../../../constants/NumberConstants';

export const getActivismNewsAlertsReq = createAsyncThunk('getActivismNewsAlertsReq', async () => {
  const response = await GetActivismNewsAlerts();
  return response;
});

export const getActivismEventNewsAlertsReq = createAsyncThunk('getActivismEventNewsAlertsReq', async () => {
  const response = await GetActivismEventNewsAlerts();
  return response;
});

export const getListFilingGroupsReq = createAsyncThunk('getListFilingGroupsReq', async () => {
  const response = await ListFilingGroups();
  return response;
});

export const getAlertOptionsAndSubOptionsReq = createAsyncThunk('getAlertOptionsAndSubOptionsReq', async () => {
  const response = await GetAlertOptionsAndSubOptions();
  return response;
});

export const productAvaibleForCurrentUserReq = createAsyncThunk(
  'productAvaibleForCurrentUserReq',
  async (productId) => {
    const response = await IsProductAvaibleForCurrentUser(productId);
    return { response, productId };
  }
);

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const getDirectorTypeReq = createAsyncThunk('getDirectorTypeReq', async () => {
  const response = await GetDirectorType();
  return response;
});

export const getGovAmendemntCategoriesReq = createAsyncThunk('getGovAmendemntCategoriesReq', async () => {
  const response = await GetGovAmendemntCategories();
  return response;
});

export const getExistingAlertsReq = createAsyncThunk('getExistingAlertsReq', async () => {
  const response = await GetExistingAlerts();
  return response;
});

export const getAlerModulAccessReq = createAsyncThunk('getAlerModulAccessReq', async () => {
  const response = await GetAlertModuleAccess();
  return response;
});

export const getAlertDetailsReq = createAsyncThunk('getAlertDetailsReq', async (alertid) => {
  const response = await GetAlertDetails(alertid);
  return response;
});
//alert Inbox
export const getAlertInboxNameReq = createAsyncThunk('getAlertInboxNameReq', async () => {
  const response = await GetAlertinboxName();
  return response;
});

export const getAlertFilingDetailReq = createAsyncThunk('getAlertFilingDetailReq', async () => {
  const response = await GetFilingDetailsAlert();
  return response;
});

export const getSampleDataReq = createAsyncThunk('getSampleDataReq', async () => {
  const response = await GetSampleData();
  return response;
});
//
const MyAlertSlice = createSlice({
  name: 'myAlert',
  initialState: {
    alertOptions: [],
    alertSubOptions: [],
    alertStaticSubOptions: [],
    alertName: '',
    chkNotifiedMe: true,
    isEmailMeToo: undefined,
    isJustMyJIOAlertInbox: undefined,
    //modules
    lstAlertModuleAccess: {},

    // Activism
    ddlAlertOptionActivismFilingSelection: undefined,
    ddlAlertOptionActivismNewsSelection: undefined,
    ddlAlertOptionShortActivismNewsSelection: undefined,

    ddlSpecificActivistActionNews: [],
    ddlSpecificShortActivistActionNews: [],
    ddlSpecificActivistActionNewsSelection: [],
    ddlSpecificShortActivistActionNewsSelection: [],
    ddlSpecificFillingType: [],
    ddlSpecificFillingTypeSelection: [],
    ddlActivismEventNewsAlerts: [],
    ddlActivismEventNewsAlertsSelection: [],
    ddlActivismShortEventNewsAlertsSelection: [],
    activismNewsActivistTypeSelection: [],
    activismShortNewsActivistTypeSelection: [],
    //activist demands
    ddlSpecificActivistDemands: [],
    ddlSpecificActivistDemandsSelection: [],
    activistDemandTypeSelection: [],
    ddlAlertOptionActivistDemandsSelection: undefined,

    myAlertSelectedOptionIds: [],
    myAlertSelectedSubOptionIds: [],
    myAlertSelectedSubOptionStatic: [],
    allDataStore: [],
    ddlDynamicStaticValues: [],
    // Existing alert data
    lstExistingAllAlertData: [],
    lstExistingAlertData: [],
    isLoadingExistingAlertData: true,
    isExistingAlertPagging: true,
    editAlertid: null,

    //Alret inbox
    lstAlertName: [],
    ddlLstAlertName: [],
    lstFiling: [],
    lstSampleData: [],

    // Enable disable for 'The alerts for this module are not available on your subscription.'
    isEnabledButtonfor_subs_Activism: true,
    isEnabledButtonfor_subs_ShortActivism: true,
    isEnabledButtonfor_subs_Governance: true,
    isEnabledButtonfor_subs_Voting: true,
    getTokenDecode: [],
    alert_cmp_search_id: null,
    alert_inv_search_id: null,
  },
  reducers: {
    handleOnChangeDdlActivisamEventNews: {
      reducer(state, action) {
        state.ddlActivismEventNewsAlertsSelection = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnChangeDdlActivisamShortEventNews: {
      reducer(state, action) {
        state.ddlActivismShortEventNewsAlertsSelection = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnChangeDdlActivismNewsFillingAlert: {
      reducer(state, action) {
        state.ddlSpecificFillingTypeSelection = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnChangeDdlSpecificNews: {
      reducer(state, action) {
        const lstmyAlertSelectedOptionIds = current(state).myAlertSelectedOptionIds;
        if (lstmyAlertSelectedOptionIds.findIndex((c) => c === 1) !== -1) {
          state.ddlSpecificActivistActionNewsSelection = action.payload.selectedNodes;
          const oldJson = current(state).ddlSpecificActivistActionNews;
          state.ddlSpecificActivistActionNews = oneChildtreeView(oldJson, action);

          const myJson = [];
          // prepare selection
          action.payload.selectedNodes.forEach((e) => {
            if (e._depth === 0) {
              const lstFilterParentNode = oldJson.filter((c) => c.value === e.value);
              if (lstFilterParentNode.length > 0) {
                lstFilterParentNode[0].children.forEach((p) => {
                  myJson.push(p.value);
                });
              }
            }
            if (e._depth === 1) {
              myJson.push(e.value);
            }
          });
          state.activismNewsActivistTypeSelection = myJson;
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes }
        };
      }
    },
    handleOnChangeDdlSpecificShortNews: {
      reducer(state, action) {
        const lstmyAlertSelectedOptionIds = current(state).myAlertSelectedOptionIds;
        if (lstmyAlertSelectedOptionIds.findIndex((c) => c === 3) !== -1) {
          state.ddlSpecificShortActivistActionNewsSelection = action.payload.selectedNodes;
          const oldJson = current(state).ddlSpecificShortActivistActionNews;
          state.ddlSpecificShortActivistActionNews = oneChildtreeView(oldJson, action);

          const myJson = [];
          // prepare selection
          action.payload.selectedNodes.forEach((e) => {
            if (e._depth === 0) {
              const lstFilterParentNode = oldJson.filter((c) => c.value === e.value);
              if (lstFilterParentNode.length > 0) {
                lstFilterParentNode[0].children.forEach((p) => {
                  myJson.push(p.value);
                });
              }
            }
            if (e._depth === 1) {
              myJson.push(e.value);
            }
          });
          state.activismShortNewsActivistTypeSelection = myJson;
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes }
        };
      }
    },
    handleOnChangeDdlDirectorType: {
      reducer(state, action) {
        state.ddlDirectorTypesSelection = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnChangeDdlAmendemntCategories: {
      reducer(state, action) {
        state.govAmendemntCategorySelection = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnChangeAlertName: {
      reducer(state, action) {
        state.alertName = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
        };
      }
    },
    handleOnChangeChkNotifiedMe: {
      reducer(state, action) {
        state.chkNotifiedMe = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.checked
        };
      }
    },
    handleOnChangeRdoEmailTo: {
      reducer(state, action) {
        if (action.payload) {
          state.isEmailMeToo = action.payload;
          state.isJustMyJIOAlertInbox = false;
        } else {
          state.isEmailMeToo = action.payload;
          state.isJustMyJIOAlertInbox = true;
        }
      },
      prepare(e) {
        return {
          payload: e.target.checked
        };
      }
    },
    handleOnChangeisJustMyJIOAlertInbox: {
      reducer(state, action) {
        if (action.payload) {
          state.isEmailMeToo = false;
          state.isJustMyJIOAlertInbox = action.payload;
        } else {
          state.isEmailMeToo = true;
          state.isJustMyJIOAlertInbox = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e.target.checked
        };
      }
    },
    handleGlobleResetMyAlert: {
      reducer(state) {
        state.lstExistingAllAlertData = [];
        state.lstExistingAlertData = [];
        state.isLoadingExistingAlertData = true;
        state.alertOptions = [];
        state.alertSubOptions = [];
        state.alertStaticSubOptions = [];
        state.alertName = '';
        state.chkNotifiedMe = true;
        state.isEmailMeToo = undefined;
        state.isJustMyJIOAlertInbox = undefined;
        state.isExistingAlertPagging = true;
        state.editAlertid = null;
        state.myAlertSelectedSubOptionStatic = [];
        state.myAlertSelectedOptionIds = [];
        state.myAlertSelectedSubOptionIds = [];

        // Activism
        state.ddlSpecificActivistActionNews = [];
        state.ddlSpecificShortActivistActionNews = [];
        state.ddlSpecificActivistActionNewsSelection = [];
        state.ddlSpecificShortActivistActionNewsSelection = [];
        state.ddlSpecificFillingType = [];
        state.ddlSpecificFillingTypeSelection = [];
        state.ddlActivismEventNewsAlerts = [];
        state.ddlActivismEventNewsAlertsSelection = [];
        state.ddlActivismShortEventNewsAlertsSelection = [];
        state.ddlSpecificFillingTypeSelection = [];
        state.slideActivismNewsAnimation = '';
        state.isActiveSlideActivismNews = false;
        state.slideActivismFilingAnimation = '';
        state.isActiveSlideActivismFiling = false;
        state.setNewsButtonActive = '';
        state.setFilingsButtonActive = '';

        // Short Activism
        state.ddlAlertOptionShortActivismSelection = undefined;
        state.ddlAlertSubOptionShortActivismSelection = undefined;
        state.activismShortSubOptionAnimation = '';
        state.activismShortSubDetailsOptionAnimation = '';
        state.shortActivismStaticDdlValueSelection = undefined;
        state.slideShortActivismAnimation = '';

        state.ddlSpecificActivistDemands = [];
        state.ddlSpecificActivistDemandsSelection = [];
        state.activistDemandTypeSelection = [];
        state.ddlAlertOptionActivistDemandsSelection = undefined;

        // Governance
        state.isAccessGovernance = true;
        state.ddlAlertOptionGovernanceSelection = undefined;
        state.ddlAlertSubOptionGovernanceSelection = undefined;
        state.governanceSubOptionAnimation = '';
        state.governanceSubDetailsOptionAnimation = '';
        state.ddlDirectorTypesSelection = undefined;
        state.govAmendemntCategorySelection = undefined;
        state.governanceSubOptionsPlaceHolder = 'Alert sub options (optional)';
        state.govDeadlineReminderNumberOfDaysSelection = { value: 7, label: 7 };
        state.govStaticDdlValueSelection = undefined;

        // Voting
        state.ddlAlertOptionVoting = [];
        state.ddlAlertOptionVotingSelection = undefined;
        state.ddlAlertSubOptionVoting = [];
        state.ddlAlertSubOptionVotingSelection = undefined;
        state.votingSubOptionAnimation = '';
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleOnEditMyAlert: {
      reducer(state, action) {
        const lstExistingAlert = current(state).lstExistingAllAlertData;
        if (lstExistingAlert !== undefined && lstExistingAlert !== null) {
          state.lstExistingAlertData = lstExistingAlert.filter((c) => c.alert_id === action.payload);
          state.isExistingAlertPagging = false;
          state.editAlertid = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleCancelEditingAlert: {
      reducer(state) {
        const lstExistingAlert = current(state).lstExistingAllAlertData;
        state.lstExistingAlertData = lstExistingAlert;
        state.isExistingAlertPagging = true;
        state.editAlertid = null;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleDeleteOptionAndSubOptionLink: {
      reducer() {},
      prepare(alert_id) {
        DeleteTblAlertOptionLink(alert_id);
        return {
          payload: null
        };
      }
    },
    handleActivismNewsAlertbtnClick: {
      reducer(state, action) {
        if (current(state).isActiveSlideActivismNews === false) {
          state.slideActivismNewsAnimation = '';
          state.setNewsButtonActive = 'btnActive';
          if (MAX_MOBILE_WIDTH < action.payload.width) {
            state.slideActivismNewsAnimation = 'fadeInLeft d-block';
          } else {
            state.slideActivismNewsAnimation = 'fadeInBottom d-block';
          }
          state.isActiveSlideActivismNews = true;
        } else {
          state.setNewsButtonActive = '';
          state.slideActivismNewsAnimation = 'd-none';
          state.isActiveSlideActivismNews = false;
          state.ddlActivismEventNewsAlertsSelection = [];
          state.activismNewsActivistTypeSelection = [];
          state.activismShortNewsActivistTypeSelection = [];
        }
      },
      prepare(width, e) {
        return {
          payload: { width, e }
        };
      }
    },
    handleActivismFilingAlertbtnClick: {
      reducer(state, action) {
        if (current(state).isActiveSlideActivismFiling === false) {
          state.slideActivismFilingAnimation = '';
          state.setFilingsButtonActive = 'btnActive';
          if (MAX_MOBILE_WIDTH < action.payload.width) {
            state.slideActivismFilingAnimation = 'fadeInLeft d-block';
          } else {
            state.slideActivismFilingAnimation = 'fadeInBottom d-block';
          }
          state.isActiveSlideActivismFiling = true;
        } else {
          state.setFilingsButtonActive = '';
          state.slideActivismFilingAnimation = 'd-none';
          state.isActiveSlideActivismFiling = false;
          state.ddlSpecificFillingTypeSelection = [];
        }
      },
      prepare(width) {
        return {
          payload: { width }
        };
      }
    },

    handleDynamicbtnClick: {
      reducer(state, action) {
        const mySelection = [];

        // Reset activism news selection
        if (action.payload.option_id === MY_ALERT_ACTIVISM_NEWS_ALERT_OPTION_ID) {
          const myJsonActivismNews = [];
          const oldJson = current(state).ddlSpecificActivistActionNews;
          oldJson.forEach((n) => {
            const childJsonObj = [];
            n.children.forEach((chldNode) => {
              childJsonObj.push({ ...chldNode, checked: false });
            });
            myJsonActivismNews.push({
              ...n,
              children: childJsonObj,
              checked: false
            });
          });
          state.ddlSpecificActivistActionNews = myJsonActivismNews;
          state.ddlSpecificActivistActionNewsSelection = [];
          state.activismNewsActivistTypeSelection = [];
        }

        // Reset Short Activisim news selection
        if (action.payload.option_id === MY_ALERT_SHORT_ACTIVISM_NEWS_ALERT_OPTION_ID) {
          const myJsonShortActivismNews = [];
          const oldJsonShortActivism = current(state).ddlSpecificShortActivistActionNews;
          oldJsonShortActivism.forEach((n) => {
            const childJsonObjShortActivism = [];
            n.children.forEach((chldNode) => {
              childJsonObjShortActivism.push({ ...chldNode, checked: false });
            });
            myJsonShortActivismNews.push({
              ...n,
              children: childJsonObjShortActivism,
              checked: false
            });
          });
          state.ddlSpecificShortActivistActionNews = myJsonShortActivismNews;
          state.ddlSpecificShortActivistActionNewsSelection = [];
          state.activismShortNewsActivistTypeSelection = [];
        }

        if (action.payload.option_id === MY_ALERT_ACTIVIST_DEMANDS_ALERT_OPTION_ID) {
          const myJsonActivismDemands = [];
          const oldJsonActivismDemands = current(state).ddlSpecificActivistDemands;
          oldJsonActivismDemands.forEach((n) => {
            const childJsonObjActivismDemands = [];
            n.children.forEach((chldNode) => {
              childJsonObjActivismDemands.push({ ...chldNode, checked: false });
            });
            myJsonActivismDemands.push({
              ...n,
              children: childJsonObjActivismDemands,
              checked: false
            });
          });
          state.ddlSpecificActivistDemands = myJsonActivismDemands;
          state.ddlSpecificActivistDemandsSelection = [];
          state.activistDemandTypeSelection = [];
        }

        const currentOptionSelection = current(state).myAlertSelectedOptionIds;
        if (action.payload.btnClick === true) {
          if (currentOptionSelection.indexOf(action.payload.option_id) === -1) {
            mySelection.push(action.payload.option_id);
            state.myAlertSelectedOptionIds = mySelection.concat(currentOptionSelection);
          }
        } else {
          state.myAlertSelectedOptionIds = currentOptionSelection.filter((c) => c !== action.payload.option_id);
          const myAlertSelectionSubOption = current(state).myAlertSelectedSubOptionIds;
          const myAlertSelectionSubOptionStatic = current(state).myAlertSelectedSubOptionStatic;
          const myDdlActivismNews = current(state).ddlActivismEventNewsAlertsSelection;
          const myDdlShortActivismNews = current(state).ddlActivismShortEventNewsAlertsSelection;

          state.myAlertSelectedSubOptionIds = myAlertSelectionSubOption.filter(
            (c) => c.alert_option_id !== action.payload.option_id
          );
          state.myAlertSelectedSubOptionStatic = myAlertSelectionSubOptionStatic.filter(
            (c) => c.alert_option_id !== action.payload.option_id
          );
          if (action.payload.option_id === MY_ALERT_ACTIVISM_NEWS_ALERT_OPTION_ID) {
            state.ddlActivismEventNewsAlertsSelection = myDdlActivismNews.filter(
              (c) => c.alert_option_id === action.payload.option_id
            );
          }
          if (action.payload.option_id === MY_ALERT_SHORT_ACTIVISM_NEWS_ALERT_OPTION_ID) {
            state.ddlActivismShortEventNewsAlertsSelection = myDdlShortActivismNews.filter(
              (c) => c.alert_option_id === action.payload.option_id
            );
          }
          if (action.payload.option_id === MY_ALERT_ACTIVISM_FILING_ALERT_OPTION_ID) {
            const FillingOption = current(state).ddlSpecificFillingTypeSelection;
            state.ddlSpecificFillingTypeSelection = FillingOption.filter(
              (c) => c.alert_option_id === action.payload.option_id
            );
          }
        }
      },
      prepare(option_id, btnClick) {
        return {
          payload: { option_id, btnClick }
        };
      }
    },
    handleOnChangeDynamicDropdown: {
      reducer(state, action) {
        if (action.payload === null || action.payload.e === null) {
          state.myAlertSelectedSubOptionIds = [];
        }
        const mySelection = [];
        const currentOptionSelection = current(state).myAlertSelectedSubOptionIds;
        if (action.payload !== null) {
          const index = currentOptionSelection.findIndex((c) => c.alert_option_id === action.payload.e.alert_option_id);
          if (index === -1) {
            mySelection.push({
              alert_option_id: action.payload.e.alert_option_id,
              label: action.payload.e.label,
              alert_suboption_id: action.payload.e.alert_suboption_id,
              value: action.payload.e.alert_suboption_id
            });
            state.myAlertSelectedSubOptionIds = mySelection.concat(currentOptionSelection);
          } else {
            state.myAlertSelectedSubOptionIds[index].label = action.payload.e.label;
            state.myAlertSelectedSubOptionIds[index].alert_suboption_id = action.payload.e.alert_suboption_id;
            state.myAlertSelectedSubOptionIds[index].value = action.payload.e.alert_suboption_id;

            const indexx = state.myAlertSelectedSubOptionStatic.findIndex(
              (c) => c.alert_option_id === action.payload.e.alert_option_id
            );

            if (indexx !== -1) {
              state.myAlertSelectedSubOptionStatic.splice(indexx, 1);
            }
          }
        } else {
          state.myAlertSelectedSubOptionIds = currentOptionSelection.filter((c) => c !== action.payload.e.value);

          state.myAlertSelectedSubOptionIds = [];
          state.ddlSpecificShortActivistActionNewsSelection = [];
          state.ddlActivismEventNewsAlertsSelection = [];
          state.activismNewsActivistTypeSelection = [];
        }
      },
      prepare(e, width) {
        return {
          payload: { e, width }
        };
      }
    },
    handleOnChangeDynamicSubOption: {
      reducer(state, action) {
        const mySelection = [];
        let removeClickedValue = [];
        const currentOptionSelection = current(state).myAlertSelectedSubOptionStatic;

        if (action.payload.e.length <= 0) {
          const dataSimple = currentOptionSelection.findIndex(
            (j) => j.alert_suboption_id === action.payload.alert_suboption_id
          );

          if (dataSimple !== -1) {
            state.myAlertSelectedSubOptionStatic.splice(dataSimple, 1);
          }
        }

        if (action.payload !== null) {
          const dataSimple = currentOptionSelection.filter((j) =>
            action.payload.e.some((a) => a.alert_suboption_id === j.alert_suboption_id)
          );
          removeClickedValue = dataSimple.filter((c) => !action.payload.e.some((s) => s.value === c.value));
          const indexs = currentOptionSelection.findIndex((c) => removeClickedValue.some((d) => d.label === c.label));
          if (indexs !== -1) {
            state.myAlertSelectedSubOptionStatic.splice(indexs, 1);
          }

          const removeDuplicate = action.payload.e.filter(
            (c) => !currentOptionSelection.some((y) => y.value === c.value)
          );
          removeDuplicate.forEach((c) => {
            mySelection.push({
              value: c.alert_suboption_static_values_id,
              label: c.label,
              alert_suboption_id: c.alert_suboption_id,
              alert_option_id: action.payload.alert_option_id,
              static_values_id: c.alert_suboption_static_values_id
            });
            state.myAlertSelectedSubOptionStatic = mySelection.concat(currentOptionSelection);
          });
        } else {
          state.myAlertSelectedSubOptionStatic = removeClickedValue.concat(currentOptionSelection);
          state.myAlertSelectedSubOptionStatic = currentOptionSelection.filter((c) => c !== action.payload.e.value);
          state.ddlSpecificshortActivistActionNewsSelection = [];
          state.ddlActivismEventNewsAlertsSelection = [];
          state.activismNewsActivistTypeSelection = [];
          state.activismShortNewsActivistTypeSelection = [];
          state.myAlertSelectedSubOptionStatic = [];
        }
      },
      prepare(e, alert_option_id, alert_suboption_id) {
        return {
          payload: { e, alert_option_id, alert_suboption_id }
        };
      }
    },
    //activist Demands
    handleOnChangeDdlSpecificActivistDemands: {
      reducer(state, action) {
        const lstmyAlertSelectedOptionIds = current(state).myAlertSelectedOptionIds;
        if (lstmyAlertSelectedOptionIds.findIndex((c) => c === 20) !== -1) {
          state.ddlSpecificActivistDemandsSelection = action.payload.selectedNodes;
          const oldJson = current(state).ddlSpecificActivistDemands;
          state.ddlSpecificActivistDemands = oneChildtreeView(oldJson, action);

          const myJson = [];
          // prepare selection
          action.payload.selectedNodes.forEach((e) => {
            if (e._depth === 0) {
              const lstFilterParentNode = oldJson.filter((c) => c.value === e.value);
              if (lstFilterParentNode.length > 0) {
                lstFilterParentNode[0].children.forEach((p) => {
                  myJson.push(p.value);
                });
              }
            }
            if (e._depth === 1) {
              myJson.push(e.value);
            }
          });
          state.activistDemandTypeSelection = myJson;
        }
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes }
        };
      }
    },

    handleButtonAccess: {
      reducer(state, action) {
        action.payload.forEach((product) => {
          if (product.product_id === ACTIVISM) {
            if (product.status === numConst.NUMBER_TWO || product.status === numConst.NUMBER_FOUR) {
              state.isEnabledButtonfor_subs_Activism = false;
            }
          } else if (product.product_id === ACTIVIST_SHORTS) {
            if (product.status === numConst.NUMBER_TWO || product.status === numConst.NUMBER_FOUR) {
              state.isEnabledButtonfor_subs_ShortActivism = false;
            }
          } else if (product.product_id === GOVERNANCE) {
            if (product.status === numConst.NUMBER_TWO || product.status === numConst.NUMBER_FOUR) {
              state.isEnabledButtonfor_subs_Governance = false;
            }
          } else if (product.product_id === VOTING) {
            if (product.status === numConst.NUMBER_TWO || product.status === numConst.NUMBER_FOUR) {
              state.isEnabledButtonfor_subs_Voting = false;
            }
          }
          // else if (product.product_id === ACTIVIST_VULNERABILITY) {
          //   if (
          //     product.status === NUMBER_TWO ||
          //     product.status === NUMBER_FOUR
          //   ) {
          //     state.isVulnerabilityButtonDisabled = false;
          //   }
          // }
        });
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleResetAlertFilterIds: {
      reducer(state) {
        state.alert_cmp_search_id = null;
        state.alert_inv_search_id = null;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    }
  },
  extraReducers: {
    [getActivismNewsAlertsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        const newsData = action.payload.filter((x) => x.label !== 'Activist Short');
        const demandData = action.payload.filter((x) => x.label !== 'Activist Short');
        const ShortNewsData = action.payload.filter((x) => x.label === 'Activist Short');
        state.ddlSpecificActivistActionNews = newsData;
        state.ddlSpecificActivistDemands = demandData;
        state.ddlSpecificShortActivistActionNews = ShortNewsData;
      }
    },
    [getActivismEventNewsAlertsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.ddlActivismEventNewsAlerts = action.payload;
        state.ddlActivismShortEventNewsAlerts = action.payload;
      }
    },
    [getListFilingGroupsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.ddlSpecificFillingType = action.payload;
      }
    },
    [getAlertOptionsAndSubOptionsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        const alertOptions = action.payload.AlertOptions;
        const arrayActivism = [];
        alertOptions.forEach((c) => {
          if (c.product_id === 1) {
            arrayActivism.push(c);
          }
        });
        state.alertOptions = alertOptions;
        state.alertSubOptions = action.payload.AlertSubOptions;
        state.alertStaticSubOptions = action.payload.AlertStaticSubOptions;

        // // Short activism - filling
        const lstfillingOption = alertOptions.filter(
          (c) => c.alert_option_id === MY_ALERT_ACTIVISM_FILING_ALERT_OPTION_ID
        );
        if (lstfillingOption.length > 0) {
          state.ddlAlertOptionActivismFilingSelection = lstfillingOption[0];
        }

        // Short activism - News
        const lstNewsOption = alertOptions.filter((c) => c.alert_option_id === MY_ALERT_ACTIVISM_NEWS_ALERT_OPTION_ID);
        if (lstNewsOption.length > 0) {
          state.ddlAlertOptionActivismNewsSelection = lstNewsOption[0];
        }

        const lstShortNewsOption = alertOptions.filter(
          (c) => c.alert_option_id === MY_ALERT_SHORT_ACTIVISM_NEWS_ALERT_OPTION_ID
        );
        if (lstShortNewsOption.length > 0) {
          state.ddlAlertOptionShortActivismNewsSelection = lstShortNewsOption[0];
        }

        const lstActivistDemandsOption = alertOptions.filter(
          (c) => c.alert_option_id === MY_ALERT_ACTIVIST_DEMANDS_ALERT_OPTION_ID
        );

        if (lstActivistDemandsOption.length > 0) {
          state.ddlAlertOptionActivistDemandsSelection = lstActivistDemandsOption[0];
        }
      }
    },
    [productAvaibleForCurrentUserReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (action.payload.productId === GOVERNANCE) {
          state.isAccessGovernance = action.payload.response;
        }
      }
    },
    [getDirectorTypeReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.ddlDirectorTypes = action.payload;
      }
    },
    [getGovAmendemntCategoriesReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.govAmendemntCategory = action.payload;
      }
    },
    [getExistingAlertsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.myAlertSelectedSubOptionStatic = [];
        state.myAlertSelectedOptionIds = [];
        state.myAlertSelectedSubOptionIds = [];
        state.isLoadingExistingAlertData = action.payload === undefined;
        state.lstExistingAllAlertData = action.payload;
        state.lstExistingAlertData = action.payload;
      }
    },
    [getAlertDetailsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        // fill up alert
        if (action.payload.alert !== undefined) {
          const alertData = action.payload.alert;
          const alertOptionData = action.payload.alertOption;
          const alertsubOptionData = action.payload.alertSubOption;

          const lstalertSubOption = current(state).alertSubOptions;
          const lstAlertStaticSubOptions = current(state).alertStaticSubOptions;

          state.editAlertid = alertData.alert_id;
          state.alertName = alertData.alert_name;
          state.isEmailMeToo = alertData.receive_email === 'true';
          state.chkNotifiedMe = alertData.notify_me_instant_alert;
          //pending
          state.alert_cmp_search_id = alertData.company_search_id;
          state.alert_inv_search_id = alertData.investor_search_id;
          //pending
          state.isJustMyJIOAlertInbox = alertData.receive_alerts_inbox_online === 'true';

          if (alertOptionData.length > 0) {
            // Activism - News
            const lstActivismNews = current(state).ddlActivismEventNewsAlerts;
            const filterActivismNewsOptions = alertOptionData.filter(
              (c) => c.alert_option_id === MY_ALERT_ACTIVISM_NEWS_ALERT_OPTION_ID
            );
            if (filterActivismNewsOptions.length > 0) {
              // set news button active
              state.setNewsButtonActive = 'btnActive';
              state.slideActivismNewsAnimation = 'd-block';
              state.isActiveSlideActivismNews = true;

              // filter selection array
              const lstActivistTypeIds = filterActivismNewsOptions.map((x) => x.alert_option_link_id);
              const filterDdlActivismNewsOptions = alertsubOptionData
                .filter((x) => lstActivistTypeIds.some((p) => p === x.alert_option_link_id))
                .map((c) => c.value);

              // filter array from selection
              const lstNewsSelection = lstActivismNews.filter((f) =>
                filterDdlActivismNewsOptions.some((d) => d === f.value)
              );
              state.ddlActivismEventNewsAlertsSelection = lstNewsSelection;

              // filter and fill news tree selection
              const lstActivismTreeNews = current(state).ddlSpecificActivistActionNews;
              const myUpdateTreeViewList = [];
              lstActivismTreeNews.forEach((t) => {
                const chdNode = [];
                let countSelection = 0;
                t.children.forEach((tele) => {
                  if (filterDdlActivismNewsOptions.indexOf(tele.value) !== -1) {
                    chdNode.push({ ...tele, checked: true });
                    countSelection += 1;
                  } else {
                    chdNode.push({ ...tele, checked: false });
                  }
                });
                if (t.children.length === countSelection && t.children.length !== 0) {
                  myUpdateTreeViewList.push({
                    ...t,
                    children: chdNode,
                    checked: true
                  });
                } else {
                  if (chdNode.length > 0) {
                    myUpdateTreeViewList.push({
                      ...t,
                      children: chdNode
                    });
                  } else {
                    myUpdateTreeViewList.push(t);
                  }
                }
              });
              state.ddlSpecificActivistActionNews = myUpdateTreeViewList;
              // state.activismNewsActivistTypeSelection = filterDdlActivismNewsOptions;
            } else {
              state.setNewsButtonActive = '';
              state.slideActivismNewsAnimation = 'd-none';
              state.isActiveSlideActivismNews = false;
            }

            // Activism - Filings
            const lstActivismFiling = current(state).ddlSpecificFillingType;
            const filterActivismFilingOptions = alertOptionData.filter(
              (c) => c.alert_option_id === MY_ALERT_ACTIVISM_FILING_ALERT_OPTION_ID
            );
            if (filterActivismFilingOptions.length > 0) {
              // set news button active
              state.setFilingsButtonActive = 'btnActive';
              state.slideActivismFilingAnimation = 'd-block';
              state.isActiveSlideActivismFiling = true;

              // filter selection array
              const filterDdlActivismFilingOptions = alertsubOptionData
                .filter((c) => c.alert_option_link_id === filterActivismFilingOptions[0].alert_option_link_id)
                .map((x) => x.value);

              // filter array from selection array
              const lstFilingSelection = lstActivismFiling.filter((f) =>
                filterDdlActivismFilingOptions.some((d) => d === f.value)
              );
              state.ddlSpecificFillingTypeSelection = lstFilingSelection;
            } else {
              state.setFilingsButtonActive = '';
              state.slideActivismFilingAnimation = 'd-none';
              state.isActiveSlideActivismFiling = false;
            }

            const lstShortActivismNews = current(state).ddlActivismShortEventNewsAlerts;
            const filterShortActivismNewsOptions = alertOptionData.filter(
              (c) => c.alert_option_id === MY_ALERT_SHORT_ACTIVISM_NEWS_ALERT_OPTION_ID
            );
            if (filterShortActivismNewsOptions.length > 0) {
              // set news button active
              state.setNewsButtonActive = 'btnActive';
              state.slideActivismNewsAnimation = 'd-block';
              state.isActiveSlideActivismNews = true;

              // filter selection array
              const lstShortActivistTypeIds = filterShortActivismNewsOptions.map((x) => x.alert_option_link_id);
              const filterDdlActivismShortNewsOptions = alertsubOptionData
                .filter((x) => lstShortActivistTypeIds.some((p) => p === x.alert_option_link_id))
                .map((c) => c.value);

              // filter array from selection

              const lstShortNewsSelection = lstShortActivismNews.filter((f) =>
                filterDdlActivismShortNewsOptions.some((d) => d === f.value)
              );

              state.ddlActivismShortEventNewsAlertsSelection = lstShortNewsSelection;

              // filter and fill news tree selection
              const lstShortActivismTreeNews = current(state).ddlSpecificShortActivistActionNews;
              const myUpdateTreeViewListShortNews = [];
              lstShortActivismTreeNews.forEach((t) => {
                const chdNodeshort = [];
                let countSelectionShort = 0;
                t.children.forEach((tele) => {
                  if (filterDdlActivismShortNewsOptions.indexOf(tele.value) !== -1) {
                    chdNodeshort.push({ ...tele, checked: true });
                    countSelectionShort += 1;
                  } else {
                    chdNodeshort.push({ ...tele, checked: false });
                    countSelectionShort += 1;
                  }
                });
                if (t.children.length === countSelectionShort && t.children.length !== 0) {
                  myUpdateTreeViewListShortNews.push({
                    ...t,
                    children: chdNodeshort
                  });
                } else {
                  myUpdateTreeViewListShortNews.push(t);
                }
              });
              state.ddlSpecificShortActivistActionNews = myUpdateTreeViewListShortNews;
              // state.activismShortNewsActivistTypeSelection = filterDdlActivismShortNewsOptions;
            } else {
              state.setNewsButtonActive = '';
              state.slideActivismNewsAnimation = 'd-none';
              state.isActiveSlideActivismNews = false;
            }
            //Activist Demands botton

            const lstActivistDemands = current(state).ddlSpecificActivistDemands;
            const filterActivistDemandsOption = alertOptionData.filter(
              (c) => c.alert_option_id === MY_ALERT_ACTIVIST_DEMANDS_ALERT_OPTION_ID
            );
            if (filterActivistDemandsOption.length > 0) {
              // set news button active
              state.setNewsButtonActive = 'btnActive';
              state.slideActivismNewsAnimation = 'd-block';
              state.isActiveSlideActivismNews = true;

              // filter selection array
              const lstDemandsActivistTypeIds = filterActivistDemandsOption.map((x) => x.alert_option_link_id);
              const filterDdlActivistDemandsOptions = alertsubOptionData
                .filter((x) => lstDemandsActivistTypeIds.some((p) => p === x.alert_option_link_id))
                .map((c) => c.value);
              // filter and fill news tree selection
              const lsttActivistDemandsTreeNews = current(state).ddlSpecificActivistDemands;
              const myUpdateTreeViewListActivistDemands = [];
              lsttActivistDemandsTreeNews.forEach((t) => {
                const chdNodeshort = [];
                let countSelectionDemands = 0;
                t.children.forEach((tele) => {
                  if (filterDdlActivistDemandsOptions.indexOf(tele.value) !== -1) {
                    chdNodeshort.push({ ...tele, checked: true });
                    countSelectionDemands += 1;
                  } else {
                    chdNodeshort.push({ ...tele, checked: false });
                  }
                });
                if (t.children.length === countSelectionDemands && t.children.length !== 0) {
                  myUpdateTreeViewListActivistDemands.push({
                    ...t,
                    children: chdNodeshort,
                    checked: true
                  });
                } else {
                  if (chdNodeshort.length > 0) {
                    myUpdateTreeViewListActivistDemands.push({
                      ...t,
                      children: chdNodeshort
                    });
                  } else {
                    myUpdateTreeViewListActivistDemands.push(t);
                  }
                }
              });
              state.ddlSpecificActivistDemands = myUpdateTreeViewListActivistDemands;
              // state.activismShortNewsActivistTypeSelection = filterDdlActivistDemandsOptions;
            } else {
              state.setNewsButtonActive = '';
              state.slideActivismNewsAnimation = 'd-none';
              state.isActiveSlideActivismNews = false;
            }

            // here is all btn dropdown data

            const OptionsData = current(state).alertOptions;
            const selectedOptionIds = OptionsData.filter((c) =>
              alertOptionData.some((x) => x.alert_option_id === c.alert_option_id)
            );
            state.myAlertSelectedOptionIds = selectedOptionIds.map((x) => x.alert_option_id);

            const Ids = current(state).myAlertSelectedOptionIds;

            const lstSuboptions = alertOptionData.filter((c) => Ids.some((i) => i === c.alert_option_id));
            const subStaticIdData = alertsubOptionData.filter((c) =>
              lstSuboptions.some((x) => x.alert_option_link_id === c.alert_option_link_id)
            );
            const selectedSuboptions = lstalertSubOption.filter((c) =>
              subStaticIdData.some((x) => x.alert_suboption_id === c.alert_suboption_id)
            );
            state.myAlertSelectedSubOptionIds = selectedSuboptions;

            const selectedSuboptionStaticValue = lstAlertStaticSubOptions.filter((c) =>
              subStaticIdData.some((x) => x.value === c.value && x.alert_suboption_id === c.alert_suboption_id)
            );
            const getOptionData = [];
            selectedSuboptionStaticValue.forEach((y) => {
              selectedSuboptions.forEach((x) => {
                if (x.alert_suboption_id === y.alert_suboption_id) {
                  if (y.value !== null) {
                    getOptionData.push({
                      alert_option_id: x.alert_option_id,
                      alert_suboption_id: y.alert_suboption_id,
                      static_value_id: y.value,
                      value: y.value,
                      label: y.label
                    });
                  } else {
                    getOptionData.push({
                      alert_option_id: x.alert_option_id,
                      alert_suboption_id: y.alert_suboption_id,
                      static_value_id: null,
                      value: null,
                      label: null
                    });
                  }
                }
              });
            });
            state.myAlertSelectedSubOptionStatic = getOptionData;
          }
        }
      }
    },
    [getAlerModulAccessReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstAlertModuleAccess = action.payload !== undefined ? action.payload[0] : [];
      }
    },
    [getAlertInboxNameReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstAlertName = action.payload !== undefined ? action.payload.lstAlertName : [];
        state.ddlLstAlertName = action.payload !== undefined ? action.payload.result : [];
      }
    },
    [getAlertFilingDetailReq.fulfilled]: (state, action) => {
      if (action.payload !== null) {
        state.lstFiling = action.payload;
      }
    },
    [getSampleDataReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined) {
        state.lstSampleData = action.payload !== undefined ? action.payload : [];
      }
    },
    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
  }
});

export const {
  handleOnChangeDdlActivisamEventNews,
  handleOnChangeDdlActivisamShortEventNews,
  handleOnChangeDdlActivismNewsFillingAlert,
  handleOnChangeDdlSpecificNews,
  handleOnChangeDdlSpecificShortNews,

  handleOnChangeDdlDirectorType,
  handleOnChangeDdlAmendemntCategories,

  handleOnChangeAlertName,
  handleOnChangeChkNotifiedMe,
  handleOnChangeRdoEmailTo,
  handleOnChangeisJustMyJIOAlertInbox,
  handleGlobleResetMyAlert,
  handleOnEditMyAlert,
  handleCancelEditingAlert,
  handleDeleteOptionAndSubOptionLink,
  handleActivismNewsAlertbtnClick,
  handleActivismFilingAlertbtnClick,
  handleShortActivismOptionbtnClick,
  handleGovernanceOptionbtnClick,
  handleVotingOptionbtnClick,
  handleDynamicbtnClick,
  handleOnChangeDynamicDropdown,
  handleOnChangeDynamicSubOption,
  handleOnChangeDdlSpecificActivistDemands,
  handleButtonAccess,
  handleResetAlertFilterIds
} = MyAlertSlice.actions;

export default MyAlertSlice.reducer;
