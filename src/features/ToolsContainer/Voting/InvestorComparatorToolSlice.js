import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { timeParse } from 'd3';
import {
  GetAllMeetingTypes,
  GetAllIndividualProponent,
  ResolutionsByInvestorFilter,
  ResolutionsByTarget,
  ResolutionSearchByInvestor,
  GetHistoricalTrends,
  GetResolutionsTypeIdByName,
  GetInvestorVotingPower,
  GetAllGroupProponent,
  InvestorComparatorhistoricalTrendsChartYTDData,
  InvestorComparatorhistoricalTrendsChartProxySeasonData,
  GetHistoricalTrendsChartDataInvestorComparator,
} from '../../../utils/tools-util';
import {
  TokenDecode,
  GetDefaultStartAndEndDate,
} from '../../../utils/general-util';
import { GetPeerGroupsData } from '../../../utils/preferences-util';
import InvestorComparatorConstant from '../../../constants/InvestorComparatorConstant';
import resolutionTrackerToolConst from '../../../constants/ResolutionTrackerToolConstant';
import InvestorTrackerConstant from '../../../constants/InvestorTrackerConstant';

const { startDate, endDate } = GetDefaultStartAndEndDate();

export const getTokenDecode = createAsyncThunk('getTokenDecode', async () => {
  const response = await TokenDecode();
  return response;
});

export const getAllMeetingTypeReq = createAsyncThunk(
  'GetAllMeetingTypeReq',
  async () => {
    const response = await GetAllMeetingTypes();
    return response;
  }
);
export const getAllIndividualProponentReq = createAsyncThunk(
  'getAllIndividualProponentReq',
  async () => {
    const response = await GetAllIndividualProponent();
    return response;
  }
);
export const getAllGroupProponentReq = createAsyncThunk(
  'getAllGroupProponentReq',
  async () => {
    const response = await GetAllGroupProponent();
    return response;
  }
);
export const resolutionsByInvestorFilterReq = createAsyncThunk(
  'resolutionsByInvestorFilterReq',
  async (req) => {
    const response = await ResolutionsByInvestorFilter(req);
    return response;
  }
);
// Preferences page get all data
export const getDefaultPeerGroupDataReq = createAsyncThunk(
  'getDefaultPeerGroupDataReq',
  async (req) => {
    const responsePeerGroups = await GetPeerGroupsData();
    return {
      responsePeerGroups,
      companyOption: req.comp,
      investerOption: req.inve,
    };
  }
);

export const resolutionsByInvestorDetailstReq = createAsyncThunk(
  'resolutionsByInvestorDetailstReq',
  async (req) => {
    const response = await ResolutionsByTarget(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType
    );
    return response;
  }
);
export const resolutionSearchByInvestorReq = createAsyncThunk(
  'resolutionSearchByInvestorReq',
  async (req) => {
    const response = await ResolutionSearchByInvestor(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType
    );
    return response;
  }
);
export const getResolutionsTypeIdByNameReq = createAsyncThunk(
  'getResolutionsTypeIdByNameReq',
  async (req) => {
    const response = await GetResolutionsTypeIdByName(
      req.lavel,
      req.proposalType
    );
    return { response, req };
  }
);
export const getInvestorVotingPowerReq = createAsyncThunk(
  'getInvestorVotingPowerReq',
  async (req) => {
    const response = await GetInvestorVotingPower(
      req.startDate,
      req.endDate,
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType
    );
    return response;
  }
);

export const getHistoricalTrendsReq = createAsyncThunk(
  'getHistoricalTrendsReq',
  async (req) => {
    const response = await GetHistoricalTrends(
      req.meetingType,
      req.proponent,
      req.proposalSponsor,
      req.companySearchId,
      req.investorSearchId,
      req.proposalTypeTopLevel,
      req.ProposalTypeSubLevel,
      req.proposalType,
      InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
    );
    return response;
  }
);
export const investorComparatorhistoricalTrendsChartYTDDataReq =
  createAsyncThunk(
    'investorComparatorhistoricalTrendsChartYTDDataReq',
    async (req) => {
      const response = await InvestorComparatorhistoricalTrendsChartYTDData(
        req.meetingType,
        req.proponent,
        req.proposalSponsor,
        req.companySearchId,
        req.investorSearchId,
        req.proposalTypeTopLevel,
        req.ProposalTypeSubLevel,
        req.proposalType,
        InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
      );
      return response;
    }
  );

export const investorComparatorhistoricalTrendsChartProxySeasonDataReq =
  createAsyncThunk(
    'investorComparatorhistoricalTrendsChartProxySeasonDataReq',
    async (req) => {
      const response =
        await InvestorComparatorhistoricalTrendsChartProxySeasonData(
          req.meetingType,
          req.proponent,
          req.proposalSponsor,
          req.companySearchId,
          req.investorSearchId,
          req.proposalTypeTopLevel,
          req.ProposalTypeSubLevel,
          req.proposalType,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
        );
      return response;
    }
  );

export const getHistoricalTrendsChartDataInvestorComparatorReq =
  createAsyncThunk(
    'getHistoricalTrendsChartDataInvestorComparatorReq',
    async (req) => {
      const response = await GetHistoricalTrendsChartDataInvestorComparator(
        req.meetingType,
        req.proponent,
        req.proposalSponsor,
        req.companySearchId,
        req.investorSearchId,
        req.proposalTypeTopLevel,
        req.ProposalTypeSubLevel,
        req.proposalType,
        InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION
      );
      return response;
    }
  );
//////////////////////////////////

function PrepareStackedChartJson(arry) {
  const lstChartJson = [];
  try {
    if (arry === undefined || arry === null || arry.length === 0) {
      return lstChartJson;
    }
    const distinctInvestorIds = [
      ...new Set(arry.map((item) => item.investor_id)),
    ];

    distinctInvestorIds.forEach((invId) => {
      const invName = arry.filter((c) => c.investor_id === invId)[0]
        .investor_name;
      const investerName =
        invName !== undefined && invName !== null ? invName : '';

      // const now = new Date().getUTCFullYear();
      // const listOfYears = Array(now - (now - 7))
      //   .fill('')
      //   .map((v, idx) => now - idx)
      //   .sort();

      const listOfYears = new Set(
        arry
          .map((item) => {
            const arr = { display_year: item.display_year, year: item.year };
            return arr;
          })
          .sort((a, b) => Date.parse(a.year) - Date.parse(b.year))
          .map((x) => `${x.display_year},${x.year}`)
      );

      listOfYears.forEach((xYear) => {
        const display_year = xYear.split(',')[0];
        const selYear = Number(xYear.split(',')[1]);

        let chartJson_FOR = {
          Investor: investerName,
          InvestorId: invId,
          InvestorStrRep: investerName.replace(',', '_'),
          Year: selYear,
          display_year: display_year,
          VoteCast: 'FOR',
        };
        let chartJson_AG = {
          Investor: investerName,
          InvestorId: invId,
          InvestorStrRep: investerName.replace(',', '_'),
          Year: selYear,
          display_year: display_year,
          VoteCast: 'AG',
        };
        let chartJson_AB = {
          Investor: investerName,
          InvestorId: invId,
          InvestorStrRep: investerName.replace(',', '_'),
          Year: selYear,
          display_year: display_year,
          VoteCast: 'AB',
        };

        const forSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_FOR;
        const abSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_ABSTAIN;
        const agSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_AGAINST;

        const voteCast_for = arry
          .filter(
            (c) =>
              c.investor_id === invId &&
              c.year === selYear &&
              c.voteCastInt === forSelection
          )
          .map((d) => d.number_votes);

        const voteCast_ab = arry
          .filter(
            (c) =>
              c.investor_id === invId &&
              c.year === selYear &&
              c.voteCastInt === abSelection
          )
          .map((d) => d.number_votes);

        const voteCast_ag = arry
          .filter(
            (c) =>
              c.investor_id === invId &&
              c.year === selYear &&
              c.voteCastInt === agSelection
          )
          .map((d) => d.number_votes);

        const whereVoteCastArr = arry.filter(
          (c) =>
            c.investor_id === invId &&
            c.year === selYear &&
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_VOTECAST_SUM.includes(
              c.voteCastInt
            )
        );
        const whereVoteCastInt_sum =
          whereVoteCastArr !== null && whereVoteCastArr !== undefined
            ? whereVoteCastArr
                .map((d) => d.number_votes)
                .reduce((a, b) => a + b, 0)
            : 0;

        let Value_FOR = 0;
        let Value_AG = 0;
        let Value_AB = 0;

        if (whereVoteCastInt_sum !== 0) {
          Value_FOR = Number(
            (voteCast_for / whereVoteCastInt_sum) * 100
          ).toFixed(2);
        }

        if (whereVoteCastInt_sum !== 0) {
          Value_AG = Number((voteCast_ag / whereVoteCastInt_sum) * 100).toFixed(
            2
          );
        }

        if (whereVoteCastInt_sum !== 0) {
          Value_AB = Number((voteCast_ab / whereVoteCastInt_sum) * 100).toFixed(
            2
          );
        }

        chartJson_FOR = { ...chartJson_FOR, Value: Value_FOR.toString() };
        chartJson_AG = { ...chartJson_AG, Value: Value_AG.toString() };
        chartJson_AB = { ...chartJson_AB, Value: Value_AB.toString() };

        lstChartJson.push(chartJson_FOR);
        lstChartJson.push(chartJson_AG);
        lstChartJson.push(chartJson_AB);
      });
    });
  } catch (e) {
    console.log(`Investor comperator |  PrepareStackedChartJson :=> \n${e}`);
  }
  return lstChartJson;
}

function PrepareLinechartjsonSecond(arry, selection, InvestorIds) {
  if (arry && arry.length > 0) {
    const defaultTopInvestors =
      InvestorIds !== undefined && InvestorIds !== null
        ? InvestorIds
        : InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_INVESTOR_SELECTION;
    let newDtSelections = [];
    const defaultChartSelections = arry
      .filter((c) => defaultTopInvestors.includes(c.investor_id))
      .slice(0, selection);
    if (defaultChartSelections && defaultChartSelections.length > 0) {
      newDtSelections = defaultChartSelections;
      if (newDtSelections && newDtSelections.length < selection) {
        const takemoreval = selection - newDtSelections.length;
        if (takemoreval >= 0) {
          const defaultChartSelections2 = arry
            .filter((c) => !defaultTopInvestors.includes(c.investor_id))
            .slice(0, takemoreval);
          if (defaultChartSelections2 && defaultChartSelections2.length > 0) {
            newDtSelections.concat(defaultChartSelections2);
          }
        }
      }
    } else {
      newDtSelections = arry.slice(0, selection);
    }

    const myLineChartJson = [];
    newDtSelections.forEach((e) => {
      const JsonValues = [];

      const parseDate = timeParse('%Y');
      const now = new Date().getUTCFullYear();

      Object.keys(e).forEach((k) => {
        if (e[k] !== null) {
          if (k === 'year6') {
            JsonValues.push({ Year: parseDate(now - 6), ChartValue: e[k] });
          }
          if (k === 'year5') {
            JsonValues.push({ Year: parseDate(now - 5), ChartValue: e[k] });
          }
          if (k === 'year4') {
            JsonValues.push({ Year: parseDate(now - 4), ChartValue: e[k] });
          }
          if (k === 'year3') {
            JsonValues.push({ Year: parseDate(now - 3), ChartValue: e[k] });
          }
          if (k === 'year2') {
            JsonValues.push({ Year: parseDate(now - 2), ChartValue: e[k] });
          }
          if (k === 'year1') {
            JsonValues.push({ Year: parseDate(now - 1), ChartValue: e[k] });
          }
          if (k === 'current') {
            JsonValues.push({ Year: parseDate(now), ChartValue: e[k] });
          }
        }
      });

      myLineChartJson.push({
        Investor: e.Investor,
        InvestorStrRep: e.Investor.replace(',', '_'),
        InvestorId: e.investor_id,
        Values: JsonValues,
      });
    });

    return myLineChartJson;
  }
}

//////////////////////////////////

const InvestorComparatorToolSlice = createSlice({
  name: 'investorComparatorTool',
  initialState: {
    // InvestorComparator - Filter
    startInvCompDate: startDate,
    endInvCompDate: endDate,
    isInvCompDateChecked: false,
    isProponentGroup: true,
    sponsorSelection: { label: 'All', value: null },
    lstSponsor: [
      { label: 'All', value: null },
      { label: 'Management', value: '1' },
      { label: 'Shareholder', value: '2' },
    ],
    lstIndividualProponent: [],
    individualProponentSelection: [],
    lstGroupProponent: [],
    groupProponentSelection: [],
    lstMeetingTypes: [],
    meetingTypeSelection: [],

    // Investor Details section - click on 'More Detail' Button
    lstResolutionInvDetails: [],
    lstResolutionInvDetailsFullData: [],

    // ResolutionType Table
    lstResolutionsByInvestorFilter: [],
    lstResolutionsByInvestorFilterFullData: [],
    lstExcelDownload_ResolutionsByInvestorFilter: [],
    lstExcelDownload_ResolutionsByInvestorFilterFullData: [],

    // Showing Component
    isShowInvestorDetails: false,
    isShowVotingDetails: false,
    isShowVotingPower: false,
    isShowInvestorTrends: false,

    selectedInvestorDetailsProposalTypeId: null,
    selectedInvestorDetailsProposalSubLevelTypeId: null,
    selectedInvestorDetailsProposalTopLevelTypeId: null,
    isLoading: true,
    isLoadingInvestorDetails: true,
    currentResolutionTypeSelection:
      InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL,

    lstVotingDetails: [],
    isLoadingVotingDetails: true,
    lstVotingInvestorPower: [],
    lstVotingPvaImpact: [],

    isLoadVotingPowerData: true,
    isResetInvestorPeerGroupSelection: false,
    isResetCompanyPeerGroupSelection: false,
    getTokenDecode: [],

    // #region Historical Trends

    // Buttons - Calendar, YTD & Proxy season
    isSelectedCalendarYearData: true,
    isSelectedYearToDateData: false,
    isSelectedProxySeasonData: false,

    // Loading Historical Trends
    isLoadHistoricalTrends: true,

    // DropdownList Option List
    lstDdlHistoricalsInvestors: [],

    // Line chart
    lstLineChartData: [],
    lstLineChartDataFullYear: [],
    lstLineChartDataYTD: [],
    lstLineChartDataProxySeason: [],

    // Stackbar chart
    lstStackBarChartData: [],
    lstInvestorComparatorHistoricalAnalysisChartDataFullYear: [],
    lstInvestorComparatorHistoricalAnalysisChartDataYTD: [],
    lstInvestorComparatorHistoricalAnalysisChartProxySeasonData: [],

    // All Investors data
    lstAllHistoricalInvestorFullYear: [],
    lstAllHistoricalInvestorYTD: [],
    lstAllHistoricalInvestorProxySeason: [],

    // DropdownList Selection
    DdlhistoricalInvestorSelection: [],
    DdlhistoricalInvestorSelectionFullYear: [],
    DdlhistoricalInvestorSelectionYTD: [],
    DdlhistoricalInvestorSelectionProxySeason: [],

    // Radio Buttons
    isShowHistoricalTrendsFor: true,
    isShowHistoricalTrendsAgainst: false,
    isShowHistoricalTrendsAbstain: false,

    // table data - For, Against & Abstain
    lstHistoricalInvestors: [],
    lstHistoricalInvestorsForFullYear: [],
    lstHistoricalInvestorsAgainstFullYear: [],
    lstHistoricalInvestorsAbstainFullYear: [],
    lstHistoricalInvestorsForYTD: [],
    lstHistoricalInvestorsAgainstYTD: [],
    lstHistoricalInvestorsAbstainYTD: [],
    lstHistoricalInvestorsForProxySeason: [],
    lstHistoricalInvestorsAgainstProxySeason: [],
    lstHistoricalInvestorsAbstainProxySeason: [],

    // #endregion

    isLoading_InvestorVotingByProposal: true,
    chartYearDataPDF: null,
    lineChartShowData: null,
  },
  reducers: {
    handleResetInvestorComparatorTool: {
      reducer(state) {
        state.isLoading = true;

        state.isLoadingInvestorDetails = true;
        state.isLoadingVotingDetails = true;

        // InvestorComparator - Filter
        state.startInvCompDate = startDate;
        state.endInvCompDate = endDate;
        state.isInvCompDateChecked = true;
        state.isProponentGroup = true;
        state.sponsorSelection = { label: 'All', value: null };
        state.lstSponsor = [
          { label: 'All', value: null },
          { label: 'Management', value: '1' },
          { label: 'Shareholder', value: '2' },
        ];
        state.lstIndividualProponent = [];
        state.individualProponentSelection = [];
        state.lstGroupProponent = [];
        state.groupProponentSelection = [];
        state.lstMeetingTypes = [];
        state.meetingTypeSelection = [];

        // Showing Component
        state.isShowInvestorDetails = false;
        state.isShowVotingDetails = false;
        state.isShowVotingPower = false;
        state.isShowInvestorTrends = false;

        // Resolution Type Table
        state.lstResolutionsByInvestorFilter = [];
        state.lstResolutionsByInvestorFilterFullData = [];
        state.lstExcelDownload_ResolutionsByInvestorFilter = [];
        state.lstExcelDownload_ResolutionsByInvestorFilterFullData = [];

        // Investor Details section
        state.lstResolutionInvDetails = [];
        state.lstResolutionInvDetailsFullData = [];

        // #region Historical Trends

        // Buttons - Calendar, YTD & Proxy season
        state.isSelectedCalendarYearData = true;
        state.isSelectedYearToDateData = false;
        state.isSelectedProxySeasonData = false;

        // Loading Historical Trends
        state.isLoadHistoricalTrends = true;

        // DropdownList Option List
        state.lstDdlHistoricalsInvestors = [];

        // Line chart
        state.lstLineChartData = [];
        state.lstLineChartDataFullYear = [];
        state.lstLineChartDataYTD = [];
        state.lstLineChartDataProxySeason = [];

        // Stackbar chart
        state.lstStackBarChartData = [];
        state.lstInvestorComparatorHistoricalAnalysisChartDataFullYear = [];
        state.lstInvestorComparatorHistoricalAnalysisChartDataYTD = [];
        state.lstInvestorComparatorHistoricalAnalysisChartProxySeasonData = [];

        // All Investors data
        state.lstAllHistoricalInvestorFullYear = [];
        state.lstAllHistoricalInvestorYTD = [];
        state.lstAllHistoricalInvestorProxySeason = [];

        // DropdownList Selection
        state.DdlhistoricalInvestorSelection = [];
        state.DdlhistoricalInvestorSelectionFullYear = [];
        state.DdlhistoricalInvestorSelectionYTD = [];
        state.DdlhistoricalInvestorSelectionProxySeason = [];

        // Radio Buttons
        state.isShowHistoricalTrendsFor = true;
        state.isShowHistoricalTrendsAgainst = false;
        state.isShowHistoricalTrendsAbstain = false;

        // table data - For, Against & Abstain
        state.lstHistoricalInvestors = [];
        state.lstHistoricalInvestorsForFullYear = [];
        state.lstHistoricalInvestorsAgainstFullYear = [];
        state.lstHistoricalInvestorsAbstainFullYear = [];
        state.lstHistoricalInvestorsForYTD = [];
        state.lstHistoricalInvestorsAgainstYTD = [];
        state.lstHistoricalInvestorsAbstainYTD = [];
        state.lstHistoricalInvestorsForProxySeason = [];
        state.lstHistoricalInvestorsAgainstProxySeason = [];
        state.lstHistoricalInvestorsAbstainProxySeason = [];

        // #endregion
        state.isLoading_InvestorVotingByProposal = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleResetInvestorComparatorTool_HistoricalTrends: {
      reducer(state) {
        // #region Historical Trends

        state.isShowInvestorDetails = false;
        state.isShowInvestorTrends = false;
        state.isShowVotingDetails = false;
        state.isShowVotingPower = false;

        // Investor Details section - click on 'More Detail' Button
        state.lstResolutionInvDetails = [];
        state.lstResolutionInvDetailsFullData = [];

        // Buttons - Calendar, YTD & Proxy season
        state.isSelectedCalendarYearData = true;
        state.isSelectedYearToDateData = false;
        state.isSelectedProxySeasonData = false;

        // Loading Historical Trends
        state.isLoadHistoricalTrends = true;

        // DropdownList Option List
        state.lstDdlHistoricalsInvestors = [];

        // Line chart
        state.lstLineChartData = [];
        state.lstLineChartDataFullYear = [];
        state.lstLineChartDataYTD = [];
        state.lstLineChartDataProxySeason = [];

        // Stackbar chart
        state.lstStackBarChartData = [];
        state.lstInvestorComparatorHistoricalAnalysisChartDataFullYear = [];
        state.lstInvestorComparatorHistoricalAnalysisChartDataYTD = [];
        state.lstInvestorComparatorHistoricalAnalysisChartProxySeasonData = [];

        // All Investors data
        state.lstAllHistoricalInvestorFullYear = [];
        state.lstAllHistoricalInvestorYTD = [];
        state.lstAllHistoricalInvestorProxySeason = [];

        // DropdownList Selection
        state.DdlhistoricalInvestorSelection = [];
        state.DdlhistoricalInvestorSelectionFullYear = [];
        state.DdlhistoricalInvestorSelectionYTD = [];
        state.DdlhistoricalInvestorSelectionProxySeason = [];

        // Radio Buttons
        state.isShowHistoricalTrendsFor = true;
        state.isShowHistoricalTrendsAgainst = false;
        state.isShowHistoricalTrendsAbstain = false;

        // table data - For, Against & Abstain
        state.lstHistoricalInvestors = [];
        state.lstHistoricalInvestorsForFullYear = [];
        state.lstHistoricalInvestorsAgainstFullYear = [];
        state.lstHistoricalInvestorsAbstainFullYear = [];
        state.lstHistoricalInvestorsForYTD = [];
        state.lstHistoricalInvestorsAgainstYTD = [];
        state.lstHistoricalInvestorsAbstainYTD = [];
        state.lstHistoricalInvestorsForProxySeason = [];
        state.lstHistoricalInvestorsAgainstProxySeason = [];
        state.lstHistoricalInvestorsAbstainProxySeason = [];

        // #endregion
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleSponsorSelection: {
      reducer(state, action) {
        if (action.payload.e !== null) {
          state.sponsorSelection = action.payload.e;
        } else {
          state.sponsorSelection = { label: 'All', value: null };
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleMeetingTypeSelection: {
      reducer(state, action) {
        state.meetingTypeSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleIndividualProponentSelection: {
      reducer(state, action) {
        state.individualProponentSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleGroupProponentSelection: {
      reducer(state, action) {
        state.groupProponentSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleStartInvCompDateSelection: {
      reducer(state, action) {
        state.startInvCompDate = action.payload.date;
        if (state.endInvCompDate <= action.payload.date) {
          state.endInvCompDate = action.payload.date;
        }
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e },
        };
      },
    },
    handleEndInvCompDateSelection: {
      reducer(state, action) {
        state.endInvCompDate = action.payload.date;
      },
      prepare(value, e) {
        return {
          payload: { date: new Date(value), e },
        };
      },
    },
    handleIsInvCompDateChecked: {
      reducer(state, action) {
        state.isInvCompDateChecked = action.payload.isChecked;
      },
      prepare(e) {
        return {
          payload: { isChecked: e.target.checked },
        };
      },
    },
    handleProponentGroupsearch: {
      reducer(state, action) {
        state.isProponentGroup = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleComapnySearchSelectionInvComp: {
      reducer(state, action) {
        state.invCompCompanyPeerGroupSelection = undefined;
        const data = JSON.parse(localStorage.getItem('companyFilterData'));
        state.invCompCompanyPeerGroupSelection = action.payload.e;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleInvestorSearchSelectionInvComp: {
      reducer(state, action) {
        state.invCompInvestorPeerGroupSelection = undefined;
        const inv_data = JSON.parse(localStorage.getItem('investorFilterData'));
        state.invCompInvestorPeerGroupSelection =
          action.payload.e !== undefined ? action.payload.e : inv_data;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleClearPeerGroupCompanySelection: {
      reducer(state, action) {
        state.filterByCompanySelection = null;
        state.companyPeerGroupSelection = undefined;
        state.invCompCompanyPeerGroupSelection = undefined;
        state.isResetCompanyPeerGroupSelection = true;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleClearPeerGroupInvestorSelection: {
      reducer(state, action) {
        state.filterByInvestorSelection = null;
        state.investorPeerGroupSelection = undefined;
        state.invCompInvestorPeerGroupSelection = undefined;
        state.isResetInvestorPeerGroupSelection = true;
      },
      prepare(e) {
        return {
          payload: e,
        };
      },
    },
    handleClearResult: {
      reducer(state) {
        state.lstResolutionsByInvestorFilter = [];
        state.lstResolutionsByInvestorFilterFullData = [];
        state.lstExcelDownload_ResolutionsByInvestorFilter = [];
        state.lstExcelDownload_ResolutionsByInvestorFilterFullData = [];
        state.isLoading = true;
        state.isLoading_InvestorVotingByProposal = true;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleInvestorComparatorSelection: {
      reducer(state, action) {
        state.isLoadingInvestorDetails = true;
        const invCompVal =
          current(state).lstResolutionsByInvestorFilterFullData;
        if (action.payload.invId) {
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) => c.proposal_type_id === action.payload.invId
          );
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE;
        }

        if (
          action.payload.lavel === 'proposal_top_level' &&
          action.payload.keyVal === 'All'
        ) {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL;
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) =>
              c.proposal_top_level === null &&
              c.Category_Sub_level === null &&
              c.proposal_type === null
          );
        }

        if (
          action.payload.lavel === 'proposal_top_level' &&
          action.payload.keyVal !== 'All'
        ) {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL;
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) =>
              c.proposal_top_level === action.payload.keyVal &&
              c.Category_Sub_level === null
          );
        }
        if (action.payload.lavel === 'Category_Sub_level') {
          state.currentResolutionTypeSelection =
            InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL;
          state.lstResolutionsByInvestorFilter = invCompVal.filter(
            (c) =>
              c.Category_Sub_level === action.payload.keyVal &&
              c.proposal_type === null
          );
        }

        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_MORE_DETAILS
        ) {
          state.isShowInvestorTrends = false;
          state.isShowVotingPower = false;
          state.isShowInvestorDetails = true;
        }
        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_TRENDS
        ) {
          state.isShowVotingPower = false;
          state.isLoadHistoricalTrends = true;
          state.isShowInvestorDetails = false;
          state.isShowInvestorTrends = true;
          state.isLoadingInvestorDetails = false;
        }

        if (
          action.payload.clickFor ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_VOTING_POWER
        ) {
          state.isLoadHistoricalTrends = false;
          state.isShowInvestorDetails = false;
          state.isShowInvestorTrends = false;
          state.isShowVotingPower = true;
        }
      },
      prepare(lavel, keyVal, invId, clickFor) {
        return {
          payload: {
            lavel,
            keyVal,
            invId,
            clickFor,
          },
        };
      },
    },
    handleCloseInvestorDetails: {
      reducer(state) {
        const allData = current(state).lstResolutionsByInvestorFilterFullData;
        state.currentResolutionTypeSelection =
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL_ALL;

        // Resolution Type Table
        state.lstResolutionsByInvestorFilter = allData;

        // Investor Details section
        state.lstResolutionInvDetails = [];

        state.lstVotingPvaImpact = [];
        state.lstVotingInvestorPower = [];

        state.isShowInvestorDetails = false;
        state.isShowInvestorTrends = false;
        state.isShowInvestorTrends = false;
        state.isShowVotingPower = false;
        state.isShowVotingDetails = false;
        state.isLoadVotingPowerData = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    handleInvestorDetailsSelection: {
      reducer(state, action) {
        const invData = current(state).lstResolutionInvDetailsFullData;
        if (action.payload.investorid !== undefined) {
          state.lstResolutionInvDetails = invData.filter(
            (c) => c.investor_id === action.payload.investorid
          );
        }
        state.isShowVotingDetails = true;
      },
      prepare(investorid) {
        return {
          payload: { investorid },
        };
      },
    },
    handleCloseVoringDetails: {
      reducer(state) {
        const allData = current(state).lstResolutionInvDetailsFullData;
        state.lstResolutionInvDetails = allData;
        state.isShowVotingDetails = false;
        state.isShowInvestorTrends = false;
        state.isLoadingVotingDetails = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    // DDL selection click - Historical Trends
    handleOnChangeHistoricalInvestor: {
      reducer(state, action) {
        if (
          action.payload.e &&
          action.payload.e.length <=
            InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_MAX_SELECTION
        ) {
          state.DdlhistoricalInvestorSelection = action.payload.e;
          let lstInvForData = [];
          let lstAgainstData = [];
          let lstAbstainData = [];

          let ddlSelectionValues = [];

          if (current(state).isSelectedCalendarYearData) {
            lstInvForData = current(state).lstHistoricalInvestorsForFullYear;
            lstAgainstData =
              current(state).lstHistoricalInvestorsAgainstFullYear;
            lstAbstainData =
              current(state).lstHistoricalInvestorsAbstainFullYear;

            const lstAllInvestors =
              current(state).lstAllHistoricalInvestorFullYear;

            ddlSelectionValues = action.payload.e.map((c) => c.value);
            const defaultChartSelections = lstAllInvestors.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            const data = PrepareStackedChartJson(defaultChartSelections);

            state.lstStackBarChartData = data;
            state.lstInvestorComparatorHistoricalAnalysisChartDataFullYear =
              data;

            state.DdlhistoricalInvestorSelectionFullYear = action.payload.e;
          }
          if (current(state).isSelectedYearToDateData) {
            lstInvForData = current(state).lstHistoricalInvestorsForYTD;
            lstAgainstData = current(state).lstHistoricalInvestorsAgainstYTD;
            lstAbstainData = current(state).lstHistoricalInvestorsAbstainYTD;

            const lstAllInvestors = current(state).lstAllHistoricalInvestorYTD;
            ddlSelectionValues = action.payload.e.map((c) => c.value);

            const defaultChartSelections = lstAllInvestors.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            const data = PrepareStackedChartJson(defaultChartSelections);

            state.lstStackBarChartData = data;

            state.lstInvestorComparatorHistoricalAnalysisChartDataYTD = data;
            state.DdlhistoricalInvestorSelectionYTD = action.payload.e;
          }
          if (current(state).isSelectedProxySeasonData) {
            lstInvForData = current(state).lstHistoricalInvestorsForProxySeason;
            lstAgainstData =
              current(state).lstHistoricalInvestorsAgainstProxySeason;
            lstAbstainData =
              current(state).lstHistoricalInvestorsAbstainProxySeason;

            const lstAllInvestors =
              current(state).lstAllHistoricalInvestorProxySeason;
            ddlSelectionValues = action.payload.e.map((c) => c.value);

            const defaultChartSelections = lstAllInvestors.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            const data = PrepareStackedChartJson(defaultChartSelections);

            state.lstStackBarChartData = data;

            state.lstInvestorComparatorHistoricalAnalysisChartProxySeasonData =
              data;
            state.DdlhistoricalInvestorSelectionProxySeason = action.payload.e;
          }

          const isForSelection = current(state).isShowHistoricalTrendsFor;
          const isAgainstSelection =
            current(state).isShowHistoricalTrendsAgainst;
          const isAbstainSelection =
            current(state).isShowHistoricalTrendsAbstain;

          if (isForSelection) {
            const filterForSelection = lstInvForData.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            const data = PrepareLinechartjsonSecond(
              filterForSelection,
              filterForSelection.map((x) => x.investor_id).length,
              filterForSelection.map((x) => x.investor_id)
            );
            state.lstLineChartData = data; // default
            if (current(state).isSelectedCalendarYearData) {
              state.lstLineChartDataFullYear = data; // store data in state as button name
            }
            if (current(state).isSelectedYearToDateData) {
              state.lstLineChartDataYTD = data;
            }
            if (current(state).isSelectedProxySeasonData) {
              state.lstLineChartDataProxySeason = data;
            }
          }
          if (isAgainstSelection) {
            const filterAgainstSelection = lstAgainstData.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            const data = PrepareLinechartjsonSecond(
              filterAgainstSelection,
              filterAgainstSelection.map((x) => x.investor_id).length,
              filterAgainstSelection.map((x) => x.investor_id)
            );
            state.lstLineChartData = data;
            if (current(state).isSelectedCalendarYearData) {
              state.lstLineChartDataFullYear = data;
            }
            if (current(state).isSelectedYearToDateData) {
              state.lstLineChartDataYTD = data;
            }
            if (current(state).isSelectedProxySeasonData) {
              state.lstLineChartDataProxySeason = data;
            }
          }
          if (isAbstainSelection) {
            const filterAbstainSelection = lstAbstainData.filter((c) =>
              ddlSelectionValues.includes(c.investor_id)
            );
            const data = PrepareLinechartjsonSecond(
              filterAbstainSelection,
              filterAbstainSelection.map((x) => x.investor_id).length,
              filterAbstainSelection.map((x) => x.investor_id)
            );
            state.lstLineChartData = data;
            if (current(state).isSelectedCalendarYearData) {
              state.lstLineChartDataFullYear = data;
            }
            if (current(state).isSelectedYearToDateData) {
              state.lstLineChartDataYTD = data;
            }
            if (current(state).isSelectedProxySeasonData) {
              state.lstLineChartDataProxySeason = data;
            }
          }
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    // Buttons click - Calendar, YTD & Proxy season
    handleOnClickIsSelectedFullYearData: {
      reducer(state, action) {
        const status = action.payload.e;
        state.chartYearDataPDF = status;
        if (status === resolutionTrackerToolConst.USE_CALENDAR_YEAR_DATA) {
          state.isSelectedCalendarYearData = true;
          state.isSelectedYearToDateData = false;
          state.isSelectedProxySeasonData = false;
        }
        if (status === resolutionTrackerToolConst.USE_YEAR_TO_DATE_DATA) {
          state.isSelectedCalendarYearData = false;
          state.isSelectedYearToDateData = true;
          state.isSelectedProxySeasonData = false;
        }
        if (status === resolutionTrackerToolConst.USE_PROXY_SEASON_DATA) {
          state.isSelectedCalendarYearData = false;
          state.isSelectedYearToDateData = false;
          state.isSelectedProxySeasonData = true;
        }

        let stackBarchartData = [];
        let linechartData = [];

        let lstInvForData = [];
        let lstAgainstData = [];
        let lstAbstainData = [];

        if (current(state).isSelectedCalendarYearData) {
          stackBarchartData =
            current(
              state
            ).lstInvestorComparatorHistoricalAnalysisChartDataFullYear;
          linechartData = current(state).lstLineChartDataFullYear;
          state.DdlhistoricalInvestorSelection =
            current(state).DdlhistoricalInvestorSelectionFullYear;
          lstInvForData = current(state).lstHistoricalInvestorsForFullYear;
          lstAgainstData = current(state).lstHistoricalInvestorsAgainstFullYear;
          lstAbstainData = current(state).lstHistoricalInvestorsAbstainFullYear;
        }
        if (current(state).isSelectedYearToDateData) {
          stackBarchartData =
            current(state).lstInvestorComparatorHistoricalAnalysisChartDataYTD;
          linechartData = current(state).lstLineChartDataYTD;
          state.DdlhistoricalInvestorSelection =
            current(state).DdlhistoricalInvestorSelectionYTD;
          lstInvForData = current(state).lstHistoricalInvestorsForYTD;
          lstAgainstData = current(state).lstHistoricalInvestorsAgainstYTD;
          lstAbstainData = current(state).lstHistoricalInvestorsAbstainYTD;
        }
        if (current(state).isSelectedProxySeasonData) {
          stackBarchartData =
            current(
              state
            ).lstInvestorComparatorHistoricalAnalysisChartProxySeasonData;
          linechartData = current(state).lstLineChartDataProxySeason;
          state.DdlhistoricalInvestorSelection =
            current(state).DdlhistoricalInvestorSelectionProxySeason;
          lstInvForData = current(state).lstHistoricalInvestorsForProxySeason;
          lstAgainstData =
            current(state).lstHistoricalInvestorsAgainstProxySeason;
          lstAbstainData =
            current(state).lstHistoricalInvestorsAbstainProxySeason;
        }
        state.lstStackBarChartData = stackBarchartData;
        state.lstLineChartData = linechartData;

        const isForSelection = current(state).isShowHistoricalTrendsFor;
        const isAgainstSelection = current(state).isShowHistoricalTrendsAgainst;
        const isAbstainSelection = current(state).isShowHistoricalTrendsAbstain;

        if (isForSelection) {
          state.lstHistoricalInvestors = lstInvForData;
        }
        if (isAgainstSelection) {
          state.lstHistoricalInvestors = lstAgainstData;
        }
        if (isAbstainSelection) {
          state.lstHistoricalInvestors = lstAbstainData;
        }

        state.ddlCalculationMethodSelection = {
          label: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
          value: InvestorTrackerConstant.INVESTOR_TRACKER_SHARES_OUTSTANDING,
        };
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    // Radio Buttons click - For, Against & Abstain
    handleHistoricalTrendsSelection: {
      reducer(state, action) {
        state.lineChartShowData = action.payload.e;
        const ddlHistoricalTrendsselection =
          current(state).DdlhistoricalInvestorSelection;
        const ddlSelectionValues = ddlHistoricalTrendsselection.map(
          (c) => c.value
        );

        state.isShowHistoricalTrendsFor = false;
        state.isShowHistoricalTrendsAgainst = false;
        state.isShowHistoricalTrendsAbstain = false;

        let lstInvForData = [];
        let lstAgainstData = [];
        let lstAbstainData = [];

        if (current(state).isSelectedCalendarYearData) {
          lstInvForData = current(state).lstHistoricalInvestorsForFullYear;
          lstAgainstData = current(state).lstHistoricalInvestorsAgainstFullYear;
          lstAbstainData = current(state).lstHistoricalInvestorsAbstainFullYear;
        }
        if (current(state).isSelectedYearToDateData) {
          lstInvForData = current(state).lstHistoricalInvestorsForYTD;
          lstAgainstData = current(state).lstHistoricalInvestorsAgainstYTD;
          lstAbstainData = current(state).lstHistoricalInvestorsAbstainYTD;
        }
        if (current(state).isSelectedProxySeasonData) {
          lstInvForData = current(state).lstHistoricalInvestorsForProxySeason;
          lstAgainstData =
            current(state).lstHistoricalInvestorsAgainstProxySeason;
          lstAbstainData =
            current(state).lstHistoricalInvestorsAbstainProxySeason;
        }

        if (
          action.payload.e ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_FOR
        ) {
          state.isShowHistoricalTrendsFor = true;
          state.lstHistoricalInvestors = lstInvForData;

          const filterForSelection = state.lstHistoricalInvestors.filter((c) =>
            ddlSelectionValues.includes(c.investor_id)
          );
          state.lstLineChartData = PrepareLinechartjsonSecond(
            filterForSelection,
            filterForSelection.map((x) => x.investor_id).length,
            filterForSelection.map((x) => x.investor_id)
            // InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          );
        }

        if (
          action.payload.e ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_AGAINST
        ) {
          state.isShowHistoricalTrendsAgainst = true;
          state.lstHistoricalInvestors = lstAgainstData;

          const filterAgainstSelection = state.lstHistoricalInvestors.filter(
            (c) => ddlSelectionValues.includes(c.investor_id)
          );
          state.lstLineChartData = PrepareLinechartjsonSecond(
            filterAgainstSelection,
            filterAgainstSelection.map((x) => x.investor_id).length,
            filterAgainstSelection.map((x) => x.investor_id)
            // InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          );
        }

        if (
          action.payload.e ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_ABSTAIN
        ) {
          state.isShowHistoricalTrendsAbstain = true;
          state.lstHistoricalInvestors = lstAbstainData;

          const filterAbstainSelection = state.lstHistoricalInvestors.filter(
            (c) => ddlSelectionValues.includes(c.investor_id)
          );
          state.lstLineChartData = PrepareLinechartjsonSecond(
            filterAbstainSelection,
            filterAbstainSelection.map((x) => x.investor_id).length,
            filterAbstainSelection.map((x) => x.investor_id)
            // InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          );
        }
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
    handleUpdateDataInvestorComparatorFilters: {
      reducer(state, action) {
        const data = action.payload.data;

        state.individualProponentSelection = data.individualProponentSelection;
        state.groupProponentSelection = data.groupProponentSelection;
        state.isInvCompDateChecked = data.isInvCompDateChecked;
        state.startInvCompDate = new Date(data.startInvCompDate);
        state.endInvCompDate = new Date(data.endInvCompDate);
        state.meetingTypeSelection = data.meetingTypeSelection;
        state.sponsorSelection = data.sponsorSelection;
        state.isProponentGroup = data.isProponentGroup;
      },
      prepare(value) {
        return {
          payload: { data: value },
        };
      },
    },
  },
  extraReducers: {
    [getAllMeetingTypeReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstMeetingTypes = action.payload;
      }
    },
    [getAllIndividualProponentReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstIndividualProponent = action.payload.arr;
      }
    },
    [getAllGroupProponentReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstGroupProponent = action.payload.arr;
      }
    },
    [resolutionsByInvestorFilterReq.fulfilled]: (state, action) => {
      state.lstResolutionsByInvestorFilter = [];
      state.lstResolutionsByInvestorFilterFullData = [];

      state.lstResolutionsByInvestorFilter =
        action.payload !== undefined ? action.payload.data : [];
      state.lstResolutionsByInvestorFilterFullData =
        action.payload !== undefined ? action.payload.data : [];

      state.lstExcelDownload_ResolutionsByInvestorFilter =
        action.payload !== undefined ? action.payload.excelData : [];
      state.lstExcelDownload_ResolutionsByInvestorFilterFullData =
        action.payload !== undefined ? action.payload.excelData : [];

      state.isLoading_InvestorVotingByProposal = action.payload === undefined;
      state.isLoading = action.payload === undefined;
    },
    [getDefaultPeerGroupDataReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (state.isResetCompanyPeerGroupSelection === false) {
          if (action.payload.companyOption !== undefined) {
            state.invCompCompanyPeerGroupSelection =
              action.payload.companyOption;
            state.filterByCompanySelection = action.payload.companyOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.company_peer_group !== undefined
          ) {
            state.invCompCompanyPeerGroupSelection =
              action.payload.responsePeerGroups.company_peer_group;
            state.filterByCompanySelection =
              action.payload.responsePeerGroups.company_peer_group.value;
          }
        }

        if (state.isResetInvestorPeerGroupSelection === false) {
          if (action.payload.investerOption !== undefined) {
            state.invCompInvestorPeerGroupSelection =
              action.payload.investerOption;
            state.filterByInvestorSelection =
              action.payload.investerOption.value;
          } else if (
            action.payload.responsePeerGroups !== undefined &&
            action.payload.responsePeerGroups.investor_peer_group !== undefined
          ) {
            state.invCompInvestorPeerGroupSelection =
              action.payload.responsePeerGroups.investor_peer_group;
            state.filterByInvestorSelection =
              action.payload.responsePeerGroups.investor_peer_group.value;
          }
        }
      }
    },
    [resolutionsByInvestorDetailstReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstResolutionInvDetails = action.payload;
        state.lstResolutionInvDetailsFullData = action.payload;
        state.isLoadingInvestorDetails = action.payload === undefined;
      }
    },
    [resolutionSearchByInvestorReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstVotingDetails = action.payload;
        state.isLoadingVotingDetails = action.payload === undefined;
      }
    },
    [getResolutionsTypeIdByNameReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        if (
          action.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL
        ) {
          state.selectedInvestorDetailsProposalTopLevelTypeId =
            action.payload.response;
        }
        if (
          action.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL
        ) {
          state.selectedInvestorDetailsProposalSubLevelTypeId =
            action.payload.response;
        }
        if (
          action.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE
        ) {
          state.selectedInvestorDetailsProposalTypeId = action.payload.response;
        }
      }
    },
    [getInvestorVotingPowerReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstVotingInvestorPower = action.payload.VotingPower;
        state.lstVotingPvaImpact = action.payload.PvaImpact;
        state.isLoadVotingPowerData = action.payload === undefined;
      }
    },
    [getHistoricalTrendsReq.fulfilled]: (state, action) => {
      if (action.payload !== false) {
        state.lstAllHistoricalInvestorFullYear = action.payload.allInvestor;

        state.lstDdlHistoricalsInvestors = action.payload.ddlInvestor;
        state.lstDdlHistoricalsInvestorsFullYear = action.payload.ddlInvestor;

        state.DdlhistoricalInvestorSelection =
          action.payload.selectedDdlInvestor;
        state.DdlhistoricalInvestorSelectionFullYear =
          action.payload.selectedDdlInvestor;

        state.lstHistoricalInvestors = action.payload.invFor;
        state.lstHistoricalInvestorsForFullYear = action.payload.invFor;
        state.lstHistoricalInvestorsAgainstFullYear = action.payload.invAgainst;
        state.lstHistoricalInvestorsAbstainFullYear = action.payload.invAbstain;

        // bar chart data
        state.lstStackBarChartData = PrepareStackedChartJson(
          action.payload.defaultStackBarSelection
        );
        state.lstInvestorComparatorHistoricalAnalysisChartDataFullYear =
          PrepareStackedChartJson(action.payload.defaultStackBarSelection);

        // line chart default data
        state.lstLineChartData = PrepareLinechartjsonSecond(
          action.payload.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
        state.lstLineChartDataFullYear = PrepareLinechartjsonSecond(
          action.payload.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
      }
    },
    [investorComparatorhistoricalTrendsChartYTDDataReq.fulfilled]: (
      state,
      action
    ) => {
      if (action.payload !== false) {
        state.lstAllHistoricalInvestorYTD = action.payload.allInvestor;

        state.DdlhistoricalInvestorSelectionYTD =
          action.payload.selectedDdlInvestor;

        state.lstHistoricalInvestorsForYTD = action.payload.invFor;
        state.lstHistoricalInvestorsAgainstYTD = action.payload.invAgainst;
        state.lstHistoricalInvestorsAbstainYTD = action.payload.invAbstain;

        // bar chart data
        state.lstInvestorComparatorHistoricalAnalysisChartDataYTD =
          PrepareStackedChartJson(action.payload.defaultStackBarSelection);

        state.lstLineChartDataYTD = PrepareLinechartjsonSecond(
          action.payload.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
      }
    },
    [investorComparatorhistoricalTrendsChartProxySeasonDataReq.fulfilled]: (
      state,
      action
    ) => {
      if (action.payload !== false) {
        state.lstAllHistoricalInvestorProxySeason = action.payload.allInvestor;

        state.DdlhistoricalInvestorSelectionProxySeason =
          action.payload.selectedDdlInvestor;

        state.lstHistoricalInvestorsForProxySeason = action.payload.invFor;
        state.lstHistoricalInvestorsAgainstProxySeason =
          action.payload.invAgainst;
        state.lstHistoricalInvestorsAbstainProxySeason =
          action.payload.invAbstain;

        // bar chart data
        state.lstInvestorComparatorHistoricalAnalysisChartProxySeasonData =
          PrepareStackedChartJson(action.payload.defaultStackBarSelection);

        state.lstLineChartDataProxySeason = PrepareLinechartjsonSecond(
          action.payload.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
        //
      }
      state.isLoadHistoricalTrends = action.payload === undefined;
    },

    [getHistoricalTrendsChartDataInvestorComparatorReq.fulfilled]: (
      state,
      action
    ) => {
      //#region HistoricalTrends_CalendarYearData
      const HistoricalTrends_CalendarYearData =
        action.payload !== undefined && action.payload
          ? action.payload.HistoricalTrends_CalendarYearData
          : {};

      if (
        HistoricalTrends_CalendarYearData &&
        Object.keys(HistoricalTrends_CalendarYearData).length > 0
      ) {
        state.lstAllHistoricalInvestorFullYear =
          HistoricalTrends_CalendarYearData.allInvestor;

        state.lstDdlHistoricalsInvestors =
          HistoricalTrends_CalendarYearData.ddlInvestor;
        state.lstDdlHistoricalsInvestorsFullYear =
          HistoricalTrends_CalendarYearData.ddlInvestor;

        state.DdlhistoricalInvestorSelection =
          HistoricalTrends_CalendarYearData.selectedDdlInvestor;
        state.DdlhistoricalInvestorSelectionFullYear =
          HistoricalTrends_CalendarYearData.selectedDdlInvestor;

        state.lstHistoricalInvestors = HistoricalTrends_CalendarYearData.invFor;
        state.lstHistoricalInvestorsForFullYear =
          HistoricalTrends_CalendarYearData.invFor;
        state.lstHistoricalInvestorsAgainstFullYear =
          HistoricalTrends_CalendarYearData.invAgainst;
        state.lstHistoricalInvestorsAbstainFullYear =
          HistoricalTrends_CalendarYearData.invAbstain;

        // bar chart data
        state.lstStackBarChartData = PrepareStackedChartJson(
          HistoricalTrends_CalendarYearData.defaultStackBarSelection
        );
        state.lstInvestorComparatorHistoricalAnalysisChartDataFullYear =
          PrepareStackedChartJson(
            HistoricalTrends_CalendarYearData.defaultStackBarSelection
          );

        // line chart default data
        state.lstLineChartData = PrepareLinechartjsonSecond(
          HistoricalTrends_CalendarYearData.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
        state.lstLineChartDataFullYear = PrepareLinechartjsonSecond(
          HistoricalTrends_CalendarYearData.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
      }
      //#endregion

      //#region HistoricalTrends_YTDData
      const HistoricalTrends_YTDData =
        action.payload !== undefined && action.payload
          ? action.payload.HistoricalTrends_YTDData
          : {};

      if (
        HistoricalTrends_YTDData &&
        Object.keys(HistoricalTrends_YTDData).length > 0
      ) {
        state.lstAllHistoricalInvestorYTD =
          HistoricalTrends_YTDData.allInvestor;

        state.DdlhistoricalInvestorSelectionYTD =
          HistoricalTrends_YTDData.selectedDdlInvestor;

        state.lstHistoricalInvestorsForYTD = HistoricalTrends_YTDData.invFor;
        state.lstHistoricalInvestorsAgainstYTD =
          HistoricalTrends_YTDData.invAgainst;
        state.lstHistoricalInvestorsAbstainYTD =
          HistoricalTrends_YTDData.invAbstain;

        // bar chart data
        state.lstInvestorComparatorHistoricalAnalysisChartDataYTD =
          PrepareStackedChartJson(
            HistoricalTrends_YTDData.defaultStackBarSelection
          );

        state.lstLineChartDataYTD = PrepareLinechartjsonSecond(
          HistoricalTrends_YTDData.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
      }
      //#endregion

      //#region HistoricalTrends_ProxySeasonData
      const HistoricalTrends_ProxySeasonData =
        action.payload !== undefined && action.payload
          ? action.payload.HistoricalTrends_ProxySeasonData
          : {};

      if (
        HistoricalTrends_ProxySeasonData &&
        Object.keys(HistoricalTrends_ProxySeasonData).length > 0
      ) {
        state.lstAllHistoricalInvestorProxySeason =
          HistoricalTrends_ProxySeasonData.allInvestor;

        state.DdlhistoricalInvestorSelectionProxySeason =
          HistoricalTrends_ProxySeasonData.selectedDdlInvestor;

        state.lstHistoricalInvestorsForProxySeason =
          HistoricalTrends_ProxySeasonData.invFor;
        state.lstHistoricalInvestorsAgainstProxySeason =
          HistoricalTrends_ProxySeasonData.invAgainst;
        state.lstHistoricalInvestorsAbstainProxySeason =
          HistoricalTrends_ProxySeasonData.invAbstain;

        // bar chart data
        state.lstInvestorComparatorHistoricalAnalysisChartProxySeasonData =
          PrepareStackedChartJson(
            HistoricalTrends_ProxySeasonData.defaultStackBarSelection
          );

        state.lstLineChartDataProxySeason = PrepareLinechartjsonSecond(
          HistoricalTrends_ProxySeasonData.invFor,
          InvestorComparatorConstant.INVESTOR_COMPARATOR_HISTORICAL_TRENDS_DEFAULT_SELECTION,
          null
        );
      }
      //#endregion

      state.isLoadHistoricalTrends = action.payload === undefined;
    },

    [getTokenDecode.fulfilled]: (state, action) => {
      state.getTokenDecode = action.payload !== undefined ? action.payload : [];
    },
  },
});

export const {
  handleResetInvestorComparatorTool,
  handleResetInvestorComparatorTool_HistoricalTrends,
  handleSponsorSelection,
  handleMeetingTypeSelection,
  handleIndividualProponentSelection,
  handleGroupProponentSelection,
  handleStartInvCompDateSelection,
  handleEndInvCompDateSelection,
  handleIsInvCompDateChecked,
  handleProponentGroupsearch,
  handleComapnySearchSelectionInvComp,
  handleInvestorSearchSelectionInvComp,
  handleClearPeerGroupInvestorSelection,
  handleClearPeerGroupCompanySelection,
  handleClearResult,
  handleInvestorComparatorSelection,
  handleCloseInvestorDetails,
  handleInvestorDetailsSelection,
  handleCloseVoringDetails,
  handleOnChangeHistoricalInvestor,
  handleOnClickIsSelectedFullYearData,
  handleHistoricalTrendsSelection,
  handleUpdateDataInvestorComparatorFilters,
} = InvestorComparatorToolSlice.actions;

export default InvestorComparatorToolSlice.reducer;
