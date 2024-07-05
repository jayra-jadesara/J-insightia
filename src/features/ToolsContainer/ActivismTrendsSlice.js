import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TrendsConst from '../../constants/ActivismTrendsConstant';
import {
  GetRegionsTrade,
  GetInvestmentPublicData,
  GetCompaniesTargetedTrends,
  GetActiveActivistsTrends,
  GetActiveCompanyRegiontrends,
  GetActiveActivistsRegiontrends,
  GetIndustryTargetedTrends,
  GetCompaniesWithMultipleactivistsTrends,
  GetMarketCapbyYearTrends,
  GetActiveActivistsAUM,
  GetSuccessRatesTrends,
  GetStoredProcedureDownloadExcel
} from '../../utils/tools-util';
import { dateToNull } from '../../utils/general-util';

export const getRegionsTradeReq = createAsyncThunk(
  'getRegionsTradeReq',
  async () => {
    const response = await GetRegionsTrade();
    return response;
  }
);

export const getInvestmentPublicDataReq = createAsyncThunk(
  'getInvestmentPublicDataReq',
  async () => {
    const response = await GetInvestmentPublicData();
    return response;
  }
);

export const getCompaniesTargetedTrendsReq = createAsyncThunk(
  'getCompaniesTargetedTrendsReq',
  async (res) => {
    const response = await GetCompaniesTargetedTrends(res);
    return response;
  }
);

export const getActiveActivistsTrendsReg = createAsyncThunk(
  'getActiveActivistsTrendsReg',
  async (res) => {
    const response = await GetActiveActivistsTrends(res);
    return response;
  }
);

export const getActiveCompanyRegiontrendsReq = createAsyncThunk(
  'getActiveCompanyRegiontrendsReq',
  async (res) => {
    const response = await GetActiveCompanyRegiontrends(res);
    return response;
  }
);

export const getActiveActivistsRegiontrendsReq = createAsyncThunk(
  'getActiveActivistsRegiontrendsReq',
  async (res) => {
    const response = await GetActiveActivistsRegiontrends(res);
    return response;
  }
);

export const getIndustryTargetedTrendsReq = createAsyncThunk(
  'getIndustryTargetedTrendsReq',
  async (res) => {
    const response = await GetIndustryTargetedTrends(res);
    return response;
  }
);

export const getCompaniesWithMultipleactivistsTrendsReq = createAsyncThunk(
  'getCompaniesWithMultipleactivistsTrendsReq',
  async (res) => {
    const response = await GetCompaniesWithMultipleactivistsTrends(res);
    return response;
  }
);

export const getMarketCapbyYearTrendsReq = createAsyncThunk(
  'getMarketCapbyYearTrendsReq',
  async (res) => {
    const response = await GetMarketCapbyYearTrends(res);
    return response;
  }
);

export const getActiveActivistsAUMReq = createAsyncThunk(
  'getActiveActivistsAUMReq',
  async (res) => {
    const response = await GetActiveActivistsAUM(res);
    return response;
  }
);

export const getSuccessRatesTrendsReq = createAsyncThunk(
  'getSuccessRatesTrendsReq',
  async (res) => {
    const response = await GetSuccessRatesTrends(res);
    return response;
  }
);

const initialState = {
  lstRegionTrade: [],
  selectedRegion: { label: 'Global', value: TrendsConst.GLOBAL },
  defaultRegion: { label: 'Global', value: TrendsConst.GLOBAL },
  InvestmentPublic: [],
  selectedInvestmentPublic: {
    label: 'Public Demands',
    value: TrendsConst.PUBLIC_DEMAND
  },
  defaultInvestmentPublic: {
    label: 'Public Demands',
    value: TrendsConst.PUBLIC_DEMAND
  },
  companiesTargetedTrendsChartData: [],
  activeActivistsTrendsChartData: [],
  activeCompanyRegiontrendsChartData: [],
  chartKeyCompanyRegion: [],
  activeActivistsRegiontrendsChartData: [],
  chartKeyActivistsRegion: [],
  industryTargetedTrendsChartData: [],
  chartKeyIndustryTargetedTrends: [],
  lstCompaniesWithMultipleactivistsTrends: [],
  lstMarketCapbyYearTrends: [],
  chartKeyMarketCapbyYearTrends: [],
  activeActivistsAUMChartData: [],
  successRatesTrendsChartData: [],
  isExcelDownloadLoading_Activismtrends: false
};

const ActivismTrendsSlice = createSlice({
  name: 'activismtrends',
  initialState,
  reducers: {
    handleRegionChange: {
      reducer(state, action) {
        if (action.payload == null) {
          state.selectedRegion = state.defaultRegion;
        } else {
          state.selectedRegion = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleRegionReset: {
      reducer(state, action) {
          state.selectedRegion = { label: 'Global', value: TrendsConst.GLOBAL };
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handlePublicChange: {
      reducer(state, action) {
        if (action.payload == null) {
          state.selectedInvestmentPublic = state.defaultInvestmentPublic;
        } else {
          state.selectedInvestmentPublic = action.payload;
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    },
    handleDownloadExcel: {
      reducer(state, action) {
        const item = action.payload.item;
        excel(item);

        //  send stored procedure to get data
        async function excel(item) {
          const downloadSP = await GetStoredProcedureDownloadExcel(item);
          if (downloadSP.length > 0) {
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'Insightia';
            workbook.created = new Date();
            const sheet = workbook.addWorksheet(item.name);

            const arrColumns = Object.keys(downloadSP[0]);
            const jsonColumns = arrColumns.map((col) => ({
              name: col,
              totalsRowLabel: col,
              filterButton: true
            }));

            sheet.addTable({
              name: item.name.replace(/[.,/#!$%^&*;:{}=\-_`~()\s]/g, '_'),
              ref: 'A1',
              headerRow: true,
              totalsRow: false,
              style: {
                theme: 'TableStyleMedium16', //'TableStyleMedium2',
                showRowStripes: true
              },
              columns: jsonColumns,
              rows: downloadSP.map((obj) => Object.values(obj))
            });

            sheet.columns.forEach((column) => {
              let maxLength = 0;
              column.eachCell({ includeEmpty: true }, (cell) => {
                if (
                  cell.value !== null &&
                  cell.value.toString().includes('T00:00:00.000Z')
                ) {
                  cell.value = dateToNull(cell.value.trim(), 'dd-mmm-yy', true);
                }

                const columnLength = cell.value
                  ? cell.value.toString().length
                  : 10;
                if (columnLength > maxLength) {
                  maxLength = columnLength;
                }
              });
              column.width = maxLength < 10 ? 10 : maxLength;
            });

            workbook.xlsx.writeBuffer().then((data) => {
              const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              });
              saveAs(blob, `${item.name}.xlsx`);
            });
            setTimeout(() => {
              action.payload.setExcelDownloadLoading(false);
            }, 500);
          }
        }
      },
      prepare(e) {
        return {
          payload: e
        };
      }
    }
  },
  extraReducers: {
    [getRegionsTradeReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.lstRegionTrade = action.payload;
      }
    },
    [getInvestmentPublicDataReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.lstInvestmentPublic = action.payload.data;
      }
    },
    [getCompaniesTargetedTrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.companiesTargetedTrendsChartData = action.payload;
      }
    },
    [getActiveActivistsTrendsReg.fulfilled]: (state, action) => {
      if (action.payload) {
        state.activeActivistsTrendsChartData = action.payload;
      }
    },
    [getActiveCompanyRegiontrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.activeCompanyRegiontrendsChartData = action.payload[0];
        state.chartKeyCompanyRegion = action.payload[1];
      }
    },
    [getActiveActivistsRegiontrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.activeActivistsRegiontrendsChartData = action.payload[0];
        state.chartKeyActivistsRegion = action.payload[1];
      }
    },
    [getIndustryTargetedTrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.industryTargetedTrendsChartData = action.payload[0];
        state.chartKeyIndustryTargetedTrends = action.payload[1];
      }
    },
    [getCompaniesWithMultipleactivistsTrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.lstCompaniesWithMultipleactivistsTrends = action.payload;
      }
    },
    [getMarketCapbyYearTrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.lstMarketCapbyYearTrends = action.payload[0];
        state.chartKeyMarketCapbyYearTrends = action.payload[1];
      }
    },
    [getActiveActivistsAUMReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.activeActivistsAUMChartData = action.payload;
      }
    },
    [getSuccessRatesTrendsReq.fulfilled]: (state, action) => {
      if (action.payload) {
        state.successRatesTrendsChartData = action.payload;
      }
    }
  }
});

export const {
  handleToggleSwitch,
  handleRegionChange,
  handlePublicChange,
  handleDownloadExcel,
  handleSetExcelDownloadLoading,
  handleRegionReset
} = ActivismTrendsSlice.actions;

export default ActivismTrendsSlice.reducer;
