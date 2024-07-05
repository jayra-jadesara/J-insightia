import React, { useEffect } from 'react';
import InvestorFilter from '../../Investor/InvestorFilter';
import Modal from '../../GeneralForm/Modal';
import SearchInput from '../../GeneralForm/DropdownVirtualized';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import DropdownList from '../../GeneralForm/DropdownList';
import { ARRAY_HAS_NO_LENGTH, ARRAY_START_VALUE } from '../../../constants/NumberConstants';

const FilterInvestor = (props) => {
  if (
    props.invWidgetValue !== undefined &&
    props.invWidgetValue[ARRAY_START_VALUE].value === null &&
    props.investorSearchOptionsSelection !== undefined &&
    !props.isInvestorFilter
  ) {
    useEffect(() => {
      async function data() {
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
          dashboard_widget_link_id: props.dashboard_widget_link_id,
        };
        setTimeout(async () => {
          await props.handleInvestorSearchUpdateReq(data);
        }, 2000);
      }
      data();
    }, []);
  }

  if (props.showInvestorFilterModel !== undefined) {
    return (
      <Modal
        show={props.showInvestorFilterModel}
        handleClose={() => props.HandleInvestorFilterModel(false)}
        size='lg'
        title='Investor Filter'
      >
        <ErrorBoundary>
        <InvestorFilter {...props} />
        {props.showInvestorFilterModel &&
        props.investorSearchOptions.length > ARRAY_HAS_NO_LENGTH ? (
          <div className='row mt-1'>
            <label
              htmlFor='companySavePeerGroups'
              className='col-sm-3 col-form-label text-primary font-weight-bold pt-0 pb-0 mb-1'
            >
              By My Saved Peer Groups:
            </label>
            <div className='col-sm-9 mb-1'>
              <DropdownList
                handleChange={async (e) => {
                  if (e !== null) {
                    props.handleInvestorSearchOptionSelection(e);
                    props.GetInvestorSearchSelection(e.value);
                  } else {
                    props.ResetInvestorSearchOptionSelection();
                  }
                }}
                isMulti={false}
                options={props.investorSearchOptions}
                Dvalue={props.investorSearchOptionsSelection}
                placeholder='(Optional) Choose one peer groups...'
                maxHeight={160}
              />
            </div>
          </div>
        ) : (
          ''
        )}

        <div>
          <div className='row mb-3'>
            <label
              htmlFor='savecurrentlist'
              className='col-sm-3 col-form-label text-primary font-weight-bold'
            >
              Save current list:
            </label>
            <div className='col-sm-9'>
              <input
                type='text'
                value={props.txtSaveCurrentList}
                onChange={(e) => props.handleSaveInvestorCurrentList(e)}
                className='form-control'
                id='savecurrentlist'
                placeholder='Add name to save as new list'
              />
            </div>
          </div>
          <div className='row'>
            <label
              htmlFor='actionCurrentList'
              className='col-sm-3 col-form-label'
            />
            <div className='col-sm-9 m-0'>
              <button
                type='button'
                onClick={async () => {
                  const data = {
                    action: 'delete',
                    investorSearchOptionsSelection:
                      props.investorSearchOptionsSelection,
                  };
                  await props.handleInvestorSearchDeleteReq(data);
                  await props.getInvestorSearchOptions();
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
                    investorSearchId: props.investorSearchOptionsSelection,
                    txtSaveCurrentList: props.txtSaveCurrentList,
                    investorSingleSelection: props.companySingleSelection,
                    investorSelection: props.investorSelection,
                    investorLocationSelection: props.investorLocationSelection,
                    AumSelection: props.aumCategorySelection,
                    aum_min: props.invTxtMarketCapMinRange,
                    aum_max: props.invTxtMarketCapMaxRange,
                    listRegeionAndCountries: props.listRegeionAndCountries,
                    listInvestorTypeAndSubtypeSelection:
                      props.listInvestorTypeAndSubtypeSelection,
                    listInvestorTypeAndSubtype:
                      props.listInvestorTypeAndSubtype,
                    byShareholderOfCompany: props.selectionByIndivProponent,
                    isSaved: true,
                    dashboard_widget_link_id: props.dashBoardWidgetId,
                  };
                  const newFilter = await props.handleInvestorSearchUpdateReq(
                    data
                  );
                  await props.getInvestorSearchOptions();
                  props.handleInvestorSearchOptionSelection(newFilter.payload);
                }}
                className='btn btn-primary btn-sm m-1'
                disabled={props.isSaveCurrentListButtonSaveDisable}
              >
                {props.saveCurrentListButtonText}
              </button>

              {props.investorSearchOptionsSelection !== undefined &&
                props.txtSaveCurrentList.length > ARRAY_HAS_NO_LENGTH && (
                  <button
                    type='button'
                    onClick={async () => {
                      const data = {
                        action: 'update',
                        investorSearchId: undefined,
                        txtSaveCurrentList: props.txtSaveCurrentList,
                        investorSingleSelection: props.companySingleSelection,
                        investorSelection: props.investorSelection,
                        investorLocationSelection:
                          props.investorLocationSelection,
                        AumSelection: props.aumCategorySelection,
                        aum_min: props.invTxtMarketCapMinRange,
                        aum_max: props.invTxtMarketCapMaxRange,
                        listRegeionAndCountries: props.listRegeionAndCountries,
                        byShareholderOfCompany: props.selectionByIndivProponent,
                        listInvestorTypeAndSubtypeSelection:
                          props.listInvestorTypeAndSubtypeSelection,
                        listInvestorTypeAndSubtype:
                          props.listInvestorTypeAndSubtype,
                        isSaved: true,
                      };
                      const newFilter =
                        await props.handleInvestorSearchUpdateReq(data);
                      await props.getInvestorSearchOptions();
                      props.handleInvestorSearchOptionSelection(
                        newFilter.payload
                      );
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
          <div className='col-sm-9 m-0'>
            <button
              onClick={async () => {
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
                  dashboard_widget_link_id: props.dashBoardWidgetId,
                };
                await props.handleInvestorSearchUpdateReq(data);
                await props.handdleRun(data);
                props.HandleInvestorFilterModel(false);
              }}
              type='button'
              className='btn btn-primary btn-sm m-1 float-end'
            >
              Use Filter
            </button>
            <button
              onClick={async () => {
                await props.resetDashboardWidgetInvestorSearch({
                  dashboard_widget_link_id: props.dashBoardWidgetId,
                });
                const data = {
                  action: 'removefilter',
                  investorSearchId: null,
                  txtSaveCurrentList: props.txtSaveCurrentList,
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
                  dashboard_widget_link_id: props.dashBoardWidgetId,
                };
                await props.handleInvestorSearchUpdateReq(data);
                await props.handdleRun(data);
                await props.ResetInvestorSearchOptionSelection();
                props.HandleInvestorFilterModel(false);
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

export default React.memo(FilterInvestor);
