import PropTypes from 'prop-types';
import React from 'react';
import SearchInput from '../GeneralForm/DropdownVirtualized';
import CompanyAndInvestorFilter from '../MyAlert/Components/CompanyAndInvestorFilter';
import CompanySearchComponent from '../GeneralForm/CompanySearchComponent';
import InvestorSearchComponent from '../GeneralForm/InvestorSearchComponent';

const isPreferences = true;

const DefaultPreferences = (props) => {
  const [cmpData, setCmpData] = React.useState(undefined);
  const [invData, setInvData] = React.useState(undefined);

  const handleCompanyfilters = async (e) => {
    const allWidgetData = props.lstWidgetSelections;
    if (e.length > 0 && props.companySearchOptionSelection !== undefined) {
      let finalData = [];
      const selectedData = e;
      allWidgetData.filter((item) =>
        selectedData.filter((item2) => {
          if (item2.value !== null) {
            if (item2.value === item.widget_id) {
              finalData = [...finalData, item];
            }
          } else {
            finalData = allWidgetData;
          }
        })
      );
      const removeFilterData = allWidgetData.filter((item) =>
        selectedData.some((item2) => item2.value !== item.widget_id)
      );
      if (removeFilterData.length > 0) {
        removeFilterData.filter(async (item) => {
          await props.resetDashboardWidgetCompanySearchReq({
            dashboard_widget_link_id: item.dashboard_widget_link_id,
          });
        });
      }
      if (finalData.length > 0) {
        finalData.filter(async (item) => {
          const data = {
            action: 'usefilter', // "update",
            cmpSearchId: null,
            txtSaveCurrentList:
              props.companySearchOptionSelection === undefined
                ? 'Quicksearch'
                : props.companySearchOptionSelection.label,
            companySingleSelection: props.companySingleSelection,
            companySelection: props.companySelection,
            indexSelection: props.indexSelection,
            exchangeSelection: props.exchangeSelection,
            aiPeerGroupSelection: props.aiPeerGroupSelection,
            industrySelection: props.industrySelection,
            marketCapSelection: props.marketCapSelection,
            companyLocationSelection: props.companyLocationSelection,
            marketCapMinRange: props.txtMarketCapMinRange,
            marketCapMaxRange: props.txtMarketCapMaxRange,
            listRegeionAndCountries: props.listRegeionAndCountries,
            piListOfSectorsAndIndustries: props.piListOfSectorsAndIndustries,
            isSaved: false,
            dashboard_widget_link_id: item.dashboard_widget_link_id,
          };

          await props.handleCompanySearchUpdateReq(data);
        });
      }
      setCmpData(undefined);
    } else {
      allWidgetData.filter(async (item) => {
        await props.resetDashboardWidgetCompanySearchReq({
          dashboard_widget_link_id: item.dashboard_widget_link_id,
        });
      });
      props.handleResetCompanyWidgetSelection();
    }
  };

  const handleInvestorfilters = async (e) => {
    const allWidgetData = props.lstWidgetSelections;
    if (e.length > 0 && props.investorSearchOptionsSelection !== undefined) {
      const selectedData = e;
      let finalData = [];
      allWidgetData.filter((item) =>
        selectedData.filter((item2) => {
          if (item2.value !== null) {
            if (item2.value === item.widget_id) {
              finalData = [...finalData, item];
            }
          } else {
            finalData = allWidgetData;
          }
        })
      );
      const removeFilterData = allWidgetData.filter((item) =>
        selectedData.some((item2) => item2.value !== item.widget_id)
      );
      if (removeFilterData.length > 0) {
        removeFilterData.filter(async (item) => {
          await props.resetDashboardWidgetInvestorSearchReq({
            dashboard_widget_link_id: item.dashboard_widget_link_id,
          });
        });
      }
      if (finalData.length > 0) {
        finalData.filter(async (item) => {
          const data = {
            action: 'usefilter',
            investorSearchId: null,
            txtSaveCurrentList:
              props.investorSearchOptionsSelection === undefined
                ? 'Quicksearch'
                : props.investorSearchOptionsSelection.label,
            investorSingleSelection: props.companySingleSelection,
            investorSelection: props.investorSelection,
            investorLocationSelection: props.investorLocationSelection,
            AumSelection: props.aumCategorySelection,
            aum_min: props.invTxtMarketCapMinRange,
            aum_max: props.invTxtMarketCapMaxRange,
            listRegeionAndCountries: props.listRegeionAndCountries,
            byShareholderOfCompany: props.selectionByIndivProponent,
            listInvestorTypeAndSubtypeSelection:
              props.listInvestorTypeAndSubtypeSelection,
            listInvestorTypeAndSubtype: props.listInvestorTypeAndSubtype,
            isSaved: false,
            dashboard_widget_link_id: item.dashboard_widget_link_id,
          };
          await props.handleInvestorSearchUpdateReq(data);
        });
      }
      setInvData(undefined);
    } else {
      allWidgetData.filter(async (item) => {
        await props.resetDashboardWidgetInvestorSearchReq({
          dashboard_widget_link_id: item.dashboard_widget_link_id,
        });
      });
      props.handleResetInvestorWidgetSelection();
    }
  };
  React.useEffect(() => {
    if (props.cmpWidgetValue !== undefined) {
      setCmpData(props.cmpWidgetValue);
    }
  }, [props.cmpWidgetValue]);

  React.useEffect(() => {
    if (cmpData !== undefined) {
      handleCompanyfilters(cmpData);
    }
  }, [cmpData]);

  React.useEffect(() => {
    if (props.invWidgetValue !== undefined) {
      setInvData(props.invWidgetValue);
    }
  }, [props.invWidgetValue]);

  React.useEffect(() => {
    if (invData !== undefined) {
      handleInvestorfilters(invData);
    }
  }, [invData]);

  return (
    <div>
    <div className='mb-3'>
      <span>
         From these settings you can create and save groups of companies and investors. If you wish, you can then set default company and investor groups to appear on any Tools and Dashboard Widgets to filter them automatically when you access the Tools or Dashboard Widget
      </span>
    </div>
      {/* <div className='row'>
        <div className='col-lg-3 col-12 col-md-6 '> </div>
        <CompanyAndInvestorFilter
          isPreferences={isPreferences}
          companyBtnLabel='Create Company Selection'
          isHideCmpLabel
          isHideinvLabel
          investorBtnLabel='Create Investor Selection'
          {...props}
        />
      </div> */}
    <div className='mx-5'>
      <div className='row'>
        <div className='col-lg-3' />
        <div className='col-lg-5 ps-1'>
          <span>
            Default Company and Investor Peer Groups will appear as default options on all Tools and Searches{' '}
          </span>
        </div>
        <div className='col-lg-4 ps-1'>
          <span> Apply the default peer group to Dashboard Widgets </span>
        </div>
      </div>
      <div className='row'>
      <div className='col-lg-3 col-12 col-md-6 col-form-label d-flex flex-row'>
        <label
          htmlFor='companyPeergrp'
          className='text-primary font-weight-bold align-self-center'
        >
          Company Peer Group:
        </label>
        <div className='ms-4'>
        <CompanyAndInvestorFilter
          isPreferences={isPreferences}
          companyBtnLabel='Create Company Selection'
          isHideCmpLabel
          isHideinvLabel
          isCompanyBtn
          {...props}
        />
        </div>
      </div>
        <div className='col-lg-4 col-12 col-md-6 mt-1 p-1'>
          <SearchInput
            onChange={async (e) => {
              const a = '';
              if (e !== null) {
                localStorage.setItem('companyFilterData', JSON.stringify(e));
                await props.handleResetCompanyWidgetSelection();
                await props.handleCompanySearchOptionSelection(e);
                await props.getAllCompanySearchSelection(e.value);
              } else {
                await props.ResetCompanySearchOptionSelection();
                await props.handleResetCompnaySelections(isPreferences);
              }
            }}
            handleOnInputChange={props.handleSavedPeerGroupsInputChange}
            selectValue={props.companySearchOptionSelection !== undefined && props.companySearchOptionSelection}
            options={props.listOfcompanySearchOptions}
            isMulti={false}
            placeholder='Choose a default Company Peer Group...'
          />
        </div>
        <div className='col-lg-1 col-md-6 col-sm-12' />
        <div className='col-md-6 col-lg-4 col-sm-12 mt-1 p-1'>
          {/* Dropdown for Company Widget  */}
          <SearchInput
            onChange={async (e) => {
              if (e !== null) {
                await props.handleCompanyWidgetSelection(e);
              } else {
                props.handleCompanyWidgetSelection([]);
              }
            }}
            selectValue={props.cmpWidgetValue}
            options={props.ddlWidgetSelections}
            isMulti
            placeholder='Choose one or more widgets...'
          />
        </div>
      </div>

      <div className='row mt-2 mb-3'>
      <div className='col-lg-3 col-12 col-md-6 col-form-label d-flex flex-row'>
        <label
          htmlFor='investorPeergrp'
          className='text-primary font-weight-bold align-self-center'
        >
          Investor Peer Group:
        </label>
        <div className='ms-4'>
        <CompanyAndInvestorFilter
          isPreferences={isPreferences}
          isHideCmpLabel
          isHideinvLabel
          investorBtnLabel='Create Investor Selection'
          isInvestorBtn
          {...props}
        />
        </div>
      </div>
        <div className='col-12 col-md-6 col-lg-4 mt-1 p-1'>
          <SearchInput
            onChange={async (e) => {
              if (e !== null) {
                localStorage.setItem('investorFilterData', JSON.stringify(e));
                await props.handleResetInvestorWidgetSelection();
                await props.handleInvestorSearchOptionSelection(e);
                await props.GetInvestorSearchSelection(e.value);
              } else {
                await props.ResetInvestorSearchOptionSelection();
                await props.handleResetInvestorSelections(isPreferences);
              }
            }}
            handleOnInputChange={props.handleInvestorSavedPeerGroupsInputChange}
            selectValue={props.investorSearchOptionsSelection !== undefined && props.investorSearchOptionsSelection}
            options={props.investorSearchOptions}
            isMulti={false}
            placeholder='Choose a default Investor Peer Group...'
          />
        </div>
        <div className='col-lg-1 col-md-6 col-sm-12' />
        <div className='col-12 col-md-6 col-lg-4 mt-1 p-1'>
          {/* Dropdown for Investor Widget  */}
          <SearchInput
            onChange={async (e) => {
              if (e !== null) {
                await props.handledInvestorWidgetSelection(e);
              } else {
                props.handledInvestorWidgetSelection([]);
              }
            }}
            selectValue={props.invWidgetValue}
            options={props.ddlWidgetSelections}
            isMulti
            placeholder='Choose one or more widgets...'
          />
        </div>
      </div>
    </div>
    </div>
  );
};

DefaultPreferences.propTypes = {
  companyPeerGroupDataList: PropTypes.array,
  companyPeerGroupSelection: PropTypes.any.isRequired,
  handleCompanyPeerGroupSelectionChange: PropTypes.func,
  handleInvestorPeerGroupSelectionChange: PropTypes.func,
  investorPeerGroupDataList: PropTypes.array,
  investorPeerGroupSelection: PropTypes.any.isRequired,
};

DefaultPreferences.defaultProps = {
  companyPeerGroupDataList: [],
  handleCompanyPeerGroupSelectionChange: () => {},
  handleInvestorPeerGroupSelectionChange: () => {},
  investorPeerGroupDataList: [],
};

export default React.memo(DefaultPreferences);
