import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  AddNewsVisitorLog,
  GetLatestNewsFiltered,
  GetAllProductLatestNews,
  GetActivistObjective,
  ListnewswithTag,
  GetNewsEvents,
  GetStakeholding,
  NewsFilter,
  getProductMemberships
} from '../../utils/news-util';
import { GetPeerGroupsData } from '../../utils/preferences-util';
import NewsTag from '../../constants/NewsTagConstant';
import product from '../../constants/ProductConstants';
import { oneChildtreeView, TokenDecode } from '../../utils/general-util';
import { NUMBER_ZERO, NUMBER_TWO, NUMBER_ONE, NUMBER_FOUR } from '../../constants/NumberConstants';
import { TRIAL_USER, NOT_TRIAL_USER } from '../../constants/TrialTypeConstants';

// Preferences page get all data
export const getPeerGroupDataReq = createAsyncThunk('getPeerGroupDataReq', async (req) => {
  const responsePeerGroups = await GetPeerGroupsData();
  return { responsePeerGroups, companyOption: req.comp, investerOption: req.inve };
});

export const GetLatestNewsFilteredReq = createAsyncThunk('GetLatestNewsFilteredReq', async () => {
  const response = await GetLatestNewsFiltered();
  return response;
});

export const getAllProductLatestNewsReq = createAsyncThunk('getAllProductLatestNewsReq', async (req) => {
  const response = await GetAllProductLatestNews(
    req.productid,
    req.cmpid,
    req.invid,
    req.isVulnerabilityReport === undefined ? 0 : req.isVulnerabilityReport
  );
  return {
    productid: req.productid,
    cmpid: req.cmpid,
    invid: req.invid,
    response,
    isVulnerabilityReport: req.isVulnerabilityReport
  };
});

export const newsAccessReq = createAsyncThunk('NewsAccessReq', async (productid) => {
  const response = await TokenDecode();
  const result = { productid, response };
  return result;
});

export const listnewswithTagReq = createAsyncThunk('listnewswithTagReq', async (tag) => {
  const response = await ListnewswithTag(tag);
  return { tag, response };
});

export const getNewsEventReq = createAsyncThunk('getNewsEventReq', async (activismCatId, longShort, isAdmin) => {
  const response = await GetNewsEvents(activismCatId, longShort, isAdmin);
  return response;
});

export const getStakeholdingReq = createAsyncThunk('getStakeholdingReq', async (activismCatId, isAdmin) => {
  const response = await GetStakeholding(activismCatId, isAdmin);
  return response;
});

export const getActivistObjectiveReq = createAsyncThunk('getActivistObjectiveReq', async (activismCatId) => {
  const response = await GetActivistObjective(activismCatId);
  return response;
});

export const NewsFilterReq = createAsyncThunk('NewsFilterReq', async (req) => {
  const response = await NewsFilter(
    req.CompanySearchId,
    req.InvestorSearchId,
    req.ActivistObjectiveGroupId !== null && req.ActivistObjectiveGroupId.length > 0
      ? req.ActivistObjectiveGroupId.join()
      : null,
    req.ActivistObjectiveTypeId !== null && req.ActivistObjectiveTypeId.length > 0
      ? req.ActivistObjectiveTypeId.join()
      : null,
    req.Stakeholding !== null && req.Stakeholding.length > 0 ? req.Stakeholding.join() : null,
    req.Event !== null && req.Event.length > 0 ? req.Event.join() : null,
    req.Freesearch,
    req.periodStart,
    req.periodEnd,
    req.product_id !== null && req.product_id.length > 0 ? req.product_id.join() : null,
  );
  return response;
});

export const getProductMembershipsReq = createAsyncThunk('getProductMembershipsReq', async () => {
  const dToken = await TokenDecode();
  const response = await getProductMemberships();
  const responseFiltered = [];
  if (response !== null && dToken !== null) {
    response.map((r) => {
      dToken.MemberShip.map((m) => {
        if (r.value === m.product_id && (m.status === TRIAL_USER || m.status === NOT_TRIAL_USER)) {
          responseFiltered.push(r);
        }
      });
    });
  }
  return responseFiltered;
});

const NewsSlice = createSlice({
  name: 'news',
  initialState: {
    isEnableVotingForCurrentUser: false,
    latestNews: [],
    covid19News: [],
    thisWeekNews: [],
    weeklyWrapNews: [],
    inDepthArticals: [],
    listForViewNewsTimelineTop5: [],
    allLatestActivismNews: [],
    activistShortNews: [],
    latestActivistVulnerabilityNews: [],
    reportsActivistVulnerabilityNews: [],
    governanceNews: [],
    votingNews: [],
    newsEvents: [],
    newsEventSelection: [],
    compensationNews: [],
    newsPeriod: [
      { label: NewsTag.PAST_WEEK, value: NewsTag.PAST_WEEK_VALUE },
      { label: NewsTag.PAST_FORTNIGHT, value: NewsTag.PAST_FORTNIGHT_VALUE },
      { label: NewsTag.PAST_MONTH, value: NewsTag.PAST_MONTH_VALUE },
      { label: NewsTag.PAST_THREE_MONTHS, value: NewsTag.PAST_THREE_MONTHS_VALUE },
      { label: NewsTag.SPECIFY_PERIOD, value: NewsTag.SPECIFY_PERIOD_VALUE },
      { label: NewsTag.ALL_TIME, value: NewsTag.ALL_TIME_VALUE }
    ],
    newsPeriodSelection: { label: NewsTag.ALL_TIME, value: NewsTag.ALL_TIME_VALUE },
    endNewsPeriodDate: null,
    startNewsPeriodDate: null,
    newsFreeSearchText: '',
    newsStakeholding: [],
    allActivistObjective: [],
    activistObjectiveSelection: [],

    // investorPeerGroupSelection:[],
    // companyPeerGroupSelection: [],
    filterByCompanySelection: null,
    filterByInvestorSelection: null,
    filterEvent: null,
    filterPeriodStart: null,
    filterPeriodEnd: null,
    filterFreeSearch: '',
    filterActiveObjectiveGroupSelection: null,
    filterActiveObjectiveTypeSelection: null,
    filterStackHolding: null,
    newsSearchResult: [],

    isResetInvestorPeerGroupSelection: false,
    isResetCompanyPeerGroupSelection: false,

    individualNewsDetails: null,
    individualNewsId: null,
    individualBackAddress: null,

    selectedSidebarNews: null,
    isClickModal: false,

    vulnHitsNews: [],
    vulnUpdatesNews: [],
    // isClickMostRead: false,
    shortsInDepthArticals: [],
    votingInDepthArticals: [],
    lstProductMembership: [],
    productSelections: [],
    filterProduct: null
  },
  reducers: {
    handleSelectSidebarNews: {
      reducer(state, action) {
        state.selectedSidebarNews = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleResetSidebarNews: {
      reducer(state) {
        state.selectedSidebarNews = null;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleIndividualNewsDetails: {
      reducer(state, action) {
        state.individualNewsDetails = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleIndividualNewsId: {
      reducer(state, action) {
        state.individualNewsId = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleIndividualBackAddress: {
      reducer(state, action) {
        if (action.payload !== undefined) {
          state.individualBackAddress = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleNewsVisitorLog: {
      reducer(state) {
        state.isLoading = true;
      },
      prepare(page, mode, newsid) {
        AddNewsVisitorLog(page, mode, newsid);
        return {
          payload: {}
        };
      }
    },
    handleNewsEventOnChange: {
      reducer(state, action) {
        state.newsEventSelection = action.payload.eventValue;
      },
      prepare(eventValue) {
        return {
          payload: { eventValue }
        };
      }
    },
    handleNewsProductOnChange: {
      reducer(state, action) {
        state.productSelections = action.payload.Value;
      },
      prepare(Value) {
        return {
          payload: { Value }
        };
      }
    },
    handleNewsPeriodSelection: {
      reducer(state, action) {
        if (action.payload.e === null) {
          state.newsPeriodSelection = { label: NewsTag.ALL_TIME, value: NewsTag.ALL_TIME_VALUE };
        } else {
          state.newsPeriodSelection = action.payload.e;
        }
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleNewsStakeholding: {
      reducer(state, action) {
        state.newsStakeholdingSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e }
        };
      }
    },
    handleOnStartDateChange: {
      reducer(state, action) {
        state.startNewsPeriodDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e }
        };
      }
    },
    handleOnEndDateChange: {
      // middleware: getDefaultMiddleware({
      //   serializableCheck: false,
      // }),
      reducer(state, action) {
        state.endNewsPeriodDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e }
        };
      }
    },
    handleNewsFreeSearchText: {
      reducer(state, action) {
        state.newsFreeSearchText = action.payload;
      },
      prepare(e) {
        return {
          payload: e.target.value
        };
      }
    },
    handleTreeViewActivistObjective: {
      reducer(state, action) {
        state.activistObjectiveSelection = action.payload.selectedNodes;
        const oldJson = current(state).allActivistObjective;
        state.allActivistObjective = oneChildtreeView(oldJson, action);
      },
      prepare(currentNode, selectedNodes) {
        return {
          payload: { currentNode, selectedNodes }
        };
      }
    },
    handleClearPeerGroupCompanySelection: {
      reducer(state, action) {
        state.filterByCompanySelection = null;
        state.companyPeerGroupSelection = undefined;
        state.isResetCompanyPeerGroupSelection = true;
        if (action.payload) {
          localStorage.removeItem('investorFilterData');
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleClearPeerGroupInvestorSelection: {
      reducer(state) {
        state.filterByInvestorSelection = null;
        state.investorPeerGroupSelection = undefined;
        state.isResetInvestorPeerGroupSelection = true;
        localStorage.removeItem('investorFilterData');
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleCompanyChangePeerGrp: {
      reducer(state) {
        state.isResetCompanyPeerGroupSelection = false;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleInvestorChangePeerGrp: {
      reducer(state) {
        state.isResetInvestorPeerGroupSelection = false;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleNewsfilterSelection: {
      reducer(state) {
        // event
        const newsEvent = current(state).newsEventSelection;
        const eventSelection = [];
        newsEvent !== null && newsEvent.forEach((e) => {
          eventSelection.push(e.value);
        });
        const product = current(state).productSelections;
        const productSelections = [];
        product !== null && product.forEach((e) => {
          productSelections.push(e.value);
        });

        // Period
        const period = current(state).newsPeriodSelection;
        let perioddateStart = null;
        let perioddateEnd = null;
        if (period !== undefined && period !== null) {
          if (NewsTag.PAST_WEEK === period.label || NewsTag.PAST_FORTNIGHT === period.label) {
            perioddateStart = new Date(new Date().setDate(new Date().getDate() + Number(period.value)));
          }

          if (NewsTag.PAST_MONTH === period.label || NewsTag.PAST_THREE_MONTHS === period.label) {
            perioddateStart = new Date(new Date().setMonth(new Date().getMonth() + Number(period.value)));
          }

          if (NewsTag.SPECIFY_PERIOD === period.label) {
            perioddateStart = current(state).startNewsPeriodDate;
            perioddateEnd = current(state).endNewsPeriodDate;
          }
        }

        // stakeholding
        const stakeholding = current(state).newsStakeholdingSelection;
        const stakeholdingSelection = [];
        if (stakeholding !== undefined && stakeholding !== null) {
          stakeholding.forEach((e) => {
            stakeholdingSelection.push(e.value);
          });
        }

        // activist objective selection
        const ObjectiveSelection_groupIds = [];
        const ObjectiveSelection_TypeIds = [];
        const ObjectiveSelection = current(state).activistObjectiveSelection;
        if (ObjectiveSelection !== undefined && ObjectiveSelection !== null) {
          ObjectiveSelection.forEach((e) => {
            if (e._depth === NUMBER_ZERO) {
              ObjectiveSelection_groupIds.push(e.value);
            }
            if (e._depth === NUMBER_ONE) {
              ObjectiveSelection_TypeIds.push(e.value);
            }
          });
        }

        // state.filterByCompanySelection=null;
        // state.filterByInvestorSelection=null;
        state.filterEvent = eventSelection;
        state.filterPeriodStart = perioddateStart;
        state.filterPeriodEnd = perioddateEnd;
        state.filterFreeSearch = current(state).newsFreeSearchText;
        state.filterActiveObjectiveGroupSelection = ObjectiveSelection_groupIds;
        state.filterActiveObjectiveTypeSelection = ObjectiveSelection_TypeIds;
        state.filterStackHolding = stakeholdingSelection;
        state.filterProduct = productSelections;
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handleResetNewsSelection: {
      reducer(state) {
        state.newsSearchResult = [];
      },
      prepare() {
        return {
          payload: {}
        };
      }
    },
    handlequickSearchReq: {
      reducer(state, action) {
        state.newsFreeSearchText = action.payload.searchtext;
        state.filterFreeSearch = action.payload.searchtext;
      },
      prepare(searchtext) {
        return {
          payload: { searchtext }
        };
      }
    },
    handleModalClickEvent: {
      reducer(state, action) {
        state.isClickModal = action.payload;
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    }

    // handleisClickMostRead: {
    //   reducer(state, action) {
    //     state.isClickMostRead = action.payload;
    //   },
    //   prepare(e) {
    //     return {
    //       payload: e,
    //     };
    //   },
    // },
  },
  extraReducers: {
    [GetLatestNewsFilteredReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.latestNews = action.payload;
      }
    },
    [getAllProductLatestNewsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (action.payload.productid === product.ACTIVISM) state.allLatestActivismNews = action.payload.response;
        if (action.payload.productid === product.ACTIVIST_SHORTS) state.activistShortNews = action.payload.response;
        if (action.payload.productid === product.ACTIVIST_VULNERABILITY && action.payload.isVulnerabilityReport) {
          state.reportsActivistVulnerabilityNews = action.payload.response;
        } else {
          state.latestActivistVulnerabilityNews = action.payload.response;
        }
        if (action.payload.productid === product.GOVERNANCE) state.governanceNews = action.payload.response;
        if (action.payload.productid === product.VOTING) state.votingNews = action.payload.response;
        if (action.payload.productid === product.COMPENSATION) state.compensationNews = action.payload.response;
      }
    },
    [newsAccessReq.fulfilled]: (state, action) => {
      if (action.payload !== false && action.payload.response !== undefined) {
        const membership = action.payload.response.MemberShip;
        if (
          membership.findIndex(
            (p) => p.product_id === action.payload.productid && (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= 0
        ) {
          state.isEnableVotingForCurrentUser = true;
        }
      }
    },
    [listnewswithTagReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (NewsTag.NEWS_TAG_COVID_19 === action.payload.tag) {
          state.covid19News = action.payload.response;
        }
        if (NewsTag.NEWS_TAG_THIS_WEEK === action.payload.tag) {
          state.thisWeekNews = action.payload.response;
        }
        if (NewsTag.NEWS_TAG_WEEKLY_WRAP === action.payload.tag) {
          state.weeklyWrapNews = action.payload.response;
        }
        // if (NewsTag.NEWS_TAG_IN_DEPTH === action.payload.tag) {
        //   state.inDepthArticals = action.payload.response;
        // }
        if (NewsTag.ACTIVISM_NEWS_TAG_IN_DEPTH === action.payload.tag || NewsTag.NEWS_TAG_IN_DEPTH === action.payload.tag) {
          state.inDepthArticals = action.payload.response;
        }
        if (NewsTag.ACTIVIST_SHORTS_NEWS_TAG_IN_DEPTH === action.payload.tag) {
          state.shortsInDepthArticals = action.payload.response;
        }
        if (NewsTag.VOTING_NEWS_TAG_IN_DEPTH === action.payload.tag) {
          state.votingInDepthArticals = action.payload.response;
        }
        if (NewsTag.NEWS_TAG_VULNERABILITY_HIT === action.payload.tag) {
          state.vulnHitsNews = action.payload.response;
        }
        if (NewsTag.NEWS_TAG_VULNERABILITY_UPDATE === action.payload.tag) {
          state.vulnUpdatesNews = action.payload.response;
        }
      }
    },
    [getNewsEventReq.fulfilled]: (state, action) => {
      state.newsEvents = action.payload;
    },
    [getStakeholdingReq.fulfilled]: (state, action) => {
      state.newsStakeholding = action.payload;
    },
    [getActivistObjectiveReq.fulfilled]: (state, action) => {
      state.allActivistObjective = action.payload;
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
            state.companyPeerGroupSelection = action.payload.responsePeerGroups.company_peer_group;
            state.filterByCompanySelection = action.payload.responsePeerGroups.company_peer_group.value;
          }
        }

        if (state.isResetInvestorPeerGroupSelection === false) {
          if (action.payload.investerOption !== undefined) {
            state.investorPeerGroupSelection = action.payload.investerOption;
            state.filterByInvestorSelection = action.payload.investerOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.investor_peer_group !== undefined
          ) {
            state.investorPeerGroupSelection = action.payload.responsePeerGroups.investor_peer_group;
            state.filterByInvestorSelection = action.payload.responsePeerGroups.investor_peer_group.value;
          }
        }
      }
    },
    [NewsFilterReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.newsSearchResult = action.payload;
      }
    },
    [getProductMembershipsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
         state.lstProductMembership = action.payload;
      }
    }
  }
});

export const {
  handleNewsVisitorLog,
  handleNewsEventOnChange,
  handleNewsPeriodSelection,
  handleOnStartDateChange,
  handleOnEndDateChange,
  handleNewsFreeSearchText,
  handleNewsStakeholding,
  handleTreeViewActivistObjective,
  handleNewsfilterSelection,
  handleResetNewsSelection,
  handlequickSearchReq,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleCompanyChangePeerGrp,
  handleInvestorChangePeerGrp,
  handleIndividualBackAddress,
  handleIndividualNewsDetails,
  handleIndividualNewsId,
  handleSelectSidebarNews,
  handleResetSidebarNews,
  handleModalClickEvent,
  // handleisClickMostRead,
  handleNewsProductOnChange
} = NewsSlice.actions;

export default NewsSlice.reducer;
