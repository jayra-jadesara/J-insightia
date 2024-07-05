import React, { useEffect } from 'react';
import Modal from '../../GeneralForm/Modal';
import CompanyFilter from '../CompanyFilter';
import SearchInput from '../../GeneralForm/DropdownVirtualized';
import CompanyFilterGroupOptions from '../CopmanyFilterGroupOptions';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import { ARRAY_HAS_NO_LENGTH, ARRAY_START_VALUE } from '../../../constants/NumberConstants';

const FilterCompany = (props) => {
  if (props.cmpWidgetValue !== undefined && props.cmpWidgetValue[ARRAY_START_VALUE].value === null && props.companySearchOptionSelection !== undefined && !props.isCompanyFilterd) {
  useEffect(() => {
    async function data() {
        const data = {
          action: 'usefilter', // "update",
          cmpSearchId: null,
          txtSaveCurrentList: props.companySearchOptionSelection === undefined
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
          dashboard_widget_link_id: props.dashboard_widget_link_id
        };
        await props.handleCompanySearchUpdateReq(data);
        props.handdleRun(data);
    }
    data();
  }, []);
}

  if (props.showFilterModel !== undefined) {
    return (
      <Modal
        show={props.showFilterModel}
        handleClose={() => props.HandleFilterModel(false)}
        size='lg'
        title='Company Filter'
      >
        <ErrorBoundary>
        {props.showIndividualOption ? <CompanyFilter {...props} /> : <CompanyFilterGroupOptions {...props} />}
        {/* handle - By My Saved Peer Groups visiblity */}
        {props.showFilterModel && props.listOfcompanySearchOptions.length > ARRAY_HAS_NO_LENGTH ? (
          <div className='row'>
            <label
              htmlFor='companySavePeerGroups'
              className='col-sm-3 col-form-label text-primary font-weight-bold pt-0 pb-0 mb-1'
            >
              By My Saved Peer Groups:
            </label>
            <div className='col-sm-9 mb-1'>
              <SearchInput
                onChange={(e) => {
                  if (e !== null) {
                    props.handleCompanySearchOptionSelection(e);
                    props.getAllCompanySearchSelection(e.value);
                  } else {
                    props.ResetCompanySearchOptionSelection();
                  }
                }}
                selectValue={props.companySearchOptionSelection}
                options={props.listOfcompanySearchOptions}
                isMulti={false}
                placeholder='(Optional) Choose one peer group...'
              />
            </div>
          </div>
        ) : (
          ''
        )}

        <div>
          <div className='row mb-3'>
            <label htmlFor='savecurrentlist' className='col-sm-3 col-form-label text-primary font-weight-bold'>
              Save current list:
            </label>
            <div className='col-sm-9'>
              <input
                type='text'
                value={props.txtSaveCurrentList}
                onChange={(e) => props.handleSaveCurrentList(e)}
                className='form-control'
                id='savecurrentlist'
                placeholder='Add name to save as new list'
              />
            </div>
          </div>
          <div className='row'>
            <label htmlFor='actionCurrentList' className='col-sm-3 col-form-label' />
            <div className='col-sm-9 m-0'>
              <button
                type='button'
                onClick={async () => {
                  const data = {
                    action: 'delete',
                    companySearchOptionSelection: props.companySearchOptionSelection
                  };
                  await props.handleCompanySearchDeleteReq(data);
                  await props.getCompanySearchOptions();
                }}
                className='btn btn-primary btn-sm m-1'
                disabled={props.isSaveCurrentListButtonDeleteDisable}
              >
                Delete List
              </button>

              <button
                type='button'
                onClick={async () => {
                  const data = {
                    action: 'update',
                    cmpSearchId: props.companySearchOptionSelection,
                    txtSaveCurrentList: props.txtSaveCurrentList,
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
                    isSaved: true,
                    dashboard_widget_link_id: props.dashBoardWidgetId
                  };
                  const newFilter = await props.handleCompanySearchUpdateReq(data);
                  await props.getCompanySearchOptions();
                  props.handleInvestorSearchOptionSelection(newFilter.payload);
                }}
                className='btn btn-primary btn-sm m-1'
                disabled={props.isSaveCurrentListButtonSaveDisable}
              >
                {props.saveCurrentListButtonText}
              </button>

              {props.companySearchOptionSelection !== undefined && props.txtSaveCurrentList.length > ARRAY_HAS_NO_LENGTH && (
                <button
                  type='button'
                  onClick={async () => {
                    const data = {
                      action: 'update',
                      cmpSearchId: undefined,
                      txtSaveCurrentList: props.txtSaveCurrentList,
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
                      isSaved: true
                    };
                    const newFilter = await props.handleCompanySearchUpdateReq(data);
                    await props.getCompanySearchOptions();
                    props.handleInvestorSearchOptionSelection(newFilter.payload);
                  }}
                  className='btn btn-primary btn-sm m-1'
                  disabled={props.isSaveCurrentListButtonSaveDisable}
                >
                  Save New
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <label htmlFor='run' className='col-sm-3 col-form-label' />
          <div className='m-0 float-end'>
            <button
              onClick={async () => {
                const data = {
                  action: 'usefilter', // "update",
                  cmpSearchId: null,
                  txtSaveCurrentList: props.companySearchOptionSelection === undefined
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
                  dashboard_widget_link_id: props.dashBoardWidgetId
                };
                await props.handleCompanySearchUpdateReq(data);
                props.handdleRun(data);
              }}
              type='button'
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Use Filter
            </button>
            <button
              onClick={async () => {
                await props.resetDashboardWidgetCompanySearch({ dashboard_widget_link_id: props.dashBoardWidgetId });
                const data = {
                  action: 'removefilter',
                  cmpSearchId: null,
                  txtSaveCurrentList: props.txtSaveCurrentList,
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
                  dashboard_widget_link_id: props.dashBoardWidgetId
                };
                await props.handleCompanySearchUpdateReq(data);
                await props.handdleRun(data);
                await props.ResetCompanySearchOptionSelection();
                props.HandleFilterModel(false);
              }}
              type='button'
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Clear Filter
            </button>
          </div>
        </div>
        </ErrorBoundary>
      </Modal>
    );
  }
  return null;
};

export default FilterCompany;
