import React, { useEffect, useState, createContext, useRef, useCallback } from 'react';
import CollapseComponentFilterToolPane from '../components/GeneralForm/CollapseFilterToolPaneComponent';
import DropdownList from '../components/GeneralForm/DropdownList';
import { NUMBER_ONE, NUMBER_THREE, NUMBER_ZERO } from '../constants/NumberConstants';
import DataContext from './VulnerabilityAdvancedSearchCustomPanelDataContext';

const totalStyle = { paddingBottom: '15px' };

const vulnerabilityCustomFilter = [
    {
    title: 'Fundamental Metrics',
    open: false,
    children: [
        {
            title: 'Valuation',
            children: [
                { title: 'P/E Ratio', field_id: 422, filter_list_id: 1, children: null, open: false, },
                { title: 'P/EBITDA Ratio', field_id: 423, filter_list_id: 1, children: null, open: false, },
                { title: 'P/B Ratio', field_id: 424, filter_list_id: 1, children: null, open: false, },
                { title: 'P/Sales Ratio', field_id: 425, filter_list_id: 1, children: null, open: false, },
                { title: 'P/FCF Ratio', field_id: 426, filter_list_id: 1, children: null, open: false, },
            ]
        },
        {
            title: 'Performance',
            open: false,
            children: [
                { title: 'Share Price Change 1 Year (%)', field_id: 432, filter_list_id: 1, children: null, open: false, },
                { title: 'Dividend Yield 1 Year (%)', field_id: 433, filter_list_id: 1, children: null, open: false, },
                { title: 'Total Shareholder Return 1 Year (%)', field_id: 434, filter_list_id: 1, children: null, open: false, },
                { title: 'Total Shareholder Return 3 Year (%)', field_id: 435, filter_list_id: 1, children: null, open: false, },
                { title: 'Total Shareholder Return 5 Year (%)', field_id: 436, filter_list_id: 1, children: null, open: false, },
                { title: 'TSR 3 Year Annualized (%)', field_id: 437, filter_list_id: 1, children: null, open: false, },
            ]
        },
        {
            title: 'Profitability',
            open: false,
            children: [
                { title: 'Return on Average Assets (%)', field_id: 442, filter_list_id: 1, children: null, open: false, },
                { title: 'Average Total Asset Turnover', field_id: 443, filter_list_id: 1, children: null, open: false, },
                { title: 'Return on Average Equity (%)', field_id: 444, filter_list_id: 1, children: null, open: false, },
                { title: 'Return on Average Capital Employed (%)', field_id: 445, filter_list_id: 1, children: null, open: false, },
                { title: 'Gross Profit Margin (%)', field_id: 446, filter_list_id: 1, children: null, open: false, },
                { title: 'Net Operating Margin', field_id: 447, filter_list_id: 1, children: null, open: false, },
                { title: 'Net Profit Margin', field_id: 448, filter_list_id: 1, children: null, open: false, },
                { title: 'Total Cost/Revenue Ratio', field_id: 449, filter_list_id: 1, children: null, open: false, },
            ]
        },
        {
            title: 'Growth',
            open: false,
            children: [
                { title: 'Revenue Growth 3 Years Annualized (%)', field_id: 452, filter_list_id: 1, children: null, open: false, },
                { title: 'Earning Growth 3 Years Annualized (%)', field_id: 453, filter_list_id: 1, children: null, open: false, },
            ]
        },
        {
            title: 'Balance Sheet',
            open: false,
            children: [
                { title: 'Average Financial Leverage Ratio', field_id: 462, filter_list_id: 1, children: null, open: false, },
                { title: 'Excess Cash/Market Capitalization Ration ($)', field_id: 463, filter_list_id: 1, children: null, open: false, },
            ]
        },
    ]
    },
    {
        title: 'AGM Voting Results',
        open: false,
        children: [
            { title: 'Minimum Vote For Directors', field_id: 521, filter_list_id: 2, children: null, open: false, },
            { title: 'Minimum Vote For Remuneration', field_id: 531, filter_list_id: 2, children: null, open: false, },
        ]
    },
    {
        title: 'Ownership',
        open: false,
        children: [
            { title: 'Institutional Ownership', field_id: 621, filter_list_id: 2, children: null, open: false, },
            { title: 'Investor Ownership', field_id: 631, filter_list_id: 2, children: null, open: false, },
        ]
    },
    {
        title: 'Governance',
        open: false,
        children: [
            {
                title: 'Directors',
                children: [
                    { title: 'Number of Directors', field_id: 722, filter_list_id: 3, children: null, open: false, },
                    { title: 'Median Tenure', field_id: 723, filter_list_id: 3, children: null, open: false, },
                    { title: 'Shortest Tenure', field_id: 724, filter_list_id: 3, children: null, open: false, },
                    { title: 'Longest Tenure', field_id: 725, filter_list_id: 2, children: null, open: false, },
                    { title: 'Median Director Age', field_id: 726, filter_list_id: 3, children: null, open: false, },
                    { title: 'Youngest Director', field_id: 727, filter_list_id: 3, children: null, open: false, },
                    { title: 'Oldest Director', field_id: 728, filter_list_id: 2, children: null, open: false, },
                ]
            },
        ]
    },
];
const advVulnSearchFilters = {
    1: [
        { label: 'Less than all company Median', value: 1 },
        { label: 'Less than peer group Median', value: 2 },
        { label: 'Less than both all company and peer group Median', value: 3 },
        { label: 'Warning generated against all companies', value: 7 },
        { label: 'Warning generated against peer group', value: 8 },
        { label: 'Warning generated against all companies and peer group', value: 9 },
    ],
    2:
    [
        { label: 'More than all company Median', value: 4 },
        { label: 'More than peer group Median', value: 5 },
        { label: 'More than both all company and peer group Median', value: 6 },
        { label: 'Warning generated against all companies', value: 7 },
        { label: 'Warning generated against peer group', value: 8 },
        { label: 'Warning generated against all companies and peer group', value: 9 },
    ],
    3: [
        { label: 'Less than all company Median', value: 1 },
        { label: 'Less than peer group Median', value: 2 },
        { label: 'Less than both all company and peer group Median', value: 3 },
        { label: 'More than all company Median', value: 4 },
        { label: 'More than peer group Median', value: 5 },
        { label: 'More than both all company and peer group Median', value: 6 },
        { label: 'Warning generated against all companies', value: 7 },
        { label: 'Warning generated against peer group', value: 8 },
        { label: 'Warning generated against all companies and peer group', value: 9 },
    ],
};

export default (props) => {
  const [availableFilterOptions, setAvailableFilterOptions] = useState({});
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({});

  const dataContext = React.useContext(DataContext);
  const [selectedRangeOptions, setSelectedRangeOptions] = useState({});

  const [vulnerabilityCustomFilterList, setVulnerabilityCustomFilterList] = useState({});

  const setupGrid = (array) => {
    array.forEach((e) => {
        const temp = vulnerabilityCustomFilterList;
        temp[e.title] = false;
        setVulnerabilityCustomFilterList(temp);
        if (e.children !== null) {
            setupGrid(e.children);
        }
    });
  };

  const setOpen = (e) => {
      const temp = vulnerabilityCustomFilterList;
      temp[e] = !temp[e];
      setVulnerabilityCustomFilterList(temp);
  };
  useEffect(() => {
        initFilterOptions();
        setupGrid(vulnerabilityCustomFilter);
}, []);

const updateModel = useCallback(
  () => {
    if (selectedFilterOptions !== dataContext.AdvancedSearchFilteringData) {
        setSelectedFilterOptions(dataContext.AdvancedSearchFilteringData);
    }
  },
  [selectedFilterOptions, dataContext.AdvancedSearchFilteringData],
);

useEffect(() => {
    props.api.addEventListener('modelUpdated', updateModel);
    return () => props.api.removeEventListener('modelUpdated', updateModel);
}, []);

const getSelectedFilterValue = useCallback(
  (filter_title) => {
    if (!selectedFilterOptions[filter_title]) return null;
    const list_id = selectedFilterOptions[filter_title].list_id;
    const filter_option = advVulnSearchFilters[NUMBER_THREE].filter((option) => option.value === list_id);
    return filter_option[0] || '';
  },
  [selectedFilterOptions,
    advVulnSearchFilters],
);

const initFilterOptions = () => {
    // convert available filter option Sets into sorted arrays
    Object.entries(availableFilterOptions).forEach(([field, set]) => {
        availableFilterOptions.advVulnSearchFilters[field] = [...set].sort();
    });
    setAvailableFilterOptions(availableFilterOptions);
    setSelectedFilterOptions(selectedFilterOptions);
};

const applyFilter = () => {
    dataContext.refreshDataButton = true;
    dataContext.AdvancedSearchFilteringData = selectedFilterOptions;
    dataContext.savedState = true;
};

const clearFilter = () => {
    dataContext.refreshDataButton = true;
    setSelectedFilterOptions([]);
    dataContext.AdvancedSearchFilteringData = [];
    dataContext.savedState = false;
};

const DropdownArrow = () => <div className="ag-picker-field-icon" aria-hidden="true"><span className="ag-icon ag-icon-small-down" unselectable="on" role="presentation" /></div>;

const ChildElementDisplayer = useCallback(({ array, level = NUMBER_ZERO }) => array.map((field) => {
        if (field.children !== null) {
            const childrenFiltered = field.children.some((childField) => {
                    if (childField.children) {
                        return childField.children.some((childChildField) => getSelectedFilterValue(childChildField.title) !== null);
                    }
                    return getSelectedFilterValue(childField.title) !== null;
                });
            return (
                <div className='ag-filter-toolpanel-group-wrapper ag-first-group-visible'>
                    <CollapseComponentFilterToolPane Heading={field.title} level={level} open={vulnerabilityCustomFilterList[field.title]} setOpen={setOpen} isFiltered={childrenFiltered}>
                        <ChildElementDisplayer
                          array={field.children}
                          level={level + NUMBER_ONE}
                        />
                    </CollapseComponentFilterToolPane>
                </div>

            );
        }
            return (
                <CollapseComponentFilterToolPane Heading={field.title} level={level} open={vulnerabilityCustomFilterList[field.title]} setOpen={setOpen} isFiltered={(getSelectedFilterValue(field.title) !== null)}>
                    <div className='ag-filter-toolpanel-instance-filter'>
                        <div className='ag-filter-wrapper ag-focus-managed'>
                            <div className='ag-filter-body-wrapper ag-simple-filter-body-wrapper'>
                                <div className='ag-filter-toolpanel-instance ag-group-item ag-filter-toolpanel-group-item'>
                                    <div className='row'>
                                        <div className='mb-1'>Comparison Matrix</div>
                                        <div className='ag-filter-select ag-labeled'>
                                            <div className=''>
                                                <DropdownList
                                                  isCustomFilterPane
                                                  className='ag-custom-select'
                                                  placeholder='Please Select...'
                                                  options={advVulnSearchFilters[field.filter_list_id]}
                                                  handleChange={async (e) => {
                                                      const tempFilterOptions = selectedFilterOptions;
                                                      let min = null;
                                                      let max = null;
                                                      if (selectedFilterOptions[field.title] !== undefined) {
                                                        max = selectedFilterOptions[field.title].max !== undefined ? selectedFilterOptions[field.title].max : null;
                                                        min = selectedFilterOptions[field.title].min !== undefined ? selectedFilterOptions[field.title].min : null;
                                                      }

                                                      if (e !== null) {
                                                        selectedFilterOptions[field.title] = { ...selectedFilterOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, list_id: e.value, max: max, min: min };
                                                        tempFilterOptions[field.title] = { ...selectedFilterOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, list_id: e.value, max: max, min: min };
                                                      } else {
                                                        selectedFilterOptions[field.title] = { ...selectedFilterOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, list_id: null, max: max, min: min };
                                                        tempFilterOptions[field.title] = { ...selectedFilterOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, list_id: null, max: max, min: min };
                                                      }
                                                      setSelectedFilterOptions({ ...tempFilterOptions });
                                                    }
                                                }
                                                  component={DropdownArrow}
                                                  customSelectedValue
                                                  selectedValue={getSelectedFilterValue(field.title)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-1'>
                                        <div className='row mb-1'>In Range</div><br />
                                        <div className='ag-wrapper ag-input-wrapper ag-number-field-input-wrapper'>
                                            <input
                                              type="number"
                                              placeholder="From"
                                              className='ag-input-field-input ag-number-field-input'
                                              id="from"
                                              name="from"
                                              value={selectedFilterOptions[field.title] ?
                                                selectedFilterOptions[field.title].min ? selectedFilterOptions[field.title].min : ''
                                                : ''
                                              }
                                              onChange={(e) => {
                                                const value = e.target.value === '' ? null : e.target.value;
                                                let max = null;
                                                let list_id = null;
                                                if (selectedFilterOptions[field.title] !== undefined) {
                                                    max = selectedFilterOptions[field.title].max !== undefined ? selectedFilterOptions[field.title].max : null;
                                                    list_id = selectedFilterOptions[field.title].list_id !== undefined ? selectedFilterOptions[field.title].list_id : null;
                                                }
                                                const tempFilterOptions = selectedFilterOptions;
                                                selectedFilterOptions[field.title] = { ...selectedRangeOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, min: value, max: max, list_id: list_id };
                                                tempFilterOptions[field.title] = { ...selectedRangeOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, min: value, max: max, list_id: list_id };
                                                setSelectedFilterOptions({ ...tempFilterOptions });
                                            }}
                                            /><br />
                                        </div>
                                        <div className='ag-filter-to ag-filter-filter ag-labeled ag-label-align-left ag-number-field ag-input-field'>
                                            <input
                                              type="number"
                                              placeholder="To"
                                              className='ag-input-field-input ag-number-field-input'
                                              id="to"
                                              name="to"
                                              value={selectedFilterOptions[field.title] ?
                                                selectedFilterOptions[field.title].max ? selectedFilterOptions[field.title].max : ''
                                                : ''
                                              }
                                              onChange={(e) => {
                                                const value = e.target.value === '' ? null : e.target.value;
                                                let min = null;
                                                let list_id = null;
                                                if (selectedFilterOptions[field.title] !== undefined) {
                                                    min = selectedFilterOptions[field.title].min !== undefined ? selectedFilterOptions[field.title].min : null;
                                                    list_id = selectedFilterOptions[field.title].list_id !== undefined ? selectedFilterOptions[field.title].list_id : null;
                                                }
                                                const tempFilterOptions = selectedFilterOptions;
                                                selectedFilterOptions[field.title] = { ...selectedRangeOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, max: value, min: min, list_id: list_id };
                                                tempFilterOptions[field.title] = { ...selectedRangeOptions[field.title], join: 'dbo.f_vuln_search_metrics', field_id: field.field_id, max: value, min: min, list_id: list_id };
                                                setSelectedFilterOptions({ ...tempFilterOptions });
                                            }}
                                            /><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapseComponentFilterToolPane>
            );
        }
    ),
    [
        dataContext.AdvancedSearchFilteringData,
    ],
    );
  return (
    <div className='ag-filter-toolpanel-group-wrapper ag-first-group-visible'>
        <ChildElementDisplayer
          array={vulnerabilityCustomFilter}
        />
        <div className="ag-filter-apply-panel">
            <button
              type='button'
              id='setCustomFilter'
              className='ag-standard-button ag-filter-apply-panel-button'
              onClick={(e) => {
                e.preventDefault();
                applyFilter();
            }}
            >
                Set Search
            </button>
            <button
              type='button'
              id='clearCustomFilter'
              className='ag-standard-button ag-filter-apply-panel-button'
              onClick={(e) => {
                e.preventDefault();
                clearFilter();
            }}
            >
                Clear Search
            </button>
        </div>
    </div>
);
};
