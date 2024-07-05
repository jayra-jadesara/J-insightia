export const POWERSEARCH_INSIGHTIA_FILTER_LIST = [
  {
    label: 'Vulnerable Companies (Example)',
    value: { filter: { AiV_score: { filter: 75, filterType: 'number', type: 'greaterThan' } } },
    insightia_filter: true
  },
  {
    label: 'French Energy Companies (Example)',
    value: { filter: {
      Company_HQ: { filterType: 'set', values: ['France'] },
      Sector: { filterType: 'set', values: ['Energy'] }
    } },
    insightia_filter: true
  }
];

export const VULNERABLE_ADVSEARCH_INSIGHTIA_FILTER_LIST = [
  {
    label: 'Most Vulnerable',
    value: { filters: { vulnerability_score: { values: ['High'], filterType: 'set' }, Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: false, AdvancedSearchFilteringData: [] } },
    insightia_filter: true
  },
  {
    label: 'Excess Cash',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } },
              dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Excess Cash/Market Capitalization Ration ($)': { join: 'dbo.f_vuln_search_metrics', field_id: 463, list_id: 8 } } }
            },
    insightia_filter: true
  },
  {
    label: 'High Institutional Ownership',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Institutional Ownership': { join: 'dbo.f_vuln_search_metrics', field_id: 621, list_id: 7 } } } },
    insightia_filter: true
  },
  {
    label: 'Low Profitability',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Return on Average Equity (%)': { join: 'dbo.f_vuln_search_metrics', field_id: 444, list_id: 8 } } } },
    insightia_filter: true
  },
  {
    label: 'Slow Growth',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Revenue Growth 3 Years Annualized (%)': { join: 'dbo.f_vuln_search_metrics', field_id: 452, list_id: 8 } } } },
    insightia_filter: true
  },
  {
    label: 'Underperformers',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Total Shareholder Return 1 Year (%)': { join: 'dbo.f_vuln_search_metrics', field_id: 434, list_id: 8 } } } },
    insightia_filter: true
  },
  {
    label: 'Unpopular Directors',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Minimum Vote For Directors': { join: 'dbo.f_vuln_search_metrics', field_id: 521, list_id: 7 } } } },
    insightia_filter: true
  },
  {
    label: 'Value Plays',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'P/E Ratio': { join: 'dbo.f_vuln_search_metrics', field_id: 422, list_id: 8 } } } },
    insightia_filter: true
  },
  {
    label: 'Wolf Packs',
    value: { filters: { Campaign_in_play: { values: ['0'], filterType: 'set' } }, dataContextFilter: { refreshDataButton: true, AdvancedSearchFilteringData: { 'Investor Ownership': { join: 'dbo.f_vuln_search_metrics', field_id: 631, list_id: 7 } } } },
    insightia_filter: true
  },
];

  export default {
    POWERSEARCH_INSIGHTIA_FILTER_LIST,
    VULNERABLE_ADVSEARCH_INSIGHTIA_FILTER_LIST
  };
